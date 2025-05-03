let eventos = JSON.parse(localStorage.getItem("calendarioEventos")) || {};
let diaAtual = null;

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const year = 2025;
const mesesComDias = {};

const nomesDosMeses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

nomesDosMeses.forEach((nome, index) => {
  const dias = getDaysInMonth(index + 1, year);
  mesesComDias[nome] = Array.from({ length: dias }, (_, i) => i + 1);
});

function criarIdDia(dia, mes) {
  return `${year}-${mes}-${dia}`;
}

function atualizarCoresDias() {
  document.querySelectorAll(".dia").forEach((spanDia) => {
    const dia = spanDia.textContent;
    const mes = spanDia.classList[1];
    const idDia = criarIdDia(dia, mes);
    spanDia.classList.remove("com-evento");
    if (eventos[idDia] && eventos[idDia].length > 0) {
      spanDia.classList.add("com-evento");
    }
  });
}

function criarDivsMeses() {
  const containerMeses = document.getElementById("calendario-container");

  for (const [nomeMes, diasDoMes] of Object.entries(mesesComDias)) {
    const divMes = document.createElement("div");
    divMes.id = nomeMes;
    divMes.className = "mes-container";

    const tituloMes = document.createElement("h2");
    tituloMes.textContent = nomeMes;
    divMes.appendChild(tituloMes);

    const divDias = document.createElement("div");
    divDias.className = "dias-container";

    diasDoMes.forEach((dia) => {
      const spanDia = document.createElement("span");
      spanDia.className = "dia";
      spanDia.classList.add(nomeMes);
      spanDia.textContent = dia;
      spanDia.addEventListener("click", mostraEventoDia);
      divDias.appendChild(spanDia);
    });

    divMes.appendChild(divDias);
    containerMeses.appendChild(divMes);
  }

  atualizarCoresDias();
}

const tituloEventoDia = document.querySelector("#titulo-evento-dia");
const lista_de_eventos = document.querySelector("#lista-de-eventos-dia");
const input_de_eventos = document.querySelector("#input-eventos");

function mostraEventoDia(event) {
  const dia = event.target.textContent;
  const mes = event.target.classList[1];
  tituloEventoDia.textContent = `${dia} de ${mes}`;
  diaAtual = criarIdDia(dia, mes);
  lista_de_eventos.innerHTML = "";
  const eventosDoDay = eventos[diaAtual] || [];
  eventosDoDay.forEach((evento) => {
    criarItemEvento(evento);
  });
  document
    .querySelectorAll(".dia")
    .forEach((d) => d.classList.remove("selecionado"));
  event.target.classList.add("selecionado");
}

function criarItemEvento(textoEvento) {
  const eventoDia = document.createElement("li");
  const botaoExcluir = document.createElement("button");
  botaoExcluir.textContent = "X";
  botaoExcluir.className = "excluir";
  botaoExcluir.addEventListener("click", function () {
    const textoItem = this.parentElement.textContent.replace("X", "").trim();
    removerEventoLocalStorage(textoItem);
    this.parentElement.remove();
  });
  eventoDia.textContent = textoEvento;
  eventoDia.appendChild(botaoExcluir);
  lista_de_eventos.appendChild(eventoDia);
}

function addevent() {
  if (input_de_eventos.value !== "" && diaAtual) {
    const textoEvento = input_de_eventos.value;
    criarItemEvento(textoEvento);
    if (!eventos[diaAtual]) {
      eventos[diaAtual] = [];
    }
    eventos[diaAtual].push(textoEvento);
    localStorage.setItem("calendarioEventos", JSON.stringify(eventos));
    input_de_eventos.value = "";
    atualizarCoresDias();
  } else if (!diaAtual) {
    alert("Selecione um dia primeiro!");
  }
}

function removerEventoLocalStorage(textoEvento) {
  if (eventos[diaAtual]) {
    eventos[diaAtual] = eventos[diaAtual].filter(
      (evento) => evento !== textoEvento
    );
    if (eventos[diaAtual].length === 0) {
      delete eventos[diaAtual];
    }
    localStorage.setItem("calendarioEventos", JSON.stringify(eventos));
    atualizarCoresDias();
  }
}

document.addEventListener("DOMContentLoaded", criarDivsMeses);
