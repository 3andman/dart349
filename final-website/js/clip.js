window.clippyFinished = false;

/* stores active timeout ids so we can cancel all idle messages when needed */
let timers = [];

/* function used to immediately stop all scheduled clippy speech */
window.stopClippyTimers = function () {
  timers.forEach((t) => clearTimeout(t));
  timers = [];
};

/* clippy controller
   handles showing, hiding, and updating the speech bubble */
class Clippy {
  constructor(rootSelector) {
    /* main clippy container in the dom */
    this.root = document.querySelector(rootSelector);

    /* speech bubble wrapper (image + text container) */
    this.bubble = this.root.querySelector(".clip-bubble");

    /* text element inside bubble where dialogue appears */
    this.text = this.root.querySelector(".clip-text");
  }

  /* makes the speech bubble visible */
  show() {
    this.bubble.style.display = "block";
  }

  /* hides the speech bubble */
  hide() {
    this.bubble.style.display = "none";
  }

  /* main function used to make clippy speak
     updates text and plays animation */
  say(message) {
    /* block all dialogue if system is unlocked */
    if (window.appsUnlocked) return;

    /* set the text inside bubble */
    this.text.textContent = message;

    /* ensure bubble is visible when speaking */
    this.show();

    /* reset animation so it replays every time clippy speaks */
    this.bubble.style.animation = "none";

    /* force browser to re-evaluate styles so animation restarts */
    this.bubble.offsetHeight;

    /* replay pop animation */
    this.bubble.style.animation = "bubblePop 0.2s ease-out";
  }
}

/* runs once page content is fully loaded */
document.addEventListener("DOMContentLoaded", () => {
  /* create global clippy instance so other scripts can use it */
  window.clippy = new Clippy(".clippy");

  /* unused variable kept from earlier structure */
  let firstClickDone = false;

  /*  */
  /* idle speech system        */
  /*  */

  /* initial message shown immediately when page loads */
  clippy.say("Took you long enough");

  /* first delayed idle message */
  timers.push(
    setTimeout(() => {
      if (window.appsUnlocked) return;
      clippy.say("That's what she said.");
    }, 4000),
  );

  /* second delayed idle message */
  timers.push(
    setTimeout(() => {
      if (window.appsUnlocked) return;
      clippy.say("Forgot your password or what?");
    }, 7000),
  );

  /* third delayed idle message */
  timers.push(
    setTimeout(() => {
      if (window.appsUnlocked) return;
      clippy.say("Dude, are you going to do something?");
    }, 12000),
  );

  /*  */
  /* clippy click interaction   */
  /*  */

  /* tracks how many times clippy has been clicked */
  let clickCount = 0;

  /* ordered messages clippy says when clicked */
  const messages = [
    "Don't click me, what are you trying to accomplish?",
    "You don't think before you act, do you?",
    "Taking your own failures out on me?",
    "Fine, I wont mess with you anymore, do what you want.",
  ];

  /* system state
     when true, clippy stops interfering and apps become usable */
  window.appsUnlocked = false;

  /* reference to clippy dom element */
  const clippyRoot = document.querySelector(".clippy");

  /* click handler for clippy character */
  clippyRoot.addEventListener("click", () => {
    /* stop any pending idle dialogue immediately */
    window.stopClippyTimers();

    /* if system already unlocked, ignore further clicks */
    if (window.appsUnlocked) return;

    /* show next message in sequence */
    clippy.say(messages[clickCount]);

    /* move to next message */
    clickCount++;

    /* once final message is reached, unlock system */
    if (clickCount >= messages.length) {
      window.appsUnlocked = true;

      /* final surrender line */
      clippy.say("Fine, I wont mess with you anymore, do what you want.");
    }
  });
});
