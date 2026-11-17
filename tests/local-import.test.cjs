'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const ctx=vm.createContext({window:{},Date,console});
vm.runInContext(fs.readFileSync(path.join(__dirname,'../demo/import-engine.js'),'utf8'),ctx);
const engine=ctx.window.BTL_LOCAL_ENGINE;
assert.equal(engine.likelyName('So'),false);
assert.equal(engine.likelyName('Probably'),false);
assert.equal(engine.likelyName('Nobody'),false);
assert.equal(engine.likelyName('Everybody'),false);
assert.equal(engine.likelyName('Then Clay'),false);
assert.equal(engine.likelyName('Sid'),true);
const book=engine.build('Private Book <img src=x>',[
 'So this is a paragraph with a long story. My brother Sid carried the brass key toward the old harbor at dusk. This is enough information for page one.',
 'Probably somebody knew the answer to the puzzle. But my sister Rosa Penn said she could not find the map near the station and that she was worried.',
 'The document says that the clock was seven minutes ahead. This section has a few extra words to make the passage long enough for indexing.',
 'The next chapter unexpectedly shows the locked tower. My uncle Clay does not want anyone to open it because it is dangerous.',
 'My brother Sid stands beside the station and watches the lighthouse beam. Another sentence keeps this page substantial and searchable.'
]);
assert.equal(book.local,true);
assert.equal(book.pages.length,5);
assert.ok(book.people.some(x=>x.name==='Sid'));
assert.ok(book.people.some(x=>x.name==='Rosa Penn'));
assert.ok(!book.people.some(x=>['So','Probably','Nobody','Everybody'].includes(x.name)));
assert.ok(book.evidence.every(e=>e.status==='Review suggestion'));
assert.ok(engine.findPassages(book,'lighthouse',1).length>=0);
assert.equal(engine.findPassages(book,'lighthouse',1).some(x=>x.page>book.chapters[0].toPage),false);
assert.ok(engine.findPassages(book,'seven minutes',book.chapters.length).some(x=>x.page===3));
assert.throws(()=>engine.build('No words',['image-only','']),/selectable text/i);
// C122: literal matches must not mistake a name for part of another word.
const searchBook=engine.build('Exact-word test',[
  'Ann and Maya found a lighthouse map beside the quiet harbor. The archive was open and full of long forgotten documents.',
  'The annual festival mentioned a lighthouse map, but it names no person. Many unrelated facts appear here.',
  'Maya and Ann returned to the archive. They wrote a short letter about the map beside a wooden cabinet.',
  'An old manuscript about Anna described an annual parade and the nearby station. This page contains only the longer name.'
]);
const ann=engine.findPassages(searchBook,'Ann',4);
assert.deepEqual(Array.from(ann,x=>x.page),[1,3],'Ann must not match annual or Anna');
const combined=engine.findPassages(searchBook,'Ann lighthouse',4);
assert.equal(combined[0].page,1,'page matching both terms ranks ahead of single-term matches');
assert.equal(combined[0].matchedTerms,2);
assert.equal(combined[0].totalTerms,2);
assert.equal(combined[0].exactPhrase,false,'nonadjacent terms are not labeled an exact phrase');
assert.ok(combined.some(x=>x.matchedTerms===1),'partial results retain an explicit match count');
const exact=engine.findPassages(searchBook,'Maya and Ann',4);
assert.equal(exact[0].page,3);
assert.equal(exact[0].exactPhrase,true,'exact phrases rank first');
assert.equal(engine.findPassages(searchBook,'the and',4).length,0,'stopwords alone are not search terms');
assert.equal(engine.findPassages(searchBook,'lighthouse',0).length,0,'invalid stopping points cannot unlock pages');
assert.equal(engine.findPassages(searchBook,'Ann',1).some(x=>x.page>1),false,'locked pages never enter results');
assert.ok(engine.findPassages(searchBook,'Anna',4).some(x=>x.page===4),'full-word search still finds exact longer names');

const bad=book.title; assert.ok(bad.includes('<img')); // Data remains raw; UI must escape it before render.
console.log('PASS: local parsing, no false people, evidence disclaimer, exact page citations, spoiler-bound search, image-only refusal');
