import json
import re
from collections import defaultdict
from pathlib import Path


# -----------------------------
# CONFIG
# -----------------------------

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

INPUT_FILE = BASE_DIR / "dataset" / "mahimaa-ai-restructured.jsonl"

OUTPUT_DIR = BASE_DIR / "dataset" / "clean_dataset"

OUTPUT_DIR.mkdir(exist_ok=True)

# -----------------------------
# CATEGORY KEYWORDS
# -----------------------------

CATEGORY_KEYWORDS = {
    "identity": [
        "who are you",
        "introduce",
        "about yourself",
        "real",
        "human",
        "age",
        "old",
        "name",
        "vibe"
    ],

    "relationships": [
        "boyfriend",
        "girlfriend",
        "love",
        "marry",
        "marriage",
        "single",
        "flirt",
        "date",
        "relationship",
        "crush"
    ],

    "coding": [
        "code",
        "coding",
        "program",
        "developer",
        "python",
        "java",
        "react",
        "bug",
        "debug",
        "github"
    ],

    "emotions": [
        "happy",
        "sad",
        "angry",
        "stress",
        "cry",
        "emotion",
        "lonely",
        "fear"
    ],

    "humour": [
        "joke",
        "roast",
        "funny",
        "laugh",
        "meme"
    ],

    "motivation": [
        "dream",
        "goal",
        "motivate",
        "success",
        "future",
        "confidence"
    ],

    "career": [
        "internship",
        "project",
        "research",
        "career",
        "job"
    ],

    "hobbies": [
        "music",
        "coffee",
        "moon",
        "movie",
        "food",
        "book",
        "dance"
    ],

    "philosophy": [
        "life",
        "destiny",
        "purpose",
        "meaning"
    ]
}


# -----------------------------
# CATEGORY DETECTOR
# -----------------------------

def detect_category(question):

    q = question.lower()

    for category, words in CATEGORY_KEYWORDS.items():

        for word in words:

            if word in q:

                return category

    return "miscellaneous"


# -----------------------------
# EXTRACT QUESTION / ANSWER
# -----------------------------

def extract(text):

    user = re.search(r"User:\s*(.*?)\nAssistant:", text, re.S)

    assistant = re.search(r"Assistant:\s*(.*)", text, re.S)

    if not user or not assistant:

        return None

    return (
        user.group(1).strip(),
        assistant.group(1).strip()
    )


# -----------------------------
# STORAGE
# -----------------------------

database = defaultdict(lambda: defaultdict(set))


# category
#     question
#          answers


# -----------------------------
# READ FILE
# -----------------------------

with open(INPUT_FILE, encoding="utf-8") as f:

    for line in f:

        line = line.strip()

        if not line:

            continue

        try:

            obj = json.loads(line)

        except:

            continue

        text = obj.get("text", "")

        result = extract(text)

        if result is None:

            continue

        question, answer = result

        category = detect_category(question)

        database[category][question].add(answer)


# -----------------------------
# SAVE
# -----------------------------

for category in database:

    records = []

    idx = 1

    for question, answers in database[category].items():

        record = {

            "id": f"{category}_{idx:03}",

            "category": category,

            "questions": [

                question

            ],

            "answers": list(answers)

        }

        records.append(record)

        idx += 1

    outfile = Path(OUTPUT_DIR) / f"{category}.json"

    with open(outfile, "w", encoding="utf-8") as f:

        json.dump(records, f, indent=4, ensure_ascii=False)

print("Done!")