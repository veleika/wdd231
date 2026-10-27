const menuButton = document.querySelector("#menuButton");
const primaryNav = document.querySelector("#primaryNav");

if (menuButton && primaryNav) {
  function closeMenu() {
    primaryNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.querySelector("span").textContent = "☰";
  }

  menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuButton.querySelector("span").textContent = isOpen ? "✕" : "☰";
  });

  primaryNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });

  window.matchMedia("(min-width: 600px)").addEventListener("change", event => {
    if (event.matches) {
      closeMenu();
    }
  });
}