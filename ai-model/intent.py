import re

DIRECT_INTENTS = {

    "about": [

        "who are you",
        "introduce yourself",
        "your name",
        "college",
        "graduation",
        "degree",
        "branch",
        "education",
        "where do you study"

    ],

    "skills": [

        "skills",

        "tech stack",

        "technologies",

        "programming languages",

        "languages",

        "frameworks"

    ],

    "projects": [

        "projects",

        "project",

        "what have you built",

        "portfolio",

        "mineguard",

        "vyombot",

        "placeme",

        "mahimaaai",

        "whispers",

        "moodscape"

    ],

    "research": [

        "research",

        "paper",

        "ieee",

        "conference"

    ],

    "achievements": [

        "achievement",

        "award",

        "winner",

        "hackathon",

        "sih"

    ]

}


def detect_intent(question):

    question = question.lower()

    for intent, keywords in DIRECT_INTENTS.items():

        for keyword in keywords:

            if keyword in question:

                return intent

    return None