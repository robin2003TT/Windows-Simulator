document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  showCustomMenu(e.pageX, e.pageY);
});

document.addEventListener("click", () => {
  const existing = document.querySelector(".context-menu");
  if (existing) existing.remove();
});

function showCustomMenu(x, y) {
  const menu = document.createElement("div");
  menu.className = "context-menu";
  menu.style.top = `${y}px`;
  menu.style.left = `${x}px`;
  menu.innerHTML = `
    <ul>
      <li onclick="newFolder()">🗂️ New > Folder</li>
      <li onclick="openTaskManager()">🔧 Task Manager</li>
      <li onclick="restartSystem()">🔁 Restart</li>
      <li onclick="shutdownSystem()">⏻ Shutdown</li>
    </ul>
  `;
  document.body.appendChild(menu);
}

// Create a folder icon on the desktop
function newFolder() {
  const desktop = document.getElementById("desktop");
  const icon = document.createElement("div");
  icon.className = "icon";
  icon.innerHTML = `<img src="assets/icon/icon-mycomputer.png"><span>New Folder</span>`;
  desktop.appendChild(icon);
  icon.style.top = `${Math.random() * 300 + 50}px`;
  icon.style.left = `${Math.random() * 500 + 50}px`;
}

// Fake task manager: opens taskmgr window
function openTaskManager() {
  if (!document.getElementById("taskmgr")) {
    window.openApp("taskmgr");
  }
}

function restartSystem() {
  location.reload();
}

function shutdownSystem() {
  const blackout = document.createElement("div");
  blackout.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:black;z-index:9999;color:white;font-size:32px;display:flex;align-items:center;justify-content:center;";
  blackout.innerHTML = `<button onclick="boot()">START Windows 7 - Administrator</button>`;
  document.body.innerHTML = "";
  document.body.appendChild(blackout);
}

function boot() {
  location.reload(); // Simulates boot into system
}
