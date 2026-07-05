// ================================
// Elements
// ================================

const editor = document.getElementById("editor-content") as HTMLPreElement;

const files = document.querySelectorAll(".file");

const terminalInput = document.getElementById(
    "terminal-command"
) as HTMLInputElement;

const terminalOutput = document.getElementById(
    "terminal-output"
) as HTMLDivElement;

const clock = document.getElementById("clock") as HTMLSpanElement;


// ================================
// API
// ================================

const API = "http://127.0.0.1:5000/api/file";


// ================================
// Current File
// ================================

let currentFile = "about";


// ================================
// Load JSON
// ================================

async function loadFile(file: string) {

    try {

        currentFile = file;

        const response = await fetch(`${API}/${file}`);

        if (!response.ok) {

            throw new Error("Unable to load file");

        }

        const json = await response.json();

        editor.innerHTML = syntaxHighlight(json);

        updateExplorer(file);

        updateTab(file);

    }

    catch (err) {

        editor.innerHTML = `<span style="color:red;">
Unable to load ${file}.json
</span>`;

    }

}


// ================================
// Explorer
// ================================

function updateExplorer(file: string) {

    files.forEach(item => {

        item.classList.remove("active");

        if (
            (item as HTMLElement).dataset.file === file
        ) {

            item.classList.add("active");

        }

    });

}


// ================================
// Tabs
// ================================

function updateTab(file: string) {

    const tabs = document.getElementById("tabs");

    if (!tabs) return;

    tabs.innerHTML = `

<div class="tab active">

${file}.json

</div>

`;

}


// ================================
// Syntax Highlight
// ================================

function syntaxHighlight(json: any): string {

    let text = JSON.stringify(json, null, 4);

    text = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    return text.replace(

        /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?)/g,

        (match) => {

            let cls = "number";

            if (/^"/.test(match)) {

                cls = /:$/.test(match)

                    ? "key"

                    : "string";

            }

            else if (/true|false/.test(match)) {

                cls = "boolean";

            }

            else if (/null/.test(match)) {

                cls = "null";

            }

            return `<span class="${cls}">${match}</span>`;

        }

    );

}


// ================================
// Explorer Click
// ================================

files.forEach(file => {

    file.addEventListener("click", () => {

        const name = (file as HTMLElement).dataset.file;

        if (!name) return;

        loadFile(name);

    });

});


// ================================
// Terminal
// ================================

function print(text: string) {

    const line = document.createElement("div");

    line.innerHTML = text;

    terminalOutput.appendChild(line);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;

}


function execute(command: string) {

    switch (command.toLowerCase()) {

        case "help":

            print("Available commands:");

            print("help");

            print("ls");

            print("cat about.json");

            print("cat projects.json");

            print("cat skills.json");

            print("cat research.json");

            print("cat timeline.json");

            print("cat achievements.json");

            print("cat experience.json");

            print("whoami");

            print("clear");

            break;

        case "ls":

            print(

                "about.json&nbsp;&nbsp;projects.json&nbsp;&nbsp;skills.json&nbsp;&nbsp;research.json&nbsp;&nbsp;timeline.json&nbsp;&nbsp;achievements.json&nbsp;&nbsp;experience.json"

            );

            break;

        case "whoami":

            print("Mahimaa Prajapati");

            print("Computer Science Engineer");

            print("AI • Full Stack • Research");

            break;

        case "clear":

            terminalOutput.innerHTML = "";

            return;

        default:

            if (command.startsWith("cat ")) {

                const file = command
                    .replace("cat ", "")
                    .replace(".json", "");

                loadFile(file);

                print(`Opening ${file}.json ...`);

            }

            else {

                print(`Unknown command: ${command}`);

            }

    }

}


// ================================
// Terminal Enter
// ================================

terminalInput.addEventListener("keydown", e => {

    if (e.key !== "Enter") return;

    const command = terminalInput.value.trim();

    if (command.length === 0) return;

    print(`<span style="color:#4EC9B0;">></span> ${command}`);

    execute(command);

    terminalInput.value = "";

});


// ================================
// Clock
// ================================

function updateClock() {

    const now = new Date();

    clock.textContent = now.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

}

setInterval(updateClock, 1000);

updateClock();


// ================================
// Initial Load
// ================================

loadFile("about");