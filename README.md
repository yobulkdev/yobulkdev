<h1 align="center" style="border-bottom: none">
    <b>
        <a href="https://www.YoBulk.dev">YoBulk.dev</a><br>
    </b>
    ⭐️ Data exchange platform for all businesses that run on CSV files. <br>
        The Open Source Alternative To https://flatfile.com/ ⭐️ <br>
</h1>

<p align="center">
Fastest & Simplest way to import CSV data through a smart spreadsheet.<br>
Create YoBulk CSV Import button and make CSV importing <b>10x</b> faster.
</p>

<p align="center">
    <a href="http://www.yobulk.dev"><b>Website</b></a> •
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

## User Installation

- [Docker](https://doc.yobulk.dev/GetStarted/Installation#yobulk-installation)

## Docker
### Option:1 Through Docker Compose
The docker image comes with a combined <b>YoBulk backend image and MongoImage</b>.
We provide docker-compose.yml file under yobulkdev
```bash
git clone https://github.com/yobulkdev/yobulkdev.git
cd yobulkdev 
docker-compose up -d
```
- To make use of <b>YoBulk Open AI</b> feature,please make the below change.

> Please open `docker-compose.yml` file and update the `OPENAI_SECRET_KEY` variable with the key generated from [OpenAI API site](https://platform.openai.com/account/api-keys).
  

The YoBulk dashboard is ready to go at [http://localhost:5050/](http://localhost:5050/).

### Option:2 Through Docker Run

If you are a Docker user, you may try this way!   
- Prerequisites:<b>You should have installed mongo on your local machine and it's running.</b>
```bash
docker run --rm -it -p 5050:5050/tcp  yobulk/yobulk
```
- To make use of <b>YoBulk Open AI</b> feature,please make the below change.  

> Please pass the Open AI key generated from [OpenAI API site](https://platform.openai.com/account/api-keys)
in --env to explore YoBulk AI features.

Example:
```bash
docker run --rm -it -p 5050:5050/tcp  --env="OPENAI_SECRET_KEY=****" yobulk/yobulk
```
YoBulk dashboard is ready to go at [http://localhost:5050/](http://localhost:5050/).

## Building locally.
If you are a devevloper and want to build locally,you should have installed MongoDB and it should be running locally.  
- Prerequisites:<b>You should have installed mongo on your local machine and it's running.</b>

YoBulk is a fullstack next.js application which uses MongoDB as it's primary Database.
```bash
git clone https://github.com/yobulkdev/yobulkdev
cd yobulkdev
yarn install
yarn build 
yarn start
```
- To make use of <b>YoBulk Open AI</b> feature,please make the below change.

> Please update `OPENAI_SECRET_KEY` variable in .env file with the Open AI key generated from [OpenAI API site](https://platform.openai.com/account/api-keys)

The dashboard is ready to experiment at [http://localhost:5050/](http://localhost:5050/).

## Built With

- [Next.js](https://nextjs.org/)

## Getting a quick start

Please view the [documentation](https://doc.yobulk.dev/GetStarted/Quickstart) create import buttons and try data importing.

## Roadmap

- [YoBulk Roadmap ReadMe](https://doc.yobulk.dev/RoadMap/ProductVision)

# Features

### Supported Features

- ⚡ &nbsp;No code Template and Import button creation
- ⚡ &nbsp;Smart auto matching between the CSV column and Template column
- ⚡ &nbsp;Custom validation rule setting against a field
- ⚡ &nbsp;Delightful Data review experience
- ⚡ &nbsp;Scalable through streaming.You can import a CSV with size of 1GB
- ⚡ &nbsp;GPT3 Integration
- ⚡ &nbsp;Template creation through JSON
- ⚡ &nbsp;Regex creation and addition in custom validation



## Why are we building this?

More than 70% of the business data shared, is in the form of CSVs and Excel files.Less than 10% have truly adopted API integrations for data exchange.

As a developer and product manager, we have gone through the pain of building a scalable CSV importer and maintaining it in-house.Everyday thousand of developers go through the same pain and hundreds of companies have to get spreadsheet and CSV data into a database.
YoBulk is building an OSS standard for CSV and flatfile data onboarding where it can help you to build a data importing solution in-house.

Enterprises like Flatfile.com are addressing the problem but it has constraints like weak data security and high pricing. While developers want an embeddable/scalable CSV importer for SaaS, the truth is that it is not very possible to come up with a one-size fits all solution in such a fragmented market and sector.

All these restrictions necessitate our mission - to make it possible for anyone to create an data import solution that suit their needs well.

To Developers, we would like to offer a bring your own validation rule and bring your own database experience. You can design and modify validations rules on your own way using YoBulk.

To enterprises , YoBulk is dedicated to bring data security. Moreover, you have 100% control of your data armed with long-term maintainability.

To be honest, we do not claim to outperform flatfile.com in terms of functionality and design, at least for now. Besides, our priority is to add more functionality at the moment. we would like to cultivate a community to democratise the knowledge and bring all CSV and flatfile open source projects under a single framework.

Read more[Open vs Closed Data Onboarding](https://doc.yobulk.dev/#yobulk-positioning-open-source-vs-closed-source-data-onboarding-platforms)

# Our Mission

Our mission is to provide the most powerful flatfile(CSV,Spreadsheet)importer which is open source to every single internet business in the world.
An AI first data exchange for businesses to share flatfiles where you are in-charge of your customer’s data onboarding, validation & transformation.

## Support

If you have any questions or problems, please visit our GitHub discussions page, and we'll try to help you as soon as possible.

[https://github.com/yobulkdev/yobulkdev/discussions](https://github.com/yobulkdev/yobulkdev/discussions)

## License

YoBulk is an open-source software with the [AGPL 3.0 license](https://github.com/yobulkdev/yobulkdev/blob/main/LICENSE.md).
