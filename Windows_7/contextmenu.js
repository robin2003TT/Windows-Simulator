// contextmenu.js

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const menu = document.getElementById('custom-menu');
  menu.style.top = `${e.pageY}px`;
  menu.style.left = `${e.pageX}px`;
  menu.classList.remove('hidden');
});

document.addEventListener('click', () => {
  const menu = document.getElementById('custom-menu');
  if (!menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
  }
});

// Example actions
document.getElementById('menu-refresh').addEventListener('click', () => {
  location.reload();
});

document.getElementById('menu-taskmgr').addEventListener('click', () => {
  alert('Launching Task Manager...');
});

document.getElementById('menu-new-folder').addEventListener('click', () => {
  const newIcon = document.createElement('div');
  newIcon.className = 'desktop-icon';
  newIcon.innerHTML = `<img src="assets/icon/icon-mycomputer.png" /><span>New Folder</span>`;
  document.getElementById('icons').appendChild(newIcon);
});
