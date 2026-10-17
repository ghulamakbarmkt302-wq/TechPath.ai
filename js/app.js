// TechPath.ai: page logic. Gemma (Gemini API) and Ollama (local) are both supported for AI features.

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const bullets = arr => "<ul>" + arr.map(x => `<li>${esc(x)}</li>`).join("") + "</ul>";
const fields = Object.keys(ROADMAPS);
const SYSTEM = "You are TechPath.ai, a career and admissions guide for students in Pakistan (matric, intermediate, university and final year). Be clear, practical and encouraging. Ask for missing facts before advising. Use only facts you are given; never invent fees, deadlines, cutoffs, visa rules or scholarship amounts. Do not write an FYP report or assignment for the student; give feedback and checklists. Be honest about difficulty and do not promise jobs or admissions. Start with a one-line answer, then short bullet points, then one or two next steps.";

// ---------- Tabs ----------
const TABS = [
  ["home", "Home"], ["road", "Roadmaps"], ["courses", "Courses"], ["compare", "Compare"],
  ["fyp", "FYP"], ["unis", "Universities"], ["schol", "Scholarships"], ["abroad", "Abroad"],
  ["ai", "AI Advisor"], ["card", "Result card"]
];

function show(id) {
  TABS.forEach(([t]) => {
    $("tab-" + t).classList.toggle("hidden", t !== id);
    $("btn-" + t).classList.toggle("active", t === id);
  });
  localStorage.setItem("techpath-tab", id);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildNav() {
  TABS.forEach(([id, label]) => {
    const b = document.createElement("button");
    b.id = "btn-" + id;
    b.textContent = label;
    b.onclick = () => show(id);
    $("nav").appendChild(b);
  });
}

function fillSelect(id, options) {
  $(id).innerHTML = options.map(o => `<option>${esc(o)}</option>`).join("");
}

function loadTicks(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
}
function saveTicks(key, ticks) { localStorage.setItem(key, JSON.stringify(ticks)); }

// ---------- Home ----------
function renderHome() {
  const totalCourses = COURSES.length;
  const csUnis = UNIVERSITIES.filter(u => u.cs).length;
  $("statFields").textContent = fields.length;
  $("statCourses").textContent = totalCourses;
  $("statUnis").textContent = UNIVERSITIES.length;
  $("statCities").textContent = new Set(UNIVERSITIES.map(u => u.city)).size;
  $("statCs").textContent = csUnis;
}

function runSearch() {
  const q = $("search").value.trim().toLowerCase();
  const out = $("searchOut");
  if (!q) { out.innerHTML = ""; return; }
  const hits = [];
  fields.forEach(f => { if (f.toLowerCase().includes(q)) hits.push(["Field", f, "road"]); });
  COURSES.forEach(c => { if (c[0].toLowerCase().includes(q) || c[1].toLowerCase().includes(q)) hits.push(["Course", c[0], "courses"]); });
  UNIVERSITIES.forEach(u => { if (u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q) || u.province.toLowerCase().includes(q)) hits.push(["University", `${u.name}, ${u.city}`, "unis"]); });
  SCHOLARSHIPS.forEach(s => { if (s.name.toLowerCase().includes(q)) hits.push(["Scholarship", s.name, "schol"]); });
  Object.keys(ABROAD).forEach(c => { if (c.toLowerCase().includes(q)) hits.push(["Study abroad", c, "abroad"]); });
  out.innerHTML = hits.length
    ? `<p class="muted">${hits.length} match(es)</p>` + hits.slice(0, 25).map(([type, name, tab]) =>
        `<div class="hit" onclick="show('${tab}')"><span class="pill">${esc(type)}</span> ${esc(name)}</div>`).join("")
    : `<p class="muted">No matches. Try a field, a course, a city or a country.</p>`;
}

// ---------- Roadmaps ----------
function renderRoad() {
  const f = $("roadField").value;
  const r = ROADMAPS[f];
  $("roadOut").innerHTML =
    `<p class="lead">${esc(r.summary)}</p>` +
    r.stages.map(s =>
      `<details ${s.term === "Year 1" ? "open" : ""}>
         <summary>${esc(s.term)}: ${esc(s.focus)}</summary>
         <div class="row"><div><strong>Skills</strong>${bullets(s.skills)}</div>
         <div><strong>Projects</strong>${bullets(s.projects)}</div></div>
       </details>`).join("") +
    `<div class="row"><div class="card"><strong>Job roles</strong>${bullets(r.jobs)}</div>
     <div class="card"><strong>Optional certifications</strong>${bullets(r.certs)}</div></div>`;
  const text = [`TechPath.ai roadmap: ${f}`, "", r.summary, ""];
  r.stages.forEach(s => { text.push(`${s.term}: ${s.focus}`); s.skills.forEach(x => text.push("  Skill: " + x)); s.projects.forEach(x => text.push("  Project: " + x)); text.push(""); });
  text.push("Job roles: " + r.jobs.join(", "));
  $("roadDownload").href = "data:text/plain;charset=utf-8," + encodeURIComponent(text.join("\n"));
  $("roadDownload").download = `techpath-${f.toLowerCase().replace(/\s+/g, "-")}.txt`;
}

// ---------- Compare ----------
function renderCompare() {
  const a = $("cmpA").value, b = $("cmpB").value;
  const col = f => {
    const r = ROADMAPS[f];
    return `<div class="card"><h3>${esc(f)}</h3><p class="muted">${esc(r.summary)}</p>
      <strong>Focus by stage</strong>${bullets(r.stages.map(s => `${s.term}: ${s.focus}`))}
      <strong>Job roles</strong>${bullets(r.jobs)}</div>`;
  };
  $("cmpOut").innerHTML = a === b
    ? `<div class="card muted">Choose two different fields to compare.</div>`
    : `<div class="row">${col(a)}${col(b)}</div>`;
}

// ---------- Courses ----------
function renderCourses() {
  const cat = $("courseCat").value, lvl = $("courseLvl").value, q = $("courseQ").value.trim().toLowerCase();
  const rows = COURSES.filter(c =>
    (cat === "All" || c[1] === cat) && (lvl === "All" || c[2] === lvl) && (!q || c[0].toLowerCase().includes(q)));
  $("courseList").innerHTML = rows.length
    ? rows.map(([name, category, level, weeks, url]) =>
        `<div class="card course">
           <div><strong>${esc(name)}</strong><div class="muted">${esc(category)} · ${esc(level)} · about ${weeks} week${weeks > 1 ? "s" : ""}</div></div>
           <a class="btn-ghost" href="${esc(url)}" target="_blank" rel="noopener">Official docs</a>
         </div>`).join("")
    : `<div class="card muted">No courses match these filters.</div>`;
  $("courseCount").textContent = `${rows.length} of ${COURSES.length} courses`;
}

// ---------- FYP ----------
function renderFyp() {
  const ticks = loadTicks("techpath-fyp");
  $("fypList").innerHTML = FYP_STEPS.map((s, i) =>
    `<label class="check"><input type="checkbox" data-i="${i}" ${ticks.includes(i) ? "checked" : ""}><span>${esc(s)}</span></label>`).join("");
  updateFyp();
}
function updateFyp() {
  const done = loadTicks("techpath-fyp").length;
  $("fypProgress").style.width = (done / FYP_STEPS.length * 100) + "%";
  $("fypCount").textContent = `${done} of ${FYP_STEPS.length} steps done`;
}

// ---------- Universities ----------
function renderUnis() {
  const prov = $("uniProv").value, type = $("uniType").value, q = $("uniQ").value.trim().toLowerCase();
  const rows = UNIVERSITIES.filter(u =>
    (prov === "All" || u.province === prov) && (type === "All" || u.type === type) &&
    (!q || u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q)));
  $("uniList").innerHTML = rows.length
    ? rows.map(u => `<div class="card uni">
        <div><strong>${esc(u.name)}</strong><div class="muted">${esc(u.city)}, ${esc(u.province)} · ${esc(u.type)}${u.cs ? " · Computer Science" : ""}</div>
        <div class="muted small">Status: needs verification · Last verified: not yet</div></div>
        <a class="btn-ghost" href="${esc(u.url)}" target="_blank" rel="noopener">Official site</a></div>`).join("")
    : `<div class="card muted">No universities match these filters.</div>`;
  $("uniCount").textContent = `${rows.length} of ${UNIVERSITIES.length} universities`;
}

// ---------- Scholarships ----------
function renderSchol() {
  $("scholList").innerHTML = SCHOLARSHIPS.map(s =>
    `<div class="card"><strong>${esc(s.name)}</strong>, ${esc(s.provider)}
     <div class="muted">${esc(s.notes)}</div>
     <div class="muted small">Status: needs verification · Last verified: not yet</div>
     <a class="btn-ghost" href="${esc(s.url)}" target="_blank" rel="noopener">Official source</a></div>`).join("");
}

// ---------- Study abroad ----------
const abroadKey = () => "techpath-abroad-" + $("abroadCountry").value;
function renderAbroad() {
  const c = $("abroadCountry").value, ticks = loadTicks(abroadKey());
  $("abroadList").innerHTML = ABROAD[c].map((item, i) =>
    `<label class="check"><input type="checkbox" data-i="${i}" ${ticks.includes(i) ? "checked" : ""}><span>${esc(item)}</span></label>`).join("");
  updateAbroad();
}
function updateAbroad() {
  const total = ABROAD[$("abroadCountry").value].length, done = loadTicks(abroadKey()).length;
  $("abroadCount").textContent = `${done} of ${total} steps done`;
}

// ---------- AI (Gemma via Gemini API, or Ollama on your computer) ----------
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result.split(",")[1]);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

async function askGemma(prompt, file) {
  const key = $("geminiKey").value.trim();
  const model = $("gemmaModel").value.trim() || "gemma-4";
  if (!key) throw new Error("Paste your Gemini API key in AI setup first.");
  const parts = [{ text: SYSTEM + "\n\n---\n\n" + prompt }];
  if (file) parts.push({ inlineData: { mimeType: file.type, data: await fileToBase64(file) } });
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts }] }) });
  if (!res.ok) throw new Error(`Gemini returned HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  return (data.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("") || "No answer came back. Check the model ID.";
}

async function askOllama(prompt, file) {
  const base = ($("ollamaUrl").value.trim() || "http://localhost:11434").replace(/\/$/, "");
  const model = $("ollamaModel").value.trim() || "gemma3";
  const body = { model, prompt: SYSTEM + "\n\n---\n\n" + prompt, stream: false };
  if (file) body.images = [await fileToBase64(file)];
  let res;
  try {
    res = await fetch(`${base}/api/generate`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  } catch (e) {
    throw new Error(`Could not reach Ollama at ${base}. Start it with "ollama serve" and download the model with "ollama pull ${model}". If the browser blocks it, set OLLAMA_ORIGINS=* before starting Ollama.`);
  }
  if (!res.ok) throw new Error(`Ollama returned HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  return data.response || "No answer came back.";
}

async function askAI(prompt, file) {
  return $("provider").value === "gemma" ? askGemma(prompt, file) : askOllama(prompt, file);
}

async function runAi(outId, prompt, file) {
  const out = $(outId);
  out.classList.remove("hidden");
  out.textContent = "Thinking...";
  try { out.textContent = await askAI(prompt, file); }
  catch (err) { out.textContent = err.message; }
}

function langNote() {
  return $("lang").value === "Urdu" ? "Reply in simple Urdu. English technical terms are fine." : "Reply in clear, simple English.";
}

function saveAiSettings() {
  localStorage.setItem("techpath-ai", JSON.stringify({
    provider: $("provider").value, gemmaModel: $("gemmaModel").value, ollamaUrl: $("ollamaUrl").value, ollamaModel: $("ollamaModel").value
  }));
  $("aiStatus").textContent = "Settings saved in this browser. Your Gemini key is never saved.";
}

function loadAiSettings() {
  try {
    const s = JSON.parse(localStorage.getItem("techpath-ai")) || {};
    if (s.provider) $("provider").value = s.provider;
    if (s.gemmaModel) $("gemmaModel").value = s.gemmaModel;
    if (s.ollamaUrl) $("ollamaUrl").value = s.ollamaUrl;
    if (s.ollamaModel) $("ollamaModel").value = s.ollamaModel;
  } catch (e) { /* ignore bad saved settings */ }
}

function advisor() {
  const q = $("advQ").value.trim();
  if (!q) return;
  runAi("advOut", `Student question: ${q}\n${langNote()}`);
}

function personalPlan() {
  const field = $("planField").value, level = $("planLevel").value.trim(), goal = $("planGoal").value.trim();
  if (!level || !goal) return runAi("planOut", "Ask the student for their current level and target role before planning.");
  runAi("planOut", `Use this ${field} roadmap as the base: ${JSON.stringify(ROADMAPS[field])}\nStudent level: ${level}. Target: ${goal}.\nGive a realistic 6-month plan: what to learn first, weekly time needed, one small project to finish first, and two courses from this list: ${COURSES.map(c => c[0]).join(", ")}. Be honest about difficulty. ${langNote()}`);
}

function fypIdeas() {
  const field = $("fypField").value, skills = $("fypSkills").value.trim(), months = $("fypMonths").value, interest = $("fypInterest").value.trim() || "open";
  if (!skills) return runAi("fypOut", "Ask the student for their skills first.");
  runAi("fypOut", `Suggest 3 final-year project ideas for a ${field} student in Pakistan. Skills: ${skills}. Interest: ${interest}. Time available: ${months} months. For each idea give: a one-line problem statement, up to 4 main features, a suggested tech stack, a month-by-month milestone plan that fits the time, and the biggest risk. Mention datasets only as things to look for. ${langNote()}`);
}

function reviewProposal() {
  const p = $("fypProposal").value.trim();
  if (!p) return runAi("proposalOut", "Ask the student to paste a proposal or outline first.");
  runAi("proposalOut", `Review this final-year project proposal the way a supervisor would. Give: strengths, gaps, feasibility in the time given, and 5 specific questions the student must answer before submitting. Do not rewrite it for the student. ${langNote()}\n\nProposal:\n${p}`);
}

function analyseCard() {
  const file = $("cardFile").files[0];
  if (!file) { $("cardOut").classList.remove("hidden"); $("cardOut").textContent = "Choose a result card photo first."; return; }
  runAi("cardOut",
    "This is a Pakistani board result card (matric or intermediate). 1) List the subjects and marks you can read. If a value is unclear, say so. Do not guess. " +
    `2) Suggest up to 3 fields from this list that fit the marks and likely interests: ${fields.join(", ")}. One reason per field. ` +
    "3) Remind the student to check each university's official eligibility criteria. " + langNote(), file);
}

// ---------- Start ----------
buildNav();
fillSelect("roadField", fields);
fillSelect("cmpA", fields);
fillSelect("cmpB", fields);
fillSelect("fypField", fields);
fillSelect("planField", fields);
fillSelect("uniProv", ["All", ...new Set(UNIVERSITIES.map(u => u.province))]);
fillSelect("courseCat", ["All", ...new Set(COURSES.map(c => c[1]))]);
fillSelect("courseLvl", ["All", "Beginner", "Intermediate", "Advanced"]);
fillSelect("abroadCountry", Object.keys(ABROAD));
$("cmpB").selectedIndex = 1;

$("roadField").onchange = renderRoad;
$("cmpA").onchange = renderCompare;
$("cmpB").onchange = renderCompare;
$("courseCat").onchange = renderCourses;
$("courseLvl").onchange = renderCourses;
$("courseQ").oninput = renderCourses;
$("uniProv").onchange = renderUnis;
$("uniType").onchange = renderUnis;
$("uniQ").oninput = renderUnis;
$("abroadCountry").onchange = renderAbroad;
$("search").oninput = runSearch;
$("fypList").addEventListener("change", e => {
  if (e.target.type !== "checkbox") return;
  const i = Number(e.target.dataset.i);
  let t = loadTicks("techpath-fyp");
  t = e.target.checked ? [...new Set([...t, i])] : t.filter(x => x !== i);
  saveTicks("techpath-fyp", t); updateFyp();
});
$("abroadList").addEventListener("change", e => {
  if (e.target.type !== "checkbox") return;
  const i = Number(e.target.dataset.i);
  let t = loadTicks(abroadKey());
  t = e.target.checked ? [...new Set([...t, i])] : t.filter(x => x !== i);
  saveTicks(abroadKey(), t); updateAbroad();
});

loadAiSettings();
renderHome();
renderRoad();
renderCompare();
renderCourses();
renderFyp();
renderUnis();
renderSchol();
renderAbroad();
const saved = localStorage.getItem("techpath-tab");
show(TABS.some(([id]) => id === saved) ? saved : "home");
