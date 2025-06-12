window.onload = () => {
  const boot = document.getElementById("boot-screen");
  const login = document.getElementById("login-screen");
  const desktop = document.getElementById("desktop");
  const loginBtn = document.getElementById("login-btn");
  const startBtn = document.getElementById("start-btn");
  const startMenu = document.getElementById("start-menu");

  // Simulate boot delay
  setTimeout(() => {
    boot.classList.add("hidden");
    login.classList.remove("hidden");
  }, 2000);

  loginBtn.addEventListener("click", () => {
    login.classList.add("hidden");
    desktop.classList.remove("hidden");
  });

  // Toggle Start Menu
  startBtn.addEventListener("click", () => {
    startMenu.classList.toggle("hidden");
  });

  // Launch apps from desktop icon
  document.querySelectorAll(".desktop-icon").forEach(icon => {
    icon.addEventListener("dblclick", () => {
      alert(`Launching ${icon.dataset.app}... (app not implemented yet)`);
    });
  });

  // Launch apps from start menu
  document.querySelectorAll("#start-apps li").forEach(item => {
    item.addEventListener("click", () => {
      alert(`Launching ${item.dataset.app}... (app not implemented yet)`);
      startMenu.classList.add("hidden");
    });
  });
};
