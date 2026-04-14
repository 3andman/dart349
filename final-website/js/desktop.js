console.log("desktop loaded");

/* helper function to open apps or trigger clippy fallback messages */
function openApp(message, url) {
  /* if clippy has a global shutdown function, run it */
  if (window.stopClippyTimers) {
    window.stopClippyTimers();
  }

  /* before apps are unlocked, clippy responds instead of opening */
  if (!window.appsUnlocked) {
    clippy.say(message);
    return;
  }

  /* once unlocked, actually open the page */
  window.location.href = url;
}

/* computer icon */
document.getElementById("computer").addEventListener("click", () => {
  openApp("You don't know how to use any of that stuff.", "pages/computer.html");
});

/* internet explorer icon */
document.getElementById("internet").addEventListener("click", () => {
  openApp("You should've bought that ethernet cable.", "pages/internet.html");
});

/* documents folder */
document.getElementById("documents").addEventListener("click", () => {
  openApp("Please don't open that mess you made.", "pages/documents.html");
});

/* notes app */
document.getElementById("notes").addEventListener("click", () => {
  openApp(
    "The only note you have in there is ''buy eggs''.",
    "pages/notes.html",
  );
});

/* recycle bin */
document.getElementById("recycle").addEventListener("click", () => {
  openApp("Like you care about the environment.", "pages/recycle.html");
});

/* taskbar clock hover insult */
document.getElementById("time").addEventListener("mouseenter", () => {
  clippy.say("Yeah, you're wasting my time too.");
});

/* menu button placeholder */
document.getElementById("menu").addEventListener("click", () => {
  clippy.say("You haven't set that up yet.");
});
