// path: src/store/demoCtx.js
export const getCtx = () =>
  JSON.parse(localStorage.getItem("demo_ctx") || "{}");
export const setCtx = (x) =>
  localStorage.setItem("demo_ctx", JSON.stringify({ ...getCtx(), ...x }));
