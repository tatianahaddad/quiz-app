
// define the questions and answers

'use strict';

const questionSet = [
  {
    number: 1,
    text: `Who was the author(ess) of Pride and Prejudice?`,
    ans1: `Mary Shelley`,
    ans2: `Henry David Thoreau`,
    ans3: `Charlotte Bront` + `&euml;`,
    ans4: `Jane Austen`
  },

  {
    number: 2,
    text: `What is the name of the main female protagonist?`,
    ans1: `Elizabeth Bennet`,
    ans2: `Lady Catherine de Bourgh`,
    ans3: `Jane Bennet`,
    ans4: `Caroline Bingley`
  },

  {
    number: 3,
    text: `Who does the main female protagonist initially fall for`,
    ans1: `Charles Bigley`,
    ans2: `George Wickham`,
    ans3: `Fitzwilliam Darcy`,
    ans4: `William Collins`
  },

  {
    number: 4,
    text: `Which of the following represents a list of all of the sisters in the main female protagonists family?
    `,
    ans1: `Caroline Bingley and Louisa Hurst`,
    ans2: `Maria and Charlotte Lucas`,
    ans3: `Elinor and Marianne Dashwood`,
    ans4: `Jane, Elizabeth, Mary, Kitty, and Lydia Bennet`
  },

  {
    number: 5,
    text: `In what Country is Pride and Prejudice set?`,
    ans1: `England`,
    ans2: `Spain`,
    ans3: `The United States of America`,
    ans4: `Russia`
  },

  {
    number: 6,
    text: `On what manor does Mr. Darcy live?`,
    ans1: `Pemberley`,
    ans2: `Rosings Park`,
    ans3: `Longbourn`,
    ans4: `Netherfield Park`
  },

  {
    number: 7,
    text: `Who is Mr. Darcy\'s sister?`,
    ans1: `Georgiana`,
    ans2: `Caroline`,
    ans3: `Charlotte`,
    ans4: `Lydia`
  },

  {
    number: 8,
    text: `Which mother tends to be hysterical when faced with any obstacles?`,
    ans1: `Lady Lucas`,
    ans2: `Mrs. Bennet`,
    ans3: `Mrs. Phillips`,
    ans4: `Lady Catherine de Bourgh`
  },

  {
    number: 9,
    text: `Who does Jane Bennet ultimately fall in love with and marry?`,
    ans1: `Colonel Fitzwilliam`,
    ans2: `Fitzwilliam Darcy`,
    ans3: `Mr. Collins`,
    ans4: `Charles Bingley`
  },

  {
    number: 10,
    text: `Is Pride and Prejudice the best novel ever written?`,
    ans1: `Yes!!`,
    ans2: `Absolutely yes!!`,
    ans3: `Of course!!`,
    ans4: `All of the above`
  }
]
const ANSWERS = [ 
  `Jane Austen`, 
  `Elizabeth Bennet`, 
  `George Wickham`, 
  `Jane, Elizabeth, Mary, Kitty, and Lydia Bennet`, 
  `England`, 
  `Pemberley`, 
  `Georgiana`, 
  `Mrs. Bennet`, 
  `Charles Bingley`, 
  `All of the above`
];

// initially set the first question number to '1'.
let questionNum = 1;

// initially set the correct answers to '0'.
let correctAnswers = 0;

// let the user click to start the quiz 
function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

// when the user clicks 'submit', present the questions in order.
function nextQuestion() {
  // set 'question' equal to the current value of the 'questionNum' which is 1 minus 1 of i.e. 
  // index 0 or the first question.
  const question = questionSet[questionNum - 1];
  // set 'questionsAnswered' equal to the current number of 'questionNum' minus 1 to get the number of questions answered
  // for the first question.
  const questionsAnswered = questionNum - 1;
  // add the function 'questionTemplate' containing the paramaters with the number of correct answers, the corresponding index
  // to the questionSet array, and the current question -1, respectively to index.html inside of the id container. **calls object/key pairs
  // for the 'question' argument
  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

// create the template for the question page to be insterted into the html after the user clicks to start
function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form>
      <fieldset role="radiogroup">
        <label>
          <input class="answer" type="radio" role="radio" name="option" checked></input>
          <span>${question.ans1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" role="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" role="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" role="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button" role="button">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

// let the user submit the answer
function handleSubmitButton() {
  // traverse the page for the id container, when the manipulation of the click on '#js-submit-button' occurs...
  $('#container').on('click', '#js-submit-button', function(event) {
    // prevent the default behavior of submitting to a linked page.
    event.preventDefault()
    // set 'answer' equal to whatever the 'span' sibling is of whichever answer the user has chosen.
    const userAnswer = $('input:checked').siblings('span');
    // set 'userIsCorrect' to the result of 'checkUserAnswer' with the parameter being the text the user selected as being correct.
    const userIsCorrect = checkUserAnswer(userAnswer);
    if(userIsCorrect) {
    // if 'userIsCorrect' returns true, then 'generateCorrectFeedback()' will run, otherwise 'generageIncorrectFeedback()' will run.
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}
// if the text in the input that they checked exactly matches the answer in the corresponding answer array for that question, 
// return true, if else, return false.
function checkUserAnswer(userAnswer) {
  if(userAnswer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}
// after result of question loads (correct or incorrect) when the user clicks on the next button...
function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {
    // if the question number is at the end of the total questions, show results page, if else, go to the next question 
    // by iterating through the index and adding 1.
    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

// when called, 'generateCorrectFeedback' will add the 'correctFeedback' text to the index.html and will then add 1 to the
// number of correct answers
function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

// this function, when called, will increase the 'questionNum' by 1.
function iterateQuestion() {
  questionNum++;
}
// this function, when called, will increase the 'correctAnswers' by 1.
function iterateCorrectAnswers() {
  correctAnswers++;
}

// creating the text for the correct feedback
const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2 class ="correct-header">Correct!</h2>
    <img src="https://media.giphy.com/media/712SvFEutwiha/giphy.gif" alt="Mr. Dary smiling happily at Elizabeth Bennet.">
    <button id="js-next-button" role="button">Next</button>
  </section>
`;
// when called 'generateIncorrectFeedback' will add the 'incorrectFeedbackTemplate' with the answer to the corresponding question.
function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}
// creating text for the incorrect feedback with the paramater 'questionNum' that takes the argument of returning 
// the index of the corresponding answer to the current question number.
function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Nope, sorry! The correct answer was ${ANSWERS[questionNum - 1]}!</h2>
      <img src="https://media.giphy.com/media/l4JyOzvLqmWxe8PG8/giphy.gif" alt="Elizabeth Bennet upset, groaning 'ugh'"">
      <button id="js-next-button" role="button">Next</button>
    </section>
`;
}

// when all of the questions have been answered, the 'createResultsPage' with the paramater 'correctAnswers' will add the text
// for the final results to index.html. It will take the argument for the 'correctAnswers' calculated out of the amount scored correct
// added throught 'iterateCorrectAnswers()' when called in 'generateCorrectFeedback()'
function createResultsPage(correctAnswers) {
  $('#container').html(`
    <section id="final-page" role="main">
      <h2>Final Score: ${correctAnswers} out of 10</h2>
      <button id="js-restart-button" role="button">Play Again?</button>
    </section>
  `);
}

// when called, 'handleRestartButton' will traverse the page for the id 'container', and upon the event 'click' on '#js-restart-button'...
function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {
    // 'questionNum' and 'correctAnswers' will be set back to the initial number as was present at the start to restart the quiz.
    questionNum = 1;

    correctAnswers = 0;
    // 'nextQuestion' is called which will insert the question text into index.html to restart the questions.
    nextQuestion();
  });
}
// the function 'handleButtons' when called will call all the buttons users click.
function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}
// call the buttons users click.
handleButtons();
