"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const data = window.ARS_DATA;
    if (!data) {
        console.error("ARS_DATA не знайдено. Перевір data.js.");
        return;
    }

    const $ = (selector, parent = document) => parent.querySelector(selector);
    const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
    const escapeHTML = (value) => String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    const dictionary = {
        uk: {
            navHome: "Головна", navTournament: "Турнір", navGroups: "Групи", navHistory: "Історія", navAbout: "Про лігу", navChampions: "Чемпіони",
            heroDescription: "ARS LEAGUE — це місце, де кожен сезон стає новою історією, а кожен матч має значення.",
            join: "Приєднатись", currentTournament: "Актуальний турнір", currentTournamentLabel: "Поточний турнір",
            registrationLabel: "Реєстрація", participantsNeeded: "Набір учасників", formatLabel: "Формат", groupsFormat: "6 груп по 4 команди",
            tournamentLead: "Новий великий турнір ARS LEAGUE. Реєстрація вже відкрита — після набору 24 учасників відбудеться жеребкування шести груп.",
            registrationOpen: "РЕЄСТРАЦІЯ ВІДКРИТА", registrationInProgress: "Триває набір учасників",
            registrationDescription: "ARS CHAMPIONS LEAGUE розрахована на 24 учасники. Після завершення реєстрації команди будуть розподілені на 6 груп по 4.",
            nameLabel: "Назва", deadlineLabel: "Дедлайн", registerButton: "Зареєструватись", viewGroups: "Переглянути групи",
            registrationStatus: "Статус реєстрації", registrationSidebar: "Місця заповнюються. Коли буде набрано 24 учасники, реєстрація закриється і сайт перейде до групового етапу.",
            filledSlots: "Заповнено місць", participantsLabel: "Учасників", groupsLabel: "Груп", teamsPerGroup: "Команд у групі", statusLabel: "Статус", registration: "РЕЄСТРАЦІЯ",
            registeredLabel: "REGISTERED", registeredParticipants: "Зареєстровані учасники", registrationListEmpty: "Список буде поповнюватися в міру реєстрації учасників.",
            groupsTitle: "6 груп × 4 команди", groupsDescription: "Групи A–F будуть сформовані після завершення реєстрації та офіційного жеребкування.",
            groupsNote: "Поки триває набір, місця в групах зарезервовані. Після жеребкування команди з'являться тут автоматично з data.js.",
            group: "ГРУПА", waitingDraw: "Очікує жеребкування", vacantSlot: "Вільне місце",
            historyTitle: "Історія турнірів", historyDescription: "Завершені турніри ARS LEAGUE та їхні чемпіони.", tournamentLabel: "Турнір", championLabel: "Чемпіон", seasonLabel: "Сезон",
            aboutTitle: "Що таке ARS LEAGUE?", aboutLead: "Не просто Telegram-турніри. Це окрема кіберспортивна ліга, де кожен сезон має власну історію.",
            uniqueFormats: "Унікальні формати", uniqueFormatsText: "Кожен турнір створюється вручну та відрізняється від попереднього власними правилами й атмосферою.",
            liveSeason: "Живий сезон", liveSeasonText: "Учасники, групи, результати та вся ключова інформація оновлюються протягом турніру.",
            premiumAtmosphere: "Преміальна атмосфера", premiumAtmosphereText: "Мінімалістичний дизайн, офіційні анонси та максимальна увага до деталей.",
            hallOfFame: "Зал слави", hallDescription: "Тут назавжди залишаються переможці, які вже вписали свої імена в історію ARS LEAGUE.",
            announcedSoon: "Буде оголошено"
        },
        ru: {
            navHome: "Главная", navTournament: "Турнир", navGroups: "Группы", navHistory: "История", navAbout: "О лиге", navChampions: "Чемпионы",
            heroDescription: "ARS LEAGUE — это место, где каждый сезон становится новой историей, а каждый матч имеет значение.",
            join: "Присоединиться", currentTournament: "Актуальный турнир", currentTournamentLabel: "Текущий турнир",
            registrationLabel: "Регистрация", participantsNeeded: "Набор участников", formatLabel: "Формат", groupsFormat: "6 групп по 4 команды",
            tournamentLead: "Новый большой турнир ARS LEAGUE. Регистрация уже открыта — после набора 24 участников состоится жеребьёвка шести групп.",
            registrationOpen: "РЕГИСТРАЦИЯ ОТКРЫТА", registrationInProgress: "Идёт набор участников",
            registrationDescription: "ARS CHAMPIONS LEAGUE рассчитана на 24 участника. После завершения регистрации команды будут распределены на 6 групп по 4.",
            nameLabel: "Название", deadlineLabel: "Дедлайн", registerButton: "Зарегистрироваться", viewGroups: "Посмотреть группы",
            registrationStatus: "Статус регистрации", registrationSidebar: "Места заполняются. Когда будет набрано 24 участника, регистрация закроется и сайт перейдёт к групповому этапу.",
            filledSlots: "Заполнено мест", participantsLabel: "Участников", groupsLabel: "Групп", teamsPerGroup: "Команд в группе", statusLabel: "Статус", registration: "РЕГИСТРАЦИЯ",
            registeredLabel: "REGISTERED", registeredParticipants: "Зарегистрированные участники", registrationListEmpty: "Список будет пополняться по мере регистрации участников.",
            groupsTitle: "6 групп × 4 команды", groupsDescription: "Группы A–F будут сформированы после завершения регистрации и официальной жеребьёвки.",
            groupsNote: "Пока идёт набор, места в группах зарезервированы. После жеребьёвки команды появятся здесь автоматически из data.js.",
            group: "ГРУППА", waitingDraw: "Ожидает жеребьёвки", vacantSlot: "Свободное место",
            historyTitle: "История турниров", historyDescription: "Завершённые турниры ARS LEAGUE и их чемпионы.", tournamentLabel: "Турнир", championLabel: "Чемпион", seasonLabel: "Сезон",
            aboutTitle: "Что такое ARS LEAGUE?", aboutLead: "Не просто Telegram-турниры. Это отдельная киберспортивная лига, где у каждого сезона своя история.",
            uniqueFormats: "Уникальные форматы", uniqueFormatsText: "Каждый турнир создаётся вручную и отличается от предыдущего собственными правилами и атмосферой.",
            liveSeason: "Живой сезон", liveSeasonText: "Участники, группы, результаты и вся ключевая информация обновляются по ходу турнира.",
            premiumAtmosphere: "Премиальная атмосфера", premiumAtmosphereText: "Минималистичный дизайн, официальные анонсы и максимальное внимание к деталям.",
            hallOfFame: "Зал славы", hallDescription: "Здесь навсегда остаются победители, которые уже вписали свои имена в историю ARS LEAGUE.",
            announcedSoon: "Будет объявлено"
        }
    };

    let currentLanguage = localStorage.getItem("ars-language") === "ru" ? "ru" : "uk";
    const t = (key) => dictionary[currentLanguage][key] || key;

    function applyStaticTranslations() {
        document.documentElement.lang = currentLanguage;
        $$('[data-i18n]').forEach((element) => {
            const key = element.dataset.i18n;
            if (dictionary[currentLanguage][key]) element.textContent = dictionary[currentLanguage][key];
        });
        $$(".language-btn").forEach((button) => {
            const active = button.dataset.lang === currentLanguage;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        document.title = currentLanguage === "ru"
            ? "ARS LEAGUE — Официальная eFootball-лига"
            : "ARS LEAGUE — Офіційна eFootball-ліга";
    }

    function renderLeagueInfo() {
        $$(".logo-text p").forEach((item) => item.textContent = data.league.subtitle);
        $$(".header-btn").forEach((link) => link.href = data.league.telegramMain);
        $$('.hero-buttons a[target="_blank"], .tournament-buttons a[target="_blank"]').forEach((link) => link.href = data.league.telegramTournament);
        const footerLeft = $(".footer-bottom p:first-child");
        const footerRight = $(".footer-bottom p:last-child");
        if (footerLeft) footerLeft.textContent = data.league.copyright;
        if (footerRight) footerRight.textContent = data.league.footerText;
    }

    function renderTournament() {
        const current = data.participants.length;
        const target = data.tournament.targetParticipants;
        const percentage = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

        $$(".current-tournament-title").forEach((el) => el.textContent = data.tournament.name);
        const code = $(".stat-tournament-code");
        const name = $(".stat-tournament-name");
        const reg = $(".stat-registration");
        const groups = $(".stat-groups");
        const stage = $(".current-stage");
        if (code) code.textContent = data.tournament.shortName;
        if (name) name.textContent = data.tournament.name;
        if (reg) reg.textContent = `${current}/${target}`;
        if (groups) groups.textContent = `${data.tournament.groupCount}×${data.tournament.teamsPerGroup}`;
        if (stage) stage.textContent = data.hero.currentStageEnglish;

        const deadline = $(".registration-deadline");
        if (deadline) {
            deadline.textContent = data.tournament.registrationDeadline === "Буде оголошено"
                ? t("announcedSoon")
                : data.tournament.registrationDeadline;
        }

        $$(".registration-count, .sidebar-participants, .participants-count").forEach((el) => el.textContent = `${current} / ${target}`);
        const progress = $(".registration-progress");
        if (progress) progress.style.width = `${percentage}%`;

        const grid = $(".participants-grid");
        const empty = $(".empty-registration");
        if (grid) {
            grid.innerHTML = data.participants.map((player, index) => `
                <article class="participant-card">
                    <span class="participant-number">${String(index + 1).padStart(2, "0")}</span>
                    <div><strong>${escapeHTML(player.username)}</strong><p>${escapeHTML(player.club)}</p></div>
                </article>
            `).join("");
        }
        if (empty) empty.style.display = data.participants.length ? "none" : "block";
    }

    function renderGroups() {
        const container = $(".groups-grid");
        if (!container) return;
        const letters = Object.keys(data.groups);
        container.innerHTML = letters.map((letter) => {
            const teams = data.groups[letter] || [];
            const rows = Array.from({ length: data.tournament.teamsPerGroup }, (_, index) => {
                const team = teams[index];
                if (team) {
                    return `<div class="group-team"><span>${index + 1}</span><div><strong>${escapeHTML(team.club)}</strong><small>${escapeHTML(team.username)}</small></div></div>`;
                }
                return `<div class="group-team group-team-empty"><span>${index + 1}</span><div><strong>${t("vacantSlot")}</strong><small>${t("waitingDraw")}</small></div></div>`;
            }).join("");
            return `
                <article class="group-card">
                    <div class="group-card-head"><span>${t("group")}</span><strong>${escapeHTML(letter)}</strong></div>
                    <div class="group-teams">${rows}</div>
                </article>
            `;
        }).join("");
    }

    function renderHistory() {
        const body = $(".history-body");
        if (!body) return;
        body.innerHTML = data.history.map((item, index) => `
            <div class="history-row history-item">
                <span class="history-number">${String(index + 1).padStart(2, "0")}</span>
                <div class="history-tournament">
                    <span class="history-icon">${escapeHTML(item.icon)}</span>
                    <div><strong>${escapeHTML(currentLanguage === "ru" ? item.tournamentRu : item.tournament)}</strong><small>${escapeHTML(item.subtitle)}</small></div>
                </div>
                <strong class="history-winner">${escapeHTML(item.champion)}</strong>
                <span class="history-season">${escapeHTML(item.season)}</span>
            </div>
        `).join("");
    }

    function renderChampions() {
        const container = $(".champions");
        if (!container) return;
        container.innerHTML = data.champions.map((item) => `
            <article class="champion-card">
                <div class="champion-cup">${escapeHTML(item.icon)}</div>
                <span class="champion-season">${escapeHTML(item.season)}</span>
                <h3>${escapeHTML(item.name)}</h3>
                <p>${escapeHTML(currentLanguage === "ru" ? item.descriptionRu : item.descriptionUk)}</p>
            </article>
        `).join("");
    }

    function renderAll() {
        applyStaticTranslations();
        renderLeagueInfo();
        renderTournament();
        renderGroups();
        renderHistory();
        renderChampions();
    }

    function setupLanguageSwitcher() {
        $$(".language-btn").forEach((button) => {
            button.addEventListener("click", () => {
                currentLanguage = button.dataset.lang === "ru" ? "ru" : "uk";
                localStorage.setItem("ars-language", currentLanguage);
                renderAll();
            });
        });
    }

    function setupNavigation() {
        $$('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const id = link.getAttribute("href");
                const target = id && id !== "#" ? $(id) : null;
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });
    }

    function setupScrollEffects() {
        const header = $(".main-header");
        const bar = $(".progress-bar");
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
            if (bar) bar.style.width = `${percent}%`;
            if (header) header.classList.toggle("scrolled", window.scrollY > 24);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
    }

    setupLanguageSwitcher();
    setupNavigation();
    setupScrollEffects();
    renderAll();
});
