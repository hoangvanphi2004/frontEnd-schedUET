const BASE_URL = "http://localhost:8000"
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

let userSections, userTakes, userID, DAY;

function getData(userSectionsFromEJS, userTakesFromEJS, userIDFromEJS, DAYFromEJS){
  const parser = new DOMParser();
  userSections = JSON.parse(parser.parseFromString(userSectionsFromEJS, 'text/html').body.innerHTML);
  userTakes = JSON.parse(parser.parseFromString(userTakesFromEJS, 'text/html').body.innerHTML);
  userID = userIDFromEJS;
  DAY = JSON.parse(parser.parseFromString(DAYFromEJS, 'text/html').body.innerHTML);
}

function isIntersect(x1, y1, x2, y2){
  return !((parseInt(y1) < parseInt(x2)) || (parseInt(y2) < parseInt(x1)));
}

function isConflict(section){
  for(userTake of userTakes.data){
      if(section.day == userTake.day && isIntersect(section.start, section.end, userTake.start, userTake.end)){
          return true;
      }
  }
  return false;
}

let prepareList = [];

function addToPrepareList(index, thisBox){
  if(thisBox.checked){
    prepareList.push(userSections.data[index]);
  }else{
    prepareList = prepareList.filter((x) => x != userSections.data[index]);
  }
  console.log(prepareList);
}

async function sendToTakes(){
  for(subject of prepareList){
    const data = {"courseID": subject.courseID, "sectionID": subject.sectionID};
    try{
      if(isConflict(subject)){
        let e = new Error();
        e.message = "There are some conflict between subject";
        throw e;
      }else{
        await fetch(`${BASE_URL}/registrations/${userID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
      }
    }catch(e){
      alert(`Môn ${subject.title} đã bị trùng thời gian với môn học khác`);
      location.reload();
      process.exit(0);
    }
  }
  location.reload();
}

async function deleteSubjectFromTakes(index){
  const data = {"courseID": userTakes.data[index].courseID, "sectionID": userTakes.data[index].sectionID};
  await fetch(`${BASE_URL}/registrations/${userID}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  });
  location.reload();
}