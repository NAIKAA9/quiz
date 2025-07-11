const questions = [
  {
    q: "Capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: "Delhi",
  },
  {
    q: "HTML stands for?",
    options: [
      "HyperText Markup Language",
      "HighText",
      "Markup Language",
      "None",
    ],
    answer: "HyperText Markup Language",
  },
  { q: "2 + 2 * 2 = ?", options: ["6", "8", "4", "10"], answer: "6" },
  {
    q: "Which is a JS framework?",
    options: ["React", "Laravel", "Django", "Flask"],
    answer: "React",
  },
  {
    q: "Largest ocean?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
  },
  { q: "Water formula?", options: ["H2O", "CO2", "NaCl", "O2"], answer: "H2O" },
  {
    q: "JS is used for?",
    options: ["Styling", "Backend", "Interactivity", "Structure"],
    answer: "Interactivity",
  },
  {
    q: "CSS used for?",
    options: ["Content", "Layout", "Behavior", "Logic"],
    answer: "Layout",
  },
  { q: "What is 10 / 2?", options: ["3", "4", "5", "6"], answer: "5" },
  {
    q: "Tag for link?",
    options: ["<link>", "<href>", "<a>", "<url>"],
    answer: "<a>",
  },
  {
    q: "Planet closest to sun?",
    options: ["Earth", "Venus", "Mercury", "Mars"],
    answer: "Mercury",
  },
  {
    q: "Which language is compiled?",
    options: ["Python", "Java", "HTML", "CSS"],
    answer: "Java",
  },
  {
    q: "Which is not browser?",
    options: ["Chrome", "Firefox", "Linux", "Safari"],
    answer: "Linux",
  },
  {
    q: "RGB stands for?",
    options: [
      "Red Green Blue",
      "Read Graph Base",
      "Run Go Base",
      "Random Graph Bias",
    ],
    answer: "Red Green Blue",
  },
  {
    q: "Full form of URL?",
    options: [
      "Uniform Resource Locator",
      "Unique Register Link",
      "User Resource Log",
      "Universal Record Locator",
    ],
    answer: "Uniform Resource Locator",
  },
];

let currentQuestion = 0;
let score = 0;
let username = "";
let timer;
let timeLeft = 10;

function startQuiz() {
  username = document.getElementById("username").value.trim();
  if (!username) return alert("Enter your name!");

  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("quiz-screen").classList.remove("hide");

  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  document.getElementById("time").innerText = timeLeft;

  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.q;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(btn, opt);
    optionsDiv.appendChild(btn);
  });

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      autoSkip();
    }
  }, 1000);
}

function selectAnswer(btn, selected) {
  clearInterval(timer);

  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
    btn.style.backgroundColor = "green";
  } else {
    btn.style.backgroundColor = "red";
    document.querySelectorAll("#options button").forEach((b) => {
      if (b.innerText === correct) b.style.backgroundColor = "green";
    });
  }

  disableButtons();
  setTimeout(nextQuestion, 1000);
}

function autoSkip() {
  document.querySelectorAll("#options button").forEach((btn) => {
    btn.disabled = true;
    if (btn.innerText === questions[currentQuestion].answer) {
      btn.style.backgroundColor = "green";
    }
  });
  setTimeout(nextQuestion, 1000);
}

function disableButtons() {
  document
    .querySelectorAll("#options button")
    .forEach((btn) => (btn.disabled = true));
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById("quiz-screen").classList.add("hide");
  document.getElementById("result-screen").classList.remove("hide");
  document.getElementById(
    "final-score"
  ).innerText = `${username}, your score is ${score}/15`;

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name: username, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 10)));
}

function showLeaderboard() {
  document.getElementById("result-screen").classList.add("hide");
  document.getElementById("leaderboard-screen").classList.remove("hide");

  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const list = document.getElementById("leaderboard");
  list.innerHTML = "";
  leaderboard.forEach((entry) => {
    const li = document.createElement("li");
    li.innerText = `${entry.name} - ${entry.score}/15`;
    list.appendChild(li);
  });
}

function restartQuiz() {
  document.getElementById("leaderboard-screen").classList.add("hide");
  document.getElementById("start-screen").classList.remove("hide");
  document.getElementById("username").value = "";
}
