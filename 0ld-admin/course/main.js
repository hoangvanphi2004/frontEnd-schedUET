document.querySelector('#addtable_course_admin').onclick = () => {
    document.querySelector('#modal_course').classList.toggle('active');
  }
  
  document.querySelector('#close_add_course').onclick = () => {
    document.querySelector('#modal_course').classList.remove('active');
    clearInputs();
  }
  
  document.querySelectorAll('#icon_add_course').forEach(item => item.onclick = () => {
    document.querySelector('#modal_1_course').classList.toggle('active');
  })
  
  document.querySelector('#close_edit_course').onclick = () => {
    document.querySelector('#modal_1_course').classList.remove('active');
  }