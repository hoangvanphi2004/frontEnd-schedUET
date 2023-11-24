document.querySelector("#addtable_material_admin").onclick = () => {
  document.querySelector("#modal_material").classList.toggle("active");
};

document.querySelector("#close_add_material").onclick = () => {
  document.querySelector("#modal_material").classList.remove("active");
  clearInputs();
};

document.querySelectorAll("#icon_add_material").forEach(
  (item) =>
    (item.onclick = () => {
      document.querySelector("#modal_1_material").classList.toggle("active");
    })
);

document.querySelector("#close_edit_material").onclick = () => {
  document.querySelector("#modal_1_material").classList.remove("active");
};
