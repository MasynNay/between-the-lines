'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const data = fs.readFileSync(path.join(root, 'demo/data.js'),'utf8');
const script = fs.readFileSync(path.join(root, 'demo/demo.js'),'utf8');
const store = new Map();
class Element {
  constructor(id=''){this.id=id;this.dataset={};this.attrs={};this.listeners={};this.innerHTML='';this.textContent='';this.value='';this.classList={toggle(){},add(){}};this.style={setProperty(){}};}
  addEventListener(t,f){this.listeners[t]=f;}
  querySelectorAll(){return [];}
  querySelector(){return new Element();}
  showModal(){this.open=true;}
  close(){this.open=false;}
  setAttribute(k,v){this.attrs[k]=v;}
  removeAttribute(k){delete this.attrs[k];}
  focus(){}
  scrollIntoView(){}
}
const els = Object.fromEntries(['#page-eyebrow','#page-title','#page-description','#progress-summary','#view-content','#theme-select','#reset-demo','#toast','#question-input','.answer-pane','#sidebar-book-panel','#workspace-tabs','#theme-options','#theme-dialog','#theme-launch','#theme-close'].map(x=>[x,new Element(x)]));
const nav = ['library','story','people','relationships','evidence'].map(v=>{let el=new Element('nav-'+v);el.dataset.view=v;return el;});
const document = {
  documentElement:{dataset:{},style:{setProperty(){}}},
  querySelector(sel){return els[sel] || new Element(sel);},
  querySelectorAll(sel){return sel==='.nav-item'||sel==='[data-view].nav-item'?nav:[];}
};
const window = {confirm(){return true;}};
const context = vm.createContext({window,document,localStorage:{getItem(k){return store.get(k)||null;},setItem(k,v){store.set(k,v);}},setTimeout(fn){return 1;},clearTimeout(){},console});
vm.runInContext(data,context,{filename:'data.js'});
const stories=window.BTL_DEMO_STORIES;
assert.equal(stories.length,2);
for(const s of stories){
  assert.equal(s.chapters.length,4);
  for(const e of s.evidence)assert.ok(s.chapters[e.chapter-1].text.includes(e.quote),`${s.id} quote ${e.id} must exist in its source`);
  for(const q of s.qa)assert.ok(s.evidence.some(e=>e.id===q.evidence&&e.chapter===q.chapter),`${q.id} has exact linked source`);
}
vm.runInContext(script,context,{filename:'demo.js'});
const output = ()=>els['#view-content'].innerHTML;
const open = (id)=>els['#view-content'].listeners.click({target:{closest:()=>({dataset:{openStory:id}})}});
const navto=(name)=>nav.find(e=>e.dataset.view===name).listeners.click();
const progress = n=>els['#view-content'].listeners.click({target:{closest:()=>({dataset:{setProgress:String(n)}})}});
const question=id=>els['#view-content'].listeners.click({target:{closest:()=>({dataset:{question:id}})}});
const bookSelect=id=>els['#view-content'].listeners.change({target:{id:'story-pick',value:id}});
assert.ok(output().includes('Import PDF or text'));
assert.ok(output().includes('Bring your own'));
assert.ok(output().includes('The Archive at Low Tide'));
assert.ok(output().includes('Letters from the Observatory'));
assert.ok(!output().includes('Mara confronted Ada'));
open('archive');
assert.equal((output().match(/class="chapter-open"/g)||[]).length,1);
assert.equal((output().match(/class="chapter-locked"/g)||[]).length,3);
assert.ok(!output().includes('Mara confronted Ada'));
navto('people');
assert.ok(output().includes('2 people in your completed chapters'));
assert.ok(!output().includes('Rin Solis'));
navto('evidence');
question('qhid');
assert.ok(output().includes('NOT ESTABLISHED YET'));
assert.ok(!output().includes('Mara says she hid the key'));
navto('story');progress(4);
navto('people');assert.ok(output().includes('Rin Solis'));
navto('relationships');
assert.ok(output().includes('Mara Vale'));
assert.ok(output().includes('Observed interaction'));
navto('evidence');question('qhid');
assert.ok(output().includes('Mara says she hid the key'));
navto('story');progress(1);navto('evidence');
assert.ok(!output().includes('Mara says she hid the key'));
bookSelect('observatory');
navto('evidence');question('qclock');
assert.ok(output().includes('NOT ESTABLISHED YET'));
navto('story');progress(3);navto('evidence');question('qclock');
assert.ok(output().includes('seven minutes fast'));
const theme=els['#theme-select'];theme.listeners.change({target:{value:'amethyst'}});
assert.equal(document.documentElement.dataset.theme,'amethyst');
assert.ok(store.get('btl.public.demo.v1').includes('amethyst'));
console.log('PASS: original text / cited excerpts, chapter gating, people, relationships, question controls, rewind, second story, theme persistence');
// C113: browser edition mirrors the private reading area's source-aware tabs.
const tabs=els['#workspace-tabs'];
const guideTab=name=>tabs.listeners.click({target:{closest:()=>({dataset:{guideView:name}})}});
open('archive');
guideTab('places');
assert.ok(output().includes('The town archive'));
assert.ok(!output().includes('The lighthouse</h3>'));
guideTab('objects');
assert.ok(output().includes('The NORTH label'));
guideTab('events');
assert.ok(output().includes('No verified events yet'));
guideTab('recap');
assert.ok(output().includes('At your stopping point'));
const dialog=els['#theme-dialog'];
els['#theme-launch'].listeners.click();
assert.equal(dialog.open,true);
els['#theme-close'].listeners.click();
assert.equal(dialog.open,false);
assert.equal((els['#theme-options'].innerHTML.match(/data-theme-choice=/g)||[]).length,10);
assert.ok(tabs.innerHTML.includes('data-guide-view="relationships"'));
assert.ok(els['#sidebar-book-panel'].innerHTML.includes('sidebar-position'));
console.log('PASS: private-reader parity tabs, evidence-limited places/objects/events, theme modal, reading controls');
