// ===== ДАННЫЕ О КАРТИНАХ С НЕСКОЛЬКИМИ ФОТО =====
const paintingsData = {
    1: {
        title: "«Гроза надвигается»",
        year: "2026",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Драматическая атмосфера приближающейся грозы.",
        images: [
            "images/photo_2026-03-13_09-29-09.jpg",
            "images/photo_2026-03-13_09-29-09-detail1.jpg",
            "images/photo_2026-03-13_09-29-09-detail2.jpg"
        ]
    },
    2: {
        title: "«Северная ночь в горах»",
        year: "2026",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Северное сияние над горами.",
        images: [
            "images/painting-2.jpg",
            "images/painting-2-detail.jpg"
        ]
    },
    3: {
        title: "«Утро в деревне»",
        year: "2026",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Деревенская архитектура в утреннем свете.",
        images: [
            "images/painting-3.jpg"
        ]
    },
    4: {
        title: "«Молчаливое общение»",
        year: "2026",
        size: "100×120 см",
        description: "Масло, холст. Многослойная техника. Зимний пейзаж с деревьями.",
        images: [
            "images/painting-4.jpg"
        ]
    },
    5: {
        title: "«Море. Полярная ночь»",
        year: "2026",
        size: "50×70 см",
        description: "Масло, холст. Многослойная техника. Северное море в полярную ночь. Глубокие синие тона.",
        images: [
            "images/photo_2026-03-13_09-29-04.jpg"
        ]
    },
    6: {
        title: "«Мастерская»",
        year: "2025",
        size: "60×80 см",
        description: "Масло, холст. Многослойная техника. Интерьер мастерской художника.",
        images: [
            "images/painting-6.jpg"
        ]
    },
    7: {
        title: "«7 день»",
        year: "2025",
        size: "70×90 см",
        description: "Масло, холст. Многослойная техника. Символический пейзаж.",
        images: [
            "images/painting-7.jpg"
        ]
    },
    8: {
        title: "«Остров»",
        year: "2021",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Остров в северных водах.",
        images: [
            "images/painting-8.jpg"
        ]
    },
    9: {
        title: "«Небо»",
        year: "2019",
        size: "60×80 см",
        description: "Масло, холст. Многослойная техника. Небесная стихия.",
        images: [
            "images/painting-9.jpg"
        ]
    }
};

// ===== ТЕКУЩЕЕ СОСТОЯНИЕ =====
let currentPaintingId = null;
let currentImageIndex = 0;

// ===== ОТКРЫТИЕ МОДАЛЬНОГО ОКНА =====
document.addEventListener('DOMContentLoaded', function() {
    const frames = document.querySelectorAll('.painting-frame');
    
    frames.forEach(function(frame) {
        frame.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            currentPaintingId = id;
            currentImageIndex = 0;
            
            const data = paintingsData[id];
            
            if (data) {
                // Показать первое фото
                document.getElementById('modalImg').src = data.images[0];
                document.getElementById('modalTitle').textContent = data.title;
                document.getElementById('modalYear').textContent = data.year;
                document.getElementById('modalSize').textContent = data.size;
                document.getElementById('modalDesc').textContent = data.description;
                
                // Обновить счётчик
                updateCounter(data.images.length);
                
                // Показать/скрыть кнопки навигации
                updateNavButtons(data.images.length);
                
                // Показать окно
                document.getElementById('modal').style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
});

// ===== НАВИГАЦИЯ ПО ФОТО =====
function nextImage() {
    if (!currentPaintingId) return;
    
    const data = paintingsData[currentPaintingId];
    currentImageIndex = (currentImageIndex + 1) % data.images.length;
    
    const img = document.getElementById('modalImg');
    img.style.opacity = '0';
    
    setTimeout(function() {
        img.src = data.images[currentImageIndex];
        img.style.opacity = '1';
        updateCounter(data.images.length);
    }, 150);
}

function prevImage() {
    if (!currentPaintingId) return;
    
    const data = paintingsData[currentPaintingId];
    currentImageIndex = (currentImageIndex - 1 + data.images.length) % data.images.length;
    
    const img = document.getElementById('modalImg');
    img.style.opacity = '0';
    
    setTimeout(function() {
        img.src = data.images[currentImageIndex];
        img.style.opacity = '1';
        updateCounter(data.images.length);
    }, 150);
}

// ===== ОБНОВЛЕНИЕ СЧЁТЧИКА =====
function updateCounter(total) {
    const counter = document.getElementById('imageCounter');
    counter.textContent = (currentImageIndex + 1) + ' из ' + total;
}

// ===== ОБНОВЛЕНИЕ КНОПОК =====
function updateNavButtons(total) {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (total <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

// ===== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА =====
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentPaintingId = null;
    currentImageIndex = 0;
}

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
    // Стрелки для навигации
    if (e.key === 'ArrowRight') {
        nextImage();
    }
    if (e.key === 'ArrowLeft') {
        prevImage();
    }
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
