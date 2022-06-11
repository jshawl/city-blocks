export const score = (state) =>
  state.reduce((acc, row) => {
    const sum = acc + row.reduce((acc2, el) => acc2 + el, 0);
    const highScore = parseInt(localStorage.getItem("highScore") || 0);
    if (sum > highScore) {
      localStorage.setItem("highScore", sum);
    }
    return sum;
  }, 0);
export const state = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
export const app = document.querySelector(".app");

export const rand = () => Math.floor(Math.random() * 2) + 1;
export const times3 = (cb) => [0, 0, 0].map(cb);
export const next = times3(rand);
export const neighbors = (x, y, stack = []) => {
  stack = [...stack, [x, y]];
  const neighbor = {
    top: [x, y - 1],
    right: [x + 1, y],
    bottom: [x, y + 1],
    left: [x - 1, y],
  };
  for (let dir in neighbor) {
    const next = neighbor[dir];
    const valueMatches = state[y][x] === state[next[1]]?.[next[0]];
    const unique = !stack.some((e) => e[0] === next[0] && e[1] === next[1]);
    if (valueMatches && unique) {
      stack = neighbors(next[0], next[1], stack);
    }
  }
  return stack;
};
export const checkNeighbors = (x, y) => {
  setTimeout(() => {
    const nabes = neighbors(x, y);
    if (nabes.length > 2) {
      let sum = 0;
      nabes.forEach((nabe) => {
        sum += state[nabe[1]][nabe[0]];
        state[nabe[1]][nabe[0]] = 0;
      });
      state[y][x] = sum;
      checkNeighbors(x, y);
    }
    render(state, next, app);
  }, 200);
};
export const render = (state, next, app) => {
  document.querySelector(".score").innerHTML = score(state);
  document.querySelector(".highScore").innerHTML =
    localStorage.getItem("highScore");
  app.innerHTML = state
    .map(
      (row, rowIndex) => `<div class='row'>
  ${row
    .map(
      (col, colIndex) =>
        `<div
      class='col'
      data-value='${col}'
      data-x='${colIndex}'
      data-y='${rowIndex}'
    >
        ${col === 0 ? "" : col}
      </div>`
    )
    .join("")}
</div>`
    )
    .join("");
  app.innerHTML += `<div class='row next'>${next
    .map((n) => `<div class='col'>${n}</div>`)
    .join("")}</div>`;
};
