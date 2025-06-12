window.addEventListener('DOMContentLoaded', () => {
  const bootScreen = document.getElementById('boot-screen');
  const loginScreen = document.getElementById('login-screen');
  const desktop = document.getElementById('desktop');
  const loginBtn = document.getElementById('login-btn');
  const startBtn = document.getElementById('start-button');
  const startMenu = document.getElementById('start-menu');
  const appList = document.getElementById('app-list');
  const desktopIcon = document.querySelector('.desktop-icon');

  // Boot sequence
  bootScreen.style.display = 'flex';
  setTimeout(() => {
    bootScreen.style.display = 'none';
    loginScreen.style.display = 'block';
  }, 2000);

  loginBtn.onclick = () => {
    loginScreen.style.display = 'none';
    desktop.style.display = 'block';
    loadApps();
    updateClock();
    setInterval(updateClock, 60000);
  };

  // Toggle Start menu
  startBtn.onclick = () => {
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
  };

  // Show My Computer
  desktopIcon.onclick = () => {
    openApp('explorer');
  };

  function updateClock() {
    const clock = document.getElementById('taskbar-clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }

  function loadApps() {
    fetch('apps/')
      .then(r => r.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = [...doc.querySelectorAll('a')].map(a => a.getAttribute('href')).filter(h => h && !h.startsWith('..'));
        appList.innerHTML = '';
        links.forEach(folder => {
          const name = folder.replace('/', '');
          const div = document.createElement('div');
          div.textContent = name;
          div.className = 'start-app';
          div.onclick = () => openApp(name);
          appList.appendChild(div);
        });
      });
  }

  function openApp(name) {
    const path = `apps/${name}/${name}.js`;
    const existing = document.querySelector(`.window[data-app="${name}"]`);
    if (existing) return;

    const win = document.createElement('div');
    win.className = 'window';
    win.dataset.app = name;
    win.style.top = '100px';
    win.style.left = '100px';
    win.innerHTML = `
      <div class="window-header">
        <span>${name}</span>
        <div class="window-controls">
          <span onclick="this.closest('.window').remove()">✖</span>
        </div>
      </div>
      <div class="window-body">Loading ${name}...</div>
    `;
    document.body.appendChild(win);
    makeDraggable(win);

    const script = document.createElement('script');
    script.src = path;
    script.onerror = () => {
      win.querySelector('.window-body').textContent = 'App not available.';
    };
    script.onload = () => {
      win.querySelector('.window-body').textContent = ''; // Cleared by app script
    };
    document.body.appendChild(script);
  }

  function makeDraggable(win) {
    const header = win.querySelector('.window-header');
    let isDragging = false, offsetX = 0, offsetY = 0;

    header.onmousedown = (e) => {
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
    };

    window.onmousemove = (e) => {
      if (isDragging) {
        win.style.left = e.clientX - offsetX + 'px';
        win.style.top = e.clientY - offsetY + 'px';
      }
    };

    window.onmouseup = () => isDragging = false;
  }
});
