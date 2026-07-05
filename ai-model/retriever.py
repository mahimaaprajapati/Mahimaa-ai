import json

# =====================================================
# PROJECT ALIASES
# =====================================================

PROJECT_ALIASES = {

    "vyombot": [
        "vyombot",
        "lunabot",
        "robot",
        "robotics",
        "moon",
        "lunar",
        "isro",
        "slam",
        "nav2",
        "gazebo",
        "ros",
        "ros2",
        "astronaut"
    ],

    "mineguard": [
        "mineguard",
        "mining",
        "mine",
        "rockfall",
        "hazard",
        "gis",
        "geospatial",
        "insar",
        "dem",
        "dsm",
        "satellite",
        "leaflet",
        "earth engine",
        "google earth engine",
        "qgis"
    ],

    "placeme": [
        "placeme",
        "placement",
        "college",
        "resume",
        "crm",
        "student"
    ],

    "whispers of universe": [
        "whispers",
        "gita",
        "bhagavad",
        "spiritual",
        "mental health",
        "wellbeing"
    ],

    "moodscape lounge": [
        "moodscape",
        "playlist",
        "music",
        "songs",
        "emotion"
    ],

    "mahimaa portfolio": [
        "portfolio",
        "website",
        "avatar",
        "3d"
    ],

    "mahimaaai": [
        "mahimaaai",
        "digital twin",
        "chatbot",
        "llm",
        "rag",
        "gemini"
    ]
}


# =====================================================
# SCORE
# =====================================================

def score(item, question):

    question = question.lower()

    searchable = json.dumps(
        item,
        ensure_ascii=False
    ).lower()

    score = 0

    # Normal keyword matching
    for word in question.split():

        if len(word) < 3:
            continue

        if word in searchable:
            score += 2

    # Alias boosting
    if "name" in item:

        project_name = item["name"].lower()

        for key, aliases in PROJECT_ALIASES.items():

            if key in project_name:

                for alias in aliases:

                    if alias in question:

                        score += 8

    return score


# =====================================================
# SEARCH LIST
# =====================================================

def search(items, question, top_k=2):

    ranked = []

    for item in items:

        s = score(item, question)

        if s > 0:

            ranked.append((s, item))

    ranked.sort(
        reverse=True,
        key=lambda x: x[0]
    )

    return [i for _, i in ranked[:top_k]]


# =====================================================
# RETRIEVE
# =====================================================

def retrieve(question, knowledge):

    context = {}

    # ABOUT
    if "about" in knowledge:

        if any(x in question.lower() for x in [

            "who are you",

            "about",

            "introduce"

        ]):

            context["about"] = knowledge["about"]

    # PROJECTS
    if "projects" in knowledge:

        projects = knowledge["projects"]["projects"]

        result = search(projects, question)

        if result:

            context["projects"] = result

    # SKILLS
    if "skills" in knowledge:

        context["skills"] = knowledge["skills"]

    # RESEARCH
    if "research" in knowledge:

        context["research"] = knowledge["research"]

    # ACHIEVEMENTS
    if "achievements" in knowledge:

        context["achievements"] = knowledge["achievements"]

    # TIMELINE
    if "timeline" in knowledge:

        context["timeline"] = knowledge["timeline"]

    # EXPERIENCE
    if "experience" in knowledge:

        context["experience"] = knowledge["experience"]

    # PERSONALITY
    if "personality" in knowledge:

        context["personality"] = knowledge["personality"]

    # Fallback
    if not context:

        context["about"] = knowledge["about"]

    return json.dumps(
        context,
        indent=2,
        ensure_ascii=False
    )