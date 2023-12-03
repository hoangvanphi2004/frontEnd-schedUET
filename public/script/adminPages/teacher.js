document.querySelector("#addtable_teacher_admin").onclick = () => {
  document.querySelector("#modal_teacher").classList.toggle("active");
};

document.querySelector("#close_add_teacher").onclick = () => {
  document.querySelector("#modal_teacher").classList.remove("active");
  clearInputs();
};

document.querySelectorAll("#icon_add_teacher").forEach(
  (item) =>
    (item.onclick = () => {
      document.querySelector("#modal_1_teacher").classList.toggle("active");
    })
);

document.querySelector("#close_edit_teacher").onclick = () => {
  document.querySelector("#modal_1_teacher").classList.remove("active");
};


//delete teacher
async function delete_teacher(element) {
  let teacherDataRow = element.parentNode.parentNode;
  let indexOfDash = 0;
  for (let i = element.id.length - 1; i >= 0; i--) {
    if (element.id[i] == '_') {
      indexOfDash = i;
      break;
    } 
  }
  let num = element.id.substring(indexOfDash + 1);
  let teacherID = teacherDataRow.querySelector(`#teacherID-${num}`).textContent;

  await axios
    .delete(`http://localhost:8000/teachers/${teacherID}`)
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log("this is the error:");
      console.log(err.response.data);
      alert("Can't delete this account");
    });
}

//add teacher
async function addData_Teacher() {
  let teacherID = document.querySelector("#teacherID_addInput").value;
  let name = document.querySelector("#teacherName_addInput").value;
  let email = document.querySelector("#teacherEmail_addInput").value;
  let faculty = document.querySelector("#teacherFaculty_addInput").value;
  let role = document.querySelector("#teacherRole_addInput").value;

  await axios
    .post("http://localhost:8000/teachers", {
      teacherID: teacherID,
      name: name,
      email: email,
      faculty: faculty,
      role: role
    })
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log("this is the error:");
      console.log(err.response.data);
      alert("Can't add this account");
    });
}

//edit teacher function

let editedTeacherID = 0;
function openEditTab(element) {
  let teacherDataRow = element.parentNode.parentNode;
  let indexOfDash = 0;
  for (let i = element.id.length - 1; i >= 0; i--) {
    if (element.id[i] == '_') {
      indexOfDash = i;
      break;
    } 
  }
  let num = element.id.substring(indexOfDash + 1);
  let teacherID = teacherDataRow.querySelector(`#teacherID-${num}`).textContent;
  let name = teacherDataRow.querySelector(`#name-${num}`).textContent;
  let email = teacherDataRow.querySelector(`#email-${num}`).textContent;
  let faculty = teacherDataRow.querySelector(`#faculty-${num}`).textContent;
  let role = teacherDataRow.querySelector(`#role-${num}`).textContent;

  
  document.querySelector("#teacherID_editInput").value = teacherID;
  document.querySelector("#teacherName_editInput").value = name;
  document.querySelector("#teacherEmail_editInput").value = email;
  document.querySelector("#teacherFaculty_editInput").value = faculty;
  document.querySelector("#teacherRole_editInput").value = role;
  document.querySelector("#modal_1_teacher").classList.toggle("active");
  
  editedTeacherID = teacherID;
}

async function editData_Teacher() {
  let teacherID = document.querySelector("#teacherID_editInput").value
  let name = document.querySelector("#teacherName_editInput").value
  let email = document.querySelector("#teacherEmail_editInput").value
  let faculty = document.querySelector("#teacherFaculty_editInput").value
  let role=document.querySelector("#teacherRole_editInput").value 

  await axios
    .put(`http://localhost:8000/teachers/${teacherID}`, {
      teacherID: teacherID,
      name: name,
      email: email,
      faculty: faculty,
      role: role
    })
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log(err.response.data);
      alert("Can't edit this teacher information");
    });
}

let shortList = [];

function myFunctionTeacher(userTeachers, input){
    userTeachers = JSON.parse(userTeachers);
    shortList = userTeachers.filter((data) => 
        data.name.toLowerCase().includes(input.value.toLowerCase()) ||
        data.email.toLowerCase().includes(input.value.toLowerCase()) ||
        data.faculty.toLowerCase().includes(input.value.toLowerCase()) ||
        data.role.toLowerCase().includes(input.value.toLowerCase())
    )

    teachers = document.querySelector("#teacher_table tbody");
    teachers.innerHTML = "";
    for(const [i, teacher] of Object.entries(shortList)){
        const row = document.createElement("tr");
        const colNames = ["teacherID", "name", "email", "faculty", "role"];
        for(const colName of colNames){
            const col = document.createElement("td");
            
            col.setAttribute("id", `${colName}-${i}`);
            col.innerHTML = teacher[colName];
            row.appendChild(col);
        }
        teachers.appendChild(row);
    }
}