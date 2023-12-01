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

function myFunctionFilter() {
  document.getElementById("myFilter_content").classList.toggle("show");
}

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
      publishYear: publishYear,
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
      publishYear: publishYear,
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
    if (element.id[i] == "_") {
      indexOfDash = i;
      break;
    }
  }
  let num = element.id.substring(indexOfDash + 1);
  let materialID = materialDataRow.querySelector(
    `#materialID-${num}`
  ).textContent;

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

//search material
function getType(type) {
  if (type == "courseID_checkbox") return 0;
  if (type == "materialID_checkbox") return 1;
  if (type == "name_checkbox") return 2;
  if (type == "courseTitle_checkbox") return 3;
  if (type == "author_checkbox") return 4;
  if (type == "publisher_checkbox") return 5;
  if (type == "publishYear_checkbox") return 6;
}

async function search_Material() {
  const checkBoxResult = document.querySelectorAll(".searchCheckBox");
  const searchInput = document.querySelector("#myInput_material").value;

  let query = `?q=${searchInput}&mode=`;
  let queryOldLength = query.length;

  let firstModeAdded = false
  for (let i = 0; i < checkBoxResult.length; i++) {
    if (checkBoxResult[i].checked) {
      if (!firstModeAdded) {
        query = query + getType(checkBoxResult[i].id);
        firstModeAdded = true;
      } else {
        query = query + "," + getType(checkBoxResult[i].id);
      }
    }
  }

  if (query.length == queryOldLength) query = query + "0";

  console.log(query);

  await axios
    .get(`http://localhost:8000/materials/search${query}`)
    .then((result) => {
      if (result.data.status == "success") {
        //res.render("admin/material", { data: result.data.data });

        let parent = document.querySelector("tbody");
        while (parent.firstChild) {
          parent.firstChild.remove();
        }

        let receivedData = result.data.data;
        console.log(receivedData);

        for (let i = 0; i < receivedData.length; i++) {
          const temptr = document.createElement("tr");

          const courseIDtd = document.createElement("td");
          courseIDtd.id = `courseID-${i}`;
          courseIDtd.textContent = receivedData[i].courseID;
          temptr.appendChild(courseIDtd);

          const materialIDtd = document.createElement("td");
          materialIDtd.id = `materialID-${i}`;
          materialIDtd.textContent = receivedData[i].materialID;
          temptr.appendChild(materialIDtd);

          const nametd = document.createElement("td");
          nametd.id = `name-${i}`;
          nametd.textContent = receivedData[i].name;
          temptr.appendChild(nametd);

          const linktd = document.createElement("td");
          linktd.id = `link-${i}`;
          linktd.textContent = receivedData[i].link;
          temptr.appendChild(linktd);

          const courseTitletd = document.createElement("td");
          courseTitletd.id = `courseTitle-${i}`;
          courseTitletd.textContent = receivedData[i].courseTitle;
          temptr.appendChild(courseTitletd);

          const authortd = document.createElement("td");
          authortd.id = `author-${i}`;
          authortd.textContent = receivedData[i].author;
          temptr.appendChild(authortd);

          const publishertd = document.createElement("td");
          publishertd.id = `publisher-${i}`;
          publishertd.textContent = receivedData[i].publisher;
          temptr.appendChild(publishertd);

          const publishYeartd = document.createElement("td");
          publishYeartd.id = `publishYear-${i}`;
          publishYeartd.textContent = receivedData[i].publishYear;
          temptr.appendChild(publishYeartd);

          const edittd = document.createElement("td");
          const editi = document.createElement("i");
          editi.id = `icon_add_material_${i}`;
          editi.className = "icon_add_material fa-regular fa-pen-to-square";
          edittd.appendChild(editi);
          temptr.appendChild(edittd);
          
          const deletetd = document.createElement("td");
          const deletei = document.createElement("i");
          deletei.id = `icon_delete_material_${i}`;
          deletei.className = "icon_delete_material fa-solid fa-trash";
          deletetd.appendChild(deletei);
          temptr.appendChild(deletetd);
          
          parent.appendChild(temptr);

          editi.onclick = function () {
            openEditTab(editi);
          } 
          deletei.onclick = function () {
            deleteData_Material(deletei);
          } 
        }
      } else {
        res.send(`result.status: ${result.data}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
