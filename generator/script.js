document.addEventListener('DOMContentLoaded', () => {
    const questionsContainer = document.getElementById('questionsContainer');
    const addQuestionButton = document.getElementById('addQuestion');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const downloadButton = document.getElementById('downloadButton');
    const template = document.getElementById('questionTemplate');
    
    let questionCount = 0;
    
    function createOptionInput(number) {
        const div = document.createElement('div');
        div.className = 'option-input';
        
        const label = document.createElement('span');
        label.textContent = `選択肢 ${number}:`;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'glass-input';
        input.placeholder = `選択肢 ${number} を入力`;
        
        div.appendChild(label);
        div.appendChild(input);
        
        return div;
    }
    
    function updateOptionsCount(optionsContainer, count) {
        optionsContainer.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            optionsContainer.appendChild(createOptionInput(i));
        }
    }
    
    function addQuestion() {
        questionCount++;
        const clone = template.content.cloneNode(true);
        const questionCard = clone.querySelector('.question-card');
        
        questionCard.querySelector('.question-number').textContent = questionCount;
        
        const typeInputs = questionCard.querySelectorAll('input[name="type"]');
        const multipleChoiceSection = questionCard.querySelector('.multiple-choice-section');
        const textAnswerSection = questionCard.querySelector('.text-answer-section');
        const optionsSelect = questionCard.querySelector('.options-select');
        const optionsContainer = questionCard.querySelector('.options-container');
        const deleteButton = questionCard.querySelector('.delete-button');
        
        updateOptionsCount(optionsContainer, 4);
        
        typeInputs.forEach(input => {
            input.name = `type-${questionCount}`;
            input.addEventListener('change', () => {
                if (input.value === 'multiple') {
                    multipleChoiceSection.classList.remove('hidden');
                    textAnswerSection.classList.add('hidden');
                } else {
                    multipleChoiceSection.classList.add('hidden');
                    textAnswerSection.classList.remove('hidden');
                }
                updateProgress();
            });
        });
        
        optionsSelect.addEventListener('change', () => {
            updateOptionsCount(optionsContainer, parseInt(optionsSelect.value));
            updateProgress();
        });
        
        deleteButton.addEventListener('click', () => {
            anime({
                targets: questionCard,
                opacity: 0,
                translateY: 20,
                duration: 300,
                easing: 'easeOutQuad',
                complete: () => {
                    questionCard.remove();
                    updateProgress();
                }
            });
        });
        
        questionsContainer.appendChild(questionCard);
        
        anime({
            targets: questionCard,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: 'easeOutQuad'
        });
        
        updateProgress();
    }
    
    function updateProgress() {
        const questions = document.querySelectorAll('.question-card');
        let totalFields = 0;
        let filledFields = 0;
        
        questions.forEach(question => {
            const questionText = question.querySelector('.question-text').value;
            const type = question.querySelector('input[name^="type"]:checked').value;
            const hint = question.querySelector('.hint').value;
            const explanation = question.querySelector('.explanation').value;
            
            totalFields += 4; // Question, type, hint, explanation
            if (questionText) filledFields++;
            if (type) filledFields++;
            if (hint) filledFields++;
            if (explanation) filledFields++;
            
            if (type === 'multiple') {
                const options = question.querySelectorAll('.option-input input');
                const correctNumber = question.querySelector('.correct-number').value;
                
                totalFields += options.length + 1;
                options.forEach(option => {
                    if (option.value) filledFields++;
                });
                if (correctNumber) filledFields++;
            } else {
                const textAnswer = question.querySelector('.text-answer').value;
                totalFields += 1;
                if (textAnswer) filledFields++;
            }
        });
        
        const progress = totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
        
        if (questions.length > 0) {
            progressContainer.classList.remove('hidden');
            progressBar.style.width = `${progress}%`;
            
            if (progress === 100) {
                downloadButton.classList.remove('hidden');
            } else {
                downloadButton.classList.add('hidden');
            }
        } else {
            progressContainer.classList.add('hidden');
        }
    }
    
    function generateJSON() {
        const quizName = document.getElementById('quizName').value;
        const questions = document.querySelectorAll('.question-card');
        const jsonData = {
            name: quizName,
            questions: []
        };
        
        questions.forEach(question => {
            const questionText = question.querySelector('.question-text').value;
            const type = question.querySelector('input[name^="type"]:checked').value;
            const hint = question.querySelector('.hint').value;
            const explanation = question.querySelector('.explanation').value;
            
            const questionData = {
                question: questionText,
                type: type,
                hint: hint,
                explanation: explanation
            };
            
            if (type === 'multiple') {
                const options = Array.from(question.querySelectorAll('.option-input input'))
                    .map(input => input.value);
                const correct = parseInt(question.querySelector('.correct-number').value) - 1;
                
                questionData.options = options;
                questionData.correct = correct;
            } else {
                questionData.correct = question.querySelector('.text-answer').value;
            }
            
            jsonData.questions.push(questionData);
        });
        
        return jsonData;
    }
    
    function downloadJSON() {
        const jsonData = generateJSON();
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${jsonData.name || 'quiz'}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    addQuestionButton.addEventListener('click', addQuestion);
    downloadButton.addEventListener('click', downloadJSON);
    
    document.addEventListener('input', updateProgress);
    
    // Add first question automatically
    addQuestion();
});