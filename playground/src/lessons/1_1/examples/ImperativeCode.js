// Imperative (Vanilla JS)
const btn = document.getElementById('btn');
const display = document.getElementById('count');

btn.addEventListener('click', () => {
  const current = parseInt(display.textContent);
  display.textContent = current + 1;
});
