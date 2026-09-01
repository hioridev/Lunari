const questions = [
  {
    prompt: "『私は空が好きです』をLunariにすると？",
    hint: "基本語順は SVO です。",
    options: ["Mi sena aura.", "Aura sena mi.", "Mi aura sena."],
    answer: "Mi sena aura.",
    explanation: "mi（私）＋ sena（好き）＋ aura（空）の順です。"
  },
  {
    prompt: "“Mi sena lu.” の意味は？",
    hint: "mi と lu の意味を思い出しましょう。",
    options: ["私はあなたが好きです。", "あなたは私が好きです。", "私は猫が好きです。"],
    answer: "私はあなたが好きです。",
    explanation: "mi は『私』、lu は『あなた』です。"
  },
  {
    prompt: "naru（行く）を過去形にすると？",
    hint: "過去形は語尾に -na をつけます。",
    options: ["naruna", "naruva", "li naru"],
    answer: "naruna",
    explanation: "naru ＋ na で naruna になります。"
  },
  {
    prompt: "naru（行く）を未来形にすると？",
    hint: "未来形は語尾に -va をつけます。",
    options: ["naruva", "naruna", "va naru"],
    answer: "naruva",
    explanation: "naru ＋ va で naruva になります。"
  },
  {
    prompt: "『かわいい猫』に対応する現在のLunari例は？",
    hint: "元のLunariメモにある例文です。",
    options: ["Lumi lili.", "Lili luma.", "Mi lumi."],
    answer: "Lumi lili.",
    explanation: "lumi は猫、lili はかわいい、という登録です。"
  }
];

const progress = document.querySelector("#quiz-progress");
const prompt = document.querySelector("#quiz-prompt");
const hint = document.querySelector("#quiz-hint");
const options = document.querySelector("#quiz-options");
const feedback = document.querySelector("#quiz-feedback");
const nextButton = document.querySelector("#quiz-next");
const restartButton = document.querySelector("#quiz-restart");
const scorePanel = document.querySelector("#quiz-score");
let current = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const question = questions[current];
  answered = false;
  progress.textContent = `${current + 1} / ${questions.length}`;
  prompt.textContent = question.prompt;
  hint.textContent = question.hint;
  feedback.hidden = true;
  nextButton.hidden = true;
  scorePanel.hidden = true;
  options.hidden = false;
  options.innerHTML = question.options.map((option) =>
    `<button class="quiz-option" type="button" data-answer="${option}">${option}</button>`
  ).join("");
}

options?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-answer]");
  if (!button || answered) return;
  answered = true;
  const question = questions[current];
  const correct = button.dataset.answer === question.answer;
  if (correct) score += 1;

  options.querySelectorAll("button").forEach((option) => {
    option.disabled = true;
    if (option.dataset.answer === question.answer) option.classList.add("is-correct");
  });
  if (!correct) button.classList.add("is-wrong");
  feedback.className = `quiz-feedback ${correct ? "is-correct" : "is-wrong"}`;
  feedback.innerHTML = `<strong>${correct ? "正解です！" : "もう一歩です"}</strong><span>${question.explanation}</span>`;
  feedback.hidden = false;
  nextButton.textContent = current === questions.length - 1 ? "結果を見る" : "次の問題";
  nextButton.hidden = false;
});

nextButton?.addEventListener("click", () => {
  if (current < questions.length - 1) {
    current += 1;
    renderQuestion();
    return;
  }
  prompt.textContent = "Practice complete";
  hint.textContent = "おつかれさまでした。何度でも挑戦できます。";
  options.hidden = true;
  feedback.hidden = true;
  nextButton.hidden = true;
  scorePanel.hidden = false;
  scorePanel.innerHTML = `<span>Your score</span><strong>${score} / ${questions.length}</strong><p>${score === questions.length ? "Ya! 全問正解です。" : "間違えたところを確認して、もう一度試してみましょう。"}</p>`;
});

restartButton?.addEventListener("click", () => {
  current = 0;
  score = 0;
  renderQuestion();
});

renderQuestion();

