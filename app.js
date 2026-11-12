'use strict';
// This is an original authored DESIGN ILLUSTRATION. It does not connect to the
// private app, account data, any model, or uploaded copyrighted material.
const chapters = Object.freeze([
  {title:'THE LEDGER',text:"At low tide, Ada found a brass key behind the archive's oldest ledger. The paper tag on its handle read NORTH.",answer:'Ada discovers a brass key with a tag marked NORTH. The source does not yet identify its purpose.',source:'CHAPTER I',quote:"Ada found a brass key behind the archive's oldest ledger.",unknown:"Who left the key there? The text hasn't told us."},
  {title:'THE SECOND WITNESS',text:'Rin visited the archive the next morning. Ada showed Rin the key, but neither could identify which lock it opened.',answer:'Ada has shown the key to Rin, but they still do not know which lock it opens.',source:'CHAPTER II',quote:'Ada showed Rin the key, but neither could identify which lock it opened.',unknown:'The source still does not name who hid the key.'},
  {title:'THE LIGHTHOUSE CABINET',text:'At the lighthouse, Ada tried the brass key in the sealed cabinet. The lock clicked open. Inside lay a weathered map.',answer:'Ada uses the key to open the sealed lighthouse cabinet and finds a weathered map.',source:'CHAPTER III',quote:'The lock clicked open. Inside lay a weathered map.',unknown:'Even now, the author of the NORTH tag is unidentified.'}
]);
const roman=['I','II','III'];
const $=id=>document.getElementById(id);
let chapter=1;
function setChapter(n){
  if(!Number.isInteger(n)||n<1||n>chapters.length)return;
  chapter=n;
  for(const button of document.querySelectorAll('[data-chapter]'))button.setAttribute('aria-pressed',String(Number(button.dataset.chapter)===n));
  const passages=$('passages');
  passages.replaceChildren();
  chapters.slice(0,n).forEach((part,i)=>{
    const entry=document.createElement('article');const heading=document.createElement('span');heading.textContent=`CHAPTER ${roman[i]} · ${part.title}`;
    const paragraph=document.createElement('p');paragraph.textContent=part.text;
    entry.append(heading,paragraph);passages.append(entry);
  });
  const last=chapters[n-1];
  $('reading-progress').textContent=`Through chapter ${n} of ${chapters.length}`;
  $('evidence-answer').textContent=last.answer;
  $('evidence-source').textContent=last.source;
  $('evidence-quote').textContent=`“${last.quote}”`;
  $('evidence-unknown').textContent=last.unknown;
  $('boundary-hint').textContent=n===chapters.length?'You have finished the sample.':`Only chapters I–${roman[n-1]} are visible.`;
  $('prev-chapter').disabled=n===1;$('next-chapter').disabled=n===chapters.length;
  $('next-chapter').innerHTML=n===chapters.length?'All chapters complete':'Finish next chapter <span aria-hidden="true">→</span>';
}
document.querySelectorAll('[data-chapter]').forEach(b=>b.addEventListener('click',()=>setChapter(Number(b.dataset.chapter))));
$('prev-chapter').addEventListener('click',()=>setChapter(chapter-1));
$('next-chapter').addEventListener('click',()=>setChapter(chapter+1));
setChapter(1);
const toggle=$('appearance-toggle');
const saved=(()=>{try{return localStorage.getItem('btl.case-study.appearance');}catch{return null;}})();
function setAppearance(mode){
  const isInk=mode==='ink';document.documentElement.dataset.appearance=isInk?'ink':'paper';
  toggle.setAttribute('aria-pressed',String(isInk));toggle.setAttribute('aria-label',isInk?'Switch to paper theme':'Switch to ink theme');
  $('appearance-label').textContent=isInk?'Paper mode':'Ink mode';
  document.querySelector('meta[name="theme-color"]').content=isInk?'#151e22':'#f7f2e8';
  try{localStorage.setItem('btl.case-study.appearance',isInk?'ink':'paper');}catch{}
}
setAppearance(saved==='ink'?'ink':'paper');
toggle.addEventListener('click',()=>setAppearance(document.documentElement.dataset.appearance==='ink'?'paper':'ink'));
