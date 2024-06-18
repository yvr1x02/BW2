const rightsideBar = document.getElementById("rightBar");
const hideBtn = document.getElementById("hide");
const showBtn = document.getElementById("show");
const topBar = document.getElementById("topBar");
const container = document.getElementById("container");

let removedSidebar = null;

hideBtn.addEventListener("click", () => {
  removedSidebar = rightsideBar;
  rightsideBar.remove();
  topBar.classList.remove("col-8");
  topBar.classList.add("col-10");
});

showBtn.addEventListener("click", () => {
  if (removedSidebar) {
    container.insertBefore(removedSidebar, topBar.nextSibling);
    removedSidebar = null;
  }
  topBar.classList.remove("col-10");
  topBar.classList.add("col-8");
});
