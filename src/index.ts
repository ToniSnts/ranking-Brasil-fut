import { buscarJogador } from "./services/apiFootball.js";

async function main() {
    const resultado = await buscarJogador("Vinicius Junior", 541);

    if (!resultado) {
        return;
    }

    const { player, stats } = resultado;

    if (player.nationality !== "Brazil") {
        console.log("O jogador encontrado não é brasileiro.");
        return;
    }

    console.log("\n=== JOGADOR ===");
    console.log("Nome:", player.name);
    console.log("Idade:", player.age);
    console.log("Nacionalidade:", player.nationality);
    console.log("Altura:", player.height);
    console.log("Peso:", player.weight);

    console.log("\n=== ESTATÍSTICAS ===");

    for (const stat of stats) {
        console.log(`\n${stat.leagueName} - ${stat.season}`);
        console.log("Time:", stat.teamName);
        console.log("Posição:", stat.position);
        console.log("Jogos:", stat.appearances);
        console.log("Minutos:", stat.minutes);
        console.log("Rating:", stat.rating !== null ? stat.rating.toFixed(2) : "N/D");
        console.log("Gols:", stat.goals);
        console.log("Assistências:", stat.assists);
        console.log("Finalizações:", stat.shots);
        console.log("Finalizações no gol:", stat.shotsOnTarget);
        console.log("Passes-chave:", stat.keyPasses);
        console.log("Dribles tentados:", stat.dribbleAttempts);
        console.log("Dribles certos:", stat.dribbleSuccess);
        console.log("Duelos:", stat.duels);
        console.log("Duelos ganhos:", stat.duelsWon);
        console.log("Desarmes:", stat.tackles);
        console.log("Interceptações:", stat.interceptions);
        console.log("Cartões amarelos:", stat.yellowCards);
        console.log("Cartões vermelhos:", stat.redCards);
    }
}

main();