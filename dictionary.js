const dictionaryInput = document.querySelector("#dictionary-search");
const resultList = document.querySelector("#dictionary-results");
const resultCount = document.querySelector("#result-count");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
let activeFilter = "all";

function renderDictionary() {
  const query = (dictionaryInput?.value || "").trim().toLocaleLowerCase();
  const results = window.LUNARI_WORDS.filter((word) => {
    const matchesType = activeFilter === "all" || word.type === activeFilter;
    const matchesQuery = !query || [word.lunari, word.english, word.japanese, word.typeLabel]
      .some((value) => value.toLocaleLowerCase().includes(query));
    return matchesType && matchesQuery;
  });

  resultCount.textContent = `${results.length}語`;
  resultList.innerHTML = results.length
    ? results.map((word) => `
      <article class="word-card">
        <div class="word-card__top">
          <span class="word-type">${word.typeLabel}</span>
          <button class="copy-button" type="button" data-copy="${word.lunari}" aria-label="${word.lunari}をコピー">Copy</button>
        </div>
        <h2>${word.lunari}</h2>
        <dl>
          <div><dt>EN</dt><dd>${word.english}</dd></div>
          <div><dt>JP</dt><dd>${word.japanese}</dd></div>
        </dl>
      </article>`).join("")
    : '<div class="empty-state empty-state--large"><strong>見つかりませんでした</strong><span>別の言葉、または短い文字で検索してみてください。</span></div>';
}

dictionaryInput?.addEventListener("input", renderDictionary);
filterButtons.forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach((item) => {
    const selected = item === button;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  renderDictionary();
}));

resultList?.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  await navigator.clipboard.writeText(button.dataset.copy);
  button.textContent = "Copied";
  window.setTimeout(() => { button.textContent = "Copy"; }, 1200);
});

renderDictionary();

