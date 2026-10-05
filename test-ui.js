// Lightweight DOM adapter exercises app events without browser automation.
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const elements={};function el(id){return elements[id]||=new Element(id);}
class Element{constructor(id){this.id=id;this.value='';this.checked=false;this.hidden=false;this.children={};}set innerHTML(x){this.html=x;if(this.id==='fields'){for(const m of x.matchAll(/id="(field-|input-)(\w+)"/g))elements[m[1]+m[2]]=new Element(m[1]+m[2]);}}get innerHTML(){return this.html||'';}querySelector(s){return this.children[s]||=new Element(s);}setAttribute(){}showModal(){this.open=true;}close(){this.open=false;}}
const context=vm.createContext({document:{getElementById:el},console});for(const f of ['engine.js','precision.js','planner.js','chemistry.js','app.js','target-ui.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+f,'utf8'),context);
assert.equal(el('title').textContent,'All connected equations');assert.ok(!fs.readFileSync(__dirname+'/index.html','utf8').includes('id="tabs"'));
el('example').onclick();assert.equal(el('input-solution_c').value,'0.2');el('sigfig').checked=true;el('sigfig').onchange();assert.equal(el('input-solution_c').value,'0.2000');
el('fields').onchange({target:{dataset:{unit:'solution_V'},value:'L'}});assert.equal(el('input-solution_V').value,'0.5000');assert.equal(el('input-solution_c').value,'0.2000');
el('fields').onclick({target:{dataset:{trail:'solution_osm'}}});assert.ok(el('trail').open);assert.ok(el('trailBody').innerHTML.includes('Solution'));el('close').onclick();
el('search').value='osmotic';el('search').oninput();assert.equal(el('field-nuclear_half').hidden,true);assert.equal(el('field-solution_osm').hidden,false);
el('search').value='';el('search').oninput();el('reset').onclick();assert.equal(el('input-solution_c').value,'');
console.log('Passed: UI startup, unified mode, example, precision toggle, unit changes, trails, search, reset. Layout not browser-verified.');
el('reset').onclick();el('answerTarget').value='solution_c';el('answerTarget').onchange();assert.ok(el('goalStatus').innerHTML.includes('Route 1'));
el('soluteFormula').value='NaCl';el('soluteFormula').oninput();assert.equal(el('input-solution_M').value,'58.44');assert.ok(el('soluteInfo').textContent.includes('g/mol'));
el('fields').oninput({target:{dataset:{input:'solution_mass'},value:'5.844'}});el('fields').oninput({target:{dataset:{input:'solution_V'},value:'0.5000'}});assert.ok(el('goalStatus').innerHTML.includes('Your current inputs are enough'));
el('fields').onclick({target:{dataset:{trail:'solution_c'}}});assert.ok(el('trailBody').innerHTML.includes('Molar mass of NaCl'));
el('soluteFormula').value='H0';el('soluteFormula').oninput();assert.equal(el('input-solution_M').value,'');assert.ok(el('status').innerHTML.includes('positive whole numbers'));
el('reset').onclick();assert.equal(el('soluteFormula').value,'');assert.equal(el('answerTarget').value,'');
console.log('Passed: goal selection, chemical formula inputs, automatic molar mass, target completion, formula derivations, invalidation, and reset.');
el('targetSearch').value='molality';el('targetSearch').oninput();assert.ok(el('answerTarget').innerHTML.includes('solution_b'));assert.ok(!el('answerTarget').innerHTML.includes('nuclear_half'));assert.equal(el('field-nuclear_half').hidden,false);
el('targetSearch').value='';el('targetSearch').oninput();el('answerTarget').value='solution_b';el('answerTarget').onchange();el('densityPreset').value='classroom';el('densityPreset').onchange();assert.equal(el('input-solution_solventDensity').value,'1.00');
el('fields').oninput({target:{dataset:{input:'solution_n'},value:'0.100'}});el('fields').oninput({target:{dataset:{input:'solution_V'},value:'0.500'}});assert.equal(el('input-solution_b').value,'');
el('approximate').checked=true;el('approximate').onchange();assert.equal(el('input-solution_b').value,'0.200');assert.ok(el('goalStatus').innerHTML.includes('Your current inputs are enough'));
el('fields').onclick({target:{dataset:{trail:'solution_b'}}});assert.ok(el('trailBody').innerHTML.includes('Dilute-solution approximation'));el('approximate').checked=false;el('approximate').onchange();assert.equal(el('input-solution_b').value,'');
el('solventName').value='Ethanol';el('solventName').oninput();el('fields').oninput({target:{dataset:{input:'solution_solventDensity'},value:'0.789'}});el('fields').oninput({target:{dataset:{input:'solution_solventVolume'},value:'0.500'}});assert.equal(el('input-solution_b').value,'0.253');
el('reset').onclick();assert.equal(el('approximate').checked,false);assert.equal(el('solventName').value,'');
console.log('Passed: independent target search, density presets, explicit approximation and revocation, solvent density, non-water solvents, and reset.');
