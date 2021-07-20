var speech = new SpeechSynthesisUtterance();
var synthesis = window.speechSynthesis;
var voices = [];

if ('speechSynthesis' in window) {
  console.log("T-T-S supported");

synthesis.onvoiceschanged = () => {
  voices = synthesis.getVoices();
  let voiceSelect = document.querySelector("#voices");
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name + ' (' + voices[i].lang + ')' , i)));
};

document.querySelector("#volume").addEventListener("input", () => {
  const volume = document.querySelector("#volume").value;
  speech.volume = volume;
  document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
  const pitch = document.querySelector("#pitch").value;
  speech.pitch = pitch;
  document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#rate").addEventListener("input", () => {
  const rate = document.querySelector("#rate").value;
  speech.rate = rate;
  document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#voices").addEventListener("change", () => {
  speech.voice = voices[document.querySelector("#voices").value];
});

document.querySelector("#start").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  synthesis.speak(speech);
});

document.querySelector("#pause").addEventListener("click", () => {
  synthesis.pause();
});

document.querySelector("#resume").addEventListener("click", () => {
  synthesis.resume();
});

document.querySelector("#cancel").addEventListener("click", () => {
  synthesis.cancel();
});

document.querySelector("#reset").addEventListener("click", () => {
window.location.reload(false); 
});

} else {
  alert('Text-to-speech not supported.');
  console.log('Text-to-speech not supported.');
}
