<h1 align="center" style="border-bottom: none">
    <b>
        <a href="https://www.YoBulk.dev">YoBulk</a><br>
    </b>
    ⭐️ Open Source Alternative To https://flatfile.com/ ⭐️ <br>
        
</h1>

<p align="center">
<br>
A <b>Data exchange platform</b> for all businesses that run on <b>CSV files</b>.
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

<p align="center"><img src="https://user-images.githubusercontent.com/118799976/220358070-e16a3ffb-3091-4a86-91c9-4a3035d7b10e.jpeg" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>
<p align="center"><img src="https://user-images.githubusercontent.com/118799976/220357610-aa27cbaf-ea8f-4849-a567-c2c7c63db8f5.jpeg" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>
<p align="center"><img src="https://user-images.githubusercontent.com/118799976/220358954-ce774959-141d-411d-8603-c999458bfee8.jpeg" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>
<p align="center"><img src="https://user-images.githubusercontent.com/118799976/220360438-5eec9e5c-241c-43e0-bc17-c962f94accf3.jpeg" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>
<p align="center"><img src="https://user-images.githubusercontent.com/118799976/220362469-f1cd0b51-2d01-479c-9e50-e9d0f947f205.jpeg" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>





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
The docker compose brings both <b>YoBulk Image and Mongodb Image</b>.
We provide docker-compose.yml file under yobulkdev code repository.
```bash
git clone https://github.com/yobulkdev/yobulkdev.git
cd yobulkdev 
docker-compose up -d
```
- To make use of <b>YoBulk Open AI</b> feature, please follow the guidelines as below.

> Please open the `docker-compose.yml` file and update the `OPENAI_SECRET_KEY` variable with the key generated from [OpenAI API site](https://platform.openai.com/account/api-keys).
  

The YoBulk dashboard is ready to go at [http://localhost:5050/](http://localhost:5050/).

### Option:2 Through Docker Run

If you are a Docker user, you may try this way!   
- Prerequisites:<b>You should have installed mongodb on your local machine and it's running.</b>
```bash
docker run --rm -it -p 5050:5050/tcp  yobulk/yobulk
```
- To make use of <b>YoBulk Open AI</b> feature, please follow the guidelines as below.  

> Please pass the Open AI key generated from [OpenAI API site](https://platform.openai.com/account/api-keys)
in --env to explore YoBulk AI features.

Example:
```bash
docker run --rm -it -p 5050:5050/tcp  --env="OPENAI_SECRET_KEY=****" yobulk/yobulk
```
YoBulk dashboard is ready to go at [http://localhost:5050/](http://localhost:5050/).

## Building locally.

If you are a developer and want to build the system locally, you should have Mongodb running locally.  

YoBulk is a fullstack next.js application which uses Mongodb as it's primary Database.

```bash
git clone https://github.com/yobulkdev/yobulkdev
cd yobulkdev
yarn install
yarn run dev
```
- To make use of <b>YoBulk Open AI</b> feature, please follow the guidelines as below.

> Please update `OPENAI_SECRET_KEY` variable in .env file with the Open AI key generated from [OpenAI API site](https://platform.openai.com/account/api-keys)

The dashboard is ready to view at [http://localhost:5050/](http://localhost:5050/).

## YoBulk Cloud
YoBulk Cloud is the fastest and most reliable way to run YoBulk. You can get started with free credits in minutes.

Sign up for [YoBulk Cloud](https://docs.google.com/forms/d/e/1FAIpQLSfpznd0nsnL5IGWIO1f4O4SBJugxAjI8bI12QqhDP_hqYvJ-A/viewform).

## Quick start

Please view the [documentation](https://doc.yobulk.dev/GetStarted/Quickstart) to explore CSV importing flow.

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
- ⚡ &nbsp;Collaboration & workspace creation.
- ⚡ &nbsp;AI based auto suggestion for correcting errors

Coming Soon:
- ⚡ &nbsp;Custom LLM models for Auto suggestion and Auto Cleaning of CSV errors
- ⚡ &nbsp;Data mapping decission knowledge graph for different sectors



## Demos

### NoCode Template Creation Demo
https://user-images.githubusercontent.com/118799976/220317753-8e540eb0-af1a-47fe-b384-72081674d14e.mp4

### All DataType Validation Demo
https://user-images.githubusercontent.com/118799976/220321287-8cc38555-51ef-412b-885a-b84cba3e5571.mp4

### String Validation Demo
https://user-images.githubusercontent.com/118799976/220321602-6beebf43-b97e-486b-9aa6-aae9b3f68eca.mp4

### GPT Demo
https://user-images.githubusercontent.com/118799976/220322196-38bc6db3-0b4c-4343-9648-3958ab720c8b.mp4


## Why are we building this?

More than 70% of the business data is shared in the form of CSVs and Excel files. Less than 10% have truly adopted API integrations for data exchange.

As a developer and product manager, we have gone through the pain of building a scalable CSV importer. Everyday thousands of developers go through the same pain and hundreds of companies have to get enormous amount of spreadsheet and CSV data into a database.

YoBulk is building an OSS standard for CSV and flatfile data onboarding where it can help you to build a data importing solution in-house.

Enterprises like Flatfile.com are addressing this problem but it has constraints like weak data security and high pricing. While developers want an embeddable/scalable CSV importer for SaaS, the truth is that, it is not possible to come up with an "one-size fits all solution" within such fragmented market.

All these <b>restrictions necessitate</b> our mission, to make it possible for anyone to create an data import solution that suits their needs well.

To Developers, we would like to offer a "bring your own validations"(BYOV)  and "bring your own database"(BYOD) experience. You can design and modify validations rules on your own way using YoBulk.

To enterprises , YoBulk is dedicated to bring data security. Moreover, you have 100% control of your data armed with long-term maintainability.

To be honest, we do not claim to outperform flatfile.com in terms of functionality and design, at least for now. Besides, our priority is to add more functionality at the moment. We would like to cultivate a community to democratise the knowledge and bring all CSV and flatfile open source projects under a single framework.

Read more [Open vs Closed Data Onboarding](https://doc.yobulk.dev/#yobulk-positioning-open-source-vs-closed-source-data-onboarding-platforms)

# Our Mission

Our mission is to provide the most powerful flatfile(CSV,Spreadsheet) importer which is open source to every single internet business in the world.
An AI first data exchange for businesses to share flatfiles where you are in-charge of your customer’s data onboarding, validation & transformation.
We stongly support Anderz's vision.
<p align="center"><img src="https://user-images.githubusercontent.com/118799976/222167945-01d5f60b-b5d6-4a7e-aac5-b3265721745d.png" alt="The Open Source Alternative To Flatfile.com." width="1000px" /></p>

# Our Vision

YoBulk's vision is to create an AI first knowledge graph for carrying out over billions of data mapping decisions while exchanging data between businesses across various sectors through flat files such as CSV and Excel.



## Support

If you have any questions or problems, please visit our GitHub discussions page, and we'll try to help you as soon as possible.

[https://github.com/yobulkdev/yobulkdev/discussions](https://github.com/yobulkdev/yobulkdev/discussions)

## License

YoBulk is an open-source software with the [AGPL 3.0 license](https://github.com/yobulkdev/yobulkdev/blob/main/LICENSE.md).
