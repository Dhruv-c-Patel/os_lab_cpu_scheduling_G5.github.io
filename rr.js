






//  funtion for adding a process
// this function add a process in a table when user enters the respective values

function add_process(process_a) {
  let arrivalTime = parseInt(document.getElementById("arrival-time").value, 10);
  let burstTime = parseInt(document.getElementById("brust-time").value, 10);
  let tableBody = document.querySelector(".table>table>tbody");


  // following if conditions checks the value of arrival time and burst time
  // if arrival time is negative and burst time is negative and zero it will shows a messege 'please enter valid entries

  if (
    Number.isInteger(arrivalTime) &&
    Number.isInteger(burstTime) &&
    burstTime > 0 &&                                           //  condition for burst time (burst time is neither negative nor zero.because whenever process get cpu it has some cpu time to exexute)
    arrivalTime >= 0                                          //  condition for arrival time (arrival time can be zero but not negative)
  ) {
    document.querySelector(".error").style.display = "none";
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
  } else {
    document.querySelector(".error").innerHTML = "Invalid Input";
    document.querySelector(".error").style.display = "block";
  }
}


// function for delete a process
// if user want to delete a process than he/she can delete by pressing the delete button

function delete_process(process_a) {
  if (!process_a.target.classList.contains("del")) {
    return;
  }
  let deleteButton = process_a.target;
  deleteButton.closest("tr").remove();

  for (let i = 0; i < table.rows.length; i++) {
    document.querySelector(
      `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)`
    ).innerHTML = "P" + (i + 1);
  }
}


// function for reseting the whole table
// if user want to enter new fresh values than he/she can reset the table and again insert the values

function reset_table(process_a) {
  location.reload();
}

var array_process = [];
var g = [];
var tm = [];
var pid = [];
var data = {
  header: ["processId", "TAT"],
  rows: [],
};

function main_algorithm(process_a) {
  array_process = [];
  let times = ["st", "ct", "rt", "wt", "tat"];
  let rowLength = table.rows.length;
  let timeQ = parseInt(document.getElementById("time-q").value, 10);

  if (!Number.isInteger(timeQ)) {
    document.querySelector(".error").innerHTML = "please insert the value of time";
    document.querySelector(".error").style.display = "block";
    return;
  }
  document.querySelector(".error").style.display = "none";

  for (let i = 1; i < rowLength; i++) {
    array_process.push({
      at: parseInt(table.rows.item(i).cells.item(1).innerHTML, 10),                // pushes the arrival time , burst time and process id in a table
      bt: parseInt(table.rows.item(i).cells.item(2).innerHTML, 10),
      rbt: parseInt(table.rows.item(i).cells.item(2).innerHTML, 10),
      pid: "P" + i,
    });
  }

  array_process = calculate_all_average_times(array_process, timeQ);
  let avgTAT = 0,                                  // initially all average time are taken as zero
    avgWT = 0,
    avgRT = 0;

  for (let i = 0; i < array_process.length; i++) {
    avgTAT += array_process[i].tat;
    avgWT += array_process[i].wt;
    avgRT += array_process[i].rt;
    for (let j = 0; j < 5; j++) {
      document.querySelector(
        `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(${j + 4})`
      ).innerHTML = array_process[i][times[j]];
    }
  }

  document.querySelector(".container>div:first-child>.avg-tat>span").innerHTML =
    (avgTAT / array_process.length).toFixed(2) == "NaN"
      ? 0
      : (avgTAT / array_process.length).toFixed(2);
  document.querySelector(".container>div:first-child>.avg-wt>span").innerHTML =
    (avgWT / array_process.length).toFixed(2) == "NaN"
      ? 0
      : (avgWT / array_process.length).toFixed(2);
  document.querySelector(".container>div:first-child>.avg-rt>span").innerHTML =
    (avgRT / array_process.length).toFixed(2) == "NaN"
      ? 0
      : (avgRT / array_process.length).toFixed(2);

  array_process.sort(function (a, b) {
    var keyA = a.st,
      keyB = b.st;
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  tableCreate();
  console.log(array_process);
  array_process.forEach((a, index) => {
    data.rows[index] = [a.pid, a.tat];
  });

  anychart.onDocumentReady(function () {
    // anychart.theme(anychart.themes.darkEarth);

    // set a data from process array for tat chart

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



// function for calculating average times
// this function will calculate average turn around time,waiting time and response time
function calculate_all_average_times(arr, timeQ) {                  
  let time = Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].at < time) {
      time = arr[i].at;
    }
  }

  while (arr.find((el) => el.finish == undefined)) {
    let sortedArr = [...arr];
    sortedArr.sort((a, b) => a.at - b.at);

    let pArr = [];
    for (let i = 0; i < sortedArr.length; i++) {
      if (sortedArr[i].at <= time && sortedArr[i].finish != true) {
        pArr.push(sortedArr[i]);
      }
    }
    if (pArr.length == 0) {
      time++;
      continue;
    }
    for (let i = 0; i < pArr.length; i++) {
      if (pArr[i].st == undefined) {
        pArr[i].st = time;
        pArr[i].rt = pArr[i].st - pArr[i].at;
      }
      time = time + Math.min(timeQ, pArr[i].rbt);
      pArr[i].rbt = pArr[i].rbt - Math.min(timeQ, pArr[i].rbt);
      g.push(pArr[i].pid);
      tm.push(time);
      if (pArr[i].rbt == 0) {
        pArr[i].ct = time;
        pArr[i].tat = pArr[i].ct - pArr[i].at;
        pArr[i].wt = pArr[i].tat - pArr[i].bt;
        pArr[i].finish = true;
      }

      for (let j = i + 1; j < sortedArr.length; j++) {
        if (
          sortedArr[j].at <= time &&
          sortedArr[j].finish != true &&
          !pArr.includes(sortedArr[j])
        ) {
          pArr.push(sortedArr[j]);
        }
      }
      if (pArr[i].rbt != 0) {
        pArr.push(pArr[i]);
      }
    }
  }
  console.log(g);
  console.log(tm);
  return arr;
}



