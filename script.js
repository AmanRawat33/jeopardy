const gameContainer = document.querySelector(".game-container");
const scoreDisplay = document.querySelector(".score");
let score = 0;
const jeopardyCategories = [
  {
    genre: "WHO",
    questions: [
      {
        question: "Who wrote Harry Potter?",
        answers: ["JK Rowling", "JRR Tolkein"],
        correct: "JK Rowling",
        level: "Easy",
      },
      {
        question: "Who was born in Krypton?",
        answers: ["Aquaman", "Superman"],
        correct: "Aquaman",
        level: "Medium",
      },
      {
        question: "Who designed the first car?",
        answers: ["Karl Benz", "Henry Ford"],
        correct: "Karl Benz",
        level: "Hard",
      },
    ],
  },
  {
    genre: "WHERE",
    questions: [
      {
        question: "Where is Buckingham Palace?",
        answers: ["London", "India"],
        correct: "London",
        level: "Easy",
      },
      {
        question: "Where is the Colosseum?",
        answers: ["Rome", "Milan"],
        correct: "Rome",
        level: "Medium",
      },
      {
        question: "Where is mount Kilamanjaro?",
        answers: ["Zimbabwe", "Tanzania"],
        correct: "Tanzania",
        level: "Hard",
      },
    ],
  },
  {
    genre: "WHEN",
    questions: [
      {
        question: "When is Christmas?",
        answers: ["22", "25"],
        correct: "25",
        level: "Easy",
      },
      {
        question: "When was JFK shot?",
        answers: ["1963", "1965"],
        correct: "1963",
        level: "Medium",
      },
      {
        question: "When was WW2?",
        answers: ["1932", "1941"],
        correct: "1941",
        level: "Hard",
      },
    ],
  },
  {
    genre: "WHAT",
    questions: [
      {
        question: "What is the capital of Saudi Arabia?",
        answers: ["Jedda", "Riyadh"],
        correct: "Riyadh",
        level: "Easy",
      },
      {
        question: "What do Koalas eat?",
        answers: ["Straw", "Eucalypt"],
        correct: "Eucalypt",
        level: "Medium",
      },
      {
        question: "What is a kg short for?",
        answers: ["Kilogramme", "Kilogram"],
        correct: "Kilogram",
        level: "Hard",
      },
    ],
  },
  {
    genre: "HOW MANY",
    questions: [
      {
        question: "How many players in a football team?",
        answers: ["10", "11"],
        correct: "11",
        level: "Easy",
      },
      {
        question: "How many minutes in 3.5 hrs?",
        answers: ["200", "210"],
        correct: "210",
        level: "Medium",
      },
      {
        question: "How many people in China(in billion)?",
        answers: ["1.1", "1.3"],
        correct: "1.3",
        level: "Hard",
      },
    ],
  },
];

function addCategory(category) {
  const column = document.createElement("div");
  column.classList.add("genre-column");

  const genreTitle = document.createElement("div");
  genreTitle.classList.add("genre-title");
  genreTitle.innerText = category.genre;

  column.append(genreTitle);
  gameContainer.append(column);

  category.questions.forEach((question) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);
    if (question.level === "Easy") {
      card.innerHTML = 100;
    } else if (question.level === "Medium") {
      card.innerHTML = 200;
    }
    if (question.level === "Hard") {
      card.innerHTML = 300;
    }

    card.setAttribute("data-question", question.question);
    card.setAttribute("data-option1", question.answers[0]);
    card.setAttribute("data-option2", question.answers[1]);
    card.setAttribute("data-correct", question.correct);
    card.setAttribute("data-value", card.getInnerHTML());

    card.addEventListener("click", flipCard);
  });
}

function flipCard() {
  this.innerHTML = "";
  this.style.fontSize = "15px";
  this.style.lineHeight = "30px";
  const textDisplay = document.createElement("div");
  textDisplay.classList.add("card-text");
  textDisplay.innerHTML = this.getAttribute("data-question");
  const firstButton = document.createElement("button");
  const secondButton = document.createElement("button");
  firstButton.classList.add("first-button");
  secondButton.classList.add("second-button");
  firstButton.innerHTML = this.getAttribute("data-option1");
  secondButton.innerHTML = this.getAttribute("data-option2");
  firstButton.addEventListener("click", getResult);
  secondButton.addEventListener("click", getResult);
  this.append(textDisplay, firstButton, secondButton);

  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.removeEventListener("click", flipCard));
}

function getResult() {
    const allCards = Array.from(document.querySelectorAll(".card"));
    allCards.forEach((card) => card.addEventListener("click", flipCard));
    const buttonCard = this.parentElement;
    if (buttonCard.getAttribute("data-correct") == this.innerHTML) {
        score += parseInt(buttonCard.getAttribute("data-value"));
        scoreDisplay.innerHTML = score;
        buttonCard.classList.add("correct-answer");
        setTimeout(() => {
            while (buttonCard.firstChild) {
                buttonCard.removeChild(buttonCard.lastChild);
            }
        }, 1000)
        buttonCard.innerHTML = buttonCard.getAttribute("data-value");
    } else {
        buttonCard.classList.add("wrong-answer");
         setTimeout(() => {
           while (buttonCard.firstChild) {
             buttonCard.removeChild(buttonCard.lastChild);
           }
         }, 1000);
        buttonCard.innerHTML = "0";
    }
    buttonCard.removeEventListener("click", flipCard);
}

jeopardyCategories.forEach((category) => addCategory(category));
