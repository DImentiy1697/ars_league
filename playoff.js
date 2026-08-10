"use strict";
(function () {
  function start() {
    const data = window.ARS_DATA;
    const root = document.getElementById("playoffBracket");
    const note = document.getElementById("playoffNote");
    if (!data || !data.playoffs || !root) {
      console.error("PLAYOFF: missing ARS_DATA/playoffs/root");
      return;
    }

    const playerMap = Object.fromEntries((data.participants || []).map(p => [p.username, p]));
    const esc = value => String(value ?? "")
      .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
      .replaceAll('"',"&quot;").replaceAll("'","&#039;");
    const val = v => (v === null || v === undefined || v === "") ? "—" : String(v);

    function club(tie, side) {
      const user = tie && tie[side];
      if (user && playerMap[user]) return playerMap[user].club;
      return tie && tie[side === "home" ? "sourceHome" : "sourceAway"] || "TBD";
    }
    function seed(tie, side) {
      return tie && tie[side === "home" ? "homeSeed" : "awaySeed"] || "";
    }
    function score(tie, leg, side) {
      const key = side === "home" ? "homeScore" : "awayScore";
      return tie && tie[leg] ? tie[leg][key] : null;
    }
    function aggregate(tie, side) {
      const a = score(tie,"leg1",side);
      const b = score(tie,"leg2",side);
      return Number.isFinite(a) && Number.isFinite(b) ? a+b : null;
    }
    function teamRow(tie, side) {
      const s = seed(tie,side);
      return `
        <div class="po-team-row">
          <div class="po-team">
            <span class="po-seed ${s ? "" : "po-seed-muted"}">${esc(s || "—")}</span>
            <strong>${esc(club(tie,side))}</strong>
          </div>
          <span class="po-leg">${val(score(tie,"leg1",side))}</span>
          <span class="po-leg">${val(score(tie,"leg2",side))}</span>
          <span class="po-agg">${val(aggregate(tie,side))}</span>
        </div>`;
    }
    function card(tie, index) {
      return `
        <article class="po-match-card">
          <div class="po-match-top">
            <span>${esc(tie.code || `MATCH ${index+1}`)}</span>
            <small>TWO LEGS</small>
          </div>
          <div class="po-columns"><span>TEAM</span><span>LEG 1</span><span>LEG 2</span><span>AGG</span></div>
          ${teamRow(tie,"home")}
          ${teamRow(tie,"away")}
        </article>`;
    }
    function round(cls, eyebrow, title, matches) {
      return `
        <section class="po-round ${cls}">
          <header class="po-round-title"><small>${eyebrow}</small><strong>${title}</strong></header>
          <div class="po-round-matches">${(matches || []).map(card).join("")}</div>
        </section>`;
    }

    root.innerHTML =
      round("po-r16","ROUND OF 16","1/8 FINAL",data.playoffs.roundOf16) +
      round("po-qf","QUARTERFINALS","1/4 FINAL",data.playoffs.quarterfinals) +
      round("po-sf","SEMIFINALS","1/2 FINAL",data.playoffs.semifinals) +
      round("po-final","FINAL","FINAL",data.playoffs.final);

    const lang = localStorage.getItem("ars-language") === "ru" ? "ru" : "uk";
    if (note) note.textContent = lang === "ru" ? data.playoffs.noteRu : data.playoffs.noteUk;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
