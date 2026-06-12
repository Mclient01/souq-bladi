// ============================================================
// سوق بلادي - Souq Bladi - Main App Functions
// ============================================================

// ============================================================
// SUPABASE CONFIG
// ============================================================
// يتم استيراد التكوين من ملف config.js المنفصل
// Configuration imported from config.js file
const SB_URL = typeof SUPABASE_URL !== 'undefined' ? SUPABASE_URL : 'https://rdsnxvksnlfvbslcbljn.supabase.co'
const SB_KEY = typeof SUPABASE_KEY !== 'undefined' ? SUPABASE_KEY : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkc254dmtzbmxmdmJzbGNibGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMzE5NTYsImV4cCI6MjA5NTgwNzk1Nn0.n481Gt0XOAFbF3pu46ql3EX9aQV2T73Ou5OjvvSHDD0'
const db = supabase.createClient(SB_URL, SB_KEY)

// ============================================================
// STATE
// ============================================================
let curSym = 'د.ت', curRate = 1, curCode = 'TND'
let currentLang = 'ar'
let selNetwork = 'TRC20'
const WALLETS = {TRC20:'TKjXzp9vF3mNwQ8cYhRfbT2eUsLdP7aKmX',ERC20:'0x4e9cA8d2F3b7A1dE5c6f8B0a3D9e2F7c4A1B8E5D',BEP20:'0x7f3A2b5C8d1E4F9a6B0c3D7e2F5a8B1C4D6E9F2'}

// ============================================================
// TRANSLATIONS
// ============================================================
const T = {
  ar:{dir:'rtl',search:'ابحث عن منتجات...',my_acc:'حسابي',wish:'المفضلة',cart:'السلة',add_cart:'🛒 أضف للسلة',free_ship:'✈️ شحن مجاني',checkout:'💳 إتمام الطلب',place_order:'✅ تأكيد الطلب',flash:'⚡ تخفيضات الفلاش',top:'🔥 الأكثر مبيعاً',feat:'⭐ منتجات مميزة',see_all:'عرض الكل ›',delivery:'📦 معلومات التوصيل',pay_method:'💳 طريقة الدفع',subtotal:'المجموع الفرعي',delivery_fee:'التوصيل',total:'الإجمالي',order_confirmed:'تم تأكيد طلبك!',continue:'متابعة التسوق 🛍️',track_order:'تتبع طلبك',help:'مساعدة',login:'تسجيل الدخول',register:'إنشاء حساب',logout:'تسجيل الخروج',pay_title:'💳 طرق الدفع المتاحة',banner_tag:'⚡ عروض الأسبوع',banner_title:'تسوّق بذكاء<br><span>وادفع بسهولة</span>',banner_sub:'أكثر من 50,000 منتج متاح<br>توصيل خلال 48 ساعة',banner_btn:'🛍️ تسوّق الآن',mn1t:'توصيل سريع',mn1s:'48 ساعة لكل ولايات تونس',mn2t:'إرجاع مجاني',mn2s:'خلال 7 أيام',mn3t:'دفع آمن',mn3s:'6 طرق دفع',mn4t:'عروض يومية',mn4s:'خصومات حتى 50%',cats:{all:'كل المنتجات',electronics:'إلكترونيات',fashion:'أزياء وملابس',home:'منزل وديكور',beauty:'جمال وعناية',sports:'رياضة',kids:'أطفال',cars:'سيارات',books:'كتب',tools:'أدوات'},fc2h:'خدمة العملاء',fc2a1:'مركز المساعدة',fc2a2:'تتبع طلبك',fc2a3:'الإرجاع والاستبدال',fc2a4:'الضمان',fc3h:'طرق الدفع',fc4h:'تواصل معنا'},
  fr:{dir:'ltr',search:'Rechercher des produits...',my_acc:'Mon compte',wish:'Favoris',cart:'Panier',add_cart:'🛒 Ajouter',free_ship:'✈️ Livraison gratuite',checkout:'💳 Commander',place_order:'✅ Confirmer',flash:'⚡ Ventes Flash',top:'🔥 Meilleures ventes',feat:'⭐ Produits vedettes',see_all:'Voir tout ›',delivery:'📦 Livraison',pay_method:'💳 Paiement',subtotal:'Sous-total',delivery_fee:'Livraison',total:'Total',order_confirmed:'Commande confirmée!',continue:'Continuer les achats 🛍️',track_order:'Suivre commande',help:'Aide',login:'Se connecter',register:'Créer un compte',logout:'Se déconnecter',pay_title:'💳 Modes de paiement',banner_tag:'⚡ Offres de la semaine',banner_title:'Achetez intelligemment<br><span>Payez facilement</span>',banner_sub:'Plus de 50,000 produits<br>Livraison en 48h',banner_btn:'🛍️ Acheter maintenant',mn1t:'Livraison rapide',mn1s:'48h partout en Tunisie',mn2t:'Retour gratuit',mn2s:'7 jours sans conditions',mn3t:'Paiement sécurisé',mn3s:'6 modes de paiement',mn4t:'Offres du jour',mn4s:"Réductions jusqu'à 50%",cats:{all:'Tout',electronics:'Électronique',fashion:'Mode',home:'Maison',beauty:'Beauté',sports:'Sport',kids:'Enfants',cars:'Voitures',books:'Livres',tools:'Outils'},fc2h:'Service client',fc2a1:"Centre d'aide",fc2a2:'Suivre commande',fc2a3:'Retours et échanges',fc2a4:'Garantie',fc3h:'Modes de paiement',fc4h:'Nous contacter'},
  en:{dir:'ltr',search:'Search products...',my_acc:'My Account',wish:'Wishlist',cart:'Cart',add_cart:'🛒 Add to Cart',free_ship:'✈️ Free Shipping',checkout:'💳 Checkout',place_order:'✅ Place Order',flash:'⚡ Flash Sale',top:'🔥 Best Sellers',feat:'⭐ Featured',see_all:'See all ›',delivery:'📦 Delivery Info',pay_method:'💳 Payment',subtotal:'Subtotal',delivery_fee:'Delivery',total:'Total',order_confirmed:'Order Confirmed!',continue:'Continue Shopping 🛍️',track_order:'Track Order',help:'Help',login:'Sign In',register:'Create Account',logout:'Sign Out',pay_title:'💳 Available Payment Methods',banner_tag:'⚡ Weekly Deals',banner_title:'Shop Smart<br><span>Pay Easy</span>',banner_sub:'Over 50,000 products<br>Delivery in 48h',banner_btn:'🛍️ Shop Now',mn1t:'Fast Delivery',mn1s:'48h across Tunisia',mn2t:'Free Returns',mn2s:'7 days no questions',mn3t:'Secure Payment',mn3s:'6 payment methods',mn4t:'Daily Deals',mn4s:'Discounts up to 50%',cats:{all:'All',electronics:'Electronics',fashion:'Fashion',home:'Home',beauty:'Beauty',sports:'Sports',kids:'Kids',cars:'Cars',books:'Books',tools:'Tools'},fc2h:'Customer Service',fc2a1:'Help Center',fc2a2:'Track Your Order',fc2a3:'Returns & Exchanges',fc2a4:'Warranty',fc3h:'Payment Methods',fc4h:'Contact Us'},
  de:{dir:'ltr',search:'Produkte suchen...',my_acc:'Mein Konto',wish:'Wunschliste',cart:'Warenkorb',add_cart:'🛒 In den Warenkorb',free_ship:'✈️ Kostenloser Versand',checkout:'💳 Zur Kasse',place_order:'✅ Bestellen',flash:'⚡ Flash Sale',top:'🔥 Bestseller',feat:'⭐ Empfohlen',see_all:'Alle anzeigen ›',delivery:'📦 Lieferung',pay_method:'💳 Zahlung',subtotal:'Zwischensumme',delivery_fee:'Versand',total:'Gesamt',order_confirmed:'Bestellung bestätigt!',continue:'Weiter einkaufen 🛍️',track_order:'Bestellung verfolgen',help:'Hilfe',login:'Anmelden',register:'Konto erstellen',logout:'Abmelden',pay_title:'💳 Zahlungsmethoden',banner_tag:'⚡ Wochenangebote',banner_title:'Klug einkaufen<br><span>Einfach zahlen</span>',banner_sub:'Über 50.000 Produkte<br>Lieferung in 48h',banner_btn:'🛍️ Jetzt kaufen',mn1t:'Schnelle Lieferung',mn1s:'48h in ganz Tunesien',mn2t:'Kostenlose Rücksendung',mn2s:'7 Tage ohne Bedingungen',mn3t:'Sicheres Bezahlen',mn3s:'6 Zahlungsmethoden',mn4t:'Tagesangebote',mn4s:'Rabatte bis zu 50%',cats:{all:'Alle',electronics:'Elektronik',fashion:'Mode',home:'Haus',beauty:'Schönheit',sports:'Sport',kids:'Kinder',cars:'Autos',books:'Bücher',tools:'Werkzeug'},fc2h:'Kundendienst',fc2a1:'Hilfezentrum',fc2a2:'Bestellung verfolgen',fc2a3:'Rücksendungen',fc2a4:'Garantie',fc3h:'Zahlungsmethoden',fc4h:'Kontakt'},
  es:{dir:'ltr',search:'Buscar productos...',my_acc:'Mi cuenta',wish:'Favoritos',cart:'Carrito',add_cart:'🛒 Añadir',free_ship:'✈️ Envío gratis',checkout:'💳 Pagar',place_order:'✅ Hacer pedido',flash:'⚡ Ofertas Flash',top:'🔥 Más vendidos',feat:'⭐ Destacados',see_all:'Ver todo ›',delivery:'📦 Entrega',pay_method:'💳 Pago',subtotal:'Subtotal',delivery_fee:'Envío',total:'Total',order_confirmed:'¡Pedido confirmado!',continue:'Seguir comprando 🛍️',track_order:'Rastrear pedido',help:'Ayuda',login:'Iniciar sesión',register:'Crear cuenta',logout:'Cerrar sesión',pay_title:'💳 Métodos de pago',banner_tag:'⚡ Ofertas de la semana',banner_title:'Compra inteligente<br><span>Paga fácilmente</span>',banner_sub:'Más de 50,000 productos<br>Entrega en 48h',banner_btn:'🛍️ Comprar ahora',mn1t:'Entrega rápida',mn1s:'48h en toda Túnez',mn2t:'Devolución gratuita',mn2s:'7 días sin condiciones',mn3t:'Pago seguro',mn3s:'6 métodos de pago',mn4t:'Ofertas del día',mn4s:'Descuentos hasta 50%',cats:{all:'Todo',electronics:'Electrónica',fashion:'Moda',home:'Hogar',beauty:'Belleza',sports:'Deporte',kids:'Niños',cars:'Coches',books:'Libros',tools:'Herramientas'},fc2h:'Servicio al cliente',fc2a1:'Centro de ayuda',fc2a2:'Rastrear pedido',fc2a3:'Devoluciones',fc2a4:'Garantía',fc3h:'Métodos de pago',fc4h:'Contáctenos'},
  tr:{dir:'ltr',search:'Ürün ara...',my_acc:'Hesabım',wish:'Favoriler',cart:'Sepet',add_cart:'🛒 Sepete Ekle',free_ship:'✈️ Ücretsiz Kargo',checkout:'💳 Ödeme',place_order:'✅ Siparişi onayla',flash:'⚡ Flaş İndirim',top:'🔥 Çok Satanlar',feat:'⭐ Öne Çıkanlar',see_all:'Tümünü gör ›',delivery:'📦 Teslimat',pay_method:'💳 Ödeme',subtotal:'Ara toplam',delivery_fee:'Kargo',total:'Toplam',order_confirmed:'Sipariş onaylandı!',continue:'Alışverişe devam 🛍️',track_order:'Siparişi takip et',help:'Yardım',login:'Giriş yap',register:'Hesap oluştur',logout:'Çıkış yap',pay_title:'💳 Mevcut ödeme yöntemleri',banner_tag:'⚡ Haftalık fırsatlar',banner_title:'Akıllıca alışveriş<br><span>Kolay ödeme</span>',banner_sub:'50.000+ ürün mevcut<br>48 saatte teslimat',banner_btn:'🛍️ Alışverişe başla',mn1t:'Hızlı teslimat',mn1s:'Tunus genelinde 48 saatte',mn2t:'Ücretsiz iade',mn2s:'7 gün şartsız',mn3t:'Güvenli ödeme',mn3s:'6 ödeme yöntemi',mn4t:'Günlük fırsatlar',mn4s:'%50 indirim',cats:{all:'Hepsi',electronics:'Elektronik',fashion:'Moda',home:'Ev',beauty:'Güzellik',sports:'Spor',kids:'Çocuk',cars:'Araba',books:'Kitap',tools:'Araçlar'},fc2h:'Müşteri hizmetleri',fc2a1:'Yardım merkezi',fc2a2:'Siparişi takip et',fc2a3:'İadeler',fc2a4:'Garanti',fc3h:'Ödeme yöntemleri',fc4h:'Bize ulaşın'},
  ru:{dir:'ltr',search:'Поиск товаров...',my_acc:'Мой аккаунт',wish:'Избранное',cart:'Корзина',add_cart:'🛒 В корзину',free_ship:'✈️ Бесплатная доставка',checkout:'💳 Оформить заказ',place_order:'✅ Подтвердить',flash:'⚡ Флэш-продажа',top:'🔥 Хиты продаж',feat:'⭐ Рекомендуем',see_all:'Смотреть все ›',delivery:'📦 Доставка',pay_method:'💳 Оплата',subtotal:'Промежуточный итог',delivery_fee:'Доставка',total:'Итого',order_confirmed:'Заказ подтверждён!',continue:'Продолжить покупки 🛍️',track_order:'Отследить заказ',help:'Помощь',login:'Войти',register:'Создать аккаунт',logout:'Выйти',pay_title:'💳 Способы оплаты',banner_tag:'⚡ Предложения недели',banner_title:'Покупайте умно<br><span>Платите легко</span>',banner_sub:'Более 50,000 товаров<br>Доставка за 48 часов',banner_btn:'🛍️ Купить сейчас',mn1t:'Быстрая доставка',mn1s:'48ч по всему Тунису',mn2t:'Бесплатный возврат',mn2s:'7 дней без условий',mn3t:'Безопасная оплата',mn3s:'6 способов оплаты',mn4t:'Ежедневные акции',mn4s:'Скидки до 50%',cats:{all:'Все',electronics:'Электроника',fashion:'Мода',home:'Дом',beauty:'Красота',sports:'Спорт',kids:'Дети',cars:'Авто',books:'Книги',tools:'Инструменты'},fc2h:'Служба поддержки',fc2a1:'Центр помощи',fc2a2:'Отследить заказ',fc2a3:'Возврат',fc2a4:'Гарантия',fc3h:'Способы оплаты',fc4h:'Контакты'},
  zh:{dir:'ltr',search:'搜索产品...',my_acc:'我的账户',wish:'收藏夹',cart:'购物车',add_cart:'🛒 加入购物车',free_ship:'✈️ 免费配送',checkout:'💳 结账',place_order:'✅ 下订单',flash:'⚡ 限时特卖',top:'🔥 热销产品',feat:'⭐ 精选',see_all:'查看全部 ›',delivery:'📦 配送信息',pay_method:'💳 支付方式',subtotal:'小计',delivery_fee:'配送费',total:'总计',order_confirmed:'订单已确认!',continue:'继续购物 🛍️',track_order:'追踪订单',help:'帮助',login:'登录',register:'创建账户',logout:'退出',pay_title:'💳 可用支付方式',banner_tag:'⚡ 本周特惠',banner_title:'智慧购物<br><span>轻松付款</span>',banner_sub:'超过50,000种产品<br>48小时送达',banner_btn:'🛍️ 立即购买',mn1t:'快速配送',mn1s:'48小时全国配送',mn2t:'免费退货',mn2s:'7天无条件退货',mn3t:'安全支付',mn3s:'6种支付方式',mn4t:'每日优惠',mn4s:'折扣高达50%',cats:{all:'全部',electronics:'电子',fashion:'时尚',home:'家居',beauty:'美妆',sports:'运动',kids:'儿童',cars:'汽车',books:'书籍',tools:'工具'},fc2h:'客户服务',fc2a1:'帮助中心',fc2a2:'追踪订单',fc2a3:'退换货',fc2a4:'保修',fc3h:'支付方式',fc4h:'联系我们'},
}

// ============================================================
// REGIONS
// ============================================================
const REGIONS = {TN:['تونس العاصمة','أريانة','بن عروس','منوبة','نابل','زغوان','بنزرت','باجة','جندوبة','الكاف','سليانة','سوسة','المنستير','المهدية','صفاقس','القيروان','القصرين','سيدي بوزيد','قابس','مدنين','تطاوين','قفصة','توزر','قبلي'],DZ:['الجزائر العاصمة','وهران','قسنطينة','عنابة','باتنة','بجاية'],MA:['الرباط','الدار البيضاء','مراكش','فاس','أكادير'],EG:['القاهرة','الإسكندرية','الجيزة','أسوان'],SA:['الرياض','جدة','مكة المكرمة','الدمام'],AE:['أبوظبي','دبي','الشارقة'],FR:['باريس','مرسيليا','ليون','تولوز'],DE:['برلين','هامبورغ','ميونيخ'],GB:['لندن','مانشستر','برمنغهام'],TR:['أنقرة','إسطنبول','إزمير'],US:['نيويورك','لوس أنجلوس','شيكاغو'],CA:['تورنتو','مونتريال','فانكوفر'],IN:['مومباي','دلهي','بنغالور'],CN:['بكين','شنغهاي','قوانغتشو'],AU:['سيدني','ملبورن','بريزبين'],DEFAULT:['المنطقة الرئيسية','منطقة أخرى']}

function updateRegions(code) {
  const sel = document.getElementById('f-gov')
  if (!sel) return
  const regions = REGIONS[code] || REGIONS.DEFAULT
  sel.innerHTML = regions.map(r => `<option>${r}</option>`).join('')
}

// ============================================================
// FORMAT PRICE
// ============================================================
function fmt(tnd) {
  const v = tnd * curRate
  if(curCode === 'TND') return `${tnd} ${curSym}`
  if(v >= 10000) return `${Math.round(v).toLocaleString()} ${curSym}`
  if(v < 0.001) return `${v.toFixed(6)} ${curSym}`
  if(v < 1) return `${v.toFixed(3)} ${curSym}`
  return `${v.toFixed(2)} ${curSym}`
}

// ============================================================
// CHANGE LANGUAGE — FULL TRANSLATION
// ============================================================
function changeLang(lang) {
  currentLang = lang
  const t = T[lang] || T.ar
  
  // Direction
  document.documentElement.dir = t.dir
  document.body.dir = t.dir
  
  // Topbar
  const tbHelp = document.getElementById('tb-help')
  const tbTrack = document.getElementById('tb-track')
  if(tbHelp) tbHelp.textContent = t.help
  if(tbTrack) tbTrack.textContent = t.track_order
  
  // Header
  const searchInp = document.getElementById('search-inp')
  const hbtnAcc = document.getElementById('hbtn-acc')
  const hbtnWish = document.getElementById('hbtn-wish')
  const hbtnCart = document.getElementById('hbtn-cart')
  if(searchInp) searchInp.placeholder = t.search
  if(hbtnAcc) hbtnAcc.textContent = t.my_acc
  if(hbtnWish) hbtnWish.textContent = t.wish
  if(hbtnCart) hbtnCart.textContent = t.cart
  
  // Nav
  const navLinks = document.querySelectorAll('#main-nav a')
  const navCats = ['all','electronics','fashion','home','beauty','sports','kids','cars','books','all']
  navLinks.forEach((a,i) => {
    const k = navCats[i]
    if(k && t.cats[k]) a.textContent = (i===0?'🏠 ':i===1?'📱 ':i===2?'👗 ':i===3?'🏠 ':i===4?'💄 ':i===5?'⚽ ':i===6?'🧸 ':i===7?'🚗 ':i===8?'📚 ':'🔥 ') + t.cats[k]
  })
  
  // Sidebar categories
  document.querySelectorAll('.cat-name').forEach(el => {
    const k = el.dataset.key
    if(k && t.cats[k]) el.textContent = t.cats[k]
  })
  
  // Banner
  const bTag = document.getElementById('b-tag')
  const bTitle = document.getElementById('b-title')
  const bSub = document.getElementById('b-sub')
  const bBtn = document.getElementById('b-btn')
  if(bTag) bTag.innerHTML = t.banner_tag
  if(bTitle) bTitle.innerHTML = t.banner_title
  if(bSub) bSub.innerHTML = t.banner_sub
  if(bBtn) bBtn.textContent = t.banner_btn
  
  // Mini banners
  const mnT1 = document.getElementById('mn-t1')
  const mnS1 = document.getElementById('mn-s1')
  const mnT2 = document.getElementById('mn-t2')
  const mnS2 = document.getElementById('mn-s2')
  const mnT3 = document.getElementById('mn-t3')
  const mnS3 = document.getElementById('mn-s3')
  const mnT4 = document.getElementById('mn-t4')
  const mnS4 = document.getElementById('mn-s4')
  if(mnT1) mnT1.textContent = t.mn1t
  if(mnS1) mnS1.textContent = t.mn1s
  if(mnT2) mnT2.textContent = t.mn2t
  if(mnS2) mnS2.textContent = t.mn2s
  if(mnT3) mnT3.textContent = t.mn3t
  if(mnS3) mnS3.textContent = t.mn3s
  if(mnT4) mnT4.textContent = t.mn4t
  if(mnS4) mnS4.textContent = t.mn4s
  
  // Section titles
  const paySecTitle = document.getElementById('pay-sec-title')
  const flashTitle = document.getElementById('flash-title')
  const topTitle = document.getElementById('top-title')
  const featTitle = document.getElementById('feat-title')
  const seeAll1 = document.getElementById('see-all-1')
  const seeAll2 = document.getElementById('see-all-2')
  const seeAll3 = document.getElementById('see-all-3')
  if(paySecTitle) paySecTitle.textContent = t.pay_title
  if(flashTitle) flashTitle.textContent = t.flash
  if(topTitle) topTitle.textContent = t.top
  if(featTitle) featTitle.textContent = t.feat
  if(seeAll1) seeAll1.textContent = t.see_all
  if(seeAll2) seeAll2.textContent = t.see_all
  if(seeAll3) seeAll3.textContent = t.see_all
  
  // Footer
  const fc2h = document.getElementById('fc2-h')
  const fc2a1 = document.getElementById('fc2-a1')
  const fc2a2 = document.getElementById('fc2-a2')
  const fc2a3 = document.getElementById('fc2-a3')
  const fc2a4 = document.getElementById('fc2-a4')
  const fc3h = document.getElementById('fc3-h')
  const fc4h = document.getElementById('fc4-h')
  if(fc2h) fc2h.textContent = t.fc2h
  if(fc2a1) fc2a1.textContent = t.fc2a1
  if(fc2a2) fc2a2.textContent = t.fc2a2
  if(fc2a3) fc2a3.textContent = t.fc2a3
  if(fc2a4) fc2a4.textContent = t.fc2a4
  if(fc3h) fc3h.textContent = t.fc3h
  if(fc4h) fc4h.textContent = t.fc4h
  
  // Checkout
  const coTitle = document.getElementById('co-title')
  const coDeliveryLbl = document.getElementById('co-delivery-lbl')
  const coFname = document.getElementById('co-fname')
  const coPayLbl = document.getElementById('co-pay-lbl')
  const osSubLbl = document.getElementById('os-sub-lbl')
  const osDelLbl = document.getElementById('os-del-lbl')
  const osTotLbl = document.getElementById('os-tot-lbl')
  const placeBtn = document.getElementById('place-btn')
  const checkoutBtn = document.getElementById('checkout-btn')
  if(coTitle) coTitle.textContent = '🛍️ ' + (lang==='ar'?'إتمام الطلب':t.checkout.replace('💳 ',''))
  if(coDeliveryLbl) coDeliveryLbl.textContent = t.delivery
  if(coFname) coFname.textContent = lang==='ar'?'الاسم الأول *':lang==='fr'?'Prénom *':'First Name *'
  if(coPayLbl) coPayLbl.textContent = t.pay_method
  if(osSubLbl) osSubLbl.textContent = t.subtotal
  if(osDelLbl) osDelLbl.textContent = t.delivery_fee
  if(osTotLbl) osTotLbl.textContent = t.total
  if(placeBtn) placeBtn.textContent = t.place_order
  if(checkoutBtn) checkoutBtn.textContent = t.checkout
  
  // Cart
  const cartTitle = document.getElementById('cart-title')
  const csSubLbl = document.getElementById('cs-sub-lbl')
  const csDelLbl = document.getElementById('cs-del-lbl')
  const csTotLbl = document.getElementById('cs-tot-lbl')
  if(cartTitle) cartTitle.textContent = '🛒 ' + t.cart
  if(csSubLbl) csSubLbl.textContent = t.subtotal
  if(csDelLbl) csDelLbl.textContent = t.delivery_fee
  if(csTotLbl) csTotLbl.textContent = t.total
  
  // Success
  const sTitle = document.getElementById('s-title')
  const sCloseBtn = document.getElementById('s-close-btn')
  if(sTitle) sTitle.textContent = t.order_confirmed
  if(sCloseBtn) sCloseBtn.textContent = t.continue
  
  // Re-render products if renderProducts function exists
  if(typeof renderProducts === 'function') {
    const PRODUCTS = window.PRODUCTS || []
    renderProducts(PRODUCTS.slice(0,8), 'flash-grid')
    renderProducts(PRODUCTS.slice(8,16), 'top-grid')
    renderProducts([...PRODUCTS].sort((a,b)=>b.rating-a.rating).slice(0,8), 'feat-grid')
  }
  
  // Re-render cart and wishlist if functions exist
  if(typeof renderCart === 'function') renderCart()
  if(typeof renderWishlist === 'function') renderWishlist()
  
  showToast('🌐 ' + document.getElementById('lang-sel').options[document.getElementById('lang-sel').selectedIndex].text, true)
}

// ============================================================
// CURRENCY
// ============================================================
function changeCurrency(sel) {
  const [code, sym, rate] = sel.value.split('|')
  curCode = code; curSym = sym; curRate = parseFloat(rate)
  const rateDisplay = curCode === 'TND' ? `🇹🇳 1 د.ت = 1 د.ت` : `1 د.ت = ${curRate < 0.01 ? curRate.toFixed(5) : curRate.toFixed(3)} ${curSym}`
  const rateDisplayEl = document.getElementById('rate-display')
  if(rateDisplayEl) rateDisplayEl.textContent = rateDisplay
  
  // Re-render products if function exists
  if(typeof renderProducts === 'function') {
    const PRODUCTS = window.PRODUCTS || []
    renderProducts(PRODUCTS.slice(0,8), 'flash-grid')
    renderProducts(PRODUCTS.slice(8,16), 'top-grid')
    renderProducts([...PRODUCTS].sort((a,b)=>b.rating-a.rating).slice(0,8), 'feat-grid')
  }
  
  // Re-render cart if function exists
  if(typeof renderCart === 'function') renderCart()
  
  showToast('💱 ' + sel.options[sel.selectedIndex].text, true)
}

// ============================================================
// MODALS
// ============================================================
function openModal(id) { 
  const el = document.getElementById(id)
  if(el) el.classList.add('open') 
}
function closeModal(id) { 
  const el = document.getElementById(id)
  if(el) el.classList.remove('open') 
}
document.addEventListener('click', e => { 
  if(e.target.classList.contains('modal-bg')) e.target.classList.remove('open') 
})

// ============================================================
// FAQ
// ============================================================
function toggleFaq(el) {
  const ans = el.nextElementSibling
  const isOpen = ans.classList.contains('open')
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'))
  document.querySelectorAll('.faq-q span:last-child').forEach(s => s.textContent='▼')
  if(!isOpen) { ans.classList.add('open'); el.querySelector('span:last-child').textContent='▲' }
}

// ============================================================
// PAYMENT CARD SELECTION
// ============================================================
function selPayCard(el) {
  document.querySelectorAll('.pay-card').forEach(c=>c.classList.remove('sel'))
  el.classList.add('sel')
}

// ============================================================
// TOAST
// ============================================================
let toastT
function showToast(msg, green=false) {
  const t = document.getElementById('toast')
  if(!t) return
  t.textContent = msg
  t.className = 'toast show' + (green?' green':'')
  clearTimeout(toastT)
  toastT = setTimeout(()=>t.classList.remove('show'), 2800)
}

// ============================================================
// COUNTDOWN
// ============================================================
let secs = 5*3600+23*60+41
setInterval(()=>{
  secs--; if(secs<0) secs=6*3600
  const h=Math.floor(secs/3600), m=Math.floor((secs%3600)/60), s=secs%60
  const pad=n=>String(n).padStart(2,'0')
  const cdH = document.getElementById('cd-h')
  const cdM = document.getElementById('cd-m')
  const cdS = document.getElementById('cd-s')
  if(cdH) cdH.textContent=pad(h)
  if(cdM) cdM.textContent=pad(m)
  if(cdS) cdS.textContent=pad(s)
},1000)

// ============================================================
// COPY TEXT
// ============================================================
function copyText(t) { 
  navigator.clipboard.writeText(t).then(()=>showToast('📋 Copied!',true)) 
}
