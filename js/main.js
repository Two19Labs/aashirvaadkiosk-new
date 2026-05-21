// =============================================
// COORDINATION & INTERACTION LOGIC
// =============================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize app
  applyTranslations();
  setupInputRestrictions();

  // Pre-populate with default test values for fast testing
  const iName = document.getElementById('i-name');
  const iPhone = document.getElementById('i-phone');
  const iOtp = document.getElementById('i-otp');

  if (iName) iName.value = "";
  if (iPhone) iPhone.value = "";
  if (iOtp) iOtp.value = "";

  S.name = "";
  S.phone = "";

  // Load previous session if available
  const savedSession = localStorage.getItem('ASH_KIOSK_SESSION');
  if (savedSession) {
    try {
      const parsed = JSON.parse(savedSession);
      if (parsed.lang) S.lang = parsed.lang;
      if (parsed.name) {
        if (iName) iName.value = parsed.name;
        S.name = parsed.name;
      }
      if (parsed.phone) {
        if (iPhone) iPhone.value = parsed.phone;
        S.phone = parsed.phone;
      }
      if (parsed.email) {
        document.getElementById('d-email').value = parsed.email;
        S.email = parsed.email;
      }
      applyTranslations();
    } catch (e) {
      console.warn("Failed to load saved session:", e);
    }
  }
});

// =============================================
// TOAST SYSTEM
// =============================================
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = message;
  toast.classList.add('show');

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// =============================================
// INPUT FILTERS & VALIDATIONS
// =============================================
function setupInputRestrictions() {
  const phoneInp = document.getElementById('i-phone');
  const otpInp = document.getElementById('i-otp');
  const nameInp = document.getElementById('i-name');
  const emailInp = document.getElementById('d-email');

  // Home Delivery Fields
  const delName = document.getElementById('i-delivery-name');
  const delPhone = document.getElementById('i-delivery-phone');
  const delFlat = document.getElementById('i-delivery-flat');
  const delArea = document.getElementById('i-delivery-area');
  const delPin = document.getElementById('i-delivery-pincode');
  const delCity = document.getElementById('i-delivery-city');
  const delState = document.getElementById('i-delivery-state');

  if (phoneInp) {
    phoneInp.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
      const err = document.getElementById('e-phone');
      if (this.value.length === 10) {
        if (err) err.classList.remove('show');
      }
    });
    phoneInp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        goOTP();
      }
    });
  }

  if (otpInp) {
    otpInp.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
      const err = document.getElementById('e-otp');
      if (this.value.length === 4) {
        if (err) err.classList.remove('show');
      }
    });
    otpInp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        verifyOTP();
      }
    });
  }

  if (nameInp) {
    nameInp.addEventListener('input', function() {
      const err = document.getElementById('e-name');
      if (this.value.trim().length > 0) {
        if (err) err.classList.remove('show');
      }
    });
    nameInp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        goOTP();
      }
    });
  }

  if (emailInp) {
    emailInp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        beginProfiling();
      }
    });
  }

  // Set up filters on delivery form elements
  if (delName) {
    delName.addEventListener('input', function() {
      const err = document.getElementById('e-delivery-name');
      if (this.value.trim().length > 0 && err) err.classList.remove('show');
    });
  }
  
  if (delPhone) {
    delPhone.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
      const err = document.getElementById('e-delivery-phone');
      if (this.value.length === 10 && err) err.classList.remove('show');
    });
  }

  if (delFlat) {
    delFlat.addEventListener('input', function() {
      const err = document.getElementById('e-delivery-flat');
      if (this.value.trim().length > 0 && err) err.classList.remove('show');
    });
  }

  if (delArea) {
    delArea.addEventListener('input', function() {
      const err = document.getElementById('e-delivery-area');
      if (this.value.trim().length > 0 && err) err.classList.remove('show');
    });
  }

  if (delPin) {
    delPin.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
      const err = document.getElementById('e-delivery-pincode');
      if (this.value.length === 6 && err) err.classList.remove('show');
    });
  }

  if (delCity) {
    delCity.addEventListener('input', function() {
      const err = document.getElementById('e-delivery-city');
      if (this.value.trim().length > 0 && err) err.classList.remove('show');
    });
  }

  if (delState) {
    delState.addEventListener('input', function() {
      const err = document.getElementById('e-delivery-state');
      if (this.value.trim().length > 0 && err) err.classList.remove('show');
    });
  }
}

// =============================================
// LOGIN & OTP TRANSITIONS
// =============================================
function goOTP() {
  const nameInp = document.getElementById('i-name');
  const phoneInp = document.getElementById('i-phone');
  const eName = document.getElementById('e-name');
  const ePhone = document.getElementById('e-phone');

  const name = nameInp ? nameInp.value.trim() : '';
  const phone = phoneInp ? phoneInp.value.trim() : '';

  let isValid = true;

  if (!name) {
    if (eName) eName.classList.add('show');
    showToast(T('toast_name_req'));
    isValid = false;
  } else {
    if (eName) eName.classList.remove('show');
  }

  if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    if (ePhone) ePhone.classList.add('show');
    showToast(T('toast_phone_req'));
    isValid = false;
  } else {
    if (ePhone) ePhone.classList.remove('show');
  }

  if (!isValid) return;

  S.name = name;
  S.phone = phone;
  saveState();

  const otpDesc = document.getElementById('otp-desc');
  if (otpDesc) {
    otpDesc.innerText = `${T('otp_subtitle')} +91 ${phone}`;
  }

  const otpInp = document.getElementById('i-otp');
  if (otpInp) {
    otpInp.value = '';
    const eOtp = document.getElementById('e-otp');
    if (eOtp) eOtp.classList.remove('show');
  }

  show('s-otp');
}

function verifyOTP() {
  const otpInp = document.getElementById('i-otp');
  const eOtp = document.getElementById('e-otp');
  const otp = otpInp ? otpInp.value.trim() : '';

  if (!otp || otp.length !== 4 || !/^\d{4}$/.test(otp)) {
    if (eOtp) eOtp.classList.add('show');
    showToast(T('toast_otp_req'));
    return;
  }

  if (eOtp) eOtp.classList.remove('show');

  const dName = document.getElementById('d-name');
  const dPhone = document.getElementById('d-phone');

  if (dName) dName.value = S.name;
  if (dPhone) dPhone.value = S.phone;

  show('s-details');
}

function beginProfiling() {
  const emailInp = document.getElementById('d-email');
  const email = emailInp ? emailInp.value.trim() : '';

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast(S.lang === 'en' ? "Please enter a valid email address" : "कृपया एक मान्य ईमेल पता दर्ज करें");
    return;
  }

  S.email = email;
  saveState();
  saveProfile();

  // Reset any active selection classes in the survey prior to entry
  clearActiveSurveyUI();

  // Proceed to Survey Q1
  show('s-q1');
}

// =============================================
// SURVEY SELECTION HANDLERS
// =============================================

/**
 * Handle Q1: Select Family Size
 */
function selectFamilySize(element, size) {
  S.familySize = size;
  
  // Unselect others
  const parent = element.closest('.mcq-grid');
  if (parent) {
    parent.querySelectorAll('.mcq').forEach(card => card.classList.remove('sel'));
  }
  element.classList.add('sel');

  const err = document.getElementById('e-q1');
  if (err) err.classList.remove('show');
}

/**
 * Handle Q2: Select Family Composition (Multi-Select)
 */
function toggleComposition(element, ageGroup) {
  const idx = S.composition.indexOf(ageGroup);
  if (idx > -1) {
    S.composition.splice(idx, 1);
    element.classList.remove('sel');
  } else {
    S.composition.push(ageGroup);
    element.classList.add('sel');
  }

  const err = document.getElementById('e-q2');
  if (err && S.composition.length > 0) {
    err.classList.remove('show');
  }
}

/**
 * Handle Q3: Select Atta Journey Track (Single-Select)
 */
function selectTrack(element, track) {
  S.selectionTrack = track;

  const parent = element.closest('.mcq-grid');
  if (parent) {
    parent.querySelectorAll('.mcq').forEach(card => card.classList.remove('sel'));
  }
  element.classList.add('sel');

  const err = document.getElementById('e-q3');
  if (err) err.classList.remove('show');
}

function selectTraditionalBlend(element, blendName) {
  const idx = S.selectedBlends.indexOf(blendName);
  if (idx > -1) {
    // Unselect
    S.selectedBlends.splice(idx, 1);
    element.classList.remove('sel');
  } else {
    // Select
    S.selectedBlends.push(blendName);
    element.classList.add('sel');
  }

  const err = document.getElementById('e-trad');
  if (err && S.selectedBlends.length > 0) {
    err.classList.remove('show');
  }

  updateSidebarSummary();
  saveState();
}

function updateCardQty(input, blendName) {
  const val = parseInt(input.value);
  S.blendQuantities[blendName] = val;
  const labelEl = document.getElementById(`qty-val-${blendName}`);
  if (labelEl) labelEl.innerText = `${val} kg`;
  updateSidebarSummary();
  saveState();
}

function updateSidebarSummary() {
  const unifiedCard = document.getElementById('unified-summary-card');
  const emptyCard = document.getElementById('empty-summary-card');
  const genBtn = document.querySelector('#s-track-trad .fnav .btn-sm');

  if (!unifiedCard || !emptyCard) return;

  if (S.selectedBlends.length === 0 && !S.chakkiActive) {
    unifiedCard.style.display = 'none';
    emptyCard.style.display = 'block';
    if (genBtn) genBtn.style.display = 'block';
    return;
  }

  emptyCard.style.display = 'none';
  unifiedCard.style.display = 'block';

  let inStoreBlends = [];
  let deliveryBlends = [];
  let inStoreTotalWeight = S.chakkiActive ? 10 : 0;
  let deliveryTotalWeight = 0;

  const blendMetadata = {
    sharbati: { name: '100% Sharbati Atta', nameHi: '100% शरबती आटा', aisle: 'Aisle 01', type: 'instore' },
    khapli: { name: '100% Khapli Atta', nameHi: '100% खापली आटा', aisle: 'Aisle 02', type: 'instore' },
    lokwan: { name: '100% Lokwan Atta', nameHi: '100% लोकवान आटा', aisle: 'Aisle 03', type: 'instore' },
    multigrain: { name: 'Multigrain Atta', nameHi: 'मल्टीग्रेन आटा', aisle: 'Aisle 04', type: 'delivery' },
    multimillet: { name: 'Multi Millet Atta', nameHi: 'मल्टी मिलेट आटा', aisle: 'Aisle 05', type: 'instore' }
  };

  S.selectedBlends.forEach(blend => {
    const meta = blendMetadata[blend];
    if (!meta) return;

    const qty = S.blendQuantities[blend] || 5;

    if (meta.type === 'instore') {
      inStoreBlends.push({ blend, qty, ...meta });
      inStoreTotalWeight += qty;
    } else {
      deliveryBlends.push({ blend, qty, ...meta });
      deliveryTotalWeight += qty;
    }
  });

  const hasDelivery = deliveryBlends.length > 0;
  const hasInStore = inStoreBlends.length > 0 || S.chakkiActive;

  // Build items HTML
  let itemsHTML = '';

  if (S.chakkiActive) {
    const customBlendName = S.recommendedBlend || (S.lang === 'hi' ? 'कस्टम न्यूट्रिशनल ब्लेंड' : 'Custom Nutritional Blend');
    itemsHTML += `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; background: rgba(232,184,75,0.08); padding: 8px 12px; border-radius: 12px; border: 1.5px solid rgba(232,184,75,0.3); box-shadow: 0 4px 12px rgba(232,184,75,0.06);">
        <div>
          <div style="font-weight:700; color:#fff; font-size:13px; display:flex; align-items:center; gap:6px;">
            <span style="color:var(--g2);">🌾</span> ${customBlendName}
          </div>
          <div style="font-size:10px; color:var(--g2); display:flex; align-items:center; gap:6px; margin-top: 3px;">
            <span class="aisle-tag" style="background:rgba(232,184,75,0.15); color:var(--g2); border-color:rgba(232,184,75,0.3); padding: 1px 6px; font-size: 9px; line-height: 1.2;">Chakki Mill</span>
            <span style="font-weight:600;">⚙️ ${S.lang === 'hi' ? 'चक्की में पिस रहा है' : 'Grinding in Chakki...'}</span>
          </div>
        </div>
        <div style="font-weight:700; color:var(--g2); background:rgba(232,184,75,0.12); padding:4px 10px; border-radius:8px; border:1px solid rgba(232,184,75,0.24); font-size: 13px; font-family:'DM Sans', sans-serif;">10 kg</div>
      </div>
    `;
  }

  // 1. Add In-Store items to list
  inStoreBlends.forEach(item => {
    itemsHTML += `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; background: rgba(0,0,0,0.18); padding: 8px 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
        <div>
          <div style="font-weight:600; color:#fff; font-size:13px;">${S.lang === 'hi' ? item.nameHi : item.name}</div>
          <div style="font-size:10px; color:var(--g2); display:flex; align-items:center; gap:6px; margin-top: 3px;">
            <span class="aisle-tag" style="padding: 1px 6px; font-size: 9px; line-height: 1.2;">${item.aisle}</span>
            <span>${S.lang === 'hi' ? '🛒 इन-स्टोर मिल पिकअप' : '🛒 In-Store Mill Pickup'}</span>
          </div>
        </div>
        <div style="font-weight:700; color:var(--g2); background:rgba(232,184,75,0.12); padding:4px 10px; border-radius:8px; border:1px solid rgba(232,184,75,0.24); font-size: 13px; font-family:'DM Sans', sans-serif;">${item.qty} kg</div>
      </div>
    `;
  });

  // 2. Add Delivery items to list
  deliveryBlends.forEach(item => {
    itemsHTML += `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; background: rgba(0,0,0,0.18); padding: 8px 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
        <div>
          <div style="font-weight:600; color:#fff; font-size:13px;">${S.lang === 'hi' ? item.nameHi : item.name}</div>
          <div style="font-size:10px; color:#ff8a8a; display:flex; align-items:center; gap:6px; margin-top: 3px;">
            <span class="aisle-tag" style="padding: 1px 6px; font-size: 9px; line-height: 1.2; background: rgba(255,107,107,0.15); color: #ff8a8a; border-color: rgba(255,107,107,0.3);">${item.aisle}</span>
            <span>${S.lang === 'hi' ? '🚚 होम डिलीवरी (इन ट्रांजिट)' : '🚚 Home Delivery (In Transit)'}</span>
          </div>
        </div>
        <div style="font-weight:700; color:#ff8a8a; background:rgba(255,107,107,0.12); padding:4px 10px; border-radius:8px; border:1px solid rgba(255,107,107,0.24); font-size: 13px; font-family:'DM Sans', sans-serif;">${item.qty} kg</div>
      </div>
    `;
  });

  // Build weight breakdowns HTML
  let weightHTML = '';
  if (hasInStore && hasDelivery) {
    weightHTML = `
      <div style="display: flex; justify-content: space-between; font-size: 12.5px; color: rgba(255,255,255,0.7); margin-bottom: 4px;">
        <span>${S.lang === 'hi' ? 'पिकअप वजन (इन-स्टोर):' : 'Pickup Weight (In-Store):'}</span>
        <span style="font-weight:600; color:#fff; font-family:'DM Sans', sans-serif;">${inStoreTotalWeight} kg</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 12.5px; color: rgba(255,255,255,0.7);">
        <span>${S.lang === 'hi' ? 'डिलीवरी वजन (होम डिलीवरी):' : 'Delivery Weight (Home Delivery):'}</span>
        <span style="font-weight:600; color:#ff8a8a; font-family:'DM Sans', sans-serif;">${deliveryTotalWeight} kg</span>
      </div>
    `;
  } else {
    const totalW = inStoreTotalWeight + deliveryTotalWeight;
    const labelText = hasDelivery
      ? (S.lang === 'hi' ? 'कुल डिलीवरी वजन:' : 'Total Delivery Weight:')
      : (S.lang === 'hi' ? 'कुल पिकअप वजन:' : 'Total Pickup Weight:');
    const colorValue = hasDelivery ? '#ff8a8a' : 'var(--g2)';
    weightHTML = `
      <div style="display: flex; justify-content: space-between; font-size: 13px; color: rgba(255,255,255,0.7); font-weight: 500;">
        <span>${labelText}</span>
        <span style="color: ${colorValue}; font-size: 15.5px; font-weight: 700; font-family:'DM Sans', sans-serif;">${totalW} kg</span>
      </div>
    `;
  }

  // Build Promo tag if any delivery blend selected
  let promoHTML = '';
  if (hasDelivery) {
    promoHTML = `
      <div style="display: flex; align-items: center; gap: 8px; background: rgba(39,174,96,0.15); padding: 8px 12px; border-radius: 10px; border: 1px solid rgba(39,174,96,0.3); margin-top: 12px; margin-bottom: 4px;">
        <span style="font-size: 14px;">🚚</span>
        <span style="font-size: 11px; font-weight: 600; color: #2ecc71;">
          ${S.lang === 'hi' ? 'मुफ़्त डिलीवरी (२४ घंटे एक्सप्रेस)' : 'FREE Express Delivery (24 Hours)'}
        </span>
      </div>
    `;
  }

  // Build localized checkout buttons
  let buttonHTML = '';
  if (hasDelivery) {
    buttonHTML = `
      <button class="btn" style="margin-top: 14px; width: 100%; height: 44px; font-size: 13.5px; border-radius: 12px; background: linear-gradient(135deg, var(--g1) 0%, var(--g2) 100%); color: var(--br); font-weight: 700; border: none; cursor: pointer;" onclick="checkoutHomeDelivery()">
        ${S.lang === 'hi' ? 'ऑर्डर करें &rarr;' : 'Place Order &rarr;'}
      </button>
    `;
  } else {
    buttonHTML = `
      <button class="btn" style="margin-top: 14px; width: 100%; height: 44px; font-size: 13.5px; border-radius: 12px; background: linear-gradient(135deg, var(--g1) 0%, var(--g2) 100%); color: var(--br); font-weight: 700; border: none; cursor: pointer;" onclick="checkoutInStore()">
        ${S.lang === 'hi' ? 'ऑर्डर करें &rarr;' : 'Place Order &rarr;'}
      </button>
    `;
  }

  // Set unified card innerHTML
  unifiedCard.innerHTML = `
    <h3 style="font-size: 14.5px; color: #fff; font-weight: 700; margin-bottom: 14px; border-bottom: 1.5px solid rgba(232,184,75,0.22); padding-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
      <span>${S.lang === 'hi' ? 'ऑर्डर सारांश' : 'Order Summary'}</span>
      <span style="font-size: 11.5px; font-weight: 400; color: rgba(255,255,255,0.65);">${S.selectedBlends.length} ${S.lang === 'hi' ? 'चयनित' : 'Selected'}</span>
    </h3>

    <!-- Fulfillment Policy Note -->
    <div style="font-size: 11px; color: rgba(255,255,255,0.85); line-height: 1.45; margin-bottom: 12px; background: rgba(0,0,0,0.14); padding: 8px 10px; border-radius: 8px; border: 1.5px solid rgba(232,184,75,0.18);">
      ${S.lang === 'hi'
        ? "💡 इन-स्टोर सामान स्टोर से ही मिलेगा, और आउट-ऑफ-स्टॉक सामान की 24 घंटे में आपके घर पर एक्सप्रेस डिलीवरी होगी।"
        : "💡 In-store items you will get in the store itself, and out-of-stock items you will have express delivery in 24 hours."
      }
    </div>
    
    <!-- Items List -->
    <div style="margin-bottom: 12px; max-height: 180px; overflow-y: auto; scrollbar-width: none;">
      ${itemsHTML}
    </div>

    <!-- Weight details -->
    <div style="margin-top: 12px; border-top: 1.5px dashed rgba(232,184,75,0.18); padding-top: 10px;">
      ${weightHTML}
    </div>

    <!-- Express Delivery Notice -->
    ${promoHTML}

    <!-- Unified Button -->
    ${buttonHTML}
  `;
}

/**
 * Handle checkout for only in-store items
 */
function checkoutInStore() {
  S.selectedBlends = S.selectedBlends.filter(blend => blend !== 'multigrain');
  S.isHomeDelivery = false;
  saveState();
  buildAndShowResults();
}

/**
 * Handle checkout for home delivery (hybrid or standalone multigrain)
 */
function checkoutHomeDelivery() {
  S.isHomeDelivery = true;
  saveState();
  goHomeDeliveryAddress();
}


/**
 * Transition to home delivery details input form
 */
function goHomeDeliveryAddress() {
  const delName = document.getElementById('i-delivery-name');
  const delPhone = document.getElementById('i-delivery-phone');
  
  if (delName) delName.value = S.name || "";
  if (delPhone) delPhone.value = S.phone || "";
  
  // Hide all error messages under s-delivery-address
  document.querySelectorAll('#s-delivery-address .err').forEach(el => el.classList.remove('show'));
  
  show('s-delivery-address');
}

/**
 * Handle validation and state updates on address submission
 */
function submitHomeDelivery(method) {
  const nameVal = document.getElementById('i-delivery-name').value.trim();
  const phoneVal = document.getElementById('i-delivery-phone').value.trim();
  const flatVal = document.getElementById('i-delivery-flat').value.trim();
  const areaVal = document.getElementById('i-delivery-area').value.trim();
  const pincodeVal = document.getElementById('i-delivery-pincode').value.trim();
  const cityVal = document.getElementById('i-delivery-city').value.trim();
  const stateVal = document.getElementById('i-delivery-state').value.trim();

  let isValid = true;

  // Validate Name
  const eName = document.getElementById('e-delivery-name');
  if (!nameVal) {
    if (eName) eName.classList.add('show');
    isValid = false;
  } else {
    if (eName) eName.classList.remove('show');
  }

  // Validate Phone
  const ePhone = document.getElementById('e-delivery-phone');
  if (!phoneVal || phoneVal.length !== 10 || !/^\d{10}$/.test(phoneVal)) {
    if (ePhone) ePhone.classList.add('show');
    isValid = false;
  } else {
    if (ePhone) ePhone.classList.remove('show');
  }

  // Validate Flat
  const eFlat = document.getElementById('e-delivery-flat');
  if (!flatVal) {
    if (eFlat) eFlat.classList.add('show');
    isValid = false;
  } else {
    if (eFlat) eFlat.classList.remove('show');
  }

  // Validate Area
  const eArea = document.getElementById('e-delivery-area');
  if (!areaVal) {
    if (eArea) eArea.classList.add('show');
    isValid = false;
  } else {
    if (eArea) eArea.classList.remove('show');
  }

  // Validate Pincode
  const ePincode = document.getElementById('e-delivery-pincode');
  if (!pincodeVal || pincodeVal.length !== 6 || !/^\d{6}$/.test(pincodeVal)) {
    if (ePincode) ePincode.classList.add('show');
    isValid = false;
  } else {
    if (ePincode) ePincode.classList.remove('show');
  }

  // Validate City
  const eCity = document.getElementById('e-delivery-city');
  if (!cityVal) {
    if (eCity) eCity.classList.add('show');
    isValid = false;
  } else {
    if (eCity) eCity.classList.remove('show');
  }

  // Validate State
  const eState = document.getElementById('e-delivery-state');
  if (!stateVal) {
    if (eState) eState.classList.add('show');
    isValid = false;
  } else {
    if (eState) eState.classList.remove('show');
  }

  if (!isValid) {
    showToast(S.lang === 'hi' ? "कृपया सभी फ़ील्ड सही-सही भरें" : "Please fill in all fields correctly");
    return;
  }

  // Save details in state
  S.deliveryAddress = {
    name: nameVal,
    phone: phoneVal,
    flatNo: flatVal,
    area: areaVal,
    pincode: pincodeVal,
    city: cityVal,
    state: stateVal
  };
  S.isHomeDelivery = true;
  S.paymentMethod = method;
  saveState();

  if (method === 'Online') {
    // Show mock payment processing loader
    show('s-processing');
    setTimeout(() => {
      buildAndShowResults();
    }, 2200);
  } else {
    // Proceeds directly to success screen
    buildAndShowResults();
  }
}

/**
 * Handle Nutritional Goals (Multi-Select, maximum 2)
 */
function toggleNutritionalGoal(element, goalId) {
  const idx = S.nutritionGoals.indexOf(goalId);
  if (idx > -1) {
    S.nutritionGoals.splice(idx, 1);
    element.classList.remove('sel');
  } else {
    // Goal Limit checker (Upto 2)
    if (S.nutritionGoals.length >= 2) {
      showToast(T('toast_limit_goals'));
      return;
    }
    S.nutritionGoals.push(goalId);
    element.classList.add('sel');
  }

  const err = document.getElementById('e-nutr');
  if (err && S.nutritionGoals.length > 0) {
    err.classList.remove('show');
  }
}

// =============================================
// SURVEY FLOW ROUTER
// =============================================

/**
 * Custom Next Screen Routing & Validations
 */
function surveyNext(currentStep) {
  switch (currentStep) {
    case 'q1':
      if (!S.familySize) {
        const err = document.getElementById('e-q1');
        if (err) err.classList.add('show');
        showToast(T('toast_select_req'));
        return;
      }
      show('s-q2');
      break;

    case 'q2':
      if (S.composition.length === 0) {
        const err = document.getElementById('e-q2');
        if (err) err.classList.add('show');
        showToast(T('toast_select_req'));
        return;
      }
      show('s-q3');
      break;

    case 'q3':
      if (!S.selectionTrack) {
        const err = document.getElementById('e-q3');
        if (err) err.classList.add('show');
        showToast(T('toast_select_req'));
        return;
      }

      // Reset nested selections on navigation
      S.selectedBlend = '';
      S.selectedBlends = [];
      S.nutritionGoals = [];
      document.querySelectorAll('#s-track-trad .mcq').forEach(el => el.classList.remove('sel'));
      document.querySelectorAll('#s-q4-nutr .mcq').forEach(el => el.classList.remove('sel'));

      if (S.selectionTrack === 'traditional') {
        updateSidebarSummary();
        show('s-track-trad');
      } else {
        show('s-q4-nutr');
      }
      break;

    case 'trad':
      if (S.selectedBlends.length === 0) {
        if (S.chakkiActive) {
          checkoutInStore();
        } else {
          const err = document.getElementById('e-trad');
          if (err) err.classList.add('show');
          showToast(T('toast_pick_blend'));
          return;
        }
      } else {
        if (S.selectedBlends.includes('multigrain')) {
          checkoutHomeDelivery();
        } else {
          checkoutInStore();
        }
      }
      break;

    case 'nutr':
      if (S.nutritionGoals.length === 0) {
        const err = document.getElementById('e-nutr');
        if (err) err.classList.add('show');
        showToast(T('toast_select_req'));
        return;
      }
      if (S.nutritionGoals.length < 2) {
        showToast(S.lang === 'hi' ? "कृपया 2 लक्ष्य चुनें" : "Please select exactly 2 goals");
        return;
      }
      saveState();
      showNutrRecommendation();
      break;
  }
}

/**
 * Custom Back Screen Routing
 */
function surveyBack(currentStep) {
  // Clear error triggers on back movement
  document.querySelectorAll('.err').forEach(el => el.classList.remove('show'));

  switch (currentStep) {
    case 'q1':
      show('s-details');
      break;
    case 'q2':
      show('s-q1');
      break;
    case 'q3':
      show('s-q2');
      break;
    case 'trad':
    case 'nutr':
      show('s-q3');
      break;
  }
}

// =============================================
// GOAL → FUNCTIONAL VARIANT MAPPING
// =============================================
// Each Q4 goal key maps to a functional variant key used in the blend combo lookup.
const GOAL_TO_VARIANT = {
  protein:     'Protein',
  strength:    'Strength+',
  digestive:   'High Fibre',
  sugar:       'Low GI',
  lighter:     'Low Calorie',
  complete:    'Vitamin',
  vitamin:     'Calcium',
  alternative: 'Gluten Free',
  heart:       'Low Cholesterol'
};

// =============================================
// 51-ENTRY BLEND COMBINATION LOOKUP TABLE
// =============================================
// Key format: "VariantA + VariantB" (alphabetical by variant name)
const BLEND_COMBOS = {
  "Calcium + High Fibre":        "Bone Fibre Balance Blend",
  "Calcium + Low Calorie":       "Lean Bone Wellness Blend",
  "Calcium + Low Carb":          "Bone Smart Carb Blend",
  "Calcium + Low Cholesterol":   "Heart & Bone Wellness Blend",
  "Calcium + Strength+":         "Strength & Bone Support Blend",
  "Calcium + Vitamin":           "Daily Bone Wellness Blend",
  "Gluten Free + High Fibre":    "Gluten Free Fibre Blend",
  "High Fibre + Keto":           "Keto Fibre Balance Blend",
  "High Fibre + Low Calorie":    "Lean Fibre Balance Blend",
  "High Fibre + Low Carb":       "Fibre Smart Carb Blend",
  "High Fibre + Low Cholesterol":"Heart Fibre Wellness Blend",
  "High Fibre + Strength+":      "Fibre Energy Balance Blend",
  "Calcium + Iron":              "Iron Calcium Wellness Blend",
  "High Fibre + Iron":           "Iron Fibre Balance Blend",
  "Iron + Low Calorie":          "Lean Vitality Blend",
  "Iron + Low Carb":             "Iron Low Carb Blend",
  "Iron + Low Cholesterol":      "Heart Vitality Blend",
  "Iron + Low GI":               "Iron Smart Balance Blend",
  "Iron + Strength+":            "Iron Energy Support Blend",
  "Iron + Vitamin":              "Vitality Nutrition Blend",
  "Gluten Free + Low Calorie":   "Lean Gluten Free Blend",
  "Keto + Low Calorie":          "Lean Keto Blend",
  "Low Calorie + Low Carb":      "Lean Smart Carb Blend",
  "Low Calorie + Low Cholesterol":"Lean Heart Wellness Blend",
  "Low Carb + Low Cholesterol":  "Heart Smart Carb Blend",
  "Calcium + Low GI":            "Smart Bone Wellness Blend",
  "High Fibre + Low GI":         "Sugar Balance Fibre Blend",
  "Low Calorie + Low GI":        "Lean Sugar Balance Blend",
  "Low Carb + Low GI":           "Smart Carb Control Blend",
  "Low Cholesterol + Low GI":    "Heart Smart Balance Blend",
  "Low GI + Strength+":          "Smart Energy Balance Blend",
  "Low GI + Vitamin":            "Smart Daily Nutrition Blend",
  "Calcium + Protein":           "Protein Bone Support Blend",
  "Gluten Free + Protein":       "Gluten Free Protein Blend",
  "High Fibre + Protein":        "Protein Fibre Balance Blend",
  "Iron + Protein":              "Protein Iron Blend",
  "Keto + Protein":              "Keto Protein Blend",
  "Low Calorie + Protein":       "Lean Protein Blend",
  "Low Carb + Protein":          "Protein Low Carb Blend",
  "Low Cholesterol + Protein":   "Heart Smart Protein Blend",
  "Low GI + Protein":            "Protein Smart Balance Blend",
  "Protein + Strength+":         "Active Strength Protein Blend",
  "Protein + Vitamin":           "Complete Protein Nutrition Blend",
  "Low Calorie + Strength+":     "Lean Strength Blend",
  "Low Carb + Strength+":        "Strength Carb Balance Blend",
  "Low Cholesterol + Strength+": "Heart Strength Wellness Blend",
  "High Fibre + Vitamin":        "Complete Fibre Nutrition Blend",
  "Low Calorie + Vitamin":       "Lean Daily Nutrition Blend",
  "Low Carb + Vitamin":          "Smart Daily Carb Balance Blend",
  "Low Cholesterol + Vitamin":   "Heart Smart Daily Nutrition Blend",
  "Strength+ + Vitamin":         "Complete Strength Nutrition Blend"
};

/**
 * Look up the recommended blend name for a pair of goal keys.
 * Tries both orderings of the variant key pair.
 */
function getRecommendedBlend(goalA, goalB) {
  const vA = GOAL_TO_VARIANT[goalA] || goalA;
  const vB = GOAL_TO_VARIANT[goalB] || goalB;

  // Sort alphabetically to form the canonical key
  const sorted = [vA, vB].sort();
  const key = sorted[0] + ' + ' + sorted[1];
  return BLEND_COMBOS[key] || (vA + ' + ' + vB + ' Blend');
}

// =============================================
// NUTRITIONAL HIGHLIGHT DATA (for display chips)
// =============================================
const VARIANT_HIGHLIGHTS = {
  'Protein':        { icon: '💪', label: 'High Protein', labelHi: 'उच्च प्रोटीन' },
  'Iron':           { icon: '🩸', label: 'Iron Rich', labelHi: 'आयरन से भरपूर' },
  'Low GI':         { icon: '📉', label: 'Low Glycemic', labelHi: 'कम ग्लाइसेमिक' },
  'Calcium':        { icon: '🦴', label: 'Calcium Rich', labelHi: 'कैल्शियम से भरपूर' },
  'Vitamin':        { icon: '✨', label: 'Vitamin Enriched', labelHi: 'विटामिन समृद्ध' },
  'High Fibre':     { icon: '🌾', label: 'High Fibre', labelHi: 'उच्च फाइबर' },
  'Strength+':      { icon: '⚡', label: 'Zn Mg K Blend', labelHi: 'जिंक मैग्नीशियम' },
  'Low Calorie':    { icon: '🍃', label: 'Low Calorie', labelHi: 'कम कैलोरी' },
  'Low Carb':       { icon: '🥗', label: 'Low Carb', labelHi: 'कम कार्ब' },
  'Low Cholesterol':{ icon: '❤️', label: 'Heart Healthy', labelHi: 'हृदय स्वस्थ' },
  'Gluten Free':    { icon: '🌿', label: 'Gluten Free', labelHi: 'ग्लूटेन मुक्त' },
  'Keto':           { icon: '🔥', label: 'Keto Friendly', labelHi: 'कीटो अनुकूल' }
};

/**
 * Build and display the nutritional recommendation screen
 */
function showNutrRecommendation() {
  const goalA = S.nutritionGoals[0];
  const goalB = S.nutritionGoals[1];
  const blendName = getRecommendedBlend(goalA, goalB);
  const variantA = GOAL_TO_VARIANT[goalA];
  const variantB = GOAL_TO_VARIANT[goalB];

  // Store the recommended blend name in state for later use
  S.recommendedBlend = blendName;

  // Set blend name
  const nameEl = document.getElementById('nutr-rec-name');
  if (nameEl) nameEl.textContent = blendName;

  // Render goal tags
  const goalsEl = document.getElementById('nutr-rec-goals');
  if (goalsEl) {
    goalsEl.innerHTML = [goalA, goalB].map(g => {
      const goalLabel = T('nutr_goal_' + g);
      return `<span style="display: inline-flex; align-items: center; gap: 5px; background: rgba(201,147,46,0.12); border: 1px solid rgba(201,147,46,0.22); padding: 5px 14px; border-radius: 20px; font-size: 11.5px; font-weight: 600; color: var(--g2);">${goalLabel}</span>`;
    }).join('');
  }

  // Render nutritional highlight chips
  const highlightsEl = document.getElementById('nutr-rec-highlights');
  if (highlightsEl) {
    const variants = [variantA, variantB];
    highlightsEl.innerHTML = variants.map(v => {
      const h = VARIANT_HIGHLIGHTS[v] || { icon: '🌾', label: v, labelHi: v };
      const label = S.lang === 'hi' ? h.labelHi : h.label;
      return `
        <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.18); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 12px 14px;">
          <span style="font-size: 20px;">${h.icon}</span>
          <div>
            <div style="font-size: 12px; font-weight: 700; color: #fff;">${label}</div>
            <div style="font-size: 10px; color: rgba(255,255,255,0.5); margin-top: 2px;">${v} Atta</div>
          </div>
        </div>
      `;
    }).join('');
  }

  applyTranslations();
  show('s-nutr-result');
}

/**
 * Proceed from recommendation screen to success/results
 */
function nutrRecProceed() {
  S.chakkiActive = true;
  saveState();
  applyTranslations();
  show('s-chakki-processing');
}

function exploreOtherProducts() {
  S.selectionTrack = 'traditional';
  saveState();
  updateSidebarSummary();
  applyTranslations();
  show('s-track-trad');
}

function proceedToBilling() {
  saveState();
  buildAndShowResults();
}

// =============================================
function buildAndShowResults() {
  const refCode = "ASH-" + Math.floor(100000 + Math.random() * 900000);
  const deliveryCode = "ASH-DEL-" + Math.floor(100000 + Math.random() * 900000);
  
  const refEl = document.getElementById('ref-code');
  if (refEl) {
    refEl.innerText = S.isHomeDelivery ? deliveryCode : refCode;
  }

  // Personalize Headline based on delivery
  const headline = document.getElementById('suc-headline');
  if (headline) {
    headline.innerText = S.isHomeDelivery 
      ? (S.lang === 'hi' ? "ऑर्डर की पुष्टि हो गई!" : "Order Confirmed!") 
      : T('res_summary_title');
  }

  // Personalize reference note
  const refNote = document.querySelector('.ref-box div[style*="font-size: 11px"]');
  if (refNote) {
    refNote.innerText = S.isHomeDelivery 
      ? (S.lang === 'hi' ? "ऑर्डर ट्रैकिंग के लिए इस कोड को सुरक्षित रखें" : "Save this code for your order tracking") 
      : T('suc_ref_note');
  }

  // Render Premium Gold Home Delivery Badge if ordered online
  const badgeContainer = document.getElementById('delivery-badge-container');
  if (badgeContainer) {
    if (S.isHomeDelivery) {
      badgeContainer.innerHTML = `
        <div class="home-delivery-badge" style="display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg, var(--g1) 0%, var(--g2) 100%); color:var(--br); padding:6px 16px; border-radius:20px; font-weight:700; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:18px; box-shadow:0 6px 18px rgba(232,184,75,0.35);">
          <svg style="width:16px; height:16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
          ${S.lang === 'hi' ? "होम डिलीवरी" : "Home Delivery"}
        </div>
      `;
    } else {
      badgeContainer.innerHTML = '';
    }
  }

  // Pre-translate static title values
  const labels = {
    size: T('res_family_size'),
    comp: T('res_family_comp'),
    path: T('res_preference'),
    rec: T('res_rec_pack')
  };

  // Compile Composition strings
  const compList = S.composition.map(item => {
    return T(`q2_opt_${item}`);
  }).join(', ');

  // Compile Path selection
  const trackLabel = S.selectionTrack === 'traditional' 
    ? T('q3_track_trad_title') 
    : T('q3_track_nutr_title');

  // Compile Recommendation selection / dynamic receipt
  let recLabel = '';
  let detailsHTML = '';
  const blendMetadata = {
    sharbati: { name: '100% Sharbati Atta', aisle: 'Aisle 01', type: 'instore' },
    khapli: { name: '100% Khapli Atta', aisle: 'Aisle 02', type: 'instore' },
    lokwan: { name: '100% Lokwan Atta', aisle: 'Aisle 03', type: 'instore' },
    multigrain: { name: 'Multigrain Atta', aisle: 'Aisle 04', type: 'delivery' },
    multimillet: { name: 'Multi Millet Atta', aisle: 'Aisle 05', type: 'instore' }
  };

  const hasInStoreItems = S.selectedBlends.some(blend => blendMetadata[blend] && blendMetadata[blend].type === 'instore') || S.chakkiActive;
  const hasDeliveryItems = S.selectedBlends.some(blend => blendMetadata[blend] && blendMetadata[blend].type === 'delivery');

  let fulfillmentMessage = '';
  if (S.lang === 'hi') {
    if (hasInStoreItems && hasDeliveryItems) {
      fulfillmentMessage = "आपका कस्टम आटा चक्की में पिस रहा है! आप इन-स्टोर उपलब्ध सामान स्टोर से ही तुरंत प्राप्त करेंगे, और आउट-ऑफ-स्टॉक सामान के लिए आपका डिलीवरी पता ले लिया गया है और आपका ऑर्डर 24 घंटे में आपके घर पहुँच जाएगा।";
    } else if (hasDeliveryItems) {
      fulfillmentMessage = "आउट-ऑफ-स्टॉक सामान के लिए आपका डिलीवरी पता सफलतापूर्वक ले लिया गया है और आपका ऑर्डर 24 घंटे में आपके घर पहुँच जाएगा।";
    } else if (S.chakkiActive) {
      fulfillmentMessage = "आपका ताज़ा पिसा हुआ आटा चक्की में तैयार किया जा रहा है! कृपया बिलिंग काउंटर पर जाएँ।";
    } else {
      fulfillmentMessage = "आपका इन-स्टोर पिकअप ऑर्डर निर्धारित कर दिया गया है! कृपया इसे काउंटर से प्राप्त करें।";
    }
  } else {
    if (hasInStoreItems && hasDeliveryItems) {
      fulfillmentMessage = "Your custom Aata is grinding in the Chakki! You are going to pick up the active in-store items, and for out-of-stock items, your delivery address has been collected and will reach you in 24 hours.";
    } else if (hasDeliveryItems) {
      fulfillmentMessage = "Your delivery address has been collected for out-of-stock items, the order has been placed and it will reach you in 24 hours.";
    } else if (S.chakkiActive) {
      fulfillmentMessage = "Your custom blend is freshly grinding in the Chakki! Please proceed to the billing counter.";
    } else {
      fulfillmentMessage = "Your in-store pickup order has been scheduled! Please pick it up from the store counter.";
    }
  }

  if (S.selectionTrack === 'traditional') {
    // Prepend custom grinding blend if active in Chakki
    if (S.chakkiActive) {
      const customBlendName = S.recommendedBlend || (S.lang === 'hi' ? 'कस्टम न्यूट्रिशनल ब्लेंड' : 'Custom Nutritional Blend');
      detailsHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(255,255,255,0.06); padding-bottom: 8px; margin-bottom: 8px; font-size: 13px; background: rgba(232,184,75,0.06); padding: 6px 10px; border-radius: 8px; border: 1px solid rgba(232,184,75,0.2);">
          <div>
            <span style="color: #fff; font-weight: 700;">🌾 ${customBlendName}</span>
            <span style="font-size: 9.5px; color: var(--g2); background: rgba(232,184,75,0.15); padding: 1px 6px; border-radius: 4px; margin-left: 6px; border: 1px solid rgba(232,184,75,0.3); font-weight: 600;">Chakki Mill</span>
            <span style="font-size: 9.5px; color: var(--g2); font-weight: 600; margin-left: 4px;">⚙️ ${S.lang === 'hi' ? 'चक्की में' : 'Grinding'}</span>
          </div>
          <span style="color: var(--g2); font-weight: 700; font-family:'DM Sans', sans-serif;">10 kg</span>
        </div>
      `;
    }

    S.selectedBlends.forEach(blend => {
      const meta = blendMetadata[blend];
      if (!meta) return;
      const qty = S.blendQuantities[blend] || 5;
      
      detailsHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid rgba(255,255,255,0.06); padding-bottom: 8px; margin-bottom: 8px; font-size: 13px;">
          <div>
            <span style="color: #fff; font-weight: 600;">${meta.name}</span>
            <span style="font-size: 9.5px; color: var(--g2); background: rgba(232,184,75,0.12); padding: 1px 6px; border-radius: 4px; margin-left: 6px; border: 1px solid rgba(232,184,75,0.2);">${meta.aisle}</span>
          </div>
          <span style="color: var(--g2); font-weight: 700; font-family:'DM Sans', sans-serif;">${qty} kg</span>
        </div>
      `;
    });
  } else {
    recLabel = S.nutritionGoals.map(goal => T(`nutr_goal_${goal}`)).join(' + ');
    const blendName = S.recommendedBlend || recLabel;
    detailsHTML = `
      <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid rgba(255,255,255,0.06); padding-bottom: 8px; margin-bottom: 8px; gap: 14px;">
        <span style="color: var(--g2); font-weight: 600; flex-shrink:0;">${labels.rec}:</span>
        <span style="color: #fff; font-weight: bold; text-align: right;">${blendName}</span>
      </div>
      <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid rgba(255,255,255,0.06); padding-bottom: 8px; margin-bottom: 8px; gap: 14px;">
        <span style="color: var(--g2); font-weight: 600; flex-shrink:0;">${S.lang === 'hi' ? "चुने हुए लक्ष्य:" : "Selected Goals:"}</span>
        <span style="color: rgba(255,255,255,0.8); font-size: 12px; text-align: right;">${recLabel}</span>
      </div>
      <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid rgba(255,255,255,0.06); padding-bottom: 8px; margin-bottom: 8px; gap: 14px;">
        <span style="color: var(--g2); font-weight: 600; flex-shrink:0;">${S.lang === 'hi' ? "वजन:" : "Weight:"}</span>
        <span style="color: #fff; font-weight: bold; text-align: right; font-family:'DM Sans', sans-serif;">10 kg</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding-top: 4px; gap: 14px; align-items: center;">
        <span style="color: var(--g2); font-weight: 600; flex-shrink:0;">📍 ${S.lang === 'hi' ? "पिकअप स्थान:" : "Pickup Location:"}</span>
        <span class="stock-badge in-stock" style="font-size: 13px; font-weight: 700; padding: 4px 12px; border-radius: 12px; background: rgba(232,184,75,0.15); color: var(--g2); border: 1px solid rgba(232,184,75,0.3);">${S.lang === 'hi' ? "चक्की काउंटर" : "Chakki Mill Counter"}</span>
      </div>
    `;
  }

  // Inject a beautiful HTML summary recap box inside s-success
  const descEl = document.getElementById('suc-desc');
  if (descEl) {
    if (S.isHomeDelivery) {
      let homeDeliveryItemsHTML = '';
      let storePickupItemsHTML = '';

      if (S.selectionTrack === 'traditional') {
        if (S.chakkiActive) {
          const customBlendName = S.recommendedBlend || (S.lang === 'hi' ? 'कस्टम न्यूट्रिशनल ब्लेंड' : 'Custom Nutritional Blend');
          storePickupItemsHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px; margin-bottom: 6px; font-size: 13px; background: rgba(232,184,75,0.06); padding: 4px 8px; border-radius: 6px;">
              <span style="color: #fff; font-weight: 600;">🌾 ${customBlendName} (${S.lang === 'hi' ? 'चक्की पिसान' : 'Chakki Grinding'})</span>
              <span style="color: var(--g2); font-weight: 700; font-family:'DM Sans', sans-serif;">10 kg</span>
            </div>
          `;
        }

        S.selectedBlends.forEach(blend => {
          const meta = blendMetadata[blend];
          if (!meta) return;
          const qty = S.blendQuantities[blend] || 5;
          const row = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px; margin-bottom: 6px; font-size: 13px;">
              <span style="color: #fff; font-weight: 500;">${meta.name}</span>
              <span style="color: var(--g2); font-weight: 700; font-family:'DM Sans', sans-serif;">${qty} kg</span>
            </div>
          `;
          if (meta.type === 'delivery') {
            homeDeliveryItemsHTML += row;
          } else {
            storePickupItemsHTML += row;
          }
        });
      } else {
        if (S.chakkiActive) {
          const customBlendName = S.recommendedBlend || (S.lang === 'hi' ? 'कस्टम न्यूट्रिशनल ब्लेंड' : 'Custom Nutritional Blend');
          storePickupItemsHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px; margin-bottom: 6px; font-size: 13px; background: rgba(232,184,75,0.06); padding: 4px 8px; border-radius: 6px;">
              <span style="color: #fff; font-weight: 600;">🌾 ${customBlendName} (${S.lang === 'hi' ? 'चक्की पिसान' : 'Chakki Grinding'})</span>
              <span style="color: var(--g2); font-weight: 700; font-family:'DM Sans', sans-serif;">10 kg</span>
            </div>
          `;
        }
        
        homeDeliveryItemsHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px; margin-bottom: 6px; font-size: 13px;">
            <span style="color: #fff; font-weight: 500;">${recLabel || 'Custom Nutritional Atta'}</span>
            <span style="color: var(--g2); font-weight: 700; font-family:'DM Sans', sans-serif;">10 kg</span>
          </div>
        `;
      }

      let itemsBoxHTML = '';
      if (homeDeliveryItemsHTML) {
        itemsBoxHTML += `
          <div style="margin-bottom: 12px;">
            <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #ff8a8a; letter-spacing: 0.8px; margin-bottom: 6px;">To Be Delivered (Home Delivery)</div>
            ${homeDeliveryItemsHTML}
          </div>
        `;
      }
      if (storePickupItemsHTML) {
        itemsBoxHTML += `
          <div style="margin-bottom: 12px;">
            <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--g2); letter-spacing: 0.8px; margin-bottom: 6px;">Ready For Store Pickup (In-Store)</div>
            ${storePickupItemsHTML}
          </div>
        `;
      }

      descEl.innerHTML = `
        <div style="font-size: 14px; color: rgba(255,255,255,0.9); margin-bottom: 20px; line-height: 1.55; font-weight: 500;">
          ${fulfillmentMessage}
        </div>
        
        <!-- Summary Table -->
        <div style="text-align: left; background: rgba(0, 0, 0, 0.16); border: 1px solid rgba(251, 245, 230, 0.12); border-radius: 16px; padding: 18px; margin-bottom: 24px; font-size: 13px; box-shadow: inset 0 2px 8px rgba(0,0,0,0.15);">
          <!-- Items List -->
          ${itemsBoxHTML}
          
          <div style="border-top: 1.5px dashed rgba(201,147,46,0.18); margin-top: 12px; padding-top: 12px;"></div>

          <!-- Recipient -->
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px; margin-bottom: 6px;">
            <span style="color: var(--g2); font-weight: 600;">${S.lang === 'hi' ? "प्राप्तकर्ता:" : "Recipient:"}</span>
            <span style="color: #fff;">${S.deliveryAddress.name}</span>
          </div>
          <!-- Phone -->
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px; margin-bottom: 6px;">
            <span style="color: var(--g2); font-weight: 600;">${S.lang === 'hi' ? "संपर्क नंबर:" : "Contact No:"}</span>
            <span style="color: #fff;">+91 ${S.deliveryAddress.phone}</span>
          </div>
          <!-- Address -->
          <div style="display: flex; flex-direction: column; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px; margin-bottom: 6px; gap: 4px;">
            <span style="color: var(--g2); font-weight: 600;">${S.lang === 'hi' ? "डिलीवरी का पता:" : "Delivery Address:"}</span>
            <span style="color: #fff; line-height: 1.4; font-size: 12.5px; padding-left: 2px;">
              ${S.deliveryAddress.flatNo},<br>
              ${S.deliveryAddress.area},<br>
              ${S.deliveryAddress.city} - ${S.deliveryAddress.pincode},<br>
              ${S.deliveryAddress.state}
            </span>
          </div>
          <!-- Payment Mode -->
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px; margin-bottom: 6px; gap: 14px;">
            <span style="color: var(--g2); font-weight: 600;">${S.lang === 'hi' ? "भुगतान का प्रकार:" : "Payment Mode:"}</span>
            <span style="color: #fff; font-weight: 600;">
              ${S.paymentMethod === 'Online' 
                ? (S.lang === 'hi' ? "💳 ऑनलाइन भुगतान" : "💳 Paid Online") 
                : (S.lang === 'hi' ? "💵 काउंटर पर भुगतान" : "💵 Pay at Counter")
              }
            </span>
          </div>
          <!-- Delivery ETA -->
          <div style="display: flex; justify-content: space-between; padding-top: 4px; gap: 14px; align-items: center;">
            <span style="color: var(--g2); font-weight: 600; flex-shrink:0;">${S.lang === 'hi' ? "डिलीवरी मोड:" : "Delivery Mode:"}</span>
            <span class="stock-badge in-stock" style="font-size: 11.5px; font-weight: 700; padding: 3px 10px; border-radius: 10px; background: linear-gradient(135deg, var(--g1) 0%, var(--g2) 100%); color: var(--br); border: none;">
              ${S.lang === 'hi' ? "एक्सप्रेस (24 घंटे)" : "Express (24 Hrs)"}
            </span>
          </div>
        </div>
      `;
    } else {
      descEl.innerHTML = `
        <div style="font-size: 14px; color: rgba(255,255,255,0.9); margin-bottom: 24px; line-height: 1.55; font-weight: 500;">
          ${fulfillmentMessage}
        </div>
        
        <!-- Summary Table -->
        <div style="text-align: left; background: rgba(0, 0, 0, 0.16); border: 1px solid rgba(251, 245, 230, 0.12); border-radius: 16px; padding: 20px; margin-bottom: 26px; font-size: 13.5px; box-shadow: inset 0 2px 8px rgba(0,0,0,0.15);">
          <!-- Family Size -->
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; margin-bottom: 8px;">
            <span style="color: var(--g2); font-weight: 600;">${labels.size}:</span>
            <span style="color: #fff;">${S.familySize}</span>
          </div>
          <!-- Composition -->
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; margin-bottom: 8px; gap: 14px;">
            <span style="color: var(--g2); font-weight: 600; flex-shrink:0;">${labels.comp}:</span>
            <span style="color: #fff; text-align: right;">${compList}</span>
          </div>
          <!-- Preference Journey -->
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; margin-bottom: 8px; gap: 14px;">
            <span style="color: var(--g2); font-weight: 600; flex-shrink:0;">${labels.path}:</span>
            <span style="color: #fff; text-align: right;">${trackLabel}</span>
          </div>
          
          <div style="border-top: 1.5px dashed rgba(201,147,46,0.18); margin-top: 12px; padding-top: 12px; margin-bottom: 12px;"></div>
          
          <!-- Selected Items -->
          <div>
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--g2); letter-spacing: 1px; margin-bottom: 8px;">Selected Mill Items</div>
            ${detailsHTML}
          </div>
        </div>
      `;
    }
  }

  show('s-success');
}

// =============================================
// RESET & CLEANUP LOGIC
// =============================================

function clearActiveSurveyUI() {
  document.querySelectorAll('.mcq').forEach(el => el.classList.remove('sel'));
  document.querySelectorAll('.err').forEach(el => el.classList.remove('show'));
}

function resetSession() {
  // Clear State values to default test settings
  S.name = '';
  S.phone = '';
  S.email = '';
  S.familySize = '';
  S.composition = [];
  S.selectionTrack = '';
  S.selectedBlend = '';
  S.selectedBlends = [];
  S.blendQuantities = {
    sharbati: 5,
    khapli: 5,
    lokwan: 5,
    multigrain: 5,
    multimillet: 5
  };
  S.nutritionGoals = [];
  S.recommendedBlend = '';
  S.chakkiActive = false;
  
  // Reset Home Delivery State
  S.isHomeDelivery = false;
  S.paymentMethod = '';
  S.deliveryAddress = {
    name: '',
    phone: '',
    flatNo: '',
    area: '',
    pincode: '',
    city: '',
    state: ''
  };
  saveState();

  // Clear Form Fields to defaults
  const iName = document.getElementById('i-name');
  const iPhone = document.getElementById('i-phone');
  const iOtp = document.getElementById('i-otp');
  const dEmail = document.getElementById('d-email');

  if (iName) iName.value = '';
  if (iPhone) iPhone.value = '';
  if (iOtp) iOtp.value = '';
  if (dEmail) dEmail.value = '';

  // Reset Home Delivery Inputs
  const iDelName = document.getElementById('i-delivery-name');
  const iDelPhone = document.getElementById('i-delivery-phone');
  const iDelFlat = document.getElementById('i-delivery-flat');
  const iDelArea = document.getElementById('i-delivery-area');
  const iDelPin = document.getElementById('i-delivery-pincode');
  const iDelCity = document.getElementById('i-delivery-city');
  const iDelState = document.getElementById('i-delivery-state');

  if (iDelName) iDelName.value = '';
  if (iDelPhone) iDelPhone.value = '';
  if (iDelFlat) iDelFlat.value = '';
  if (iDelArea) iDelArea.value = '';
  if (iDelPin) iDelPin.value = '';
  if (iDelCity) iDelCity.value = '';
  if (iDelState) iDelState.value = '';

  // Reset Range Sliders in UI
  ['sharbati', 'khapli', 'lokwan', 'multigrain', 'multimillet'].forEach(blend => {
    const qtySlider = document.querySelector(`.mcq [oninput*="'${blend}'"]`);
    if (qtySlider) qtySlider.value = 5;
    const qtyVal = document.getElementById(`qty-val-${blend}`);
    if (qtyVal) qtyVal.innerText = '5 kg';
  });

  // Reset split checkout cards in sidebar
  const unifiedCard = document.getElementById('unified-summary-card');
  const emptyCard = document.getElementById('empty-summary-card');
  if (unifiedCard) unifiedCard.style.display = 'none';
  if (emptyCard) emptyCard.style.display = 'block';

  // Hide callout and restore footer buttons
  const callout = document.getElementById('home-delivery-callout');
  if (callout) callout.style.display = 'none';
  const genBtn = document.querySelector('#s-track-trad .fnav .btn-sm');
  if (genBtn) genBtn.style.display = 'block';

  // Clear UI Selection Borders/Colors
  clearActiveSurveyUI();

  // Navigate to Language
  show('s-lang');
}
