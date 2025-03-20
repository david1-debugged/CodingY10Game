window.createDebugBox = function(entity) {
    let debugBox = document.createElement("div");
    debugBox.classList.add("debug-hitbox");
    document.body.appendChild(debugBox);
    console.log(`Debug hitbox created for ${entity.id}`);
    return debugBox;
};

window.updateDebugHitbox = function(entity, hitbox, size) {
    if (!entity) {
        console.error("Entity is undefined in updateDebugHitbox!");
        return;
    }

    let left, top;

    if (entity === player1 || entity === player2) {
        left = entity.offsetLeft;
        top = entity.offsetTop;
    } else if (entity.element) {
        left = entity.element.offsetLeft;
        top = entity.element.offsetTop;
    } else {
        console.error(`updateDebugHitbox: Entity ${entity} has no valid position`);
        return;
    }

    hitbox.style.left = `${left}px`;
    hitbox.style.top = `${top}px`;
    hitbox.style.width = `${size}px`;
    hitbox.style.height = `${size}px`;
    hitbox.style.display = debugMode ? "block" : "none";

    // console.log(`Hitbox updated: (${left}, ${top}) for ${entity.id || "mob"}`);
};

window.spawnBoxMode = false;
window.spawnBoxes = []; // Store references to boxes

window.createSpawnBoxes = function() {
    let spawnLocations = [
        { x: 52, y: 52 },
        { x: 52, y: 850 },
        { x: 810, y: 52 },
        { x: 810, y: 850 }
    ];

    spawnLocations.forEach((location) => {
        let spawnBox = document.createElement("div");
        spawnBox.classList.add("spawn-box");
        spawnBox.style.left = `${location.x}px`;
        spawnBox.style.top = `${location.y}px`;
        spawnBox.style.display = "none"; // Start hidden
        document.body.appendChild(spawnBox);
        window.spawnBoxes.push(spawnBox); // Store reference
    });

    console.log("Spawn boxes created.");
};

// Function to toggle spawn box visibility
window.toggleSpawnBoxes = function() {
    if (window.spawnBoxes.length === 0) {
        console.log("Spawn boxes not found. Creating them...");
        createSpawnBoxes();
    }

    spawnBoxMode = !spawnBoxMode;
    window.spawnBoxes.forEach(box => {
        box.style.display = spawnBoxMode ? "block" : "none";
    });

    console.log(`Spawn Box Debug Mode: ${spawnBoxMode ? "ON" : "OFF"}`);
};

// Modify the existing key listener to also toggle spawn boxes
window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "h") {
        debugMode = !debugMode;
        toggleSpawnBoxes(); // Toggle the spawn box visibility
        console.log(`Debug mode: ${debugMode ? "ON" : "OFF"}`);
    }
});

window.onload = () => {
    createSpawnBoxes();
};