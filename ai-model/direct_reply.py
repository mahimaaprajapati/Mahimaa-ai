import json

from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent

KNOWLEDGE_DIR = BASE_DIR / "dataset" / "knowledge"


def load_json(name):

    with open(KNOWLEDGE_DIR / f"{name}.json", encoding="utf-8") as f:

        return json.load(f)


CACHE = {

    "about": load_json("about"),

    "projects": load_json("projects"),

    "skills": load_json("skills"),

    "research": load_json("research"),

    "achievements": load_json("achievements")

}


def get_direct_answer(intent):

    return CACHE.get(intent)