





// --adding process--


function add_process(process_a) {
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
    arrivalTime >= 0    )

   

    // this will create table when user enters the values of arrival time and burst time.
    { document.querySelector(".error").style.display = "none";    
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


    // TIME COMPLEXITY= 0(TABLE.ROWS.LENGTH)
    for (let i = 0; i < table.rows.length; i++) {
      document.querySelector(`.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)`).innerHTML = "P" + (i + 1);  }  }
        
      
  
 else {
    document.querySelector(".error").style.display = "block"; }}
 




//-----------For delete process ..if user wnat to delete particular process row 
                                    //then by clicking "del "   button it can be deleted.

        
      //  TIME COMPLEXITY= O(1)  CONSTANT BECAUSE FOR DELETING EACH PROCESS ONLY 1 STEP IS REQUIRED..                              
function delete_process(process_a) {                       
  if (!process_a.target.classList.contains("del"))           
            
    return;
  
  let deleteButton = process_a.target;
  deleteButton.closest("tr").remove();

  for (let i = 0; i < table.rows.length; i++) {
    document.querySelector( `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)` ).innerHTML = "P" + (i + 1);}}
  
     
   


function reset_table(process_a)      // this function reset the entire table..

 { location.reload();}


var array_process = [];
var rowLength;
var pid;
var data = {
  header: ["processId", "TAT"],
  rows: [],
};


//-------------------------------------------------SECTION 2 - SHORTEST JOB FIRST ALGORITHM ,CHART AND DEFINATION OF DIFFERENT TIMES -------------------------------------------------------------------------------//



// time complexity=  o(rowlength)
function main_algorithm(process_a) {
  let times = ["st", "ct", "rt", "wt", "tat"];
  rowLength = table.rows.length;

  for (let i = 1; i < rowLength; i++) {
    array_process.push({
      at: parseInt(table.rows.item(i).cells.item(1).innerHTML, 10),
      bt: parseInt(table.rows.item(i).cells.item(2).innerHTML, 10),
      pid: "P" + i,
    });
  }


    //defining average turn around,waiting and response time--


  array_process = calculate_all_average_times(array_process);

  let avgTAT = 0,
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
    var keyA = a.ct,
      keyB = b.ct;
   
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




     //-----------FOR CREATION OF GANTT CHART--------------------------------------//


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


// time complexity=o(arr.length)..
function calculate_all_average_times(arr)           //   calucates the CT,TAT,WT RT and ST..
{
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
    time += process.bt;                        //  formulas for finding RT,TAT and WT..
    process.ct = time;                        //COMPLETION TIME                          
    process.rt = process.st - process.at;    // RESPONSE TIME            RT(response time)=  ST(schedule time) - AT(arrival time).
    process.tat = process.ct - process.at;   // TURN AROUND TIME           TAT(turn around time)=CT(completion time) - AT(arrival time) 
    process.wt = process.tat - process.bt;   // WAITING TIME     WT(waiting time)= TAT(turn around time) - BT(burst time)
  }
  return arr;
}

