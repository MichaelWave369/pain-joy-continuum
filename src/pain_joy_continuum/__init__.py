"""Pain-Joy Continuum reference engine.

Public boundary: this package is a symbolic-operational reflective model.
It is not medical advice, diagnosis, therapy, crisis guidance, or a validated
psychological scale.
"""

from .pjc_v1_2 import (
    DEFAULT_PAIN_DIMENSIONS,
    PJCComponents,
    PJCConfig,
    PJCInputs,
    PJCResult,
    PJCShadowDiagnostics,
    PJCVerdicts,
    compute_pain_magnitude,
    compute_transmutation,
    evaluate_pjc,
    normalize_inputs,
    step_pjc,
)

__all__ = [
    "DEFAULT_PAIN_DIMENSIONS",
    "PJCComponents",
    "PJCConfig",
    "PJCInputs",
    "PJCResult",
    "PJCShadowDiagnostics",
    "PJCVerdicts",
    "compute_pain_magnitude",
    "compute_transmutation",
    "evaluate_pjc",
    "normalize_inputs",
    "step_pjc",
]
