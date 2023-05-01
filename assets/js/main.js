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
  updateAllImages();
}

function buildSinglesRow() {
  let row = document.createElement("tr");
  for(let i=0;i<singles.length;i++){
    for(let j=0;j<extensions.length;j++){
      let cell = buildCell(singles[i],"",extensions[j]["extension"]);
      cell.setAttribute("data-base", extensions[j]["base"]);
      row.append(cell);
    }
  }
  s_table.append(row);
}

function buildCompositesTable() {
  composites.forEach(function(composite){buildCompositesRows(composite)});
}

function buildCompositesRows(name) {
  let rows = []
  for(let i=0;i<extensions.length;i++){
    let row = document.createElement("tr");
    row.setAttribute("data-base", extensions[i]["base"]);
    rows.push(row);
  }
  for(let i=0;i<c_prefixes.length;i++){
    for(let j=0;j<extensions.length;j++){
      rows[j].append(buildCell(name,c_prefixes[i],extensions[j]["extension"]));
    }
  }
  rows.forEach(function(row){c_table.append(row)});
}

function buildCell(name, prefix, extension) {
  let cell = document.createElement("td");
  let cell_name = buildCellName(name, prefix, extension);
  cell.append(buildCellHead(name, prefix, extension));
  cell.append(buildCellImage());
  cell.append(buildCellCheckbox());
  cell.setAttribute("data-name",  cell_name);
  cell.classList.add("tn-cell");
  return cell;
}

function buildCellHead(name, prefix, extension) {
  let cell_hd = document.createElement("p");
  cell_hd.textContent = buildCellName(name, prefix, extension);
  cell_hd.classList.add("cell_hd");
  return cell_hd;
}

function buildCellImage() {
  let img = document.createElement("img");
  img.classList.add("cell_image");
  return img;
}

function buildCellCheckbox() {
  let chkbx = document.createElement("input");
  chkbx.setAttribute("type", "checkbox");
  chkbx.setAttribute("name", "cell_cb");
  chkbx.setAttribute("onclick","cb_click()");
  chkbx.classList.add("cell_cb");
  return chkbx;
}

function buildCellName(name, prefix, extension) {
  return `${prefix}${name}.${extension}`
}

function updateAllImages(){
  let tds = document.getElementsByClassName("tn-cell");
  for(let i=0;i<tds.length;i++){
    updateCellImage(tds[i]);
  }
}

function updateCellImage(td) {
  img = td.getElementsByClassName("cell_image")[0];
  img.src = getCellImageUrl(td);
}

function getCellImageUrl(td) {
  let base = getCellBase(td);
  let cell_name = td.dataset["name"];
  return `${base}/${youtube_id}/${cell_name}`
}

function getCellBase(td) {
  return td.dataset["base"] || td.parentElement.dataset["base"];
}

let youtube_id_form = document.getElementById("youtube_id_form");
let youtube_id_form_input = document.getElementById("form_input");
function test(event) {
  event.preventDefault();
  youtube_id = youtube_id_form_input.value;
  updateAllImages();
}

function cb_click() {
  var chkbxs = document.querySelectorAll('input[name=cell_cb]:checked');
  let output_string = "";
  chkbxs.forEach(function(chkbx){ output_string += getDownloadCommand(chkbx.parentNode) });
  console.log(output_string);
}

function getDownloadCommand(cell) {
  return `${cell.dataset["name"]}\n`
}

buildTables();
