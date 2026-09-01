const quickInput = document.querySelector("#quick-search");
const quickResult = document.querySelector("#quick-result");

function renderQuickResult(query) {
  if (!quickResult) return;
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) {
    quickResult.innerHTML = '<p class="muted">例：<button class="inline-example" type="button" data-example="cat">cat</button>、<button class="inline-example" type="button" data-example="空">空</button>、<button class="inline-example" type="button" data-example="sena">sena</button></p>';
    return;
  }

  const match = window.LUNARI_WORDS.find((word) =>
    [word.lunari, word.english, word.japanese].some((value) => value.toLocaleLowerCase().includes(normalized))
  );

  quickResult.innerHTML = match
    ? `<article class="quick-word"><div><span class="eyebrow">${match.typeLabel}</span><strong>${match.lunari}</strong></div><div><span>${match.english}</span><span>${match.japanese}</span></div></article>`
    : '<p class="empty-state">まだ登録されていない単語です。辞書ページですべての単語を確認できます。</p>';
}

quickInput?.addEventListener("input", (event) => renderQuickResult(event.target.value));
quickResult?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-example]");
  if (!button || !quickInput) return;
  quickInput.value = button.dataset.example;
  renderQuickResult(quickInput.value);
  quickInput.focus();
});
renderQuickResult("");

