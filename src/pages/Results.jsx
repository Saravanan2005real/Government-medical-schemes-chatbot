import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Check, MapPin, CreditCard, FileText, PhoneCall, Info, Award,
  Activity, ClipboardCheck, ArrowRight, Shield, Building2, CheckCircle2, HeartPulse, Stethoscope, Star, Coins, Users
} from 'lucide-react';
import Stepper from '../components/Stepper';
import { useLanguage } from '../context/LanguageContext';

const Results = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Preserved Existing Logic
  const nearbyHospitals = [
    { name: 'Government General Hospital', address: 'Park Town, Chennai', distance: '2.3 km', mapUrl: 'https://maps.google.com/?q=Government+General+Hospital,+Park+Town,+Chennai' },
    { name: 'Apollo Hospital', address: 'Greams Road, Chennai', distance: '4.1 km', mapUrl: 'https://maps.google.com/?q=Apollo+Hospital,+Greams+Road,+Chennai' },
    { name: 'Kauvery Hospital', address: 'Alwarpet, Chennai', distance: '5.7 km', mapUrl: 'https://maps.google.com/?q=Kauvery+Hospital,+Alwarpet,+Chennai' }
  ];

  // Dynamic state extraction matching existing routing structures
  const medicalNeed = location.state?.medicalNeed || 'Healthcare Support';
  const locationText = location.state?.location || 'Tamil Nadu';
  const questionsAnswered = location.state?.questionsAnswered; // Will hide if undefined
  
  // Scheme matching logic from existing data/state
  const matchPercentage = location.state?.matchPercentage || 94; // Using 94% as fallback per original logic
  const mainScheme = location.state?.mainScheme || {
    name: "Chief Minister's Health Insurance Scheme (CMHIS)",
    shortDesc: t('results.govt') + ' - ' + t('results.dept'),
    matchPercentage: matchPercentage,
    logo: null,
    benefits: null, // Will use fallbacks if null
    qualifications: [
      'Tamil Nadu Resident',
      'Family Income Eligible',
      'Treatment Covered',
      'Age Criteria Eligible',
      'Documents Valid'
    ]
  };

  const otherSchemes = location.state?.otherSchemes || []; // Hides if empty

  // Updated Match Badge Logic
  const getMatchBadge = (percentage) => {
    if (percentage >= 90) return { label: 'Excellent Match', color: 'bg-green-100 text-green-800 border-green-200' };
    if (percentage >= 75) return { label: 'Strong Match', color: 'bg-teal-100 text-teal-800 border-teal-200' };
    return { label: 'Eligible', color: 'bg-blue-100 text-blue-800 border-blue-200' };
  };

  const matchBadge = getMatchBadge(mainScheme.matchPercentage);

  const fallbackBenefits = [
    { id: 1, title: 'Financial Coverage', desc: 'Up to eligible limit', icon: <Coins className="w-6 h-6" /> },
    { id: 2, title: 'Cashless Treatment', desc: 'Hassle-free hospitalization', icon: <CreditCard className="w-6 h-6" /> },
    { id: 3, title: 'Network Hospital Access', desc: 'Empanelled hospitals', icon: <Building2 className="w-6 h-6" /> },
    { id: 4, title: 'Family Coverage', desc: 'Family protection benefits', icon: <HeartPulse className="w-6 h-6" /> },
    { id: 5, title: 'Government Verified Support', desc: '100% transparent process', icon: <ShieldCheck className="w-6 h-6" /> },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 w-full animate-fade-in font-sans pb-20">
      {/* Kept Original Progress Tracker */}
      <div className="max-w-4xl mx-auto mb-10">
        <Stepper currentStep={3} />
      </div>

      {/* Section 1: Eligibility Success Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center space-x-6 md:space-x-8">
          <div className="shrink-0 relative">
            <div className="absolute inset-0 bg-teal-100 rounded-full animate-ping opacity-60"></div>
            <div className="relative bg-teal-50 border-4 border-teal-100 p-5 rounded-full shadow-sm">
              <CheckCircle2 className="w-14 h-14 text-teal-600" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-2">You Are Eligible!</h1>
            <p className="text-slate-600 text-sm sm:text-base">Based on your answers, we found eligible healthcare schemes for your condition.</p>
          </div>
        </div>
        
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center min-w-[220px] shadow-sm shrink-0">
          <div className="text-5xl font-bold text-teal-700 mb-1">{mainScheme.matchPercentage}%</div>
          <div className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Match Confidence</div>
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center space-x-1.5 shadow-sm ${matchBadge.color}`}>
            <Check className="w-3.5 h-3.5" />
            <span>{matchBadge.label}</span>
          </div>
        </div>
      </div>

      {/* Section 2: Assessment Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4 hover:border-teal-100 transition-colors">
          <div className="bg-teal-50 p-3 rounded-xl text-teal-600"><Stethoscope className="w-6 h-6"/></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Medical Need</p>
            <p className="font-semibold text-slate-800 line-clamp-1">{medicalNeed}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4 hover:border-teal-100 transition-colors">
          <div className="bg-slate-50 p-3 rounded-xl text-slate-600"><MapPin className="w-6 h-6"/></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Location</p>
            <p className="font-semibold text-slate-800 line-clamp-1">{locationText}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4 hover:border-teal-100 transition-colors">
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><Shield className="w-6 h-6"/></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Category</p>
            <p className="font-semibold text-slate-800 line-clamp-1">Healthcare Support</p>
          </div>
        </div>
        {questionsAnswered && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4 hover:border-teal-100 transition-colors">
            <div className="bg-amber-50 p-3 rounded-xl text-amber-600"><ClipboardCheck className="w-6 h-6"/></div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Questions Answered</p>
              <p className="font-semibold text-slate-800">{questionsAnswered}</p>
            </div>
          </div>
        )}
      </div>

      {/* Section 3 & 4: Best Scheme Card & Why You Qualify */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Section 3: Best Scheme Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 h-full flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            {/* Soft decorative background element */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-amber-600 mb-6 bg-amber-50 w-max px-3 py-1.5 rounded-lg border border-amber-100">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-xs uppercase tracking-wider">Recommended Scheme</span>
              </div>
              
              <div className="flex justify-between items-start gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3 leading-tight">{mainScheme.name}</h2>
                  <p className="text-slate-600 mb-6 max-w-lg leading-relaxed">{mainScheme.shortDesc}</p>
                </div>
                {mainScheme.logo ? (
                  <img src={mainScheme.logo} alt="Scheme Logo" className="w-20 h-20 object-contain shrink-0 bg-white rounded-xl p-2 border border-slate-100 shadow-sm" />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-10 h-10 text-teal-600" />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100 relative z-10">
               <div className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="bg-teal-50 p-2.5 rounded-xl mb-3"><Coins className="w-5 h-5 text-teal-600"/></div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Coverage</span>
                  <span className="text-sm font-semibold text-slate-800 mt-1">Available</span>
               </div>
               <div className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="bg-teal-50 p-2.5 rounded-xl mb-3"><CreditCard className="w-5 h-5 text-teal-600"/></div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Cashless</span>
                  <span className="text-sm font-semibold text-slate-800 mt-1">Available</span>
               </div>
               <div className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="bg-teal-50 p-2.5 rounded-xl mb-3"><Building2 className="w-5 h-5 text-teal-600"/></div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Network</span>
                  <span className="text-sm font-semibold text-slate-800 mt-1">Included</span>
               </div>
               <div className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="bg-teal-50 p-2.5 rounded-xl mb-3"><HeartPulse className="w-5 h-5 text-teal-600"/></div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Family</span>
                  <span className="text-sm font-semibold text-slate-800 mt-1">Covered</span>
               </div>
            </div>
          </div>
        </div>

        {/* Section 4: Why You Qualify */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
             <h3 className="font-bold text-slate-800 text-xl mb-6">Why You Qualify</h3>
             <ul className="space-y-5">
               {mainScheme.qualifications.map((q, idx) => (
                  <li key={idx} className="flex items-start space-x-3 group">
                    <div className="mt-0.5 bg-green-50 border border-green-200 p-1 rounded-full shrink-0 group-hover:bg-green-100 transition-colors">
                      <Check className="w-3.5 h-3.5 text-green-700" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{q}</span>
                  </li>
               ))}
             </ul>
          </div>
        </div>
      </div>

      {/* Other Eligible Schemes Section (Hidden if empty based on rule 1) */}
      {otherSchemes.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-slate-800 text-lg mb-4">Other Eligible Schemes</h3>
          <div className="space-y-4">
            {otherSchemes.map((scheme, idx) => {
              const otherBadge = getMatchBadge(scheme.matchPercentage);
              return (
                <div key={idx} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-teal-200 transition-all hover:shadow-md">
                  <div className="flex items-center space-x-4">
                    {scheme.logo ? (
                      <img src={scheme.logo} alt="Scheme Logo" className="w-12 h-12 object-contain bg-slate-50 rounded-lg border border-slate-100 p-1" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-teal-600" />
                      </div>
                    )}
                    <div>
                        <h4 className="font-bold text-navy-900 text-lg mb-1">{scheme.name}</h4>
                        <p className="text-sm text-slate-500 line-clamp-1">{scheme.shortDesc}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right shrink-0 w-full sm:w-auto">
                    <span className="text-xl font-bold text-teal-700 block mb-1">{scheme.matchPercentage}% Match</span>
                    <button className="text-sm font-semibold text-teal-600 hover:text-teal-800 flex items-center space-x-1 justify-start sm:justify-end transition-colors bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg w-max">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 7: Scheme Benefits */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-800 text-xl mb-5">Scheme Benefits</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {(mainScheme.benefits || fallbackBenefits).map((benefit, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center hover:shadow-md hover:border-teal-100 transition-all group">
              <div className="bg-teal-50 w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-teal-600 mb-4 border border-teal-100 group-hover:scale-110 group-hover:bg-teal-100 transition-all">
                {benefit.icon}
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-2">{benefit.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 6 & 5: Required Documents & Eligible Hospitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Section 6: Required Documents */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
          <h3 className="font-bold text-slate-800 text-xl mb-6">Required Documents</h3>
          <div className="space-y-4">
             <div className="flex items-center space-x-4 bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl hover:bg-slate-100 hover:border-slate-200 transition-colors">
               <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm"><FileText className="w-5 h-5 text-teal-600" /></div>
               <span className="text-sm font-semibold text-slate-700">{t('results.docs.aadhaar')}</span>
             </div>
             <div className="flex items-center space-x-4 bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl hover:bg-slate-100 hover:border-slate-200 transition-colors">
               <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm"><FileText className="w-5 h-5 text-teal-600" /></div>
               <span className="text-sm font-semibold text-slate-700">{t('results.docs.ration')}</span>
             </div>
             <div className="flex items-center space-x-4 bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl hover:bg-slate-100 hover:border-slate-200 transition-colors">
               <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm"><FileText className="w-5 h-5 text-teal-600" /></div>
               <span className="text-sm font-semibold text-slate-700">{t('results.docs.income')}</span>
             </div>
             <div className="flex items-center space-x-4 bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl hover:bg-slate-100 hover:border-slate-200 transition-colors">
               <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm"><Activity className="w-5 h-5 text-teal-600" /></div>
               <span className="text-sm font-semibold text-slate-700">Medical Reports (if any)</span>
             </div>
          </div>
        </div>

        {/* Section 5: Eligible Hospitals */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 text-xl">Eligible Hospitals</h3>
            </div>
            
            <div className="space-y-4">
              {nearbyHospitals.slice(0, 3).map((hospital, index) => (
                <div key={index} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0 group">
                  <div className="flex-1 pr-4">
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{hospital.name}</h4>
                    <p className="text-xs text-slate-500">{hospital.address}</p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      {hospital.distance && (
                         <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full inline-block">
                           {hospital.distance}
                         </span>
                      )}
                      {/* Example cashless badge using assumed data availability */}
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full inline-block">
                        Cashless Available
                      </span>
                    </div>
                  </div>
                  <a 
                    href={hospital.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-slate-50 border border-slate-200 text-teal-600 p-3 rounded-xl hover:bg-teal-50 hover:border-teal-300 hover:shadow-sm transition-all shrink-0 group-hover:scale-105"
                    title="View on Map"
                  >
                    <MapPin className="w-5 h-5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 8: Help & Support Card */}
      <div className="bg-gradient-to-r from-teal-50 to-white rounded-3xl border border-teal-100 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 shadow-sm">
        <div className="flex items-center space-x-5">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-teal-50 relative">
            <div className="absolute inset-0 bg-teal-100 rounded-2xl animate-ping opacity-30"></div>
            <PhoneCall className="w-8 h-8 text-teal-600 relative z-10" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-xl mb-1">Need Help?</h4>
            <p className="text-sm text-slate-600">Talk to our support team for assistance.</p>
          </div>
        </div>
        <button onClick={() => window.location.href = 'tel:108'} className="bg-white border-2 border-teal-600 text-teal-700 px-8 py-3.5 rounded-2xl font-bold hover:bg-teal-600 hover:text-white transition-all flex items-center space-x-2 shadow-sm whitespace-nowrap active:scale-95 group">
          <span>Contact Support</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Section 9: Recheck CTA */}
      <div className="bg-slate-800 rounded-3xl p-10 text-center shadow-lg mb-16 relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute left-0 top-0 w-64 h-64 bg-slate-700 rounded-full blur-3xl opacity-50 -ml-32 -mt-32 pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-teal-900 rounded-full blur-3xl opacity-30 -mr-32 -mb-32 pointer-events-none"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-3">Want to check eligibility for another condition?</h3>
          <p className="text-slate-300 mb-8 max-w-md mx-auto">You can start a new assessment at any time using our fast and simple questionnaire.</p>
          <button onClick={() => navigate('/')} className="bg-teal-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-teal-400 transition-all shadow-lg shadow-teal-900/50 active:scale-95 inline-flex items-center space-x-2 group">
            <span>Check Another Condition</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer Trust Indicators */}
      <div className="border-t border-slate-200 pt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center group">
            <div className="text-slate-400 mb-4 bg-slate-50 p-3 rounded-full group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors"><Shield className="w-6 h-6" /></div>
            <p className="text-sm font-bold text-slate-700">Secure & Private</p>
            <p className="text-xs text-slate-500 mt-1">100% protected</p>
          </div>
          <div className="flex flex-col items-center justify-center group">
            <div className="text-slate-400 mb-4 bg-slate-50 p-3 rounded-full group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors"><ShieldCheck className="w-6 h-6" /></div>
            <p className="text-sm font-bold text-slate-700">Government Verified</p>
            <p className="text-xs text-slate-500 mt-1">Trusted schemes</p>
          </div>
          <div className="flex flex-col items-center justify-center group">
            <div className="text-slate-400 mb-4 bg-slate-50 p-3 rounded-full group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors"><CheckCircle2 className="w-6 h-6" /></div>
            <p className="text-sm font-bold text-slate-700">100% Free Service</p>
            <p className="text-xs text-slate-500 mt-1">No hidden charges</p>
          </div>
          <div className="flex flex-col items-center justify-center group">
            <div className="text-slate-400 mb-4 bg-slate-50 p-3 rounded-full group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors"><Users className="w-6 h-6" /></div>
            <p className="text-sm font-bold text-slate-700">Trusted Network</p>
            <p className="text-xs text-slate-500 mt-1">Across Tamil Nadu</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Results;
