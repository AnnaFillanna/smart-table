import { cloneTemplate } from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
  const { tableTemplate, rowTemplate, before, after } = settings;
  const root = cloneTemplate(tableTemplate);
  const container = document.createElement("div");

  const beforeElements = before.map((templateId) => {
    return cloneTemplate(templateId).container;
  });

  const afterElements = after.map((templateId) => {
    return cloneTemplate(templateId).container;
  });

root.container.prepend(...beforeElements);
root.container.append(...afterElements);
container.append(root.container);

  // @todo: #1.2 —  вывести дополнительные шаблоны до и после таблицы

  // @todo: #1.3 —  обработать события и вызвать onAction()
  container.addEventListener("input", () => {
    onAction();
  });

  container.addEventListener("submit", (event) => {
    event.preventDefault();
    onAction(event.submitter);
  });
  const render = (data) => {
    const nextRows = data.map((customer) => {
      const row = cloneTemplate(rowTemplate);

      row.elements.date.textContent = customer.date;
      row.elements.customer.textContent = customer.customer;
      row.elements.seller.textContent = customer.seller;
      row.elements.total.textContent = customer.total;

      return row.container;
    });

    root.elements.rows.replaceChildren(...nextRows);
  };

  return {
    container: container,
    elements: root.elements,
    render,
  };
}
