// Project filters (Azure, AWS, Terraform...). External file so the Content Security Policy needs no inline scripts.
(function () {
  var buttons = document.querySelectorAll(".project-filters button");
  var cards = document.querySelectorAll(".grid .card[data-tags]");
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tag = btn.getAttribute("data-filter");
      buttons.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      cards.forEach(function (card) {
        var tags = card.getAttribute("data-tags").split(" ");
        card.hidden = !(tag === "all" || tags.indexOf(tag) !== -1);
      });
      if (tag !== "all" && window.umami && typeof window.umami.track === "function") {
        window.umami.track("project-filter", { tool: tag });
      }
    });
  });
})();
