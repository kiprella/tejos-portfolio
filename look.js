const id = new URLSearchParams(location.search).get("id") || "haired";
const look = window.LOOKS?.[id] || window.LOOKS.haired;
const isVideo = (src) => /\.(mp4|mov|webm)(\?|$)/i.test(src);

document.title = `${look.title} — Tejos`;
const titleEl = document.querySelector("[data-look-title]");
if (look.titleHtml) titleEl.innerHTML = look.titleHtml;
else titleEl.textContent = look.title;
if (look.titleColor) titleEl.style.color = look.titleColor;
const bodyEl = document.querySelector("[data-look-body]");
if (look.body) bodyEl.textContent = look.body;
else bodyEl.remove();

function mediaEl(src) {
  if (isVideo(src)) {
    const video = document.createElement("video");
    video.src = src;
    video.controls = false;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    if (look.playbackRate) video.playbackRate = look.playbackRate;
    return video;
  }
  const img = document.createElement("img");
  img.src = src;
  img.alt = look.title;
  return img;
}

const sources = [].concat(look.media);
const leadCount = look.lead ?? 1;
const leadHost = document.querySelector("[data-look-lead]");
const mediaHost = document.querySelector("[data-look-media]");
for (const src of sources.slice(0, leadCount)) leadHost.append(mediaEl(src));
for (const src of sources.slice(leadCount)) mediaHost.append(mediaEl(src));
