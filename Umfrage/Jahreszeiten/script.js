// Fragen und Ergebnisse
const questions = [
    "Liebst du es, draußen zu sein?",
    "Magst du es, wenn es schneit?",
    "Bevorzugst du warme Temperaturen?",
    "Genießt du die Farben der Natur im Herbst?",
    "Magst du lange Sommerabende?",
    "Fühlst du dich wohl, wenn es regnet?",
    "Bevorzugst du blühende Blumen im Frühling?",
    "Freust du dich auf das Laub im Herbst?"
];

const results = {
    summer: 0,
    winter: 0,
    spring: 0,
    autumn: 0
};

const questionMappings = [
    { summer: 1, spring: 1 },
    { winter: 2 },
    { summer: 2 },
    { autumn: 2 }, // Erhöhte Gewichtung für Herbstfragen
    { summer: 2 },
    { winter: 3 },
    { spring: 2 },
    { autumn: 3 } // Erhöhte Gewichtung für Herbstfragen
];

let shuffledQuestions = [];
let currentQuestion = 0;

// Shuffle-Fragen
function shuffleQuestions() {
    shuffledQuestions = questions.map((q, index) => ({ question: q, mapping: questionMappings[index] }))
                                 .sort(() => Math.random() - 0.5);
}

// Frage beantworten
function answerQuestion(answer) {
    if (currentQuestion < shuffledQuestions.length) {
        const currentMapping = shuffledQuestions[currentQuestion].mapping;
        for (const season in currentMapping) {
            results[season] += answer ? currentMapping[season] : 0;
        }

        currentQuestion++;

        if (currentQuestion < shuffledQuestions.length) {
            askNextQuestion();
        } else {
            showResult();
        }
    }
}

// Nächste Frage anzeigen
function askNextQuestion() {
    const questionElement = document.getElementById('question');
    questionElement.textContent = shuffledQuestions[currentQuestion].question;

    document.getElementById('yes-button').classList.remove('hidden');
    document.getElementById('no-button').classList.remove('hidden');
    document.getElementById('start-button').classList.add('hidden');
}

// Ergebnis anzeigen
function showResult() {
    const maxSeason = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b);
    const resultElement = document.getElementById('result');
    resultElement.textContent = maxSeason.charAt(0).toUpperCase() + maxSeason.slice(1);

    const icons = {
        summer: 'img/summer-icon.png',
        winter: 'img/winter-icon.png',
        spring: 'img/spring-icon.png',
        autumn: 'img/autumn-icon.png'
    };

    const seasonIcon = document.getElementById('season-icon');
    seasonIcon.src = icons[maxSeason];
    seasonIcon.style.display = 'block';

    document.getElementById('result-container').classList.remove('hidden');
    document.getElementById('question-container').classList.add('hidden');

    confetti();
}

// Event-Listener für Start
document.getElementById('start-button').addEventListener('click', () => {
    shuffleQuestions();
    askNextQuestion();
});

document.getElementById('yes-button').addEventListener('click', () => {
    answerQuestion(true);
});

document.getElementById('no-button').addEventListener('click', () => {
    answerQuestion(false);
});
