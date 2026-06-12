import React from 'react';
import { PhoneCall, ShieldCheck, MapPin } from 'lucide-react';

const FooterCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm flex items-start space-x-4 border border-slate-100">
        <div className="bg-red-50 p-3 rounded-full">
          <PhoneCall className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 text-sm mb-1">Emergency Support</h3>
          <p className="text-xs text-slate-500">108 Ambulance & 24x7 Medical Help</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm flex items-start space-x-4 border border-slate-100">
        <div className="bg-teal-50 p-3 rounded-full">
          <ShieldCheck className="w-6 h-6 text-teal-700" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 text-sm mb-1">Government Schemes</h3>
          <p className="text-xs text-slate-500">Explore all available health schemes</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm flex items-start space-x-4 border border-slate-100">
        <div className="bg-purple-50 p-3 rounded-full">
          <MapPin className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 text-sm mb-1">Quick Help</h3>
          <p className="text-xs text-slate-500">Get guidance and support instantly</p>
        </div>
      </div>
    </div>
  );
};

export default FooterCards;
