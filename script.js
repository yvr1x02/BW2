const rightsideBar = document.getElementById("rightBar");
const hideBtn = document.getElementById("hide");
const showBtn = document.getElementById("show");
const topBar = document.getElementById("topBar");
const container = document.getElementById("container");
const topLeft = document.getElementById("topLeft");

let removedSidebar = null;
let removedTopLeft = null;

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

const mediaQuery = window.matchMedia("(max-width: 763px)");

function handleMediaQueryChange(e) {
  if (e.matches) {
    if (rightsideBar && !removedSidebar) {
      removedSidebar = rightsideBar;
      rightsideBar.remove();
      topBar.classList.remove("col-8");
      topBar.classList.add("col-12");
    }
    if (topLeft && !removedTopLeft) {
      removedTopLeft = topLeft;
      topLeft.remove();
    }
  } else {
    if (removedSidebar) {
      container.insertBefore(removedSidebar, topBar.nextSibling);
      removedSidebar = null;
      topBar.classList.remove("col-12");
      topBar.classList.add("col-8");
    }
    if (removedTopLeft) {
      container.insertBefore(removedTopLeft, container.firstChild);
      removedTopLeft = null;
    }
  }
}

mediaQuery.addEventListener("change", handleMediaQueryChange);

handleMediaQueryChange(mediaQuery);
