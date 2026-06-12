import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Activity, HeartPulse, CheckCircle, ShieldCheck } from 'lucide-react';

const messages = [
  "Analyzing your eligibility",
  "Matching healthcare schemes",
  "Preparing recommendations",
  "Generating personalized results"
];

const Processing = () => {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Navigate to results after 2000ms (2 seconds)
    const navTimer = setTimeout(() => {
      navigate('/results');
    }, 2000);

    // Update messages every 500ms
    const msgTimer = setInterval(() => {
      setMessageIndex(prev => Math.min(prev + 1, messages.length - 1));
    }, 500);

    // Smooth progress bar update over 2000ms
    const startTime = Date.now();
    const duration = 2000;
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      if (newProgress === 100) clearInterval(progressInterval);
    }, 20);

    return () => {
      clearTimeout(navTimer);
      clearInterval(msgTimer);
      clearInterval(progressInterval);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 bg-navy-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-slate-900 to-teal-900/40"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500 rounded-full blur-[120px] opacity-20"></div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-2 h-2 bg-teal-400 rounded-full opacity-30 animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 2}s`,
            animationDelay: `${Math.random()}s`
          }}
        ></div>
      ))}

      {/* Floating Icons */}
      <div className="absolute top-1/4 left-1/4 text-teal-400/20 animate-bounce" style={{ animationDuration: '3s' }}>
        <Activity size={48} />
      </div>
      <div className="absolute top-1/3 right-1/4 text-teal-400/20 animate-pulse" style={{ animationDuration: '2.5s' }}>
        <HeartPulse size={40} />
      </div>
      <div className="absolute bottom-1/4 left-1/3 text-teal-400/20 animate-bounce" style={{ animationDuration: '3.5s' }}>
        <ShieldCheck size={56} />
      </div>
      <div className="absolute bottom-1/3 right-1/3 text-teal-400/20 animate-pulse" style={{ animationDuration: '4s' }}>
        <CheckCircle size={32} />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
        {/* Central Shield Container */}
        <div className="relative w-40 h-40 flex items-center justify-center mb-12">
          {/* Pulsing rings */}
          <div className="absolute inset-0 border-4 border-teal-500 rounded-full animate-ping opacity-20" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-4 border-4 border-teal-400 rounded-full animate-ping opacity-40" style={{ animationDuration: '2s', animationDelay: '0.4s' }}></div>
          <div className="absolute inset-8 border-4 border-teal-300 rounded-full animate-ping opacity-60" style={{ animationDuration: '2s', animationDelay: '0.8s' }}></div>
          
          {/* Main Shield Icon */}
          <div className="relative z-10 bg-navy-900 p-6 rounded-full border border-teal-500/50 shadow-[0_0_30px_rgba(20,184,166,0.3)]">
            <Shield className="w-16 h-16 text-teal-400 animate-pulse" style={{ animationDuration: '1s' }} />
          </div>
        </div>

        {/* Animated Message */}
        <div className="h-8 mb-8 relative w-full flex justify-center">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`absolute text-xl font-medium text-teal-50 transition-all duration-500 text-center flex items-center ${
                idx === messageIndex 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : idx < messageIndex 
                    ? 'opacity-0 -translate-y-4 scale-95'
                    : 'opacity-0 translate-y-4 scale-95'
              }`}
            >
              {msg}
              <span className="inline-block w-6 text-left animate-pulse ml-1">...</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden shadow-inner border border-slate-700/50 relative">
          <div 
            className="h-full bg-gradient-to-r from-teal-600 via-teal-400 to-teal-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)] transition-all ease-linear relative"
            style={{ width: `${progress}%`, transitionDuration: '20ms' }}
          >
            {/* Glossy highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Processing;
