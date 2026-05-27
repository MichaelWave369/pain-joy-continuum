# AGENTS.md

Instructions for Codex and other AI coding agents working in this repository.

## Project identity

This is the public candidate repository for **Pain-Joy Continuum / Joy Crucible** by **Michael W. Hughes — Parallax / PHI369 Labs**.

The project is a symbolic-operational reflective framework. It is not medical advice, legal advice, spiritual authority, therapy, diagnosis, crisis care, a validated psychological scale, or a replacement for qualified support.

## Non-negotiable boundaries

Preserve these claims:

- The system is a mirror, not a master.
- Outputs are invitations, not commands.
- Reflection is not diagnosis.
- Release cannot be forced.
- No processing another person without consent.
- No exclusive authority claims.
- Grounding comes before mythology.

Do not add language that claims the framework treats, cures, diagnoses, predicts, or measures a person’s inner state as fact.

## Technical goals

Keep the code:

- Local-first.
- Deterministic where possible.
- Bounded to 0..1 for symbolic variables unless explicitly documented.
- Clear about self-report and uncertainty.
- Covered by tests.

## Before submitting changes

Run:

```bash
pip install -e .[dev]
pytest
```

Check:

- Claim boundaries remain visible.
- Safety locks remain visible.
- Licenses are not changed without maintainer approval.
- No analytics, cloud sync, or third-party data sharing is added without explicit approval.
