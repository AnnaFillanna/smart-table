import "./fonts/ys-display/fonts.css";
import "./style.css";

import { data as sourceData } from "./data/dataset_1.js";

import { initData } from "./data.js";
import { processFormData } from "./lib/utils.js";

import { initTable } from "./components/table.js";
import { initPagination } from "./components/pagination.js";
import { initSorting } from "./components/sorting.js";
import { initFiltering } from "./components/filtering.js";
import { initSearching } from "./components/searching.js";

// @todo: подключение

// Исходные данные используемые в render()
const { data, ...indexes } = initData(sourceData);

/**
 * Сбор и обработка полей из таблицы
 * @returns {Object}
 */
function collectState() {
  const form = sampleTable.container.querySelector("form");
  const formData = new FormData(form);
  const state = processFormData(new FormData(form));

  return {
    ...state,
  };
}

/**
 * Перерисовка состояния таблицы при любых изменениях
 * @param {HTMLButtonElement?} action
 */
function render(action) {
  let state = collectState(); // состояние полей из таблицы
  console.log(state.page);
  console.log(typeof state.page);
let result = [...data];

// @todo: использование
result = searching(result, state, action);
result = filtering(result, state, action);
result = sorting(result, state, action);
result = pagination(result, state, action);

sampleTable.render(result);
}
const sampleTable = initTable(
  {
    tableTemplate: "table",
    rowTemplate: "row",
    before: ["search", "header", "filter"],
    after: ["pagination"],
  },
  render,
);

const pagination = initPagination(
  {
    pages: sampleTable.container.querySelector('[data-name="pages"]'),
    fromRow: sampleTable.container.querySelector('[data-name="fromRow"]'),
    toRow: sampleTable.container.querySelector('[data-name="toRow"]'),
    totalRows: sampleTable.container.querySelector('[data-name="totalRows"]'),
    },

  
);
// @todo: инициализация
const sorting = initSorting(
    sampleTable.container.querySelectorAll('[name="sort"]')
);

const filtering = initFiltering(
    {
        filter: sampleTable.container.querySelector('[data-name="filter"]'),
        searchBySeller: sampleTable.container.querySelector(
            '[data-name="searchBySeller"]'
        ),
    },
    indexes
);

const searching = initSearching(
    sampleTable.container.querySelector('[name="search"]')
);

const appRoot = document.querySelector("#app");
appRoot.appendChild(sampleTable.container);

render();
