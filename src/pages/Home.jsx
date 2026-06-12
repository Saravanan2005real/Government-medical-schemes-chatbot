import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SearchCheck } from "lucide-react";
import heroShield from '../assets/hero-shield.jpg';
import {
  Shield,
  ShieldCheck,
  PhoneCall,
  CheckCircle,
  Building2,
  Activity,
  Baby,
  ShieldAlert,
  HeartPulse,
  MapPin,
  ArrowRight,
  Loader2,
  Search,
  ClipboardCheck,
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [medicalNeed, setMedicalNeed] = useState('');
  const [location, setLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(0);

  const handleSearch = () => {
    if (!medicalNeed.trim() || !location.trim()) {
      // Could show an error, but simple return for now
      return;
    }

    setIsSearching(true);
    setSearchStep(1); // "Analyzing eligibility..."

    setTimeout(() => {
      setSearchStep(2); // "Matching healthcare schemes..."
    }, 1500);

    setTimeout(() => {
      navigate('/questions', { state: { medicalNeed } });
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 pt-6">
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Shield className="w-3 h-3" />
              <span>{t('hero.badge')}</span>
            </div>

            <h1 className="text-5xl font-bold text-navy-900 leading-tight mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
              {t('hero.title1')} <br />
              {t('hero.title2')} <br />
              {t('hero.title3')} <span className="text-teal-700">{t('hero.title3_highlight')}</span>
            </h1>

            <p className="text-slate-600 mb-8 max-w-md animate-slide-up" style={{ animationDelay: '300ms' }}>
              {t('hero.desc')}
            </p>

            <div className="flex items-center space-x-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <button
                onClick={() => navigate('/questions')}
                className="bg-teal-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-800 transition-all hover:shadow-lg active:scale-95 flex items-center space-x-2"
              >
                <span>{t('hero.cta_check')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-all hover:shadow-sm active:scale-95">
                {t('hero.cta_explore')}
              </button>
            </div>
            <div className="flex flex-wrap gap-10 mt-10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-teal-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">45+</p>
                  <p className="text-sm text-slate-500">Government Schemes</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Building2 className="w-7 h-7 text-teal-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">2000+</p>
                  <p className="text-sm text-slate-500">Network Hospitals</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ClipboardCheck className="w-7 h-7 text-teal-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">100%</p>
                  <p className="text-sm text-slate-500">Free Service</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src={heroShield}
              alt="Healthcare Shield"
              className="w-full max-w-lg object-contain"
            />
          </div>

        </div>

        {/* Middle Section: Search & Popular Needs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Search Box */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                <SearchCheck className="w-6 h-6 text-teal-600" />
              </div>

              <h2 className="font-bold text-2xl text-slate-800">
                {t('search.title')}
              </h2>
            </div>

            {!isSearching ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t('search.label_need')}</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={medicalNeed}
                      onChange={(e) => setMedicalNeed(e.target.value)}
                      placeholder={t('search.placeholder_need')}
                      className="w-full pl-10 pr-10 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t('search.label_loc')}</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t('search.placeholder_loc')}
                      className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                    <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <button
                  onClick={handleSearch}
                  disabled={!medicalNeed.trim() || !location.trim()}
                  className="w-full bg-teal-700 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-teal-800 transition-all mt-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {t('search.btn')}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 space-y-4 animate-fade-in">
                <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
                <p className="font-medium text-teal-800 animate-pulse">
                  {searchStep === 1 ? t('search.analyzing') : t('search.matching')}
                </p>
              </div>
            )}
          </div>

          {/* Popular Health Needs */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                <HeartPulse className="w-6 h-6 text-teal-600" />
              </div>

              <h2 className="font-bold text-2xl text-slate-800">
                {t('popular.title')}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                onClick={() => { setMedicalNeed('Dialysis'); setLocation('Chennai'); }}
                className="flex flex-col items-center justify-center p-4 border border-slate-100 rounded-xl hover:border-teal-300 hover:bg-teal-50 hover:shadow-md cursor-pointer transition-all hover:-translate-y-1"
              >
                <Activity className="w-8 h-8 text-teal-600 mb-2" />
                <span className="text-xs font-medium text-slate-700 text-center">{t('popular.dialysis')}</span>
              </div>
              <div
                onClick={() => { setMedicalNeed('Pregnancy'); setLocation('Chennai'); }}
                className="flex flex-col items-center justify-center p-4 border border-slate-100 rounded-xl hover:border-teal-300 hover:bg-teal-50 hover:shadow-md cursor-pointer transition-all hover:-translate-y-1"
              >
                <Baby className="w-8 h-8 text-teal-600 mb-2" />
                <span className="text-xs font-medium text-slate-700 text-center">{t('popular.pregnancy')}</span>
              </div>
              <div
                onClick={() => { setMedicalNeed('Cancer'); setLocation('Chennai'); }}
                className="flex flex-col items-center justify-center p-4 border border-slate-100 rounded-xl hover:border-teal-300 hover:bg-teal-50 hover:shadow-md cursor-pointer transition-all hover:-translate-y-1"
              >
                <ShieldAlert className="w-8 h-8 text-teal-600 mb-2" />
                <span className="text-xs font-medium text-slate-700 text-center">{t('popular.cancer')}</span>
              </div>
              <div
                onClick={() => { setMedicalNeed('Heart Surgery'); setLocation('Chennai'); }}
                className="flex flex-col items-center justify-center p-4 border border-slate-100 rounded-xl hover:border-teal-300 hover:bg-teal-50 hover:shadow-md cursor-pointer transition-all hover:-translate-y-1"
              >
                <HeartPulse className="w-8 h-8 text-teal-600 mb-2" />
                <span className="text-xs font-medium text-slate-700 text-center">{t('popular.heart')}</span>
              </div>
            </div>
            <p className="text-center text-slate-600 font-medium mt-6">
              Choose a health need to check your eligibility
            </p>
          </div>
        </div>
        {/* HOW IT WORKS */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 mt-8">

          {/* Heading */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-[2px] w-12 bg-teal-300"></div>

              <h2 className="text-3xl font-bold text-slate-900">
                How It Works
              </h2>

              <div className="h-[2px] w-12 bg-teal-300"></div>
            </div>

            <p className="text-slate-500">
              Simple steps to find the right health scheme for you
            </p>
          </div>

          {/* Steps */}
          <div className="grid lg:grid-cols-3 gap-10">

            {/* STEP 1 */}
            <div className="relative flex items-center">

              <div className="w-20 h-20 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center">
                <Activity className="w-10 h-10 text-teal-700" />
              </div>

              <div className="ml-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-teal-700 text-white text-sm font-bold flex items-center justify-center">
                    1
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Enter Medical Need
                  </h3>
                </div>

                <p className="text-sm text-slate-500">
                  Tell us your health concern
                  and location
                </p>
              </div>

            </div>

            {/* STEP 2 */}
            <div className="relative flex items-center">

              <div className="w-20 h-20 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center">
                <Shield className="w-10 h-10 text-teal-700" />
              </div>

              <div className="ml-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-teal-700 text-white text-sm font-bold flex items-center justify-center">
                    2
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Answer Questions
                  </h3>
                </div>

                <p className="text-sm text-slate-500">
                  Answer a few simple questions
                  about your condition
                </p>
              </div>

            </div>

            {/* STEP 3 */}
            <div className="relative flex items-center">

              <div className="w-20 h-20 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-teal-700" />
              </div>

              <div className="ml-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-teal-700 text-white text-sm font-bold flex items-center justify-center">
                    3
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Get Eligible Schemes
                  </h3>
                </div>

                <p className="text-sm text-slate-500">
                  We'll show you schemes
                  you may qualify for
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;