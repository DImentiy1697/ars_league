"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const data = window.ARS_DATA;

    if (!data) {
        console.error("ARS_DATA не знайдено. Перевір підключення data.js.");
        return;
    }

    const $ = (selector, parent = document) => parent.querySelector(selector);
    const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

    const setText = (selector, value, parent = document) => {
        const element = $(selector, parent);
        if (element && value !== undefined && value !== null) {
            element.textContent = value;
        }
    };

    const escapeHTML = (value) =>
        String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    const twoDigits = (number) => String(number).padStart(2, "0");

    const isPlayed = (leg) =>
        leg &&
        Number.isFinite(Number(leg.score1)) &&
        Number.isFinite(Number(leg.score2)) &&
        leg.score1 !== null &&
        leg.score2 !== null;

    const normalizePenaltyWinner = (value) => {
        const normalized = String(value || "").trim().toLowerCase();

        if (["team1", "1", "home", "first"].includes(normalized)) return "team1";
        if (["team2", "2", "away", "second"].includes(normalized)) return "team2";

        return "";
    };

    function calculateTwoLegTie(tie) {
        const firstPlayed = isPlayed(tie.firstLeg);
        const secondPlayed = isPlayed(tie.secondLeg);

        if (!firstPlayed && !secondPlayed) {
            return {
                status: "НЕ ЗІГРАНО",
                total1: null,
                total2: null,
                winner: null,
                completed: false
            };
        }

        if (firstPlayed && !secondPlayed) {
            return {
                status: "ПІСЛЯ 1 МАТЧУ",
                total1: Number(tie.firstLeg.score1),
                total2: Number(tie.firstLeg.score2),
                winner: null,
                completed: false
            };
        }

        if (!firstPlayed && secondPlayed) {
            return {
                status: "ОЧІКУЄ 1 МАТЧ",
                total1: Number(tie.secondLeg.score1),
                total2: Number(tie.secondLeg.score2),
                winner: null,
                completed: false
            };
        }

        const total1 =
            Number(tie.firstLeg.score1) +
            Number(tie.secondLeg.score1);

        const total2 =
            Number(tie.firstLeg.score2) +
            Number(tie.secondLeg.score2);

        let winner = null;
        let status = "ЗАВЕРШЕНО";

        if (total1 > total2) {
            winner = tie.team1;
        } else if (total2 > total1) {
            winner = tie.team2;
        } else {
            const penaltyWinner = normalizePenaltyWinner(tie.penaltyWinner);

            if (penaltyWinner === "team1") {
                winner = tie.team1;
                status = "ПЕНАЛЬТІ";
            } else if (penaltyWinner === "team2") {
                winner = tie.team2;
                status = "ПЕНАЛЬТІ";
            } else {
                status = "ПОТРІБЕН ПЕРЕМОЖЕЦЬ";
            }
        }

        return {
            status,
            total1,
            total2,
            winner,
            completed: Boolean(winner)
        };
    }

    function calculateFinal(finalMatch) {
        if (!isPlayed(finalMatch.match)) {
            return {
                status: "LOCKED",
                score1: null,
                score2: null,
                winner: null,
                completed: false
            };
        }

        const score1 = Number(finalMatch.match.score1);
        const score2 = Number(finalMatch.match.score2);

        let winner = null;
        let status = "ЗАВЕРШЕНО";

        if (score1 > score2) {
            winner = finalMatch.team1;
        } else if (score2 > score1) {
            winner = finalMatch.team2;
        } else {
            const penaltyWinner = normalizePenaltyWinner(finalMatch.penaltyWinner);

            if (penaltyWinner === "team1") {
                winner = finalMatch.team1;
                status = "ПЕНАЛЬТІ";
            } else if (penaltyWinner === "team2") {
                winner = finalMatch.team2;
                status = "ПЕНАЛЬТІ";
            } else {
                status = "ПОТРІБЕН ПЕРЕМОЖЕЦЬ";
            }
        }

        return {
            status,
            score1,
            score2,
            winner,
            completed: Boolean(winner)
        };
    }

    function buildBracketData() {
        const qf = data.playoffs.quarterfinals.map((tie) => ({
            ...tie,
            result: calculateTwoLegTie(tie)
        }));

        const sf1 = {
            ...data.playoffs.semifinals[0],
            team1: qf[0]?.result.winner || null,
            team2: qf[1]?.result.winner || null
        };

        const sf2 = {
            ...data.playoffs.semifinals[1],
            team1: qf[2]?.result.winner || null,
            team2: qf[3]?.result.winner || null
        };

        const sf = [sf1, sf2].map((tie) => ({
            ...tie,
            result:
                tie.team1 && tie.team2
                    ? calculateTwoLegTie(tie)
                    : {
                        status: "LOCKED",
                        total1: null,
                        total2: null,
                        winner: null,
                        completed: false
                    }
        }));

        const finalMatch = {
            ...data.playoffs.final,
            team1: sf[0]?.result.winner || null,
            team2: sf[1]?.result.winner || null
        };

        const finalResult =
            finalMatch.team1 && finalMatch.team2
                ? calculateFinal(finalMatch)
                : {
                    status: "LOCKED",
                    score1: null,
                    score2: null,
                    winner: null,
                    completed: false
                };

        return {
            quarterfinals: qf,
            semifinals: sf,
            final: {
                ...finalMatch,
                result: finalResult
            },
            champion: finalResult.winner || null
        };
    }

    function renderLeagueInfo() {
        $$(".logo-text h1").forEach((title) => {
            const parts = data.league.name.split(" ");
            title.innerHTML = `${escapeHTML(parts[0] || "ARS")} <span>${escapeHTML(parts.slice(1).join(" ") || "LEAGUE")}</span>`;
        });

        $$(".logo-text p").forEach((item) => {
            item.textContent = data.league.subtitle;
        });

        const headerTelegram = $(".header-btn");
        if (headerTelegram) headerTelegram.href = data.league.telegramMain;

        $$('.hero-buttons a[target="_blank"], .tournament-buttons a[target="_blank"]').forEach((link) => {
            link.href = data.league.telegramTournament;
        });

        setText(".footer-bottom p:first-child", data.league.copyright);
        setText(".footer-bottom p:last-child", data.league.footerText);
        setText(".logo-label", data.league.name);
        setText(".logo-info small", data.league.established);
        setText(".floating-card.top strong", data.league.status);

        document.title = `${data.league.name} — ${data.league.subtitle}`;
    }

    function renderHero() {
        setText(".hero-tag", data.hero.badge);

        const tag = $(".hero-tag");
        if (tag && !$(".hero-dot", tag)) {
            tag.insertAdjacentHTML("afterbegin", '<span class="hero-dot"></span>');
        }

        setText(".hero-top-title", data.hero.topTitle);

        const heroTitle = $(".hero-content > h1");
        if (heroTitle) {
            heroTitle.innerHTML = `
                ${escapeHTML(data.hero.titleLines[0])}
                <span>${escapeHTML(data.hero.titleLines[1])}</span>
                ${escapeHTML(data.hero.titleLines[2])}
            `;
        }

        setText(".hero-description", data.hero.description);

        const heroButtons = $$(".hero-buttons .btn");
        if (heroButtons[0]) heroButtons[0].textContent = data.hero.primaryButtonText;
        if (heroButtons[1]) heroButtons[1].textContent = data.hero.secondaryButtonText;

        const stats = $$(".hero-stats .stat-card");

        if (stats[0]) {
            setText("h3", data.tournament.number, stats[0]);
            setText("p", `«${data.tournament.name}»`, stats[0]);
        }

        if (stats[1]) setText("h3", data.tournament.participantsAtStart, stats[1]);
        if (stats[2]) setText("h3", data.tournament.playoffPlayers, stats[2]);

        setText(".floating-card.bottom strong", data.hero.currentStageEnglish);
    }

    function renderTournament() {
        const section = $("#tournament");
        if (!section) return;

        setText(".section-title h2", `Турнір «${data.tournament.name}»`, section);
        setText(".live-badge", data.tournament.stageBadge, section);
        setText(".tournament-card > h3", data.tournament.title, section);
        setText(".tournament-card > p", data.tournament.description, section);

        const infoBoxes = $$(".info-box", section);

        if (infoBoxes[0]) setText("strong", data.tournament.name, infoBoxes[0]);
        if (infoBoxes[1]) setText("strong", data.tournament.stage, infoBoxes[1]);
        if (infoBoxes[2]) setText("strong", data.tournament.deadline, infoBoxes[2]);

        setText(".tournament-sidebar > p", data.tournament.sidebarDescription, section);
        setText(".progress-title strong", data.tournament.progressLabel, section);

        const fill = $(".progress-fill", section);
        if (fill) {
            fill.style.width = `${Math.max(0, Math.min(100, data.tournament.progressPercent))}%`;
        }

        const sidebarValues = $$(".sidebar-item strong", section);

        if (sidebarValues[0]) sidebarValues[0].textContent = data.tournament.participantsAtStart;
        if (sidebarValues[1]) sidebarValues[1].textContent = data.tournament.playoffPlayers;
        if (sidebarValues[2]) sidebarValues[2].textContent = data.tournament.quarterfinals;
        if (sidebarValues[3]) sidebarValues[3].textContent = data.league.status;

        setText(".participants-count", `${data.participants.length} гравців`, section);

        const grid = $(".participants-grid", section);

        if (grid) {
            grid.innerHTML = data.participants.map((player, index) => `
                <article class="participant-card">
                    <span class="participant-number">${twoDigits(index + 1)}</span>
                    <div>
                        <strong>${escapeHTML(player.username)}</strong>
                        <p>${escapeHTML(player.club)}</p>
                    </div>
                </article>
            `).join("");
        }
    }

    function renderElo() {
        const section = $("#results");
        if (!section) return;

        const sorted = [...data.elo].sort((a, b) => Number(b.points) - Number(a.points));
        const qualifiedCount = sorted.filter((item) => item.qualified).length;
        const leader = sorted[0];

        const summary = $$(".results-summary-stats > div", section);

        if (summary[0]) setText("strong", sorted.length, summary[0]);
        if (summary[1]) setText("strong", qualifiedCount, summary[1]);

        if (summary[2] && leader) {
            setText("strong", `${leader.club} · ${leader.points}`, summary[2]);
        }

        const list = $(".elo-list", section);
        if (!list) return;

        list.innerHTML = sorted.map((item, index) => {
            const rankClass =
                index === 0 ? "rank-gold" :
                index === 1 ? "rank-silver" :
                index === 2 ? "rank-bronze" : "";

            return `
                <article class="elo-row ${item.qualified ? "qualified" : "eliminated"} ${rankClass}">
                    <span class="elo-place">${twoDigits(index + 1)}</span>

                    <div class="elo-club">
                        <strong>${escapeHTML(item.club)}</strong>
                        <small>${escapeHTML(item.username)}</small>
                    </div>

                    <strong class="elo-points">${escapeHTML(item.points)}</strong>
                    <span class="elo-status">${item.qualified ? "PLAY-OFF" : "OUT"}</span>
                </article>
            `;
        }).join("");
    }

    function getDisplayedScore(value) {
        return value === null || value === undefined ? "—" : value;
    }

    function teamRow(team, score, label = "") {
        if (!team) {
            return `
                <div class="bracket-team placeholder-team">
                    <div>
                        <small>${escapeHTML(label)}</small>
                        <strong>Очікується</strong>
                    </div>
                    <span>—</span>
                </div>
            `;
        }

        return `
            <div class="bracket-team">
                <div>
                    <small>${escapeHTML(team.username || label)}</small>
                    <strong>${escapeHTML(team.club)}</strong>
                </div>
                <span>${escapeHTML(getDisplayedScore(score))}</span>
            </div>
        `;
    }

    function twoLegMatchHTML(tie, extraClass = "") {
        const result = tie.result;

        const firstLegPlayed = isPlayed(tie.firstLeg);
        const secondLegPlayed = isPlayed(tie.secondLeg);

        const score1 =
            result.total1 === null
                ? "—"
                : result.total1;

        const score2 =
            result.total2 === null
                ? "—"
                : result.total2;

        return `
            <article class="bracket-match ${extraClass}">
                <div class="bracket-match-head">
                    <span>${escapeHTML(tie.code)}</span>
                    <strong>${escapeHTML(result.status)}</strong>
                </div>

                ${teamRow(tie.team1, score1, "TEAM 1")}
                ${teamRow(tie.team2, score2, "TEAM 2")}

                <div class="two-leg-details">
                    <span>
                        1-й матч:
                        ${firstLegPlayed
                            ? `${escapeHTML(tie.firstLeg.score1)}:${escapeHTML(tie.firstLeg.score2)}`
                            : "—"}
                    </span>

                    <span>
                        2-й матч:
                        ${secondLegPlayed
                            ? `${escapeHTML(tie.secondLeg.score1)}:${escapeHTML(tie.secondLeg.score2)}`
                            : "—"}
                    </span>
                </div>
            </article>
        `;
    }

    function finalMatchHTML(finalMatch) {
        const result = finalMatch.result;

        return `
            <article class="bracket-match ${result.status === "LOCKED" ? "locked-match" : ""} final-match">
                <div class="bracket-match-head">
                    <span>${escapeHTML(finalMatch.code)}</span>
                    <strong>${escapeHTML(result.status)}</strong>
                </div>

                ${teamRow(finalMatch.team1, result.score1, "Переможець SF 01")}
                ${teamRow(finalMatch.team2, result.score2, "Переможець SF 02")}
            </article>
        `;
    }

    function renderPlayoffs() {
        const section = $("#playoffs");
        if (!section) return;

        const bracket = buildBracketData();

        setText(".live-center-status strong", data.playoffs.status, section);

        const liveItems = $$(".live-center-item", section);

        if (liveItems[0]) setText("strong", data.playoffs.stage, liveItems[0]);
        if (liveItems[1]) setText("strong", data.playoffs.quarterfinals.length, liveItems[1]);
        if (liveItems[2]) setText("strong", data.playoffs.deadline, liveItems[2]);

        const quarterColumn = $(".quarter-column", section);

        if (quarterColumn) {
            const title = $(".bracket-column-title", quarterColumn)?.outerHTML || "";

            quarterColumn.innerHTML =
                title +
                bracket.quarterfinals
                    .map((tie, index) =>
                        twoLegMatchHTML(
                            tie,
                            `quarter-match match-${String.fromCharCode(97 + index)}`
                        )
                    )
                    .join("");
        }

        const semifinalColumn = $(".semifinal-column", section);

        if (semifinalColumn) {
            const title = $(".bracket-column-title", semifinalColumn)?.outerHTML || "";

            semifinalColumn.innerHTML =
                title +
                bracket.semifinals
                    .map((tie, index) =>
                        twoLegMatchHTML(
                            tie,
                            `${tie.result.status === "LOCKED" ? "locked-match" : ""} semifinal-${index === 0 ? "one" : "two"}`
                        )
                    )
                    .join("");
        }

        const finalColumn = $(".final-column", section);

        if (finalColumn) {
            const title = $(".bracket-column-title", finalColumn)?.outerHTML || "";

            finalColumn.innerHTML = `
                ${title}
                ${finalMatchHTML(bracket.final)}

                <div class="champion-slot">
                    <span class="champion-slot-icon">♛</span>

                    <div>
                        <small>ARS LEAGUE CHAMPION</small>
                        <strong>
                            ${escapeHTML(
                                bracket.champion
                                    ? bracket.champion.club
                                    : "Буде визначено"
                            )}
                        </strong>
                    </div>
                </div>
            `;
        }

        setText(".bracket-note p", data.playoffs.note, section);
    }

    function renderHistory() {
        const table = $(".history-table");
        if (!table) return;

        const head =
            $(".history-head", table)?.outerHTML ||
            `
                <div class="history-row history-head">
                    <span>#</span>
                    <span>Турнір</span>
                    <span>Чемпіон</span>
                    <span>Сезон</span>
                </div>
            `;

        table.innerHTML =
            head +
            data.history.map((item, index) => `
                <div class="history-row history-item">
                    <span class="history-number">${twoDigits(index + 1)}</span>

                    <div class="history-tournament">
                        <span class="history-icon">${escapeHTML(item.icon)}</span>

                        <div>
                            <strong>${escapeHTML(item.tournament)}</strong>
                            <small>${escapeHTML(item.subtitle)}</small>
                        </div>
                    </div>

                    <strong class="history-winner">${escapeHTML(item.champion)}</strong>
                    <span class="history-season">${escapeHTML(item.season)}</span>
                </div>
            `).join("");
    }

    function renderChampions() {
        const container = $(".champions");
        if (!container) return;

        const bracket = buildBracketData();
        const champions = [...data.champions];

        if (bracket.champion && champions[2]) {
            champions[2] = {
                ...champions[2],
                name: bracket.champion.club,
                description: `Чемпіон турніру «${data.tournament.name}».`
            };
        }

        container.innerHTML = champions.map((item) => `
            <article class="champion-card">
                <div class="champion-cup">${escapeHTML(item.icon)}</div>
                <span class="champion-season">${escapeHTML(item.season)}</span>
                <h3>${escapeHTML(item.name)}</h3>
                <p>${escapeHTML(item.description)}</p>
            </article>
        `).join("");
    }

    function setupNavigation() {
        $$('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");

                if (!targetId || targetId === "#") return;

                const target = $(targetId);
                if (!target) return;

                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    }

    function setupScrollEffects() {
        const header = $(".main-header");
        const progressBar = $(".progress-bar");

        const updateScroll = () => {
            const scrollTop = window.scrollY;
            const pageHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const progress =
                pageHeight > 0
                    ? (scrollTop / pageHeight) * 100
                    : 0;

            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }

            if (header) {
                header.classList.toggle("scrolled", scrollTop > 24);
            }
        };

        updateScroll();

        window.addEventListener("scroll", updateScroll, {
            passive: true
        });
    }

    function addRuntimeStyles() {
        const style = document.createElement("style");

        style.textContent = `
            .two-leg-details {
                display: flex;
                justify-content: space-between;
                gap: 12px;
                padding: 10px 14px 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
                font-size: 11px;
                letter-spacing: 0.04em;
                color: rgba(255, 255, 255, 0.62);
            }

            .two-leg-details span {
                white-space: nowrap;
            }

            @media (max-width: 700px) {
                .two-leg-details {
                    flex-direction: column;
                    gap: 4px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    addRuntimeStyles();
    renderLeagueInfo();
    renderHero();
    renderTournament();
    renderElo();
    renderPlayoffs();
    renderHistory();
    renderChampions();
    setupNavigation();
    setupScrollEffects();
});
