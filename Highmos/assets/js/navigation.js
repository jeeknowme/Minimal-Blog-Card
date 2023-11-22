let timeoutIds = [];

let lastScrollTop = 0;

export const handleNavigationScroll = () => {
    console.log('heheh');
    const navBar = document.getElementById('navigation');
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;

    if (scrollTop > lastScrollTop && !isAtBottom) {
        // Scrolling down
        navBar.classList.add('nav__fix');
        navBar.style.opacity = 0;
      } else {
        // Scrolling up or at the bottom
        navBar.classList.remove('nav__fix');
        navBar.style.opacity = 1;
      }

    lastScrollTop = scrollTop;

    timeoutIds.push(setTimeout(() => {
        navBar.classList.remove('nav__fix');
        navBar.style.opacity = 0;
        navBar.style.opacity = 1;
    }, 3000));

    if(timeoutIds.length > 2){
        clearTimeout(timeoutIds[0])
        timeoutIds.shift();
    }
};

export const initializeNavigationScroll = () => {
    window.addEventListener('scroll', handleNavigationScroll);
}