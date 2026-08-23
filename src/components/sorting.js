import { sortMap } from "../lib/sort.js";

export function initSorting(columns) {
  return (query, state, action) => {
    let field = null;
    let order = null;

    if (action && action.name === "sort") {
      field = action.dataset.field;
      order = sortMap[action.dataset.value];
      action.dataset.value = order;

      columns.forEach((column) => {
        if (column !== action) {
          column.dataset.value = "none";
        }
      });
    } else {
      const selected = [...columns].find(
        (column) => column.dataset.value !== "none"
      );

      if (selected) {
        field = selected.dataset.field;
        order = selected.dataset.value;
      }
    }

    const sort =
      field && order !== "none"
        ? `${field}:${order}`
        : null;

    return sort
      ? Object.assign({}, query, { sort })
      : query;
  };
}