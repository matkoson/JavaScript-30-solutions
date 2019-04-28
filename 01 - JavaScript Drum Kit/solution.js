const playSound = key => {
  const audio = document.querySelector(`audio[data-key="${key}"]`);
  audio.currentTime = 0;
  audio.play();
  //remember to rewind audio file
};

const addPlayingClass = node => {
  node.classList.add("playing");
  playSound(node.dataset.key);
};

const removePlayingClass = node => {
  node.classList.remove("playing");
};

const handleMouseClick = e => {
  if (e.type === "mousedown") {
    addPlayingClass(e.currentTarget);
    playSound(e.currentTarget.dataset.key);
  } else {
    removePlayingClass(e.currentTarget);
  }
};

const handleKeyPress = e => {
  const keyPreseed = e.key;
  let soundKey = Array.from(document.querySelectorAll("kbd")).filter(
    e => e.innerText === keyPreseed.toUpperCase()
  )[0];
  if (soundKey) {
    soundKey = soundKey.parentNode;
  }
  if (soundKey) {
    if (e.type === "keydown") {
      playSound(soundKey.dataset.key);
      addPlayingClass(soundKey);
    } else {
      removePlayingClass(soundKey);
    }
  }
};

document.querySelectorAll(".key").forEach(e => {
  e.addEventListener("mousedown", handleMouseClick);
  e.addEventListener("mouseup", handleMouseClick);
});

window.addEventListener("keydown", handleKeyPress);
window.addEventListener("keyup", handleKeyPress);

//I can also listen to 'transitionend' event, which is
//fired when some set css transition has ended
