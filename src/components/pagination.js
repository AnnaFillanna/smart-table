import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    // @todo: #2.3 — подготовить шаблон кнопки для страницы и очистить контейнер
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.innerHTML = '';



    return (data, state, action) => {
        const total = data.length;
        const pageSize = Number(state.rowsPerPage) || 10;
        const pageCount = Math.ceil(total / pageSize);
        state.page = Number(state.page) || 1;
        

        // @todo: #2.6 — обработать действия
if (action?.name === 'next') {
            state.page = Math.min(state.page + 1, pageCount);
}
if (action?.name === 'prev') {
            state.page = Math.max(state.page - 1, 1);
}
if (action?.name === 'first') {
            state.page = 1;
}
if (action?.name === 'last') {
            state.page = pageCount;
}
const skip = (state.page - 1) * pageSize;

        // @todo: #2.4 — получить список видимых страниц и вывести их
      
        const visiblePages = getPages(state.page, pageCount, 5);
       const pageButtons = visiblePages.map((page) => {
    const button = pageTemplate.cloneNode(true);
    const input = button.querySelector('input');

    input.value = page;
    input.checked = page === state.page;

    button.querySelector('span').textContent = page;

    return button;
});
        pages.replaceChildren(...pageButtons);

        // @todo: #2.5 — обновить статус пагинации
        fromRow.textContent = skip + 1;
        toRow.textContent = Math.min(skip + pageSize, total);
        totalRows.textContent = total;  
        // @todo: #2.2 — посчитать сколько строк нужно пропустить и получить срез данных
        return data.slice(skip, skip + pageSize);
    }
}