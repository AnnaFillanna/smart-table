export function initSearching(searchField) {
  return (query, state, action) => {
    return searchField.value
      ? Object.assign({}, query, {
          search: searchField.value,
        })
      : query;
  };
}
