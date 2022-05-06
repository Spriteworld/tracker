import store from "@/stores";

export default (key) => {
  let debugFlags = store.getters['app/debug'];

  if (!key in debugFlags) {
    return null;
  }

  return debugFlags[key];
};
