
// srtf(shortest remaining time first ) algorithm is a pre-emptive version of sjf algorithm
//  when all the processes executed once this algorithm becomes non pre-emptive(sjf)
// this algorithm provides cpu to that process which has shortest remaining time(minimum burst time)


//  funtion for adding a process
// this function add a process in a table when user enters the respective values

function add_process(process_a) {
  let arrivalTime = parseInt(document.getElementById("arrival-time").value, 10);
  let burstTime = parseInt(document.getElementById("brust-time").value, 10);
  let tableBody = document.querySelector(".table>table>tbody");


  // following if conditions checks the value of arrival time and burst time
  // if arrival time is negative and burst time is negative and zero it will shows a messege 'please enter valid entries'
  if (
    Number.isInteger(arrivalTime) &&
    Number.isInteger(burstTime) &&
    burstTime > 0 &&       //  condition for burst time (burst time is neither negative nor zero.because whenever process get cpu it has some cpu time to exexute)
    arrivalTime >= 0      //  condition for arrival time (arrival time can be zero but not negative)
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

var pid;
var g = [];
var array_process = [];
var data = {
  header: ["processId", "TAT"],
  rows: [],
};


// algorithm

function main_algorithm(process_a) {
  array_process = [];
  let times = ["st", "ct", "rt", "wt", "tat"];            
  let rowLength = table.rows.length;

  for (let i = 1; i < rowLength; i++) {   // time complexity=o(rowLength)
    array_process.push({
      at: parseInt(table.rows.item(i).cells.item(1).innerHTML, 10),   // pushes the arrival time , burst time and process id in a table
      bt: parseInt(table.rows.item(i).cells.item(2).innerHTML, 10),
      rbt: parseInt(table.rows.item(i).cells.item(2).innerHTML, 10),
      pid: "P" + i,
    });
  }

  array_process = calculate_all_average_times(array_process);
  console.log(array_process);
  let average_tat = 0,        // initially all average time are taken as zero
    average_wating_time = 0,
    average_response_time = 0;

  for (let i = 0; i < array_process.length; i++) {    // time complexity=o(array_process.length)
    average_tat =average_tat+array_process[i].tat;
    average_wating_time =average_wating_time+array_process[i].wt;
    average_response_time =average_response_time + array_process[i].rt;
    for (let j = 0; j < 5; j++) {
      document.querySelector(
        `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(${j + 4})`
      ).innerHTML = array_process[i][times[j]];
    }
  }



  document.querySelector(".container>div:first-child>.avg-tat>span").innerHTML =
  (average_tat / array_process.length).toFixed(2) == "NaN"
    ? 0
    : (average_tat/ array_process.length).toFixed(2);
document.querySelector(".container>div:first-child>.avg-wt>span").innerHTML =
  (average_wating_time / array_process.length).toFixed(2) == "NaN"
    ? 0
    : (average_wating_time / array_process.length).toFixed(2);
document.querySelector(".container>div:first-child>.avg-rt>span").innerHTML =
  (average_response_time / array_process.length).toFixed(2) == "NaN"
    ? 0
    : (average_response_time/ array_process.length).toFixed(2);

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
function calculate_all_average_times(t) {    // time complexity=o(t.length)   because for loop traverse the array for all elements.
  let time = Infinity;
  for (let i = 0; i < t.length; i++) {
    if (t[i].at < time) {
      time = t[i].at;
    }
  }

  while (t.find((el) => el.finish == undefined)) {
    let minimum_burst_time = Infinity;
    let process = {};
    for (let i = 0; i < t.length; i++) {
      if (t[i].at <= time && t[i].finish != true && t[i].rbt < minimum_burst_time) {
        process = t[i];
        minimum_burst_time = t[i].rbt;
      }
    }
    if (process.st == undefined) {
      process.st = time;
      process.rt = process.st - process.at;
    }
    time = time + 1;
    process.rbt =process.rbt- 1;
    g.push(process.pid);
    if (process.rbt == 0) {
      process.ct = time;
      process.tat = process.ct - process.at;
      process.wt = process.tat - process.bt;
      process.finish = true;
    }
  }
  return t;
}

