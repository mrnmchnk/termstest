function showHide() {
  document.querySelector("#myDropdown").classList.toggle("show");
}
function tocShowHide() {
  document.querySelector("#tocDropdown").classList.toggle("show");
}
function botShowHide() {
  document.querySelector("#botDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
// повешать обработчик на кнопку
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
  let dropdowns = document.querySelectorAll(".dropdown-content");
  dropdowns.forEach( elem => { 
    if ( elem.classList.contains('show')) {
      elem.classList.remove('show');
    }
   } )
}
}