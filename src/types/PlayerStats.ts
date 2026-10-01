export type PlayerStats = {
    teamId: number;
    teamName: string;

    leagueId: number;
    leagueName: string;
    season: number;

    appearances: number;
    minutes: number;
    position: string;
    rating: number | null;

    shots: number | null;
    shotsOnTarget: number | null;

    goals: number | null;
    assists: number | null;

    keyPasses: number | null;

    tackles: number | null;
    interceptions: number | null;

    duels: number | null;
    duelsWon: number | null;

    dribbleAttempts: number | null;
    dribbleSuccess: number | null;

    yellowCards: number;
    redCards: number;
};