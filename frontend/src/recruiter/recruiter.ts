// recruiter.ts

// ----------------------------
// HERO BUTTONS
// ----------------------------

const resumeBtn = document.getElementById("resumeBtn");
const githubBtn = document.getElementById("githubBtn");
const linkedinBtn = document.getElementById("linkedinBtn");

resumeBtn?.addEventListener("click", () => {
    // TODO: Replace with your resume
    window.open("/resume.pdf", "_blank");
});

githubBtn?.addEventListener("click", () => {
    window.open("https://github.com/mahimaaprajapati", "_blank");
});

linkedinBtn?.addEventListener("click", () => {
    window.open("https://www.linkedin.com/in/mahimaa-prajapati/", "_blank");
});


// ----------------------------
// NETFLIX CARD HOVER EFFECT
// ----------------------------

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.classList.add("active");

    });

    card.addEventListener("mouseleave", () => {

        card.classList.remove("active");

    });

});


// ----------------------------
// CARD CLICK
// ----------------------------

cards.forEach((card) => {

    card.addEventListener("click", () => {

        const title = card.textContent?.trim();

        switch(title){

            case "ROVER":
                console.log("Open ROVER Project");
                break;

            case "Ehsaas":
                console.log("Open Ehsaas");
                break;

            case "MineGuard":
                console.log("Open MineGuard");
                break;

            case "Placement Portal":
                console.log("Open Placement Portal");
                break;

            case "Frontend":
                console.log("Frontend Skills");
                break;

            case "Backend":
                console.log("Backend Skills");
                break;

            case "Programming":
                console.log("Programming Languages");
                break;

            case "AI / ML":
                console.log("AI Skills");
                break;

            default:
                console.log(title);

        }

    });

});


// ----------------------------
// SMOOTH SCROLL (Future)
// ----------------------------

document.querySelectorAll("nav li").forEach((item) => {

    item.addEventListener("click", () => {

        console.log(item.textContent);

        // We'll connect sections later

    });

});


// ----------------------------
// BACKGROUND VIDEO
// ----------------------------

const video = document.querySelector("video") as HTMLVideoElement;

video.play().catch(() => {
    console.log("Autoplay blocked.");
});


// ----------------------------
// PAGE LOADED
// ----------------------------

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
const glow = document.querySelector(".cursor-glow") as HTMLElement;

document.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});