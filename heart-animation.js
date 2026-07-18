const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const particles = [];

class Particle{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;

        this.tx = this.x;
        this.ty = this.y;

        this.size = Math.random()*2+1;

        this.speed = .08 + Math.random()*.04;

        this.color = `hsl(${330+Math.random()*20},100%,65%)`;

    }

    update(){

        this.x += (this.tx-this.x)*this.speed;
        this.y += (this.ty-this.y)*this.speed;

    }

    draw() {

        ctx.shadowBlur = 5;

        ctx.shadowColor = this.color;

        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();
    }

}

for(let i=0;i<1500;i++){

    particles.push(new Particle());

}
function heart(t){

    return{

        x:16*Math.pow(Math.sin(t),3),

        y:-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))

    }

}
/* =========================================
   HEART SHAPE TARGET POINTS
========================================= */

const heartPoints = [];

function createHeartPoints() {

    heartPoints.length = 0;

    const scale = 18;

    const offsetX = canvas.width / 2;
    const offsetY = canvas.height / 2 - 70;

    for (let t = 0; t < Math.PI * 2; t += 0.02) {

        const x = 16 * Math.pow(Math.sin(t), 3);

        const y =
            -(13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t));

        heartPoints.push({

            x: offsetX + x * scale,

            y: offsetY + y * scale

        });

    }

}

createHeartPoints();


/* =========================================
   ASSIGN PARTICLES TO HEART
========================================= */

function formHeart() {

    for (let i = 0; i < particles.length; i++) {

        const p = particles[i];

        const target =
            heartPoints[i % heartPoints.length];

        p.tx = target.x;
        p.ty = target.y;

    }

}
/* =========================================
   START HEART ANIMATION
========================================= */

let pulse = 0;
let animationId;
let animationStarted = false;

function startHeartAnimation() {

    formHeart();

    if (!animationStarted) {
        animationStarted = true;
        animateHeart();
    }

}
/* =========================================
   HEART ANIMATION LOOP
========================================= */

function animateHeart() {

    if (!animationStarted) return;
    animationId = requestAnimationFrame(animateHeart);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pulse += 0.03;

    const scale = 1 + Math.sin(pulse) * 0.04;

    ctx.save();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 70;

    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
    // ctx.translate(canvas.width / 2, canvas.height / 2);

    // ctx.scale(scale, scale);

    // ctx.translate(-canvas.width / 2, -canvas.height / 2);

    particles.forEach(p => {

        p.update();
        p.draw();

    });

    ctx.restore();

}

/* =========================================
   WINDOW RESIZE
========================================= */

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createHeartPoints();
    formHeart();

});
/* =========================================
        HEART GLOW TEXT
========================================= */

let textAlpha = 0;

function drawLoveText() {

    if (textAlpha < 1) {
        textAlpha += 0.01;
    }

    ctx.save();

    ctx.globalAlpha = textAlpha;

    ctx.textAlign = "center";

    ctx.font = "bold 70px Poppins";

    ctx.fillStyle = "#ff2d75";

    ctx.shadowColor = "#ff2d75";
    ctx.shadowBlur = 40;

    ctx.fillText(
        "I ❤️ You",
        canvas.width / 2,
        canvas.height / 2 + 100
    );

    ctx.restore();

}

/* =========================================
        UPDATE ANIMATION LOOP
========================================= */

// animateHeart() de andar
// particles draw hon to baad eh line add karo

drawLoveText();


/* =========================================
        PARTICLE WAVE EFFECT
========================================= */

setInterval(() => {

    for (let i = 0; i < particles.length; i++) {

        particles[i].tx += (Math.random() - 0.5) * 4;
        particles[i].ty += (Math.random() - 0.5) * 4;

    }

    setTimeout(formHeart, 120);

}, 500);


/* =========================================
        STOP FUNCTION
========================================= */

function stopHeartAnimation() {

    cancelAnimationFrame(animationId);

}
// Warm up canvas before user clicks Yes
requestAnimationFrame(() => {
    animateHeart();
    cancelAnimationFrame(animationId);
    animationStarted = false;
});
