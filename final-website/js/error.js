class ErrorPopup {
  /* keeps track of stacking order so newer popups appear on top */
  static zIndexCounter = 100;

  constructor(messagesArray) {
    /* store all possible messages passed in */
    this.messages = messagesArray;

    /* store latest message globally so system can reuse it */
    window.currentLoginMessage = this.messages[0];

    /* create actual popup element */
    this.createPopup();
  }

  createPopup() {
    /* build popup container */
    const popup = document.createElement("div");
    popup.classList.add("error-popup");

    /* always use first message in array */
    const message = this.messages[0];

    /* popup html structure */
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

    /* add popup to page */
    document.body.appendChild(popup);

    /* get popup size for positioning logic */
    const popupRect = popup.getBoundingClientRect();

    /* area to avoid overlapping (login instruction text) */
    const protectedEl = document.getElementById("instruction-text");
    const protectedRect = protectedEl.getBoundingClientRect();

    let x, y;
    let safe = false;

    /* keep trying random positions until it doesn't overlap protected zone */
    while (!safe) {
      x = Math.random() * (window.innerWidth - popupRect.width);
      y = Math.random() * (window.innerHeight - popupRect.height);

      /* collision check with protected area */
      const overlaps =
        x < protectedRect.right &&
        x + popupRect.width > protectedRect.left &&
        y < protectedRect.bottom &&
        y + popupRect.height > protectedRect.top;

      if (!overlaps) {
        safe = true;
      }
    }

    /* apply final safe position */
    popup.style.left = x + "px";
    popup.style.top = y + "px";

    /* ensure proper stacking order of multiple popups */
    popup.style.zIndex = ErrorPopup.zIndexCounter++;

    /* ok button behaviour */
    const okButton = popup.querySelector(".error-ok");

    okButton.addEventListener("click", () => {
      /* always recreate popup using latest system message */
      new ErrorPopup([window.currentLoginMessage]);
    });
  }
}
