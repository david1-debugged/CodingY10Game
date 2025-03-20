window.moveMob = function(mob) {
    if (mob.isStunned) return; // Skip movement if mob is stunned

    mob.x += mob.knockbackX;
    mob.y += mob.knockbackY;
    mob.knockbackX *= 0.9;
    mob.knockbackY *= 0.9;

    let newX = mob.x + Math.cos(mob.angle * Math.PI / 180) * mob.speed;
    let newY = mob.y + Math.sin(mob.angle * Math.PI / 180) * mob.speed;

    if (!isColliding(mob, players.player1)) {
        mob.x = newX;
        mob.y = newY;
    }

    mobs.forEach(otherMob => {
        if (otherMob !== mob && isColliding(mob, otherMob)) {
            smoothBounceOff(mob, otherMob);
        }
    });

    let player = players.player1;
    if (mob.turnCooldown <= 0 && Math.random() < 0.01) {
        let futureX = player.x + (player.keys.right ? 20 : 0) - (player.keys.left ? 20 : 0);
        let futureY = player.y + (player.keys.down ? 20 : 0) - (player.keys.up ? 20 : 0);
        mob.angle = Math.atan2(futureY - mob.y, futureX - mob.x) * 180 / Math.PI;
        mob.turnCooldown = 20;
    }

    if (mob.turnCooldown > 0) mob.turnCooldown--;

    mob.x = Math.max(42, Math.min(window.innerWidth / 2 - 33, mob.x));
    mob.y = Math.max(42, Math.min(window.innerHeight - 22, mob.y));

    if (isColliding(mob, players.player1) && !players.player1.invulnerable && !mob.invulnerable && !mob.isStunned) {
        applyKnockback(mob, players.player1, mob.knockbackFromPlayer);
        applyKnockback(players.player1, mob, mob.knockbackToPlayer);
    
        players.player1.invulnerable = true;
        setTimeout(() => players.player1.invulnerable = false, 500);
    }

    mob.updatePosition();
};