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
    multimillet: 5,
    toor_dal: 5,
    masoor_dal: 5,
    arhar_dal: 5,
    turmeric: 5,
    jeera_powder: 5,
    garam_masala: 5,
    yellow_mustard_oil: 5,
    groundnut_oil: 5,
    coconut_oil: 5,
    desi_cow_ghee: 5,
    buffalo_ghee: 5,
    iodized_salt: 5,
    black_salt: 5,
    pink_salt: 5
  },
  blendGranulations: {
    sharbati: 'Fine',
    khapli: 'Fine',
    lokwan: 'Fine',
    multigrain: 'Fine',
    multimillet: 'Fine',
    toor_dal: 'Fine',
    masoor_dal: 'Fine',
    arhar_dal: 'Fine',
    turmeric: 'Fine',
    jeera_powder: 'Fine',
    garam_masala: 'Fine',
    yellow_mustard_oil: 'Fine',
    groundnut_oil: 'Fine',
    coconut_oil: 'Fine',
    desi_cow_ghee: 'Fine',
    buffalo_ghee: 'Fine',
    iodized_salt: 'Fine',
    black_salt: 'Fine',
    pink_salt: 'Fine'
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
