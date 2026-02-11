const music = document.getElementById("bgMusic");
const noBtn = document.getElementById("noBtn");
const heartsContainer = document.querySelector(".hearts-container");

let musicStarted = false;
let sentenceIndex = 0;
let sentenceTimeout = null;

function nextScreen(num) {
  document.querySelector(".screen.active").classList.remove("active");
  document.getElementById("screen" + num).classList.add("active");

  if (!musicStarted) {
    music.volume = 0.4;
    music.play();
    musicStarted = true;
  }

  // Trigger dots animation when screen 3 is shown
  if (num === 3) {
    animateDotsConnection();
  }

  // Trigger screen 2 auto-play when screen 2 is shown
  if (num === 2) {
    clearTimeout(sentenceTimeout);
    setTimeout(() => {
      if (document.getElementById("screen2").classList.contains("active")) {
        playScreen2();
      }
    }, 100);
  }
}

// --- Screen 2: Auto-play Sentences ---
// --- Screen 2: Auto-play Sentences ---
const sentences = [
  {
    text:
      "Bawaa" +
      "💙" +
      "\n" +
      "Na unmela evlo love vachrukenu unaku theriathu!!!",
    image: "assets/images/hug.jpg",
  },
  {
    text:
      "Enaku therium ne evlo struggles un life la face panitu irukenu.." +
      "But kavala padatha, ellame seekrama sari aagum" +
      "💪",
    image: "assets/images/hug.gif",
  },
  {
    text:
      "Na unaku oru promise panra" +
      "❤️" +
      "\n" +
      "I'll always be there for you, through every ups and downs",
    image: "assets/images/love.jpg",
  },
  {
    text:
      "En alagu SHUTTUMANI 😘" + "\n" + "Na iruken... Unkuda epovu naa irupen",
    image: "assets/images/love1.jpg",
  },
];

function playScreen2() {
  const sentenceEl = document.querySelector(".screen-thread .sentence");
  if (!sentenceEl) return;

  sentenceIndex = 0;
  displayNextSentence();
}

function displayNextSentence() {
  const sentenceEl = document.querySelector(".screen-thread .sentence");
  const imageEl = document.querySelector(".screen-thread .sentence-image");

  if (sentenceIndex >= sentences.length) {
    // All sentences done, move to screen 3
    nextScreen(3);
    return;
  }

  // Update image
  imageEl.src = sentences[sentenceIndex].image;
  imageEl.style.animation = "none";
  imageEl.offsetHeight; // Force reflow
  imageEl.style.animation = "fadeInPhoto 1.5s ease-in-out forwards";

  // Update sentence text
  sentenceEl.textContent = sentences[sentenceIndex].text;
  sentenceEl.classList.remove("fade-out");
  sentenceEl.offsetHeight; // Force reflow to trigger animation
  sentenceEl.classList.add("fade-out");

  sentenceIndex++;
  sentenceTimeout = setTimeout(displayNextSentence, 10000); // 10 seconds per sentence
}

// --- Dots Connection Animation for Screen 3 ---
function animateDotsConnection() {
  const leftDot = document.querySelector(".dot-left");
  const rightDot = document.querySelector(".dot-right");
  const line = document.querySelector(".dots-line");
  const heart = document.querySelector(".heart-center");
  const text = document.querySelector(".romantic-text");
  const button = document.querySelector(".proposal-button");

  if (!leftDot || !rightDot || !line || !heart || !text) return;

  // Reset all states for repeat visits
  leftDot.style.left = "";
  rightDot.style.right = "";
  leftDot.style.opacity = 1;
  rightDot.style.opacity = 1;
  leftDot.style.boxShadow = "";
  rightDot.style.boxShadow = "";
  line.style.opacity = 0;
  line.style.strokeDashoffset = 160;
  line.classList.remove("pulse");
  heart.textContent = "";
  heart.classList.remove("show");
  text.textContent = "";
  text.classList.remove("show");
  if (button) button.style.display = "none";

  // Step 1: Show dots floating (already visible)
  // Step 2: Animate line drawing after 1s
  setTimeout(() => {
    line.style.opacity = 1;
    line.style.transition =
      "stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1), opacity 0.5s";
    line.style.strokeDashoffset = 0;
    // Step 3: Pulse the line after drawing
    setTimeout(() => {
      line.classList.add("pulse");
      // Step 4: Move dots closer and intensify line glow after 1.2s
      setTimeout(() => {
        leftDot.style.left = "80px";
        rightDot.style.right = "80px";
        leftDot.style.boxShadow =
          "0 0 32px 8px #ff5e7e, 0 0 48px 16px #d26a8c88";
        rightDot.style.boxShadow =
          "0 0 32px 8px #ff5e7e, 0 0 48px 16px #d26a8c88";
        // Step 5: Fade out line, morph dots to heart after 1.2s
        setTimeout(() => {
          line.style.opacity = 0;
          leftDot.style.opacity = 0;
          rightDot.style.opacity = 0;
          // Show heart
          heart.textContent = "❤️";
          heart.classList.add("show");
          // Step 6: Fade in romantic text after heart appears
          setTimeout(() => {
            text.textContent = "You + Me = Together & Forever... Love You ❤️";
            text.classList.add("show");
            // Step 7: Show button after all animations complete
            setTimeout(() => {
              if (button) {
                button.style.display = "block";
                button.style.animation = "fadeInUp 0.8s ease-out forwards";
              }
            }, 600); // After text fade-in completes
          }, 800);
        }, 1200);
      }, 1200);
    }, 1200);
  }, 1000);
}

// NO button trick
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

// YES button click
function yesClicked() {
  document.querySelector(".screen.active").classList.remove("active");
  document.getElementById("final").classList.add("active");
}

// Floating hearts animation
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart-fly");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 12 + Math.random() * 20 + "px";
  heart.style.animationDuration = 5 + Math.random() * 5 + "s";
  heart.textContent = "❤️";
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}
setInterval(createHeart, 400);

// --- Typewriter & Heart Burst Animation for Final Screen ---
function animateFinalScreen() {
  const pElement = document.querySelector(".screen-final p");
  if (!pElement) return;

  // Reset the element
  pElement.classList.remove("complete");
  pElement.style.animation = "none";

  // Trigger typewriter animation
  setTimeout(() => {
    pElement.style.animation = "typewriter 3.5s steps(45, end) forwards 1.2s";

    // After typewriter completes (3.5s + 1.2s delay = 4.7s), apply glow & scale
    setTimeout(() => {
      pElement.classList.add("complete");
      createHeartBurst(pElement);
    }, 4700);
  }, 50);
}

function createHeartBurst(element) {
  const rect = element.getBoundingClientRect();
  const containerRect = element
    .closest(".screen-final")
    .getBoundingClientRect();

  // Create 12 heart particles in burst pattern
  for (let i = 0; i < 12; i++) {
    const burst = document.createElement("div");
    burst.classList.add("heart-burst");

    // Random angle around the text
    const angle = (i / 12) * Math.PI * 2;
    const distance = 60;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    burst.style.setProperty("--tx", tx + "px");
    burst.style.setProperty("--ty", ty + "px");
    burst.style.left = rect.left - containerRect.left + rect.width / 2 + "px";
    burst.style.top = rect.top - containerRect.top + rect.height / 2 + "px";

    element.closest(".screen-final").appendChild(burst);

    // Trigger animation
    setTimeout(() => {
      burst.classList.add("animate");
    }, 50);

    // Remove after animation
    setTimeout(() => {
      burst.remove();
    }, 1250);
  }
}

// Call this when final screen is shown
const originalYesClicked = window.yesClicked;
window.yesClicked = function () {
  document.querySelector(".screen.active").classList.remove("active");
  document.getElementById("final").classList.add("active");
  setTimeout(animateFinalScreen, 100);
};

// --- Screen 4: Photo Carousel ---
const photos = [
  {
    src: "assets/images/photo1.jpeg",
    caption: "First time I met you, my heart skipped a beat ❤️",
  },
  {
    src: "assets/images/photo2.jpeg",
    caption: "Our Wedding - Dream day 💙",
  },
  {
    src: "assets/images/photo3.jpeg",
    caption: "Our first day out 💖",
  },
  {
    src: "assets/images/photo4.jpeg",
    caption: "Our first Honeymoon trip 😍",
  },
  {
    src: "assets/images/photo5.jpeg",
    caption: "No more 2 of us, soon gonna be 3 of Us 🥰",
  },
  {
    src: "assets/images/photo6.jpeg",
    caption: "Whatever happens, I'll hold your hands tightly like this 💕😘",
  },
];

let photoIndex = 0;
let photoTimeout = null;

function playScreen4() {
  const container = document.querySelector(".screen-photos .photos-container");
  if (!container) return;

  // Clear previous photos
  container.innerHTML = "";
  photoIndex = 0;
  displayNextPhoto();
}

function displayNextPhoto() {
  const container = document.querySelector(".screen-photos .photos-container");
  const caption = document.querySelector(".screen-photos .photo-caption");
  const button = document.querySelector(".screen-photos .photo-button");

  if (photoIndex >= photos.length) {
    // All photos done, show button (caption stays visible)
    button.style.display = "block";
    return;
  }

  // Create and insert photo
  const img = document.createElement("img");
  img.src = photos[photoIndex].src;
  img.alt = "Photo " + (photoIndex + 1);
  img.classList.add("photo-item");
  container.appendChild(img);

  // Update caption
  caption.textContent = photos[photoIndex].caption;
  caption.style.animation = "none";
  caption.offsetHeight; // Force reflow
  caption.style.animation = "fadeInCaption 1s ease-in forwards";

  photoIndex++;
  photoTimeout = setTimeout(displayNextPhoto, 8000); // 8 seconds per photo
}

// Update nextScreen to trigger screen 4 auto-play
const originalNextScreenFunc = nextScreen;
nextScreen = function (num) {
  originalNextScreenFunc(num);

  // Trigger screen 4 photo carousel when screen 4 is shown
  if (num === 4) {
    clearTimeout(photoTimeout);
    setTimeout(() => {
      if (document.getElementById("screen4").classList.contains("active")) {
        playScreen4();
      }
    }, 100);
  }
};
