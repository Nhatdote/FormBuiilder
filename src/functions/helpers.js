const uuid = () => (Math.random() + 1).toString(36).substring(7);
const clone = (item) => JSON.parse(JSON.stringify(item));
const _typeof = (item) =>
  Object.prototype.toString.call(item).slice(8, -1).toLowerCase();
export { uuid, clone, _typeof };
