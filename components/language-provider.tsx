"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ta";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.benefits": "Benefits",
    "nav.reviews": "Reviews",
    "nav.about": "About",
    "nav.contact": "Contact",
    "button.whatsapp": "WhatsApp",
    "button.whatsappMessage":
      "Hi! I'm interested in KP Naturals. Can you tell me more about your sulfur-free hair oil?",

    // Hero Section
    "hero.badge": "100% Natural & Sulfur-Free",
    "hero.title": "Transform Your Hair with",
    "hero.brand": "KP Naturals",
    "hero.description":
      "Experience the power of natural sulfur-free hair oil crafted with hibiscus, coconut oil, and rosemary. Nourish and strengthen your hair naturally without harsh chemicals.",
    "hero.price": "₹145",
    "hero.offer": "Sunday Special: 20% OFF",
    "hero.usage": "Use for 3 months for best results",
    "button.order": "Order Now",
    "button.learn": "Visit",

    // Farm Story
    "farm.title": "From Our Farm to Your Hair",
    "farm.subtitle": "Farm Fresh Quality",
    "farm.description":
      "At K.P Pure Coconut Rosemary Hair Oil, we take pride in bringing you nature's best straight from our own coconut farm. Every drop of oil is carefully extracted from fresh coconuts harvested directly from our trees, ensuring purity, freshness, and authenticity. Since we cultivate and process the coconuts ourselves, we guarantee that our oil is 100% natural, chemical-free, and enriched with all the essential nutrients your hair deserves. From farm to bottle, our promise is to deliver uncompromised quality and care.",
    "farm.badge": "Farm Fresh",

    // Benefits
    "benefits.title": "Why Choose Sulfur-Free Hair Oil?",
    "benefits.subtitle":
      "Experience the difference of pure, natural ingredients that work in harmony with your hair's natural structure.",
    "benefit.gentle.title": "Gentle & Safe",
    "benefit.gentle.desc":
      "No harsh sulfates that strip natural oils and damage hair follicles. Perfect for sensitive scalps.",
    "benefit.nourish.title": "Deep Nourishment",
    "benefit.nourish.desc":
      "Rich in vitamins and essential fatty acids that penetrate deep into hair shafts for lasting moisture.",
    "benefit.natural.title": "100% Natural",
    "benefit.natural.desc":
      "Organic ingredients sourced sustainably. No synthetic chemicals, parabens, or artificial fragrances.",
    "benefit.results.title": "Proven Results",
    "benefit.results.desc":
      "Natural formulas that reduce hair breakage and increase shine with regular use over 3 months.",
    "benefit.types.title": "All Hair Types",
    "benefit.types.desc":
      "Suitable for curly, straight, thick, thin, colored, and chemically treated hair. Universal care.",
    "benefit.quality.title": "Premium Quality",
    "benefit.quality.desc":
      "Carefully crafted with traditional methods and modern quality standards for the best results.",

    // Ingredients
    "ingredients.title": "Natural Ingredients",
    "ingredients.subtitle":
      "Pure, powerful ingredients that transform your hair naturally",
    "ingredient.hibiscus": "Hibiscus",
    "ingredient.coconut": "Natural Coconut Oil",
    "ingredient.aloe": "Aloe Vera",
    "ingredient.rosemary": "Rosemary",
    "ingredient.secret": "Secret Natural Ingredient",
    "ingredient.nosulfur": "No Sulfur",
    "ingredient.hibiscus.benefit": "Boosts hair growth and adds natural shine",
    "ingredient.coconut.benefit":
      "Deeply moisturizes and helps prevent breakage",
    "ingredient.aloe.benefit": "Soothes scalp and reduces dandruff",
    "ingredient.rosemary.benefit":
      "Stimulates circulation and strengthens roots",
    "ingredient.secret.benefit": "Special blend for extra nourishment",
    "ingredient.nosulfur.benefit": "Gentle care without harsh chemicals",

    // Reviews
    "reviews.title": "What Our Customers Say",
    "reviews.subtitle":
      "Join thousands of satisfied customers who have transformed their hair naturally.",
    "reviews.leave": "Leave a Review",
    "reviews.placeholder": "Share your experience with KP Naturals...",
    "reviews.submit": "Submit Review",

    // Contact
    "contact.title": "Get In Touch",
    "contact.phone": "Phone",
    "contact.instagram": "Instagram",
    "contact.whatsapp": "WhatsApp Us",

    // Product Page
    "product.badge": "Premium Natural Hair Care",
    "product.title": "Pure Coconut",
    "product.subtitle": "Rosemary Hair Oil",
    "product.description":
      "Experience the power of nature with our sulfur-free hair oil blend. Crafted with pure coconut oil, hibiscus, aloe vera, and secret natural ingredients for healthier, stronger hair.",
    "product.price": "₹145",
    "product.offer": "20% OFF",
    "product.usage": "Use consistently for 3 months to see best results",
    "product.whatsapp": "Order via WhatsApp",
    "product.learn": "Learn More",
    "product.back": "Back to Home",
    "product.benefits.title": "Why Choose Our Sulfur-Free Hair Oil?",
    "product.benefits.subtitle":
      "Discover the natural benefits that make our hair oil the perfect choice for healthy, beautiful hair",
    "product.benefit.sulfur.title": "100% Sulfur-Free Formula",
    "product.benefit.sulfur.desc":
      "Gentle on scalp and hair, prevents irritation and dryness that sulfur-based products can cause.",
    "product.benefit.nourish.title": "Deep Nourishment",
    "product.benefit.nourish.desc":
      "Penetrates hair follicles to provide essential nutrients for stronger, healthier hair growth.",
    "product.benefit.natural.title": "Natural Ingredients Only",
    "product.benefit.natural.desc":
      "Made with pure coconut oil, hibiscus, aloe vera, and secret natural herbs - no chemicals.",
    "product.benefit.results.title": "Proven Results in 3 Months",
    "product.benefit.results.desc":
      "Consistent use for 3 months shows significant improvement in hair texture, strength, and growth.",
    "product.benefit.types.title": "Suitable for All Hair Types",
    "product.benefit.types.desc":
      "Works effectively on dry, oily, curly, straight, damaged, or chemically treated hair.",
    "product.benefit.quality.title": "Premium Quality Assurance",
    "product.benefit.quality.desc":
      "Handcrafted in small batches to ensure maximum potency and freshness of natural ingredients.",
    "product.ingredients.title": "Natural Ingredients",
    "product.ingredients.subtitle":
      "Each ingredient is carefully selected for its unique benefits to your hair and scalp",
    "product.ingredient.hibiscus": "Hibiscus",
    "product.ingredient.hibiscus.benefit":
      "Promotes hair growth and prevents premature graying",
    "product.ingredient.coconut": "Pure Coconut Oil",
    "product.ingredient.coconut.benefit":
      "Deep moisturization and protein protection",
    "product.ingredient.aloe": "Aloe Vera",
    "product.ingredient.aloe.benefit": "Soothes scalp and reduces inflammation",
    "product.ingredient.secret": "Secret Natural Blend",
    "product.ingredient.secret.benefit":
      "Proprietary herbs for enhanced effectiveness",
    "product.ingredient.rosemary": "Rosemary",
    "product.ingredient.rosemary.benefit":
      "Stimulates circulation and strengthens roots",

    // Footer
    "footer.tagline":
      "Transforming hair care with pure, natural, sulfur-free oils.",
    "footer.products": "Products",
    "footer.support": "Support",
    "footer.connect": "Connect",
    "footer.rights": "All rights reserved. Crafted for healthy hair.",
  },
  ta: {
    // Header
    "nav.home": "முகப்பு",
    "nav.products": "தயாரிப்புகள்",
    "nav.benefits": "நன்மைகள்",
    "nav.reviews": "விமர்சனங்கள்",
    "nav.about": "எங்களைப் பற்றி",
    "nav.contact": "தொடர்பு",
    "button.whatsapp": "வாட்ஸ்அப்",
    "button.whatsappMessage":
      "வணக்கம்! KP Naturals பற்றி எனக்கு ஆர்வம் உள்ளது. உங்கள் சல்பர் இல்லாத முடி எண்ணெயைப் பற்றி மேலும் கூற முடியுமா?",

    // Hero Section
    "hero.badge": "100% இயற்கை & சல்பர் இல்லாத",
    "hero.title": "உங்கள் முடியை மாற்றுங்கள்",
    // Updated brand name to KP Naturals (transliteration kept in English for branding consistency)
    // If a fully localized Tamil brand rendering is desired, replace with: "KP நேச்சுரல்ஸ் முடி எண்ணெய்"
    "hero.brand": "KP Naturals",
    "hero.description":
      "செம்பருத்தி, தேங்காய் எண்ணெய் மற்றும் ரோஸ்மேரியுடன் தயாரிக்கப்பட்ட இயற்கை சல்பர் இல்லாத முடி எண்ணெயின் சக்தியை அனுபவிக்கவும். கடுமையான இரசாயனங்கள் இல்லாமல் உங்கள் முடியை இயற்கையாக வளர்க்கவும் வலுப்படுத்தவும்.",
    "hero.price": "₹145",
    "hero.offer": "ஞாயிறு சிறப்பு: 20% தள்ளுபடி",
    "hero.usage": "சிறந்த முடிவுகளுக்கு 3 மாதங்கள் பயன்படுத்தவும்",
    "button.order": "இப்போது ஆர்டர் செய்யுங்கள்",
    "button.learn": "பார்வையிட",

    // Farm Story
    "farm.title": "எங்கள் பண்ணையிலிருந்து உங்கள் முடிக்கு",
    "farm.subtitle": "பண்ணை புதிய தரம்",
    "farm.description":
      "KP Naturals இல், எங்கள் சொந்த தேங்காய் பண்ணையிலிருந்து நேரடியாக இயற்கையின் சிறந்ததை உங்களுக்கு கொண்டு வருவதில் நாங்கள் பெருமை கொள்கிறோம். மரங்களில் இருந்து புதியதே அறுவடை செய்யப்பட்ட தேங்காய்களில் இருந்து ஒவ்வொரு துளியும் கவனமாகப் பிரித்தெடுக்கப்படுகிறது – தூய்மை, تازா தன்மை மற்றும் நம்பகத்தன்மையை உறுதி செய்ய. நாங்கள் நேரடியாக வளர்த்து பதப்படுத்துவதால் எங்கள் எண்ணெய் 100% இயற்கை, இரசாயனமற்றது மற்றும் உங்கள் முடிக்கு தேவையான அத்தியாவசிய ஊட்டச்சத்துக்களால் நிரம்பியதென நாங்கள் உறுதி செய்கிறோம். பண்ணையிலிருந்து பாட்டில் வரை – மாற்றமற்ற தரமும் அக்கறையும் எங்கள் வாக்குறுதி.",
    "farm.badge": "பண்ணை புதிய",

    // Benefits
    "benefits.title": "சல்பர் இல்லாத முடி எண்ணெயை ஏன் தேர்வு செய்ய வேண்டும்?",
    "benefits.subtitle":
      "தூய, இயற்கை பொருட்களின் வித்தியாசத்தை அனுபவிக்கவும் உங்கள் முடியின் இயற்கை அமைப்புடன் இணக்கமாக செயல்படும்.",
    "benefit.gentle.title": "மென்மையான & பாதுகாப்பான",
    "benefit.gentle.desc":
      "இயற்கை எண்ணெய்களை அகற்றும் மற்றும் முடி வேர்களை சேதப்படுத்தும் கடுமையான சல்பேட்டுகள் இல்லை. உணர்திறன் உச்சந்தலைக்கு ஏற்றது.",
    "benefit.nourish.title": "ஆழமான ஊட்டச்சத்து",
    "benefit.nourish.desc":
      "நீடித்த ஈரப்பதத்திற்காக முடி தண்டுகளில் ஆழமாக ஊடுருவும் வைட்டமின்கள் மற்றும் அத்தியாவசிய கொழுப்பு அமிலங்கள் நிறைந்தது.",
    "benefit.natural.title": "100% இயற்கை",
    "benefit.natural.desc":
      "நிலையான முறையில் பெறப்பட்ட இயற்கை பொருட்கள். செயற்கை இரசாயனங்கள், பாரபென்கள் அல்லது செயற்கை நறுமணங்கள் இல்லை.",
    "benefit.results.title": "நிரூபிக்கப்பட்ட முடிவுகள்",
    "benefit.results.desc":
      "3 மாதங்கள் தொடர்ந்து பயன்படுத்துவதன் மூலம் முடி உடைவதை குறைத்து பளபளப்பை அதிகரிக்கும் இயற்கை சூத்திரங்கள்.",
    "benefit.types.title": "அனைத்து முடி வகைகள்",
    "benefit.types.desc":
      "சுருள், நேர், அடர், மெல்லிய, வண்ணம் பூசப்பட்ட மற்றும் இரசாயன சிகிச்சை பெற்ற முடிக்கு ஏற்றது. உலகளாவிய பராமரிப்பு.",
    "benefit.quality.title": "உயர்தர தரம்",
    "benefit.quality.desc":
      "சிறந்த முடிவுகளுக்காக பாரம்பரிய முறைகள் மற்றும் நவீன தர தரநிலைகளுடன் கவனமாக தயாரிக்கப்பட்டது.",

    // Ingredients
    "ingredients.title": "இயற்கை பொருட்கள்",
    "ingredients.subtitle":
      "உங்கள் முடியை இயற்கையாக மாற்றும் தூய, சக்திவாய்ந்த பொருட்கள்",
    "ingredient.hibiscus": "செம்பருத்தி",
    "ingredient.coconut": "இயற்கை தேங்காய் எண்ணெய்",
    "ingredient.aloe": "கற்றாழை",
    "ingredient.rosemary": "ரோஸ்மேரி",
    "ingredient.secret": "ரகசிய இயற்கை பொருள்",
    "ingredient.nosulfur": "சல்பர் இல்லை",
    "ingredient.hibiscus.benefit":
      "முடி வளர்ச்சியை அதிகரித்து இயற்கை பளபளப்பு சேர்க்கிறது",
    "ingredient.coconut.benefit":
      "ஆழமாக ஈரப்பதம் சேர்த்து முடி உடைவதை தடுக்கிறது",
    "ingredient.aloe.benefit": "உச்சந்தலையை அமைதிப்படுத்தி பொடுகை குறைக்கிறது",
    "ingredient.rosemary.benefit":
      "இரத்த ஓட்டத்தை தூண்டி வேர்களை வலுப்படுத்துகிறது",
    "ingredient.secret.benefit": "கூடுதல் ஊட்டச்சத்துக்கான எங்கள் சிறப்பு கலவை",
    "ingredient.nosulfur.benefit":
      "கடுமையான இரசாயனங்கள் இல்லாமல் மென்மையான பராமரிப்பு",

    // Reviews
    "reviews.title": "எங்கள் வாடிக்கையாளர்கள் என்ன சொல்கிறார்கள்",
    "reviews.subtitle":
      "தங்கள் முடியை இயற்கையாக மாற்றிய ஆயிரக்கணக்கான திருப்தியான வாடிக்கையாளர்களுடன் சேருங்கள்.",
    "reviews.leave": "விமர்சனம் எழுதுங்கள்",
    "reviews.placeholder": "KP Naturals உடனான உங்கள் அனுபவத்தை பகிருங்கள்...",
    "reviews.submit": "விமர்சனம் சமர்பிக்கவும்",

    // Contact
    "contact.title": "தொடர்பில் இருங்கள்",
    "contact.phone": "தொலைபேசி",
    "contact.instagram": "இன்ஸ்டாகிராம்",
    "contact.whatsapp": "வாட்ஸ்அப் செய்யுங்கள்",

    // Product Page
    "product.badge": "பிரீமியம் இயற்கை முடி பராமரிப்பு",
    "product.title": "தூய தேங்காய்",
    "product.subtitle": "ரோஸ்மேரி முடி எண்ணெய்",
    "product.description":
      "எங்கள் சல்பர் இல்லாத முடி எண்ணெய் கலவையின் சக்தியை அனுபவிக்கவும். தூய தேங்காய் எண்ணெய், செம்பருத்தி, கற்றாழை மற்றும் ரகசிய இயற்கை பொருட்களுடன் தயாரிக்கப்பட்டது, ஆரோக்கியமான, வலுவான முடிக்காக.",
    "product.price": "₹145",
    "product.offer": "20% தள்ளுபடி",
    "product.usage":
      "சிறந்த முடிவுகளைக் காண 3 மாதங்கள் தொடர்ந்து பயன்படுத்தவும்",
    "product.whatsapp": "வாட்ஸ்அப் மூலம் ஆர்டர் செய்யுங்கள்",
    "product.learn": "மேலும் அறிக",
    "product.back": "முகப்புக்குத் திரும்பு",
    "product.benefits.title":
      "எங்கள் சல்பர் இல்லாத முடி எண்ணெயை ஏன் தேர்வு செய்ய வேண்டும்?",
    "product.benefits.subtitle":
      "ஆரோக்கியமான, அழகான முடிக்கு எங்கள் முடி எண்ணெயை சரியான தேர்வாக ஆக்கும் இயற்கை நன்மைகளைக் கண்டறியவும்",
    "product.benefit.sulfur.title": "100% சல்பர் இல்லாத சூத்திரம்",
    "product.benefit.sulfur.desc":
      "உச்சந்தலை மற்றும் முடியில் மென்மையானது, சல்பர் அடிப்படையிலான தயாரிப்புகள் ஏற்படுத்தக்கூடிய எரிச்சல் மற்றும் வறட்சியை தடுக்கிறது.",
    "product.benefit.nourish.title": "ஆழமான ஊட்டச்சத்து",
    "product.benefit.nourish.desc":
      "வலுவான, ஆரோக்கியமான முடி வளர்ச்சிக்கு அத்தியாவசிய ஊட்டச்சத்துக்களை வழங்க முடி வேர்களில் ஊடுருவுகிறது.",
    "product.benefit.natural.title": "இயற்கை பொருட்கள் மட்டுமே",
    "product.benefit.natural.desc":
      "தூய தேங்காய் எண்ணெய், செம்பருத்தி, கற்றாழை மற்றும் ரகசிய இயற்கை மூலிகைகளுடன் தயாரிக்கப்பட்டது - இரசாயனங்கள் இல்லை.",
    "product.benefit.results.title": "3 மாதங்களில் நிரூபிக்கப்பட்ட முடிவுகள்",
    "product.benefit.results.desc":
      "3 மாதங்கள் தொடர்ந்து பயன்படுத்துவது முடியின் அமைப்பு, வலிமை மற்றும் வளர்ச்சியில் குறிப்பிடத்தக்க முன்னேற்றத்தைக் காட்டுகிறது.",
    "product.benefit.types.title": "அனைத்து முடி வகைகளுக்கும் ஏற்றது",
    "product.benefit.types.desc":
      "வறண்ட, எண்ணெய், சுருள், நேர், சேதமடைந்த அல்லது இரசாயன சிகிச்சை பெற்ற முடியில் திறம்பட செயல்படுகிறது.",
    "product.benefit.quality.title": "பிரீமியம் தர உத்தரவாதம்",
    "product.benefit.quality.desc":
      "இயற்கை பொருட்களின் அதிகபட்ச சக்தி மற்றும் புத்துணர்ச்சியை உறுதி செய்ய சிறிய தொகுதிகளில் கைமுறையாக தயாரிக்கப்பட்டது.",
    "product.ingredients.title": "இயற்கை பொருட்கள்",
    "product.ingredients.subtitle":
      "உங்கள் முடி மற்றும் உச்சந்தலைக்கு அதன் தனித்துவமான நன்மைகளுக்காக ஒவ்வொரு பொருளும் கவனமாக தேர்ந்தெடுக்கப்படுகிறது",
    "product.ingredient.hibiscus": "செம்பருத்தி",
    "product.ingredient.hibiscus.benefit":
      "முடி வளர்ச்சியை ஊக்குவித்து முன்கூட்டிய நரைத்தலை தடுக்கிறது",
    "product.ingredient.coconut": "தூய தேங்காய் எண்ணெய்",
    "product.ingredient.coconut.benefit":
      "ஆழமான ஈரப்பதம் மற்றும் புரத பாதுகாப்பு",
    "product.ingredient.aloe": "கற்றாழை",
    "product.ingredient.aloe.benefit":
      "உச்சந்தலையை அமைதிப்படுத்தி அழற்சியை குறைக்கிறது",
    "product.ingredient.secret": "ரகசிய இயற்கை கலவை",
    "product.ingredient.secret.benefit":
      "மேம்பட்ட செயல்திறனுக்கான சொந்த மூலிகைகள்",
    "product.ingredient.rosemary": "ரோஸ்மேரி",
    "product.ingredient.rosemary.benefit":
      "இரத்த ஓட்டத்தை தூண்டி வேர்களை வலுப்படுத்துகிறது",

    // Footer
    "footer.tagline":
      "தூய, இயற்கை, சல்பர் இல்லாத எண்ணெய்களுடன் முடி பராமரிப்பை மாற்றுதல்.",
    "footer.products": "தயாரிப்புகள்",
    "footer.support": "ஆதரவு",
    "footer.connect": "இணைக்கவும்",
    "footer.rights":
      "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. ஆரோக்கியமான முடிக்காக கவனமாக தயாரிக்கப்பட்டது.",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "en" || saved === "ta")) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
