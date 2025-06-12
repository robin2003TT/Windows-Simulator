function setupAeroSnap(win) {
  win.onmouseup = () => {
    const winRect = win.getBoundingClientRect();
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    if (winRect.top < 10) {
      // Maximize
      win.style.top = '0';
      win.style.left = '0';
      win.style.width = '100vw';
      win.style.height = '100vh';
    } else if (winRect.left < 10) {
      // Snap left
      win.style.top = '0';
      win.style.left = '0';
      win.style.width = '50vw';
      win.style.height = '100vh';
    } else if (winRect.right > screenW - 10) {
      // Snap right
      win.style.top = '0';
      win.style.left = '50vw';
      win.style.width = '50vw';
      win.style.height = '100vh';
    }
  };
}
