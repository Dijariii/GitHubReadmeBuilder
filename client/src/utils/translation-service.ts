import { SUPPORTED_LANGUAGES } from "@shared/schema";

// Simple mock translations for common README sections
// In a real app, this would connect to a translation API or service
const sectionTranslations: Record<string, Record<string, string>> = {
  en: {
    about: "About Me",
    skills: "Skills",
    languages: "Languages and Tools",
    projects: "Projects",
    connect: "Connect with me",
    education: "Education",
    experience: "Experience",
    achievements: "Achievements",
    contact: "Contact"
  },
  es: {
    about: "Sobre Mí",
    skills: "Habilidades",
    languages: "Lenguajes y Herramientas",
    projects: "Proyectos",
    connect: "Conéctate conmigo",
    education: "Educación",
    experience: "Experiencia",
    achievements: "Logros",
    contact: "Contacto"
  },
  fr: {
    about: "À Propos de Moi",
    skills: "Compétences",
    languages: "Langages et Outils",
    projects: "Projets",
    connect: "Me Contacter",
    education: "Éducation",
    experience: "Expérience",
    achievements: "Réalisations",
    contact: "Contact"
  },
  de: {
    about: "Über Mich",
    skills: "Fähigkeiten",
    languages: "Sprachen und Werkzeuge",
    projects: "Projekte",
    connect: "Kontaktiere mich",
    education: "Bildung",
    experience: "Erfahrung",
    achievements: "Erfolge",
    contact: "Kontakt"
  },
  zh: {
    about: "关于我",
    skills: "技能",
    languages: "编程语言和工具",
    projects: "项目",
    connect: "联系我",
    education: "教育",
    experience: "经验",
    achievements: "成就",
    contact: "联系方式"
  },
  ja: {
    about: "自己紹介",
    skills: "スキル",
    languages: "言語とツール",
    projects: "プロジェクト",
    connect: "連絡先",
    education: "学歴",
    experience: "経験",
    achievements: "実績",
    contact: "連絡先"
  },
  ko: {
    about: "자기소개",
    skills: "기술",
    languages: "언어 및 도구",
    projects: "프로젝트",
    connect: "연락처",
    education: "교육",
    experience: "경력",
    achievements: "업적",
    contact: "연락처"
  },
  ru: {
    about: "Обо мне",
    skills: "Навыки",
    languages: "Языки и инструменты",
    projects: "Проекты",
    connect: "Связаться со мной",
    education: "Образование",
    experience: "Опыт",
    achievements: "Достижения",
    contact: "Контакты"
  },
  pt: {
    about: "Sobre Mim",
    skills: "Habilidades",
    languages: "Linguagens e Ferramentas",
    projects: "Projetos",
    connect: "Conecte-se comigo",
    education: "Educação",
    experience: "Experiência",
    achievements: "Conquistas",
    contact: "Contato"
  },
  ar: {
    about: "عني",
    skills: "المهارات",
    languages: "اللغات والأدوات",
    projects: "المشاريع",
    connect: "تواصل معي",
    education: "التعليم",
    experience: "الخبرة",
    achievements: "الإنجازات",
    contact: "اتصل بي"
  }
};

// Greeting translations
const greetingTranslations: Record<string, string> = {
  en: "Hi there! I'm",
  es: "¡Hola! Soy",
  fr: "Salut! Je suis",
  de: "Hallo! Ich bin",
  zh: "你好！我是",
  ja: "こんにちは！私は",
  ko: "안녕하세요! 저는",
  ru: "Привет! Я",
  pt: "Olá! Eu sou",
  ar: "مرحبا! أنا"
};

// Simple translation service
export const TranslationService = {
  // Translate a specific section title
  translateSection(section: string, language: string): string {
    if (language === "en" || !SUPPORTED_LANGUAGES.some(lang => lang.code === language)) {
      return section; // Return original for English or unsupported languages
    }
    
    const lang = language as keyof typeof sectionTranslations;
    const translations = sectionTranslations[lang] || sectionTranslations.en;
    
    const key = section.toLowerCase() as keyof typeof translations;
    return translations[key] || section;
  },
  
  // Get greeting in selected language
  getGreeting(language: string): string {
    if (language === "en" || !SUPPORTED_LANGUAGES.some(lang => lang.code === language)) {
      return greetingTranslations.en;
    }
    
    const lang = language as keyof typeof greetingTranslations;
    return greetingTranslations[lang] || greetingTranslations.en;
  },
  
  // Translate entire README content - in a real app, this would use a proper translation API
  translateReadme(content: string, language: string): string {
    if (language === "en") {
      return content; // Skip translation for English
    }
    
    // Replace section headers with translated versions
    let translatedContent = content;
    
    Object.entries(sectionTranslations.en).forEach(([key, englishValue]) => {
      const langKey = language as keyof typeof sectionTranslations;
      const translations = sectionTranslations[langKey] || sectionTranslations.en;
      const translatedValue = translations[key as keyof typeof translations] || englishValue;
      
      // Replace section headers (## Section Name) with translations
      translatedContent = translatedContent.replace(
        new RegExp(`## ${englishValue}`, 'g'), 
        `## ${translatedValue}`
      );
    });
    
    // Replace greeting
    translatedContent = translatedContent.replace(
      /Hi there! I'm/g,
      this.getGreeting(language)
    );
    
    return translatedContent;
  }
};