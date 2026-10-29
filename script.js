const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const shots = [...document.querySelectorAll(".shot")];

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
  );

  shots.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 0.06, 0.36)}s`;
    observer.observe(el);
  });
} else {
  shots.forEach((el) => el.classList.add("is-in"));
}

document.querySelectorAll("[data-swap-interval]").forEach((host) => {
  const videos = [...host.querySelectorAll("video")];
  if (videos.length < 2) return;
  let i = 0;
  const ms = Number(host.dataset.swapInterval) || 4000;
  setInterval(() => {
    videos[i].classList.remove("is-active");
    videos[i].pause();
    i = (i + 1) % videos.length;
    videos[i].classList.add("is-active");
    videos[i].currentTime = 0;
    videos[i].play().catch(() => {});
  }, ms);
});
