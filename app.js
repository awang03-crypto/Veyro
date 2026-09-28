const form = document.getElementById('rating-form');
const result = document.getElementById('result');
const ratingEl = document.getElementById('rating');

function number(id) {
  return Number(document.getElementById(id).value) || 0;
}

function calculateRating() {
  const position = document.getElementById('position').value;
  const base = { gk: 62, def: 64, mid: 66, att: 65 }[position];
  const minutesFactor = Math.min(number('minutes'), 90) / 90;

  const positive =
    number('passes') * 0.38 +
    number('shots') * 1.8 +
    number('duels') * 1.25 +
    number('goals') * 8 +
    number('assists') * 6;

  const negative = number('turnovers') * 1.7;
  return Math.max(1, Math.min(100, Math.round(base + positive * minutesFactor - negative)));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  ratingEl.textContent = calculateRating();
  result.classList.remove('hidden');
});
