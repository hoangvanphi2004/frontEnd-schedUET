const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('#navbar_item').forEach(link => {
    console.log('1234')
  if(link.href.includes(`${activePage}`)){
    link.classList.add('active');
    console.log(link);
  }
})
