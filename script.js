document.addEventListener('DOMContentLoaded', (event) => {
    showPage('home-page');
});

let userName = '';
let selectedCategory = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let totalTime = 0;
let timer;


// all quiz questions , options & answer.
const questionsData = {
    'HTML': [
        {
            question: 'What does HTML stand for?',
            options: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyper Tool Markup Language'],
            answer: 0
        },
        {
            question: 'How many sizes of headers are available in HTML by default?',
            options: [5, 1, 3, 6],
            answer: 3
        },
        {
            question: 'What is the smallest header in HTML by default?',
            options: ['h1', 'h2', 'h6', 'h4'],
            answer: 2
        },
        {
            question: 'What are the types of lists available in HTML?',
            options: ['Ordered, Unordered Lists.', 'Bulleted, Numbered Lists.', 'Named, Unnamed Lists.', 'None of the above.'],
            answer: 0
        },
        {
            question: 'Using which tag created an ordered list in HTML?',
            options: ['<ul>', '<ol>', '<href>', '<b>'],
            answer: 1
        },
        {
            question: 'HTML files are saved by default with the extension?',
            options: ['.html', '.h', '.ht', 'None of the above'],
            answer: 0
        },
        {
            question: 'We enclose HTML tags within?',
            options: ['[ ]', '< >', '! !', 'None of the above'],
            answer: 1
        },
        {
            question: 'What is the effect of the <b> tag?',
            options: ['It converts the text within it to bold font.', 'It is used to write black-colored font.', 'It is used to change the font size.', 'None of the above'],
            answer: 0
        },
        {
            question: 'Which of the following is correct about HTML?',
            options: ['HTML uses User Defined Tags.', 'HTML uses tags defined within the language.', 'Both A and B', 'None of the above'],
            answer: 1
        },
        {
            question: 'How to display preformatted text in HTML?',
            options: ['<p>', '<pre>', '<hr>', 'All of the above'],
            answer: 1
        },
    ],

    'CSS': [
        {
            question: 'What does CSS stand for?',
            options: ['Colorful Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets'],
            answer: 2
        },
        {
            question: 'How can we change the background color of an element?',
            options: ['background-color', 'color', 'Both A and B', 'None of the above'],
            answer: 0
        },
        {
            question: 'How can we change the text color of an element?',
            options: ['background-color', 'color', 'Both A and B', 'None of the above'],
            answer: 1
        },
        {
            question: 'In how many ways can CSS be written in?',
            options: [1, 2, 3, 4],
            answer: 2
        },
        {
            question: 'What type of CSS is generally recommended for designing large web pages?',
            options: ['Inline', 'Internal', 'External', 'None of the above'],
            answer: 2
        },
        {
            question: 'Which HTML tag is used to declare internal CSS?',
            options: ['<style>', '<link>', '<script', 'None of the above'],
            answer: 0
        },
        {
            question: 'How can we select an element with a specific ID in CSS?',
            options: ['#', '.', '^', 'None of the above'],
            answer: 0
        },
        {
            question: 'How can we select an element with a specific Class in CSS?',
            options: ['#', '.', '^', 'None of the above'],
            answer: 1
        },
        {
            question: 'How can we write comments in CSS?',
            options: ['/* */', '//', '#', 'All of the above'],
            answer: 0
        },
        {
            question: 'Can negative values be allowed in padding property?',
            options: ['Yes', 'No', 'Depends on property', 'None of the above'],
            answer: 2
        },
    ],

    'JavaScript': [
        {
            question: 'Inside which HTML element do we put the JavaScript?',
            options: ['<script>', '<js>', '<javascript>', '<scripting>'],
            answer: 0
        },
        {
            question: 'Javascript is an _______ language?',
            options: ['Object-Oriented', 'Object-Based', 'Procedural', 'None of the above'],
            answer: 0
        },
        {
            question: 'Which of the following keywords is used to define a variable in Javascript?',
            options: ['var', 'let', 'Both A and B', 'None of the above'],
            answer: 2
        },
        {
            question: 'Which of the following methods is used to access HTML elements using Javascript?',
            options: ['getElementById()', 'getElementByClassName()', 'Both A and B', 'None of the above'],
            answer: 2
        },
        {
            question: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
            options: ['Throws an error', 'Ignores the statements', 'Gives a warning', 'None of the above'],
            answer: 1
        },
        {
            question: 'Which of the following methods can be used to display data in some form using Javascript?',
            options: ['document.write()', 'console.log()', 'window.alert()', 'All of the above'],
            answer: 3
        },
        {
            question: 'How can a datatype be declared to be a constant type?',
            options: ['let', 'var', 'const', 'constant'],
            answer: 2
        },
        {
            question: 'When the switch statement matches the expression with the given labels, how is the comparison done?',
            options: ['Both the datatype and the result of expression are compared.', 'Only the datatype of the expression are compared.', 'Only the value of the expression are compared.', 'None of the above.'],
            answer: 0
        },
        {
            question: 'What keyword is used to check whether a given property is valid or not?',
            options: ['is in', 'in', 'exists', 'lies'],
            answer: 1
        },
        {
            question: 'What is the use of the <noscript> tag in Javascript?',
            options: ['The contents are displayed by non-JS-based browers.', 'Clears all the cookies and cache.', 'Both A and B.', 'None of the above.'],
            answer: 0
        },
    ],

    'Data Structure': [
        {
            question: 'What is a data structure?',
            options: ['A programming language', 'A collection of algorithms', 'A way to store and organize data', 'A type of computer hardware'],
            answer: 2
        },
        {
            question: 'Which data structure is used for implementing recursion?',
            options: ['Stack', 'Queue', 'List', 'Array'],
            answer: 0
        },
        {
            question: 'The data structure required to check whether an expression contains a balanced parenthesis is?',
            options: ['Queue', 'Stack', 'Tree', 'Array'],
            answer: 1
        },
        {
            question: 'Which of the following is not the application of stack?',
            options: ['Data Transfer between two asynchronous process', 'Tracking of local variables at run time', 'Compiler Syntax Analyzer', 'A parentheses balancing program'],
            answer: 0
        },
        {
            question: 'Which data structure is needed to convert infix notation to postfix notation?',
            options: ['Tree', 'Branch', 'Stack', 'Queue'],
            answer: 2
        },
        {
            question: 'What is the value of the postfix expression 6 3 2 4 + – *?',
            options: [74, -18, 22, 40],
            answer: 1
        },
        {
            question: 'What data structure would you mostly likely see in non recursive implementation of a recursive algorithm?',
            options: ['Stack', 'Linked List', 'Tree', 'Queue'],
            answer: 0
        },
        {
            question: 'The data structure required for Breadth First Traversal on a graph is?',
            options: ['Array', 'Stack', 'Tree', 'Queue'],
            answer: 3
        },
        {
            question: 'The prefix form of A-B/ (C * D ^ E) is?',
            options: ['-A/B*C^DE', '-A/BC*^DE', '-ABCD*^DE', '-/*^ACBDE'],
            answer: 0
        },
        {
            question: 'Which data structure is based on the Last In First Out (LIFO) principle?',
            options: ['Tree', 'Linked List', 'Stack', 'Queue'],
            answer: 2
        },
    ]
};


// call this function when we call home page or quiz page or result page.
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}


// call this function at beginning
function startQuiz() {
    userName = document.getElementById('username').value;
    if (userName.trim() === '') {
        alert('Please Enter Your Name');
        return;
    }
    if (selectedCategory === '') {
        alert('Please Select Category');
        return;
    }
    showPage('quiz-page');
    shuffleQuestions(questions);
    startTimer();
    loadQuestion();
}


// function to shuffle both questions and their options:
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleQuestions(questionsArray) {
    shuffleArray(questionsArray);
    // questionsArray.forEach(question => {
    //     shuffleArray(question.options);
    // });
}


// this function for selecting category like HTML,CSS,JS & DSA
function selectCategory(category) {
    selectedCategory = category;
    questions = questionsData[category];
    currentQuestionIndex = 0;
    document.getElementById('category-title').textContent = category;
    // selectedCategory = '';
}


// this function for showing questions
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById('question-number').textContent = `${currentQuestionIndex + 1} / 10`;
    document.getElementById('question-text').textContent = question.question;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('button-item');
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}


// this function for next questions button
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}


// this function for checking answers of quiz
let notAttemptedQuestions = 0;
function checkAnswer(selectedIndex,correctOptionIndex) {
    recordQuestionTime();
    const question = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('#options-container button');

    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === question.answer) {
            button.style.backgroundColor = 'green';
        } else if (index === selectedIndex) {
            button.style.backgroundColor = 'red';
        }
    });

    if (selectedIndex === '') {
        ++notAttemptedQuestions;
    } else if (selectedIndex === question.answer) {
        score++;
    }
    if (selectedIndex === correctOptionIndex) {
        score++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            startTimer();
        } else {
            endQuiz();
        }
    }, 1000);
}

// function checkAnswer(selectedIndex) {
//     const question = questions[currentQuestionIndex];
//     if (selectedIndex === question.answer) {
//         score++;
//     }
//     let Score=document.getElementById('score').textContent='Score: '+score;
//     currentQuestionIndex++;
//     loadQuestion();
// }


// this function for setting a timer
let questionStartTime = 0;
let totalTimeTaken = 0;

function startTimer() {
    let timeLeft = 10;
    questionStartTime=Date.now(); // Start timing the question

    document.getElementById('timer').textContent = `Timer: ${timeLeft} seconds`;

    clearInterval(timer); // Clear any previous timer

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Timer: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            recordQuestionTime();  // Record the time even if the user doesn't answer
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
                startTimer();
            } else {
                endQuiz();
            }
        }
    }, 1000);
}
function recordQuestionTime() {
    const timeSpent = Math.min(10, Math.floor((Date.now() - questionStartTime) / 1000)); 
    totalTimeTaken += timeSpent;
}

// function startTimer() {
//     let timeLeft = 100;
//     timer = setInterval(() => {
//         document.getElementById('timer').textContent = 'Timer: ' + timeLeft + ' second';
//         if (timeLeft <= 0) {
//             clearInterval(timer);
//             endQuiz();
//         }
//         timeLeft--;
//         totalTime++;
//     }, 1000);
// }


// this function for final result page
function endQuiz() {
    clearInterval(timer);
    showPage('result-page');
    document.getElementById('qr').textContent = `Result of ${selectedCategory} Quiz`;
    document.getElementById('result-username').innerHTML = `<b>${userName}</b> Your Result is:`;

    const averageTimePerQuestion = (totalTimeTaken / questions.length).toFixed(2);

    document.getElementById('total-time').innerHTML = `Average Time per Question: <b>${averageTimePerQuestion} seconds</b>`;
    document.getElementById('total-questions').textContent = questions.length;
    document.getElementById('correct').textContent = score;
    document.getElementById('wrong').textContent = questions.length - score - (notAttemptedQuestions);
    document.getElementById('percentage').textContent = ((score / questions.length) * 100).toFixed(2);
}

function startAgain() {
    showPage('home-page');
}

function goToHome() {
    showPage('home-page');
}