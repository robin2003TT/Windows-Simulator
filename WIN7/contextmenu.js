document.addEventListener("contextmenu", function (e) {
  e.preventDefault();

  let menu = document.getElementById("custom-context");
  if (!menu) {
    menu = document.createElement("div");
    menu.id = "custom-context";
    menu.style.position = "absolute";
    menu.style.zIndex = 9999;
    menu.style.background = "#eee";
    menu.style.border = "1px solid #aaa";
    menu.style.boxShadow = "2px 2px 5px #0006";
    menu.innerHTML = `
      <div onclick="location.reload()">🔄 Refresh</div>
      <div onclick="openApp('taskmgr')">🧠 Task Manager</div>
      <div onclick="shutdown()">⛔ Shutdown</div>
      <div onclick="restart()">🔁 Restart</div>
    `;
    document.body.appendChild(menu);
  }

  menu.style.left = `${e.pageX}px`;
  menu.style.top = `${e.pageY}px`;
  menu.style.display = "block";
});

document.addEventListener("click", () => {
  const menu = document.getElementById("custom-context");
  if (menu) menu.style.display = "none";
});

function shutdown() {
  alert("System is shutting down...");
  document.body.innerHTML = `<div style="background:black;color:white;font-size:30px;text-align:center;padding:20%;">Windows is shutting down...</div>`;
}

function restart() {
  location.reload();
}
