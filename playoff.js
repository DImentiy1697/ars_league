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

    const playerMap = Object.fromEntries(
      (data.participants || []).map((p) => [p.username, p])
    );

    const esc = (value) =>
      String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    const val = (value) =>
      value === null || value === undefined || value === ""
        ? "—"
        : String(value);

    function isRealScore(value) {
      return Number.isFinite(value);
    }

    function score(tie, leg, side) {
      const key = side === "home" ? "homeScore" : "awayScore";
      return tie && tie[leg] ? tie[leg][key] : null;
    }

    function aggregate(tie, side) {
      const first = score(tie, "leg1", side);
      const second = score(tie, "leg2", side);

      if (!isRealScore(first) || !isRealScore(second)) return null;
      return first + second;
    }

    function directWinner(tie) {
      if (!tie || !tie.home || !tie.away) return null;

      const homeTotal = aggregate(tie, "home");
      const awayTotal = aggregate(tie, "away");

      // Обидва матчі мають бути зіграні.
      if (homeTotal === null || awayTotal === null) return null;

      if (homeTotal > awayTotal) return tie.home;
      if (awayTotal > homeTotal) return tie.away;

      // Якщо після двох матчів нічия — автоматично нікого не переводимо.
      // За вашим регламентом потрібен третій вирішальний матч.
      return null;
    }

    function findTieByCode(code, rounds) {
      for (const round of rounds) {
        const found = (round || []).find((tie) => tie.code === code);
        if (found) return found;
      }
      return null;
    }

    function sourceCode(source) {
      if (!source) return null;
      const match = String(source).match(/^Winner\s+(.+)$/i);
      return match ? match[1].trim() : null;
    }

    /*
      winnerMap містить:
      R16-3 -> @FCSMilovereal
      QF-2  -> @...
      і т.д.

      Завдяки цьому наступний раунд отримує реального гравця,
      а не текст "Winner R16-3".
    */
    const winnerMap = Object.create(null);

    function resolveSource(source) {
      const code = sourceCode(source);
      return code ? winnerMap[code] || null : null;
    }

    function prepareRound(round) {
      return (round || []).map((originalTie) => {
        const tie = { ...originalTie };

        if (!tie.home && tie.sourceHome) {
          tie.home = resolveSource(tie.sourceHome);
        }

        if (!tie.away && tie.sourceAway) {
          tie.away = resolveSource(tie.sourceAway);
        }

        const winner = directWinner(tie);
        if (winner && tie.code) {
          winnerMap[tie.code] = winner;
        }

        return tie;
      });
    }

    // ВАЖЛИВИЙ ПОРЯДОК: кожен раунд готується після попереднього.
    const roundOf16 = prepareRound(data.playoffs.roundOf16);
    const quarterfinals = prepareRound(data.playoffs.quarterfinals);
    const semifinals = prepareRound(data.playoffs.semifinals);
    const finalRound = prepareRound(data.playoffs.final);

    function club(tie, side) {
      const username = tie && tie[side];

      if (username && playerMap[username]) {
        return playerMap[username].club;
      }

      const source =
        tie && tie[side === "home" ? "sourceHome" : "sourceAway"];

      return source || "TBD";
    }

    function seed(tie, side) {
      return tie && tie[side === "home" ? "homeSeed" : "awaySeed"]
        ? tie[side === "home" ? "homeSeed" : "awaySeed"]
        : "";
    }

    function teamRow(tie, side) {
      const currentSeed = seed(tie, side);

      return `
        <div class="po-team-row">
          <div class="po-team">
            <span class="po-seed ${currentSeed ? "" : "po-seed-muted"}">
              ${esc(currentSeed || "—")}
            </span>
            <strong>${esc(club(tie, side))}</strong>
          </div>
          <span class="po-leg">${val(score(tie, "leg1", side))}</span>
          <span class="po-leg">${val(score(tie, "leg2", side))}</span>
          <span class="po-agg">${val(aggregate(tie, side))}</span>
        </div>
      `;
    }

    function card(tie, index) {
      return `
        <article class="po-match-card">
          <div class="po-match-top">
            <span>${esc(tie.code || `MATCH ${index + 1}`)}</span>
            <small>TWO LEGS</small>
          </div>
          <div class="po-columns">
            <span>TEAM</span>
            <span>LEG 1</span>
            <span>LEG 2</span>
            <span>AGG</span>
          </div>
          ${teamRow(tie, "home")}
          ${teamRow(tie, "away")}
        </article>
      `;
    }

    function round(cls, eyebrow, title, matches) {
      return `
        <section class="po-round ${cls}">
          <header class="po-round-title">
            <small>${eyebrow}</small>
            <strong>${title}</strong>
          </header>
          <div class="po-round-matches">
            ${(matches || []).map(card).join("")}
          </div>
        </section>
      `;
    }

    root.innerHTML =
      round("po-r16", "ROUND OF 16", "1/8 FINAL", roundOf16) +
      round("po-qf", "QUARTERFINALS", "1/4 FINAL", quarterfinals) +
      round("po-sf", "SEMIFINALS", "1/2 FINAL", semifinals) +
      round("po-final", "FINAL", "FINAL", finalRound);

    const lang =
      localStorage.getItem("ars-language") === "ru" ? "ru" : "uk";

    if (note) {
      note.textContent =
        lang === "ru" ? data.playoffs.noteRu : data.playoffs.noteUk;
    }

    // Для швидкої перевірки в консолі браузера:
    console.log("ARS PLAYOFF AUTO-ADVANCE:", winnerMap);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
