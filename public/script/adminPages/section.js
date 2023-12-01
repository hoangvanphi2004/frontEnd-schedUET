let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

document.querySelector("#addtable_section_admin").onclick = () => {
  document.querySelector("#modal_section").classList.toggle("active");
};

document.querySelector("#close_add_section").onclick = () => {
  document.querySelector("#modal_section").classList.remove("active");
};

document.querySelector("#close_edit_section").onclick = () => {
  document.querySelector("#modal_1_section").classList.remove("active");
};

document.querySelector("#search-icon").onclick = () => {
  document.querySelector("#search-form").classList.toggle("active");
};

document.querySelector("#close").onclick = () => {
  document.querySelector("#search-form").classList.remove("active");
};

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

document.querySelectorAll("#icon_add").forEach(
  (item) =>
    (item.onclick = () => {
      document.querySelector("#modal_1").classList.toggle("active");
    })
);

//delete course
async function delete_section(element) {
  let sectionDataRow = element.parentNode.parentNode;
  let indexOfDash = 0;
  for (let i = element.id.length - 1; i >= 0; i--) {
    if (element.id[i] == "_") {
      indexOfDash = i;
      break;
    }
  }
  let num = element.id.substring(indexOfDash + 1);
  let courseID = sectionDataRow.querySelector(`#courseID-${num}`).textContent;
  let sectionID = sectionDataRow.querySelector(`#sectionID-${num}`).textContent;
  // let location = sectionDataRow.querySelector(`#location-${num}`).textContent;
  // let day = sectionDataRow.querySelector(`#day-${num}`).textContent;
  // let start = sectionDataRow.querySelector(`#start-${num}`).textContent;
  // let end = sectionDataRow.querySelector(`#end-${num}`).textContent;
  // let teacherID = sectionDataRow.querySelector(`#teacherID-${num}`).textContent;
  // let capacity = sectionDataRow.querySelector(`#capacity-${num}`).textContent;

  await axios
    .delete(`http://localhost:8000/sections/${courseID}/${sectionID}`)
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log("this is the error:");
      console.log(err.response.data);
      alert("Can't delete this account");
    });
}

//add course
async function addData_Section() {
  let courseID = document.querySelector(`#courseID_addInput`).value;
  let sectionID = document.querySelector(`#sectionID_addInput`).value;
  let Location = document.querySelector(`#location_addInput`).value;
  let day = document.querySelector(`#day_addInput`).value;
  let start = document.querySelector(`#start_addInput`).value;
  let end = document.querySelector(`#end_addInput`).value;
  let teacherID = document.querySelector(`#teacherID_addInput`).value;
  let capacity = document.querySelector(`#capacity_addInput`).value;

  console.log({
    courseID: courseID,
    sectionID: sectionID,
    location: Location,
    day: day,
    start: start,
    end: end,
    teacherID: teacherID,
    capacity: capacity,
  });

  await axios
    .post("http://localhost:8000/sections", {
      courseID: courseID,
      sectionID: sectionID,
      location: Location,
      day: day,
      start: start,
      end: end,
      teacherID: teacherID,
      capacity: capacity,
    })
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log("this is the error:");
      console.log(err.response.data);
      alert("Can't add this course");
    });
}

//edit course
let editedCourseID = 0;
let editedSectionID = 0;
function openEditTab(element) {
  let sectionDataRow = element.parentNode.parentNode;
  let indexOfDash = 0;
  for (let i = element.id.length - 1; i >= 0; i--) {
    if (element.id[i] == "_") {
      indexOfDash = i;
      break;
    }
  }
  let num = element.id.substring(indexOfDash + 1);
  let courseID = sectionDataRow.querySelector(`#courseID-${num}`).textContent;
  let sectionID = sectionDataRow.querySelector(`#sectionID-${num}`).textContent;
  let Location = sectionDataRow.querySelector(`#location-${num}`).textContent;
  let day = sectionDataRow.querySelector(`#day-${num}`).textContent;
  let start = sectionDataRow.querySelector(`#start-${num}`).textContent;
  let end = sectionDataRow.querySelector(`#end-${num}`).textContent;
  let teacherID = sectionDataRow.querySelector(`#teacherID-${num}`).textContent;
  let capacity = sectionDataRow.querySelector(`#capacity-${num}`).textContent;

  document.querySelector("#courseID_editInput").value = courseID;
  document.querySelector("#sectionID_editInput").value = sectionID;
  document.querySelector("#location_editInput").value = Location;
  document.querySelector("#day_editInput").value = day;
  document.querySelector("#start_editInput").value = start;
  document.querySelector("#end_editInput").value = end;
  document.querySelector("#teacherID_editInput").value = teacherID;
  document.querySelector("#capacity_editInput").value = capacity;
  document.querySelector("#modal_1_section").classList.toggle("active");

  editedCourseID = courseID;
  editedSectionID = sectionID;
}

async function editData_Section() {
  let courseID = document.querySelector("#courseID_editInput").value;
  let sectionID = document.querySelector("#sectionID_editInput").value;
  let Location = document.querySelector("#location_editInput").value;
  let day = document.querySelector("#day_editInput").value;
  let start = document.querySelector("#start_editInput").value;
  let end = document.querySelector("#end_editInput").value;
  let teacherID = document.querySelector("#teacherID_editInput").value;
  let capacity = document.querySelector("#capacity_editInput").value;

  await axios
    .put(`http://localhost:8000/sections/${courseID}/${sectionID}`, {
      courseID: courseID,
      sectionID: sectionID,
      location: Location,
      day: day,
      start: start,
      end: end,
      teacherID: teacherID,
      capacity: capacity,
    })
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log(err.response.data);
      alert("Can't edit this teacher information");
    });
}
