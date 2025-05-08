document.getElementById("cycleButton").addEventListener("click", function () {
    const images = [
        "slots/cherries.png",
        "slots/diamond.png",
        "slots/lemon.png",
        "slots/seven.png",
    ];

    let playSpinSound = true;
    const spinSound = new Audio("sfx/spin.mp3");

    if (playSpinSound) {
        spinSound.play();
    }
    playSpinSound = !playSpinSound;

    const boxes = [document.getElementById("box1"), document.getElementById("box2"), document.getElementById("box3")];
    const bigbox = document.querySelector(".bigbox");

    const finalImages = [];
    let jackpotPlayed = false;

    bigbox.classList.add("spinning");

    function spinBox(box, duration, index) {
        box.style.opacity = "0.8";
        let spinInterval = setInterval(() => {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            box.style.backgroundImage = `url(${randomImage})`;
        }, 100);

        setTimeout(() => {
            clearInterval(spinInterval);
            const finalImage = images[Math.floor(Math.random() * images.length)];
            box.style.backgroundImage = `url(${finalImage})`;
            box.style.opacity = "1";
            finalImages[index] = finalImage;

            if (finalImages.length === 3) {
                bigbox.classList.remove("spinning");

                if (finalImages.every(img => img === finalImages[0]) && !jackpotPlayed) {
                    jackpotPlayed = true;
                    bigbox.classList.add("jackpot");
                    displayJackpot();
                }
            }
        }, duration);
    }

    spinBox(boxes[0], 2700, 0);
    spinBox(boxes[1], 2900, 1);
    spinBox(boxes[2], 3150, 2);

    function displayJackpot() {
        const scorebox = document.querySelector(".scorebox");
        scorebox.textContent = "JACKPOT";
        scorebox.classList.add("flash");

        const jackpotSound = new Audio("sfx/jackpot.mp3");
        jackpotSound.play();

        setTimeout(() => {
            bigbox.classList.remove("jackpot");
            scorebox.textContent = "";
            scorebox.classList.remove("flash");
            jackpotPlayed = false;
        }, 3000);
    }
});

document.getElementById("backButton").addEventListener("click", function () {
    window.location.href = "milf.html";
});