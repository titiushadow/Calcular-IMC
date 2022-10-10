// IMC DATA
const data = [
{
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
},
{
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
},
{
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
},
{
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
},
{
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
},
];

// Seleção de elementos
const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcular_btn = document.querySelector("#calcular_btn");
const clearBtn = document.querySelector("#clear_btn");

const calcContainer = document.querySelector("#calculadora-container");
const resultContainer = document.querySelector("#result-container");

const imcNumero = document.querySelector("#imc-numero span");
const imcInfo = document.querySelector("#imc-info span");

const voltar_btn = document.querySelector("#voltar-btn");

// Funções
function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-data");

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

function validDigits(text) {
    return text.replace(/[^0-9,]/g, "");
}

function calcImc(height, weight) {
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
}

function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumero.className = "";
  imcInfo.className = "";
}

function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

// Init
createTable(data);

// Eventos
[heightInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    const updatedValue = validDigits(e.target.value);

    e.target.value = updatedValue;
  });
});

calcular_btn.addEventListener("click", (e) => {
  e.preventDefault();

  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");

  console.log(weight, height);

  if (!weight || !height) return;

  const imc = calcImc(height, weight);
  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  if (!info) return;

  imcNumero.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcNumero.classList.add("baixo");
      imcInfo.classList.add("baixo");
      break;
    case "Normal":
      imcNumero.classList.add("bom");
      imcInfo.classList.add("bom");
      break;
    case "Sobrepeso":
      imcNumero.classList.add("baixo");
      imcInfo.classList.add("baixo");
      break;
    case "Obesidade":
      imcNumero.classList.add("medio");
      imcInfo.classList.add("medio");
      break;
    case "Obesidade grave":
      imcNumero.classList.add("alto");
      imcInfo.classList.add("alto");
      break;
  }

  showOrHideResults();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();

  cleanInputs();
});

voltar_btn.addEventListener("click", (e) => {
  cleanInputs();
  showOrHideResults();
});
