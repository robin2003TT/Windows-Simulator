(() => {
  const container = document.getElementById("window-content-taskmgr");
  const windows = document.querySelectorAll(".window");
  const apps = Array.from(windows).map(w => w.dataset.app || "Unknown");

  container.innerHTML = `
    <h3>Running Applications:</h3>
    <ul>${apps.map(a => `<li>${a}</li>`).join("")}</ul>
  `;
})();
