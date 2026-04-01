// ===== ДАННЫЕ О КАРТИНАХ С НЕСКОЛЬКИМИ ФОТО =====
const paintingsData = {
    1: {
        title: "«Гроза надвигается»",
        year: "2026",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Драматическая атмосфера приближающейся грозы.",
        images: [
            "images/IMG_9792.jpeg"
        ]
    },
    2: {
        title: "«Северная ночь в горах»",
        year: "2026",
        size: "24×30 см",
        description: "Масло, холст. Многослойная техника. Ночные сопки близ кандалакши.",
        images: [
            "images/IMG_1164.jpeg"
        ]
    },
    3: {
        title: "«Утро в деревне»",
        year: "2026",
        size: "30×24 см",
        description: "Масло, холст. Многослойная техника. Деревенская архитектура в утреннем свете.",
        images: [
            "images/зима.jpg"
        ]
    },
    4: {
        title: "«Молчаливое общение»",
        year: "2026",
        size: "80×70 см",
        description: "Масло, холст. Многослойная техника.",
        images: [
            "images/IMG_1182.jpeg"
        ]
    },
    5: {
        title: "«Море. Полярная ночь»",
        year: "2026",
        size: "50×70 см",
        description: "Масло, холст. Многослойная техника. Северное море ночью. Силуэт человека у костра.",
        images: [
            "images/IMG_1166.jpeg"
        ]
    },
    6: {
        title: "«Мастерская»",
        year: "2025",
        size: "50×60 см",
        description: "Масло, холст. Многослойная техника. Интерьер древней ювелирной мастерской.",
        images: [
            "images/photo_2026-03-13_09-28-43.jpg"
        ]
    },
    7: {
        title: "«7 день»",
        year: "2025",
        size: "50×40 см",
        description: "Масло, холст. Многослойная техника. Символический пейзаж.",
        images: [
            "images/Безымянный.jpg"
        ]
    },
    8: {
        title: "«Остров»",
        year: "2021",
        size: "24×30 см",
        description: "Масло, картон. Остров в северных водах.",
        images: [
            "images/IMG_1175.jpeg"
        ]
    },
    9: {
        title: "«Небо»",
        year: "2019",
        size: "30×40 см",
        description: "Масло, холст. Закатные облака. Птицы.",
        images: [
            "images/IMG_1149.jpeg"
        ]
    }
};

// ===== ТЕКУЩЕЕ СОСТОЯНИЕ =====
let currentPaintingId = null;
let currentImageIndex = 0;

// ===== ИНИЦИАЛИЗАЦИЯ ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена, инициализация галереи...');
    
    // Находим все рамки картин
    const frames = document.querySelectorAll('.painting-frame');
    console.log('Найдено картин:', frames.length);
    
    // Добавляем обработчик клика на каждую картину
    frames.forEach(function(frame, index) {
        frame.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            console.log('Клик по картине ID:', id);
            
            openModal(id);
        });
    });
});

// ===== ОТКРЫТИЕ МОДАЛЬНОГО ОКНА =====
function openModal(id) {
    currentPaintingId = id;
    currentImageIndex = 0;
    
    const data = paintingsData[id];
    
    if (data) {
        console.log('Открываю картину:', data.title);
        
        // Устанавливаем первое фото
        const modalImg = document.getElementById('modalImg');
        if (modalImg) {
            modalImg.src = data.images[0];
            modalImg.alt = data.title;
        }
        
        // Заполняем информацию
        const modalTitle = document.getElementById('modalTitle');
        const modalYear = document.getElementById('modalYear');
        const modalSize = document.getElementById('modalSize');
        const modalDesc = document.getElementById('modalDesc');
        
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalYear) modalYear.textContent = data.year;
        if (modalSize) modalSize.textContent = data.size;
        if (modalDesc) modalDesc.textContent = data.description;
        
        // Обновляем счётчик и кнопки
        updateCounter(data.images.length);
        updateNavButtons(data.images.length);
        
        // Показываем окно
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    } else {
        console.error('Картина с ID', id, 'не найдена!');
    }
}

// ===== СЛЕДУЮЩЕЕ ФОТО =====
function nextImage() {
    if (!currentPaintingId) return;
    
    const data = paintingsData[currentPaintingId];
    if (!data || data.images.length <= 1) return;
    
    currentImageIndex = (currentImageIndex + 1) % data.images.length;
    updateImage();
}

// ===== ПРЕДЫДУЩЕЕ ФОТО =====
function prevImage() {
    if (!currentPaintingId) return;
    
    const data = paintingsData[currentPaintingId];
    if (!data || data.images.length <= 1) return;
    
    currentImageIndex = (currentImageIndex - 1 + data.images.length) % data.images.length;
    updateImage();
}

// ===== ОБНОВЛЕНИЕ ИЗОБРАЖЕНИЯ =====
function updateImage() {
    const data = paintingsData[currentPaintingId];
    const modalImg = document.getElementById('modalImg');
    
    if (modalImg && data) {
        modalImg.style.opacity = '0';
        
        setTimeout(function() {
            modalImg.src = data.images[currentImageIndex];
            modalImg.style.opacity = '1';
            updateCounter(data.images.length);
        }, 150);
    }
}

// ===== ОБНОВЛЕНИЕ СЧЁТЧИКА =====
function updateCounter(total) {
    const counter = document.getElementById('imageCounter');
    if (counter) {
        counter.textContent = (currentImageIndex + 1) + ' из ' + total;
    }
}

// ===== ОБНОВЛЕНИЕ КНОПОК =====
function updateNavButtons(total) {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn && nextBtn) {
        if (total <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }
}

// ===== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА =====
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    currentPaintingId = null;
    currentImageIndex = 0;
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Закрытие по ESC и навигация стрелками
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
    if (e.key === 'ArrowRight') {
        nextImage();
    }
    if (e.key === 'ArrowLeft') {
        prevImage();
    }
});

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
