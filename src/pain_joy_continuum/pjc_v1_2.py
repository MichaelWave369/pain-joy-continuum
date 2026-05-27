from __future__ import annotations

import math
from dataclasses import dataclass, field, replace
from typing import Dict, Optional


DEFAULT_PAIN_DIMENSIONS: tuple[str, ...] = (
    "loss",
    "abuse",
    "addiction",
    "belief_conflict",
    "relationship",
    "institutional",
    "identity",
    "health",
    "financial",
    "other",
)


def _clamp(value: float, lower: float = 0.0, upper: float = 1.0) -> float:
    if math.isnan(value) or math.isinf(value):
        return lower
    return max(lower, min(upper, value))


@dataclass(frozen=True)
class PJCInputs:
    chi: float
    thought: float
    doubt: float
    intent: float
    resistance: float
    knowledge_thought: float
    knowledge_intent: float
    knowledge_coherence: float
    knowledge_pain: float
    coherence: float
    golden_joy_capacity: float
    transmutation_rate: float
    pain_vector: Dict[str, float] = field(default_factory=dict)
    cycle_index: int = 0
    timestamp: Optional[str] = None
    notes: Optional[str] = None
    source: Optional[str] = None
    phase_tag: Optional[str] = None
    observer_confidence: Optional[float] = None


@dataclass(frozen=True)
class PJCConfig:
    alpha_coherence: float = 0.15
    beta_transmutation: float = 0.05
    gamma_manifestation_to_chi: float = 0.03
    gamma_shadow_pain_to_chi: float = 0.04
    coherence_target: float = 0.809016994
    epsilon: float = 0.01
    gate_fragile_threshold: float = 0.25
    knowledge_shadow_threshold: float = 0.40
    knowledge_light_threshold: float = 0.60
    harmonic_tolerance: float = 0.08
    stabilizing_tolerance: float = 0.20
    pain_weights: Dict[str, float] = field(default_factory=dict)
    pain_mode: str = "uniform"


@dataclass(frozen=True)
class PJCComponents:
    net_thought: float
    net_intent: float
    weighted_thought: float
    weighted_intent: float
    effective_coherence: float
    pain_magnitude: float
    effective_pain: float
    transmutation: float
    base_alignment: float
    amplified_alignment: float
    k_mean: float
    coherence_delta_from_target: float


@dataclass(frozen=True)
class PJCShadowDiagnostics:
    shadow_thought_knowledge: float
    shadow_intent_knowledge: float
    shadow_coherence_knowledge: float
    shadow_pain_knowledge: float
    shadow_chi_drain: float
    shadow_pressure: float


@dataclass(frozen=True)
class PJCVerdicts:
    gate: str
    knowledge: str
    coherence: str
    transmutation: str


@dataclass(frozen=True)
class PJCResult:
    manifested_reality: float
    components: PJCComponents
    shadow: PJCShadowDiagnostics
    verdicts: PJCVerdicts
    explanation: str
    next_inputs: Optional[PJCInputs] = None


def normalize_inputs(inputs: PJCInputs) -> PJCInputs:
    normalized_pain = {
        key: _clamp(value)
        for key, value in {**{k: 0.0 for k in DEFAULT_PAIN_DIMENSIONS}, **inputs.pain_vector}.items()
    }

    return replace(
        inputs,
        chi=_clamp(inputs.chi),
        thought=_clamp(inputs.thought),
        doubt=_clamp(inputs.doubt),
        intent=_clamp(inputs.intent),
        resistance=_clamp(inputs.resistance),
        knowledge_thought=_clamp(inputs.knowledge_thought),
        knowledge_intent=_clamp(inputs.knowledge_intent),
        knowledge_coherence=_clamp(inputs.knowledge_coherence),
        knowledge_pain=_clamp(inputs.knowledge_pain),
        coherence=_clamp(inputs.coherence),
        golden_joy_capacity=_clamp(inputs.golden_joy_capacity),
        transmutation_rate=_clamp(inputs.transmutation_rate),
        pain_vector=normalized_pain,
        observer_confidence=(None if inputs.observer_confidence is None else _clamp(inputs.observer_confidence)),
    )


def compute_pain_magnitude(
    pain_vector: Dict[str, float],
    weights: Optional[Dict[str, float]] = None,
    pain_mode: str = "uniform",
) -> float:
    """Compute the bounded pain magnitude for the current cycle."""
    merged = {k: 0.0 for k in DEFAULT_PAIN_DIMENSIONS}
    merged.update(pain_vector)

    normalized_mode = pain_mode.strip().lower()
    if normalized_mode not in {"uniform", "active_only"}:
        normalized_mode = "uniform"

    if normalized_mode == "active_only":
        selected_keys = [key for key, value in merged.items() if _clamp(value) > 0.0]
        if not selected_keys:
            return 0.0
    else:
        selected_keys = list(merged.keys())

    active_weights = {}
    for key in selected_keys:
        w = 1.0 if weights is None else float(weights.get(key, 1.0))
        active_weights[key] = max(0.0, w)

    denominator = sum(active_weights.values())
    if denominator <= 0.0:
        return 0.0

    numerator = sum(_clamp(merged[key]) * active_weights[key] for key in selected_keys)
    return _clamp(numerator / denominator)


def compute_transmutation(
    effective_pain: float,
    golden_joy_capacity: float,
    transmutation_rate: float,
) -> float:
    """Compute bounded symbolic transmutation output."""
    effective_pain = _clamp(effective_pain)
    golden_joy_capacity = _clamp(golden_joy_capacity)
    transmutation_rate = _clamp(transmutation_rate)
    return _clamp(golden_joy_capacity * (1.0 - math.exp(-transmutation_rate * effective_pain)))


def _compute_gate_verdict(chi: float, config: PJCConfig) -> str:
    if chi <= 0.0:
        return "halted"
    if chi < config.gate_fragile_threshold:
        return "fragile"
    return "active"


def _compute_knowledge_verdict(k_mean: float, config: PJCConfig) -> str:
    if k_mean < config.knowledge_shadow_threshold:
        return "shadow-dominant"
    if k_mean < config.knowledge_light_threshold:
        return "threshold"
    return "light-path"


def _compute_coherence_verdict(coherence: float, config: PJCConfig) -> str:
    delta = abs(coherence - config.coherence_target)
    if delta <= config.harmonic_tolerance:
        return "harmonic"
    if delta <= config.stabilizing_tolerance:
        return "stabilizing"
    return "misaligned"


def _compute_transmutation_verdict(effective_pain: float, transmutation: float) -> str:
    if effective_pain <= 0.01 or transmutation <= 0.01:
        return "dormant"
    ratio = 0.0 if effective_pain <= 0.0 else transmutation / effective_pain
    if ratio < 0.5:
        return "partial"
    if ratio < 0.9:
        return "active"
    return "integrated"


def _build_explanation(components: PJCComponents, shadow: PJCShadowDiagnostics, verdicts: PJCVerdicts) -> str:
    fragments: list[str] = []

    if verdicts.gate == "halted":
        fragments.append("Chi halted; manifestation cycle is closed.")
    elif verdicts.gate == "fragile":
        fragments.append("Chi is fragile; the cycle remains open but under strain.")
    else:
        fragments.append("Chi is active; manifestation cycle remains open.")

    if verdicts.knowledge == "light-path":
        fragments.append("Knowledge threshold is crossed; light-path activation is present.")
    elif verdicts.knowledge == "threshold":
        fragments.append("Knowledge is mixed; the cycle is at threshold and can tip either way.")
    else:
        fragments.append("Knowledge is shadow-dominant; illusion or fragmentation is suppressing clarity.")

    if verdicts.coherence == "harmonic":
        fragments.append("Coherence is near the harmonic target around 0.809.")
    elif verdicts.coherence == "stabilizing":
        fragments.append("Coherence is stabilizing toward the harmonic target.")
    else:
        fragments.append("Coherence is misaligned and cannot fully amplify aligned inputs.")

    if verdicts.transmutation == "dormant":
        fragments.append("Pain transmutation is dormant or minimal in this cycle.")
    elif verdicts.transmutation == "partial":
        fragments.append("Pain is present, but only part of it is currently being transmuted.")
    elif verdicts.transmutation == "active":
        fragments.append("Pain transmutation is active and contributing meaningful output.")
    else:
        fragments.append("Pain is being strongly integrated into Golden Joy output.")

    if shadow.shadow_chi_drain > 0.2:
        fragments.append("Shadow chi drain is elevated, suggesting misunderstood pain is actively reducing vitality.")
    elif shadow.shadow_pressure > 0.5:
        fragments.append("Shadow pressure is high, even if the cycle remains operational.")

    return " ".join(fragments)


def evaluate_pjc(inputs: PJCInputs, config: Optional[PJCConfig] = None) -> PJCResult:
    config = config or PJCConfig()
    inputs = normalize_inputs(inputs)

    net_thought = max(0.0, inputs.thought - inputs.doubt)
    net_intent = max(0.0, inputs.intent - inputs.resistance)

    weighted_thought = net_thought * inputs.knowledge_thought
    weighted_intent = net_intent * inputs.knowledge_intent
    effective_coherence = max(config.epsilon, inputs.coherence * inputs.knowledge_coherence)

    pain_magnitude = compute_pain_magnitude(inputs.pain_vector, config.pain_weights, config.pain_mode)
    effective_pain = pain_magnitude * inputs.knowledge_pain
    transmutation = compute_transmutation(effective_pain, inputs.golden_joy_capacity, inputs.transmutation_rate)

    base_alignment = _clamp(weighted_thought * weighted_intent)
    amplified_alignment = _clamp(base_alignment ** effective_coherence)

    manifested_reality = 0.0
    if inputs.chi > 0.0:
        manifested_reality = _clamp(inputs.chi * amplified_alignment * transmutation)

    k_mean = _clamp(
        (
            inputs.knowledge_thought
            + inputs.knowledge_intent
            + inputs.knowledge_coherence
            + inputs.knowledge_pain
        )
        / 4.0
    )

    coherence_delta = abs(inputs.coherence - config.coherence_target)

    shadow_thought_knowledge = 1.0 - inputs.knowledge_thought
    shadow_intent_knowledge = 1.0 - inputs.knowledge_intent
    shadow_coherence_knowledge = 1.0 - inputs.knowledge_coherence
    shadow_pain_knowledge = 1.0 - inputs.knowledge_pain
    shadow_chi_drain = _clamp(pain_magnitude * shadow_pain_knowledge)
    shadow_pressure = _clamp(
        (
            max(0.0, inputs.doubt - inputs.thought)
            + max(0.0, inputs.resistance - inputs.intent)
            + shadow_thought_knowledge
            + shadow_intent_knowledge
            + shadow_coherence_knowledge
            + shadow_pain_knowledge
        )
        / 6.0
    )

    components = PJCComponents(
        net_thought=net_thought,
        net_intent=net_intent,
        weighted_thought=weighted_thought,
        weighted_intent=weighted_intent,
        effective_coherence=effective_coherence,
        pain_magnitude=pain_magnitude,
        effective_pain=effective_pain,
        transmutation=transmutation,
        base_alignment=base_alignment,
        amplified_alignment=amplified_alignment,
        k_mean=k_mean,
        coherence_delta_from_target=coherence_delta,
    )

    shadow = PJCShadowDiagnostics(
        shadow_thought_knowledge=shadow_thought_knowledge,
        shadow_intent_knowledge=shadow_intent_knowledge,
        shadow_coherence_knowledge=shadow_coherence_knowledge,
        shadow_pain_knowledge=shadow_pain_knowledge,
        shadow_chi_drain=shadow_chi_drain,
        shadow_pressure=shadow_pressure,
    )

    verdicts = PJCVerdicts(
        gate=_compute_gate_verdict(inputs.chi, config),
        knowledge=_compute_knowledge_verdict(k_mean, config),
        coherence=_compute_coherence_verdict(inputs.coherence, config),
        transmutation=_compute_transmutation_verdict(effective_pain, transmutation),
    )

    return PJCResult(
        manifested_reality=manifested_reality,
        components=components,
        shadow=shadow,
        verdicts=verdicts,
        explanation=_build_explanation(components, shadow, verdicts),
        next_inputs=None,
    )


def step_pjc(inputs: PJCInputs, config: Optional[PJCConfig] = None) -> PJCResult:
    config = config or PJCConfig()
    inputs = normalize_inputs(inputs)
    result = evaluate_pjc(inputs, config)

    next_coherence = _clamp(inputs.coherence + config.alpha_coherence * (result.manifested_reality - inputs.coherence))
    next_transmutation_rate = _clamp(
        inputs.transmutation_rate + config.beta_transmutation * result.components.k_mean * result.components.effective_pain
    )
    next_chi = _clamp(
        inputs.chi
        + config.gamma_manifestation_to_chi * result.manifested_reality
        - config.gamma_shadow_pain_to_chi * result.shadow.shadow_chi_drain
    )

    next_inputs = replace(
        inputs,
        chi=next_chi,
        coherence=next_coherence,
        transmutation_rate=next_transmutation_rate,
        cycle_index=inputs.cycle_index + 1,
    )

    return replace(result, next_inputs=next_inputs)
