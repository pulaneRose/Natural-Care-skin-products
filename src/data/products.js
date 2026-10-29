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
  }
];