let questions = [];
let currentIndex = 0;
let score = 0;
let timeLeft = 0;
let timerInterval;

function startExam() {
    const input = document.getElementById('json-input').value;
    try {
        questions = JSON.parse(input);
        timeLeft = questions.length * 60; // 60 seconds per question
        document.getElementById('setup-screen').classList.add('hidden');
        document.getElementById('exam-screen').classList.remove('hidden');
        startTimer();
        showQuestion();
    } catch (e) {
        alert("Invalid JSON format. Please check your question paper format.");
    }
}

function showQuestion() {
    if (currentIndex >= questions.length) return finishExam();
    
    const q = questions[currentIndex];
    document.getElementById('progress').innerText = `Question ${currentIndex + 1}/${questions.length}`;
    document.getElementById('question-text').innerText = q.q;
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => handleAnswer(index);
        container.appendChild(btn);
    });
}

function handleAnswer(selectedIndex) {
    if (selectedIndex === questions[currentIndex].correct) {
        score++;
    }
    currentIndex++;
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        document.getElementById('timer').innerText = `Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (timeLeft <= 0) finishExam();
    }, 1000);
}

function finishExam() {
    clearInterval(timerInterval);
    document.getElementById('exam-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('score-text').innerText = `You scored ${score} out of ${questions.length}`;
}
