const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");

const playerSize = 60; // Adjusted to match CSS
const borderPadding = 10; // Extra space from the edge

let players = {
    player1: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.5, speed: 5, keys: { up: false, down: false, left: false, right: false } },
    player2: { x: window.innerWidth * 0.75, y: window.innerHeight * 0.5, speed: 5, keys: { up: false, down: false, left: false, right: false } }
};

// Handle key press events separately
window.addEventListener("keydown", (e) => {
    // console.log(`Key down: ${e.key}`);
    switch (e.key) {
        case "w": players.player1.keys.up = true; break;
        case "s": players.player1.keys.down = true; break;
        case "a": players.player1.keys.left = true; break;
        case "d": players.player1.keys.right = true; break;
        case "ArrowUp": players.player2.keys.up = true; break;
        case "ArrowDown": players.player2.keys.down = true; break;
        case "ArrowLeft": players.player2.keys.left = true; break;
        case "ArrowRight": players.player2.keys.right = true; break;
    }
});

window.addEventListener("keyup", (e) => {
    // console.log(`Key up: ${e.key}`);
    switch (e.key) {
        case "w": players.player1.keys.up = false; break;
        case "s": players.player1.keys.down = false; break;
        case "a": players.player1.keys.left = false; break;
        case "d": players.player1.keys.right = false; break;
        case "ArrowUp": players.player2.keys.up = false; break;
        case "ArrowDown": players.player2.keys.down = false; break;
        case "ArrowLeft": players.player2.keys.left = false; break;
        case "ArrowRight": players.player2.keys.right = false; break;
    }
});

function updatePlayer1() {
    let player = players.player1;
    if (player.keys.up) player.y -= player.speed;
    if (player.keys.down) player.y += player.speed;
    if (player.keys.left) player.x -= player.speed;
    if (player.keys.right) player.x += player.speed;

    // Restrict Player 1 to the left side
    player.x = Math.max(borderPadding + 42, Math.min(window.innerWidth / 2 - playerSize - borderPadding + 27, player.x));
    player.y = Math.max(borderPadding + 42, Math.min(window.innerHeight - playerSize - borderPadding + 22, player.y));

    player1.style.left = `${player.x}px`;
    player1.style.top = `${player.y}px`;
}

function updatePlayer2() {
    let player = players.player2;
    if (player.keys.up) player.y -= player.speed;
    if (player.keys.down) player.y += player.speed;
    if (player.keys.left) player.x -= player.speed;
    if (player.keys.right) player.x += player.speed;

    // Restrict Player 2 to the right side
    player.x = Math.max(window.innerWidth / 2 + borderPadding + 33, Math.min(window.innerWidth - playerSize - borderPadding + 18, player.x));
    player.y = Math.max(borderPadding + 42, Math.min(window.innerHeight - playerSize - borderPadding + 22, player.y));

    player2.style.left = `${player.x}px`;
    player2.style.top = `${player.y}px`;
}


// Handle screen resizing
window.addEventListener("resize", () => {
    players.player1.x = window.innerWidth * 0.25;
    players.player1.y = window.innerHeight * 0.5;
    players.player2.x = window.innerWidth * 0.75;
    players.player2.y = window.innerHeight * 0.5;
});

// Initialize hitboxes
const player1Hitbox = createDebugBox(player1);
const player2Hitbox = createDebugBox(player2);
let debugMode = false; // Toggle hitbox visibility

// Update hitbox positions in the update loop
function update() {
    updatePlayer1();
    updatePlayer2();
    updateDebugHitbox(player1, player1Hitbox, playerSize);
    updateDebugHitbox(player2, player2Hitbox, playerSize);
    requestAnimationFrame(update);
    // console.log(`Player 1: (${players.player1.x}, ${players.player1.y}), Player 2: (${players.player2.x}, ${players.player2.y})`);
}


update();

// Forced update

window.onload = function () {
    const player1Hitbox = createDebugBox(player1);
    const player2Hitbox = createDebugBox(player2);

    function update() {
        updatePlayer1();
        updatePlayer2();
        updateDebugHitbox(player1, player1Hitbox, playerSize);
        updateDebugHitbox(player2, player2Hitbox, playerSize);
        requestAnimationFrame(update);
    }

    update();
};