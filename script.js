// ===== 3D ПЕРЕМЕЩЕНИЕ МУЗЕЙНОЙ СТЕНЫ =====
const viewport = document.querySelector('.wall-viewport');
const wall = document.getElementById('museumWall');
let isDown = false;
let startX, startY;
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;
let zoom = 1;
let targetZoom = 1;

// Настройки чувствительности
const sensitivity = 0.5;
const zoomSensitivity = 0.001;
const minZoom = 0.5;
const maxZoom = 2;

// Начало перетаскивания
viewport.addEventListener('mousedown', (e) => {
    isDown = true;
    viewport.style.cursor = 'grabbing';
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
});

// Конец перетаскивания
viewport.addEventListener('mouseleave', () => {
    isDown = false;
    viewport.style.cursor = 'grab';
});

viewport.addEventListener('mouseup', () => {
    isDown = false;
    viewport.style.cursor = 'grab';
});

// Перемещение стены
viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    
    targetX = e.clientX - startX;
    targetY = e.clientY - startY;
    
    // Ограничения перемещения
    const maxX = 0;
    const minX = -(wall.offsetWidth - viewport.clientWidth);
    const maxY = 0;
    const minY = -(wall.offsetHeight - viewport.clientHeight);
    
    targetX = Math.max(minX, Math.min(maxX, targetX));
    targetY = Math.max(minY, Math.min(maxY, targetY));
});

// Приближение колесом мыши
viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    targetZoom -= e.deltaY * zoomSensitivity;
    targetZoom = Math.max(minZoom, Math.min(maxZoom, targetZoom));
    
    // Приближение к точке курсора
    const rect = viewport.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const zoomRatio = targetZoom / zoom;
    
    targetX -= (mouseX - rect.width / 2) * (zoomRatio - 1);
    targetY -= (mouseY - rect.height / 2) * (zoomRatio - 1);
});

// Плавная анимация движения
function animate() {
    // Плавное приближение к целевым значениям
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    zoom += (targetZoom - zoom) * 0.1;
    
    // Применение трансформации с 3D перспективой
    wall.style.transform = `
        perspective(1500px)
        translateZ(${-500 * (zoom - 1)}px)
        translateX(${currentX}px)
        translateY(${currentY}px)
        scale(${zoom})
        rotateY(${currentX * 0.01}deg)
        rotateX(${currentY * 0.01}deg)
    `;
    
    requestAnimationFrame(animate);
}

animate();

// ===== МОБИЛЬНОЕ УПРАВЛЕНИЕ (тачскрин) =====
let touchStartX, touchStartY;

viewport.addEventListener('touchstart', (e) => {
    isDown = true;
    touchStartX = e.touches[0].clientX - currentX;
    touchStartY = e.touches[0].clientY - currentY;
});

viewport.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    
    targetX = e.touches[0].clientX - touchStartX;
    targetY = e.touches[0].clientY - touchStartY;
});

viewport.addEventListener('touchend', () => {
    isDown = false;
});

// ===== ЩИПОК ДЛЯ ZOOM НА МОБИЛЬНЫХ =====
let initialPinchDistance = null;
let initialZoom = 1;

viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        initialPinchDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        initialZoom = zoom;
    }
});

viewport.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && initialPinchDistance) {
        const currentDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        
        const zoomDelta = (currentDistance - initialPinchDistance) * 0.005;
        targetZoom = initialZoom + zoomDelta;
        targetZoom = Math.max(minZoom, Math.min(maxZoom, targetZoom));
    }
});

viewport.addEventListener('touchend', () => {
    initialPinchDistance = null;
});

// ===== МОДАЛЬНЫЕ ОКНА КАРТИН =====
const paintings = {
    1: {
        title: "«Гроза надвигается»",
        year: "2026",
        description: "Масло, холст. 80×100 см. Многослойная живопись. Картина передаёт драматическую атмосферу приближающейся грозы с использованием натуральных пигментов.",
        image: "images/photo_2026-03-13_09-29-09.jpg"
    },
    2: {
        title: "«Снежный лес»",
        year: "2025",
        description: "Масло, холст. 60×80 см. Зимний лес в утреннем свете. Работа выполнена в технике лессировки.",
        image: "images/painting-2.jpg"
    },
    3: {
        title: "«Деревенский двор»",
        year: "2024",
        description: "Масло, холст. 80×100 см. Деревенская архитектура зимой. Традиционная русская изба.",
        image: "images/painting-3.jpg"
    },
    4: {
        title: "«Горная тишина»",
        year: "2024",
        description: "Масло, холст. 100×120 см. Горный пейзаж с акцентом на воздушную перспективу.",
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

// Закрытие модального окна
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

// ===== ПЛАВНАЯ ПРОКРУТКА К СЕКЦИЯМ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Сброс позиции стены
        targetX = 0;
        targetY = 0;
        targetZoom = 1;
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    });
});

// ===== ПОКАЗАТЬ ИНДИКАТОР ПРИ ЗАГРУЗКЕ =====
window.addEventListener('load', () => {
    const indicator = document.querySelector('.control-indicator');
    if (indicator) {
        indicator.style.animation = 'fadeInOut 5s ease 1s';
    }
});

// ===== ДОБАВЛЕНИЕ НОВЫХ КАРТИН (инструкция) =====
/*
Чтобы добавить новую картину:

1. Загрузите фото в папку images/
2. Добавьте HTML-блок в index.html:
   <div class="painting-frame" data-id="10" style="transform: rotateY(2deg) rotateX(-1deg);">
       <div class="ornate-frame">
           <img src="images/painting-10.jpg" alt="Название — Иван Трапезников" class="painting">
           <div class="frame-reflection"></div>
       </div>
       <div class="painting-info">
           <h3>«Название»</h3>
           <p>2025 • Масло, холст • 80×100 см</p>
       </div>
   </div>

3. Добавьте данные в объект paintings в script.js:
   10: {
       title: "«Название»",
       year: "2025",
       description: "Описание...",
       image: "images/painting-10.jpg"
   }
*/
