window.onload = () => {
  const loginBtn = document.getElementById("login-btn");
  const loginScreen = document.getElementById("login-screen");
  const desktop = document.getElementById("desktop");

  loginBtn.onclick = () => {
    loginScreen.style.display = "none";
    desktop.style.display = "block";
  };
};

function toggleStartMenu() {
  const menu = document.getElementById("start-menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function openApp(appName) {
  const win = document.createElement("div");
  win.className = "window";
  win.innerHTML = `
    <div class="title-bar">
      <span>${appName.toUpperCase()}</span>
      <div class="title-bar-buttons">
        <button onclick="this.closest('.window').style.display='none'">_</button>
        <button onclick="maximizeWindow(this)">▢</button>
        <button onclick="this.closest('.window').remove()">✕</button>
      </div>
    </div>
    <iframe src="apps/${appName}.html"></iframe>
  `;
  document.body.appendChild(win);
  makeDraggable(win);
}

function makeDraggable(win) {
  const titleBar = win.querySelector(".title-bar");
  let offsetX, offsetY, isDragging = false;

  titleBar.onmousedown = e => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = Date.now();
  };

  document.onmouseup = () => isDragging = false;

  document.onmousemove = e => {
    if (isDragging) {
      win.style.left = `${e.clientX - offsetX}px`;
      win.style.top = `${e.clientY - offsetY}px`;
    }
  };
}

function maximizeWindow(btn) {
  const win = btn.closest(".window");
  if (win.classList.contains("maximized")) {
    win.style.width = "600px";
    win.style.height = "400px";
    win.style.left = "100px";
    win.style.top = "100px";
    win.classList.remove("maximized");
  } else {
    win.style.top = "0";
    win.style.left = "0";
    win.style.width = "100vw";
    win.style.height = "100vh";
    win.classList.add("maximized");
  }
}
