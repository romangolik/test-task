const input = document.getElementById("inputText");
const button = document.getElementById("applyTextButton");

let selectedLetter = null;
let startX = null;
let startY = null;
let output = null;

const SPACE_WIDTH = 5;

button.addEventListener("click", () => {
  if (output) {
    output.removeEventListener("click", startDragging);
    output.remove();
  }

  const inputText = input.value;
  output = document.createElement("p");
  document.body.appendChild(output);
  output.addEventListener("click", startDragging);

  let letterOffsetX = output.offsetLeft;
  const letterOffsetY = output.offsetTop;

  for (let i = 0; i < inputText.length; i++) {
    const inputTextChar = inputText[i];
    
    if (inputTextChar !== " ") {
      const span = document.createElement("span");
      span.textContent = inputText[i];
      output.appendChild(span);

      span.style.position = "absolute";
      span.style.left = letterOffsetX;
      span.style.top = letterOffsetY;
      letterOffsetX += span.offsetWidth;
    } else {
      letterOffsetX += SPACE_WIDTH;
    }
  }
});

function startDragging(event) {
  event.stopPropagation();

  selectedLetter = event.target;
  startX = selectedLetter.offsetLeft;
  startY = selectedLetter.offsetTop;

  selectedLetter.classList.add("dragging");

  output.removeEventListener("click", startDragging);
  document.addEventListener("mousemove", dragLetter);
  document.addEventListener("click", stopDragging);
}

function dragLetter(event) {
  if (selectedLetter) {
    selectedLetter.style.left = `${event.clientX - selectedLetter.clientWidth / 2}px`;
    selectedLetter.style.top = `${event.clientY - selectedLetter.clientHeight / 2}px`;
  }
}

function stopDragging(event) {
  if (selectedLetter) {
    selectedLetter.classList.remove("dragging");
    output.addEventListener("click", startDragging);
    document.removeEventListener("mousemove", dragLetter);
    document.removeEventListener("click", stopDragging);

    const elementUnderCursor = event.target;

    if (elementUnderCursor !== selectedLetter) {
      elementUnderCursor.style.left = startX;
      elementUnderCursor.style.top = startY;
    }

    startX = null;
    startY = null;
    selectedLetter = null;
  }
}