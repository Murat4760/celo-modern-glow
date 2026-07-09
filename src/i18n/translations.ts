export type Language = "en" | "tr" | "ar" | "ru" | "ja" | "zh" | "it";

// Photo asset CDN URLs (stable, from src/assets/menu/*.asset.json)
const IMG_BASLANGIC_01 = "/__l5e/assets-v1/ae24e22d-27f1-4aa0-bac2-d0eb0e31086f/gavurdagi-nobg2.png";
const IMG_BASLANGIC_04 = "/__l5e/assets-v1/3ee2a93c-67a4-4437-b7ce-4a5f7183ccbe/patates-tava-nobg2.png";
const IMG_CORBA_01 = "/__l5e/assets-v1/dde88f63-2841-4503-811e-4aaffcb5c03a/ezogelin-nobg.png";
const IMG_CORBA_04 = "/__l5e/assets-v1/5dfd6ec9-effc-42f8-a709-cfc1e01bdaf7/mercimek-nobg.png";
const IMG_ANA_YEMEK_01 = "/__l5e/assets-v1/cc5fa363-cfe2-4529-b22a-66ddfdbb0644/celo-ana-yemek-01.jpg";
const IMG_KEBAP_01 = "/__l5e/assets-v1/c87e426b-579c-434d-abb0-df3bca05a70e/celo-kebap-01.jpg";
const IMG_SARMA_BEYTI = "/__l5e/assets-v1/97eb2143-0824-43f0-bf60-42b4bb4f6022/sarma-beyti.png";
const IMG_SUPER_IKILI = "/__l5e/assets-v1/364460e4-09c6-4601-9eae-1051a0ce9df9/super-ikili-nobg2.png";
const IMG_ANTEP_KURU_DOLMA = "/__l5e/assets-v1/5e356fcd-ef9e-4426-bb3e-790e8e5e8ba0/antep-kuru-dolma-nobg2.png";
const IMG_AYRAN_ASI = "/__l5e/assets-v1/9211f090-df50-4c33-b95e-c02e8740fc1e/ayran-asi-nobg.png";
const IMG_KIREMITTE_ET = "/__l5e/assets-v1/0ccc3988-91bb-405a-ae8f-5172f95c8783/kiremitte-et.png";
const IMG_TATLI_01 = "/__l5e/assets-v1/a15273a7-6190-497c-836f-7db20071f9a8/celo-tatli-01.jpg";
const IMG_TATLI_02 = "/__l5e/assets-v1/589173e5-d6d8-4034-b65b-a6f3a3144f71/celo-tatli-02.jpg";
const IMG_CIGER_SIS = "/__l5e/assets-v1/19542fcc-29ff-4c2f-9f89-2a462cb3dbf5/ciger-sis.png";
const IMG_ALI_NAZIK = "/__l5e/assets-v1/81f0d227-10c9-4ce0-b307-dda54bcb861b/ali-nazik.png";
const IMG_ZIRH_KEBABI = "/__l5e/assets-v1/fb411f50-7b07-49cd-b1cb-a425362ade54/zirh-kebabi.png";
const IMG_TAVUK_SIS = "/__l5e/assets-v1/0dbc7500-e7a0-46bf-b429-bde5e838e465/tavuk-sis.png";
const IMG_YAPRAK_KANAT = "/__l5e/assets-v1/ea7ffbda-da76-4de8-8d46-606e6f7b56bc/yaprak-kanat.png";
const IMG_IZGARA_KOFTE = "/__l5e/assets-v1/dff45133-9ef6-4abe-877f-d3cd73580337/izgara-kofte.png";
const IMG_YOGURTLU_KEBAP = "/__l5e/assets-v1/a009e55c-1672-4701-bce7-a879d1f734c5/yogurtlu-kebap.png";
const IMG_PATLICAN_KEBABI = "/__l5e/assets-v1/e4df1654-71b5-457c-84bb-b45ff643280b/patlican-kebabi-nobg.png";
const IMG_COP_SIS = "/__l5e/assets-v1/e3a8c3db-f154-4d14-bb99-04be194da0d5/cop-sis-nobg.png";
const IMG_ANTRIKOT = "/__l5e/assets-v1/b4cfd12d-32bd-482b-bec5-6dd4115f2f49/antrikot.png";
const IMG_KUZU_PIRZOLA = "/__l5e/assets-v1/49945a0d-ab15-480d-bed1-c5a561a1c1fd/kuzu-pirzola.png";

// image: URL → real photo; "skeleton" → grey placeholder ("Fotoğraf yakında");
//        "skeleton-soon" → placeholder with "fotoğraf güncellenecek"
// Price = "" everywhere (client hasn't set prices) — renderer shows "fiyat sor" chip.
// standardSides=true → renders "Standart yan ürünler ile servis edilir" note.
// subheading → renders a subsection title above the item card.
const menuItems = {
  tr: {
    // SECTION 1 — Başlangıçlar & Çorbalar
    starters: [
      { subheading: "Başlangıçlar", name: "Süper İkili (Fındık Lahmacun & İçli Köfte)", desc: "Gluten içermektedir.", price: "150 ₺", image: IMG_SUPER_IKILI },
      { name: "Antep Kuru Dolma", desc: "Gluten içermemektedir.", price: "", image: IMG_ANTEP_KURU_DOLMA },
      { name: "Patates Tava", desc: "Gluten içermemektedir.", price: "150 ₺", image: IMG_BASLANGIC_04 },
      { name: "Gavurdağı Salatası", desc: "", price: "200 ₺", image: IMG_BASLANGIC_01 },
      { subheading: "Çorbalar", name: "Mercimek Çorbası", desc: "Gluten içermektedir.", price: "160 ₺", image: IMG_CORBA_04 },
      { name: "Ezogelin Çorbası", desc: "Gluten içermektedir.", price: "160 ₺", image: IMG_CORBA_01 },
      { name: "Ayran Aşı Çorbası", desc: "Yoğurt içerir.", price: "", image: IMG_AYRAN_ASI },
    ],
    // SECTION 2 — Ana Yemekler & Kebaplar (Ali Nazik dahil)
    mains: [
      { name: "Zırh Kebabı", kcal: 410, desc: "İçerik: Dana eti, kuzu eti, tuz ve kuyruk eti. Alerjen: Gluten ve süt ürünü içermez.", price: "720 ₺", image: IMG_ZIRH_KEBABI, standardSides: true },
      { name: "Patlıcan Kebabı", kcal: 410, desc: "İçerik: Dana eti, kuzu eti, patlıcan, tuz ve kuyruk eti. Alerjen: Gluten ve süt ürünü içermez.", price: "900 ₺", image: IMG_PATLICAN_KEBABI, standardSides: true },
      { name: "Çöp Şiş", kcal: 375, desc: "İçerik: Kuzu eti, kuyruk eti, tuz. Alerjen: Gluten ve süt ürünü içermez.", price: "", image: IMG_COP_SIS, standardSides: true },
      { name: "Ciğer Şiş", kcal: 350, desc: "İçerik: Kuzu ciğeri, kuyruk eti, tuz. Alerjen: Gluten ve süt ürünü içermez.", price: "", image: IMG_CIGER_SIS, standardSides: true },
      { name: "Ali Nazik", kcal: 475, desc: "İçerik: Dana eti, yoğurt, patlıcan, sarımsak, tuz. Alerjen: Gluten yok, süt ürünü içerir.", price: "", image: IMG_ALI_NAZIK, standardSides: true },
      { name: "Yoğurtlu Kebap", kcal: 475, desc: "İçerik: Dana eti, kuzu eti, kuyruk eti, tuz. Alerjen: Gluten ve süt ürünü içerir.", price: "", image: IMG_YOGURTLU_KEBAP, standardSides: true },
      { name: "Izgara Köfte", kcal: 425, desc: "İçerik: Dana eti, kuzu eti, patates kızartması, tuz. Alerjen: Gluten içerir, süt ürünü yok.", price: "650 ₺", image: IMG_IZGARA_KOFTE, standardSides: true },
      { name: "Tavuk Şiş", kcal: 300, desc: "İçerik: Tavuk eti. Alerjen: Gluten ve süt ürünü içermez.", price: "650 ₺", image: IMG_TAVUK_SIS, standardSides: true },
      { name: "Yaprak Kanat", kcal: 300, desc: "İçerik: Tavuk eti. Alerjen: Gluten ve süt ürünü içermez.", price: "650 ₺", image: IMG_YAPRAK_KANAT, standardSides: true },
    ],
    kebabs: [],
    // SECTION 4 — Sarma Beyti & Kiremitte Et (İkram)
    specials: [
      {
        name: "Sarma Beyti",
        desc: "",
        price: "",
        image: IMG_SARMA_BEYTI,
        alt: "Sarma Beyti servis tabağı",
        ikram: ["İçli Köfte", "Fındık Lahmacun", "Salata", "Soğan Salatası", "Ezme", "Çiğ Köfte", "Peynir"],
      },
      {
        name: "Kiremitte Et",
        desc: "",
        price: "",
        image: IMG_KIREMITTE_ET,
        alt: "Kiremitte Et servis tabağı",
        ikram: ["İçli Köfte", "Fındık Lahmacun", "Salata", "Soğan Salatası", "Ezme", "Çiğ Köfte", "Peynir"],
      },
    ],
    // SECTION 5 — Izgaralar & Aile Menüleri
    grills: [
      { subheading: "Izgaralar", name: "Antrikot", kcal: 400, desc: "İçerik: Dana eti. Alerjen: Gluten ve süt ürünü yok.", price: "1200 ₺", image: IMG_ANTRIKOT, standardSides: true },
      { name: "Kuzu Pirzola", kcal: 300, desc: "İçerik: Kuzu eti. Alerjen: Gluten ve süt ürünü yok.", price: "1200 ₺", image: IMG_KUZU_PIRZOLA, standardSides: true },
      { subheading: "Aile Menüleri", name: "Köfteli Aile Menüsü", desc: "Yarım kilo köfte, yarım kilo kanat, yarım kilo tavuk şiş, 4 adet fındık lahmacun, 4 adet içli köfte, 1 L ayran, özel tatlı, çay ve zengin ikramlıklar.", price: "1990 ₺", image: "skeleton" },
      { name: "Kebaplı Aile Menüsü", desc: "Yarım kilo kebap, yarım kilo kanat, yarım kilo tavuk şiş, 4 adet fındık lahmacun, 4 adet içli köfte, 1 L ayran, özel tatlı, çay ve zengin ikramlıklar.", price: "1990 ₺", image: "skeleton" },
    ],
    // SECTION 6 — Fırın, Dürümler, Tatlılar, İçecekler
    bakery: [
      { subheading: "Fırın", name: "Özel Antep Lahmacunu", desc: "Dana ve kuzu eti, maydanoz, domates, biber, sarımsak. Gluten içerir.", price: "210 ₺", image: "skeleton" },
      { name: "Kaşarlı Pide", desc: "Gluten ve süt ürünü içerir.", price: "470 ₺", image: "skeleton" },
      { name: "Sucuklu Kaşarlı Pide", desc: "Dana eti, gluten ve süt ürünü içerir.", price: "490 ₺", image: "skeleton" },
      { name: "Kuşbaşılı Kaşarlı Pide", desc: "Dana eti, gluten ve süt ürünü içerir.", price: "590 ₺", image: "skeleton" },
      { name: "Karışık Pide", desc: "Dana eti, gluten ve süt ürünü içerir.", price: "650 ₺", image: "skeleton" },
      { subheading: "Dürümler", name: "Tavuk Dürüm", kcal: 150, desc: "Gluten içerir.", price: "440 ₺", image: "skeleton" },
      { name: "Zırh Dürüm", kcal: 200, desc: "Gluten içerir.", price: "440 ₺", image: "skeleton" },
      { name: "Ciğer Şiş Dürüm", kcal: 175, desc: "Gluten içerir.", price: "540 ₺", image: "skeleton" },
      { name: "Çöp Şiş Dürüm", kcal: 185, desc: "Gluten içerir.", price: "540 ₺", image: "skeleton" },
      { subheading: "Tatlılar", name: "Katmer", desc: "Gluten ve süt ürünü içerir.", price: "290 ₺", image: "skeleton" },
      { name: "Fırın Sütlaç", desc: "Gluten ve süt ürünü içerir.", price: "190 ₺", image: IMG_TATLI_01 },
      { name: "Havuç Dilim Baklava", desc: "Gluten ve süt ürünü içerir.", price: "290 ₺", image: "skeleton" },
      { name: "Kazandibi", desc: "Gluten ve süt ürünü içerir.", price: "190 ₺", image: IMG_TATLI_02 },
      { name: "Tavuk Göğsü", desc: "Gluten ve süt ürünü içerir.", price: "190 ₺", image: "skeleton" },
      { name: "Kabak Tatlısı (mevsiminde)", desc: "Gluten ve süt ürünü içerir.", price: "", image: "skeleton" },
      { name: "Profiterol", desc: "Gluten ve süt ürünü içerir.", price: "190 ₺", image: "skeleton" },
      { name: "Dondurma", desc: "Gluten ve süt ürünü içerir.", price: "190 ₺", image: "skeleton" },
      { name: "Aşure", desc: "Gluten ve süt ürünü içerir.", price: "190 ₺", image: "skeleton" },
      { subheading: "İçecekler", name: "Pepsi (330ml)", desc: "", price: "120 ₺", image: "" },
      { name: "Pepsi Max (330ml)", desc: "", price: "120 ₺", image: "" },
      { name: "Yedigün", desc: "", price: "120 ₺", image: "" },
      { name: "7 Up", desc: "", price: "120 ₺", image: "" },
      { name: "Sarıyer Cola", desc: "", price: "120 ₺", image: "" },
      { name: "Sarıyer Gazoz", desc: "", price: "120 ₺", image: "" },
      { name: "Ice Tea", desc: "", price: "120 ₺", image: "" },
      { name: "Uludağ Gazoz (330ml)", desc: "", price: "120 ₺", image: "" },
      { name: "Adana Şalgamı", desc: "", price: "120 ₺", image: "" },
      { name: "Açık Ayran", desc: "", price: "120 ₺", image: "" },
      { name: "Kapalı Ayran (230ml)", desc: "", price: "120 ₺", image: "" },
      { name: "Şayran (330ml)", desc: "", price: "120 ₺", image: "" },
    ],
  },
} as const;

// EN mirrors TR (names are Turkish proper nouns)
const menuItemsEn = menuItems.tr;

export const translations = {
  en: {
    nav: {
      menu: "Specials",
      about: "Our Story",
      contact: "Contact",
      reserve: "Reserve",
    },
    hero: {
      subtitle: "Modern Anatolian Cuisine",
      tagline: "Where ancient Anatolian traditions meet contemporary craft. Every flame tells a story.",
      viewMenu: "View Menu",
      ourStory: "Our Story",
    },
    status: {
      open: "Open Now",
      closed: "Closed",
      closesIn: "Closes in",
      opensIn: "Opens in",
      hourShort: "h",
      minShort: "m",
    },
    chef: {
      label: "Curated Selection",
      title: "Chef's",
      titleItalic: "Recommendations",
      dishes: [
        {
          name: "Zırh Kebabı",
          description: "Slow-cooked lamb sealed in a copper pot, roasted over charcoal for 6 hours. A centuries-old Anatolian tradition.",
          tag: "Signature",
        },
        {
          name: "Kuşbaşılı Pide",
          description: "Hand-stretched flatbread filled with tender diced lamb, roasted peppers, and sumac butter.",
          tag: "Popular",
        },
        {
          name: "Künefe",
          description: "Shredded filo pastry layered with melted cheese, baked golden and bathed in warm syrup.",
          tag: "Dessert",
        },
      ],
    },
    menuPage: {
      title: "Our",
      titleItalic: "Menu",
      label: "Our Menu",
      listView: "List View",
      visualView: "Visual View",
      lastUpdated: "Last updated",
      notAvailable: "Not Available Today",
      photoSoon: "Fotoğraf yakında",
      photoUpdating: "Fotoğraf güncellenecek",
      categories: {
        starters: "Başlangıçlar & Çorbalar",
        mains: "Ana Yemekler",
        kebabs: "Ali Nazik & Kebaplar",
        specials: "Sarma Beyti & Kiremitte Et",
        grills: "Izgaralar & Aile Menüleri",
        bakery: "Fırın, Dürüm, Tatlı & İçecek",
      },
    },
    menuItems: menuItemsEn,
    about: {
      label: "Our Philosophy",
      title: "Fire, Copper &",
      titleItalic: "Tradition",
      text: "At CELO, we honour the ancient art of Anatolian fire cooking. Our copper pots are hand-hammered in Gaziantep, our lamb sourced from the highlands of Eastern Turkey, and our spices ground fresh each morning. Every dish is a bridge between centuries of tradition and the bold flavours of today.",
      stats: [
        { value: "6+", label: "Hours Slow-Cooked" },
        { value: "1200°", label: "Charcoal Heat" },
        { value: "100%", label: "Open Fire" },
      ],
    },
    contact: {
      label: "Get in Touch",
      title: "Visit",
      titleItalic: "Us",
      address: "Kavaklı, Oğuzhan Cd. No:22, 34520 Beylikdüzü/İstanbul",
      hours: "Every Day",
      hoursDetail: "11:30 AM – 2:00 AM",
      hoursMonday: "Monday: 11:30 AM – 10:30 PM",
      hoursSaturday: "Saturday: 11:00 AM – 2:00 AM",
      phone: "+90 530 171 34 52",
      email: "info@celorestaurant.com",
      addressLabel: "Address",
      hoursLabel: "Hours",
      phoneLabel: "Phone",
      emailLabel: "Email",
      rating: "4.7 ★ (653 reviews)",
    },
    reviews: {
      subtitle: "Guest Reviews",
      title: "What Our",
      titleItalic: "Guests Say",
      items: [
        { name: "Gizem Kafadar", stars: 5, date: "Nov 2025", text: "One of the best places for hospitality. The complimentary mezes, flavor, fast service — you won't be disappointed. We booked for 33 people and the food arrived within 10 minutes. Ali Nazik here is unmatched!" },
        { name: "Agah Demirci", stars: 5, date: "Jan 2026", text: "Everything I ate was legendary… the tripe soup was exquisite, the lahmacun truly lives up to its name, even the complimentary çiğköfte was delicious. The sütlaç was divine." },
        { name: "Vezir Yalçın", stars: 5, date: "Dec 2025", text: "I hadn't had such delicious lahmacun and kebab in a long time. The chicken was also excellent. Staff are polite, attentive and genuinely friendly." },
        { name: "James Heller", stars: 5, date: "Jan 2026", text: "I rarely write reviews but this place absolutely deserves 5 stars. An incredible experience from start to finish — the flavors, the service, the atmosphere." },
        { name: "Feriha Şeyma Efe", stars: 5, date: "Feb 2026", text: "The food was magnificent. We got the family menu for 4 and couldn't finish it — had to take leftovers! Cleanliness, presentation, flavors all full marks." },
        { name: "Dr. Mo Sammour", stars: 4, date: "Nov 2025", text: "The atmosphere is great. They offer welcoming dishes — salad, appetizers, kibbeh and bread. The mixed kebab platter was delicious and well-presented." },
      ],
    },
    footer: {
      tagline: "Modern Anatolian cuisine in the heart of Beylikdüzü.",
      hoursLabel: "Hours",
      everyDay: "Every Day",
      contactLabel: "Contact",
      rights: "All rights reserved.",
    },
    reservation: {
      cta: "Reserve a Table",
    },
  },
  tr: {
    nav: {
      menu: "Spesiyaller",
      about: "Hikayemiz",
      contact: "İletişim",
      reserve: "Rezervasyon",
    },
    hero: {
      subtitle: "Modern Anadolu Mutfağı",
      tagline: "Kadim Anadolu gelenekleri çağdaş ustalıkla buluşuyor. Her ateş bir hikâye anlatır.",
      viewMenu: "Menüyü Gör",
      ourStory: "Hikayemiz",
    },
    status: {
      open: "Açık",
      closed: "Kapalı",
      closesIn: "Kapanışa",
      opensIn: "Açılışa",
      hourShort: "s",
      minShort: "dk",
    },
    chef: {
      label: "Özenle Seçilmiş",
      title: "Şefin",
      titleItalic: "Tavsiyeleri",
      dishes: [
        {
          name: "Zırh Kebabı",
          description: "Bakır tencerede mühürlenen kuzu eti, 6 saat közde pişirilir. Yüzyıllık Anadolu geleneği.",
          tag: "İmza",
        },
        {
          name: "Kuşbaşılı Pide",
          description: "El açması hamur, kuşbaşı kuzu eti, közlenmiş biber ve sumak yağı ile.",
          tag: "Popüler",
        },
        {
          name: "Künefe",
          description: "Kadayıf arasında eritilmiş peynir, fırında altın sarısı pişirilir, sıcak şerbet ile servis edilir.",
          tag: "Tatlı",
        },
      ],
    },
    menuPage: {
      title: "Bizim",
      titleItalic: "Menümüz",
      label: "Menümüz",
      listView: "Liste Görünümü",
      visualView: "Görsel Görünüm",
      lastUpdated: "Son güncelleme",
      notAvailable: "Bugün Yok",
      photoSoon: "Fotoğraf yakında",
      photoUpdating: "Fotoğraf güncellenecek",
      categories: {
        starters: "Başlangıçlar & Çorbalar",
        mains: "Ana Yemekler",
        kebabs: "Ali Nazik & Kebaplar",
        specials: "Sarma Beyti & Kiremitte Et",
        grills: "Izgaralar & Aile Menüleri",
        bakery: "Fırın, Dürüm, Tatlı & İçecek",
      },
    },
    menuItems: menuItems.tr,
    about: {
      label: "Felsefemiz",
      title: "Ateş, Bakır &",
      titleItalic: "Gelenek",
      text: "CELO'da Anadolu'nun kadim ateşle pişirme sanatını yaşatıyoruz. Bakır kaplarımız Gaziantep'te el dövmesi, kuzumuz Doğu Anadolu yaylalarından, baharatlarımız her sabah taze çekilir. Her tabak, yüzyıllık gelenek ile bugünün cesur tatları arasında bir köprüdür.",
      stats: [
        { value: "6+", label: "Saat Ağır Pişirme" },
        { value: "1200°", label: "Köz Isısı" },
        { value: "100%", label: "Açık Ateş" },
      ],
    },
    contact: {
      label: "Bize Ulaşın",
      title: "Bizi",
      titleItalic: "Ziyaret Edin",
      address: "Kavaklı, Oğuzhan Cd. No:22, 34520 Beylikdüzü/İstanbul",
      hours: "Her Gün",
      hoursDetail: "11:30 – 02:00",
      hoursMonday: "Pazartesi: 11:30 – 22:30",
      hoursSaturday: "Cumartesi: 11:00 – 02:00",
      phone: "+90 530 171 34 52",
      email: "info@celorestaurant.com",
      addressLabel: "Adres",
      hoursLabel: "Çalışma Saatleri",
      phoneLabel: "Telefon",
      emailLabel: "E-posta",
      rating: "4.7 ★ (653 yorum)",
    },
    reviews: {
      subtitle: "Misafir Yorumları",
      title: "Misafirlerimiz",
      titleItalic: "Ne Diyor?",
      items: [
        { name: "Gizem Kafadar", stars: 5, date: "Kas 2025", text: "İzzet-i ikram noktasında bir numara mekanlardan biridir. 33 kişilik rezervasyonda ana yemekler 10 dk içinde geldi. Ali nazik burada yeyin başka yerde yemezsiniz bence." },
        { name: "Agah Demirci", stars: 5, date: "Oca 2026", text: "Ne yediysem hepsi efsane güzeldi... Kelle paça çorbası nefis, lahmacun gerçekten hakkını veriyor, ikram çiğköfte çok lezzetli. Sütlaç nefis." },
        { name: "Vezir Yalçın", stars: 5, date: "Ara 2025", text: "Uzun zamandır bu kadar lezzetli lahmacun ve kebap yememiştim. Tavuk da çok başarılıydı. Çalışanlar kibar, ilgili ve gerçekten samimi." },
        { name: "James Heller", stars: 5, date: "Oca 2026", text: "Normalde mekanlar için çok yorum yazmam ama kesinlikle 5 yıldızı hak eden bir mekan. İnanılmaz bir deneyim — lezzetler, servis, atmosfer her şey mükemmel." },
        { name: "Feriha Şeyma Efe", stars: 5, date: "Şub 2026", text: "Yemekler şahaneydi. Aile menüsü aldık 4 kişi yiyemedik paket yaptırdık. Temizlik, düzen, lezzetler tam puan aldı." },
        { name: "Dr. Mo Sammour", stars: 4, date: "Kas 2025", text: "Atmosfer harika. Karşılama tabakları — salata, mezeler, içli köfte ve ekmek sundular. Karışık kebap tabağı lezzetli ve güzel sunulmuştu." },
      ],
    },
    footer: {
      tagline: "Beylikdüzü'nün kalbinde modern Anadolu mutfağı.",
      hoursLabel: "Çalışma Saatleri",
      everyDay: "Her Gün",
      contactLabel: "İletişim",
      rights: "Tüm hakları saklıdır.",
    },
    reservation: {
      cta: "Rezervasyon Yap",
    },
  },
  ar: {
    nav: { menu: "الأطباق المميزة", about: "قصتنا", contact: "اتصل بنا", reserve: "احجز" },
    hero: {
      subtitle: "المطبخ الأناضولي الحديث",
      tagline: "حيث تلتقي التقاليد الأناضولية القديمة بالحرفية المعاصرة. كل شعلة تحكي قصة.",
      viewMenu: "عرض القائمة",
      ourStory: "قصتنا",
    },
    status: { open: "مفتوح الآن", closed: "مغلق", closesIn: "يُغلق خلال", opensIn: "يفتح خلال", hourShort: "س", minShort: "د" },
    chef: {
      label: "اختيار مميز",
      title: "توصيات",
      titleItalic: "الشيف",
      dishes: [
        { name: "Zırh Kebabı", description: "لحم ضأن مطهو ببطء في قدر نحاسي، مشوي على الفحم لمدة 6 ساعات. تقليد أناضولي عريق.", tag: "الطبق المميز" },
        { name: "Kuşbaşılı Pide", description: "خبز مسطح محشو بلحم الضأن المقطع والفلفل المشوي وزبدة السماق.", tag: "الأكثر طلباً" },
        { name: "Künefe", description: "عجينة كنافة مع جبن مذاب، مخبوزة ذهبية ومغموسة في شراب دافئ.", tag: "حلوى" },
      ],
    },
    menuPage: {
      title: "قائمتنا", titleItalic: "", label: "قائمتنا",
      listView: "عرض قائمة", visualView: "عرض مرئي", lastUpdated: "آخر تحديث",
      notAvailable: "غير متوفر اليوم", photoSoon: "الصورة قريباً", photoUpdating: "سيتم تحديث الصورة",
      categories: {
        starters: "المقبلات والحساء", mains: "الأطباق الرئيسية", kebabs: "علي نازك والكباب",
        specials: "سارما بيتي واللحم على القرميد", grills: "المشويات وقوائم العائلة", bakery: "المخبوزات، اللفائف، الحلويات والمشروبات",
      },
    },
    menuItems: menuItems.tr,
    about: {
      label: "فلسفتنا", title: "النار، النحاس و", titleItalic: "التقاليد",
      text: "في CELO، نحيي فن الطهي الأناضولي القديم على النار. أوانينا النحاسية مطروقة يدوياً في غازي عنتاب، ولحم الضأن من مرتفعات شرق تركيا، والبهارات تُطحن طازجة كل صباح.",
      stats: [
        { value: "6+", label: "ساعات طهي بطيء" },
        { value: "1200°", label: "حرارة الفحم" },
        { value: "100%", label: "نار مكشوفة" },
      ],
    },
    contact: {
      label: "تواصل معنا", title: "زُرنا", titleItalic: "",
      address: "Kavaklı, Oğuzhan Cd. No:22, 34520 Beylikdüzü/İstanbul",
      hours: "كل يوم", hoursDetail: "11:30 – 02:00", hoursMonday: "الاثنين: 11:30 – 22:30", hoursSaturday: "السبت: 11:00 – 02:00",
      phone: "+90 530 171 34 52", email: "info@celorestaurant.com",
      addressLabel: "العنوان", hoursLabel: "ساعات العمل", phoneLabel: "الهاتف", emailLabel: "البريد الإلكتروني",
      rating: "4.7 ★ (653 تقييم)",
    },
    reviews: {
      subtitle: "آراء الضيوف", title: "ماذا يقول", titleItalic: "ضيوفنا",
      items: [
        { name: "Gizem Kafadar", stars: 5, date: "نوفمبر 2025", text: "من أفضل الأماكن في الضيافة. المقبلات المجانية والنكهة والخدمة السريعة — لن تخيب ظنك." },
        { name: "Agah Demirci", stars: 5, date: "يناير 2026", text: "كل ما تناولته كان أسطورياً. حساء الكوارع رائع، واللحم بعجين يستحق اسمه فعلاً." },
        { name: "Vezir Yalçın", stars: 5, date: "ديسمبر 2025", text: "لم أتناول لحماً بعجين وكباباً بهذه اللذة منذ فترة طويلة. الدجاج أيضاً كان ممتازاً." },
        { name: "James Heller", stars: 5, date: "يناير 2026", text: "نادراً ما أكتب مراجعات لكن هذا المكان يستحق 5 نجوم. تجربة رائعة من البداية للنهاية." },
        { name: "Feriha Şeyma Efe", stars: 5, date: "فبراير 2026", text: "الطعام كان رائعاً. طلبنا قائمة العائلة لأربعة ولم نستطع إنهاءها." },
        { name: "Dr. Mo Sammour", stars: 4, date: "نوفمبر 2025", text: "الأجواء رائعة. يقدمون أطباق ترحيبية — سلطة ومقبلات وكبة وخبز." },
      ],
    },
    footer: { tagline: "المطبخ الأناضولي الحديث في قلب بيليكدوزو.", hoursLabel: "ساعات العمل", everyDay: "كل يوم", contactLabel: "اتصل بنا", rights: "جميع الحقوق محفوظة." },
    reservation: { cta: "احجز طاولة" },
  },
  ru: {
    nav: { menu: "Спецпредложения", about: "Наша история", contact: "Контакты", reserve: "Бронирование" },
    hero: {
      subtitle: "Современная анатолийская кухня",
      tagline: "Где древние анатолийские традиции встречаются с современным мастерством. Каждый огонь рассказывает историю.",
      viewMenu: "Смотреть меню", ourStory: "Наша история",
    },
    status: { open: "Открыто", closed: "Закрыто", closesIn: "Закрытие через", opensIn: "Открытие через", hourShort: "ч", minShort: "мин" },
    chef: {
      label: "Отборная подборка", title: "Рекомендации", titleItalic: "шефа",
      dishes: [
        { name: "Zırh Kebabı", description: "Медленно томлёная ягнятина в медном котле, жаренная на углях 6 часов. Многовековая анатолийская традиция.", tag: "Фирменное" },
        { name: "Kuşbaşılı Pide", description: "Лепёшка ручной работы с нежной ягнятиной, жареным перцем и сумаховым маслом.", tag: "Популярное" },
        { name: "Künefe", description: "Тесто кадаиф с расплавленным сыром, запечённое до золотистого цвета в тёплом сиропе.", tag: "Десерт" },
      ],
    },
    menuPage: {
      title: "Наше", titleItalic: "меню", label: "Наше меню",
      listView: "Список", visualView: "Плитка", lastUpdated: "Обновлено",
      notAvailable: "Сегодня недоступно", photoSoon: "Фото скоро", photoUpdating: "Фото обновляется",
      categories: {
        starters: "Закуски и супы", mains: "Основные блюда", kebabs: "Али Назик и кебабы",
        specials: "Сарма Бейти и мясо на черепице", grills: "Гриль и семейные меню", bakery: "Выпечка, дюрюм, десерты и напитки",
      },
    },
    menuItems: menuItems.tr,
    about: {
      label: "Наша философия", title: "Огонь, медь и", titleItalic: "традиции",
      text: "В CELO мы храним древнее искусство анатолийской кухни на огне. Наши медные котлы кованы вручную в Газиантепе, ягнятина из горных районов Восточной Турции, а специи мелются свежими каждое утро.",
      stats: [
        { value: "6+", label: "часов томления" },
        { value: "1200°", label: "жар углей" },
        { value: "100%", label: "открытый огонь" },
      ],
    },
    contact: {
      label: "Связаться с нами", title: "Посетите", titleItalic: "нас",
      address: "Kavaklı, Oğuzhan Cd. No:22, 34520 Beylikdüzü/İstanbul",
      hours: "Каждый день", hoursDetail: "11:30 – 02:00", hoursMonday: "Понедельник: 11:30 – 22:30", hoursSaturday: "Суббота: 11:00 – 02:00",
      phone: "+90 530 171 34 52", email: "info@celorestaurant.com",
      addressLabel: "Адрес", hoursLabel: "Часы работы", phoneLabel: "Телефон", emailLabel: "Эл. почта",
      rating: "4.7 ★ (653 отзыва)",
    },
    reviews: {
      subtitle: "Отзывы гостей", title: "Что говорят", titleItalic: "наши гости",
      items: [
        { name: "Gizem Kafadar", stars: 5, date: "Ноя 2025", text: "Одно из лучших мест по гостеприимству. Бесплатные мезе, вкус, быстрое обслуживание — вы не разочаруетесь." },
        { name: "Agah Demirci", stars: 5, date: "Янв 2026", text: "Всё что я ел было легендарным. Суп из требухи изысканный, лахмаджун полностью оправдывает своё имя." },
        { name: "Vezir Yalçın", stars: 5, date: "Дек 2025", text: "Давно не ел такого вкусного лахмаджуна и кебаба. Курица тоже отличная." },
        { name: "James Heller", stars: 5, date: "Янв 2026", text: "Редко пишу отзывы, но это место заслуживает 5 звёзд. Невероятный опыт от начала до конца." },
        { name: "Feriha Şeyma Efe", stars: 5, date: "Фев 2026", text: "Еда была великолепной. Мы взяли семейное меню на 4 и не смогли доесть." },
        { name: "Dr. Mo Sammour", stars: 4, date: "Ноя 2025", text: "Отличная атмосфера. Подают приветственные блюда — салат, закуски, киббе и хлеб." },
      ],
    },
    footer: { tagline: "Современная анатолийская кухня в сердце Бейликдюзю.", hoursLabel: "Часы работы", everyDay: "Каждый день", contactLabel: "Контакты", rights: "Все права защищены." },
    reservation: { cta: "Забронировать стол" },
  },
  ja: {
    nav: { menu: "スペシャル", about: "私たちの物語", contact: "お問い合わせ", reserve: "予約" },
    hero: {
      subtitle: "モダン・アナトリア料理",
      tagline: "古代アナトリアの伝統と現代の技が出会う。すべての炎が物語を語る。",
      viewMenu: "メニューを見る", ourStory: "私たちの物語",
    },
    status: { open: "営業中", closed: "閉店", closesIn: "閉店まで", opensIn: "開店まで", hourShort: "時間", minShort: "分" },
    chef: {
      label: "厳選", title: "シェフの", titleItalic: "おすすめ",
      dishes: [
        { name: "Zırh Kebabı", description: "銅鍋で封じ込めた仔羊肉を、炭火で6時間じっくりロースト。何世紀にもわたるアナトリアの伝統。", tag: "看板料理" },
        { name: "Kuşbaşılı Pide", description: "手延べの生地に柔らかい仔羊肉、焼きピーマン、スマックバターを合わせて。", tag: "人気" },
        { name: "Künefe", description: "とろけるチーズを重ねたカダイフ生地を黄金色に焼き上げ、温かいシロップで。", tag: "デザート" },
      ],
    },
    menuPage: {
      title: "私たちの", titleItalic: "メニュー", label: "メニュー",
      listView: "リスト表示", visualView: "ビジュアル表示", lastUpdated: "最終更新",
      notAvailable: "本日ご用意なし", photoSoon: "写真は近日公開", photoUpdating: "写真は更新予定",
      categories: {
        starters: "前菜とスープ", mains: "メイン料理", kebabs: "アリ・ナジクとケバブ",
        specials: "サルマ・ベイティと石板の肉", grills: "グリルとファミリーメニュー", bakery: "ベーカリー、ラップ、デザート、飲み物",
      },
    },
    menuItems: menuItems.tr,
    about: {
      label: "私たちの哲学", title: "炎、銅、", titleItalic: "伝統",
      text: "CELOでは、アナトリアの古代の火の料理の芸術を継承しています。銅鍋はガジアンテップで手打ち、仔羊は東トルコの高原から、スパイスは毎朝挽きたてです。",
      stats: [
        { value: "6+", label: "時間じっくり煮込み" },
        { value: "1200°", label: "炭火の熱" },
        { value: "100%", label: "直火" },
      ],
    },
    contact: {
      label: "お問い合わせ", title: "ご来店", titleItalic: "ください",
      address: "Kavaklı, Oğuzhan Cd. No:22, 34520 Beylikdüzü/İstanbul",
      hours: "毎日", hoursDetail: "11:30 – 02:00", hoursMonday: "月曜: 11:30 – 22:30", hoursSaturday: "土曜: 11:00 – 02:00",
      phone: "+90 530 171 34 52", email: "info@celorestaurant.com",
      addressLabel: "住所", hoursLabel: "営業時間", phoneLabel: "電話", emailLabel: "メール",
      rating: "4.7 ★ (653件のレビュー)",
    },
    reviews: {
      subtitle: "お客様の声", title: "ゲストの", titleItalic: "感想",
      items: [
        { name: "Gizem Kafadar", stars: 5, date: "2025年11月", text: "おもてなしで最高のお店の一つ。無料のメゼ、味、迅速なサービス — 期待を裏切りません。" },
        { name: "Agah Demirci", stars: 5, date: "2026年1月", text: "食べたものすべてが伝説的でした。ケレパチャスープは絶品、ラフマジュンは名にふさわしい味。" },
        { name: "Vezir Yalçın", stars: 5, date: "2025年12月", text: "久しぶりにこんなに美味しいラフマジュンとケバブを食べました。チキンも素晴らしかった。" },
        { name: "James Heller", stars: 5, date: "2026年1月", text: "めったにレビューを書きませんが、ここは間違いなく5つ星に値します。" },
        { name: "Feriha Şeyma Efe", stars: 5, date: "2026年2月", text: "料理は素晴らしかった。4人用のファミリーメニューを頼みましたが食べきれませんでした。" },
        { name: "Dr. Mo Sammour", stars: 4, date: "2025年11月", text: "雰囲気が素晴らしい。ウェルカム料理としてサラダ、前菜、キベ、パンが提供されました。" },
      ],
    },
    footer: { tagline: "ベイリクデュズの中心にあるモダン・アナトリア料理。", hoursLabel: "営業時間", everyDay: "毎日", contactLabel: "お問い合わせ", rights: "All rights reserved." },
    reservation: { cta: "テーブル予約" },
  },
  zh: {
    nav: { menu: "特色菜", about: "我们的故事", contact: "联系我们", reserve: "预订" },
    hero: {
      subtitle: "现代安纳托利亚料理",
      tagline: "古老的安纳托利亚传统与当代工艺相遇。每一簇火焰都诉说着一个故事。",
      viewMenu: "查看菜单", ourStory: "我们的故事",
    },
    status: { open: "营业中", closed: "已打烊", closesIn: "距打烊", opensIn: "距开门", hourShort: "小时", minShort: "分钟" },
    chef: {
      label: "精选", title: "主厨", titleItalic: "推荐",
      dishes: [
        { name: "Zırh Kebabı", description: "羔羊肉在铜锅中慢炖,再用炭火烤6小时。传承数百年的安纳托利亚传统。", tag: "招牌" },
        { name: "Kuşbaşılı Pide", description: "手擀薄饼配嫩羔羊丁、烤红椒和漆树粉黄油。", tag: "人气" },
        { name: "Künefe", description: "细面饼夹融化奶酪,烤至金黄,浸入温热糖浆。", tag: "甜点" },
      ],
    },
    menuPage: {
      title: "我们的", titleItalic: "菜单", label: "菜单",
      listView: "列表视图", visualView: "图片视图", lastUpdated: "最后更新",
      notAvailable: "今日无供应", photoSoon: "图片即将上传", photoUpdating: "图片将更新",
      categories: {
        starters: "前菜与汤品", mains: "主菜", kebabs: "阿里·纳齐克与烤肉串",
        specials: "萨玛贝蒂与瓦上肉", grills: "烧烤与家庭套餐", bakery: "烘焙、卷饼、甜点与饮品",
      },
    },
    menuItems: menuItems.tr,
    about: {
      label: "我们的理念", title: "火焰、铜器与", titleItalic: "传统",
      text: "在 CELO,我们传承古老的安纳托利亚炉火烹饪艺术。我们的铜锅在加济安泰普手工打造,羔羊来自东土耳其高原,香料每天清晨新鲜研磨。",
      stats: [
        { value: "6+", label: "小时慢炖" },
        { value: "1200°", label: "炭火高温" },
        { value: "100%", label: "明火烹饪" },
      ],
    },
    contact: {
      label: "联系我们", title: "欢迎", titleItalic: "光临",
      address: "Kavaklı, Oğuzhan Cd. No:22, 34520 Beylikdüzü/İstanbul",
      hours: "每天", hoursDetail: "11:30 – 02:00", hoursMonday: "周一: 11:30 – 22:30", hoursSaturday: "周六: 11:00 – 02:00",
      phone: "+90 530 171 34 52", email: "info@celorestaurant.com",
      addressLabel: "地址", hoursLabel: "营业时间", phoneLabel: "电话", emailLabel: "邮箱",
      rating: "4.7 ★ (653条评价)",
    },
    reviews: {
      subtitle: "顾客评价", title: "顾客", titleItalic: "怎么说",
      items: [
        { name: "Gizem Kafadar", stars: 5, date: "2025年11月", text: "款待方面最好的餐厅之一。免费的开胃菜、美味和快速服务 — 绝不会让您失望。" },
        { name: "Agah Demirci", stars: 5, date: "2026年1月", text: "我吃的一切都堪称传奇。牛肚汤精致,肉馅饼名副其实。" },
        { name: "Vezir Yalçın", stars: 5, date: "2025年12月", text: "很久没吃到这么美味的肉馅饼和烤肉了。鸡肉也非常出色。" },
        { name: "James Heller", stars: 5, date: "2026年1月", text: "我很少写评论,但这家店绝对值得5星。从头到尾都是难以置信的体验。" },
        { name: "Feriha Şeyma Efe", stars: 5, date: "2026年2月", text: "菜品非常棒。我们点了4人家庭套餐,吃不完打包了。" },
        { name: "Dr. Mo Sammour", stars: 4, date: "2025年11月", text: "氛围很好。提供了欢迎菜品 — 沙拉、开胃菜、基贝和面包。" },
      ],
    },
    footer: { tagline: "位于贝利克杜祖中心的现代安纳托利亚料理。", hoursLabel: "营业时间", everyDay: "每天", contactLabel: "联系我们", rights: "版权所有。" },
    reservation: { cta: "预订餐位" },
  },
  it: {
    nav: { menu: "Specialità", about: "La nostra storia", contact: "Contatti", reserve: "Prenota" },
    hero: {
      subtitle: "Cucina Anatolica Moderna",
      tagline: "Dove le antiche tradizioni anatoliche incontrano l'arte contemporanea. Ogni fiamma racconta una storia.",
      viewMenu: "Vedi il menu", ourStory: "La nostra storia",
    },
    status: { open: "Aperto", closed: "Chiuso", closesIn: "Chiude tra", opensIn: "Apre tra", hourShort: "h", minShort: "m" },
    chef: {
      label: "Selezione curata", title: "Consigli", titleItalic: "dello Chef",
      dishes: [
        { name: "Zırh Kebabı", description: "Agnello cotto lentamente sigillato in un tegame di rame, arrostito sulla brace per 6 ore. Un'antica tradizione anatolica.", tag: "Signature" },
        { name: "Kuşbaşılı Pide", description: "Pane piatto steso a mano con agnello a cubetti, peperoni arrostiti e burro al sommacco.", tag: "Popolare" },
        { name: "Künefe", description: "Pasta filo sfilacciata con formaggio fuso, cotta al forno e bagnata nello sciroppo caldo.", tag: "Dessert" },
      ],
    },
    menuPage: {
      title: "Il nostro", titleItalic: "menu", label: "Il nostro menu",
      listView: "Vista elenco", visualView: "Vista immagini", lastUpdated: "Ultimo aggiornamento",
      notAvailable: "Non disponibile oggi", photoSoon: "Foto in arrivo", photoUpdating: "Foto in aggiornamento",
      categories: {
        starters: "Antipasti e zuppe", mains: "Piatti principali", kebabs: "Ali Nazik e kebab",
        specials: "Sarma Beyti e carne su tegola", grills: "Grigliate e menu famiglia", bakery: "Forno, dürüm, dolci e bevande",
      },
    },
    menuItems: menuItems.tr,
    about: {
      label: "La nostra filosofia", title: "Fuoco, rame e", titleItalic: "tradizione",
      text: "Al CELO onoriamo l'antica arte anatolica della cottura al fuoco. I nostri tegami in rame sono martellati a mano a Gaziantep, l'agnello proviene dagli altopiani della Turchia orientale, e le spezie vengono macinate fresche ogni mattina.",
      stats: [
        { value: "6+", label: "Ore di cottura lenta" },
        { value: "1200°", label: "Calore della brace" },
        { value: "100%", label: "Fuoco vivo" },
      ],
    },
    contact: {
      label: "Contattaci", title: "Vieni a", titleItalic: "trovarci",
      address: "Kavaklı, Oğuzhan Cd. No:22, 34520 Beylikdüzü/İstanbul",
      hours: "Ogni giorno", hoursDetail: "11:30 – 02:00", hoursMonday: "Lunedì: 11:30 – 22:30", hoursSaturday: "Sabato: 11:00 – 02:00",
      phone: "+90 530 171 34 52", email: "info@celorestaurant.com",
      addressLabel: "Indirizzo", hoursLabel: "Orari", phoneLabel: "Telefono", emailLabel: "Email",
      rating: "4.7 ★ (653 recensioni)",
    },
    reviews: {
      subtitle: "Recensioni degli ospiti", title: "Cosa dicono", titleItalic: "i nostri ospiti",
      items: [
        { name: "Gizem Kafadar", stars: 5, date: "Nov 2025", text: "Uno dei migliori posti per l'ospitalità. I mezze offerti, il sapore, il servizio veloce — non rimarrete delusi." },
        { name: "Agah Demirci", stars: 5, date: "Gen 2026", text: "Tutto quello che ho mangiato era leggendario. La zuppa di trippa squisita, il lahmacun all'altezza del suo nome." },
        { name: "Vezir Yalçın", stars: 5, date: "Dic 2025", text: "Non mangiavo un lahmacun e un kebab così buoni da tanto tempo. Anche il pollo era eccellente." },
        { name: "James Heller", stars: 5, date: "Gen 2026", text: "Raramente scrivo recensioni ma questo posto merita davvero 5 stelle. Un'esperienza incredibile dall'inizio alla fine." },
        { name: "Feriha Şeyma Efe", stars: 5, date: "Feb 2026", text: "Il cibo era magnifico. Abbiamo preso il menu famiglia per 4 e non siamo riusciti a finirlo." },
        { name: "Dr. Mo Sammour", stars: 4, date: "Nov 2025", text: "L'atmosfera è ottima. Offrono piatti di benvenuto — insalata, antipasti, kibbeh e pane." },
      ],
    },
    footer: { tagline: "Cucina anatolica moderna nel cuore di Beylikdüzü.", hoursLabel: "Orari", everyDay: "Ogni giorno", contactLabel: "Contatti", rights: "Tutti i diritti riservati." },
    reservation: { cta: "Prenota un tavolo" },
  },
} as const;
