/* ===========================================
   SMOOTH SCROLL TO STORY
=========================================== */

const storyBtn = document.getElementById("storyBtn");
const story = document.getElementById("story");

storyBtn?.addEventListener("click", () => {

    story?.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

});


/* ===========================================
   REVEAL ON SCROLL
=========================================== */

const revealElements = document.querySelectorAll(

    ".featured-paper, .story, .timeline, .technology, .contributions, .future"

);

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:0.15

}

);

revealElements.forEach(el=>observer.observe(el));


/* ===========================================
   TECH TAG HOVER
=========================================== */

const tags = document.querySelectorAll(".research-tags span");

tags.forEach(tag=>{

tag.addEventListener("mouseenter",()=>{

(tag as HTMLElement).style.transform="translateY(-4px)";

});

tag.addEventListener("mouseleave",()=>{

(tag as HTMLElement).style.transform="translateY(0px)";

});

});


/* ===========================================
   PARALLAX HERO
=========================================== */

const hero = document.querySelector(".hero") as HTMLElement;

window.addEventListener("scroll",()=>{

const y = window.scrollY;

hero.style.backgroundPositionY = `${y * 0.35}px`;

});


/* ===========================================
   TIMELINE ANIMATION
=========================================== */

const steps = document.querySelectorAll(".step");

steps.forEach((step,index)=>{

(step as HTMLElement).style.transitionDelay=`${index*120}ms`;

});


/* ===========================================
   BUTTON MICRO ANIMATION
=========================================== */

storyBtn?.addEventListener("mouseenter",()=>{

(storyBtn as HTMLElement).style.transform="scale(1.05)";

});

storyBtn?.addEventListener("mouseleave",()=>{

(storyBtn as HTMLElement).style.transform="scale(1)";

});


/* ===========================================
   CARD FLOAT EFFECT
=========================================== */

const cards = document.querySelectorAll(

".step, .contribution-grid div"

);

cards.forEach(card=>{

card.addEventListener("mousemove", (event) => {

const e = event as MouseEvent;

const target = card as HTMLElement;

const rect = target.getBoundingClientRect();

const x = e.clientX - rect.left;

const y = e.clientY - rect.top;

target.style.transform =

`perspective(900px)
 rotateX(${-(y-rect.height/2)/20}deg)
 rotateY(${(x-rect.width/2)/20}deg)
 translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

(card as HTMLElement).style.transform=

"perspective(900px) rotateX(0deg) rotateY(0deg)";

});

});