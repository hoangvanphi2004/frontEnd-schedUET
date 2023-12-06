let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}


document.querySelector('#search-icon').onclick = () => {
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () => {
  document.querySelector('#search-form').classList.remove('active');
}


function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable_data");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";

      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function myFunctionMaterial() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput_material");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable_data_material");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";

      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


/*************section and regristation js start******* */
/****************************************************** */

function deletetable_registration(i) {
  // Get the parent row of the clicked button 
  let row = i.parentNode.parentNode;

  // Remove the row from the table 
  row.parentNode.removeChild(row);
}

document.querySelectorAll('#icon_add').forEach(item => item.onclick = () => {
  document.querySelector('#modal_1').classList.toggle('active');
})

document.querySelector('#close_edit_regristration').onclick = () => {
  document.querySelector('#modal_1').classList.remove('active');
}
function edittable_resigstration(button) {
  // Get the parent row of the clicked button 
  let row = button.parentNode.parentNode;

  // Get the cells within the row 
  let CourseIdCell = row.cells[0];
  let CourseCell = row.cells[1];
  let CreditCell = row.cells[2];
  let DetailCell = row.cells[3];
  let DayCell = row.cells[4];
  let TeacherCell = row.cells[5];
  let RoomCell = row.cells[6];

  // Update the cell contents with the new values 
  CourseIdCell.innerHTML = CourseIdInput;
  CourseCell.innerHTML = CourseInput;
  CreditCell.innerHTML = CreditInput;
  DetailCell.innerHTML = DetailInput;
  DayCell.innerHTML = DayInput;
  TeacherCell.innerHTML = TeacherInput;
  RoomCell.innerHTML = RoomInput;
}

document.querySelector('#addtable_regristration').onclick = () => {
  document.querySelector('#modal').classList.toggle('active');
}



document.querySelector('#close_add_regristration').onclick = () => {
  document.querySelector('#modal').classList.remove('active');
  clearInputs();
}

function addData_regristration() {
  // Get input values 
  let CourseId =
    document.getElementById("CourseIdInput_add").value;
  let Course =
    document.getElementById("CourseInput_add").value;
  let Credit =
    document.getElementById("CreditInput_add").value;
  let Detail =
    document.getElementById("DetailInput_add").value;
  let Day =
    document.getElementById("DayInput_add").value;
  let Teacher =
    document.getElementById("TeacherInput_add").value;
  let Room =
    document.getElementById("RoomInput_add").value;

  // Get the table and insert a new row at the end 
  let table = document.getElementById("myTable_data");
  let newRow = table.insertRow(table.rows.length);

  if (CourseId == "") {
    confirm("You need ENTER CourseId");
    return;
  }
  if (Course == "") {
    confirm("You need ENTER Course");
    return;
  }
  if (Credit == "") {
    confirm("You need ENTER Credit");
    return;
  }
  if (Detail == "") {
    confirm("You need ENTER Detail");
    return;
  }
  if (Day == "") {
    confirm("You need ENTER Day");
    return;
  }
  if (Teacher == "") {
    confirm("You need ENTER Teacher");
    return;
  }
  if (Room == "") {
    confirm("You need ENTER Room");
    return;
  }

  
  // Insert data into cells of the new row 
  newRow.insertCell(0).innerHTML = CourseId;
  newRow.insertCell(1).innerHTML = Course;
  newRow.insertCell(2).innerHTML = Credit;
  newRow.insertCell(3).innerHTML = Detail;
  newRow.insertCell(4).innerHTML = Day;
  newRow.insertCell(5).innerHTML = Teacher;
  newRow.insertCell(6).innerHTML = Room;
  newRow.insertCell(7).innerHTML =
    '<i onclick="edittable_resigstration(this)" id="icon_add" class="fa-regular fa-pen-to-square"></i>';
  newRow.insertCell(8).innerHTML = ' <i onclick="deletetable_registration(this)" id="icon_delete" class="fa-solid fa-trash"></i>';


  confirm("Your Data added");
  clearInputs();
}

function clearInputs() {
  // Clear input fields 
  document.getElementById("CourseIdInput_add").value = "";
  document.getElementById("CourseInput_add").value = "";
  document.getElementById("CreditInput_add").value = "";
  document.getElementById("DetailInput_add").value = "";
  document.getElementById("DayInput_add").value = "";
  document.getElementById("TeacherInput_add").value = "";
  document.getElementById("RoomInput_add").value = "";
  document.querySelector('#addbutton_regristration').classList.remove('active');
  document.querySelector('#modal').classList.remove('active');
}

/*************section and regristation js End******* */
/*************************************************** */

/***********COurse js start*******/
/******************************** */

/********************************* */
/**********COURSE js end!!!!!!!! */
