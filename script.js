// Menu mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link conforme a seção visível
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        let sectionHeight = section.offsetHeight;
        let sectionTop = section.offsetTop - 100;
        let sectionId = section.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
        }
    });
});


//Imagem e Video

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bannerVideo');
    if (!video) return;
    
    // Estado para controlar execução
    let ajusteRealizado = false;
    let timeoutAjuste;
    
    function ajustarVideoSemBordas() {
        // Cancelar timeouts anteriores
        if (timeoutAjuste) clearTimeout(timeoutAjuste);
        
        const largura = window.innerWidth;
        const altura = window.innerHeight;
        
        // APLICAR ESTILOS DIRETAMENTE (sem depender de classes)
        video.style.position = 'absolute';
        video.style.top = '50%';
        video.style.left = '50%';
        video.style.transform = 'translate(-50%, -50%)';
        video.style.minWidth = '100%';
        video.style.minHeight = '100%';
        video.style.width = 'auto';
        video.style.height = 'auto';
        video.style.objectFit = 'cover';
        
        // Ajustes específicos por dispositivo
        if (largura <= 480) {
            video.style.objectPosition = '45% center';
            video.style.transform = 'translate(-50%, -50%) scale(1.2)';
        } else if (largura <= 768) {
            video.style.objectPosition = '40% center';
            video.style.transform = 'translate(-50%, -50%) scale(1.15)';
        } else {
            video.style.objectPosition = 'center';
            video.style.transform = 'translate(-50%, -50%)';
        }
        
        // Verificar se realmente preencheu
        timeoutAjuste = setTimeout(() => {
            const rect = video.getBoundingClientRect();
            if (rect.width < largura - 2 || rect.height < altura - 2) {
                // Ainda tem bordas, aumenta mais
                const scaleAtual = largura <= 480 ? 1.3 : (largura <= 768 ? 1.2 : 1.05);
                video.style.transform = `translate(-50%, -50%) scale(${scaleAtual})`;
            }
            ajusteRealizado = true;
        }, 200);
    }
    
    // Múltiplos eventos para garantir
    const eventos = [
        'loadeddata',
        'loadedmetadata',
        'canplay',
        'canplaythrough',
        'play',
        'playing'
    ];
    
    eventos.forEach(evento => {
        video.addEventListener(evento, function() {
            if (!ajusteRealizado) {
                ajustarVideoSemBordas();
            }
        });
    });
    
    // Observar mudanças no vídeo
    const observer = new MutationObserver(() => {
        if (!ajusteRealizado) {
            ajustarVideoSemBordas();
        }
    });
    
    observer.observe(video, {
        attributes: true,
        attributeFilter: ['src', 'style']
    });
    
    // Eventos de janela
    window.addEventListener('resize', function() {
        ajusteRealizado = false;
        ajustarVideoSemBordas();
    });
    
    window.addEventListener('orientationchange', function() {
        ajusteRealizado = false;
        setTimeout(ajustarVideoSemBordas, 300);
    });
    
    // Executar imediatamente e em intervalos
    if (video.readyState >= 1) {
        ajustarVideoSemBordas();
    }
    
    // Executar múltiplas vezes para garantir
    [100, 300, 500, 800, 1000].forEach(tempo => {
        setTimeout(() => {
            ajustarVideoSemBordas();
        }, tempo);
    });
    
    // FORÇAR a cada 100ms por 2 segundos
    let contador = 0;
    const intervalo = setInterval(() => {
        ajustarVideoSemBordas();
        contador++;
        if (contador > 20) clearInterval(intervalo); // 2 segundos
    }, 100);
});