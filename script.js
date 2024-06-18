const rightsideBar = document.getElementById("rightBar");
const hideBtn = document.getElementById("hide");
const showBtn = document.getElementById("show");
const topBar = document.getElementById("topBar");

hideBtn.addEventListener("click", () => {
  rightsideBar.style.display = "none";
  topBar.classList.remove("col-7");
  topBar.classList.add("col-9");
});

showBtn.addEventListener("click", () => {
  rightsideBar.style.display = "block";
  topBar.classList.remove("col-9");
  topBar.classList.add("col-7");
});
