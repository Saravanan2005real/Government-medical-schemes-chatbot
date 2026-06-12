import React from 'react';
import { Square, CheckSquare } from 'lucide-react';

const CheckboxCard = ({ question, isSelected, onClick, IconComponent }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative p-4 border rounded-xl cursor-pointer transition-all flex flex-col items-start min-h-[100px]
        ${isSelected ? 'border-teal-600 bg-teal-50 shadow-sm' : 'border-slate-200 bg-white hover:border-teal-200'}`}
    >
      <div className="flex justify-between w-full mb-3">
        <div className="bg-slate-100 p-2 rounded-lg">
          {IconComponent && <IconComponent className="w-5 h-5 text-slate-700" />}
        </div>
        <div>
          {isSelected ? (
            <CheckSquare className="w-5 h-5 text-teal-600" />
          ) : (
            <Square className="w-5 h-5 text-slate-300" />
          )}
        </div>
      </div>
      <p className="text-sm font-medium text-slate-800 leading-snug pr-4">{question}</p>
    </div>
  );
};

export default CheckboxCard;
