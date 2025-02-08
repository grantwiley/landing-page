document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (!hamburger || !nav) {
        console.error('Hamburger or nav elements not found');
        return;
    }

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        console.log('Menu clicked, nav classes:', nav.classList);
    });

    // Quote Form Handling
    const quoteForm = document.getElementById('quote-form');
    const quoteResult = document.getElementById('quote-result');

    if (quoteForm && quoteResult) {
        const questions = [
            {
                id: 'age-license',
                text: 'Are all drivers licensed and 25 years old or older?',
                name: 'age_license'
            },
            {
                id: 'insurance',
                text: 'Do all renters carry full coverage automobile insurance with comprehensive and collision deductibles no higher than $500?',
                name: 'insurance'
            },
            {
                id: 'out-of-state',
                text: 'Will your trip take you out of the state of Virginia?',
                name: 'out_of_state'
            }
        ];

        let currentQuestionIndex = -1;

        function createQuestionHTML(question) {
            return `
                <div class="form-group">
                    <label>${question.text}</label>
                    <div class="radio-group">
                        <label>
                            <input type="radio" name="${question.name}" value="yes" required> Yes
                        </label>
                        <label>
                            <input type="radio" name="${question.name}" value="no" required> No
                        </label>
                    </div>
                </div>
                <div class="button-group">
                    <button type="button" class="back-button">Back</button>
                    <button type="button" class="cancel-button">Cancel</button>
                    <button type="button" class="next-button">Continue</button>
                </div>
            `;
        }

        function showThankYouMessage() {
            quoteResult.innerHTML = `
                <h3>Thank You For Submitting a Rental Quote. We Will be in Touch With You Asap.</h3>
                <p class="contact-info">Warehouse Rent a Car is currently updating rates. If you have any further questions, please contact us by phone call or text message at 540-213-0202 or by email at rental@cawcaw.com.</p>
            `;
        }

        function showNextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                quoteForm.style.display = 'none';
                quoteResult.style.display = 'block';
                quoteResult.innerHTML = createQuestionHTML(questions[currentQuestionIndex]);
                setupQuestionHandlers();
                // Add fade effect
                quoteResult.style.opacity = '0';
                setTimeout(() => {
                    quoteResult.style.opacity = '1';
                }, 50);
            } else {
                showThankYouMessage();
            }
        }

        function showPreviousQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                quoteResult.innerHTML = createQuestionHTML(questions[currentQuestionIndex]);
                setupQuestionHandlers();
            } else {
                quoteForm.style.display = 'block';
                quoteResult.style.display = 'none';
                currentQuestionIndex = -1;
            }
        }

        function setupQuestionHandlers() {
            const nextButton = quoteResult.querySelector('.next-button');
            const backButton = quoteResult.querySelector('.back-button');
            const cancelButton = quoteResult.querySelector('.cancel-button');

            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    const radioButtons = quoteResult.querySelectorAll('input[type="radio"]');
                    const isAnswered = Array.from(radioButtons).some(radio => radio.checked);
                    if (isAnswered) {
                        showNextQuestion();
                    } else {
                        alert('Please select an answer before continuing.');
                    }
                });
            }

            if (backButton) {
                backButton.addEventListener('click', showPreviousQuestion);
            }

            if (cancelButton) {
                cancelButton.addEventListener('click', () => {
                    window.location.href = 'quote.html';
                });
            }
        }

        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            currentQuestionIndex = -1;
            showNextQuestion();
        });
    }
});