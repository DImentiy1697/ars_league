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
        description:
            "ARS LEAGUE — це місце, де кожен сезон стає новою історією, а кожен матч має значення.",
        primaryButtonText: "Приєднатись",
        secondaryButtonText: "Актуальний турнір",
        currentStageEnglish: "1/4 FINAL"
    },

    tournament: {
        number: "01",
        name: "Династія",
        participantsAtStart: 16,
        playoffPlayers: 8,
        quarterfinals: 4,
        stage: "1/4 фіналу",
        stageBadge: "1/4 ФІНАЛУ",
        deadline: "02.08 | 17:00",
        progressLabel: "Плей-оф",
        progressPercent: 58,
        title: "Турнір офіційно у плей-оф",
        description:
            "Груповий етап завершено. Вісім найкращих учасників продовжують боротьбу у чвертьфіналі.",
        sidebarDescription:
            "Турнір наблизився до вирішальної частини. Попереду чвертьфінали, півфінали та фінал."
    },

    participants: [
        { username: "@FCSMilovereal", club: "Real Madrid" },
        { username: "@Kirill01007", club: "Manchester United" },
        { username: "@dimentiy19", club: "Kryvbas" },
        { username: "@No_Name_KZ08", club: "Juventus" },
        { username: "@xxOD10", club: "Borussia Dortmund" },
        { username: "@komarmukha", club: "Milan" },
        { username: "@tsavaaaa", club: "Atlético Madrid" },
        { username: "@Viteaqa", club: "Brentford" },
        { username: "@Nazar200430", club: "Manchester United" },
        { username: "@spakserega4", club: "Barcelona" },
        { username: "@MehrabyanRaffi", club: "Como" },
        { username: "@neglop092", club: "Fiorentina" },
        { username: "@asvlss", club: "Nantes" },
        { username: "@WondySale", club: "RC Lens" },
        { username: "@MishaBurkoveckii", club: "Arsenal" },
        { username: "@vetal6h", club: "Newcastle United" }
    ],

    elo: [
        { club: "RC Lens", username: "@WondySale", points: 1138, qualified: true },
        { club: "Real Madrid", username: "@FCSMilovereal", points: 1074, qualified: true },
        { club: "Brentford", username: "@Viteaqa", points: 1069, qualified: true },
        { club: "Borussia Dortmund", username: "@xxOD10", points: 1047, qualified: true },
        { club: "Barcelona", username: "@spakserega4", points: 1043, qualified: true },
        { club: "Kryvbas", username: "@dimentiy19", points: 1000, qualified: true },
        { club: "Atlético Madrid", username: "@tsavaaaa", points: 997, qualified: true },
        { club: "Juventus", username: "@No_Name_KZ08", points: 995, qualified: true },
        { club: "Nantes", username: "@asvlss", points: 979, qualified: false },
        { club: "Manchester United", username: "@Nazar200430", points: 975, qualified: false },
        { club: "Milan", username: "@komarmukha", points: 969, qualified: false },
        { club: "Manchester United", username: "@Kirill01007", points: 962, qualified: false },
        { club: "Arsenal", username: "@MishaBurkoveckii", points: 960, qualified: false },
        { club: "Como", username: "@MehrabyanRaffi", points: 955, qualified: false },
        { club: "Fiorentina", username: "@neglop092", points: 952, qualified: false },
        { club: "Newcastle United", username: "@vetal6h", points: 885, qualified: false }
    ],

    playoffs: {
        status: "PLAY-OFF IN PROGRESS",
        stage: "1/4 фіналу",
        deadline: "02.08 | 17:00",

        quarterfinals: [
            {
                code: "QF 01",
                team1: { username: "@Viteaqa", club: "Brentford" },
                team2: { username: "@dimentiy19", club: "Kryvbas" },

                firstLeg: {
                    score1: 3,
                    score2: 1
                },

                secondLeg: {
                    score1: 3,
                    score2: 2
                },

                penaltyWinner: ""
            },

            {
                code: "QF 02",
                team1: { username: "@xxOD10", club: "Borussia Dortmund" },
                team2: { username: "@WondySale", club: "RC Lens" },

                firstLeg: {
                    score1: 1,
                    score2: 4
                },

                secondLeg: {
                    score1: 0,
                    score2: 2
                },

                penaltyWinner: ""
            },

            {
                code: "QF 03",
                team1: { username: "@FCSMilovereal", club: "Real Madrid" },
                team2: { username: "@tsavaaaa", club: "Atlético Madrid" },

                firstLeg: {
                    score1: 2,
                    score2: 1
                },

                secondLeg: {
                    score1: 7,
                    score2: 5
                },

                penaltyWinner: ""
            },

            {
                code: "QF 04",
                team1: { username: "@No_Name_KZ08", club: "Juventus" },
                team2: { username: "@spakserega4", club: "Barcelona" },

                firstLeg: {
                    score1: 2,
                    score2: 3
                },

                secondLeg: {
                    score1: 4,
                    score2: 4
                },

                penaltyWinner: ""
            }
        ],

        semifinals: [
            {
                code: "SF 01",

                firstLeg: {
                    score1: 3,
                    score2: 2
                },

                secondLeg: {
                    score1: 3,
                    score2: 1
                },

                penaltyWinner: ""
            },

            {
                code: "SF 02",

                firstLeg: {
                    score1: 3,
                    score2: 0
                },

                secondLeg: {
                    score1: 3,
                    score2: 0
                },

                penaltyWinner: ""
            }
        ],

        final: {
            code: "GRAND FINAL",

            match: {
                score1: null,
                score2: null
            },

            penaltyWinner: ""
        },

        note:
            "Після внесення рахунків сайт автоматично порахує результат і перенесе переможця далі."
    },

    history: [
        {
            icon: "◆",
            tournament: "Ліга чемпіонів",
            subtitle: "UEFA Champions League",
            champion: "Newcastle United",
            season: "Season 1"
        },
        {
            icon: "●",
            tournament: "Чемпіонат світу",
            subtitle: "FIFA World Cup",
            champion: "France",
            season: "Season 1"
        },
        {
            icon: "◈",
            tournament: "Династія",
            subtitle: "ARS LEAGUE Special Format",
            champion: "Визначається",
            season: "Season 2"
        }
    ],

    champions: [
        {
            icon: "🏆",
            season: "SEASON 01",
            name: "Newcastle United",
            description: "Чемпіон турніру UEFA Champions League."
        },
        {
            icon: "🏆",
            season: "SEASON 01",
            name: "France",
            description: "Чемпіон турніру FIFA World Cup."
        },
        {
            icon: "◈",
            season: "SEASON 02",
            name: "Династія",
            description: "Новий чемпіон буде визначений у поточному плей-оф."
        }
    ]
};
