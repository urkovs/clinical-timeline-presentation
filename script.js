const START_DATE = new Date("2024-09-28T00:00:00");
const END_DATE = new Date("2026-05-14T00:00:00");

const lanes = [
  ["functional", "Functional Impact", "Function"],
  ["workup", "Workup & Consults", "Workup"],
  ["treatment", "Treatment Trials", "Treatment"],
].map(([id, title, cue]) => ({ id, title, cue }));

const phases = [
  ["phase-1", "1", "Onset", "2024-09-28", "2024-11-30"],
  ["phase-2", "2", "Standard migraine care", "2024-12-01", "2025-01-31"],
  ["phase-3", "3", "Disability + workup", "2025-02-01", "2025-05-31"],
  ["phase-4", "4", "Inflammatory exploration", "2025-06-01", "2025-08-31"],
  ["phase-5", "5", "Tertiary centers", "2025-09-01", "2025-12-31"],
  ["phase-6", "6", "Ongoing care", "2026-01-01", "2026-05-14"],
].map(([id, label, title, start, end]) => ({ id, label, title, start, end }));

const milestones = [
  ["onset", "2024-09-28", "functional", "functional", "phase-1", 0, "Abrupt daily migraine", "Abrupt transition from episodic migraine to continuous daily severe migraine."],
  ["ed-ct", "2024-10-13", "workup", "workup", "phase-1", 0, "ED, CT negative", "ED visit; CT negative; discharged."],
  ["mri-normal", "2024-11-13", "workup", "workup", "phase-1", 1, "MRI normal", "MRI brain/c-spine with and without contrast normal."],
  ["initial-neuro", "2024-11-18", "workup", "workup", "phase-1", 2, "Sumatriptan failed", "Sumatriptan failed; SQ sumatriptan from PCP also failed. Amitriptyline and Medrol started."],
  ["nurtec-ubrelvy", "2024-11-25", "treatment", "treatment", "phase-1", 0, "f/u, samples trialed", "Nurtec and Ubrelvy clinic samples trialed early; both ineffective."],
  ["dec-playbook", "2024-12-12", "treatment", "treatment", "phase-2", 1, "PT started", "Medrol helped only while taking it; Zavzpret ineffective; PT started; ketorolac/B12 rescue; Botox pursued.", {
    differentials: ["Migraine", "Cervicogenic / Occipital Neuralgia"],
    note: "Working differential included status migrainosus/chronic migraine/cervico-occipital neuralgia; PT started as part of that pathway.",
  }],
  ["first-botox", "2025-01-13", "treatment", "treatment", "phase-2", 2, "NDPH diagnosis + Botox", "NDPH diagnosed after 3+ months of daily headache; first Botox cycle."],
  ["botox-flare", "2025-01-15", "functional", "functional", "phase-2", 1, "Post-Botox flare", "Severe post-Botox flare; pain 9/10; explosive pain; Triple Pill trial."],
  ["jan-29-escalation", "2025-01-29", "treatment", "treatment", "phase-2", 3, "Emgality + status breakers", "Emgality, Trudhesa, quetiapine status breaker, extended Medrol."],
  ["exist-quote", "2025-02-14", "functional", "quote", "phase-3", 0, "\"It feels hard to exist\"", "VP: \"It feels hard to exist.\""],
  ["feb-disability", "2025-02-14", "functional", "functional", "phase-3", 2, "Major disability", "Unable to do ADLs, blurry vision, daily falls, dizziness."],
  ["memantine", "2025-02-26", "treatment", "treatment", "phase-3", 0, "Memantine started", "Memantine started."],
  ["olanzapine", "2025-03-12", "treatment", "treatment", "phase-3", 1, "Olanzapine breaker", "Olanzapine status breaker."],
  ["april-workup", "2025-04-08", "workup", "workup", "phase-3", 0, "Workup expands", "Indomethacin trial, Ziopatch, LP planned, Depakote started.", {
    differentials: ["Migraine", "TAC / Hemicrania Continua"],
    note: "I wanted to ensure no TAC that may be responsive to indomethacin so we tried this on 4/8/25.",
  }],
  ["lp-normal", "2025-04-22", "workup", "workup", "phase-3", 1, "LP normal", "LP normal; opening pressure 14 cm H2O.", {
    differentials: ["Migraine", "Intracranial Pressure Disorder"],
    note: "Rule out venous sinus disease, IIH, and other pressure-related headache disorders.",
  }],
  ["ndph-added", "2025-06-02", "workup", "workup", "phase-4", 2, "Refractory NDPH burden", "Profound fatigue, sensory intolerance, cognitive difficulty; Depakote/Reyvow/indomethacin ineffective."],
  ["work-leave", "2025-06-03", "functional", "functional", "phase-4", 0, "Work leave", "Off work June/July."],
  ["june-trials", "2025-06-18", "treatment", "treatment", "phase-4", 0, "Famciclovir + LDN", "Famciclovir, LDN, intranasal lidocaine; Stanford referral.", {
    differentials: ["Migraine", "Post-Viral / Neuroinflammatory"],
    note: "Given VP's history of COVID and persistent systemic symptoms, I explored whether a post-viral neuroinflammatory process might be contributing to headache persistence.",
  }],
  ["doxy-stopped", "2025-07-10", "treatment", "treatment", "phase-4", 1, "Doxy stopped", "Doxycycline stopped due severe throat/stomach pain and no headache benefit.", {
    differentials: ["Post-Viral / Neuroinflammatory"],
    note: "Post-viral / neuroinflammatory pathway was explored; doxycycline stopped due severe throat/stomach pain and no headache benefit.",
  }],
  ["oxcarb-nerivio", "2025-08-05", "treatment", "treatment", "phase-4", 2, "Oxcarbazepine + Nerivio", "Oxcarbazepine ineffective; Nerivio tried."],
  ["mayo", "2025-09-15", "workup", "consult", "phase-5", 0, "Mayo Clinic", "Mayo Clinic: NDPH with migraine phenotype, chronic migraine, vestibular migraine, orthostatic intolerance.", {
    differentials: ["Migraine", "Vestibular Migraine", "Autonomic Dysfunction / POTS"],
    note: "Mayo Clinic framed this as NDPH with migraine phenotype, chronic migraine, vestibular migraine, and orthostatic intolerance.",
  }],
  ["stanford", "2025-10-15", "workup", "consult", "phase-5", 1, "Stanford Headache Clinic", "Stanford Headache Clinic: chronic migraine plus NDPH phenotype; MRI/MRV/LP normal; CSF leak less likely. *Lesson: expertise does not necessarily provide certainty… may just confirm uncertainty. Humility, Trust, and Validation*"],
  ["autonomic-support", "2025-11-04", "functional", "functional", "phase-5", 1, "Falls improved", "Salt loading/compression; falls improved; LDN may improve walking/exercise tolerance.", {
    differentials: ["Autonomic Dysfunction / POTS"],
    note: "The recurrent falls, orthostatic symptoms, exercise intolerance, fatigue, and brain fog suggested there might be an autonomic component contributing to the overall clinical picture.",
  }],
  ["pain-consult", "2025-11-18", "workup", "consult", "phase-5", 2, "Pain consult", "Pain management consult; TMS, Fioricet, cyclobenzaprine; duloxetine caution due prior SSRI suicidal ideation."],
  ["ajovy-failed", "2026-02-12", "treatment", "treatment", "phase-6", 0, "Ajovy ineffective", "Ajovy ineffective after 3 months; no falls lately; continued daily migraine burden."],
  ["temma-consult", "2026-05-14", "workup", "consult", "phase-6", 2, "TEMMA consult ordered", "TEMMA consult ordered."],
  ["aimovig-ldn", "2026-05-14", "treatment", "treatment", "phase-6", 1, "Aimovig ineffective", "Aimovig 70/140 ineffective; LDN may help energy/exercise tolerance; still refractory."],
].map(([id, date, lane, category, phaseId, row, title, significance, reasoning = null]) => ({
  id,
  date,
  lane,
  category,
  phaseId,
  row,
  title,
  significance,
  reasoning,
  timestamp: toDate(date).getTime(),
}));

const differentialClasses = {
  "Migraine": "dx-migraine",
  "Vestibular Migraine": "dx-vestibular",
  "Autonomic Dysfunction / POTS": "dx-autonomic",
  "Intracranial Pressure Disorder": "dx-pressure",
  "TAC / Hemicrania Continua": "dx-tac",
  "Cervicogenic / Occipital Neuralgia": "dx-cervicogenic",
  "Post-Viral / Neuroinflammatory": "dx-postviral",
};

const categoryClasses = {
  functional: "type-functional",
  workup: "type-workup",
  treatment: "type-treatment",
  consult: "type-consult",
  quote: "type-quote",
};

const $ = (selector) => document.querySelector(selector);
const els = {
  canvas: $("#timelineCanvas"),
  phaseBands: $("#phaseBands"),
  calendarAxis: $("#calendarAxis"),
  laneGrid: $("#laneGrid"),
  markerLabel: $("#markerLabel"),
  scrubber: $("#timelineScrubber"),
  readout: $("#scrubberOutput"),
  prev: $("#prevMilestone"),
  next: $("#nextMilestone"),
  filterButtons: [...document.querySelectorAll("[data-filter]")],
  detailPhase: $("#detailPhase"),
  detailTitle: $("#detailTitle"),
  detailDate: $("#detailDate"),
  detailSignificance: $("#detailSignificance"),
  detailReasoning: $("#detailReasoning"),
};

let activeFilter = "all";
let currentTime = START_DATE.getTime();
let selectedId = "onset";

const sortedMilestones = milestones.sort((a, b) => a.timestamp - b.timestamp);

function toDate(value) {
  return new Date(`${value}T00:00:00`);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function dateToPercent(value) {
  const time = value instanceof Date ? value.getTime() : toDate(value).getTime();
  return clamp(((time - START_DATE.getTime()) / (END_DATE.getTime() - START_DATE.getTime())) * 100, 0, 100);
}

function percentToTime(value) {
  return START_DATE.getTime() + (Number(value) / 1000) * (END_DATE.getTime() - START_DATE.getTime());
}

function timeToSlider(time) {
  return Math.round(clamp((time - START_DATE.getTime()) / (END_DATE.getTime() - START_DATE.getTime()), 0, 1) * 1000);
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function matchesFilter(milestone) {
  return activeFilter === "all" || milestone.category === activeFilter || (activeFilter === "functional" && milestone.category === "quote");
}

function visibleMilestones() {
  return sortedMilestones.filter(matchesFilter);
}

function renderPhases() {
  els.phaseBands.innerHTML = phases
    .map((phase) => {
      const left = dateToPercent(phase.start);
      const width = dateToPercent(phase.end) - left;
      return `<div class="phase-band" style="--left:${left};--width:${width}"><span>${phase.label}</span>${phase.title}</div>`;
    })
    .join("");
}

function renderAxis() {
  const ticks = [];
  const date = new Date("2024-10-01T00:00:00");
  while (date <= END_DATE) {
    if ([0, 3, 6, 9].includes(date.getMonth())) {
      ticks.push({
        left: dateToPercent(date),
        label: date.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
      });
    }
    date.setMonth(date.getMonth() + 1);
  }
  els.calendarAxis.innerHTML = ticks
    .map((tick) => `<span class="axis-tick" style="--left:${tick.left}"><i></i><b>${tick.label}</b></span>`)
    .join("");
}

function renderLanes() {
  els.laneGrid.innerHTML = lanes
    .map((lane) => `<section class="timeline-lane lane-${lane.id}"><div class="lane-title"><span>${lane.cue}</span><strong>${lane.title}</strong></div><div class="lane-events">${renderEvents(lane.id)}</div></section>`)
    .join("");

  document.querySelectorAll(".event-pill").forEach((button) => {
    button.addEventListener("click", () => selectMilestone(button.dataset.id, true));
  });
}

function renderEvents(laneId) {
  return sortedMilestones
    .filter((m) => m.lane === laneId)
    .map((m) => {
      const typeClass = categoryClasses[m.category] || "type-workup";
      const flag = m.category === "quote" ? '<em class="event-flag">Yellow flag</em>' : "";
      return `<button class="event-pill ${typeClass}" style="--x:${dateToPercent(m.date)};--row:${m.row}" type="button" data-id="${m.id}">${flag}<span>${formatDate(m.timestamp).replace(", 202", ", '2")}</span><strong>${m.title}</strong></button>`;
    })
    .join("");
}

function updateTimeline() {
  const currentDate = new Date(currentTime);
  const markerX = dateToPercent(currentDate);
  els.canvas.style.setProperty("--marker-x", markerX);
  els.markerLabel.textContent = formatDate(currentDate);
  els.readout.textContent = formatDate(currentDate);
  els.scrubber.value = String(timeToSlider(currentTime));

  let latestReached = null;
  document.querySelectorAll(".event-pill").forEach((pill) => {
    const milestone = sortedMilestones.find((m) => m.id === pill.dataset.id);
    const visible = matchesFilter(milestone);
    const reached = milestone.timestamp <= currentTime;
    pill.hidden = !visible;
    pill.classList.toggle("is-reached", reached);
    pill.classList.toggle("is-selected", milestone.id === selectedId);
    pill.setAttribute("aria-current", milestone.id === selectedId ? "true" : "false");
    if (visible && reached) latestReached = milestone;
  });

  const selected = sortedMilestones.find((m) => m.id === selectedId);
  if (!selected || !matchesFilter(selected)) {
    selectedId = (latestReached || visibleMilestones()[0] || sortedMilestones[0]).id;
  }
  updateDetails();
}

function updateDetails() {
  const milestone = sortedMilestones.find((m) => m.id === selectedId);
  const phase = phases.find((p) => p.id === milestone.phaseId);
  els.detailPhase.textContent = phase ? `Phase ${phase.label}: ${phase.title}` : "Clinical milestone";
  els.detailTitle.textContent = milestone.title;
  els.detailDate.textContent = formatDate(milestone.timestamp);
  els.detailSignificance.textContent = milestone.significance;
  renderClinicalReasoning(milestone.reasoning);
}

function renderClinicalReasoning(reasoning) {
  els.detailReasoning.replaceChildren();

  if (!reasoning) {
    els.detailReasoning.hidden = true;
    return;
  }

  const title = document.createElement("p");
  title.className = "reasoning-title";
  title.textContent = "Clinical Reasoning";

  const chips = document.createElement("div");
  chips.className = "reasoning-chips";
  reasoning.differentials.forEach((differential) => {
    const chip = document.createElement("span");
    chip.className = `reasoning-chip ${differentialClasses[differential] || "dx-default"}`;
    chip.textContent = differential;
    chips.append(chip);
  });

  const note = document.createElement("p");
  note.className = "reasoning-note";
  note.textContent = reasoning.note;

  els.detailReasoning.append(title, chips, note);
  els.detailReasoning.hidden = false;
}

function selectMilestone(id, scrollToCard = false) {
  const milestone = sortedMilestones.find((m) => m.id === id);
  if (!milestone) return;
  selectedId = milestone.id;
  currentTime = milestone.timestamp;
  updateTimeline();
  if (scrollToCard) {
    const card = document.querySelector(`[data-id="${id}"]`);
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
}

function stepMilestone(direction) {
  const list = visibleMilestones();
  if (!list.length) return;
  const currentIndex = list.findIndex((m) => m.id === selectedId);
  const nextIndex = clamp(currentIndex + direction, 0, list.length - 1);
  selectMilestone(list[nextIndex].id, true);
}

function setFilter(filter) {
  activeFilter = filter;
  els.filterButtons.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  updateTimeline();
}

els.scrubber.addEventListener("input", (event) => {
  currentTime = percentToTime(event.target.value);
  const reached = visibleMilestones().filter((m) => m.timestamp <= currentTime).at(-1);
  selectedId = (reached || visibleMilestones()[0] || sortedMilestones[0]).id;
  updateTimeline();
});

els.prev.addEventListener("click", () => stepMilestone(-1));
els.next.addEventListener("click", () => stepMilestone(1));
els.filterButtons.forEach((button) => button.addEventListener("click", () => setFilter(button.dataset.filter)));

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") stepMilestone(-1);
  if (event.key === "ArrowRight") stepMilestone(1);
});

renderPhases();
renderAxis();
renderLanes();
updateTimeline();
requestAnimationFrame(() => document.body.classList.add("is-ready"));
