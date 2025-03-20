// Set up the canvas for explosion effects
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Explosion particle class with images
class ExplosionParticle {
    constructor(x, y, imageSrc) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 20 + 5; // Random size
        this.speedX = (Math.random() - 0.5) * 4; // Random horizontal speed
        this.speedY = (Math.random() - 0.5) * 4; // Random vertical speed
        this.alpha = 1; // Opacity (for fade-out effect)
        
        this.image = new Image();
        this.image.src = imageSrc;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02; // Fade out
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1;
    }
}

// Array to store explosion particles
let explosionParticles = [];

// Function to trigger an explosion effect with a custom image
window.createExplosionEffect = function(x, y, imageSrc) {
    for (let i = 0; i < 20; i++) {
        explosionParticles.push(new ExplosionParticle(x, y, imageSrc));
    }
};

// Update and draw explosion particles
function animateExplosions() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    explosionParticles = explosionParticles.filter(p => p.alpha > 0); // Remove faded-out particles

    explosionParticles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateExplosions);
}

// Start animation loop
animateExplosions();