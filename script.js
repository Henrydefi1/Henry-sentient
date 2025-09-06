const questions = [
  {
    question: "What is the core mission of @SentientAGI?",
    options: [
      "To build a private AI monopoly",
      "To make AGI open-source and accessible to everyone",
      "To focus only on robotics",
      "To create a gaming platform"
    ],
    answer: 1
  },
  {
    question: "What are “Dobby models” according to @SentientAGI?",
    options: [
      "AI assistants that act like task managers",
      "Open-source AI models that feel like personalities rather than tools",
      "Data-cleaning algorithms",
      "Blockchain-based avatars"
    ],
    answer: 1
  },
  {
    question: "What is the name of the initiative @SentientAGI launched to support its ecosystem?",
    options: ["The Web", "The Core", "The GRID", "The Nexus"],
    answer: 2
  },
  {
    question: "Which company was recently announced as Sentient’s “Official Identity Partner”?",
    options: ["Microsoft", "OpenAI", "BILLIONS", "Anthropic"],
    answer: 2
  },
  {
    question: "According to @SentientAGI, what is one of the hardest challenges in AI development?",
    options: [
      "Increasing GPU efficiency",
      "Model alignment",
      "Building faster networks",
      "Reducing memory costs"
    ],
    answer: 1
  },
  {
    question: "How does @SentientAGI plan to tackle model alignment?",
    options: [
      "By banning open-source access",
      "By depending on a single private team",
      "By engaging the open-source community",
      "By outsourcing entirely to governments"
    ],
    answer: 2
  },
  {
    question: "Which social platform is @SentientAGI most active on?",
    options: ["Facebook", "X (formerly Twitter)", "LinkedIn", "Instagram"],
    answer: 1
  },
  {
    question: "Roughly how many followers does @SentientAGI have on X as of 2025?",
    options: ["63K", "630K", "6.3M", "63M"],
    answer: 1
  },
  {
    question: "What broader goal does @SentientAGI emphasize with its ecosystem?",
    options: [
      "Centralizing AI under one company",
      "Making AGI a community-driven, shared resource",
      "Developing only for enterprise clients",
      "Creating exclusive premium AI apps"
    ],
    answer: 1
  },
  {
    question: "Why does Sentient believe open-source is essential for AGI?",
    options: [
      "To lower hardware costs only",
      "To ensure no single entity controls AGI",
      "To improve marketing campaigns",
      "To replace human jobs as fast as possible"
    ],
    answer: 1
  },
  {
    question: "What phrase does @SentientAGI often use to describe their Dobby models?",
    options: [
      "\"Tools for productivity\"",
      "\"Personalities, not tools\"",
      "\"Robots for everyone\"",
      "\"The AI marketplace\""
    ],
    answer: 1
  },
  {
    question: "What is the main purpose of “the GRID”?",
    options: [
      "A gaming platform",
      "A decentralized ecosystem to support Sentient’s open AGI vision",
      "A hardware chip design",
      "A private research lab"
    ],
    answer: 1
  },
  {
    question: "Which topic does @SentientAGI frequently highlight as crucial for safe AGI?",
    options: ["Data storage", "Alignment", "Energy consumption", "Digital advertising"],
    answer: 1
  },
  {
    question: "How does Sentient describe its approach to building AGI compared to traditional AI labs?",
    options: [
      "Closed and centralized",
      "Open and community-driven",
      "Secretive and corporate",
      "Military-focused"
    ],
    answer: 1
  },
  {
    question: "What does the partnership with BILLIONS specifically provide for Sentient?",
    options: [
      "Funding for GPUs",
      "An identity framework for the ecosystem",
      "A new large language model",
      "Marketing outreach"
    ],
    answer: 1
  },
  {
    question: "What does Sentient believe distinguishes AGI from narrow AI?",
    options: [
      "AGI can be open-source, narrow AI cannot",
      "AGI is general intelligence that feels sentient, while narrow AI is task-specific",
      "Narrow AI is safer",
      "AGI runs only on blockchain"
    ],
    answer: 1
  },
  {
    question: "What is one way Sentient plans to involve its community in AGI development?",
    options: [
      "Through open contributions and collaboration on alignment",
      "By restricting access to models",
      "By selling only enterprise licenses",
      "By focusing only on government contracts"
    ],
    answer: 0
  },
  {
    question: "What kind of “ecosystem” does Sentient say it is building?",
    options: [
      "A walled-off platform",
      "An open, decentralized AGI ecosystem",
      "A private AI cloud",
      "A social media network"
    ],
    answer: 1
  },
  {
    question: "What does Sentient emphasize about the ethics of AGI?",
    options: [
      "Ethics should be decided by governments only",
      "Ethics are central, and guiding frameworks are necessary for safe development",
      "Ethics are secondary to speed",
      "Ethics should be ignored to accelerate innovation"
    ],
    answer: 1
  },
  {
    question: "Which of the following best describes Sentient’s communication style on X?",
    options: [
      "Technical research papers only",
      "Short, open, community-focused announcements",
      "Corporate press releases",
      "Entertainment memes only"
    ],
    answer: 1
  }
];


let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;
let answers = []; // track selected answers

const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("nameInput");
const quizBox = document.getElementById("quizBox");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");
const actionButtons = document.getElementById("actionButtons");

const questionCircle = document.getElementById("questionCircle");
const timerCircle = document.getElementById("timerCircle");
const timerCircleSvg = document.getElementById("timerCircleSvg");
const mobileTimer = document.querySelector(".mobileTimer"); 

function saveState() {
  const state = {
    currentQuestion,
    score,
    timeLeft,
    answers,
    name: nameInput.value
  };
  localStorage.setItem("quizState", JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem("quizState");
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
}

function clearState() {
  localStorage.removeItem("quizState");
}

startBtn.addEventListener("click", () => {
  if (nameInput.value.trim() === "") {
    alert("Enter your name!");
    return;
  }
  intro.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
});

function loadQuestion() {
  clearInterval(timer);

  if (answers[currentQuestion] === undefined) {
    if (!timeLeft || timeLeft <= 0) timeLeft = 10;
  }

  timerCircle.textContent = timeLeft;
  timerCircleSvg.style.strokeDashoffset = 0;
  questionCircle.textContent = `${currentQuestion + 1}/${questions.length}`;
  if (mobileTimer) mobileTimer.textContent = "⌛ " + timeLeft; 

  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("div");
    btn.classList.add("option");
    btn.textContent = opt;
    btn.addEventListener("click", () => selectAnswer(i, btn));
    optionsDiv.appendChild(btn);
  });

  if (answers[currentQuestion] !== undefined) {
    const selectedIndex = answers[currentQuestion];
    const correctIndex = q.answer;
    Array.from(optionsDiv.children).forEach(opt => opt.style.pointerEvents = "none");
    if (selectedIndex === correctIndex) {
      optionsDiv.children[selectedIndex].classList.add("correct");
    } else {
      optionsDiv.children[selectedIndex].classList.add("wrong");
      optionsDiv.children[correctIndex].classList.add("correct");
    }
    nextBtn.classList.remove("disabled");
  } else {
    nextBtn.classList.add("disabled");
    startTimer(); 
  }

  saveState();
}

function startTimer() {
  const total = 283; 
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerCircle.textContent = timeLeft;

    if (mobileTimer) mobileTimer.textContent = "⌛ " + timeLeft;

    const progress = total - (timeLeft / 10) * total;
    timerCircleSvg.style.strokeDashoffset = progress;

    if (timeLeft <= 0) {
      clearInterval(timer);
      markCorrect();
      nextBtn.classList.remove("disabled");
      saveState();
    }
  }, 1000);
}

function selectAnswer(selectedIndex, btn) {
  clearInterval(timer);
  const correctIndex = questions[currentQuestion].answer;
  answers[currentQuestion] = selectedIndex;
  if (selectedIndex === correctIndex) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    optionsDiv.children[correctIndex].classList.add("correct");
  }
  Array.from(optionsDiv.children).forEach(opt => opt.style.pointerEvents = "none");
  nextBtn.classList.remove("disabled");
  saveState();
}

nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    timeLeft = 10;
    loadQuestion();
  } else {
    showResult();
  }
});

backBtn.disabled = true;
backBtn.classList.add("disabled");
backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  return false;
});

function markCorrect() {
  const correctIndex = questions[currentQuestion].answer;
  optionsDiv.children[correctIndex].classList.add("correct");
  Array.from(optionsDiv.children).forEach(opt => opt.style.pointerEvents = "none");
}

function showResult() {
  clearInterval(timer);
  quizBox.classList.add("hidden");
  resultDiv.classList.remove("hidden");
  actionButtons.classList.remove("hidden");

  resultDiv.innerHTML = `
    🎉 ${nameInput.value}, you scored ${score} out of ${questions.length}!<br><br>
    ✅ Follow me on X : <a href="https://x.com/Henrydefi_01" target="_blank">@Henrydefi_01</a>
  `;

  clearState();
}

document.getElementById("downloadBtn").addEventListener("click", () => {
  const blob = new Blob([resultDiv.textContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quiz_result.txt";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("shareBtn").addEventListener("click", () => {
  const text = encodeURIComponent(resultDiv.textContent + " #QuizApp");
  const url = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(url, "_blank");
});

document.getElementById("themeToggle").addEventListener("change", (e) => {
  document.body.classList.toggle("light", e.target.checked);
  document.getElementById("themeLabel").textContent =
    e.target.checked ? "Light Mode" : "Dark Mode";
});

window.addEventListener("load", () => {
  const state = loadState();
  if (state) {
    currentQuestion = state.currentQuestion;
    score = state.score;
    timeLeft = state.timeLeft || 10;
    answers = state.answers || [];
    if (state.name) nameInput.value = state.name;
    intro.classList.add("hidden");
    quizBox.classList.remove("hidden");
    loadQuestion();
  }
});
