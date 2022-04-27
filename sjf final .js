//--------------------------------------------------------------SECTION 1- BUTTONS AND INPUT TABLE----------------------------------------------------------------------------------//
//--defining add button--       for adding processes .

let add_button = document.querySelector(
  ".container>div:last-child>.add-process>.add"
);
let table = document.querySelector(".table>table");

//--defining compute button--     for computing the inserted values.

let play_button = document.querySelector(
  ".container>div:first-child>.buttons>.play"
);
//--defining reset button--    for reseting the whole table and inserting values again

let reset_button = document.querySelector(
  ".container>div:first-child>.buttons>.reset"
);
add_button.addEventListener("click", add_process);
table.addEventListener("click", delete_process);
play_button.addEventListener("click", run_algorithm);
reset_button.addEventListener("click", reset_table);

// --adding process--


function add_process(e) {
  let arrivalTime = parseInt(document.getElementById("arrival-time").value, 10);
  let burstTime = parseInt(document.getElementById("brust-time").value, 10);
  let tableBody = document.querySelector(".table>table>tbody");


   // --------for showing error for invalid input --------------(THAT IS FOR NEGATIVE OR ZERO INPUT )----

  //  this if condition checks for the arrival time &burst time.
  // if arrival time and burst time is negative it throws an error that please input valid entries.


  if (
    Number.isInteger(arrivalTime) &&
    Number.isInteger(burstTime) &&
    burstTime > 0 &&
    arrivalTime >= 0
  ) {
    document.querySelector(".error").style.display = "none";     

    // this will create table when user enters the values of arrival time and burst time.

    tableBody.innerHTML += `<tr>
        <td></td>
        <td>${arrivalTime}</td>
        <td>${burstTime}</td>
        <td></td>
        <td></td>                                   
        <td></td>
        <td></td>
        <td></td>
        <td class="del">delete_row</td>
      </tr>`;
    document.getElementById("arrival-time").value = "";
    document.getElementById("brust-time").value = "";
    for (let i = 0; i < table.rows.length; i++) {
      document.querySelector(
        `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)`
      ).innerHTML = "P" + (i + 1);
    }
  }
 
  else {
    document.querySelector(".error").style.display = "block";
  }
}
//-----------For delete process ..if user wnat to delete particular process row 
                                    //then by clicking "del "   button it can be deleted.
 
function delete_process(e) {
  if (!e.target.classList.contains("del")) {
    return;
  }
  let deleteButton = e.target;
  deleteButton.closest("tr").remove();
  for (let i = 0; i < table.rows.length; i++) {
    document.querySelector(
      `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)`
    ).innerHTML = "P" + (i + 1);
  }
}
//-----------------------for creating table
function tableCreate() {
  var z = row1.insertCell(0);
  var w = row2.insertCell(0);
  z.id = "cell1";
  w.id = "cell2";
  document.getElementById("cell1").style.width = "80px";
  document.getElementById("cell2").style.width = "80px";
  z.innerHTML = "Start Time";
  w.innerHTML = processArr[0].st;
  document.getElementById("cell1").style.border = "none";
  document.getElementById("cell2").style.border = "none";
  document.getElementById("cell1").style.background = "#e0e0e0";
  document.getElementById("cell2").style.background = "#e0e0e0";
  document.getElementById("cell1").style.textAlign = "center";
  document.getElementById("cell2").style.textAlign = "center";
  for (let i = 0; i < rowLength - 1; i++) {
    var f = i % 9;
    var x = row1.insertCell(i + 1);
    var y = row2.insertCell(i + 1);
    x.id = "c" + i;
    y.id = "cc" + i;
    x.innerHTML = processArr[i].pid;
    y.innerHTML = processArr[i].ct;
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

//--------for reseting table
function reset_table(e) {
  location.reload();
}
var processArr = [];
var rowLength;
var pid;
var data = {
  header: ["processId", "TAT"],
  rows: [],
};
//-------------------------------------------------SECTION 2 - SHORTEST JOB FIRST ALGORITHM ,CHART AND DEFINATION OF DIFFERENT TIMES -------------------------------------------------------------------------------//
function run_algorithm(e) {
  // defining st,ct,rt,wt,tat---
  let times = ["st", "ct", "rt", "wt", "tat"];
  rowLength = table.rows.length;
  for (let i = 1; i < rowLength; i++) {
    processArr.push({
      at: parseInt(table.rows.item(i).cells.item(1).innerHTML, 10),
      bt: parseInt(table.rows.item(i).cells.item(2).innerHTML, 10),
      pid: "P" + i,
    });
  }
  processArr = calculateAllTimes(processArr);
  //defining average turn around,waiting and response time--
  let avgTAT = 0,
    avgWT = 0,
    avgRT = 0;
  for (let i = 0; i < processArr.length; i++) {
    avgTAT += processArr[i].tat;
    avgWT += processArr[i].wt;
    avgRT += processArr[i].rt;
    for (let j = 0; j < 5; j++) {
      document.querySelector(
        `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(${j + 4})`
      ).innerHTML = processArr[i][times[j]];
    }
  }
  document.querySelector(".container>div:first-child>.avg-tat>span").innerHTML =
    (avgTAT / processArr.length).toFixed(2) == "NaN"
      ? 0
      : (avgTAT / processArr.length).toFixed(2);
  document.querySelector(".container>div:first-child>.avg-wt>span").innerHTML =
    (avgWT / processArr.length).toFixed(2) == "NaN"
      ? 0
      : (avgWT / processArr.length).toFixed(2);
  document.querySelector(".container>div:first-child>.avg-rt>span").innerHTML =
    (avgRT / processArr.length).toFixed(2) == "NaN"
      ? 0
      : (avgRT / processArr.length).toFixed(2);
  processArr.sort(function (a, b) {
    var keyA = a.ct, keyB = b.ct;
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  tableCreate();
  console.log(processArr);
  processArr.forEach((a, index) => {
    data.rows[index] = [a.pid, a.tat];
  });
  //-----------FOR CREATION OF GANTT CHART--------------------------------------//
  anychart.onDocumentReady(function () {
    console.log(data);
    // create the chart
    var chart = anychart.bar();
    // add data
    chart.data(data);
    // set the chart title
    chart.title("process TAT comparison");
    // draw
    chart.container("container");
    chart.draw();
  });
}
//----------------------------------------------------------SECTION 3 - CALCULATION OF TIMES-------------------------------------------------------------------------------
function calculateAllTimes(arr) {
  let time = Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].at < time) {
      time = arr[i].at;
    }
  }
  while (arr.find((el) => el.finish == undefined)) {
    let minBT = Infinity;
    let process = {};
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].at <= time && arr[i].finish != true && arr[i].bt < minBT) {
        minBT = arr[i].bt;
        process = arr[i];
      }
    }
    if (minBT === Infinity) {
      time++;
      continue;
    }
    process.st = time;
    process.finish = true;
    time += process.bt;
    process.ct = time;//COMPLETION TIME                            
    process.rt = process.st - process.at;//RESPONSE TIME              // RT(response time)=  ST(schedule time) - AT(arrival time).
    process.tat = process.ct - process.at;//TURN AROUND TIME            //  TAT(turn around time)=CT(completion time) - AT(arrival time)
    process.wt = process.tat - process.bt;//WAITING TIME                  //   WT(waiting time)= TAT(turn around time) - BT(burst time)
  }
  return arr;
}
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
//-------------------------------------------------------------SECTION 4 : TIME COMPLEXITY---------------------------------------------------------------------------------------------
/*     time complexity of sjf algorithm is 0(Nlog(N))