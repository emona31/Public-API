let currentSurvey = null;
let currentQuestionIndex = 0;
let answers = [];

const surveys = {
    season: {
        title: "Welche Jahreszeit passt zu dir?",
        questions: [
            { question: "Wie fühlst du dich bei Regen?", answers: ["Glücklich", "Neutral", "Traurig"] },
            { question: "Was machst du gern im Sommer?", answers: ["Schwimmen", "Lesen", "Reisen"] },
            { question: "Welche Farbe gefällt dir am besten?", answers: ["Blau", "Grün", "Orange"] },
            { question: "Wie stehst du zu Schnee?", answers: ["Liebe es", "Ist okay", "Mag ich nicht"] },
        ],
        results: ["Frühling", "Sommer", "Herbst", "Winter"]
    },
    style: {
        title: "Welcher Style bist du?",
        questions: [
            { question: "Welche Farbe dominiert deinen Kleiderschrank?", answers: ["Schwarz", "Weiß", "Bunt"] },
            { question: "Wie kleidest du dich gerne?", answers: ["Elegant", "Sportlich", "Leger"] },
            { question: "Welches Accessoire passt zu dir?", answers: ["Uhr", "Sonnenbrille", "Tasche"] },
        ],
        results: ["Elegant", "Sportlich", "Casual"]
    },
    Hobby: {
        title: "Welches Hobby passt zu dir?",
        questions: [
            { question: "Welche Farbe dominiert deinen Kleiderschrank?", answers: ["Schwarz", "Weiß", "Bunt"] },
            { question: "Wie kleidest du dich gerne?", answers: ["Elegant", "Sportlich", "Leger"] },
            { question: "Welches Accessoire passt zu dir?", answers: ["Uhr", "Sonnenbrille", "Tasche"] },
        ],
        results: ["Elegant", "Sportlich", "Casual"]
    }
    
    // Weitere Umfragen können hier hinzugefügt werden
};

function goToStartPage() {
    const username = document.getElementById('username-input').value;
    if (!username) {
        alert("Bitte gib deinen Namen ein!");
        return;
    }
    document.querySelector('.username-page').style.display = 'none';
    document.querySelector('.start-page').style.display = 'block';
    document.getElementById('user-name').innerText = username;
}

function startSurvey(surveyId) {
    currentSurvey = surveys[surveyId];
    currentQuestionIndex = 0;
    answers = [];
    document.querySelector('.start-page').style.display = 'none';
    document.querySelector('.survey-container').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const questionData = currentSurvey.questions[currentQuestionIndex];
    document.getElementById('survey-title').innerText = currentSurvey.title;
    document.querySelector('.question').innerText = questionData.question;

    const answersContainer = document.querySelector('.answers');
    answersContainer.innerHTML = '';

    questionData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });

    document.querySelector('.next-button').style.display = 'none';
}

function selectAnswer(index) {
    answers.push(index);
    document.querySelector('.next-button').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentSurvey.questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const username = document.getElementById('username-input').value;
    const result = currentSurvey.results[Math.floor(Math.random() * currentSurvey.results.length)];

    document.querySelector('.survey-container').style.display = 'none';
    document.querySelector('.result-page').style.display = 'block';

    document.getElementById('result-text').innerText = `${username}, dein Ergebnis ist: ${result}!`;
    confetti();
}

function confetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function restart() {
    document.querySelector('.result-page').style.display = 'none';
    document.querySelector('.start-page').style.display = 'block';
}