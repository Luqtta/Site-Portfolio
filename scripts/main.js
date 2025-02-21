const cards = document.querySelectorAll('.card, .features .card');

function checkCenter() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Função para verificar a carta mais próxima do centro
  function getClosestCard() {
    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const distanceToCenter = Math.sqrt(Math.pow(rect.left + rect.width / 2 - centerX, 2) + Math.pow(rect.top + rect.height / 2 - centerY, 2));
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0;

      const range = window.innerWidth < 576 ? 200 : (window.innerWidth < 768 ? 250 : Infinity);

      if (isVisible && (distanceToCenter < range || (rect.top < centerY + (window.innerWidth < 768 ? 150 : 100)) && (rect.bottom > centerY - (window.innerWidth < 768 ? 150 : 100)))) {
        if (distanceToCenter < closestDistance) {
          closestCard = card;
          closestDistance = distanceToCenter;
        }
      }
    });

    return closestCard;
  }

  // Obtenção da carta mais próxima do centro
  const closestCard = getClosestCard();

  // Adiciona ou remove a classe 'hover' conforme a carta
  cards.forEach((card) => {
    if (card === closestCard) {
      card.classList.add('hover');
    } else {
      card.classList.remove('hover');
    }
  });
}

window.addEventListener('scroll', checkCenter);
window.addEventListener('resize', checkCenter);


document.addEventListener('DOMContentLoaded', () => {

    const isPageReload = performance.navigation.type === performance.navigation.TYPE_RELOAD;


    if (isPageReload) {
   
        window.scrollTo(0, 0);

    
        history.replaceState(null, null, window.location.pathname);

        
        setTimeout(() => {
            const inicioElement = document.querySelector('body'); 
            if (inicioElement) {
                inicioElement.scrollIntoView({ behavior: 'smooth' });  
            }
        }, 100);  
    } else {
        const hash = window.location.hash;
        if (hash) {
            
            history.replaceState(null, null, ' ');

          
            scrollToElement(hash);
        }
    }
});

function scrollToElement(elementSelector, instance = 0) {
    const elements = document.querySelectorAll(elementSelector);
    if (elements.length > instance) {
        const targetElement = elements[instance];
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;


        const offset = 0; 

        const scrollAnimation = (startPosition, endPosition, duration) => {
            let startTime = null;

            const body = document.body;
            body.style.transition = 'filter 0.4s ease-out';
            body.style.filter = 'blur(3px)';  
            const animateScroll = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                window.scrollTo(0, startPosition + (endPosition - startPosition) * progress - offset); 

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    body.style.filter = 'none';
                }
            };

            requestAnimationFrame(animateScroll);
        };


        window.scrollTo(0, window.scrollY); 
        scrollAnimation(window.scrollY, targetPosition, 400);  
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener('click', () => {
    scrollToElement('.header');
});

link2.addEventListener('click', () => {
    scrollToElement('.header', 1);
});

link3.addEventListener('click', () => {
    scrollToElement('.column');
});