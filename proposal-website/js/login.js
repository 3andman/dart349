console.log("JS loaded");

let zIndexCounter = 100;
let count = 0; // start at 0

document.addEventListener("mousedown", function () {
    const errorImg = document.createElement("img");
    errorImg.src = "assets/images/xp-error.jpg";
    errorImg.className = "error-image";
    
    count++; // increment on each click
    document.body.appendChild(errorImg);

    let x, y;

    if (count === 1) {
        // first fixed position
        x = 1100;
        y = 600;
    } else {
        // then random position
        x = Math.random() * (window.innerWidth - 300);
        y = Math.random() * (window.innerHeight - 300);
    }

    errorImg.style.position = "absolute"; // make sure it's positioned
    errorImg.style.left = x + "px";
    errorImg.style.top = y + "px";
    errorImg.style.zIndex = zIndexCounter++;
});