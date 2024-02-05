//Constat decleration
const progressBar = document.getElementById("progress-bar");
const draggableHandle = document.getElementById("draggable-handle");
const emojiSpan = document.getElementById("emoji");
const ratingText = document.getElementById("rating-text");
const toastContainer = document.getElementById("toast");

let isDragging = false;

//method to handle when user presses on emoji and move the mouse.
draggableHandle.addEventListener("mousedown", (e) => {
  isDragging = true;

  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.removeEventListener("mousemove", handleDrag);
  });
});

//user can press on progressBar pointer and then can move to anywhere with pressed mouse.
function handleDrag(e) {
  if (isDragging) {
    const { left, width } = progressBar.getBoundingClientRect();
    let newX = e.clientX - left;
    const restrictedWidth = width - 25;

    // to handle stays within the bounds of the progress bar
    newX = Math.max(0, Math.min(newX, width));

    //progress bar pointer shift.
    draggableHandle.style.left = `${newX}px`;

    // progress bar toast shift.
    toastContainer.style.width = `${newX}px`;

    // Calculate the progress level
    const progressLevel = Math.floor((newX / width) * 5);
    ratingText.innerText = `You gave the rating ${progressLevel}`;
    // Update the emoji based on the progress level
    updateEmoji(progressLevel);
  }
}

// Emoji strucure :
// No response till : 😐
// 0 - 1 : angry
// 1 - 2 : Sad/concerned
// 2 - 3 : neutral
// 3-4 : happy
// 4-5 : good
// 5+ : very good.

function updateEmoji(level) {
  switch (level) {
    case 0:
      emojiSpan.textContent = "😡";
      emojiSpan.style.animation = "burst 0.5s ease-out";
      break;
    case 1:
      emojiSpan.textContent = "😟";
      break;
    case 2:
      emojiSpan.textContent = "😊";
      break;
    case 3:
      emojiSpan.textContent = "😀";
      break;
    case 4:
      emojiSpan.textContent = "😃";
      break;
    case 5:
      emojiSpan.textContent = "😁";
      emojiSpan.style.animation = "burst 0.5s ease-out;";
      break;
    default:
      emojiSpan.textContent = "😐";
  }
}
