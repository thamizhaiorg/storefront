// Example reusable UI button component
export function createButton({ label, onClick }) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.onclick = onClick;
  return btn;
}
