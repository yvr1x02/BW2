const rightsideBar = document.getElementById("rightBar");
const hideBtn = document.getElementById("hide");
const showBtn = document.getElementById("show");

hideBtn.addEventListener("click ", (event) => {
  rightsideBar.remove();
});
