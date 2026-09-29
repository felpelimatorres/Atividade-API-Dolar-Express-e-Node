"use strict";

const API_URL = "https://economia.awesomeapi.com.br/json/last/USD-BRL";

const elements = {
    atual: document.getElementById("valor-atual"),
    maximo: document.getElementById("valor-maximo"),
    minimo: document.getElementById("valor-minimo"),
    variacao: document.getElementById("variacao"),
    status: document.getElementById("status"),
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
});

function formatCurrency(value) {
    return currencyFormatter.format(Number(value));
}

async function fetchDollarQuote() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data.USDBRL;
}

function renderVariation(pctChange) {
    const pct = Number(pctChange);
    const isUp = pct >= 0;

    elements.variacao.textContent = `${isUp ? "▲" : "▼"} ${Math.abs(pct).toFixed(2)}% hoje`;
    elements.variacao.classList.toggle("card__variation--up", isUp);
    elements.variacao.classList.toggle("card__variation--down", !isUp);
}

function renderQuote(quote) {
    elements.atual.textContent = formatCurrency(quote.bid);
    elements.maximo.textContent = formatCurrency(quote.high);
    elements.minimo.textContent = formatCurrency(quote.low);
    renderVariation(quote.pctChange);

    const updatedAt = new Date(Number(quote.timestamp) * 1000).toLocaleString("pt-BR");
    elements.status.textContent = `Última atualização da cotação: ${updatedAt}`;
    elements.status.classList.remove("status--error");
}

function renderError(error) {
    console.error(error);
    elements.status.textContent = "Não foi possível carregar a cotação. Tentando novamente em 10 segundos...";
    elements.status.classList.add("status--error");
}

async function init() {
    try {
        const quote = await fetchDollarQuote();
        renderQuote(quote);
    } catch (error) {
        renderError(error);
    }
}

init();
