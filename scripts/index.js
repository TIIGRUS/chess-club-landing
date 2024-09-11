document.addEventListener('DOMContentLoaded', function () {
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

    // Slider
    class Slider {
        #currentSlideIndex = 1;

        constructor({
            selector,
            initVisibleSlides = 1,
            isLoop = false,
            dots = false,
            autoplay = false,
            delay = 4000,
        }) {
            // Props
            this.selector = selector;
            this.initVisibleSlides = initVisibleSlides;
            this.isLoop = isLoop;
            this.dots = dots;
            this.autoplay = autoplay;
            this.delay = delay;

            // ClassNames
            this.sliderClassName = 'slider';
            this.sliderListClassName = `${this.sliderClassName}__list`;
            this.sliderItemClassName = `${this.sliderClassName}__item`;
            this.sliderActiveItemClassName = `${this.sliderItemClassName}_active`
            this.sliderButtonClassName = `${this.sliderClassName}__button`;
            this.sliderButtonClassNameDisabled = `${this.sliderClassName}__button_disabled`;
            this.sliderControlsClassName = `${this.sliderClassName}__controls`;
            this.sliderButtonClassNameActive = `${this.sliderClassName}__button_active`;
            this.sliderDotsListClassName = `${this.sliderClassName}__dots`;
            this.sliderDotItemClassName = `${this.sliderClassName}__button_type_dot`;
            this.sliderButtonClassNamePrev = `${this.sliderClassName}__button_prev`;
            this.sliderButtonClassNameNext = `${this.sliderClassName}__button_next`;
            this.counterClassName = `${this.sliderClassName}__counter`;
            this.counterCurrentClassName = `${this.sliderClassName}__counter-current`;
            this.counterTotalClassName = `${this.sliderClassName}__counter-total`;
            this.sliderButtonIconClassName = `${this.sliderClassName}__button-icon`;

            // DOM Elements
            this.slider = document.querySelector(this.selector);
            this.slidesList = this.slider.querySelector(`.${this.sliderListClassName}`);
            this.sliderButtonPrev = this.slider.querySelector(`.${this.sliderButtonClassNamePrev}`);
            this.sliderButtonNext = this.slider.querySelector(`.${this.sliderButtonClassNameNext}`);
            this.sliderControls = this.slider.querySelector(`.${this.sliderControlsClassName}`);
            this.sliderDotsList = this.slider.querySelector(`.${this.sliderDotsListClassName}`);
            this.sliderCounter = this.slider.querySelector(`.${this.sliderCounterClassName}`);

            if (!this.slidesList) {
                this.slidesList = this.slider.querySelector(`ul`);
                if (this.slidesList) {
                    this.slidesList.classList.add(this.sliderListClassName);
                }
            }

            this.slides = Array.from(this.slidesList.children);
            this.slidesListStyles = getComputedStyle(this.slidesList);

            this.init();
        }

        get slidesLength() {
            return this.slides.length;
        }

        set currentSlideIndex(value) {
            if (value < 1) {
                this.#currentSlideIndex = this.slidesLength;
            } else if (value > this.slidesLength) {
                this.#currentSlideIndex = 1;
            } else {
                this.#currentSlideIndex = value;
            }
        }

        get currentSlideIndex() {
            return this.#currentSlideIndex;
        }

        showSlide(index) {
            const visibleSlides = this.initVisibleSlides; // Текущее количество видимых слайдов
            const totalSlides = this.slidesLength; // Общее количество слайдов

            // Устанавливаем индекс слайда
            this.currentSlideIndex = index;

            // Рассчитываем ширину одного слайда с учетом gap
            let slideWidth = this.slides[0].offsetWidth;
            let gap = parseInt(this.slidesListStyles.gap) || 0;
            // let gap = Number(this.slidesListStyles.gap.match(/\d+/)[0]);
            const totalWidthPerSlide = slideWidth + gap;

            // Рассчитываем стартовый и конечный индексы для группы
            let startIndex = this.currentSlideIndex - 1;
            let endIndex = startIndex + visibleSlides - 1;

            // Если осталось меньше слайдов, чем необходимо для полной группы
            if (endIndex >= totalSlides) {
                console.log('If endIndex >= totalSlides');

                if (totalSlides % visibleSlides !== 0) {
                    // Если остался один или несколько слайдов, которые не помещаются в группу, показываем их
                    startIndex = totalSlides - visibleSlides;
                    endIndex = totalSlides - 1;
                } else {
                    // Если осталась полная группа
                    endIndex = totalSlides - 1;
                    startIndex = Math.max(totalSlides - visibleSlides, 0); // Сдвигаем начало
                }
            }

            // Показываем только слайды от startIndex до endIndex
            this.slides.forEach((slide, i) => {
                if (i >= startIndex && i <= endIndex) {
                    slide.classList.add(this.sliderActiveItemClassName);
                } else {
                    slide.classList.remove(this.sliderActiveItemClassName);
                }
            });

            // Смещаем позицию группы слайдов
            const offset = totalWidthPerSlide * startIndex;
            this.slidesList.style.transform = `translateX(-${offset}px)`;

            // Обновляем UI после показа слайда
            this.#updateUISlider();
        }

        showNextSlide() {
            // const maxIndex = this.slidesLength - this.initVisibleSlides + 1;
            this.currentSlideIndex = this.currentSlideIndex + this.initVisibleSlides;

            // if (this.currentSlideIndex > maxIndex) {
            //     this.currentSlideIndex = this.isLoop ? 1 : maxIndex;
            // }

            this.showSlide(this.currentSlideIndex);
        }

        showPrevSlide() {
            this.currentSlideIndex = this.currentSlideIndex - this.initVisibleSlides;

            // if (this.currentSlideIndex < 1) {
            //     this.currentSlideIndex = this.isLoop ? this.slidesLength - this.initVisibleSlides + 1 : 1;
            // }

            this.showSlide(this.currentSlideIndex);
        }


        #updateUISlider() {
            this.#setDisabledButtons();

            if (this.dots) {
                this.#renderDots();
            } else {
                this.#setCounterCurrent();
            }
        }

        #setInitiVisibleSLides(value) {
            this.slides.forEach((element, index) => {
                if (index < value) {
                    element.classList.add(this.sliderActiveItemClassName);
                }
            })
        }

        #setDisabledButtons() {
            if (!this.isLoop) {
                if (this.currentSlideIndex === 1) {
                    this.sliderButtonPrev.classList.add(this.sliderButtonClassNameDisabled);
                    this.sliderButtonPrev.disabled = true;
                } else {
                    this.sliderButtonPrev.classList.remove(this.sliderButtonClassNameDisabled);
                    this.sliderButtonPrev.disabled = false;
                }

                if (this.currentSlideIndex === this.slidesLength) {
                    this.sliderButtonNext.classList.add(this.sliderButtonClassNameDisabled);
                    this.sliderButtonNext.disabled = true;
                } else {
                    this.sliderButtonNext.classList.remove(this.sliderButtonClassNameDisabled);
                    this.sliderButtonNext.disabled = false;
                }
            }
        }

        #renderCounter() {
            const counter = document.createElement('div');
            counter.classList.add(this.counterClassName);
            this.sliderCounter = counter;

            counter.innerHTML = `<span class="${this.counterCurrentClassName}">${this.initVisibleSlides}</span>/<span class="${this.counterTotalClassName}">${this.slidesLength}</span>`

            this.sliderControls.append(counter);
        }

        #setCounterCurrent() {
            const totalSlides = this.slidesLength;
            // const startIndex = this.currentSlideIndex;
            let startIndex = this.currentSlideIndex;
            startIndex += this.initVisibleSlides - 1;

            const start = Math.min(startIndex, totalSlides);

            // Обновляем счетчик, чтобы показывать текущее количество видимых слайдов и общее количество слайдов
            this.sliderCounter.querySelector(`.${this.counterCurrentClassName}`).textContent = start;
        }

        #renderDots() {
            const dots = this.slides.map((_, index) => {
                const dot = document.createElement('button');
                const dotWrapper = document.createElement('li');

                dot.classList.add(this.sliderButtonClassName, this.sliderDotItemClassName, `${this.currentSlideIndex === index + 1 ? this.sliderButtonClassNameActive : this.sliderButtonClassName}`);
                dot.setAttribute('type', 'button');
                dot.setAttribute('data-slide-index', index + 1);

                dotWrapper.append(dot);
                return dotWrapper;
            });

            this.sliderDotsList.replaceChildren(...dots);
        }

        #renderDotsList() {
            const dotsList = document.createElement('ul');
            dotsList.classList.add(this.sliderDotsListClassName);
            this.sliderControls.append(dotsList);
            this.sliderDotsList = dotsList;
            this.#renderDots();

            dotsList.addEventListener('click', (e) => {
                const target = e.target;
                if (target.classList.contains(this.sliderButtonClassName)) {
                    this.currentSlideIndex = Number(target.dataset.slideIndex);
                    this.showSlide(this.currentSlideIndex);
                    this.#renderDots();
                    this.#setDisabledButtons();
                }
            })
        }

        #renderButton() {
            const btn = document.createElement('button');
            const icon = `<svg class="${this.sliderButtonIconClassName}" width="16" height="16">
                <use href="./images/icons/sprite.svg#arrow"></use>
              </svg>`
            btn.classList.add(this.sliderButtonClassName);
            btn.setAttribute('type', 'button');
            btn.innerHTML = icon;

            return btn;
        }

        #renderButtonsControls() {
            const btnClasses = [this.sliderButtonClassNameNext, this.sliderButtonClassNamePrev];
            const btns = btnClasses.map(className => {
                const btn = this.#renderButton();
                btn.classList.add(className);
                return btn;
            });

            this.sliderControls.append(...btns);

            this.sliderButtonNext = this.slider.querySelector(`.${this.sliderButtonClassNameNext}`);
            this.sliderButtonPrev = this.slider.querySelector(`.${this.sliderButtonClassNamePrev}`);

            this.sliderButtonNext.addEventListener('click', () => {
                this.showNextSlide();
            });

            this.sliderButtonPrev.addEventListener('click', () => {
                this.showPrevSlide();
            });
        }

        #renderSlider() {
            this.#renderButtonsControls();

            if (this.dots) {
                this.#renderDotsList();
            } else {
                this.#renderCounter();
            }

            this.#setDisabledButtons();

            this.slides.forEach(element => {
                element.classList.add(this.sliderItemClassName);
            });
        }

        updateVisibleSlides() {
            const containerWidth = this.slidesList.offsetWidth;
            const slideWidth = this.slides[0].offsetWidth;

            this.initVisibleSlides = Math.floor(containerWidth / slideWidth);
            console.log('Initial visible slides:', this.initVisibleSlides);
        }

        init() {
            // Динамически вычисляем количество видимых слайдов
            this.updateVisibleSlides();
            this.#setInitiVisibleSLides(this.initVisibleSlides);
            this.#renderSlider();

            if (this.autoplay) {
                const timerId = setInterval(() => {
                    this.showNextSlide();
                    if (this.currentSlideIndex === this.slidesLength && !this.isLoop) {
                        clearInterval(timerId);
                    }
                }, this.delay);
            }

            // Добавляем событие для пересчета видимых слайдов при изменении размера окна
            window.addEventListener('resize', () => {
                this.updateVisibleSlides();
            });
        }
    }


    new Slider({
        selector: '#slider-stages',
        dots: true,
    });

    new Slider({
        selector: '#slider-members',
        autoplay: true,
        isLoop: true
    });
});
