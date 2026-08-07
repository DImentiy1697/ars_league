window.ARS_DATA = {
    league: {
        name: "ARS LEAGUE",
        subtitle: "Official eFootball League",
        established: "EST. 2026",
        status: "ONLINE",
        telegramMain: "https://t.me/arslegue",
        telegramTournament: "https://t.me/arsturnirs",
        copyright: "© 2026 ARS LEAGUE",
        footerText: "Official eFootball Community"
    },

    hero: {
        badge: "OFFICIAL EFOOTBALL LEAGUE",
        topTitle: "THE NEW ERA BEGINS",
        titleLines: ["PLAY.", "COMPETE.", "BECOME A LEGEND."],
        currentStageEnglish: "REGISTRATION"
    },

    tournament: {
        name: "ARS CHAMPIONS LEAGUE",
        shortName: "ACL",
        status: "registration",
        targetParticipants: 24,
        groupCount: 6,
        teamsPerGroup: 4,
        registrationDeadline: "Буде оголошено",
        progressPercent: 0
    },

    /*
       ДОДАВАЙ НОВИХ УЧАСНИКІВ СЮДИ.
       Приклад:
       { username: "@nickname", club: "Real Madrid" },

       Лічильник 0/24 на сайті рахується автоматично.
    */
    participants: [],

    /*
       ПІСЛЯ ЖЕРЕБКУВАННЯ розкладай команди по групах.
       В кожній групі максимум 4 команди.
       Приклад:
       A: [
           { username: "@nickname", club: "Real Madrid" }
       ]
    */
    groups: {
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: []
    },

    history: [
        {
            icon: "◆",
            tournament: "Ліга чемпіонів",
            tournamentRu: "Лига чемпионов",
            subtitle: "UEFA Champions League",
            champion: "Newcastle United",
            season: "Season 1"
        },
        {
            icon: "●",
            tournament: "Чемпіонат світу",
            tournamentRu: "Чемпионат мира",
            subtitle: "FIFA World Cup",
            champion: "France",
            season: "Season 1"
        },
        {
            icon: "◈",
            tournament: "Династія",
            tournamentRu: "Династия",
            subtitle: "ARS LEAGUE Special Format",
            champion: "Brentford",
            season: "Season 2"
        }
    ],

    champions: [
        {
            icon: "🏆",
            season: "SEASON 01",
            name: "Newcastle United",
            descriptionUk: "Чемпіон турніру UEFA Champions League.",
            descriptionRu: "Чемпион турнира UEFA Champions League."
        },
        {
            icon: "🏆",
            season: "SEASON 01",
            name: "France",
            descriptionUk: "Чемпіон турніру FIFA World Cup.",
            descriptionRu: "Чемпион турнира FIFA World Cup."
        },
        {
            icon: "🏆",
            season: "SEASON 02",
            name: "Brentford",
            descriptionUk: "Чемпіон турніру «Династія».",
            descriptionRu: "Чемпион турнира «Династия»."
        }
    ]
};
