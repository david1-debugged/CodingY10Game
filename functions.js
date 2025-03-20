function startRandomInterval() {
    let delay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
    setTimeout(() => {
        spawnMob("images/truck.png");
        spawnMob("images/truck.png");
        spawnMob("images/truck.png");
        spawnMob("images/truck.png");
        startRandomInterval();
    }, delay);
}

window.startGame = function() {
    console.log("Game Started!");

    // Hide title screen
    document.getElementById("title-screen").style.display = "none";

    // Start mob spawning
    startRandomInterval();

    // Initialize debugging features
    createSpawnBoxes();

    // Initialize player movement
    update();
};

window.onload = function() {
    document.getElementById("start-button").addEventListener("click", startGame);
};