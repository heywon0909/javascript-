const player = document.querySelector(".player");
const video = player.querySelector("video");
const toggle = player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");
const progress = player.querySelector(".progress");
const progressBar = progress.querySelector('.progress__filled');
const full = player.querySelector('.full');
function playMedia(){
    if(video.paused){
        video.play();
        
    }else{

        video.pause();
       
    }
}
function updateButton(){
    const icon = this.paused?  '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}
function handleUpdate(){
    video[this.name] = this.value;
}
function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleProgress(){
    const percent = (video.currentTime / video.duration ) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  
}
function fullScreen(){
    if(video.requestFullscreen){
        video.requestFullscreen();
    }else if(video.webkitRequestFullscreen){
        video.webkitRequestFullscreen();
    }else if(video.msRequestFullscreen){
        video.msRequestFullscreen();
    }

}
video.addEventListener('click',playMedia);
toggle.addEventListener('click',playMedia);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
ranges.forEach(ranges => ranges.addEventListener('change',handleUpdate));
skipButtons.forEach(skipButton => skipButton.addEventListener('click',skip));
video.addEventListener('timeupdate',handleProgress);
progress.addEventListener('click',scrub);
progress.addEventListener('change',scrub);
full.addEventListener('click',fullScreen);

let mousedown = false;
progress.addEventListeneer('mousemove',(e)=> mousedown && scrub(e));
progress.addEventListener('mousedown', ()=> mousedown = true);
progress.addEventListener('mouseup', ()=> mousedown = false );