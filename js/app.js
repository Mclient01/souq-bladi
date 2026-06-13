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
const db = typeof supabase !== 'undefined' && supabase.createClient ? supabase.createClient(SB_URL, SB_KEY) : null

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
  ar:{dir:'rtl',logo_text1:'سوق',logo_text2:'بلادي',tb_delivery:'🇹🇳 توصيل لجميع ولايات تونس | خدمة 24/7',search:'ابحث عن منتجات...',my_acc:'حسابي',wish:'المفضلة',cart:'السلة',add_cart:'🛒 أضف للسلة',free_ship:'✈️ شحن مجاني',checkout:'💳 إتمام الطلب',place_order:'✅ تأكيد الطلب',flash:'⚡ تخفيضات الفلاش',top:'🔥 الأكثر مبيعاً',feat:'⭐ منتجات مميزة',see_all:'عرض الكل ›',delivery:'📦 معلومات التوصيل',pay_method:'💳 طريقة الدفع',subtotal:'المجموع الفرعي',delivery_fee:'التوصيل',total:'الإجمالي',order_confirmed:'تم تأكيد طلبك!',continue:'متابعة التسوق 🛍️',track_order:'تتبع طلبك',help:'مساعدة',login:'تسجيل الدخول',register:'إنشاء حساب',logout:'تسجيل الخروج',pay_title:'💳 طرق الدفع المتاحة',banner_tag:'⚡ عروض الأسبوع',banner_title:'تسوّق بذكاء<br><span>وادفع بسهولة</span>',banner_sub:'أكثر من 50,000 منتج متاح<br>توصيل خلال 48 ساعة',banner_btn:'🛍️ تسوّق الآن',mn1t:'توصيل سريع',mn1s:'48 ساعة لكل ولايات تونس',mn2t:'إرجاع مجاني',mn2s:'خلال 7 أيام',mn3t:'دفع آمن',mn3s:'6 طرق دفع',mn4t:'عروض يومية',mn4s:'خصومات حتى 50%',cats:{all:'كل المنتجات',electronics:'إلكترونيات',fashion:'أزياء وملابس',home:'منزل وديكور',beauty:'جمال وعناية',sports:'رياضة',kids:'أطفال',cars:'سيارات',books:'كتب',tools:'أدوات'},fc1a1:'عن الموقع',fc1a2:'بِع معنا',fc1a3:'وظائف',fc1a4:'اتصل بنا',fc2h:'خدمة العملاء',fc2a1:'مركز المساعدة',fc2a2:'تتبع طلبك',fc2a3:'الإرجاع والاستبدال',fc2a4:'الضمان',fc3h:'طرق الدفع',fc4h:'تواصل معنا',footer_copy:'© 2025 سوق بلادي',or:'أو',google_login:'الدخول بـ Google',google_reg:'التسجيل بـ Google',full_name:'الاسم الكامل',sabflous:'صبفلوس',tunisie_post:'بريد تونس',facebook:'فيسبوك',instagram:'إنستغرام',whatsapp:'واتساب',tiktok:'تيكتوك',admin:'⚙️ إدارة',help_title:'💬 مركز المساعدة',help_cat1:'الطلبات والشحن',help_cat2:'طرق الدفع',help_cat3:'الإرجاع والاستبدال',help_cat4:'تواصل معنا',faq_title:'❓ الأسئلة الشائعة',faq_q1:'كم يستغرق التوصيل؟',faq_a1:'التوصيل يستغرق 24-48 ساعة لجميع ولايات تونس.',faq_q2:'كيف أدفع بـ D17؟',faq_a2:'بعد تأكيد الطلب يظهر رقم D17 — افتح التطبيق وأرسل المبلغ ثم أرسل الإثبات على واتساب.',faq_q3:'هل يمكن الإرجاع؟',faq_a3:'نعم! خلال 7 أيام من الاستلام إذا كان المنتج معيباً.',faq_q4:'كيف أتتبع طلبي؟',faq_a4:'انقر على "تتبع طلبك" وأدخل رقم الطلب الذي وصلك برسالة SMS.',wa_btn:'💬 تواصل معنا على واتساب'},track_title:'📦 تتبع طلبك',track_desc:'أدخل رقم طلبك لمتابعة حالته',track_btn:'🔍 تتبع',wish_title:'❤️ المفضلة',co_title:'🛍️ إتمام الطلب',co_delivery_lbl:'📦 معلومات التوصيل',co_fname:'الاسم الأول *',co_lname:'اللقب',co_phone:'رقم الهاتف *',co_country_lbl:'البلد *',co_region_lbl:'الولاية / المنطقة *',co_addr_lbl:'العنوان *',co_pay_lbl:'💳 طريقة الدفع',cod_label:'الدفع عند الاستلام',cod_sub:'ادفع نقداً عند وصول الطلب',acc_modal_title:'👤 حسابي',tab_login_btn:'تسجيل الدخول',tab_reg_btn:'إنشاء حساب',login_btn:'تسجيل الدخول',acc_or:'أو',acc_google_login:'الدخول بـ Google',reg_btn:'إنشاء حساب مجاني',acc_google_reg:'التسجيل بـ Google',logout_btn:'🚪 تسجيل الخروج'},
  fr:{dir:'ltr',logo_text1:'Souq',logo_text2:'Bladi',tb_delivery:'🇹🇳 Livraison dans tous les gouvernorats de Tunisie | Service 24/7',search:'Rechercher des produits...',my_acc:'Mon compte',wish:'Favoris',cart:'Panier',add_cart:'🛒 Ajouter',free_ship:'✈️ Livraison gratuite',checkout:'💳 Commander',place_order:'✅ Confirmer',flash:'⚡ Ventes Flash',top:'🔥 Meilleures ventes',feat:'⭐ Produits vedettes',see_all:'Voir tout ›',delivery:'📦 Livraison',pay_method:'💳 Paiement',subtotal:'Sous-total',delivery_fee:'Livraison',total:'Total',order_confirmed:'Commande confirmée!',continue:'Continuer les achats 🛍️',track_order:'Suivre commande',help:'Aide',login:'Se connecter',register:'Créer un compte',logout:'Se déconnecter',pay_title:'💳 Modes de paiement',banner_tag:'⚡ Offres de la semaine',banner_title:'Achetez intelligemment<br><span>Payez facilement</span>',banner_sub:'Plus de 50,000 produits<br>Livraison en 48h',banner_btn:'🛍️ Acheter maintenant',mn1t:'Livraison rapide',mn1s:'48h partout en Tunisie',mn2t:'Retour gratuit',mn2s:'7 jours sans conditions',mn3t:'Paiement sécurisé',mn3s:'6 modes de paiement',mn4t:'Offres du jour',mn4s:"Réductions jusqu'à 50%",cats:{all:'Tout',electronics:'Électronique',fashion:'Mode',home:'Maison',beauty:'Beauté',sports:'Sport',kids:'Enfants',cars:'Voitures',books:'Livres',tools:'Outils'},fc1a1:'À propos',fc1a2:'Vendre avec nous',fc1a3:'Emplois',fc1a4:'Contact',fc2h:'Service client',fc2a1:"Centre d'aide",fc2a2:'Suivre commande',fc2a3:'Retours et échanges',fc2a4:'Garantie',fc3h:'Modes de paiement',fc4h:'Nous contacter',footer_copy:'© 2025 Souq Bladi',or:'Ou',google_login:'Se connecter avec Google',google_reg:'S\'inscrire avec Google',full_name:'Nom complet',sabflous:'Sabflous',tunisie_post:'Tunisie Post',facebook:'Facebook',instagram:'Instagram',whatsapp:'WhatsApp',tiktok:'TikTok',admin:'⚙️ Admin',help_title:'💬 Centre d\'aide',help_cat1:'Commandes et livraison',help_cat2:'Modes de paiement',help_cat3:'Retours et échanges',help_cat4:'Contactez-nous',faq_title:'❓ Questions fréquentes',faq_q1:'Combien de temps prend la livraison?',faq_a1:'La livraison prend 24-48h dans toute la Tunisie.',faq_q2:'Comment payer avec D17?',faq_a2:'Après confirmation, le numéro D17 apparaît — ouvrez l\'appli, envoyez le montant puis envoyez la preuve sur WhatsApp.',faq_q3:'Le retour est-il possible?',faq_a3:'Oui! Dans les 7 jours après réception si le produit est défectueux.',faq_q4:'Comment suivre ma commande?',faq_a4:'Cliquez sur "Suivre commande" et entrez le numéro de commande reçu par SMS.',wa_btn:'💬 Contactez-nous sur WhatsApp',track_title:'📦 Suivre commande',track_desc:'Entrez votre numéro de commande pour suivre son statut',track_btn:'🔍 Suivre',wish_title:'❤️ Favoris',co_title:'🛍️ Commander',co_delivery_lbl:'📦 Informations de livraison',co_fname:'Prénom *',co_lname:'Nom',co_phone:'Téléphone *',co_country_lbl:'Pays *',co_region_lbl:'État / Région *',co_addr_lbl:'Adresse *',co_pay_lbl:'💳 Mode de paiement',cod_label:'Paiement à la livraison',cod_sub:'Payez en espèces à la réception',acc_modal_title:'👤 Mon compte',tab_login_btn:'Se connecter',tab_reg_btn:'Créer un compte',login_btn:'Se connecter',acc_or:'Ou',acc_google_login:'Se connecter avec Google',reg_btn:'Créer un compte gratuit',acc_google_reg:'S\'inscrire avec Google',logout_btn:'🚪 Se déconnecter'},
  en:{dir:'ltr',logo_text1:'Souq',logo_text2:'Bladi',tb_delivery:'🇹🇳 Delivery to all Tunisian governorates | 24/7 Service',search:'Search products...',my_acc:'My Account',wish:'Wishlist',cart:'Cart',add_cart:'🛒 Add to Cart',free_ship:'✈️ Free Shipping',checkout:'💳 Checkout',place_order:'✅ Place Order',flash:'⚡ Flash Sale',top:'🔥 Best Sellers',feat:'⭐ Featured',see_all:'See all ›',delivery:'📦 Delivery Info',pay_method:'💳 Payment',subtotal:'Subtotal',delivery_fee:'Delivery',total:'Total',order_confirmed:'Order Confirmed!',continue:'Continue Shopping 🛍️',track_order:'Track Order',help:'Help',login:'Sign In',register:'Create Account',logout:'Sign Out',pay_title:'💳 Available Payment Methods',banner_tag:'⚡ Weekly Deals',banner_title:'Shop Smart<br><span>Pay Easy</span>',banner_sub:'Over 50,000 products<br>Delivery in 48h',banner_btn:'🛍️ Shop Now',mn1t:'Fast Delivery',mn1s:'48h across Tunisia',mn2t:'Free Returns',mn2s:'7 days no questions',mn3t:'Secure Payment',mn3s:'6 payment methods',mn4t:'Daily Deals',mn4s:'Discounts up to 50%',cats:{all:'All',electronics:'Electronics',fashion:'Fashion',home:'Home',beauty:'Beauty',sports:'Sports',kids:'Kids',cars:'Cars',books:'Books',tools:'Tools'},fc1a1:'About Us',fc1a2:'Sell with Us',fc1a3:'Careers',fc1a4:'Contact',fc2h:'Customer Service',fc2a1:'Help Center',fc2a2:'Track Your Order',fc2a3:'Returns & Exchanges',fc2a4:'Warranty',fc3h:'Payment Methods',fc4h:'Contact Us',footer_copy:'© 2025 Souq Bladi',or:'Or',google_login:'Sign in with Google',google_reg:'Sign up with Google',full_name:'Full Name',sabflous:'Sabflous',tunisie_post:'Tunisie Post',facebook:'Facebook',instagram:'Instagram',whatsapp:'WhatsApp',tiktok:'TikTok',admin:'⚙️ Admin',help_title:'💬 Help Center',help_cat1:'Orders & Shipping',help_cat2:'Payment Methods',help_cat3:'Returns & Exchanges',help_cat4:'Contact Us',faq_title:'❓ FAQs',faq_q1:'How long does delivery take?',faq_a1:'Delivery takes 24-48h across Tunisia.',faq_q2:'How to pay with D17?',faq_a2:'After confirmation, D17 number appears — open the app, send the amount then send proof on WhatsApp.',faq_q3:'Is return possible?',faq_a3:'Yes! Within 7 days after receipt if product is defective.',faq_q4:'How to track my order?',faq_a4:'Click "Track Order" and enter the order number received via SMS.',wa_btn:'💬 Contact us on WhatsApp',track_title:'📦 Track Order',track_desc:'Enter your order number to track its status',track_btn:'🔍 Track',wish_title:'❤️ Wishlist',co_title:'🛍️ Checkout',co_delivery_lbl:'📦 Delivery Info',co_fname:'First Name *',co_lname:'Last Name',co_phone:'Phone *',co_country_lbl:'Country *',co_region_lbl:'State / Region *',co_addr_lbl:'Address *',co_pay_lbl:'💳 Payment Method',cod_label:'Cash on Delivery',cod_sub:'Pay cash upon delivery',acc_modal_title:'👤 My Account',tab_login_btn:'Sign In',tab_reg_btn:'Create Account',login_btn:'Sign In',acc_or:'Or',acc_google_login:'Sign in with Google',reg_btn:'Create free account',acc_google_reg:'Sign up with Google',logout_btn:'🚪 Sign Out'},
  de:{dir:'ltr',logo_text1:'Souq',logo_text2:'Bladi',tb_delivery:'🇹🇳 Lieferung in alle tunesischen Gouvernements | 24/7-Service',search:'Produkte suchen...',my_acc:'Mein Konto',wish:'Wunschliste',cart:'Warenkorb',add_cart:'🛒 In den Warenkorb',free_ship:'✈️ Kostenloser Versand',checkout:'💳 Zur Kasse',place_order:'✅ Bestellen',flash:'⚡ Flash Sale',top:'🔥 Bestseller',feat:'⭐ Empfohlen',see_all:'Alle anzeigen ›',delivery:'📦 Lieferung',pay_method:'💳 Zahlung',subtotal:'Zwischensumme',delivery_fee:'Versand',total:'Gesamt',order_confirmed:'Bestellung bestätigt!',continue:'Weiter einkaufen 🛍️',track_order:'Bestellung verfolgen',help:'Hilfe',login:'Anmelden',register:'Konto erstellen',logout:'Abmelden',pay_title:'💳 Zahlungsmethoden',banner_tag:'⚡ Wochenangebote',banner_title:'Klug einkaufen<br><span>Einfach zahlen</span>',banner_sub:'Über 50.000 Produkte<br>Lieferung in 48h',banner_btn:'🛍️ Jetzt kaufen',mn1t:'Schnelle Lieferung',mn1s:'48h in ganz Tunesien',mn2t:'Kostenlose Rücksendung',mn2s:'7 Tage ohne Bedingungen',mn3t:'Sicheres Bezahlen',mn3s:'6 Zahlungsmethoden',mn4t:'Tagesangebote',mn4s:'Rabatte bis zu 50%',cats:{all:'Alle',electronics:'Elektronik',fashion:'Mode',home:'Haus',beauty:'Schönheit',sports:'Sport',kids:'Kinder',cars:'Autos',books:'Bücher',tools:'Werkzeug'},fc1a1:'Über uns',fc1a2:'Verkaufen',fc1a3:'Jobs',fc1a4:'Kontakt',fc2h:'Kundendienst',fc2a1:'Hilfezentrum',fc2a2:'Bestellung verfolgen',fc2a3:'Rücksendungen',fc2a4:'Garantie',fc3h:'Zahlungsmethoden',fc4h:'Kontakt',footer_copy:'© 2025 Souq Bladi',or:'Oder',google_login:'Mit Google anmelden',google_reg:'Mit Google registrieren',full_name:'Vollständiger Name',sabflous:'Sabflous',tunisie_post:'Tunisie Post',facebook:'Facebook',instagram:'Instagram',whatsapp:'WhatsApp',tiktok:'TikTok',admin:'⚙️ Admin',help_title:'💬 Hilfezentrum',help_cat1:'Bestellungen & Versand',help_cat2:'Zahlungsmethoden',help_cat3:'Rücksendungen',help_cat4:'Kontakt',faq_title:'❓ Häufige Fragen',faq_q1:'Wie lange dauert die Lieferung?',faq_a1:'Die Lieferung dauert 24-48h in ganz Tunesien.',faq_q2:'Wie mit D17 bezahlen?',faq_a2:'Nach Bestätigung erscheint die D17-Nummer — öffnen Sie die App, senden Sie den Betrag und senden Sie den Nachweis per WhatsApp.',faq_q3:'Ist Rücksendung möglich?',faq_a3:'Ja! Innerhalb von 7 Tagen nach Erhalt wenn das Produkt defekt ist.',faq_q4:'Wie verfolge ich meine Bestellung?',faq_a4:'Klicken Sie auf "Bestellung verfolgen" und geben Sie die per SMS erhaltene Bestellnummer ein.',wa_btn:'💬 Kontaktieren Sie uns auf WhatsApp',track_title:'📦 Bestellung verfolgen',track_desc:'Geben Sie Ihre Bestellnummer ein, um den Status zu verfolgen',track_btn:'🔍 Verfolgen',wish_title:'❤️ Wunschliste',co_title:'🛍️ Zur Kasse',co_delivery_lbl:'📦 Lieferinformationen',co_fname:'Vorname *',co_lname:'Nachname',co_phone:'Telefon *',co_country_lbl:'Land *',co_region_lbl:'Bundesland / Region *',co_addr_lbl:'Adresse *',co_pay_lbl:'💳 Zahlungsmethode',cod_label:'Zahlung bei Lieferung',cod_sub:'Barzahlung bei Lieferung',acc_modal_title:'👤 Mein Konto',tab_login_btn:'Anmelden',tab_reg_btn:'Konto erstellen',login_btn:'Anmelden',acc_or:'Oder',acc_google_login:'Mit Google anmelden',reg_btn:'Kostenloses Konto erstellen',acc_google_reg:'Mit Google registrieren',logout_btn:'🚪 Abmelden'},
  es:{dir:'ltr',logo_text1:'Souq',logo_text2:'Bladi',tb_delivery:'🇹🇳 Entrega a todos los gobernadores de Túnez | Servicio 24/7',search:'Buscar productos...',my_acc:'Mi cuenta',wish:'Favoritos',cart:'Carrito',add_cart:'🛒 Añadir',free_ship:'✈️ Envío gratis',checkout:'💳 Pagar',place_order:'✅ Hacer pedido',flash:'⚡ Ofertas Flash',top:'🔥 Más vendidos',feat:'⭐ Destacados',see_all:'Ver todo ›',delivery:'📦 Entrega',pay_method:'💳 Pago',subtotal:'Subtotal',delivery_fee:'Envío',total:'Total',order_confirmed:'¡Pedido confirmado!',continue:'Seguir comprando 🛍️',track_order:'Rastrear pedido',help:'Ayuda',login:'Iniciar sesión',register:'Crear cuenta',logout:'Cerrar sesión',pay_title:'💳 Métodos de pago',banner_tag:'⚡ Ofertas de la semana',banner_title:'Compra inteligente<br><span>Paga fácilmente</span>',banner_sub:'Más de 50,000 productos<br>Entrega en 48h',banner_btn:'🛍️ Comprar ahora',mn1t:'Entrega rápida',mn1s:'48h en toda Túnez',mn2t:'Devolución gratuita',mn2s:'7 días sin condiciones',mn3t:'Pago seguro',mn3s:'6 métodos de pago',mn4t:'Ofertas del día',mn4s:'Descuentos hasta 50%',cats:{all:'Todo',electronics:'Electrónica',fashion:'Moda',home:'Hogar',beauty:'Belleza',sports:'Deporte',kids:'Niños',cars:'Coches',books:'Libros',tools:'Herramientas'},fc1a1:'Acerca de',fc1a2:'Vender',fc1a3:'Empleos',fc1a4:'Contacto',fc2h:'Servicio al cliente',fc2a1:'Centro de ayuda',fc2a2:'Rastrear pedido',fc2a3:'Devoluciones',fc2a4:'Garantía',fc3h:'Métodos de pago',fc4h:'Contáctenos',footer_copy:'© 2025 Souq Bladi',or:'O',google_login:'Iniciar sesión con Google',google_reg:'Registrarse con Google',full_name:'Nombre completo',sabflous:'Sabflous',tunisie_post:'Tunisie Post',facebook:'Facebook',instagram:'Instagram',whatsapp:'WhatsApp',tiktok:'TikTok',admin:'⚙️ Admin',help_title:'💬 Centro de ayuda',help_cat1:'Pedidos y envío',help_cat2:'Métodos de pago',help_cat3:'Devoluciones',help_cat4:'Contáctenos',faq_title:'❓ Preguntas frecuentes',faq_q1:'¿Cuánto tarda la entrega?',faq_a1:'La entrega tarda 24-48h en toda Túnez.',faq_q2:'¿Cómo pagar con D17?',faq_a2:'Tras la confirmación aparece el número D17 — abre la app, envía el monto y envía la prueba por WhatsApp.',faq_q3:'¿Es posible devolver?',faq_a3:'¡Sí! Dentro de 7 días tras la recepción si el producto está defectuoso.',faq_q4:'¿Cómo rastrear mi pedido?',faq_a4:'Haz clic en "Rastrear pedido" e introduce el número de pedido recibido por SMS.',wa_btn:'💬 Contáctanos en WhatsApp',track_title:'📦 Rastrear pedido',track_desc:'Introduce tu número de pedido para rastrear su estado',track_btn:'🔍 Rastrear',wish_title:'❤️ Favoritos',co_title:'🛍️ Pagar',co_delivery_lbl:'📦 Información de entrega',co_fname:'Nombre *',co_lname:'Apellido',co_phone:'Teléfono *',co_country_lbl:'País *',co_region_lbl:'Estado / Región *',co_addr_lbl:'Dirección *',co_pay_lbl:'💳 Método de pago',cod_label:'Pago contra entrega',cod_sub:'Paga en efectivo al recibir',acc_modal_title:'👤 Mi cuenta',tab_login_btn:'Iniciar sesión',tab_reg_btn:'Crear cuenta',login_btn:'Iniciar sesión',acc_or:'O',acc_google_login:'Iniciar sesión con Google',reg_btn:'Crear cuenta gratuita',acc_google_reg:'Registrarse con Google',logout_btn:'🚪 Cerrar sesión'},
  tr:{dir:'ltr',logo_text1:'Souq',logo_text2:'Bladi',tb_delivery:'🇹🇳 Tunus'un tüm vilayetlerine teslimat | 24/7 Hizmet',search:'Ürün ara...',my_acc:'Hesabım',wish:'Favoriler',cart:'Sepet',add_cart:'🛒 Sepete Ekle',free_ship:'✈️ Ücretsiz Kargo',checkout:'💳 Ödeme',place_order:'✅ Siparişi onayla',flash:'⚡ Flaş İndirim',top:'🔥 Çok Satanlar',feat:'⭐ Öne Çıkanlar',see_all:'Tümünü gör ›',delivery:'📦 Teslimat',pay_method:'💳 Ödeme',subtotal:'Ara toplam',delivery_fee:'Kargo',total:'Toplam',order_confirmed:'Sipariş onaylandı!',continue:'Alışverişe devam 🛍️',track_order:'Siparişi takip et',help:'Yardım',login:'Giriş yap',register:'Hesap oluştur',logout:'Çıkış yap',pay_title:'💳 Mevcut ödeme yöntemleri',banner_tag:'⚡ Haftalık fırsatlar',banner_title:'Akıllıca alışveriş<br><span>Kolay ödeme</span>',banner_sub:'50.000+ ürün mevcut<br>48 saatte teslimat',banner_btn:'🛍️ Alışverişe başla',mn1t:'Hızlı teslimat',mn1s:'Tunus genelinde 48 saatte',mn2t:'Ücretsiz iade',mn2s:'7 gün şartsız',mn3t:'Güvenli ödeme',mn3s:'6 ödeme yöntemi',mn4t:'Günlük fırsatlar',mn4s:'%50 indirim',cats:{all:'Hepsi',electronics:'Elektronik',fashion:'Moda',home:'Ev',beauty:'Güzellik',sports:'Spor',kids:'Çocuk',cars:'Araba',books:'Kitap',tools:'Araçlar'},fc1a1:'Hakkımızda',fc1a2:'Satış yap',fc1a3:'İşler',fc1a4:'İletişim',fc2h:'Müşteri hizmetleri',fc2a1:'Yardım merkezi',fc2a2:'Siparişi takip et',fc2a3:'İadeler',fc2a4:'Garanti',fc3h:'Ödeme yöntemleri',fc4h:'Bize ulaşın',footer_copy:'© 2025 Souq Bladi',or:'Veya',google_login:'Google ile giriş yap',google_reg:'Google ile kayıt ol',full_name:'Ad Soyad',sabflous:'Sabflous',tunisie_post:'Tunisie Post',facebook:'Facebook',instagram:'Instagram',whatsapp:'WhatsApp',tiktok:'TikTok',admin:'⚙️ Admin',help_title:'💬 Yardım merkezi',help_cat1:'Siparişler ve kargo',help_cat2:'Ödeme yöntemleri',help_cat3:'İadeler',help_cat4:'İletişim',faq_title:'❓ SSS',faq_q1:'Teslimat ne kadar sürer?',faq_a1:'Teslimat Tunus genelinde 24-48 saat sürer.',faq_q2:'D17 ile nasıl ödeme yaparım?',faq_a2:'Onaydan sonra D17 numarası görünür — uygulamayı açın, tutarı gönderin ve ardından WhatsApp üzerinden kanıt gönderin.',faq_q3:'İade mümkün mü?',faq_a3:'Evet! Ürün kusurluysa teslimattan sonra 7 gün içinde.',faq_q4:'Siparişimi nasıl takip ederim?',faq_a4:'"Siparişi takip et"e tıklayın ve SMS ile aldığınız sipariş numarasını girin.',wa_btn:'💬 WhatsApp üzerinden iletişime geçin',track_title:'📦 Siparişi takip et',track_desc:'Sipariş durumunu takip etmek için sipariş numaranızı girin',track_btn:'🔍 Takip et',wish_title:'❤️ Favoriler',co_title:'🛍️ Ödeme',co_delivery_lbl:'📦 Teslimat bilgileri',co_fname:'İsim *',co_lname:'Soyisim',co_phone:'Telefon *',co_country_lbl:'Ülke *',co_region_lbl:'Eyalet / Bölge *',co_addr_lbl:'Adres *',co_pay_lbl:'💳 Ödeme yöntemi',cod_label:'Kapıda ödeme',cod_sub:'Teslimatta nakit ödeyin',acc_modal_title:'👤 Hesabım',tab_login_btn:'Giriş yap',tab_reg_btn:'Hesap oluştur',login_btn:'Giriş yap',acc_or:'Veya',acc_google_login:'Google ile giriş yap',reg_btn:'Ücretsiz hesap oluştur',acc_google_reg:'Google ile kayıt ol',logout_btn:'🚪 Çıkış yap'},
  ru:{dir:'ltr',logo_text1:'Souq',logo_text2:'Bladi',tb_delivery:'🇹🇳 Доставка во все вилайеты Туниса | Служба 24/7',search:'Поиск товаров...',my_acc:'Мой аккаунт',wish:'Избранное',cart:'Корзина',add_cart:'🛒 В корзину',free_ship:'✈️ Бесплатная доставка',checkout:'💳 Оформить заказ',place_order:'✅ Подтвердить',flash:'⚡ Флэш-продажа',top:'🔥 Хиты продаж',feat:'⭐ Рекомендуем',see_all:'Смотреть все ›',delivery:'📦 Доставка',pay_method:'💳 Оплата',subtotal:'Промежуточный итог',delivery_fee:'Доставка',total:'Итого',order_confirmed:'Заказ подтверждён!',continue:'Продолжить покупки 🛍️',track_order:'Отследить заказ',help:'Помощь',login:'Войти',register:'Создать аккаунт',logout:'Выйти',pay_title:'💳 Способы оплаты',banner_tag:'⚡ Предложения недели',banner_title:'Покупайте умно<br><span>Платите легко</span>',banner_sub:'Более 50,000 товаров<br>Доставка за 48 часов',banner_btn:'🛍️ Купить сейчас',mn1t:'Быстрая доставка',mn1s:'48ч по всему Тунису',mn2t:'Бесплатный возврат',mn2s:'7 дней без условий',mn3t:'Безопасная оплата',mn3s:'6 способов оплаты',mn4t:'Ежедневные акции',mn4s:'Скидки до 50%',cats:{all:'Все',electronics:'Электроника',fashion:'Мода',home:'Дом',beauty:'Красота',sports:'Спорт',kids:'Дети',cars:'Авто',books:'Книги',tools:'Инструменты'},fc1a1:'О нас',fc1a2:'Продавать',fc1a3:'Вакансии',fc1a4:'Контакты',fc2h:'Служба поддержки',fc2a1:'Центр помощи',fc2a2:'Отследить заказ',fc2a3:'Возврат',fc2a4:'Гарантия',fc3h:'Способы оплаты',fc4h:'Контакты',footer_copy:'© 2025 Souq Bladi',or:'Или',google_login:'Войти через Google',google_reg:'Зарегистрироваться через Google',full_name:'Полное имя',sabflous:'Sabflous',tunisie_post:'Tunisie Post',facebook:'Facebook',instagram:'Instagram',whatsapp:'WhatsApp',tiktok:'TikTok',admin:'⚙️ Админ',help_title:'💬 Центр помощи',help_cat1:'Заказы и доставка',help_cat2:'Способы оплаты',help_cat3:'Возвраты',help_cat4:'Связаться',faq_title:'❓ Частые вопросы',faq_q1:'Сколько занимает доставка?',faq_a1:'Доставка занимает 24-48ч по всему Тунису.',faq_q2:'Как оплатить через D17?',faq_a2:'После подтверждения появляется номер D17 — откройте приложение, отправьте сумму и отправьте подтверждение в WhatsApp.',faq_q3:'Возможен ли возврат?',faq_a3:'Да! В течение 7 дней после получения если товар дефектный.',faq_q4:'Как отследить заказ?',faq_a4:'Нажмите "Отследить заказ" и введите номер заказа, полученный по SMS.',wa_btn:'💬 Связаться в WhatsApp',track_title:'📦 Отследить заказ',track_desc:'Введите номер заказа для отслеживания статуса',track_btn:'🔍 Отследить',wish_title:'❤️ Избранное',co_title:'🛍️ Оформление заказа',co_delivery_lbl:'📦 Информация о доставке',co_fname:'Имя *',co_lname:'Фамилия',co_phone:'Телефон *',co_country_lbl:'Страна *',co_region_lbl:'Область / Регион *',co_addr_lbl:'Адрес *',co_pay_lbl:'💳 Способ оплаты',cod_label:'Оплата при получении',cod_sub:'Оплатите наличными при получении',acc_modal_title:'👤 Мой аккаунт',tab_login_btn:'Войти',tab_reg_btn:'Создать аккаунт',login_btn:'Войти',acc_or:'Или',acc_google_login:'Войти через Google',reg_btn:'Создать бесплатный аккаунт',acc_google_reg:'Зарегистрироваться через Google',logout_btn:'🚪 Выйти'},
  zh:{dir:'ltr',logo_text1:'Souq',logo_text2:'Bladi',tb_delivery:'🇹🇳 突尼斯所有州配送 | 24/7服务',search:'搜索产品...',my_acc:'我的账户',wish:'收藏夹',cart:'购物车',add_cart:'🛒 加入购物车',free_ship:'✈️ 免费配送',checkout:'💳 结账',place_order:'✅ 下订单',flash:'⚡ 限时特卖',top:'🔥 热销产品',feat:'⭐ 精选',see_all:'查看全部 ›',delivery:'📦 配送信息',pay_method:'💳 支付方式',subtotal:'小计',delivery_fee:'配送费',total:'总计',order_confirmed:'订单已确认!',continue:'继续购物 🛍️',track_order:'追踪订单',help:'帮助',login:'登录',register:'创建账户',logout:'退出',pay_title:'💳 可用支付方式',banner_tag:'⚡ 本周特惠',banner_title:'智慧购物<br><span>轻松付款</span>',banner_sub:'超过50,000种产品<br>48小时送达',banner_btn:'🛍️ 立即购买',mn1t:'快速配送',mn1s:'48小时全国配送',mn2t:'免费退货',mn2s:'7天无条件退货',mn3t:'安全支付',mn3s:'6种支付方式',mn4t:'每日优惠',mn4s:'折扣高达50%',cats:{all:'全部',electronics:'电子',fashion:'时尚',home:'家居',beauty:'美妆',sports:'运动',kids:'儿童',cars:'汽车',books:'书籍',tools:'工具'},fc1a1:'关于我们',fc1a2:'销售',fc1a3:'招聘',fc1a4:'联系',fc2h:'客户服务',fc2a1:'帮助中心',fc2a2:'追踪订单',fc2a3:'退换货',fc2a4:'保修',fc3h:'支付方式',fc4h:'联系我们',footer_copy:'© 2025 Souq Bladi',or:'或',google_login:'使用 Google 登录',google_reg:'使用 Google 注册',full_name:'全名',sabflous:'Sabflous',tunisie_post:'Tunisie Post',facebook:'Facebook',instagram:'Instagram',whatsapp:'WhatsApp',tiktok:'TikTok',admin:'⚙️ 管理',help_title:'💬 帮助中心',help_cat1:'订单与配送',help_cat2:'支付方式',help_cat3:'退换货',help_cat4:'联系我们',faq_title:'❓ 常见问题',faq_q1:'配送需要多长时间？',faq_a1:'配送需要24-48小时覆盖突尼斯全境。',faq_q2:'如何通过D17付款？',faq_a2:'确认后显示D17号码 — 打开应用，发送金额，然后通过WhatsApp发送证明。',faq_q3:'可以退货吗？',faq_a3:'可以！如果产品有缺陷，收货后7天内。',faq_q4:'如何追踪我的订单？',faq_a4:'点击"追踪订单"并输入通过短信收到的订单号。',wa_btn:'💬 通过WhatsApp联系我们',track_title:'📦 追踪订单',track_desc:'输入您的订单号以追踪状态',track_btn:'🔍 追踪',wish_title:'❤️ 收藏夹',co_title:'🛍️ 结账',co_delivery_lbl:'📦 配送信息',co_fname:'名字 *',co_lname:'姓氏',co_phone:'电话 *',co_country_lbl:'国家 *',co_region_lbl:'州 / 地区 *',co_addr_lbl:'地址 *',co_pay_lbl:'💳 支付方式',cod_label:'货到付款',cod_sub:'收货时现金支付',acc_modal_title:'👤 我的账户',tab_login_btn:'登录',tab_reg_btn:'创建账户',login_btn:'登录',acc_or:'或',acc_google_login:'使用 Google 登录',reg_btn:'创建免费账户',acc_google_reg:'使用 Google 注册',logout_btn:'🚪 退出'},
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
  const tbDelivery = document.getElementById('tb-delivery');
  const tbHelp = document.getElementById('tb-help');
  const tbTrack = document.getElementById('tb-track');
  const tbAdmin = document.getElementById('tb-admin');
  if(tbDelivery) tbDelivery.textContent = t.tb_delivery;
  if(tbHelp) tbHelp.textContent = t.help;
  if(tbTrack) tbTrack.textContent = t.track_order;
  if(tbAdmin) tbAdmin.textContent = t.admin;
  
  // Header
  const logoText1 = document.getElementById('logo-text1');
  const logoText2 = document.getElementById('logo-text2');
  const searchInp = document.getElementById('search-inp');
  const hbtnAcc = document.getElementById('hbtn-acc');
  const hbtnWish = document.getElementById('hbtn-wish');
  const hbtnCart = document.getElementById('hbtn-cart');
  if(logoText1) logoText1.textContent = t.logo_text1;
  if(logoText2) logoText2.textContent = t.logo_text2;
  if(searchInp) searchInp.placeholder = t.search;
  if(hbtnAcc) hbtnAcc.textContent = t.my_acc;
  if(hbtnWish) hbtnWish.textContent = t.wish;
  if(hbtnCart) hbtnCart.textContent = t.cart;
  
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
  const fc1a1 = document.getElementById('fc1-a1')
  const fc1a2 = document.getElementById('fc1-a2')
  const fc1a3 = document.getElementById('fc1-a3')
  const fc1a4 = document.getElementById('fc1-a4')
  const fc2h = document.getElementById('fc2-h')
  const fc2a1 = document.getElementById('fc2-a1')
  const fc2a2 = document.getElementById('fc2-a2')
  const fc2a3 = document.getElementById('fc2-a3')
  const fc2a4 = document.getElementById('fc2-a4')
  const fc3h = document.getElementById('fc3-h')
  const fc4h = document.getElementById('fc4-h')
  const footerCopy = document.querySelector('.footer-bottom span:first-child')
  if(fc1a1) fc1a1.textContent = t.fc1a1
  if(fc1a2) fc1a2.textContent = t.fc1a2
  if(fc1a3) fc1a3.textContent = t.fc1a3
  if(fc1a4) fc1a4.textContent = t.fc1a4
  if(fc2h) fc2h.textContent = t.fc2h
  if(fc2a1) fc2a1.textContent = t.fc2a1
  if(fc2a2) fc2a2.textContent = t.fc2a2
  if(fc2a3) fc2a3.textContent = t.fc2a3
  if(fc2a4) fc2a4.textContent = t.fc2a4
  if(fc3h) fc3h.textContent = t.fc3h
  if(fc4h) fc4h.textContent = t.fc4h
  if(footerCopy) footerCopy.textContent = t.footer_copy
  
  // Checkout
  const osSubLbl = document.getElementById('os-sub-lbl')
  const osDelLbl = document.getElementById('os-del-lbl')
  const osTotLbl = document.getElementById('os-tot-lbl')
  const placeBtn = document.getElementById('place-btn')
  const checkoutBtn = document.getElementById('checkout-btn')
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
  
  // Account modal placeholder
  const regName = document.getElementById('reg-name')
  if(regName) regName.placeholder = t.full_name
  
  // Footer social links
  const fcSabflous = document.getElementById('fc-sabflous')
  const fcTunisiePost = document.getElementById('fc-tunisie-post')
  const fcFacebook = document.getElementById('fc-facebook')
  const fcInstagram = document.getElementById('fc-instagram')
  const fcWhatsapp = document.getElementById('fc-whatsapp')
  const fcTiktok = document.getElementById('fc-tiktok')
  
  if(fcSabflous) fcSabflous.textContent = t.sabflous
  if(fcTunisiePost) fcTunisiePost.textContent = t.tunisie_post
  if(fcFacebook) fcFacebook.textContent = t.facebook
  if(fcInstagram) fcInstagram.textContent = t.instagram
  if(fcWhatsapp) fcWhatsapp.textContent = t.whatsapp
  if(fcTiktok) fcTiktok.textContent = t.tiktok
  
  // Help modal
  const helpTitle = document.getElementById('help-title')
  const helpCat1 = document.getElementById('help-cat1')
  const helpCat2 = document.getElementById('help-cat2')
  const helpCat3 = document.getElementById('help-cat3')
  const helpCat4 = document.getElementById('help-cat4')
  const faqTitle = document.getElementById('faq-title')
  const faqQ1 = document.getElementById('faq-q1')
  const faqA1 = document.getElementById('faq-a1')
  const faqQ2 = document.getElementById('faq-q2')
  const faqA2 = document.getElementById('faq-a2')
  const faqQ3 = document.getElementById('faq-q3')
  const faqA3 = document.getElementById('faq-a3')
  const faqQ4 = document.getElementById('faq-q4')
  const faqA4 = document.getElementById('faq-a4')
  const waBtn = document.getElementById('wa-btn')
  
  if(helpTitle) helpTitle.textContent = t.help_title
  if(helpCat1) helpCat1.textContent = t.help_cat1
  if(helpCat2) helpCat2.textContent = t.help_cat2
  if(helpCat3) helpCat3.textContent = t.help_cat3
  if(helpCat4) helpCat4.textContent = t.help_cat4
  if(faqTitle) faqTitle.textContent = t.faq_title
  if(faqQ1) faqQ1.textContent = t.faq_q1
  if(faqA1) faqA1.textContent = t.faq_a1
  if(faqQ2) faqQ2.textContent = t.faq_q2
  if(faqA2) faqA2.textContent = t.faq_a2
  if(faqQ3) faqQ3.textContent = t.faq_q3
  if(faqA3) faqA3.textContent = t.faq_a3
  if(faqQ4) faqQ4.textContent = t.faq_q4
  if(faqA4) faqA4.textContent = t.faq_a4
  if(waBtn) waBtn.textContent = t.wa_btn
  
  // Track modal
  const trackTitle = document.getElementById('track-title')
  const trackDesc = document.getElementById('track-desc')
  const trackBtn = document.getElementById('track-btn')
  
  if(trackTitle) trackTitle.textContent = t.track_title
  if(trackDesc) trackDesc.textContent = t.track_desc
  if(trackBtn) trackBtn.textContent = t.track_btn
  
  // Wishlist modal
  const wishTitle = document.getElementById('wish-title')
  if(wishTitle) wishTitle.textContent = t.wish_title
  
  // Checkout modal
  const coTitle = document.getElementById('co-title')
  const coDeliveryLbl = document.getElementById('co-delivery-lbl')
  const coFname = document.getElementById('co-fname')
  const coLname = document.getElementById('co-lname')
  const coPhone = document.getElementById('co-phone')
  const coCountryLbl = document.getElementById('co-country-lbl')
  const coRegionLbl = document.getElementById('co-region-lbl')
  const coAddrLbl = document.getElementById('co-addr-lbl')
  const coPayLbl = document.getElementById('co-pay-lbl')
  const codLabel = document.getElementById('cod-label')
  const codSub = document.getElementById('cod-sub')
  
  if(coTitle) coTitle.textContent = t.co_title
  if(coDeliveryLbl) coDeliveryLbl.textContent = t.co_delivery_lbl
  if(coFname) coFname.textContent = t.co_fname
  if(coLname) coLname.textContent = t.co_lname
  if(coPhone) coPhone.textContent = t.co_phone
  if(coCountryLbl) coCountryLbl.textContent = t.co_country_lbl
  if(coRegionLbl) coRegionLbl.textContent = t.co_region_lbl
  if(coAddrLbl) coAddrLbl.textContent = t.co_addr_lbl
  if(coPayLbl) coPayLbl.textContent = t.co_pay_lbl
  if(codLabel) codLabel.textContent = t.cod_label
  if(codSub) codSub.textContent = t.cod_sub
  
  // Account modal
  const accModalTitle = document.getElementById('acc-modal-title')
  const tabLoginBtn = document.getElementById('tab-login-btn')
  const tabRegBtn = document.getElementById('tab-reg-btn')
  const loginBtn = document.getElementById('login-btn')
  const accOr = document.getElementById('acc-or')
  const accOr2 = document.getElementById('acc-or-2')
  const accGoogleLogin = document.getElementById('acc-google-login')
  const regBtn = document.getElementById('reg-btn')
  const accGoogleReg = document.getElementById('acc-google-reg')
  const logoutBtn = document.getElementById('logout-btn')
  
  if(accModalTitle) accModalTitle.textContent = t.acc_modal_title
  if(tabLoginBtn) tabLoginBtn.textContent = t.tab_login_btn
  if(tabRegBtn) tabRegBtn.textContent = t.tab_reg_btn
  if(loginBtn) loginBtn.textContent = t.login_btn
  if(accOr) accOr.textContent = t.acc_or
  if(accOr2) accOr2.textContent = t.acc_or
  if(accGoogleLogin) accGoogleLogin.textContent = t.acc_google_login
  if(regBtn) regBtn.textContent = t.reg_btn
  if(accGoogleReg) accGoogleReg.textContent = t.acc_google_reg
  if(logoutBtn) logoutBtn.textContent = t.logout_btn
  
  showToast('🌐 ' + document.getElementById('lang-sel').options[document.getElementById('lang-sel').selectedIndex].text, true)
  
  // Dispatch language changed event for other pages
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }))
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
