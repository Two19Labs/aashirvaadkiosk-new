# Implementation Plan — Aashirvaad/Meri Chakki Kiosk Changes

## Decisions (confirmed with user)
- **Logo:** use `images/meri_chakki_logo_transparent.png` everywhere `logo.png` is used. **Image only** — keep "Aashirvaad" text branding unchanged.
- **"Question 4 Option 1"** = the **Traditional track** (Q3 → "Choose from traditional & everyday favourites").
- **A2 Cow Ghee Bilona:** new Ghee product, weights 250ml/500ml/1L/5L (same as other ghee), MRP ₹100 placeholder.
- **Indian flag:** replace the whole Hindi flag SVG with a correct tricolour + proper Ashoka Chakra.

---

## Phase 1 — Branding & Header
1. **Logo image swap** — replace `src="images/logo.png"` with `src="images/meri_chakki_logo_transparent.png"` in all header `logo-img` tags and the welcome/language screens (`index.html`). Keep all "Aashirvaad" text as-is.
2. **Top-left subtitle** — replace `logo-sub` text `Freshly Milled · Freshly Yours` (lines ~101, 152, 197) with **"Fresh & Nutritional, Specially Made For You"**.
3. **Remove "Ghar Profiling"** — replace every `<div class="logo-sub">Ghar Profiling</div>` (lines ~249, 341, 427, 499, 1386, 1752, 1875) with the same **"Fresh & Nutritional, Specially Made For You"** text so all headers are consistent.

## Phase 2 — Language screen flag fix
4. Replace the Hindi (India) flag `<svg>` in `s-lang` with a correct circular tricolour: saffron / white / green bands + a properly drawn 24-spoke navy Ashoka Chakra in the centre.

## Phase 3 — Product copy changes (`js/lang.js`, EN + HI)
5. **Multi Millet Atta desc** → `trad_blend_multimillet_desc`: "Blend of wheat, foxtail, kodo, little millet and proso millet" (+ Hindi translation).
6. **Multigrain Atta desc** → `trad_blend_multigrain_desc`: "Blend of Bajra, Rahi, Amaranth, Oats Flour, Barley and Jowar" (+ Hindi translation).
7. **Khapli Atta desc** → `trad_blend_khapli_desc`: change "good for diabetic health" → "good for health" (EN + HI).
8. **Yellow Mustard Oil desc** → `trad_blend_yellow_mustard_oil_desc`: remove the word "Svasti" (EN + HI).
   - Note: descriptions also exist inline in `index.html` `data-i18n` fallback text — update those inline strings to match so they're consistent before translation runs.

## Phase 4 — New product: A2 Cow Ghee Bilona
9. Add `a2_cow_ghee_bilona` entry to `BLEND_METADATA` (`js/main.js`): name, nameHi, `aisle: 'Aisle 09'`, `type: 'instore'`, `category: 'ghee'`.
10. Add the new product card in `index.html` under the Ghee section (clone Desi Cow Ghee card; `data-category="ghee"`, weights 250ml/500ml/1L/5L, default 1L, MRP id `mrp-val-a2_cow_ghee_bilona`).
11. Add `trad_blend_a2_cow_ghee_bilona` + `_desc` keys to `js/lang.js` (EN + HI).
12. Add the key to `S.blendQuantities` / `S.blendGranulations` defaults in `js/state.js` AND in `resetSession()` (`js/main.js`), and to the `blends` array in `syncTraditionalCardsUI()`.

## Phase 5 — Category tabs / "Explore" behaviour
13. **Remove the inline "Explore More Products" unlock button** (`#unlock-categories-card`) from the category tab bar in `index.html`. In the Traditional track only the **Atta** tab shows.
14. Remove now-dead `unlockCategories()` usage; simplify `switchCategory()` so it no longer manages the `#unlock-categories-card` element.
15. **`exploreOtherProducts()`** (success-page "Explore More Products" button) — change so that after clicking it: **hide the Atta tab and all Atta cards**, show only the 5 other categories (Pulses, Spices, Oil, Ghee, Salt), and default the active category to Pulses.
    - Introduce a state flag (e.g. `S.attaHidden`) persisted in state; `switchCategory()` honours it (hide `atta` tab + `data-category="atta"` cards when set).
    - Ensure `attasOnlyLocked` (Atta-only lock for the Traditional track) and the new `attaHidden` flag are reset in `resetSession()` and added to `js/state.js`.

## Phase 6 — Order summary (right sidebar) remove buttons
16. In `updateSidebarSummary()` (`js/main.js`), add a small **× (remove)** control to each product row in the items list.
17. Add a `removeBlendFromCart(blendName)` function: removes the blend from `S.selectedBlends`, resets its qty/granulation defaults, un-selects the matching card in the DOM, calls `updateSidebarSummary()` + `saveState()`.
18. Wire the × button `onclick` to `removeBlendFromCart(...)` with `event.stopPropagation()`.

## Phase 7 — Summary label & trial-screen copy
19. In `updateSidebarSummary()` summary rows, change **"🛒 In-Store Mill Pickup"** → **"🛒 In-Store Pickup"** (EN + HI variants).
20. **Trial trust badges** — remove the 3 items below "Get Link" ("100% Free", "No Spam", "Instant Delivery"): delete the markup block in `index.html` and the unused `trial_trust_1/2/3` keys in `js/lang.js`.
21. **Trial subtext** — change `trial_subtext` (the line below "Want to try before you buy?") to **"Get a sample at our tasting section in store"** (EN + HI).

## Phase 8 — Verification
22. Open `index.html` in a browser; walk the full flow:
    - Welcome → Language (check new flag + logo) → Entry → OTP → Details → Q1–Q3.
    - Traditional track: confirm only Atta tab, no unlock button; add products; check × removal in summary; check "In-Store Pickup" label; place order.
    - Success page → "Explore More Products" → confirm Atta hidden, 5 other categories shown.
    - Trial screen: confirm trust badges gone + new subtext.
    - Toggle EN/HI to verify all translated strings.

---

## Open / assumed items
- "Rahi" in the Multigrain list is assumed to mean "Ragi" — **using the user's spelling "Rahi" verbatim** unless told otherwise. ("Amarnath" → corrected to "Amaranth", "Barely" → "Barley" assumed typos; confirm if literal spelling wanted.)
- A2 Cow Ghee Bilona description will be written as: "Pure A2 cow ghee hand-churned using the traditional bilona method" — adjust if you have exact copy.
