const pagePath = window.location.pathname;
document.querySelectorAll("nav a").forEach((element) => {
  const tempHref = element.href;
  if (tempHref.includes(`${pagePath}`)) {
    element.classList.add("active");
  }
});

document.querySelector("#addtable_account_admin").onclick = () => {
  document.querySelector("#modal_account").classList.toggle("active");
};

document.querySelector("#close_add_account").onclick = () => {
  document.querySelector("#modal_account").classList.remove("active");
  clearInputs();
};

document.querySelector("#close_edit_account").onclick = () => {
  document.querySelector("#modal_1_account").classList.remove("active");
};

async function delete_account(element) {
  let userDataRow = element.parentNode.parentNode;
  let indexOfDash = 0;
  for (let i = element.id.length - 1; i >= 0; i--) {
    if (element.id[i] == '_') {
      indexOfDash = i;
      break;
    } 
  }
  let num = element.id.substring(indexOfDash + 1);
  let userID = userDataRow.querySelector(`#userID-${num}`).textContent;
  let password = userDataRow.querySelector(`#password-${num}`).textContent;
  let isAdmin = userDataRow.querySelector(`#isAdmin-${num}`).textContent;

  let data = {
    userID: userID,
    password: password,
    isAdmin: isAdmin,
  };

  await axios
    .delete(`http://localhost:8000/accounts/${userID}`)
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log("this is the error:");
      console.log(err.response.data);
      alert("Can't delete this account");
    });
}

//edit account function

let editedUserID = 0;
function openEditTab(element) {
  let userDataRow = element.parentNode.parentNode;
  let indexOfDash = 0;
  for (let i = element.id.length - 1; i >= 0; i--) {
    if (element.id[i] == '_') {
      indexOfDash = i;
      break;
    } 
  }
  let num = element.id.substring(indexOfDash + 1);
  let userID = userDataRow.querySelector(`#userID-${num}`).textContent;
  let password = userDataRow.querySelector(`#password-${num}`).textContent;
  let isAdmin = userDataRow.querySelector(`#isAdmin-${num}`).textContent;
  
  document.querySelector("#userID_editInput").value = userID;
  document.querySelector("#password_editInput").value = password;
  document.querySelector("#isAdmin_editInput").value = isAdmin;
  document.querySelector("#modal_1_account").classList.toggle("active");
  
  editedUserID = userID;

}

async function editData_Account() {
  console.log(editedUserID);

  let userID = document.querySelector("#userID_editInput").value;
  let password = document.querySelector("#password_editInput").value;
  let isAdmin = document.querySelector("#isAdmin_editInput").value;

  await axios
    .put(`http://localhost:8000/accounts/${userID}`, {
      userID: userID,
      password: password,
      isAdmin: isAdmin
    })
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log("this is the error:");
      console.log(err.response.data);
      alert("Can't edit this account");
    });
}

async function addData_Account() {
  let userID = document.querySelector("#userID_addInput").value;
  let password = document.querySelector("#password_addInput").value;
  let isAdmin = document.querySelector("#isAdmin_addInput").value;

  await axios
    .post("http://localhost:8000/accounts", {
      userID: userID,
      password: password,
      isAdmin: isAdmin,
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

function myFunctionAccount() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput_account");
  filter = input.value.toUpperCase();
  table = document.getElementById("account_table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
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
