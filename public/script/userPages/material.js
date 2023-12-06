let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

const pagePath = window.location.pathname;
document.querySelectorAll("nav a").forEach((element) => {
  const tempHref = element.href;
  if (tempHref.includes(`${pagePath}`)) {
    element.classList.add("active");
  }
});

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

function myFunctionFilter() {
  document.getElementById("myFilter_content").classList.toggle("show");
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
          
          parent.appendChild(temptr);
        }
      } else {
        res.send(`result.status: ${result.data}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
