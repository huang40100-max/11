SLOWDAY COFFEE V3 — Style upgrade / StackBlitz

1. 在 StackBlitz 開啟現有 SLOWDAY V2 專案。
2. 點左側 src/App.tsx，按 Command+A 全選，貼上本包 App.tsx 完整內容。
3. Command+S 儲存，重新整理預覽。
4. 不需改動原本的 App.css、index.css、Navbar.tsx。

V3 美術設定：Khaki #D0BA98 / Licorice #23140C / Dark Red #91040C
主視覺：大字、非對稱編輯式構圖、暖棕曝光／對比。
商品卡：三欄、奶油底、統一影像框與暖色調照片處理。
Gallery：六張，4:5 裁切、alt 文字、lightbox。
功能沿用：菜單切換／示範訂位／地圖／RWD。

圖片現況：使用舊版 Unsplash 外部示意照片，無專屬去背商品實拍，故菜單用一致裁切的編輯式實拍卡片。
自備圖片時，可上傳至 public/images/，把 App.tsx 中 images 區的圖片 URL 改成 /images/your-name.webp。
建議尺寸：Hero 1400~1800px 長邊、Gallery 960x1200、Menu 900x1100；採 WebP/AVIF。
單張商品圖片盡量控制 80–200 KB，Hero 200–450 KB；實際依畫質調整。
正式上線前請確認素材來源及第三方可識別商標／人物權利。
