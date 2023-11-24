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
