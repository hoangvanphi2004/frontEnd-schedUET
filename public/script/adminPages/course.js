const pagePath = window.location.pathname;
document.querySelectorAll("nav a").forEach((element) => {
  const tempHref = element.href;
  if (tempHref.includes(`${pagePath}`)) {
    element.classList.add("active");
  }
});

document.querySelector("#addtable_course_admin").onclick = () => {
  document.querySelector("#modal_course").classList.toggle("active");
};

document.querySelector("#close_add_course").onclick = () => {
  document.querySelector("#modal_course").classList.remove("active");
  clearInputs();
};

document.querySelectorAll("#icon_add_course").forEach(
  (item) =>
    (item.onclick = () => {
      document.querySelector("#modal_1_course").classList.toggle("active");
    })
);

document.querySelector("#close_edit_course").onclick = () => {
  document.querySelector("#modal_1_course").classList.remove("active");
};


//delete course
async function delete_course(element) {
  let userDataRow = element.parentNode.parentNode;
  let indexOfDash = 0;
  for (let i = element.id.length - 1; i >= 0; i--) {
    if (element.id[i] == '_') {
      indexOfDash = i;
      break;
    } 
  }
  let num = element.id.substring(indexOfDash + 1);
  let courseID = userDataRow.querySelector(`#courseID-${num}`).textContent;
  let title = userDataRow.querySelector(`#title-${num}`).textContent;
  let credits = userDataRow.querySelector(`#credits-${num}`).textContent;


  await axios
    .delete(`http://localhost:8000/courses/${courseID}`)
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
async function addData_Course() {
  let courseID = document.querySelector("#courseID_addInput").value;
  let title = document.querySelector("#title_addInput").value;
  let credits = document.querySelector("#credits_addInput").value;

  await axios
    .post("http://localhost:8000/courses", {
      courseID: courseID,
      title: title,
      credits: credits
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
function openEditTab(element) {
  let courseDataRow = element.parentNode.parentNode;
  let indexOfDash = 0;
  for (let i = element.id.length - 1; i >= 0; i--) {
    if (element.id[i] == '_') {
      indexOfDash = i;
      break;
    } 
  }
  let num = element.id.substring(indexOfDash + 1);
  let courseID = courseDataRow.querySelector(`#courseID-${num}`).textContent;
  let title = courseDataRow.querySelector(`#title-${num}`).textContent;
  let credits = courseDataRow.querySelector(`#credits-${num}`).textContent;


  document.querySelector("#courseID_editInput").value = courseID;
  document.querySelector("#title_editInput").value = title;
  document.querySelector("#credits_editInput").value = credits;
  document.querySelector("#modal_1_course").classList.toggle("active");
  
  editedCourseID = courseID;
}

async function editData_Course() {
  let courseID = document.querySelector("#courseID_editInput").value
  let title = document.querySelector("#title_editInput").value
  let credits = document.querySelector("#credits_editInput").value


  await axios
    .put(`http://localhost:8000/courses/${editedCourseID}`, {
      courseID: courseID,
      title: title,
      credits: credits
    })
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log(err.response.data);
      alert("Can't edit this teacher information");
    });
}
