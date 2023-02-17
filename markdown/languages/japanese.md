<h1 align="center" style="border-bottom: none">
    <b>
        <a href="https://www.YoBulk.dev">YoBulk.dev</a><br>
    </b>
⭐️ CSV ファイルで実行されるすべてのビジネス向けのデータ交換プラットフォーム <br>
        オープンソースの代替手段  https://flatfile.com/ ⭐️ <br>
</h1>

<p align="center">
スマート スプレッドシートを使用してアプリケーションに CSV データをインポートする最も速くて簡単な方法<br>
YoBulk CSV インポート ボタンを作成し、CSV インポートを行う <b>10倍</b> もっと早く
</p>

<p align="center">
    <a href="http://www.yobulk.dev"><b>Webサイト</b></a> •
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

## ユーザーインストール

- [Docker](https://doc.yobulk.dev/GetStarted/Installation#yobulk-installation)

## Next.js アプリケーション

開始するためのシンプルな Next JS アプリケーションを提供します。

```bash
git clone https://github.com/yobulkdev/yobulkdev
cd yobulkdev
yarn install
yarn build
yarn start
```

ダッシュボードは、http://localhost:3000/ で実験する準備ができています。

## Docker

```bash
docker run -d --name yobulk \
-p 8000:3000 \
yobulk/yobulk:latest
```

YoBulk ダッシュボードは http://localhost:8000/ で準備完了です.

## で構築

- [Next.js](https://nextjs.org/)

## クイックスタート

をご覧ください [ドキュメンテーション](https://doc.yobulk.dev/GetStarted/Quickstart) インポート ボタンを作成し、データのインポートを試みます。

## ロードマップ

- [YoBulk ロードマップ ReadMe](https://doc.yobulk.dev/RoadMap/ProductVision)

# 特徴

### レンプレート

- ⚡ &nbsp; ローカル DB へのインポート ステータスを確認するインポーター ダッシュボード
- ⚡ &nbsp; ノーコード テンプレートとインポート ボタンの作成
- ⚡ &nbsp; CSV 列とテンプレート列のスマートな自動マッチング
- ⚡ &nbsp; フィールドに対するカスタム検証ルールの設定
- ⚡ &nbsp; 楽しいデータレビュー体験
- ⚡ &nbsp; ストリーミングによるスケーリングが可能。1GB のサイズの CSV をインポートできます。
- ⚡ &nbsp; もっと...

### ワークフロー自動化のインポート

- ⚡ &nbsp;インポート ボタンにワークスペースと組織を関連付ける: 特定の組織から CSV を受け取る
- ⚡ &nbsp; Webhook : 近日公開..

## なぜこれを構築するのですか？

共有されるビジネス データの 70% 以上は、CSV と Excel ファイルの形式です。データ交換に API 統合を実際に採用しているのは 10% 未満です。

開発者および製品マネージャーとして、私たちはスケーラブルな CSV インポーターを構築し、社内で維持するという苦痛を経験してきました。毎日、何千人もの開発者が同じ苦痛を経験し、何百もの企業がスプレッドシートと CSV データをデータベースに取り込まなければなりません。
YoBulk は、CSV およびフラットファイル データのオンボーディング用の OSS 標準を構築しており、社内でデータ インポート ソリューションを構築するのに役立ちます。

Flatfile.com のような企業はこの問題に取り組んでいますが、データ セキュリティが弱く、価格が高いなどの制約があります。 開発者は SaaS 用の埋め込み可能でスケーラブルな CSV インポーターを望んでいますが、現実には、このように細分化された市場やセクターで万能のソリューションを考え出すことはほとんど不可能です。

これらすべての制限は、誰でも自分のニーズに適したデータ インポート ソリューションを作成できるようにするという私たちの使命を必要としています。

開発者には、独自の検証ルールを提供し、独自のデータベース エクスペリエンスを提供したいと考えています。 YoBulk を使用して、独自の方法で検証ルールを設計および変更できます。

企業にとって、YoBulk はデータ セキュリティをもたらすことに専念しています。 さらに、長期的な保守性を備えたデータを 100% コントロールできます。

正直なところ、少なくとも今のところ、機能とデザインの点で flatfile.com を上回っているとは言えません。 その上、私たちの優先事項は、現時点でより多くの機能を追加することです. 知識を民主化し、すべての CSV およびフラットファイル オープン ソース プロジェクトを単一のフレームワークにまとめるコミュニティを育成したいと考えています。

続きを読む [オープン データとクローズド データのオンボーディング](https://doc.yobulk.dev/#yobulk-positioning-open-source-vs-closed-source-data-onboarding-platforms)

# 我々の使命

私たちの使命は、世界中のすべてのインターネット ビジネスにオープン ソースである最も強力なフラットファイル (CSV、スプレッドシート) インポーターを提供することです。
企業が顧客のデータのオンボーディング、検証、変換を担当するフラットファイルを共有するための AI ファーストのデータ交換。

## サポート

質問や問題がある場合は、GitHub ディスカッション ページにアクセスしてください。できる限り迅速に対応させていただきます。

[https://github.com/yobulkdev/yobulkdev/discussions](https://github.com/yobulkdev/yobulkdev/discussions)

## ライセンス

YoBulk はオープンソース ソフトウェアで、 [AGPL 3.0 ライセンス](https://github.com/yobulkdev/yobulkdev/blob/main/LICENSE.md).
