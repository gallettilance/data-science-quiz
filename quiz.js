/**
 * Data Science Course & Quiz - Main Logic
 * Handles course progression, video lessons, quiz flow, and progress tracking
 */

const STORAGE_KEY = 'ds_quiz_history';
const COURSE_PROGRESS_KEY = 'ds_course_progress';
const ANALYTICS_URL = 'https://script.google.com/macros/s/AKfycbwhE7uBPqsR6e_k3mUdUrwVZUge2pBAfzD-SmoyULGa35kbmY5ohu6mBJHtb783FSjd/exec';

class DataScienceCourse {
    constructor(questions, curriculum) {
        this.allQuestions = questions;
        this.curriculum = curriculum;
        
        // Quiz state
        this.currentMode = null; // 'course' or 'practice'
        this.currentLesson = null;
        this.numQuestions = 10;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedQuestions = [];
        this.userAnswers = [];
        this.answered = false;
        this.selectedTopics = new Set();
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadCourseProgress();
        this.initTopicSelector();
        this.updateModeScreenPreviews();
        this.loadYouTubeAPI();
    }
    
    // ==========================================
    // YOUTUBE API
    // ==========================================
    
    loadYouTubeAPI() {
        // Load the YouTube IFrame API script
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(tag, firstScript);
        
        // Set up the callback for when API is ready
        window.onYouTubeIframeAPIReady = () => {
            this.ytApiReady = true;
        };
    }
    
    createYouTubePlayer(videoId) {
        // Destroy existing player if any
        if (this.ytPlayer) {
            this.ytPlayer.destroy();
            this.ytPlayer = null;
        }
        
        // Clear any existing watch interval
        if (this.videoWatchInterval) {
            clearInterval(this.videoWatchInterval);
            this.videoWatchInterval = null;
        }
        
        // Hide placeholder, show player container
        this.videoPlaceholder.style.display = 'none';
        this.youtubePlayerContainer.style.display = 'block';
        
        // Create new player
        this.ytPlayer = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                'autoplay': 1,
                'rel': 0,
                'modestbranding': 1
            },
            events: {
                'onStateChange': (event) => this.onPlayerStateChange(event)
            }
        });
    }
    
    onPlayerStateChange(event) {
        // YT.PlayerState.PLAYING = 1
        if (event.data === 1) {
            this.startWatchTracking();
        } else {
            this.stopWatchTracking();
        }
    }
    
    startWatchTracking() {
        if (this.videoWatchInterval) return;
        
        this.videoWatchInterval = setInterval(() => {
            if (!this.ytPlayer || !this.currentLesson) return;
            
            const currentTime = this.ytPlayer.getCurrentTime();
            const duration = this.ytPlayer.getDuration();
            
            if (duration > 0) {
                const watchedPercent = (currentTime / duration) * 100;
                
                // Mark as watched if they've watched 80%+ of the video
                if (watchedPercent >= 80) {
                    this.markVideoWatched(this.currentLesson.id);
                    this.stopWatchTracking();
                }
            }
        }, 2000); // Check every 2 seconds
    }
    
    stopWatchTracking() {
        if (this.videoWatchInterval) {
            clearInterval(this.videoWatchInterval);
            this.videoWatchInterval = null;
        }
    }
    
    markVideoWatched(lessonId) {
        const progress = this.getCourseProgress();
        if (!progress.videosWatched.includes(lessonId)) {
            progress.videosWatched.push(lessonId);
            this.saveCourseProgress(progress);
            this.updateLessonProgress();
        }
    }
    
    isVideoWatched(lessonId) {
        const progress = this.getCourseProgress();
        return progress.videosWatched && progress.videosWatched.includes(lessonId);
    }
    
    isQuizPassed(lessonId) {
        const progress = this.getCourseProgress();
        return progress.completed && progress.completed.includes(lessonId);
    }
    
    updateLessonProgress() {
        if (!this.currentLesson) return;
        
        const videoWatched = this.isVideoWatched(this.currentLesson.id);
        const quizPassed = this.isQuizPassed(this.currentLesson.id);
        
        // Update video step
        if (videoWatched) {
            this.stepVideo.classList.add('completed');
        } else {
            this.stepVideo.classList.remove('completed');
        }
        
        // Update quiz step
        if (quizPassed) {
            this.stepQuiz.classList.add('completed');
        } else {
            this.stepQuiz.classList.remove('completed');
        }
    }
    
    // ==========================================
    // DOM CACHING
    // ==========================================
    
    cacheElements() {
        // Screens
        this.modeScreen = document.getElementById('mode-screen');
        this.courseScreen = document.getElementById('course-screen');
        this.lessonScreen = document.getElementById('lesson-screen');
        this.practiceScreen = document.getElementById('practice-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');
        
        // Mode selection
        this.courseModeCard = document.getElementById('course-mode-card');
        this.practiceModeCard = document.getElementById('practice-mode-card');
        this.courseProgressPreview = document.getElementById('course-progress-preview');
        this.practiceStatsPreview = document.getElementById('practice-stats-preview');
        
        // Course overview
        this.backToModeBtn = document.getElementById('back-to-mode');
        this.courseProgressFill = document.getElementById('course-progress-fill');
        this.courseProgressText = document.getElementById('course-progress-text');
        this.curriculumList = document.getElementById('curriculum-list');
        
        // Lesson screen
        this.backToCourseBtn = document.getElementById('back-to-course');
        this.lessonNumber = document.getElementById('lesson-number');
        this.lessonTitle = document.getElementById('lesson-title');
        this.lessonDescription = document.getElementById('lesson-description');
        this.videoPlaceholder = document.getElementById('video-placeholder');
        this.youtubePlayerContainer = document.getElementById('youtube-player');
        this.takeQuizBtn = document.getElementById('take-quiz-btn');
        this.stepVideo = document.getElementById('step-video');
        this.stepQuiz = document.getElementById('step-quiz');
        
        // YouTube player state
        this.ytPlayer = null;
        this.ytApiReady = false;
        this.videoWatchInterval = null;
        
        // Practice mode
        this.backToModePracticeBtn = document.getElementById('back-to-mode-practice');
        this.topicCheckboxes = document.getElementById('topic-checkboxes');
        this.selectAllBtn = document.getElementById('select-all-btn');
        this.deselectAllBtn = document.getElementById('deselect-all-btn');
        this.topicWarning = document.getElementById('topic-warning');
        this.startBtn = document.getElementById('start-btn');
        
        // Quiz screen
        this.quitQuizBtn = document.getElementById('quit-quiz-btn');
        this.questionCounter = document.getElementById('question-counter');
        this.topicBadge = document.getElementById('topic-badge');
        this.progressFill = document.getElementById('progress-fill');
        this.questionText = document.getElementById('question-text');
        this.questionImage = document.getElementById('question-image');
        this.choicesContainer = document.getElementById('choices');
        this.nextBtn = document.getElementById('next-btn');
        
        // Results screen
        this.scoreNumber = document.getElementById('score-number');
        this.scoreMessage = document.getElementById('score-message');
        this.scoreTotal = document.querySelector('.score-total');
        this.topicCompleteMsg = document.getElementById('topic-complete-msg');
        this.rollingAverageEl = document.getElementById('rolling-average');
        this.quizzesTakenEl = document.getElementById('quizzes-taken');
        this.totalCorrectEl = document.getElementById('total-correct');
        this.reviewList = document.getElementById('review-list');
        this.restartBtn = document.getElementById('restart-btn');
        this.clearStatsBtn = document.getElementById('clear-stats-btn');
    }
    
    // ==========================================
    // EVENT BINDINGS
    // ==========================================
    
    bindEvents() {
        // Mode selection
        this.courseModeCard.addEventListener('click', () => this.selectCourseMode());
        this.practiceModeCard.addEventListener('click', () => this.selectPracticeMode());
        
        // Course navigation
        this.backToModeBtn.addEventListener('click', () => this.showScreen(this.modeScreen));
        this.backToCourseBtn.addEventListener('click', () => this.showScreen(this.courseScreen));
        this.backToModePracticeBtn.addEventListener('click', () => this.showScreen(this.modeScreen));
        
        // Video
        this.videoPlaceholder.addEventListener('click', () => this.loadVideo());
        this.takeQuizBtn.addEventListener('click', () => this.startLessonQuiz());
        
        // Practice mode
        this.selectAllBtn.addEventListener('click', () => this.selectAllTopics());
        this.deselectAllBtn.addEventListener('click', () => this.deselectAllTopics());
        this.startBtn.addEventListener('click', () => this.startPracticeQuiz());
        
        // Quiz
        this.quitQuizBtn.addEventListener('click', () => this.quitQuiz());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.handleRestart());
        
        // Stats
        if (this.clearStatsBtn) {
            this.clearStatsBtn.addEventListener('click', () => this.clearStats());
        }
    }
    
    // ==========================================
    // SCREEN MANAGEMENT
    // ==========================================
    
    showScreen(screen) {
        [this.modeScreen, this.courseScreen, this.lessonScreen, 
         this.practiceScreen, this.quizScreen, this.resultsScreen].forEach(s => {
            if (s) s.classList.remove('active');
        });
        screen.classList.add('active');
    }
    
    // ==========================================
    // MODE SELECTION
    // ==========================================
    
    updateModeScreenPreviews() {
        // Course progress preview - only count lessons with videos
        // Fully complete = video watched AND quiz passed
        const progress = this.getCourseProgress();
        const lessonsWithVideos = this.curriculum.filter(l => this.hasVideo(l));
        const fullyCompleted = lessonsWithVideos.filter(lesson => {
            const quizPassed = progress.completed && progress.completed.includes(lesson.id);
            const videoWatched = progress.videosWatched && progress.videosWatched.includes(lesson.id);
            return quizPassed && videoWatched;
        });
        const completedCount = fullyCompleted.length;
        const totalCount = lessonsWithVideos.length;
        const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
        
        const progressPreview = this.courseProgressPreview;
        if (progressPreview) {
            progressPreview.querySelector('.progress-text').textContent = 
                totalCount > 0 
                    ? `${completedCount} of ${totalCount} topics completed`
                    : 'Coming soon';
            progressPreview.querySelector('.progress-fill-mini').style.width = 
                `${progressPercent}%`;
        }
        
        // Practice stats preview
        const stats = this.getStats();
        const statsPreview = this.practiceStatsPreview;
        if (statsPreview) {
            statsPreview.querySelector('.stats-text').textContent = 
                stats.rollingAverage !== null 
                    ? `Rolling average: ${stats.rollingAverage.toFixed(1)}%`
                    : 'Rolling average: --%';
        }
    }
    
    selectCourseMode() {
        this.currentMode = 'course';
        this.renderCurriculumList();
        this.showScreen(this.courseScreen);
    }
    
    selectPracticeMode() {
        this.currentMode = 'practice';
        this.showScreen(this.practiceScreen);
    }
    
    // ==========================================
    // COURSE PROGRESS (localStorage)
    // ==========================================
    
    getCourseProgress() {
        try {
            const data = localStorage.getItem(COURSE_PROGRESS_KEY);
            const defaults = { completed: [], currentLesson: 1, videosWatched: [] };
            return data ? { ...defaults, ...JSON.parse(data) } : defaults;
        } catch (e) {
            console.error('Error reading course progress:', e);
            return { completed: [], currentLesson: 1, videosWatched: [] };
        }
    }
    
    saveCourseProgress(progress) {
        try {
            localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(progress));
        } catch (e) {
            console.error('Error saving course progress:', e);
        }
    }
    
    loadCourseProgress() {
        this.courseProgress = this.getCourseProgress();
    }
    
    markLessonComplete(lessonId) {
        const progress = this.getCourseProgress();
        if (!progress.completed.includes(lessonId)) {
            progress.completed.push(lessonId);
        }
        // Move to next lesson if this was the current one
        if (lessonId === progress.currentLesson && lessonId < this.curriculum.length) {
            progress.currentLesson = lessonId + 1;
        }
        this.saveCourseProgress(progress);
        this.courseProgress = progress;
    }
    
    // ==========================================
    // COURSE OVERVIEW
    // ==========================================
    
    hasVideo(lesson) {
        return lesson.videoId && lesson.videoId !== 'YOUR_VIDEO_ID_HERE';
    }
    
    renderCurriculumList() {
        const progress = this.getCourseProgress();
        
        // Count only lessons with videos for progress
        // A lesson is fully complete when both video is watched AND quiz is passed
        const lessonsWithVideos = this.curriculum.filter(l => this.hasVideo(l));
        const fullyCompleted = lessonsWithVideos.filter(lesson => {
            const quizPassed = progress.completed && progress.completed.includes(lesson.id);
            const videoWatched = progress.videosWatched && progress.videosWatched.includes(lesson.id);
            return quizPassed && videoWatched;
        });
        const completedCount = fullyCompleted.length;
        const totalCount = lessonsWithVideos.length;
        
        // Update progress bar
        const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
        this.courseProgressFill.style.width = `${progressPercent}%`;
        this.courseProgressText.textContent = totalCount > 0 
            ? `${completedCount} of ${totalCount} available topics completed`
            : 'No videos available yet';
        
        // Render curriculum items
        this.curriculumList.innerHTML = '';
        
        this.curriculum.forEach((lesson, index) => {
            const isQuizPassed = progress.completed && progress.completed.includes(lesson.id);
            const isVideoWatched = progress.videosWatched && progress.videosWatched.includes(lesson.id);
            const isCompleted = isQuizPassed && isVideoWatched; // Both required for full completion
            const isCurrent = lesson.id === progress.currentLesson;
            const isLocked = !this.hasVideo(lesson);
            
            const item = document.createElement('div');
            item.className = 'curriculum-item';
            if (isCompleted && !isLocked) item.classList.add('completed');
            if (isCurrent && !isCompleted && !isLocked) item.classList.add('current');
            if (isLocked) item.classList.add('locked');
            
            let statusText = '';
            let statusIcons = '';
            if (isLocked) {
                statusText = '';
            } else if (isCompleted) {
                statusText = '✓ Complete';
            } else {
                // Show progress icons
                const videoIcon = isVideoWatched ? '📹✓' : '📹';
                const quizIcon = isQuizPassed ? '📝✓' : '📝';
                statusIcons = `<span class="curriculum-icons">${videoIcon} ${quizIcon}</span>`;
                if (isCurrent) {
                    statusText = 'Continue';
                }
            }
            
            item.innerHTML = `
                <span class="curriculum-number">${isCompleted && !isLocked ? '✓' : lesson.id}</span>
                <div class="curriculum-info">
                    <div class="curriculum-title">${lesson.title}</div>
                    <div class="curriculum-topic">${lesson.topic}</div>
                </div>
                ${isLocked 
                    ? '<span class="lock-icon">🔒</span>' 
                    : (isCompleted 
                        ? `<span class="curriculum-status">${statusText}</span>`
                        : `<span class="curriculum-progress">${statusIcons}${statusText ? `<span class="curriculum-status">${statusText}</span>` : ''}</span>`)}
            `;
            
            if (!isLocked) {
                item.addEventListener('click', () => this.openLesson(lesson));
            }
            
            this.curriculumList.appendChild(item);
        });
    }
    
    // ==========================================
    // VIDEO LESSON
    // ==========================================
    
    openLesson(lesson) {
        this.currentLesson = lesson;
        
        this.lessonNumber.textContent = `Lesson ${lesson.id}`;
        this.lessonTitle.textContent = lesson.title;
        this.lessonDescription.textContent = lesson.description;
        
        // Reset video state
        if (this.ytPlayer) {
            this.ytPlayer.destroy();
            this.ytPlayer = null;
        }
        this.stopWatchTracking();
        
        // Reset placeholder
        this.videoPlaceholder.innerHTML = `
            <span class="play-icon">▶</span>
            <span>Click to load video</span>
        `;
        this.videoPlaceholder.style.display = '';
        this.youtubePlayerContainer.style.display = 'none';
        this.youtubePlayerContainer.innerHTML = '';
        
        // Update lesson progress indicators
        this.updateLessonProgress();
        
        this.showScreen(this.lessonScreen);
    }
    
    loadVideo() {
        if (!this.currentLesson) return;
        
        if (this.hasVideo(this.currentLesson)) {
            if (this.ytApiReady) {
                this.createYouTubePlayer(this.currentLesson.videoId);
            } else {
                // API not ready yet, use fallback iframe
                this.videoPlaceholder.style.display = 'none';
                this.youtubePlayerContainer.style.display = 'block';
                this.youtubePlayerContainer.innerHTML = `
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/${this.currentLesson.videoId}?autoplay=1"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                `;
            }
        } else {
            // No video configured - show message
            this.videoPlaceholder.innerHTML = `
                <span class="play-icon">📹</span>
                <span>Video not yet configured</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Add video ID to curriculum.js</span>
            `;
        }
    }
    
    // ==========================================
    // QUIZ LOGIC
    // ==========================================
    
    startLessonQuiz() {
        // Set up quiz for the current lesson's topic
        this.selectedTopics = new Set([this.currentLesson.topic]);
        this.selectQuestions();
        this.startQuiz();
    }
    
    startPracticeQuiz() {
        // Validate topic selection
        if (this.selectedTopics.size === 0) {
            this.topicWarning.classList.remove('hidden');
            return;
        }
        
        this.selectQuestions();
        this.startQuiz();
    }
    
    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        
        // Update score total display
        if (this.scoreTotal) {
            this.scoreTotal.textContent = `/${this.actualNumQuestions}`;
        }
        
        // Reset next button
        this.nextBtn.querySelector('span:first-child').textContent = 'Next Question';
        
        this.showScreen(this.quizScreen);
        this.displayQuestion();
    }
    
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    
    selectQuestions() {
        // Filter by selected topics
        const filteredQuestions = this.allQuestions.filter(q => 
            this.selectedTopics.has(q.topic)
        );
        
        const shuffled = this.shuffle(filteredQuestions);
        const actualNum = Math.min(this.numQuestions, shuffled.length);
        this.selectedQuestions = shuffled.slice(0, actualNum);
        this.actualNumQuestions = actualNum;
    }
    
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
    
    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.actualNumQuestions) {
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }
    
    showResults() {
        this.showScreen(this.resultsScreen);
        
        // Save result locally and send to analytics
        this.saveResult(this.score, this.actualNumQuestions);
        this.sendAnalytics();
        
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
        
        // Course mode: mark quiz as passed if score >= 80% (8/10)
        if (this.currentMode === 'course' && this.currentLesson && percentage >= 80) {
            this.markLessonComplete(this.currentLesson.id);
            
            // Check if fully complete (video watched + quiz passed)
            const videoWatched = this.isVideoWatched(this.currentLesson.id);
            if (videoWatched) {
                this.topicCompleteMsg.innerHTML = '<span class="complete-icon">✓</span><span>Topic fully complete!</span>';
            } else {
                this.topicCompleteMsg.innerHTML = '<span class="complete-icon">📝</span><span>Quiz passed! Watch the video to complete this topic.</span>';
            }
            this.topicCompleteMsg.classList.remove('hidden');
        } else {
            this.topicCompleteMsg.classList.add('hidden');
        }
        
        // Update stats
        this.updateStatsDisplay();
        this.updateModeScreenPreviews();
        
        // Progress bar to 100%
        this.progressFill.style.width = '100%';
        
        // Build review list
        this.buildReviewList();
        
        // Update continue button text based on mode
        const continueText = this.currentMode === 'course' ? 'Continue Course' : 'Continue';
        this.restartBtn.querySelector('span:first-child').textContent = continueText;
    }
    
    buildReviewList() {
        this.reviewList.innerHTML = '';
        
        this.userAnswers.forEach((answer, index) => {
            const item = document.createElement('div');
            item.className = 'review-item';
            
            const statusIcon = answer.wasCorrect ? '✓' : '✗';
            const statusClass = answer.wasCorrect ? 'correct' : 'incorrect';
            
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
            
            const header = item.querySelector('.review-header');
            header.addEventListener('click', () => {
                item.classList.toggle('expanded');
                if (item.classList.contains('expanded') && window.MathJax) {
                    MathJax.typesetPromise([item]).catch(err => console.log('MathJax:', err));
                }
            });
            
            this.reviewList.appendChild(item);
        });
        
        if (window.MathJax) {
            MathJax.typesetPromise([this.reviewList]).catch(err => {
                console.log('MathJax rendering:', err);
            });
        }
    }
    
    quitQuiz() {
        // Reset quiz state
        this.progressFill.style.width = '0%';
        this.nextBtn.querySelector('span:first-child').textContent = 'Next Question';
        this.nextBtn.disabled = true;
        
        // Go back to appropriate screen
        if (this.currentMode === 'course') {
            this.showScreen(this.lessonScreen);
        } else {
            this.showScreen(this.practiceScreen);
        }
    }
    
    handleRestart() {
        this.nextBtn.querySelector('span:first-child').textContent = 'Next Question';
        this.progressFill.style.width = '0%';
        
        if (this.currentMode === 'course') {
            this.renderCurriculumList();
            this.showScreen(this.courseScreen);
        } else {
            this.showScreen(this.practiceScreen);
        }
    }
    
    // ==========================================
    // TOPIC SELECTOR (Practice Mode)
    // ==========================================
    
    initTopicSelector() {
        // Get unique topics and count
        const topicCounts = {};
        this.allQuestions.forEach(q => {
            topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
        });
        
        const topics = Object.keys(topicCounts).sort();
        
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
    
    selectAllTopics() {
        const checkboxes = this.topicCheckboxes.querySelectorAll('.topic-checkbox');
        checkboxes.forEach(label => {
            const checkbox = label.querySelector('input');
            checkbox.checked = true;
            this.selectedTopics.add(checkbox.value);
            label.classList.add('selected');
        });
        this.topicWarning.classList.add('hidden');
    }
    
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
    // STATS / HISTORY
    // ==========================================
    
    getHistory() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error reading quiz history:', e);
            return [];
        }
    }
    
    saveResult(score, total) {
        try {
            const history = this.getHistory();
            history.push({
                score: score,
                total: total,
                percentage: (score / total) * 100,
                date: new Date().toISOString(),
                mode: this.currentMode,
                topics: Array.from(this.selectedTopics)
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        } catch (e) {
            console.error('Error saving quiz result:', e);
        }
    }
    
    sendAnalytics() {
        try {
            // Build detailed answer data
            const answers = this.userAnswers.map(a => ({
                id: a.question.id,
                selected: a.userAnswer,
                correct: a.question.answer,
                isCorrect: a.wasCorrect
            })).filter(a => a.id);
            
            const allIds = answers.map(a => a.id);
            const wrongIds = answers.filter(a => !a.isCorrect).map(a => a.id);
            
            const data = {
                mode: this.currentMode,
                score: this.score,
                total: this.actualNumQuestions,
                topics: Array.from(this.selectedTopics),
                wrongIds: wrongIds,
                allIds: allIds,
                answers: answers  // Detailed per-question data
            };
            
            // Send to Google Sheets (fire and forget)
            fetch(ANALYTICS_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).catch(err => console.log('Analytics error:', err));
        } catch (e) {
            console.error('Error sending analytics:', e);
        }
    }
    
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
    
    clearStats() {
        if (confirm('Clear all quiz history and course progress? This cannot be undone.')) {
            try {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(COURSE_PROGRESS_KEY);
                this.courseProgress = { completed: [], currentLesson: 1 };
                this.updateStatsDisplay();
                this.updateModeScreenPreviews();
                if (this.currentMode === 'course') {
                    this.renderCurriculumList();
                }
            } catch (e) {
                console.error('Error clearing stats:', e);
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof QUESTIONS !== 'undefined' && QUESTIONS.length > 0 &&
        typeof CURRICULUM !== 'undefined' && CURRICULUM.length > 0) {
        window.course = new DataScienceCourse(QUESTIONS, CURRICULUM);
    } else {
        console.error('Missing questions.js or curriculum.js');
    }
});
