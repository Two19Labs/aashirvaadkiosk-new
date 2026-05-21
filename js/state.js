// =============================================
// APP STATE & PERSISTENCE
// =============================================
var S = {
  lang: 'en',
  name: '', phone: '', email: '',
  
  // Custom Survey State
  familySize: '',
  composition: [],
  selectionTrack: '',
  selectedBlend: '',
  selectedBlends: [],
  blendQuantities: {
    sharbati: 5,
    khapli: 5,
    lokwan: 5,
    multigrain: 5,
    multimillet: 5
  },
  blendGranulations: {
    sharbati: 'Fine',
    khapli: 'Fine',
    lokwan: 'Fine',
    multigrain: 'Fine',
    multimillet: 'Fine'
  },
  nutritionGoals: [],
  
  // Home Delivery State
  isHomeDelivery: false,
  deliveryAddress: {
    name: '',
    phone: '',
    flatNo: '',
    area: '',
    pincode: '',
    city: '',
    state: ''
  },
  paymentMethod: '',

  q1: [],
  q2: 'medium',
  q3: [],
  q4: 'general',
  q5: '',
  q6: '',
  blendSource: '',
  grind: 'Fine',
  cycle: 'Weekly',
  cats: [],
  qty: { atta: 8 },
  qtySet: false,
  chakkiActive: false
};

function saveState() {
  localStorage.setItem('ASH_KIOSK_SESSION', JSON.stringify(S));
}

function saveProfile() {
  var profiles = JSON.parse(localStorage.getItem('ASH_USER_PROFILES') || '{}');
  profiles[S.phone] = { name: S.name, email: S.email };
  localStorage.setItem('ASH_USER_PROFILES', JSON.stringify(profiles));
}
