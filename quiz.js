/**
 * Data Science Quiz - Main Logic
 * Handles quiz flow, randomization, scoring, topic selection, stats tracking, and UI updates
 */

const STORAGE_KEY = 'ds_quiz_history';

class Quiz {
    constructor(questions, numQuestions = 10) {
        this.allQuestions = questions;
        this.numQuestions = numQuestions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedQuestions = [];
        this.userAnswers = [];
        this.answered = false;
        this.selectedTopics = new Set();
        
        this.init();
    }
    
    init() {
        // DOM Elements
        this.startScreen = document.getElementById('start-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');
        
        this.startBtn = document.getElementById('start-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.clearStatsBtn = document.getElementById('clear-stats-btn');
        
        this.questionCounter = document.getElementById('question-counter');
        this.topicBadge = document.getElementById('topic-badge');
        this.progressFill = document.getElementById('progress-fill');
        this.questionText = document.getElementById('question-text');
        this.questionImage = document.getElementById('question-image');
        this.choicesContainer = document.getElementById('choices');
        
        this.scoreNumber = document.getElementById('score-number');
        this.scoreMessage = document.getElementById('score-message');
        this.scoreTotal = document.querySelector('.score-total');
        this.reviewList = document.getElementById('review-list');
        
        // Stats elements
        this.rollingAverageEl = document.getElementById('rolling-average');
        this.quizzesTakenEl = document.getElementById('quizzes-taken');
        this.totalCorrectEl = document.getElementById('total-correct');
        
        // Topic selector elements
        this.topicCheckboxes = document.getElementById('topic-checkboxes');
        this.selectAllBtn = document.getElementById('select-all-btn');
        this.deselectAllBtn = document.getElementById('deselect-all-btn');
        this.topicWarning = document.getElementById('topic-warning');
        
        // Initialize topic selector
        this.initTopicSelector();
        
        // Event Listeners
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.selectAllBtn.addEventListener('click', () => this.selectAllTopics());
        this.deselectAllBtn.addEventListener('click', () => this.deselectAllTopics());
        
        if (this.clearStatsBtn) {
            this.clearStatsBtn.addEventListener('click', () => this.clearStats());
        }
    }
    
    // ==========================================
    // STATS / LOCAL STORAGE METHODS
    // ==========================================
    
    /**
     * Get quiz history from localStorage
     */
    getHistory() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error reading quiz history:', e);
            return [];
        }
    }
    
    /**
     * Save quiz result to history
     */
    saveResult(score, total) {
        try {
            const history = this.getHistory();
            history.push({
                score: score,
                total: total,
                percentage: (score / total) * 100,
                date: new Date().toISOString(),
                topics: Array.from(this.selectedTopics)
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        } catch (e) {
            console.error('Error saving quiz result:', e);
        }
    }
    
    /**
     * Calculate stats from history
     */
    getStats() {
        const history = this.getHistory();
        
        if (history.length === 0) {
            return {
                rollingAverage: null,
                quizzesTaken: 0,
                totalCorrect: 0,
                totalQuestions: 0
            };
        }
        
        const totalCorrect = history.reduce((sum, h) => sum + h.score, 0);
        const totalQuestions = history.reduce((sum, h) => sum + h.total, 0);
        const rollingAverage = (totalCorrect / totalQuestions) * 100;
        
        return {
            rollingAverage: rollingAverage,
            quizzesTaken: history.length,
            totalCorrect: totalCorrect,
            totalQuestions: totalQuestions
        };
    }
    
    /**
     * Update stats display in results screen
     */
    updateStatsDisplay() {
        const stats = this.getStats();
        
        if (this.rollingAverageEl) {
            this.rollingAverageEl.textContent = stats.rollingAverage !== null 
                ? `${stats.rollingAverage.toFixed(1)}%` 
                : '--%';
        }
        
        if (this.quizzesTakenEl) {
            this.quizzesTakenEl.textContent = stats.quizzesTaken;
        }
        
        if (this.totalCorrectEl) {
            this.totalCorrectEl.textContent = `${stats.totalCorrect}/${stats.totalQuestions}`;
        }
    }
    
    /**
     * Clear all stats history
     */
    clearStats() {
        if (confirm('Are you sure you want to clear all quiz history? This cannot be undone.')) {
            try {
                localStorage.removeItem(STORAGE_KEY);
                this.updateStatsDisplay();
            } catch (e) {
                console.error('Error clearing stats:', e);
            }
        }
    }
    
    // ==========================================
    // TOPIC SELECTOR METHODS
    // ==========================================
    
    /**
     * Initialize topic selector with checkboxes
     */
    initTopicSelector() {
        // Get unique topics and count questions per topic
        const topicCounts = {};
        this.allQuestions.forEach(q => {
            topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
        });
        
        // Sort topics alphabetically
        const topics = Object.keys(topicCounts).sort();
        
        // Create checkboxes
        this.topicCheckboxes.innerHTML = '';
        topics.forEach(topic => {
            const label = document.createElement('label');
            label.className = 'topic-checkbox selected';
            label.innerHTML = `
                <input type="checkbox" value="${topic}" checked>
                <span class="check-icon"></span>
                <span class="topic-name">${topic}</span>
                <span class="topic-count">(${topicCounts[topic]})</span>
            `;
            
            const checkbox = label.querySelector('input');
            checkbox.addEventListener('change', () => {
                this.toggleTopic(topic, checkbox.checked, label);
            });
            
            label.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    e.preventDefault();
                    checkbox.checked = !checkbox.checked;
                    this.toggleTopic(topic, checkbox.checked, label);
                }
            });
            
            this.topicCheckboxes.appendChild(label);
            this.selectedTopics.add(topic);
        });
    }
    
    /**
     * Toggle a topic selection
     */
    toggleTopic(topic, isSelected, label) {
        if (isSelected) {
            this.selectedTopics.add(topic);
            label.classList.add('selected');
        } else {
            this.selectedTopics.delete(topic);
            label.classList.remove('selected');
        }
        this.topicWarning.classList.add('hidden');
    }
    
    /**
     * Select all topics
     */
    selectAllTopics() {
        const checkboxes = this.topicCheckboxes.querySelectorAll('.topic-checkbox');
        checkboxes.forEach(label => {
            const checkbox = label.querySelector('input');
            const topic = checkbox.value;
            checkbox.checked = true;
            this.selectedTopics.add(topic);
            label.classList.add('selected');
        });
        this.topicWarning.classList.add('hidden');
    }
    
    /**
     * Deselect all topics
     */
    deselectAllTopics() {
        const checkboxes = this.topicCheckboxes.querySelectorAll('.topic-checkbox');
        checkboxes.forEach(label => {
            const checkbox = label.querySelector('input');
            checkbox.checked = false;
            label.classList.remove('selected');
        });
        this.selectedTopics.clear();
    }
    
    // ==========================================
    // QUIZ FLOW METHODS
    // ==========================================
    
    /**
     * Shuffle array using Fisher-Yates algorithm
     */
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    
    /**
     * Select random questions from the pool based on selected topics
     */
    selectQuestions() {
        // Filter by selected topics
        const filteredQuestions = this.allQuestions.filter(q => 
            this.selectedTopics.has(q.topic)
        );
        
        const shuffled = this.shuffle(filteredQuestions);
        const actualNum = Math.min(this.numQuestions, shuffled.length);
        this.selectedQuestions = shuffled.slice(0, actualNum);
        
        // Update the actual number for display
        this.actualNumQuestions = actualNum;
    }
    
    /**
     * Switch between screens
     */
    showScreen(screen) {
        [this.startScreen, this.quizScreen, this.resultsScreen].forEach(s => {
            s.classList.remove('active');
        });
        screen.classList.add('active');
    }
    
    /**
     * Start the quiz
     */
    startQuiz() {
        // Validate topic selection
        if (this.selectedTopics.size === 0) {
            this.topicWarning.classList.remove('hidden');
            return;
        }
        
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.selectQuestions();
        
        // Update score total display
        if (this.scoreTotal) {
            this.scoreTotal.textContent = `/${this.actualNumQuestions}`;
        }
        
        this.showScreen(this.quizScreen);
        this.displayQuestion();
    }
    
    /**
     * Display the current question
     */
    displayQuestion() {
        this.answered = false;
        this.nextBtn.disabled = true;
        
        const question = this.selectedQuestions[this.currentQuestionIndex];
        
        // Update header
        this.questionCounter.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.actualNumQuestions}`;
        this.topicBadge.textContent = question.topic;
        this.progressFill.style.width = `${((this.currentQuestionIndex) / this.actualNumQuestions) * 100}%`;
        
        // Update question text
        this.questionText.innerHTML = question.question;
        
        // Update image if present
        if (question.image) {
            this.questionImage.innerHTML = `<img src="${question.image}" alt="Question diagram">`;
        } else {
            this.questionImage.innerHTML = '';
        }
        
        // Create shuffled choices
        const allChoices = [
            { text: question.answer, isCorrect: true },
            ...question.alternatives.map(alt => ({ text: alt, isCorrect: false }))
        ];
        const shuffledChoices = this.shuffle(allChoices);
        
        // Store correct index for this display
        question.shuffledChoices = shuffledChoices;
        
        // Render choices
        this.choicesContainer.innerHTML = '';
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        
        shuffledChoices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice';
            btn.innerHTML = `
                <span class="choice-letter">${letters[index]}</span>
                <span class="choice-text">${choice.text}</span>
            `;
            btn.addEventListener('click', () => this.selectAnswer(btn, choice, question));
            this.choicesContainer.appendChild(btn);
        });
        
        // Re-render MathJax
        if (window.MathJax) {
            MathJax.typesetPromise([this.questionText, this.choicesContainer]).catch(err => {
                console.log('MathJax rendering:', err);
            });
        }
    }
    
    /**
     * Handle answer selection
     */
    selectAnswer(button, choice, question) {
        if (this.answered) return;
        this.answered = true;
        
        // Disable all choices
        const allChoices = this.choicesContainer.querySelectorAll('.choice');
        allChoices.forEach(c => c.classList.add('disabled'));
        
        // Mark selected answer
        button.classList.add('selected');
        
        // Show correct/incorrect
        if (choice.isCorrect) {
            button.classList.remove('selected');
            button.classList.add('correct');
            this.score++;
        } else {
            button.classList.remove('selected');
            button.classList.add('incorrect');
            
            // Highlight the correct answer
            allChoices.forEach((c, idx) => {
                if (question.shuffledChoices[idx].isCorrect) {
                    c.classList.add('correct');
                }
            });
        }
        
        // Store user's answer
        this.userAnswers.push({
            question: question,
            userAnswer: choice.text,
            wasCorrect: choice.isCorrect
        });
        
        // Enable next button
        this.nextBtn.disabled = false;
        
        // Update button text if last question
        if (this.currentQuestionIndex === this.actualNumQuestions - 1) {
            this.nextBtn.querySelector('span:first-child').textContent = 'See Results';
        }
    }
    
    /**
     * Move to next question or show results
     */
    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.actualNumQuestions) {
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }
    
    /**
     * Display results screen
     */
    showResults() {
        this.showScreen(this.resultsScreen);
        
        // Save this quiz result to history (only completed quizzes count)
        this.saveResult(this.score, this.actualNumQuestions);
        
        // Update score
        this.scoreNumber.textContent = this.score;
        if (this.scoreTotal) {
            this.scoreTotal.textContent = `/${this.actualNumQuestions}`;
        }
        
        // Score message
        const percentage = (this.score / this.actualNumQuestions) * 100;
        let message = '';
        if (percentage === 100) {
            message = 'Perfect score! Outstanding work! 🎯';
        } else if (percentage >= 80) {
            message = 'Excellent! You really know your stuff!';
        } else if (percentage >= 60) {
            message = 'Good job! Keep studying to improve!';
        } else if (percentage >= 40) {
            message = 'Not bad, but there\'s room to grow.';
        } else {
            message = 'Keep learning! You\'ll get there!';
        }
        this.scoreMessage.textContent = message;
        
        // Update rolling average stats
        this.updateStatsDisplay();
        
        // Progress to 100%
        this.progressFill.style.width = '100%';
        
        // Build review list
        this.reviewList.innerHTML = '';
        
        this.userAnswers.forEach((answer, index) => {
            const item = document.createElement('div');
            item.className = 'review-item';
            
            const statusIcon = answer.wasCorrect ? '✓' : '✗';
            const statusClass = answer.wasCorrect ? 'correct' : 'incorrect';
            
            // Truncate question for header
            const questionPreview = answer.question.question.length > 80 
                ? answer.question.question.substring(0, 80) + '...'
                : answer.question.question;
            
            item.innerHTML = `
                <div class="review-header">
                    <span class="review-status ${statusClass}">${statusIcon}</span>
                    <span class="review-question">${index + 1}. ${questionPreview}</span>
                    <span class="review-toggle">▼</span>
                </div>
                <div class="review-body">
                    ${answer.question.image ? `<div class="review-image"><img src="${answer.question.image}" alt="Question diagram"></div>` : ''}
                    <div class="review-answers">
                        ${answer.wasCorrect 
                            ? `<div class="review-answer user-correct">
                                    <span class="review-label">Your answer:</span>
                                    <span>${answer.userAnswer}</span>
                               </div>`
                            : `<div class="review-answer user-incorrect">
                                    <span class="review-label">Your answer:</span>
                                    <span>${answer.userAnswer}</span>
                               </div>
                               <div class="review-answer actual-correct">
                                    <span class="review-label">Correct:</span>
                                    <span>${answer.question.answer}</span>
                               </div>`
                        }
                    </div>
                    <div class="review-explanation">
                        <div class="review-explanation-label">Explanation</div>
                        <p>${answer.question.explanation}</p>
                    </div>
                </div>
            `;
            
            // Toggle expand/collapse
            const header = item.querySelector('.review-header');
            header.addEventListener('click', () => {
                item.classList.toggle('expanded');
                // Re-render MathJax when expanded
                if (item.classList.contains('expanded') && window.MathJax) {
                    MathJax.typesetPromise([item]).catch(err => console.log('MathJax:', err));
                }
            });
            
            this.reviewList.appendChild(item);
        });
        
        // Re-render MathJax for visible content
        if (window.MathJax) {
            MathJax.typesetPromise([this.reviewList]).catch(err => {
                console.log('MathJax rendering:', err);
            });
        }
    }
    
    /**
     * Restart the quiz - go back to start screen with previous topic selection
     */
    restartQuiz() {
        // Reset next button text
        this.nextBtn.querySelector('span:first-child').textContent = 'Next Question';
        // Reset progress bar
        this.progressFill.style.width = '0%';
        // Go back to start screen (topics are already pre-selected)
        this.showScreen(this.startScreen);
    }
}

// Initialize quiz when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if questions are loaded
    if (typeof QUESTIONS !== 'undefined' && QUESTIONS.length > 0) {
        window.quiz = new Quiz(QUESTIONS, 10);
    } else {
        console.error('No questions loaded! Make sure questions.js is included.');
    }
});
