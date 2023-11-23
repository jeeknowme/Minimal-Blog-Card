const aboutUs = document.querySelector('.about__us');

export const isInViewPort = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top + window.screen.height / 8 <= window.screen.height;
};

export const handleAboutUsScroll = () => {
    if (isInViewPort(aboutUs)) {
        aboutUs.classList.add('show');
    } 
};

export const initializeAboutUsScroll = () => {
    window.addEventListener('scroll', handleAboutUsScroll);
};


