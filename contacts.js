/* Единый источник контактов. Меняешь здесь — обновляется на всех страницах. */
const CONTACTS = {
  phone: "+79929999984",
  phoneDisplay: "+7 (992) 999-99-84",
  email: "rskgrup@yandex.ru",
  telegram: "https://t.me/+79929999984",
  max: "https://max.ru/u/f9LHodD0cOJBmDRoU0RtB0AO-sKmq8EOLS7dzs0wtNbxUcIGmDq06_mNYRU",
  hours: "Ежедневно 8:00–21:00 (МСК)"
};

document.addEventListener("DOMContentLoaded", function () {
  /* Подстановка контактов */
  document.querySelectorAll("[data-contact]").forEach(function (el) {
    const key = el.dataset.contact;
    if (!CONTACTS[key]) return;
    if (el.tagName === "A") {
      if (key === "phone") el.href = "tel:" + CONTACTS.phone;
      else if (key === "email") el.href = "mailto:" + CONTACTS.email;
      else el.href = CONTACTS[key];
      el.target = (key === "phone" || key === "email") ? "_self" : "_blank";
      el.rel = "noopener";
    }
    if (key === "phone" && !el.dataset.keepText) el.textContent = CONTACTS.phoneDisplay;
    if (key === "email") el.textContent = CONTACTS.email;
    if (key === "hours") el.textContent = CONTACTS.hours;
  });

  /* Мобильное меню */
  const headerInner = document.querySelector(".header__inner");
  const nav = document.querySelector(".nav");
  if (!headerInner || !nav || document.querySelector(".burger")) return;

  const burger = document.createElement("button");
  burger.className = "burger";
  burger.setAttribute("aria-label", "Открыть меню");
  burger.innerHTML = "<span></span><span></span><span></span>";
  headerInner.appendChild(burger);

  function closeMenu() {
    nav.classList.remove("nav--open");
    burger.classList.remove("burger--open");
    document.body.classList.remove("no-scroll");
  }

  burger.addEventListener("click", function (e) {
    e.stopPropagation();
    const isOpen = nav.classList.toggle("nav--open");
    burger.classList.toggle("burger--open", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
  });

  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (e) {
    if (nav.classList.contains("nav--open") && !nav.contains(e.target) && !burger.contains(e.target)) {
      closeMenu();
    }
  });
});
