export type Language = "en" | "tr";

// Photo asset CDN URLs (stable, from src/assets/menu/*.asset.json)
const IMG_BASLANGIC_01 = "/__l5e/assets-v1/fdc0af55-7757-4b68-875e-9ff6b4747c7e/celo-baslangic-01.jpg";
const IMG_BASLANGIC_04 = "/__l5e/assets-v1/50cf9d6c-3a0b-4d6d-bb56-c16f83a5e716/celo-baslangic-04.jpg";
const IMG_CORBA_01 = "/__l5e/assets-v1/4b57b6b2-f579-45af-bdf9-6a3047c89e3b/celo-corba-01.jpg";
const IMG_CORBA_04 = "/__l5e/assets-v1/33f8e822-5223-49a4-9efc-b0d201499d8b/celo-corba-04.jpg";
const IMG_ANA_YEMEK_01 = "/__l5e/assets-v1/cc5fa363-cfe2-4529-b22a-66ddfdbb0644/celo-ana-yemek-01.jpg";
const IMG_KEBAP_01 = "/__l5e/assets-v1/c87e426b-579c-434d-abb0-df3bca05a70e/celo-kebap-01.jpg";
const IMG_SARMA_BEYTI = "/__l5e/assets-v1/97eb2143-0824-43f0-bf60-42b4bb4f6022/sarma-beyti.png";
const IMG_KIREMITTE_ET = "/__l5e/assets-v1/0ccc3988-91bb-405a-ae8f-5172f95c8783/kiremitte-et.png";
const IMG_TATLI_01 = "/__l5e/assets-v1/a15273a7-6190-497c-836f-7db20071f9a8/celo-tatli-01.jpg";
const IMG_TATLI_02 = "/__l5e/assets-v1/589173e5-d6d8-4034-b65b-a6f3a3144f71/celo-tatli-02.jpg";

// image: URL → real photo; "skeleton" → grey placeholder ("Fotoğraf yakında");
//        "skeleton-soon" → placeholder with "fotoğraf güncellenecek"
const menuItems = {
  tr: {
    starters: [
      { name: "Süper İkili (Gavurdağı Salatası + İçli Köfte)", desc: "", price: "", image: "skeleton" },
      { name: "Fındık Lahmacun", desc: "", price: "", image: "skeleton" },
      { name: "İçli Köfte", desc: "", price: "100₺", image: "skeleton" },
      { name: "Patates Tava", desc: "", price: "", image: IMG_BASLANGIC_04 },
      { name: "Gavurdağı Salatası", desc: "", price: "", image: IMG_BASLANGIC_01 },
      { name: "Manda Yoğurdu", desc: "", price: "", image: "skeleton" },
    ],
    soups: [
      { name: "Mercimek Çorbası", desc: "", price: "200₺", image: IMG_CORBA_04 },
      { name: "Ezogelin Çorbası", desc: "", price: "200₺", image: IMG_CORBA_01 },
    ],
    oven: [
      { name: "Özel Antep Lahmacunu", desc: "", price: "210₺", image: "skeleton" },
      { name: "Kaşarlı Pide", desc: "", price: "470₺", image: "skeleton" },
      { name: "Kıymalı Kaşarlı Pide", desc: "", price: "490₺", image: "skeleton" },
      { name: "Sucuklu Kaşarlı Pide", desc: "", price: "490₺", image: "skeleton" },
      { name: "Karışık Pide", desc: "", price: "680₺", image: "skeleton" },
    ],
    wraps: [
      { name: "Tavuk Dürüm", desc: "", price: "400₺", image: "skeleton" },
      { name: "Zırh Dürüm", desc: "", price: "440₺", image: "skeleton" },
      { name: "Ciğer Dürüm", desc: "", price: "", image: "skeleton" },
      { name: "Çöp Şiş Dürüm", desc: "", price: "", image: "skeleton-soon" },
    ],
    kebabs: [
      { name: "Zırh Kebabı", desc: "", price: "720₺", image: IMG_ANA_YEMEK_01 },
      { name: "Ali Nazik", desc: "", price: "900₺", image: "skeleton" },
      { name: "Yoğurtlu Kebap", desc: "", price: "850₺", image: "skeleton" },
      { name: "Patlıcan Kebabı (Mevsiminde)", desc: "", price: "900₺", image: "skeleton-soon" },
    ],
    grills: [
      { name: "Izgara Köfte", desc: "", price: "650₺", image: IMG_KEBAP_01 },
      { name: "Tavuk Şiş", desc: "", price: "560₺", image: "skeleton" },
      { name: "Yaprak Kanat", desc: "", price: "650₺", image: "skeleton" },
      { name: "Antrikot", desc: "250gr", price: "1.100₺", image: "skeleton" },
      { name: "Kuzu Pirzola", desc: "300gr", price: "1.200₺", image: "skeleton" },
    ],
    family: [
      { name: "Kebaplı Aile Menüsü", desc: "", price: "1.990₺", image: "skeleton" },
      { name: "Köfteli Aile Menüsü", desc: "", price: "1.990₺", image: "skeleton" },
    ],
    desserts: [
      { name: "Kazandibi", desc: "", price: "", image: IMG_TATLI_02 },
      { name: "Fırın Sütlaç", desc: "", price: "170₺", image: IMG_TATLI_01 },
      { name: "Katmer", desc: "", price: "290₺", image: "skeleton" },
      { name: "Havuç Dilim Baklava", desc: "", price: "", image: "skeleton" },
      { name: "Tavuk Göğsü", desc: "", price: "", image: "skeleton" },
      { name: "Kabak Tatlısı (Mevsiminde)", desc: "", price: "", image: "skeleton" },
      { name: "Profiterol", desc: "", price: "", image: "skeleton" },
      { name: "Dondurma", desc: "", price: "", image: "skeleton" },
      { name: "Aşure", desc: "", price: "", image: "skeleton" },
    ],
    drinks: [
      { name: "Pepsi", desc: "330ml", price: "120₺", image: "skeleton" },
      { name: "Pepsi Max", desc: "330ml", price: "120₺", image: "skeleton" },
      { name: "Yedigün", desc: "330ml", price: "120₺", image: "skeleton" },
      { name: "7 Up", desc: "330ml", price: "120₺", image: "skeleton" },
      { name: "Ice Tea", desc: "330ml", price: "120₺", image: "skeleton" },
      { name: "Uludağ Gazoz", desc: "330ml", price: "120₺", image: "skeleton" },
      { name: "Şarküteri Cola", desc: "", price: "", image: "skeleton" },
      { name: "Şarküteri Gazoz", desc: "", price: "", image: "skeleton" },
      { name: "Adana Şalgamı", desc: "", price: "120₺", image: "skeleton" },
      { name: "Açık Ayran", desc: "250ml", price: "120₺", image: "skeleton" },
      { name: "Kapalı Ayran", desc: "250ml", price: "120₺", image: "skeleton" },
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
        starters: "Başlangıçlar",
        soups: "Çorbalar",
        oven: "Fırın / Pide",
        wraps: "Dürümler",
        kebabs: "Kebaplar / Ana Yemekler",
        grills: "Izgaralar",
        family: "Aile Menüsü",
        desserts: "Tatlılar",
        drinks: "İçecekler",
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
        starters: "Başlangıçlar",
        soups: "Çorbalar",
        oven: "Fırın / Pide",
        wraps: "Dürümler",
        kebabs: "Kebaplar / Ana Yemekler",
        grills: "Izgaralar",
        family: "Aile Menüsü",
        desserts: "Tatlılar",
        drinks: "İçecekler",
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
