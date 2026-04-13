class ErrorPopup {
  static zIndexCounter = 100;

  constructor(messagesArray) {
    this.messages = messagesArray;
    this.createPopup();
  }

createPopup() {
  const popup = document.createElement("div");
  popup.classList.add("error-popup");

  const message =
    this.messages[Math.floor(Math.random() * this.messages.length)];

  popup.innerHTML = `
      <div class="error-title">Error</div>

      <div class="error-content">
          <div class="error-icon">X</div>
          <div class="error-body">${message}</div>
      </div>

      <div class="error-footer">
          <button class="error-ok">OK</button>
      </div>
  `;

  document.body.appendChild(popup);

const popupRect = popup.getBoundingClientRect();

// get protected zone (instruction text)
const protectedEl = document.getElementById("instruction-text");
const protectedRect = protectedEl.getBoundingClientRect();

let x, y;

let safe = false;

while (!safe) {
  x = Math.random() * (window.innerWidth - popupRect.width);
  y = Math.random() * (window.innerHeight - popupRect.height);

  const overlaps =
    x < protectedRect.right &&
    x + popupRect.width > protectedRect.left &&
    y < protectedRect.bottom &&
    y + popupRect.height > protectedRect.top;

  if (!overlaps) {
    safe = true;
  }
}

  popup.style.left = x + "px";
  popup.style.top = y + "px";

  popup.style.zIndex = ErrorPopup.zIndexCounter++;

  const okButton = popup.querySelector(".error-ok");

  okButton.addEventListener("click", () => {
    new ErrorPopup(this.messages);
  });
}
}
