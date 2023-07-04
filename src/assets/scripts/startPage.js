const languageSelect = document.querySelector('#languageSelect');
if (languageSelect) {
    if (!localStorage.getItem('lang')) {
        languageSelect.value = 'en';
        localStorage.setItem('lang', 'en');
    }
    const startGame = document.querySelector('#startGame');
    const gallery = document.querySelector('#gallery');
    const results = document.querySelector('#results');
    const aboutAuthor = document.querySelector('#aboutAuthor');
    const lang = localStorage.getItem('lang');
    if (lang === 'en') {
        startGame.textContent = ' Start game';
        gallery.textContent = '  Gallery';
        results.textContent = ' Results';
        aboutAuthor.textContent = 'About author';
    } else {
        startGame.textContent = 'Старт игры';
        gallery.textContent = 'Галерея';
        results.textContent = 'Результаты';
        aboutAuthor.textContent = 'Об авторе';
    }
    languageSelect.addEventListener('input', (e) => {
        localStorage.setItem('lang', e.target.value);
        window.location.reload();
    });
}
