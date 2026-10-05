# Connected Calculations

Free GitHub Pages deployment: upload this folder's files to a public repository root. In repository Settings → Pages, choose “Deploy from a branch”, `main`, and `/ (root)`. The root `index.html` is the app entry point; `.nojekyll` bypasses Jekyll. No server, paid hosting, package installation, or API key is required. GitHub Free Pages eligibility: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages .

Open `Connected-Chemistry.html` in a modern browser. No installation or internet is needed. Alternatively open `index.html` alongside its companion files. Either version can be hosted on a static web host.

All seven chemistry networks run automatically in one workspace. Search and the connected-quantities checkbox filter the displayed fields; every equation continues solving. Solution concentration, dilution, molality, colligative properties, and osmotic pressure share solution measurements. Kinetics and Arrhenius share reaction quantities, with k₁ representing the rate at T₁. Gas and nuclear measurements remain distinct physical quantities. No topic selection is required.

Calculated values have full dependency trails. Editing one makes it an input. Clear individual values or reset the workspace. Load example demonstrates a calculation across solution relationships. 

Enable significant-figure rules to round calculated displays. Input spelling determines precision: `2.00` has three significant figures, `2000` has one, and `2.00e3` has three. Exact checkboxes exclude counts or exact factors from precision limits. Multiplication/division use the fewest significant figures; addition/subtraction use the least precise decimal place. Logarithms use mantissa decimal places and exp applies the reverse convention; ln/exp use the same textbook convention. Powers and square roots preserve the limiting count. Formula constants and conversion factors are treated as exact.

Calculations retain full precision internally. Unit changes preserve original canonical values and precision until the input is edited. Celsius/Kelvin offsets retain decimal places. Precision follows the first derivation found; this is textbook rounding, not uncertainty analysis. Conflicts retain the 0.1% relative tolerance with an absolute floor.

The library covers decay, first-order kinetics, Arrhenius, ideal and combined gas laws, concentration, dilution, molality, colligative properties, and osmotic pressure. Formulas and assumptions appear in the interface. It uses explicit rearrangements, not arbitrary simultaneous symbolic algebra. Singular or multiple-solution equations may remain unresolved. Reloading clears inputs.

Verification: `node test.js`, `node test-upgrade.js`, and `node test-ui.js`. The UI test uses a lightweight DOM adapter; browser layout is unverified. Run `node build.cjs` after editing sources to regenerate the self-contained version.

Choose “What do you want to find?” to select a final answer. The helper traces the equation network backward and lists up to five alternative minimal sets of missing quantities, with a route to the answer and a button to show those input fields. It never asks you to enter the target itself. Plans describe structural solvability; numerical degeneracies and model assumptions still apply. Search for any quantity to exit a route's field filter. The planner retains up to sixteen candidate sets per variable, so alternatives are bounded rather than exhaustive.

The final-answer selector has its own search box. Searching targets filters the answer options without changing the separate input-field filter or solving network.

## Density and solvent pathways

Supply pure solvent density and solvent volume before mixing to derive solvent mass. Alternatively, solution density times solution volume gives total solution mass; subtract solute mass to get solvent mass. Total solution mass, solute mass percent, and direct molarity-to-molality relationships provide additional routes. Density units include g/mL, g/L, kg/L, and kg/m³. The formula assumes a single solute when subtracting solute mass or using solute mass percent.

Any solvent can be named and its density supplied manually. Optional water presets provide 1.00 g/mL as a classroom approximation or 0.99705 g/mL at about 25 °C from NIST data: https://www.nist.gov/system/files/documents/2017/05/09/GLP_10_20130424.pdf . These presets fill pure solvent density, not solution density. A solvent name alone never supplies density. Density depends on temperature; use the problem's value when available.

Solution volume and solvent volume are distinct. An optional checkbox explicitly permits solvent volume ≈ solution volume for a dilute solution when negligible solute-induced volume change is allowed. The assumption appears in derivation trails and is disabled by default. It works with any supplied solvent density; it never sets solution density equal to pure solvent density. Turning it off recalculates and removes results that relied on it. This approximation computes solvent mass from approximately equal volumes; it does not subtract solute mass from the inferred solvent mass. Verify the exact and approximate routes with `node test-density.js` and the UI tests.

Solute and gas formula inputs calculate molar mass automatically and feed the appropriate network. Supports nested parentheses/brackets, Unicode subscripts, hydrates (`CuSO4·5H2O`), optional phase suffixes, and explicit charges (`Fe^3+`, `SO4^2-`). Case-sensitive element symbols use CIAAW's 2024 abridged standard atomic weights: https://www.ciaaw.org/abridged-atomic-weights.htm . Formula-derived mass includes a calculation trail and precision from the table's decimal places. If a manually supplied molar mass disagrees, a conflict is shown and the manual value is retained. Elements without standard atomic weights require manually supplied isotope-specific molar mass. Formula input does not infer dissociation factors or balance reactions. Verify these features with `node test-goals.js` and `node test-ui.js`.


## Physics and biology

The sciences.js library adds signed one-dimensional kinematics, force, energy, work, power, waves, DC circuits, exponential and logistic population growth, Michaelis–Menten enzyme kinetics, Hardy–Weinberg genotype frequencies, and Beer–Lambert spectrophotometry. All are searched and solved in the same workspace; target planning and significant figures apply. Assumptions are shown beside each equation in the equations panel. Distinct systems retain separate measurements. This is an introductory library, not every possible equation in either field; inverse branches are explicitly supplied, and multivalued/simultaneous algebra may remain unresolved. Spectrophotometry path length uses meters; absorptivity uses L/(mol·m). Verify with node test-sciences.js.
