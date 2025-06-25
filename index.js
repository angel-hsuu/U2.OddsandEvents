let bank = []
let odds = []
let evens = []

function addToBank(n) {
    bank.push(n);
    render(n);
  }


function sortOne() {
  const n = bank.shift();
  if (n === undefined) return;
  if (n % 2 === 0) {
    evens.push(n);
  } else {
    odds.push(n);
  }
  render();
}

function sortAll() {
  while (bank.length > 0) {
    sortOne(); 
  }
}

function NumberForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Add a number to the bank
      <input name="num" type="number" />
    </label>
    <button>Add number</button>
    <button type="button" id="sort1">Sort 1</button>
    <button type="button" id="sortAll">Sort All</button>
  `;

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData($form);
    const num = Number(data.get("num"));
    addToBank(num);
    $form.reset();
  });

  $form.querySelector("#sort1").addEventListener("click", sortOne);
  $form.querySelector("#sortAll").addEventListener("click", sortAll);

  return $form;
}

function Section(title, numbers) {
  const $section = document.createElement("section");
  const $heading = document.createElement("h2");
  $heading.textContent = title;

  const $box = document.createElement("div");
  $box.style.border = "1px solid black";
  $box.style.padding = "0.5rem";
  $box.style.marginBottom = "1rem";
  $box.textContent = numbers.join(" ");

  $section.append($heading, $box);
  return $section;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `<h1>Odds and Events</h1>`;
  $app.append(NumberForm());
  $app.append(Section("Bank", bank));
  $app.append(Section("Odds", odds));
  $app.append(Section("Evens", evens));
}

render();