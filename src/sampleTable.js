import { initTable } from "./components/table";
import { render } from "./main";

export const sampleTable = initTable(
  {
    tableTemplate: "table",
    rowTemplate: "row",
    before: [],
    after: ["pagination"],
  },
  render,
);
