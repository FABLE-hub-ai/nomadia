const langToggle = document.querySelector('.lang-switch');

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const current = langToggle.textContent.trim();
    langToggle.textContent = current === 'EN' ? 'RU' : 'EN';
    document.documentElement.lang = current === 'EN' ? 'ru' : 'en';
  });
}
