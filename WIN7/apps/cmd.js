(() => {
  const container = document.getElementById("window-content-cmd");
  container.innerHTML = `
    <div style="background:black; color:lime; font-family:monospace; padding:10px; height:100%; overflow-y:auto;" id="cmd-output">
      <div>> Welcome to Windows 7 Robin Terminal</div>
    </div>
    <input id="cmd-input" style="width:100%; border:none; font-family:monospace;" placeholder="Type a command..." autofocus />
  `;

  const input = container.querySelector("#cmd-input");
  const output = container.querySelector("#cmd-output");

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = input.value.trim();
      output.innerHTML += `<div>> ${cmd}</div>`;
      input.value = "";

      if (cmd === "help") {
        output.innerHTML += `
          <div>- help-1: Show base commands</div>
          <div>- help-2: Show advanced commands</div>
          <div>- loadst-[id]: Load a saved session</div>
          <div>- savest-[id]: Save current session</div>
        `;
      } else if (cmd === "help-1") {
        output.innerHTML += `<div>- dir, echo, cls, title, ver, color, etc.</div>`;
      } else if (cmd === "help-2") {
        output.innerHTML += `<div>- fakeuser, ipconfig, netstat, tasklist (simulated)</div>`;
      } else if (cmd.startsWith("savest-")) {
        output.innerHTML += `<div>Session saved as ${cmd.split('-')[1]} (fake)</div>`;
      } else if (cmd.startsWith("loadst-")) {
        output.innerHTML += `<div>Session ${cmd.split('-')[1]} loaded (fake)</div>`;
      } else {
        output.innerHTML += `<div>'${cmd}' is not recognized as an internal or external command.</div>`;
      }

      output.scrollTop = output.scrollHeight;
    }
  });
})();
