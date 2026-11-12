'use strict';
// Between the Lines browser-only import adapter. No network calls, no AI claims.
// Uploaded prose remains in memory; the caller never persists it.
(function (root) {
  const prohibited = new Set(`A An And Are As At Be Because But By Can Could Did Do Does Each Either Everybody Every For From Had Has Have He Her Here His How However I If In Into Is It Its Just Last Later Let Like May Maybe Me My No Nobody Nor Not Now Of Oh On One Or Our Out Perhaps Please Probably She Should Since So Some Someone Something Soon Such That The Their Then There These They This Those Though Through To Today Tomorrow Until Up Upon Us Was We Well Were What Whatever When Where Which While Who Why Will With Without Would Yes Yet You Your`.toLowerCase().split(/\s+/));
  const relation = /\b(?:[Mm]y|[Hh]er|[Hh]is|[Tt]heir)\s+(?:[a-z0-9-]+\s+){0,3}(brother|sister|mother|father|uncle|aunt|cousin|friend|girl)\s*[,—-]?\s+([A-Z][a-z]{2,}(?:\s+[A-Z][a-z]{2,})?)/g;
  const MAX_CHUNKS = 32;
  const tidy = s => String(s || '').replace(/\u0000/g, '').replace(/[ \t]{2,}/g, ' ').replace(/\n[ \t]+/g,'\n').trim();
  function likelyName(s) {
    const words = s.split(/\s+/);
    if (!words.length || words.some(w => prohibited.has(w.toLowerCase()))) return false;
    return !/\b(?:Chapter|Part|Page|Copyright|Contents|Preview|Acknowledgments|Prologue|Epilogue)\b/i.test(s);
  }
  function excerpt(text, index, size=230) {
    const start = Math.max(0, index-75), end = Math.min(text.length, index+size);
    return tidy((start ? '…' : '') + text.slice(start,end) + (end < text.length ? '…' : ''));
  }
  function build(title, pages) {
    if (!Array.isArray(pages) || !pages.length) throw Error('There were no pages to import.');
    const entries = pages.map((text,i) => ({page:i+1,text:tidy(text)}));
    if (!entries.some(p => p.text.length >= 50)) throw Error('This document has no selectable text. Scanned PDFs need OCR, which is not included in the public browser demo.');
    const groupSize = Math.max(1, Math.ceil(entries.length / MAX_CHUNKS));
    const chapters = [];
    for (let i=0;i<entries.length;i+=groupSize) {
      const selection=entries.slice(i,i+groupSize);
      chapters.push({title:`Pages ${selection[0].page}–${selection[selection.length-1].page}`,fromPage:selection[0].page,toPage:selection[selection.length-1].page,
        text:selection.map(p=>p.text).filter(Boolean).join('\n\n'),pageEntries:selection});
    }
    const hits = new Map();
    for (const {page,text} of entries) {
      relation.lastIndex=0;
      let match;
      while ((match=relation.exec(text)) !== null) {
        const candidate=match[2].trim();
        if (!likelyName(candidate)) continue;
        const key=candidate.toLowerCase();
        const existing=hits.get(key)||{id:`candidate-${hits.size+1}`,name:candidate,role:'Name to review',description:'A possible named person found in an explicit family reference. This is a suggestion, not a verified character identity.',firstPage:page,examples:[]};
        if(existing.examples.length<3)existing.examples.push({page,quote:excerpt(text,match.index)});
        hits.set(key,existing);
      }
    }
    const people=[...hits.values()].slice(0,30).map(person=>({id:person.id,name:person.name,first:Math.ceil(person.firstPage/groupSize),role:person.role,description:person.description,examples:person.examples}));
    const evidence=[];
    for (const person of people)for (const e of person.examples) {
      evidence.push({id:`mention-${evidence.length+1}`,chapter:Math.ceil(e.page/groupSize),page:e.page,category:'Name to review',people:[person.id],headline:`Possible mention of ${person.name}`,quote:e.quote,note:'Direct source wording. Confirm the identity yourself; the browser does not assert this is a verified character.',status:'Review suggestion'});
    }
    const id='local-'+Date.now().toString(36);
    return {id,title:tidy(title).slice(0,140)||'Untitled document',subtitle:`${entries.length} source pages · imported privately in this browser`,genre:'YOUR PRIVATE DOCUMENT',coverLabel:title,coverClass:'cover-imported',chapters,people,evidence,qa:[],local:true,pages:entries};
  }
  function findPassages(book, query, maxSection, limit=6) {
    const scope=book.chapters[Math.max(0,maxSection-1)]?.toPage||1;
    const tokens=tidy(query).toLowerCase().match(/[a-z0-9]{3,}/g)?.filter(t=>!prohibited.has(t))||[];
    if (!tokens.length) return [];
    const results=[];
    for(const {page,text} of book.pages) {
      if(page>scope||!text)continue;
      const lower=text.toLowerCase();
      let best=-1,score=0;
      for(const token of tokens) {const i=lower.indexOf(token);if(i>=0){score++;if(best<0||i<best)best=i;}}
      if(score>0) results.push({page,score,quote:excerpt(text,best,280),chapter:Math.ceil(page/Math.max(1,Math.ceil(book.pages.length/MAX_CHUNKS)))});
    }
    return results.sort((a,b)=>b.score-a.score||a.page-b.page).slice(0,limit);
  }
  root.BTL_LOCAL_ENGINE={build,findPassages,likelyName};
})(typeof window!=='undefined' ? window : globalThis);
