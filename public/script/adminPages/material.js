document.querySelector("#addtable_material_admin").onclick = () => {
  document.querySelector("#modal_material").classList.toggle("active");
};

document.querySelector("#close_add_material").onclick = () => {
  document.querySelector("#modal_material").classList.remove("active");
  clearInputs();
};

document.querySelector("#close_edit_material").onclick = () => {
  document.querySelector("#modal_1_material").classList.remove("active");
};

//edit material
let editedMaterialID = 0;

function openEditTab(element) {
  let materialDataRow = element.parentNode.parentNode;
  let indexOfDash = 0;
  for (let i = element.id.length - 1; i >= 0; i--) {
    if (element.id[i] == "_") {
      indexOfDash = i;
      break;
    }
  }
  let num = element.id.substring(indexOfDash + 1);
  let courseID = materialDataRow.querySelector(`#courseID-${num}`).textContent;
  let materialID = materialDataRow.querySelector(
    `#materialID-${num}`
  ).textContent;
  let name = materialDataRow.querySelector(`#name-${num}`).textContent;
  let link = materialDataRow.querySelector(`#link-${num}`).textContent;
  let courseTitle = materialDataRow.querySelector(
    `#courseTitle-${num}`
  ).textContent;
  let author = materialDataRow.querySelector(`#author-${num}`).textContent;
  let publisher = materialDataRow.querySelector(
    `#publisher-${num}`
  ).textContent;
  let publishYear = materialDataRow.querySelector(
    `#publishYear-${num}`
  ).textContent;

  document.querySelector("#courseID_editInput").value = courseID;
  document.querySelector("#materialID_editInput").value = materialID;
  document.querySelector("#name_editInput").value = name;
  document.querySelector("#link_editInput").value = link;
  document.querySelector("#courseTitle_editInput").value = courseTitle;
  document.querySelector("#author_editInput").value = author;
  document.querySelector("#publisher_editInput").value = publisher;
  document.querySelector("#publishYear_editInput").value = publishYear;

  document.querySelector("#modal_1_material").classList.toggle("active");

  editedMaterialID = materialID;
}

async function editData_Material() {
  let courseID = document.querySelector("#courseID_editInput").value;
  let materialID = document.querySelector("#materialID_editInput").value;
  let name = document.querySelector("#name_editInput").value;
  let link = document.querySelector("#link_editInput").value;
  let courseTitle = document.querySelector("#courseTitle_editInput").value;
  let author = document.querySelector("#author_editInput").value;
  let publisher = document.querySelector("#publisher_editInput").value;
  let publishYear = document.querySelector("#publishYear_editInput").value;

  await axios
    .put(`http://localhost:8000/materials/${editedMaterialID}`, {
      courseID: courseID,
      materialID: materialID,
      name: name,
      link: link,
      courseTitle: courseTitle,
      author: author,
      publisher: publisher,
      publishYear: publishYear
    })
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log(err.response.data);
      alert("Can't edit this teacher information");
    });
}

//add material
async function addData_Material() {
  let courseID = document.querySelector("#courseID_addInput").value;
  let materialID = document.querySelector("#materialID_addInput").value;
  let name = document.querySelector("#name_addInput").value;
  let link = document.querySelector("#link_addInput").value;
  let courseTitle = document.querySelector("#courseTitle_addInput").value;
  let author = document.querySelector("#author_addInput").value;
  let publisher = document.querySelector("#publisher_addInput").value;
  let publishYear = document.querySelector("#publishYear_addInput").value;

  await axios
    .post(`http://localhost:8000/materials`, {
      courseID: courseID,
      materialID: materialID,
      name: name,
      link: link,
      courseTitle: courseTitle,
      author: author,
      publisher: publisher,
      publishYear: publishYear
    })
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log(err.response.data);
      alert("Can't edit this teacher information");
    });
}

//delete material
async function deleteData_Material(element) {
  let materialDataRow = element.parentNode.parentNode;
  let indexOfDash = 0;
  for (let i = element.id.length - 1; i >= 0; i--) {
    if (element.id[i] == '_') {
      indexOfDash = i;
      break;
    } 
  }
  let num = element.id.substring(indexOfDash + 1);
  let materialID = materialDataRow.querySelector(`#materialID-${num}`).textContent;


  await axios
    .delete(`http://localhost:8000/materials/${materialID}`)
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log("this is the error:");
      console.log(err.response.data);
      alert("Can't delete this material");
    });
}
