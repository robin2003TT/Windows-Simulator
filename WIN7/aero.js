document.addEventListener('mouseup', () => {
  document.querySelectorAll('.window').forEach(win => {
    const rect = win.getBoundingClientRect();

    // Snap to left
    if (rect.left <= 10) {
      win.style.top = "0";
      win.style.left = "0";
      win.style.width = "50vw";
      win.style.height = "100vh";
      win.classList.add("maximized");
    }

    // Snap to right
    else if (rect.right >= window.innerWidth - 10) {
      win.style.top = "0";
      win.style.left = "50vw";
      win.style.width = "50vw";
      win.style.height = "100vh";
      win.classList.add("maximized");
    }

    // Snap to top for fullscreen
    else if (rect.top <= 10) {
      win.style.top = "0";
      win.style.left = "0";
      win.style.width = "100vw";
      win.style.height = "100vh";
      win.classList.add("maximized");
    }
  });
});
