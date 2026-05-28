# Pain-Joy Continuum

**A symbolic-operational reflective framework for moving pain toward breath, dignity, agency, release, Golden Joy, and service.**

Author: **Michael W. Hughes — Parallax / PHI369 Labs**  
Status: **PJC v1.2.1 Public Release**  
Zenodo DOI: **https://doi.org/10.5281/zenodo.20421291**  
All-versions DOI: **https://doi.org/10.5281/zenodo.20421290**  
Live navigator: **https://michaelwave369.github.io/pain-joy-continuum/**

> Golden Joy is not the absence of pain. Golden Joy is pain understood, cohered, released, and returned to love.

## What this project is

The **Pain-Joy Continuum** is a reflective formula, specification, and software seed for mapping how painful experience can move through naming, knowledge, coherence, agency, boundary, release, and integration.

It is intended for personal reflection, journaling, meaning-making, dignity repair language, compassionate software design, local-first reflective tools, symbolic research, and PHI369 / Parallax canon development.

## What this project is not

This project is **not** medical advice, legal advice, spiritual authority, therapy, diagnosis, emergency guidance, a validated psychological scale, or a replacement for qualified support.

The system is a **mirror, not a master**. All outputs are invitations, not commands.

## Public release

The v1.2.1 public release is archived on Zenodo:

```text
Hughes, Michael W. (2026). Pain-Joy Continuum: The Joy Crucible Master Spec (v1.2.1). Zenodo. https://doi.org/10.5281/zenodo.20421291
```

Cite the all-versions DOI when referring to the overall project lineage:

```text
https://doi.org/10.5281/zenodo.20421290
```

## Core flow

```text
Pain → Name → Knowledge → Coherence → Agency → Release → Golden Joy
```

## Core formulas

```text
M = χ · [((T−Tbar)·K_T) · ((I−Ibar)·K_I)]^(C·K_C) · F(Delta·K_P → Phi·J) P_vector

J_Phi = Phi·J_max · (1 − exp(−k·DeltaP·K_P·C·A·R·B))

Residue_next = DeltaP · exp(−k·K_P·C·A·R·B)
```

## Three laws

1. **Chi is the gate.** Protect the life-force condition before attempting deeper reflection.
2. **Knowledge is the threshold.** Clear knowing helps the light path; false certainty can amplify shadow.
3. **The sequence is the curriculum.** Each cycle can become a seed for the next cycle.

## Repository layout

```text
src/pain_joy_continuum/      Python reference engine seed
src/site/                    React GitHub Pages navigator
tests/                       Pytest tests
examples/                    Demo cycle
schemas/                     JSON schema seeds for reflective receipts
docs/source/                 Editable DOCX source documents
docs/pdf/                    Rendered PDF release documents
public/images/               Public image assets for the navigator
```

## Local development

Python package and tests:

```bash
python -m venv .venv
source .venv/bin/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -e .[dev]
pytest
```

Run the Python demo:

```bash
python examples/demo_cycle.py
```

React navigator:

```bash
npm install
npm run dev
npm run build
```

## Downloads

The live navigator links directly to the rendered PDFs and editable DOCX files:

- PJC v1.2 Joy Crucible Master Spec PDF
- PJC v1.1 Formula Sheet PDF
- PJC v1.2 Joy Crucible Master Spec DOCX
- PJC v1.1 Formula Sheet DOCX

## License

- **Code:** MIT License. See `LICENSE`.
- **Documents, formulas, diagrams, testimony language, and visual assets:** CC BY-NC-SA 4.0 unless otherwise noted. See `LICENSE-CONTENT-CC-BY-NC-SA-4.0.md`.

## Claim boundary

The Pain-Joy Continuum is a symbolic-operational reflective framework. It does not claim to diagnose, treat, cure, predict, or measure anyone's inner state. It is built to support sovereignty, consent, grounding, and compassionate interpretation.

## Citation

See `CITATION.cff` and the Zenodo record:

```text
https://zenodo.org/records/20421291
```
