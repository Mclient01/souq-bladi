// ============================================================
// سوق بلادي - Souq Bladi - Cart Functions
// ============================================================

let cart = JSON.parse(localStorage.getItem('sb-cart') || '[]')
let wishlist = JSON.parse(localStorage.getItem('sb-wish') || '[]')

// ============================================================
// SAVE CART
// ============================================================
function saveCart() { 
  localStorage.setItem('sb-cart', JSON.stringify(cart)) 
}

// ============================================================
// SAVE WISHLIST
// ============================================================
function saveWish() { 
  localStorage.setItem('sb-wish', JSON.stringify(wishlist)) 
}

// ============================================================
// ADD TO CART
// ============================================================
function addToCart(id) {
  const PRODUCTS = window.PRODUCTS || []
  const p = PRODUCTS.find(x => x.id === id)
  if(!p) return
  const ex = cart.find(x => x.id === id)
  if(ex) ex.qty++
  else cart.push({...p, qty:1})
  saveCart(); updateBadge(); renderCart()
  const name = (p.names && p.names[currentLang]) ? p.names[currentLang] : p.names.ar
  showToast(`✅ ${name.slice(0,25)}`, true)
}

// ============================================================
// UPDATE BADGE
// ============================================================
function updateBadge() {
  const badge = document.getElementById('cart-badge')
  if(badge) badge.textContent = cart.reduce((s,i) => s+i.qty, 0)
}

// ============================================================
// RENDER CART
// ============================================================
function renderCart() {
  const el = document.getElementById('cart-items')
  const foot = document.getElementById('cart-foot')
  const t = typeof T !== 'undefined' ? (T[currentLang] || T.ar) : {cart:'السلة'}
  
  if(!cart.length) {
    if(el) el.innerHTML = `<div class="cart-empty"><div style="font-size:52px">🛒</div><div style="font-weight:700">${t.cart}</div></div>`
    if(foot) foot.style.display = 'none'; 
    return
  }
  
  const sub = cart.reduce((s,i) => s+i.price*i.qty, 0)
  if(el) {
    el.innerHTML = cart.map(i => {
      const name = (i.names && i.names[currentLang]) ? i.names[currentLang] : i.names.ar
      return `<div class="citem">
        <div class="citem-img">${i.ico}</div>
        <div class="citem-info">
          <div class="citem-name">${name}</div>
          <div class="citem-price">${fmt(i.price)}</div>
          <div class="cqty">
            <button class="qty-btn" onclick="changeQty(${i.id},-1)">−</button>
            <span style="font-weight:700;font-size:12px;min-width:16px;text-align:center">${i.qty}</span>
            <button class="qty-btn" onclick="changeQty(${i.id},1)">+</button>
          </div>
        </div>
        <button class="citem-del" onclick="removeItem(${i.id})">🗑️</button>
      </div>`
    }).join('')
  }
  
  const csSub = document.getElementById('cs-sub')
  const csTotal = document.getElementById('cs-total')
  if(csSub) csSub.textContent = fmt(sub)
  if(csTotal) csTotal.textContent = fmt(sub+7)
  
  updateOrderSummary(sub)
  if(foot) foot.style.display = 'block'
}

// ============================================================
// CHANGE QUANTITY
// ============================================================
function changeQty(id, d) {
  const i = cart.find(x => x.id===id)
  if(i) { i.qty += d; if(i.qty <= 0) cart = cart.filter(x => x.id!==id) }
  saveCart(); renderCart(); updateBadge()
}

// ============================================================
// REMOVE ITEM
// ============================================================
function removeItem(id) { 
  cart = cart.filter(x => x.id!==id); 
  saveCart(); 
  renderCart(); 
  updateBadge() 
}

// ============================================================
// OPEN CART
// ============================================================
function openCart() {
  const cartPanel = document.getElementById('cart-panel')
  const overlay = document.getElementById('overlay')
  if(cartPanel) cartPanel.classList.add('open')
  if(overlay) overlay.classList.add('open')
}

// ============================================================
// CLOSE CART
// ============================================================
function closeCart() {
  const cartPanel = document.getElementById('cart-panel')
  const overlay = document.getElementById('overlay')
  if(cartPanel) cartPanel.classList.remove('open')
  if(overlay) overlay.classList.remove('open')
}

// ============================================================
// UPDATE ORDER SUMMARY
// ============================================================
function updateOrderSummary(sub) {
  const s = sub === undefined ? cart.reduce((s,i)=>s+i.price*i.qty,0) : sub
  const osSub = document.getElementById('os-sub')
  const osTotal = document.getElementById('os-total')
  const usdAmt = document.getElementById('usd-amt')
  const usdtAmt = document.getElementById('usdt-amt')
  
  if(osSub) osSub.textContent = fmt(s)
  if(osTotal) osTotal.textContent = fmt(s+7)
  if(usdAmt) usdAmt.textContent = `$${((s+7)*0.325).toFixed(2)}`
  if(usdtAmt) usdtAmt.textContent = `${((s+7)*0.325).toFixed(2)} USDT`
}

// ============================================================
// OPEN CHECKOUT
// ============================================================
function openCheckout() {
  if(!cart.length) { 
    const msg = currentLang==='ar'?'السلة فارغة':'Cart is empty'
    showToast('🛒 '+msg); 
    return 
  }
  closeCart()
  openModal('checkout-modal')
  updateOrderSummary()
  updateRegions('TN')
}

// ============================================================
// SELECT PAYMENT
// ============================================================
function selPay(el, type) {
  document.querySelectorAll('.pm').forEach(m => m.classList.remove('active'))
  el.classList.add('active')
  const usdPanel = document.getElementById('usd-panel')
  const usdtPanel = document.getElementById('usdt-panel')
  if(usdPanel) usdPanel.classList.toggle('show', type==='usd')
  if(usdtPanel) usdtPanel.classList.toggle('show', type==='usdt')
}

// ============================================================
// SELECT NETWORK
// ============================================================
function selNet(el, net) {
  selNetwork = net
  document.querySelectorAll('.net-tag').forEach(t => t.classList.remove('active'))
  el.classList.add('active')
  const walletAddr = document.getElementById('wallet-addr')
  if(walletAddr) walletAddr.textContent = WALLETS[net]
}

// ============================================================
// COPY ADDRESS
// ============================================================
function copyAddr() { 
  navigator.clipboard.writeText(WALLETS[selNetwork]).then(() => showToast('📋 Copied!', true)) 
}

// ============================================================
// PLACE ORDER
// ============================================================
async function placeOrder() {
  const fname = document.getElementById('f-fname').value.trim()
  const phone = document.getElementById('f-phone').value.trim()
  const addr = document.getElementById('f-addr').value.trim()
  
  if(!fname || !phone || !addr) { 
    const msg = currentLang==='ar'?'يرجى ملء الحقول':'Please fill all fields'
    showToast('⚠️ '+msg); 
    return 
  }
  
  const btn = document.getElementById('place-btn')
  if(btn) btn.disabled = true; 
  if(btn) btn.textContent = '⏳...'
  
  const sub = cart.reduce((s,i)=>s+i.price*i.qty,0)
  const gov = document.getElementById('f-gov').value
  const country = document.getElementById('f-country').value
  const activePay = document.querySelector('.pm.active')
  const payMethod = activePay ? activePay.querySelector('.pm-name').textContent : 'COD'
  
  try {
    const {data, error} = await db.from('orders').insert({
      customer_name: fname + ' ' + document.getElementById('f-lname').value,
      customer_phone: phone,
      customer_address: addr,
      governorate: gov,
      payment_method: payMethod,
      currency: curCode,
      total_tnd: sub+7,
      status: 'pending',
      items: cart.map(i=>({id:i.id,name:i.names.ar,qty:i.qty,price:i.price}))
    }).select().single()
    
    const orderId = error ? 'TN-'+Date.now().toString().slice(-6) : 'TN-'+String(data.id).slice(0,6).toUpperCase()
    const sOrderId = document.getElementById('s-order-id')
    if(sOrderId) sOrderId.textContent = '#'+orderId
    
    showPayDetails(payMethod, sub+7)
  } catch(e) {
    const sOrderId = document.getElementById('s-order-id')
    if(sOrderId) sOrderId.textContent = '#TN-'+Date.now().toString().slice(-6)
  }
  
  closeModal('checkout-modal')
  cart = []; saveCart(); updateBadge(); renderCart()
  
  const successOv = document.getElementById('success-ov')
  if(successOv) successOv.classList.add('open')
  
  if(btn) btn.disabled = false
  const t = typeof T !== 'undefined' ? (T[currentLang] || T.ar) : {place_order:'✅ تأكيد الطلب'}
  if(btn) btn.textContent = t.place_order
}

// ============================================================
// SHOW PAYMENT DETAILS
// ============================================================
function showPayDetails(method, total) {
  const el = document.getElementById('pay-details')
  if(!el) return
  
  const m = method.toLowerCase()
  const usd = (total*0.325).toFixed(2)
  let html = ''
  
  if(m.includes('d17') || m.includes('d 17')) {
    html = `<div class="pd-method hl"><div class="pd-title">📲 D17</div><div class="pd-row"><span class="pd-lbl">رقم D17</span><span style="display:flex;align-items:center"><button class="pd-copy" onclick="copyText('+21600000000')">نسخ</button><span class="pd-val">+216 XX XXX XXX</span></span></div><div class="pd-row"><span class="pd-lbl">المبلغ</span><span class="pd-val" style="color:var(--red);font-family:'Cairo',sans-serif;font-size:14px;font-weight:900">${fmt(total)}</span></div></div>`
  } else if(m.includes('usdt') || m.includes('tether')) {
    html = `<div class="pd-method hl" style="background:linear-gradient(135deg,#0D2B1F,#133D2A);border-color:#26A17B"><div class="pd-title" style="color:#26A17B">🔷 USDT — ${usd} USDT</div><div class="net-tags" style="margin-top:5px"><span class="net-tag active">TRC20</span></div><div class="wallet-addr" onclick="copyAddr()" style="margin-top:8px">TKjXzp9vF3mNwQ8cYhRfbT2eUsLdP7aKmX</div></div>`
  } else if(m.includes('دولار') || m.includes('paypal') || m.includes('usd')) {
    html = `<div class="pd-method hl"><div class="pd-title">💵 $${usd}</div><div class="pd-row"><span class="pd-lbl">PayPal</span><span class="pd-val">pay@souqbladi.tn</span></div></div>`
  } else if(m.includes('استلام') || m.includes('cod')) {
    const msg = currentLang==='ar'?'ادفع نقداً عند وصول الطلب. سنتصل بك للتأكيد.':'Pay cash upon delivery. We will call to confirm.'
    html = `<div class="cod-box">🚪 ${msg}</div>`
  } else {
    const msg = currentLang==='ar'?'تم استلام طلبك. سنتواصل معك قريباً.':'Order received. We will contact you soon.'
    html = `<div class="cod-box">✅ ${msg}</div>`
  }
  
  const waMsg = currentLang==='ar'?'أرسل إثبات الدفع':'Send payment proof'
  html += `<a class="wa-btn" href="https://wa.me/21600000000" target="_blank">💬 ${waMsg}</a>`
  el.innerHTML = html
}

// ============================================================
// CLOSE SUCCESS
// ============================================================
function closeSuccess() { 
  const successOv = document.getElementById('success-ov')
  if(successOv) successOv.classList.remove('open') 
}

// ============================================================
// ADD TO WISHLIST
// ============================================================
function addWish(id) {
  const PRODUCTS = window.PRODUCTS || []
  const p = PRODUCTS.find(x => x.id===id)
  if(!p) return
  if(wishlist.find(x => x.id===id)) { 
    const msg = currentLang==='ar'?'موجود في المفضلة':'Already in wishlist'
    showToast('❤️ '+msg); 
    return 
  }
  wishlist.push(p); 
  saveWish(); 
  renderWishlist()
  const name = (p.names[currentLang]||p.names.ar).slice(0,20)
  showToast('❤️ '+name, true)
}

// ============================================================
// REMOVE FROM WISHLIST
// ============================================================
function removeWish(id) { 
  wishlist = wishlist.filter(x => x.id!==id); 
  saveWish(); 
  renderWishlist() 
}

// ============================================================
// RENDER WISHLIST
// ============================================================
function renderWishlist() {
  const el = document.getElementById('wish-content')
  const t = typeof T !== 'undefined' ? (T[currentLang] || T.ar) : {wish:'المفضلة',add_cart:'🛒 أضف للسلة'}
  
  if(!wishlist.length) {
    if(el) el.innerHTML = `<div style="text-align:center;padding:30px;color:#9CA3AF"><div style="font-size:48px;margin-bottom:10px">❤️</div><div style="font-weight:700">${t.wish}</div></div>`
    return
  }
  
  if(el) {
    el.innerHTML = `<div class="wish-grid">${wishlist.map(p => {
      const name = (p.names && p.names[currentLang]) ? p.names[currentLang] : p.names.ar
      return `<div class="wish-item"><button class="wi-del" onclick="removeWish(${p.id})">✕</button><div class="wi-ico">${p.ico}</div><div class="wi-name">${name.slice(0,25)}</div><div class="wi-price">${fmt(p.price)}</div><button class="wi-add" onclick="addToCart(${p.id});removeWish(${p.id})">${t.add_cart}</button></div>`
    }).join('')}</div>`
  }
}

// ============================================================
// TRACK ORDER
// ============================================================
async function trackOrder() {
  const inp = document.getElementById('track-inp')
  if(!inp) return
  
  const val = inp.value.trim()
  if(!val) return
  
  const res = document.getElementById('track-result')
  if(res) res.style.display = 'block'
  
  const trackSteps = document.getElementById('track-steps')
  if(trackSteps) trackSteps.innerHTML = '<div style="text-align:center;padding:15px;color:#9CA3AF">⏳ جاري البحث...</div>'
  
  try {
    const num = val.replace(/[^0-9]/g,'')
    const {data, error} = await db.from('orders').select('*').eq('id', num).single()
    
    if(error || !data) {
      const msg = currentLang==='ar'?'لم يتم العثور على الطلب':'Order not found'
      if(trackSteps) trackSteps.innerHTML = `<div style="text-align:center;padding:15px;color:var(--red)">😔 ${msg}</div>`
      return
    }
    
    const statuses = {pending:{label:'⏳ انتظار',steps:1},confirmed:{label:'✅ مؤكد',steps:2},shipped:{label:'🚚 شحن',steps:3},delivered:{label:'🎉 تسليم',steps:4},cancelled:{label:'❌ ملغي',steps:0}}
    const st = statuses[data.status] || statuses.pending
    
    const trackOrderNum = document.getElementById('track-order-num')
    const trackStatus = document.getElementById('track-status')
    if(trackOrderNum) trackOrderNum.textContent = '#'+data.id
    if(trackStatus) trackStatus.textContent = st.label
    
    const steps = [
      {ico:'✅',t:'تم استلام الطلب',done:st.steps>=1},
      {ico:'📋',t:'تم تأكيد الطلب',done:st.steps>=2},
      {ico:'🚚',t:'في الطريق إليك',done:st.steps>=3},
      {ico:'🎉',t:'تم التسليم',done:st.steps>=4}
    ]
    
    if(trackSteps) {
      trackSteps.innerHTML = steps.map((s,i) => `
        <div class="track-step ${s.done?'ts-done':''} ${st.steps===i+1?'ts-active':''}">
          <div class="ts-ico" style="opacity:${s.done?1:0.3}">${s.ico}</div>
          <div><div class="ts-title" style="${!s.done?'color:#D1D5DB':''}">${s.t}</div><div class="ts-date">${s.done?data.governorate:'---'}</div></div>
          <span style="margin-right:auto;color:${s.done?'var(--green)':'#E5E7EB'}">${s.done?'✓':'○'}</span>
        </div>`).join('')
    }
  } catch(e) {
    if(trackSteps) trackSteps.innerHTML = '<div style="color:var(--red);text-align:center;padding:10px">❌ خطأ في الاتصال</div>'
  }
}
