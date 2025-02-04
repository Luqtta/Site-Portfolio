document.addEventListener('DOMContentLoaded', () => {
    // Verificação para detectar recarregamento da página
    const isPageReload = performance.navigation.type === performance.navigation.TYPE_RELOAD;

    // Se a página for recarregada, vai rolar para o topo e limpar o hash da URL
    if (isPageReload) {
        // Rola para o topo da página
        window.scrollTo(0, 0);

        // Limpa o hash na URL
        history.replaceState(null, null, window.location.pathname);

        // Espera que o DOM carregue completamente antes de rolar para o início
        setTimeout(() => {
            const inicioElement = document.querySelector('body'); // ou qualquer outro seletor desejado
            if (inicioElement) {
                inicioElement.scrollIntoView({ behavior: 'smooth' });  // Rolagem suave até o topo
            }
        }, 100);  // O tempo de espera pode ser ajustado conforme necessário
    } else {
        const hash = window.location.hash;
        if (hash) {
            // Remover o hash da URL para não afetar o scroll
            history.replaceState(null, null, ' ');

            // Evitar que o scroll aconteça se for um recarregamento
            scrollToElement(hash);
        }
    }
});

function scrollToElement(elementSelector, instance = 0) {
    const elements = document.querySelectorAll(elementSelector);
    if (elements.length > instance) {
        const targetElement = elements[instance];
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

        // Ajuste para garantir que a rolagem vá completamente até o topo
        const offset = 0; // Você pode ajustar o valor de offset se necessário

        const scrollAnimation = (startPosition, endPosition, duration) => {
            let startTime = null;

            const body = document.body;
            body.style.transition = 'filter 0.4s ease-out';
            body.style.filter = 'blur(3px)';  
            const animateScroll = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                window.scrollTo(0, startPosition + (endPosition - startPosition) * progress - offset); // Aplicando o offset

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    body.style.filter = 'none';
                }
            };

            requestAnimationFrame(animateScroll);
        };

        // Evita o scroll direto
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