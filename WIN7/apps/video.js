(() => {
  const container = document.getElementById("window-content-video");
  const videos = [
    "intro.mp4",
    "any-videos.mp4"
  ];

  container.innerHTML = `
    <h3>Select a video to play:</h3>
    <ul style="list-style:none; padding-left:0;">
      ${videos.map(v => `<li><button onclick="playVid('${v}')">${v}</button></li>`).join("")}
    </ul>
    <video id="videoPlayer" width="100%" controls style="margin-top:10px;"></video>
  `;

  window.playVid = function(filename) {
    const player = document.getElementById("videoPlayer");
    player.src = `assets/Player/${filename}`;
    player.play();
  };
})();
