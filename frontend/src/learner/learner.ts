// ======================================
// Elements
// ======================================

const nodes = document.querySelectorAll(".node");

const panel = document.getElementById("info-panel") as HTMLDivElement;

const panelTitle = document.getElementById("panel-title") as HTMLHeadingElement;

const panelContent = document.getElementById("panel-content") as HTMLDivElement;

const closeButton = document.getElementById("close-panel") as HTMLButtonElement;

const backButton = document.getElementById("back-button") as HTMLButtonElement;

// ======================================
// Learning Content
// ======================================

const topics: Record<string, { title: string; content: string }> = {

    currently: {

        title: "Currently Exploring",

        content: `
<p>
I enjoy learning by building. Right now I'm exploring topics that challenge the way I think rather than simply adding another framework to my toolkit.
</p>

<ul>
<li>Large Language Models & AI Agents</li>
<li>Three.js & Interactive Experiences</li>
<li>System Design Fundamentals</li>
<li>Computer Vision</li>
<li>Robotics Software</li>
<li>Backend Architecture</li>
</ul>
`
    },

    cs: {

        title: "Computer Science Fundamentals",

        content: `
<p>
Technology changes quickly, but strong fundamentals remain valuable. Whenever I build something new, I often find myself returning to operating systems, databases, networking and algorithms because they help me understand why software works the way it does.
</p>
`
    },

    ai: {

        title: "AI & Machine Learning",

        content: `
<p>
AI became exciting to me when I stopped treating it as a buzzword and started building with it. Creating MahimaaAI introduced me to retrieval, prompt engineering, context management and the practical challenges of building intelligent assistants.
</p>

<p>
Every AI project teaches me that understanding the problem is often more important than choosing the newest model.
</p>
`
    },

    robotics: {

        title: "Robotics",

        content: `
<p>
Robotics fascinates me because it combines software with the physical world. I enjoy learning about perception, autonomous systems, sensors and how intelligent software interacts with real environments.
</p>
`
    },

    research: {

        title: "Research Journey",

        content: `
<p>
Research taught me to ask better questions before searching for answers. Working on remote sensing and AI showed me that solving real-world problems requires curiosity, experimentation and patience more than perfect code.
</p>
`
    },

    books: {

        title: "Books & Papers",

        content: `
<p>
I enjoy reading books, technical blogs and research papers that help me understand ideas instead of simply memorizing technologies. I believe every good paper changes the way you think about a problem.
</p>
`
    },

    lessons: {

        title: "Lessons from Building",

        content: `
<ul>

<li>Every meaningful project began with something I didn't know.</li>

<li>Good software starts with understanding the problem.</li>

<li>Failure usually teaches faster than success.</li>

<li>Breaking things is often part of learning.</li>

<li>The best way to understand a concept is to build something with it.</li>

</ul>
`
    },

    questions: {

        title: "Questions I'm Chasing",

        content: `
<ul>

<li>How do intelligent systems reason?</li>

<li>How do autonomous robots make decisions?</li>

<li>How can software become more reliable at scale?</li>

<li>How can AI solve real engineering problems responsibly?</li>

<li>What ideas from research will shape the next generation of software?</li>

</ul>
`
    }

};

// ======================================
// Open Panel
// ======================================

function openPanel(topic: string) {

    const data = topics[topic];

    if (!data) return;

    panelTitle.textContent = data.title;

    panelContent.style.opacity = "0";

    setTimeout(() => {

        panelContent.innerHTML = data.content;

        panelContent.style.opacity = "1";

    }, 150);

    panel.classList.add("open");

}

// ======================================
// Close Panel
// ======================================

function closePanel() {

    panel.classList.remove("open");

}

// ======================================
// Node Click
// ======================================

nodes.forEach(node => {

    node.addEventListener("click", () => {

        const topic = (node as HTMLElement).dataset.topic;

        if (!topic) return;

        openPanel(topic);

    });

});
const core = document.getElementById("core") as HTMLDivElement;
const subtitle = document.getElementById("core-subtitle");

if (core && subtitle) {

    const defaultText =
        "Every project begins with something I don't know.";

    const hoverText =
        "Click to meet Mahimaa AI→";

    core.addEventListener("mouseenter", () => {

        subtitle.textContent = hoverText;

    });

    core.addEventListener("mouseleave", () => {

        subtitle.textContent = defaultText;

    });
}
core.addEventListener("click", () => {

    document.body.style.transition = "opacity .5s";

    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.href = "../mahimaaAI/mahimaaAI.html";

        // Replace with your MahimaaAI page if different

    }, 500);

});
// ======================================
// Close Button
// ======================================

closeButton.addEventListener("click", closePanel);

// ======================================
// ESC Key
// ======================================

window.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closePanel();

    }

});

// ======================================
// Back Button
// ======================================

backButton.addEventListener("click", () => {

    window.history.back();

});