// General function to check collision between two entities
window.isColliding = function(entityA, entityB) {
    let sizeA = entityA.size || 60; // Default 60 if size is undefined
    let sizeB = entityB.size || 60;

    return (
        entityA.x < entityB.x + sizeB &&
        entityA.x + sizeA > entityB.x &&
        entityA.y < entityB.y + sizeB &&
        entityA.y + sizeA > entityB.y
    );
};

// Function to apply smooth bouncing effect between two mobs
window.smoothBounceOff = function(mobA, mobB, bounceStrength = 3) {
    let angleBetween = Math.atan2(mobA.y - mobB.y, mobA.x - mobB.x);
    mobA.knockbackX += Math.cos(angleBetween) * bounceStrength;
    mobA.knockbackY += Math.sin(angleBetween) * bounceStrength;
};