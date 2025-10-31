console.log("Welcome to Music Mix");

// Initialize the variables
let masterPlay = document.getElementById('masterPlay');
let progressbar = document.getElementById('progressbar');
let masterSongName = document.getElementById('masterSongName');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let gif = document.getElementById('gif');

let songs = [
  { songName: "IN MY BED", filepath: "songs/1.mp3", coverpath: "images/cover1.jpg" },
  { songName: "SORRY", filepath: "songs/2.mp3", coverpath: "images/cover2.jpg" },
  { songName: "FALLING", filepath: "songs/3.mp3", coverpath: "images/cover3.jpg" },
  { songName: "IN THE END", filepath: "songs/4.mp3", coverpath: "images/cover4.jpg" },
  { songName: "BROKEN ANGEL", filepath: "songs/5.mp3", coverpath: "images/cover5.jpg" },
  { songName: "SUMMERTIME SADNESS", filepath: "songs/6.mp3", coverpath: "images/cover6.jpg" },
  { songName: "STARBOY", filepath: "songs/7.mp3", coverpath: "images/cover7.jpg" },
  { songName: "ORDINARY", filepath: "songs/8.mp3", coverpath: "images/cover8.jpg" },
  { songName: "UNFORGETTABLE", filepath: "songs/9.mp3", coverpath: "images/cover9.jpg" },
  { songName: "LET ME LOVE YOU", filepath: "songs/10.mp3", coverpath: "images/cover10.jpg" }
];

let songindex = 0;
let audioelement = new Audio(songs[0].filepath); // Start with first song

// Populate song list
songitem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Play/Pause toggle
masterPlay.addEventListener('click', () => {
  if (audioelement.paused || audioelement.currentTime <= 0) {
    audioelement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  } else {
    audioelement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
  }
});

// Update progress bar
audioelement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
  progressbar.value = progress;
});

// Seekbar change
progressbar.addEventListener('change', () => {
  audioelement.currentTime = progressbar.value * audioelement.duration / 100;
});

// Reset all play icons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  });
};

// Handle individual song play
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    songitem.forEach((el) => el.classList.remove('active'));
    songitem[songindex].classList.add('active');
    songindex = parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioelement.src = songs[songindex].filepath;
    audioelement.load();
    masterSongName.innerText = songs[songindex].songName;
    audioelement.currentTime = 0;
    audioelement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
  });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
  songindex = (songindex + 1) % songs.length;
  audioelement.src = songs[songindex].filepath;
  audioelement.load();
  masterSongName.innerText = songs[songindex].songName;
  audioelement.currentTime = 0;
  audioelement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
  songindex = (songindex - 1 + songs.length) % songs.length;
  audioelement.src = songs[songindex].filepath;
  audioelement.load();
  masterSongName.innerText = songs[songindex].songName;
  audioelement.currentTime = 0;
  audioelement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
});

audioelement.addEventListener('ended', () => {
  songindex = (songindex + 1) % songs.length;
  audioelement.src = songs[songindex].filepath;
  audioelement.load();
  masterSongName.innerText = songs[songindex].songName;
  audioelement.currentTime = 0;
  audioelement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');

  makeAllPlays(); // reset all icons
  document.getElementById(songindex).classList.remove('fa-circle-play');
  document.getElementById(songindex).classList.add('fa-circle-pause');

  songitem.forEach((el) => el.classList.remove('active'));
  songitem[songindex].classList.add('active');
});