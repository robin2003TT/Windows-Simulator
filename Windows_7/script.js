window.onload = () => {
  document.getElementById("boot-screen").classList.add("active");
  setTimeout(() => {
    document.getElementById("boot-screen").classList.remove("active");
    document.getElementById("login-screen").classList.add("active");
  }, 2000);

  document.getElementById("login-button").addEventListener("click", () => {
    document.getElementById("login-screen").classList.remove("active");
    document.getElementById("desktop").classList.add("active");
    initDesktop();
  });

  document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-menu").classList.toggle("hidden");
  });
};

function initDesktop() {
  loadStartMenu();
  addDesktopIcon("My Computer", "assets/icon/icon-mycomputer.png", "explorer");
}

function addDesktopIcon(name, icon, appName) {
  const iconEl = document.createElement("div");
  iconEl.className = "desktop-icon";
  iconEl.innerHTML = `<img src="${icon}" style="width:48px;"><br><span style="font-size:12px">${name}</span>`;
  iconEl.addEventListener("dblclick", () => launchApp(appName));
  document.getElementById("desktop-icons").appendChild(iconEl);
}

function loadStartMenu() {
  const list = document.getElementById("start-app-list");
  fetch("apps/")
    .then(r => r.text())
    .then(data => {
      const matches = data.match(/href="([^"]+)\/"/g) || [];
      matches.forEach(folder => {
        const name = folder.split('"')[1];
        const item = document.createElement("div");
        item.textContent = name;
        item.addEventListener("click", () => launchApp(name));
        list.appendChild(item);
      });
    });
}

function launchApp(appName) {
  const appPath = `apps/${appName}/${appName}.js`;
  const win = document.createElement("div");
  win.className = "window";
  win.innerHTML = `
    <div class="window-header">
      <span>${appName}</span>
      <div class="window-controls">
        <div onclick="this.closest('.window').remove()">✕</div>
      </div>
    </div>
    <div class="window-content" id="win-${appName}">Loading...</div>
  `;
  document.getElementById("desktop").appendChild(win);
  fetch(appPath)
    .then(r => r.text())
    .then(code => eval(code))
    .catch(() => win.querySelector('.window-content').innerHTML = "App not available");
}
