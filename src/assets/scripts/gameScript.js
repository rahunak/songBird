import birdsData from './birdData';
import rightSong from '../audio/rightSong.mp3';
import wrongSong from '../audio/wrongSong.mp3';
import defaultImage from '../images/unknownBird.jpg';
import { createAudioPlayer, startAudioPlayer } from './customAudioPlayer';

function startGame(lang) {
    let statuses = ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы'];
    const statusesEn = ['Warm up', 'Passerines', 'Forest birds', 'Songbirds', 'Predator birds', 'Sea birds'];
    if (lang === 'en') {
        statuses = statusesEn;
    }
    const quiz = document.querySelector('#quiz');
    if (!quiz) return;
    const statusQuiz = document.querySelector('#status');
    const answers = document.querySelector('#answers');
    const description = document.querySelector('#description');
    const current = document.querySelector('#current');
    const nextLevelBtn = document.querySelector('#nextLevelBtn');
    nextLevelBtn.textContent = lang === 'en' ? 'Next level' : 'Следующий уровень';
    let rightAnswer = false;
    let currLevel = 0;
    let hiddenBird;
    let score = 0;
    let pointForLevel = 5;

    function playRightAnswer() {
        const rightAnswerSong = new Audio(rightSong);
        rightAnswerSong.currentTime = 0.0;
        rightAnswerSong.play();
    }
    function playWrongAnswer() {
        const wrongAnswerSong = new Audio(wrongSong);
        wrongAnswerSong.currentTime = 0.0;
        wrongAnswerSong.play();
    }
    function randomDigit(max) {
        return Math.floor(Math.random() * max);
    }
    function showLevels() {
        for (let i = 0; i < statuses.length; i++) {
            const block = document.createElement('div');
            block.textContent = statuses[i];
            block.setAttribute('data-level', i);
            block.classList.add('status__btn');
            statusQuiz.append(block);
        }
    }
    function showCurrentBlock() {
        if (document.querySelector('.current-image') && document.querySelector('.current-name')) {
            document.querySelector('.current-name').textContent = '***';
            document.querySelector('.current-image').style.backgroundImage = `url(${defaultImage})`;
        } else {
            const descriptionBlock = document.createElement('div');
            descriptionBlock.classList.add('current__content-block');
            const descriptionTitle = document.createElement('h3');
            descriptionTitle.textContent = '***';
            descriptionTitle.classList.add('current-name');
            const descriptionImage = document.createElement('div');
            descriptionImage.classList.add('current-image');
            descriptionImage.style.backgroundImage = `url(${defaultImage})`;
            current.append(descriptionImage);
            descriptionBlock.append(descriptionTitle);
            current.append(descriptionBlock);
        }
    }
    function showDescription(bird) {
        const desc = document.querySelector('.description-block');
        if (desc) desc.remove();
        if (!bird) {
            const descriptionBlock = document.createElement('div');
            descriptionBlock.classList.add('description-block');

            const descriptionSpecies = document.createElement('h5');
            descriptionSpecies.textContent = lang === 'en' ? 'Listen to the player. Select a bird from the list' : 'Послушайте плеер. Выберите птицу из списка';
            descriptionSpecies.classList.add('description-species');

            descriptionBlock.append(descriptionSpecies);
            description.append(descriptionBlock);
        } else {
            const descriptionBlock = document.createElement('div');
            descriptionBlock.classList.add('description-block');

            const descriptionText = document.createElement('p');
            descriptionText.textContent = lang === 'en' ? bird.descriptionEn : bird.description;
            descriptionText.classList.add('description-text');

            const descriptionSong = createAudioPlayer(bird.audio);
            descriptionSong.classList.add('description-audio');

            const descriptionTitle = document.createElement('h3');
            descriptionTitle.textContent = lang === 'en' ? bird.nameEn : bird.name;
            descriptionTitle.classList.add('description-name');

            const descriptionSpecies = document.createElement('h5');
            descriptionSpecies.textContent = bird.species;
            descriptionSpecies.classList.add('description-species');

            const descriptionImage = document.createElement('div');
            descriptionImage.classList.add('description-image');
            descriptionImage.style.backgroundImage = `url(${bird.image})`;

            const descriptionContainer = document.createElement('div');
            descriptionContainer.classList.add('description-container');

            const descriptionInnerContainer = document.createElement('div');
            descriptionInnerContainer.classList.add('description-container-inner');
            descriptionInnerContainer.append(descriptionTitle, descriptionSpecies, descriptionSong);

            descriptionContainer.append(descriptionImage);
            descriptionContainer.append(descriptionInnerContainer);
            descriptionBlock.append(descriptionContainer);
            descriptionBlock.append(descriptionText);

            description.append(descriptionBlock);
            startAudioPlayer(document.querySelector('.description-audio'));
        }
    }
    function addWrongDecoration() {
        pointForLevel--;
        playWrongAnswer();
        event.target.classList.add('answers-item-wrong');
        event.target.removeEventListener('click', addWrongDecoration);
    }
    function addRightDecoration() {
        rightAnswer = true;
        playRightAnswer();
        event.target.classList.add('answers-item-right');
        event.target.removeEventListener('click', addRightDecoration);
        document.querySelectorAll('.answers-item').forEach((el) => {
            el.removeEventListener('click', addWrongDecoration);
        });
        score += pointForLevel;
        document.querySelector('#score').textContent = score;
        pointForLevel = 5;
        nextLevelBtn.classList.add('nextLevel-active');
        document.querySelector('.current-image').style.backgroundImage = `url(${hiddenBird.image})`;
        document.querySelector('.current-name').textContent = `${lang === 'en' ? hiddenBird.nameEn : hiddenBird.name}`;
        document.querySelector('.current-audio').querySelector('.audio-file').pause();
    }
    function showAnswers(arrAnswers) {
        const div = document.createElement('div');
        div.classList.add('answers-block');
        arrAnswers.forEach((el) => {
            const item = document.createElement('div');
            item.classList.add('answers-item');
            item.textContent = lang === 'en' ? el.nameEn : el.name;
            item.setAttribute('data-answer-id', el.id);
            div.append(item);

            if (+el.id === +hiddenBird.id) {
                item.addEventListener('click', addRightDecoration);
            } else {
                item.addEventListener('click', addWrongDecoration);
            }
            item.addEventListener('click', () => {
                showDescription(el);
            });
        });

        answers.append(div);
    }
    function showCurrBirdSong(bird) {
        const prevBirdSong = document.querySelector('.current-audio');
        if (prevBirdSong) prevBirdSong.remove();
        const currSong = createAudioPlayer(bird.audio);
        currSong.classList.add('current-audio');
        document.querySelector('.current__content-block').append(currSong);
        startAudioPlayer(document.querySelector('.current__content-block'));
    }
    function showEnd() {
        window.location.href = './results.html';
        sessionStorage.setItem('score', score);
    }
    function getLevel(lvl = 0) {
        if (+currLevel === +birdsData.length) {
            showEnd();
        }
        if (lvl > 0) {
            document.querySelector('.answers-block').remove();
            document.querySelector('.description-block').remove();
        }
        if (lvl === 0) {
            showLevels();
        }

        currLevel = lvl;

        showDescription();
        hiddenBird = birdsData[currLevel][randomDigit(6)];
        showCurrentBlock();
        showCurrBirdSong(hiddenBird);
        showAnswers(birdsData[currLevel]);
        document.querySelectorAll('.status__btn').forEach((el) => {
            el.classList.remove('status__btn-active');
            if (+el.dataset.level === +currLevel) {
                el.classList.add('status__btn-active');
            }
        });
        nextLevelBtn.addEventListener('click', () => {
            if (rightAnswer) getLevel(++currLevel);
            rightAnswer = false;
        });
        nextLevelBtn.classList.remove('nextLevel-active');
    }
    getLevel();
}

if (document.querySelector('#quiz')) {
    const lang = localStorage.getItem('lang');
    startGame(lang);
}
