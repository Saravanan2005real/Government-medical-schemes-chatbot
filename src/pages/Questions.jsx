import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Stepper from '../components/Stepper';
import { commonQuestions } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowLeft, ArrowRight, Ambulance, Baby, Briefcase, Building, Users, Medal, Coins, UserCircle, User, GraduationCap, Building2, Square, CheckSquare,
  CheckCircle2, Brain, ShieldCheck, ChevronDown, Check, X, Target, MapPin, Lock, Activity
} from 'lucide-react';

const dynamicMedicalQuestions = {
  'Pregnancy': [
    { id: 'preg_1', text: 'Which trimester is the patient in?' },
    { id: 'preg_2', text: 'Is delivery planned in a government hospital?' },
    { id: 'preg_3', text: 'Is this the first child?' },
    { id: 'preg_4', text: 'Is newborn care needed?' },
    { id: 'preg_5', text: 'Is antenatal checkup required?' },
  ],
  'TB': [
    { id: 'tb_1', text: 'Is the patient already diagnosed with TB?' },
    { id: 'tb_2', text: 'Is the patient on treatment?' },
    { id: 'tb_3', text: 'Is nutritional support needed?' },
    { id: 'tb_4', text: 'Is this drug-sensitive or drug-resistant TB?' },
    { id: 'tb_5', text: 'Is the patient notified under NTEP?' },
  ],
  'Diabetes': [
    { id: 'dia_1', text: 'Does the patient have diabetic foot symptoms?' },
    { id: 'dia_2', text: 'Is the patient 45 years or above?' },
    { id: 'dia_3', text: 'Does the patient need regular screening?' },
    { id: 'dia_4', text: 'Is dialysis needed?' },
    { id: 'dia_5', text: 'Is foot ulcer care required?' },
  ],
  'Kidney Disease': [
    { id: 'kid_1', text: 'Is dialysis required?' },
    { id: 'kid_2', text: 'Is transplant evaluation needed?' },
    { id: 'kid_3', text: 'Is the patient in advanced kidney disease stage?' },
    { id: 'kid_4', text: 'Is regular nephrology follow-up needed?' },
  ],
  'Mental Health': [
    { id: 'men_1', text: 'Is the issue stress, anxiety, or depression?' },
    { id: 'men_2', text: 'Does the user need counseling?' },
    { id: 'men_3', text: 'Is remote tele-counseling suitable?' },
    { id: 'men_4', text: 'Is immediate support needed?' },
  ],
  'Eye Problem': [
    { id: 'eye_1', text: 'Is the issue cataract, refractive error, or low vision?' },
    { id: 'eye_2', text: 'Is the patient a school student?' },
    { id: 'eye_3', text: 'Is spectacle support needed?' },
    { id: 'eye_4', text: 'Is surgery required?' },
  ],
  'Hearing Problem': [
    { id: 'hear_1', text: 'Is hearing loss mild or severe?' },
    { id: 'hear_2', text: 'Is the patient a child?' },
    { id: 'hear_3', text: 'Is hearing aid support needed?' },
    { id: 'hear_4', text: 'Is cochlear referral needed?' },
  ],
  'HIV': [
    { id: 'hiv_1', text: 'Is the patient diagnosed HIV-positive?' },
    { id: 'hiv_2', text: 'Is ART treatment needed?' },
    { id: 'hiv_3', text: 'Does the patient need follow-up care?' },
    { id: 'hiv_4', text: 'Is long-term medication support needed?' },
  ],
  'Leprosy': [
    { id: 'lep_1', text: 'Is there disability or nerve damage?' },
    { id: 'lep_2', text: 'Is treatment ongoing?' },
    { id: 'lep_3', text: 'Does the patient need supportive care?' },
  ],
  'Child Health': [
    { id: 'chi_1', text: 'Is the child below 18?' },
    { id: 'chi_2', text: 'Is screening needed for growth, nutrition, or development?' },
    { id: 'chi_3', text: 'Is school-based health support needed?' },
  ],
  'Adolescent or Reproductive Health': [
    { id: 'ado_1', text: 'Is the user an adolescent?' },
    { id: 'ado_2', text: 'Is menstrual hygiene support needed?' },
    { id: 'ado_3', text: 'Is nutrition counseling needed?' },
  ],
  'General Low-Income Support': [
    { id: 'gen_1', text: 'Is the family income below ₹1,20,000?' },
    { id: 'gen_2', text: 'Is a ration card available?' },
    { id: 'gen_3', text: 'Is government hospital care preferred?' },
  ]
};

const getCategory = (need) => {
  const lowerNeed = need.toLowerCase();
  if (/(pregnancy|pregnant|maternity)/.test(lowerNeed)) return 'Pregnancy';
  if (/\b(tb|tuberculosis)\b/.test(lowerNeed)) return 'TB';
  if (/(diabetes|diabetic)/.test(lowerNeed)) return 'Diabetes';
  if (/(kidney|renal|dialysis)/.test(lowerNeed)) return 'Kidney Disease';
  if (/(mental health|depression|anxiety|stress)/.test(lowerNeed)) return 'Mental Health';
  if (/(eye|vision|cataract)/.test(lowerNeed)) return 'Eye Problem';
  if (/(hearing|ear|deaf)/.test(lowerNeed)) return 'Hearing Problem';
  if (/\b(hiv|aids)\b/.test(lowerNeed)) return 'HIV';
  if (/(leprosy)/.test(lowerNeed)) return 'Leprosy';
  if (/(child|pediatric|baby)/.test(lowerNeed)) return 'Child Health';
  if (/(adolescent|reproductive health|menstrual)/.test(lowerNeed)) return 'Adolescent or Reproductive Health';
  return 'General Low-Income Support';
};

const getIcon = (iconName) => {
  const icons = {
    Ambulance, Baby, Briefcase, Building, Users, Medal, Coins, UserCircle, User, GraduationCap, Building2, Activity
  };
  const IconComponent = icons[iconName];
  return IconComponent ? <IconComponent className="w-5 h-5" /> : <Activity className="w-5 h-5" />;
};

const TrustItem = ({ icon, title, subtext }) => (
  <div className="flex items-start space-x-4">
    <div className="bg-teal-50 p-2.5 rounded-xl text-teal-600 border border-teal-100">
      {icon}
    </div>
    <div>
      <p className="font-bold text-slate-800 text-sm">{title}</p>
      {subtext && <p className="text-xs text-slate-500 mt-0.5">{subtext}</p>}
    </div>
  </div>
);

const Questions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  // Existing Business Logic State
  const [selectedCommon, setSelectedCommon] = useState([]);
  const [selectedMedical, setSelectedMedical] = useState([]);
  
  // New UI State for Redesign
  const [answers, setAnswers] = useState({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const medicalNeed = location.state?.medicalNeed || 'General Healthcare';
  const locationText = location.state?.location || 'Tamil Nadu';
  const category = getCategory(medicalNeed);
  
  // Combine all questions into a single numbered array
  const currentMedicalQuestions = dynamicMedicalQuestions[category].map(q => ({ ...q, isCommon: false }));
  const combinedCommon = commonQuestions.map(q => ({ ...q, isCommon: true }));
  const allQuestions = [...combinedCommon, ...currentMedicalQuestions];

  const progressPercentage = Math.round((Object.keys(answers).length / allQuestions.length) * 100) || 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAnswer = (id, isYes, isCommon) => {
    // 1. Update UI state
    setAnswers(prev => ({ ...prev, [id]: isYes }));

    // 2. Update existing business state
    if (isCommon) {
      if (isYes) {
        setSelectedCommon(prev => prev.includes(id) ? prev : [...prev, id]);
      } else {
        setSelectedCommon(prev => prev.filter(q => q !== id));
      }
    } else {
      if (isYes) {
        setSelectedMedical(prev => prev.includes(id) ? prev : [...prev, id]);
      } else {
        setSelectedMedical(prev => prev.filter(q => q !== id));
      }
    }

    // 3. Move to next question automatically
    setTimeout(() => {
       const currentIndex = allQuestions.findIndex(q => q.id === id);
       if (currentIndex < allQuestions.length - 1) {
         setActiveQuestionIndex(currentIndex + 1);
       }
    }, 300);
  };

  const renderQuestion = (q, index) => {
    const isActive = index === activeQuestionIndex;
    const isAnswered = answers.hasOwnProperty(q.id);
    const answer = answers[q.id];

    if (isActive) {
      return (
        <div key={q.id} className="bg-white rounded-2xl border-2 border-teal-600 p-6 shadow-md transition-all animate-fade-in">
          <h4 className="text-lg font-bold text-navy-900 mb-1">{index + 1}. {q.text}</h4>
          <p className="text-sm text-slate-500 mb-6">Please select the most appropriate answer</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div 
              onClick={() => handleAnswer(q.id, true, q.isCommon)}
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex items-start space-x-3 group ${answers[q.id] === true ? 'border-teal-600 bg-teal-50/50' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'}`}
            >
              <div className={`p-2 rounded-lg ${answers[q.id] === true ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600'}`}>
                <Check className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className={`font-bold mb-0.5 ${answers[q.id] === true ? 'text-teal-900' : 'text-slate-700'}`}>Yes</p>
                <p className="text-xs text-slate-500">Yes, this applies to me</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${answers[q.id] === true ? 'border-teal-600' : 'border-slate-300'}`}>
                 {answers[q.id] === true && <div className="w-2.5 h-2.5 rounded-full bg-teal-600" />}
              </div>
            </div>

            <div 
              onClick={() => handleAnswer(q.id, false, q.isCommon)}
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex items-start space-x-3 group ${answers[q.id] === false ? 'border-teal-600 bg-teal-50/50' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'}`}
            >
              <div className={`p-2 rounded-lg ${answers[q.id] === false ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600'}`}>
                <X className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className={`font-bold mb-0.5 ${answers[q.id] === false ? 'text-teal-900' : 'text-slate-700'}`}>No</p>
                <p className="text-xs text-slate-500">No, this does not apply</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${answers[q.id] === false ? 'border-teal-600' : 'border-slate-300'}`}>
                 {answers[q.id] === false && <div className="w-2.5 h-2.5 rounded-full bg-teal-600" />}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div 
        key={q.id} 
        onClick={() => setActiveQuestionIndex(index)}
        className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all"
      >
        <div className="flex items-center space-x-4 pr-4">
           <div className="bg-slate-50 p-2 rounded-lg text-teal-600">
              {getIcon(q.icon)}
           </div>
           <p className="font-semibold text-slate-700 text-sm md:text-base">{index + 1}. {q.text}</p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
           {isAnswered ? (
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${answer ? 'text-teal-700 bg-teal-50' : 'text-slate-600 bg-slate-100'}`}>
                {answer ? 'Yes' : 'No'}
              </span>
           ) : (
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full flex items-center space-x-1">
                <span>Pending</span>
                <ChevronDown className="w-3 h-3" />
              </span>
           )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans pb-32 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Stepper currentStep={2} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Left Content Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header */}
            <div>
               <h1 className="text-3xl font-bold text-navy-900 mb-2">Eligibility Assessment</h1>
               <p className="text-slate-500">Answer a few questions to find healthcare schemes you may qualify for.</p>
            </div>
            
            {/* Information Summary Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center gap-6 shadow-sm">
               <div className="flex items-center space-x-4 flex-1">
                 <div className="bg-teal-50 p-3 rounded-full text-teal-600">
                   <User className="w-6 h-6" />
                 </div>
                 <div>
                   <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Medical Need</p>
                   <p className="font-semibold text-slate-800">{medicalNeed}</p>
                 </div>
               </div>
               
               <div className="h-px w-full sm:h-12 sm:w-px bg-slate-100 hidden sm:block"></div>
               
               <div className="flex items-center space-x-4 flex-1">
                 <div className="bg-slate-50 p-3 rounded-full text-slate-600">
                   <MapPin className="w-6 h-6" />
                 </div>
                 <div>
                   <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Location</p>
                   <p className="font-semibold text-slate-800">{locationText}</p>
                 </div>
               </div>
            </div>

            {/* Detected Category Banner */}
            <div className="bg-teal-50/50 p-5 rounded-2xl border border-teal-100 flex items-center justify-between shadow-sm">
               <div>
                 <p className="text-xs text-teal-600 font-bold uppercase tracking-wider mb-1">DETECTED MEDICAL CATEGORY</p>
                 <h3 className="text-xl font-bold text-teal-900 mb-1">{category}</h3>
                 <p className="text-sm text-teal-700">We'll find schemes that can help with your medical need.</p>
               </div>
               <div className="bg-teal-100 p-3 rounded-full text-teal-600 hidden sm:block">
                 <Target className="w-8 h-8" />
               </div>
            </div>

            {/* Progress Bar Area */}
            <div className="pt-2">
               <div className="flex items-center justify-between mb-2">
                 <p className="text-sm font-semibold text-slate-700">Question {activeQuestionIndex + 1} of {allQuestions.length}</p>
                 <p className="text-sm font-bold text-teal-600">{progressPercentage}% Complete</p>
               </div>
               <div className="w-full bg-slate-200 h-2 rounded-full mb-6 overflow-hidden">
                 <div className="bg-teal-600 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
               </div>
            </div>

            {/* Questions Accordion */}
            <div className="space-y-4">
               {allQuestions.map((q, index) => renderQuestion(q, index))}
            </div>

          </div>
          
          {/* Right Content Area (Trust Panel) */}
          <div className="lg:col-span-4 space-y-6 hidden lg:block">
             <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-6">
                <h3 className="text-lg font-bold text-navy-900 mb-6">Why TN Healthcare Scheme Decoder?</h3>
                
                <div className="space-y-5">
                   <TrustItem icon={<ShieldCheck className="w-5 h-5"/>} title="45+ Government Schemes" />
                   <TrustItem icon={<Brain className="w-5 h-5"/>} title="AI-Powered Eligibility Matching" />
                   <TrustItem icon={<Building2 className="w-5 h-5"/>} title="2000+ Network Hospitals" />
                   <TrustItem icon={<Coins className="w-5 h-5"/>} title="100% Free Service" />
                   <TrustItem icon={<Lock className="w-5 h-5"/>} title="Secure & Private" subtext="Your data is safe with us" />
                </div>

                <div className="mt-8 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                   <div className="flex items-start space-x-3 mb-2">
                     <ShieldCheck className="w-5 h-5 text-teal-600 mt-0.5" />
                     <div>
                       <h4 className="font-bold text-slate-800 text-sm">Your Information is Safe</h4>
                       <p className="text-xs text-slate-500 mt-1">We use bank-level security to protect your data and privacy.</p>
                     </div>
                   </div>
                   <div className="flex items-center space-x-2 mt-3 text-teal-600 text-xs font-semibold pl-8">
                     <CheckCircle2 className="w-4 h-4" />
                     <span>ISO 27001 Certified</span>
                   </div>
                </div>
             </div>
          </div>
          
        </div>
      </div>

      {/* Sticky Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center space-x-2 px-6 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="hidden md:flex items-center space-x-2 text-slate-500 text-sm">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Your information is secure and encrypted</span>
          </div>

          <button 
            onClick={() => navigate('/processing')} 
            className="flex items-center space-x-2 px-8 py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-xl transition-all font-semibold shadow-md active:scale-95"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
