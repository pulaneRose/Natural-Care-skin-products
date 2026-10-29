export const products = [
  {
    id: "prod-001",
    name: "Okra Mucin Face Serum",
    subtitle: "Hydrate • Soothe • Smoothen",
    brand: "Natural Care",
    type: "Face Serum",
    category: "Serums",
    price: 1299,
    stock: 50,
    sku: "OKRA-MUCIN-01",
    image: "/images/products/okra-mucin-serum-main.png",
    gallery: [
      "/images/products/okra-mucin-serum-main.png",
      "/images/products/okra-mucin-serum-editorial.jpg",
      "/images/products/okra-mucin-serum-texture.jpg",
      "/images/products/okra-mucin-serum-hand.jpg",
      "/images/products/okra-mucin-serum-benefits.jpg"
    ],
    sizes: ["10 ml", "30 ml"],
    rating: 5.0,
    reviewCount: 38,
    isMainProduct: true,
    isPurchasable: true,
    shortDescription: "With Natural Okra Mucin for Healthy, Glowing Skin. Formulated to hydrate, soothe, and smoothen without stickiness.",
    description: "Our signature Okra Mucin Face Serum is powered by cold-extracted natural Okra mucin. Rich in botanical polysaccharides and protective antioxidants, it cushions your skin barrier, relieves redness, and delivers lasting moisture for a refined, glassy glow.",
    keyBenefitsDetailed: [
      { title: "Deep Hydration", desc: "Locks in moisture for soft, supple skin" },
      { title: "Soothes & Calms", desc: "Helps reduce redness and irritation" },
      { title: "Improves Smoothness", desc: "Makes skin feel smoother and more refined" },
      { title: "Nourishes Skin", desc: "Rich in natural okra mucin and antioxidants" },
      { title: "Lightweight & Non-Sticky", desc: "Quickly absorbs with a fresh feel" }
    ],
    benefits: [
      "Deep Hydration: Locks in moisture for soft, supple skin",
      "Soothes & Calms: Helps reduce redness and irritation",
      "Improves Smoothness: Makes skin feel smoother and more refined",
      "Nourishes Skin: Rich in natural okra mucin and antioxidants",
      "Lightweight & Non-Sticky: Quickly absorbs with a fresh feel"
    ],
    standards: ["Paraben Free", "Silicone Free", "Cruelty Free", "Plant Based"],
    majorIngredient: {
      name: "Natural Okra Mucin (Abelmoschus Esculentus)",
      image: "/images/ingredients/ingredient-okra.jpg",
      role: "Intense Botanical Hydration & Soothing Barrier Lock",
      tag: "Major Hero Ingredient",
      badge: "🌿 Natural Okra Mucin"
    },
    ingredientImages: [
      { name: "Okra Mucin", image: "/images/ingredients/ingredient-okra.jpg", role: "Hydrate, Soothe, Smoothen", isMajor: true },
      { name: "Niacinamide", image: "/images/ingredients/ingredient-niacinamide.jpg", role: "Tone & Texture", isMajor: false },
      { name: "Hyaluronic Acid", image: "/images/ingredients/ingredient-hyaluronic-acid.jpg", role: "Moisture Multiplier", isMajor: false },
      { name: "Vitamin C", image: "/images/ingredients/ingredient-vitamin-c.jpg", role: "Radiance Defense", isMajor: false }
    ],
    ingredientsList: [
      { name: "Natural Okra Mucin Extract", explanation: "Pure natural plant mucilage rich in water-binding polysaccharides that hydrate, soothe, and protect." },
      { name: "Hyaluronic Acid", explanation: "Multi-weight humectant that binds moisture deep into surface skin layers." },
      { name: "Niacinamide (Vitamin B3)", explanation: "Supports skin tone clarity and refines pores." },
      { name: "Botanical Glycerin", explanation: "Locks in continuous hydration with a non-sticky finish." }
    ],
    howToUse: "Dispense 2–3 drops onto clean fingertips. Gently press and smooth over face and neck morning and evening. Allow to absorb before applying moisturizer.",
    concerns: ["Hydration", "Radiance", "Texture", "Barrier Care", "Daily Essentials"],
    skinTypes: ["All Skin Types", "Sensitive", "Dry", "Combination", "Oily"],
    keyIngredients: ["Natural Okra Mucin", "Hyaluronic Acid", "Niacinamide"],
    faq: [
      { q: "Is Okra Mucin suitable for sensitive skin?", a: "Yes, natural Okra mucin is inherently calming and gentle, helping to soothe redness and irritation." },
      { q: "Does it feel sticky on the face?", a: "Not at all. The serum is specially formulated to be lightweight, silky, and non-sticky, absorbing rapidly." }
    ],
    availability: "Available Now",
    placeholderTheme: "sage"
  },
  {
    id: "prod-002",
    name: "Okra Mucin Deep Hydrating Serum",
    subtitle: "Hydrate • Replenish • Plump",
    brand: "Natural Care",
    type: "Serum",
    category: "Serums",
    price: 2199,
    stock: 0,
    sku: "OKRA-HYD-02",
    image: "/images/products/okra-deep-hydrating-serum.jpg",
    sizes: ["30 ml", "50 ml"],
    rating: 4.8,
    reviewCount: 18,
    isMainProduct: false,
    isPurchasable: false,
    isFutureCollection: true,
    shortDescription: "A multi-depth moisture-replenishing serum powered by pure Okra mucilage polysaccharides to quench dehydrated skin.",
    description: "Part of our upcoming Natural Care Future Collection. Designed specifically to combat deep dehydration with concentrated Okra polysaccharides.",
    benefits: [
      "Provides sustained multi-depth hydration via concentrated Okra mucilage",
      "Helps soothe tight, dry, and thirsty skin feel immediately",
      "Future Collection formulation currently in final preparation"
    ],
    majorIngredient: {
      name: "Natural Okra Mucin",
      image: "/images/ingredients/ingredient-okra.jpg",
      role: "Multi-depth Moisture Magnet",
      tag: "Major Hero Ingredient",
      badge: "🌿 Future Collection"
    },
    ingredientImages: [
      { name: "Okra Mucin", image: "/images/ingredients/ingredient-okra.jpg", role: "Core Moisture Reservoir", isMajor: true },
      { name: "Hyaluronic Acid", image: "/images/ingredients/ingredient-hyaluronic-acid.jpg", role: "Deep Surface Binding", isMajor: false }
    ],
    ingredientsList: [
      { name: "Okra Extract (Okra Mucilage)", explanation: "Natural botanical humectant rich in water-binding polysaccharides." },
      { name: "Hyaluronic Acid", explanation: "Multi-depth hydration support." }
    ],
    howToUse: "Press 2–3 drops onto clean skin before applying cream.",
    concerns: ["Hydration", "Barrier Care"],
    skinTypes: ["Dry", "Sensitive", "Combination", "Normal"],
    keyIngredients: ["Okra Extract (Okra Mucilage)", "Hyaluronic Acid"],
    faq: [
      { q: "When will this be available?", a: "This product is part of our Future Collection and will be released following our signature Okra Mucin Face Serum." }
    ],
    availability: "Future Collection",
    placeholderTheme: "sage"
  },
  {
    id: "prod-003",
    name: "Okra Mucin & Ceramide Barrier Cream",
    subtitle: "Nourish • Barrier Repair • Shield",
    brand: "Natural Care",
    type: "Moisturizer",
    category: "Moisturizers",
    price: 2799,
    stock: 0,
    sku: "OKRA-BAR-03",
    image: "/images/products/okra-ceramide-barrier-cream.jpg",
    sizes: ["50 ml", "100 ml"],
    rating: 5.0,
    reviewCount: 31,
    isMainProduct: false,
    isPurchasable: false,
    isFutureCollection: true,
    shortDescription: "A rich, comforting cream combining soothing Okra mucilage and plant ceramides to lock in moisture and comfort the skin barrier.",
    description: "Part of our upcoming Natural Care Future Collection. Blends Okra polysaccharides with plant ceramides to reinforce moisture retention.",
    benefits: [
      "Encourages a calm and balanced skin barrier with soothing Okra mucilage",
      "Locks in hydration layers with plant-derived ceramides",
      "Future Collection formulation currently in development"
    ],
    majorIngredient: {
      name: "Natural Okra Mucin",
      image: "/images/ingredients/ingredient-okra.jpg",
      role: "Barrier Cushioning & Soothing",
      tag: "Major Hero Ingredient",
      badge: "🌿 Future Collection"
    },
    ingredientImages: [
      { name: "Okra Mucin", image: "/images/ingredients/ingredient-okra.jpg", role: "Skin Soothing Polysaccharides", isMajor: true },
      { name: "Ceramides", image: "/images/ingredients/ingredient-ceramides.jpg", role: "Lipid Barrier Reinforcement", isMajor: false }
    ],
    ingredientsList: [
      { name: "Okra Extract (Okra Mucilage)", explanation: "Soothes skin reactivity and retains long-term hydration." },
      { name: "Ceramides", explanation: "Lipid molecules that help support natural moisture barrier integrity." }
    ],
    howToUse: "Warm between fingertips and smooth over face and neck.",
    concerns: ["Barrier Care", "Hydration", "Texture"],
    skinTypes: ["Dry", "Sensitive", "Normal", "Combination"],
    keyIngredients: ["Okra Extract (Okra Mucilage)", "Ceramides"],
    faq: [
      { q: "When will this cream launch?", a: "This cream is in our upcoming Future Collection lineup." }
    ],
    availability: "Future Collection",
    placeholderTheme: "beige"
  },
  {
    id: "prod-004",
    name: "Okra Mucin Gentle Botanical Cleanser",
    subtitle: "Cleanse • Refresh • Respect pH",
    brand: "Natural Care",
    type: "Cleanser",
    category: "Cleansers",
    price: 1499,
    stock: 0,
    sku: "OKRA-CLN-04",
    image: "/images/products/okra-botanical-cleanser.jpg",
    sizes: ["100 ml", "200 ml"],
    rating: 4.7,
    reviewCount: 15,
    isMainProduct: false,
    isPurchasable: false,
    isFutureCollection: true,
    shortDescription: "A mild, pH-balanced facial cleanser enriched with Okra mucilage to cleanse without stripping natural moisture.",
    description: "Part of our upcoming Natural Care Future Collection. Formulated with soothing Okra mucilage and gentle plant surfactants.",
    benefits: [
      "Removes surface impurities while Okra mucilage protects moisture",
      "Respects skin's natural pH and lipid balance",
      "Future Collection formulation currently in development"
    ],
    majorIngredient: {
      name: "Natural Okra Mucin",
      image: "/images/ingredients/ingredient-okra.jpg",
      role: "Moisture-Protective Cleansing",
      tag: "Major Hero Ingredient",
      badge: "🌿 Future Collection"
    },
    ingredientImages: [
      { name: "Okra Mucin", image: "/images/ingredients/ingredient-okra.jpg", role: "Barrier Moisture Defense", isMajor: true },
      { name: "Hyaluronic Acid", image: "/images/ingredients/ingredient-hyaluronic-acid.jpg", role: "Hydration Cushion", isMajor: false }
    ],
    ingredientsList: [
      { name: "Okra Extract (Okra Mucilage)", explanation: "Protects skin moisture barrier during cleansing." },
      { name: "Chamomile Extract", explanation: "Comforting botanical addition for calm skin feel." }
    ],
    howToUse: "Massage 1–2 pumps onto damp skin and rinse thoroughly.",
    concerns: ["Daily Essentials", "Oil Control"],
    skinTypes: ["All Skin Types", "Sensitive", "Oily"],
    keyIngredients: ["Okra Extract (Okra Mucilage)", "Zinc PCA"],
    faq: [
      { q: "Is this cleanser available now?", a: "This cleanser is part of our Future Collection." }
    ],
    availability: "Future Collection",
    placeholderTheme: "lavender"
  },
  {
    id: "prod-005",
    name: "Okra Mucin Balance & Refining Essence",
    subtitle: "Refine • Prep • Balance",
    brand: "Natural Care",
    type: "Toner / Essence",
    category: "Toners",
    price: 1899,
    stock: 0,
    sku: "OKRA-TON-05",
    image: "/images/products/okra-refining-essence.jpg",
    sizes: ["100 ml"],
    rating: 4.8,
    reviewCount: 12,
    isMainProduct: false,
    isPurchasable: false,
    isFutureCollection: true,
    shortDescription: "A lightweight prep liquid formulated with Okra mucin and Niacinamide to refine texture and prepare skin.",
    description: "Part of our upcoming Natural Care Future Collection. Prepares skin for optimal absorption of the Okra Mucin Face Serum.",
    benefits: [
      "Prepares skin for optimal absorption of Okra serums",
      "Gently smooths surface texture feel",
      "Future Collection formulation currently in development"
    ],
    majorIngredient: {
      name: "Natural Okra Mucin",
      image: "/images/ingredients/ingredient-okra.jpg",
      role: "Texture Refining & Soothing",
      tag: "Major Hero Ingredient",
      badge: "🌿 Future Collection"
    },
    ingredientImages: [
      { name: "Okra Mucin", image: "/images/ingredients/ingredient-okra.jpg", role: "Skin Smoothing Base", isMajor: true },
      { name: "Niacinamide", image: "/images/ingredients/ingredient-niacinamide.jpg", role: "Clarity & Tone Balance", isMajor: false }
    ],
    ingredientsList: [
      { name: "Okra Extract (Okra Mucilage)", explanation: "Soothes and hydrates skin prep layers." },
      { name: "Niacinamide", explanation: "Helps balance skin tone and appearance." }
    ],
    howToUse: "Pour a few drops and gently pat across clean face and neck.",
    concerns: ["Oil Control", "Texture", "Radiance"],
    skinTypes: ["Combination", "Oily", "Normal"],
    keyIngredients: ["Okra Extract (Okra Mucilage)", "Niacinamide"],
    faq: [
      { q: "How soon will this be launched?", a: "Stay tuned! It is part of our upcoming Future Collection." }
    ],
    availability: "Future Collection",
    placeholderTheme: "sage"
  },
  {
    id: "prod-006",
    name: "Okra Mucin Seed Restorative Night Elixir",
    subtitle: "Overnight Nourishment • Lipids",
    brand: "Natural Care",
    type: "Face Oil",
    category: "Oils",
    price: 2999,
    stock: 0,
    sku: "OKRA-OIL-06",
    image: "/images/products/okra-night-elixir.jpg",
    sizes: ["30 ml"],
    rating: 4.9,
    reviewCount: 29,
    isMainProduct: false,
    isPurchasable: false,
    isFutureCollection: true,
    shortDescription: "A luxurious nighttime oil blend featuring cold-pressed Okra seed lipid oil and plant ceramides for overnight replenishment.",
    description: "Part of our upcoming Natural Care Future Collection. Designed to seal in hydration while you rest.",
    benefits: [
      "Imparts a velvety overnight Okra seed lipid nourishment",
      "Locks in moisture layers for wake-up radiance",
      "Future Collection formulation currently in development"
    ],
    majorIngredient: {
      name: "Cold-Pressed Okra Seed Oil",
      image: "/images/ingredients/ingredient-okra.jpg",
      role: "Overnight Botanical Lipid Recovery",
      tag: "Major Hero Ingredient",
      badge: "🌿 Future Collection"
    },
    ingredientImages: [
      { name: "Okra Seed Oil", image: "/images/ingredients/ingredient-okra.jpg", role: "Cold-Pressed Seed Lipids", isMajor: true },
      { name: "Ceramides", image: "/images/ingredients/ingredient-ceramides.jpg", role: "Overnight Barrier Lock", isMajor: false }
    ],
    ingredientsList: [
      { name: "Okra Seed Oil", explanation: "Nutrient-dense seed oil rich in linoleic acid and amino acids." },
      { name: "Ceramides", explanation: "Supports overnight skin barrier comfort." }
    ],
    howToUse: "Warm 2–3 drops in palms and gently press onto face as the final nighttime step.",
    concerns: ["Hydration", "Barrier Care", "Radiance"],
    skinTypes: ["Dry", "Normal", "Sensitive"],
    keyIngredients: ["Okra Seed Oil", "Ceramides"],
    faq: [
      { q: "When will the night elixir be released?", a: "This elixir is part of our Future Collection." }
    ],
    availability: "Future Collection",
    placeholderTheme: "rose"
  },
  {
    id: "prod-008",
    name: "Herbal Hydrogel (Papaya Relief Gel)",
    subtitle: "Soothing • Cooling • Natural Relief",
    brand: "Natural Care",
    type: "Hydrogel",
    category: "Body & Relief",
    price: 349,
    stock: 0,
    sku: "HERBAL-HYDRO-08",
    image: "/images/products/herbal-hydrogel-jar.jpg",
    gallery: [
      "/images/products/herbal-hydrogel-jar.jpg",
      "/images/products/herbal-hydrogel-lid.jpg"
    ],
    sizes: ["80 g"],
    rating: 4.9,
    reviewCount: 26,
    isMainProduct: false,
    isPurchasable: false,
    isFutureCollection: true,
    netWeight: "80 g",
    shortDescription: "Enriched with natural Papaya Extract, Menthol, and Camphor. Soothes tired muscles and provides an instant cooling effect.",
    description: "Part of our upcoming Natural Care Future Collection. Herbal Hydrogel is an intensely cooling, non-sticky, fast-absorbing botanical hydrogel enriched with natural Papaya Extract, Menthol, and Camphor. Formulated to help soothe and relax tired muscles, provide a cooling sensation, and support relief from mild body discomfort.",
    keyBenefitsDetailed: [
      { title: "Soothes & Relaxes", desc: "Helps to soothe and relax tired muscles" },
      { title: "Cooling & Refreshing", desc: "Provides an immediate cooling and refreshing sensation" },
      { title: "Mild Body Discomfort Relief", desc: "Supports relief from everyday body discomfort and fatigue" },
      { title: "Natural Papaya Enriched", desc: "Infused with skin-nurturing natural papaya extract" },
      { title: "Non-Sticky, Fast Absorbing", desc: "Ultra-clean gel that absorbs quickly without greasiness" }
    ],
    benefits: [
      "Helps to soothe and relax tired muscles",
      "Provides a cooling and refreshing effect",
      "Supports relief from mild body discomfort",
      "Enriched with natural papaya extract",
      "Non-sticky, fast absorbing gel"
    ],
    standards: ["Herbal Active", "Non-Sticky Formula", "Cruelty Free", "Fast Absorbing"],
    majorIngredient: {
      name: "Natural Papaya Extract (Carica Papaya)",
      image: "/images/products/herbal-hydrogel-lid.jpg",
      role: "Skin Nourishing Enzymes & Botanical Soothing",
      tag: "Major Herbal Active",
      badge: "🌿 Papaya & Cooling Menthol"
    },
    ingredientImages: [
      { name: "Papaya Extract", image: "/images/products/herbal-hydrogel-lid.jpg", role: "Enzyme Relief & Skin Nurturing", isMajor: true },
      { name: "Menthol & Camphor", image: "/images/ingredients/ingredient-okra.jpg", role: "Crisp Cooling & Muscle Relaxation", isMajor: false },
      { name: "Botanical Glycerin", image: "/images/ingredients/ingredient-hyaluronic-acid.jpg", role: "Hydration Balance", isMajor: false }
    ],
    ingredientsList: [
      { name: "Papaya Extract", explanation: "Antioxidant-dense herbal extract that enriches and calms the skin." },
      { name: "Menthol", explanation: "Delivers an immediate cooling and refreshing sensation to tired muscles." },
      { name: "Camphor", explanation: "Herbal compound traditionally known to relieve muscle tightness and fatigue." },
      { name: "Glycerin & Propylene Glycol", explanation: "Lightweight humectants that keep skin conditioned and soft." },
      { name: "Carbopol 940 & Purified Water", explanation: "Creates the crystal-clear, non-sticky fast-absorbing gel base." }
    ],
    howToUse: "1. Clean and dry the affected area.\n2. Take a small amount of herbal hydrogel.\n3. Apply gently and massage until absorbed.\n4. Use 2–3 times daily or as directed.",
    caution: "For external use only. Avoid contact with eyes, mouth and open wounds. Discontinue use if irritation occurs. Keep out of reach of children. Store in a cool, dry place away from direct sunlight.",
    marketedBy: "Natural Care, Ludhiana, Punjab, India",
    concerns: ["Body Relief", "Tired Muscles", "Cooling Sensation", "Daily Recovery"],
    skinTypes: ["All Skin Types", "Tired Muscles", "Post-Workout"],
    keyIngredients: ["Papaya Extract", "Menthol", "Camphor", "Glycerin"],
    faq: [
      { q: "What are the primary benefits of Herbal Hydrogel?", a: "It helps soothe and relax tired muscles, delivers a cooling, refreshing sensation, and supports relief from mild body discomfort." },
      { q: "Does Herbal Hydrogel leave any greasy residue?", a: "No, it is specifically formulated as a non-sticky, fast-absorbing hydrogel that disappears cleanly into skin." }
    ],
    availability: "Future Collection",
    placeholderTheme: "sage"
  },
  {
    id: "prod-009",
    name: "Herbal Bath Scrub (Rice • Oats • Aloe Vera)",
    subtitle: "Exfoliate • Refresh • Soften",
    brand: "Natural Care",
    type: "Body Scrub",
    category: "Body & Exfoliation",
    price: 399,
    stock: 0,
    sku: "HERBAL-SCRUB-09",
    image: "/images/products/herbal-bath-scrub-duo.jpg",
    gallery: [
      "/images/products/herbal-bath-scrub-duo.jpg",
      "/images/products/herbal-bath-scrub-jar.jpg"
    ],
    sizes: ["100 g"],
    rating: 4.95,
    reviewCount: 31,
    isMainProduct: false,
    isPurchasable: false,
    isFutureCollection: true,
    netWeight: "100 g",
    shortDescription: "Formulated with Rice, Oats, and Aloe Vera to gently exfoliate dead skin cells, deeply cleanse, and leave skin soft and glowing.",
    description: "Part of our upcoming Natural Care Future Collection. Herbal Bath Scrub combines natural Rice powder, soothing Colloidal Oatmeal, and cooling Aloe Vera. Enriched with traditional Turmeric and Sandalwood, this gentle body polish lifts away dead cells, unclogs pores, and restores a velvety, refreshed radiance to your skin without microplastics or irritation.",
    keyBenefitsDetailed: [
      { title: "Gentle Exfoliation", desc: "Removes dead surface skin cells with natural botanical grains" },
      { title: "Deep Cleansing", desc: "Cleanses, clarifies, and purifies pores thoroughly" },
      { title: "Soothes & Nourishes", desc: "Enriched with Colloidal Oatmeal and Aloe Vera to prevent dryness" },
      { title: "Smooth & Refreshed Skin", desc: "Delivers a velvety-soft, healthy, radiant glow" },
      { title: "Suitable for All Skin Types", desc: "Non-abrasive formula gentle enough for delicate skin" }
    ],
    benefits: [
      "Gentle Exfoliation: Removes dead skin cells",
      "Deep Cleansing: Cleanses and purifies skin",
      "Soothes & Nourishes: With natural botanicals",
      "Smooth & Refreshed Skin: For a healthy, glowing feel",
      "Suitable for all skin types"
    ],
    standards: ["100% Plant Grains", "Microplastic Free", "Cruelty Free", "Paraben Free"],
    majorIngredient: {
      name: "Natural Rice, Oats & Aloe Vera Complex",
      image: "/images/products/herbal-bath-scrub-duo.jpg",
      role: "Gentle Botanical Exfoliation & Deep Moisture Comfort",
      tag: "Major Herbal Trio",
      badge: "🌾 Rice • Oats • Aloe Vera"
    },
    ingredientImages: [
      { name: "Rice & Oats", image: "/images/products/herbal-bath-scrub-jar.jpg", role: "Gentle Exfoliating Polishing Grains", isMajor: true },
      { name: "Aloe Vera", image: "/images/ingredients/ingredient-okra.jpg", role: "Deep Soothing & Cooling Hydration", isMajor: false },
      { name: "Turmeric & Sandalwood", image: "/images/ingredients/ingredient-vitamin-c.jpg", role: "Purifying Glow & Skin Radiance", isMajor: false }
    ],
    ingredientsList: [
      { name: "Finely Milled Rice Powder", explanation: "Gentle physical exfoliating particles that slough off dull dead skin and boost radiance." },
      { name: "Colloidal Oats (Avena Sativa)", explanation: "Calms sensitivity, cushions the skin barrier, and imparts silky smoothness." },
      { name: "Pure Aloe Vera Extract", explanation: "Provides an instant cooling boost and replenishes deep hydration during exfoliation." },
      { name: "Wild Turmeric & Sandalwood", explanation: "Ayurvedic botanicals known to purify pores, calm redness, and enhance natural skin tone." },
      { name: "Botanical Glycerin", explanation: "Natural humectant ensuring skin stays hydrated and supple after rinsing." }
    ],
    howToUse: "1. Wet skin thoroughly in shower or bath.\n2. Scoop a generous amount of Herbal Bath Scrub.\n3. Gently massage in upward circular motions across body, focusing on dry areas (elbows, knees, heels).\n4. Rinse well with warm water. Use 2–3 times weekly.",
    caution: "For external body use only. Avoid contact with eyes and broken skin. Discontinue if irritation occurs. Store in a cool, dry place.",
    marketedBy: "Natural Care, Ludhiana, Punjab, India",
    concerns: ["Exfoliation", "Rough Skin", "Dull Complexion", "Body Care"],
    skinTypes: ["All Skin Types", "Dry Skin", "Rough Texture"],
    keyIngredients: ["Rice Powder", "Colloidal Oats", "Aloe Vera", "Turmeric"],
    faq: [
      { q: "Can I use Herbal Bath Scrub on sensitive skin?", a: "Yes, the scrub uses finely ground natural rice and calming colloidal oatmeal instead of harsh salt or plastic microbeads, making it gentle on delicate skin." },
      { q: "How often should I use it?", a: "We recommend using it 2 to 3 times a week during your shower routine for optimal smoothness and glow." }
    ],
    availability: "Future Collection",
    placeholderTheme: "beige"
  }
];