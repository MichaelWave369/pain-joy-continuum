# Pain-Joy Continuum

**A symbolic-operational reflective framework for moving pain toward breath, dignity, agency, release, Golden Joy, and service.**

Author: **Michael W. Hughes — Parallax / PHI369 Labs**  
Status: **PJC v1.2 Public Candidate**

> Golden Joy is not the absence of pain. Golden Joy is pain understood, cohered, released, and returned to love.

## What this project is

The **Pain-Joy Continuum** is a reflective formula, specification, and software seed for mapping how painful experience can move through naming, knowledge, coherence, agency, boundary, release, and integration.

It is intended for personal reflection, journaling, meaning-making, dignity repair language, compassionate software design, local-first reflective tools, symbolic research, and PHI369 / Parallax canon development.

## What this project is not

This project is **not** medical advice, legal advice, spiritual authority, therapy, diagnosis, emergency guidance, a validated psychological scale, or a replacement for qualified support.

The system is a **mirror, not a master**. All outputs are invitations, not commands.

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
tests/                       Pytest tests
examples/                    Demo cycle
schemas/                     JSON schema seeds for reflective receipts
docs/                        Claim boundaries, safety locks, publishing plan
```

## Local development

```bash
python -m venv .venv
source .venv/bin/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -e .
pytest
```

Run the demo:

```bash
python examples/demo_cycle.py
```

## License

- **Code:** MIT License. See `LICENSE`.
- **Documents, formulas, diagrams, testimony language, and visual assets:** CC BY-NC-SA 4.0 unless otherwise noted. See `LICENSE-CONTENT-CC-BY-NC-SA-4.0.md`.

## Claim boundary

The Pain-Joy Continuum is a symbolic-operational reflective framework. It does not claim to diagnose, treat, cure, predict, or measure anyone's inner state. It is built to support sovereignty, consent, grounding, and compassionate interpretation.

## Publication plan

This repo is the public-candidate home. Once the text, code, safety locks, and docs stabilize, the v1.2 release package can be archived on Zenodo for a DOI.
