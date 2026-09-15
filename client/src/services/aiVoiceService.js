const API_BASE = "http://localhost:5000";

export async function getVoiceIntent(text) {
  const res = await fetch(`${API_BASE}/api/voice-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Intent extraction failed");
  }
  return res.json();
}

export async function getAssistantResponse(requirement, context, originalText) {
  const res = await fetch(`${API_BASE}/api/assistant-response`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requirement, context, originalText }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Response generation failed");
  }
  return res.json();
}

export async function processVoice(text, sessionId) {
  const res = await fetch(`${API_BASE}/api/voice/process`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, sessionId }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Voice processing failed");
  }
  return res.json();
}

export async function getConversation(sessionId) {
  const res = await fetch(`${API_BASE}/api/voice/conversation/${sessionId}`);
  if (!res.ok) throw new Error("Failed to fetch conversation");
  return res.json();
}

export async function getProduce() {
  const res = await fetch(`${API_BASE}/api/produce`);
  if (!res.ok) throw new Error("Failed to fetch produce");
  return res.json();
}

export async function getBuyerRequirements() {
  const res = await fetch(`${API_BASE}/api/buyer-requirements`);
  if (!res.ok) throw new Error("Failed to fetch buyer requirements");
  return res.json();
}

export async function getMatches(buyerId) {
  const res = await fetch(`${API_BASE}/api/matches/${buyerId}`);
  if (!res.ok) throw new Error("Failed to fetch matches");
  return res.json();
}

export async function getLogistics(farmerId, buyerId) {
  const res = await fetch(`${API_BASE}/api/logistics/${farmerId}/${buyerId}`);
  if (!res.ok) throw new Error("Failed to fetch logistics");
  return res.json();
}

export async function addProduce(produce) {
  const res = await fetch(`${API_BASE}/api/produce`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produce),
  });
  if (!res.ok) throw new Error("Failed to add produce");
  return res.json();
}

export async function addBuyerRequirement(requirement) {
  const res = await fetch(`${API_BASE}/api/buyer-requirements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requirement),
  });
  if (!res.ok) throw new Error("Failed to add buyer requirement");
  return res.json();
}
