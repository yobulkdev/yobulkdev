<div align="center">
  
  ![YoBulklogo](https://user-images.githubusercontent.com/118799976/205481338-370fb73e-d266-499a-bd49-a9c7d54e514a.png)

</div>

<h1 align="center">The fast & flexible way to Import CSV data into your SaaS</h1>

<div align="center">
YoBulk gives you the power to add a button and start validation and extraction of CSV data in your SaaS
</div>

<p align="center">
    <br />
    <a href="https://doc.yobulk.dev" rel="dofollow"><strong>Explore the docs »</strong></a>
    <br />

  <br/>
    <a href="https://doc.yobulk.dev/GetStarted/Demo">Examples</a>
    ·
    <a href="https://github.com/yobulkdev/yobulkdev/issues">Report Bug</a>
    ·
    <a href="https://join.slack.com/t/yobulkdev/shared_invite/zt-1kiutrmhx-6z_Mvq17dW0pPYePrwPocg">Community Slack</a>
</p>

## ⭐ YoBulk at a glance

Add the YoBulk react SDK and start importing CSV and validate against any predifined template.
![1](https://user-images.githubusercontent.com/18412631/202904050-ace18551-3305-4258-8e9d-46afbbdc9cb7.png)

YoBulk Goal
![1](https://user-images.githubusercontent.com/18412631/202903374-33995143-800b-4fa1-86ed-32803bf1eaf3.png)

Why YoBulk will be an engineer's choice:

-   Uses nodejs streaming,so importing is superfast.
-   Framework is ready for adding your custom validation functions
-   Easy to use and develop built on top of next.js
-   A real and powerfull framework which uses the real power of opensource CSV libraries.
-   Bulit on top of mongo.We have plans to add support for SQL databases.
-   Both standalone importer and template based importer for SaaS is available.
-   Making sure CSV importing edge cases, so you never again have to worry about importing customer data to your database.
-   We are adding a ML module for automatching and auto correction of CSV import error.


## Advantages

There are closed source solutions in the market,But YoBulk is the single and first open source framework which is developed by developers for developers.
We have a very strong and agggressive product roadmap.

✅ The most significant advantage of having YoBulk is keeping your data on your own servers.As a SaaS,you should not export your customer data to any 
other 3rd party cloud for processing and think much about webhooks and data exchange complexites.

🤓 As an open-source software, We will be building YoBulk with your input and suggestion.

💙 No vendor lock-in. We strongly believe that CSV and any other flatfile importing should be a open source project and YoBulk is creating an OSS standard for data onboarding.


## 🚀 Quickstart

Let's setup your CSV importer in 3 minutes!
#### Prerequisites for running a local next.js application

Option:1 Through Docker
If you are a Docker user, you may try this way!

```bash
docker run -d --name yobulk \
-v "$(pwd)"/yobulk:/usr/app/data/ \
-p 8080:8080 \
yobulk/yobulk:latest
```

Option:2 Through Docker Compose
Prerequisite- MongoDB should be installed and running.
We provide different docker-compose.yml files under this directory. Here are some examples.
```bash
git clone https://github.com/yobulkdev/yobulkdev
docker-compose up -d
```


Option:3 Through Next.js Application
Prerequisite- MongoDB should be installed and running.
```bash
git clone https://github.com/yobulkdev/yobulkdev
yarn install
yarn run dev
```

✌️ That's it; you have yobulk running. Let's check it out by browsing `http://localhost:3000`

For creating a template for setting the validation rules for your SaaS,please refer to this section [Embeddable SaaS](https://doc.yobulk.dev/GetStarted/Installation#embeddable-csv-importer-in-saas)
For Non-SaaS developers,You can try the standalone CSV importer also.

## Community Links

- [Twitter](https://twitter.com/yobulkdev)

## Support

If you have any questions or problems, please visit our GitHub discussions page, and we'll try to help you as soon as possible.

[https://github.com/yobulkdev/yobulkdev/discussions](https://github.com/yobulkdev/yobulkdev/discussions)
## License

YoBulk is an open-source software with the [AGPL 3.0 license](https://github.com/yobulkdev/yobulkdev/blob/main/LICENSE.md).



