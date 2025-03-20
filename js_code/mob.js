class Mob {
    constructor(x, y, size, sprite) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * 360;
        this.turnCooldown = 0;
        this.knockbackX = 0;
        this.knockbackY = 0;

        // stuff thats based off of size
        this.size = size;
        this.speed = 3 - (size / 45);
        this.knockbackResistance = Math.max(0.2, (this.size / 40) ** 2);
        this.knockbackStrength = 150 / this.size;
        this.playerKnockbackStrength = 15;
        this.knockbackFromPlayer = 8000 / (this.size ** 1.5); // 30 (huge) 10.8 (medium) 5 (small)
        this.knockbackToPlayer = this.size / 10 - 2;  // 1 (light) 4 (moderate) 8 (very strong)

        // invul + stun
        this.invulnerable = false;
        this.isStunned = false;

        this.element = document.createElement("img");
        this.element.src = sprite;
        this.element.classList.add("entity", "mob");
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        document.body.appendChild(this.element);

        this.debugHitbox = createDebugBox(this);
        console.log(`Size: ${this.size}, KnockbackFromPlayer: ${this.knockbackFromPlayer}, Resistance: ${this.knockbackResistance}`);
        this.updatePosition();
    }

    applyMobInvulnerability(duration) {
        this.invulnerable = true;
        setTimeout(() => {
            this.invulnerable = false;
            console.log(`Mob invulnerability ended.`);
        }, duration);
        console.log(`Mob invulnerability started for ${duration}ms.`);
        console.log(`Mob invulnerable: ${Mob.invulnerable}, stunned: ${Mob.isStunned}`);
    }


    applyInvulnerability(player) {
        player.invulnerable = true;
        setTimeout(() => {
            player.invulnerable = false;
        }, 500);
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        updateDebugHitbox(this, this.debugHitbox, this.size);
    }
    
    
}

let mobs = [];

const spawnLocationX = [52, 810];
const spawnLocationY = [52, 850];

window.spawnMob = function(sprite) {
    let randomSize = Math.random() * 100 + 30;
    const RandXSpawnLoc = Math.floor(Math.random() * spawnLocationX.length);
    const RandYSpawnLoc = Math.floor(Math.random() * spawnLocationY.length);
    let x = spawnLocationX[RandXSpawnLoc];
    let y = spawnLocationY[RandYSpawnLoc];
    let mob = new Mob(x, y, randomSize, sprite);
    mobs.push(mob);

    createExplosionEffect(x, y, "images/spawn_poof.png");

    mob.isStunned = true;
    console.log(`Mob spawned and stunned for 1 second.`);

    setTimeout(() => {
        mob.isStunned = false;
        console.log(`Mob stun expired.`);
    }, 750);
}

function updateMobs() {
    mobs.forEach(mob => moveMob(mob));
    requestAnimationFrame(updateMobs);
}

updateMobs();

// debuging code


// forced update
window.onload = () => {
    updateMobs();
};