window.applyKnockback = function(entity, source, strength) {
    if (entity.isStunned) {
        console.log("Entity already stunned, skipping knockback.");
        return;
    }

    const resistance = entity.knockbackResistance || 1;
    const adjustedStrength = strength / (resistance ** 2);

    let angleAway = Math.atan2(entity.y - source.y, entity.x - source.x);

    entity.knockbackX = Math.cos(angleAway) * adjustedStrength;
    entity.knockbackY = Math.sin(angleAway) * adjustedStrength;

    entity.invulnerable = true;
    console.log(`Mob invulnerability started.`);

    function applyKnockbackEffect() {
        entity.x += entity.knockbackX;
        entity.y += entity.knockbackY;

        entity.knockbackX *= 0.9;
        entity.knockbackY *= 0.9;

        if (Math.abs(entity.knockbackX) > 0.1 || Math.abs(entity.knockbackY) > 0.1) {
            requestAnimationFrame(applyKnockbackEffect);
        } else {
            entity.isStunned = true;
            const stunDuration = (100 - entity.size) * 10;

            setTimeout(() => {
                entity.isStunned = false;
                console.log(`Mob stun ended.`);
            }, stunDuration);

            entity.invulnerable = false;
            console.log(`Mob invulnerability ended.`);
        }
    }

    entity.invulnerable = true;
    console.log(`Mob invulnerability started.`);
    applyKnockbackEffect();
};