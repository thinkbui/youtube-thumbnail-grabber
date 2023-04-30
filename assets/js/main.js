const singles = ["0"];
const composites = ["default","1","2","3"];
const c_prefixes = ["","mq","hq","sd","maxres"];
const extensions = [{"extension":"jpg","base":"https://i.ytimg.com/vi"},{"extension":"webp","base":"https://i.ytimg.com/vi_webp"}];

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
    for(let j=0;j<extensions.length;j++){
      row.append(buildCell(singles[i],"",extensions[j]["extension"]));
    }
  }
  s_table.append(row);
}

function buildCompositesTable() {
  composites.forEach(function(composite){buildCompositesRows(composite)});
}

function buildCompositesRows(name) {
  let rows = extensions.map(function(){return document.createElement("tr")});
  for(let i=0;i<c_prefixes.length;i++){
    for(let j=0;j<extensions.length;j++){
      rows[j].append(buildCell(name,c_prefixes[i],extensions[j]["extension"]));
    }
  }
  rows.forEach(function(row){c_table.append(row)});
}

function buildCell(name, prefix, extension) {
  let cell = document.createElement("td");
  cell.textContent = `${prefix}${name}.${extension}`;
  return cell;
}

buildTables();
