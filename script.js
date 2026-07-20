// =========================
// Fade In Animation
// =========================

window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});


// =========================
// Open Letter
// =========================
const music = document.getElementById("bgMusic");

function playMusic() {

    music.volume = 0;

    music.play().then(() => {

        }).catch(err=>{
        console.log(err);
    });

    let volume = 0;

    const fade = setInterval(() => {

        volume += 0.05;

        if (volume >= 0.4) {
            volume = 0.4;
            clearInterval(fade);
        }

        music.volume = volume;

    }, 100);

}
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {

    if (music.paused) {
        music.play();
        // musicBtn.classList.remove("playing");
        musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
    } else {
        music.pause();
        // musicBtn.classList.add("playing");
        musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }

});

let msg = `If I could give you one gift {rose} It would be the ability to see yourself through my eyes {eyes} Only then would you relize how truely Special you are {hearts} 
You Light up my life with your every word, smile and laugh {smile} You are the best thing to ever happen to me and I love you more than words can exlpain {heart}
Every day with you is more beautiful because of you {rose} Thank you for filling my life with happiness {hearts}
No matter what happens... I will always choose You {heart}
Forever & Always {love} | 19 July 2026`;

let i = 0;
const text = document.getElementById("text");

let typingTimer = null;

function typing() {
    if (i >= msg.length) {
        text.classList.add('typing-finished');
        setTimeout(() => {
            // document.querySelector(".question-box").style.visibility= "visible";
            document.querySelector(".question").classList.add("show");
            document.querySelector("#yesBtns").classList.add("show");
            document.querySelector("#noBtns").classList.add("show");
            // document.querySelector(".letter-signature").classList.add("show");

        }, 2000);
        document.body.classList.remove("typing-lock");
        return;
    }

    const emojis = {
        "{heart}": "❤️",
        "{rose}": "🌹",
        "{hearts}": "💞",
        "{love}": "💖",
        "{smile}": "🤗",
        "{eyes}": "👀"
    };

    let matched = false;

    for (const key in emojis) {
        if (msg.startsWith(key, i)) {
            text.insertAdjacentHTML("beforeend",`<span class="emoji-shake">${emojis[key]}</span>`);
            i += key.length;
            matched = true;
            break;
        }
    }

    if (!matched) {
        if (msg[i] === "\n") {
            text.innerHTML += "<br>";
        } else {
            text.insertAdjacentText("beforeend", msg[i]);
        }
        i++;
    }
    typingTimer = setTimeout(typing, 140);
}

function showMessage() {
    playMusic();
    const musicBtn = document.querySelector(".music-btn");
    musicBtn.style.display = "block";
    text.classList.remove('typing-finished');
    document.body.classList.add("typing-lock");
    // const signature = document.querySelector(".letter-signature");
    // signature.classList.remove("show");
    
    const messageScreen = document.querySelector(".message-screen");
    const box = messageScreen.querySelector(".box");
    messageScreen.style.display = "flex";
    box.classList.remove("show");
    setTimeout(() => {
        box.classList.add("show");
    }, 50);
    i = 0;
    text.innerHTML = "";
    text.style.height = "230px";
    typing();
}

document.querySelector(".first_open_btn").addEventListener("click", () => {
    openLetter("first");
});

document.querySelector(".second_open_btn").addEventListener("click", () => {
    openLetter("second");
});

document.querySelector(".last_open_btn").addEventListener("click", () => {
    openLetter("last");
});
function openLetter(type) {

    const firstScreen = document.querySelector(".first_screen");
    const finalScreen = document.querySelector(".final-screen");
    const popup = document.getElementById("lovePopup");
    // const messageScreen = document.querySelector(".message-screen");
    // Hide screen according to button
    if (type === "first") {

        firstScreen.style.opacity = "0";

        setTimeout(() => {
            firstScreen.style.display = "none";
            showMessage();
        }, 500);

    } 
    else if (type === "second") {

        popup.style.opacity = "0";
        firstScreen.style.opacity = "0";

        setTimeout(() => {
            popup.style.display = "none";
            firstScreen.style.display = "none";
            showMessage();
        }, 500);
    } 
    else if (type === "last") {

        popup.style.opacity = "0";
        firstScreen.style.opacity = "0";
        finalScreen.classList.remove("show");

        setTimeout(() => {
            popup.style.display = "none";
            firstScreen.style.display = "none";
            showMessage();
        }, 500);
    }
}

const noBtns = document.getElementById("noBtns");
const box = document.querySelector(".box");

const messages = [
    "🥺 Please don't say no...",
    "💔 My heart will break...",
    "😢 Think once again...",
    "❤️ Give me one chance...",
    "🌹 I promise I'll make you smile...",
    "😭 Pleaseee..."
];

const popupMsg = document.createElement("div");
popupMsg.className = "no-message";
box.appendChild(popupMsg);

let isMoving = false;

noBtns.addEventListener("mouseenter", moveNoButton);

function moveNoButton() {

    if (isMoving) return;
    isMoving = true;

    const container = box.getBoundingClientRect();

    const btnWidth = noBtns.offsetWidth;
    const btnHeight = noBtns.offsetHeight;

    const maxX = container.width - btnWidth - 20;
    const maxY = container.height - btnHeight - 20;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtns.style.position = "absolute";
    noBtns.style.left = `${x}px`;
    noBtns.style.top = `${Math.max(0, y - 5)}px`;

    popupMsg.innerHTML =
        messages[Math.floor(Math.random() * messages.length)];

    popupMsg.style.left = `${x}px`;
    popupMsg.style.top = `${Math.max(0, y - 45)}px`;

    popupMsg.classList.remove("fade-out");
    popupMsg.classList.add("show");

    clearTimeout(window.msgTimer);

    window.msgTimer = setTimeout(() => {
        popupMsg.classList.remove("show");
        popupMsg.classList.add("fade-out");
    }, 1200);

    // Prevent instant re-trigger
    noBtns.style.pointerEvents = "none";

    setTimeout(() => {
        noBtns.style.pointerEvents = "auto";
        isMoving = false;
    }, 250);
}

const yesBtns = document.getElementById("yesBtns");
const heartsContainer = document.getElementById("hearts");

yesBtns.addEventListener("click", () => {

    const messageScreen = document.querySelector(".message-screen");

    messageScreen.style.opacity = "0";
    messageScreen.style.transform = "scale(.9)";

    // setTimeout(() => {

        messageScreen.style.display = "none";
        // music.pause();
        document.getElementById("heartAnimation").classList.add("show");
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                startHeartAnimation();
            });
        });
    // }, 500);

});
/*=========================================
        FLOATING HEARTS
=========================================*/

let heartInterval;

function startHearts() {

    heartInterval = setInterval(() => {

        const heart =
            document.createElement("div");

        heart.className = "floathearts";

        const hearts = [
            "❤️",
            "💖",
            "💕",
            "💗",
            "💘",
            "💝"
        ];

        heart.innerHTML =
            hearts[
                Math.floor(
                    Math.random() * hearts.length
                )
            ];

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            18 +
            Math.random() * 28 +
            "px";

        heart.style.animationDuration =
            4 +
            Math.random() * 3 +
            "s";

        heartsContainer.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 7000);

    }, 180);

}


/*=========================================
        STOP HEARTS
=========================================*/

function stopHearts() {

    clearInterval(heartInterval);

}

// =========================
// Running "No" Button
// =========================

const noBtn = document.getElementById("noBtn");
const popup = document.getElementById("lovePopup");
const popupText = document.getElementById("popupText");
const popupNoBtn = document.getElementById("popupNoBtn");
const popupBox = document.querySelector(".popup-box");
const popupHeartEffect = document.getElementById("popupHeartEffect");
let noClickCount = 0;
let firstTime = true;

function moveButton() {
    if (firstTime) {
        popup.classList.add("show");
        firstTime = false;
    }
}

noBtn.addEventListener("click", moveButton);


// =========================
// Click Heart Effect
// =========================

document.addEventListener("click", function(e){

    // Default emoji
    let emoji = "";

    // Final screen button te click hoya?
    if (e.target.closest("#yesBtns")) {
        emoji = "";
    }
    else if (e.target.closest(".open-btn") || e.target.closest(".popup-open-btn")) {
        emoji = "❤️";
    }
    else if(e.target.closest(".no-btn") || e.target.closest(".popup-no-btn")){
        emoji ="💔";
    }
    if (!emoji) return;
    for (let i = 0; i < 5; i++) {

        const heartDiv = document.createElement("div");
        heartDiv.innerHTML = emoji;

        heartDiv.style.position = "fixed";
        heartDiv.style.left = e.clientX + "px";
        heartDiv.style.top = e.clientY + "px";
        heartDiv.style.fontSize = (18 + Math.random() * 10) + "px";
        heartDiv.style.pointerEvents = "none";
        heartDiv.style.zIndex = "999999";

        // heartDiv.style.transform = "translate(-50%, -50%)";
        heartDiv.style.opacity = "1";
        heartDiv.style.transition = "transform 2.5s ease-out, opacity 2.5s ease-out";

        document.body.appendChild(heartDiv);

        requestAnimationFrame(() => {

            const x = (Math.random() - 0.5) * 120; // left/right spread
            const y = -(80 + Math.random() * 120); // upward
            const rotate = (Math.random() - 0.5) * 90;

            heartDiv.style.transform =
                `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(1.8)`;

            heartDiv.style.opacity = "0";
        });

        setTimeout(() => {
            heartDiv.remove();
        }, 2500);
    }

});


// =========================
// Heart Pulse on Hover
// =========================

const heartt = document.querySelector(".heart");
heartt.addEventListener("mouseenter",()=>{
    heartt.style.transform="scale(1.15)";
});

heartt.addEventListener("mouseleave",()=>{
    heartt.style.transform="scale(1)";
});

popupNoBtn.addEventListener("click", function () {

    // Restart animation
    popupBox.classList.remove("shake");
    popupBox.classList.add("shake");

    setTimeout(() => {
        popupBox.classList.remove("shake");
    }, 900);

    noClickCount++;
    if (noClickCount === 1) {
        popupText.innerHTML = `It's something I made... just for you. 🙏❤️
            <br>
            Just give me one minute.`;
    } else if (noClickCount === 2) {
        popupText.innerHTML = `Okay... maybe it doesn't matter to you. 💔`;
        popupNoBtn.innerHTML = "Maan Ji Please... now open it 🥺❤️";
    }else {
        popup.classList.remove("show");
        document.querySelector(".first_screen").style.display="none";
        document.getElementById("finalScreen").classList.add("show");
        document.querySelector(".final-screen").style.display="flex";
    }

});