import { createComparison, defaultRules } from "../lib/compare.js";

// #4.3 - настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // #4.1 - заполнить выпадающий список продавцами
    Object.values(indexes.sellers).forEach((seller) => {
        const option = document.createElement("option");
        option.value = seller;
        option.textContent = seller;
        elements.searchBySeller.append(option);
    });

    return (data, state, action) => {
        // #4.2 - обработать очистку поля
        if (action && action.name === "clear") {
            const field = action.dataset.field;

            const input = elements.filter.querySelector(
                `[name="${field}"]`
            );

            if (input) {
                input.value = "";
                state[field] = "";
            }
        }
const filterState = {
    ...state,
    total: [state.totalFrom, state.totalTo],
};

delete filterState.totalFrom;
delete filterState.totalTo;
        // #4.5 - отфильтровать данные
        return data.filter((item) => compare(item, filterState));
    };
}