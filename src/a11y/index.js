const addButtonText = function (myClass, myText) {
  let myButtons = document.getElementsByClassName(myClass);
  for (let i = 0, len = myButtons.length; i < len; ++i) {
    let el = document.createElement("span");
    el.innerHTML = myText;
    el.classList.add("aria-hidden");
    myButtons[i].appendChild(el);
  }
};

const fixBlankTableHeadings = function () {
  let tableHeadings = document.getElementsByTagName("TH");
  for (let i = 0, len = tableHeadings.length; i < len; ++i) {
    if (tableHeadings[i].innerHTML === "<span></span>") {
      tableHeadings[i].innerHTML =
        "<span class='aria-hidden'>This cell is intentionally blank</span>";
    }
  }
};
export { addButtonText, fixBlankTableHeadings };
