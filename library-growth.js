/* Authored scalar relationships, grouped by physical/problem system, never by symbol alone.
   One row is one relationship; algebraic inverses are not counted as extra entries. */
(function(root){'use strict';
const E=root.ChemEngine, catalogue=[];
const human=s=>s.replace(/([a-z])([A-Z])/g,'$1 $2').replace(/^./,c=>c.toUpperCase());
function inputLabel(id,u,title){const meanings={P:'Pressure',T:'Temperature',V:'Volume',M:'Molar mass',m:'Particle mass',Cv:'Molar constant-volume heat capacity',Cp:'Molar constant-pressure heat capacity',R:'Resistance',L:'Inductance',C:'Capacitance',D:'Diffusion coefficient',I:'Ionic strength',Q:'Quantity',MC:'Marginal cost',MPC:'Marginal propensity to consume',GDP:'Gross domestic product',SSE:'Residual sum of squares',SST:'Total sum of squares',Sxx:'Predictor sum of squared deviations',COGS:'Cost of goods sold',EBIT:'Earnings before interest and tax',DSO:'Days sales outstanding',ROE:'Return on equity',Ki:'Inhibition dissociation constant',Kd:'Binding dissociation concentration',Km:'Michaelis concentration',Ks:'Half-saturation concentration',N0:'Initial cohort size',Mheavy:'Heavier molar mass',Mlight:'Lighter molar mass',PK:'Potassium permeability',PNa:'Sodium permeability',PCl:'Chloride permeability',Ko:'Outside potassium',Nao:'Outside sodium',Clo:'Outside chloride',Nai:'Inside sodium',Cli:'Inside chloride'};if(title==='Membrane electrical models'&&id==='Ki')return 'Inside potassium (Ki)';if(title==='Enzyme inhibition and binding'&&id==='I')return 'Inhibitor concentration (I)';if(title==='Spectroscopy and chromatography'&&id==='I')return 'Transmitted intensity (I)';if(title==='Soils and erosion'&&id==='R')return 'Rainfall erosivity R';if(title==='Soils and erosion'&&id==='C')return 'Cover-management factor C';if(id==='n')return u==='mol'?'Amount of substance':u==='1'?'Level or exponent n':'Number n';if(id==='r')return u?.startsWith('decimal')?'Interest or discount rate':u==='m'?'Separation radius':'Parameter r';return meanings[id]?meanings[id]+' ('+id+')':human(id);}
function family(subject,title,inputUnits,body,note){
 Object.assign(inputUnits,Object.fromEntries((root.CatalogueInputUnits||typeof CatalogueInputUnits!=='undefined'&&CatalogueInputUnits||[])[catalogue.length]?.split('|').filter(Boolean).map(s=>s.split('='))||[]));
 const rows=body.trim().split('\n').map(s=>s.trim().split('|').map(s=>s.trim()));
 const prefix='ext'+catalogue.length,vars=new Map(),relations=[];
 const type=unit=>{if(!unit||unit==='1')return 'plain';const old=Object.keys(E.units).find(k=>Object.keys(E.units[k]).length===1&&E.units[k][unit]===1);if(old)return old;const key='catalogue'+Object.keys(E.units).length;E.units[key]={[unit]:1};return key;};
 const add=(id,label,unit,domain='signed')=>{if(!vars.has(id))vars.set(id,[id,label,type(unit),domain]);};
 for(const [label,id,,unit]of rows)add(id,label,unit,unit==='probability'?'fraction':'signed');
 for(const [label,id,expr]of rows){for(const d of E.parse(expr).deps){const u=inputUnits[d];if(!vars.has(d)&&!u)throw Error('Missing unit: '+title+' '+d);let domain=u==='probability'||/^(pA|pB|pC|efficiency|carbonFraction|runoffCoefficient|substitutionFactor|taxRate|capitalGainTax|payout|MPC|savingRate|dilution|relativeP|eccentricity|shareA|shareB|shareC)$/.test(d)?'fraction':/^(terms|term index|turns|vertices|panels|firms|groups|extractions)$/.test(u)?'positiveInteger':/^(observations|counts|trials|bp|copies|nucleons|failures)$/.test(u)?'nonnegativeInteger':u==='K'?'positive':/^(kg|mol|Pa|m³|L|g|mg|s|h|days|years|m²|ha|kg\/m³|g\/cm³)$/.test(u)?'nonnegative':'signed';if((title==='Crystals and molecular energetics'||title==='Quantum and nuclear measurements')&&/^(n|Z)$/.test(d))domain='positiveInteger';if(u==='m'&&/radius|thickness|length|spacing/i.test(d)&&!/radius[12]/.test(d))domain='positive';add(d,inputLabel(d,u,title),u,domain);}relations.push([label,{[id]:expr,...(root.ScalarInverses?root.ScalarInverses(expr,id):{})}]);}
 const first=E.groups.all.eqs.length;E.addNetwork(prefix,subject+' · '+title,[...vars.values()],relations,note);for(const eq of E.groups.all.eqs.slice(first))eq.conditions=note;
 catalogue.push({subject,title,prefix,inputUnits,rows,note});
}
const F=family;
// Chemistry: 10 systems × 10 distinct scalar relationships.
F('Chemistry','Real-gas and critical parameters',{P:'Pa',V:'m³',n:'mol',T:'K',a:'Pa·m⁶/mol²',b:'m³/mol'},`
Van der Waals pressure|vdwP|n*8.314462618*T/(V-n*b)-a*n^2/V^2|Pa
Compressibility factor|Z|P*V/(n*8.314462618*T)|1
Molar volume|Vm|V/n|m³/mol
Second-virial compressibility|Zvirial|1+B/Vm|1
Boyle temperature|boyleT|a/(8.314462618*b)|K
Critical temperature (van der Waals)|Tc|8*a/(27*8.314462618*b)|K
Critical pressure (van der Waals)|Pc|a/(27*b^2)|Pa
Critical molar volume|Vc|3*b|m³/mol
Reduced temperature|Tr|T/Tc|1
Reduced pressure|Pr|P/Pc|1
`,'Van der Waals model, positive T,n,V,a,b and V>nb; B is supplied second virial coefficient in m³/mol. Real-gas model estimates are not measured critical constants.');
F('Chemistry','Gas molecular distributions',{T:'K',M:'kg/mol',m:'kg',d:'m',P:'Pa'},`
Most probable molecular speed|vp|sqrt(2*8.314462618*T/M)|m/s
Mean molecular speed|vmean|sqrt(8*8.314462618*T/(pi*M))|m/s
Mean translational energy per molecule|eMean|1.5*1.380649e-23*T|J
Mean free path|lambda|1.380649e-23*T/(sqrt(2)*pi*d^2*P)|m
Collision frequency per molecule|collision|vmean/lambda|s⁻¹
Graham effusion ratio|effusion|sqrt(Mheavy/Mlight)|1
Molecular speed density at v|speedDensity|4*pi*(m/(2*pi*1.380649e-23*T))^1.5*v^2*exp(-m*v^2/(2*1.380649e-23*T))|s/m
Translational molar heat capacity Cv|CvTranslation|1.5*8.314462618|J/(mol·K)
Ideal-gas Cp from supplied Cv|Cp|Cv+8.314462618|J/(mol·K)
Heat-capacity ratio|gamma|Cp/Cv|1
`,'Ideal classical dilute gas; masses positive; v≥0. Mheavy and Mlight in same mass units, v in m/s. Cv is translational monatomic contribution; supply appropriate full Cv for Cp.');
F('Chemistry','Quantitative composition',{mass:'g',totalMass:'g',equivalents:'mol',volume:'L',soluteMoles:'mol',solventMoles:'mol',density:'g/mL'},`
Mass fraction|massFraction|mass/totalMass|1
Parts per billion by mass|ppb|1e9*mass/totalMass|ppb
Mass-per-volume percent|wvPercent|mass/(volume*1000)*100|g/100 mL
Volume fraction|volumeFraction|soluteVolume/totalVolume|1
Normality|normality|equivalents/volume|eq/L
Equivalent weight|equivalentWeight|molarMass/electrons|g/eq
Solute mole fraction|soluteX|soluteMoles/(soluteMoles+solventMoles)|1
Solvent mole fraction|solventX|solventMoles/(soluteMoles+solventMoles)|1
Molarity from mass fraction|molarity|1000*density*massFraction/molarMass|mol/L
Mass concentration from molarity|massConc|molarity*molarMass|g/L
`,'Common composition basis, positive denominators, 0≤fractions≤1; molarMass in g/mol, electrons is reaction-specific equivalents per mole; volume inputs in L unless stated.');
F('Chemistry','Partition and extraction',{totalMass:'g',waterVolume:'L',organicVolume:'L',waterConc:'g/L',organicConc:'g/L',pH:'1',pKa:'1'},`
Partition coefficient|Kpartition|organicConc/waterConc|1
Organic-to-water volume ratio|volumeRatio|organicVolume/waterVolume|1
Fraction left after one extraction|leftFraction|1/(1+Kpartition*volumeRatio)|1
Fraction left after n equal extractions|leftN|leftFraction^extractions|1
Extracted fraction|extractedFraction|1-leftN|1
Extracted mass|extractedMass|totalMass*extractedFraction|g
Remaining aqueous mass|aqueousMass|totalMass*leftN|g
Neutral fraction of monoprotic acid|neutralAcid|1/(1+10^(pH-pKa))|1
Acid distribution coefficient|acidD|Kpartition*neutralAcid|1
Neutral fraction of monoprotic base|neutralBase|1/(1+10^(pKa-pH))|1
`,'Equilibrated immiscible phases, negligible phase-volume changes; extractions positive integer; only neutral species partitions in acid/base approximation. Kpartition, volumes≥0.');
F('Chemistry','Surface adsorption',{P:'Pa',C:'mol/L',Kp:'Pa⁻¹',Kc:'L/mol',qmax:'mol/kg',q:'mol/kg',kf:'model-specific',n:'1',A:'m²',sites:'mol/m²'},`
Langmuir gas surface coverage|thetaGas|Kp*P/(1+Kp*P)|1
Langmuir dissolved surface coverage|thetaLiquid|Kc*C/(1+Kc*C)|1
Langmuir adsorbed loading|loading|qmax*thetaLiquid|mol/kg
Freundlich loading|freundlich|kf*C^(1/n)|mol/kg
BET loading ratio|betRatio|betC*relativeP/((1-relativeP)*(1+(betC-1)*relativeP))|1
BET adsorbed amount|betAmount|monolayer*betRatio|mol
Occupied surface sites|occupied|A*sites*thetaGas|mol
Langmuir vacant fraction|vacant|1-thetaGas|1
Adsorption equilibrium constant|Kads|adsorptionRate/desorptionRate|Pa⁻¹
Surface excess per area|surfaceExcess|excessMoles/A|mol/m²
`,'Model parameters positive; BET 0<relativeP<1 and monolayer in mol; pressure-based adsorption/desorption ratio in Pa⁻¹. Empirical models, not general adsorption thermodynamics.');
F('Chemistry','Electrolytes and activities',{zA:'1',zB:'1',cA:'mol/L',cB:'mol/L',I:'mol/L',A:'model constant',B:'model constant',ionSize:'model length',T:'K'},`
Two-ion ionic strength|ionicStrength|0.5*(cA*zA^2+cB*zB^2)|mol/L
Debye-Huckel limiting log activity|logGamma|-A*zA^2*sqrt(I)|1
Activity coefficient from log|gammaActivity|10^logGamma|1
Extended Debye-Huckel log activity|extendedLog|-A*zA^2*sqrt(I)/(1+B*ionSize*sqrt(I))|1
Davies log activity|daviesLog|-A*zA^2*(sqrt(I)/(1+sqrt(I))-0.3*I)|1
Ion activity on 1 M basis|activity|gammaActivity*cA|1
Activity-based pH|activityPH|-log(activity)|1
Mean activity coefficient for 1:1 salt|meanGamma|sqrt(gammaA*gammaB)|1
Osmotic coefficient|osmoticCoefficient|osmoticPressure/(totalIonConc*8.314462618*T)|1
Conductivity of two ions|conductivity|lambdaA*cSIa+lambdaB*cSIb|S/m
`,'Supply temperature/solvent-appropriate A,B; I≥0. Standard concentration is 1 mol/L. Osmotic pressure Pa, totalIonConc mol/m³; molar conductivity lambda in S·m²/mol and cSI mol/m³; dilute models have validity limits.');
F('Chemistry','Reaction order and mechanisms',{k:'model-specific',Aconc:'mol/L',Bconc:'mol/L',t:'s',A0:'mol/L',orderA:'1',orderB:'1'},`
General two-reactant power rate|rateLaw|k*Aconc^orderA*Bconc^orderB|mol/(L·s)
Overall kinetic order|overallOrder|orderA+orderB|1
Pseudo-first-order constant|pseudoK|k*Bconc|s⁻¹
General-order integrated concentration|generalA|(A0^(1-orderA)+(orderA-1)*k*t)^(1/(1-orderA))|mol/L
General-order half-life|generalHalf|(2^(orderA-1)-1)/((orderA-1)*k*A0^(orderA-1))|s
Parallel first-order product A fraction|branchA|kA/(kA+kB)|1
Consecutive A to B intermediate|intermediate|A0*kA/(kB-kA)*(exp(-kA*t)-exp(-kB*t))|mol/L
Consecutive reaction peak time|peakTime|ln(kB/kA)/(kB-kA)|s
First-order reversible equilibrium fraction|reversibleFraction|forwardK/(forwardK+reverseK)|1
First-order relaxation time|relaxation|1/(forwardK+reverseK)|s
`,'General order excludes orderA=1 and needs positive bracket; k units depend on order. Consecutive A→B→C initially B=C=0, positive distinct kA,kB in s⁻¹. PseudoK assumes first order in excess B.');
F('Chemistry','Thermodynamic processes',{n:'mol',T1:'K',T2:'K',V1:'m³',V2:'m³',Cv:'J/(mol·K)',Cp:'J/(mol·K)',P1:'Pa',P2:'Pa'},`
Constant-Cv internal-energy change|deltaU|n*Cv*(T2-T1)|J
Constant-Cp enthalpy change|deltaH|n*Cp*(T2-T1)|J
Ideal-gas entropy change via volume|deltaS|n*Cv*ln(T2/T1)+n*8.314462618*ln(V2/V1)|J/K
Ideal-gas entropy change via pressure|deltaSP|n*Cp*ln(T2/T1)-n*8.314462618*ln(P2/P1)|J/K
Reversible isothermal work on gas|isothermalW|-n*8.314462618*T1*ln(V2/V1)|J
Reversible adiabatic final temperature|adiabaticT|T1*(V1/V2)^(gamma-1)|K
Reversible adiabatic final pressure|adiabaticP|P1*(V1/V2)^gamma|Pa
Gibbs-Helmholtz constant-enthalpy temperature shift|gOverT2|gOverT1+reactionH*(1/T2-1/T1)|J/(mol·K)
van t Hoff equilibrium shift|K2|K1*exp(-reactionH/8.314462618*(1/T2-1/T1))|1
Clausius-Clapeyron vapor pressure|vaporP2|vaporP1*exp(-vaporH/8.314462618*(1/T2-1/T1))|Pa
`,'Ideal gas, positive T,P,V,n; constant heat capacities gamma=Cp/Cv. reactionH,vaporH in J/mol; gOverT1=ΔG°(T1)/T1. Vapor enthalpy constant and ideal vapor approximations.');
F('Chemistry','Spectroscopy and chromatography',{path:'cm',concentration:'mol/L',epsilon:'L/(mol·cm)',I0:'signal units',I:'signal units',lambda:'nm',retention:'s',dead:'s',widthA:'s',widthB:'s'},`
Absorbance from intensity|intensityA|log(I0/I)|1
Napier absorption coefficient|alpha|ln(I0/I)/path|cm⁻¹
Absorption optical depth|tau|alpha*path|1
Calibration concentration|calibrationC|(signal-intercept)/slope|mol/L
Retention factor|retentionFactor|(retention-dead)/dead|1
Chromatographic selectivity|selectivity|kB/kA|1
Baseline peak resolution|resolution|2*(retentionB-retentionA)/(widthA+widthB)|1
Plate number baseline width|plates|16*(retention/widthA)^2|1
Plate number half-height width|platesHalf|5.54*(retention/halfWidth)^2|1
Plate height|plateHeight|columnLength/plates|m
`,'Positive intensities, path, widths, dead time; linear calibration supplied slope units signal/(mol/L), signal and intercept same units. Chromatography retentionB>retentionA; columnLength meters; kB≥kA>0.');
F('Chemistry','Crystals and molecular energetics',{massCell:'kg',cellVolume:'m³',edge:'m',M:'kg/mol',radius:'m',electronMass:'kg',n:'1',Z:'1',reducedMass:'kg',springConstant:'N/m'},`
Unit-cell density|cellDensity|massCell/cellVolume|kg/m³
Unit-cell formula-unit count|unitsCell|massCell*6.02214076e23/M|1
Simple-cubic atomic packing fraction|scPacking|pi/6|1
Body-centered-cubic packing fraction|bccPacking|sqrt(3)*pi/8|1
Face-centered-cubic packing fraction|fccPacking|pi/(3*sqrt(2))|1
BCC atomic radius from edge|bccRadius|sqrt(3)*edge/4|m
FCC atomic radius from edge|fccRadius|sqrt(2)*edge/4|m
Hydrogenic energy level|hydrogenEnergy|-2.179872361e-18*Z^2/n^2|J
Harmonic bond vibration frequency|vibration|sqrt(springConstant/reducedMass)/(2*pi)|Hz
Two-atom reduced mass|mu|massA*massB/(massA+massB)|kg
`,'Ideal cubic hard spheres; hydrogenic one-electron ion, positive integer n and nuclear charge Z; harmonic vibration; massA,massB kg. Packing constants are exact within the stated geometry.');
// Physics.
F('Physics','Projectile trajectory',{speed:'m/s',angle:'rad',g:'m/s²',t:'s',height:'m'},`
Horizontal launch velocity|vx|speed*cos(angle)|m/s
Vertical launch velocity|vy0|speed*sin(angle)|m/s
Horizontal position|x|vx*t|m
Vertical position|y|height+vy0*t-g*t^2/2|m
Vertical velocity|vy|vy0-g*t|m/s
Speed along trajectory|trajectorySpeed|sqrt(vx^2+vy^2)|m/s
Time to highest point|peakTime|vy0/g|s
Maximum altitude|peakHeight|height+vy0^2/(2*g)|m
Time to ground|flightTime|(vy0+sqrt(vy0^2+2*g*height))/g|s
Horizontal ground range|range|vx*flightTime|m
`,'Vacuum projectile, g>0 constant downward, height≥0, t≥0; angle radians and no air drag. Peak after launch requires vy0≥0.');
F('Physics','Inclined plane and drag',{mass:'kg',g:'m/s²',angle:'rad',mu:'1',rho:'kg/m³',area:'m²',Cd:'1',viscosity:'Pa·s',radius:'m',speed:'m/s'},`
Slope gravity component|downslope|mass*g*sin(angle)|N
Incline normal force|normal|mass*g*cos(angle)|N
Sliding acceleration downhill|acceleration|g*(sin(angle)-mu*cos(angle))|m/s²
Minimum ideal uphill pull|uphill|mass*g*(sin(angle)+mu*cos(angle))|N
Quadratic drag force|drag|rho*Cd*area*speed^2/2|N
Quadratic-drag terminal speed|terminal|sqrt(2*mass*g/(rho*Cd*area))|m/s
Stokes drag|stokesDrag|6*pi*viscosity*radius*speed|N
Stokes terminal speed with buoyancy|stokesTerminal|2*(particleDensity-rho)*g*radius^2/(9*viscosity)|m/s
Particle Reynolds number|reynolds|2*rho*speed*radius/viscosity|1
Drag power magnitude|dragPower|drag*speed|W
`,'0≤angle<π/2; sliding downhill assumed. Nonnegative speed; Stokes sphere creeping flow Re≪1, particleDensity kg/m³. Terminal formulas steady fall, Cd constant.');
F('Physics','Orbital mechanics',{centralMass:'kg',bodyMass:'kg',r:'m',axis:'m',eccentricity:'1'},`
Orbital specific energy|specificEnergy|-6.67430e-11*centralMass/(2*axis)|J/kg
Vis-viva orbital speed|orbitalSpeed|sqrt(6.67430e-11*centralMass*(2/r-1/axis))|m/s
Elliptical period|orbitalPeriod|2*pi*sqrt(axis^3/(6.67430e-11*centralMass))|s
Periapsis radius|periapsis|axis*(1-eccentricity)|m
Apoapsis radius|apoapsis|axis*(1+eccentricity)|m
Specific angular momentum|specificL|sqrt(6.67430e-11*centralMass*axis*(1-eccentricity^2))|m²/s
Orbit total energy|orbitEnergy|bodyMass*specificEnergy|J
Surface circular speed|surfaceSpeed|sqrt(6.67430e-11*centralMass/r)|m/s
Hohmann transfer semimajor axis|transferAxis|(innerRadius+outerRadius)/2|m
Hohmann transfer duration|transferTime|pi*sqrt(transferAxis^3/(6.67430e-11*centralMass))|s
`,'Newtonian two-body bound ellipse, positive axis,r,masses and 0≤e<1; central mass dominates. innerRadius,outerRadius meters; coplanar circular Hohmann half-ellipse.');
F('Physics','Rotation and rolling bodies',{mass:'kg',radius:'m',omega:'rad/s',height:'m',g:'m/s²',force:'N'},`
Solid-sphere rotational inertia|sphereI|2*mass*radius^2/5|kg·m²
Thin spherical shell inertia|shellI|2*mass*radius^2/3|kg·m²
Annular-cylinder inertia|annulusI|mass*(innerRadius^2+outerRadius^2)/2|kg·m²
Rectangular lamina inertia through center|laminaI|mass*(width^2+length^2)/12|kg·m²
Solid-cone symmetry-axis inertia|coneI|3*mass*radius^2/10|kg·m²
Rolling translational speed|rollingSpeed|omega*radius|m/s
Rolling total kinetic energy|rollingK|(mass*radius^2+inertia)*omega^2/2|J
Rolling-down speed from height|downhillSpeed|sqrt(2*g*height/(1+inertia/(mass*radius^2)))|m/s
Atwood acceleration|atwoodA|g*(massB-massA)/(massA+massB)|m/s²
Atwood rope tension|atwoodT|2*massA*massB*g/(massA+massB)|N
`,'Rigid bodies, lengths meters and inertia kg·m². Rolling without slip from rest, no losses. Atwood massless rope/frictionless massless pulley; positive masses.');
F('Physics','Damped and driven oscillations',{mass:'kg',k:'N/m',damping:'kg/s',omega:'rad/s',forceAmplitude:'N',A0:'m',t:'s'},`
Undamped angular frequency|omega0|sqrt(k/mass)|rad/s
Damping decay rate|beta|damping/(2*mass)|s⁻¹
Underdamped angular frequency|omegaD|sqrt(omega0^2-beta^2)|rad/s
Amplitude envelope|envelope|A0*exp(-beta*t)|m
Damped displacement|displacement|envelope*cos(omegaD*t+phase)|m
Driven steady amplitude|drivenA|forceAmplitude/sqrt((k-mass*omega^2)^2+(damping*omega)^2)|m
Oscillator quality factor|quality|mass*omega0/damping|1
Energy decay envelope|energyEnvelope|initialEnergy*exp(-2*beta*t)|J
Amplitude half-life|amplitudeHalf|ln(2)/beta|s
Resonant displacement frequency|resonance|sqrt(omega0^2-2*beta^2)|rad/s
`,'Linear viscous damping, mass,k>0, damping≥0; omegaD/resonance require positive radicands, phase radians, initialEnergy joules. Driven amplitude finite damping or off-resonance.');
F('Physics','Sound and wave intensity',{power:'W',r:'m',intensity:'W/m²',referenceIntensity:'W/m²',rho:'kg/m³',soundSpeed:'m/s',f:'Hz'},`
Spherical acoustic intensity|sphericalI|power/(4*pi*r^2)|W/m²
Sound intensity level|level|10*log(intensity/referenceIntensity)|dB
Acoustic rms pressure|rmsPressure|sqrt(intensity*rho*soundSpeed)|Pa
Acoustic peak pressure|peakPressure|sqrt(2)*rmsPressure|Pa
Doppler approaching source|approachF|f*soundSpeed/(soundSpeed-sourceSpeed)|Hz
Doppler receding source|recedeF|f*soundSpeed/(soundSpeed+sourceSpeed)|Hz
Doppler approaching observer|observerF|f*(soundSpeed+observerSpeed)/soundSpeed|Hz
Mach number|mach|sourceSpeed/soundSpeed|1
Mach cone half-angle|machAngle|asin(1/mach)|rad
Wave angular number|waveNumber|2*pi*f/soundSpeed|rad/m
`,'Positive intensity,referenceIntensity,r,rho,c; point isotropic source. Doppler collinear, sourceSpeed<c for approaching formula. Mach cone only mach≥1; nonnegative speed magnitudes.');
F('Physics','Geometrical and wave optics',{n:'1',radius:'m',objectDistance:'m',focalLength:'m',lambda:'m',aperture:'m',distance:'m'},`
Thin lensmaker focal length|lensmaker|1/((n-1)*(1/radius1-1/radius2))|m
Spherical mirror focal length|mirrorF|radius/2|m
Optical power|diopters|1/focalLength|m⁻¹
Angular diffraction resolution|rayleigh|1.22*lambda/aperture|rad
Airy-disk first-zero radius|airy|1.22*lambda*distance/aperture|m
Brewster angle|brewster|atan(n2/n1)|rad
Normal-incidence reflection fraction|reflection|((n1-n2)/(n1+n2))^2|1
Malus-law intensity|malus|initialIntensity*cos(angle)^2|W/m²
Unpolarized light after ideal polarizer|polarized|initialIntensity/2|W/m²
Grating principal angle|gratingAngle|asin(order*lambda/spacing)|rad
`,'Thin lens in air, signed curvature radii meters; paraxial mirror/lens; radians. Grating integer order and |order·lambda/spacing|≤1. Ideal transparent dielectrics/polarizers.');
F('Physics','Alternating current circuits',{R:'Ω',L:'H',C:'F',f:'Hz',rmsV:'V',peakV:'V'},`
Angular drive frequency|driveOmega|2*pi*f|rad/s
Inductive reactance|XL|driveOmega*L|Ω
Capacitive reactance|XC|1/(driveOmega*C)|Ω
Series RLC impedance magnitude|impedance|sqrt(R^2+(XL-XC)^2)|Ω
RMS series current|rmsI|rmsV/impedance|A
Average resistive power|averagePower|rmsI^2*R|W
Power factor|powerFactor|R/impedance|1
Series resonance frequency|resonanceF|1/(2*pi*sqrt(L*C))|Hz
Peak-to-rms voltage|convertedRms|peakV/sqrt(2)|V
Ideal transformer voltage|secondaryV|primaryV*secondaryTurns/primaryTurns|V
`,'Sinusoidal steady state, ideal series RLC, f,L,C>0 and R≥0. Transformer turn counts positive, rms or peak voltage basis consistent. No transient or phase inference.');
F('Physics','Relativity',{v:'m/s',c:'m/s',properTime:'s',properLength:'m',restMass:'kg',momentum:'kg·m/s'},`
Lorentz factor|lorentz|1/sqrt(1-v^2/c^2)|1
Time dilation|labTime|lorentz*properTime|s
Length contraction|labLength|properLength/lorentz|m
Relativistic momentum|relativisticP|lorentz*restMass*v|kg·m/s
Total relativistic energy|totalE|lorentz*restMass*c^2|J
Relativistic kinetic energy|kineticE|(lorentz-1)*restMass*c^2|J
Energy from momentum and rest mass|momentumE|sqrt(momentum^2*c^2+restMass^2*c^4)|J
Collinear velocity composition|composedV|(u+v)/(1+u*v/c^2)|m/s
Relativistic receding Doppler ratio|dopplerRatio|sqrt((1-v/c)/(1+v/c))|1
Lorentz transformed position|xPrime|lorentz*(x-v*t)|m
`,'Inertial frames in special relativity, supply c=299792458 m/s, |u|,|v|<c; x meters,t seconds; proper quantities in rest frame.');
F('Physics','Quantum and nuclear measurements',{lambda:'m',angle:'rad',n:'1',length:'m',mass:'kg',dx:'m',activity:'Bq',efficiency:'1',time:'s'},`
Compton wavelength shift|comptonShift|6.62607015e-34/(9.1093837139e-31*299792458)*(1-cos(angle))|m
Scattered photon wavelength|scatteredLambda|lambda+comptonShift|m
Particle-in-box energy|boxE|n^2*6.62607015e-34^2/(8*mass*length^2)|J
Minimum momentum uncertainty|minDp|6.62607015e-34/(4*pi*dx)|kg·m/s
Minimum energy-time uncertainty|minDE|6.62607015e-34/(4*pi*time)|J
Detected radioactive counts|counts|activity*efficiency*time|counts
Poisson counting uncertainty|countSigma|sqrt(counts)|counts
Background-subtracted count rate|netRate|grossCounts/grossTime-backgroundCounts/backgroundTime|s⁻¹
Detector dead-time corrected rate|trueRate|measuredRate/(1-measuredRate*deadTime)|s⁻¹
Nuclear radius estimate|nuclearRadius|1.2e-15*nucleons^(1/3)|m
`,'Infinite 1D box positive integer n; uncertainty lower bounds, not equality of actual uncertainties. Positive times, efficiencies in [0,1]; nonparalyzable dead time requires measuredRate·deadTime<1.');
// Biology: experimental biology, population models and physiology calculations.
F('Biology','Cell geometry and transport',{radius:'µm',length:'µm',area:'µm²',volume:'µm³',D:'m²/s',distance:'m',permeability:'m/s',outside:'mol/m³',inside:'mol/m³'},`
Spherical cell volume|sphereVolume|4*pi*radius^3/3|µm³
Spherical cell surface|sphereArea|4*pi*radius^2|µm²
Spherical cell surface-to-volume ratio|sphereSV|3/radius|µm⁻¹
Cylindrical cell volume|cylinderVolume|pi*radius^2*length|µm³
Cylindrical cell surface|cylinderArea|2*pi*radius*(radius+length)|µm²
Cylindrical surface-to-volume ratio|cylinderSV|cylinderArea/cylinderVolume|µm⁻¹
One-dimensional mean diffusion time|diffusionTime|distance^2/(2*D)|s
Membrane solute flux|flux|permeability*(outside-inside)|mol/(m²·s)
Cell membrane solute transfer|transfer|flux*membraneArea|mol/s
Fick steady slab flux|slabFlux|D*(outside-inside)/thickness|mol/(m²·s)
`,'Ideal sphere/cylinder; geometric µm units distinct from transport SI meters. Positive dimensions,D; membraneArea m², thickness m; steady diffusion, no active transport.');
F('Biology','Microbial growth and culture',{initial:'cells/mL',final:'cells/mL',time:'h',dilution:'1',colonies:'colonies',platedVolume:'mL',substrate:'g/L',Ks:'g/L',muMax:'h⁻¹'},`
Generation count from populations|generations|ln(final/initial)/ln(2)|generations
Generation time|generationTime|time/generations|h
Specific net growth from log counts|growthRate|ln(final/initial)/time|h⁻¹
CFU concentration|cfu|colonies/(dilution*platedVolume)|CFU/mL
Chemostat dilution rate|dilutionRate|flow/workingVolume|h⁻¹
Chemostat hydraulic residence time|residence|workingVolume/flow|h
Monod growth rate|monod|muMax*substrate/(Ks+substrate)|h⁻¹
Chemostat steady substrate|steadyS|Ks*dilutionRate/(muMax-dilutionRate)|g/L
Biomass yield on substrate|yieldXS|biomassIncrease/substrateConsumed|g/g
Specific substrate uptake|uptake|monod/yieldXS+maintenance|g/(g·h)
`,'Positive populations,time; dilution is retained concentration fraction >0≤1, plate counts model sampling uncertainty separately. Flow L/h, workingVolume L. Monod ideal chemostat steadyS only 0<D<muMax; biomass/substrate g and maintenance g/(g·h).');
F('Biology','Enzyme inhibition and binding',{S:'mol/L',Km:'mol/L',I:'mol/L',Ki:'mol/L',vmax:'mol/(L·s)',ligand:'mol/L',Kd:'mol/L',hillN:'1'},`
Competitive inhibition factor|alpha|1+I/Ki|1
Uncompetitive inhibition factor|alphaPrime|1+I/KiPrime|1
Mixed-inhibition rate|mixedV|vmax*S/(alpha*Km+alphaPrime*S)|mol/(L·s)
Pure noncompetitive rate|noncompetitiveV|vmax*S/((1+I/Ki)*(Km+S))|mol/(L·s)
Uncompetitive apparent Km|apparentKm|Km/alphaPrime|mol/L
Uncompetitive apparent Vmax|apparentVmax|vmax/alphaPrime|mol/(L·s)
Hill fractional occupancy|hillOccupancy|ligand^hillN/(Kd^hillN+ligand^hillN)|1
Simple receptor bound amount|bound|totalReceptor*ligand/(Kd+ligand)|mol/L
Binding free energy|bindingG|8.314462618*T*ln(Kd/standardConc)|J/mol
Scatchard bound-to-free ratio|scatchard|(totalReceptor-bound)/Kd|1
`,'Positive dissociation constants, hillN>0, concentrations≥0; KiPrime mol/L, totalReceptor mol/L, T K and standardConc mol/L. Hill Kd is half-occupancy concentration; simple Scatchard only noncooperative single-site model.');
F('Biology','Molecular assays and DNA',{bp:'bp',volume:'µL',concentration:'ng/µL',mass:'ng',cycles:'cycles',efficiency:'1',ctTarget:'cycles',ctReference:'cycles'},`
Double-stranded DNA molar mass estimate|dnaM|660*bp|g/mol
DNA total mass|dnaMass|concentration*volume|ng
DNA molar amount|dnaMoles|mass*1e-9/dnaM|mol
DNA molecule count|dnaCopies|dnaMoles*6.02214076e23|copies
PCR amplification with efficiency|amplified|initialCopies*(1+efficiency)^cycles|copies
qPCR target delta Ct|deltaCt|ctTarget-ctReference|cycles
qPCR delta-delta Ct|deltaDeltaCt|deltaCt-controlDeltaCt|cycles
qPCR relative fold expression|foldExpression|2^(-deltaDeltaCt)|1
DNA purity A260/A280|purity|abs260/abs280|1
dsDNA concentration from absorbance|uvConc|50*abs260*dilutionFactor|µg/mL
`,'Approximate 660 g/mol/base pair; efficiency 0..1, integer bp/cycles. ΔΔCt assumes equal near-100% amplification. UV coefficient for dsDNA and 1 cm equivalent optical path; dilutionFactor≥1.');
F('Biology','Population demography',{N0:'individuals',survivors:'individuals',births:'individuals',deaths:'individuals',time:'years',age:'years',fecundity:'offspring/individual'},`
Age-class survivorship|lx|survivors/N0|1
Age-class mortality fraction|qx|deaths/survivors|1
Age-class reproductive contribution|lxmx|lx*fecundity|offspring/initial individual
Age-weighted reproductive contribution|ageContribution|age*lxmx|years·offspring/initial individual
Generation time from life-table aggregates|generation|sumAgeContribution/netReproduction|years
Life-table intrinsic growth approximation|intrinsicR|ln(netReproduction)/generation|year⁻¹
Finite annual multiplication factor|lambda|exp(intrinsicR)|1
Per-capita birth rate|birthRate|births/(population*time)|year⁻¹
Per-capita death rate|deathRate|deaths/(population*time)|year⁻¹
Demographic growth from per-capita rates|demographicR|birthRate-deathRate|year⁻¹
`,'Life-table cohorts, N0>0 and 0≤deaths≤survivors≤N0; aggregate netReproduction=sum lxmx, sumAgeContribution supplied. Constant interval birth/death estimates, population>0.');
F('Biology','Community ecology indices',{richness:'species',individuals:'individuals',pA:'1',pB:'1',pC:'1',shared:'species',onlyA:'species',onlyB:'species'},`
Three-species Shannon diversity|shannon|-(pA*ln(pA)+pB*ln(pB)+pC*ln(pC))|nats
Pielou evenness|evenness|shannon/ln(richness)|1
Margalef richness index|margalef|(richness-1)/ln(individuals)|1
Menhinick richness index|menhinick|richness/sqrt(individuals)|1
Jaccard presence similarity|jaccard|shared/(shared+onlyA+onlyB)|1
Sorensen presence similarity|sorensen|2*shared/(2*shared+onlyA+onlyB)|1
Berger-Parker dominance|dominance|largestSpeciesCount/individuals|1
Whittaker beta diversity|beta|regionalRichness/meanLocalRichness-1|1
Species-area prediction|areaRichness|coefficient*habitatArea^exponent|species
Species-area log slope|areaSlope|ln(richnessB/richnessA)/ln(areaB/areaA)|1
`,'pA,pB,pC strictly positive and sum1 for exactly three species; richness>1, individuals>1. Presence counts disjoint and nonnegative. Area units consistent with coefficient; positive unequal areas for slope.');
F('Biology','Photosynthesis and bioenergetics',{oxygen:'µmol',carbon:'µmol',time:'s',leafArea:'m²',light:'µmol photons/(m²·s)',quantumYield:'mol/mol',maxRate:'µmol CO₂/(m²·s)',respiration:'µmol CO₂/(m²·s)'},`
Leaf-area carbon fixation rate|fixation|carbon/(time*leafArea)|µmol CO₂/(m²·s)
Leaf-area oxygen evolution rate|evolution|oxygen/(time*leafArea)|µmol O₂/(m²·s)
Photosynthetic quotient|quotient|oxygen/carbon|1
Linear light-response net assimilation|linearNet|quantumYield*light-respiration|µmol CO₂/(m²·s)
Rectangular-hyperbola gross assimilation|grossHyperbola|maxRate*quantumYield*light/(maxRate+quantumYield*light)|µmol CO₂/(m²·s)
Hyperbola net assimilation|netHyperbola|grossHyperbola-respiration|µmol CO₂/(m²·s)
ATP production from proton flux|atpRate|protonFlux/protonsPerATP|mol/s
ATP free-energy change|atpG|standardG+8.314462618*T*ln(adpActivity*phosphateActivity/atpActivity)|J/mol
Respiratory quotient|RQ|carbonDioxide/oxygenConsumed|1
Respiration energy per oxygen amount|energyOxygen|energyReleased/oxygenConsumed|J/mol O₂
`,'Idealized empirical light curves; T K, standardG J/mol; positive dimensionless activities, protonFlux mol/s. Respiration gas quantities same mol basis; energyReleased J. No assumed ATP yield or photosynthetic stoichiometry.');
F('Biology','Cardiovascular and respiratory models',{heartRate:'beats/min',strokeVolume:'mL/beat',arterialPressure:'mmHg',venousPressure:'mmHg',oxygenContentA:'mL O₂/L',oxygenContentV:'mL O₂/L',tidal:'mL',deadSpace:'mL',breathing:'min⁻¹'},`
Cardiac output|cardiacOutput|heartRate*strokeVolume/1000|L/min
Pulse pressure|pulsePressure|systolic-diastolic|mmHg
Mean arterial pressure approximation|meanPressure|diastolic+pulsePressure/3|mmHg
Systemic resistance|vascularResistance|(arterialPressure-venousPressure)/cardiacOutput|mmHg·min/L
Fick oxygen consumption|oxygenUse|cardiacOutput*(oxygenContentA-oxygenContentV)|mL O₂/min
Minute ventilation|minuteVentilation|tidal*breathing/1000|L/min
Alveolar ventilation|alveolarVentilation|(tidal-deadSpace)*breathing/1000|L/min
Vital capacity|vitalCapacity|inspiratoryReserve+tidal+expiratoryReserve|mL
Total lung capacity|totalCapacity|vitalCapacity+residualVolume|mL
Respiratory exchange ratio|exchangeRatio|carbonDioxideOutput/oxygenUptake|1
`,'Educational physiology, not clinical diagnosis. Pressures mmHg, lung volumes mL, gas rates same units; positive denominators and tidal≥deadSpace. MAP approximation for ordinary resting waveform.');
F('Biology','Membrane electrical models',{outside:'mol/L',inside:'mol/L',T:'K',z:'1',conductance:'S',voltage:'V',equilibrium:'V',resistance:'Ω',capacitance:'F'},`
Nernst membrane equilibrium potential|nernst|8.314462618*T/(z*96485.33212)*ln(outside/inside)|V
Ion-channel current|ionCurrent|conductance*(voltage-equilibrium)|A
Membrane conductance from resistance|membraneG|1/resistance|S
Membrane electrical time constant|membraneTau|resistance*capacitance|s
Capacitive membrane current|capacitiveCurrent|capacitance*voltageSlope|A
Electrochemical energy per mole|electrochemicalG|8.314462618*T*ln(inside/outside)+z*96485.33212*voltage|J/mol
GHK monovalent membrane potential|ghk|8.314462618*T/96485.33212*ln((PK*Ko+PNa*Nao+PCl*Cli)/(PK*Ki+PNa*Nai+PCl*Clo))|V
Cable length constant|lengthConstant|sqrt(radius*membraneSpecificResistance/(2*axialResistivity))|m
Passive voltage attenuation|attenuation|initialVoltage*exp(-distance/lengthConstant)|V
Ohmic driving voltage|drivingVoltage|voltage-equilibrium|V
`,'Voltage inside minus outside; T K, z nonzero signed charge. GHK positive concentrations same units, permeabilities same basis. Cable radius,distance meters, specific resistance Ω·m², axial resistivity Ω·m; voltageSlope V/s.');
F('Biology','Genetic mapping and quantitative genetics',{recombinants:'individuals',offspring:'individuals',additiveVariance:'trait²',phenotypeVariance:'trait²',geneticVariance:'trait²',selectionDifference:'trait',response:'trait'},`
Recombination fraction|recombination|recombinants/offspring|1
Short-interval genetic map distance|mapDistance|100*recombination|cM
Haldane map distance|haldane|-50*ln(1-2*recombination)|cM
Kosambi map distance|kosambi|25*ln((1+2*recombination)/(1-2*recombination))|cM
Coefficient of coincidence|coincidence|observedDouble/expectedDouble|1
Crossover interference|interference|1-coincidence|1
Narrow-sense heritability|narrowH|additiveVariance/phenotypeVariance|1
Broad-sense heritability|broadH|geneticVariance/phenotypeVariance|1
Breeder response to selection|breederResponse|narrowH*selectionDifference|trait
Realized heritability|realizedH|response/selectionDifference|1
`,'Mapping 0≤recombination<0.5 for finite map functions; offspring, expectedDouble>0. Quantitative-genetics variance components nonnegative and ≤phenotypeVariance. Breeder equation assumes additive model and comparable environments.');
// Finance.
F('Finance','Growing and due annuities',{payment:'currency units',r:'decimal/period',g:'decimal/period',n:'periods',PV:'currency units'},`
Growing annuity present value|growingPV|payment/(r-g)*(1-((1+g)/(1+r))^n)|currency units
Growing annuity future value|growingFV|payment*((1+r)^n-(1+g)^n)/(r-g)|currency units
Annuity-due present value|duePV|payment*(1+r)*(1-(1+r)^(-n))/r|currency units
Annuity-due future value|dueFV|payment*(1+r)*((1+r)^n-1)/r|currency units
Deferred annuity present value|deferredPV|payment*(1-(1+r)^(-n))/r/(1+r)^deferral|currency units
Capital recovery factor|recoveryFactor|r/(1-(1+r)^(-n))|1/period
Sinking-fund factor|sinkingFactor|r/((1+r)^n-1)|1/period
Present value at equal growth and discount|equalPV|payment*n/(1+r)|currency units
Future value at equal growth and discount|equalFV|payment*n*(1+r)^(n-1)|currency units
Due deposit required for target|dueDeposit|targetFV/((1+r)*((1+r)^n-1)/r)|currency units
`,'Fixed period basis; r,g>-1, n positive integer; r≠g for general growing formulas, r≠0 for divided-rate formulas; deferral integer≥0. Payments start at period1 except due at period0.');
F('Finance','Loans and repayment planning',{balance:'currency units',payment:'currency units',r:'decimal/period',n:'periods',extra:'currency units',fee:'currency units'},`
Interest portion next payment|interestPortion|balance*r|currency units
Principal portion next payment|principalPortion|payment-interestPortion|currency units
Balance after next payment|nextBalance|balance*(1+r)-payment|currency units
Balance with extra repayment|extraBalance|nextBalance-extra|currency units
Interest-only payment|interestOnly|balance*r|currency units
Balloon balance after n payments|balloon|balance*(1+r)^n-payment*((1+r)^n-1)/r|currency units
Present value with final balloon|balloonPV|payment*(1-(1+r)^(-n))/r+finalBalloon/(1+r)^n|currency units
Loan-to-value ratio|LTV|balance/propertyValue|1
Refinancing fee break-even months|refiMonths|fee/monthlySaving|months
Debt-service coverage|DSCR|netOperatingIncome/annualDebtService|1
`,'Fixed nonzero r for balloon formulas, positive denominators; equal end-period payments. Extra payment cannot imply a negative actual loan balance; fee break-even ignores time value. Ratios are calculations, not lending advice.');
F('Finance','Bond rates and prices',{face:'currency units',coupon:'currency units/period',price:'currency units',periods:'periods',rate:'decimal/period',time:'years'},`
Coupon rate|couponRate|coupon*frequency/face|decimal/year
Annual coupon payment|annualCoupon|face*annualCouponRate|currency units/year
Approximate yield to maturity|approxYTM|(annualCoupon+(face-price)/time)/((face+price)/2)|decimal/year
Zero-coupon yield|zeroYield|(face/price)^(1/periods)-1|decimal/period
Bank discount yield|discountYield|(face-price)/face*360/days|decimal/year
Money-market investment yield|investmentYield|(face-price)/price*365/days|decimal/year
Accrued coupon interest|accrued|coupon*elapsedDays/couponDays|currency units
Dirty bond price|dirty|clean+accrued|currency units
Macaulay duration from supplied weighted sum|duration|weightedPV/price|years
Modified duration|modifiedDuration|duration/(1+annualYield/frequency)|years
`,'Positive face,price,days,couponDays,time. weightedPV=sum time(years)×PV(cashflow). frequency coupons/year, annualYield decimal. Approximate YTM is not exact; actual day-count conventions may differ.');
F('Finance','Duration and fixed-income risk',{price:'currency units',duration:'years',convexity:'years²',yieldChange:'decimal/year',modifiedDuration:'years',PVup:'currency units',PVdown:'currency units',PVbase:'currency units'},`
First-order bond price change|durationChange|-price*modifiedDuration*yieldChange|currency units
Duration-convexity price change|convexityChange|price*(-modifiedDuration*yieldChange+convexity*yieldChange^2/2)|currency units
Effective duration|effectiveDuration|(PVdown-PVup)/(2*PVbase*yieldChange)|years
Effective convexity|effectiveConvexity|(PVdown+PVup-2*PVbase)/(PVbase*yieldChange^2)|years²
Dollar value of one basis point|DV01|price*modifiedDuration*0.0001|currency units/bp
Portfolio duration two assets|portfolioDuration|weightA*durationA+(1-weightA)*durationB|years
Continuously compounded spot discount|spotDiscount|exp(-spotRate*time)|1
Forward rate from annual spots|forwardRate|((1+spotLong)^longTime/(1+spotShort)^shortTime)^(1/(longTime-shortTime))-1|decimal/year
Forward discount factor|forwardDiscount|discountLong/discountShort|1
Two-position dollar duration|dollarDuration|valueA*durationA+valueB*durationB|currency units·years
`,'Consistent yield basis; nonzero yieldChange, PVbase>0. durations in years, weights sum1, time years, longTime>shortTime; no guarantee of market price response.');
F('Finance','Two-asset portfolio risk',{weightA:'1',returnA:'decimal/period',returnB:'decimal/period',sigmaA:'decimal/period',sigmaB:'decimal/period',correlation:'1',riskFree:'decimal/period'},`
Two-asset expected return|portfolioReturn|weightA*returnA+(1-weightA)*returnB|decimal/period
Two-asset return variance|portfolioVariance|weightA^2*sigmaA^2+(1-weightA)^2*sigmaB^2+2*weightA*(1-weightA)*sigmaA*sigmaB*correlation|return²
Two-asset volatility|portfolioSigma|sqrt(portfolioVariance)|decimal/period
Asset covariance|covariance|correlation*sigmaA*sigmaB|return²
Minimum variance weight|minimumWeight|(sigmaB^2-covariance)/(sigmaA^2+sigmaB^2-2*covariance)|1
Portfolio beta two assets|portfolioBeta|weightA*betaA+(1-weightA)*betaB|1
Sharpe ratio|sharpe|(portfolioReturn-riskFree)/portfolioSigma|1
Treynor ratio|treynor|(portfolioReturn-riskFree)/portfolioBeta|decimal/period
Jensen alpha|alpha|portfolioReturn-(riskFree+portfolioBeta*(marketReturn-riskFree))|decimal/period
Information ratio|information|(portfolioReturn-benchmarkReturn)/trackingError|1
`,'Same return period, sigma≥0, correlation in [-1,1]; nonzero risk denominators. MinimumWeight unrestricted mathematically; shorting constraints require optimization. Supplied expected/model returns, not forecasts or recommendations.');
F('Finance','Equity valuation and distributions',{D1:'currency units/share',D2:'currency units/share',g:'decimal/year',r:'decimal/year',earnings:'currency units/share',book:'currency units/share',price:'currency units/share'},`
Gordon-growth share value|gordon|D1/(r-g)|currency units/share
Two-stage dividend value|twoStage|D1/(1+r)+(D2+terminalValue)/(1+r)^2|currency units/share
Retention ratio|retention|1-payout|1
Sustainable growth rate|sustainable|ROE*retention|decimal/year
Justified forward PE|justifiedPE|payout/(r-g)|1
Price-to-book ratio|priceBook|price/book|1
Earnings yield|earningsYield|earnings/price|1
Dividend per share|dividendShare|totalDividends/shares|currency units/share
Payout ratio from per-share figures|payoutRatio|dividendShare/earnings|1
Enterprise value|EV|equityValue+debtValue+preferredValue+minorityInterest-cash|currency units
`,'Gordon r>g and g>-1; per-share quantities consistent and positive denominators. payout,ROE decimals, aggregate values same currency. Supplied forecasts; valuation model assumptions do not predict market value.');
F('Finance','Business accounting ratios',{revenue:'currency units/year',COGS:'currency units/year',assets:'currency units',equity:'currency units',income:'currency units/year',inventory:'currency units',receivables:'currency units'},`
Gross profit|grossProfit|revenue-COGS|currency units/year
Gross margin|grossMargin|grossProfit/revenue|1
Return on assets|ROA|income/assets|year⁻¹
Return on equity|ROE|income/equity|year⁻¹
Asset turnover|assetTurnover|revenue/assets|year⁻¹
Equity multiplier|equityMultiplier|assets/equity|1
DuPont ROE|dupont|netMargin*assetTurnover*equityMultiplier|year⁻¹
Inventory turnover|inventoryTurnover|COGS/inventory|year⁻¹
Days sales outstanding|DSO|365*receivables/revenue|days
Interest coverage|interestCoverage|EBIT/interestExpense|1
`,'Use annual flows, average balance-sheet assets/equity/inventory/receivables where appropriate, positive denominators. income net income, netMargin decimal, EBIT and interestExpense same annual currency basis.');
F('Finance','Working capital and cash flows',{COGS:'currency units/year',inventory:'currency units',payables:'currency units',DSO:'days',EBIT:'currency units/year',taxRate:'decimal',depreciation:'currency units/year'},`
Days inventory outstanding|DIO|365*inventory/COGS|days
Days payable outstanding|DPO|365*payables/COGS|days
Cash conversion cycle|CCC|DIO+DSO-DPO|days
Net working capital|NWC|currentAssets-currentLiabilities|currency units
NOPAT|NOPAT|EBIT*(1-taxRate)|currency units/year
Free cash flow to firm|FCFF|NOPAT+depreciation-capex-changeNWC|currency units/year
Free cash flow to equity|FCFE|netIncome+depreciation-capex-changeNWC+netBorrowing|currency units/year
Operating cash flow indirect|OCF|netIncome+depreciation-changeNWC|currency units/year
Cash-flow yield|cashYield|FCFE/equityMarketValue|year⁻¹
Economic value added|EVA|NOPAT-investedCapital*costOfCapital|currency units/year
`,'Same accounting year/currency; changeNWC increase consumes cash. taxRate in [0,1]; costOfCapital decimal/year, capex and borrowing annual flows. Simplified accounting models; OCF excludes other noncash adjustments.');
F('Finance','Returns fees and inflation',{beginValue:'currency units',endValue:'currency units',dividend:'currency units',feeRate:'decimal/year',nominalRate:'decimal/year',inflation:'decimal/year',years:'years'},`
Log investment return|logReturn|ln(endValue/beginValue)|1
Annualized log return|annualLog|logReturn/years|year⁻¹
One-period after-fee growth|netGrowth|(1+nominalRate)*(1-feeRate)-1|decimal/year
After-tax income|netIncome|grossIncome*(1-taxRate)|currency units
Inflation-adjusted future purchasing value|realValue|endValue/(1+inflation)^years|currency units
Annual fee amount|fee|beginValue*feeRate|currency units/year
Tax-equivalent taxable yield|taxEquivalent|taxFreeYield/(1-taxRate)|decimal/year
After-tax capital gain|netGain|(salePrice-costBasis)*(1-capitalGainTax)|currency units
Future inflation price|futurePrice|currentPrice*(1+inflation)^years|currency units
Multiplicative two-period return|linkedReturn|(1+periodReturnA)*(1+periodReturnB)-1|1
`,'User-supplied fixed rates only, no jurisdiction tables; positive prices/time, rates>-1, fees and tax rates [0,1), no timing/withdrawal assumptions. Fee convention here charged on grown balance.');
F('Finance','Project evaluation and depreciation',{initial:'currency units',cashA:'currency units',cashB:'currency units',cashC:'currency units',r:'decimal/year',cost:'currency units',salvage:'currency units',life:'years',year:'years'},`
Three-year project NPV|projectNPV|-initial+cashA/(1+r)+cashB/(1+r)^2+cashC/(1+r)^3|currency units
Profitability index|profitability|(projectNPV+initial)/initial|1
Simple constant-cash-flow payback|payback|initial/annualCash|years
Equivalent annual value|annualValue|projectNPV*r/(1-(1+r)^(-life))|currency units/year
Double-declining depreciation rate|decliningRate|2/life|year⁻¹
Declining balance before salvage floor|decliningBook|cost*(1-decliningRate)^year|currency units
Sum-of-years denominator|yearSum|life*(life+1)/2|year²
Sum-of-years depreciation|yearDepreciation|(cost-salvage)*(life-year+1)/yearSum|currency units/year
Units-of-production depreciation|unitDepreciation|(cost-salvage)*unitsUsed/lifetimeUnits|currency units
Accounting return on average book investment|accountingReturn|annualProfit/((cost+salvage)/2)|year⁻¹
`,'Three end-year cash flows. NPV fixed r>-1; annualValue requires r≠0. Depreciation useful life integer,1≤year≤life, salvage≤cost; decliningBook before salvage floor and life≥2. No tax schedules assumed.');
// Statistics.
F('Statistics','Descriptive aggregates',{sum:'data units',sumSquares:'data units²',n:'observations',mean:'data units',sd:'data units',q1:'data units',q3:'data units',median:'data units'},`
Population variance from aggregates|popVariance|sumSquares/n-(sum/n)^2|data units²
Sample variance from aggregates|sampleVariance|(sumSquares-sum^2/n)/(n-1)|data units²
Population standard deviation|popSD|sqrt(popVariance)|data units
Root mean square|rms|sqrt(sumSquares/n)|data units
Coefficient of variation|cv|sd/mean|1
Interquartile range|iqr|q3-q1|data units
Lower Tukey inner fence|lowerFence|q1-1.5*iqr|data units
Upper Tukey inner fence|upperFence|q3+1.5*iqr|data units
Bowley quartile skewness|bowley|(q3+q1-2*median)/iqr|1
Pearson median skewness|pearsonSkew|3*(mean-median)/sd|1
`,'n positive integer and n>1 for sample variance; positive sd/iqr where divided. Raw sums must be internally consistent; q1≤median≤q3. CV convention here signed mean; undefined at zero.');
F('Statistics','Weighted and grouped aggregates',{weightA:'1',weightB:'1',weightC:'1',xA:'data units',xB:'data units',xC:'data units',nA:'observations',nB:'observations',meanA:'data units',meanB:'data units',varA:'data units²',varB:'data units²'},`
Three-value weighted mean|weightedMean|(weightA*xA+weightB*xB+weightC*xC)/(weightA+weightB+weightC)|data units
Weighted population variance|weightedVariance|(weightA*(xA-weightedMean)^2+weightB*(xB-weightedMean)^2+weightC*(xC-weightedMean)^2)/(weightA+weightB+weightC)|data units²
Two-group combined mean|combinedMean|(nA*meanA+nB*meanB)/(nA+nB)|data units
Two-group pooled within variance|pooledVar|((nA-1)*varA+(nB-1)*varB)/(nA+nB-2)|data units²
Combined within-group sum of squares|withinSS|(nA-1)*varA+(nB-1)*varB|data units²
Two-group between sum of squares|betweenSS|nA*(meanA-combinedMean)^2+nB*(meanB-combinedMean)^2|data units²
Combined sample variance|combinedVar|(withinSS+betweenSS)/(nA+nB-1)|data units²
Kish effective sample size three weights|effectiveN|(weightA+weightB+weightC)^2/(weightA^2+weightB^2+weightC^2)|observations
Weighted standard error approximation|weightedSE|sqrt(weightedVariance/effectiveN)|data units
Frequency-weighted total|weightedTotal|weightA*xA+weightB*xB+weightC*xC|data units
`,'Nonnegative weights not all zero; group nA,nB integers>1. WeightedSE is heuristic, not a survey-design variance estimator. Pooled within variance assumes common variance for inference.');
F('Statistics','Bernoulli and binomial extensions',{p:'probability',n:'trials',x:'successes'},`
Bernoulli failure probability|q|1-p|probability
Bernoulli variance|bernoulliVar|p*(1-p)|1
Bernoulli standard deviation|bernoulliSD|sqrt(bernoulliVar)|1
Binomial zero-success probability|zeroP|(1-p)^n|probability
Binomial all-success probability|allP|p^n|probability
Binomial at-least-one probability|anyP|1-zeroP|probability
Binomial factorial second moment|factorialMoment|n*(n-1)*p^2|successes²
Binomial skewness|skewness|(1-2*p)/sqrt(n*p*(1-p))|1
Binomial excess kurtosis|kurtosis|(1-6*p*(1-p))/(n*p*(1-p))|1
Binomial sample-proportion variance|proportionVariance|p*(1-p)/n|1
`,'Independent identical Bernoulli trials, integer n>0, 0≤p≤1; skewness/kurtosis require 0<p<1. Exact simple event probabilities; x unused as an input unless a relation needs it.');
F('Statistics','Poisson counts',{lambda:'expected events',x:'events',rate:'events/time',time:'time units'},`
Poisson mean from rate|mean|rate*time|events
Poisson zero probability|zeroP|exp(-lambda)|probability
Poisson exactly-one probability|oneP|lambda*exp(-lambda)|probability
Poisson at-least-one probability|anyP|1-zeroP|probability
Poisson PMF for supplied count|pmf|exp(-lambda+x*ln(lambda)-logfactorial(x))|probability
Poisson variance|variance|lambda|events²
Poisson standard deviation|sd|sqrt(lambda)|events
Poisson skewness|skewness|1/sqrt(lambda)|1
Poisson excess kurtosis|kurtosis|1/lambda|1
Independent Poisson sum mean|sumMean|lambdaA+lambdaB|events
`,'Homogeneous independent Poisson events, lambda>0 for log PMF/moment ratios, x integer≥0. lambdaA,lambdaB≥0. At lambda=0 distribution is degenerate; log-PMF branch not used.');
F('Statistics','Continuous uniform distribution',{a:'data units',b:'data units',x:'data units',p:'probability'},`
Uniform density within interval|density|1/(b-a)|data units⁻¹
Uniform mean|mean|(a+b)/2|data units
Uniform variance|variance|(b-a)^2/12|data units²
Uniform standard deviation|sd|(b-a)/sqrt(12)|data units
Uniform interior CDF|cdf|(x-a)/(b-a)|probability
Uniform quantile|quantile|a+p*(b-a)|data units
Uniform interval probability|intervalP|(upper-lower)/(b-a)|probability
Uniform second raw moment|secondMoment|(a^2+a*b+b^2)/3|data units²
Uniform differential entropy|entropy|ln(b-a)|nats
Uniform excess kurtosis|kurtosis|-6/5|1
`,'b>a; density and CDF formulas apply only a≤x≤b, interval endpoints a≤lower≤upper≤b, p in [0,1]. Differential entropy depends on units.');
F('Statistics','Exponential waiting times',{rate:'time units⁻¹',x:'time units',p:'probability',time:'time units'},`
Exponential probability density|density|rate*exp(-rate*x)|time units⁻¹
Exponential CDF|cdf|1-exp(-rate*x)|probability
Exponential survival|survival|exp(-rate*x)|probability
Exponential quantile|quantile|-ln(1-p)/rate|time units
Exponential mean|mean|1/rate|time units
Exponential variance|variance|1/rate^2|time units²
Exponential median|median|ln(2)/rate|time units
Exponential hazard rate|hazard|rate|time units⁻¹
Exponential second moment|secondMoment|2/rate^2|time units²
Memoryless additional survival|conditionalSurvival|exp(-rate*time)|probability
`,'rate>0, x,time≥0, quantile 0≤p<1. Homogeneous memoryless waiting-time model only.');
F('Statistics','Geometric and negative binomial',{p:'probability',x:'trials',successes:'successes'},`
Geometric trial-count PMF|geometricP|p*(1-p)^(x-1)|probability
Geometric survival after x trials|survival|(1-p)^x|probability
Geometric cumulative probability|cdf|1-(1-p)^x|probability
Geometric variance|variance|(1-p)/p^2|trials²
Geometric skewness|skewness|(2-p)/sqrt(1-p)|1
Negative-binomial trial-count mean|nbMean|successes/p|trials
Negative-binomial trial-count variance|nbVariance|successes*(1-p)/p^2|trials²
Negative-binomial expected failures|nbFailures|successes*(1-p)/p|failures
Negative-binomial PMF failures before successes|nbPMF|exp(logfactorial(failures+successes-1)-logfactorial(failures)-logfactorial(successes-1)+successes*ln(p)+failures*ln(1-p))|probability
Negative-binomial skewness|nbSkewness|(2-p)/sqrt(successes*(1-p))|1
`,'Independent trials, 0<p<1, positive integer successes and x≥1; failures integer≥0, logfactorial arguments≤10000. Trials-until-success convention, not failures-until-success for geometric PMF.');
F('Statistics','Regression diagnostics',{SSE:'response units²',SST:'response units²',n:'observations',parameters:'parameters',Sxx:'predictor units²',x:'predictor units',meanX:'predictor units',slope:'response/predictor',intercept:'response units',y:'response units'},`
Regression residual|residual|y-(intercept+slope*x)|response units
Residual mean square|MSE|SSE/(n-parameters)|response units²
Residual standard error|residualSE|sqrt(MSE)|response units
Regression R squared|R2|1-SSE/SST|1
Adjusted R squared|adjustedR2|1-(1-R2)*(n-1)/(n-parameters)|1
Simple regression slope standard error|slopeSE|residualSE/sqrt(Sxx)|response/predictor
Simple regression leverage at x|leverage|1/n+(x-meanX)^2/Sxx|1
Mean-response standard error|meanResponseSE|residualSE*sqrt(leverage)|response units
Individual prediction standard error|predictionSE|residualSE*sqrt(1+leverage)|response units
Slope t statistic|slopeT|(slope-nullSlope)/slopeSE|1
`,'Ordinary least squares with intercept, n>parameters; simple regression parameters=2, Sxx>0,SST>0, consistent sums of squares. Inference requires independent errors and appropriate linear/variance assumptions.');
F('Statistics','Inference planning and effects',{z:'critical value',sigma:'data units',margin:'data units',p:'probability',n:'observations',meanA:'data units',meanB:'data units',pooledSD:'data units'},`
Mean precision required sample size|meanN|(z*sigma/margin)^2|observations
Proportion precision sample size|proportionN|z^2*p*(1-p)/margin^2|observations
Worst-case proportion sample size|worstN|z^2/(4*margin^2)|observations
Finite-population correction|fpc|sqrt((population-n)/(population-1))|1
Finite-population mean standard error|finiteSE|sigma/sqrt(n)*fpc|data units
Cohen standardized mean difference|cohenD|(meanA-meanB)/pooledSD|1
Hedges small-sample correction|hedgesJ|1-3/(4*df-1)|1
Hedges g|hedgesG|hedgesJ*cohenD|1
Confidence interval width|width|2*margin|data units
Margin ratio after resizing|marginRatio|sqrt(oldN/newN)|1
`,'Sample size outputs are real planning values: round UP manually to integer. Appropriate supplied z, sigma>0, margin>0, population>1 and 0<n≤population. Proportion margin probability units; df>1. Hedges J approximation.');
F('Statistics','Contingency tables and ANOVA',{a:'counts',b:'counts',c:'counts',d:'counts',SSbetween:'data units²',SSwithin:'data units²',groups:'groups',n:'observations'},`
Two-by-two odds ratio|oddsRatio|a*d/(b*c)|1
Exposed risk|riskExposed|a/(a+b)|probability
Unexposed risk|riskUnexposed|c/(c+d)|probability
Relative risk|relativeRisk|riskExposed/riskUnexposed|1
Absolute risk difference|riskDifference|riskExposed-riskUnexposed|1
Log odds-ratio standard error|logORse|sqrt(1/a+1/b+1/c+1/d)|1
Phi coefficient|phi|(a*d-b*c)/sqrt((a+b)*(c+d)*(a+c)*(b+d))|1
ANOVA between mean square|MSbetween|SSbetween/(groups-1)|data units²
ANOVA within mean square|MSwithin|SSwithin/(n-groups)|data units²
ANOVA F statistic|Fstat|MSbetween/MSwithin|1
`,'a,b exposed outcome/non-outcome,c,d unexposed; positive cells for logORSE/odds; independent observations. ANOVA integer n>groups>1, SSwithin>0; equal-variance normal-error assumptions for F inference, no automatic p-value.');
// Mathematics: geometry, precalculus and scalar calculus.
F('Mathematics','Plane geometry extensions',{side:'m',a:'m',b:'m',c:'m',radius:'m',height:'m',diagonalA:'m',diagonalB:'m'},`
Equilateral triangle area|equilateralArea|sqrt(3)*side^2/4|m²
Equilateral triangle altitude|equilateralHeight|sqrt(3)*side/2|m
Heron semiperimeter|semiperimeter|(a+b+c)/2|m
Heron triangle area|heronArea|sqrt(semiperimeter*(semiperimeter-a)*(semiperimeter-b)*(semiperimeter-c))|m²
Triangle inradius|inradius|heronArea/semiperimeter|m
Triangle circumradius|circumradius|a*b*c/(4*heronArea)|m
Rhombus diagonal area|rhombusArea|diagonalA*diagonalB/2|m²
Trapezoid area|trapezoidArea|(a+b)*height/2|m²
Regular polygon area|polygonArea|vertices*side*apothem/2|m²
Regular polygon interior angle|interiorAngle|(vertices-2)*pi/vertices|rad
`,'Positive dimensions; triangle inequalities required; vertices integer≥3, apothem meters. Regular polygon; output angles radians.');
F('Mathematics','Solids extensions',{radius:'m',height:'m',side:'m',baseArea:'m²',a:'m',b:'m',c:'m',innerRadius:'m',outerRadius:'m'},`
Right cone volume|coneVolume|pi*radius^2*height/3|m³
Right cone slant height|coneSlant|sqrt(radius^2+height^2)|m
Right cone lateral area|coneLateral|pi*radius*coneSlant|m²
Right cone total area|coneArea|coneLateral+pi*radius^2|m²
Pyramid volume|pyramidVolume|baseArea*height/3|m³
Ellipsoid volume|ellipsoidVolume|4*pi*a*b*c/3|m³
Conical frustum volume|frustumVolume|pi*height*(outerRadius^2+outerRadius*innerRadius+innerRadius^2)/3|m³
Spherical cap volume|capVolume|pi*height^2*(radius-height/3)|m³
Spherical cap curved area|capArea|2*pi*radius*height|m²
Torus volume|torusVolume|2*pi^2*majorRadius*minorRadius^2|m³
`,'Positive dimensions; ellipsoid a,b,c semiaxes; cap 0≤height≤2radius; frustum outerRadius≥innerRadius≥0; torus majorRadius>minorRadius>0 meters.');
F('Mathematics','Coordinate geometry',{x1:'coordinate units',y1:'coordinate units',x2:'coordinate units',y2:'coordinate units',x3:'coordinate units',y3:'coordinate units',slope:'1',intercept:'coordinate units'},`
Two-point distance|distance|sqrt((x2-x1)^2+(y2-y1)^2)|coordinate units
Midpoint x coordinate|midX|(x1+x2)/2|coordinate units
Midpoint y coordinate|midY|(y1+y2)/2|coordinate units
Line slope through points|lineSlope|(y2-y1)/(x2-x1)|1
Line y intercept|lineIntercept|y1-lineSlope*x1|coordinate units
Triangle coordinate area|triangleArea|abs(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2|coordinate units²
Point-to-line distance|lineDistance|abs(A*x1+B*y1+C)/sqrt(A^2+B^2)|coordinate units
Internal division x coordinate|divideX|(ratio*x2+x1)/(ratio+1)|coordinate units
Internal division y coordinate|divideY|(ratio*y2+y1)/(ratio+1)|coordinate units
Circle equation residual|circleResidual|(x1-centerX)^2+(y1-centerY)^2-radius^2|coordinate units²
`,'Common Cartesian coordinate units; x2≠x1 for slope, (A,B) not both0, C coordinate units for dimensionless A,B. ratio>0, centerX/centerY/radius coordinate units. Circle residual0 means on circle.');
F('Mathematics','Triangle trigonometry',{a:'length units',b:'length units',c:'length units',angleA:'rad',angleB:'rad',angleC:'rad'},`
Cosine-rule third side|cosineSide|sqrt(a^2+b^2-2*a*b*cos(angleC))|length units
Cosine-rule angle A|cosineAngle|acos((b^2+c^2-a^2)/(2*b*c))|rad
Sine-rule side B|sineSide|a*sin(angleB)/sin(angleA)|length units
Triangle third angle|thirdAngle|pi-angleA-angleB|rad
Included-angle triangle area|trigArea|a*b*sin(angleC)/2|length units²
Triangle height from side and angle|trigHeight|b*sin(angleA)|length units
Sine double angle|sinDouble|2*sin(angleA)*cos(angleA)|1
Cosine double angle|cosDouble|cos(angleA)^2-sin(angleA)^2|1
Sine angle sum|sinSum|sin(angleA)*cos(angleB)+cos(angleA)*sin(angleB)|1
Cosine angle sum|cosSum|cos(angleA)*cos(angleB)-sin(angleA)*sin(angleB)|1
`,'Positive triangle sides with strict triangle inequalities, angles between0 andπ, sumπ. Inverse cosine principal branch; sine rule side calculation does not resolve ambiguous inverse-angle cases.');
F('Mathematics','Sequences and finite series',{first:'value units',difference:'value units/step',ratio:'1',n:'terms',index:'term index'},`
Arithmetic nth term|arithmeticTerm|first+(index-1)*difference|value units
Arithmetic finite sum|arithmeticSum|n*(2*first+(n-1)*difference)/2|value units
Geometric nth term|geometricTerm|first*ratio^(index-1)|value units
Geometric finite sum|geometricSum|first*(1-ratio^n)/(1-ratio)|value units
Sum first n positive integers|integerSum|n*(n+1)/2|1
Sum first n squares|squareSum|n*(n+1)*(2*n+1)/6|1
Sum first n cubes|cubeSum|(n*(n+1)/2)^2|1
Alternating geometric finite sum|alternatingSum|first*(1-(-ratio)^n)/(1+ratio)|value units
Harmonic sequence nth term|harmonicTerm|1/(firstReciprocal+(index-1)*reciprocalDifference)|value units
Geometric series remainder after n terms|remainder|first*ratio^n/(1-ratio)|value units
`,'n,index positive integers; finite geometric sum ratio≠1, alternating ratio≠-1; infinite remainder requires |ratio|<1. Harmonic reciprocal inputs inverse-value units and nonzero term denominator.');
F('Mathematics','Conics and polar forms',{a:'coordinate units',b:'coordinate units',p:'coordinate units',x:'coordinate units',y:'coordinate units',angle:'rad',radius:'coordinate units'},`
Ellipse area|ellipseArea|pi*a*b|coordinate units²
Ellipse focal distance|ellipseFocus|sqrt(a^2-b^2)|coordinate units
Ellipse eccentricity|ellipseE|ellipseFocus/a|1
Hyperbola focal distance|hyperbolaFocus|sqrt(a^2+b^2)|coordinate units
Hyperbola eccentricity|hyperbolaE|hyperbolaFocus/a|1
Parabola y at x|parabolaY|x^2/(4*p)|coordinate units
Polar x coordinate|polarX|radius*cos(angle)|coordinate units
Polar y coordinate|polarY|radius*sin(angle)|coordinate units
Polar conic radius|conicRadius|semiLatus/(1+eccentricity*cos(angle))|coordinate units
Archimedean spiral radius|spiralRadius|initialRadius+growth*angle|coordinate units
`,'Ellipse a≥b>0; hyperbola a,b>0; p≠0. Polar conic focus origin, semiLatus coordinate units and nonnegative e; denominator nonzero. Spiral growth coordinate units/rad.');
F('Mathematics','Derivatives of elementary functions',{x:'1',a:'1',b:'1',n:'1'},`
Derivative sin(ax+b)|dSin|a*cos(a*x+b)|1
Derivative cos(ax+b)|dCos|-a*sin(a*x+b)|1
Derivative tan(ax+b)|dTan|a/cos(a*x+b)^2|1
Derivative exp(ax+b)|dExp|a*exp(a*x+b)|1
Derivative ln(ax+b)|dLn|a/(a*x+b)|1
Derivative base-b exponential|dBase|ln(b)*b^x|1
Derivative arcsin(x)|dAsin|1/sqrt(1-x^2)|1
Derivative arccos(x)|dAcos|-1/sqrt(1-x^2)|1
Derivative arctan(x)|dAtan|1/(1+x^2)|1
Derivative x^x|dSelfPower|x^x*(ln(x)+1)|1
`,'Dimensionless elementary functions; radians; tan derivative excludes poles, ln needs ax+b>0, base exponential b>0, arcsin/arccos derivative |x|<1, self-power x>0.');
F('Mathematics','Exact elementary definite integrals',{a:'1',b:'1',k:'1',n:'1'},`
Integral power x^n from a to b|powerIntegral|(b^(n+1)-a^(n+1))/(n+1)|1
Integral reciprocal x from a to b|reciprocalIntegral|ln(abs(b))-ln(abs(a))|1
Integral sin(kx) from a to b|sineIntegral|(cos(k*a)-cos(k*b))/k|1
Integral cos(kx) from a to b|cosineIntegral|(sin(k*b)-sin(k*a))/k|1
Integral exp(kx) from a to b|exponentialIntegral|(exp(k*b)-exp(k*a))/k|1
Integral 1/(1+x²) from a to b|arctanIntegral|atan(b)-atan(a)|1
Integral 1/sqrt(1-x²) from a to b|arcsinIntegral|asin(b)-asin(a)|1
Integral ln(x) from a to b|logIntegral|b*ln(b)-b-a*ln(a)+a|1
Integral sqrt(x) from a to b|rootIntegral|2*(b^1.5-a^1.5)/3|1
Integral x exp(kx) from a to b|xExpIntegral|(exp(k*b)*(k*b-1)-exp(k*a)*(k*a-1))/k^2|1
`,'Dimensionless proper real integrals; n≠-1 and real power throughout interval; reciprocal same-sign nonzero endpoints; k≠0 for divided-k formulas; arcsin endpoints strictly within(-1,1); log endpoints>0; sqrt endpoints≥0.');
F('Mathematics','Numerical and local calculus',{h:'x units',fa:'y units',fm:'y units',fb:'y units',a:'x units',b:'x units',fPrime:'y/x',fSecond:'y/x²',deltaX:'x units'},`
Single trapezoid integral estimate|trapezoid|(b-a)*(fa+fb)/2|x·y units
Single Simpson panel integral estimate|simpson|(b-a)*(fa+4*fm+fb)/6|x·y units
Midpoint panel integral estimate|midpoint|(b-a)*fm|x·y units
Central first-difference estimate|centralDerivative|(fPlus-fMinus)/(2*h)|y/x units
Central second-difference estimate|centralSecond|(fPlus-2*fCenter+fMinus)/h^2|y/x² units
Linearization prediction|linearPrediction|fCenter+fPrime*deltaX|y units
Quadratic Taylor prediction|quadraticPrediction|linearPrediction+fSecond*deltaX^2/2|y units
Newton next iterate|newtonNext|x-fCenter/fPrime|x units
Secant next iterate|secantNext|xB-fB*(xB-xA)/(fB-fA)|x units
Trapezoid error bound|trapezoidError|abs(b-a)^3*maxSecond/(12*panels^2)|x·y units
`,'Supplied consistent function samples; h≠0, Newton fPrime≠0, secant fB≠fA; Simpson fm at midpoint. Bound needs valid maximum |f″| over interval and positive integer panels; numerical estimates not symbolic proofs.');
F('Mathematics','Vectors and complex numbers',{ax:'units',ay:'units',az:'units',bx:'units',by:'units',bz:'units',real:'1',imaginary:'1'},`
Three-dimensional vector norm|normA|sqrt(ax^2+ay^2+az^2)|units
Three-dimensional dot product|dot|ax*bx+ay*by+az*bz|units²
Cross product x component|crossX|ay*bz-az*by|units²
Cross product y component|crossY|az*bx-ax*bz|units²
Cross product z component|crossZ|ax*by-ay*bx|units²
Vector angle|vectorAngle|acos(dot/(normA*sqrt(bx^2+by^2+bz^2)))|rad
Complex modulus|modulus|sqrt(real^2+imaginary^2)|1
Complex product real part|productReal|real*secondReal-imaginary*secondImaginary|1
Complex product imaginary part|productImaginary|real*secondImaginary+imaginary*secondReal|1
Complex reciprocal real part|reciprocalReal|real/(real^2+imaginary^2)|1
`,'Common vector component units, nonzero vectors for angle; principal acos. Complex numbers dimensionless and nonzero denominator for reciprocal; supplied real/imaginary components.');
// Economics: microeconomics and macroeconomics.
F('Economics','Linear supply and demand',{demandIntercept:'price units',demandSlope:'price/quantity',supplyIntercept:'price units',supplySlope:'price/quantity',quantity:'quantity units',price:'price units'},`
Inverse linear demand price|demandPrice|demandIntercept-demandSlope*quantity|price units
Inverse linear supply price|supplyPrice|supplyIntercept+supplySlope*quantity|price units
Market-clearing quantity|equilibriumQuantity|(demandIntercept-supplyIntercept)/(demandSlope+supplySlope)|quantity units
Market-clearing price|equilibriumPrice|demandIntercept-demandSlope*equilibriumQuantity|price units
Linear demand quantity at price|demandQuantity|(demandIntercept-price)/demandSlope|quantity units
Linear supply quantity at price|supplyQuantity|(price-supplyIntercept)/supplySlope|quantity units
Market excess demand|excessDemand|demandQuantity-supplyQuantity|quantity units
Linear-market consumer surplus|consumerSurplus|(demandIntercept-equilibriumPrice)*equilibriumQuantity/2|currency units
Linear-market producer surplus|producerSurplus|(equilibriumPrice-supplyIntercept)*equilibriumQuantity/2|currency units
Total market surplus|marketSurplus|consumerSurplus+producerSurplus|currency units
`,'Positive supply/demand slopes, demandIntercept>supplyIntercept, interior positive equilibrium. Prices currency/quantity; no truncated negative demand or supply quantities; formulas only in active positive curve domains.');
F('Economics','Specific taxes and subsidies',{demandIntercept:'currency/unit',demandSlope:'currency/unit²',supplyIntercept:'currency/unit',supplySlope:'currency/unit²',tax:'currency/unit',subsidy:'currency/unit'},`
Taxed market quantity|taxQuantity|(demandIntercept-supplyIntercept-tax)/(demandSlope+supplySlope)|units
Buyer price after unit tax|buyerPrice|demandIntercept-demandSlope*taxQuantity|currency/unit
Seller price net of unit tax|sellerPrice|buyerPrice-tax|currency/unit
Unit-tax revenue|taxRevenue|tax*taxQuantity|currency
Untaxed comparison quantity|baseQuantity|(demandIntercept-supplyIntercept)/(demandSlope+supplySlope)|units
Linear unit-tax deadweight loss|taxDWL|tax*(baseQuantity-taxQuantity)/2|currency
Buyer incidence fraction|buyerShare|demandSlope/(demandSlope+supplySlope)|1
Seller incidence fraction|sellerShare|supplySlope/(demandSlope+supplySlope)|1
Subsidized market quantity|subsidyQuantity|(demandIntercept-supplyIntercept+subsidy)/(demandSlope+supplySlope)|units
Total unit-subsidy cost|subsidyCost|subsidy*subsidyQuantity|currency
`,'Linear competitive active curves, slopes>0, tax/subsidy≥0; equilibrium quantities must remain nonnegative. Incidence applies to small/linear unit-tax shifts, not ad valorem taxes.');
F('Economics','Elasticities and expenditure',{dQ:'quantity units',dP:'currency/unit',Q:'quantity units',P:'currency/unit',income:'currency',dIncome:'currency',otherPrice:'currency/unit',dOtherPrice:'currency/unit'},`
Point own-price elasticity|priceElasticity|dQ/dP*P/Q|1
Point income elasticity|incomeElasticity|dQ/dIncome*income/Q|1
Point cross-price elasticity|crossElasticity|dQ/dOtherPrice*otherPrice/Q|1
Midpoint income elasticity|midIncome|((Q2-Q1)/((Q2+Q1)/2))/((income2-income1)/((income2+income1)/2))|1
Midpoint cross-price elasticity|midCross|((Q2-Q1)/((Q2+Q1)/2))/((otherPrice2-otherPrice1)/((otherPrice2+otherPrice1)/2))|1
Linear demand elasticity at quantity|linearElasticity|-P/(slope*Q)|1
Constant-elasticity demand|constantQ|scale*P^elasticity|quantity units
Revenue response differential|dRevenue|Q*(1+priceElasticity)*dP|currency
Expenditure share|expenditureShare|P*Q/income|1
Marginal revenue from elasticity|elasticMR|P*(1+1/priceElasticity)|currency/unit
`,'Nonzero denominators, positive base prices/quantities/income. Derivatives represented by supplied local dQ/dP ratios; elasticity sign retained. scale units depend on elasticity; elasticMR assumes differentiable inverse demand.');
F('Economics','Consumer choice and utility',{x:'good X units',y:'good Y units',alpha:'1',beta:'1',priceX:'currency/X',priceY:'currency/Y',income:'currency'},`
Cobb-Douglas utility|utility|x^alpha*y^beta|utility units
Cobb-Douglas marginal utility X|MUx|alpha*x^(alpha-1)*y^beta|utility/X
Cobb-Douglas marginal utility Y|MUy|beta*x^alpha*y^(beta-1)|utility/Y
Cobb-Douglas MRS magnitude|MRS|alpha*y/(beta*x)|Y/X
Interior optimal X demand|optimalX|alpha/(alpha+beta)*income/priceX|X units
Interior optimal Y demand|optimalY|beta/(alpha+beta)*income/priceY|Y units
Budget line Y intercept|budgetY|income/priceY|Y units
Budget line slope|budgetSlope|-priceX/priceY|Y/X
Budget line affordable Y|affordableY|(income-priceX*x)/priceY|Y units
Marginal utility per currency X|utilityPerDollar|MUx/priceX|utility/currency
`,'x,y,alpha,beta,prices,income>0 for interior Cobb-Douglas. utility cardinal scale arbitrary; affordableY only feasible if≥0. No discrete or corner-choice optimization.');
F('Economics','Production technology',{A:'technology units',K:'capital units',L:'labor units',alpha:'1',beta:'1',wage:'currency/labor',rent:'currency/capital'},`
Cobb-Douglas output|output|A*K^alpha*L^beta|output units
Capital marginal product|MPK|alpha*A*K^(alpha-1)*L^beta|output/capital
Labor marginal product|MPL|beta*A*K^alpha*L^(beta-1)|output/labor
Capital average product|APK|output/K|output/capital
Labor average product|APL|output/L|output/labor
Labor-to-capital MRTS|MRTS|MPL/MPK|capital/labor
Returns-to-scale degree|scaleDegree|alpha+beta|1
Conditional cost-minimizing capital labor ratio|optimalRatio|alpha*wage/(beta*rent)|capital/labor
Two-factor total cost|factorCost|wage*L+rent*K|currency
Labor marginal revenue product|MRPL|MPL*outputPrice|currency/labor
`,'Positive A,K,L,alpha,beta,wage,rent; Cobb-Douglas differentiable production, price-taking factor/output markets for MRPL and interior cost ratio. outputPrice currency/output.');
F('Economics','Firm pricing and market power',{intercept:'currency/unit',slope:'currency/unit²',quantity:'units',MC:'currency/unit',fixed:'currency'},`
Linear-demand revenue|revenue|intercept*quantity-slope*quantity^2|currency
Linear-demand marginal revenue|MR|intercept-2*slope*quantity|currency/unit
Constant-MC monopoly quantity|monopolyQ|(intercept-MC)/(2*slope)|units
Constant-MC monopoly price|monopolyP|(intercept+MC)/2|currency/unit
Constant-MC monopoly profit|monopolyProfit|(monopolyP-MC)*monopolyQ-fixed|currency
Lerner index|lerner|(price-MC)/price|1
Lerner index from demand elasticity|elasticLerner|-1/elasticity|1
Herfindahl index three firms|HHI|10000*(shareA^2+shareB^2+shareC^2)|points
Cournot identical-firm output per firm|cournotFirm|(intercept-MC)/(slope*(firms+1))|units
Cournot market price|cournotPrice|(intercept+firms*MC)/(firms+1)|currency/unit
`,'Linear demand intercept>MC≥0,slope>0; monopoly interior. shares fractional and sum1 for three firms; firms positive integer, homogeneous-product symmetric Cournot with constant MC. No antitrust threshold assumed.');
F('Economics','Externalities and public policy',{privateMC:'currency/unit',externalMC:'currency/unit',privateMB:'currency/unit',externalMB:'currency/unit',quantity:'units',intercept:'currency/unit',slope:'currency/unit²'},`
Marginal social cost|MSC|privateMC+externalMC|currency/unit
Marginal social benefit|MSB|privateMB+externalMB|currency/unit
Constant marginal Pigouvian tax|pigouTax|externalMC|currency/unit
Constant marginal subsidy for benefit|pigouSubsidy|externalMB|currency/unit
Linear optimal quantity with external cost|socialQ|(intercept-privateMC-externalMC)/slope|units
Linear private-market quantity|privateQ|(intercept-privateMC)/slope|units
External cost total constant margin|externalCost|externalMC*quantity|currency
Externality deadweight loss linear model|externalDWL|externalMC*(privateQ-socialQ)/2|currency
Cost-effectiveness ratio|costEffectiveness|programCost/unitsAvoided|currency/unit avoided
Benefit-cost ratio public project|benefitCost|discountedBenefits/discountedCosts|1
`,'Constant marginal external cost/benefit and linear MB for displayed quantity/DWL formulas; socialQ≥0. Policy rates are textbook model values, not legal tax recommendations; all project values comparable discounted currency.');
F('Economics','Keynesian expenditure model',{autonomousC:'currency/period',MPC:'1',income:'currency/period',tax:'currency/period',investment:'currency/period',government:'currency/period',exports:'currency/period',imports:'currency/period'},`
Consumption with lump-sum tax|consumption|autonomousC+MPC*(income-tax)|currency/period
Disposable income|disposable|income-tax|currency/period
Private saving|privateSaving|disposable-consumption|currency/period
Government saving|governmentSaving|tax-government|currency/period
National saving|nationalSaving|privateSaving+governmentSaving|currency/period
Net exports|netExports|exports-imports|currency/period
Aggregate planned expenditure|planned|consumption+investment+government+netExports|currency/period
Closed-economy equilibrium income|equilibriumIncome|(autonomousC-MPC*tax+investment+government)/(1-MPC)|currency/period
Open-economy induced-import multiplier|openMultiplier|1/(1-MPC+marginalImport)|1
Proportional-tax spending multiplier|taxMultiplier|1/(1-MPC*(1-taxRate))|1
`,'0≤MPC<1, marginalImport≥0, taxRate[0,1]; linear fixed-price model. EquilibriumIncome closed economy lump-sum tax; multiplier variants separate model assumptions, not simultaneous forecasts.');
F('Economics','Growth and national accounts',{realGDP:'currency/year',population:'persons',capital:'currency',investment:'currency/year',depreciationRate:'year⁻¹',savingRate:'1',outputPerWorker:'currency/(worker·year)'},`
Real GDP per capita|GDPperson|realGDP/population|currency/(person·year)
Labor productivity|laborProductivity|realGDP/hoursWorked|currency/hour
Capital depreciation flow|depreciation|capital*depreciationRate|currency/year
Net investment|netInvestment|investment-depreciation|currency/year
Net domestic product|NDP|GDP-depreciation|currency/year
Gross national income|GNI|GDP+netFactorIncome|currency/year
Solow saving per worker|savingWorker|savingRate*outputPerWorker|currency/(worker·year)
Solow break-even investment per worker|breakEvenInvestment|(depreciationRate+populationGrowth)*capitalPerWorker|currency/(worker·year)
Solow capital-per-worker change|capitalChange|savingWorker-breakEvenInvestment|currency/(worker·year)
Rule of 70 doubling approximation|doublingYears|70/growthPercent|years
`,'Consistent annual real or nominal accounting basis; hoursWorked total annual hours, GDP/netFactorIncome same currency/year. Solow continuous small-rate no technical progress; populationGrowth decimal/year; positive growthPercent percent/year.');
F('Economics','Money exchange and inflation',{money:'currency',velocity:'year⁻¹',priceLevel:'index factor',realOutput:'real currency/year',nominalExchange:'domestic/foreign',foreignPrice:'foreign currency/basket',domesticPrice:'domestic currency/basket'},`
Quantity-theory nominal spending|nominalSpending|money*velocity|currency/year
Quantity-theory price level|impliedPrice|money*velocity/realOutput|index factor
Real money balances|realBalances|money/priceLevel|real currency
Real exchange rate|realExchange|nominalExchange*foreignPrice/domesticPrice|1
Absolute purchasing-power parity rate|PPP|domesticPrice/foreignPrice|domestic/foreign
Relative PPP predicted exchange rate|nextExchange|nominalExchange*(1+domesticInflation)/(1+foreignInflation)|domestic/foreign
Covered interest-parity forward exchange|forwardExchange|nominalExchange*(1+domesticRate)/(1+foreignRate)|domestic/foreign
Seigniorage real revenue|seigniorage|moneyIncrease/priceLevel|real currency
Inflation tax approximation|inflationTax|inflationRate*realBalances|real currency/year
Exchange conversion foreign to domestic|domesticAmount|foreignAmount*nominalExchange|domestic currency
`,'Supply exchange rate: no live FX. Quote domestic currency per foreign unit, positive prices/exchange, same interest horizon and rates>-1. Quantity theory identity not causal forecast; inflation tax small annual-rate approximation.');
// Environmental science.
F('Environmental science','Water balances and pollutant loads',{flow:'m³/s',concentration:'kg/m³',volume:'m³',time:'s',area:'m²',depth:'m'},`
Pollutant mass flux|load|flow*concentration|kg/s
Hydraulic retention time|retentionTime|volume/flow|s
Water depth from volume|waterDepth|volume/area|m
Rainfall volume on catchment|rainVolume|depth*area|m³
Runoff volume|runoffVolume|rainVolume*runoffCoefficient|m³
Mean runoff discharge|runoffFlow|runoffVolume/time|m³/s
Mixed concentration two streams|mixedC|(flowA*concA+flowB*concB)/(flowA+flowB)|kg/m³
Pollutant inventory|inventory|concentration*volume|kg
Dilution factor|dilutionFactor|initialConcentration/finalConcentration|1
Residence flushing fraction|flushed|1-exp(-flow*time/volume)|1
`,'Positive volume/flow/area/time; runoffCoefficient[0,1]. flowA/B m³/s, concA/B kg/m³. Perfectly mixed conservative flushing, constant volume, zero contaminant inflow; supplied concentrations same basis.');
F('Environmental science','Treatment and reactor models',{influent:'kg/m³',effluent:'kg/m³',flow:'m³/s',volume:'m³',k:'s⁻¹',time:'s',area:'m²'},`
Removal fraction|removal|(influent-effluent)/influent|1
Removed load|removedLoad|flow*(influent-effluent)|kg/s
First-order batch concentration|batchC|influent*exp(-k*time)|kg/m³
First-order plug-flow effluent|plugC|influent*exp(-k*volume/flow)|kg/m³
First-order mixed-tank effluent|mixedC|influent/(1+k*volume/flow)|kg/m³
Mixed-tank volume for target|requiredV|flow/k*(influent/effluent-1)|m³
Surface overflow rate|overflow|flow/area|m/s
Solids mass loading|solidsLoad|flow*solidsConcentration|kg/s
Solids retention time|solidsTime|reactorSolids/wastedSolidsRate|s
Disinfection CT product|CT|disinfectantConcentration*contactMinutes|mg·min/L
`,'Idealized steady first-order reactors, positive k,V,Q; removal may negative if concentration increases, not capped. reactorSolids kg,wastedSolidsRate kg/s. CT mg/L × minutes, no pathogen-specific safety threshold.');
F('Environmental science','Oxygen and aquatic quality',{BODultimate:'mg/L',k:'day⁻¹',time:'days',DOsat:'mg/L',DO:'mg/L',kReaeration:'day⁻¹',initialDeficit:'mg/L'},`
Remaining biochemical oxygen demand|remainingBOD|BODultimate*exp(-k*time)|mg/L
Exerted BOD|exertedBOD|BODultimate-remainingBOD|mg/L
Dissolved oxygen deficit|deficit|DOsat-DO|mg/L
Streeter-Phelps deficit|sag|k*BODultimate/(kReaeration-k)*(exp(-k*time)-exp(-kReaeration*time))+initialDeficit*exp(-kReaeration*time)|mg/L
Predicted oxygen along sag|predictedDO|DOsat-sag|mg/L
Oxygen saturation fraction|saturation|DO/DOsat|1
Sediment oxygen demand total|sedimentDemand|sedimentRate*bedArea|mg/day
Reaeration oxygen rate|reaerationRate|kReaeration*deficit|mg/(L·day)
Ammonia nitrification oxygen requirement|nitrificationOxygen|4.57*ammoniaNitrogen|mg O₂/L
Alkalinity in CaCO3 equivalents|alkalinity|50*equivalentsPerLiter|g CaCO₃/L
`,'k,reaeration positive distinct; simple oxygen-sag model constant temperature/flow, no photosynthesis/dispersion. sedimentRate mg/(m²·day),bedArea m², ammoniaNitrogen mg N/L; stoichiometric nitrification factor, no design guarantee.');
F('Environmental science','Atmospheric concentration and ventilation',{pressure:'Pa',T:'K',molarMass:'g/mol',ppm:'ppmv',flow:'m³/s',volume:'m³',source:'mg/s',outside:'mg/m³'},`
Ideal-gas pollutant mass concentration|gasMass|ppm*pressure*molarMass/(8.314462618*T)*0.001|mg/m³
Ideal-gas pollutant ppm from mass|gasPPM|massConcentration*8.314462618*T/(pressure*molarMass)*1000|ppmv
Air changes per hour|ACH|flow*3600/volume|h⁻¹
Ventilation steady excess concentration|excess|source/flow|mg/m³
Steady indoor concentration|steadyIndoor|outside+excess|mg/m³
Ventilation time constant|airTau|volume/flow|s
Indoor transient concentration|indoorC|steadyIndoor+(initial-steadyIndoor)*exp(-time/airTau)|mg/m³
Emission factor per fuel mass|emissionFactor|emissionMass/fuelMass|kg/kg
Stack pollutant mass flow|stackLoad|stackFlow*stackConcentration|mg/s
Annual air emission mass|annualEmission|stackLoad*operatingSeconds/1e6|kg/year
`,'Positive T,P,Q,V; ideal gas ppmv, molecular weight g/mol. Indoor well-mixed constant source/ventilation, initial mg/m³,time s; stackFlow actual m³/s, concentration mg/m³, operatingSeconds seconds/year. No exposure-limit or safe ventilation claim.');
F('Environmental science','Energy and emissions accounting',{fuel:'kg',heatingValue:'MJ/kg',efficiency:'1',electricity:'kWh',emissionFactor:'kg CO₂/kWh',power:'kW',hours:'h',ratedPower:'kW'},`
Fuel thermal energy|thermalEnergy|fuel*heatingValue|MJ
Useful fuel energy|usefulEnergy|thermalEnergy*efficiency|MJ
Electric generation from useful heat|electricEnergy|usefulEnergy/3.6|kWh
Electricity carbon emissions|electricEmissions|electricity*emissionFactor|kg CO₂
Capacity factor|capacityFactor|electricity/(ratedPower*hours)|1
Power-time energy|powerEnergy|power*hours|kWh
Energy intensity per output|energyIntensity|electricity/output|kWh/output unit
Emission intensity per output|carbonIntensity|electricEmissions/output|kg CO₂/output unit
Avoided power emissions|avoided|savedElectricity*emissionFactor|kg CO₂
Combined heat-power efficiency|CHPefficiency|(electricMJ+heatMJ)/fuelMJ|1
`,'Supplied region/time-specific emission factors; no live emissions database. Nonnegative energy,efficiency/capacity factor≤1; savedElectricity kWh, output>0, electricMJ/heatMJ/fuelMJ same MJ.');
F('Environmental science','Renewable energy models',{rho:'kg/m³',area:'m²',speed:'m/s',Cp:'1',flow:'m³/s',head:'m',efficiency:'1',irradiance:'W/m²',hours:'h'},`
Wind stream power|windPower|rho*area*speed^3/2|W
Wind turbine mechanical output|windOutput|windPower*Cp|W
Wind Betz-limit output|betzPower|windPower*16/27|W
Rotor swept area|rotorArea|pi*radius^2|m²
Hydropower output|hydroPower|rho*9.80665*flow*head*efficiency|W
Solar collector incident power|solarIncident|irradiance*area|W
Solar electric output|solarOutput|solarIncident*efficiency|W
Solar energy for constant irradiance|solarEnergy|solarOutput*hours/1000|kWh
Array area for rated output|arrayArea|ratedWatts/(irradiance*efficiency)|m²
Solar thermal heat rate|solarHeat|massFlow*specificHeat*temperatureRise|W
`,'Ideal steady supplied conditions; radius m, Cp0..16/27 for ideal isolated wind rotor, efficiency0..1. Hydro rho water density kg/m³; massFlow kg/s,specificHeat J/(kg·K),temperatureRise K. No annual-weather prediction.');
F('Environmental science','Waste and circular material flows',{generated:'kg/year',recycled:'kg/year',composted:'kg/year',recoveredEnergy:'kg/year',population:'persons',density:'kg/m³',mass:'kg',lifetime:'years'},`
Recycling fraction|recycling|recycled/generated|1
Waste diversion fraction|diversion|(recycled+composted+recoveredEnergy)/generated|1
Landfilled residual|landfilled|generated-recycled-composted-recoveredEnergy|kg/year
Per-capita annual waste|perCapita|generated/population|kg/(person·year)
Landfill volume demand|landfillVolume|landfilled/density|m³/year
Landfill remaining service time|landfillLife|availableVolume/landfillVolume|years
Reusable product annualized material|annualMaterial|mass/lifetime|kg/year
Recycling process yield|processYield|recoveredMass/inputMass|1
Contamination fraction|contamination|contaminantMass/inputMass|1
Recovered-resource substitution|avoidedVirgin|recoveredMass*substitutionFactor|kg
`,'Waste categories disjoint, sum≤generated; density>0,population>0. availableVolume m³; recovery/substitution model-specific factors in[0,1], masses kg. No assumption all collected recycling is recovered.');
F('Environmental science','Carbon stock and land models',{area:'ha',carbonDensity:'tonnes C/ha',biomass:'tonnes dry biomass',carbonFraction:'1',time:'years',emissionCarbon:'tonnes C',GWP:'1'},`
Land carbon stock|carbonStock|area*carbonDensity|tonnes C
Biomass carbon stock|biomassCarbon|biomass*carbonFraction|tonnes C
Carbon-to-carbon-dioxide mass|CO2mass|emissionCarbon*44/12|tonnes CO₂
Annual carbon stock change|annualChange|(finalStock-initialStock)/time|tonnes C/year
Carbon dioxide equivalent|CO2e|gasMass*GWP|tonnes CO₂e
Land sequestration rate|sequestration|area*perHectareRate|tonnes C/year
Emission offset fraction|offset|sequestration/emittedCarbonPerYear|1
Forest biomass increment|biomassIncrement|finalBiomass-initialBiomass|tonnes dry biomass
Carbon stock loss fraction|lossFraction|(initialStock-finalStock)/initialStock|1
Atmospheric carbon stock from ppm increment approximation|atmosphericC|ppmIncrement*2.12|Gt C
`,'Supplied stock densities/fractions and assessment-period-specific GWP (not hard-coded). gasMass tonnes,perHectareRate tonnes C/(ha·year). Atmospheric 2.12 Gt C/ppm global approximation; land stocks not guaranteed permanent offsets.');
F('Environmental science','Soils and erosion',{sand:'percent',silt:'percent',clay:'percent',bulkDensity:'g/cm³',particleDensity:'g/cm³',waterMass:'g',dryMass:'g',R:'USLE units',K:'USLE units',LS:'1',C:'1',P:'1'},`
Soil texture fraction total|textureTotal|sand+silt+clay|percent
Soil porosity|porosity|1-bulkDensity/particleDensity|1
Gravimetric soil water|gravimetricWater|waterMass/dryMass|g/g
Volumetric soil water|volumetricWater|gravimetricWater*bulkDensity/waterDensity|cm³/cm³
Plant available water fraction|availableWater|fieldCapacity-wiltingPoint|cm³/cm³
Plant available water depth|waterDepth|availableWater*rootDepth|mm
USLE annual soil loss|soilLoss|R*K*LS*C*P|specified USLE mass/(area·year)
Erosion reduction fraction|erosionReduction|1-treatedLoss/untreatedLoss|1
Soil carbon areal stock|soilCarbon|depth*bulkDensitySI*carbonFraction|kg C/m²
Sediment delivery ratio|delivery|deliveredSediment/erodedSoil|1
`,'Texture percentages sum100, 0<bulkDensity≤particleDensity; waterDensity g/cm³ (supply1 approximately if allowed); rootDepth mm. USLE R,K units must match regional definition; depth meters, bulkDensitySI kg/m³,carbonFraction0..1; no site design guarantee.');
F('Environmental science','Resources sustainability and exposure models',{reserve:'tonnes',annualUse:'tonnes/year',growth:'year⁻¹',initialUse:'tonnes/year',dose:'mg',bodyMass:'kg',concentration:'mg/L',ingestion:'L/day'},`
Static resource lifetime|staticLife|reserve/annualUse|years
Exponential-consumption resource lifetime|growthLife|ln(1+growth*reserve/initialUse)/growth|years
Future annual resource use|futureUse|initialUse*exp(growth*years)|tonnes/year
Cumulative exponential use|cumulativeUse|initialUse*(exp(growth*years)-1)/growth|tonnes
Water ingestion mass per day|ingested|concentration*ingestion|mg/day
Body-mass-normalized daily intake|intake|ingested/bodyMass|mg/(kg·day)
Bioconcentration factor|BCF|tissueConcentration/waterConcentration|L/kg
Trophic biomagnification factor|BMF|predatorConcentration/preyConcentration|1
Habitat remaining fraction|habitatFraction|remainingArea/originalArea|1
Species-area retained fraction|retainedSpecies|habitatFraction^areaExponent|1
`,'Resource depletion closed fixed reserve, growth≠0 and valid log argument; years≥0. Educational intake estimates only, no safety/medical interpretation. Tissue mg/kg vs water mg/L for BCF; BMF same wet/dry basis. Area model empirical exponent supplied.');
E.extendedCatalogue=catalogue;
if(typeof module!=='undefined')module.exports=catalogue;
})(typeof globalThis!=='undefined'?globalThis:this);
