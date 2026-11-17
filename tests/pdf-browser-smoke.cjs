'use strict';
// C117: real PDF.js worker/browser test using generated original fiction, never a user PDF.
const fs=require('node:fs'), path=require('node:path'), http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
function fixture(blank=false){
 const texts=blank?['','']:['Ada found the copper key in the archive. The original document has a clear first chapter with character details.','Mara wrote lanternword on the harbor map. These secret second-page words must not appear before unlocking.'];
 const streams=texts.map(x=>x?'BT\n/F1 12 Tf\n50 740 Td\n('+x+') Tj\nET\n':'q\nQ\n');
 const objects=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R 5 0 R] /Count 2 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 7 0 R >> >> /Contents 4 0 R >>',
  '<< /Length '+Buffer.byteLength(streams[0])+' >>\nstream\n'+streams[0]+'endstream',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 7 0 R >> >> /Contents 6 0 R >>',
  '<< /Length '+Buffer.byteLength(streams[1])+' >>\nstream\n'+streams[1]+'endstream',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
 let out='%PDF-1.4\n',offsets=[0];
 objects.forEach((o,i)=>{offsets.push(Buffer.byteLength(out));out+=(i+1)+' 0 obj\n'+o+'\nendobj\n';});
 const xref=Buffer.byteLength(out);out+='xref\n0 '+(objects.length+1)+'\n0000000000 65535 f \n';
 offsets.slice(1).forEach(x=>out+=String(x).padStart(10,'0')+' 00000 n \n');
 out+='trailer\n<< /Size '+(objects.length+1)+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF\n';return Buffer.from(out);
}
function server(){return http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname;const file=path.resolve(root,'.'+(name.endsWith('/')?name+'index.html':name));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 const mime={'.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
 try{const bytes=fs.readFileSync(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404);res.end();}});}
async function run(){
 for(const name of ['pdf.min.mjs','pdf.worker.min.mjs'])assert.ok(fs.statSync(path.join(root,'demo/vendor',name)).size>1000);
 const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright-core');const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium'].find(x=>x&&fs.existsSync(x));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(chrome?{executablePath:chrome}:{})});const app=server();await new Promise(r=>app.listen(0,'127.0.0.1',r));
 const origin='http://127.0.0.1:'+app.address().port;
 try{for(const width of [1440,390]){const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),external=[],errors=[];
 page.on('request',r=>{if(!r.url().startsWith(origin+'/')||r.method()!=='GET')external.push(r.url());});page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(origin+'/demo/');await page.locator('#book-upload').setInputFiles({name:'Original_Fixture.pdf',mimeType:'application/pdf',buffer:fixture()});
 await page.locator('.source-reading-page').waitFor({timeout:30000}).catch(async e=>{throw Error('PDF import: '+await page.locator('#import-status').innerText()+' '+e);});
 assert.match(await page.locator('.source-reading-text').innerText(),/copper key/);assert.doesNotMatch(await page.locator('.source-reading-text').innerText(),/lanternword/);
 await page.locator('#local-section').selectOption('2');assert.match(await page.locator('.source-reading-text').innerText(),/lanternword/);
 await page.locator('#workspace-tabs [data-guide-view="evidence"]').click();await page.locator('#question-input').fill('lanternword');await page.locator('#ask-form button').click();
 assert.match(await page.locator('.answer-pane').innerText(),/Open PDF page 2/);await page.locator('.answer-pane [data-source-page="2"]').click();
 assert.match(await page.locator('.source-reading-header').innerText(),/PAGE 2 \/ 2/);await page.locator('[data-view="library"].nav-item').click();
 await page.locator('#view-content [data-remove-story]').first().click();assert.match(await page.locator('#import-status').innerText(),/removed from this tab/);
 await page.locator('#book-upload').setInputFiles({name:'Empty_Scan.pdf',mimeType:'application/pdf',buffer:fixture(true)});
 await page.waitForFunction(()=>document.querySelector('#import-status')?.textContent?.includes('no selectable text'),null,{timeout:30000});
 assert.deepEqual(external,[],'Unexpected network activity');assert.deepEqual(errors,[],'Browser JS errors');
 const saved=await page.evaluate(()=>JSON.stringify(localStorage));assert.ok(!saved.includes('lanternword'),'private text persisted');
 console.log('PASS '+width+'px: real PDF.js + worker, source citation, spoiler gate, scan warning, no uploaded data');await context.close();}}
 finally{await browser.close();await new Promise(r=>app.close(r));}}
if(require.main===module)run().catch(e=>{console.error(e);process.exitCode=1;});module.exports={fixture};
