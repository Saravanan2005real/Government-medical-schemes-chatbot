import React, { useState, useRef, useEffect } from 'react';
import { ShieldPlus, Phone, ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' }
  ];

  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="bg-teal-700 p-2 rounded-md">
          <ShieldPlus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-navy-900 leading-tight">{t('app.title')}</h1>
          <p className="text-sm text-teal-700 font-medium">{t('app.subtitle')}</p>
        </div>
      </div>

      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
        <Link to="/" className="text-teal-700">{t('nav.home')}</Link>
        <Link to="#" className="hover:text-teal-700 transition-colors">{t('nav.schemes')}</Link>
        <Link to="#" className="hover:text-teal-700 transition-colors">{t('nav.hospitals')}</Link>
        <Link to="#" className="hover:text-teal-700 transition-colors">{t('nav.help')}</Link>
        <Link to="#" className="hover:text-teal-700 transition-colors">{t('nav.about')}</Link>
      </nav>

      <div className="flex items-center space-x-4">
        <div className="relative" ref={langMenuRef}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center space-x-1 text-sm font-medium text-slate-700 hover:text-navy-900 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors"
          >
            <span>{languages.find(l => l.code === language)?.label}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${language === lang.code ? 'text-teal-700 font-medium' : 'text-slate-600'}`}
                >
                  {lang.label}
                  {language === lang.code && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="bg-navy-900 text-white flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-slate-800 transition-all hover:shadow-md active:scale-95">
          <Phone className="w-4 h-4" />
          <div className="text-left leading-tight">
            <span className="block text-[10px] text-slate-300">{t('header.emergency')}</span>
            <span className="block font-bold">108</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
