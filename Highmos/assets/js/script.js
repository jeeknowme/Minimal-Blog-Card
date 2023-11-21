let timeoutIds = [];

let lastScrollTop = 0;

window.addEventListener('scroll', () => {
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
})

// About Us Transition

const aboutUs = document.querySelector('.about__us');

const isInViewPort = (element) => {
    const rect = element.getBoundingClientRect();

    return (
      rect.bottom <= window.innerHeight * 2.3
    );
}

const handleScroll = () => {
    if (isInViewPort(aboutUs)){
        aboutUs.classList.add('show');
    }else{
    }
}

window.addEventListener('scroll', handleScroll);

handleScroll();