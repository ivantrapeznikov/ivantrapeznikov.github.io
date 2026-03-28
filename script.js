// ===== ДАННЫЕ О КАРТИНАХ =====
const paintingsData = {
    1: {
        title: "«Гроза надвигается»",
        year: "2026",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Драматическая атмосфера приближающейся грозы.",
        image: "images/photo_2026-03-13_09-29-09.jpg"
    },
    2: {
        title: "«Северная ночь в горах»",
        year: "2026",
        size: "24×30 см",
        description: "Масло, холст. Многослойная техника. Северная ночь в горах.",
        image: "images/painting-2.jpg"
    },
    3: {
        title: "«Утро в деревне»",
        year: "2026",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Деревенская архитектура в утреннем свете.",
        image: "images/painting-3.jpg"
    },
    4: {
        title: "«Молчаливое общение»",
        year: "2026",
        size: "100×120 см",
        description: "Масло, холст. Многослойная техника. Зимний пейзаж с деревьями.",
        image: "images/painting-4.jpg"
    },
    5: {
        title: "«Море. Полярная ночь»",
        year: "2026",
        size: "50×70 см",
        description: "Масло, холст. Многослойная техника. Северное море в полярную ночь.",
        image: "images/photo_2026-03-13_09-29-04.jpg"
    },
    6: {
        title: "«Мастерская»",
        year: "2025",
        size: "60×80 см",
        description: "Масло, холст. Многослойная техника. Интерьер мастерской художника.",
        image: "images/painting-6.jpg"
    },
    7: {
        title: "«7 день»",
        year: "2025",
        size: "70×90 см",
        description: "Масло, холст. Многослойная техника. Символический пейзаж.",
        image: "images/painting-7.jpg"
    },
    8: {
        title: "«Остров»",
        year: "2021",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Остров в северных водах.",
        image: "images/painting-8.jpg"
    },
    9: {
        title: "«Небо»",
        year: "2019",
        size: "60×80 см",
        description: "Масло, холст. Многослойная техника. Небесная стихия.",
        image: "images/painting-9.jpg"
    },
    10: {
        title: "«Зимний пейзаж»",
        year: "2024",
        size: "80×100 см",
        description: "Масло, холст. Многослойная техника. Классический зимний пейзаж.",
        image: "images/painting-10.jpg"
    }
};

// ===== ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ПРИ КЛИКЕ =====
document.addEventListener('DOMContentLoaded', function() {
    // Находим все рамки с картинами
    const frames = document.querySelectorAll('.painting-frame');
    
    console.log('Найдено картин:', frames.length); // Для отладки
    
    frames.forEach(function(frame) {
        frame.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            console.log('Клик по картине ID:', id); // Для отладки
            
            const data = paintingsData[id];
            
            if (data) {
                // Заполняем данные
                document.getElementById('modalImg').src = data.image;
                document.getElementById('modalImg').alt = data.title;
                document.getElementById('modalTitle').textContent = data.title;
                document.getElementById('modalYear').textContent = data.year;
                document.getElementById('modalSize').textContent = data.size;
                document.getElementById('modalDesc').textContent = data.description;
                
                // Показываем окно
                document.getElementById('modal').style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                console.log('Модальное окно открыто'); // Для отладки
            } else {
                console.error('Картина с ID', id, 'не найдена в данных');
            }
        });
    });
});

// ===== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА =====
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    console.log('Модальное окно закрыто'); // Для отладки
}

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Закрытие по клавише ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== ПЛАВНАЯ ПРОКРУТКА =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
