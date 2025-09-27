const sliderWrapper = document.querySelector('.slider-img-wrapper');
const overlay = document.querySelector('.img-overlay');
const handle = document.querySelector('.slider-handle');

let isDragging = false;

// Souris
handle.addEventListener('mousedown', () => isDragging = true);
window.addEventListener('mouseup', () => isDragging = false);

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const rect = sliderWrapper.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  if (offsetX < 0) offsetX = 0;
  if (offsetX > rect.width) offsetX = rect.width;
  overlay.style.width = offsetX + "px";
  handle.style.left = offsetX + "px";
});

// Responsive
handle.addEventListener('touchstart', () => isDragging = true);
window.addEventListener('touchend', () => isDragging = false);

window.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const rect = sliderWrapper.getBoundingClientRect();
  let offsetX = e.touches[0].clientX - rect.left;
  if (offsetX < 0) offsetX = 0;
  if (offsetX > rect.width) offsetX = rect.width;
  overlay.style.width = offsetX + "px";
  handle.style.left = offsetX + "px";
});