function playAudio(name) {
  const audio = new Audio(`/data/${name}.mp3`);
  audio.play();
}

export default playAudio;
