# AP-oriented coverage

Reviewed against College Board's public reference hub and course pages on October 5, 2026. This is an independent learning calculator, not a College Board exam calculator or a guarantee that every exam problem can be solved.

The automatic network contains 2,650 named quantities and 1,194 equation relationships (including the October 6 expansion). Multiple explicit rearrangements are supplied for many relationships. Values for unrelated systems remain distinct. Searching “Equation library & AP references” searches these relationships plus general function, vector, integral, and series identities. Reference-only entries explain their computational limits.

| Subject | Automatic calculation coverage | Additional references / limits |
|---|---|---|
| Chemistry | Photons, Coulomb force, ideal/combined gases, partial pressures, density, molarity/dilution, molality, colligative properties, osmotic pressure, zero/first/second-order kinetics, Arrhenius, equilibrium expressions, acid/base constants, pH/pOH, buffers, weak-acid quadratic, solubility, thermodynamics, Nernst, electrolysis, stoichiometry, yield and bond-energy estimates | General reaction balancing, arbitrary multi-equilibrium systems, limiting-reactant identification and arbitrary Hess-law reaction assembly are not automatic. Weighted sums/coefficient inputs must be supplied. |
| Biology | Mean, SD, SE, chi-square data, probability, Hardy–Weinberg, observed allele frequencies, exponential/logistic populations and growth rates, Simpson diversity, water potential, surface area/volume, enzymes, inhibition, ecology, productivity, PCR and Q10 | Biological model assumptions and inference conditions must be checked. |
| Physics 1 | Constant-acceleration motion, forces, momentum/impulse, collision momentum, work/energy/power, gravity, springs/pendulum/SHM, rotation/inertia/torque, center of mass, hydrostatics, buoyancy, continuity and Bernoulli | Multiple inverse branches, arbitrary simultaneous systems and free-body diagrams are not solved automatically. |
| Physics 2 | Thermal laws/heat engines, electrostatics, capacitors/resistors/circuits/RC, magnetic fields/forces/induction, waves, interference/diffraction, refraction/lenses, photons/photoelectric/de Broglie, thermal radiation, nuclear mass–energy | General vector directions, arbitrary circuits and distributions are reference-only. |
| Physics C | Scalar mechanics and E&M above; Gauss aggregate flux, current density, inductors, RL time constant, LC frequency; numerical derivatives/integrals of explicit 1D functions | General vector fields, surface/path integrals, distributed inertia and charge, Kirchhoff systems and differential equations are reference-only. |
| Statistics | Raw observations/paired regression, discrete moments, chi-square aggregates, normal standardization/CDF/inverse, binomial PMF/moments, geometric PMF/moments, sampling distributions, one/two proportions, one/two means through aggregates, confidence interval/test-statistic relationships | t/chi-square critical values and probabilities use supplied values or official tables. Statistical test selection and condition checks are not automatic. |
| Calculus AB/BC | Explicit function evaluation, approximate first/second derivatives, proper finite definite integrals, local linearization, power/product/quotient/chain/parametric derivative relationships, Euler step, integral average, geometric sums | Symbolic limits/antiderivatives, general differential equations, infinite-series convergence, proofs, general implicit differentiation and improper integrals are reference-only. |
| Precalculus | Trigonometric expression evaluation, geometry, exponential/log models and geometric sums; function composition/inverse/log/trig/polar identities in reference | Arbitrary inverse branches, polynomial roots and symbolic function transformations are not automatic. |
| Microeconomics | Revenue/profit/cost/markup/margin, midpoint elasticity, marginal products/revenue, cost averages, price/quantity and break-even calculations | Supply/demand curves, market optimization, surplus from arbitrary curves and graphs require model inputs or an explicit function. |
| Macroeconomics | GDP, net exports, real/nominal output, deflator/CPI/inflation, labor-force rates, spending/tax multipliers, banking multiplier/maximum expansion, quantity equation and real returns | Simplified multiplier assumptions apply; no country-specific policy or live economic data. |
| Environmental science | Population growth/rates, energy/power/efficiency, rule of 70, IPAT, ppm/ppb and mass concentration, productivity, diversity and geometric/density conversions | Official exam reference information is in Bluebook; problem-specific models must be supplied. |

## Official sources

- [College Board reference hub](https://apcentral.collegeboard.org/exam-administration-ordering-scores/administering-exams/subject-specific/reference-information)
- [Biology](https://apcentral.collegeboard.org/media/pdf/ap-biology-equations-and-formulas-sheet.pdf)
- [Chemistry](https://apcentral.collegeboard.org/media/pdf/ap-chemistry-equations-sheet.pdf)
- [Physics 1](https://apcentral.collegeboard.org/media/pdf/ap-physics-1-equations-sheet.pdf)
- [Physics 2](https://apcentral.collegeboard.org/media/pdf/ap-physics-2-equations-sheet.pdf)
- [Physics C Mechanics](https://apcentral.collegeboard.org/media/pdf/ap-physics-c-mechanics-equations-sheet.pdf)
- [Physics C E&M](https://apcentral.collegeboard.org/media/pdf/ap-physics-c-electricity-and-magnetism-equations-sheet.pdf)
- [Statistics](https://apcentral.collegeboard.org/media/pdf/ap-statistics-formula-tables-sheet.pdf)
- [Calculus AB/BC](https://apcentral.collegeboard.org/media/pdf/ap-calculus-ab-and-bc-course-and-exam-description.pdf)
- [Precalculus](https://apcentral.collegeboard.org/courses/ap-precalculus)
- [Microeconomics](https://apcentral.collegeboard.org/courses/ap-microeconomics)
- [Macroeconomics](https://apcentral.collegeboard.org/courses/ap-macroeconomics)
- [Environmental science](https://apcentral.collegeboard.org/courses/ap-environmental-science)

Constants generally use higher-precision SI values rather than the rounded exam-sheet values. Probabilities, statistics and numerical calculus display numeric precision rather than chemistry-style significant figures. Explicit zero-rate branches prevent division by zero in loans/annuities/bonds. Negative quantities are permitted where defined by the model. Infinite geometric sums are only evaluated for |ratio|<1. No live financial rates, currency conversions, tax brackets or investment recommendations are supplied.

Verification: original test suites plus `node test-expanded.js`, `node test-ap.js`, and `node test-ui.js`. These check forward/inverse chains, zero rates, signs, domains, unit conversions, conflicts, guarded plans, data integration, parser safety and numerical calculus. Numerical derivative/integral checks are approximate and do not establish continuity or convergence for every possible input function.
