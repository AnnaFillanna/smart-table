import "./fonts/ys-display/fonts.css";
import "./style.css";

import { initData } from "./data.js";
import { processFormData } from "./lib/utils.js";

import { initTable } from "./components/table.js";
import { initPagination } from "./components/pagination.js";
import { initSorting } from "./components/sorting.js";
import { initFiltering } from "./components/filtering.js";
import { initSearching } from "./components/searching.js";

// API для работы с данными
const api = initData();

/**
 * Сбор и обработка полей из таблицы
 * @returns {Object}
 */
function collectState() {
  const form = sampleTable.container.querySelector("form");
  const formData = new FormData(form);
  const state = processFormData(formData);

  return {
    ...state,
  };
}

/**
 * Перерисовка состояния таблицы при любых изменениях
 * @param {HTMLButtonElement?} action
 */
async function render(action) {
  const state = collectState();

  let query = {};

  query = applySearching(query, state, action);
  query = applyFiltering(query, state, action);
  query = applySorting(query, state, action);
  query = applyPagination(query, state, action);

  const { total, items } = await api.getRecords(query);

  updatePagination(total, query);

  sampleTable.render(items);
}

const sampleTable = initTable(
  {
    tableTemplate: "table",
    rowTemplate: "row",
    before: ["search", "header", "filter"],
    after: ["pagination"],
  },
  render
);

const { applyPagination, updatePagination } = initPagination({
  pages: sampleTable.container.querySelector('[data-name="pages"]'),
  fromRow: sampleTable.container.querySelector('[data-name="fromRow"]'),
  toRow: sampleTable.container.querySelector('[data-name="toRow"]'),
  totalRows: sampleTable.container.querySelector('[data-name="totalRows"]'),
});

const applySorting = initSorting(
  sampleTable.container.querySelectorAll('[name="sort"]')
);

const filter = sampleTable.container.querySelector('[data-name="filter"]');

const filterElements = Object.fromEntries(
  [...filter.querySelectorAll("input, select")].map((element) => [
    element.name,
    element,
  ])
);


const { applyFiltering, updateIndexes } = initFiltering(filterElements);

const applySearching = initSearching(
  sampleTable.container.querySelector('[name="search"]')
);

const appRoot = document.querySelector("#app");

appRoot.appendChild(sampleTable.container);

async function init() {
  const indexes = await api.getIndexes();

  updateIndexes(
    {
      searchBySeller: sampleTable.container.querySelector(
        '[data-name="searchBySeller"]'
      ),
    },
    {
      searchBySeller: indexes.sellers,
    }
  );
}

init().then(render);