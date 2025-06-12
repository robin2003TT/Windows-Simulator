// aero.js

document.addEventListener('DOMContentLoaded', () => {
  let isDragging = false;
  let currentWindow = null;
  let offset = { x: 0, y: 0 };

  document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('window-title')) {
      isDragging = true;
      currentWindow = e.target.parentElement;
      const rect = currentWindow.getBoundingClientRect();
      offset.x = e.clientX - rect.left;
      offset.y = e.clientY - rect.top;
      currentWindow.style.zIndex = Date.now(); // Bring to front
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging && currentWindow) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      currentWindow.style.left = `${x}px`;
      currentWindow.style.top = `${y}px`;

      // Snap to edges
      const threshold = 30;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (e.clientX <= threshold) {
        // Snap left
        currentWindow.style.left = '0px';
        currentWindow.style.top = '0px';
        currentWindow.style.width = '50vw';
        currentWindow.style.height = '100vh';
      } else if (e.clientX >= screenWidth - threshold) {
        // Snap right
        currentWindow.style.left = '50vw';
        currentWindow.style.top = '0px';
        currentWindow.style.width = '50vw';
        currentWindow.style.height = '100vh';
      } else if (e.clientY <= threshold) {
        // Snap top (maximize)
        currentWindow.style.left = '0px';
        currentWindow.style.top = '0px';
        currentWindow.style.width = '100vw';
        currentWindow.style.height = '100vh';
      }
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    currentWindow = null;
  });
});
