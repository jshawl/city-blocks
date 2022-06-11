import {
  render,
  next,
  state,
  rand,
  times3,
  checkNeighbors,
  app,
} from "./functions.js";

times3(() => state[rand()][rand()]);
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
