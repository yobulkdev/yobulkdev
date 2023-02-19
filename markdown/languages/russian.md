<h1 align="center" style="border-bottom: none">
    <b>
        <a href="https://www.YoBulk.dev">YoBulk.dev</a><br>
    </b>
    ⭐️ Платформа обмена данными для всех предприятий, использующих CSV-файлы. <br>
        Альтернатива с открытым исходным кодом https://flatfile.com/ ⭐️ <br>
</h1>

<p align="center">
Самый быстрый и простой способ импортировать данные CSV в ваше приложение с помощью интеллектуальной электронной таблицы<br>
Создайте кнопку YoBulk CSV Import и выполните импорт CSV <b>10x</b> Быстрее
</p>

<p align="center">
    <a href="http://www.yobulk.dev"><b>Веб-сайт</b></a> •
    <a href="https://twitter.com/yobulkdev"><b>Twitter</b></a>  •
    <a href="https://join.slack.com/t/yobulkdev/shared_invite/zt-1kiutrmhx-6z_Mvq17dW0pPYePrwPocg" target="_blank"><b>Slack</b></a>
</p>

<h4 align="center">
  <a href="https://github.com/uptrainai/uptrain/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-AGPL-blue" alt="YoBulk is released under the AGPL license." />
  </a>
  <a href="https://doc.yobulk.dev/">
    <img src="https://img.shields.io/badge/Read-Docs-blue" alt="Docs" />
  </a>
  <a href="https://join.slack.com/t/yobulkdev/shared_invite/zt-1kiutrmhx-6z_Mvq17dW0pPYePrwPocg">
    <img src="https://img.shields.io/badge/community%20-slack-yellow" alt="Community" />
  </a>
  <a href="https://yobulk.dev/">
    <img src="https://img.shields.io/badge/website-yobulk-brightgreen" alt="Website" />
  </a>
</h4>

<p align="center"><img src="https://user-images.githubusercontent.com/118799976/214280161-3bf6dea8-955b-43fe-bbd5-f6ace09a6e1b.png" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>
<p align="center"><img src="https://user-images.githubusercontent.com/118799976/214279676-d2904d57-5305-4491-9695-cbdcaab1bdf6.png" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>
<p align="center"><img src="https://user-images.githubusercontent.com/118799976/214277179-4be09db9-b61b-494f-a003-9b9736ac3e36.png" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>
<p align="center"><img src="https://user-images.githubusercontent.com/118799976/214282360-3ec13ab4-852b-4649-bc5c-b5a09d52b0d3.png"" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>

<div align="center">

[<img height="38" src="https://user-images.githubusercontent.com/61551451/135263434-75fe793d-42af-49e4-b964-d70920e41655.png">](markdown/languages/chinese.md)
[<img height="38" src="https://user-images.githubusercontent.com/61551451/135263770-38e3e79d-11d4-472e-ac27-ae0f17cf65c4.png">](markdown/languages/japanese.md)
[<img height="38" src="https://user-images.githubusercontent.com/61551451/135263531-fae58600-6616-4b43-95a0-5891019dd35d.png">](markdown/languages/german.md)
[<img height="38" src="https://user-images.githubusercontent.com/61551451/135263888-151d4ad1-7084-4943-97c9-56f28cd40b80.png">](markdown/languages/russian.md)

<p align="center"><a href="markdown/languages"><b>See other languages »</b></a></p>

</div>

## Установка пользователя

- [Docker](https://doc.yobulk.dev/GetStarted/Installation#yobulk-installation)

## Приложение Next.js

Мы предоставляем простое приложение Next JS для начала работы.

```bash
git clone https://github.com/yobulkdev/yobulkdev
cd yobulkdev
yarn install
yarn build
yarn start
```

Панель управления готова для экспериментов по адресу http://localhost:3000/.

## Docker

```bash
docker run -d --name yobulk \
-p 8000:3000 \
yobulk/yobulk:latest
```

YoBulk dashboard is ready to go at http://localhost:8000/.

## Построен с

- [Next.js](https://nextjs.org/)

## Быстрый старт

Пожалуйста, просмотрите [документация](https://doc.yobulk.dev/GetStarted/Quickstart) создайте кнопки импорта и попробуйте импортировать данные.

## дорожная карта

- [YoBulk Roadmap ReadMe](https://doc.yobulk.dev/RoadMap/ProductVision)

# Функции

### Шаблон

- ⚡ &nbsp;Панель инструментов импортера для проверки статуса импорта в локальную базу данных.
- ⚡ &nbsp;Без создания шаблона кода и кнопки импорта
- ⚡ &nbsp;Интеллектуальное автоматическое сопоставление между столбцом CSV и столбцом шаблона
- ⚡ &nbsp;Пользовательская настройка правила проверки для поля
- ⚡ &nbsp;Восхитительный опыт просмотра данных
- ⚡ &nbsp;Масштабирование посредством потоковой передачи. Вы можете импортировать файл CSV размером 1 ГБ.
- ⚡ &nbsp;и более ...

### Импорт автоматизации рабочего процесса

- ⚡ &nbsp;Прикрепите рабочую область и организацию к кнопке импорта: получите CSV-файл от определенной организации.
- ⚡ &nbsp;Вебхук: Скоро..

## Зачем мы это строим?

Более 70% общих бизнес-данных находятся в форме файлов CSV и Excel. Менее 10% действительно внедрили интеграцию API для обмена данными.

Как разработчик и менеджер по продукту, мы прошли через трудности создания масштабируемого импортера CSV и поддержки его собственными силами. Ежедневно тысячи разработчиков проходят через одну и ту же боль, и сотни компаний должны помещать данные из электронных таблиц и CSV в базу данных.
YoBulk разрабатывает стандарт OSS для загрузки данных в формате CSV и плоских файлов, где он может помочь вам создать собственное решение для импорта данных.

Такие предприятия, как Flatfile.com, решают эту проблему, но у нее есть ограничения, такие как слабая безопасность данных и высокие цены. Хотя разработчикам нужен встраиваемый/масштабируемый импортер CSV для SaaS, правда в том, что невозможно придумать универсальное решение на таком фрагментированном рынке и в таком секторе.

Все эти ограничения обуславливают нашу миссию — сделать возможным для каждого создать решение для импорта данных, которое хорошо соответствует его потребностям.

Мы хотели бы предложить разработчикам собственное правило проверки и собственный опыт работы с базой данных. Вы можете создавать и изменять правила проверки по своему усмотрению, используя YoBulk.

Для предприятий YoBulk предназначен для обеспечения безопасности данных. Кроме того, у вас есть 100% контроль над вашими данными, а также возможность их долгосрочного обслуживания.

Честно говоря, мы не претендуем на то, чтобы превзойти flatfile.com с точки зрения функциональности и дизайна, по крайней мере, на данный момент. Кроме того, на данный момент нашим приоритетом является добавление большего функционала. мы хотели бы развивать сообщество, чтобы демократизировать знания и объединить все проекты с открытым исходным кодом CSV и плоских файлов в единую структуру.

Читать далее [Открытая и закрытая регистрация данных](https://doc.yobulk.dev/#yobulk-positioning-open-source-vs-closed-source-data-onboarding-platforms)

# Наша миссия

Наша миссия состоит в том, чтобы предоставить самый мощный импортер плоских файлов (CSV, электронных таблиц) с открытым исходным кодом для каждого интернет-бизнеса в мире.
Первый обмен данными с ИИ для предприятий, позволяющий обмениваться плоскими файлами, где вы отвечаете за ввод, проверку и преобразование данных вашего клиента.

## Поддерживать

Если у вас есть какие-либо вопросы или проблемы, посетите нашу страницу обсуждений на GitHub, и мы постараемся помочь вам как можно скорее.

[https://github.com/yobulkdev/yobulkdev/discussions](https://github.com/yobulkdev/yobulkdev/discussions)

## Лицензия

YoBulk — это программное обеспечение с открытым исходным кодом. [AGPL 3.0 license](https://github.com/yobulkdev/yobulkdev/blob/main/LICENSE.md).
