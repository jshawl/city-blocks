import { render, next, state, rand, checkNeighbors, app } from "./functions.js";

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
