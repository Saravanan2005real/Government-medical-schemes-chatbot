import React from 'react';

const Stepper = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Enter Details' },
    { num: 2, label: 'Eligibility Questions' },
    { num: 3, label: 'Get Results' },
  ];

  return (
    <div className="flex items-center justify-center max-w-2xl mx-auto w-full my-8">
      {steps.map((step, index) => {
        const isActive = currentStep === step.num;
        const isPast = currentStep > step.num;
        
        return (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors
                  ${isActive || isPast ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-500'}`}
              >
                {step.num}
              </div>
              <span className={`text-sm ${isActive ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 -mt-6">
                <div 
                  className={`h-0.5 w-full ${isPast ? 'bg-teal-700' : 'bg-slate-200'}`}
                ></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
