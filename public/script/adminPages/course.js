
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


async function delete_course(element) {
  let userDataRow = element.parentNode.parentNode;
  let num = element.id[element.id.length - 1];
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