// ============================================================
// سوق بلادي - Souq Bladi - Admin Panel Functions
// ============================================================

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
    return true
  } catch (e) {
    console.error('Auth check failed:', e)
    window.location.href = 'admin-login.html'
    return false
  }
}

// ============================================================
// LOGOUT
// ============================================================
async function doLogout() {
  try {
    await adminDb.auth.signOut()
    window.location.href = 'admin-login.html'
  } catch (e) {
    console.error('Logout failed:', e)
    window.location.href = 'admin-login.html'
  }
}

// ============================================================
// INIT
// ============================================================
window.onload = async function() {
  adminDb = supabase.createClient(SUPA_URL, SUPA_KEY)

  const isAuthenticated = await checkAdminAuth()
  if (!isAuthenticated) return

  document.getElementById('login-page').style.display = 'none'
  document.getElementById('admin-page').style.display = 'block'
  initAdmin()
}

function initAdmin() {
  adminDb = supabase.createClient(SUPA_URL, SUPA_KEY)
  loadAll()

  // Real-time new orders
  adminDb.channel('orders')
    .on('postgres_changes', {event:'INSERT', schema:'public', table:'orders'}, p => {
      allOrders.unshift(p.new)
      renderOrders(allOrders)
      updateStats()
      showNotif('🔔 طلب جديد من ' + p.new.customer_name + '!', 'g')
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
    showNotif('❌ خطأ في تحميل الطلبات', 'r')
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
    showNotif('❌ خطأ في تحميل المنتجات', 'r')
  }
}

// ============================================================
// RENDER ORDERS
// ============================================================
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
  
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="9"><div class="empty"><div class="empty-ico">📭</div><div>لا توجد طلبات بعد</div></div></td></tr>'
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
        ${o.status==='pending'?`<button class="abtn a-ok" onclick="upStatus(${o.id},'confirmed')" title="تأكيد">✓</button>`:''}
        ${o.status==='confirmed'?`<button class="abtn a-ship" onclick="upStatus(${o.id},'shipped')" title="شحن">🚚</button>`:''}
        ${o.status==='shipped'?`<button class="abtn a-done" onclick="upStatus(${o.id},'delivered')" title="تسليم">🎉</button>`:''}
        ${!['delivered','cancelled'].includes(o.status)?`<button class="abtn a-del" onclick="upStatus(${o.id},'cancelled')" title="إلغاء">✕</button>`:''}
      </td>
    </tr>`
  }).join('')
}

function renderProducts(list) {
  const tbody = document.getElementById('products-body')
  if (!tbody) return
  
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="5"><div class="empty"><div class="empty-ico">🛍️</div><div>لا توجد منتجات — أضف منتجاً</div></div></td></tr>'
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
    showNotif('✅ تم تحديث الطلب', 'g')
  } catch (e) {
    console.error('Update status failed:', e)
    showNotif('❌ خطأ في تحديث الطلب', 'r')
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

    if(!name||!price){ 
      if(msg) { msg.style.color='#E8001C'; msg.textContent='⚠️ أدخل الاسم والسعر' }
      return 
    }

    if(btn) btn.disabled=true; 
    if(btn) btn.textContent='⏳ جاري الحفظ...'

    const {data, error} = await adminDb.from('products').insert({
      name_ar:name, description_ar:desc, price_tnd:price,
      old_price_tnd:old, category:cat, stock, image_url:img,
      discount_pct: old ? Math.round((1-price/old)*100) : 0,
      active:true
    }).select().single()

    if(btn) btn.disabled=false; 
    if(btn) btn.textContent='➕ حفظ المنتج'

    if(error){ 
      throw error
    }

    if(msg) { msg.style.color='#10B981'; msg.textContent='✅ تمت الإضافة!' }
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
    if(msg) { msg.style.color='#E8001C'; msg.textContent='❌ خطأ في إضافة المنتج' }
    if(btn) { btn.disabled=false; btn.textContent='➕ حفظ المنتج' }
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

  const stOrders = document.getElementById('st-orders')
  const stPending = document.getElementById('st-pending')
  const stRevenue = document.getElementById('st-revenue')
  const stToday = document.getElementById('st-today')
  const stProducts = document.getElementById('st-products')
  
  if(stOrders) stOrders.textContent = total
  if(stPending) stPending.textContent = pending
  if(stRevenue) stRevenue.textContent = revenue.toFixed(0)
  if(stToday) stToday.textContent = 'اليوم: '+today+' طلب'
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
          <span style="font-weight:900;color:#E8001C">${v} طلب</span>
        </div>`).join('')
      : '<div class="empty" style="padding:20px"><div class="empty-ico" style="font-size:32px">📊</div><div style="font-size:12px">لا توجد بيانات بعد</div></div>'
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
          <span style="font-weight:900;color:#3B82F6">${v} طلب</span>
        </div>`).join('')
      : '<div class="empty" style="padding:20px"><div class="empty-ico" style="font-size:32px">🗺️</div><div style="font-size:12px">لا توجد بيانات بعد</div></div>'
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
  
  const titles={orders:'📦 الطلبات',products:'🛍️ المنتجات',add:'➕ إضافة منتج',stats:'📊 إحصائيات'}
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
