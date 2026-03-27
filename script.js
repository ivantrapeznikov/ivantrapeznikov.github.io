// ===== ДАННЫЕ О КАРТИНАХ =====
const paintings = {
    1: {
        title: "«Зимний закат»",
        year: "2025",
        description: "Масло, холст. 80×100 см. Тёплый свет заката на зимнем пейзаже.",
        image: "images/painting-1.jpg"
    },
    2: {
        title: "«Снежный лес»",
        year: "2025",
        description: "Масло, холст. 60×80 см. Зимний лес в утреннем свете.",
        image: "images/painting-2.jpg"
    },
    3: {
        title: "«Деревенский двор»",
        year: "2024",
        description: "Масло, холст. 80×100 см. Деревенская архитектура зимой.",
        image: "images/painting-3.jpg"
    },
    4: {
        title: "«Горная тишина»",
        year: "2024",
        description: "Масло, холст. 100×120 см. Горный пейзаж с акцентом на перспективу.",
        image: "images/painting-4.jpg"
    },
    5: {
        title: "«Лесная тропа»",
        year: "2025",
        description: "Масло, холст. 50×70 см. Интимный пейзаж с игрой света и тени.",
        image: "images/painting-5.jpg"
    },
    6: {
        title: "«Первый снег»",
        year: "2024",
        description: "Масло, холст. 60×80 см. Раннее утро после снегопада.",
        image: "images/painting-6.jpg"
    },
    7: {
        title: "«Утренний свет»",
        year: "2025",
        description: "Масло, холст. 70×90 см. Рассвет над заснеженным полем.",
        image: "images/painting-7.jpg"
    },
    8: {
        title: "«Зимняя сказка»",
        year: "2024",
        description: "Масло, холст. 80×100 см. Волшебная атмосфера зимнего вечера.",
        image: "images/painting-8.jpg"
    },
    9: {
        title: "«Деревня зимой»",
        year: "2025",
        description: "Масло, холст. 60×80 см. Традиционная русская деревня.",
        image: "images/painting-9.jpg"
    },
    10: {
        title: "«Снежная даль»",
        year: "2024",
        description: "Масло, холст. 90×110 см. Бескрайние зимние просторы.",
        image: "images/painting-10.jpg"
    },
    11: {
        title: "«Вечер в деревне»",
        year: "2025",
        description: "Масло, холст. 70×90 см. Спокойствие зимнего вечера.",
        image: "images/painting-11.jpg"
    },
    12: {
        title: "«Морозное утро»",
        year: "2024",
        description: "Масло, холст. 80×100 см. Свежесть морозного утра.",
        image: "images/painting-12.jpg"
    }
};

// ===== ОТКРЫТИЕ МОДАЛЬНОГО ОКНА =====
document.querySelectorAll('.painting-frame').forEach(frame => {
    frame.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const painting = paintings[id];
        
        if (painting) {
            document.getElementById('modalImage').src = painting.image;
            document.getElementById('modalImage').alt = painting.title + ' — Иван Трапезников';
            document.getElementById('modalTitle').textContent = painting.title;
            document.getElementById('modalYear').textContent = painting.year;
            document.getElementById('modalDescription').textContent = painting.description;
            
            document.getElementById('paintingModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// ===== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА =====
function closeModal() {
    document.getElementById('paintingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('paintingModal');
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ===== ПЛАВНЫЙ СКРОЛЛ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
