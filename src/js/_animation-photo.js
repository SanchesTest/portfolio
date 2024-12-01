export function animationPhoto() {
    const imageUrl = 'img/avatar4.png'; // Замените на путь к вашему изображению
    const cols = 60; // Количество столбцов
    const rows = 70; // Количество строк
    const pixelSize = 10; // Размер пикселя

    // Создаем контейнер для пикселей
    const container = document.createElement('div');
    container.classList.add('container'); // Добавляем класс контейнера
    document.body.appendChild(container);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.style.backgroundImage = `url(${imageUrl})`;
            pixel.style.backgroundPosition = `-${x * pixelSize}px -${y * pixelSize}px`;
            pixel.style.width = `${pixelSize}px`;
            pixel.style.height = `${pixelSize}px`;
            pixel.style.top = `${y * pixelSize}px`;
            pixel.style.left = `${x * pixelSize}px`;
            container.appendChild(pixel);

            // Задержка анимации
            const delay = Math.random() * 1000; // Случайная задержка
            pixel.style.animationDelay = `${delay}ms`; // Применяем задержку
        }
    }
}
