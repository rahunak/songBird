import birdsData from './birdData';
import { startAudioPlayer } from './customAudioPlayer';

function createBirdBlock(bird) {
    const lang = localStorage.getItem('lang');

    const birdBlock = document.createElement('div');
    birdBlock.classList.add('bird');
    const image = document.createElement('div');
    image.classList.add('bird-image');
    image.style.backgroundImage = `url(${bird.image})`;
    birdBlock.append(image);
    birdBlock.insertAdjacentHTML('beforeend', `
                    <div class="bird-description" data-${bird.species.split(' ').join('')}>
                        <div id="birdName" class="bird-name">${lang === 'en' ? bird.nameEn : bird.name}</div>
                        <div id="birdSpecies" class="bird-species">${bird.species}</div>
                        
                         <div class="customAudioPlayer">
  <audio class='audio-file' src="${bird.audio}" hidden></audio>
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
        </div>
 </div>
                        <div id="birdText" class="bird-text">${lang === 'en' ? bird.descriptionEn : bird.description}</div>
                    </div>`);
    return birdBlock;
}

function showGallery() {
    const gallery = document.querySelector('#galleryContainer');
    if (!gallery) return;
    birdsData.forEach((arr) => {
        arr.forEach((bird) => {
            gallery.append(createBirdBlock(bird));
            startAudioPlayer(document.querySelector(`[data-${bird.species.split(' ').join('')}]`));
        });
    });
}
if (document.querySelector('#galleryContainer')) {
    showGallery();
}
