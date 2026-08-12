import {sortCollection, sortMap} from "../lib/sort.js";

export function initSorting(columns) {
    return (data, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            // @todo: #3.1 — запомнить выбранный режим сортировки
field = action.dataset.field;
            order = sortMap[action.dataset.value];
            action.dataset.value = order;
            // @todo: #3.2 — сбросить сортировки остальных колонок
            columns.forEach((column) => {
                if (column !== action) {
                    column.dataset.value = 'none';
                }
            });
        } else {
            // @todo: #3.3 — получить выбранный режим сортировки
            const selected = [...columns].find (
                (column) => column.dataset.value !== 'none'
            );
            if (selected) {
                field = selected.dataset.field;
                order = selected.dataset.value;
            }
    }
        return sortCollection(data, field, order);
    }
}