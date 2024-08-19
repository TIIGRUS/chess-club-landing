document.addEventListener('DOMContentLoaded', function () {
    // const slider = document.querySelector('.slider-js');
    // const sliderList = slider.querySelector('.slider__list');
    // const sliderItems = slider.querySelectorAll('.slider__item');

    // let currentIndex = 0;

    // function switchSlide() {
    //     sliderItems[currentIndex].classList.remove('slider__item_active');
    //     // currentIndex = (currentIndex + 1) % sliderItems.length;
    //     if (currentIndex === sliderItems.length - 1) {
    //         currentIndex = 1;
    //         sliderList.style.transform = 'translateX(100)';
    //     } else {
    //         currentIndex++;
    //         sliderList.style.transform = `translateX(-${currentIndex * 100}%)`;
    //     }
    //     sliderItems[currentIndex].classList.add('slider__item_active');
    //     console.log(currentIndex)
    // }

    // setInterval(switchSlide, 2000);

    // Running Line
    // const resizeWidthRunningLine = new ResizeObserver((entries) => {
    //     for (const entry of entries) {
    //         // calculateAnimation(entry.contentRect.width)
    //     }
    // });

    // const runningLine = document.querySelector('.running-line');
    // const runningLineList = document.querySelector('.running-line__list');

    // function calculateAnimation() {
    //     // Ширина видимого контейнера, внутри которого будет прокручиваться список.
    //     const containerWidth = runningLine.offsetWidth;
    //     // Получаем полную ширину списка с контентом, который будет прокручиваться.
    //     const contentWidth = runningLineList.scrollWidth;
    //     // Рассчитываем время анимации: больше ширина контента – больше время
    //     const animationDuration = (contentWidth + containerWidth) / 100; // чем больше делитель, тем быстрее строка.

    //     // Применяем рассчитанное время к анимации
    //     runningLineList.style.animationDuration = `${animationDuration}s`;
    // }

    // resizeWidthRunningLine.observe(runningLine);
});