// ============================================================
// سوق بلادي - Souq Bladi - Authentication Functions
// ============================================================

let currentUser = null

// ============================================================
// CHECK SESSION
// ============================================================
async function checkSession() {
  try {
    const {data:{session}} = await db.auth.getSession()
    if(session?.user) { currentUser = session.user; updateHeaderUser(session.user) }
    db.auth.onAuthStateChange((event, session) => {
      if(session?.user) {
        currentUser = session.user; updateHeaderUser(session.user)
        if(event==='SIGNED_IN') { showLoggedIn(session.user); loadOrders(session.user.email) }
      } else { currentUser = null; updateHeaderUser(null) }
    })
  } catch(e) {}
}

// ============================================================
// UPDATE HEADER USER
// ============================================================
function updateHeaderUser(user) {
  const el = document.getElementById('hbtn-acc')
  const t = typeof T !== 'undefined' ? (T[currentLang] || T.ar) : {my_acc:'حسابي'}
  if(el) {
    el.textContent = user ? (user.user_metadata?.full_name||user.email?.split('@')[0]||t.my_acc).slice(0,10) : t.my_acc
  }
}

// ============================================================
// SHOW LOGGED IN
// ============================================================
function showLoggedIn(user) {
  const accOut = document.getElementById('acc-out')
  const accIn = document.getElementById('acc-in')
  if(accOut) accOut.style.display = 'none'
  if(accIn) accIn.style.display = 'block'
  
  const name = user.user_metadata?.full_name || user.email?.split('@')[0] || '?'
  const accName = document.getElementById('acc-name')
  const accEmail = document.getElementById('acc-email')
  const accAvatar = document.getElementById('acc-avatar')
  
  if(accName) accName.textContent = name
  if(accEmail) accEmail.textContent = user.email
  if(accAvatar) accAvatar.textContent = name[0]?.toUpperCase() || '?'
}

// ============================================================
// LOAD ORDERS
// ============================================================
async function loadOrders(email) {
  const {data} = await db.from('orders').select('*').order('created_at',{ascending:false}).limit(5)
  const el = document.getElementById('acc-orders-list')
  if(!el) return
  if(!data?.length) { 
    const msg = currentLang==='ar'?'لا توجد طلبات بعد':'No orders yet'
    el.innerHTML = `<p style="text-align:center;color:#9CA3AF;font-size:12px;padding:10px">${msg}</p>`; 
    return 
  }
  el.innerHTML = data.map(o => `<div style="background:#F9FAFB;border-radius:8px;padding:10px;margin-bottom:7px;font-size:11px"><div style="display:flex;justify-content:space-between"><span style="font-family:monospace">#${o.id}</span><span style="font-weight:900;color:var(--red)">${o.total_tnd} د.ت</span></div><div style="color:#9CA3AF;margin-top:3px">${o.governorate} · ${o.status}</div></div>`).join('')
}

// ============================================================
// LOGIN USER
// ============================================================
async function loginUser() {
  const email = document.getElementById('login-email').value.trim()
  const pass = document.getElementById('login-pass').value
  const btn = document.getElementById('login-btn')
  const err = document.getElementById('login-err')
  
  if(!email || !pass) { 
    const msg = currentLang==='ar'?'⚠️ أدخل الإيميل وكلمة المرور':'⚠️ Enter email and password'
    if(err) { err.textContent = msg; err.style.display = 'block' }
    return 
  }
  
  if(btn) btn.disabled=true; 
  if(btn) btn.textContent='⏳...'
  if(err) err.style.display = 'none'
  
  try {
    const {data, error} = await db.auth.signInWithPassword({email, password:pass})
    if(error) { 
      const errorMsg = error.message==='Invalid login credentials'?(currentLang==='ar'?'إيميل أو كلمة مرور خاطئة':'Wrong email or password'):error.message
      if(err) { err.textContent='❌ '+errorMsg; err.style.display='block' } 
    }
    else { 
      const msg = currentLang==='ar'?'مرحباً بك!':'Welcome!'
      showToast('✅ '+msg, true); 
      closeModal('account-modal') 
    }
  } catch(e) { 
    const msg = currentLang==='ar'?'خطأ في الاتصال':'Connection error'
    if(err) { err.textContent='❌ '+msg; err.style.display='block' } 
  }
  
  if(btn) btn.disabled=false
  if(btn) btn.textContent=typeof T !== 'undefined' ? (T[currentLang]?.login||'تسجيل الدخول') : 'تسجيل الدخول'
}

// ============================================================
// REGISTER USER
// ============================================================
async function registerUser() {
  const name = document.getElementById('reg-name').value.trim()
  const email = document.getElementById('reg-email').value.trim()
  const pass = document.getElementById('reg-pass').value
  const btn = document.getElementById('reg-btn')
  const err = document.getElementById('reg-err')
  
  if(!name||!email||!pass) { 
    const msg = currentLang==='ar'?'يرجى ملء جميع الحقول':'Please fill all fields'
    if(err) { err.textContent='⚠️ '+msg; err.style.display='block' }
    return 
  }
  
  if(btn) btn.disabled=true; 
  if(btn) btn.textContent='⏳...'
  
  try {
    const {error} = await db.auth.signUp({
      email, 
      password:pass, 
      options:{
        data:{full_name:name}, 
        emailRedirectTo:'https://mclient01.github.io/souq-bladi/'
      }
    })
    if(error) { 
      if(err) { err.textContent='❌ '+error.message; err.style.display='block' } 
    }
    else { 
      const msg = currentLang==='ar'?'تم إنشاء حسابك! تحقق من إيميلك':'Account created! Check your email'
      showToast('✅ '+msg, true); 
      switchAccTab('login',null) 
    }
  } catch(e) { 
    if(err) { err.textContent='❌ Error'; err.style.display='block' } 
  }
  
  if(btn) btn.disabled=false
}

// ============================================================
// LOGIN WITH GOOGLE
// ============================================================
async function loginGoogle() {
  const {error} = await db.auth.signInWithOAuth({
    provider:'google', 
    options:{redirectTo:'https://mclient01.github.io/souq-bladi/'}
  })
  if(error) showToast('❌ '+error.message)
}

// ============================================================
// LOGIN WITH FACEBOOK
// ============================================================
async function loginFacebook() {
  const {error} = await db.auth.signInWithOAuth({
    provider:'facebook', 
    options:{redirectTo:'https://mclient01.github.io/souq-bladi/'}
  })
  if(error) showToast('❌ '+error.message)
}

// ============================================================
// LOGOUT USER
// ============================================================
async function logoutUser() {
  await db.auth.signOut()
  currentUser = null; 
  updateHeaderUser(null)
  
  const accOut = document.getElementById('acc-out')
  const accIn = document.getElementById('acc-in')
  if(accOut) accOut.style.display = 'block'
  if(accIn) accIn.style.display = 'none'
  
  closeModal('account-modal')
  
  const msg = currentLang==='ar'?'تم تسجيل الخروج':'Signed out'
  showToast('👋 '+msg, true)
}

// ============================================================
// SWITCH ACCOUNT TAB
// ============================================================
function switchAccTab(tab, btn) {
  document.querySelectorAll('.acc-tab').forEach(t=>t.classList.remove('active'))
  document.querySelectorAll('.acc-content').forEach(t=>t.classList.remove('active'))
  if(btn) btn.classList.add('active')
  const el = document.getElementById('acc-'+tab)
  if(el) el.classList.add('active')
  if(!btn) {
    const loginBtn = document.getElementById('tab-login-btn')
    const regBtn = document.getElementById('tab-reg-btn')
    if(tab==='login' && loginBtn) loginBtn.classList.add('active')
    if(tab==='register' && regBtn) regBtn.classList.add('active')
  }
}
