document.querySelector('#addtable_teacher_admin').onclick = () => {
    document.querySelector('#modal_teacher').classList.toggle('active');
  }
  
  document.querySelector('#close_add_teacher').onclick = () => {
    document.querySelector('#modal_teacher').classList.remove('active');
    clearInputs();
  }
  
  document.querySelectorAll('#icon_add_teacher').forEach(item => item.onclick = () => {
    document.querySelector('#modal_1_teacher').classList.toggle('active');
  })
  
  document.querySelector('#close_edit_teacher').onclick = () => {
    document.querySelector('#modal_1_teacher').classList.remove('active');
  }