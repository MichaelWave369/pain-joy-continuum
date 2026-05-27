from pain_joy_continuum import (
    PJCConfig,
    PJCInputs,
    compute_pain_magnitude,
    evaluate_pjc,
    normalize_inputs,
    step_pjc,
)


def sample_inputs(**overrides):
    values = dict(
        chi=0.91,
        thought=0.82,
        doubt=0.23,
        intent=0.87,
        resistance=0.28,
        knowledge_thought=0.78,
        knowledge_intent=0.81,
        knowledge_coherence=0.74,
        knowledge_pain=0.69,
        coherence=0.72,
        golden_joy_capacity=0.88,
        transmutation_rate=0.41,
        pain_vector={"loss": 0.84, "relationship": 0.66, "identity": 0.58},
    )
    values.update(overrides)
    return PJCInputs(**values)


def test_normalize_inputs_clamps_values():
    inputs = sample_inputs(chi=2.0, doubt=-2.0, coherence=float("inf"))
    normalized = normalize_inputs(inputs)
    assert normalized.chi == 1.0
    assert normalized.doubt == 0.0
    assert normalized.coherence == 0.0


def test_pain_magnitude_uniform_is_bounded():
    magnitude = compute_pain_magnitude({"loss": 1.0, "identity": 0.5})
    assert 0.0 <= magnitude <= 1.0
    assert magnitude < 1.0


def test_pain_magnitude_active_only_avoids_inactive_dilution():
    uniform = compute_pain_magnitude({"loss": 1.0}, pain_mode="uniform")
    active = compute_pain_magnitude({"loss": 1.0}, pain_mode="active_only")
    assert active > uniform
    assert active == 1.0


def test_evaluate_pjc_returns_bounded_result_and_verdicts():
    result = evaluate_pjc(sample_inputs())
    assert 0.0 <= result.manifested_reality <= 1.0
    assert result.verdicts.gate in {"halted", "fragile", "active"}
    assert result.verdicts.knowledge in {"shadow-dominant", "threshold", "light-path"}
    assert result.explanation


def test_step_pjc_advances_cycle_index():
    result = step_pjc(sample_inputs(cycle_index=7), PJCConfig())
    assert result.next_inputs is not None
    assert result.next_inputs.cycle_index == 8
