// script.js

let openWindows = {};
let currentZ = 100;
let loggedIn = false;

// BOOT TO LOGIN TRANSITION
window.onload = () => {
  const boot = document.getElementById("boot");
  const login = document.getElementById("login");
  const desktop = document.getElementById("desktop");

  // Start with boot screen visible
  boot.style.display = "flex";
  login.style.display = "none";
  desktop.style.display = "none";

  setTimeout(() => {
    boot.style.display = "none";
    login.style.display = "flex";
  }, 3000); // Boot screen duration
};

// LOGIN BUTTON HANDLER
function loginToWindows() {
  const login = document.getElementById("login");
  const desktop = document.getElementById("desktop");

  login.style.display = "none";
  desktop.style.display = "block";
  document.title = "Windows 7 by Robin";
  loggedIn = true;
}

// START MENU TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-button");
  const startMenu = document.getElementById("start-menu");

  startBtn.onclick = (e) => {
    e.stopPropagation();
    startMenu.style.display = startMenu.style.display === "block" ? "none" : "block";
  };

  document.addEventListener("click", () => {
    startMenu.style.display = "none";
  });
});

// OPEN APP WINDOW
function openApp(appId, title, icon, innerHTML) {
  if (openWindows[appId]) {
    focusWindow(appId);
    return;
  }

  const win = document.createElement("div");
  win.classList.add("window");
  win.style.zIndex = ++currentZ;
  win.id = appId;

  win.innerHTML = `
    <div class="title-bar" onmousedown="startDrag(event, '${appId}')">
      <img src="${icon}" class="win-icon">
      <span class="win-title">${title}</span>
      <div class="win-controls">
        <button onclick="minimizeWindow('${appId}')">–</button>
        <button onclick="maximizeWindow('${appId}')">▢</button>
        <button onclick="closeWindow('${appId}')">✕</button>
      </div>
    </div>
    <div class="window-body">${innerHTML}</div>
  `;

  document.body.appendChild(win);
  openWindows[appId] = win;
}

// BASIC WINDOW CONTROLS
function closeWindow(id) {
  const win = openWindows[id];
  if (win) {
    win.remove();
    delete openWindows[id];
  }
}

function minimizeWindow(id) {
  const win = openWindows[id];
  if (win) win.style.display = "none";
}

function maximizeWindow(id) {
  const win = openWindows[id];
  if (win) {
    if (win.classList.contains("maximized")) {
      win.style = win.dataset.prevStyle;
      win.classList.remove("maximized");
    } else {
      win.dataset.prevStyle = win.getAttribute("style");
      win.style.top = "0";
      win.style.left = "0";
      win.style.width = "100vw";
      win.style.height = "100vh";
      win.classList.add("maximized");
    }
  }
}

function focusWindow(id) {
  const win = openWindows[id];
  if (win) {
    win.style.zIndex = ++currentZ;
    win.style.display = "block";
  }
}

// DRAGGING
function startDrag(e, id) {
  const win = openWindows[id];
  let offsetX = e.clientX - win.offsetLeft;
  let offsetY = e.clientY - win.offsetTop;

  function moveHandler(e) {
    win.style.left = e.clientX - offsetX + "px";
    win.style.top = e.clientY - offsetY + "px";
    win.style.zIndex = ++currentZ;
  }

  function upHandler() {
    document.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mouseup", upHandler);
  }

  document.addEventListener("mousemove", moveHandler);
  document.addEventListener("mouseup", upHandler);
}

// DESKTOP ICONS
document.addEventListener("DOMContentLoaded", () => {
  const myComp = document.getElementById("my-computer");
  myComp.addEventListener("dblclick", () => {
    openApp(
      "explorer",
      "Computer",
      "assets/icon/icon-mycomputer.png",
      '<iframe src="apps/explorer.html" style="width:100%;height:100%;border:none;"></iframe>'
    );
  });

  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) loginBtn.onclick = loginToWindows;
});
