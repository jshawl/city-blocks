import { render, next, state, rand, checkNeighbors, app } from "./functions.js";

app.addEventListener("mouseover", (e) => {
  if (e.target.getAttribute("data-value") !== "0") return;
  const attribute = `data-hover-next`;
  document.querySelector(`[${attribute}]`)?.removeAttribute(attribute);
  e.target.setAttribute(attribute, next[next.length - 1]);
});
app.addEventListener("click", (e) => {
  const x = parseInt(e.target.getAttribute("data-x"));
  const y = parseInt(e.target.getAttribute("data-y"));
  const value = parseInt(e.target.getAttribute("data-value"));
  if (value !== 0) return;
  state[y][x] = next.pop();
  next.unshift(rand());
  render(state, next, app);
  checkNeighbors(x, y);
});
render(state, next, app);
