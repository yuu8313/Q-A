let currentQuizSet = null;
let currentQuestionIndex = 0;
let quizMode = 'sequential';
let questionCount = null;
let questionOrder = [];



// クイズ設定ダイアログの表示
function showQuizSettingsDialog(setId) {
    const dialog = document.getElementById('quiz-settings-dialog');
    dialog.dataset.setId = setId;
    dialog.classList.add('active');
}

// クイズ設定の適用
function applyQuizSettings() {
    const setId = document.getElementById('quiz-settings-dialog').dataset.setId;
    const mode = document.querySelector('input[name="quiz-mode"]:checked').value;
    quizMode = mode;
    
    if (mode === 'custom') {
        const count = parseInt(document.getElementById('question-count').value);
        questionCount = count;
    } else {
        questionCount = null;
    }

    startQuiz(setId);
    document.getElementById('quiz-settings-dialog').classList.remove('active');
}

// クイズの開始
function startQuiz(setId) {
    currentQuizSet = quizData[setId];
    currentQuestionIndex = 0;
    
    // 問題の順序を設定
    const totalQuestions = currentQuizSet.questions.length;
    questionOrder = Array.from({length: totalQuestions}, (_, i) => i);
    
    if (quizMode === 'random' || quizMode === 'custom') {
        // Fisher-Yatesシャッフル
        for (let i = questionOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questionOrder[i], questionOrder[j]] = [questionOrder[j], questionOrder[i]];
        }
        
        if (quizMode === 'custom') {
            questionOrder = questionOrder.slice(0, questionCount);
        }
    }
    
    showScreen('quiz-screen');
    displayQuestion();
}

// JSONファイルのアップロード処理
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const newQuizData = JSON.parse(e.target.result);
                // 基本的なバリデーション
                if (typeof newQuizData === 'object' && newQuizData !== null) {
                    const setId = `custom_${Date.now()}`;
                    quizData[setId] = newQuizData;
                    
                    // 新しいクイズセットのUIを追加
                    const quizSets = document.querySelector('.quiz-sets');
                    const newSet = document.createElement('div');
                    newSet.className = 'quiz-set glass';
                    newSet.onclick = () => showQuizSettingsDialog(setId);
                    newSet.innerHTML = `
                        <i class="fas fa-file-upload"></i>
                        <h3>${newQuizData.name || 'カスタムクイズ'}</h3>
                        <p>アップロードされたクイズセット</p>
                    `;
                    quizSets.appendChild(newSet);
                }
            } catch (error) {
                alert('JSONファイルの形式が正しくありません。');
            }
        };
        reader.readAsText(file);
    }
}

// 画面の切り替え
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// 問題の表示
function displayQuestion() {
    const questionIndex = questionOrder[currentQuestionIndex];
    const question = currentQuizSet.questions[questionIndex];
    document.getElementById('question').textContent = question.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    if (question.type === 'multiple') {
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option glass';
            button.textContent = option;
            button.onclick = () => checkAnswer(index);
            optionsContainer.appendChild(button);
        });
    } else if (question.type === 'text') {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'text-answer glass';
        input.placeholder = '回答を入力してください';
        
        const submitButton = document.createElement('button');
        submitButton.className = 'submit-answer glass';
        submitButton.textContent = '回答する';
        submitButton.onclick = () => checkTextAnswer(input.value);
        
        optionsContainer.appendChild(input);
        optionsContainer.appendChild(submitButton);
    }
}

// ヒントの表示
document.getElementById('hint-btn').onclick = () => {
    const questionIndex = questionOrder[currentQuestionIndex];
    const question = currentQuizSet.questions[questionIndex];
    alert(question.hint);
};

// 選択式の回答チェック
function checkAnswer(selectedIndex) {
    const questionIndex = questionOrder[currentQuestionIndex];
    const question = currentQuizSet.questions[questionIndex];
    const isCorrect = selectedIndex === question.correct;
    showResult(isCorrect, question.explanation);
}

// 記述式の回答チェック
function checkTextAnswer(answer) {
    const questionIndex = questionOrder[currentQuestionIndex];
    const question = currentQuizSet.questions[questionIndex];
    const isCorrect = answer.trim().toLowerCase() === question.correct.toLowerCase();
    showResult(isCorrect, question.explanation);
}

// 結果の表示
function showResult(isCorrect, explanation) {
    showScreen('result-screen');
    
    const judgment = document.getElementById('judgment');
    judgment.textContent = isCorrect ? '○' : '×';
    judgment.style.color = isCorrect ? '#4CAF50' : '#F44336';

    document.getElementById('explanation').textContent = explanation;
}

// 次の問題へ
document.getElementById('next-btn').onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionOrder.length) {
        showScreen('quiz-screen');
        displayQuestion();
    } else {
        showScreen('home-screen');
        currentQuestionIndex = 0;
    }
};

// 問題数指定の表示制御
document.addEventListener('DOMContentLoaded', () => {
    const radioButtons = document.querySelectorAll('input[name="quiz-mode"]');
    const questionCountContainer = document.getElementById('question-count-container');

    radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
            questionCountContainer.style.display = 
                e.target.value === 'custom' ? 'block' : 'none';
        });
    });
});

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    // クイズセットのクリックイベントを設定
    document.querySelectorAll('.quiz-set').forEach(set => {
        const setId = set.dataset.setId;
        set.onclick = () => showQuizSettingsDialog(setId);
    });

    // ファイルアップロードの設定
    document.getElementById('quiz-upload').onchange = handleFileUpload;

    // 初期画面の表示
    showScreen('home-screen');
});