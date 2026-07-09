export type Language = "en" | "tr";

// Photo asset CDN URLs (stable, from src/assets/menu/*.asset.json)
const IMG_BASLANGIC_01 = "/__l5e/assets-v1/bbd58d78-a4ea-4a63-8a39-d7f7a8fdfbd8/gavurdagi-nobg.png";
const IMG_BASLANGIC_04 = "/__l5e/assets-v1/d8e5a1aa-930f-48a2-9da1-4e106c5ac13a/patates-tava-nobg.png";
const IMG_CORBA_01 = "/__l5e/assets-v1/dde88f63-2841-4503-811e-4aaffcb5c03a/ezogelin-nobg.png";
const IMG_CORBA_04 = "/__l5e/assets-v1/5dfd6ec9-effc-42f8-a709-cfc1e01bdaf7/mercimek-nobg.png";
const IMG_ANA_YEMEK_01 = "/__l5e/assets-v1/cc5fa363-cfe2-4529-b22a-66ddfdbb0644/celo-ana-yemek-01.jpg";
const IMG_KEBAP_01 = "/__l5e/assets-v1/c87e426b-579c-434d-abb0-df3bca05a70e/celo-kebap-01.jpg";
const IMG_SARMA_BEYTI = "/__l5e/assets-v1/97eb2143-0824-43f0-bf60-42b4bb4f6022/sarma-beyti.png";
const IMG_SUPER_IKILI = "/__l5e/assets-v1/49ea8e77-1a38-4958-9082-680c0ebde827/super-ikili-nobg.png";
const IMG_ANTEP_KURU_DOLMA = "/__l5e/assets-v1/24295380-d7dd-4584-950a-34acc54964ac/antep-kuru-dolma-nobg.png";
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
const IMG_PATLICAN_KEBABI = "/__l5e/assets-v1/6a2af136-0457-45ce-8e51-1c8322cd678b/patlican-kebabi-v2.png";
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
      { name: "Çöp Şiş", kcal: 375, desc: "İçerik: Kuzu eti, kuyruk eti, tuz. Alerjen: Gluten ve süt ürünü içermez.", price: "", image: "skeleton", standardSides: true },
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
} as const;
