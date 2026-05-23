const ICONS = {
    sparkle: `<svg class="i-icon" viewBox="0 0 24 24" fill="currentColor" style="width:1.2em;height:1.2em;vertical-align:middle;display:inline-block;margin-top:-2px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    package: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;margin-right:6px;margin-top:-2px;"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
    settings: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;margin-right:6px;margin-top:-2px;"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    leaf: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;margin-right:6px;margin-top:-2px;"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-10 10Z"/><path d="M11 20c-1.5-.5-2.5-1.7-3-3"/><path d="M11 20a10.86 10.86 0 0 1-5.1-1.7c-2.3-1.4-3.9-3.9-3.9-6.3a3 3 0 0 1 3-3c2.4 0 4.9 1.6 6.3 3.9A10.86 10.86 0 0 1 11 15"/></svg>`,
    cart: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;margin-right:6px;margin-top:-2px;"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
    search: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;margin-right:6px;margin-top:-2px;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    left: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;margin-right:4px;"><path d="m15 18-6-6 6-6"/></svg>`,
    right: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;margin-left:4px;"><path d="m9 18 6-6-6-6"/></svg>`,
    user: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    users: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    baby: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M12 3v1.5"/></svg>`,
    heart: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    flame: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.21 1.146-3.027a1.722 1.722 0 0 1 2.354 0Z"/></svg>`,
    activity: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    digestive: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
    sugar: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M21 21v-4a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v4"/><path d="M12 13V2"/><path d="m15 5-3-3-3 3"/></svg>`,
    home: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    check: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><polyline points="20 6 9 17 4 12"/></svg>`,
    bread: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M7 13c0 2.2 2.2 4 5 4s5-1.8 5-4V8c0-2.2-2.2-4-5-4s-5 1.8-5 4v5Z"/><path d="M7 13c-2.2 0-4 1.8-4 4v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2c0-2.2-1.8-4-4-4"/></svg>`,
    rice: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M3 11c0 5 4 9 9 9s9-4 9-9"/><path d="M12 11c0 5 4 9 9 9"/><path d="M12 11c0 5-4 9-9 9"/><path d="M12 2v9"/><path d="m15 5-3-3-3 3"/></svg>`,
    scale: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/></svg>`,
    droplet: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7Z"/></svg>`,
    muscle: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M16 12a4 4 0 1 0-8 0"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M2 12h4"/><path d="M18 12h4"/></svg>`,
    clock: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    cloud: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-1.93-1.57-3.5-3.5-3.5-.13 0-.25.01-.38.02A7 7 0 1 0 4 14h.5a4.5 4.5 0 1 1 0 9h13Z"/></svg>`,
    pot: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M6 12h12v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7Z"/><path d="M3 12h18"/><path d="M12 3v6"/><path d="M8 6h8"/></svg>`,
    alert: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    pencil: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,
    phone: `<svg class="i-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em;vertical-align:middle;display:inline-block;"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`
};

const LANG = {
    en: {
        // Selection Screen
        lang_title: "Choose Your Language",
        lang_subtitle: "अपनी भाषा चुनें",
        
        // Entry Screen
        entry_badge: "Kiosk #041 • Bengaluru",
        entry_title: "Welcome to Aashirvaad",
        entry_subtitle: "Personalized Nutrition for your Ghar",
        entry_phone_label: "Mobile Number",
        entry_phone_placeholder: "Enter 10 digit number",
        entry_btn: `Send OTP ${ICONS.right}`,
        entry_footer: "Secure login for your profile",

        // OTP Screen
        otp_badge: "Verify Number",
        otp_title: "Verify your Mobile",
        otp_subtitle: "OTP sent to",
        otp_label: "4-Digit OTP",
        otp_placeholder: "····",
        otp_btn: "Verify & Continue",
        otp_resend: "Didn't receive it?",
        otp_back: "Go Back",

        // Details Screen
        details_badge: "Tell us about yourself",
        details_title: "Who is this for?",
        details_desc: "This helps us tailor the recommendations for your family.",
        details_name_label: "Name",
        details_name_placeholder: "Enter your name",
        details_email_label: "Email (Optional)",
        details_email_placeholder: "Enter your email",
        details_btn: `Let's get started! ${ICONS.right}`,

        // New Survey Keys (English)
        q1_title: "Select your family size",
        q1_subtitle: "Select the number of members in your household",
        q2_title: "Composition",
        q2_subtitle: "Select all age groups present in your household (select all that apply)",
        q2_opt_kids: "Children (age < 13)",
        q2_opt_young: "Youngsters (age 13 - 24)",
        q2_opt_adults: "Adults (age 25 - 45)",
        q2_opt_elderly: "Elderly (age > 45)",
        q3_title: "How would you like to choose your atta today?",
        q3_subtitle: "Select the journey that best fits your preference",
        q3_track_trad_title: "Choose from traditional & everyday favourites",
        q3_track_trad_desc: "Popular, tried-and-tested classic everyday flours",
        q3_track_nutr_title: "Choose atta based on your family’s nutritional needs",
        q3_track_nutr_desc: "Customize flours based on health and wellness goals",
        q4_title: "What would you like your atta to support?",
        q4_subtitle: "Pick 1 or 2 everyday wellness goals — or choose a specialty lifestyle option",
        q3_chip: "Personalized Selection",
        q3_group1_label: "Everyday wellness goals · pick 1 or 2",
        q3_group2_label: "Specialty lifestyle · pick only 1",

        // Traditional Blends (Track 1)
        trad_title: "Traditional & Everyday Favourites",
        trad_subtitle: "Choose from our pre-blended premium flours",
        trad_blend_sharbati: "100% Sharbati Atta",
        trad_blend_sharbati_desc: "Premium stone-ground wheat from MP, makes softest rotis",
        trad_blend_khapli: "100% Khapli Atta",
        trad_blend_khapli_desc: "Ancient Emmer wheat, high in fibre, low GI, good for health",
        trad_blend_lokwan: "100% Lokwan Atta",
        trad_blend_lokwan_desc: "Superior golden grain Lokwan wheat, yields nutritious daily rotis",
        trad_blend_multigrain: "Multigrain Atta",
        trad_blend_multigrain_desc: "Blend of Bajra, Ragi, Amaranth, Oats Flour, Barley and Jowar",
        trad_blend_multimillet: "Multi Millet Atta",
        trad_blend_multimillet_desc: "Blend of wheat, foxtail, kodo, little millet and proso millet",

        // Categories
        cat_atta: "Atta",
        cat_pulses: "Pulses",
        cat_spices: "Spices",
        cat_oil: "Oil",
        cat_ghee: "Ghee",
        cat_salt: "Salt",

        // Pulses Products
        trad_blend_toor_dal: "Toor Dal",
        trad_blend_toor_dal_desc: "Premium unpolished split pigeon peas, rich in protein",
        trad_blend_masoor_dal: "Masoor Dal",
        trad_blend_masoor_dal_desc: "Nutritious red split lentils, quick to cook and delicious",
        trad_blend_arhar_dal: "Arhar Dal",
        trad_blend_arhar_dal_desc: "Traditional split yellow pigeon peas, ideal for daily meals",

        // Spices Products
        trad_blend_turmeric: "Turmeric Powder",
        trad_blend_turmeric_desc: "Rich in curcumin, naturally sourced golden turmeric",
        trad_blend_jeera_powder: "Jeera Powder",
        trad_blend_jeera_powder_desc: "Freshly ground roasted cumin seeds, adds rich earthy flavor",
        trad_blend_garam_masala: "Garam Masala",
        trad_blend_garam_masala_desc: "Aromatic blend of premium handpicked whole spices",

        // Oil Products
        trad_blend_yellow_mustard_oil: "Yellow Mustard Oil",
        trad_blend_yellow_mustard_oil_desc: "Cold-pressed Yellow Mustard Oil with sharp aroma",
        trad_blend_groundnut_oil: "Groundnut Oil",
        trad_blend_groundnut_oil_desc: "100% pure cold-pressed groundnut oil, ideal for cooking",
        trad_blend_coconut_oil: "Coconut Oil",
        trad_blend_coconut_oil_desc: "100% natural cold-pressed coconut oil, pure and aromatic",

        // Ghee Products
        trad_blend_desi_cow_ghee: "Desi Cow Ghee",
        trad_blend_desi_cow_ghee_desc: "Slow-cooked cow ghee with rich granular texture and aroma",
        trad_blend_buffalo_ghee: "Buffalo Ghee",
        trad_blend_buffalo_ghee_desc: "Pure premium buffalo ghee, high in fat and rich flavor",
        trad_blend_a2_cow_ghee_bilona: "A2 Cow Ghee Bilona",
        trad_blend_a2_cow_ghee_bilona_desc: "Pure A2 cow ghee hand-churned using the traditional bilona method",

        // Salt Products
        trad_blend_iodized_salt: "Iodized Salt",
        trad_blend_iodized_salt_desc: "Solar evaporated pure iodized salt for daily wellness",
        trad_blend_black_salt: "Black Salt",
        trad_blend_black_salt_desc: "Naturally sourced tangy black salt, perfect for chaats",
        trad_blend_pink_salt: "Himalayan Pink Salt",
        trad_blend_pink_salt_desc: "100% natural Himalayan pink rock salt with trace minerals",

        // Nutritional Goals (Track 2 - Q4)
        nutr_title: "What matters most in your family’s everyday meals?",
        nutr_subtitle: "Select up to 2 goals",
        nutr_goal_protein: "More protein in everyday meals",
        nutr_goal_iron: "Daily vitality & iron support",
        nutr_goal_sugar: "Better sugar balance in everyday meals",
        nutr_goal_calcium: "Bone strength support",
        nutr_goal_complete: "Complete daily nutrition support",
        nutr_goal_digestive: "Better digestive balance",
        nutr_goal_strength: "Daily strength & energy support",
        nutr_goal_lighter: "Lighter everyday eating",
        nutr_goal_lowcarb: "Smarter lower-carb meal choices",
        nutr_goal_heart: "Balanced eating for heart wellness",
        nutr_goal_glutenfree: "Grain alternatives for gluten-free lifestyles",
        nutr_goal_keto: "Keto-friendly alternatives for mindful eating",

        // Results screen keys
        res_summary_title: "Completed!",
        res_summary_desc: "We have configured your custom Aashirvaad profile successfully.",
        res_family_size: "Family Size",
        res_family_comp: "Family Composition",
        res_preference: "Atta Choice Path",
        res_rec_pack: "Recommended Choice",

        // Quiz General
        quiz_back: `${ICONS.left} Back`,
        quiz_next: `Next ${ICONS.right}`,
        quiz_step: "Step",
        quiz_of: "of 4",
        quiz_single_select: "Single Select",
        quiz_multi_select: "Multi Select",
        quiz_gen_plan: `Place Order ${ICONS.sparkle}`,

        // Success Screen
        suc_title: "आशीर्वाद से!",
        suc_sub: "Your nutrition plan is ready. Please proceed to the billing counter.",
        suc_ref_lbl: "Order Reference",
        suc_ref_note: "Share this code at the counter",
        suc_reset: "Start New Session",
        suc_ico: ICONS.check,
        other_options_title: `${ICONS.sparkle} Other Options`,
        rec_logo_sub: "Your Nutrition Plan",
        qty_select_wt: "Select Weight:",
        gran_select_lbl: "Granulation:",
        grinding_option_lbl: "Grinding Option:",
        base_select_lbl: "Base Wheat:",
        gran_fine: "Fine",
        gran_medium: "Medium",
        gran_coarse: "Coarse",
        co_pay_counter: "Pay at Counter",
        co_pay_store_counter: "Pay at Store Counter",
        nutr_rec_badge: "Personalized Recommendation",
        nutr_rec_title: "We Recommend This For You",
        nutr_rec_subtitle: "Based on your selected nutritional goals, here is the ideal Aashirvaad blend crafted for your family",
        nutr_rec_cta: "Send to Chakki",
        pickup_in_store: "Pick-up in Store",
        send_to_chakki: "Send to Chakki",
        fulfillment_store_pickup: "Store Pickup",
        fulfillment_chakki_grind: "Grinding in Chakki",
        nutr_sample_title: "Not sure? Try a sample",
        nutr_sample_desc: "Scan the QR code below to request a free sample pack of this blend",
        nutr_sample_hint: "Point your phone camera at the code above",
        chakki_badge: "Chakki Mill Processing",
        chakki_title: "Your Aata is in the Chakki!",
        chakki_status: "Grinding & Processing...",
        chakki_subtitle: "Your custom nutritional blend is being freshly ground using our traditional stone based mill",
        chakki_eta_lbl: "Estimated Wait Time",
        chakki_eta_val: "10 - 12 Minutes",
        chakki_explore_cta: "Explore Other Products in Store",
        chakki_billing_cta: "Proceed to Billing Directly",

        // Toasts & Messages
        toast_cook_req: "Please pick your cooking style",
        toast_added: "added",
        toast_removed: "removed",
        toast_phone_req: "Please enter a valid phone number",
        toast_otp_req: "Please enter 4-digit OTP",
        toast_name_req: "Please enter your name",
        toast_select_req: "Please make a selection",
        toast_limit_goals: "You can select up to 2 wellness goals only",
        toast_wellness_mix: "These options can't be combined — clear your current selection first",
        toast_pick_blend: "Please select at least one product to continue",

        // Trial Screen Keys
        trial_headline: "Want to try before you buy?",
        trial_subtext: "Get a sample at our tasting section in store",
        trial_select_subtext: "Select the products you'd like to sample",
        trial_continue: "Continue",
        trial_change_products: "Change products",
        trial_select_empty: "Add Atta products to your order to sample them",
        trial_get_link: "Get Link",
        trial_success_title: "Link Sent!",
        trial_success_desc: "Scan the QR code below or check your phone for the sample request link",
        trial_back: "Enter different number",
        trial_phone_err: "Please enter a valid 10-digit phone number",
        trial_left_text: "3/3 Trials Left",
        suc_explore_more: "Explore More Products",
        trial_limit_title: "Free Trials Limit",
        trial_limit_desc: "You're out of free trials!"
    },
    hi: {
        // Selection Screen
        lang_title: "अपनी भाषा चुनें",
        lang_subtitle: "Choose Your Language",

        // Entry Screen
        entry_badge: "कियोस्क #041 • बेंगलुरु",
        entry_title: "आशीर्वाद में आपका स्वागत है",
        entry_subtitle: "आपके घर के लिए व्यक्तिगत पोषण",
        entry_phone_label: "मोबाइल नंबर",
        entry_phone_placeholder: "10 अंकों का नंबर दर्ज करें",
        entry_btn: `ओटीपी भेजें ${ICONS.right}`,
        entry_footer: "आपके प्रोफाइल के लिए सुरक्षित लॉगिन",

        // OTP Screen
        otp_badge: "नंबर सत्यापित करें",
        otp_title: "अपना मोबाइल सत्यापित करें",
        otp_subtitle: "ओटीपी भेजा गया",
        otp_label: "4-अंकों का ओटीपी",
        otp_placeholder: "····",
        otp_btn: "सत्यापित करें और जारी रखें",
        otp_resend: "कोड नहीं मिला?",
        otp_back: "पीछे जाएं",

        // Details Screen
        details_badge: "हमें अपने बारे में बताएं",
        details_title: "यह किसके लिए है?",
        details_desc: "यह हमें आपके परिवार के लिए सिफारिशें तैयार करने में मदद करता है।",
        details_name_label: "नाम",
        details_name_placeholder: "अपना नाम दर्ज करें",
        details_email_label: "ईमेल (वैकल्पिक)",
        details_email_placeholder: "अपना ईमेल दर्ज करें",
        details_btn: `आइए शुरू करें! ${ICONS.right}`,

        // New Survey Keys (Hindi)
        q1_title: "अपने परिवार का आकार चुनें",
        q1_subtitle: "अपने घर में सदस्यों की संख्या चुनें",
        q2_title: "परिवार की संरचना",
        q2_subtitle: "आपके घर में मौजूद सभी आयु वर्ग चुनें (सभी लागू विकल्प चुनें)",
        q2_opt_kids: "बच्चे (आयु < 13)",
        q2_opt_young: "युवा (आयु 13 - 24)",
        q2_opt_adults: "वयस्क (आयु 25 - 45)",
        q2_opt_elderly: "बुजुर्ग (आयु > 45)",
        q3_title: "आज आप अपना आटा कैसे चुनना चाहेंगे?",
        q3_subtitle: "वह यात्रा चुनें जो आपकी पसंद के सबसे अनुकूल हो",
        q4_title: "आप अपने आटे से किसमें सहायता चाहते हैं?",
        q4_subtitle: "1 या 2 रोज़मर्रा कल्याण लक्ष्य चुनें — या एक विशेष जीवनशैली विकल्प चुनें",
        q3_chip: "व्यक्तिगत चयन",
        q3_group1_label: "रोज़मर्रा कल्याण लक्ष्य · 1 या 2 चुनें",
        q3_group2_label: "विशेष जीवनशैली · केवल 1 चुनें",
        q3_track_trad_title: "पारंपरिक और रोज़मर्रा के पसंदीदा में से चुनें",
        q3_track_trad_desc: "दैनिक उपभोग के लिए आज़माए और परखे हुए क्लासिक पारंपरिक आटे",
        q3_track_nutr_title: "पोषण संबंधी आवश्यकताओं के आधार पर आटा चुनें",
        q3_track_nutr_desc: "स्वास्थ्य और कल्याण लक्ष्यों के आधार पर आटे को अनुकूलित करें",

        // Traditional Blends (Track 1)
        trad_title: "पारंपरिक और रोज़मर्रा के पसंदीदा",
        trad_subtitle: "हमारे पहले से तैयार प्रीमियम आटे में से चुनें",
        trad_blend_sharbati: "100% शरबती आटा",
        trad_blend_sharbati_desc: "मध्य प्रदेश का प्रीमियम पत्थर से पिसा हुआ गेहूं, सबसे नरम रोटियां बनाता है",
        trad_blend_khapli: "100% खापली आटा",
        trad_blend_khapli_desc: "प्राचीन एमेर गेहूं, फाइबर से भरपूर, कम ग्लाइसेमिक सूचकांक, स्वास्थ्य के लिए उत्तम",
        trad_blend_lokwan: "100% लोकवान आटा",
        trad_blend_lokwan_desc: "उत्कृष्ट सुनहरे दाने वाला लोकवान गेहूं, पौष्टिक दैनिक रोटियां देता है",
        trad_blend_multigrain: "मल्टीग्रेन आटा",
        trad_blend_multigrain_desc: "बाजरा, रही, राजगिरा, ओट्स आटा, जौ और ज्वार का मिश्रण",
        trad_blend_multimillet: "मल्टी मिलेट आटा",
        trad_blend_multimillet_desc: "गेहूं, फॉक्सटेल, कोदो, छोटी कंगनी और प्रोसो बाजरा का मिश्रण",

        // Categories
        cat_atta: "आटा",
        cat_pulses: "दालें",
        cat_spices: "मसाले",
        cat_oil: "तेल",
        cat_ghee: "घी",
        cat_salt: "नमक",

        // Pulses Products
        trad_blend_toor_dal: "तूर दाल",
        trad_blend_toor_dal_desc: "प्रीमियम बिना पॉलिश की हुई अरहर दाल, प्रोटीन से भरपूर",
        trad_blend_masoor_dal: "मसूर दाल",
        trad_blend_masoor_dal_desc: "पौष्टिक लाल मसूर दाल, पकाने में आसान और स्वादिष्ट",
        trad_blend_arhar_dal: "अरहर दाल",
        trad_blend_arhar_dal_desc: "पारंपरिक पीली अरहर दाल, दैनिक भोजन के लिए आदर्श",

        // Spices Products
        trad_blend_turmeric: "हल्दी पाउडर",
        trad_blend_turmeric_desc: "करक्यूमिन से भरपूर, प्राकृतिक रूप से प्राप्त सुनहरी हल्दी",
        trad_blend_jeera_powder: "जीरा पाउडर",
        trad_blend_jeera_powder_desc: "ताज़ा भुना और पिसा हुआ जीरा, समृद्ध स्वाद प्रदान करता है",
        trad_blend_garam_masala: "गरम मसाला",
        trad_blend_garam_masala_desc: "प्रीमियम चुनिंदा खड़े मसालों का सुगंधित मिश्रण",

        // Oil Products
        trad_blend_yellow_mustard_oil: "पीला सरसों का तेल",
        trad_blend_yellow_mustard_oil_desc: "तीखी खुशबू वाला कोल्ड-प्रेस (कच्ची घानी) पीला सरसों का तेल",
        trad_blend_groundnut_oil: "मूंगफली का तेल",
        trad_blend_groundnut_oil_desc: "100% शुद्ध कोल्ड-प्रेस मूंगफली का तेल, खाना पकाने के लिए आदर्श",
        trad_blend_coconut_oil: "नारियल तेल",
        trad_blend_coconut_oil_desc: "100% प्राकृतिक कोल्ड-प्रेस नारियल तेल, शुद्ध और सुगंधित",

        // Ghee Products
        trad_blend_desi_cow_ghee: "देशी गाय का घी",
        trad_blend_desi_cow_ghee_desc: "दानेदार बनावट और बेहतरीन महक वाला धीमी आंच पर पका गाय का घी",
        trad_blend_buffalo_ghee: "भैंस का घी",
        trad_blend_buffalo_ghee_desc: "शुद्ध प्रीमियम भैंस का घी, भरपूर वसा और उत्तम स्वाद",
        trad_blend_a2_cow_ghee_bilona: "A2 गाय घी बिलोना",
        trad_blend_a2_cow_ghee_bilona_desc: "पारंपरिक बिलोना विधि से हाथ से मथा गया शुद्ध A2 गाय का घी",

        // Salt Products
        trad_blend_iodized_salt: "आयोडीन युक्त नमक",
        trad_blend_iodized_salt_desc: "दैनिक स्वास्थ्य के लिए प्राकृतिक रूप से तैयार शुद्ध आयोडीन युक्त नमक",
        trad_blend_black_salt: "काला नमक",
        trad_blend_black_salt_desc: "प्राकृतिक रूप से प्राप्त चटपटा काला नमक, चाट के लिए उत्तम",
        trad_blend_pink_salt: "हिमालयन पिंक साल्ट",
        trad_blend_pink_salt_desc: "खनिजों से भरपूर 100% प्राकृतिक हिमालयन रॉक साल्ट",

        // Nutritional Goals (Track 2 - Q4)
        nutr_title: "आपके परिवार के रोज़मर्रा के भोजन में सबसे महत्वपूर्ण क्या है?",
        nutr_subtitle: "अधिकतम 2 लक्ष्य चुनें",
        nutr_goal_protein: "रोज़मर्रा के भोजन में अधिक प्रोटीन",
        nutr_goal_iron: "दैनिक स्फूर्ति और आयरन सहायता",
        nutr_goal_sugar: "रोज़मर्रा के भोजन में बेहतर शर्करा संतुलन",
        nutr_goal_calcium: "हड्डियों की मज़बूती में सहायता",
        nutr_goal_complete: "पूर्ण दैनिक पोषण सहायता",
        nutr_goal_digestive: "बेहतर पाचन संतुलन",
        nutr_goal_strength: "दैनिक शक्ति और ऊर्जा सहायता",
        nutr_goal_lighter: "हल्का रोज़मर्रा का खान-पान",
        nutr_goal_lowcarb: "समझदारी भरे कम-कार्ब भोजन विकल्प",
        nutr_goal_heart: "हृदय स्वास्थ्य के लिए संतुलित भोजन",
        nutr_goal_glutenfree: "ग्लूटेन-मुक्त जीवनशैली के लिए अनाज विकल्प",
        nutr_goal_keto: "सोच-समझकर खाने के लिए कीटो-अनुकूल विकल्प",

        // Results screen keys
        res_summary_title: "पूर्ण!",
        res_summary_desc: "हमने आपका आशीर्वाद प्रोफाइल सफलतापूर्वक अनुकूलित कर लिया है।",
        res_family_size: "परिवार का आकार",
        res_family_comp: "परिवार की संरचना",
        res_preference: "आटा यात्रा मार्ग",
        res_rec_pack: "अनुशंसित चयन",

        // Quiz General
        quiz_back: `${ICONS.left} पीछे`,
        quiz_next: `अगला ${ICONS.right}`,
        quiz_step: "चरण",
        quiz_of: "4 में से",
        quiz_single_select: "एकल चयन",
        quiz_multi_select: "बहु चयन",
        quiz_gen_plan: `ऑर्डर करें ${ICONS.sparkle}`,

        // Success Screen
        suc_title: "आशीर्वाद से!",
        suc_sub: "आपकी पोषण योजना तैयार है। कृपया बिलिंग काउंटर पर जाएँ।",
        suc_ref_lbl: "ऑर्डर संदर्भ",
        suc_ref_note: "काउंटर पर यह कोड साझा करें",
        suc_reset: "नया सत्र शुरू करें",
        suc_ico: ICONS.check,
        other_options_title: `${ICONS.sparkle} अन्य विकल्प`,
        rec_logo_sub: "आपका पोषण प्लान",
        qty_select_wt: "मात्रा चुनें:",
        gran_select_lbl: "पिसाई:",
        grinding_option_lbl: "पिसाई विकल्प:",
        base_select_lbl: "मुख्य गेहूं:",
        gran_fine: "बारीक",
        gran_medium: "मध्यम",
        gran_coarse: "दरदरा",
        co_pay_counter: "काउंटर पर भुगतान",
        co_pay_store_counter: "स्टोर काउंटर पर भुगतान",
        nutr_rec_badge: "व्यक्तिगत अनुशंसा",
        nutr_rec_title: "हम आपके लिए यह सुझाव देते हैं",
        nutr_rec_subtitle: "आपके चुने हुए पोषण लक्ष्यों के आधार पर, आपके परिवार के लिए आदर्श आशीर्वाद मिश्रण",
        nutr_rec_cta: "चक्की पर भेजें",
        pickup_in_store: "स्टोर से पिकअप",
        send_to_chakki: "चक्की में भेजें",
        fulfillment_store_pickup: "स्टोर पिकअप",
        fulfillment_chakki_grind: "चक्की में पिसाई",
        nutr_sample_title: "पक्का नहीं? एक सैंपल आज़माएं",
        nutr_sample_desc: "इस मिश्रण का मुफ़्त सैंपल पैक पाने के लिए नीचे दिए गए QR कोड को स्कैन करें",
        nutr_sample_hint: "ऊपर दिए गए कोड पर अपने फ़ोन का कैमरा करें",
        chakki_badge: "चक्की मिल प्रोसेसिंग",
        chakki_title: "आपका आटा चक्की में है!",
        chakki_status: "पिसाई और प्रोसेसिंग चालू है...",
        chakki_subtitle: "आपका कस्टम न्यूट्रिशनल आटा पत्थर की चक्की में ताज़ा पीसा जा रहा है",
        chakki_eta_lbl: "अनुमानित प्रतीक्षा समय",
        chakki_eta_val: "10 - 12 मिनट",
        chakki_explore_cta: "स्टोर में अन्य उत्पादों को देखें",
        chakki_billing_cta: "सीधे बिलिंग पर आगे बढ़ें",

        // Toasts & Messages
        toast_cook_req: "कृपया अपनी खाना पकाने की शैली चुनें",
        toast_added: "जोड़ा गया",
        toast_removed: "हटाया गया",
        toast_phone_req: "कृपया एक मान्य फोन नंबर दर्ज करें",
        toast_otp_req: "कृपया 4-अंकों का ओटीपी दर्ज करें",
        toast_name_req: "कृपया अपना नाम दर्ज करें",
        toast_select_req: "कृपया चयन करें",
        toast_limit_goals: "आप केवल अधिकतम 2 कल्याण लक्ष्य ही चुन सकते हैं",
        toast_wellness_mix: "इन विकल्पों को एक साथ नहीं चुना जा सकता — पहले अपना मौजूदा चयन हटाएँ",
        toast_pick_blend: "कृपया जारी रखने के लिए कम से कम एक उत्पाद चुनें",

        // Trial Screen Keys
        trial_headline: "खरीदने से पहले आज़माना चाहते हैं?",
        trial_subtext: "हमारे स्टोर के टेस्टिंग सेक्शन में सैंपल प्राप्त करें",
        trial_select_subtext: "जिन उत्पादों का सैंपल लेना चाहते हैं उन्हें चुनें",
        trial_continue: "आगे बढ़ें",
        trial_change_products: "उत्पाद बदलें",
        trial_select_empty: "सैंपल लेने के लिए अपने ऑर्डर में आटा उत्पाद जोड़ें",
        trial_get_link: "लिंक प्राप्त करें",
        trial_success_title: "लिंक भेज दिया गया!",
        trial_success_desc: "नीचे दिए गए QR कोड को स्कैन करें या सैंपल अनुरोध लिंक के लिए अपना फोन देखें",
        trial_back: "दूसरा नंबर दर्ज करें",
        trial_phone_err: "कृपया एक मान्य 10-अंकीय मोबाइल नंबर दर्ज करें",
        trial_left_text: "3/3 ट्रायल शेष",
        suc_explore_more: "और उत्पाद देखें",
        trial_limit_title: "ट्रायल सीमा समाप्त",
        trial_limit_desc: "आपके मुफ़्त ट्रायल समाप्त हो चुके हैं!"
    }
};

/**
 * Returns the translated string for a given key based on current language
 */
function T(key) {
    const lang = S.lang || 'en';
    return LANG[lang][key] || LANG['en'][key] || key;
}

/**
 * Persists the language choice and updates the UI
 */
function chooseLang(l) {
    S.lang = l;
    applyTranslations();
    if (typeof syncTraditionalCardsUI === 'function') {
        syncTraditionalCardsUI();
    }
    show('s-entry');
}

/**
 * Traverses DOM and updates all elements with data-i18n attribute
 */
function applyTranslations() {
    // Standard elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        let translation = T(key);
        
        if (el.tagName === 'INPUT') {
            el.placeholder = translation;
        } else {
            if (key === 'otp_subtitle' && S.phone) {
                translation += " +91 " + S.phone;
            }
            el.innerHTML = translation;
        }
    });

    // Update Step indicators (.prog-label)
    document.querySelectorAll('.prog-label').forEach((el) => {
        const text = el.innerText; // e.g. "Step 1 of 6"
        const match = text.match(/\d+/g);
        if (match && match.length >= 2) {
            const current = match[0];
            const total = match[1];
            el.innerText = `${T('quiz_step')} ${current} ${T('quiz_of').replace('4', total)}`;
        }
    });
}
