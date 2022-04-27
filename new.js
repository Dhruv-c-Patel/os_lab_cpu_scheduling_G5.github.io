let add_button = document.querySelector(
    ".container>div:last-child>.add-process>.add"
  );
  let table = document.querySelector(".table>table");
  let play_button = document.querySelector(
    ".container>div:first-child>.buttons>.play"
  );
  let reset_button = document.querySelector(
    ".container>div:first-child>.buttons>.reset"
  );
  
  add_button.addEventListener("click", add_process);
  table.addEventListener("click", delete_process);
  play_button.addEventListener("click", main_algorithm);
  reset_button.addEventListener("click", reset_table);



 

var row1 = document.getElementById("row1");
var row = document.getElementById("row");
var colors = [
  "#58508d",
  "#bc5090",
  "#ff6361",
  "#ffa600",
  "#fc979e",
  "#a8f796",
  "#b0f287",
  "#f49381",
  "#b2ffda",
];

function tableCreate() {
  var z = row1.insertCell(0);
  var w = row2.insertCell(0);
  z.id = "cell1";
  w.id = "cell2";
  document.getElementById("cell1").style.width = "80px";
  document.getElementById("cell2").style.width = "80px";
  z.innerHTML = "Start Time";
  w.innerHTML = array_process[0].st;
  document.getElementById("cell1").style.border = "none";
  document.getElementById("cell2").style.border = "none";
  document.getElementById("cell1").style.background = "#e0e0e0";
  document.getElementById("cell2").style.background = "#e0e0e0";
  document.getElementById("cell1").style.textAlign = "center";
  document.getElementById("cell2").style.textAlign = "center";
  for (let i = 0; i < g.length; i++) {
    var f = i % 9;
    var x = row1.insertCell(i + 1);
    var y = row2.insertCell(i + 1);
    if(g[i] == undefined){
      x.innerHTML = 'CPU Idle';
    }
    else{
    x.innerHTML = g[i];
    }
    y.innerHTML = Number(w.innerHTML) + Number(i) + 1;
    x.id = "c" + i;
    y.id = "cc" + i;
    document.getElementById("c" + i).style.width = "50px";
    document.getElementById("cc" + i).style.width = "50px";
    document.getElementById("c" + i).style.height = "35px";
    document.getElementById("cc" + i).style.height = "35px";
    document.getElementById("am").style.margin = "20px";
    document.getElementById("am").style.padding = "20px";
    document.getElementById("c" + i).style.backgroundColor = colors[f];
    document.getElementById("cc" + i).style.backgroundColor = colors[f];
    document.getElementById("c" + i).style.textAlign = "center";
    document.getElementById("cc" + i).style.textAlign = "center";
    document.getElementById("c" + i).style.border = "none";
    document.getElementById("cc" + i).style.border = "none";
  }
}