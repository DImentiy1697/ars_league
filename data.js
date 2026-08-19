window.ARS_DATA = {
    league: {
        name: "ARS LEAGUE", subtitle: "Official eFootball League", established: "EST. 2026", status: "ONLINE",
        telegramMain: "https://t.me/arslegue", telegramTournament: "https://t.me/arsturnirs",
        copyright: "© 2026 ARS LEAGUE", footerText: "Official eFootball Community"
    },
    hero: {
        badge: "OFFICIAL EFOOTBALL LEAGUE",
        topTitle: "THE NEW ERA BEGINS",
        titleLines: ["PLAY.", "COMPETE.", "BECOME A LEGEND."],
        currentStageEnglish: "ROUND OF 16"
    },
    tournament: {
        name: "ARS PLAYOFF CUP",
        shortName: "APC",
        status: "round_of_16",
        targetParticipants: 16,
        groupCount: 0,
        teamsPerGroup: 0,
        registrationDeadline: "Реєстрацію завершено",
        progressPercent: 100
    },
    participants: [
        { username: "@dimentiy19", club: "Барселона" },
        { username: "@MehrabyanRaffi", club: "Барселона 2" },
        { username: "@miin8am", club: "Аякс" },
        { username: "@Kirill01007", club: "ПСЖ" },
        { username: "@MishaBurkoveckii", club: "Арсенал" },
        { username: "@Viteaqa", club: "ПСЖ 2" },
        { username: "@FCSMilovereal", club: "Васко да Гама" },
        { username: "@terehjuve", club: "Ювентус" },
        { username: "@oraxan", club: "Манчестер Сити" },
        { username: "@Liverpoolfc1892i", club: "Ливерпуль" },
        { username: "@No_Name_KZ08", club: "Манчестер Юнайтед" },
        { username: "@Kura0709", club: "Бенфика" },
        { username: "@Catto82", club: "Ботафого" },
        { username: "@elllyaplugg", club: "Аталанта" },
        { username: "@destrooooo12", club: "Аль Хиляль" },
        { username: "@Yeuwubs", club: "Манчестер Юнайтед 2" }
    ],
    groups: {},
    matches: {},
    playoffs: {
        stage: "ROUND OF 16",
        format: "two_leg",
        noteUk: "Кожна пара плей-офф грає два матчі. Переможець визначається за сумою двох матчів.",
        noteRu: "Каждая пара плей-офф играет два матча. Победитель определяется по сумме двух матчей.",
        roundOf16: [
            { code: "R16-1", home: "@MishaBurkoveckii", away: "@Kirill01007", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } },
            { code: "R16-2", home: "@elllyaplugg", away: "@MehrabyanRaffi", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } },
            { code: "R16-3", home: "@No_Name_KZ08", away: "@terehjuve", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } },
            { code: "R16-4", home: "@dimentiy19", away: "@Catto82", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } },
            { code: "R16-5", home: "@Kura0709", away: "@destrooooo12", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } },
            { code: "R16-6", home: "@Viteaqa", away: "@miin8am", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } },
            { code: "R16-7", home: "@Liverpoolfc1892i", away: "@oraxan", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } },
            { code: "R16-8", home: "@FCSMilovereal", away: "@Yeuwubs", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } }
        ],
        quarterfinals: [
            { code: "QF-1", sourceHome: "Winner R16-1", sourceAway: "Winner R16-2", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } },
            { code: "QF-2", sourceHome: "Winner R16-3", sourceAway: "Winner R16-4", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } },
            { code: "QF-3", sourceHome: "Winner R16-5", sourceAway: "Winner R16-6", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } },
            { code: "QF-4", sourceHome: "Winner R16-7", sourceAway: "Winner R16-8", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } }
        ],
        semifinals: [
            { code: "SF-1", sourceHome: "Winner QF-1", sourceAway: "Winner QF-2", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } },
            { code: "SF-2", sourceHome: "Winner QF-3", sourceAway: "Winner QF-4", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } }
        ],
        final: [
            { code: "FINAL", sourceHome: "Winner SF-1", sourceAway: "Winner SF-2", leg1: { homeScore: null, awayScore: null }, leg2: { homeScore: null, awayScore: null } }
        ]
    },
    history: [
        { icon: "◆", tournament: "Ліга чемпіонів", tournamentRu: "Лига чемпионов", subtitle: "UEFA Champions League", champion: "Newcastle United", season: "Season 1" },
        { icon: "●", tournament: "Чемпіонат світу", tournamentRu: "Чемпионат мира", subtitle: "FIFA World Cup", champion: "France", season: "Season 1" },
        { icon: "◈", tournament: "Династія", tournamentRu: "Династия", subtitle: "ARS LEAGUE Special Format", champion: "Brentford", season: "Season 2" },
        { icon: "🏆", tournament: "ARS Champions League", tournamentRu: "ARS Champions League", subtitle: "ARS LEAGUE", champion: "Manchester United", season: "Season 3" }
    ],
    champions: [
        { icon: "🏆", season: "SEASON 01", name: "Newcastle United", descriptionUk: "Чемпіон турніру UEFA Champions League.", descriptionRu: "Чемпион турнира UEFA Champions League." },
        { icon: "🏆", season: "SEASON 01", name: "France", descriptionUk: "Чемпіон турніру FIFA World Cup.", descriptionRu: "Чемпион турнира FIFA World Cup." },
        { icon: "🏆", season: "SEASON 02", name: "Brentford", descriptionUk: "Чемпіон турніру «Династія».", descriptionRu: "Чемпион турнира «Династия»." },
        { icon: "🏆", season: "SEASON 03", name: "Manchester United", descriptionUk: "Чемпіон ARS Champions League.", descriptionRu: "Чемпион ARS Champions League." }
    ]
};
