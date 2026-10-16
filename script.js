(function () {
  "use strict";

  // Ingredient list taken from the product label on nubest.com.
  // Benefit tags match the support areas described on the product page.
  var INGREDIENTS = [
    { name: "Vitamin A", tags: ["immune", "beauty"] },
    { name: "Vitamin C", tags: ["immune", "beauty"] },
    { name: "Vitamin D3", tags: ["bones", "immune"] },
    { name: "Vitamin E", tags: ["immune", "beauty"] },
    { name: "Vitamin B1", tags: ["energy"] },
    { name: "Vitamin B2", tags: ["energy"] },
    { name: "Vitamin B3", tags: ["energy"] },
    { name: "Vitamin B6", tags: ["energy"] },
    { name: "Folate", tags: ["energy"] },
    { name: "Vitamin B12", tags: ["energy"] },
    { name: "Biotin", latin: "plant-based", tags: ["beauty", "energy"] },
    { name: "Pantothenic Acid", tags: ["energy"] },
    { name: "Calcium", tags: ["bones"] },
    { name: "Magnesium", tags: ["bones", "energy"] },
    { name: "Zinc", tags: ["bones", "immune", "beauty"] },
    { name: "Selenium", tags: ["beauty", "immune"] },
    { name: "Copper", tags: ["bones"] },
    { name: "Manganese", tags: ["bones"] },
    { name: "Chromium", tags: ["energy"] },
    { name: "Molybdenum", tags: ["energy"] },
    { name: "L-Arginine", tags: ["heart", "energy"] },
    { name: "Spirulina", latin: "Arthrospira platensis", tags: ["immune", "vitality"] },
    { name: "Echinacea", latin: "Echinacea purpurea", tags: ["immune"] },
    { name: "Maca", latin: "Lepidium meyenii", tags: ["vitality"] },
    { name: "Wild Yam", latin: "Dioscorea villosa", tags: ["vitality"] },
    { name: "Red Clover", latin: "Trifolium pratense", tags: ["vitality"] },
    { name: "Horny Goat Weed", latin: "Epimedium sagittatum", tags: ["vitality"] },
    { name: "Turmeric", latin: "Curcuma longa", tags: ["vitality"] },
    { name: "Hawthorn", latin: "Crataegus oxyacantha", tags: ["vitality", "heart"] },
    { name: "Green Tea", latin: "Camellia sinensis", tags: ["vitality"] },
    { name: "Cinnamon", latin: "Cinnamomum cassia", tags: ["vitality"] },
    { name: "Garlic", latin: "Allium sativum", tags: ["vitality"] },
    { name: "Beta-Glucan", latin: "Saccharomyces cerevisiae", tags: ["immune"] },
    { name: "Pomegranate", latin: "Punica granatum", tags: ["vitality"] },
    { name: "Cranberry", latin: "Vaccinium macrocarpon", tags: ["vitality"] },
    { name: "Bilberry", latin: "Vaccinium myrtillus", tags: ["vitality"] },
    { name: "Grape Extract", latin: "Vitis vinifera", tags: ["vitality"] },
    { name: "Black Currant", latin: "Ribes nigrum", tags: ["vitality"] }
  ];

  var LABELS = {
    all: "all areas",
    bones: "bone health",
    immune: "immune function",
    energy: "energy and metabolism",
    heart: "heart health",
    beauty: "hair, skin, and nails",
    vitality: "vitality"
  };

  var list = document.getElementById("ingredients");
  var count = document.getElementById("ingredient-count");
  var chips = document.querySelectorAll(".chip");

  function render() {
    var html = "";
    for (var i = 0; i < INGREDIENTS.length; i++) {
      var item = INGREDIENTS[i];
      html += '<li data-tags="' + item.tags.join(" ") + '">' + item.name +
        (item.latin ? "<small>" + item.latin + "</small>" : "") + "</li>";
    }
    list.innerHTML = html;
  }

  function applyFilter(filter) {
    var items = list.querySelectorAll("li");
    var matches = 0;

    for (var i = 0; i < items.length; i++) {
      var tags = items[i].getAttribute("data-tags").split(" ");
      var isMatch = filter === "all" || tags.indexOf(filter) !== -1;

      items[i].classList.toggle("is-match", filter !== "all" && isMatch);
      items[i].classList.toggle("is-dim", filter !== "all" && !isMatch);
      if (isMatch) { matches++; }
    }

    count.textContent = filter === "all"
      ? INGREDIENTS.length + " ingredients in every serving."
      : matches + " ingredients selected for " + LABELS[filter] + ".*";
  }

  function onChipClick(event) {
    var target = event.currentTarget;
    for (var i = 0; i < chips.length; i++) {
      chips[i].classList.remove("is-active");
      chips[i].setAttribute("aria-pressed", "false");
    }
    target.classList.add("is-active");
    target.setAttribute("aria-pressed", "true");
    applyFilter(target.getAttribute("data-filter"));
  }

  if (list && count) {
    render();
    applyFilter("all");
    for (var i = 0; i < chips.length; i++) {
      chips[i].addEventListener("click", onChipClick);
    }
  }

  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }
})();
