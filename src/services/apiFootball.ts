import type { Player } from "../types/Player.js";
import type { PlayerStats } from "../types/PlayerStats.js";
import type { Team } from "../types/Team.js";

const apiKey = process.env.API_FOOTBALL_KEY

function mapearJogador(resultado: any) {
    const player: Player = {
        id: resultado.player.id,
        name: resultado.player.name,
        age: resultado.player.age,
        nationality: resultado.player.nationality,
        height: resultado.player.height,
        weight: resultado.player.weight,
        photo: resultado.player.photo
    };

    const stats: PlayerStats[] = resultado.statistics.map((stat: any) => {
        return {
            teamId: stat.team.id,
            teamName: stat.team.name,

            leagueId: stat.league.id,
            leagueName: stat.league.name,
            season: stat.league.season,

            appearances: stat.games.appearences,
            minutes: stat.games.minutes,
            position: stat.games.position,
            rating: stat.games.rating ? Number(stat.games.rating) : null,

            shots: stat.shots.total,
            shotsOnTarget: stat.shots.on,

            goals: stat.goals.total,
            assists: stat.goals.assists,

            keyPasses: stat.passes.key,

            tackles: stat.tackles.total,
            interceptions: stat.tackles.interceptions,

            duels: stat.duels.total,
            duelsWon: stat.duels.won,

            dribbleAttempts: stat.dribbles.attempts,
            dribbleSuccess: stat.dribbles.success,

            yellowCards: stat.cards.yellow,
            redCards: stat.cards.red
        };
    });

    return {
        player,
        stats
    };
}


export async function buscarJogador(nome: string, teamId: number){
    if (!apiKey){
        console.error("API_FOOTBALL_KEY não encontrada");
        return;
    }

    const response = await fetch(
        `https://v3.football.api-sports.io/players?search=${encodeURIComponent(nome)}&team=${teamId}&season=2024`,
        {
            headers: {
                "x-apisports-key": apiKey
            }
        }
    );

    if(!response.ok){
        console.error("Erro HTTP:", response.status);
        return;
    }

    const data = await response.json();

    if(data.results === 0){
        console.log("Nenhum jogador encontrado.");
        return;
    }
    const resultado = data.response[0];
    return mapearJogador(resultado);

   
}

export async function buscarTime(nome: string){

    if (!apiKey){
        console.error("API_FOOTBALL_KEY não encontrada");
        return;
    }

    const response = await fetch(
         `https://v3.football.api-sports.io/teams?search=${encodeURIComponent(nome)}`,
         {
            headers: {
                "x-apisports-key": apiKey
            }
         }
    );
    if(!response.ok){
        console.error("Erro HTTP:", response.status);
        return;
    }
    const data = await response.json();
    if(data.results === 0){
        console.log("Nenhum time encontrado.");
        return;
    }

    const team: Team = {
        id: data.response[0].team.id,
        name: data.response[0].team.name,
        country: data.response[0].team.country,
        founded: data.response[0].team.founded
    };
    
    return team;
}