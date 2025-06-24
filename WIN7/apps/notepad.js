function launchNotepad() {
  const existing = document.getElementById("notepad-app");
  if (existing) return existing.style.display = "block";

  fetch("apps/notepad.html")
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);
      const app = document.getElementById("notepad-app");
      makeDraggable(app);
      setupWindowControls(app);
      app.style.left = "200px";
      app.style.top = "150px";
      app.style.width = "500px";
      app.style.height = "400px";

      const textarea = document.getElementById("notepad-text");
      textarea.value = localStorage.getItem("notepad-content") || "";

      textarea.addEventListener("input", () => {
        localStorage.setItem("notepad-content", textarea.value);
      });
    });
}
