const openBtn = document.getElementById("openBtn");
const finalBtn = document.getElementById("finalBtn");
const finalMessage = document.getElementById("finalMessage");
const heartsContainer = document.getElementById("hearts");

// Open button: smoothly take her into the story.
openBtn.addEventListener("click", () => {
  document.querySelector(".section").scrollIntoView({
    behavior: "smooth"
  });

  burstHearts(18);
});

// Final surprise.
finalBtn.addEventListener("click", () => {
  finalMessage.classList.add("show");
  finalBtn.style.display = "none";
  burstHearts(35);
});

// Reveal sections as they enter the screen.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".reveal").forEach((section) => {
  observer.observe(section);
});

// Floating hearts.
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 22) + "px";
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

function burstHearts(amount) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createHeart, i * 80);
  }
}

// Gentle background hearts throughout the page.
setInterval(() => {
  if (document.visibilityState === "visible") {
    createHeart();
  }
}, 1200);
