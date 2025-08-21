document.addEventListener('DOMContentLoaded', function() {
    console.log("Arquivo JS externo foi carregado com sucesso!");

            // Menu Mobile
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Scroll Suave
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Fechar menu mobile se estiver aberto
                    if (navMenu.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                    
                    const targetId = this.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Atualizar menu ativo conforme scroll
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-menu a');
            
            // Função para verificar se uma seção está visível
            function isSectionVisible(section) {
                const rect = section.getBoundingClientRect();
                return (
                    rect.top <= 100 && 
                    rect.bottom >= (window.innerHeight / 2 || document.documentElement.clientHeight / 2)
                );
            }
            
            // Função para atualizar o menu ativo
            function updateActiveMenu() {
                let homeActive = true;
                
                sections.forEach(section => {
                    if (section.id !== 'home' && isSectionVisible(section)) {
                        // Se alguma seção (exceto home) está visível
                        homeActive = false;
                        
                        // Ativa o link correspondente
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${section.id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
                
                // Se nenhuma outra seção está visível, ativa o Home
                if (homeActive) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#home') {
                            link.classList.add('active');
                        }
                    });
                }
            }
            
            // Inicializar e adicionar listener de scroll
            updateActiveMenu();
            window.addEventListener('scroll', updateActiveMenu);

            // Animação ao Scroll
            const observerOptions = {
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.project-card, .value-card').forEach(element => {
                element.classList.add('hide');
                observer.observe(element);
            });
        });

// Adicionar esta função no seu arquivo script.js
function initProjectsPagination() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    const projectCards = projectsGrid.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');
    
    // Apenas para mobile
    if (window.innerWidth > 768) {
        // Mostrar todos os cards em desktop
        projectCards.forEach(card => card.style.display = 'block');
        document.querySelector('.pagination-controls').style.display = 'none';
        return;
    }
    
    const cardsPerPage = 3;
    const totalPages = Math.ceil(projectCards.length / cardsPerPage);
    let currentPage = 1;
    
    // Atualizar contador de páginas
    totalPagesSpan.textContent = totalPages;
    
    // Mostrar cards da página atual
    function showCurrentPage() {
        projectCards.forEach((card, index) => {
            const startIndex = (currentPage - 1) * cardsPerPage;
            const endIndex = startIndex + cardsPerPage;
            
            if (index >= startIndex && index < endIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        currentPageSpan.textContent = currentPage;
        
        // Atualizar estado dos botões
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showCurrentPage();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            showCurrentPage();
        }
    });
    
    // Inicializar
    showCurrentPage();
}

// Chamar a função quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initProjectsPagination);

// Recarregar quando redimensionar
window.addEventListener('resize', initProjectsPagination);