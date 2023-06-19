const singles = ["0"];
const composites = ["default","1","2","3"];
const c_prefixes = ["","mq","hq","sd","maxres"];
const extensions = [{"extension":"jpg","base":"https://i.ytimg.com/vi"},{"extension":"webp","base":"https://i.ytimg.com/vi_webp"}];

const s_table = document.getElementById("singles");
const c_table = document.getElementById("composites");
const blank_img_url = "./assets/images/blank.jpg";

let youtube_id_form = document.getElementById("youtube_id_form");
let youtube_id_form_input = document.getElementById("form_input");
let download_list = document.getElementById("download_list");
let youtube_id = "";

function buildTables() {
  buildSinglesRow();
  buildCompositesTable();
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
  cell.append(buildCellLink());
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

function buildCellLink() {
  let a = document.createElement("a");
  a.append(buildCellImage());
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.classList.add("cell_link");
  return a;
}

function buildCellImage() {
  let img = document.createElement("img");
  img.src = blank_img_url;
  img.classList.add("cell_image");
  return img;
}

function buildCellCheckbox() {
  let chkbx = document.createElement("input");
  chkbx.setAttribute("type", "checkbox");
  chkbx.setAttribute("name", "cell_cb");
  chkbx.setAttribute("onclick","cbClick()");
  chkbx.classList.add("cell_cb");
  return chkbx;
}

function buildCellName(name, prefix, extension) {
  return `${prefix}${name}.${extension}`
}

function updateAllImages(){
  let tds = document.getElementsByClassName("tn-cell");
  for(let i=0;i<tds.length;i++){
    updateCellLink(tds[i]);
    updateCellImage(tds[i]);
  }
}

function clearAllImages(){
  let tds = document.getElementsByClassName("tn-cell");
  for(let i=0;i<tds.length;i++){
    clearCellLink(tds[i]);
    clearCellImage(tds[i]);
  }
}

function updateCellLink(td) {
  let a = td.getElementsByClassName("cell_link")[0];
  a.href = getCellImageUrl(td);
}

function updateCellImage(td) {
  img = td.getElementsByClassName("cell_image")[0];
  img.src = getCellImageUrl(td);
}

function clearCellLink(td) {
  let a = td.getElementsByClassName("cell_link")[0];
  a.removeAttribute("href");
}

function clearCellImage(td) {
  img = td.getElementsByClassName("cell_image")[0];
  img.src = blank_img_url;
}

function getCellImageUrl(td) {
  let base = getCellBase(td);
  let cell_name = td.dataset["name"];
  return `${base}/${youtube_id}/${cell_name}`
}

function getCellBase(td) {
  return td.dataset["base"] || td.parentElement.dataset["base"];
}

function formSubmit(event) {
  event.preventDefault();
  youtube_id = youtube_id_form_input.value;
  if(youtube_id) {
    updateAllImages();
    clearDownloadList();
  }
}

function formReset(event) {
  event.preventDefault();
  youtube_id = "";
  youtube_id_form_input.value = "";
  clearAllImages();
  clearDownloadList();
}

function cbClick() {
  if(youtube_id) {
    var chkbxs = document.querySelectorAll('input[name=cell_cb]:checked');
    let output_string = "";
    chkbxs.forEach(function(chkbx){ output_string += getDownloadCommand(chkbx.parentNode) });
    download_list.value = output_string;
  }
}

function getDownloadCommand(cell) {
  return `curl -o ${downloadFileName(cell.dataset["name"])} ${getCellImageUrl(cell)}\n`
}

function downloadFileName(name) {
  let split_name = name.split(".");
  let shortname = split_name.slice(0,split_name.length-1).join(".");
  let ext = split_name[split_name.length-1];
  return `"YouTube ${youtube_id} ${shortname}.${ext}"`
}

function copyToClipboard() {
  if (youtube_id && download_list.value) {
    if(navigator.clipboard) {
      navigator.clipboard.writeText(download_list.value)
        .then(function() {console.log("Successfully copied to clipboard.")})
        .catch(function() {console.log("Could not copy.")});
    } else {
      download_list.select();
      document.execCommand("copy");
    }
  } else {
    console.log("Nothing to copy.");
  }
}

function clearDownloadList() {
  download_list.value = ""
  var chkbxs = document.querySelectorAll('input[name=cell_cb]:checked');
  chkbxs.forEach(function(chkbx) {chkbx.checked = false})
}

buildTables();
