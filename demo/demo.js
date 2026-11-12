'use strict';
(() => {
  const stories = window.BTL_DEMO_STORIES;
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const roman = ['I','II','III','IV','V','VI','VII'];
  const themes = new Set(['porcelain','graphite','warm-paper','pine','sage','night-sky','frost','deep-sea','sea-glass','amethyst']);
  const stopwords = new Set('the and from about does what where which after before this that with they them their have has had into than when what who why was were are for her his how did does can will would could should said tell there here its you our she him more one two any both does did who why where'.split(' '));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const stored = (()=>{try { return JSON.parse(localStorage.getItem('btl.public.demo.v1') || '{}'); } catch {return {};}})();
  const state = {
    storyId: stories.some(s=>s.id===stored.storyId) ? stored.storyId : stories[0].id,
    progress: Object.fromEntries(stories.map(s=>[s.id, Math.max(1, Math.min(s.chapters.length, Number.isInteger(stored.progress?.[s.id]) ? stored.progress[s.id] : 1))])),
    view:'library', theme: themes.has(stored.theme) ? stored.theme : 'porcelain',
    person:null, query:'', answer:null, highlight:null
  };
  const viewTitles = {
    library:['YOUR PERSONAL LIBRARY','A place for every story.','Pick up a book. The demo remembers where you stop in this browser.'],
    story:['THE STORY, SO FAR','Turn the page, at your pace.','Read only through your selected stopping point. Future source passages stay hidden.'],
    people:['NAMES AND APPEARANCES','Know who you’ve met.','Character notes are limited to the chapters you have completed.'],
    relationships:['CHRONOLOGICAL EVIDENCE','Trace the connections.','Observed conversations are not automatically family ties or confirmed motives.'],
    evidence:['THE EVIDENCE DESK','Ask the source.','Explore prepared source-linked answers, or search the original sample passages.']
  };
  function story(){return stories.find(s=>s.id===state.storyId);}
  function progress(){return state.progress[state.storyId];}
  function persist(){try{localStorage.setItem('btl.public.demo.v1', JSON.stringify({storyId:state.storyId,progress:state.progress,theme:state.theme}));}catch{}}
  function fmtChapter(n){return `CHAPTER ${roman[n-1] || n}`;}
  function setTheme(t){if(!themes.has(t)) return; state.theme=t;document.documentElement.dataset.theme=t; qs('#theme-select').value=t;persist();}
  function openStory(id){if(!stories.some(s=>s.id===id))return;state.storyId=id;state.person=null;state.answer=null;state.highlight=null;persist();navigate('story');}
  function navigate(v,focusTitle=false){if(!viewTitles[v])return;state.view=v;state.highlight=null;render();if(focusTitle){qs('#page-title').focus();}}
  function changeProgress(n){const s=story();if(!Number.isInteger(n)||n<1||n>s.chapters.length)return;state.progress[s.id]=n; state.answer=null;persist();render();}
  function render(){
    const s=story(),p=progress();const [eyebrow,title,sub]=viewTitles[state.view];
    qs('#page-eyebrow').textContent=eyebrow;
    qs('#page-title').textContent=title;
    qs('#page-description').textContent=sub;
    qs('#progress-summary').innerHTML=`<span class="summary-icon" aria-hidden="true">${p}/${s.chapters.length}</span><span><strong>${esc(s.title)}</strong><small>Completed chapters: ${p} of ${s.chapters.length}</small></span>`;
    for(const btn of qsa('[data-view].nav-item')){
      const selected=btn.dataset.view===state.view;
      btn.classList.toggle('active',selected);
      if(selected)btn.setAttribute('aria-current','page');else btn.removeAttribute('aria-current');
    }
    qs('#view-content').innerHTML=(
      state.view==='library' ? renderLibrary() : state.view==='story' ? renderStory() :
      state.view==='people' ? renderPeople() : state.view==='relationships' ? renderRelationships() : renderEvidence()
    );
    if(state.view==='story'&&state.highlight){const node=qs(`#chapter-${state.highlight}`);if(node){node.classList.add('focused-source');node.scrollIntoView({block:'nearest',behavior:'auto'});}}
  }
  function renderLibrary(){return `<section aria-label="Sample shelf" class="library-scene"><div class="section-label"><span>01 — YOUR SHELF</span><span>2 ORIGINAL STORIES</span></div>
    <div class="book-grid">${stories.map(s=>{
      const p=state.progress[s.id];return `<article class="book-card">
       <div class="book-cover ${s.coverClass}" aria-label="Illustrated typographic cover for ${esc(s.title)}"><div class="cover-top">BETWEEN THE LINES / FICTION</div><div class="cover-symbol" aria-hidden="true">${s.id==='archive'?'⌘':'✳'}</div><div class="cover-name">${esc(s.coverLabel).replace(/\n/g,'<br>')}</div><div class="cover-bottom">AN ORIGINAL DEMONSTRATION STORY</div></div>
       <div class="book-info"><p class="tiny-label">${esc(s.genre)}</p><h2>${esc(s.title)}</h2><p>${esc(s.subtitle)}</p>
       <div class="book-progress"><span>${p} of ${s.chapters.length} chapters</span><span>${Math.round(p/s.chapters.length*100)}% explored</span></div><div class="meter"><span class="meter-level-${p}"></span></div>
       <button class="button-primary" data-open-story="${s.id}">Explore this story <span aria-hidden="true">→</span></button></div></article>`;
    }).join('')}</div><div class="library-essay"><div><p class="tiny-label">THE READER’S AGREEMENT</p><h2>Nothing from the next chapter.</h2></div><p>Advance the stopping point when you choose. Names, conversations, and source answers are built from only the passages you have opened. This original sample runs entirely inside your browser.</p></div></section>`;}
  function storyPicker(){return `<div class="story-selector"><label for="story-pick">Reading</label><select id="story-pick">${stories.map(s=>`<option value="${s.id}" ${s.id===state.storyId?'selected':''}>${esc(s.title)}</option>`).join('')}</select></div>`;}
  function progressControls(){const s=story(),p=progress();return `<div class="chapter-progress-widget"><div class="chapter-progress-title"><span>LAST COMPLETED CHAPTER</span><strong>${fmtChapter(p)} <span>/ ${s.chapters.length}</span></strong></div><div class="chapter-buttons" role="group" aria-label="Set reading progress">${s.chapters.map((c,i)=>`<button type="button" class="chapter-button ${i+1===p?'current':''} ${i+1<p?'finished':''}" aria-label="Mark through chapter ${i+1}" aria-pressed="${p===i+1}" data-set-progress="${i+1}">${roman[i]}</button>`).join('')}</div><div class="progress-arrows"><button class="button-outline" data-set-progress="${p-1}" ${p===1?'disabled':''}>← Earlier point</button><button class="button-primary" data-set-progress="${p+1}" ${p===s.chapters.length?'disabled':''}>Finish next chapter →</button></div></div>`;}
  function renderStory(){const s=story(),p=progress();return `<section aria-label="Story guide"><div class="reading-header"><div><p class="tiny-label">READING NOW / ${esc(s.genre)}</p><h2>${esc(s.title)}</h2><p>${esc(s.subtitle)}</p></div>${storyPicker()}</div>${progressControls()}<div class="section-label"><span>VERIFIED FROM THE SOURCE</span><span>CHAPTERS THROUGH ${roman[p-1]}</span></div><div class="chapter-feed">${s.chapters.map((c,i)=>i<p?`<article id="chapter-${i+1}" class="chapter-open"><div class="chapter-stamp"><span>${roman[i]}</span><small>READ</small></div><div class="chapter-copy"><p class="tiny-label">${fmtChapter(i+1)}</p><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p><div class="chapter-bottom">${s.evidence.filter(e=>e.chapter===i+1).length} source-linked observations · <button class="text-button" data-view-inline="evidence">See evidence →</button></div></div></article>`:`<article class="chapter-locked" aria-label="Chapter ${i+1} is unavailable"><div class="chapter-stamp"><span>${roman[i]}</span><small>LOCKED</small></div><div><span class="locked-heading">Chapter ${roman[i]}</span><p>This chapter’s title, text, characters and clues stay hidden.</p></div><span class="lock-badge" aria-hidden="true">✳</span></article>`).join('')}</div><div class="bottom-note">Only the chapters you choose to finish are used by the Characters, Relationships and Ask the source sections.</div></section>`;}
  function sourceCard(e,mini=false){return `<article class="source-card ${mini?'source-mini':''}"><div class="source-card-top"><span class="tiny-label">${fmtChapter(e.chapter)} · ${esc(e.category)}</span><span class="status-chip ${e.status==='Reported by a character'?'reported':''}">${esc(e.status)}</span></div><h3>${esc(e.headline)}</h3><p>${esc(e.note)}</p><blockquote>${esc(e.quote)}</blockquote><button class="button-outline source-jump" data-source-chapter="${e.chapter}">Read the original chapter ↗</button></article>`;}
  function renderPeople(){const s=story(),p=progress(),visible=s.people.filter(c=>c.first<=p);const sel=visible.find(c=>c.id===state.person)||visible[0];state.person=sel?.id;
    return `<section aria-label="Characters"><div class="workspace-header"><div><p class="tiny-label">SOURCE FIRST / ${esc(s.title)}</p><h2>${visible.length} people in your completed chapters</h2><p>Descriptions never claim details from unopened chapters.</p></div>${storyPicker()}</div><div class="people-layout"><div class="people-list"><div class="section-label"><span>CHARACTER INDEX</span><span>${visible.length} RECORDS</span></div>${visible.map(c=>`<button type="button" class="person-row ${sel.id===c.id?'selected':''}" aria-pressed="${sel.id===c.id}" data-person="${c.id}"><span class="person-monogram">${esc(c.name.split(' ').map(x=>x[0]).join(''))}</span><span><strong>${esc(c.name)}</strong><small>First noted: ${fmtChapter(c.first)}</small></span><span aria-hidden="true">→</span></button>`).join('')}</div>
    <div class="person-detail"><p class="tiny-label">CHARACTER DOSSIER / EVIDENCE VISIBLE</p><h2>${esc(sel.name)}</h2><span class="character-role">${esc(sel.role)}</span><p class="character-description">${esc(sel.description)}</p><div class="section-label"><span>SOURCE-LINKED APPEARANCES</span><span>${s.evidence.filter(e=>e.chapter<=p&&e.people.includes(sel.id)).length} ENTRIES</span></div><div class="sources-stack">${s.evidence.filter(e=>e.chapter<=p&&e.people.includes(sel.id)).map(e=>sourceCard(e,true)).join('')||'<p class="empty-note">No source observations yet.</p>'}</div></div></div></section>`;}
  function renderRelationships(){const s=story(),p=progress(),rel=s.evidence.filter(e=>e.chapter<=p&&(e.category==='Relationship'||e.category==='Interaction'));
    const pairs=new Map();for(const e of rel){let key=[...e.people].sort().join('~');let item=pairs.get(key)||[];item.push(e);pairs.set(key,item);}
    return `<section aria-label="Relationship evidence"><div class="workspace-header"><div><p class="tiny-label">FROM NARRATED TEXT, NOT ASSUMPTION</p><h2>People in context.</h2><p>Chronological notes distinguish directly stated family ties from interactions and reported claims.</p></div>${storyPicker()}</div><div class="relationship-explainer"><span aria-hidden="true">◇</span><p><strong>Not every conversation is a relationship.</strong> The app records who interacted and where the evidence appears. It doesn't infer friendship, love, or motivation just because people share a scene.</p></div>${pairs.size?Array.from(pairs.entries()).map(([k,entries])=>{
      const names=k.split('~').map(id=>s.people.find(c=>c.id===id)?.name||id);
      return `<article class="relationship-group"><div class="relationship-heading"><p class="tiny-label">A SOURCE-LINKED CONNECTION</p><h3>${names.map(esc).join('<span class="pair-symbol"> ↔ </span>')}</h3><span>${entries.length} evidence ${entries.length===1?'entry':'entries'}</span></div><div class="relationship-timeline">${entries.map(e=>sourceCard(e,true)).join('')}</div></article>`;
    }).join(''):`<div class="empty-state"><div aria-hidden="true">◇</div><h3>No observed relationships yet.</h3><p>Only completed chapters count. The source may not have introduced a direct connection yet.</p></div>`}<div class="bottom-note">Nothing here is generated by a live AI model. The status labels preserve the distinction between an action, a report, and a verified relationship.</div></section>`;}
  function renderEvidence(){const s=story(),p=progress(),qsample=s.qa.slice(0,4);
    const previous=state.answer;
    let answerHtml='<div class="answer-idle"><div class="answer-glyph" aria-hidden="true">✳</div><h3>An answer begins with a passage.</h3><p>Ask about a character, object or event in the sample. We’ll show source evidence where the completed chapters support it, and say when they don’t.</p></div>';
    if(previous){answerHtml=previous.mode==='hidden'?`<div class="answer-content"><span class="answer-status unknown-status">NOT ESTABLISHED YET</span><h3>Beyond your current stopping point</h3><p>${esc(previous.text)}</p><div class="bottom-note">Nothing from unopened chapters is revealed.</div></div>`: previous.mode==='none'?`<div class="answer-content"><span class="answer-status unknown-status">NO VERIFIED ANSWER</span><h3>Not established by the available passages</h3><p>${esc(previous.text)}</p></div>`:`<div class="answer-content"><span class="answer-status">${previous.mode==='match'?'PASSAGE MATCH · NOT A VERIFIED ANSWER':'SUPPORTED BY THE SOURCE'}</span><h3>${esc(previous.heading)}</h3><p>${esc(previous.text)}</p><div class="quote-evidence"><span>${fmtChapter(previous.e.chapter)} · ORIGINAL EXCERPT</span><blockquote>${esc(previous.e.quote)}</blockquote><button class="button-outline" data-source-chapter="${previous.e.chapter}">Open source passage ↗</button></div></div>`;}
    return `<section aria-label="Ask the source"><div class="workspace-header"><div><p class="tiny-label">NO BLACK-BOX ASSERTIONS</p><h2>The evidence desk.</h2><p>Try a question below. The sample uses authored answers and a literal passage search, not an AI service.</p></div>${storyPicker()}</div>
    <div class="ask-layout"><div class="ask-left"><div class="ask-card"><div class="section-label"><span>ASK A QUESTION</span><span>THROUGH ${fmtChapter(p)}</span></div><form id="ask-form"><label for="question-input">What would you like to know?</label><textarea id="question-input" maxlength="350" rows="3" placeholder="For example: Who found the key?" required>${esc(state.query)}</textarea><button type="submit" class="button-primary">Find source evidence <span aria-hidden="true">→</span></button></form></div><div class="prompt-card"><p class="tiny-label">TRY THESE QUESTIONS</p>${qsample.map(q=>`<button data-question="${q.id}" class="prompt-button">${esc(q.prompt)}<span aria-hidden="true">↗</span></button>`).join('')}</div></div><div class="answer-pane" role="status" aria-live="polite">${answerHtml}</div></div><div class="section-label source-list-label"><span>ALL UNLOCKED SOURCE OBSERVATIONS</span><span>${s.evidence.filter(e=>e.chapter<=p).length} RECORDS</span></div><div class="evidence-list">${s.evidence.filter(e=>e.chapter<=p).map(e=>sourceCard(e,true)).join('')}</div></section>`;}
  function answerQuestion(query){state.query=query;const s=story(),p=progress();const normal=query.toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();if(!normal){state.answer=null;render();return;}
    let match=s.qa.find(q=>q.prompt.toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()===normal);
    if(!match){const tokens=normal.split(' ').filter(t=>t.length>2&&!stopwords.has(t));const ranked=s.qa.map(q=>({q,score:q.matches.reduce((a,m)=>a+(tokens.includes(m)?(['hid','disappear','related','sister','open','cabinet','signed','train','minutes','fast'].includes(m)?5:2):0),0)})).sort((a,b)=>b.score-a.score);if(ranked[0]?.score>=2)match=ranked[0].q;}
    if(match){if(match.chapter>p){state.answer={mode:'hidden',text:'Your completed chapters do not support an answer to this question yet. You can advance your reading progress when you decide to.'};}
      else {const e=s.evidence.find(x=>x.id===match.evidence&&x.chapter<=p); state.answer=e?{mode:'verified',heading:match.prompt,text:match.answer,e}:{mode:'none',text:'No linked source passage is available for that answer.'};}
    }else{
      const tokens=normal.split(' ').filter(t=>t.length>=4&&!stopwords.has(t));const indexed=s.evidence.filter(e=>e.chapter<=p).map(e=>({e,score:tokens.reduce((n,t)=>n+((e.quote+' '+e.headline+' '+e.note).toLowerCase().includes(t)?1:0),0)})).sort((a,b)=>b.score-a.score);
      if(tokens.length&&indexed[0]?.score>=Math.min(2,tokens.length))state.answer={mode:'match',heading:'Closest literal passage',text:'This is a search match, not a verified answer. Read the excerpt and decide whether it addresses your question.',e:indexed[0].e};
      else state.answer={mode:'none',text:'The completed sample passages do not establish an answer. Try one of the suggested questions, or use a person or object name in your search.'};
    }
    render();const el=qs('#question-input');if(el){el.focus();const pane=qs('.answer-pane');if(pane)pane.scrollIntoView({block:'nearest',behavior:'auto'});}
  }
  function toast(t){const el=qs('#toast');el.textContent=t;el.classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('visible'),3000);}
  qsa('.nav-item').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.view,true)));
  qs('#theme-select').addEventListener('change',e=>{setTheme(e.target.value);toast('Room appearance updated');});
  qs('#reset-demo').addEventListener('click',()=>{
    if(!window.confirm('Reset the sample stories to chapter 1 and restore the default appearance?'))return;
    for(const s of stories)state.progress[s.id]=1;state.storyId=stories[0].id;state.person=null;state.answer=null;state.query='';setTheme('porcelain');persist();navigate('library',true);toast('Demo reading progress reset');
  });
  qs('#view-content').addEventListener('change',ev=>{if(ev.target.id==='story-pick')openStory(ev.target.value);});
  qs('#view-content').addEventListener('submit',ev=>{if(ev.target.id!=='ask-form')return;ev.preventDefault();const input=qs('#question-input');if(input)answerQuestion(input.value.trim());});
  qs('#view-content').addEventListener('click',ev=>{
    const btn=ev.target.closest('button');if(!btn)return;
    if(btn.dataset.openStory){openStory(btn.dataset.openStory);return;}
    if(btn.dataset.viewInline){navigate(btn.dataset.viewInline,true);return;}
    if(btn.dataset.setProgress){changeProgress(Number(btn.dataset.setProgress));return;}
    if(btn.dataset.person){state.person=btn.dataset.person;render();return;}
    if(btn.dataset.question){const q=story().qa.find(q=>q.id===btn.dataset.question);if(q)answerQuestion(q.prompt);return;}
    if(btn.dataset.sourceChapter){const c=Number(btn.dataset.sourceChapter);state.view='story';render();const el=qs(`#chapter-${c}`);if(el){el.classList.add('focused-source');el.scrollIntoView({block:'center',behavior:'smooth'});el.setAttribute('tabindex','-1');el.focus({preventScroll:true});}return;}
  });
  qs('#page-title').setAttribute('tabindex','-1');
  setTheme(state.theme);render();
})();
