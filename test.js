const assert=require('node:assert/strict'),E=require('./engine');
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-5*Math.max(1,Math.abs(b)),`${a} != ${b}`);
let s=E.solve('decay',{half:5.27*31557600,initial:20,t:10*31557600});near(s.values.remaining,20*Math.pow(2,-10/5.27));assert.equal(s.issues.length,0);assert.ok(s.trails.remaining);
s=E.solve('decay',{initial:20,remaining:5,t:10});near(s.values.half,5);near(s.values.lost,15);
assert.ok(E.solve('decay',{half:10,k:1}).issues.length);
assert.ok(E.solve('decay',{}).suggestions.length);
s=E.solve('kinetics',{half:120,initial:.5,t:240});near(s.values.remaining,.125);near(s.values.rate,Math.log(2)/120*.125);
s=E.solve('arrhenius',{k1:.01,T1:298.15,T2:318.15,Ea:50000});assert.equal(s.issues.length,0);assert.ok(s.values.k2>.01);near(E.solve('arrhenius',{k1:.01,k2:s.values.k2,T1:298.15,T2:318.15}).values.Ea,50000);
s=E.solve('gas',{P:1,V:22.414,T:273.15,M:28.014});near(s.values.n,22.414/(.082057366*273.15));assert.equal(s.issues.length,0);
s=E.solve('solutions',{mass:5.844,M:58.44,V:.5,V2:1,solvent:495});near(s.values.c,.2);near(s.values.c2,.1);near(s.values.b,.1/.495);
s=E.solve('colligative',{i:2,b:.1,Kf:1.86,Kb:.512,freeze0:273.15,boil0:373.15});near(s.values.freeze,272.778);near(s.values.boil,373.2524);assert.equal(s.issues.length,0);
s=E.solve('osmotic',{i:1,mass:1,M:180.16,V:.1,T:298.15});near(s.values.osm,1/180.16/.1*.082057366*298.15);
near(E.convert(25,'°C','temp','T'),298.15);near(E.convert(2,'°C','temp','df'),2);near(E.convert(1000,'mL','volume','V'),1);
const custom={vars:[],eqs:[{label:'d=v*t',forms:{d:'v*t'}},{label:'a=d+2',forms:{a:'d+2'}}]};near(E.solve('custom',{v:3,t:4},custom).values.a,14);
assert.throws(()=>E.parse('alert(1)'));assert.throws(()=>E.parse('x.foo'));near(E.parse('2^3+sqrt(9)',{}).value,11);
assert.ok(E.solve('decay',{fraction:2,t:1}).issues.length);
console.log('Passed: seven chemistry networks, inverse and chained solving, conflicts, missing-input hints, conversions, custom formulas, and parser safety.');

