(function () {
  const page = document.body.dataset.page;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  navToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  const root = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  const savedTheme = localStorage.getItem("lunari-theme");
  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;

  function updateThemeButton() {
    if (!themeButton) return;
    const isDark = root.dataset.theme === "dark";
    themeButton.textContent = isDark ? "☀" : "☾";
    themeButton.setAttribute("aria-label", isDark ? "ライトテーマに切り替える" : "ダークテーマに切り替える");
  }

  themeButton?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("lunari-theme", root.dataset.theme);
    updateThemeButton();
  });
  updateThemeButton();

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
})();

