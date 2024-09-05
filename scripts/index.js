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

            this.init();
        }

        get slidesLength() {
            return this.slides.length;
        }

        set currentSlideIndex(value) {
            if (value > 0 && value <= this.slidesLength) {
                this.#currentSlideIndex = value
            } else if (value > this.slidesLength) {
                if (this.isLoop) {
                    this.#currentSlideIndex = 1;
                } else {
                    this.#currentSlideIndex = this.slidesLength;
                }
            }
            else {
                if (this.isLoop) {
                    this.#currentSlideIndex = this.slidesLength;
                } else {
                    this.#currentSlideIndex = 1;
                }
            }
        }

        get currentSlideIndex() {
            return this.#currentSlideIndex;
        }

        showSlide(index) {
            if (index < 0) {
                index = this.slidesLength;
            } else if (index > this.slidesLength) {
                index = 1;
            }

            this.slides.forEach((slide, i) => {
                if (i === index - 1) {
                    slide.classList.add(this.sliderActiveItemClassName);
                } else {
                    slide.classList.remove(this.sliderActiveItemClassName);
                }
            });
        }

        showNextSlide() {
            this.currentSlideIndex++;
            this.showSlide(this.currentSlideIndex);
            this.#updateUISlider();
        }

        showPrevSlide() {
            this.currentSlideIndex--;
            this.showSlide(this.currentSlideIndex);
            this.#updateUISlider();
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
            this.#currentSlideIndex = value;
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

            counter.innerHTML = `<span class="${this.counterCurrentClassName}">${this.currentSlideIndex}</span>/<span class="${this.counterTotalClassName}">${this.slidesLength}</span>`

            this.sliderControls.append(counter);
        }

        #setCounterCurrent() {
            this.sliderCounter.querySelector(`.${this.counterCurrentClassName}`).textContent = this.currentSlideIndex;
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
            const icon = `<svg class="slider__button-icon" width="16" height="16">
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
            this.#setInitiVisibleSLides(this.initVisibleSlides);
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

        init() {
            this.#renderSlider();

            if (this.autoplay) {
                const timerId = setInterval(() => {
                    this.showNextSlide();
                    if (this.currentSlideIndex === this.slidesLength && !this.isLoop) {
                        clearInterval(timerId);
                    }
                }, this.delay);
            }
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
