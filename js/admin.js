// ============================================================
// سوق بلادي - Souq Bladi - Admin Panel Functions
// ============================================================

// ============================================================
// TRANSLATIONS
// ============================================================
const T = {
  ar:{dir:'rtl',login_title:'لوحة التحكم',login_sub:'سوق بلادي — Admin Panel',login_btn:'دخول ←',login_footer:'🇹🇳 سوق بلادي © 2025',sb_logo:'🇹🇳 سوق بلادي',sb_connected:'● متصل بـ Supabase',sb_orders:'📦 الطلبات',sb_products:'🛍️ المنتجات',sb_add:'➕ إضافة منتج',sb_stats:'📊 إحصائيات',sb_store:'🏪 عرض المتجر',sb_logout:'🚪 تسجيل الخروج',btn_refresh:'🔄 تحديث',st_orders:'إجمالي الطلبات',st_today:'اليوم: -',st_pending:'قيد الانتظار',st_pending_note:'يحتاج متابعة',st_revenue:'الإيرادات (د.ت)',st_revenue_note:'الطلبات المكتملة',st_products:'المنتجات',st_products_note:'في قاعدة البيانات',card_orders:'📦 الطلبات الواردة',filter_all:'الكل',filter_pending:'⏳ انتظار',filter_confirmed:'✅ مؤكد',filter_shipped:'🚚 شحن',filter_delivered:'🎉 تسليم',loading:'جاري التحميل...',no_orders:'لا توجد طلبات بعد',no_products:'لا توجد منتجات — أضف منتجاً',card_products:'🛍️ المنتجات',btn_add_product:'➕ أضف منتج',form_add_title:'➕ إضافة منتج جديد',lbl_name:'اسم المنتج بالعربية *',lbl_desc:'وصف المنتج',lbl_price:'السعر الحالي (د.ت) *',lbl_old:'السعر القديم (د.ت)',lbl_cat:'الفئة *',lbl_stock:'الكمية *',lbl_img:'رابط الصورة (اختياري)',btn_save:'➕ حفظ المنتج',btn_saving:'⏳ جاري الحفظ...',err_name_price:'⚠️ أدخل الاسم والسعر',msg_added:'✅ تمت الإضافة!',msg_error:'❌ خطأ في إضافة المنتج',card_pay:'💳 طرق الدفع',card_gov:'🗺️ الولايات',no_data:'لا توجد بيانات بعد',order_req:'طلب',notif_new:'🔔 طلب جديد من ',notif_updated:'✅ تم تحديث الطلب',notif_err:'❌ خطأ في تحديث الطلب',notif_load_err:'❌ خطأ في تحميل الطلبات',notif_prod_err:'❌ خطأ في تحميل المنتجات',st_pending_lbl:'⏳ انتظار',st_confirmed_lbl:'✅ مؤكد',st_shipped_lbl:'🚚 شحن',st_delivered_lbl:'🎉 تسليم',st_cancelled_lbl:'❌ ملغي',title_confirm:'تأكيد',title_ship:'شحن',title_deliver:'تسليم',title_cancel:'إلغاء',th_id:'#',th_customer:'العميل',th_phone:'الهاتف',th_gov:'الولاية',th_payment:'الدفع',th_amount:'المبلغ',th_status:'الحالة',th_date:'التاريخ',th_action:'إجراء',th_product:'المنتج',th_category:'الفئة',th_price:'السعر',th_stock:'المخزون',th_discount:'التخفيض',cat_electronics:'📱 إلكترونيات',cat_fashion:'👗 أزياء',cat_home:'🏠 منزل',cat_beauty:'💄 جمال',cat_sports:'⚽ رياضة',cat_kids:'🧸 أطفال',ph_name:'مثال: سماعات بلوتوث لاسلكية',ph_desc:'وصف مختصر للمنتج...',ph_price:'89',ph_old:'149',ph_stock:'50',ph_img:'https://...'},
  en:{dir:'ltr',login_title:'Admin Panel',login_sub:'Souq Bladi — Admin Panel',login_btn:'Login →',login_footer:'🇹🇳 Souq Bladi © 2025',sb_logo:'🇹🇳 Souq Bladi',sb_connected:'● Connected to Supabase',sb_orders:'📦 Orders',sb_products:'🛍️ Products',sb_add:'➕ Add Product',sb_stats:'📊 Statistics',sb_store:'🏪 View Store',sb_logout:'🚪 Logout',btn_refresh:'🔄 Refresh',st_orders:'Total Orders',st_today:'Today: -',st_pending:'Pending',st_pending_note:'Needs attention',st_revenue:'Revenue (TND)',st_revenue_note:'Completed orders',st_products:'Products',st_products_note:'In database',card_orders:'📦 Incoming Orders',filter_all:'All',filter_pending:'⏳ Pending',filter_confirmed:'✅ Confirmed',filter_shipped:'🚚 Shipped',filter_delivered:'🎉 Delivered',loading:'Loading...',no_orders:'No orders yet',no_products:'No products — Add one',card_products:'🛍️ Products',btn_add_product:'➕ Add Product',form_add_title:'➕ Add New Product',lbl_name:'Product Name (Arabic) *',lbl_desc:'Product Description',lbl_price:'Current Price (TND) *',lbl_old:'Old Price (TND)',lbl_cat:'Category *',lbl_stock:'Quantity *',lbl_img:'Image URL (optional)',btn_save:'➕ Save Product',btn_saving:'⏳ Saving...',err_name_price:'⚠️ Enter name and price',msg_added:'✅ Added!',msg_error:'❌ Error adding product',card_pay:'💳 Payment Methods',card_gov:'🗺️ Governorates',no_data:'No data yet',order_req:'orders',notif_new:'🔔 New order from ',notif_updated:'✅ Order updated',notif_err:'❌ Error updating order',notif_load_err:'❌ Error loading orders',notif_prod_err:'❌ Error loading products',st_pending_lbl:'⏳ Pending',st_confirmed_lbl:'✅ Confirmed',st_shipped_lbl:'🚚 Shipped',st_delivered_lbl:'🎉 Delivered',st_cancelled_lbl:'❌ Cancelled',title_confirm:'Confirm',title_ship:'Ship',title_deliver:'Deliver',title_cancel:'Cancel',th_id:'#',th_customer:'Customer',th_phone:'Phone',th_gov:'Governorate',th_payment:'Payment',th_amount:'Amount',th_status:'Status',th_date:'Date',th_action:'Action',th_product:'Product',th_category:'Category',th_price:'Price',th_stock:'Stock',th_discount:'Discount',cat_electronics:'📱 Electronics',cat_fashion:'👗 Fashion',cat_home:'🏠 Home',cat_beauty:'💄 Beauty',cat_sports:'⚽ Sports',cat_kids:'🧸 Kids',ph_name:'Example: Bluetooth headphones',ph_desc:'Short product description...',ph_price:'89',ph_old:'149',ph_stock:'50',ph_img:'https://...'},
  fr:{dir:'ltr',login_title:'Panneau Admin',login_sub:'Souq Bladi — Panneau Admin',login_btn:'Connexion →',login_footer:'🇹🇳 Souq Bladi © 2025',sb_logo:'🇹🇳 Souq Bladi',sb_connected:'● Connecté à Supabase',sb_orders:'📦 Commandes',sb_products:'🛍️ Produits',sb_add:'➕ Ajouter Produit',sb_stats:'📊 Statistiques',sb_store:'🏪 Voir Boutique',sb_logout:'🚪 Déconnexion',btn_refresh:'🔄 Actualiser',st_orders:'Total Commandes',st_today:'Aujourd\'hui: -',st_pending:'En attente',st_pending_note:'Besoin d\'attention',st_revenue:'Revenus (TND)',st_revenue_note:'Commandes terminées',st_products:'Produits',st_products_note:'Dans la base',card_orders:'📦 Commandes entrantes',filter_all:'Toutes',filter_pending:'⏳ En attente',filter_confirmed:'✅ Confirmée',filter_shipped:'🚚 Expédiée',filter_delivered:'🎉 Livrée',loading:'Chargement...',no_orders:'Aucune commande',no_products:'Aucun produit — Ajoutez-en',card_products:'🛍️ Produits',btn_add_product:'➕ Ajouter Produit',form_add_title:'➕ Ajouter Nouveau Produit',lbl_name:'Nom du produit (arabe) *',lbl_desc:'Description du produit',lbl_price:'Prix actuel (TND) *',lbl_old:'Ancien prix (TND)',lbl_cat:'Catégorie *',lbl_stock:'Quantité *',lbl_img:'URL image (optionnel)',btn_save:'➕ Enregistrer',btn_saving:'⏳ Enregistrement...',err_name_price:'⚠️ Entrez nom et prix',msg_added:'✅ Ajouté!',msg_error:'❌ Erreur d\'ajout',card_pay:'💳 Méthodes de paiement',card_gov:'🗺️ Gouvernorats',no_data:'Pas de données',order_req:'commandes',notif_new:'🔔 Nouvelle commande de ',notif_updated:'✅ Commande mise à jour',notif_err:'❌ Erreur de mise à jour',notif_load_err:'❌ Erreur de chargement',notif_prod_err:'❌ Erreur de chargement produits',st_pending_lbl:'⏳ En attente',st_confirmed_lbl:'✅ Confirmée',st_shipped_lbl:'🚚 Expédiée',st_delivered_lbl:'🎉 Livrée',st_cancelled_lbl:'❌ Annulée',title_confirm:'Confirmer',title_ship:'Expédier',title_deliver:'Livrer',title_cancel:'Annuler',th_id:'#',th_customer:'Client',th_phone:'Téléphone',th_gov:'Gouvernorat',th_payment:'Paiement',th_amount:'Montant',th_status:'Statut',th_date:'Date',th_action:'Action',th_product:'Produit',th_category:'Catégorie',th_price:'Prix',th_stock:'Stock',th_discount:'Réduction',cat_electronics:'📱 Électronique',cat_fashion:'👗 Mode',cat_home:'🏠 Maison',cat_beauty:'💄 Beauté',cat_sports:'⚽ Sports',cat_kids:'🧸 Enfants',ph_name:'Ex: Écouteurs Bluetooth',ph_desc:'Description courte du produit...',ph_price:'89',ph_old:'149',ph_stock:'50',ph_img:'https://...'},
  de:{dir:'ltr',login_title:'Admin Panel',login_sub:'Souq Bladi — Admin Panel',login_btn:'Anmelden →',login_footer:'🇹🇳 Souq Bladi © 2025',sb_logo:'🇹🇳 Souq Bladi',sb_connected:'● Verbunden mit Supabase',sb_orders:'📦 Bestellungen',sb_products:'🛍️ Produkte',sb_add:'➕ Produkt hinzufügen',sb_stats:'📊 Statistiken',sb_store:'🏪 Shop anzeigen',sb_logout:'🚪 Abmelden',btn_refresh:'🔄 Aktualisieren',st_orders:'Gesamtbestellungen',st_today:'Heute: -',st_pending:'Ausstehend',st_pending_note:'Benötigt Aufmerksamkeit',st_revenue:'Umsatz (TND)',st_revenue_note:'Abgeschlossene Bestellungen',st_products:'Produkte',st_products_note:'In der Datenbank',card_orders:'📦 Eingehende Bestellungen',filter_all:'Alle',filter_pending:'⏳ Ausstehend',filter_confirmed:'✅ Bestätigt',filter_shipped:'🚚 Versendet',filter_delivered:'🎉 Geliefert',loading:'Wird geladen...',no_orders:'Keine Bestellungen',no_products:'Keine Produkte — Fügen Sie eines hinzu',card_products:'🛍️ Produkte',btn_add_product:'➕ Produkt hinzufügen',form_add_title:'➕ Neues Produkt hinzufügen',lbl_name:'Produktname (Arabisch) *',lbl_desc:'Produktbeschreibung',lbl_price:'Aktueller Preis (TND) *',lbl_old:'Alter Preis (TND)',lbl_cat:'Kategorie *',lbl_stock:'Menge *',lbl_img:'Bild-URL (optional)',btn_save:'➕ Speichern',btn_saving:'⏳ Speichern...',err_name_price:'⚠️ Name und Preis eingeben',msg_added:'✅ Hinzugefügt!',msg_error:'❌ Fehler beim Hinzufügen',card_pay:'💳 Zahlungsmethoden',card_gov:'🗺️ Gouvernorate',no_data:'Keine Daten',order_req:'Bestellungen',notif_new:'🔔 Neue Bestellung von ',notif_updated:'✅ Bestellung aktualisiert',notif_err:'❌ Fehler beim Aktualisieren',notif_load_err:'❌ Fehler beim Laden',notif_prod_err:'❌ Fehler beim Laden von Produkten',st_pending_lbl:'⏳ Ausstehend',st_confirmed_lbl:'✅ Bestätigt',st_shipped_lbl:'🚚 Versendet',st_delivered_lbl:'🎉 Geliefert',st_cancelled_lbl:'❌ Abgebrochen',title_confirm:'Bestätigen',title_ship:'Versenden',title_deliver:'Liefern',title_cancel:'Abbrechen',th_id:'#',th_customer:'Kunde',th_phone:'Telefon',th_gov:'Gouvernorat',th_payment:'Zahlung',th_amount:'Betrag',th_status:'Status',th_date:'Datum',th_action:'Aktion',th_product:'Produkt',th_category:'Kategorie',th_price:'Preis',th_stock:'Bestand',th_discount:'Rabatt',cat_electronics:'📱 Elektronik',cat_fashion:'👗 Mode',cat_home:'🏠 Haus',cat_beauty:'💄 Schönheit',cat_sports:'⚽ Sport',cat_kids:'🧸 Kinder',ph_name:'Bsp: Bluetooth-Kopfhörer',ph_desc:'Kurzbeschreibung des Produkts...',ph_price:'89',ph_old:'149',ph_stock:'50',ph_img:'https://...'},
  es:{dir:'ltr',login_title:'Panel Admin',login_sub:'Souq Bladi — Panel Admin',login_btn:'Iniciar sesión →',login_footer:'🇹🇳 Souq Bladi © 2025',sb_logo:'🇹🇳 Souq Bladi',sb_connected:'● Conectado a Supabase',sb_orders:'📦 Pedidos',sb_products:'🛍️ Productos',sb_add:'➕ Añadir producto',sb_stats:'📊 Estadísticas',sb_store:'🏪 Ver tienda',sb_logout:'🚪 Cerrar sesión',btn_refresh:'🔄 Actualizar',st_orders:'Total pedidos',st_today:'Hoy: -',st_pending:'Pendiente',st_pending_note:'Necesita atención',st_revenue:'Ingresos (TND)',st_revenue_note:'Pedidos completados',st_products:'Productos',st_products_note:'En la base de datos',card_orders:'📦 Pedidos entrantes',filter_all:'Todos',filter_pending:'⏳ Pendiente',filter_confirmed:'✅ Confirmado',filter_shipped:'🚚 Enviado',filter_delivered:'🎉 Entregado',loading:'Cargando...',no_orders:'Sin pedidos',no_products:'Sin productos — Añade uno',card_products:'🛍️ Productos',btn_add_product:'➕ Añadir producto',form_add_title:'➕ Añadir nuevo producto',lbl_name:'Nombre del producto (árabe) *',lbl_desc:'Descripción del producto',lbl_price:'Precio actual (TND) *',lbl_old:'Precio anterior (TND)',lbl_cat:'Categoría *',lbl_stock:'Cantidad *',lbl_img:'URL de imagen (opcional)',btn_save:'➕ Guardar',btn_saving:'⏳ Guardando...',err_name_price:'⚠️ Introduce nombre y precio',msg_added:'✅ Añadido!',msg_error:'❌ Error al añadir',card_pay:'💳 Métodos de pago',card_gov:'🗺️ Gobernaciones',no_data:'Sin datos',order_req:'pedidos',notif_new:'🔔 Nuevo pedido de ',notif_updated:'✅ Pedido actualizado',notif_err:'❌ Error al actualizar',notif_load_err:'❌ Error al cargar',notif_prod_err:'❌ Error al cargar productos',st_pending_lbl:'⏳ Pendiente',st_confirmed_lbl:'✅ Confirmado',st_shipped_lbl:'🚚 Enviado',st_delivered_lbl:'🎉 Entregado',st_cancelled_lbl:'❌ Cancelado',title_confirm:'Confirmar',title_ship:'Enviar',title_deliver:'Entregar',title_cancel:'Cancelar',th_id:'#',th_customer:'Cliente',th_phone:'Teléfono',th_gov:'Gobernación',th_payment:'Pago',th_amount:'Importe',th_status:'Estado',th_date:'Fecha',th_action:'Acción',th_product:'Producto',th_category:'Categoría',th_price:'Precio',th_stock:'Stock',th_discount:'Descuento',cat_electronics:'📱 Electrónica',cat_fashion:'👗 Moda',cat_home:'🏠 Hogar',cat_beauty:'💄 Belleza',cat_sports:'⚽ Deportes',cat_kids:'🧸 Niños',ph_name:'Ej: Auriculares Bluetooth',ph_desc:'Descripción breve del producto...',ph_price:'89',ph_old:'149',ph_stock:'50',ph_img:'https://...'},
  tr:{dir:'ltr',login_title:'Yönetici Paneli',login_sub:'Souq Bladi — Yönetici Paneli',login_btn:'Giriş →',login_footer:'🇹🇳 Souq Bladi © 2025',sb_logo:'🇹🇳 Souq Bladi',sb_connected:'● Supabase\'a bağlı',sb_orders:'📦 Siparişler',sb_products:'🛍️ Ürünler',sb_add:'➕ Ürün ekle',sb_stats:'📊 İstatistikler',sb_store:'🏪 Mağazayı gör',sb_logout:'🚪 Çıkış',btn_refresh:'🔄 Yenile',st_orders:'Toplam siparişler',st_today:'Bugün: -',st_pending:'Bekliyor',st_pending_note:'İlgilenmesi gerekiyor',st_revenue:'Gelir (TND)',st_revenue_note:'Tamamlanan siparişler',st_products:'Ürünler',st_products_note:'Veritabanında',card_orders:'📦 Gelen siparişler',filter_all:'Tümü',filter_pending:'⏳ Bekliyor',filter_confirmed:'✅ Onaylandı',filter_shipped:'🚚 Kargolandı',filter_delivered:'🎉 Teslim edildi',loading:'Yükleniyor...',no_orders:'Sipariş yok',no_products:'Ürün yok — Bir tane ekleyin',card_products:'🛍️ Ürünler',btn_add_product:'➕ Ürün ekle',form_add_title:'➕ Yeni ürün ekle',lbl_name:'Ürün adı (Arapça) *',lbl_desc:'Ürün açıklaması',lbl_price:'Mevcut fiyat (TND) *',lbl_old:'Eski fiyat (TND)',lbl_cat:'Kategori *',lbl_stock:'Miktar *',lbl_img:'Resim URL (opsiyonel)',btn_save:'➕ Kaydet',btn_saving:'⏳ Kaydediliyor...',err_name_price:'⚠️ Ad ve fiyat girin',msg_added:'✅ Eklendi!',msg_error:'❌ Ekleme hatası',card_pay:'💳 Ödeme yöntemleri',card_gov:'🗺️ Valilikler',no_data:'Veri yok',order_req:'sipariş',notif_new:'🔔 Yeni sipariş: ',notif_updated:'✅ Sipariş güncellendi',notif_err:'❌ Güncelleme hatası',notif_load_err:'❌ Yükleme hatası',notif_prod_err:'❌ Ürün yükleme hatası',st_pending_lbl:'⏳ Bekliyor',st_confirmed_lbl:'✅ Onaylandı',st_shipped_lbl:'🚚 Kargolandı',st_delivered_lbl:'🎉 Teslim edildi',st_cancelled_lbl:'❌ İptal edildi',title_confirm:'Onayla',title_ship:'Kargola',title_deliver:'Teslim et',title_cancel:'İptal',th_id:'#',th_customer:'Müşteri',th_phone:'Telefon',th_gov:'Valilik',th_payment:'Ödeme',th_amount:'Tutar',th_status:'Durum',th_date:'Tarih',th_action:'İşlem',th_product:'Ürün',th_category:'Kategori',th_price:'Fiyat',th_stock:'Stok',th_discount:'İndirim',cat_electronics:'📱 Elektronik',cat_fashion:'👗 Moda',cat_home:'🏠 Ev',cat_beauty:'💄 Güzellik',cat_sports:'⚽ Spor',cat_kids:'🧸 Çocuk',ph_name:'Örn: Bluetooth kulaklık',ph_desc:'Ürün kısa açıklaması...',ph_price:'89',ph_old:'149',ph_stock:'50',ph_img:'https://...'},
  ru:{dir:'ltr',login_title:'Панель администратора',login_sub:'Souq Bladi — Панель администратора',login_btn:'Войти →',login_footer:'🇹🇳 Souq Bladi © 2025',sb_logo:'🇹🇳 Souq Bladi',sb_connected:'● Подключено к Supabase',sb_orders:'📦 Заказы',sb_products:'🛍️ Товары',sb_add:'➕ Добавить товар',sb_stats:'📊 Статистика',sb_store:'🏪 Показать магазин',sb_logout:'🚪 Выйти',btn_refresh:'🔄 Обновить',st_orders:'Всего заказов',st_today:'Сегодня: -',st_pending:'Ожидает',st_pending_note:'Требует внимания',st_revenue:'Доход (TND)',st_revenue_note:'Завершенные заказы',st_products:'Товары',st_products_note:'В базе данных',card_orders:'📦 Входящие заказы',filter_all:'Все',filter_pending:'⏳ Ожидает',filter_confirmed:'✅ Подтвержден',filter_shipped:'🚚 Отправлен',filter_delivered:'🎉 Доставлен',loading:'Загрузка...',no_orders:'Нет заказов',no_products:'Нет товаров — Добавьте один',card_products:'🛍️ Товары',btn_add_product:'➕ Добавить товар',form_add_title:'➕ Добавить новый товар',lbl_name:'Название товара (арабский) *',lbl_desc:'Описание товара',lbl_price:'Текущая цена (TND) *',lbl_old:'Старая цена (TND)',lbl_cat:'Категория *',lbl_stock:'Количество *',lbl_img:'URL изображения (необязательно)',btn_save:'➕ Сохранить',btn_saving:'⏳ Сохранение...',err_name_price:'⚠️ Введите название и цену',msg_added:'✅ Добавлено!',msg_error:'❌ Ошибка добавления',card_pay:'💳 Способы оплаты',card_gov:'🗺️ Губернии',no_data:'Нет данных',order_req:'заказов',notif_new:'🔔 Новый заказ от ',notif_updated:'✅ Заказ обновлен',notif_err:'❌ Ошибка обновления',notif_load_err:'❌ Ошибка загрузки',notif_prod_err:'❌ Ошибка загрузки товаров',st_pending_lbl:'⏳ Ожидает',st_confirmed_lbl:'✅ Подтвержден',st_shipped_lbl:'🚚 Отправлен',st_delivered_lbl:'🎉 Доставлен',st_cancelled_lbl:'❌ Отменен',title_confirm:'Подтвердить',title_ship:'Отправить',title_deliver:'Доставить',title_cancel:'Отменить',th_id:'#',th_customer:'Клиент',th_phone:'Телефон',th_gov:'Губерния',th_payment:'Оплата',th_amount:'Сумма',th_status:'Статус',th_date:'Дата',th_action:'Действие',th_product:'Товар',th_category:'Категория',th_price:'Цена',th_stock:'Наличие',th_discount:'Скидка',cat_electronics:'📱 Электроника',cat_fashion:'👗 Мода',cat_home:'🏠 Дом',cat_beauty:'💄 Красота',cat_sports:'⚽ Спорт',cat_kids:'🧸 Дети',ph_name:'Пример: Bluetooth наушники',ph_desc:'Краткое описание товара...',ph_price:'89',ph_old:'149',ph_stock:'50',ph_img:'https://...'},
  zh:{dir:'ltr',login_title:'管理面板',login_sub:'Souq Bladi — 管理面板',login_btn:'登录 →',login_footer:'🇹🇳 Souq Bladi © 2025',sb_logo:'🇹🇳 Souq Bladi',sb_connected:'● 已连接到 Supabase',sb_orders:'📦 订单',sb_products:'🛍️ 产品',sb_add:'➕ 添加产品',sb_stats:'📊 统计',sb_store:'🏪 查看商店',sb_logout:'🚪 退出',btn_refresh:'🔄 刷新',st_orders:'总订单',st_today:'今天: -',st_pending:'待处理',st_pending_note:'需要关注',st_revenue:'收入 (TND)',st_revenue_note:'已完成订单',st_products:'产品',st_products_note:'在数据库中',card_orders:'📦 收到的订单',filter_all:'全部',filter_pending:'⏳ 待处理',filter_confirmed:'✅ 已确认',filter_shipped:'🚚 已发货',filter_delivered:'🎉 已送达',loading:'加载中...',no_orders:'暂无订单',no_products:'暂无产品 — 添加一个',card_products:'🛍️ 产品',btn_add_product:'➕ 添加产品',form_add_title:'➕ 添加新产品',lbl_name:'产品名称（阿拉伯语）*',lbl_desc:'产品描述',lbl_price:'当前价格 (TND) *',lbl_old:'原价 (TND)',lbl_cat:'类别 *',lbl_stock:'数量 *',lbl_img:'图片 URL（可选）',btn_save:'➕ 保存',btn_saving:'⏳ 保存中...',err_name_price:'⚠️ 请输入名称和价格',msg_added:'✅ 已添加!',msg_error:'❌ 添加错误',card_pay:'💳 支付方式',card_gov:'🗺️ 省份',no_data:'暂无数据',order_req:'订单',notif_new:'🔔 来自的新订单 ',notif_updated:'✅ 订单已更新',notif_err:'❌ 更新错误',notif_load_err:'❌ 加载错误',notif_prod_err:'❌ 产品加载错误',st_pending_lbl:'⏳ 待处理',st_confirmed_lbl:'✅ 已确认',st_shipped_lbl:'🚚 已发货',st_delivered_lbl:'🎉 已送达',st_cancelled_lbl:'❌ 已取消',title_confirm:'确认',title_ship:'发货',title_deliver:'送达',title_cancel:'取消',th_id:'#',th_customer:'客户',th_phone:'电话',th_gov:'省份',th_payment:'支付',th_amount:'金额',th_status:'状态',th_date:'日期',th_action:'操作',th_product:'产品',th_category:'类别',th_price:'价格',th_stock:'库存',th_discount:'折扣',cat_electronics:'📱 电子',cat_fashion:'👗 时尚',cat_home:'🏠 家居',cat_beauty:'💄 美容',cat_sports:'⚽ 体育',cat_kids:'🧸 儿童',ph_name:'例如：蓝牙耳机',ph_desc:'产品简短描述...',ph_price:'89',ph_old:'149',ph_stock:'50',ph_img:'https://...'},
}

let currentLang = 'ar'

// ============================================================
// CHANGE LANGUAGE
// ============================================================
function changeAdminLang(lang) {
  currentLang = lang
  const t = T[lang] || T.ar
  document.documentElement.dir = t.dir
  document.documentElement.lang = lang
  
  // Login page
  const loginTitle = document.querySelector('.login-title')
  const loginSub = document.querySelector('.login-sub')
  const loginBtn = document.querySelector('.login-btn')
  const loginFooter = document.querySelector('.login-footer')
  
  if(loginTitle) loginTitle.textContent = t.login_title
  if(loginSub) loginSub.textContent = t.login_sub
  if(loginBtn) loginBtn.textContent = t.login_btn
  if(loginFooter) loginFooter.textContent = t.login_footer
  
  // Sidebar
  const sbLogo = document.querySelector('.sb-logo h1')
  const sbConnected = document.querySelector('.sb-logo p')
  const sbOrders = document.querySelector('.sb-btn:nth-child(1)')
  const sbProducts = document.querySelector('.sb-btn:nth-child(2)')
  const sbAdd = document.querySelector('.sb-btn:nth-child(3)')
  const sbStats = document.querySelector('.sb-btn:nth-child(4)')
  const sbStore = document.querySelector('.sb-link:nth-child(1)')
  const sbLogout = document.querySelector('.sb-link:nth-child(2)')
  
  if(sbLogo) sbLogo.textContent = t.sb_logo
  if(sbConnected) sbConnected.textContent = t.sb_connected
  if(sbOrders) sbOrders.textContent = t.sb_orders
  if(sbProducts) sbProducts.textContent = t.sb_products
  if(sbAdd) sbAdd.textContent = t.sb_add
  if(sbStats) sbStats.textContent = t.sb_stats
  if(sbStore) sbStore.textContent = t.sb_store
  if(sbLogout) sbLogout.textContent = t.sb_logout
  
  // Topbar
  const btnRefresh = document.querySelector('.btn-refresh')
  if(btnRefresh) btnRefresh.textContent = t.btn_refresh
  
  // Stats labels
  const stOrders = document.querySelector('.stat:nth-child(1) .stat-lbl')
  const stToday = document.querySelector('.stat:nth-child(1) .stat-note')
  const stPending = document.querySelector('.stat:nth-child(2) .stat-lbl')
  const stPendingNote = document.querySelector('.stat:nth-child(2) .stat-note')
  const stRevenue = document.querySelector('.stat:nth-child(3) .stat-lbl')
  const stRevenueNote = document.querySelector('.stat:nth-child(3) .stat-note')
  const stProducts = document.querySelector('.stat:nth-child(4) .stat-lbl')
  const stProductsNote = document.querySelector('.stat:nth-child(4) .stat-note')
  
  if(stOrders) stOrders.textContent = t.st_orders
  if(stToday) stToday.textContent = t.st_today
  if(stPending) stPending.textContent = t.st_pending
  if(stPendingNote) stPendingNote.textContent = t.st_pending_note
  if(stRevenue) stRevenue.textContent = t.st_revenue
  if(stRevenueNote) stRevenueNote.textContent = t.st_revenue_note
  if(stProducts) stProducts.textContent = t.st_products
  if(stProductsNote) stProductsNote.textContent = t.st_products_note
  
  // Card titles
  const cardOrders = document.querySelector('#tab-orders .card-title')
  const cardProducts = document.querySelector('#tab-products .card-title')
  const cardPay = document.querySelector('#tab-stats .card-title:nth-child(1)')
  const cardGov = document.querySelector('#tab-stats .card-title:nth-child(2)')
  
  if(cardOrders) cardOrders.textContent = t.card_orders
  if(cardProducts) cardProducts.textContent = t.card_products
  if(cardPay) cardPay.textContent = t.card_pay
  if(cardGov) cardGov.textContent = t.card_gov
  
  // Filter buttons
  const filterAll = document.querySelector('.fbtn:nth-child(1)')
  const filterPending = document.querySelector('.fbtn:nth-child(2)')
  const filterConfirmed = document.querySelector('.fbtn:nth-child(3)')
  const filterShipped = document.querySelector('.fbtn:nth-child(4)')
  const filterDelivered = document.querySelector('.fbtn:nth-child(5)')
  
  if(filterAll) filterAll.textContent = t.filter_all
  if(filterPending) filterPending.textContent = t.filter_pending
  if(filterConfirmed) filterConfirmed.textContent = t.filter_confirmed
  if(filterShipped) filterShipped.textContent = t.filter_shipped
  if(filterDelivered) filterDelivered.textContent = t.filter_delivered
  
  // Table headers
  const thId = document.querySelector('#tab-orders thead th:nth-child(1)')
  const thCustomer = document.querySelector('#tab-orders thead th:nth-child(2)')
  const thPhone = document.querySelector('#tab-orders thead th:nth-child(3)')
  const thGov = document.querySelector('#tab-orders thead th:nth-child(4)')
  const thPayment = document.querySelector('#tab-orders thead th:nth-child(5)')
  const thAmount = document.querySelector('#tab-orders thead th:nth-child(6)')
  const thStatus = document.querySelector('#tab-orders thead th:nth-child(7)')
  const thDate = document.querySelector('#tab-orders thead th:nth-child(8)')
  const thAction = document.querySelector('#tab-orders thead th:nth-child(9)')
  
  if(thId) thId.textContent = t.th_id
  if(thCustomer) thCustomer.textContent = t.th_customer
  if(thPhone) thPhone.textContent = t.th_phone
  if(thGov) thGov.textContent = t.th_gov
  if(thPayment) thPayment.textContent = t.th_payment
  if(thAmount) thAmount.textContent = t.th_amount
  if(thStatus) thStatus.textContent = t.th_status
  if(thDate) thDate.textContent = t.th_date
  if(thAction) thAction.textContent = t.th_action
  
  // Product table headers
  const thProduct = document.querySelector('#tab-products thead th:nth-child(1)')
  const thCategory = document.querySelector('#tab-products thead th:nth-child(2)')
  const thPrice = document.querySelector('#tab-products thead th:nth-child(3)')
  const thStock = document.querySelector('#tab-products thead th:nth-child(4)')
  const thDiscount = document.querySelector('#tab-products thead th:nth-child(5)')
  
  if(thProduct) thProduct.textContent = t.th_product
  if(thCategory) thCategory.textContent = t.th_category
  if(thPrice) thPrice.textContent = t.th_price
  if(thStock) thStock.textContent = t.th_stock
  if(thDiscount) thDiscount.textContent = t.th_discount
  
  // Add product form
  const formAddTitle = document.querySelector('.form-card h2')
  const btnAddProduct = document.querySelector('#tab-products .fbtn')
  const lblName = document.querySelector('label[for="np-name"]')
  const lblDesc = document.querySelector('label[for="np-desc"]')
  const lblPrice = document.querySelector('label[for="np-price"]')
  const lblOld = document.querySelector('label[for="np-old"]')
  const lblCat = document.querySelector('label[for="np-cat"]')
  const lblStock = document.querySelector('label[for="np-stock"]')
  const lblImg = document.querySelector('label[for="np-img"]')
  const btnSave = document.querySelector('#add-btn')
  
  if(formAddTitle) formAddTitle.textContent = t.form_add_title
  if(btnAddProduct) btnAddProduct.textContent = t.btn_add_product
  if(lblName) lblName.textContent = t.lbl_name
  if(lblDesc) lblDesc.textContent = t.lbl_desc
  if(lblPrice) lblPrice.textContent = t.lbl_price
  if(lblOld) lblOld.textContent = t.lbl_old
  if(lblCat) lblCat.textContent = t.lbl_cat
  if(lblStock) lblStock.textContent = t.lbl_stock
  if(lblImg) lblImg.textContent = t.lbl_img
  if(btnSave) btnSave.textContent = t.btn_save
  
  // Placeholders
  const inpName = document.getElementById('np-name')
  const inpDesc = document.getElementById('np-desc')
  const inpPrice = document.getElementById('np-price')
  const inpOld = document.getElementById('np-old')
  const inpStock = document.getElementById('np-stock')
  const inpImg = document.getElementById('np-img')
  
  if(inpName) inpName.placeholder = t.ph_name
  if(inpDesc) inpDesc.placeholder = t.ph_desc
  if(inpPrice) inpPrice.placeholder = t.ph_price
  if(inpOld) inpOld.placeholder = t.ph_old
  if(inpStock) inpStock.placeholder = t.ph_stock
  if(inpImg) inpImg.placeholder = t.ph_img
  
  // Category options
  const catElectronics = document.querySelector('#np-cat option[value="electronics"]')
  const catFashion = document.querySelector('#np-cat option[value="fashion"]')
  const catHome = document.querySelector('#np-cat option[value="home"]')
  const catBeauty = document.querySelector('#np-cat option[value="beauty"]')
  const catSports = document.querySelector('#np-cat option[value="sports"]')
  const catKids = document.querySelector('#np-cat option[value="kids"]')
  
  if(catElectronics) catElectronics.textContent = t.cat_electronics
  if(catFashion) catFashion.textContent = t.cat_fashion
  if(catHome) catHome.textContent = t.cat_home
  if(catBeauty) catBeauty.textContent = t.cat_beauty
  if(catSports) catSports.textContent = t.cat_sports
  if(catKids) catKids.textContent = t.cat_kids
  
  // Update status labels
  const ST = {
    pending: {lbl:t.st_pending_lbl},
    confirmed: {lbl:t.st_confirmed_lbl},
    shipped: {lbl:t.st_shipped_lbl},
    delivered: {lbl:t.st_delivered_lbl},
    cancelled: {lbl:t.st_cancelled_lbl},
  }
  
  // Re-render orders with new labels
  if(allOrders.length > 0) renderOrders(allOrders)
}

// ============================================================
// CONFIG
// ============================================================
// يتم استيراد التكوين من ملف config.js المنفصل
// Configuration imported from config.js file
const SUPA_URL = typeof SUPABASE_URL !== 'undefined' ? SUPABASE_URL : 'https://rdsnxvksnlfvbslcbljn.supabase.co'
const SUPA_KEY = typeof SUPABASE_KEY !== 'undefined' ? SUPABASE_KEY : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkc254dmtzbmxmdmJzbGNibGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMzE5NTYsImV4cCI6MjA5NTgwNzk1Nn0.n481Gt0XOAFbF3pu46ql3EX9aQV2T73Ou5OjvvSHDD0'

let adminDb, allOrders = [], allProducts = []
let currentUser = null

// ============================================================
// AUTH CHECK
// ============================================================
async function checkAdminAuth() {
  try {
    const { data: { user }, error } = await adminDb.auth.getUser()
    if (error || !user) {
      window.location.href = 'admin-login.html'
      return false
    }

    // Check if user is in admins table
    const { data: adminData, error: adminError } = await adminDb
      .from('admins')
      .select('id')
      .eq('email', user.email)
      .single()

    if (adminError || !adminData) {
      await adminDb.auth.signOut()
      window.location.href = '/'
      return false
    }

    currentUser = user
    showAdminPage()
    return true
  } catch (e) {
    console.error('Auth check failed:', e)
    window.location.href = 'admin-login.html'
    return false
  }
}

// ============================================================
// LOGIN
// ============================================================
async function doLogin() {
  const pass = document.getElementById('pass-input').value
  const err = document.getElementById('login-err')
  
  if (!pass) {
    if(err) err.textContent = '⚠️ أدخل كلمة المرور'
    return
  }

  try {
    const { data, error } = await adminDb.auth.signInWithPassword({
      email: 'admin@souqbladi.tn',
      password: pass
    })

    if (error) throw error

    if (data.user) {
      currentUser = data.user
      showAdminPage()
    }
  } catch (e) {
    console.error('Login failed:', e)
    if(err) err.textContent = '❌ خطأ في تسجيل الدخول'
  }
}

async function doLogout() {
  await adminDb.auth.signOut()
  window.location.href = 'admin-login.html'
}

function showAdminPage() {
  if (!isAuthenticated) return

  document.getElementById('login-page').style.display = 'none'
  document.getElementById('admin-page').style.display = 'block'
  initAdmin()
}

function initAdmin() {
  adminDb = supabase.createClient(SUPA_URL, SUPA_KEY)
  loadAll()
  
  // Apply initial language
  changeAdminLang(currentLang)

  // Real-time new orders
  adminDb.channel('orders')
    .on('postgres_changes', {event:'INSERT', schema:'public', table:'orders'}, p => {
      allOrders.unshift(p.new)
      renderOrders(allOrders)
      updateStats()
      const t = T[currentLang] || T.ar
      showNotif(t.notif_new + p.new.customer_name + '!', 'g')
    })
    .subscribe()
}

// ============================================================
// LOAD
// ============================================================
async function loadAll() {
  await Promise.all([loadOrders(), loadProducts()])
  updateStats()
}

async function loadOrders() {
  try {
    const {data, error} = await adminDb.from('orders').select('*').order('created_at', {ascending:false})
    if (error) throw error
    allOrders = data || []
    renderOrders(allOrders)
  } catch (e) {
    console.error('Load orders failed:', e)
    const t = T[currentLang] || T.ar
    showNotif(t.notif_load_err, 'r')
  }
}

async function loadProducts() {
  try {
    const {data, error} = await adminDb.from('products').select('*').order('created_at', {ascending:false})
    if (error) throw error
    allProducts = data || []
    renderProducts(allProducts)
    const stProducts = document.getElementById('st-products')
    if(stProducts) stProducts.textContent = allProducts.length
  } catch (e) {
    console.error('Load products failed:', e)
    const t = T[currentLang] || T.ar
    showNotif(t.notif_prod_err, 'r')
  }
}

// ============================================================
// RENDER ORDERS
// ============================================================
function getStatusLabels() {
  const t = T[currentLang] || T.ar
  return {
    pending: {lbl:t.st_pending_lbl, cls:'b-pending'},
    confirmed: {lbl:t.st_confirmed_lbl, cls:'b-confirmed'},
    shipped: {lbl:t.st_shipped_lbl, cls:'b-shipped'},
    delivered: {lbl:t.st_delivered_lbl, cls:'b-delivered'},
    cancelled: {lbl:t.st_cancelled_lbl, cls:'b-cancelled'},
  }
}

const ST = {
  pending:   {lbl:'⏳ انتظار',  cls:'b-pending'},
  confirmed: {lbl:'✅ مؤكد',   cls:'b-confirmed'},
  shipped:   {lbl:'🚚 شحن',    cls:'b-shipped'},
  delivered: {lbl:'🎉 تسليم',  cls:'b-delivered'},
  cancelled: {lbl:'❌ ملغي',   cls:'b-cancelled'},
}

function renderOrders(list) {
  const tbody = document.getElementById('orders-body')
  if (!tbody) return
  const t = T[currentLang] || T.ar
  const ST = getStatusLabels()
  
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="9"><div class="empty"><div class="empty-ico">📭</div><div>'+t.no_orders+'</div></div></td></tr>'
    return
  }
  
  tbody.innerHTML = list.map(o => {
    const st = ST[o.status] || ST.pending
    const d = new Date(o.created_at)
    const date = d.getDate()+'/'+(d.getMonth()+1)+' '+d.getHours()+':'+String(d.getMinutes()).padStart(2,'0')
    return `<tr>
      <td style="font-family:monospace;font-size:10px;color:#9CA3AF">${o.id}</td>
      <td style="font-weight:700">${o.customer_name||'-'}</td>
      <td style="direction:ltr;color:#6B7280">${o.customer_phone||'-'}</td>
      <td>${o.governorate||'-'}</td>
      <td><span style="background:#F3F4F6;padding:2px 7px;border-radius:5px;font-size:10px">${o.payment_method||'-'}</span></td>
      <td style="font-weight:900;color:#E8001C">${o.total_tnd||0} د.ت</td>
      <td><span class="badge ${st.cls}">${st.lbl}</span></td>
      <td style="color:#9CA3AF;font-size:10px">${date}</td>
      <td style="white-space:nowrap">
        ${o.status==='pending'?`<button class="abtn a-ok" onclick="upStatus(${o.id},'confirmed')" title="${t.title_confirm}">✓</button>`:''}
        ${o.status==='confirmed'?`<button class="abtn a-ship" onclick="upStatus(${o.id},'shipped')" title="${t.title_ship}">🚚</button>`:''}
        ${o.status==='shipped'?`<button class="abtn a-done" onclick="upStatus(${o.id},'delivered')" title="${t.title_deliver}">🎉</button>`:''}
        ${!['delivered','cancelled'].includes(o.status)?`<button class="abtn a-del" onclick="upStatus(${o.id},'cancelled')" title="${t.title_cancel}">✕</button>`:''}
      </td>
    </tr>`
  }).join('')
}

function renderProducts(list) {
  const tbody = document.getElementById('products-body')
  if (!tbody) return
  const t = T[currentLang] || T.ar
  
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="5"><div class="empty"><div class="empty-ico">🛍️</div><div>'+t.no_products+'</div></div></td></tr>'
    return
  }
  
  tbody.innerHTML = list.map(p => `<tr>
    <td style="font-weight:700">${p.name_ar}</td>
    <td><span style="background:#DBEAFE;color:#1E40AF;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700">${p.category}</span></td>
    <td style="font-weight:900;color:#E8001C">${p.price_tnd} د.ت</td>
    <td style="font-weight:700;color:${p.stock<10?'#E8001C':'#10B981'}">${p.stock}</td>
    <td>${p.discount_pct>0?`<span style="background:#FEE2E2;color:#B91C1C;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700">-${p.discount_pct}%</span>`:'-'}</td>
  </tr>`).join('')
}

// ============================================================
// UPDATE STATUS
// ============================================================
async function upStatus(id, status) {
  try {
    const {error} = await adminDb.from('orders').update({status}).eq('id', id)
    if (error) throw error
    allOrders = allOrders.map(o => o.id==id ? {...o,status} : o)
    renderOrders(allOrders)
    updateStats()
    const t = T[currentLang] || T.ar
    showNotif(t.notif_updated, 'g')
  } catch (e) {
    console.error('Update status failed:', e)
    const t = T[currentLang] || T.ar
    showNotif(t.notif_err, 'r')
  }
}

// ============================================================
// FILTER
// ============================================================
function filterOrders(f, btn) {
  document.querySelectorAll('.fbtn').forEach(b => b.classList.remove('on'))
  if(btn) btn.classList.add('on')
  renderOrders(f==='all' ? allOrders : allOrders.filter(o=>o.status===f))
}

// ============================================================
// ADD PRODUCT
// ============================================================
async function addProduct() {
  try {
    const name = document.getElementById('np-name').value.trim()
    const price = parseFloat(document.getElementById('np-price').value)
    const old = parseFloat(document.getElementById('np-old').value)||0
    const cat = document.getElementById('np-cat').value
    const stock = parseInt(document.getElementById('np-stock').value)||0
    const desc = document.getElementById('np-desc').value.trim()
    const img = document.getElementById('np-img').value.trim()
    const msg = document.getElementById('add-msg')
    const btn = document.getElementById('add-btn')
    const t = T[currentLang] || T.ar

    if(!name||!price){ 
      if(msg) { msg.style.color='#E8001C'; msg.textContent=t.err_name_price }
      return 
    }

    if(btn) btn.disabled=true; 
    if(btn) btn.textContent=t.btn_saving

    const {data, error} = await adminDb.from('products').insert({
      name_ar:name, description_ar:desc, price_tnd:price,
      old_price_tnd:old, category:cat, stock, image_url:img,
      discount_pct: old ? Math.round((1-price/old)*100) : 0,
      active:true
    }).select().single()

    if(btn) btn.disabled=false; 
    if(btn) btn.textContent=t.btn_save

    if(error){ 
      throw error
    }

    if(msg) { msg.style.color='#10B981'; msg.textContent=t.msg_added }
    allProducts.unshift(data)
    renderProducts(allProducts)
    updateStats()
    
    document.getElementById('np-name').value=''
    document.getElementById('np-price').value=''
    document.getElementById('np-old').value=''
    document.getElementById('np-stock').value=''
    document.getElementById('np-desc').value=''
    document.getElementById('np-img').value=''
    
    setTimeout(()=>{ 
      if(msg) msg.textContent=''; 
      showTab('products',null) 
    }, 2000)
  } catch (e) {
    console.error('Add product failed:', e)
    const msg = document.getElementById('add-msg')
    const btn = document.getElementById('add-btn')
    const t = T[currentLang] || T.ar
    if(msg) { msg.style.color='#E8001C'; msg.textContent=t.msg_error }
    if(btn) { btn.disabled=false; btn.textContent=t.btn_save }
  }
}

// ============================================================
// STATS
// ============================================================
function updateStats() {
  const total = allOrders.length
  const pending = allOrders.filter(o=>o.status==='pending').length
  const revenue = allOrders.filter(o=>o.status==='delivered').reduce((s,o)=>s+(parseFloat(o.total_tnd)||0),0)
  const today = allOrders.filter(o=>new Date(o.created_at).toDateString()===new Date().toDateString()).length
  const t = T[currentLang] || T.ar

  const stOrders = document.getElementById('st-orders')
  const stPending = document.getElementById('st-pending')
  const stRevenue = document.getElementById('st-revenue')
  const stToday = document.getElementById('st-today')
  const stProducts = document.getElementById('st-products')
  
  if(stOrders) stOrders.textContent = total
  if(stPending) stPending.textContent = pending
  if(stRevenue) stRevenue.textContent = revenue.toFixed(0)
  if(stToday) stToday.textContent = t.st_today.replace('-', today)
  if(stProducts) stProducts.textContent = allProducts.length

  // Pay stats
  const pays={}
  allOrders.forEach(o=>{pays[o.payment_method]=(pays[o.payment_method]||0)+1})
  
  const payStats = document.getElementById('pay-stats')
  if(payStats) {
    payStats.innerHTML = Object.keys(pays).length
      ? Object.entries(pays).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`
        <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #F3F4F6;font-size:12px">
          <span style="font-weight:600">${k}</span>
          <span style="font-weight:900;color:#E8001C">${v} ${t.order_req}</span>
        </div>`).join('')
      : '<div class="empty" style="padding:20px"><div class="empty-ico" style="font-size:32px">📊</div><div style="font-size:12px">'+t.no_data+'</div></div>'
  }

  // Gov stats
  const govs={}
  allOrders.forEach(o=>{govs[o.governorate]=(govs[o.governorate]||0)+1})
  
  const govStats = document.getElementById('gov-stats')
  if(govStats) {
    govStats.innerHTML = Object.keys(govs).length
      ? Object.entries(govs).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([k,v])=>`
        <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #F3F4F6;font-size:12px">
          <span style="font-weight:600">${k}</span>
          <span style="font-weight:900;color:#3B82F6">${v} ${t.order_req}</span>
        </div>`).join('')
      : '<div class="empty" style="padding:20px"><div class="empty-ico" style="font-size:32px">🗺️</div><div style="font-size:12px">'+t.no_data+'</div></div>'
  }
}

// ============================================================
// TABS
// ============================================================
function showTab(tab, btn) {
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'))
  document.querySelectorAll('.sb-btn').forEach(b=>b.classList.remove('active'))
  
  const tabEl = document.getElementById('tab-'+tab)
  if(tabEl) tabEl.classList.add('on')
  
  if(btn) btn.classList.add('active')
  
  const t = T[currentLang] || T.ar
  const titles={orders:t.sb_orders,products:t.sb_products,add:t.sb_add,stats:t.sb_stats}
  const pageTitle = document.getElementById('page-title')
  if(pageTitle) pageTitle.textContent = titles[tab]||''
  
  if(tab==='stats') updateStats()
}

// ============================================================
// NOTIFICATION
// ============================================================
let nt
function showNotif(msg, type='') {
  const el=document.getElementById('notif')
  if(!el) return
  el.textContent=msg
  el.className='notif show'+(type?' '+type:'')
  clearTimeout(nt)
  nt=setTimeout(()=>el.classList.remove('show'),3000)
}

// ============================================================
// INIT
// ============================================================
let isAuthenticated = false
document.addEventListener('DOMContentLoaded', async () => {
  adminDb = supabase.createClient(SUPA_URL, SUPA_KEY)
  isAuthenticated = await checkAdminAuth()
})
