'use strict';
// All text in this public demonstration is original, authored sample fiction.
// No copyrighted novels, imported user data or live AI responses are bundled.
window.BTL_DEMO_STORIES = Object.freeze([
  {
    id: 'archive', title: 'The Archive at Low Tide', author: 'An original demo story',
    subtitle: 'A mystery written in tide marks, torn ledgers and small promises.',
    genre: 'COASTAL MYSTERY', coverLabel: 'THE ARCHIVE\nAT LOW TIDE', coverClass: 'cover-archive',
    chapters: [
      {title: 'The Ledger', text: "At low tide, Ada Vale found a brass key behind the archive's oldest ledger. The paper tag on its handle read NORTH. She placed it beside the tide chart and recorded the find in her notebook. Before leaving, Ada remembered her promise to her sister Mara Vale: she would not enter the abandoned lighthouse."},
      {title: 'The Second Witness', text: 'Rin Solis, the town archivist, opened the ledger the next morning. Rin told Ada that the lighthouse registry had been altered after the storm. Ada showed Rin the brass key, but neither could identify which lock it opened. They agreed to compare the old harbor maps.'},
      {title: 'The Lighthouse Cabinet', text: 'At the lighthouse, Ada tried the brass key in a sealed cabinet. The lock clicked open. Inside lay a weathered map with three red circles. Rin waited outside in the fog. Ada did not yet know what the circles marked.'},
      {title: 'The Confession', text: "Mara confronted Ada at the pier. 'I hid the key,' Mara confessed. 'I thought the map would keep you away.' Ada understood that her sister had been frightened. They unfolded the map together, but the meaning of its three circles remained a mystery."}
    ],
    people: [
      {id:'ada', name:'Ada Vale', first:1, role:'The finder', description:'Records the discovery of a brass key in the town archive.'},
      {id:'mara',name:'Mara Vale',first:1,role:'Ada’s sister',description:'The person to whom Ada has made a promise.'},
      {id:'rin',name:'Rin Solis',first:2,role:'Town archivist',description:'Helps Ada compare evidence in the archive.'}
    ],
    evidence: [
      {id:'a1',chapter:1,category:'Character',people:['ada'],headline:'A key behind a ledger',quote:"Ada Vale found a brass key behind the archive's oldest ledger.",note:'Ada discovers a physical key in the archive.',status:'Directly stated'},
      {id:'a2',chapter:1,category:'Relationship',people:['ada','mara'],headline:'Ada and Mara are sisters',quote:'Ada remembered her promise to her sister Mara Vale',note:'Their sibling relationship is explicitly stated.',status:'Directly stated'},
      {id:'a-place-1',chapter:1,category:'Place',people:['ada'],headline:'The town archive',quote:"At low tide, Ada Vale found a brass key behind the archive's oldest ledger.",note:'Ada makes the discovery at the archive.',status:'Directly stated'},
      {id:'a3',chapter:1,category:'Object',people:['ada'],headline:'The NORTH label',quote:'The paper tag on its handle read NORTH.',note:'The writing on the key is known; its purpose is not.',status:'Directly stated'},
      {id:'a4',chapter:2,category:'Interaction',people:['ada','rin'],headline:'Ada and Rin examine the key',quote:'Ada showed Rin the brass key, but neither could identify which lock it opened.',note:'A directly narrated interaction, not proof of a deeper relationship.',status:'Observed interaction'},
      {id:'a5',chapter:2,category:'Event',people:['rin','ada'],headline:'The registry was reportedly changed',quote:'Rin told Ada that the lighthouse registry had been altered after the storm.',note:'This is Rin’s statement. Independent confirmation is not yet shown.',status:'Reported by a character'},
      {id:'a-place-2',chapter:3,category:'Place',people:['ada'],headline:'The lighthouse',quote:'At the lighthouse, Ada tried the brass key in a sealed cabinet.',note:'The cabinet is inside the lighthouse.',status:'Directly stated'},
      {id:'a6',chapter:3,category:'Event',people:['ada'],headline:'The key opens the cabinet',quote:'The lock clicked open. Inside lay a weathered map with three red circles.',note:'The text directly describes the cabinet opening and the map.',status:'Directly stated'},
      {id:'a7',chapter:4,category:'Interaction',people:['mara','ada'],headline:'Mara says she hid the key',quote:"'I hid the key,' Mara confessed.",note:'Mara explicitly claims she hid the key; her statement is evidence, not independent proof.',status:'Reported by a character'},
      {id:'a8',chapter:4,category:'Relationship',people:['ada','mara'],headline:'The sisters examine the map',quote:'They unfolded the map together, but the meaning of its three circles remained a mystery.',note:'The source shows the pair working together.',status:'Observed interaction'}
    ],
    qa: [
      {id:'qkey',prompt:'What is the NORTH key?',matches:['key','north','tag'],chapter:1,answer:'Ada finds a brass key labeled NORTH behind a ledger. This entry establishes the key’s location and label, not its later use.',evidence:'a1'},
      {id:'qfamily',prompt:'How are Ada and Mara related?',matches:['sister','related','family','mara','sibling'],chapter:1,answer:'The text directly identifies Mara Vale as Ada’s sister.',evidence:'a2'},
      {id:'qrin',prompt:'What does Rin know about the registry?',matches:['rin','registry','archivist','storm'],chapter:2,answer:'Rin tells Ada the lighthouse registry changed after the storm. This is Rin’s report, not yet independently corroborated.',evidence:'a5'},
      {id:'qcabinet',prompt:'What does the key open?',matches:['open','cabinet','lock','map'],chapter:3,answer:'Ada uses the brass key to open a lighthouse cabinet containing a weathered map.',evidence:'a6'},
      {id:'qhid',prompt:'Who says they hid the key?',matches:['hid','hide','hiding','confession'],chapter:4,answer:'Mara says she hid the key. That is her own stated account.',evidence:'a7'}
    ]
  },
  {
    id: 'observatory', title:'Letters from the Observatory', author:'An original demo story',
    subtitle:'A night-shift mystery measured in minutes and missing messages.',
    genre:'SPECULATIVE FICTION', coverLabel:'LETTERS FROM\nTHE OBSERVATORY',coverClass:'cover-observatory',
    chapters:[
      {title:'The Last Shift',text:"Nia Calder worked the final night shift at the hilltop observatory. At midnight, she found a folded letter in the telescope log. It was signed Elias North and said, 'Do not trust the hour printed on the clock.' Nia placed the letter inside her coat."},
      {title:'A Second Account',text:'Rowan Pike, the maintenance engineer, met Nia in the stairwell. Rowan said Elias North had disappeared ten years earlier. Nia asked whether anyone had verified that claim. Rowan shook his head. Together, they checked the time recorded by the dome camera.'},
      {title:'Seven Minutes',text:'Nia compared the clock above the dome with the radio time signal. The dome clock ran seven minutes fast. She wrote the difference in the telescope log. Rowan watched the second hand move and said nothing.'},
      {title:'The Final Entry',text:'In a locked drawer, Nia found Elias North’s final observing log. It recorded the clock error and a planned departure by train. The document did not establish whether Elias had reached the station. Nia left his letter with the log for the next archivist.'}
    ],
    people:[
      {id:'nia',name:'Nia Calder',first:1,role:'Night-shift observer',description:'Finds an unusual letter and investigates its warning.'},
      {id:'elias',name:'Elias North',first:1,role:'Letter’s signatory',description:'Named in a letter whose circumstances remain uncertain.'},
      {id:'rowan',name:'Rowan Pike',first:2,role:'Maintenance engineer',description:'Shares an unverified account and checks the clock with Nia.'}
    ],
    evidence:[
      {id:'o1',chapter:1,category:'Event',people:['nia','elias'],headline:'Nia finds a signed letter',quote:'It was signed Elias North',note:'A letter bears the name Elias North; authorship is not independently verified.',status:'Directly stated'},
      {id:'o-place-1',chapter:1,category:'Place',people:['nia'],headline:'The hilltop observatory',quote:'Nia Calder worked the final night shift at the hilltop observatory.',note:'The source identifies the observatory as Nia’s workplace.',status:'Directly stated'},
      {id:'o2',chapter:1,category:'Object',people:['nia'],headline:'A warning about the clock',quote:"'Do not trust the hour printed on the clock.'",note:'The letter contains this warning; the reason is not yet known.',status:'Directly stated'},
      {id:'o3',chapter:2,category:'Interaction',people:['nia','rowan'],headline:'Rowan speaks with Nia',quote:'Rowan said Elias North had disappeared ten years earlier.',note:'The disappearance is Rowan’s unverified claim.',status:'Reported by a character'},
      {id:'o4',chapter:2,category:'Interaction',people:['nia','rowan'],headline:'They check a recording',quote:'Together, they checked the time recorded by the dome camera.',note:'Nia and Rowan share a directly narrated activity.',status:'Observed interaction'},
      {id:'o5',chapter:3,category:'Event',people:['nia'],headline:'The clock runs fast',quote:'The dome clock ran seven minutes fast.',note:'A measurable difference is described in the source.',status:'Directly stated'},
      {id:'o6',chapter:4,category:'Event',people:['nia','elias'],headline:'A departure is documented',quote:'It recorded the clock error and a planned departure by train.',note:'The log records a plan, not confirmation that Elias departed.',status:'Documented intention'}
    ],
    qa:[
      {id:'qletter',prompt:'Who signed the letter?',matches:['letter','signed','signature'],chapter:1,answer:'The letter is signed with the name Elias North. The passage does not independently prove who wrote it.',evidence:'o1'},
      {id:'qclock',prompt:'What is wrong with the clock?',matches:['clock','minutes','time','fast'],chapter:3,answer:'Nia measures the dome clock running seven minutes fast against a radio time signal.',evidence:'o5'},
      {id:'qdisappear',prompt:'Did Elias disappear?',matches:['elias','disappear','vanish','missing'],chapter:2,answer:'Rowan says Elias disappeared ten years earlier, but Nia asks whether that claim was verified and receives no confirmation.',evidence:'o3'},
      {id:'qtrain',prompt:'Did Elias leave by train?',matches:['train','leave','departure','station'],chapter:4,answer:'The log describes a planned train departure. It does not establish whether Elias reached the station.',evidence:'o6'}
    ]
  }
]);
