import { getPages } from "../lib/utils.js";

export const initPagination = ({ pages, fromRow, toRow, totalRows }) => {
  const pageTemplate = pages.firstElementChild.cloneNode(true);
  pages.innerHTML = "";

  let pageCount;

  const applyPagination = (query, state, action) => {
    const limit = Number(state.rowsPerPage) || 10;
    let page = Number(state.page) || 1;

    // бывший @todo #2.6 — обработать действия
    if (action?.name === "next") {
      page = Math.min(page + 1, pageCount);
    }

    if (action?.name === "prev") {
      page = Math.max(page - 1, 1);
    }

    if (action?.name === "first") {
      page = 1;
    }

    if (action?.name === "last") {
      page = pageCount;
    }

    return Object.assign({}, query, {
      limit,
      page,
    });
  };

  const updatePagination = (total, { page, limit }) => {
    pageCount = Math.ceil(total / limit);

    const skip = (page - 1) * limit;

    // бывший @todo #2.4
    const visiblePages = getPages(page, pageCount, 5);

    const pageButtons = visiblePages.map((pageNumber) => {
      const button = pageTemplate.cloneNode(true);
      const input = button.querySelector("input");

      input.value = pageNumber;
      input.checked = pageNumber === page;

      button.querySelector("span").textContent = pageNumber;

      return button;
    });

    pages.replaceChildren(...pageButtons);

    // бывший @todo #2.5
    fromRow.textContent = skip + 1;
    toRow.textContent = Math.min(skip + limit, total);
    totalRows.textContent = total;
  };

  return {
    applyPagination,
    updatePagination,
  };
};
