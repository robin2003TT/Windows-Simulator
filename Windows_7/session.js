// Simple client-side save/load session system

// Save state
function saveSession() {
  const windows = [...document.querySelectorAll(".window")].map(win => {
    return {
      id: win.id,
      title: win.querySelector(".title").innerText,
      content: win.querySelector(".content").innerHTML,
      position: {
        top: win.style.top,
        left: win.style.left,
        width: win.style.width,
        height: win.style.height,
      }
    };
  });

  const sessionID = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  localStorage.setItem("session-" + sessionID, JSON.stringify(windows));

  return sessionID;
}

// Load state
function loadSession(sessionID) {
  const saved = localStorage.getItem("session-" + sessionID);
  if (!saved) return false;

  const windows = JSON.parse(saved);
  windows.forEach(win => {
    const div = document.createElement("div");
    div.innerHTML = win.content;
    createWindow(win.id, win.title, div, win.id.includes("cmd"));

    const newWin = document.getElementById(win.id);
    newWin.style.top = win.position.top;
    newWin.style.left = win.position.left;
    newWin.style.width = win.position.width;
    newWin.style.height = win.position.height;
  });

  return true;
}

// CMD integration
function parseCMD(input) {
  input = input.trim();

  if (input === "help") {
    return "Type `help-1`, `help-2`, ... to see command pages.\nUse `savest-` to save current state.\nUse `loadst-<id>` to restore.";
  }

  if (input.startsWith("savest-")) {
    const id = saveSession();
    return `Session saved. Use: loadst-${id}`;
  }

  if (input.startsWith("loadst-")) {
    const sessionID = input.split("loadst-")[1];
    const ok = loadSession(sessionID);
    return ok ? "Session restored!" : "Session ID not found.";
  }

  if (input.startsWith("help-")) {
    const page = input.split("-")[1];
    return getHelpPage(page);
  }

  return `Unknown command: ${input}`;
}

// Fake help pages
function getHelpPage(n) {
  const helpPages = {
    "1": `
--- Help Page 1 ---
dir       - list directory contents
cd        - change directory
exit      - close command prompt
tasklist  - show running apps
start     - open start menu
help-2    - see next page
...`,
    "2": `
--- Help Page 2 ---
savest-   - save session state
loadst-   - load a session with ID
notepad   - launch notepad
explorer  - open C:\\
browser   - open browser
calc      - open calculator
paint     - open paint
...`
  };
  return helpPages[n] || "Help page not found.";
}
