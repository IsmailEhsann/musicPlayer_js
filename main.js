// Have already defined the song array and do not need to define anything from it.

const audio = document.getElementById('audio');
const musicTitle = document.getElementById('music-title');
const musicArtist = document.getElementById('music-artist');
const musicImage = document.getElementById('display-img');
const progress = document.getElementById('progress');
const ctrlIcon = document.getElementById('ctrlIcon');

// Didn't need to assign variable names below:
const backward = document.getElementById('backward').addEventListener('click', prevMusic);
const forward = document.getElementById('forward').addEventListener('click', nextMusic);

document.getElementById('play-music').addEventListener('click', playMusic);


let currentSong = 0;

function loadMusic(music) {

  musicTitle.innerText = music.title;
  musicArtist.innerText = music.artist;
  musicImage.src = music.cover;
  audio.src = music.link;
}

audio.onloadedmetadata = function() {
    progress.max = audio.duration;
    progress.value = audio.currentTime;
}

if(audio.play()) {
    setInterval(()=>{
        progress.value = audio.currentTime;
    }, 500); // Updates every 500ms
}

progress.onchange = function() { //Whenever theres any change in the progress bar
    audio.play()
    audio.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

function playPause() {
    if(ctrlIcon.classList.contains("fa-pause")) {
        audio.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else {
        audio.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    };
}

function playMusic() {
    audio.play(); // Need to remember builtin function play and pause for later
    playPause();
}

function pauseMusic() {
    // Need to allow it to work but changing play button to pause
    audio.pause();
}

function nextMusic() {
    currentSong = (currentSong + 1) % album.length;  // Loop back to the start
    loadMusic(album[currentSong]);
    playMusic();
}

function prevMusic() {
    currentSong = (currentSong - 1 + album.length) % album.length;  // Loop back to the last song
    loadMusic(album[currentSong]);
    playMusic();
}

loadMusic(album[currentSong]);

audio.addEventListener('ended', nextMusic);

// Now removed controls in audio

