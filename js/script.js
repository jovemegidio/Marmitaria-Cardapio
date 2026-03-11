document.addEventListener('DOMContentLoaded', () => {
    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== MOBILE MENU =====
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // ===== MENU FILTER =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            menuCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                if (filter === 'todos' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Footer filter links
    document.querySelectorAll('[data-filter-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            const filter = link.dataset.filterLink;
            setTimeout(() => {
                filterBtns.forEach(b => b.classList.remove('active'));
                const targetBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
                if (targetBtn) {
                    targetBtn.classList.add('active');
                    targetBtn.click();
                }
            }, 500);
        });
    });

    // ===== TESTIMONIALS SLIDER =====
    const slider = document.getElementById('testimonialsSlider');
    const cards = slider.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let totalSlides = Math.ceil(cards.length / cardsPerView);

    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        totalSlides = Math.ceil(cards.length / cardsPerView);
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 30; // gap
        const offset = currentIndex * cardsPerView * cardWidth;
        slider.style.transform = `translateX(-${offset}px)`;

        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        updateSlider();
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Auto-slide
    let autoSlide = setInterval(() => {
        currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
        updateSlider();
    }, 5000);

    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            updateSlider();
        }, 5000);
    });

    window.addEventListener('resize', () => {
        cardsPerView = getCardsPerView();
        totalSlides = Math.ceil(cards.length / cardsPerView);
        currentIndex = Math.min(currentIndex, totalSlides - 1);
        createDots();
        updateSlider();
    });

    createDots();

    // ===== SCROLL ANIMATIONS =====
    const animatedElements = document.querySelectorAll('.benefit-card, .menu-card, .delivery-feature, .about-feature, .payment-item');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // ===== HERO PARTICLES =====
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const colors = ['192, 57, 43', '230, 126, 34', '212, 163, 115'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 3}px;
            height: ${Math.random() * 8 + 3}px;
            background: rgba(${color}, ${Math.random() * 0.15 + 0.05});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
            25% { transform: translate(20px, -30px) scale(1.1); opacity: 0.8; }
            50% { transform: translate(-10px, -50px) scale(0.9); opacity: 0.6; }
            75% { transform: translate(15px, -20px) scale(1.05); opacity: 0.7; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // ===== PRODUCT DETAIL MODAL =====
    const productData = {
        'kit10-250': {
            img: 'img/kit-10-250.svg',
            badge: 'Oferta',
            category: 'Kit Marmita Fit',
            title: 'Kit 10 unidades – 250g',
            desc: '10 marmitas fit de 250g com opções variadas do cardápio. Ideal para quem quer manter a alimentação saudável durante a semana com praticidade e sabor. Você escolhe os sabores!',
            nutrients: [
                { icon: 'fas fa-box', text: '10 unidades' },
                { icon: 'fas fa-weight-hanging', text: '250g cada' },
                { icon: 'fas fa-snowflake', text: 'Congeladas' }
            ],
            ingredients: ['Frango', 'Carne', 'Arroz integral', 'Legumes variados', 'Temperos naturais', 'Azeite'],
            oldPrice: 'R$ 199,90',
            price: 'R$ 169,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20o%20Kit%2010%20unidades%20250g'
        },
        'kit10-300': {
            img: 'img/kit-10-300.svg',
            badge: 'Novo',
            category: 'Kit Marmita Fit',
            title: 'Kit 10 unidades – 300g',
            desc: '10 marmitas fit de 300g com porções generosas e combinações equilibradas. Perfeito para quem precisa de mais energia no dia a dia sem abrir mão da saúde.',
            nutrients: [
                { icon: 'fas fa-box', text: '10 unidades' },
                { icon: 'fas fa-weight-hanging', text: '300g cada' },
                { icon: 'fas fa-snowflake', text: 'Congeladas' }
            ],
            ingredients: ['Frango', 'Carne', 'Peixe', 'Arroz integral', 'Batata-doce', 'Legumes variados', 'Temperos naturais'],
            oldPrice: 'R$ 219,90',
            price: 'R$ 189,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20o%20Kit%2010%20unidades%20300g'
        },
        'kit20-250': {
            img: 'img/kit-20-250.svg',
            badge: 'Popular',
            category: 'Kit Marmita Fit',
            title: 'Kit 20 unidades – 250g',
            desc: '20 marmitas fit de 250g. Perfeito para quem busca praticidade no mês inteiro. Escolha seus sabores favoritos e receba tudo pronto para aquecer!',
            nutrients: [
                { icon: 'fas fa-box', text: '20 unidades' },
                { icon: 'fas fa-weight-hanging', text: '250g cada' },
                { icon: 'fas fa-snowflake', text: 'Congeladas' }
            ],
            ingredients: ['Frango', 'Carne', 'Peixe', 'Arroz integral', 'Legumes variados', 'Temperos naturais', 'Azeite'],
            oldPrice: null,
            price: 'R$ 319,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20o%20Kit%2020%20unidades%20250g'
        },
        'kit30-250': {
            img: 'img/kit-30-250.svg',
            badge: null,
            category: 'Kit Marmita Fit',
            title: 'Kit 30 unidades – 250g',
            desc: '30 marmitas fit de 250g. O melhor custo-benefício para o mês completo! Monte seu cardápio personalizado com os sabores que mais gosta.',
            nutrients: [
                { icon: 'fas fa-box', text: '30 unidades' },
                { icon: 'fas fa-weight-hanging', text: '250g cada' },
                { icon: 'fas fa-snowflake', text: 'Congeladas' }
            ],
            ingredients: ['Frango', 'Carne', 'Peixe', 'Vegano', 'Arroz integral', 'Batata-doce', 'Legumes variados', 'Temperos naturais'],
            oldPrice: null,
            price: 'R$ 470,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20o%20Kit%2030%20unidades%20250g'
        },
        'frango-grelhado': {
            img: 'img/frango-grelhado.svg',
            badge: 'Popular',
            category: 'Frango',
            title: 'Frango Grelhado com Legumes',
            desc: 'Peito de frango grelhado suculento acompanhado de arroz integral, brócolis frescos e cenoura. Uma refeição leve, nutritiva e cheia de sabor.',
            nutrients: [
                { icon: 'fas fa-fire', text: '320 kcal' },
                { icon: 'fas fa-drumstick-bite', text: '35g proteína' },
                { icon: 'fas fa-bread-slice', text: '28g carbs' },
                { icon: 'fas fa-droplet', text: '8g gordura' }
            ],
            ingredients: ['Peito de frango', 'Arroz integral', 'Brócolis', 'Cenoura', 'Azeite', 'Temperos naturais', 'Sal rosa'],
            oldPrice: null,
            price: 'R$ 18,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20Frango%20Grelhado%20com%20Legumes'
        },
        'frango-desfiado': {
            img: 'img/frango-desfiado.svg',
            badge: null,
            category: 'Frango',
            title: 'Frango Desfiado Fit',
            desc: 'Frango desfiado temperado com ervas, acompanhado de batata-doce e abobrinha grelhada. Sabor caseiro com temperos 100% naturais.',
            nutrients: [
                { icon: 'fas fa-fire', text: '290 kcal' },
                { icon: 'fas fa-drumstick-bite', text: '30g proteína' },
                { icon: 'fas fa-bread-slice', text: '32g carbs' },
                { icon: 'fas fa-droplet', text: '6g gordura' }
            ],
            ingredients: ['Frango desfiado', 'Batata-doce', 'Abobrinha', 'Cebola', 'Alho', 'Temperos naturais'],
            oldPrice: null,
            price: 'R$ 17,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20Frango%20Desfiado%20Fit'
        },
        'frango-pesto': {
            img: 'img/frango-pesto.svg',
            badge: 'Low Carb',
            category: 'Frango · Low Carb',
            title: 'Frango ao Pesto com Abobrinha',
            desc: 'Filé de frango ao molho pesto caseiro, abobrinha grelhada e mix de folhas verdes. Opção low carb sofisticada e saborosa.',
            nutrients: [
                { icon: 'fas fa-fire', text: '280 kcal' },
                { icon: 'fas fa-drumstick-bite', text: '33g proteína' },
                { icon: 'fas fa-bread-slice', text: '12g carbs' },
                { icon: 'fas fa-droplet', text: '12g gordura' }
            ],
            ingredients: ['Filé de frango', 'Molho pesto', 'Abobrinha', 'Mix de folhas', 'Tomate cereja', 'Azeite extra virgem'],
            oldPrice: null,
            price: 'R$ 19,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20Frango%20ao%20Pesto'
        },
        'patinho': {
            img: 'img/carne-patinho.svg',
            badge: 'Popular',
            category: 'Carne',
            title: 'Patinho Moído Fit',
            desc: 'Carne de patinho moída de primeira qualidade, arroz integral, feijão e salada verde. O clássico brasileiro em versão fit e saudável.',
            nutrients: [
                { icon: 'fas fa-fire', text: '350 kcal' },
                { icon: 'fas fa-drumstick-bite', text: '32g proteína' },
                { icon: 'fas fa-bread-slice', text: '35g carbs' },
                { icon: 'fas fa-droplet', text: '10g gordura' }
            ],
            ingredients: ['Patinho moído', 'Arroz integral', 'Feijão', 'Alface', 'Tomate', 'Cebola', 'Temperos naturais'],
            oldPrice: null,
            price: 'R$ 19,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20Patinho%20Moído%20Fit'
        },
        'panqueca': {
            img: 'img/carne-panqueca.svg',
            badge: null,
            category: 'Carne',
            title: 'Panqueca de Carne Fit',
            desc: 'Panqueca integral recheada com carne moída temperada e molho de tomate natural caseiro. Comfort food na versão saudável!',
            nutrients: [
                { icon: 'fas fa-fire', text: '310 kcal' },
                { icon: 'fas fa-drumstick-bite', text: '28g proteína' },
                { icon: 'fas fa-bread-slice', text: '30g carbs' },
                { icon: 'fas fa-droplet', text: '9g gordura' }
            ],
            ingredients: ['Massa integral', 'Carne moída', 'Molho de tomate natural', 'Cebola', 'Alho', 'Orégano', 'Temperos naturais'],
            oldPrice: null,
            price: 'R$ 18,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20Panqueca%20de%20Carne%20Fit'
        },
        'strogonoff': {
            img: 'img/carne-strogonoff.svg',
            badge: null,
            category: 'Carne · Low Carb',
            title: 'Strogonoff Fit',
            desc: 'Strogonoff de carne com creme de castanhas, arroz integral e batata palha fit. Todo o sabor do strogonoff sem culpa!',
            nutrients: [
                { icon: 'fas fa-fire', text: '340 kcal' },
                { icon: 'fas fa-drumstick-bite', text: '30g proteína' },
                { icon: 'fas fa-bread-slice', text: '25g carbs' },
                { icon: 'fas fa-droplet', text: '14g gordura' }
            ],
            ingredients: ['Carne em tiras', 'Creme de castanhas', 'Arroz integral', 'Batata palha fit', 'Cogumelos', 'Cebola', 'Temperos naturais'],
            oldPrice: null,
            price: 'R$ 20,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20Strogonoff%20Fit'
        },
        'tilapia': {
            img: 'img/peixe-tilapia.svg',
            badge: null,
            category: 'Peixe',
            title: 'Tilápia Grelhada',
            desc: 'Filé de tilápia grelhada suculenta com purê de batata-doce cremoso e legumes salteados. Rica em ômega-3 e proteínas.',
            nutrients: [
                { icon: 'fas fa-fire', text: '300 kcal' },
                { icon: 'fas fa-fish', text: '34g proteína' },
                { icon: 'fas fa-bread-slice', text: '26g carbs' },
                { icon: 'fas fa-droplet', text: '7g gordura' }
            ],
            ingredients: ['Filé de tilápia', 'Batata-doce', 'Abobrinha', 'Cenoura', 'Vagem', 'Azeite', 'Limão', 'Temperos naturais'],
            oldPrice: null,
            price: 'R$ 22,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20Tilápia%20Grelhada'
        },
        'salmao': {
            img: 'img/peixe-salmao.svg',
            badge: 'Low Carb',
            category: 'Peixe · Low Carb',
            title: 'Salmão Grelhado com Aspargos',
            desc: 'Filé de salmão grelhado com aspargos frescos, tomate cereja e azeite extra virgem. Premium e low carb – o melhor do cardápio.',
            nutrients: [
                { icon: 'fas fa-fire', text: '330 kcal' },
                { icon: 'fas fa-fish', text: '38g proteína' },
                { icon: 'fas fa-bread-slice', text: '8g carbs' },
                { icon: 'fas fa-droplet', text: '16g gordura' }
            ],
            ingredients: ['Filé de salmão', 'Aspargos', 'Tomate cereja', 'Azeite extra virgem', 'Limão siciliano', 'Ervas finas'],
            oldPrice: null,
            price: 'R$ 29,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20Salmão%20Grelhado'
        },
        'buddha-bowl': {
            img: 'img/vegano-bowl.svg',
            badge: null,
            category: 'Vegano',
            title: 'Buddha Bowl Vegano',
            desc: 'Bowl colorido e nutritivo com grão-de-bico, quinoa, abacate, cenoura, pepino e molho tahine caseiro. 100% vegetal e delicioso!',
            nutrients: [
                { icon: 'fas fa-fire', text: '310 kcal' },
                { icon: 'fas fa-leaf', text: '18g proteína' },
                { icon: 'fas fa-bread-slice', text: '38g carbs' },
                { icon: 'fas fa-droplet', text: '12g gordura' }
            ],
            ingredients: ['Grão-de-bico', 'Quinoa', 'Abacate', 'Cenoura', 'Pepino', 'Molho tahine', 'Gergelim', 'Limão'],
            oldPrice: null,
            price: 'R$ 19,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20Buddha%20Bowl%20Vegano'
        },
        'legumes-grelhados': {
            img: 'img/vegano-legumes.svg',
            badge: null,
            category: 'Vegano · Low Carb',
            title: 'Mix de Legumes Grelhados',
            desc: 'Abobrinha, berinjela, pimentão, cogumelos e tofu grelhados com ervas finas. Leve, saboroso e 100% vegetal.',
            nutrients: [
                { icon: 'fas fa-fire', text: '250 kcal' },
                { icon: 'fas fa-leaf', text: '15g proteína' },
                { icon: 'fas fa-bread-slice', text: '18g carbs' },
                { icon: 'fas fa-droplet', text: '10g gordura' }
            ],
            ingredients: ['Abobrinha', 'Berinjela', 'Pimentão', 'Cogumelos', 'Tofu', 'Ervas finas', 'Azeite', 'Alho'],
            oldPrice: null,
            price: 'R$ 17,90',
            whatsapp: 'https://wa.me/5511999999999?text=Olá!%20Quero%20Mix%20de%20Legumes%20Grelhados'
        }
    };

    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');

    function openProductModal(itemKey) {
        const data = productData[itemKey];
        if (!data) return;

        document.getElementById('modalImg').src = data.img;
        document.getElementById('modalImg').alt = data.title;
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalDesc').textContent = data.desc;

        // Badge
        const badgeEl = document.getElementById('modalBadge');
        if (data.badge) {
            badgeEl.textContent = data.badge;
            badgeEl.style.display = 'block';
        } else {
            badgeEl.style.display = 'none';
        }

        // Nutrients
        const nutrientsEl = document.getElementById('modalNutrients');
        nutrientsEl.innerHTML = data.nutrients.map(n =>
            '<span><i class="' + n.icon + '"></i> ' + n.text + '</span>'
        ).join('');

        // Ingredients
        const ingredientsList = document.getElementById('modalIngredientsList');
        ingredientsList.innerHTML = data.ingredients.map(i =>
            '<li>' + i + '</li>'
        ).join('');

        // Price
        const priceEl = document.getElementById('modalPrice');
        priceEl.innerHTML = (data.oldPrice ? '<span class="old-price">' + data.oldPrice + '</span>' : '') +
            '<span class="current-price">' + data.price + '</span>';

        // WhatsApp order
        document.getElementById('modalOrderBtn').href = data.whatsapp;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProductModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Attach click to all "Ver detalhes" buttons
    document.querySelectorAll('.btn-quick-view').forEach(btn => {
        btn.addEventListener('click', () => {
            openProductModal(btn.dataset.item);
        });
    });

    modalClose.addEventListener('click', closeProductModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProductModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProductModal();
        }
    });
});
