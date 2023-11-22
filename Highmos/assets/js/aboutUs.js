const aboutUs = document.querySelector('.about__us');

export const isInViewPort = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.bottom <= window.innerHeight * 2.3;
};

export const handleAboutUsScroll = () => {
    console.log('scroll');
    if (isInViewPort(aboutUs)) {
        aboutUs.classList.add('show');
    } 
};

export const initializeAboutUsScroll = () => {
    window.addEventListener('scroll', handleAboutUsScroll);
};


