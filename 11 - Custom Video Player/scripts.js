const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(e) {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
	if(e.target.className.includes('toggle'))
	{
		console.log('YES')
		updateButton(e.target, method);
	}
}
function updateButton(btn, method) {
	btn.textContent = method === 'play' ? '❚ ❚' : '►' ;
}
function skip(){
	video.currentTime += Number(this.dataset.skip);
}
function handleRangeUpdates() {
	video[this.name] = this.value;
}
function adjustProgressBar() {
	const progressBar = document.querySelector('.progress__filled');
	let {currentTime, duration} = video;
	const percent = (currentTime / duration) * 100 || 0;
	progressBar.style.flexBasis = `${percent}%`
}
adjustProgressBar();

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

let mousedown = false;
let fullScreen = false;
[video, toggle].forEach(e => e.addEventListener('click', togglePlay));
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdates));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdates));
document.querySelector('.player__video').addEventListener('timeupdate', adjustProgressBar);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
document.querySelector('.fullscreen__button').addEventListener('click', () => fullScreen?  (player.style.minHeight = '100%', player.style.minWidth = '100%') : (player.style.minHeight = 'unset', player.style.minWidth = 'unset'))



console.table([{player}, {video}, {progress}, {progressBar}, {toggle}, {skipButtons}, {ranges}]);