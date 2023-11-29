document.querySelector("#addtable_account_admin").onclick = () => {
  document.querySelector("#modal_account").classList.toggle("active");
};

document.querySelector("#close_add_account").onclick = () => {
  document.querySelector("#modal_account").classList.remove("active");
  clearInputs();
};

document.querySelectorAll("#icon_add_account").forEach(
  (item) =>
    (item.onclick = () => {
      document.querySelector("#modal_1_account").classList.toggle("active");
    })
);

document.querySelector("#close_edit_account").onclick = () => {
  document.querySelector("#modal_1_account").classList.remove("active");
};

async function delete_account(element) {
  let userDataRow = element.parentNode.parentNode;
  let num = element.id[element.id.length - 1];
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


