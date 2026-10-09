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
    /* Текст меняем только там, где это нужно: телефон, email, часы.
       Для кнопок «Макс» и «Telegram» текст остаётся как в HTML. */
    if (key === "phone" && !el.dataset.keepText) el.textContent = CONTACTS.phoneDisplay;
    if (key === "email") el.textContent = CONTACTS.email;
    if (key === "hours") el.textContent = CONTACTS.hours;
  });
});