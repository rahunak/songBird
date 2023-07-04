import play from '../images/play_media.svg';
import pause from '../images/pause_icon.svg';
import muteSoundOff from '../images/mute_sound_off.svg';
import speaker from '../images/speaker_audio.svg';

function getDuratiuonSong(sec) {
    let min = 0;
    if (sec >= 60) {
        while (sec > 60) {
            min++;
            sec -= 60;
        }
    }
    if (sec < 10) sec = `0${sec}`;
    return `${min}:${sec}`;
}
function createAudioPlayer(songAdress) {
    const customAudioPlayer = document.createElement('div');
    customAudioPlayer.classList.add('customAudioPlayer');
    customAudioPlayer.insertAdjacentHTML('afterbegin', `
    <audio class='audio-file' src="${songAdress}" hidden></audio>
                <div class="progress-block">
            <div class="toggle-play-btn"></div>
            <div class="time-curr">0:00</div>
            <input type="range"  class="progres-range" name="progres" min="0" max="100" step="1"
                value="0">
            <div class="time-end"></div>
        </div>
        <div class="volume-block">
            <div  class="volume-value">50</div>
            <input type="range"  class="volume-range">
            <div class="toggle-volume-btn"></div>
        </div>`);

    return customAudioPlayer;
}
function startAudioPlayer(fromBlock) {
    const volumeRange = fromBlock.querySelector('.volume-range');
    const progresRange = fromBlock.querySelector('.progres-range');
    const volumeValue = fromBlock.querySelector('.volume-value');
    const togglePlayBtn = fromBlock.querySelector('.toggle-play-btn');
    const toggleVolumeBtn = fromBlock.querySelector('.toggle-volume-btn');
    const timeCurr = fromBlock.querySelector('.time-curr');
    const timeEnd = fromBlock.querySelector('.time-end ');
    const audioSong = fromBlock.querySelector('.audio-file');

    audioSong.volume = 0.5;
    volumeRange.addEventListener('input', (e) => {
        volumeValue.textContent = e.target.value;
        audioSong.volume = +e.target.value / 100;
        if (+e.target.value === 0) {
            toggleVolumeBtn.style.backgroundImage = `url(${muteSoundOff})`;
        } else {
            toggleVolumeBtn.style.backgroundImage = `url(${speaker})`;
        }
        volumeRange.style.backgroundSize = `${Math.round(volumeRange.value)}% 100%`;
    });
    togglePlayBtn.addEventListener('click', () => {
        if (!audioSong.paused) {
            audioSong.pause();
            togglePlayBtn.style.backgroundImage = `url(${play})`;
        } else {
            audioSong.play();
            togglePlayBtn.style.backgroundImage = `url(${pause})`;
        }
    });
    toggleVolumeBtn.addEventListener('click', () => {
        if (+audioSong.volume === 0) {
            toggleVolumeBtn.style.backgroundImage = `url(${speaker})`;
            audioSong.volume = +volumeRange.value / 100;
        } else {
            toggleVolumeBtn.style.backgroundImage = `url(${muteSoundOff})`;
            audioSong.volume = 0;
            volumeRange.value = 0;
            volumeValue.textContent = 0;
            volumeRange.style.backgroundSize = '0% 100%';
        }
    });
    audioSong.addEventListener('canplay', () => {
        timeEnd.textContent = getDuratiuonSong(Math.round(audioSong.duration));
        progresRange.setAttribute('max', Math.round(audioSong.duration));
    });
    audioSong.addEventListener('timeupdate', () => {
        timeCurr.textContent = getDuratiuonSong(Math.round(audioSong.currentTime));
        progresRange.value = Math.round(audioSong.currentTime);
        progresRange.style.backgroundSize = `${(Math.round(audioSong.currentTime) / Math.round(audioSong.duration)) * 100}% 100%`;
        if (Math.round(audioSong.currentTime) >= Math.round(audioSong.duration)) {
            togglePlayBtn.style.backgroundImage = `url(${play})`;
            audioSong.currentTime = 0;
            audioSong.pause();
        }
    });
    progresRange.addEventListener('input', (e) => {
        audioSong.currentTime = +e.target.value;
    });
}
export { createAudioPlayer, startAudioPlayer };
