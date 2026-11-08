# NetSage AI: Application Overview

## What is NetSage AI?

NetSage AI is an AI-assisted troubleshooting application for Cisco-style
Packet Tracer and networking lab environments. It helps a learner or network
engineer investigate connectivity problems by analyzing:

- The user's description of the network symptom
- Network topology notes
- Cisco `show` command output
- Similar troubleshooting cases
- Networking knowledge documents

The application produces a structured diagnosis containing:

- The most likely root cause
- The affected OSI layer
- A confidence score
- Evidence supporting the diagnosis
- The next diagnostic command to run
- Evidence-backed fix steps
- Possible alternative causes

NetSage AI is an assistant, not an automatic network-change system. Every
diagnosis must be reviewed and accepted, edited, or rejected by a human before
the proposed fix is treated as approved.

## The Problem It Solves

Troubleshooting a network failure is often difficult even when the engineer
knows the individual Cisco commands. The main challenge is connecting the
symptom to the actual root cause.

For example, a computer may receive an IP address but still be unable to reach
a server. The cause could be:

- An incorrect access VLAN
- A missing VLAN on a switch
- A trunk that does not allow the required VLAN
- An incorrect default gateway
- A missing route
- A DHCP or DNS problem
- An ACL that blocks the traffic
- A NAT configuration error
- A wireless guest-isolation or routing failure

Without a structured process, a junior engineer may run commands randomly,
misinterpret incomplete evidence, or apply a fix that does not address the
real problem. This can waste time and introduce additional configuration
errors.

NetSage AI solves this problem by turning raw symptoms and command output into
an evidence-based troubleshooting workflow. It combines deterministic network
checks with retrieval and AI reasoning instead of relying on an unsupported
AI guess alone.

## How the Application Works

```text
Symptom and command evidence
            |
            v
Similar-case and knowledge retrieval
            |
            v
Deterministic rule checks
            |
            v
Structured AI diagnosis
            |
            v
Evidence reconciliation and confidence adjustment
            |
            v
Human review: Accept, Edit, or Reject
            |
            v
Approved next steps, evaluation, and dashboard metrics
```

### 1. Case input

The application loads a troubleshooting case from
[`data/cases.csv`](../data/cases.csv). Each case contains the symptom,
topology context, Cisco command evidence, expected fault, OSI layer, concept,
severity, next command, and expected fix.

### 2. Retrieval-Augmented Generation (RAG)

The RAG layer searches historical cases and networking knowledge for relevant
examples. Similar cases provide practical context and help the AI compare the
current problem with known VLAN, routing, DHCP, DNS, ACL, NAT, gateway, and
wireless failures.

Retrieval can use the offline mock embedder for repeatable development or an
optional real embedding model and FAISS index.

### 3. Deterministic rule checking

The Python rule engine checks common configuration problems independently of
the language model. Current checks include:

1. Duplicate IP addresses
2. Incorrect subnet masks
3. Default-gateway mismatches
4. Interfaces that are down
5. Missing VLANs
6. Missing routes

Each check reports a pass, fail, or unknown result with supporting evidence.
This provides a reliable technical signal that can confirm or challenge the AI
diagnosis.

### 4. Structured AI diagnosis

The diagnosis service receives the case, retrieved context, and rule results.
It returns validated structured data rather than an unformatted paragraph.
The application supports configured OpenAI-compatible providers, including
Groq, as well as a deterministic mock provider for offline testing.

### 5. Evidence reconciliation

The reconciler compares:

- The AI's proposed root cause
- Deterministic rule results
- Retrieved similar cases

The result is classified as agreement, partial agreement, conflict, or
insufficient evidence. Confidence is reduced when evidence is missing or
sources disagree, helping prevent overconfident recommendations.

### 6. Human review

A reviewer must make the final decision:

- **Accept**: the diagnosis is suitable for the case.
- **Edit**: the reviewer corrects or improves the diagnosis.
- **Reject**: the diagnosis is not reliable enough to use.

The review decision and any correction are stored in
[`reviews/human_reviews.jsonl`](../reviews/human_reviews.jsonl).

### 7. Evaluation and dashboard

The application saves AI diagnoses and evaluation results in
[`outputs/`](../outputs). The Streamlit dashboard presents:

- Total cases and AI diagnoses
- Issue-type distribution
- Severity distribution
- Human review decisions
- AI confidence distribution
- Rule-check summaries
- Sample diagnoses
- Evaluation results

## Main Features

### Broad troubleshooting coverage

The dataset contains 30 cases covering:

| Area | Examples |
| --- | --- |
| VLAN | Access-port mismatch, trunk VLAN, native VLAN |
| Gateway | Incorrect gateway, interface down, degraded link |
| DHCP | Pool exhaustion, relay, excluded ranges |
| DNS | Unreachable DNS, missing DHCP DNS option |
| Routing | Missing routes, incorrect metrics, unreachable next hop |
| ACL | Blocked traffic, wrong direction, implicit deny |
| NAT | Missing or reversed inside/outside configuration |
| Wireless | SSID visibility, guest isolation, wireless routing |

### Safety and responsible AI

NetSage AI does not automatically apply a network configuration. It exposes
the evidence and requires human review before a fix is approved. This is
important because an incorrect network change can cause outages or weaken
security, especially in ACL, NAT, routing, and guest-network scenarios.

### Repeatable development

The mock embedder and mock LLM provider allow the complete pipeline to run
without external API calls. This supports local testing and demonstration
while keeping real-provider configuration optional.

### Learning support

The application teaches a repeatable troubleshooting method: collect evidence,
identify the affected layer, test likely causes, verify the result, and record
the human decision. It therefore supports both practical networking work and
classroom or Packet Tracer demonstrations.

## Technology Used

- **Python** for the application workflow and rule engine
- **Pydantic** for validated diagnosis and data models
- **RAG retrieval** for similar cases and knowledge documents
- **FAISS and sentence-transformers** as optional retrieval components
- **OpenAI-compatible APIs/Groq** as optional LLM providers
- **Pandas** for case and evaluation data
- **Streamlit and Plotly** for the dashboard
- **CSV, JSON, and JSONL** for cases, outputs, and review records

## Important Project Files

- [`README.md`](../README.md): project setup and architecture summary
- [`src/orchestrator.py`](../src/orchestrator.py): end-to-end case workflow
- [`src/rules/`](../src/rules/): deterministic network checks
- [`src/rag/`](../src/rag/): retrieval and embeddings
- [`src/ai/`](../src/ai/): structured diagnosis service
- [`src/reconciliation/`](../src/reconciliation/): evidence comparison
- [`src/review/`](../src/review/): human review handling
- [`src/evaluation/`](../src/evaluation/): accuracy and agreement metrics
- [`dashboard/dashboard.py`](../dashboard/dashboard.py): Streamlit dashboard
- [`data/cases.csv`](../data/cases.csv): troubleshooting case dataset
- [`prompts/diagnose_prompt.md`](../prompts/diagnose_prompt.md): diagnosis prompt

## Typical Usage

Run one case through the complete workflow:

```powershell
python src/orchestrator.py --case C001 --auto-accept
```

Run all cases non-interactively:

```powershell
python src/orchestrator.py --all --auto-accept
```

Start the dashboard:

```powershell
python -m streamlit run dashboard/dashboard.py
```

The `--auto-accept` option is useful for automated demonstrations and
validation. In a real review workflow, the reviewer should inspect the
diagnosis and choose Accept, Edit, or Reject.

## Expected Value

NetSage AI reduces the time and uncertainty involved in diagnosing common lab
network failures. It provides a consistent starting point for investigation,
connects symptoms to relevant evidence, highlights disagreements between
different sources, and preserves human control over the final decision.

The result is a more explainable and safer troubleshooting process than either
manual trial-and-error or an unreviewed AI recommendation.

## Current Scope and Future Improvements

NetSage AI is an academic and demonstration prototype. Its current scope is
structured Packet Tracer and lab evidence rather than direct automatic
inspection of binary `.pkt` files or live production devices.

Future improvements include:

- Adding more real Packet Tracer lab captures and command output
- Expanding the knowledge base for routing, ACL, DNS, NAT, and wireless
- Adding specialized checks for trunks, DHCP relay, spanning tree, and routing
  protocol neighbors
- Measuring accuracy with a configured real LLM and held-out cases
- Adding post-fix verification results to each case

