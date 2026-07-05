// ==========================================
// Elements
// ==========================================

const milestones = document.querySelectorAll(".milestone");

const cursorGlow = document.querySelector(".cursor-glow") as HTMLDivElement;

const backButton = document.getElementById("back-btn") as HTMLButtonElement;


// ==========================================
// Reveal Animation
// ==========================================

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.25
    }

);

milestones.forEach((milestone) => {

    observer.observe(milestone);

});


// ==========================================
// Cursor Glow
// ==========================================

window.addEventListener("mousemove", (e) => {

    cursorGlow.style.left = `${e.clientX}px`;

    cursorGlow.style.top = `${e.clientY}px`;

});


// ==========================================
// Back Button
// ==========================================

backButton.addEventListener("click", () => {

    history.back();

});


// ==========================================
// Stars Parallax
// ==========================================

const stars = document.querySelectorAll("#stars span");

window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    stars.forEach((star, index) => {

        const speed = (index % 5 + 1) * 0.08;

        (star as HTMLElement).style.transform =
            `translateY(${scroll * speed}px)`;

    });

});


// ==========================================
// Road Glow While Scrolling
// ==========================================

const road = document.querySelector(".road") as HTMLDivElement;

window.addEventListener("scroll", () => {

    const maxScroll =
        document.body.scrollHeight - window.innerHeight;

    const progress = window.scrollY / maxScroll;

    road.style.background = `linear-gradient(
        to bottom,
        #36205F 0%,
        #B57EFF ${progress * 100}%,
        #36205F 100%
    )`;

});


// ==========================================
// Floating Cards (small delay)
// ==========================================

milestones.forEach((milestone, index) => {

    (milestone as HTMLElement).style.transitionDelay =
        `${index * 0.12}s`;

});