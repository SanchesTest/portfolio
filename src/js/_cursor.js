export function initCustomCursor() {
    function getRandomMatrixChar() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        return chars.charAt(Math.floor(Math.random() * chars.length));
      }
    
      // Находим элемент круга
      const cursorCircle = document.getElementById('cursorCircle');
      
    // Функция для обновления позиции и отображения курсора
      function showCursor(e) {
        cursorCircle.style.left = `${e.pageX - 10}px`;
        cursorCircle.style.top = `${e.pageY - 10}px`;
        cursorCircle.style.opacity = 1; // Делаем курсор видимым
    
        // После первого срабатывания удаляем этот обработчик
        document.removeEventListener('mousemove', showCursor);
    }
    
    // Обработчик события, показывающий курсор при первом движении мыши
    document.addEventListener('mousemove', showCursor);
    
      document.addEventListener('mousemove', (e) => {
        // Обновляем позицию круга
        cursorCircle.style.left = `${e.pageX - 10}px`; // Сдвиг на половину ширины
        cursorCircle.style.top = `${e.pageY - 10}px`; // Сдвиг на половину высоты
    
        // Создаем падающий символ
        const fallingChar = document.createElement('div');
        fallingChar.classList.add('falling-char');
        fallingChar.innerText = getRandomMatrixChar();
        document.body.appendChild(fallingChar);
    
        // Устанавливаем начальную позицию символа с рандомным смещением
        const offsetX = Math.random() * 20 - 10; // Смещение от -10 до 10
        const offsetY = Math.random() * 20 - 10; // Смещение от -10 до 10
    
        fallingChar.style.left = `${e.pageX + offsetX}px`; // Позиция по X
        fallingChar.style.top = `${e.pageY + offsetY}px`; // Позиция по Y, сдвинут на случайное значение
    
        // Устанавливаем длительность анимации
        const duration = Math.random() * 1 + 0.8; // Случайная длительность от 0.5 до 1.5 секунды
        fallingChar.style.animationDuration = `${duration}s`;
    
        // Удаляем символ после окончания анимации
        fallingChar.addEventListener('animationend', () => {
          fallingChar.remove();
        });
      });
}



  