<h1 align="center" style="border-bottom: none">
    <b>
        <a href="https://www.YoBulk.dev">YoBulk.dev</a><br>
    </b>
    ⭐️ 適用於所有在 CSV 文件上運行的企業的數據交換平台<br>
        開源替代品 https://flatfile.com/ ⭐️ <br>
</h1>

<p align="center">
通過智能電子表格將 CSV 數據導入您的應用程序的最快速、最簡單的方法<br>
創建 YoBulk CSV 導入按鈕並進行 CSV 導入<b>10倍</b>快點
</p>

<p align="center">
    <a href="http://www.yobulk.dev"><b>網站</b></a> •
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

## 用戶安裝

- [Docker](https://doc.yobulk.dev/GetStarted/Installation#yobulk-installation)

## Next.js Application

我們提供了一個簡單的 Next JS 應用程序供您入門。

```bash
git clone https://github.com/yobulkdev/yobulkdev
cd yobulkdev
yarn install
yarn build
yarn start
```

儀表板已準備好在 http://localhost:3000/ 進行實驗

## Docker

```bash
docker run -d --name yobulk \
-p 8000:3000 \
yobulk/yobulk:latest
```

YoBulk 儀表板已準備就緒，可以訪問 http://localhost:8000/。

## 建有

- [Next.js](https://nextjs.org/)

## 快速入門

請查看 [文檔](https://doc.yobulk.dev/GetStarted/Quickstart) 創建導入按鈕並嘗試導入數據。

## 路線圖

- [YoBulk Roadmap ReadMe](https://doc.yobulk.dev/RoadMap/ProductVision)

# 特徵

### 模板

- ⚡ &nbsp;導入器儀表板，用於檢查本地數據庫的導入狀態
- ⚡ &nbsp;沒有代碼模板和導入按鈕創建
- ⚡ &nbsp;CSV 列和模板列之間的智能自動匹配
- ⚡ &nbsp;針對字段的自定義驗證規則設置
- ⚡ &nbsp;愉快的數據審核體驗
- ⚡ &nbsp;通過流可擴展。您可以導入大小為 1GB 的 CSV
- ⚡ &nbsp;和更多 ...

### 導入工作流自動化

- ⚡ &nbsp;將工作區和組織附加到導入按鈕：從特定組織接收 CSV
- ⚡ &nbsp;Webhook：即將推出..

## 我們為什麼要建造這個？

超過 70% 的共享業務數據以 CSV 和 Excel 文件的形式存在。真正採用 API 集成進行數據交換的不到 10%。

作為開發人員和產品經理，我們經歷了構建可擴展的 CSV 導入器並在內部維護它的痛苦。每天都有成千上萬的開發人員經歷同樣的痛苦，數百家公司必須將電子表格和 CSV 數據導入數據庫。
YoBulk 正在為 CSV 和平面文件數據加載構建 OSS 標準，它可以幫助您在內部構建數據導入解決方案。

像 Flatfile.com 這樣的企業正在解決這個問題，但它有數據安全性差和定價高等限制。雖然開發人員希望 SaaS 有一個可嵌入/可擴展的 CSV 導入器，但事實是，在如此分散的市場和行業中，不太可能提出一個通用的解決方案。

所有這些限制都使我們的使命成為必要 - 讓任何人都可以創建一個非常適合他們需求的數據導入解決方案。

對於開發人員，我們希望提供自帶驗證規則並帶來您自己的數據庫體驗。您可以使用 YoBulk 以自己的方式設計和修改驗證規則。

對企業來說，YoBulk 致力於帶來數據安全。此外，您可以 100% 控制具有長期可維護性的數據。

老實說，我們並不聲稱在功能和設計方面優於 flatfile.com，至少目前如此。此外，我們目前的首要任務是添加更多功能。我們希望培養一個社區，使知識民主化，並將所有 CSV 和平面文件開源項目置於單一框架下。

閱讀更多 [開放與封閉數據入職](https://doc.yobulk.dev/#yobulk-positioning-open-source-vs-closed-source-data-onboarding-platforms)

# 我們的任務

我們的使命是提供最強大的平面文件（CSV、電子表格）導入器，它對世界上每一個互聯網企業都是開源的。
AI 優先數據交換，供企業共享平面文件，您負責客戶的數據導入、驗證和轉換。

## 支持

如果您有任何疑問或問題，請訪問我們的 GitHub 討論頁面，我們會盡快為您提供幫助。

[https://github.com/yobulkdev/yobulkdev/discussions](https://github.com/yobulkdev/yobulkdev/discussions)

## 執照

YoBulk 是一款開源軟件，具有 [AGPL 3.0 license](https://github.com/yobulkdev/yobulkdev/blob/main/LICENSE.md).
