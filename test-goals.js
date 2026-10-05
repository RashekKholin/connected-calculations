const assert=require('node:assert/strict'),E=require('./engine'),P=require('./planner'),C=require('./chemistry');
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
near(C.parse('H2O').mass,18.015);near(C.parse('Ca(NO3)2').mass,164.086);near(C.parse('CuSO4·5H2O').mass,249.677);assert.deepEqual(C.parse('K4[Fe(CN)6]').counts,{K:4,Fe:1,C:6,N:6});near(C.parse('C₆H₁₂O₆').mass,180.156);near(C.parse('NH4+').mass,18.039);assert.equal(C.parse('Fe^3+').counts.Fe,1);assert.equal(C.parse('CO2(g)').counts.O,2);
for(const bad of ['Fe3+','Ca(NO3','H0','Xx2','H2O..H2O','NaCl -> Na+ + Cl-','()','Na(OH]','Tc'])assert.throws(()=>C.parse(bad),bad);
let plans=P.plan(E.groups.all,{solution_mass:1,solution_M:180.156},'solution_c');assert.ok(plans.some(p=>p.missing.length===1&&p.missing[0]==='solution_V'));assert.ok(plans.every(p=>!p.missing.includes('solution_c')));
plans=P.plan(E.groups.all,{nuclear_initial:20,nuclear_half:5},'nuclear_remaining');assert.ok(plans.some(p=>p.missing.length===1&&p.missing[0]==='nuclear_t'));
const custom={vars:[{id:'a'},{id:'b'},{id:'c'},{id:'d'}],eqs:[{label:'a=b*c',forms:{a:'b*c'}},{label:'b=d*2',forms:{b:'d*2'}}]};plans=P.plan(custom,{},'a');assert.ok(plans.some(p=>p.missing.join()==='b,c'));assert.ok(plans.some(p=>p.missing.join()==='c,d'));
console.log('Passed: backward routes, multi-step alternatives, cycle prevention, formula masses, groups, hydrates, subscripts, ions, and invalid formulas.');
