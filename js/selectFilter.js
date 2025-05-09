export function generateFilter(name, items) {
  const filter = document.createElement("select");
  const optionAll = createOptionAll();

  filter.name = `${name.toLowerCase()}Filter`;
  filter.append(optionAll);

  items.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    filter.append(option);
  });

  return filter;
}

function createOptionAll() {
  const optionAll = document.createElement("option");
  optionAll.value = "all";
  optionAll.textContent = "All";

  return optionAll;
}
