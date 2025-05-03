// Estrutura de dados para armazenar eventos
let eventos = JSON.parse(localStorage.getItem("calendarioEventos")) || {};
let diaAtual = null; // Armazena o dia atualmente selecionado

// Função para obter o número de dias em um mês
function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

// Ano atual
const year = 2025;
const mesesComDias = {};

// Array com os nomes dos meses em português
const nomesDosMeses = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

// Preenche o objeto mesesComDias com os dias de cada mês
nomesDosMeses.forEach((nome, index) => {
  const dias = getDaysInMonth(index + 1, year);
  mesesComDias[nome] = Array.from({ length: dias }, (_, i) => i + 1);
});

// Função para criar identificador único do dia
function criarIdDia(dia, mes) {
  return `${year}-${mes}-${dia}`;
}

// Função para atualizar a cor dos dias com eventos
function atualizarCoresDias() {
  document.querySelectorAll(".dia").forEach((spanDia) => {
    const dia = spanDia.textContent;
    const mes = spanDia.classList[1];
    const idDia = criarIdDia(dia, mes);

    // Verifica se o dia tem eventos
    spanDia.classList.remove("com-evento");
    if (eventos[idDia] && eventos[idDia].length > 0) {
      spanDia.classList.add("com-evento");
    }
  });
}

// Função para criar as divs de meses no DOM
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

  // Atualiza as cores após criar os dias
  atualizarCoresDias();
}

const tituloEventoDia = document.querySelector("#titulo-evento-dia");
const lista_de_eventos = document.querySelector("#lista-de-eventos-dia");
const input_de_eventos = document.querySelector("#input-eventos");

// Função para mostrar eventos do dia clicado
function mostraEventoDia(event) {
  const dia = event.target.textContent;
  const mes = event.target.classList[1];

  // Atualiza título
  tituloEventoDia.textContent = `${dia} de ${mes}`;

  // Armazena o dia atual
  diaAtual = criarIdDia(dia, mes);

  // Limpa a lista
  lista_de_eventos.innerHTML = "";

  // Carrega eventos do dia atual
  const eventosDoDay = eventos[diaAtual] || [];
  eventosDoDay.forEach((evento) => {
    criarItemEvento(evento);
  });

  // Destaca o dia selecionado
  document
    .querySelectorAll(".dia")
    .forEach((d) => d.classList.remove("selecionado"));
  event.target.classList.add("selecionado");
}

// Função para criar item de evento na lista
function criarItemEvento(textoEvento) {
  const eventoDia = document.createElement("li");
  const botaoExcluir = document.createElement("button");

  // Configura o botão de excluir
  botaoExcluir.textContent = "X";
  botaoExcluir.className = "excluir";

  // Adiciona o evento de exclusão
  botaoExcluir.addEventListener("click", function () {
    const textoItem = this.parentElement.textContent.replace("X", "").trim();
    removerEventoLocalStorage(textoItem);
    this.parentElement.remove();
  });

  // Configura o texto do evento
  eventoDia.textContent = textoEvento;
  eventoDia.appendChild(botaoExcluir);
  lista_de_eventos.appendChild(eventoDia);
}

function addevent() {
  if (input_de_eventos.value !== "" && diaAtual) {
    const textoEvento = input_de_eventos.value;

    // Cria o item na lista
    criarItemEvento(textoEvento);

    // Salva no localStorage
    if (!eventos[diaAtual]) {
      eventos[diaAtual] = [];
    }
    eventos[diaAtual].push(textoEvento);

    // Atualiza o localStorage
    localStorage.setItem("calendarioEventos", JSON.stringify(eventos));

    // Limpa o input
    input_de_eventos.value = "";

    // Atualiza a cor do dia atual
    atualizarCoresDias();
  } else if (!diaAtual) {
    alert("Selecione um dia primeiro!");
  }
}

// Função para remover evento do localStorage
function removerEventoLocalStorage(textoEvento) {
  if (eventos[diaAtual]) {
    eventos[diaAtual] = eventos[diaAtual].filter(
      (evento) => evento !== textoEvento
    );

    // Remove a data se não tiver mais eventos
    if (eventos[diaAtual].length === 0) {
      delete eventos[diaAtual];
    }

    // Atualiza o localStorage
    localStorage.setItem("calendarioEventos", JSON.stringify(eventos));

    // Atualiza a cor dos dias
    atualizarCoresDias();
  }
}

document.addEventListener("DOMContentLoaded", criarDivsMeses);
