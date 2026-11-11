import { useEffect, useState, type FormEvent } from 'react';

// SLOWDAY COFFEE — 單檔 React + TypeScript 展示網站
// 圖片為示意外部素材，公開上線前請換成已確認授權的品牌攝影。
const C = { khaki: '#D0BA98', ink: '#23140C', wine: '#91040C', paper: '#F5EFE6' };
// 攝影設定：下面的 images 仍使用 Unsplash 示意圖。正式照片可逐一改成 /images/*.webp。
const photo = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

const images = {
  hero: photo('photo-1442512595331-e89e73853f31', 1400),
  interior: photo('photo-1554118811-1e0d58224f24', 1100),
  cafe: photo('photo-1445116572660-236099ec97a0', 1100),
  coffee: photo('photo-1461023058943-07fcbe16d735', 800),
  latte: photo('photo-1469827160215-9d29e96e72f4', 800),
  espresso: photo('photo-1495474472287-4d71bcdd2085', 800),
  brunch: photo('photo-1525351484163-7529414344d8', 850),
  toast: photo('photo-1547592180-85f173990554', 850),
  cake: photo('photo-1578985545062-69928b1d9587', 800),
  pastry: photo('photo-1509440159596-0249088772ff', 800),
};

type Product = { id: string; zh: string; en: string; desc: string; price: number; img: string; tag?: string };
const menu: { title: string; en: string; items: Product[] }[] = [
  { title: '季節限定', en: 'SEASONAL SELECTION', items: [
    { id:'s1', zh:'莓果雲朵拿鐵', en:'Berry Cloud Latte', desc:'莓果酸香・燕麥奶・濃縮咖啡', price:185, img:images.latte, tag:'NEW' },
    { id:'s2', zh:'黑糖肉桂奶咖', en:'Brown Sugar Cinnamon', desc:'黑糖・肉桂・鮮奶', price:175, img:images.coffee, tag:'LIMITED' },
    { id:'s3', zh:'紅玉蘋果氣泡飲', en:'Ruby Apple Fizz', desc:'蘋果・紅茶・氣泡水', price:165, img:images.espresso },
  ]},
  { title: '咖啡系列', en: 'COFFEE BAR', items: [
    { id:'c1', zh:'經典美式', en:'Americano', desc:'乾淨回甘的每日經典', price:120, img:images.espresso },
    { id:'c2', zh:'經典拿鐵', en:'Café Latte', desc:'濃縮咖啡・綿密鮮奶', price:145, img:images.latte, tag:'POPULAR' },
    { id:'c3', zh:'燕麥拿鐵', en:'Oat Latte', desc:'滑順燕麥奶・雙份濃縮', price:160, img:images.coffee },
    { id:'c4', zh:'卡布奇諾', en:'Cappuccino', desc:'厚奶泡・濃郁可可尾韻', price:145, img:images.latte },
    { id:'c5', zh:'西西里咖啡', en:'Sicilian Coffee', desc:'檸檬・冰咖啡・清爽酸香', price:165, img:images.espresso, tag:'SIGNATURE' },
    { id:'c6', zh:'單品手沖', en:'Pour Over', desc:'依當日豆單供應', price:190, img:images.coffee },
  ]},
  { title:'特調飲品', en:'SIGNATURE DRINKS', items: [
    { id:'d1', zh:'抹茶雲朵', en:'Matcha Cloud', desc:'日本抹茶・鮮奶・奶霜', price:170, img:images.latte },
    { id:'d2', zh:'莓果氣泡飲', en:'Berry Sparkling', desc:'綜合莓果・氣泡水', price:160, img:images.espresso },
    { id:'d3', zh:'蜜桃烏龍', en:'Peach Oolong', desc:'蜜桃・烏龍茶', price:155, img:images.coffee },
    { id:'d4', zh:'可可厚奶', en:'Velvet Cocoa', desc:'純可可・鮮奶', price:160, img:images.latte },
    { id:'d5', zh:'蜂蜜檸檬紅茶', en:'Honey Lemon Tea', desc:'蜂蜜・檸檬・紅茶', price:145, img:images.espresso },
    { id:'d6', zh:'黑糖鮮奶', en:'Brown Sugar Milk', desc:'手熬黑糖・鮮奶', price:155, img:images.coffee },
  ]},
  { title:'輕食早午餐', en:'BRUNCH & SAVORY', items: [
    { id:'b1', zh:'慢日早午餐拼盤', en:'Slowday Brunch Plate', desc:'炒蛋・沙拉・酸種麵包', price:320, img:images.brunch, tag:'SIGNATURE' },
    { id:'b2', zh:'酪梨酸種吐司', en:'Avocado Sourdough', desc:'酪梨・酸種麵包・香草', price:265, img:images.toast },
    { id:'b3', zh:'燻鮭魚開放三明治', en:'Smoked Salmon Toast', desc:'燻鮭魚・奶油乳酪', price:295, img:images.brunch },
    { id:'b4', zh:'奶油炒蛋可頌', en:'Egg Croissant', desc:'奶油可頌・滑嫩炒蛋', price:245, img:images.pastry },
    { id:'b5', zh:'火腿起司帕尼尼', en:'Ham Cheese Panini', desc:'火腿・雙重起司', price:235, img:images.toast },
    { id:'b6', zh:'溫野菜沙拉碗', en:'Warm Vegetable Bowl', desc:'時蔬・穀物・油醋醬', price:250, img:images.brunch },
  ]},
  { title:'甜點烘焙', en:'SWEETS & BAKERY', items: [
    { id:'t1', zh:'手作焦糖布丁', en:'Caramel Pudding', desc:'香草・焦糖・滑嫩口感', price:125, img:images.cake, tag:'POPULAR' },
    { id:'t2', zh:'巴斯克乳酪蛋糕', en:'Basque Cheesecake', desc:'微焦表面・濃郁乳酪', price:175, img:images.cake },
    { id:'t3', zh:'經典提拉米蘇', en:'Classic Tiramisu', desc:'咖啡香・馬斯卡彭', price:185, img:images.cake },
    { id:'t4', zh:'濃巧克力布朗尼', en:'Fudge Brownie', desc:'苦甜巧克力・核桃', price:145, img:images.pastry },
    { id:'t5', zh:'每日手作肉桂捲', en:'Cinnamon Roll', desc:'肉桂糖・奶油糖霜', price:155, img:images.pastry },
    { id:'t6', zh:'檸檬凝乳塔', en:'Lemon Tart', desc:'檸檬凝乳・酥脆塔皮', price:165, img:images.cake },
  ]},
];

const gallery = [
  { src: images.interior, alt:'咖啡廳室內座位與自然採光的空間示意攝影', category:'SPACE' },
  { src: images.latte, alt:'拿鐵咖啡飲品近拍與細緻奶泡示意攝影', category:'DRINK' },
  { src: images.brunch, alt:'早午餐拼盤與輕食擺盤示意攝影', category:'FOOD' },
  { src: images.cafe, alt:'咖啡吧台及溫暖木質環境示意攝影', category:'INTERIOR' },
  { src: images.espresso, alt:'咖啡沖煮與杯裝飲品示意攝影', category:'COFFEE' },
  { src: images.cake, alt:'甜點蛋糕與烘焙食品示意攝影', category:'DESSERT' },
];

const today = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
};

type Booking = { name:string; contact:string; date:string; time:string; guests:string; seat:string; childSeat:boolean; note:string };
const emptyBooking: Booking = {name:'',contact:'',date:'',time:'',guests:'2',seat:'不指定',childSeat:false,note:''};

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [booking,setBooking] = useState<Booking>(emptyBooking);
  const [confirmed,setConfirmed] = useState<Booking | null>(null);
  const [formError,setFormError] = useState('');

  useEffect(() => {
    function keydown(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(x => x === null ? null : (x + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setLightbox(x => x === null ? null : (x + gallery.length - 1) % gallery.length);
    }
    document.addEventListener('keydown',keydown);
    return () => document.removeEventListener('keydown',keydown);
  },[]);

  const submit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!booking.name.trim() || !booking.contact.trim() || !booking.date || !booking.time || !booking.guests) {
      setFormError('請填寫全部必填欄位。'); return;
    }
    if (Number(booking.guests) < 1 || new Date(`${booking.date}T${booking.time}`).getTime() <= Date.now()) {
      setFormError('請選擇未來日期與時間，且用餐人數至少 1 位。'); return;
    }
    setFormError(''); setConfirmed({...booking});
  };

  return <div className="sd-app">
    <style>{`
      :root { font-family: Inter, -apple-system, BlinkMacSystemFont, 'Noto Sans TC', sans-serif; }
      html { scroll-behavior:smooth; }
      body { margin:0 !important; background:${C.paper} !important; }
      #root { max-width:none !important; width:100% !important; margin:0 !important; padding:0 !important; text-align:left !important; }
      .sd-app, .sd-app * { box-sizing:border-box; }
      .sd-app { color:${C.ink}; background:${C.paper}; overflow:hidden; font-size:16px; }
      .sd-app button, .sd-app input, .sd-app select, .sd-app textarea { font:inherit; }
      .sd-app button { cursor:pointer; }
      .sd-app a { color:inherit; text-decoration:none; }
      .sd-app img { display:block; width:100%; }
      .sd-app section { scroll-margin-top:94px; }
      .sd-wrap { width:min(1280px, calc(100% - 88px)); margin:0 auto; }
      .sd-header { position:sticky; top:0; z-index:50; background:${C.paper}; border-bottom:1px solid #d8c9b6; }
      .sd-header-inner { height:82px; display:flex; align-items:center; justify-content:space-between; gap:18px; }
      .sd-logo { font-size:29px; font-weight:950; line-height:1; letter-spacing:-.07em; white-space:nowrap; }
      .sd-logo b { color:${C.wine}; }
      .sd-links { display:flex; gap:31px; align-items:center; }
      .sd-links a { font-size:12px; letter-spacing:.12em; font-weight:800; transition:color .2s; }
      .sd-links a:hover { color:${C.wine}; }
      .sd-cta { background:${C.wine}; color:white !important; border-radius:100px; padding:16px 22px; display:inline-flex; align-items:center; justify-content:center; border:0; font-weight:800; font-size:12px; letter-spacing:.08em; white-space:nowrap; }
      .sd-cta:hover { background:#710409; }
      .sd-cta-outline { background:transparent; border:1px solid ${C.ink}; color:${C.ink} !important; }
      .sd-cta-outline:hover { background:#e7dbcb; }
      .sd-hamburger { display:none; background:transparent; border:0; font-size:26px; color:${C.ink}; }
      .sd-hero { padding:64px 0 94px; background:linear-gradient(140deg, #f5efe6 4%, #eadac5 100%); }
      .sd-kicker { color:${C.wine}; font-size:11px; font-weight:900; letter-spacing:.2em; text-transform:uppercase; }
      .sd-hero-title { font-size:clamp(64px, 9.6vw, 152px); font-weight:950; letter-spacing:-.09em; line-height:.88; margin:28px 0 35px; }
      .sd-hero-title span { color:${C.wine}; }
      .sd-hero-layout { display:grid; grid-template-columns:1.45fr .76fr; gap:25px; align-items:stretch; }
      .sd-img-frame { overflow:hidden; border-radius:8px; background:#d4c0a9; isolation:isolate; }
      .sd-hero-main { box-shadow:18px 18px 0 ${C.khaki}; }
      .sd-hero-main:after { content:''; pointer-events:none; position:absolute; inset:0; background:linear-gradient(135deg,rgba(35,20,12,.10),rgba(145,4,12,.08)); mix-blend-mode:multiply; }
      .sd-hero-main { position:relative; height:550px; }
      .sd-hero-main img { height:100%; object-fit:cover; object-position:center 52%; filter:sepia(.14) saturate(.79) contrast(1.09) brightness(.94); }
      .sd-photo-label { position:absolute; left:20px; bottom:20px; border-radius:40px; background:${C.paper}; padding:12px 16px; font-weight:850; font-size:11px; letter-spacing:.06em; }
      .sd-hero-side { display:flex; flex-direction:column; gap:25px; }
      .sd-hero-side .sd-img-frame { height:310px; }
      .sd-hero-side img { height:100%; object-fit:cover; filter:sepia(.18) saturate(.8) contrast(1.06) brightness(.94); }
      .sd-hero-message { flex:1; background:${C.ink}; color:${C.paper}; padding:27px; display:flex; flex-direction:column; justify-content:space-between; border-radius:8px; }
      .sd-hero-message p { font-size:20px; line-height:1.35; margin:16px 0; font-weight:800; }
      .sd-hero-bottom { margin-top:24px; display:flex; justify-content:space-between; gap:25px; align-items:center; }
      .sd-hero-bottom p { max-width:570px; font-size:15px; line-height:1.8; }
      .sd-section { padding:108px 0; }
      .sd-section-head { display:flex; align-items:end; justify-content:space-between; gap:24px; margin-bottom:36px; }
      .sd-section-title { font-size:clamp(45px,6vw,83px); line-height:1; letter-spacing:-.07em; margin:12px 0 0; font-weight:950; }
      .sd-small { color:#695245; font-size:14px; line-height:1.8; }
      .sd-intro { background:${C.ink}; color:${C.paper}; }
      .sd-intro .sd-kicker { color:${C.khaki}; }
      .sd-intro-grid { display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center; }
      .sd-intro h2 { font-size:clamp(55px,7vw,105px); font-weight:950; letter-spacing:-.075em; line-height:.95; margin:23px 0; }
      .sd-intro h2 em { font-style:normal; color:${C.khaki}; }
      .sd-intro p { font-size:16px; line-height:2; max-width:520px; }
      .sd-intro-img { height:510px; border-radius:8px; object-fit:cover; filter:sepia(.13) saturate(.83) contrast(1.06); }
      .sd-pills { margin-top:32px; display:flex; gap:10px; flex-wrap:wrap; }
      .sd-pills span { border:1px solid #6d5748; padding:12px 16px; border-radius:30px; font-size:11px; font-weight:800; letter-spacing:.09em; }
      .sd-menu { background:#ede5db; }
      .sd-menu-tabs { display:flex; gap:9px; flex-wrap:wrap; margin:32px 0 44px; }
      .sd-menu-tabs button { padding:12px 18px; border:1px solid #a58c75; background:transparent; border-radius:40px; font-size:12px; font-weight:800; color:${C.ink}; }
      .sd-menu-tabs button[aria-pressed='true'] { background:${C.ink}; color:${C.paper}; }
      .sd-menu-section { margin:0 0 60px; }
      .sd-menu-head { display:flex; justify-content:space-between; align-items:end; border-bottom:1px solid #c6b4a0; margin-bottom:22px; padding-bottom:15px; }
      .sd-menu-head h3 { font-size:clamp(27px,3vw,39px); letter-spacing:-.05em; margin:8px 0 0; }
      .sd-menu-head span { font-size:10px; font-weight:800; letter-spacing:.12em; color:${C.wine}; }
      .sd-product-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }
      .sd-product { background:#fffdfa; border-radius:15px; padding:18px; box-shadow:0 12px 36px #23140c12; display:flex; flex-direction:column; min-width:0; transition:transform .2s, box-shadow .2s; }
      .sd-product:hover { box-shadow:0 22px 44px #23140c1d; }
      .sd-product:hover { transform:translateY(-4px); }
      .sd-product-image { height:255px; background:linear-gradient(145deg,#eee1cf,#f9f5ef); border-radius:10px; overflow:hidden; display:grid; place-items:center; padding:13px; }
      .sd-product-image img { width:100%; height:100%; object-fit:cover; object-position:center; border-radius:7px; filter:sepia(.12) saturate(.78) contrast(1.04); transition:transform .25s; }
      .sd-product:hover .sd-product-image img { transform:scale(1.035); }
      /* 商品去背實拍完成後：可改 object-fit:contain 並移除照片背景 */
      .sd-product-tag { height:17px; margin-top:18px; color:${C.wine}; font-size:10px; font-weight:900; letter-spacing:.16em; }
      .sd-product h4 { font-size:20px; letter-spacing:-.04em; margin:10px 0 3px; }
      .sd-product-en { font-size:11px; letter-spacing:.1em; color:#755f51; }
      .sd-product-desc { font-size:12px; color:#755f51; line-height:1.7; flex:1; min-height:35px; }
      .sd-product-bottom { display:flex; justify-content:space-between; gap:10px; padding-top:15px; margin-top:10px; border-top:1px solid #e9ded2; }
      .sd-product-bottom strong { font-size:15px; }
      .sd-product-bottom small { color:#8e7d70; font-size:9px; letter-spacing:.12em; }
      .sd-gallery { background:${C.paper}; }
      .sd-gallery-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px; }
      .sd-gallery-item { display:block; text-align:left; position:relative; padding:0; border:0; background:transparent; overflow:hidden; border-radius:7px; }
      .sd-gallery-item img { width:100%; aspect-ratio:4/5; object-fit:cover; filter:sepia(.15) saturate(.75) contrast(1.06) brightness(.95); transition:transform .3s; }
      .sd-gallery-item:hover img { transform:scale(1.045); }
      .sd-gallery-item:after { content:''; position:absolute; inset:0; background:linear-gradient(0deg,rgba(35,20,12,.25),transparent 55%); pointer-events:none; }
      .sd-gallery-item span { z-index:1; }
      .sd-gallery-item span { position:absolute; bottom:14px; left:14px; background:${C.paper}; border-radius:30px; padding:9px 12px; font-size:10px; font-weight:900; letter-spacing:.13em; }
      .sd-visit { background:${C.khaki}; }
      .sd-visit-grid { display:grid; grid-template-columns:1fr 1fr; gap:25px; }
      .sd-info { background:${C.paper}; border-radius:9px; padding:38px; }
      .sd-info h3 { font-size:31px; margin:0 0 24px; }
      .sd-info dl { display:grid; grid-template-columns:110px 1fr; gap:15px; font-size:14px; line-height:1.8; }
      .sd-info dt { color:${C.wine}; font-weight:900; }
      .sd-info dd { margin:0; }
      .sd-map { background:#d7c7b6; overflow:hidden; border-radius:9px; min-height:420px; }
      .sd-map iframe { width:100%; height:100%; min-height:420px; border:0; display:block; }
      .sd-note { font-size:12px; line-height:1.75; color:#6b5546; }
      .sd-booking { background:#f5efe6; }
      .sd-form-wrap { display:grid; grid-template-columns:.78fr 1.22fr; gap:65px; align-items:start; }
      .sd-form { border:1px solid #b6a18b; border-radius:12px; background:#fffaf3; padding:36px; box-shadow:0 9px 29px #23140c0c; }
      .sd-meta { letter-spacing:.14em; font-size:11px; font-weight:900; margin:0 0 29px; color:${C.wine}; }
      .sd-fields { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; }
      .sd-field { display:flex; flex-direction:column; gap:8px; font-size:13px; font-weight:850; }
      .sd-field input, .sd-field textarea, .sd-field select { width:100%; background:#fff; border:1px solid #c8b6a6; padding:13px 12px; border-radius:5px; color:${C.ink}; font-size:14px; }
      .sd-field-wide { grid-column:1/-1; }
      .sd-check { grid-column:1/-1; display:flex; align-items:center; gap:10px; font-size:13px; }
      .sd-error { color:${C.wine}; font-weight:800; font-size:13px; }
      .sd-confirm { background:#fff; padding:24px; border-left:4px solid ${C.wine}; font-size:14px; line-height:1.85; overflow-wrap:anywhere; }
      .sd-footer { background:${C.ink}; color:${C.paper}; padding:60px 0 35px; }
      .sd-footer-grid { display:grid; grid-template-columns:1.6fr 1fr 1fr; gap:36px; }
      .sd-footer p, .sd-footer a { font-size:13px; line-height:2; }
      .sd-footer a:hover { color:${C.khaki}; }
      .sd-modal { position:fixed; inset:0; z-index:200; background:#160a06ed; display:grid; place-items:center; padding:65px 25px; }
      .sd-modal-inner { display:flex; flex-direction:column; align-items:center; gap:16px; width:min(860px,95vw); }
      .sd-modal img { width:auto; max-width:100%; max-height:70vh; object-fit:contain; }
      .sd-modal-actions { display:flex; gap:12px; }
      .sd-modal button { border:1px solid #d5baa0; color:white; background:transparent; padding:10px 17px; border-radius:40px; }
      .sd-app :focus-visible { outline:3px solid ${C.wine}; outline-offset:3px; }
      @media(max-width:1000px) {
        .sd-wrap { width:min(100% - 48px,1280px); }
        .sd-links { gap:15px; }
        .sd-hero-main { height:440px; }
        .sd-hero-side .sd-img-frame { height:235px; }
        .sd-intro-grid { gap:30px; }
        .sd-info { padding:25px; }
      }
      @media(max-width:760px) {
        .sd-wrap { width:calc(100% - 36px); }
        .sd-header-inner { height:68px; }
        .sd-logo { font-size:25px; }
        .sd-hamburger { display:block; }
        .sd-links { display:none; position:absolute; top:100%; left:0; right:0; padding:20px 18px 26px; background:${C.paper}; flex-direction:column; align-items:stretch; box-shadow:0 14px 18px #23140c15; }
        .sd-links.open { display:flex; }
        .sd-links a { padding:7px 0; }
        .sd-hero { padding:45px 0 65px; }
        .sd-hero-title { font-size:clamp(48px, 12vw, 85px); line-height:.98; margin:20px 0 27px; }
        .sd-hero-layout { grid-template-columns:1fr; gap:13px; }
        .sd-hero-main { height:330px; box-shadow:8px 8px 0 ${C.khaki}; }
        .sd-hero-side { display:grid; grid-template-columns:1fr 1fr; gap:13px; }
        .sd-hero-side .sd-img-frame { height:190px; }
        .sd-hero-message { padding:18px; }
        .sd-hero-message p { font-size:16px; }
        .sd-hero-bottom { align-items:stretch; flex-direction:column; }
        .sd-section { padding:73px 0; }
        .sd-intro-grid, .sd-visit-grid, .sd-form-wrap { grid-template-columns:1fr; gap:28px; }
        .sd-intro-img { height:360px; }
        .sd-section-title { font-size:clamp(42px, 9vw, 60px); }
        .sd-product-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
        .sd-product { padding:11px; }
        .sd-product-image { height:175px; }
        .sd-product h4 { font-size:16px; }
        .sd-product-desc { font-size:11px; }
        .sd-product-bottom small { display:none; }
        .sd-gallery-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
        .sd-info dl { grid-template-columns:90px 1fr; }
        .sd-form { padding:22px; }
        .sd-footer-grid { grid-template-columns:1fr 1fr; }
        .sd-footer-grid > div:first-child { grid-column:1/-1; }
      }
      @media(max-width:390px) {
        .sd-hero-title { font-size:45px; }
        .sd-hero-main { height:280px; }
        .sd-hero-side .sd-img-frame { height:150px; }
        .sd-hero-message p { font-size:13px; }
        .sd-fields { grid-template-columns:1fr; }
        .sd-product-image { height:150px; }
        .sd-product h4 { font-size:14px; }
        .sd-product-en { font-size:10px; }
      }
      @media(prefers-reduced-motion: reduce) { html { scroll-behavior:auto; } .sd-app *, .sd-app *:before, .sd-app *:after { transition:none !important; } }
    `}</style>

    <header className="sd-header">
      <div className="sd-wrap sd-header-inner">
        <a className="sd-logo" href="#home">SLOWDAY<b>.</b></a>
        <nav className={`sd-links ${mobileOpen ? 'open' : ''}`} aria-label="主選單">
          {([['ABOUT','#about'],['MENU','#menu'],['GALLERY','#gallery'],['VISIT','#visit']] as const).map(([name,href]) =>
            <a key={href} href={href} onClick={() => setMobileOpen(false)}>{name}</a>)}
          <a className="sd-cta" href="#reservation" onClick={() => setMobileOpen(false)}>BOOK A TABLE ↗</a>
        </nav>
        <button type="button" className="sd-hamburger" aria-expanded={mobileOpen} aria-label={mobileOpen?'關閉選單':'開啟選單'} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen?'✕':'☰'}</button>
      </div>
    </header>

    <main>
      <section id="home" className="sd-hero">
        <div className="sd-wrap">
          <div className="sd-kicker">EST. 2026 / SPECIALTY COFFEE & EVERYDAY <span aria-hidden="true" style={{color:C.ink, marginLeft:12}}>●</span></div>
          <h1 className="sd-hero-title">A LITTLE<br/>SLOWER.<br/><span>A LOT BETTER.</span></h1>
          <div className="sd-hero-layout">
            <div className="sd-img-frame sd-hero-main">
              <img src={images.hero} alt="咖啡杯與咖啡豆的品牌情境示意攝影" fetchPriority="high" />
              <div className="sd-photo-label">GOOD COFFEE, SLOW MOMENTS.</div>
            </div>
            <div className="sd-hero-side">
              <div className="sd-img-frame"><img loading="lazy" decoding="async" src={images.cafe} alt="咖啡廳吧台和手作咖啡示意攝影" /></div>
              <div className="sd-hero-message"><span className="sd-kicker" style={{color:C.khaki}}>SLOWDAY / DAILY RITUAL</span><p>慢一點，<br/>喝杯好咖啡。</p><span style={{fontSize:11,letterSpacing:'.12em'}}>COFFEE · BRUNCH · STORIES</span></div>
            </div>
          </div>
          <div className="sd-hero-bottom"><p>一杯好咖啡，一段不被打擾的日常。讓生活回到你喜歡的節奏。</p><div style={{display:'flex',gap:10,flexWrap:'wrap'}}><a className="sd-cta sd-cta-outline" href="#menu">EXPLORE MENU ↗</a><a className="sd-cta" href="#reservation">BOOK A TABLE ↗</a></div></div>
        </div>
      </section>

      <section id="about" className="sd-intro sd-section">
        <div className="sd-wrap sd-intro-grid">
          <div><div className="sd-kicker">01 — THE SLOWDAY STORY</div><h2>LESS RUSH.<br/><em>MORE LIFE.</em></h2><p>SLOWDAY COFFEE 是一個為城市日常打造的精品咖啡與早午餐品牌。從精選豆款、手作甜點到一張舒適的座位，我們希望讓每一次停留，都成為好好照顧自己的時刻。</p><div className="sd-pills"><span>SPECIALTY COFFEE</span><span>FRESH BRUNCH</span><span>GOOD VIBES</span></div></div>
          <img className="sd-intro-img" src={images.interior} loading="lazy" alt="溫暖自然光下的咖啡廳室內環境示意攝影" />
        </div>
      </section>

      <section id="menu" className="sd-menu sd-section">
        <div className="sd-wrap">
          <div className="sd-section-head"><div><div className="sd-kicker">02 — CURATED SELECTION</div><h2 className="sd-section-title">FIND YOUR<br/>FAVORITE.</h2></div><p className="sd-small">精品咖啡、季節特調、輕食早午餐與手作甜點。<br/>每一款，都值得慢慢選。</p></div>
          <div className="sd-menu-tabs" role="group" aria-label="篩選商品分類"><button aria-pressed={activeCategory==='ALL'} onClick={()=>setActiveCategory('ALL')}>ALL / 全部</button>{menu.map(s=><button key={s.en} aria-pressed={activeCategory===s.en} onClick={()=>setActiveCategory(s.en)}>{s.title}</button>)}</div>
          {menu.filter(s=>activeCategory==='ALL'||activeCategory===s.en).map((s,i)=><section className="sd-menu-section" key={s.en} aria-label={s.title}><div className="sd-menu-head"><div><span>COLLECTION {String(menu.indexOf(s)+1).padStart(2,'0')} / {s.en}</span><h3>{s.title}</h3></div><span>{s.items.length} ITEMS</span></div><div className="sd-product-grid">{s.items.map(item=><article className="sd-product" key={item.id}><div className="sd-product-image"><img src={item.img} alt={`${item.zh}示意商品照片`} loading="lazy" decoding="async" /></div><div className="sd-product-tag">{item.tag||'SLOWDAY SELECT'}</div><h4>{item.zh}</h4><div className="sd-product-en">{item.en.toUpperCase()}</div><p className="sd-product-desc">{item.desc}</p><div className="sd-product-bottom"><strong>NT$ {item.price}</strong><small>MADE WITH CARE</small></div></article>)}</div></section>)}
          <p className="sd-note">展示菜單與價格為品牌提案示例，實際販售資訊以正式營業公告為準。所有菜單圖片皆為示意，並非逐項實拍。</p>
        </div>
      </section>

      <section id="gallery" className="sd-gallery sd-section"><div className="sd-wrap"><div className="sd-section-head"><div><div className="sd-kicker">03 — A VISUAL JOURNAL</div><h2 className="sd-section-title">A SPACE<br/>TO STAY.</h2></div><p className="sd-small">咖啡、餐點、室內空間與每一個值得停留的角落。</p></div><div className="sd-gallery-grid">{gallery.map((g,i)=><button type="button" className="sd-gallery-item" key={g.category} onClick={()=>setLightbox(i)} aria-label={`放大照片：${g.alt}`}><img src={g.src} alt={g.alt} loading="lazy" decoding="async" /><span>{g.category} ↗</span></button>)}</div><p className="sd-note">攝影圖片為設計示意素材；正式上線請替換為自行拍攝或具有明確使用授權的素材。</p></div></section>

      <section id="visit" className="sd-visit sd-section"><div className="sd-wrap"><div className="sd-section-head"><div><div className="sd-kicker">04 — VISIT US / CONCEPT STORE</div><h2 className="sd-section-title">COME SAY HI.</h2></div></div><div className="sd-visit-grid"><div className="sd-info"><h3>SLOWDAY COFFEE</h3><dl><dt>概念選址</dt><dd>臺中市西區（品牌展示設定，尚無實際店址）</dd><dt>展示營業時間</dt><dd>週二至週五 10:00–19:00<br/>週六、週日 09:00–20:00<br/>週一公休</dd><dt>聯絡電話</dt><dd>尚未設立正式服務電話</dd><dt>EMAIL</dt><dd>尚未設立品牌信箱</dd></dl><p className="sd-note">以上營業時間僅供課堂展示；本專案不是實際營業中的店家。</p><a className="sd-cta" href="https://www.google.com/maps/search/?api=1&query=%E8%87%BA%E4%B8%AD%E5%B8%82%E8%A5%BF%E5%8D%80" target="_blank" rel="noreferrer">OPEN AREA MAP ↗</a></div><div className="sd-map"><iframe title="臺中市西區展示區域 Google 地圖（非 SLOWDAY 實際門市）" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=%E8%87%BA%E4%B8%AD%E5%B8%82%E8%A5%BF%E5%8D%80&output=embed" /></div></div></div></section>

      <section id="reservation" className="sd-booking sd-section"><div className="sd-wrap sd-form-wrap"><div><div className="sd-kicker">05 — RESERVATION DEMO</div><h2 className="sd-section-title">SAVE YOUR<br/>MOMENT.</h2><p className="sd-small">以 META / INPUT_FIELDS 的方式，清楚呈現訂位欄位、驗證和回饋。這是課堂展示，不會送出真實訂單。</p></div><div className="sd-form">{confirmed?<div className="sd-confirm" role="status"><div className="sd-meta">META // SYSTEM_FEEDBACK</div><h3>展示表單填寫完成</h3><p>姓名：{confirmed.name}<br/>聯絡方式：{confirmed.contact}<br/>日期：{confirmed.date}<br/>時間：{confirmed.time}<br/>用餐人數：{confirmed.guests} 人<br/>座位偏好：{confirmed.seat}<br/>兒童座椅：{confirmed.childSeat?'需要':'不需要'}<br/>特殊需求：{confirmed.note||'無'}</p><strong>此為課堂展示表單，未建立任何真實訂位。</strong><p><button className="sd-cta" type="button" onClick={()=>setConfirmed(null)}>返回修改 ↗</button></p></div>:<form onSubmit={submit}><div className="sd-meta">META // INPUT_FIELDS</div><div className="sd-fields"><label className="sd-field">姓名 *<input required value={booking.name} onChange={e=>setBooking({...booking,name:e.target.value})} placeholder="請填寫姓名" /></label><label className="sd-field">聯絡方式 *<input required value={booking.contact} onChange={e=>setBooking({...booking,contact:e.target.value})} placeholder="電話或 Email" /></label><label className="sd-field">日期 *<input required type="date" min={today()} value={booking.date} onChange={e=>setBooking({...booking,date:e.target.value})}/></label><label className="sd-field">時間 *<input required type="time" value={booking.time} onChange={e=>setBooking({...booking,time:e.target.value})}/></label><label className="sd-field">用餐人數 *<select value={booking.guests} onChange={e=>setBooking({...booking,guests:e.target.value})}>{Array.from({length:8},(_,i)=>i+1).map(n=><option key={n} value={n}>{n} 人</option>)}</select></label><label className="sd-field">座位偏好<select value={booking.seat} onChange={e=>setBooking({...booking,seat:e.target.value})}><option>不指定</option><option>靠窗</option><option>吧台</option><option>一般座位</option></select></label><label className="sd-check"><input type="checkbox" checked={booking.childSeat} onChange={e=>setBooking({...booking,childSeat:e.target.checked})}/>需要兒童座椅</label><label className="sd-field sd-field-wide">特殊需求（選填）<textarea rows={3} value={booking.note} onChange={e=>setBooking({...booking,note:e.target.value})} placeholder="飲食需求、慶生等備註"/></label></div>{formError&&<p className="sd-error" role="alert">{formError}</p>}<p className="sd-note">必填欄位不可空白，日期時間不得早於現在。此為課堂展示表單，不代表實際訂位完成，也不會送出資料。</p><button type="submit" className="sd-cta">SUBMIT DEMO FORM ↗</button></form>}</div></div></section>
    </main>

    <footer className="sd-footer"><div className="sd-wrap"><div className="sd-footer-grid"><div><div className="sd-logo">SLOWDAY<b>.</b></div><p>GOOD COFFEE. SLOW MOMENTS.</p></div><div><div className="sd-kicker" style={{color:C.khaki}}>EXPLORE</div><p><a href="#about">ABOUT</a><br/><a href="#menu">MENU</a><br/><a href="#gallery">GALLERY</a></p></div><div><div className="sd-kicker" style={{color:C.khaki}}>VISIT / CONTACT</div><p><a href="#visit">LOCATION & HOURS</a><br/><a href="#reservation">RESERVATION DEMO</a></p></div></div><p style={{borderTop:'1px solid #5f4a3c',paddingTop:25,marginTop:45,fontSize:11,color:C.khaki}}>© 2026 SLOWDAY COFFEE — CONCEPT DESIGN / EDUCATIONAL DEMO. NOT A REAL RESERVATION SERVICE.</p></div></footer>

    {lightbox!==null&&<div className="sd-modal" role="dialog" aria-modal="true" aria-label="圖庫照片放大檢視" onClick={()=>setLightbox(null)}><div className="sd-modal-inner" onClick={e=>e.stopPropagation()}><img src={gallery[lightbox].src} alt={gallery[lightbox].alt}/><div className="sd-modal-actions"><button type="button" onClick={()=>setLightbox((lightbox+gallery.length-1)%gallery.length)}>← 上一張</button><button type="button" onClick={()=>setLightbox(null)}>關閉 ✕</button><button type="button" onClick={()=>setLightbox((lightbox+1)%gallery.length)}>下一張 →</button></div></div></div>}
  </div>;
}
