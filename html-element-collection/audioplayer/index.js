const songs = [
	{ name: 'LA Chill Tour', domain: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Chill%20Tour.mp3'},
	{ name: 'This is it band', domain: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This%20is%20it%20band.mp3'},
	{ name: 'LA Fusion Jam', domain: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Fusion%20Jam.mp3'}
];

const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
console.log( mediaplayer);
const playstate = document.getElementsByClassName('playstate')[0];
const audio = document.getElementsByTagName('audio')[0];
const stop = document.getElementsByClassName('stop')[0];
const back = document.getElementsByClassName('back')[0];
const next = document.getElementsByClassName('next')[0];
const title = document.getElementsByClassName('title')[0];

let currentSong = 0;
const playClass = 'play';

function nextSong() {
	 return songs[(currentSong >= songs.length -1) ? currentSong = 0 : ++currentSong];
}

function backSong() {
	return songs[(currentSong <= 0) ?  currentSong = (songs.length - 1) : --currentSong];	
}

function songName(song) {
	title.title = song['name'];
	audio.src = song['domain'];	
}

playstate.onclick = () => {
	(mediaplayer.classList.contains(playClass)) ? audio.pause() : audio.play();
	mediaplayer.classList.toggle(playClass);
}
	
stop.onclick = () => {
	mediaplayer.classList.remove(playClass);
	audio.pause();
	audio.currentTime = 0; 
}
	
next.onclick = () => {
	songName(nextSong());
	(mediaplayer.classList.contains(playClass)) ? audio.play() : audio.pause();
}  
	
back.onclick = () => {
	songName(backSong());
	(mediaplayer.classList.contains(playClass)) ?  audio.play() : audio.pause();
}  
