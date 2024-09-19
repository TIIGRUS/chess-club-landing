# ![Логотип клуба](./images/icons/logo.svg) Клуб четырех коней

Страница лендинга, которая описывает вымышленный клуб четырех коней.
На этой странице можно узнать, как поддержать этот турнир, где его можно посетить и к чему приведет развитие шахматного спорта.

> _Все персонажи, события и цитаты являются вымышленными и не принадлежат создателям сайта. С подробностями можно познакомиться в главе XXXIV романа Ильи Ильфа и Евгения Петрова «Двенадцать стульев»._

## Информация о проекте

- **[ПОСМОТРЕТЬ](https://tiigrus.github.io/chess-club-landing/)**
- В корне репозитория находятся изображения дизайна.
  - 375 — для мобильных устройств.
  - 1366 desktop — для декстопов.
  - 1920 — макет шапки для десктопов с высоким разрешением
- **[Ссылка на Макет](https://www.figma.com/design/0xXfupPNU3aZxPqFbmhCKb/%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD-%D0%B4%D0%BB%D1%8F-%D0%B2%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B8-%7C-%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D0%B9-%D0%BB%D0%B5%D0%BD%D0%B4%D0%B8%D0%BD%D0%B3?node-id=0-1&t=4GPCs26LP65wYiXP-1)**

## Техническое задание

- Сверстайте адаптивный лендинг по макету в Figma, используя стек html + css + чистый js (без библиотек и фреймворков).
- Придерживайтесь принципа Pixel Perfect.
- Страница должна быть адаптивной, хорошо выглядеть при любом размере экрана (нет горизонтального скролла, нет уезжающих за экран текстовых элементов, текст не наезжает на другой текст или изображение)
- Избегайте дублирования текстового контента в мобильной и десктопной версиях.
- Добавьте корректно работающую бегущую строку.
- Кнопки на стартовом экране являются якорями и ведут к соответствующим блокам.
- Карусель с карточками участников должна быть зацикленной и меняться автоматически через каждые 4 секунды.
- Карусель с этапами не должна быть зацикленной и не должна автоматически менять слайды.
  - Добавьте анимацию по своему усмотрению.

## Технологии

В проекте используются следующие технологии:

- **HTML5** — структура страницы.
- **CSS3, CSS4** — стилизация элементов и верстка.
- **Vanilla JavaScript (ES6)** — функционал без использования фреймворков.
- **Flexbox/Grid** — для построения адаптивной верстки.
- **Responsive Design** — адаптивность интерфейса для различных устройств.

## Подходы

- **Чистый JavaScript** — проект реализован без сторонних библиотек.
- **Модульная структура CSS** — использован подход BEM.
- **Адаптивная верстка** — страница оптимизирована для разных устройств.
  - **Mobile First** — разработка интерфейса сначала для мобильных устройств.
- **Best Practices** — использование современных стандартов разработки.
- **Web-safe fonts** — использование безопасных шрифтов.
- **Pixel Perfect** — соблюдение дизайна.
- **SEO** — оптимизация страницы для поисковых систем.
- **Accessibility** — доступность страницы для пользователей с ограниченными возможностями.
- **Performance** — оптимизация скорости загрузки страницы.
  - **Optimization** — оптимизация изображений.
  - **SVG Sprites** — использование SVG-спрайта для иконок.
  - **Тесты Lighthouse** — проверка производительности страницы.
    - Desktop
      - ![Desktop](image.png)
    - Mobile
      - ![Mobile](image-1.png)

## Установка

1. Склонируйте репозиторий:

   ```bash
   git clone https://github.com/ваш-проект.git
   ```

2. Перейдите в папку проекта:

   ```bash
   cd ваш-проект
   ```

3. Откройте `index.html` в браузере.
   - Некоторые иконки `svg` не загрузятся без локального сервера, например иконки у кнопок слайдера.

## Структура проекта

```
|── index.html       # главная HTML страница
|
├── images/          # папка с изображениями
|
├── styles/
│   └── blocks/             # директория с файлами стилей для отдельных блоков
│   └── animation.css       # файл стилей анимации
│   └── global.css          # файл глобальных стилей
|   └── index.css           # точка входа для всех основных стилей
|   └── variables.css       # файл переменных стилей
|
├── vendor/                 # сторонние библиотеки и файлы
│   └── fonts               # папка с файлами шрифтов и стилями
│       └── fonts.css
|   └── normalize.css       # файл стилей для нормализации стилей
|
├── scripts/
│   └── index.js            # JavaScript для функционала страницы
│
└── README.md               # файл README с описанием проекта
```

## Функциональность

- Бегущая строка без JavaScript и дублирование элементов.
- Слайдер изображений с разным типом навигации, который подстраивается под количество видимых элементов.
- Бесконечная анимация круга.

## Заметки

- Есть что еще улучшать, например производительность на мобильных устройствах.
  - Сейчас показатель 74 балла.
