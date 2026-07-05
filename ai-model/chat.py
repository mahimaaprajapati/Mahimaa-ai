import os
import json
from pathlib import Path

import google.generativeai as genai
from dotenv import load_dotenv

from prompt import SYSTEM_PROMPT


# =====================================================
# LOAD ENVIRONMENT
# =====================================================

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "gemini-2.5-flash")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel(MODEL_NAME)


# =====================================================
# DATASET PATHS
# =====================================================

BASE_DIR = Path(__file__).resolve().parent

DATASET_DIR = BASE_DIR / "dataset"

PERSONALITY_DIR = DATASET_DIR / "personality"

KNOWLEDGE_DIR = DATASET_DIR / "knowledge"


# =====================================================
# LOAD JSON FILE
# =====================================================

def load_json_file(path: Path):

    try:

        with open(path, "r", encoding="utf-8") as f:

            return json.load(f)

    except Exception as e:

        print(f"Could not load {path.name}: {e}")

        return None


# =====================================================
# LOAD COMPLETE KNOWLEDGE BASE
# =====================================================

def load_knowledge_base():

    knowledge = {}

    # ----------------------------
    # Personality
    # ----------------------------

    if PERSONALITY_DIR.exists():

        for file in PERSONALITY_DIR.glob("*.json"):

            knowledge[file.stem] = load_json_file(file)

    # ----------------------------
    # Knowledge
    # ----------------------------

    if KNOWLEDGE_DIR.exists():

        for file in KNOWLEDGE_DIR.glob("*.json"):

            knowledge[file.stem] = load_json_file(file)

    return knowledge


# =====================================================
# LOAD ONCE
# =====================================================

KNOWLEDGE_BASE = load_knowledge_base()


# =====================================================
# BUILD CONTEXT
# =====================================================

# =====================================================
# SMART CONTEXT SELECTION
# =====================================================

KEYWORD_MAPPING = {

    "projects": [
        "project",
        "built",
        "developed",
        "portfolio",
        "mineguard",
        "placeme",
        "vyombot",
        "lunabot",
        "mahimaaai",
        "whispers",
        "moodscape"
    ],

    "skills": [
        "skill",
        "python",
        "java",
        "react",
        "ros",
        "tensorflow",
        "flask",
        "sql",
        "technology",
        "stack"
    ],

    "research": [
        "research",
        "paper",
        "ieee",
        "conference",
        "publication"
    ],

    "achievements": [
        "achievement",
        "award",
        "hackathon",
        "winner",
        "runner",
        "sih",
        "hacknovate",
        "ideathon"
    ],

    "timeline": [
        "journey",
        "timeline",
        "career",
        "story",
        "started"
    ],

    "experience": [
        "experience",
        "worked",
        "leadership"
    ],

    "about": [
        "who are you",
        "introduce",
        "about yourself",
        "background"
    ]
}


def build_context(user_question):

    question = user_question.lower()

    selected = {}

    for section, keywords in KEYWORD_MAPPING.items():

        for word in keywords:

            if word in question:

                if section in KNOWLEDGE_BASE:

                    selected[section] = KNOWLEDGE_BASE[section]

                break

    # If nothing matches,
    # send only lightweight files

    if not selected:

        for key in [

            "about",

            "projects",

            "skills"

        ]:

            if key in KNOWLEDGE_BASE:

                selected[key] = KNOWLEDGE_BASE[key]

    return json.dumps(

        selected,

        indent=2,

        ensure_ascii=False

    )


# =====================================================
# CHAT FUNCTION
# =====================================================

def ask_mahimaa(user_message: str):

    context = build_context(user_message)

    prompt = f"""

{SYSTEM_PROMPT}

=====================================

KNOWLEDGE BASE

=====================================

{context}

=====================================

USER QUESTION

=====================================

{user_message}

=====================================

Reply as MahimaaAI.

"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        return f"Error: {e}"