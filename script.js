// ===== ПЕРЕМЕЩЕНИЕ ГАЛЕРЕИ =====
const container = document.getElementById('galleryContainer');
const wall = document.getElementById('museumWall');
let isDown = false;
let startX, startY;
let currentX = 0, currentY = 0;
let targetX = 0, targetY = 0;
let zoom = 1;
let targetZoom = 1;

// Начало перетаскивания
container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.style.cursor = 'grabbing';
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
});

// Конец перетаскивания
container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
});

container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
});

// Перемещение
container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    targetX = e.clientX - startX;
    targetY = e.clientY - startY;
    
    // Ограничения
    const maxX = 0;
    const minX = -(wall.offsetWidth - container.clientWidth);
    const maxY = 0;
    const minY = -(wall.offsetHeight - container.clientHeight);
    
    targetX = Math.max(minX, Math.min(maxX, targetX));
    targetY = Math.max(minY, Math.min(maxY, targetY));
});

// Zoom колесом
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetZoom -= e.deltaY * 0.001;
    targetZoom = Math.max(0.5, Math.min(2, targetZoom));
});

// Плавная анимация
function animate() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    zoom += (targetZoom - zoom) * 0.1;
    
    wall.style.transform = `translate(${currentX}px, ${currentY}px) scale(${zoom})`;
    
    requestAnimationFrame(animate);
}

animate();

// ===== МОДАЛЬНЫЕ ОКНА =====
const paintings = {
    1: {
        title: "«Гроза надвигается»",
        year: "2026",
        description: "Масло, холст. 80×100 см. Многослойная живопись. Драматическая атмосфера приближающейся грозы.",
        image: "images/photo_2026-03-13_09-29-09.jpg"
    },
    2: {
        title: "«Снежный лес»",
        year: "2025",
        description: "Масло, холст. 60×80 см. Зимний лес в утреннем свете. Техника лессировки.",
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
        description: "Масло, холст. 100×120 см. Горный пейзаж с воздушной перспективой.",
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
    }
};

// Открытие модального окна
document.querySelectorAll('.painting-item').forEach(item => {
    item.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const painting = paintings[id];
        
        if (painting) {
            document.getElementById('modalImage').src = painting.image;
            document.getElementById('modalTitle').textContent = painting.title;
            document.getElementById('modalYear').textContent = painting.year;
            document.getElementById('modalDescription').textContent = painting.description;
            document.getElementById('paintingModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Закрытие
function closeModal() {
    document.getElementById('paintingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('paintingModal')) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            targetX = 0;
            targetY = 0;
            targetZoom = 1;
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    });
});
