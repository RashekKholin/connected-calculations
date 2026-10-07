const assert=require('node:assert/strict');global.CatalogueInputUnits=require('./catalogue-units.js');global.ScalarInverses=require('./scalar-inverses.js');
const E=require('./engine.js');require('./sciences.js');require('./expanded.js');require('./ap-library.js');require('./math-tools.js');const catalog=require('./library-growth.js');
const near=(a,b)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<1e-7*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const counts={};for(const f of catalog)counts[f.subject]=(counts[f.subject]||0)+f.rows.length;
assert.equal(Object.keys(counts).length,8);for(const n of Object.values(counts))assert.equal(n,100);assert.equal(catalog.length,80);
const vars=E.groups.all.vars,ids=new Set(vars.map(v=>v.id));assert.equal(ids.size,vars.length);
for(const f of catalog){assert.equal(f.rows.length,10);assert.ok(f.note.length>30);for(const row of f.rows){assert.equal(row.length,4);assert.ok(row[3]);}for(const eq of E.groups.all.eqs.filter(e=>e.label.startsWith(f.subject+' · '+f.title+':')))for(const [id,expr]of Object.entries(eq.forms)){assert.ok(ids.has(id));for(const dep of E.parse(expr).deps)assert.ok(ids.has(dep));}}
for(const v of vars)assert.ok(E.units[v.type]);
function check(family,id,inputs,want){const f=catalog.find(f=>f.title===family);assert.ok(f);const eqs=E.groups.all.eqs.filter(e=>e.label.startsWith(f.subject+' · '+f.title+':'));const values=Object.fromEntries(Object.entries(inputs).map(([k,v])=>[f.prefix+'_'+k,v]));const result=E.solve('all',values,{vars:vars.filter(v=>v.id.startsWith(f.prefix+'_')),eqs});near(result.values[f.prefix+'_'+id],want);assert.ok(result.trails[f.prefix+'_'+id],family+' trail');return result;}
check('Real-gas and critical parameters','Z',{P:831.4462618,V:1,n:1,T:100},1);
check('Quantitative composition','massConc',{mass:20,totalMass:100,density:1,molarMass:40},200);
check('Partition and extraction','extractedMass',{totalMass:100,Kpartition:3,waterVolume:1,organicVolume:1,extractions:2},93.75);
check('Reaction order and mechanisms','branchA',{kA:3,kB:1},.75);
check('Spectroscopy and chromatography','resolution',{retentionB:20,retentionA:10,widthA:2,widthB:3},4);
check('Projectile trajectory','flightTime',{speed:10,angle:Math.PI/2,g:10,height:0},2);
check('Inclined plane and drag','downslope',{mass:2,g:10,angle:Math.PI/6},10);
check('Rotation and rolling bodies','atwoodA',{massA:1,massB:3,g:10},5);
check('Alternating current circuits','impedance',{R:3,XL:9,XC:5},5);
check('Relativity','labTime',{v:180000000,c:300000000,properTime:8},10);
check('Cell geometry and transport','sphereSV',{radius:2},1.5);
check('Microbial growth and culture','generationTime',{initial:100,final:800,time:6},2);
check('Molecular assays and DNA','foldExpression',{ctTarget:20,ctReference:18,controlDeltaCt:4},4);
check('Cardiovascular and respiratory models','cardiacOutput',{heartRate:60,strokeVolume:80},4.8);
check('Genetic mapping and quantitative genetics','breederResponse',{additiveVariance:4,phenotypeVariance:10,selectionDifference:5},2);
check('Growing and due annuities','growingPV',{payment:100,r:.1,g:0,n:2},173.55371900826447);
check('Loans and repayment planning','nextBalance',{balance:1000,r:.01,payment:100},910);
check('Bond rates and prices','zeroYield',{face:121,price:100,periods:2},.1);
check('Business accounting ratios','ROE',{income:10,equity:50},.2);
check('Project evaluation and depreciation','projectNPV',{initial:300,cashA:100,cashB:100,cashC:100,r:0},0);
check('Descriptive aggregates','sampleVariance',{n:4,sum:10,sumSquares:30},5/3);
check('Weighted and grouped aggregates','weightedMean',{weightA:1,weightB:2,weightC:1,xA:1,xB:3,xC:5},3);
check('Continuous uniform distribution','variance',{a:0,b:6},3);
check('Exponential waiting times','cdf',{rate:2,x:Math.log(2)/2},.5);
check('Contingency tables and ANOVA','oddsRatio',{a:20,b:10,c:5,d:10},4);
check('Plane geometry extensions','heronArea',{a:3,b:4,c:5},6);
check('Coordinate geometry','lineDistance',{A:3,B:4,C:10,x1:0,y1:0},2);
check('Sequences and finite series','squareSum',{n:10},385);
check('Exact elementary definite integrals','xExpIntegral',{a:0,b:1,k:1},1);
check('Vectors and complex numbers','productReal',{real:1,imaginary:2,secondReal:3,secondImaginary:4},-5);
check('Linear supply and demand','equilibriumPrice',{demandIntercept:10,demandSlope:1,supplyIntercept:2,supplySlope:1},6);
check('Specific taxes and subsidies','taxDWL',{demandIntercept:10,demandSlope:1,supplyIntercept:2,supplySlope:1,tax:2},1);
check('Consumer choice and utility','optimalX',{alpha:1,beta:3,income:100,priceX:5},5);
check('Firm pricing and market power','monopolyP',{intercept:10,MC:2,slope:1},6);
check('Keynesian expenditure model','equilibriumIncome',{autonomousC:10,MPC:.5,tax:0,investment:20,government:20},100);
check('Water balances and pollutant loads','mixedC',{flowA:1,concA:10,flowB:3,concB:2},4);
check('Treatment and reactor models','mixedC',{influent:100,k:1,volume:2,flow:2},50);
check('Atmospheric concentration and ventilation','gasMass',{ppm:1,pressure:101325,molarMass:44,T:273.15},1.963061469876874);
check('Energy and emissions accounting','electricEnergy',{fuel:1,heatingValue:36,efficiency:.5},5);
check('Waste and circular material flows','landfilled',{generated:100,recycled:30,composted:20,recoveredEnergy:10},40);
// Reverse solving across a multi-step network, not just evaluating a copied expression.
check('Loans and repayment planning','balance',{nextBalance:910,payment:100,r:.01},1000);
check('Water balances and pollutant loads','concentration',{load:20,flow:5},4);
// Algebraic identity validation for generated single-occurrence inverses at nondegenerate points.
let inverseChecks=0;for(const f of catalog)for(const [,id,expr]of f.rows){const deps=E.parse(expr).deps;const values=Object.fromEntries(deps.map((d,i)=>[d,.7+(i+1)*.13]));const y=E.parse(expr,values).value;if(!Number.isFinite(y))continue;for(const [d,inv]of Object.entries(ScalarInverses(expr,id))){const back=E.parse(inv,{...values,[id]:y}).value;if(!Number.isFinite(back))continue;near(back,values[d]);inverseChecks++;}}
assert.ok(inverseChecks>700);assert.deepEqual(ScalarInverses('x^2','y'),{});assert.deepEqual(ScalarInverses('sin(x)','y'),{});assert.throws(()=>E.parse('process.exit()'));
console.log(`Passed: 800 authored relationships (100 × 8), units and dependency audit, 40 independent numeric examples, reverse chaining, ${inverseChecks} inverse identities, ambiguity and parser checks. ${vars.length} quantities / ${E.groups.all.eqs.length} relationships.`);
