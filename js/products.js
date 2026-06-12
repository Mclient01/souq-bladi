// ============================================================
// سوق بلادي - Souq Bladi - Products Functions
// ============================================================

// ============================================================
// PRODUCTS DATA
// ============================================================
const PRODUCTS = [
  {id:1,ico:'🎧',names:{ar:'سماعات بلوتوث لاسلكية',fr:'Écouteurs Bluetooth',en:'Wireless Headphones',de:'Bluetooth Kopfhörer',es:'Auriculares Bluetooth',tr:'Bluetooth Kulaklık',ru:'Беспроводные наушники',zh:'蓝牙耳机'},price:89,old:149,disc:40,cat:'electronics',rating:4.8,sold:'5k+',ship:true},
  {id:2,ico:'⌚',names:{ar:'ساعة ذكية مقاومة للماء',fr:'Montre connectée',en:'Smart Watch',de:'Smartwatch',es:'Reloj inteligente',tr:'Akıllı saat',ru:'Умные часы',zh:'智能手表'},price:125,old:220,disc:43,cat:'electronics',rating:4.7,sold:'3.2k',ship:true},
  {id:3,ico:'💼',names:{ar:'حقيبة ظهر جلدية',fr:'Sac à dos cuir',en:'Leather Backpack',de:'Lederrucksack',es:'Mochila de cuero',tr:'Deri sırt çantası',ru:'Кожаный рюкзак',zh:'皮革背包'},price:65,old:95,disc:32,cat:'fashion',rating:4.9,sold:'1.5k',ship:false},
  {id:4,ico:'💆',names:{ar:'مجموعة عناية بشرة كورية',fr:'Kit soins coréen',en:'Korean Skincare Set',de:'Koreanisches Hautpflege',es:'Kit cuidado coreano',tr:'Kore cilt bakımı',ru:'Корейский уход',zh:'韩国护肤套装'},price:48,old:80,disc:40,cat:'beauty',rating:4.6,sold:'8k+',ship:true},
  {id:5,ico:'💡',names:{ar:'مصباح LED ذكي',fr:'Ampoule LED smart',en:'Smart LED Bulb',de:'Smart LED Lampe',es:'Bombilla LED smart',tr:'Akıllı LED ampul',ru:'Умная лампа',zh:'智能LED灯泡'},price:29,old:45,disc:36,cat:'home',rating:4.5,sold:'2.1k',ship:true},
  {id:6,ico:'👟',names:{ar:'حذاء رياضي للجري',fr:'Chaussures de sport',en:'Running Shoes',de:'Laufschuhe',es:'Zapatillas running',tr:'Koşu ayakkabısı',ru:'Кроссовки',zh:'跑步鞋'},price:85,old:130,disc:35,cat:'sports',rating:4.8,sold:'4k+',ship:false},
  {id:7,ico:'⚡',names:{ar:'شاحن سريع 65W',fr:'Chargeur rapide 65W',en:'65W Fast Charger',de:'65W Schnellladegerät',es:'Cargador rápido 65W',tr:'65W hızlı şarj',ru:'Быстрое зарядное 65W',zh:'65W快速充电器'},price:45,old:70,disc:36,cat:'electronics',rating:4.9,sold:'9k+',ship:true},
  {id:8,ico:'👕',names:{ar:'قميص قطن مريح',fr:'T-shirt coton',en:"Men's Cotton T-Shirt",de:'Baumwoll-T-Shirt',es:'Camiseta de algodón',tr:'Pamuk tişört',ru:'Хлопковая футболка',zh:'棉质T恤'},price:22,old:38,disc:42,cat:'fashion',rating:4.7,sold:'6k+',ship:false},
  {id:9,ico:'🔊',names:{ar:'مكبر صوت بلوتوث',fr:'Enceinte Bluetooth',en:'Bluetooth Speaker',de:'Bluetooth Lautsprecher',es:'Altavoz Bluetooth',tr:'Bluetooth hoparlör',ru:'Bluetooth колонка',zh:'蓝牙音箱'},price:75,old:120,disc:38,cat:'electronics',rating:4.6,sold:'2.5k',ship:true},
  {id:10,ico:'🍳',names:{ar:'طقم أدوات مطبخ',fr:'Set ustensiles cuisine',en:'Kitchen Set',de:'Küchen-Set',es:'Set utensilios cocina',tr:'Mutfak seti',ru:'Кухонный набор',zh:'厨具套装'},price:55,old:85,disc:35,cat:'home',rating:4.8,sold:'3k+',ship:true},
  {id:11,ico:'🧴',names:{ar:'كريم واقي الشمس SPF50',fr:'Crème solaire SPF50',en:'SPF50 Sunscreen',de:'LSF50 Sonnencreme',es:'Crema solar FPS50',tr:'SPF50 güneş kremi',ru:'Крем SPF50',zh:'SPF50防晒霜'},price:25,old:42,disc:40,cat:'beauty',rating:4.7,sold:'7k+',ship:false},
  {id:12,ico:'🏋️',names:{ar:'حبل تخطي ذكي',fr:'Corde à sauter smart',en:'Smart Jump Rope',de:'Intelligentes Sprungseil',es:'Comba inteligente',tr:'Akıllı atlama ipi',ru:'Умная скакалка',zh:'智能跳绳'},price:38,old:60,disc:37,cat:'sports',rating:4.5,sold:'1.4k',ship:true},
  {id:13,ico:'🧩',names:{ar:'لعبة تعليمية للأطفال',fr:'Jouet éducatif',en:'Educational Toy',de:'Lernspielzeug',es:'Juguete educativo',tr:'Eğitici oyuncak',ru:'Развивающая игрушка',zh:'教育玩具'},price:60,old:95,disc:37,cat:'kids',rating:4.8,sold:'2.2k',ship:true},
  {id:14,ico:'💤',names:{ar:'وسادة طبية للرقبة',fr:'Oreiller cervical',en:'Neck Support Pillow',de:'Nackenkissen',es:'Almohada cervical',tr:'Boyun yastığı',ru:'Подушка для шеи',zh:'颈部枕头'},price:32,old:50,disc:36,cat:'home',rating:4.6,sold:'1.8k',ship:true},
  {id:15,ico:'🫧',names:{ar:'عطر رجالي فرنسي',fr:'Parfum homme français',en:'French Men Perfume',de:'Französisches Parfüm',es:'Perfume francés',tr:'Fransız erkek parfümü',ru:'Французский парфюм',zh:'法国男士香水'},price:95,old:160,disc:41,cat:'beauty',rating:4.9,sold:'1.1k',ship:true},
  {id:16,ico:'🎵',names:{ar:'سماعات أذن بعازل ضوضاء',fr:'Écouteurs anti-bruit',en:'Noise Cancelling Earphones',de:'Noise-Cancelling Kopfhörer',es:'Auriculares cancelación ruido',tr:'Gürültü önleyici kulaklık',ru:'Шумоподавляющие наушники',zh:'降噪耳机'},price:110,old:180,disc:39,cat:'electronics',rating:4.7,sold:'3.5k',ship:true},
]

// ============================================================
// RENDER PRODUCTS
// ============================================================
function renderProducts(arr, gridId) {
  const g = document.getElementById(gridId)
  if(!g) return
  const t = typeof T !== 'undefined' ? (T[currentLang] || T.ar) : {add_cart:'🛒 أضف للسلة',free_ship:'✈️ شحن مجاني'}
  
  if(!arr || !arr.length) {
    g.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#9CA3AF"><div style="font-size:48px;margin-bottom:10px">🔍</div><div style="font-weight:700">لا توجد منتجات</div></div>`
    return
  }
  
  g.innerHTML = arr.map(p => {
    const name = (p.names && p.names[currentLang]) ? p.names[currentLang] : p.names.ar
    return `<div class="pcard">
      <div class="pimg">
        <span>${p.ico}</span>
        <div class="disc-badge">-${p.disc}%</div>
        <button class="wish-btn" onclick="event.stopPropagation();addWish(${p.id})">❤️</button>
        <button class="add-btn" onclick="event.stopPropagation();addToCart(${p.id})">${t.add_cart}</button>
      </div>
      <div class="pinfo">
        <div class="pname">${name}</div>
        <div class="pprices"><span class="pnew">${fmt(p.price)}</span><span class="pold">${fmt(p.old)}</span></div>
        <div><span class="pstars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))}</span> <span class="pmeta">(${p.rating}) · ${p.sold}</span></div>
        ${p.ship ? `<div class="pship">${t.free_ship}</div>` : ''}
      </div>
    </div>`
  }).join('')
}

// ============================================================
// FILTER CATEGORY
// ============================================================
function filterCat(cat, el) {
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'))
  if(el && el.tagName === 'A') el.classList.add('active')
  const arr = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat)
  const t = typeof T !== 'undefined' ? (T[currentLang] || T.ar) : {flash:'⚡ تخفيضات الفلاش',top:'🔥 الأكثر مبيعاً',feat:'⭐ منتجات مميزة'}
  
  const flashBox = document.getElementById('flash-grid')
  const topBox = document.getElementById('top-grid')
  const featBox = document.getElementById('feat-grid')
  
  if(cat === 'all') {
    renderProducts(PRODUCTS.slice(0,8), 'flash-grid')
    renderProducts(PRODUCTS.slice(8,16), 'top-grid')
    renderProducts([...PRODUCTS].sort((a,b)=>b.rating-a.rating).slice(0,8), 'feat-grid')
    if(flashBox) flashBox.closest('.sec-box').querySelector('.sec-title').textContent = t.flash
    if(topBox) topBox.closest('.sec-box').querySelector('.sec-title').textContent = t.top
    if(featBox) featBox.closest('.sec-box').querySelector('.sec-title').textContent = t.feat
  } else {
    renderProducts(arr, 'flash-grid')
    if(topBox) topBox.innerHTML = ''
    if(featBox) featBox.innerHTML = ''
    const cats = typeof T !== 'undefined' ? (T[currentLang]?.cats || T.ar.cats) : {all:'كل المنتجات'}
    if(flashBox) flashBox.closest('.sec-box').querySelector('.sec-title').textContent = cats[cat] || cat
  }
  
  const productsSection = document.getElementById('products')
  if(productsSection) productsSection.scrollIntoView({behavior:'smooth'})
}

// ============================================================
// SEARCH
// ============================================================
function doSearch() {
  const searchInp = document.getElementById('search-inp')
  if(!searchInp) return
  
  const q = searchInp.value.trim().toLowerCase()
  if(!q) return
  
  const results = PRODUCTS.filter(p => Object.values(p.names).some(n => n.toLowerCase().includes(q)) || p.cat.includes(q))
  renderProducts(results, 'flash-grid')
  
  const topBox = document.getElementById('top-grid')
  const featBox = document.getElementById('feat-grid')
  if(topBox) topBox.innerHTML = ''
  if(featBox) featBox.innerHTML = ''
  
  const productsSection = document.getElementById('products')
  if(productsSection) productsSection.scrollIntoView({behavior:'smooth'})
  
  const msg = currentLang==='ar'?'نتيجة':'results'
  showToast(`🔍 ${results.length} ${msg}`, true)
}

// ============================================================
// MAKE PRODUCTS AVAILABLE GLOBALLY
// ============================================================
window.PRODUCTS = PRODUCTS
