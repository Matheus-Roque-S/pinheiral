const Sanduicemenu = document.getElementById('sanduiche-menu');
const Listamenu = document.getElementById('lista-menu');

Sanduicemenu.addEventListener('click', () => {
    Listamenu.classList.toggle('ativo');
    Sanduicemenu.classList.toggle('ativo');
});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carrossel-track');
    
    // Cancela execução se não houver carrossel na página
    if (!track) return;

    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const navIndicadores = document.querySelector('.carrossel-nav');
    const indicadores = Array.from(navIndicadores.children);

    let indexAtual = 0;
    let intervaloAuto;

    // Função para transicionar até o slide selecionado
    const atualizarCarrossel = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;

        indicadores.forEach((dot, i) => {
            dot.classList.toggle('ativo', i === index);
        });

        indexAtual = index;
    };

    const proximoSlide = () => {
        const proximoIndex = (indexAtual + 1) % slides.length;
        atualizarCarrossel(proximoIndex);
    };

    const slideAnterior = () => {
        const indexAnterior = (indexAtual - 1 + slides.length) % slides.length;
        atualizarCarrossel(indexAnterior);
    };

    // Eventos dos botões laterais
    nextBtn.addEventListener('click', () => {
        proximoSlide();
        reiniciarAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        slideAnterior();
        reiniciarAutoPlay();
    });

    // Eventos dos indicadores (pontos)
    navIndicadores.addEventListener('click', (e) => {
        const alvo = e.target.closest('button');
        if (!alvo) return;

        const indexAlvo = indicadores.findIndex(dot => dot === alvo);
        if (indexAlvo !== -1) {
            atualizarCarrossel(indexAlvo);
            reiniciarAutoPlay();
        }
    });

    // Suporte para touch/deslizar o dedo (Swipe Mobile)
    let inicioX = 0;
    let fimX = 0;

    track.addEventListener('touchstart', (e) => {
        inicioX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        fimX = e.changedTouches[0].clientX;
        const limiteDistancia = 40; // Distância mínima para validar o gesto

        if (inicioX - fimX > limiteDistancia) {
            proximoSlide();
            reiniciarAutoPlay();
        } else if (fimX - inicioX > limiteDistancia) {
            slideAnterior();
            reiniciarAutoPlay();
        }
    }, { passive: true });

    // Autoplay - Passa a imagem a cada 5 segundos
    const iniciarAutoPlay = () => {
        intervaloAuto = setInterval(proximoSlide, 5000);
    };

    const reiniciarAutoPlay = () => {
        clearInterval(intervaloAuto);
        iniciarAutoPlay();
    };

    iniciarAutoPlay();
});