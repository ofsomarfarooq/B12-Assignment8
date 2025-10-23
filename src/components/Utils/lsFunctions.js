const KEY = "installedApps";

export const getInstalled = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const isInstalled = (id) => getInstalled().some(a => a.id === id);

export const installApp = (app) => {
  const list = getInstalled();
  if (!list.find(a => a.id === app.id)) {
    list.push(app);
    localStorage.setItem(KEY, JSON.stringify(list));
  }
};

export const uninstallApp = (id) => {
  const next = getInstalled().filter(a => a.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
};
