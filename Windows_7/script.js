document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginScreen = document.getElementById("login-screen");
  const desktop = document.getElementById("desktop");
  const startMenu = document.getElementById("start-menu");
  const clock = document.getElementById("clock");

  if (loginBtn) {
    loginBtn.onclick = () => {
      loginScreen.style.display = "none";
      desktop.classList.remove("hidden");
      updateClock();
      setInterval(updateClock, 1000);
    };
  }

  function updateClock() {
    if (clock) {
      const now = new Date();
      clock.textContent = now.toLocaleTimeString();
    }
  }

  window.toggleStartMenu = () => {
    startMenu.classList.toggle("hidden");
  };

  window.launchApp = (appName) => {
    const appWindow = document.createElement("div");
    appWindow.classList.add("window");
    appWindow.innerHTML = `
      <div class="window-title">${appName}
        <button onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
      <div class="window-body">
        <iframe src="apps/${appName}.html" style="width:100%;height:100%;border:none;"></iframe>
      </div>
    `;
    appWindow.style.position = "absolute";
    appWindow.style.left = "100px";
    appWindow.style.top = "100px";
    appWindow.style.width = "600px";
    appWindow.style.height = "400px";
    appWindow.style.background = "#fff";
    appWindow.style.border = "1px solid #000";
    appWindow.style.zIndex = Date.now();

    desktop.appendChild(appWindow);
  };
});
