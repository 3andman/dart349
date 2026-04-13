console.log("login.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const loginMessages = [
    "User profile cannot be loaded.",
    "Invalid credentials.",
    "Access denied.",
    "That was not correct.",
    "Why would you do that?",
    "Please stop clicking.",
    "This is becoming concerning.",
  ];

  const users = document.querySelectorAll(".xp-user");

  users.forEach((user) => {
    user.addEventListener("click", () => {
      new ErrorPopup(loginMessages);
    });
  });
});
