/* ===========================================
   CURSOR GLOW
=========================================== */

const glow = document.createElement("div");

glow.className = "cursor-glow";

document.body.appendChild(glow);

window.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});


/* ===========================================
   SHOOTING STARS
=========================================== */

function createShootingStar() {

    const star = document.createElement("div");

    star.className = "shooting-star";

    star.style.left = Math.random() * window.innerWidth + "px";

    star.style.top = Math.random() * 250 + "px";

    document.body.appendChild(star);

    setTimeout(() => {

        star.remove();

    }, 2000);

}

setInterval(createShootingStar, 7000);



/* ===========================================
   FADE IN
=========================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll(".intro-text,.ai-invite").forEach(section => {

    observer.observe(section);

});



/* ===========================================
   BOOT SEQUENCE
=========================================== */

const launchButton = document.getElementById("launchAI") as HTMLButtonElement;

const bootScreen = document.getElementById("bootScreen") as HTMLDivElement;

const bootText = document.getElementById("bootText") as HTMLParagraphElement;

const bootLines = [

"MAHIMAAAI.EXE",

"",

"Initializing...",

"████░░░░░░░░░ 18%",

"Loading memories...",

"██████░░░░░░ 42%",

"Loading projects...",

"████████░░░░ 67%",

"Loading research...",

"██████████░░ 84%",

"Loading personality...",

"████████████ 100%",

"",

"Calibrating curiosity...",

"Loading sarcasm...",

"Checking moon obsession... ✓",

"",

"Digital Twin Online.",

"",

"Opening conversation..."

];

launchButton?.addEventListener("click", () => {

    bootScreen.classList.remove("hidden");

    bootText.innerHTML = "";

    let index = 0;

    const timer = setInterval(() => {

        if (index < bootLines.length) {

            bootText.innerHTML += bootLines[index] + "<br>";

            bootText.scrollTop = bootText.scrollHeight;

            index++;

        } else {

            clearInterval(timer);

            setTimeout(() => {

    bootScreen.classList.add("fade-out");

    setTimeout(() => {

        window.location.href = "../mahimaaAI/mahimaaAI.html";

    }, 900);

}, 1200);

        }

    }, 220);

});



/* ===========================================
   CONSOLE EASTER EGG
=========================================== */

console.clear();

console.log(

"%c🌙 Curious minds always open the console.",

"font-size:18px;color:#C49BFF;font-weight:bold;"

);

console.log(

"%cWelcome to MahimaaAI.",

"font-size:15px;color:#A8FFB2;"

);

console.log(

"%cYou found a tiny easter egg 😊",

"font-size:13px;color:#FFD580;"

);