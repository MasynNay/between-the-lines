'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const data=fs.readFileSync(path.join(root,'demo/data.js'),'utf8');
const engine=fs.readFileSync(path.join(root,'demo/import-engine.js'),'utf8');
const script=fs.readFileSync(path.join(root,'demo/demo.js'),'utf8');
class E {
  constructor(id=''){this.id=id;this.dataset={};this.listeners={};this.innerHTML='';this.value='';this.textContent='';this.attrs={};this.classList={toggle(){},add(){}};this.style={setProperty(){}};}
  addEventListener(type,handler){this.listeners[type]=handler;}
  setAttribute(name,value){this.attrs[name]=value;}
  removeAttribute(name){delete this.attrs[name];}
  querySelectorAll(){return [];}
  scrollIntoView(){}
  focus(){}
  showModal(){}
  close(){}
}
const ids=['#page-eyebrow','#page-title','#page-description','#progress-summary','#view-content','#theme-select','#reset-demo','#toast','#sidebar-book-panel','#workspace-tabs','#theme-options','#theme-dialog','#theme-launch','#theme-close','#page-jump-input','#question-input'];
const els=Object.fromEntries(ids.map(id=>[id,new E(id)]));
const nav=['library','story','people','relationships','evidence'].map(v=>{const el=new E();el.dataset.view=v;return el;});
const saved=new Map();
const doc={documentElement:{dataset:{},style:{setProperty(){}}},querySelector(sel){return els[sel]||new E(sel);},querySelectorAll(sel){return sel==='.nav-item'||sel==='[data-view].nav-item'?nav:[];}};
const ctx=vm.createContext({window:{confirm:()=>true},document:doc,location:{href:'http://localhost/demo/'},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)},console,setTimeout(){return 1;},clearTimeout(){}});
vm.runInContext(data,ctx);
vm.runInContext(engine,ctx);
vm.runInContext(script,ctx);
const output=()=>els['#view-content'].innerHTML;
const click=dataset=>els['#view-content'].listeners.click({target:{closest:()=>({dataset,hasAttribute:attr=>attr==='data-'+Object.keys(dataset)[0].replace(/[A-Z]/g,x=>'-'+x.toLowerCase())})}});
const select=(id,value)=>els['#view-content'].listeners.change({target:{id,value}});
const navto=(name)=>nav.find(x=>x.dataset.view===name).listeners.click();
const tick=()=>new Promise(resolve=>setImmediate(resolve));
(async()=>{
  const text='My brother Sid carried the lantern home. '.repeat(180)+'\nCHAPTER TWO: The meadow began to flood. '+ 'Mara walked to the lighthouse. '.repeat(240);
  assert.ok(text.length>6500);
  const file={name:'Private_test_story.txt',size:text.length,async text(){return text;}};
  els['#view-content'].listeners.change({target:{id:'book-upload',files:[file]}});
  await tick(); await tick();
  assert.ok(output().includes('Private test story'), 'file imported');
  assert.ok(output().includes('ORIGINAL PDF PAGE 1'), 'page 1 initially shown');
  assert.ok(output().includes('Go to a source PDF page'), 'exact page controls present');
  assert.ok(!output().includes('CHAPTER TWO'), 'future page text not rendered before progress');
  assert.ok(els['#sidebar-book-panel'].innerHTML.includes('Remove this imported book'));
  navto('evidence');
  assert.ok(output().includes('Search my PDF'));
  // A search for later content has no results while locked.
  els['#question-input'].value='lighthouse';
  els['#view-content'].listeners.submit({target:{id:'ask-form'},preventDefault(){}});
  assert.ok(output().includes('No matching text in your unlocked pages'));
  navto('story');
  select('local-section',2);
  assert.ok(output().includes('CHAPTER TWO'),'unlocked second page');
  navto('evidence');
  els['#question-input'].value='lighthouse';
  els['#view-content'].listeners.submit({target:{id:'ask-form'},preventDefault(){}});
  assert.ok(output().includes('Open PDF page 2'), 'search results reference exact page');
  click({sourcePage:'2'});
  assert.ok(output().includes('ORIGINAL PDF PAGE 2'));
  const activeId=saved.get('btl.public.demo.v1');
  assert.ok(!activeId.includes('CHAPTER TWO'),'private prose not persisted');
  const removes=Array.from(els['#sidebar-book-panel'].innerHTML.matchAll(/data-remove-story="([^"]+)"/g));
  assert.equal(removes.length,1);
  els['#sidebar-book-panel'].listeners.click({target:{closest:selector=>selector==='[data-remove-story]'?{dataset:{removeStory:removes[0][1]}}:null}});
  assert.ok(output().includes('removed from this tab'));
  assert.ok(!els['#sidebar-book-panel'].innerHTML.includes('Private test story'));
  assert.ok(!saved.get('btl.public.demo.v1').includes('Private test story'));
  // Missing/oversized documents produce clean, actionable feedback.
  navto('library');
  els['#view-content'].listeners.change({target:{id:'book-upload',files:[{name:'empty.txt',size:0}]}});
  assert.ok(output().includes('selected file is empty'));
  els['#view-content'].listeners.change({target:{id:'book-upload',files:[{name:'oversized.pdf',size:41*1024*1024}]}});
  assert.ok(output().includes('exceeds the 40 MB'));
  // An in-flight text import can be cancelled before its read resolves.
  let finishReading;
  const suspended={name:'Suspended_Private.txt',size:500, text(){return new Promise(resolve=>{finishReading=resolve;});}};
  els['#view-content'].listeners.change({target:{id:'book-upload',files:[suspended]}});
  assert.ok(output().includes('Cancel import'));
  click({cancelImport:''});
  finishReading('A longer private document containing a secret passage and enough words to index properly. '.repeat(3));
  await tick();await tick();
  assert.ok(output().includes('Import cancelled'));
  assert.ok(!output().includes('Suspended Private'));
  // The reset action also clears all imported books and returns to sample data.
  els['#view-content'].listeners.change({target:{id:'book-upload',files:[file]}});
  await tick();await tick();
  assert.ok(output().includes('ORIGINAL PDF PAGE'));
  els['#reset-demo'].listeners.click();
  assert.ok(output().includes('All imports cleared from this tab'));
  assert.ok(!els['#sidebar-book-panel'].innerHTML.includes('Private test story'));
  assert.ok(!saved.get('btl.public.demo.v1').includes('Private test story'));
  console.log('PASS: real text import, spoiler-bounded pages, exact-page citations, removal, no persisted prose, input limits');
})().catch(err=>{console.error(err);process.exitCode=1;});
