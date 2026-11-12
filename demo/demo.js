'use strict';
(() => {
  const stories = [...window.BTL_DEMO_STORIES];
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
    view:'library', localExpanded:false, importing:false, importMessage:'', theme: themes.has(stored.theme) && stored.themeVersion===2 ? stored.theme : 'amethyst',
    person:null, query:'', answer:null, highlight:null
  };
  const themeNames=[['amethyst','Amethyst','Signature reading room','#29233a','#f0c994'],['graphite','Graphite','Calm dark neutrals','#20252a','#bad1e0'],['porcelain','Porcelain','Quiet and bright','#f7f9fb','#35546a'],['warm-paper','Warm Paper','Warm archival pages','#f2ebdd','#4b6172'],['pine','Pine','Deep forest','#222e27','#b9d2b2'],['sage','Sage','Light woodland','#e6f0e6','#365f48'],['night-sky','Night Sky','Ink blue','#1b2941','#b0c9f3'],['frost','Frost','Cool daylight','#e8f0fa','#315d93'],['deep-sea','Deep Sea','Dark ocean','#1b3339','#91e0d8'],['sea-glass','Sea Glass','Coastal quiet','#e0f1ef','#1b6972']];
  const viewTitles = {
    library:['BETWEEN THE LINES / YOUR LIBRARY','Your story, so far.','Import a real document. Read, search and track your place without uploading it to a server.'],
    story:['THE STORY, SO FAR','Turn the page, at your pace.','Read only through your selected stopping point. Future source passages stay hidden.'],
    people:['NAMES AND APPEARANCES','Know who you’ve met.','Character notes are limited to the chapters you have completed.'],
    relationships:['CHRONOLOGICAL EVIDENCE','Trace the connections.','Observed conversations are not automatically family ties or confirmed motives.'],
    evidence:['THE EVIDENCE DESK','Ask the source.','Explore prepared source-linked answers, or search the original sample passages.'],
    events:['THE STORY FILE','Events, with evidence.','See documented developments through your reading point.'],
    places:['THE STORY FILE','Places in context.','Find locations mentioned in passages you have reached.'],
    objects:['THE STORY FILE','Objects and clues.','Follow objects from the actual source without invented significance.'],
    recap:['YOUR READING CHECKPOINT','Your story so far.','A source-based reading checkpoint, not an AI-generated plot summary.']
  };
  function story(){return stories.find(s=>s.id===state.storyId);}
  function progress(){return state.progress[state.storyId];}
  function persist(){try{localStorage.setItem('btl.public.demo.v1', JSON.stringify({storyId:state.storyId,progress:state.progress,theme:state.theme,themeVersion:2}));}catch{}}
  function fmtChapter(n){return `CHAPTER ${roman[n-1] || n}`;}
  function sectionLabel(n){return story().local?`SECTION ${n}`:fmtChapter(n);}
  function setTheme(t){if(!themes.has(t)) return; state.theme=t;document.documentElement.dataset.theme=t; qs('#theme-select').value=t;persist();const options=qs('#theme-options');if(options)for(const b of qsa('[data-theme-choice]',options))b.setAttribute('aria-pressed',b.dataset.themeChoice===t?'true':'false');}
  function openStory(id){if(!stories.some(s=>s.id===id))return;state.storyId=id;state.person=null;state.answer=null;state.highlight=null;persist();navigate('story');}
  function navigate(v,focusTitle=false){if(!viewTitles[v])return;state.view=v;state.highlight=null;render();if(focusTitle){qs('#page-title').focus();}}
  function changeProgress(n){const s=story();if(!Number.isInteger(n)||n<1||n>s.chapters.length)return;state.progress[s.id]=n; state.answer=null;state.localExpanded=false;persist();render();}
  const readingTabs=[['story','Overview'],['people','Characters'],['events','Events'],['places','Places'],['objects','Objects'],['relationships','Relationships'],['recap','Recap'],['evidence','Sources']];
  let readerSize=100;
  function renderSidebar(){
    const s=story(), p=progress(), el=qs('#sidebar-book-panel'); if(!el)return;
    el.innerHTML=`<label for="sidebar-story">Selected title</label><select id="sidebar-story">${stories.map(b=>`<option value="${esc(b.id)}" ${b.id===s.id?'selected':''}>${esc(b.title)}</option>`).join('')}</select><div class="sidebar-selected"><span>${s.local?'YOUR PRIVATE DOCUMENT':'CURATED DEMO GUIDE'}</span><strong>${esc(s.title)}</strong><small>${s.local?`${s.pages.length} original PDF pages`:`${s.chapters.length} sample chapters`}</small></div><label for="sidebar-position">Last ${s.local?'section':'chapter'} completed</label><select id="sidebar-position">${s.chapters.map((c,i)=>`<option value="${i+1}" ${i+1===p?'selected':''}>${s.local?'Section':'Chapter'} ${i+1}</option>`).join('')}</select><p class="sidebar-hint">Only source material through your selected reading point is available.</p><button type="button" class="sidebar-open" data-sidebar-read>Open my compendium →</button><button type="button" class="sidebar-secondary" data-sidebar-import>Upload a book (PDF or TXT) ↑</button>`;
  }
  function renderGuideTabs(){
    const el=qs('#workspace-tabs');if(!el)return;
    el.hidden=state.view==='library';
    if(el.hidden){el.innerHTML='';return;}
    const s=story(),p=progress();
    el.innerHTML=readingTabs.map(([view,label])=>{const count=view==='people'?s.people.filter(x=>x.first<=p).length:
      view==='events'?s.evidence.filter(x=>x.category==='Event'&&x.chapter<=p).length:
      view==='objects'?s.evidence.filter(x=>x.category==='Object'&&x.chapter<=p).length:
      view==='places'?s.evidence.filter(x=>x.category==='Place'&&x.chapter<=p).length:
      view==='relationships'?s.evidence.filter(x=>(x.category==='Relationship'||x.category==='Interaction')&&x.chapter<=p).length:null;
      return `<button type="button" data-guide-view="${view}" class="guide-tab ${state.view===view?'current':''}" ${state.view===view?'aria-current="page"':''}>${label}${count!==null?` <span>${count}</span>`:''}</button>`}).join('');
  }
  function render(){
    const s=story(),p=progress();const [eyebrow,title,sub]=viewTitles[state.view];
    qs('#page-eyebrow').textContent=eyebrow;
    qs('#page-title').textContent=title;
    qs('#page-description').textContent=sub;
    qs('#progress-summary').innerHTML=`<span class="summary-icon" aria-hidden="true">${p}/${s.chapters.length}</span><span><strong>${esc(s.title)}</strong><small>${s.local?'Pages available through section':'Completed chapters:'} ${p} of ${s.chapters.length}</small></span>`;
    for(const btn of qsa('[data-top-view]')){const active=btn.dataset.topView===state.view;btn.classList.toggle('active',active);if(active)btn.setAttribute('aria-current','page');else btn.removeAttribute('aria-current');}
    for(const btn of qsa('[data-view].nav-item')){
      const selected=btn.dataset.view===state.view;
      btn.classList.toggle('active',selected);
      if(selected)btn.setAttribute('aria-current','page');else btn.removeAttribute('aria-current');
    }
    renderSidebar();renderGuideTabs();
    qs('#view-content').innerHTML=(
      state.view==='library' ? renderLibrary() : state.view==='story' ? renderStory() :
      state.view==='people' ? renderPeople() : state.view==='relationships' ? renderRelationships() :
      state.view==='events'||state.view==='places'||state.view==='objects' ? renderStoryCategory(state.view) :
      state.view==='recap' ? renderRecap() : renderEvidence()
    );
    if(state.view==='story'&&state.highlight){const node=qs(`#chapter-${state.highlight}`);if(node){node.classList.add('focused-source');node.scrollIntoView({block:'nearest',behavior:'auto'});}}
  }
  function renderLibrary() {
    const local=stories.filter(s=>s.local);
    const sample=stories.filter(s=>!s.local);
    const cards=sample.map(s=>`<button type="button" class="sample-tile" data-open-story="${s.id}"><span class="sample-book-glyph" aria-hidden="true">${s.id==='archive'?'A':'O'}</span><span><small>${esc(s.genre)}</small><strong>${esc(s.title)}</strong><em>${esc(s.subtitle)}</em></span><span aria-hidden="true">↗</span></button>`).join('');
    return `<section aria-label="Your reading library" class="library-scene">
      <div class="import-hero"><div class="import-hero-copy"><p class="tiny-label">THE REAL WORKSPACE · PRIVATE BROWSER EDITION</p><h2>Bring your own <em>story.</em></h2><p class="import-lead">Choose a PDF from your computer. Read it, find passages, follow your place, and review evidence inside a proper library. No demo account and no connection to anyone's home server.</p>
      <div class="import-actions"><input id="book-upload" type="file" accept=".pdf,.txt,application/pdf,text/plain" aria-label="Import a PDF or text document" hidden><button type="button" class="button-primary import-button" data-import-trigger>Import PDF or text <span aria-hidden="true">↗</span></button><span class="file-limit">Up to 40 MB · Selectable text only</span></div>
      <p class="import-privacy">Your document is processed locally, stays in this browser tab, and disappears when you close or refresh it. Nothing gets sent to Aang, Korra, or an AI service.</p><div id="import-status" class="import-status" role="status" aria-live="polite">${esc(state.importMessage)}</div></div>
      <div class="import-preview" aria-label="Screenshot of the private Between the Lines reader"><div class="real-product-shot"><div class="shot-bar"><span class="shot-indicator"></span> INSIDE THE PRIVATE APPLICATION</div><img src="../assets/app-reader.webp" alt="Actual private Between the Lines reading room with chapter controls and source reference tabs" loading="lazy"><div class="shot-caption">The real reader, reimagined for the browser with local files</div></div></div></div>
      ${local.length?`<div class="section-label"><span>YOUR PRIVATE DOCUMENTS</span><span>${local.length} OPEN IN THIS TAB</span></div><div class="imported-shelf">${local.map(b=>`<article class="imported-card"><div class="imported-cover" aria-hidden="true"><span>BTL</span><strong>${esc(b.title.slice(0,36))}</strong><small>PRIVATE PDF</small></div><div><p class="tiny-label">LOCALLY IMPORTED · ${b.pages.length} PAGES</p><h3>${esc(b.title)}</h3><p>Searchable text, an indexed reading place and source-linked name suggestions.</p><button class="button-primary" data-open-story="${b.id}">Continue reading <span aria-hidden="true">→</span></button></div></article>`).join('')}</div>`:''}
      <div class="feature-pulse"><div><span class="feature-symbol">01</span><h3>A real document</h3><p>Use your own PDF rather than being stuck with two artificial sample stories.</p></div><div><span class="feature-symbol">02</span><h3>Your place, protected</h3><p>Keep later sections behind your chosen reading progress.</p></div><div><span class="feature-symbol">03</span><h3>Verify every claim</h3><p>Search exact passages and review suggestions instead of trusting invented facts.</p></div></div>
      <details class="sample-drawer"><summary>Prefer to explore without a PDF? <strong>Open sample stories</strong><span aria-hidden="true">＋</span></summary><div class="sample-list">${cards}</div><p class="sample-hint">The short original stories are optional. They demonstrate curated character and relationship examples; imported PDFs offer real-text reading and search without cloud AI.</p></details>
    </section>`;
  }
  function storyPicker(){return `<div class="story-selector"><label for="story-pick">Reading</label><select id="story-pick">${stories.map(s=>`<option value="${s.id}" ${s.id===state.storyId?'selected':''}>${esc(s.title)}</option>`).join('')}</select></div>`;}
  function progressControls(){const s=story(),p=progress();return `<div class="chapter-progress-widget"><div class="chapter-progress-title"><span>LAST COMPLETED CHAPTER</span><strong>${fmtChapter(p)} <span>/ ${s.chapters.length}</span></strong></div><div class="chapter-buttons" role="group" aria-label="Set reading progress">${s.chapters.map((c,i)=>`<button type="button" class="chapter-button ${i+1===p?'current':''} ${i+1<p?'finished':''}" aria-label="Mark through chapter ${i+1}" aria-pressed="${p===i+1}" data-set-progress="${i+1}">${roman[i]}</button>`).join('')}</div><div class="progress-arrows"><button class="button-outline" data-set-progress="${p-1}" ${p===1?'disabled':''}>← Earlier point</button><button class="button-primary" data-set-progress="${p+1}" ${p===s.chapters.length?'disabled':''}>Finish next chapter →</button></div></div>`;}
  function renderStory(){const s=story(),p=progress();if(s.local)return renderImportedStory(s,p);return `<section aria-label="Story guide"><div class="reading-header"><div><p class="tiny-label">READING NOW / ${esc(s.genre)}</p><h2>${esc(s.title)}</h2><p>${esc(s.subtitle)}</p></div>${storyPicker()}</div>${progressControls()}<div class="section-label"><span>VERIFIED FROM THE SOURCE</span><span>CHAPTERS THROUGH ${roman[p-1]}</span></div><div class="chapter-feed">${s.chapters.map((c,i)=>i<p?`<article id="chapter-${i+1}" class="chapter-open"><div class="chapter-stamp"><span>${roman[i]}</span><small>READ</small></div><div class="chapter-copy"><p class="tiny-label">${fmtChapter(i+1)}</p><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p><div class="chapter-bottom">${s.evidence.filter(e=>e.chapter===i+1).length} source-linked observations · <button class="text-button" data-view-inline="evidence">See evidence →</button></div></div></article>`:`<article class="chapter-locked" aria-label="Chapter ${i+1} is unavailable"><div class="chapter-stamp"><span>${roman[i]}</span><small>LOCKED</small></div><div><span class="locked-heading">Chapter ${roman[i]}</span><p>This chapter’s title, text, characters and clues stay hidden.</p></div><span class="lock-badge" aria-hidden="true">✳</span></article>`).join('')}</div><div class="bottom-note">Only the chapters you choose to finish are used by the Characters, Relationships and Ask the source sections.</div></section>`;}
  function sourceCard(e,mini=false){return `<article class="source-card ${mini?'source-mini':''}"><div class="source-card-top"><span class="tiny-label">${fmtChapter(e.chapter)} · ${esc(e.category)}</span><span class="status-chip ${e.status==='Reported by a character'?'reported':''}">${esc(e.status)}</span></div><h3>${esc(e.headline)}</h3><p>${esc(e.note)}</p><blockquote>${esc(e.quote)}</blockquote><button class="button-outline source-jump" data-source-chapter="${e.chapter}">Read the original chapter ↗</button></article>`;}
  function renderPeople(){const s=story(),p=progress();if(s.local)return renderImportedPeople(s,p);const visible=s.people.filter(c=>c.first<=p);const sel=visible.find(c=>c.id===state.person)||visible[0];state.person=sel?.id;
    return `<section aria-label="Characters"><div class="workspace-header"><div><p class="tiny-label">SOURCE FIRST / ${esc(s.title)}</p><h2>${visible.length} people in your completed chapters</h2><p>Descriptions never claim details from unopened chapters.</p></div>${storyPicker()}</div><div class="people-layout"><div class="people-list"><div class="section-label"><span>CHARACTER INDEX</span><span>${visible.length} RECORDS</span></div>${visible.map(c=>`<button type="button" class="person-row ${sel.id===c.id?'selected':''}" aria-pressed="${sel.id===c.id}" data-person="${c.id}"><span class="person-monogram">${esc(c.name.split(' ').map(x=>x[0]).join(''))}</span><span><strong>${esc(c.name)}</strong><small>First noted: ${fmtChapter(c.first)}</small></span><span aria-hidden="true">→</span></button>`).join('')}</div>
    <div class="person-detail"><p class="tiny-label">CHARACTER DOSSIER / EVIDENCE VISIBLE</p><h2>${esc(sel.name)}</h2><span class="character-role">${esc(sel.role)}</span><p class="character-description">${esc(sel.description)}</p><div class="section-label"><span>SOURCE-LINKED APPEARANCES</span><span>${s.evidence.filter(e=>e.chapter<=p&&e.people.includes(sel.id)).length} ENTRIES</span></div><div class="sources-stack">${s.evidence.filter(e=>e.chapter<=p&&e.people.includes(sel.id)).map(e=>sourceCard(e,true)).join('')||'<p class="empty-note">No source observations yet.</p>'}</div></div></div></section>`;}
  function renderRelationships(){const s=story(),p=progress();if(s.local)return renderImportedRelationships(s,p);const rel=s.evidence.filter(e=>e.chapter<=p&&(e.category==='Relationship'||e.category==='Interaction'));
    const pairs=new Map();for(const e of rel){let key=[...e.people].sort().join('~');let item=pairs.get(key)||[];item.push(e);pairs.set(key,item);}
    return `<section aria-label="Relationship evidence"><div class="workspace-header"><div><p class="tiny-label">FROM NARRATED TEXT, NOT ASSUMPTION</p><h2>People in context.</h2><p>Chronological notes distinguish directly stated family ties from interactions and reported claims.</p></div>${storyPicker()}</div><div class="relationship-explainer"><span aria-hidden="true">◇</span><p><strong>Not every conversation is a relationship.</strong> The app records who interacted and where the evidence appears. It doesn't infer friendship, love, or motivation just because people share a scene.</p></div>${pairs.size?Array.from(pairs.entries()).map(([k,entries])=>{
      const names=k.split('~').map(id=>s.people.find(c=>c.id===id)?.name||id);
      return `<article class="relationship-group"><div class="relationship-heading"><p class="tiny-label">A SOURCE-LINKED CONNECTION</p><h3>${names.map(esc).join('<span class="pair-symbol"> ↔ </span>')}</h3><span>${entries.length} evidence ${entries.length===1?'entry':'entries'}</span></div><div class="relationship-timeline">${entries.map(e=>sourceCard(e,true)).join('')}</div></article>`;
    }).join(''):`<div class="empty-state"><div aria-hidden="true">◇</div><h3>No observed relationships yet.</h3><p>Only completed chapters count. The source may not have introduced a direct connection yet.</p></div>`}<div class="bottom-note">Nothing here is generated by a live AI model. The status labels preserve the distinction between an action, a report, and a verified relationship.</div></section>`;}
  function renderEvidence(){const s=story(),p=progress();if(s.local)return renderImportedEvidence(s,p);const qsample=s.qa.slice(0,4);
    const previous=state.answer;
    let answerHtml='<div class="answer-idle"><div class="answer-glyph" aria-hidden="true">✳</div><h3>An answer begins with a passage.</h3><p>Ask about a character, object or event in the sample. We’ll show source evidence where the completed chapters support it, and say when they don’t.</p></div>';
    if(previous){answerHtml=previous.mode==='hidden'?`<div class="answer-content"><span class="answer-status unknown-status">NOT ESTABLISHED YET</span><h3>Beyond your current stopping point</h3><p>${esc(previous.text)}</p><div class="bottom-note">Nothing from unopened chapters is revealed.</div></div>`: previous.mode==='none'?`<div class="answer-content"><span class="answer-status unknown-status">NO VERIFIED ANSWER</span><h3>Not established by the available passages</h3><p>${esc(previous.text)}</p></div>`:`<div class="answer-content"><span class="answer-status">${previous.mode==='match'?'PASSAGE MATCH · NOT A VERIFIED ANSWER':'SUPPORTED BY THE SOURCE'}</span><h3>${esc(previous.heading)}</h3><p>${esc(previous.text)}</p><div class="quote-evidence"><span>${fmtChapter(previous.e.chapter)} · ORIGINAL EXCERPT</span><blockquote>${esc(previous.e.quote)}</blockquote><button class="button-outline" data-source-chapter="${previous.e.chapter}">Open source passage ↗</button></div></div>`;}
    return `<section aria-label="Ask the source"><div class="workspace-header"><div><p class="tiny-label">NO BLACK-BOX ASSERTIONS</p><h2>The evidence desk.</h2><p>Try a question below. The sample uses authored answers and a literal passage search, not an AI service.</p></div>${storyPicker()}</div>
    <div class="ask-layout"><div class="ask-left"><div class="ask-card"><div class="section-label"><span>ASK A QUESTION</span><span>THROUGH ${fmtChapter(p)}</span></div><form id="ask-form"><label for="question-input">What would you like to know?</label><textarea id="question-input" maxlength="350" rows="3" placeholder="For example: Who found the key?" required>${esc(state.query)}</textarea><button type="submit" class="button-primary">Find source evidence <span aria-hidden="true">→</span></button></form></div><div class="prompt-card"><p class="tiny-label">TRY THESE QUESTIONS</p>${qsample.map(q=>`<button data-question="${q.id}" class="prompt-button">${esc(q.prompt)}<span aria-hidden="true">↗</span></button>`).join('')}</div></div><div class="answer-pane" role="status" aria-live="polite">${answerHtml}</div></div><div class="section-label source-list-label"><span>ALL UNLOCKED SOURCE OBSERVATIONS</span><span>${s.evidence.filter(e=>e.chapter<=p).length} RECORDS</span></div><div class="evidence-list">${s.evidence.filter(e=>e.chapter<=p).map(e=>sourceCard(e,true)).join('')}</div></section>`;}
  function renderStoryCategory(view){
    const s=story(),p=progress(), kind={events:'Event',places:'Place',objects:'Object'}[view];
    const matches=s.evidence.filter(e=>e.category===kind&&e.chapter<=p);
    const label={events:'Events',places:'Places',objects:'Objects'}[view];
    const intro=s.local?'Your actual PDF is indexed for reading and literal search, but this browser edition cannot reliably infer these story facts. No invented cards are displayed.':`Documented ${label.toLowerCase()} from your unlocked chapters, with direct source links.`;
    return `<section class="evidence-category"><div class="workspace-header"><div><p class="tiny-label">THE READING ROOM / ${label.toUpperCase()}</p><h2>${label} in your story.</h2><p>${esc(intro)}</p></div>${storyPicker()}</div><div class="category-toolbar"><span>${matches.length} ${s.local?'verified browser discoveries':'sourced observations'}</span><button type="button" class="button-outline" data-view-inline="evidence">Search passages ↗</button></div>${matches.length?`<div class="evidence-list">${matches.map(e=>sourceCard(e)).join('')}</div>`:`<div class="empty-state"><div aria-hidden="true">✧</div><h3>No verified ${label.toLowerCase()} yet.</h3><p>${s.local?'Try searching a distinctive place, event or object name in the original pages. Search matches are never passed off as verified story facts.':'Advance your reading position to reveal more, or browse the source observations.'}</p><button type="button" class="button-primary" data-view-inline="evidence">Explore source passages →</button></div>`}</section>`;
  }
  function renderRecap(){
    const s=story(),p=progress();
    const evidence=s.evidence.filter(e=>e.chapter<=p);
    const cards=s.local?`<article class="recap-chapter"><span class="tiny-label">YOUR SOURCE · PAGE ${s.chapters[p-1].fromPage}</span><h3>${esc(s.chapters[p-1].title)}</h3><p>${esc((s.chapters[p-1].text||'').slice(0,560))}${s.chapters[p-1].text.length>560?'…':''}</p><button class="button-outline" data-view-inline="story">Read the original document →</button></article>`:evidence.slice(-5).reverse().map(e=>`<article class="recap-chapter"><span class="tiny-label">${fmtChapter(e.chapter)} · ${esc(e.status)}</span><h3>${esc(e.headline)}</h3><p>${esc(e.note)}</p><blockquote>${esc(e.quote)}</blockquote><button class="button-outline" data-source-chapter="${e.chapter}">View source →</button></article>`).join('');
    return `<section class="recap-section"><div class="workspace-header"><div><p class="tiny-label">YOUR STORY, SO FAR</p><h2>At your stopping point.</h2><p>${s.local?'The excerpt below is copied from your own PDF, not rewritten or analyzed by AI.':'A chronological set of authored, source-linked observations, not an AI-generated recap.'}</p></div>${storyPicker()}</div><div class="recap-status"><strong>${esc(s.title)}</strong><span>${p} / ${s.chapters.length} ${s.local?'sections':'chapters'} unlocked</span></div><div class="recap-grid">${cards}</div></section>`;
  }
  function renderImportedStory(s,p) {
    const section=s.chapters[p-1];
    const length=s.chapters.length;
    const text=state.localExpanded?section.text:section.text.slice(0,10000);
    return `<section aria-label="Imported document reader" class="imported-reader">
      <div class="reading-header"><div><p class="tiny-label">YOUR PRIVATE DOCUMENT / SOURCE TEXT</p><h2>${esc(s.title)}</h2><p>${s.pages.length} pages · processed on your device · no AI interpretation</p></div>${storyPicker()}</div>
      <div class="import-reader-toolbar"><div><label for="local-section">Reading position</label><select id="local-section">${s.chapters.map((c,i)=>`<option value="${i+1}" ${i+1===p?'selected':''}>Section ${i+1} · ${esc(c.title)}</option>`).join('')}</select></div><div class="progress-arrows"><button class="button-outline" data-set-progress="${p-1}" ${p===1?'disabled':''}>← Previous</button><button class="button-primary" data-set-progress="${p+1}" ${p===length?'disabled':''}>Next section →</button></div></div>
      <div class="import-reader-progress"><span>YOUR STOPPING POINT</span><strong>${p} of ${length} sections</strong><div class="import-progress-track"><span style="width:${Math.round(p/length*100)}%"></span></div></div>
      <article class="source-reading-page"><div class="source-reading-header"><div><p class="tiny-label">SECTION ${p} / DOCUMENT SOURCE</p><h3>${esc(section.title)}</h3></div><span>PDF TEXT</span></div><div class="source-reading-text">${esc(text)}</div>${!state.localExpanded&&section.text.length>10000?`<button type="button" class="button-outline read-more" data-expand-import>Read the rest of these pages ↓</button>`:''}<p class="source-reading-caption">Extracted text may lose complex layouts. This is source text from your file, not an AI-generated summary.</p></article>
      <div class="reader-next-actions"><button class="button-outline" data-view-inline="evidence">Search the source ↗</button><button class="button-primary" data-set-progress="${p+1}" ${p===length?'disabled':''}>Continue reading →</button></div>
    </section>`;
  }
  function renderImportedPeople(s,p) {
    const visible=s.people.filter(c=>c.first<=p);
    return `<section class="imported-analysis"><div class="workspace-header"><div><p class="tiny-label">REVIEW BEFORE TRUSTING</p><h2>Name suggestions, not invented biographies.</h2><p>These candidates come only from explicit family-language patterns in the uploaded text. They are not verified character identities.</p></div>${storyPicker()}</div><div class="review-note"><strong>${visible.length} name suggestion${visible.length===1?'':'s'} in your unlocked pages</strong><p>There is no cloud AI and no automatic identity merging. The original source wording appears below for you to judge.</p></div>${visible.length?`<div class="evidence-list">${s.evidence.filter(e=>e.chapter<=p).map(e=>sourceCard(e,true)).join('')}</div>`:`<div class="empty-state"><h3>No high-confidence suggestions yet.</h3><p>That's preferable to treating words like “So” or “Probably” as people. The source reader and passage search still work.</p></div>`}</section>`;
  }
  function renderImportedRelationships(s,p) {
    return `<section class="imported-analysis"><div class="workspace-header"><div><p class="tiny-label">EVIDENCE BEFORE INTERPRETATION</p><h2>Relationships need context.</h2><p>Your PDF is available for exploration. The browser demo does not generate unverified relationship graphs.</p></div>${storyPicker()}</div><div class="relationship-explainer"><span aria-hidden="true">◎</span><p><strong>Why is this intentionally conservative?</strong> The full application uses dedicated evidence checks and local AI. A lightweight browser parser cannot reliably distinguish a real relationship from a rumor or narrator's imagination.</p></div><button type="button" class="button-primary" data-view-inline="evidence">Search relationship passages ↗</button></section>`;
  }
  function renderImportedEvidence(s,p) {
    const previous=state.answer;
    const output=previous?.localResults?.length?`<div class="answer-content"><span class="answer-status">LITERAL SOURCE MATCHES · NOT AI ANSWERS</span><h3>Matching source passages</h3><p>These excerpts contain search terms. They do not by themselves establish the answer to your question.</p>${previous.localResults.map(e=>`<article class="source-card"><div class="source-card-top"><span class="tiny-label">PDF PAGE ${e.page}</span><span class="status-chip">SOURCE TEXT</span></div><blockquote>${esc(e.quote)}</blockquote><button type="button" class="button-outline source-jump" data-source-chapter="${e.chapter}">Open section ${e.chapter} →</button></article>`).join('')}</div>`:previous?`<div class="answer-idle"><h3>No matching text in your unlocked pages.</h3><p>Try a distinctive name or phrase, or advance your reading point. This is literal search, not semantic AI inference.</p></div>`:`<div class="answer-idle"><span class="answer-glyph">⌕</span><h3>Search the pages you have read.</h3><p>Search names, objects or events. Results cite the exact PDF page they came from.</p></div>`;
    return `<section class="imported-analysis"><div class="workspace-header"><div><p class="tiny-label">EXACT SOURCE / PRIVATE BROWSER SEARCH</p><h2>Ask the source.</h2><p>Search through PDF page ${s.chapters[p-1].toPage} of ${s.pages.length}. No questions or documents go to any server.</p></div>${storyPicker()}</div><div class="ask-layout"><div class="ask-card"><form id="ask-form"><label for="question-input">What would you like to find?</label><textarea id="question-input" maxlength="350" rows="3" placeholder="Example: Haymitch and Sid" required>${esc(state.query)}</textarea><button class="button-primary" type="submit">Search my PDF ↗</button></form><div class="bottom-note">Search results are not AI answers. The full app's Ollama analysis is intentionally unavailable on this public site.</div></div><div class="answer-pane" aria-live="polite">${output}</div></div></section>`;
  }
  function answerImportedQuestion(s,p,query) {
    const matches=window.BTL_LOCAL_ENGINE.findPassages(s,query,p);
    state.answer={localResults:matches};state.query=query;render();
  }
  async function importDocument(file) {
    if(!file)return;
    if(file.size>40*1024*1024){state.importMessage='File is over the 40 MB browser limit. Please choose a smaller PDF.';render();return;}
    if(!/\.(pdf|txt)$/i.test(file.name)){state.importMessage='Only PDF and plain text files are supported.';render();return;}
    state.importing=true;state.importMessage='Reading document locally…';render();
    try {
      let pages=[];
      if(/\.pdf$/i.test(file.name)) {
        const pdfjs=await import('./vendor/pdf.min.mjs');
        pdfjs.GlobalWorkerOptions.workerSrc=new URL('./vendor/pdf.worker.min.mjs',location.href).href;
        const bytes=new Uint8Array(await file.arrayBuffer());
        const task=pdfjs.getDocument({data:bytes,isEvalSupported:false});
        const doc=await task.promise;
        if(doc.numPages>800){await doc.destroy();throw Error('PDF exceeds the 800-page browser limit.');}
        for(let i=1;i<=doc.numPages;i++) {
          const page=await doc.getPage(i);
          const content=await page.getTextContent();
          pages.push(content.items.map(item=>(item.str||'')+(item.hasEOL?'\n':' ')).join(''));
          if(i===1||i%20===0||i===doc.numPages){state.importMessage=`Processing PDF page ${i} of ${doc.numPages} locally…`;const status=qs('#import-status');if(status)status.textContent=state.importMessage;await new Promise(resolve=>setTimeout(resolve,0));}
          page.cleanup();
        }
        await doc.destroy();
      } else {
        const text=await file.text();
        const chunk=6500;for(let i=0;i<text.length;i+=chunk)pages.push(text.slice(i,i+chunk));
      }
      const title=file.name.replace(/\.(pdf|txt)$/i,'').replace(/[_-]+/g,' ').trim();
      const book=window.BTL_LOCAL_ENGINE.build(title,pages);
      stories.unshift(book);state.progress[book.id]=1;state.importMessage='Document ready · no upload performed.';
      state.importing=false;openStory(book.id);toast('Private PDF imported into this tab');
    }catch(err){state.importing=false;state.importMessage=`Import unsuccessful: ${String(err?.message||err)}. Your file was not uploaded.`;render();}
  }
  function answerQuestion(query){state.query=query;const s=story(),p=progress();if(s.local)return answerImportedQuestion(s,p,query);const normal=query.toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();if(!normal){state.answer=null;render();return;}
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
  const themeOptions=qs('#theme-options');
  themeOptions.innerHTML=themeNames.map(([value,name,description,bg,fg])=>`<button type="button" data-theme-choice="${value}" aria-pressed="${state.theme===value}" class="theme-choice"><span class="theme-swatch" style="--preview-bg:${bg};--preview-accent:${fg}"></span><span><strong>${name}</strong><small>${description}</small></span><span class="theme-selected">${state.theme===value?'Selected':''}</span></button>`).join('');
  qs('#theme-launch').addEventListener('click',()=>qs('#theme-dialog').showModal());
  qs('#theme-close').addEventListener('click',()=>qs('#theme-dialog').close());
  themeOptions.addEventListener('click',e=>{const btn=e.target.closest('[data-theme-choice]');if(!btn)return;setTheme(btn.dataset.themeChoice);for(const b of qsa('[data-theme-choice]',themeOptions))b.querySelector('.theme-selected').textContent=b.dataset.themeChoice===state.theme?'Selected':'';qs('#theme-dialog').close();toast('Appearance updated');});
    qsa('[data-top-view]').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.topView,true)));
  qs('#workspace-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-guide-view]');if(b)navigate(b.dataset.guideView,true);});
  qs('#sidebar-book-panel').addEventListener('change',e=>{if(e.target.id==='sidebar-story')openStory(e.target.value);if(e.target.id==='sidebar-position')changeProgress(Number(e.target.value));});
  qs('#sidebar-book-panel').addEventListener('click',e=>{if(e.target.closest('[data-sidebar-read]'))navigate('story',true);if(e.target.closest('[data-sidebar-import]')){navigate('library');qs('#book-upload')?.click();}});
  qsa('[data-text-adjust]').forEach(btn=>btn.addEventListener('click',()=>{readerSize=btn.dataset.textAdjust==='0'?100:Math.min(145,Math.max(85,readerSize+Number(btn.dataset.textAdjust)*10));document.documentElement.style.setProperty('--reading-scale',readerSize+'%');}));
  qsa('.nav-item').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.view,true)));
  qs('#theme-select').addEventListener('change',e=>{setTheme(e.target.value);toast('Room appearance updated');});
  qs('#reset-demo').addEventListener('click',()=>{
    if(!window.confirm('Reset the sample stories to chapter 1 and restore the default appearance?'))return;
    for(const s of stories)state.progress[s.id]=1;state.storyId=stories.find(s=>!s.local)?.id||stories[0].id;state.person=null;state.answer=null;state.query='';setTheme('amethyst');persist();navigate('library',true);toast('Demo reading progress reset');
  });
  qs('#view-content').addEventListener('change',ev=>{if(ev.target.id==='story-pick')openStory(ev.target.value);if(ev.target.id==='local-section')changeProgress(Number(ev.target.value));if(ev.target.id==='book-upload')importDocument(ev.target.files?.[0]);});
  qs('#view-content').addEventListener('submit',ev=>{if(ev.target.id!=='ask-form')return;ev.preventDefault();const input=qs('#question-input');if(input)answerQuestion(input.value.trim());});
  qs('#view-content').addEventListener('click',ev=>{
    const btn=ev.target.closest('button');if(!btn)return;
    if(btn.hasAttribute?.('data-import-trigger')){qs('#book-upload')?.click();return;}
    if(btn.hasAttribute?.('data-expand-import')){state.localExpanded=true;render();return;}
    if(btn.dataset.openStory){openStory(btn.dataset.openStory);return;}
    if(btn.dataset.viewInline){navigate(btn.dataset.viewInline,true);return;}
    if(btn.dataset.setProgress){changeProgress(Number(btn.dataset.setProgress));return;}
    if(btn.dataset.person){state.person=btn.dataset.person;render();return;}
    if(btn.dataset.question){const q=story().qa.find(q=>q.id===btn.dataset.question);if(q)answerQuestion(q.prompt);return;}
    if(btn.dataset.sourceChapter){const c=Number(btn.dataset.sourceChapter);if(story().local){changeProgress(c);navigate('story',true);return;}state.view='story';render();const el=qs(`#chapter-${c}`);if(el){el.classList.add('focused-source');el.scrollIntoView({block:'center',behavior:'smooth'});el.setAttribute('tabindex','-1');el.focus({preventScroll:true});}return;}
  });
  qs('#page-title').setAttribute('tabindex','-1');
  setTheme(state.theme);render();
})();
