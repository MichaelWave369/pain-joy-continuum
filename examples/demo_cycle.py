from pain_joy_continuum import PJCInputs, step_pjc


sample = PJCInputs(
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
    pain_vector={
        "loss": 0.84,
        "relationship": 0.66,
        "identity": 0.58,
        "belief_conflict": 0.61,
    },
    notes="Sample PJC v1.2 reflective evaluation",
    source="manual",
)

result = step_pjc(sample)

print("manifested_reality:", round(result.manifested_reality, 6))
print("verdicts:", result.verdicts)
print("shadow:", result.shadow)
print("explanation:", result.explanation)
print("next_cycle_index:", result.next_inputs.cycle_index if result.next_inputs else None)
