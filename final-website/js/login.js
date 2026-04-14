console.log("login.js loaded");

/* runs after page fully loads so elements exist */
document.addEventListener("DOMContentLoaded", () => {
  /* all progressive login error messages in order */
  const loginMessages = [
    "User profile cannot be loaded.",
    "Access denied.",
    "Invalid credentials.",
    "Incorrect.",
    "Why would you do that?",
    "This is becoming concerning.",
    "You're useless",
    "It shouldn't be this difficult.",
    "Maybe you shouldn't be using this system.",
    "Please stop clicking.",
    "Stop.",
  ];

  /* tracks how many times any user tile has been clicked */
  let clickCount = 0;

  /* all user selection cards on login screen */
  const users = document.querySelectorAll(".xp-user");

  /* attach click behaviour to each user card */
  users.forEach((user) => {
    user.addEventListener("click", () => {
      /* decides which message index to use */
      let messageIndex;

      /* normal progression through messages */
      if (clickCount < loginMessages.length) {
        messageIndex = clickCount;
      } else {
      /* after end of array, always repeat last message */
        messageIndex = loginMessages.length - 1;
      }

      /* pick final message */
      const messageToShow = loginMessages[messageIndex];

      /* spawn popup with that message */
      new ErrorPopup([messageToShow]);

      /* increment click counter for next interaction */
      clickCount++;
    });
  });
});
