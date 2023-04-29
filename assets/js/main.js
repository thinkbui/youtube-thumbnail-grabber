const singles = ["0"];
const composites = ["default","1","2","3"];
const c_prefixes = ["","mq","hq","sd","maxres"];
const extensions = ["jpg"];

const s_table = document.getElementById("singles");
const c_table = document.getElementById("composites");

let youtube_id = "Y7dpJ0oseIA";

function buildTables() {
  buildSinglesRow();
  buildCompositesTable();
}

function buildSinglesRow() {
  let row = document.createElement("tr");
  for(let i=0;i<singles.length;i++){
    row.append(buildCell(singles[i],""));
  }
  s_table.append(row);
}

function buildCompositesTable() {
  for(let i=0;i<composites.length;i++){
    buildCompositesRow(composites[i]);
  }
}

function buildCompositesRow(name) {
  let row = document.createElement("tr");
  for(let i=0;i<c_prefixes.length;i++){
    row.append(buildCell(name,c_prefixes[i]));
  }
  c_table.append(row);
}

function buildCell(name, prefix) {
  let cell = document.createElement("td");
  cell.textContent = `${prefix}${name}.${extensions[0]}`;
  return cell;
}

buildTables();
