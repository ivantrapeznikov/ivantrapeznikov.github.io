// ===== ДАННЫЕ О КАРТИНАХ =====
const paintingsData = {
    1: {
        title: "«Гроза надвигается»",
        year: "2026",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Драматическая атмосфера приближающейся грозы. Натуральные пигменты, лессировка.",
        image: "images/photo_2026-03-13_09-29-09.jpg"
    },
    2: {
        title: "«Северная ночь в горах»",
        year: "2026",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Северное сияние над горами. Холодная палитра с акцентом на свет.",
        image: "images/painting-2.jpg"
    },
    3: {
        title: "«Утро в деревне»",
        year: "2026",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Деревенская архитектура в утреннем свете. Тёплая цветовая гамма.",
        image: "images/painting-3.jpg"
    },
    4: {
        title: "«Молчаливое общение»",
        year: "2026",
        size: "100×120 см",
        description: "Масло, холст. Многослойная техника. Зимний пейзаж с деревьями. Философское настроение, тишина природы.",
        image: "images/painting-4.jpg"
    },
    5: {
        title: "«Море. Полярная ночь»",
        year: "2026",
        size: "70×90 см",
        description: "Масло, холст. Многослойная техника. Северное море в полярную ночь. Глубокие синие тона, мистическая атмосфера.",
        image: "images/painting-5.jpg"
    },
    6: {
        title: "«Мастерская»",
        year: "2025",
        size: "60×80 см",
        description: "Масло, холст. Многослойная техника. Интерьер мастерской художника. Тёплый свет, уютная атмосфера.",
        image: "images/painting-6.jpg"
    },
    7: {
        title: "«7 день»",
        year: "2025",
        size: "70×90 см",
        description: "Масло, холст. Многослойная техника. Символический пейзаж. Размышления о времени и покое.",
        image: "images/painting-7.jpg"
    },
    8: {
        title: "«Остров»",
        year: "2021",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Остров в северных водах. Одиночество и гармония природы.",
        image: "images/painting-8.jpg"
    },
    9: {
        title: "«Небо»",
        year: "2019",
        size: "60×80 см",
        description: "Масло, холст. Многослойная техника. Небесная стихия. Динамика облаков, световые эффекты.",
        image: "images/painting-9.jpg"
    },
    10: {
        title: "«Зимний пейзаж»",
        year: "2024",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Классический зимний пейзаж. Снег, деревья, спокойствие.",
        image: "images/painting-10.jpg"
    }
};

// ===== ОТКРЫТИЕ МОДАЛЬНОГО ОКНА =====
document.querySelectorAll('.painting-card').forEach(card => {
    card.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const data = paintingsData[id];
        
        if (data) {
            document.getElementById('modalImg').src = data.image;
            document.getElementById('modalImg').alt = data.title;
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalYear').textContent = data.year;
            document.getElementById('modalSize').textContent = data.size;
            document.getElementById('modalDesc').textContent = data.description;
            
            document.getElementById('modal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// ===== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА =====
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== ПЛАВНАЯ ПРОКРУТКА К СЕКЦИЯМ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}
