# Equation library expansion — October 6, 2026

800 additional relationship entries: 100 each in eight main subjects. Rearrangements are not counted separately. Mathematics includes geometry, precalculus and scalar calculus; Economics includes microeconomics and macroeconomics.

The resulting shared network contains 2,650 quantities and 1,194 relationships. Each system has isolated measurements, explicit input/output bases, assumptions, and safe single-occurrence rearrangements. Arbitrary simultaneous equations, multivalued inverse branches, symbolic proofs and unbounded integrals are not solved automatically. New specialist units have a fixed displayed basis; the original unit converters remain available for the original systems. Enter rates labeled decimal as fractions (0.05 for 5%). Models require their stated conditions; not all coupled physical conditions are enforced automatically.

New entries overlap familiar principles where a distinct problem model needs them; this is a catalogue-entry count, not a claim of 800 fundamentally independent mathematical laws. No claim of complete AP coverage or College Board endorsement.

Solved targets show the actual expression used, its numeric substitution in base units, and the result. The full dependency chain remains available. Reference constants are calculated but hidden in the initial useful-quantities view unless relevant or selected.

## Further reading

These are supporting textbook/model references, not a claim of a line-by-line audit of all 800 entries.

- Chemistry: https://openstax.org/details/books/chemistry-2e
- Physics: https://openstax.org/details/books/university-physics-volume-1
- Biology: https://openstax.org/details/books/biology-2e
- Finance: https://openstax.org/details/books/principles-finance
- Statistics: https://openstax.org/details/books/introductory-statistics-2e
- Mathematics: https://openstax.org/details/books/calculus-volume-1
- Economics: https://openstax.org/details/books/principles-economics-3e
- Environmental mass balances: https://www3.epa.gov/ceampubl/learn2model/part-two/onsite/usb.html

## Verification

Run node test-library.js and node test-ui.js. Independent numeric examples cover all eight subjects; inverse tests check algebraic identities, parser restrictions and ambiguous inverses. Existing chemistry, science, finance and AP regression tests are retained. Counts and unit/dependency registration are asserted.

## Chemistry — 100 entries

### Real-gas and critical parameters

Van der Waals model, positive T,n,V,a,b and V>nb; B is supplied second virial coefficient in m³/mol. Real-gas model estimates are not measured critical constants.

1. Van der Waals pressure: vdwP = n*8.314462618*T/(V-n*b)-a*n^2/V^2 [Pa]
2. Compressibility factor: Z = P*V/(n*8.314462618*T) [1]
3. Molar volume: Vm = V/n [m³/mol]
4. Second-virial compressibility: Zvirial = 1+B/Vm [1]
5. Boyle temperature: boyleT = a/(8.314462618*b) [K]
6. Critical temperature (van der Waals): Tc = 8*a/(27*8.314462618*b) [K]
7. Critical pressure (van der Waals): Pc = a/(27*b^2) [Pa]
8. Critical molar volume: Vc = 3*b [m³/mol]
9. Reduced temperature: Tr = T/Tc [1]
10. Reduced pressure: Pr = P/Pc [1]

Input bases: P [Pa], V [m³], n [mol], T [K], a [Pa·m⁶/mol²], b [m³/mol], B [m³/mol].

### Gas molecular distributions

Ideal classical dilute gas; masses positive; v≥0. Mheavy and Mlight in same mass units, v in m/s. Cv is translational monatomic contribution; supply appropriate full Cv for Cp.

11. Most probable molecular speed: vp = sqrt(2*8.314462618*T/M) [m/s]
12. Mean molecular speed: vmean = sqrt(8*8.314462618*T/(pi*M)) [m/s]
13. Mean translational energy per molecule: eMean = 1.5*1.380649e-23*T [J]
14. Mean free path: lambda = 1.380649e-23*T/(sqrt(2)*pi*d^2*P) [m]
15. Collision frequency per molecule: collision = vmean/lambda [s⁻¹]
16. Graham effusion ratio: effusion = sqrt(Mheavy/Mlight) [1]
17. Molecular speed density at v: speedDensity = 4*pi*(m/(2*pi*1.380649e-23*T))^1.5*v^2*exp(-m*v^2/(2*1.380649e-23*T)) [s/m]
18. Translational molar heat capacity Cv: CvTranslation = 1.5*8.314462618 [J/(mol·K)]
19. Ideal-gas Cp from supplied Cv: Cp = Cv+8.314462618 [J/(mol·K)]
20. Heat-capacity ratio: gamma = Cp/Cv [1]

Input bases: T [K], M [kg/mol], m [kg], d [m], P [Pa], Mheavy [kg/mol], Mlight [kg/mol], v [m/s], Cv [J/(mol·K)].

### Quantitative composition

Common composition basis, positive denominators, 0≤fractions≤1; molarMass in g/mol, electrons is reaction-specific equivalents per mole; volume inputs in L unless stated.

21. Mass fraction: massFraction = mass/totalMass [1]
22. Parts per billion by mass: ppb = 1e9*mass/totalMass [ppb]
23. Mass-per-volume percent: wvPercent = mass/(volume*1000)*100 [g/100 mL]
24. Volume fraction: volumeFraction = soluteVolume/totalVolume [1]
25. Normality: normality = equivalents/volume [eq/L]
26. Equivalent weight: equivalentWeight = molarMass/electrons [g/eq]
27. Solute mole fraction: soluteX = soluteMoles/(soluteMoles+solventMoles) [1]
28. Solvent mole fraction: solventX = solventMoles/(soluteMoles+solventMoles) [1]
29. Molarity from mass fraction: molarity = 1000*density*massFraction/molarMass [mol/L]
30. Mass concentration from molarity: massConc = molarity*molarMass [g/L]

Input bases: mass [g], totalMass [g], equivalents [mol], volume [L], soluteMoles [mol], solventMoles [mol], density [g/mL], soluteVolume [L], totalVolume [L], molarMass [g/mol], electrons [eq/mol].

### Partition and extraction

Equilibrated immiscible phases, negligible phase-volume changes; extractions positive integer; only neutral species partitions in acid/base approximation. Kpartition, volumes≥0.

31. Partition coefficient: Kpartition = organicConc/waterConc [1]
32. Organic-to-water volume ratio: volumeRatio = organicVolume/waterVolume [1]
33. Fraction left after one extraction: leftFraction = 1/(1+Kpartition*volumeRatio) [1]
34. Fraction left after n equal extractions: leftN = leftFraction^extractions [1]
35. Extracted fraction: extractedFraction = 1-leftN [1]
36. Extracted mass: extractedMass = totalMass*extractedFraction [g]
37. Remaining aqueous mass: aqueousMass = totalMass*leftN [g]
38. Neutral fraction of monoprotic acid: neutralAcid = 1/(1+10^(pH-pKa)) [1]
39. Acid distribution coefficient: acidD = Kpartition*neutralAcid [1]
40. Neutral fraction of monoprotic base: neutralBase = 1/(1+10^(pKa-pH)) [1]

Input bases: totalMass [g], waterVolume [L], organicVolume [L], waterConc [g/L], organicConc [g/L], pH [1], pKa [1], extractions [extractions].

### Surface adsorption

Model parameters positive; BET 0<relativeP<1 and monolayer in mol; pressure-based adsorption/desorption ratio in Pa⁻¹. Empirical models, not general adsorption thermodynamics.

41. Langmuir gas surface coverage: thetaGas = Kp*P/(1+Kp*P) [1]
42. Langmuir dissolved surface coverage: thetaLiquid = Kc*C/(1+Kc*C) [1]
43. Langmuir adsorbed loading: loading = qmax*thetaLiquid [mol/kg]
44. Freundlich loading: freundlich = kf*C^(1/n) [mol/kg]
45. BET loading ratio: betRatio = betC*relativeP/((1-relativeP)*(1+(betC-1)*relativeP)) [1]
46. BET adsorbed amount: betAmount = monolayer*betRatio [mol]
47. Occupied surface sites: occupied = A*sites*thetaGas [mol]
48. Langmuir vacant fraction: vacant = 1-thetaGas [1]
49. Adsorption equilibrium constant: Kads = adsorptionRate/desorptionRate [Pa⁻¹]
50. Surface excess per area: surfaceExcess = excessMoles/A [mol/m²]

Input bases: P [Pa], C [mol/L], Kp [Pa⁻¹], Kc [L/mol], qmax [mol/kg], q [mol/kg], kf [model-specific], n [1], A [m²], sites [mol/m²], betC [1], relativeP [1], monolayer [mol], adsorptionRate [Pa⁻¹·s⁻¹], desorptionRate [s⁻¹], excessMoles [mol].

### Electrolytes and activities

Supply temperature/solvent-appropriate A,B; I≥0. Standard concentration is 1 mol/L. Osmotic pressure Pa, totalIonConc mol/m³; molar conductivity lambda in S·m²/mol and cSI mol/m³; dilute models have validity limits.

51. Two-ion ionic strength: ionicStrength = 0.5*(cA*zA^2+cB*zB^2) [mol/L]
52. Debye-Huckel limiting log activity: logGamma = -A*zA^2*sqrt(I) [1]
53. Activity coefficient from log: gammaActivity = 10^logGamma [1]
54. Extended Debye-Huckel log activity: extendedLog = -A*zA^2*sqrt(I)/(1+B*ionSize*sqrt(I)) [1]
55. Davies log activity: daviesLog = -A*zA^2*(sqrt(I)/(1+sqrt(I))-0.3*I) [1]
56. Ion activity on 1 M basis: activity = gammaActivity*cA [1]
57. Activity-based pH: activityPH = -log(activity) [1]
58. Mean activity coefficient for 1:1 salt: meanGamma = sqrt(gammaA*gammaB) [1]
59. Osmotic coefficient: osmoticCoefficient = osmoticPressure/(totalIonConc*8.314462618*T) [1]
60. Conductivity of two ions: conductivity = lambdaA*cSIa+lambdaB*cSIb [S/m]

Input bases: zA [1], zB [1], cA [mol/L], cB [mol/L], I [mol/L], A [model constant], B [model constant], ionSize [model length], T [K], gammaA [1], gammaB [1], osmoticPressure [Pa], totalIonConc [mol/m³], lambdaA [S·m²/mol], cSIa [mol/m³], lambdaB [S·m²/mol], cSIb [mol/m³].

### Reaction order and mechanisms

General order excludes orderA=1 and needs positive bracket; k units depend on order. Consecutive A→B→C initially B=C=0, positive distinct kA,kB in s⁻¹. PseudoK assumes first order in excess B.

61. General two-reactant power rate: rateLaw = k*Aconc^orderA*Bconc^orderB [mol/(L·s)]
62. Overall kinetic order: overallOrder = orderA+orderB [1]
63. Pseudo-first-order constant: pseudoK = k*Bconc [s⁻¹]
64. General-order integrated concentration: generalA = (A0^(1-orderA)+(orderA-1)*k*t)^(1/(1-orderA)) [mol/L]
65. General-order half-life: generalHalf = (2^(orderA-1)-1)/((orderA-1)*k*A0^(orderA-1)) [s]
66. Parallel first-order product A fraction: branchA = kA/(kA+kB) [1]
67. Consecutive A to B intermediate: intermediate = A0*kA/(kB-kA)*(exp(-kA*t)-exp(-kB*t)) [mol/L]
68. Consecutive reaction peak time: peakTime = ln(kB/kA)/(kB-kA) [s]
69. First-order reversible equilibrium fraction: reversibleFraction = forwardK/(forwardK+reverseK) [1]
70. First-order relaxation time: relaxation = 1/(forwardK+reverseK) [s]

Input bases: k [model-specific], Aconc [mol/L], Bconc [mol/L], t [s], A0 [mol/L], orderA [1], orderB [1], kA [s⁻¹], kB [s⁻¹], forwardK [s⁻¹], reverseK [s⁻¹].

### Thermodynamic processes

Ideal gas, positive T,P,V,n; constant heat capacities gamma=Cp/Cv. reactionH,vaporH in J/mol; gOverT1=ΔG°(T1)/T1. Vapor enthalpy constant and ideal vapor approximations.

71. Constant-Cv internal-energy change: deltaU = n*Cv*(T2-T1) [J]
72. Constant-Cp enthalpy change: deltaH = n*Cp*(T2-T1) [J]
73. Ideal-gas entropy change via volume: deltaS = n*Cv*ln(T2/T1)+n*8.314462618*ln(V2/V1) [J/K]
74. Ideal-gas entropy change via pressure: deltaSP = n*Cp*ln(T2/T1)-n*8.314462618*ln(P2/P1) [J/K]
75. Reversible isothermal work on gas: isothermalW = -n*8.314462618*T1*ln(V2/V1) [J]
76. Reversible adiabatic final temperature: adiabaticT = T1*(V1/V2)^(gamma-1) [K]
77. Reversible adiabatic final pressure: adiabaticP = P1*(V1/V2)^gamma [Pa]
78. Gibbs-Helmholtz constant-enthalpy temperature shift: gOverT2 = gOverT1+reactionH*(1/T2-1/T1) [J/(mol·K)]
79. van t Hoff equilibrium shift: K2 = K1*exp(-reactionH/8.314462618*(1/T2-1/T1)) [1]
80. Clausius-Clapeyron vapor pressure: vaporP2 = vaporP1*exp(-vaporH/8.314462618*(1/T2-1/T1)) [Pa]

Input bases: n [mol], T1 [K], T2 [K], V1 [m³], V2 [m³], Cv [J/(mol·K)], Cp [J/(mol·K)], P1 [Pa], P2 [Pa], gamma [1], gOverT1 [J/(mol·K)], reactionH [J/mol], K1 [1], vaporP1 [Pa], vaporH [J/mol].

### Spectroscopy and chromatography

Positive intensities, path, widths, dead time; linear calibration supplied slope units signal/(mol/L), signal and intercept same units. Chromatography retentionB>retentionA; columnLength meters; kB≥kA>0.

81. Absorbance from intensity: intensityA = log(I0/I) [1]
82. Napier absorption coefficient: alpha = ln(I0/I)/path [cm⁻¹]
83. Absorption optical depth: tau = alpha*path [1]
84. Calibration concentration: calibrationC = (signal-intercept)/slope [mol/L]
85. Retention factor: retentionFactor = (retention-dead)/dead [1]
86. Chromatographic selectivity: selectivity = kB/kA [1]
87. Baseline peak resolution: resolution = 2*(retentionB-retentionA)/(widthA+widthB) [1]
88. Plate number baseline width: plates = 16*(retention/widthA)^2 [1]
89. Plate number half-height width: platesHalf = 5.54*(retention/halfWidth)^2 [1]
90. Plate height: plateHeight = columnLength/plates [m]

Input bases: path [cm], concentration [mol/L], epsilon [L/(mol·cm)], I0 [signal units], I [signal units], lambda [nm], retention [s], dead [s], widthA [s], widthB [s], signal [signal units], intercept [signal units], slope [signal/(mol/L)], kB [1], kA [1], retentionB [s], retentionA [s], halfWidth [s], columnLength [m].

### Crystals and molecular energetics

Ideal cubic hard spheres; hydrogenic one-electron ion, positive integer n and nuclear charge Z; harmonic vibration; massA,massB kg. Packing constants are exact within the stated geometry.

91. Unit-cell density: cellDensity = massCell/cellVolume [kg/m³]
92. Unit-cell formula-unit count: unitsCell = massCell*6.02214076e23/M [1]
93. Simple-cubic atomic packing fraction: scPacking = pi/6 [1]
94. Body-centered-cubic packing fraction: bccPacking = sqrt(3)*pi/8 [1]
95. Face-centered-cubic packing fraction: fccPacking = pi/(3*sqrt(2)) [1]
96. BCC atomic radius from edge: bccRadius = sqrt(3)*edge/4 [m]
97. FCC atomic radius from edge: fccRadius = sqrt(2)*edge/4 [m]
98. Hydrogenic energy level: hydrogenEnergy = -2.179872361e-18*Z^2/n^2 [J]
99. Harmonic bond vibration frequency: vibration = sqrt(springConstant/reducedMass)/(2*pi) [Hz]
100. Two-atom reduced mass: mu = massA*massB/(massA+massB) [kg]

Input bases: massCell [kg], cellVolume [m³], edge [m], M [kg/mol], radius [m], electronMass [kg], n [1], Z [1], reducedMass [kg], springConstant [N/m], massA [kg], massB [kg].

## Physics — 100 entries

### Projectile trajectory

Vacuum projectile, g>0 constant downward, height≥0, t≥0; angle radians and no air drag. Peak after launch requires vy0≥0.

1. Horizontal launch velocity: vx = speed*cos(angle) [m/s]
2. Vertical launch velocity: vy0 = speed*sin(angle) [m/s]
3. Horizontal position: x = vx*t [m]
4. Vertical position: y = height+vy0*t-g*t^2/2 [m]
5. Vertical velocity: vy = vy0-g*t [m/s]
6. Speed along trajectory: trajectorySpeed = sqrt(vx^2+vy^2) [m/s]
7. Time to highest point: peakTime = vy0/g [s]
8. Maximum altitude: peakHeight = height+vy0^2/(2*g) [m]
9. Time to ground: flightTime = (vy0+sqrt(vy0^2+2*g*height))/g [s]
10. Horizontal ground range: range = vx*flightTime [m]

Input bases: speed [m/s], angle [rad], g [m/s²], t [s], height [m].

### Inclined plane and drag

0≤angle<π/2; sliding downhill assumed. Nonnegative speed; Stokes sphere creeping flow Re≪1, particleDensity kg/m³. Terminal formulas steady fall, Cd constant.

11. Slope gravity component: downslope = mass*g*sin(angle) [N]
12. Incline normal force: normal = mass*g*cos(angle) [N]
13. Sliding acceleration downhill: acceleration = g*(sin(angle)-mu*cos(angle)) [m/s²]
14. Minimum ideal uphill pull: uphill = mass*g*(sin(angle)+mu*cos(angle)) [N]
15. Quadratic drag force: drag = rho*Cd*area*speed^2/2 [N]
16. Quadratic-drag terminal speed: terminal = sqrt(2*mass*g/(rho*Cd*area)) [m/s]
17. Stokes drag: stokesDrag = 6*pi*viscosity*radius*speed [N]
18. Stokes terminal speed with buoyancy: stokesTerminal = 2*(particleDensity-rho)*g*radius^2/(9*viscosity) [m/s]
19. Particle Reynolds number: reynolds = 2*rho*speed*radius/viscosity [1]
20. Drag power magnitude: dragPower = drag*speed [W]

Input bases: mass [kg], g [m/s²], angle [rad], mu [1], rho [kg/m³], area [m²], Cd [1], viscosity [Pa·s], radius [m], speed [m/s], particleDensity [kg/m³].

### Orbital mechanics

Newtonian two-body bound ellipse, positive axis,r,masses and 0≤e<1; central mass dominates. innerRadius,outerRadius meters; coplanar circular Hohmann half-ellipse.

21. Orbital specific energy: specificEnergy = -6.67430e-11*centralMass/(2*axis) [J/kg]
22. Vis-viva orbital speed: orbitalSpeed = sqrt(6.67430e-11*centralMass*(2/r-1/axis)) [m/s]
23. Elliptical period: orbitalPeriod = 2*pi*sqrt(axis^3/(6.67430e-11*centralMass)) [s]
24. Periapsis radius: periapsis = axis*(1-eccentricity) [m]
25. Apoapsis radius: apoapsis = axis*(1+eccentricity) [m]
26. Specific angular momentum: specificL = sqrt(6.67430e-11*centralMass*axis*(1-eccentricity^2)) [m²/s]
27. Orbit total energy: orbitEnergy = bodyMass*specificEnergy [J]
28. Surface circular speed: surfaceSpeed = sqrt(6.67430e-11*centralMass/r) [m/s]
29. Hohmann transfer semimajor axis: transferAxis = (innerRadius+outerRadius)/2 [m]
30. Hohmann transfer duration: transferTime = pi*sqrt(transferAxis^3/(6.67430e-11*centralMass)) [s]

Input bases: centralMass [kg], bodyMass [kg], r [m], axis [m], eccentricity [1], innerRadius [m], outerRadius [m].

### Rotation and rolling bodies

Rigid bodies, lengths meters and inertia kg·m². Rolling without slip from rest, no losses. Atwood massless rope/frictionless massless pulley; positive masses.

31. Solid-sphere rotational inertia: sphereI = 2*mass*radius^2/5 [kg·m²]
32. Thin spherical shell inertia: shellI = 2*mass*radius^2/3 [kg·m²]
33. Annular-cylinder inertia: annulusI = mass*(innerRadius^2+outerRadius^2)/2 [kg·m²]
34. Rectangular lamina inertia through center: laminaI = mass*(width^2+length^2)/12 [kg·m²]
35. Solid-cone symmetry-axis inertia: coneI = 3*mass*radius^2/10 [kg·m²]
36. Rolling translational speed: rollingSpeed = omega*radius [m/s]
37. Rolling total kinetic energy: rollingK = (mass*radius^2+inertia)*omega^2/2 [J]
38. Rolling-down speed from height: downhillSpeed = sqrt(2*g*height/(1+inertia/(mass*radius^2))) [m/s]
39. Atwood acceleration: atwoodA = g*(massB-massA)/(massA+massB) [m/s²]
40. Atwood rope tension: atwoodT = 2*massA*massB*g/(massA+massB) [N]

Input bases: mass [kg], radius [m], omega [rad/s], height [m], g [m/s²], force [N], innerRadius [m], outerRadius [m], width [m], length [m], inertia [kg·m²], massA [kg], massB [kg].

### Damped and driven oscillations

Linear viscous damping, mass,k>0, damping≥0; omegaD/resonance require positive radicands, phase radians, initialEnergy joules. Driven amplitude finite damping or off-resonance.

41. Undamped angular frequency: omega0 = sqrt(k/mass) [rad/s]
42. Damping decay rate: beta = damping/(2*mass) [s⁻¹]
43. Underdamped angular frequency: omegaD = sqrt(omega0^2-beta^2) [rad/s]
44. Amplitude envelope: envelope = A0*exp(-beta*t) [m]
45. Damped displacement: displacement = envelope*cos(omegaD*t+phase) [m]
46. Driven steady amplitude: drivenA = forceAmplitude/sqrt((k-mass*omega^2)^2+(damping*omega)^2) [m]
47. Oscillator quality factor: quality = mass*omega0/damping [1]
48. Energy decay envelope: energyEnvelope = initialEnergy*exp(-2*beta*t) [J]
49. Amplitude half-life: amplitudeHalf = ln(2)/beta [s]
50. Resonant displacement frequency: resonance = sqrt(omega0^2-2*beta^2) [rad/s]

Input bases: mass [kg], k [N/m], damping [kg/s], omega [rad/s], forceAmplitude [N], A0 [m], t [s], phase [rad], initialEnergy [J].

### Sound and wave intensity

Positive intensity,referenceIntensity,r,rho,c; point isotropic source. Doppler collinear, sourceSpeed<c for approaching formula. Mach cone only mach≥1; nonnegative speed magnitudes.

51. Spherical acoustic intensity: sphericalI = power/(4*pi*r^2) [W/m²]
52. Sound intensity level: level = 10*log(intensity/referenceIntensity) [dB]
53. Acoustic rms pressure: rmsPressure = sqrt(intensity*rho*soundSpeed) [Pa]
54. Acoustic peak pressure: peakPressure = sqrt(2)*rmsPressure [Pa]
55. Doppler approaching source: approachF = f*soundSpeed/(soundSpeed-sourceSpeed) [Hz]
56. Doppler receding source: recedeF = f*soundSpeed/(soundSpeed+sourceSpeed) [Hz]
57. Doppler approaching observer: observerF = f*(soundSpeed+observerSpeed)/soundSpeed [Hz]
58. Mach number: mach = sourceSpeed/soundSpeed [1]
59. Mach cone half-angle: machAngle = asin(1/mach) [rad]
60. Wave angular number: waveNumber = 2*pi*f/soundSpeed [rad/m]

Input bases: power [W], r [m], intensity [W/m²], referenceIntensity [W/m²], rho [kg/m³], soundSpeed [m/s], f [Hz], sourceSpeed [m/s], observerSpeed [m/s].

### Geometrical and wave optics

Thin lens in air, signed curvature radii meters; paraxial mirror/lens; radians. Grating integer order and |order·lambda/spacing|≤1. Ideal transparent dielectrics/polarizers.

61. Thin lensmaker focal length: lensmaker = 1/((n-1)*(1/radius1-1/radius2)) [m]
62. Spherical mirror focal length: mirrorF = radius/2 [m]
63. Optical power: diopters = 1/focalLength [m⁻¹]
64. Angular diffraction resolution: rayleigh = 1.22*lambda/aperture [rad]
65. Airy-disk first-zero radius: airy = 1.22*lambda*distance/aperture [m]
66. Brewster angle: brewster = atan(n2/n1) [rad]
67. Normal-incidence reflection fraction: reflection = ((n1-n2)/(n1+n2))^2 [1]
68. Malus-law intensity: malus = initialIntensity*cos(angle)^2 [W/m²]
69. Unpolarized light after ideal polarizer: polarized = initialIntensity/2 [W/m²]
70. Grating principal angle: gratingAngle = asin(order*lambda/spacing) [rad]

Input bases: n [1], radius [m], objectDistance [m], focalLength [m], lambda [m], aperture [m], distance [m], radius1 [m], radius2 [m], n2 [1], n1 [1], initialIntensity [W/m²], angle [rad], order [integer order], spacing [m].

### Alternating current circuits

Sinusoidal steady state, ideal series RLC, f,L,C>0 and R≥0. Transformer turn counts positive, rms or peak voltage basis consistent. No transient or phase inference.

71. Angular drive frequency: driveOmega = 2*pi*f [rad/s]
72. Inductive reactance: XL = driveOmega*L [Ω]
73. Capacitive reactance: XC = 1/(driveOmega*C) [Ω]
74. Series RLC impedance magnitude: impedance = sqrt(R^2+(XL-XC)^2) [Ω]
75. RMS series current: rmsI = rmsV/impedance [A]
76. Average resistive power: averagePower = rmsI^2*R [W]
77. Power factor: powerFactor = R/impedance [1]
78. Series resonance frequency: resonanceF = 1/(2*pi*sqrt(L*C)) [Hz]
79. Peak-to-rms voltage: convertedRms = peakV/sqrt(2) [V]
80. Ideal transformer voltage: secondaryV = primaryV*secondaryTurns/primaryTurns [V]

Input bases: R [Ω], L [H], C [F], f [Hz], rmsV [V], peakV [V], primaryV [V], secondaryTurns [turns], primaryTurns [turns].

### Relativity

Inertial frames in special relativity, supply c=299792458 m/s, |u|,|v|<c; x meters,t seconds; proper quantities in rest frame.

81. Lorentz factor: lorentz = 1/sqrt(1-v^2/c^2) [1]
82. Time dilation: labTime = lorentz*properTime [s]
83. Length contraction: labLength = properLength/lorentz [m]
84. Relativistic momentum: relativisticP = lorentz*restMass*v [kg·m/s]
85. Total relativistic energy: totalE = lorentz*restMass*c^2 [J]
86. Relativistic kinetic energy: kineticE = (lorentz-1)*restMass*c^2 [J]
87. Energy from momentum and rest mass: momentumE = sqrt(momentum^2*c^2+restMass^2*c^4) [J]
88. Collinear velocity composition: composedV = (u+v)/(1+u*v/c^2) [m/s]
89. Relativistic receding Doppler ratio: dopplerRatio = sqrt((1-v/c)/(1+v/c)) [1]
90. Lorentz transformed position: xPrime = lorentz*(x-v*t) [m]

Input bases: v [m/s], c [m/s], properTime [s], properLength [m], restMass [kg], momentum [kg·m/s], u [m/s], x [m], t [s].

### Quantum and nuclear measurements

Infinite 1D box positive integer n; uncertainty lower bounds, not equality of actual uncertainties. Positive times, efficiencies in [0,1]; nonparalyzable dead time requires measuredRate·deadTime<1.

91. Compton wavelength shift: comptonShift = 6.62607015e-34/(9.1093837139e-31*299792458)*(1-cos(angle)) [m]
92. Scattered photon wavelength: scatteredLambda = lambda+comptonShift [m]
93. Particle-in-box energy: boxE = n^2*6.62607015e-34^2/(8*mass*length^2) [J]
94. Minimum momentum uncertainty: minDp = 6.62607015e-34/(4*pi*dx) [kg·m/s]
95. Minimum energy-time uncertainty: minDE = 6.62607015e-34/(4*pi*time) [J]
96. Detected radioactive counts: counts = activity*efficiency*time [counts]
97. Poisson counting uncertainty: countSigma = sqrt(counts) [counts]
98. Background-subtracted count rate: netRate = grossCounts/grossTime-backgroundCounts/backgroundTime [s⁻¹]
99. Detector dead-time corrected rate: trueRate = measuredRate/(1-measuredRate*deadTime) [s⁻¹]
100. Nuclear radius estimate: nuclearRadius = 1.2e-15*nucleons^(1/3) [m]

Input bases: lambda [m], angle [rad], n [1], length [m], mass [kg], dx [m], activity [Bq], efficiency [1], time [s], grossCounts [counts], grossTime [s], backgroundCounts [counts], backgroundTime [s], measuredRate [s⁻¹], deadTime [s], nucleons [nucleons].

## Biology — 100 entries

### Cell geometry and transport

Ideal sphere/cylinder; geometric µm units distinct from transport SI meters. Positive dimensions,D; membraneArea m², thickness m; steady diffusion, no active transport.

1. Spherical cell volume: sphereVolume = 4*pi*radius^3/3 [µm³]
2. Spherical cell surface: sphereArea = 4*pi*radius^2 [µm²]
3. Spherical cell surface-to-volume ratio: sphereSV = 3/radius [µm⁻¹]
4. Cylindrical cell volume: cylinderVolume = pi*radius^2*length [µm³]
5. Cylindrical cell surface: cylinderArea = 2*pi*radius*(radius+length) [µm²]
6. Cylindrical surface-to-volume ratio: cylinderSV = cylinderArea/cylinderVolume [µm⁻¹]
7. One-dimensional mean diffusion time: diffusionTime = distance^2/(2*D) [s]
8. Membrane solute flux: flux = permeability*(outside-inside) [mol/(m²·s)]
9. Cell membrane solute transfer: transfer = flux*membraneArea [mol/s]
10. Fick steady slab flux: slabFlux = D*(outside-inside)/thickness [mol/(m²·s)]

Input bases: radius [µm], length [µm], area [µm²], volume [µm³], D [m²/s], distance [m], permeability [m/s], outside [mol/m³], inside [mol/m³], membraneArea [m²], thickness [m].

### Microbial growth and culture

Positive populations,time; dilution is retained concentration fraction >0≤1, plate counts model sampling uncertainty separately. Flow L/h, workingVolume L. Monod ideal chemostat steadyS only 0<D<muMax; biomass/substrate g and maintenance g/(g·h).

11. Generation count from populations: generations = ln(final/initial)/ln(2) [generations]
12. Generation time: generationTime = time/generations [h]
13. Specific net growth from log counts: growthRate = ln(final/initial)/time [h⁻¹]
14. CFU concentration: cfu = colonies/(dilution*platedVolume) [CFU/mL]
15. Chemostat dilution rate: dilutionRate = flow/workingVolume [h⁻¹]
16. Chemostat hydraulic residence time: residence = workingVolume/flow [h]
17. Monod growth rate: monod = muMax*substrate/(Ks+substrate) [h⁻¹]
18. Chemostat steady substrate: steadyS = Ks*dilutionRate/(muMax-dilutionRate) [g/L]
19. Biomass yield on substrate: yieldXS = biomassIncrease/substrateConsumed [g/g]
20. Specific substrate uptake: uptake = monod/yieldXS+maintenance [g/(g·h)]

Input bases: initial [cells/mL], final [cells/mL], time [h], dilution [1], colonies [colonies], platedVolume [mL], substrate [g/L], Ks [g/L], muMax [h⁻¹], flow [L/h], workingVolume [L], biomassIncrease [g], substrateConsumed [g], maintenance [g/(g·h)].

### Enzyme inhibition and binding

Positive dissociation constants, hillN>0, concentrations≥0; KiPrime mol/L, totalReceptor mol/L, T K and standardConc mol/L. Hill Kd is half-occupancy concentration; simple Scatchard only noncooperative single-site model.

21. Competitive inhibition factor: alpha = 1+I/Ki [1]
22. Uncompetitive inhibition factor: alphaPrime = 1+I/KiPrime [1]
23. Mixed-inhibition rate: mixedV = vmax*S/(alpha*Km+alphaPrime*S) [mol/(L·s)]
24. Pure noncompetitive rate: noncompetitiveV = vmax*S/((1+I/Ki)*(Km+S)) [mol/(L·s)]
25. Uncompetitive apparent Km: apparentKm = Km/alphaPrime [mol/L]
26. Uncompetitive apparent Vmax: apparentVmax = vmax/alphaPrime [mol/(L·s)]
27. Hill fractional occupancy: hillOccupancy = ligand^hillN/(Kd^hillN+ligand^hillN) [1]
28. Simple receptor bound amount: bound = totalReceptor*ligand/(Kd+ligand) [mol/L]
29. Binding free energy: bindingG = 8.314462618*T*ln(Kd/standardConc) [J/mol]
30. Scatchard bound-to-free ratio: scatchard = (totalReceptor-bound)/Kd [1]

Input bases: S [mol/L], Km [mol/L], I [mol/L], Ki [mol/L], vmax [mol/(L·s)], ligand [mol/L], Kd [mol/L], hillN [1], KiPrime [mol/L], totalReceptor [mol/L], T [K], standardConc [mol/L].

### Molecular assays and DNA

Approximate 660 g/mol/base pair; efficiency 0..1, integer bp/cycles. ΔΔCt assumes equal near-100% amplification. UV coefficient for dsDNA and 1 cm equivalent optical path; dilutionFactor≥1.

31. Double-stranded DNA molar mass estimate: dnaM = 660*bp [g/mol]
32. DNA total mass: dnaMass = concentration*volume [ng]
33. DNA molar amount: dnaMoles = mass*1e-9/dnaM [mol]
34. DNA molecule count: dnaCopies = dnaMoles*6.02214076e23 [copies]
35. PCR amplification with efficiency: amplified = initialCopies*(1+efficiency)^cycles [copies]
36. qPCR target delta Ct: deltaCt = ctTarget-ctReference [cycles]
37. qPCR delta-delta Ct: deltaDeltaCt = deltaCt-controlDeltaCt [cycles]
38. qPCR relative fold expression: foldExpression = 2^(-deltaDeltaCt) [1]
39. DNA purity A260/A280: purity = abs260/abs280 [1]
40. dsDNA concentration from absorbance: uvConc = 50*abs260*dilutionFactor [µg/mL]

Input bases: bp [bp], volume [µL], concentration [ng/µL], mass [ng], cycles [cycles], efficiency [1], ctTarget [cycles], ctReference [cycles], initialCopies [copies], controlDeltaCt [cycles], abs260 [1], abs280 [1], dilutionFactor [1].

### Population demography

Life-table cohorts, N0>0 and 0≤deaths≤survivors≤N0; aggregate netReproduction=sum lxmx, sumAgeContribution supplied. Constant interval birth/death estimates, population>0.

41. Age-class survivorship: lx = survivors/N0 [1]
42. Age-class mortality fraction: qx = deaths/survivors [1]
43. Age-class reproductive contribution: lxmx = lx*fecundity [offspring/initial individual]
44. Age-weighted reproductive contribution: ageContribution = age*lxmx [years·offspring/initial individual]
45. Generation time from life-table aggregates: generation = sumAgeContribution/netReproduction [years]
46. Life-table intrinsic growth approximation: intrinsicR = ln(netReproduction)/generation [year⁻¹]
47. Finite annual multiplication factor: lambda = exp(intrinsicR) [1]
48. Per-capita birth rate: birthRate = births/(population*time) [year⁻¹]
49. Per-capita death rate: deathRate = deaths/(population*time) [year⁻¹]
50. Demographic growth from per-capita rates: demographicR = birthRate-deathRate [year⁻¹]

Input bases: N0 [individuals], survivors [individuals], births [individuals], deaths [individuals], time [years], age [years], fecundity [offspring/individual], sumAgeContribution [years·offspring/initial individual], netReproduction [offspring/initial individual], population [individuals].

### Community ecology indices

pA,pB,pC strictly positive and sum1 for exactly three species; richness>1, individuals>1. Presence counts disjoint and nonnegative. Area units consistent with coefficient; positive unequal areas for slope.

51. Three-species Shannon diversity: shannon = -(pA*ln(pA)+pB*ln(pB)+pC*ln(pC)) [nats]
52. Pielou evenness: evenness = shannon/ln(richness) [1]
53. Margalef richness index: margalef = (richness-1)/ln(individuals) [1]
54. Menhinick richness index: menhinick = richness/sqrt(individuals) [1]
55. Jaccard presence similarity: jaccard = shared/(shared+onlyA+onlyB) [1]
56. Sorensen presence similarity: sorensen = 2*shared/(2*shared+onlyA+onlyB) [1]
57. Berger-Parker dominance: dominance = largestSpeciesCount/individuals [1]
58. Whittaker beta diversity: beta = regionalRichness/meanLocalRichness-1 [1]
59. Species-area prediction: areaRichness = coefficient*habitatArea^exponent [species]
60. Species-area log slope: areaSlope = ln(richnessB/richnessA)/ln(areaB/areaA) [1]

Input bases: richness [species], individuals [individuals], pA [1], pB [1], pC [1], shared [species], onlyA [species], onlyB [species], largestSpeciesCount [individuals], regionalRichness [species], meanLocalRichness [species], coefficient [species/m²^exponent], habitatArea [m²], exponent [1], richnessB [species], richnessA [species], areaB [m²], areaA [m²].

### Photosynthesis and bioenergetics

Idealized empirical light curves; T K, standardG J/mol; positive dimensionless activities, protonFlux mol/s. Respiration gas quantities same mol basis; energyReleased J. No assumed ATP yield or photosynthetic stoichiometry.

61. Leaf-area carbon fixation rate: fixation = carbon/(time*leafArea) [µmol CO₂/(m²·s)]
62. Leaf-area oxygen evolution rate: evolution = oxygen/(time*leafArea) [µmol O₂/(m²·s)]
63. Photosynthetic quotient: quotient = oxygen/carbon [1]
64. Linear light-response net assimilation: linearNet = quantumYield*light-respiration [µmol CO₂/(m²·s)]
65. Rectangular-hyperbola gross assimilation: grossHyperbola = maxRate*quantumYield*light/(maxRate+quantumYield*light) [µmol CO₂/(m²·s)]
66. Hyperbola net assimilation: netHyperbola = grossHyperbola-respiration [µmol CO₂/(m²·s)]
67. ATP production from proton flux: atpRate = protonFlux/protonsPerATP [mol/s]
68. ATP free-energy change: atpG = standardG+8.314462618*T*ln(adpActivity*phosphateActivity/atpActivity) [J/mol]
69. Respiratory quotient: RQ = carbonDioxide/oxygenConsumed [1]
70. Respiration energy per oxygen amount: energyOxygen = energyReleased/oxygenConsumed [J/mol O₂]

Input bases: oxygen [µmol], carbon [µmol], time [s], leafArea [m²], light [µmol photons/(m²·s)], quantumYield [mol/mol], maxRate [µmol CO₂/(m²·s)], respiration [µmol CO₂/(m²·s)], protonFlux [mol/s], protonsPerATP [mol/mol], standardG [J/mol], T [K], adpActivity [1], phosphateActivity [1], atpActivity [1], carbonDioxide [mol], oxygenConsumed [mol], energyReleased [J].

### Cardiovascular and respiratory models

Educational physiology, not clinical diagnosis. Pressures mmHg, lung volumes mL, gas rates same units; positive denominators and tidal≥deadSpace. MAP approximation for ordinary resting waveform.

71. Cardiac output: cardiacOutput = heartRate*strokeVolume/1000 [L/min]
72. Pulse pressure: pulsePressure = systolic-diastolic [mmHg]
73. Mean arterial pressure approximation: meanPressure = diastolic+pulsePressure/3 [mmHg]
74. Systemic resistance: vascularResistance = (arterialPressure-venousPressure)/cardiacOutput [mmHg·min/L]
75. Fick oxygen consumption: oxygenUse = cardiacOutput*(oxygenContentA-oxygenContentV) [mL O₂/min]
76. Minute ventilation: minuteVentilation = tidal*breathing/1000 [L/min]
77. Alveolar ventilation: alveolarVentilation = (tidal-deadSpace)*breathing/1000 [L/min]
78. Vital capacity: vitalCapacity = inspiratoryReserve+tidal+expiratoryReserve [mL]
79. Total lung capacity: totalCapacity = vitalCapacity+residualVolume [mL]
80. Respiratory exchange ratio: exchangeRatio = carbonDioxideOutput/oxygenUptake [1]

Input bases: heartRate [beats/min], strokeVolume [mL/beat], arterialPressure [mmHg], venousPressure [mmHg], oxygenContentA [mL O₂/L], oxygenContentV [mL O₂/L], tidal [mL], deadSpace [mL], breathing [min⁻¹], systolic [mmHg], diastolic [mmHg], inspiratoryReserve [mL], expiratoryReserve [mL], residualVolume [mL], carbonDioxideOutput [mL/min], oxygenUptake [mL/min].

### Membrane electrical models

Voltage inside minus outside; T K, z nonzero signed charge. GHK positive concentrations same units, permeabilities same basis. Cable radius,distance meters, specific resistance Ω·m², axial resistivity Ω·m; voltageSlope V/s.

81. Nernst membrane equilibrium potential: nernst = 8.314462618*T/(z*96485.33212)*ln(outside/inside) [V]
82. Ion-channel current: ionCurrent = conductance*(voltage-equilibrium) [A]
83. Membrane conductance from resistance: membraneG = 1/resistance [S]
84. Membrane electrical time constant: membraneTau = resistance*capacitance [s]
85. Capacitive membrane current: capacitiveCurrent = capacitance*voltageSlope [A]
86. Electrochemical energy per mole: electrochemicalG = 8.314462618*T*ln(inside/outside)+z*96485.33212*voltage [J/mol]
87. GHK monovalent membrane potential: ghk = 8.314462618*T/96485.33212*ln((PK*Ko+PNa*Nao+PCl*Cli)/(PK*Ki+PNa*Nai+PCl*Clo)) [V]
88. Cable length constant: lengthConstant = sqrt(radius*membraneSpecificResistance/(2*axialResistivity)) [m]
89. Passive voltage attenuation: attenuation = initialVoltage*exp(-distance/lengthConstant) [V]
90. Ohmic driving voltage: drivingVoltage = voltage-equilibrium [V]

Input bases: outside [mol/L], inside [mol/L], T [K], z [1], conductance [S], voltage [V], equilibrium [V], resistance [Ω], capacitance [F], voltageSlope [V/s], PK [relative permeability], Ko [mol/L], PNa [relative permeability], Nao [mol/L], PCl [relative permeability], Cli [mol/L], Ki [mol/L], Nai [mol/L], Clo [mol/L], radius [m], membraneSpecificResistance [Ω·m²], axialResistivity [Ω·m], initialVoltage [V], distance [m].

### Genetic mapping and quantitative genetics

Mapping 0≤recombination<0.5 for finite map functions; offspring, expectedDouble>0. Quantitative-genetics variance components nonnegative and ≤phenotypeVariance. Breeder equation assumes additive model and comparable environments.

91. Recombination fraction: recombination = recombinants/offspring [1]
92. Short-interval genetic map distance: mapDistance = 100*recombination [cM]
93. Haldane map distance: haldane = -50*ln(1-2*recombination) [cM]
94. Kosambi map distance: kosambi = 25*ln((1+2*recombination)/(1-2*recombination)) [cM]
95. Coefficient of coincidence: coincidence = observedDouble/expectedDouble [1]
96. Crossover interference: interference = 1-coincidence [1]
97. Narrow-sense heritability: narrowH = additiveVariance/phenotypeVariance [1]
98. Broad-sense heritability: broadH = geneticVariance/phenotypeVariance [1]
99. Breeder response to selection: breederResponse = narrowH*selectionDifference [trait]
100. Realized heritability: realizedH = response/selectionDifference [1]

Input bases: recombinants [individuals], offspring [individuals], additiveVariance [trait²], phenotypeVariance [trait²], geneticVariance [trait²], selectionDifference [trait], response [trait], observedDouble [individuals], expectedDouble [individuals].

## Finance — 100 entries

### Growing and due annuities

Fixed period basis; r,g>-1, n positive integer; r≠g for general growing formulas, r≠0 for divided-rate formulas; deferral integer≥0. Payments start at period1 except due at period0.

1. Growing annuity present value: growingPV = payment/(r-g)*(1-((1+g)/(1+r))^n) [currency units]
2. Growing annuity future value: growingFV = payment*((1+r)^n-(1+g)^n)/(r-g) [currency units]
3. Annuity-due present value: duePV = payment*(1+r)*(1-(1+r)^(-n))/r [currency units]
4. Annuity-due future value: dueFV = payment*(1+r)*((1+r)^n-1)/r [currency units]
5. Deferred annuity present value: deferredPV = payment*(1-(1+r)^(-n))/r/(1+r)^deferral [currency units]
6. Capital recovery factor: recoveryFactor = r/(1-(1+r)^(-n)) [1/period]
7. Sinking-fund factor: sinkingFactor = r/((1+r)^n-1) [1/period]
8. Present value at equal growth and discount: equalPV = payment*n/(1+r) [currency units]
9. Future value at equal growth and discount: equalFV = payment*n*(1+r)^(n-1) [currency units]
10. Due deposit required for target: dueDeposit = targetFV/((1+r)*((1+r)^n-1)/r) [currency units]

Input bases: payment [currency units], r [decimal/period], g [decimal/period], n [periods], PV [currency units], deferral [periods], targetFV [currency units].

### Loans and repayment planning

Fixed nonzero r for balloon formulas, positive denominators; equal end-period payments. Extra payment cannot imply a negative actual loan balance; fee break-even ignores time value. Ratios are calculations, not lending advice.

11. Interest portion next payment: interestPortion = balance*r [currency units]
12. Principal portion next payment: principalPortion = payment-interestPortion [currency units]
13. Balance after next payment: nextBalance = balance*(1+r)-payment [currency units]
14. Balance with extra repayment: extraBalance = nextBalance-extra [currency units]
15. Interest-only payment: interestOnly = balance*r [currency units]
16. Balloon balance after n payments: balloon = balance*(1+r)^n-payment*((1+r)^n-1)/r [currency units]
17. Present value with final balloon: balloonPV = payment*(1-(1+r)^(-n))/r+finalBalloon/(1+r)^n [currency units]
18. Loan-to-value ratio: LTV = balance/propertyValue [1]
19. Refinancing fee break-even months: refiMonths = fee/monthlySaving [months]
20. Debt-service coverage: DSCR = netOperatingIncome/annualDebtService [1]

Input bases: balance [currency units], payment [currency units], r [decimal/period], n [periods], extra [currency units], fee [currency units], finalBalloon [currency units], propertyValue [currency units], monthlySaving [currency units/month], netOperatingIncome [currency units/year], annualDebtService [currency units/year].

### Bond rates and prices

Positive face,price,days,couponDays,time. weightedPV=sum time(years)×PV(cashflow). frequency coupons/year, annualYield decimal. Approximate YTM is not exact; actual day-count conventions may differ.

21. Coupon rate: couponRate = coupon*frequency/face [decimal/year]
22. Annual coupon payment: annualCoupon = face*annualCouponRate [currency units/year]
23. Approximate yield to maturity: approxYTM = (annualCoupon+(face-price)/time)/((face+price)/2) [decimal/year]
24. Zero-coupon yield: zeroYield = (face/price)^(1/periods)-1 [decimal/period]
25. Bank discount yield: discountYield = (face-price)/face*360/days [decimal/year]
26. Money-market investment yield: investmentYield = (face-price)/price*365/days [decimal/year]
27. Accrued coupon interest: accrued = coupon*elapsedDays/couponDays [currency units]
28. Dirty bond price: dirty = clean+accrued [currency units]
29. Macaulay duration from supplied weighted sum: duration = weightedPV/price [years]
30. Modified duration: modifiedDuration = duration/(1+annualYield/frequency) [years]

Input bases: face [currency units], coupon [currency units/period], price [currency units], periods [periods], rate [decimal/period], time [years], frequency [periods/year], annualCouponRate [decimal/year], days [days], elapsedDays [days], couponDays [days], clean [currency units], weightedPV [currency units·years], annualYield [decimal/year].

### Duration and fixed-income risk

Consistent yield basis; nonzero yieldChange, PVbase>0. durations in years, weights sum1, time years, longTime>shortTime; no guarantee of market price response.

31. First-order bond price change: durationChange = -price*modifiedDuration*yieldChange [currency units]
32. Duration-convexity price change: convexityChange = price*(-modifiedDuration*yieldChange+convexity*yieldChange^2/2) [currency units]
33. Effective duration: effectiveDuration = (PVdown-PVup)/(2*PVbase*yieldChange) [years]
34. Effective convexity: effectiveConvexity = (PVdown+PVup-2*PVbase)/(PVbase*yieldChange^2) [years²]
35. Dollar value of one basis point: DV01 = price*modifiedDuration*0.0001 [currency units/bp]
36. Portfolio duration two assets: portfolioDuration = weightA*durationA+(1-weightA)*durationB [years]
37. Continuously compounded spot discount: spotDiscount = exp(-spotRate*time) [1]
38. Forward rate from annual spots: forwardRate = ((1+spotLong)^longTime/(1+spotShort)^shortTime)^(1/(longTime-shortTime))-1 [decimal/year]
39. Forward discount factor: forwardDiscount = discountLong/discountShort [1]
40. Two-position dollar duration: dollarDuration = valueA*durationA+valueB*durationB [currency units·years]

Input bases: price [currency units], duration [years], convexity [years²], yieldChange [decimal/year], modifiedDuration [years], PVup [currency units], PVdown [currency units], PVbase [currency units], weightA [1], durationA [years], durationB [years], spotRate [decimal/year], time [years], spotLong [decimal/year], longTime [years], spotShort [decimal/year], shortTime [years], discountLong [1], discountShort [1], valueA [currency units], valueB [currency units].

### Two-asset portfolio risk

Same return period, sigma≥0, correlation in [-1,1]; nonzero risk denominators. MinimumWeight unrestricted mathematically; shorting constraints require optimization. Supplied expected/model returns, not forecasts or recommendations.

41. Two-asset expected return: portfolioReturn = weightA*returnA+(1-weightA)*returnB [decimal/period]
42. Two-asset return variance: portfolioVariance = weightA^2*sigmaA^2+(1-weightA)^2*sigmaB^2+2*weightA*(1-weightA)*sigmaA*sigmaB*correlation [return²]
43. Two-asset volatility: portfolioSigma = sqrt(portfolioVariance) [decimal/period]
44. Asset covariance: covariance = correlation*sigmaA*sigmaB [return²]
45. Minimum variance weight: minimumWeight = (sigmaB^2-covariance)/(sigmaA^2+sigmaB^2-2*covariance) [1]
46. Portfolio beta two assets: portfolioBeta = weightA*betaA+(1-weightA)*betaB [1]
47. Sharpe ratio: sharpe = (portfolioReturn-riskFree)/portfolioSigma [1]
48. Treynor ratio: treynor = (portfolioReturn-riskFree)/portfolioBeta [decimal/period]
49. Jensen alpha: alpha = portfolioReturn-(riskFree+portfolioBeta*(marketReturn-riskFree)) [decimal/period]
50. Information ratio: information = (portfolioReturn-benchmarkReturn)/trackingError [1]

Input bases: weightA [1], returnA [decimal/period], returnB [decimal/period], sigmaA [decimal/period], sigmaB [decimal/period], correlation [1], riskFree [decimal/period], betaA [1], betaB [1], marketReturn [decimal/period], benchmarkReturn [decimal/period], trackingError [decimal/period].

### Equity valuation and distributions

Gordon r>g and g>-1; per-share quantities consistent and positive denominators. payout,ROE decimals, aggregate values same currency. Supplied forecasts; valuation model assumptions do not predict market value.

51. Gordon-growth share value: gordon = D1/(r-g) [currency units/share]
52. Two-stage dividend value: twoStage = D1/(1+r)+(D2+terminalValue)/(1+r)^2 [currency units/share]
53. Retention ratio: retention = 1-payout [1]
54. Sustainable growth rate: sustainable = ROE*retention [decimal/year]
55. Justified forward PE: justifiedPE = payout/(r-g) [1]
56. Price-to-book ratio: priceBook = price/book [1]
57. Earnings yield: earningsYield = earnings/price [1]
58. Dividend per share: dividendShare = totalDividends/shares [currency units/share]
59. Payout ratio from per-share figures: payoutRatio = dividendShare/earnings [1]
60. Enterprise value: EV = equityValue+debtValue+preferredValue+minorityInterest-cash [currency units]

Input bases: D1 [currency units/share], D2 [currency units/share], g [decimal/year], r [decimal/year], earnings [currency units/share], book [currency units/share], price [currency units/share], terminalValue [currency units/share], payout [1], ROE [decimal/year], totalDividends [currency units], shares [shares], equityValue [currency units], debtValue [currency units], preferredValue [currency units], minorityInterest [currency units], cash [currency units].

### Business accounting ratios

Use annual flows, average balance-sheet assets/equity/inventory/receivables where appropriate, positive denominators. income net income, netMargin decimal, EBIT and interestExpense same annual currency basis.

61. Gross profit: grossProfit = revenue-COGS [currency units/year]
62. Gross margin: grossMargin = grossProfit/revenue [1]
63. Return on assets: ROA = income/assets [year⁻¹]
64. Return on equity: ROE = income/equity [year⁻¹]
65. Asset turnover: assetTurnover = revenue/assets [year⁻¹]
66. Equity multiplier: equityMultiplier = assets/equity [1]
67. DuPont ROE: dupont = netMargin*assetTurnover*equityMultiplier [year⁻¹]
68. Inventory turnover: inventoryTurnover = COGS/inventory [year⁻¹]
69. Days sales outstanding: DSO = 365*receivables/revenue [days]
70. Interest coverage: interestCoverage = EBIT/interestExpense [1]

Input bases: revenue [currency units/year], COGS [currency units/year], assets [currency units], equity [currency units], income [currency units/year], inventory [currency units], receivables [currency units], netMargin [1], EBIT [currency units/year], interestExpense [currency units/year].

### Working capital and cash flows

Same accounting year/currency; changeNWC increase consumes cash. taxRate in [0,1]; costOfCapital decimal/year, capex and borrowing annual flows. Simplified accounting models; OCF excludes other noncash adjustments.

71. Days inventory outstanding: DIO = 365*inventory/COGS [days]
72. Days payable outstanding: DPO = 365*payables/COGS [days]
73. Cash conversion cycle: CCC = DIO+DSO-DPO [days]
74. Net working capital: NWC = currentAssets-currentLiabilities [currency units]
75. NOPAT: NOPAT = EBIT*(1-taxRate) [currency units/year]
76. Free cash flow to firm: FCFF = NOPAT+depreciation-capex-changeNWC [currency units/year]
77. Free cash flow to equity: FCFE = netIncome+depreciation-capex-changeNWC+netBorrowing [currency units/year]
78. Operating cash flow indirect: OCF = netIncome+depreciation-changeNWC [currency units/year]
79. Cash-flow yield: cashYield = FCFE/equityMarketValue [year⁻¹]
80. Economic value added: EVA = NOPAT-investedCapital*costOfCapital [currency units/year]

Input bases: COGS [currency units/year], inventory [currency units], payables [currency units], DSO [days], EBIT [currency units/year], taxRate [decimal], depreciation [currency units/year], currentAssets [currency units], currentLiabilities [currency units], capex [currency units/year], changeNWC [currency units/year], netIncome [currency units/year], netBorrowing [currency units/year], equityMarketValue [currency units], investedCapital [currency units], costOfCapital [decimal/year].

### Returns fees and inflation

User-supplied fixed rates only, no jurisdiction tables; positive prices/time, rates>-1, fees and tax rates [0,1), no timing/withdrawal assumptions. Fee convention here charged on grown balance.

81. Log investment return: logReturn = ln(endValue/beginValue) [1]
82. Annualized log return: annualLog = logReturn/years [year⁻¹]
83. One-period after-fee growth: netGrowth = (1+nominalRate)*(1-feeRate)-1 [decimal/year]
84. After-tax income: netIncome = grossIncome*(1-taxRate) [currency units]
85. Inflation-adjusted future purchasing value: realValue = endValue/(1+inflation)^years [currency units]
86. Annual fee amount: fee = beginValue*feeRate [currency units/year]
87. Tax-equivalent taxable yield: taxEquivalent = taxFreeYield/(1-taxRate) [decimal/year]
88. After-tax capital gain: netGain = (salePrice-costBasis)*(1-capitalGainTax) [currency units]
89. Future inflation price: futurePrice = currentPrice*(1+inflation)^years [currency units]
90. Multiplicative two-period return: linkedReturn = (1+periodReturnA)*(1+periodReturnB)-1 [1]

Input bases: beginValue [currency units], endValue [currency units], dividend [currency units], feeRate [decimal/year], nominalRate [decimal/year], inflation [decimal/year], years [years], grossIncome [currency units], taxRate [decimal], taxFreeYield [decimal/year], salePrice [currency units], costBasis [currency units], capitalGainTax [decimal], currentPrice [currency units], periodReturnA [decimal/period], periodReturnB [decimal/period].

### Project evaluation and depreciation

Three end-year cash flows. NPV fixed r>-1; annualValue requires r≠0. Depreciation useful life integer,1≤year≤life, salvage≤cost; decliningBook before salvage floor and life≥2. No tax schedules assumed.

91. Three-year project NPV: projectNPV = -initial+cashA/(1+r)+cashB/(1+r)^2+cashC/(1+r)^3 [currency units]
92. Profitability index: profitability = (projectNPV+initial)/initial [1]
93. Simple constant-cash-flow payback: payback = initial/annualCash [years]
94. Equivalent annual value: annualValue = projectNPV*r/(1-(1+r)^(-life)) [currency units/year]
95. Double-declining depreciation rate: decliningRate = 2/life [year⁻¹]
96. Declining balance before salvage floor: decliningBook = cost*(1-decliningRate)^year [currency units]
97. Sum-of-years denominator: yearSum = life*(life+1)/2 [year²]
98. Sum-of-years depreciation: yearDepreciation = (cost-salvage)*(life-year+1)/yearSum [currency units/year]
99. Units-of-production depreciation: unitDepreciation = (cost-salvage)*unitsUsed/lifetimeUnits [currency units]
100. Accounting return on average book investment: accountingReturn = annualProfit/((cost+salvage)/2) [year⁻¹]

Input bases: initial [currency units], cashA [currency units], cashB [currency units], cashC [currency units], r [decimal/year], cost [currency units], salvage [currency units], life [years], year [years], annualCash [currency units/year], unitsUsed [units/year], lifetimeUnits [units], annualProfit [currency units/year].

## Statistics — 100 entries

### Descriptive aggregates

n positive integer and n>1 for sample variance; positive sd/iqr where divided. Raw sums must be internally consistent; q1≤median≤q3. CV convention here signed mean; undefined at zero.

1. Population variance from aggregates: popVariance = sumSquares/n-(sum/n)^2 [data units²]
2. Sample variance from aggregates: sampleVariance = (sumSquares-sum^2/n)/(n-1) [data units²]
3. Population standard deviation: popSD = sqrt(popVariance) [data units]
4. Root mean square: rms = sqrt(sumSquares/n) [data units]
5. Coefficient of variation: cv = sd/mean [1]
6. Interquartile range: iqr = q3-q1 [data units]
7. Lower Tukey inner fence: lowerFence = q1-1.5*iqr [data units]
8. Upper Tukey inner fence: upperFence = q3+1.5*iqr [data units]
9. Bowley quartile skewness: bowley = (q3+q1-2*median)/iqr [1]
10. Pearson median skewness: pearsonSkew = 3*(mean-median)/sd [1]

Input bases: sum [data units], sumSquares [data units²], n [observations], mean [data units], sd [data units], q1 [data units], q3 [data units], median [data units].

### Weighted and grouped aggregates

Nonnegative weights not all zero; group nA,nB integers>1. WeightedSE is heuristic, not a survey-design variance estimator. Pooled within variance assumes common variance for inference.

11. Three-value weighted mean: weightedMean = (weightA*xA+weightB*xB+weightC*xC)/(weightA+weightB+weightC) [data units]
12. Weighted population variance: weightedVariance = (weightA*(xA-weightedMean)^2+weightB*(xB-weightedMean)^2+weightC*(xC-weightedMean)^2)/(weightA+weightB+weightC) [data units²]
13. Two-group combined mean: combinedMean = (nA*meanA+nB*meanB)/(nA+nB) [data units]
14. Two-group pooled within variance: pooledVar = ((nA-1)*varA+(nB-1)*varB)/(nA+nB-2) [data units²]
15. Combined within-group sum of squares: withinSS = (nA-1)*varA+(nB-1)*varB [data units²]
16. Two-group between sum of squares: betweenSS = nA*(meanA-combinedMean)^2+nB*(meanB-combinedMean)^2 [data units²]
17. Combined sample variance: combinedVar = (withinSS+betweenSS)/(nA+nB-1) [data units²]
18. Kish effective sample size three weights: effectiveN = (weightA+weightB+weightC)^2/(weightA^2+weightB^2+weightC^2) [observations]
19. Weighted standard error approximation: weightedSE = sqrt(weightedVariance/effectiveN) [data units]
20. Frequency-weighted total: weightedTotal = weightA*xA+weightB*xB+weightC*xC [data units]

Input bases: weightA [1], weightB [1], weightC [1], xA [data units], xB [data units], xC [data units], nA [observations], nB [observations], meanA [data units], meanB [data units], varA [data units²], varB [data units²].

### Bernoulli and binomial extensions

Independent identical Bernoulli trials, integer n>0, 0≤p≤1; skewness/kurtosis require 0<p<1. Exact simple event probabilities; x unused as an input unless a relation needs it.

21. Bernoulli failure probability: q = 1-p [probability]
22. Bernoulli variance: bernoulliVar = p*(1-p) [1]
23. Bernoulli standard deviation: bernoulliSD = sqrt(bernoulliVar) [1]
24. Binomial zero-success probability: zeroP = (1-p)^n [probability]
25. Binomial all-success probability: allP = p^n [probability]
26. Binomial at-least-one probability: anyP = 1-zeroP [probability]
27. Binomial factorial second moment: factorialMoment = n*(n-1)*p^2 [successes²]
28. Binomial skewness: skewness = (1-2*p)/sqrt(n*p*(1-p)) [1]
29. Binomial excess kurtosis: kurtosis = (1-6*p*(1-p))/(n*p*(1-p)) [1]
30. Binomial sample-proportion variance: proportionVariance = p*(1-p)/n [1]

Input bases: p [probability], n [trials], x [successes].

### Poisson counts

Homogeneous independent Poisson events, lambda>0 for log PMF/moment ratios, x integer≥0. lambdaA,lambdaB≥0. At lambda=0 distribution is degenerate; log-PMF branch not used.

31. Poisson mean from rate: mean = rate*time [events]
32. Poisson zero probability: zeroP = exp(-lambda) [probability]
33. Poisson exactly-one probability: oneP = lambda*exp(-lambda) [probability]
34. Poisson at-least-one probability: anyP = 1-zeroP [probability]
35. Poisson PMF for supplied count: pmf = exp(-lambda+x*ln(lambda)-logfactorial(x)) [probability]
36. Poisson variance: variance = lambda [events²]
37. Poisson standard deviation: sd = sqrt(lambda) [events]
38. Poisson skewness: skewness = 1/sqrt(lambda) [1]
39. Poisson excess kurtosis: kurtosis = 1/lambda [1]
40. Independent Poisson sum mean: sumMean = lambdaA+lambdaB [events]

Input bases: lambda [expected events], x [events], rate [events/time], time [time units], lambdaA [expected events], lambdaB [expected events].

### Continuous uniform distribution

b>a; density and CDF formulas apply only a≤x≤b, interval endpoints a≤lower≤upper≤b, p in [0,1]. Differential entropy depends on units.

41. Uniform density within interval: density = 1/(b-a) [data units⁻¹]
42. Uniform mean: mean = (a+b)/2 [data units]
43. Uniform variance: variance = (b-a)^2/12 [data units²]
44. Uniform standard deviation: sd = (b-a)/sqrt(12) [data units]
45. Uniform interior CDF: cdf = (x-a)/(b-a) [probability]
46. Uniform quantile: quantile = a+p*(b-a) [data units]
47. Uniform interval probability: intervalP = (upper-lower)/(b-a) [probability]
48. Uniform second raw moment: secondMoment = (a^2+a*b+b^2)/3 [data units²]
49. Uniform differential entropy: entropy = ln(b-a) [nats]
50. Uniform excess kurtosis: kurtosis = -6/5 [1]

Input bases: a [data units], b [data units], x [data units], p [probability], upper [data units], lower [data units].

### Exponential waiting times

rate>0, x,time≥0, quantile 0≤p<1. Homogeneous memoryless waiting-time model only.

51. Exponential probability density: density = rate*exp(-rate*x) [time units⁻¹]
52. Exponential CDF: cdf = 1-exp(-rate*x) [probability]
53. Exponential survival: survival = exp(-rate*x) [probability]
54. Exponential quantile: quantile = -ln(1-p)/rate [time units]
55. Exponential mean: mean = 1/rate [time units]
56. Exponential variance: variance = 1/rate^2 [time units²]
57. Exponential median: median = ln(2)/rate [time units]
58. Exponential hazard rate: hazard = rate [time units⁻¹]
59. Exponential second moment: secondMoment = 2/rate^2 [time units²]
60. Memoryless additional survival: conditionalSurvival = exp(-rate*time) [probability]

Input bases: rate [time units⁻¹], x [time units], p [probability], time [time units].

### Geometric and negative binomial

Independent trials, 0<p<1, positive integer successes and x≥1; failures integer≥0, logfactorial arguments≤10000. Trials-until-success convention, not failures-until-success for geometric PMF.

61. Geometric trial-count PMF: geometricP = p*(1-p)^(x-1) [probability]
62. Geometric survival after x trials: survival = (1-p)^x [probability]
63. Geometric cumulative probability: cdf = 1-(1-p)^x [probability]
64. Geometric variance: variance = (1-p)/p^2 [trials²]
65. Geometric skewness: skewness = (2-p)/sqrt(1-p) [1]
66. Negative-binomial trial-count mean: nbMean = successes/p [trials]
67. Negative-binomial trial-count variance: nbVariance = successes*(1-p)/p^2 [trials²]
68. Negative-binomial expected failures: nbFailures = successes*(1-p)/p [failures]
69. Negative-binomial PMF failures before successes: nbPMF = exp(logfactorial(failures+successes-1)-logfactorial(failures)-logfactorial(successes-1)+successes*ln(p)+failures*ln(1-p)) [probability]
70. Negative-binomial skewness: nbSkewness = (2-p)/sqrt(successes*(1-p)) [1]

Input bases: p [probability], x [trials], successes [successes], failures [failures].

### Regression diagnostics

Ordinary least squares with intercept, n>parameters; simple regression parameters=2, Sxx>0,SST>0, consistent sums of squares. Inference requires independent errors and appropriate linear/variance assumptions.

71. Regression residual: residual = y-(intercept+slope*x) [response units]
72. Residual mean square: MSE = SSE/(n-parameters) [response units²]
73. Residual standard error: residualSE = sqrt(MSE) [response units]
74. Regression R squared: R2 = 1-SSE/SST [1]
75. Adjusted R squared: adjustedR2 = 1-(1-R2)*(n-1)/(n-parameters) [1]
76. Simple regression slope standard error: slopeSE = residualSE/sqrt(Sxx) [response/predictor]
77. Simple regression leverage at x: leverage = 1/n+(x-meanX)^2/Sxx [1]
78. Mean-response standard error: meanResponseSE = residualSE*sqrt(leverage) [response units]
79. Individual prediction standard error: predictionSE = residualSE*sqrt(1+leverage) [response units]
80. Slope t statistic: slopeT = (slope-nullSlope)/slopeSE [1]

Input bases: SSE [response units²], SST [response units²], n [observations], parameters [parameters], Sxx [predictor units²], x [predictor units], meanX [predictor units], slope [response/predictor], intercept [response units], y [response units], nullSlope [response/predictor].

### Inference planning and effects

Sample size outputs are real planning values: round UP manually to integer. Appropriate supplied z, sigma>0, margin>0, population>1 and 0<n≤population. Proportion margin probability units; df>1. Hedges J approximation.

81. Mean precision required sample size: meanN = (z*sigma/margin)^2 [observations]
82. Proportion precision sample size: proportionN = z^2*p*(1-p)/margin^2 [observations]
83. Worst-case proportion sample size: worstN = z^2/(4*margin^2) [observations]
84. Finite-population correction: fpc = sqrt((population-n)/(population-1)) [1]
85. Finite-population mean standard error: finiteSE = sigma/sqrt(n)*fpc [data units]
86. Cohen standardized mean difference: cohenD = (meanA-meanB)/pooledSD [1]
87. Hedges small-sample correction: hedgesJ = 1-3/(4*df-1) [1]
88. Hedges g: hedgesG = hedgesJ*cohenD [1]
89. Confidence interval width: width = 2*margin [data units]
90. Margin ratio after resizing: marginRatio = sqrt(oldN/newN) [1]

Input bases: z [critical value], sigma [data units], margin [data units], p [probability], n [observations], meanA [data units], meanB [data units], pooledSD [data units], population [observations], df [degrees of freedom], oldN [observations], newN [observations].

### Contingency tables and ANOVA

a,b exposed outcome/non-outcome,c,d unexposed; positive cells for logORSE/odds; independent observations. ANOVA integer n>groups>1, SSwithin>0; equal-variance normal-error assumptions for F inference, no automatic p-value.

91. Two-by-two odds ratio: oddsRatio = a*d/(b*c) [1]
92. Exposed risk: riskExposed = a/(a+b) [probability]
93. Unexposed risk: riskUnexposed = c/(c+d) [probability]
94. Relative risk: relativeRisk = riskExposed/riskUnexposed [1]
95. Absolute risk difference: riskDifference = riskExposed-riskUnexposed [1]
96. Log odds-ratio standard error: logORse = sqrt(1/a+1/b+1/c+1/d) [1]
97. Phi coefficient: phi = (a*d-b*c)/sqrt((a+b)*(c+d)*(a+c)*(b+d)) [1]
98. ANOVA between mean square: MSbetween = SSbetween/(groups-1) [data units²]
99. ANOVA within mean square: MSwithin = SSwithin/(n-groups) [data units²]
100. ANOVA F statistic: Fstat = MSbetween/MSwithin [1]

Input bases: a [counts], b [counts], c [counts], d [counts], SSbetween [data units²], SSwithin [data units²], groups [groups], n [observations].

## Mathematics — 100 entries

### Plane geometry extensions

Positive dimensions; triangle inequalities required; vertices integer≥3, apothem meters. Regular polygon; output angles radians.

1. Equilateral triangle area: equilateralArea = sqrt(3)*side^2/4 [m²]
2. Equilateral triangle altitude: equilateralHeight = sqrt(3)*side/2 [m]
3. Heron semiperimeter: semiperimeter = (a+b+c)/2 [m]
4. Heron triangle area: heronArea = sqrt(semiperimeter*(semiperimeter-a)*(semiperimeter-b)*(semiperimeter-c)) [m²]
5. Triangle inradius: inradius = heronArea/semiperimeter [m]
6. Triangle circumradius: circumradius = a*b*c/(4*heronArea) [m]
7. Rhombus diagonal area: rhombusArea = diagonalA*diagonalB/2 [m²]
8. Trapezoid area: trapezoidArea = (a+b)*height/2 [m²]
9. Regular polygon area: polygonArea = vertices*side*apothem/2 [m²]
10. Regular polygon interior angle: interiorAngle = (vertices-2)*pi/vertices [rad]

Input bases: side [m], a [m], b [m], c [m], radius [m], height [m], diagonalA [m], diagonalB [m], vertices [vertices], apothem [m].

### Solids extensions

Positive dimensions; ellipsoid a,b,c semiaxes; cap 0≤height≤2radius; frustum outerRadius≥innerRadius≥0; torus majorRadius>minorRadius>0 meters.

11. Right cone volume: coneVolume = pi*radius^2*height/3 [m³]
12. Right cone slant height: coneSlant = sqrt(radius^2+height^2) [m]
13. Right cone lateral area: coneLateral = pi*radius*coneSlant [m²]
14. Right cone total area: coneArea = coneLateral+pi*radius^2 [m²]
15. Pyramid volume: pyramidVolume = baseArea*height/3 [m³]
16. Ellipsoid volume: ellipsoidVolume = 4*pi*a*b*c/3 [m³]
17. Conical frustum volume: frustumVolume = pi*height*(outerRadius^2+outerRadius*innerRadius+innerRadius^2)/3 [m³]
18. Spherical cap volume: capVolume = pi*height^2*(radius-height/3) [m³]
19. Spherical cap curved area: capArea = 2*pi*radius*height [m²]
20. Torus volume: torusVolume = 2*pi^2*majorRadius*minorRadius^2 [m³]

Input bases: radius [m], height [m], side [m], baseArea [m²], a [m], b [m], c [m], innerRadius [m], outerRadius [m], majorRadius [m], minorRadius [m].

### Coordinate geometry

Common Cartesian coordinate units; x2≠x1 for slope, (A,B) not both0, C coordinate units for dimensionless A,B. ratio>0, centerX/centerY/radius coordinate units. Circle residual0 means on circle.

21. Two-point distance: distance = sqrt((x2-x1)^2+(y2-y1)^2) [coordinate units]
22. Midpoint x coordinate: midX = (x1+x2)/2 [coordinate units]
23. Midpoint y coordinate: midY = (y1+y2)/2 [coordinate units]
24. Line slope through points: lineSlope = (y2-y1)/(x2-x1) [1]
25. Line y intercept: lineIntercept = y1-lineSlope*x1 [coordinate units]
26. Triangle coordinate area: triangleArea = abs(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2 [coordinate units²]
27. Point-to-line distance: lineDistance = abs(A*x1+B*y1+C)/sqrt(A^2+B^2) [coordinate units]
28. Internal division x coordinate: divideX = (ratio*x2+x1)/(ratio+1) [coordinate units]
29. Internal division y coordinate: divideY = (ratio*y2+y1)/(ratio+1) [coordinate units]
30. Circle equation residual: circleResidual = (x1-centerX)^2+(y1-centerY)^2-radius^2 [coordinate units²]

Input bases: x1 [coordinate units], y1 [coordinate units], x2 [coordinate units], y2 [coordinate units], x3 [coordinate units], y3 [coordinate units], slope [1], intercept [coordinate units], A [1], B [1], C [coordinate units], ratio [1], centerX [coordinate units], centerY [coordinate units], radius [coordinate units].

### Triangle trigonometry

Positive triangle sides with strict triangle inequalities, angles between0 andπ, sumπ. Inverse cosine principal branch; sine rule side calculation does not resolve ambiguous inverse-angle cases.

31. Cosine-rule third side: cosineSide = sqrt(a^2+b^2-2*a*b*cos(angleC)) [length units]
32. Cosine-rule angle A: cosineAngle = acos((b^2+c^2-a^2)/(2*b*c)) [rad]
33. Sine-rule side B: sineSide = a*sin(angleB)/sin(angleA) [length units]
34. Triangle third angle: thirdAngle = pi-angleA-angleB [rad]
35. Included-angle triangle area: trigArea = a*b*sin(angleC)/2 [length units²]
36. Triangle height from side and angle: trigHeight = b*sin(angleA) [length units]
37. Sine double angle: sinDouble = 2*sin(angleA)*cos(angleA) [1]
38. Cosine double angle: cosDouble = cos(angleA)^2-sin(angleA)^2 [1]
39. Sine angle sum: sinSum = sin(angleA)*cos(angleB)+cos(angleA)*sin(angleB) [1]
40. Cosine angle sum: cosSum = cos(angleA)*cos(angleB)-sin(angleA)*sin(angleB) [1]

Input bases: a [length units], b [length units], c [length units], angleA [rad], angleB [rad], angleC [rad].

### Sequences and finite series

n,index positive integers; finite geometric sum ratio≠1, alternating ratio≠-1; infinite remainder requires |ratio|<1. Harmonic reciprocal inputs inverse-value units and nonzero term denominator.

41. Arithmetic nth term: arithmeticTerm = first+(index-1)*difference [value units]
42. Arithmetic finite sum: arithmeticSum = n*(2*first+(n-1)*difference)/2 [value units]
43. Geometric nth term: geometricTerm = first*ratio^(index-1) [value units]
44. Geometric finite sum: geometricSum = first*(1-ratio^n)/(1-ratio) [value units]
45. Sum first n positive integers: integerSum = n*(n+1)/2 [1]
46. Sum first n squares: squareSum = n*(n+1)*(2*n+1)/6 [1]
47. Sum first n cubes: cubeSum = (n*(n+1)/2)^2 [1]
48. Alternating geometric finite sum: alternatingSum = first*(1-(-ratio)^n)/(1+ratio) [value units]
49. Harmonic sequence nth term: harmonicTerm = 1/(firstReciprocal+(index-1)*reciprocalDifference) [value units]
50. Geometric series remainder after n terms: remainder = first*ratio^n/(1-ratio) [value units]

Input bases: first [value units], difference [value units/step], ratio [1], n [terms], index [term index], firstReciprocal [value units⁻¹], reciprocalDifference [value units⁻¹/step].

### Conics and polar forms

Ellipse a≥b>0; hyperbola a,b>0; p≠0. Polar conic focus origin, semiLatus coordinate units and nonnegative e; denominator nonzero. Spiral growth coordinate units/rad.

51. Ellipse area: ellipseArea = pi*a*b [coordinate units²]
52. Ellipse focal distance: ellipseFocus = sqrt(a^2-b^2) [coordinate units]
53. Ellipse eccentricity: ellipseE = ellipseFocus/a [1]
54. Hyperbola focal distance: hyperbolaFocus = sqrt(a^2+b^2) [coordinate units]
55. Hyperbola eccentricity: hyperbolaE = hyperbolaFocus/a [1]
56. Parabola y at x: parabolaY = x^2/(4*p) [coordinate units]
57. Polar x coordinate: polarX = radius*cos(angle) [coordinate units]
58. Polar y coordinate: polarY = radius*sin(angle) [coordinate units]
59. Polar conic radius: conicRadius = semiLatus/(1+eccentricity*cos(angle)) [coordinate units]
60. Archimedean spiral radius: spiralRadius = initialRadius+growth*angle [coordinate units]

Input bases: a [coordinate units], b [coordinate units], p [coordinate units], x [coordinate units], y [coordinate units], angle [rad], radius [coordinate units], semiLatus [coordinate units], eccentricity [1], initialRadius [coordinate units], growth [coordinate units/rad].

### Derivatives of elementary functions

Dimensionless elementary functions; radians; tan derivative excludes poles, ln needs ax+b>0, base exponential b>0, arcsin/arccos derivative |x|<1, self-power x>0.

61. Derivative sin(ax+b): dSin = a*cos(a*x+b) [1]
62. Derivative cos(ax+b): dCos = -a*sin(a*x+b) [1]
63. Derivative tan(ax+b): dTan = a/cos(a*x+b)^2 [1]
64. Derivative exp(ax+b): dExp = a*exp(a*x+b) [1]
65. Derivative ln(ax+b): dLn = a/(a*x+b) [1]
66. Derivative base-b exponential: dBase = ln(b)*b^x [1]
67. Derivative arcsin(x): dAsin = 1/sqrt(1-x^2) [1]
68. Derivative arccos(x): dAcos = -1/sqrt(1-x^2) [1]
69. Derivative arctan(x): dAtan = 1/(1+x^2) [1]
70. Derivative x^x: dSelfPower = x^x*(ln(x)+1) [1]

Input bases: x [1], a [1], b [1], n [1].

### Exact elementary definite integrals

Dimensionless proper real integrals; n≠-1 and real power throughout interval; reciprocal same-sign nonzero endpoints; k≠0 for divided-k formulas; arcsin endpoints strictly within(-1,1); log endpoints>0; sqrt endpoints≥0.

71. Integral power x^n from a to b: powerIntegral = (b^(n+1)-a^(n+1))/(n+1) [1]
72. Integral reciprocal x from a to b: reciprocalIntegral = ln(abs(b))-ln(abs(a)) [1]
73. Integral sin(kx) from a to b: sineIntegral = (cos(k*a)-cos(k*b))/k [1]
74. Integral cos(kx) from a to b: cosineIntegral = (sin(k*b)-sin(k*a))/k [1]
75. Integral exp(kx) from a to b: exponentialIntegral = (exp(k*b)-exp(k*a))/k [1]
76. Integral 1/(1+x²) from a to b: arctanIntegral = atan(b)-atan(a) [1]
77. Integral 1/sqrt(1-x²) from a to b: arcsinIntegral = asin(b)-asin(a) [1]
78. Integral ln(x) from a to b: logIntegral = b*ln(b)-b-a*ln(a)+a [1]
79. Integral sqrt(x) from a to b: rootIntegral = 2*(b^1.5-a^1.5)/3 [1]
80. Integral x exp(kx) from a to b: xExpIntegral = (exp(k*b)*(k*b-1)-exp(k*a)*(k*a-1))/k^2 [1]

Input bases: a [1], b [1], k [1], n [1].

### Numerical and local calculus

Supplied consistent function samples; h≠0, Newton fPrime≠0, secant fB≠fA; Simpson fm at midpoint. Bound needs valid maximum |f″| over interval and positive integer panels; numerical estimates not symbolic proofs.

81. Single trapezoid integral estimate: trapezoid = (b-a)*(fa+fb)/2 [x·y units]
82. Single Simpson panel integral estimate: simpson = (b-a)*(fa+4*fm+fb)/6 [x·y units]
83. Midpoint panel integral estimate: midpoint = (b-a)*fm [x·y units]
84. Central first-difference estimate: centralDerivative = (fPlus-fMinus)/(2*h) [y/x units]
85. Central second-difference estimate: centralSecond = (fPlus-2*fCenter+fMinus)/h^2 [y/x² units]
86. Linearization prediction: linearPrediction = fCenter+fPrime*deltaX [y units]
87. Quadratic Taylor prediction: quadraticPrediction = linearPrediction+fSecond*deltaX^2/2 [y units]
88. Newton next iterate: newtonNext = x-fCenter/fPrime [x units]
89. Secant next iterate: secantNext = xB-fB*(xB-xA)/(fB-fA) [x units]
90. Trapezoid error bound: trapezoidError = abs(b-a)^3*maxSecond/(12*panels^2) [x·y units]

Input bases: h [x units], fa [y units], fm [y units], fb [y units], a [x units], b [x units], fPrime [y/x], fSecond [y/x²], deltaX [x units], fPlus [y units], fMinus [y units], fCenter [y units], x [x units], xB [x units], fB [y units], xA [x units], fA [y units], maxSecond [y/x² units], panels [panels].

### Vectors and complex numbers

Common vector component units, nonzero vectors for angle; principal acos. Complex numbers dimensionless and nonzero denominator for reciprocal; supplied real/imaginary components.

91. Three-dimensional vector norm: normA = sqrt(ax^2+ay^2+az^2) [units]
92. Three-dimensional dot product: dot = ax*bx+ay*by+az*bz [units²]
93. Cross product x component: crossX = ay*bz-az*by [units²]
94. Cross product y component: crossY = az*bx-ax*bz [units²]
95. Cross product z component: crossZ = ax*by-ay*bx [units²]
96. Vector angle: vectorAngle = acos(dot/(normA*sqrt(bx^2+by^2+bz^2))) [rad]
97. Complex modulus: modulus = sqrt(real^2+imaginary^2) [1]
98. Complex product real part: productReal = real*secondReal-imaginary*secondImaginary [1]
99. Complex product imaginary part: productImaginary = real*secondImaginary+imaginary*secondReal [1]
100. Complex reciprocal real part: reciprocalReal = real/(real^2+imaginary^2) [1]

Input bases: ax [units], ay [units], az [units], bx [units], by [units], bz [units], real [1], imaginary [1], secondReal [1], secondImaginary [1].

## Economics — 100 entries

### Linear supply and demand

Positive supply/demand slopes, demandIntercept>supplyIntercept, interior positive equilibrium. Prices currency/quantity; no truncated negative demand or supply quantities; formulas only in active positive curve domains.

1. Inverse linear demand price: demandPrice = demandIntercept-demandSlope*quantity [price units]
2. Inverse linear supply price: supplyPrice = supplyIntercept+supplySlope*quantity [price units]
3. Market-clearing quantity: equilibriumQuantity = (demandIntercept-supplyIntercept)/(demandSlope+supplySlope) [quantity units]
4. Market-clearing price: equilibriumPrice = demandIntercept-demandSlope*equilibriumQuantity [price units]
5. Linear demand quantity at price: demandQuantity = (demandIntercept-price)/demandSlope [quantity units]
6. Linear supply quantity at price: supplyQuantity = (price-supplyIntercept)/supplySlope [quantity units]
7. Market excess demand: excessDemand = demandQuantity-supplyQuantity [quantity units]
8. Linear-market consumer surplus: consumerSurplus = (demandIntercept-equilibriumPrice)*equilibriumQuantity/2 [currency units]
9. Linear-market producer surplus: producerSurplus = (equilibriumPrice-supplyIntercept)*equilibriumQuantity/2 [currency units]
10. Total market surplus: marketSurplus = consumerSurplus+producerSurplus [currency units]

Input bases: demandIntercept [price units], demandSlope [price/quantity], supplyIntercept [price units], supplySlope [price/quantity], quantity [quantity units], price [price units].

### Specific taxes and subsidies

Linear competitive active curves, slopes>0, tax/subsidy≥0; equilibrium quantities must remain nonnegative. Incidence applies to small/linear unit-tax shifts, not ad valorem taxes.

11. Taxed market quantity: taxQuantity = (demandIntercept-supplyIntercept-tax)/(demandSlope+supplySlope) [units]
12. Buyer price after unit tax: buyerPrice = demandIntercept-demandSlope*taxQuantity [currency/unit]
13. Seller price net of unit tax: sellerPrice = buyerPrice-tax [currency/unit]
14. Unit-tax revenue: taxRevenue = tax*taxQuantity [currency]
15. Untaxed comparison quantity: baseQuantity = (demandIntercept-supplyIntercept)/(demandSlope+supplySlope) [units]
16. Linear unit-tax deadweight loss: taxDWL = tax*(baseQuantity-taxQuantity)/2 [currency]
17. Buyer incidence fraction: buyerShare = demandSlope/(demandSlope+supplySlope) [1]
18. Seller incidence fraction: sellerShare = supplySlope/(demandSlope+supplySlope) [1]
19. Subsidized market quantity: subsidyQuantity = (demandIntercept-supplyIntercept+subsidy)/(demandSlope+supplySlope) [units]
20. Total unit-subsidy cost: subsidyCost = subsidy*subsidyQuantity [currency]

Input bases: demandIntercept [currency/unit], demandSlope [currency/unit²], supplyIntercept [currency/unit], supplySlope [currency/unit²], tax [currency/unit], subsidy [currency/unit].

### Elasticities and expenditure

Nonzero denominators, positive base prices/quantities/income. Derivatives represented by supplied local dQ/dP ratios; elasticity sign retained. scale units depend on elasticity; elasticMR assumes differentiable inverse demand.

21. Point own-price elasticity: priceElasticity = dQ/dP*P/Q [1]
22. Point income elasticity: incomeElasticity = dQ/dIncome*income/Q [1]
23. Point cross-price elasticity: crossElasticity = dQ/dOtherPrice*otherPrice/Q [1]
24. Midpoint income elasticity: midIncome = ((Q2-Q1)/((Q2+Q1)/2))/((income2-income1)/((income2+income1)/2)) [1]
25. Midpoint cross-price elasticity: midCross = ((Q2-Q1)/((Q2+Q1)/2))/((otherPrice2-otherPrice1)/((otherPrice2+otherPrice1)/2)) [1]
26. Linear demand elasticity at quantity: linearElasticity = -P/(slope*Q) [1]
27. Constant-elasticity demand: constantQ = scale*P^elasticity [quantity units]
28. Revenue response differential: dRevenue = Q*(1+priceElasticity)*dP [currency]
29. Expenditure share: expenditureShare = P*Q/income [1]
30. Marginal revenue from elasticity: elasticMR = P*(1+1/priceElasticity) [currency/unit]

Input bases: dQ [quantity units], dP [currency/unit], Q [quantity units], P [currency/unit], income [currency], dIncome [currency], otherPrice [currency/unit], dOtherPrice [currency/unit], Q2 [quantity units], Q1 [quantity units], income2 [currency], income1 [currency], otherPrice2 [currency/unit], otherPrice1 [currency/unit], slope [currency/unit²], scale [model-specific], elasticity [1].

### Consumer choice and utility

x,y,alpha,beta,prices,income>0 for interior Cobb-Douglas. utility cardinal scale arbitrary; affordableY only feasible if≥0. No discrete or corner-choice optimization.

31. Cobb-Douglas utility: utility = x^alpha*y^beta [utility units]
32. Cobb-Douglas marginal utility X: MUx = alpha*x^(alpha-1)*y^beta [utility/X]
33. Cobb-Douglas marginal utility Y: MUy = beta*x^alpha*y^(beta-1) [utility/Y]
34. Cobb-Douglas MRS magnitude: MRS = alpha*y/(beta*x) [Y/X]
35. Interior optimal X demand: optimalX = alpha/(alpha+beta)*income/priceX [X units]
36. Interior optimal Y demand: optimalY = beta/(alpha+beta)*income/priceY [Y units]
37. Budget line Y intercept: budgetY = income/priceY [Y units]
38. Budget line slope: budgetSlope = -priceX/priceY [Y/X]
39. Budget line affordable Y: affordableY = (income-priceX*x)/priceY [Y units]
40. Marginal utility per currency X: utilityPerDollar = MUx/priceX [utility/currency]

Input bases: x [good X units], y [good Y units], alpha [1], beta [1], priceX [currency/X], priceY [currency/Y], income [currency].

### Production technology

Positive A,K,L,alpha,beta,wage,rent; Cobb-Douglas differentiable production, price-taking factor/output markets for MRPL and interior cost ratio. outputPrice currency/output.

41. Cobb-Douglas output: output = A*K^alpha*L^beta [output units]
42. Capital marginal product: MPK = alpha*A*K^(alpha-1)*L^beta [output/capital]
43. Labor marginal product: MPL = beta*A*K^alpha*L^(beta-1) [output/labor]
44. Capital average product: APK = output/K [output/capital]
45. Labor average product: APL = output/L [output/labor]
46. Labor-to-capital MRTS: MRTS = MPL/MPK [capital/labor]
47. Returns-to-scale degree: scaleDegree = alpha+beta [1]
48. Conditional cost-minimizing capital labor ratio: optimalRatio = alpha*wage/(beta*rent) [capital/labor]
49. Two-factor total cost: factorCost = wage*L+rent*K [currency]
50. Labor marginal revenue product: MRPL = MPL*outputPrice [currency/labor]

Input bases: A [technology units], K [capital units], L [labor units], alpha [1], beta [1], wage [currency/labor], rent [currency/capital], outputPrice [currency/output].

### Firm pricing and market power

Linear demand intercept>MC≥0,slope>0; monopoly interior. shares fractional and sum1 for three firms; firms positive integer, homogeneous-product symmetric Cournot with constant MC. No antitrust threshold assumed.

51. Linear-demand revenue: revenue = intercept*quantity-slope*quantity^2 [currency]
52. Linear-demand marginal revenue: MR = intercept-2*slope*quantity [currency/unit]
53. Constant-MC monopoly quantity: monopolyQ = (intercept-MC)/(2*slope) [units]
54. Constant-MC monopoly price: monopolyP = (intercept+MC)/2 [currency/unit]
55. Constant-MC monopoly profit: monopolyProfit = (monopolyP-MC)*monopolyQ-fixed [currency]
56. Lerner index: lerner = (price-MC)/price [1]
57. Lerner index from demand elasticity: elasticLerner = -1/elasticity [1]
58. Herfindahl index three firms: HHI = 10000*(shareA^2+shareB^2+shareC^2) [points]
59. Cournot identical-firm output per firm: cournotFirm = (intercept-MC)/(slope*(firms+1)) [units]
60. Cournot market price: cournotPrice = (intercept+firms*MC)/(firms+1) [currency/unit]

Input bases: intercept [currency/unit], slope [currency/unit²], quantity [units], MC [currency/unit], fixed [currency], price [currency/unit], elasticity [1], shareA [1], shareB [1], shareC [1], firms [firms].

### Externalities and public policy

Constant marginal external cost/benefit and linear MB for displayed quantity/DWL formulas; socialQ≥0. Policy rates are textbook model values, not legal tax recommendations; all project values comparable discounted currency.

61. Marginal social cost: MSC = privateMC+externalMC [currency/unit]
62. Marginal social benefit: MSB = privateMB+externalMB [currency/unit]
63. Constant marginal Pigouvian tax: pigouTax = externalMC [currency/unit]
64. Constant marginal subsidy for benefit: pigouSubsidy = externalMB [currency/unit]
65. Linear optimal quantity with external cost: socialQ = (intercept-privateMC-externalMC)/slope [units]
66. Linear private-market quantity: privateQ = (intercept-privateMC)/slope [units]
67. External cost total constant margin: externalCost = externalMC*quantity [currency]
68. Externality deadweight loss linear model: externalDWL = externalMC*(privateQ-socialQ)/2 [currency]
69. Cost-effectiveness ratio: costEffectiveness = programCost/unitsAvoided [currency/unit avoided]
70. Benefit-cost ratio public project: benefitCost = discountedBenefits/discountedCosts [1]

Input bases: privateMC [currency/unit], externalMC [currency/unit], privateMB [currency/unit], externalMB [currency/unit], quantity [units], intercept [currency/unit], slope [currency/unit²], programCost [currency], unitsAvoided [units], discountedBenefits [currency], discountedCosts [currency].

### Keynesian expenditure model

0≤MPC<1, marginalImport≥0, taxRate[0,1]; linear fixed-price model. EquilibriumIncome closed economy lump-sum tax; multiplier variants separate model assumptions, not simultaneous forecasts.

71. Consumption with lump-sum tax: consumption = autonomousC+MPC*(income-tax) [currency/period]
72. Disposable income: disposable = income-tax [currency/period]
73. Private saving: privateSaving = disposable-consumption [currency/period]
74. Government saving: governmentSaving = tax-government [currency/period]
75. National saving: nationalSaving = privateSaving+governmentSaving [currency/period]
76. Net exports: netExports = exports-imports [currency/period]
77. Aggregate planned expenditure: planned = consumption+investment+government+netExports [currency/period]
78. Closed-economy equilibrium income: equilibriumIncome = (autonomousC-MPC*tax+investment+government)/(1-MPC) [currency/period]
79. Open-economy induced-import multiplier: openMultiplier = 1/(1-MPC+marginalImport) [1]
80. Proportional-tax spending multiplier: taxMultiplier = 1/(1-MPC*(1-taxRate)) [1]

Input bases: autonomousC [currency/period], MPC [1], income [currency/period], tax [currency/period], investment [currency/period], government [currency/period], exports [currency/period], imports [currency/period], marginalImport [1], taxRate [1].

### Growth and national accounts

Consistent annual real or nominal accounting basis; hoursWorked total annual hours, GDP/netFactorIncome same currency/year. Solow continuous small-rate no technical progress; populationGrowth decimal/year; positive growthPercent percent/year.

81. Real GDP per capita: GDPperson = realGDP/population [currency/(person·year)]
82. Labor productivity: laborProductivity = realGDP/hoursWorked [currency/hour]
83. Capital depreciation flow: depreciation = capital*depreciationRate [currency/year]
84. Net investment: netInvestment = investment-depreciation [currency/year]
85. Net domestic product: NDP = GDP-depreciation [currency/year]
86. Gross national income: GNI = GDP+netFactorIncome [currency/year]
87. Solow saving per worker: savingWorker = savingRate*outputPerWorker [currency/(worker·year)]
88. Solow break-even investment per worker: breakEvenInvestment = (depreciationRate+populationGrowth)*capitalPerWorker [currency/(worker·year)]
89. Solow capital-per-worker change: capitalChange = savingWorker-breakEvenInvestment [currency/(worker·year)]
90. Rule of 70 doubling approximation: doublingYears = 70/growthPercent [years]

Input bases: realGDP [currency/year], population [persons], capital [currency], investment [currency/year], depreciationRate [year⁻¹], savingRate [1], outputPerWorker [currency/(worker·year)], hoursWorked [hours/year], GDP [currency/year], netFactorIncome [currency/year], populationGrowth [year⁻¹], capitalPerWorker [currency/worker], growthPercent [percent/year].

### Money exchange and inflation

Supply exchange rate: no live FX. Quote domestic currency per foreign unit, positive prices/exchange, same interest horizon and rates>-1. Quantity theory identity not causal forecast; inflation tax small annual-rate approximation.

91. Quantity-theory nominal spending: nominalSpending = money*velocity [currency/year]
92. Quantity-theory price level: impliedPrice = money*velocity/realOutput [index factor]
93. Real money balances: realBalances = money/priceLevel [real currency]
94. Real exchange rate: realExchange = nominalExchange*foreignPrice/domesticPrice [1]
95. Absolute purchasing-power parity rate: PPP = domesticPrice/foreignPrice [domestic/foreign]
96. Relative PPP predicted exchange rate: nextExchange = nominalExchange*(1+domesticInflation)/(1+foreignInflation) [domestic/foreign]
97. Covered interest-parity forward exchange: forwardExchange = nominalExchange*(1+domesticRate)/(1+foreignRate) [domestic/foreign]
98. Seigniorage real revenue: seigniorage = moneyIncrease/priceLevel [real currency]
99. Inflation tax approximation: inflationTax = inflationRate*realBalances [real currency/year]
100. Exchange conversion foreign to domestic: domesticAmount = foreignAmount*nominalExchange [domestic currency]

Input bases: money [currency], velocity [year⁻¹], priceLevel [index factor], realOutput [real currency/year], nominalExchange [domestic/foreign], foreignPrice [foreign currency/basket], domesticPrice [domestic currency/basket], domesticInflation [decimal/year], foreignInflation [decimal/year], domesticRate [decimal/period], foreignRate [decimal/period], moneyIncrease [currency], inflationRate [decimal/year], foreignAmount [foreign currency].

## Environmental science — 100 entries

### Water balances and pollutant loads

Positive volume/flow/area/time; runoffCoefficient[0,1]. flowA/B m³/s, concA/B kg/m³. Perfectly mixed conservative flushing, constant volume, zero contaminant inflow; supplied concentrations same basis.

1. Pollutant mass flux: load = flow*concentration [kg/s]
2. Hydraulic retention time: retentionTime = volume/flow [s]
3. Water depth from volume: waterDepth = volume/area [m]
4. Rainfall volume on catchment: rainVolume = depth*area [m³]
5. Runoff volume: runoffVolume = rainVolume*runoffCoefficient [m³]
6. Mean runoff discharge: runoffFlow = runoffVolume/time [m³/s]
7. Mixed concentration two streams: mixedC = (flowA*concA+flowB*concB)/(flowA+flowB) [kg/m³]
8. Pollutant inventory: inventory = concentration*volume [kg]
9. Dilution factor: dilutionFactor = initialConcentration/finalConcentration [1]
10. Residence flushing fraction: flushed = 1-exp(-flow*time/volume) [1]

Input bases: flow [m³/s], concentration [kg/m³], volume [m³], time [s], area [m²], depth [m], runoffCoefficient [1], flowA [m³/s], concA [kg/m³], flowB [m³/s], concB [kg/m³], initialConcentration [kg/m³], finalConcentration [kg/m³].

### Treatment and reactor models

Idealized steady first-order reactors, positive k,V,Q; removal may negative if concentration increases, not capped. reactorSolids kg,wastedSolidsRate kg/s. CT mg/L × minutes, no pathogen-specific safety threshold.

11. Removal fraction: removal = (influent-effluent)/influent [1]
12. Removed load: removedLoad = flow*(influent-effluent) [kg/s]
13. First-order batch concentration: batchC = influent*exp(-k*time) [kg/m³]
14. First-order plug-flow effluent: plugC = influent*exp(-k*volume/flow) [kg/m³]
15. First-order mixed-tank effluent: mixedC = influent/(1+k*volume/flow) [kg/m³]
16. Mixed-tank volume for target: requiredV = flow/k*(influent/effluent-1) [m³]
17. Surface overflow rate: overflow = flow/area [m/s]
18. Solids mass loading: solidsLoad = flow*solidsConcentration [kg/s]
19. Solids retention time: solidsTime = reactorSolids/wastedSolidsRate [s]
20. Disinfection CT product: CT = disinfectantConcentration*contactMinutes [mg·min/L]

Input bases: influent [kg/m³], effluent [kg/m³], flow [m³/s], volume [m³], k [s⁻¹], time [s], area [m²], solidsConcentration [kg/m³], reactorSolids [kg], wastedSolidsRate [kg/s], disinfectantConcentration [mg/L], contactMinutes [min].

### Oxygen and aquatic quality

k,reaeration positive distinct; simple oxygen-sag model constant temperature/flow, no photosynthesis/dispersion. sedimentRate mg/(m²·day),bedArea m², ammoniaNitrogen mg N/L; stoichiometric nitrification factor, no design guarantee.

21. Remaining biochemical oxygen demand: remainingBOD = BODultimate*exp(-k*time) [mg/L]
22. Exerted BOD: exertedBOD = BODultimate-remainingBOD [mg/L]
23. Dissolved oxygen deficit: deficit = DOsat-DO [mg/L]
24. Streeter-Phelps deficit: sag = k*BODultimate/(kReaeration-k)*(exp(-k*time)-exp(-kReaeration*time))+initialDeficit*exp(-kReaeration*time) [mg/L]
25. Predicted oxygen along sag: predictedDO = DOsat-sag [mg/L]
26. Oxygen saturation fraction: saturation = DO/DOsat [1]
27. Sediment oxygen demand total: sedimentDemand = sedimentRate*bedArea [mg/day]
28. Reaeration oxygen rate: reaerationRate = kReaeration*deficit [mg/(L·day)]
29. Ammonia nitrification oxygen requirement: nitrificationOxygen = 4.57*ammoniaNitrogen [mg O₂/L]
30. Alkalinity in CaCO3 equivalents: alkalinity = 50*equivalentsPerLiter [g CaCO₃/L]

Input bases: BODultimate [mg/L], k [day⁻¹], time [days], DOsat [mg/L], DO [mg/L], kReaeration [day⁻¹], initialDeficit [mg/L], sedimentRate [mg/(m²·day)], bedArea [m²], ammoniaNitrogen [mg N/L], equivalentsPerLiter [eq/L].

### Atmospheric concentration and ventilation

Positive T,P,Q,V; ideal gas ppmv, molecular weight g/mol. Indoor well-mixed constant source/ventilation, initial mg/m³,time s; stackFlow actual m³/s, concentration mg/m³, operatingSeconds seconds/year. No exposure-limit or safe ventilation claim.

31. Ideal-gas pollutant mass concentration: gasMass = ppm*pressure*molarMass/(8.314462618*T)*0.001 [mg/m³]
32. Ideal-gas pollutant ppm from mass: gasPPM = massConcentration*8.314462618*T/(pressure*molarMass)*1000 [ppmv]
33. Air changes per hour: ACH = flow*3600/volume [h⁻¹]
34. Ventilation steady excess concentration: excess = source/flow [mg/m³]
35. Steady indoor concentration: steadyIndoor = outside+excess [mg/m³]
36. Ventilation time constant: airTau = volume/flow [s]
37. Indoor transient concentration: indoorC = steadyIndoor+(initial-steadyIndoor)*exp(-time/airTau) [mg/m³]
38. Emission factor per fuel mass: emissionFactor = emissionMass/fuelMass [kg/kg]
39. Stack pollutant mass flow: stackLoad = stackFlow*stackConcentration [mg/s]
40. Annual air emission mass: annualEmission = stackLoad*operatingSeconds/1e6 [kg/year]

Input bases: pressure [Pa], T [K], molarMass [g/mol], ppm [ppmv], flow [m³/s], volume [m³], source [mg/s], outside [mg/m³], massConcentration [mg/m³], initial [mg/m³], time [s], emissionMass [kg], fuelMass [kg], stackFlow [m³/s], stackConcentration [mg/m³], operatingSeconds [s/year].

### Energy and emissions accounting

Supplied region/time-specific emission factors; no live emissions database. Nonnegative energy,efficiency/capacity factor≤1; savedElectricity kWh, output>0, electricMJ/heatMJ/fuelMJ same MJ.

41. Fuel thermal energy: thermalEnergy = fuel*heatingValue [MJ]
42. Useful fuel energy: usefulEnergy = thermalEnergy*efficiency [MJ]
43. Electric generation from useful heat: electricEnergy = usefulEnergy/3.6 [kWh]
44. Electricity carbon emissions: electricEmissions = electricity*emissionFactor [kg CO₂]
45. Capacity factor: capacityFactor = electricity/(ratedPower*hours) [1]
46. Power-time energy: powerEnergy = power*hours [kWh]
47. Energy intensity per output: energyIntensity = electricity/output [kWh/output unit]
48. Emission intensity per output: carbonIntensity = electricEmissions/output [kg CO₂/output unit]
49. Avoided power emissions: avoided = savedElectricity*emissionFactor [kg CO₂]
50. Combined heat-power efficiency: CHPefficiency = (electricMJ+heatMJ)/fuelMJ [1]

Input bases: fuel [kg], heatingValue [MJ/kg], efficiency [1], electricity [kWh], emissionFactor [kg CO₂/kWh], power [kW], hours [h], ratedPower [kW], output [output units], savedElectricity [kWh], electricMJ [MJ], heatMJ [MJ], fuelMJ [MJ].

### Renewable energy models

Ideal steady supplied conditions; radius m, Cp0..16/27 for ideal isolated wind rotor, efficiency0..1. Hydro rho water density kg/m³; massFlow kg/s,specificHeat J/(kg·K),temperatureRise K. No annual-weather prediction.

51. Wind stream power: windPower = rho*area*speed^3/2 [W]
52. Wind turbine mechanical output: windOutput = windPower*Cp [W]
53. Wind Betz-limit output: betzPower = windPower*16/27 [W]
54. Rotor swept area: rotorArea = pi*radius^2 [m²]
55. Hydropower output: hydroPower = rho*9.80665*flow*head*efficiency [W]
56. Solar collector incident power: solarIncident = irradiance*area [W]
57. Solar electric output: solarOutput = solarIncident*efficiency [W]
58. Solar energy for constant irradiance: solarEnergy = solarOutput*hours/1000 [kWh]
59. Array area for rated output: arrayArea = ratedWatts/(irradiance*efficiency) [m²]
60. Solar thermal heat rate: solarHeat = massFlow*specificHeat*temperatureRise [W]

Input bases: rho [kg/m³], area [m²], speed [m/s], Cp [1], flow [m³/s], head [m], efficiency [1], irradiance [W/m²], hours [h], radius [m], ratedWatts [W], massFlow [kg/s], specificHeat [J/(kg·K)], temperatureRise [K].

### Waste and circular material flows

Waste categories disjoint, sum≤generated; density>0,population>0. availableVolume m³; recovery/substitution model-specific factors in[0,1], masses kg. No assumption all collected recycling is recovered.

61. Recycling fraction: recycling = recycled/generated [1]
62. Waste diversion fraction: diversion = (recycled+composted+recoveredEnergy)/generated [1]
63. Landfilled residual: landfilled = generated-recycled-composted-recoveredEnergy [kg/year]
64. Per-capita annual waste: perCapita = generated/population [kg/(person·year)]
65. Landfill volume demand: landfillVolume = landfilled/density [m³/year]
66. Landfill remaining service time: landfillLife = availableVolume/landfillVolume [years]
67. Reusable product annualized material: annualMaterial = mass/lifetime [kg/year]
68. Recycling process yield: processYield = recoveredMass/inputMass [1]
69. Contamination fraction: contamination = contaminantMass/inputMass [1]
70. Recovered-resource substitution: avoidedVirgin = recoveredMass*substitutionFactor [kg]

Input bases: generated [kg/year], recycled [kg/year], composted [kg/year], recoveredEnergy [kg/year], population [persons], density [kg/m³], mass [kg], lifetime [years], availableVolume [m³], recoveredMass [kg], inputMass [kg], contaminantMass [kg], substitutionFactor [1].

### Carbon stock and land models

Supplied stock densities/fractions and assessment-period-specific GWP (not hard-coded). gasMass tonnes,perHectareRate tonnes C/(ha·year). Atmospheric 2.12 Gt C/ppm global approximation; land stocks not guaranteed permanent offsets.

71. Land carbon stock: carbonStock = area*carbonDensity [tonnes C]
72. Biomass carbon stock: biomassCarbon = biomass*carbonFraction [tonnes C]
73. Carbon-to-carbon-dioxide mass: CO2mass = emissionCarbon*44/12 [tonnes CO₂]
74. Annual carbon stock change: annualChange = (finalStock-initialStock)/time [tonnes C/year]
75. Carbon dioxide equivalent: CO2e = gasMass*GWP [tonnes CO₂e]
76. Land sequestration rate: sequestration = area*perHectareRate [tonnes C/year]
77. Emission offset fraction: offset = sequestration/emittedCarbonPerYear [1]
78. Forest biomass increment: biomassIncrement = finalBiomass-initialBiomass [tonnes dry biomass]
79. Carbon stock loss fraction: lossFraction = (initialStock-finalStock)/initialStock [1]
80. Atmospheric carbon stock from ppm increment approximation: atmosphericC = ppmIncrement*2.12 [Gt C]

Input bases: area [ha], carbonDensity [tonnes C/ha], biomass [tonnes dry biomass], carbonFraction [1], time [years], emissionCarbon [tonnes C], GWP [1], finalStock [tonnes C], initialStock [tonnes C], gasMass [tonnes], perHectareRate [tonnes C/(ha·year)], emittedCarbonPerYear [tonnes C/year], finalBiomass [tonnes dry biomass], initialBiomass [tonnes dry biomass], ppmIncrement [ppm].

### Soils and erosion

Texture percentages sum100, 0<bulkDensity≤particleDensity; waterDensity g/cm³ (supply1 approximately if allowed); rootDepth mm. USLE R,K units must match regional definition; depth meters, bulkDensitySI kg/m³,carbonFraction0..1; no site design guarantee.

81. Soil texture fraction total: textureTotal = sand+silt+clay [percent]
82. Soil porosity: porosity = 1-bulkDensity/particleDensity [1]
83. Gravimetric soil water: gravimetricWater = waterMass/dryMass [g/g]
84. Volumetric soil water: volumetricWater = gravimetricWater*bulkDensity/waterDensity [cm³/cm³]
85. Plant available water fraction: availableWater = fieldCapacity-wiltingPoint [cm³/cm³]
86. Plant available water depth: waterDepth = availableWater*rootDepth [mm]
87. USLE annual soil loss: soilLoss = R*K*LS*C*P [specified USLE mass/(area·year)]
88. Erosion reduction fraction: erosionReduction = 1-treatedLoss/untreatedLoss [1]
89. Soil carbon areal stock: soilCarbon = depth*bulkDensitySI*carbonFraction [kg C/m²]
90. Sediment delivery ratio: delivery = deliveredSediment/erodedSoil [1]

Input bases: sand [percent], silt [percent], clay [percent], bulkDensity [g/cm³], particleDensity [g/cm³], waterMass [g], dryMass [g], R [USLE units], K [USLE units], LS [1], C [1], P [1], waterDensity [g/cm³], fieldCapacity [cm³/cm³], wiltingPoint [cm³/cm³], rootDepth [mm], treatedLoss [soil loss units], untreatedLoss [soil loss units], depth [m], bulkDensitySI [kg/m³], carbonFraction [1], deliveredSediment [tonnes], erodedSoil [tonnes].

### Resources sustainability and exposure models

Resource depletion closed fixed reserve, growth≠0 and valid log argument; years≥0. Educational intake estimates only, no safety/medical interpretation. Tissue mg/kg vs water mg/L for BCF; BMF same wet/dry basis. Area model empirical exponent supplied.

91. Static resource lifetime: staticLife = reserve/annualUse [years]
92. Exponential-consumption resource lifetime: growthLife = ln(1+growth*reserve/initialUse)/growth [years]
93. Future annual resource use: futureUse = initialUse*exp(growth*years) [tonnes/year]
94. Cumulative exponential use: cumulativeUse = initialUse*(exp(growth*years)-1)/growth [tonnes]
95. Water ingestion mass per day: ingested = concentration*ingestion [mg/day]
96. Body-mass-normalized daily intake: intake = ingested/bodyMass [mg/(kg·day)]
97. Bioconcentration factor: BCF = tissueConcentration/waterConcentration [L/kg]
98. Trophic biomagnification factor: BMF = predatorConcentration/preyConcentration [1]
99. Habitat remaining fraction: habitatFraction = remainingArea/originalArea [1]
100. Species-area retained fraction: retainedSpecies = habitatFraction^areaExponent [1]

Input bases: reserve [tonnes], annualUse [tonnes/year], growth [year⁻¹], initialUse [tonnes/year], dose [mg], bodyMass [kg], concentration [mg/L], ingestion [L/day], years [years], tissueConcentration [mg/kg], waterConcentration [mg/L], predatorConcentration [mg/kg], preyConcentration [mg/kg], remainingArea [m²], originalArea [m²], areaExponent [1].
