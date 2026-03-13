import React, { useState, useEffect, useRef } from 'react';
import { 
  Ship, Globe, Plane, ShieldCheck, Anchor, 
  Phone, Mail, MapPin, Menu, X, 
  ChevronRight, FileText, ArrowDown, Activity
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(0); 
  const [activeSection, setActiveSection] = useState('hero');
  const [isOperatingHours, setIsOperatingHours] = useState(true);
  const [worldTimes, setWorldTimes] = useState([]);
  
  const heroRef = useRef(null);

  useEffect(() => {
    const updateTimes = () => {
      const cities = [
        { name: 'Suva', zone: 'Pacific/Fiji', label: 'Local Hub' },
        { name: 'Singapore', zone: 'Asia/Singapore', label: 'Transshipment' },
        { name: 'Sydney', zone: 'Australia/Sydney', label: 'Regional' },
        { name: 'London', zone: 'Europe/London', label: 'Global Trade' },
        { name: 'New York', zone: 'America/New_York', label: 'Americas' }
      ];

      const currentTimes = cities.map(city => {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: city.zone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        }).format(now);
        const hour = parseInt(timeStr.split(':')[0]);
        const isOpen = hour >= 8 && hour < 17;
        return { ...city, time: timeStr, isOpen };
      });

      setWorldTimes(currentTimes);
      const fiji = currentTimes.find(c => c.name === 'Suva');
      const nowInFiji = new Date(new Date().toLocaleString("en-US", {timeZone: "Pacific/Fiji"}));
      setIsOperatingHours(fiji.isOpen && nowInFiji.getDay() >= 1 && nowInFiji.getDay() <= 5);
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    const handleScroll = () => setScrolled((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden">
      <div className="fixed top-0 left-0 h-1 bg-blue-500 z-[100] transition-all" style={{ width: `${scrolled}%` }} />
      
      <nav className={`fixed w-full z-50 transition-all ${scrolled > 5 ? 'bg-slate-900/95 py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Anchor className="text-blue-500 w-8 h-8" />
            <span className="font-black text-2xl text-white">ROYAL<span className="text-blue-500 font-light italic">CUSTOMS</span></span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-500 transition-all">Track Portal</button>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1494412574743-0194849a6317?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30" />
        <div className="text-center px-6">
          <div className={`inline-flex items-center gap-3 px-5 py-2 bg-slate-900/40 border rounded-full mb-10 transition-all ${isOperatingHours ? 'border-emerald-500/30' : 'border-rose-500/30'}`}>
            <span className={`h-3 w-3 rounded-full animate-ping ${isOperatingHours ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${isOperatingHours ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isOperatingHours ? 'Fiji Premier Customs Agents • Live' : 'Fiji Premier Customs Agents • After Hours'}
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.8]">GLOBAL <br /><span className="text-blue-500">TRADE.</span></h1>
          <p className="text-lg md:text-2xl text-slate-400 mb-14 max-w-2xl mx-auto">Seamless customs brokerage and logistics solutions for the Fiji Islands.</p>
        </div>
      </section>

      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {worldTimes.map((city, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900 border border-white/5 text-center">
              <h4 className="text-white font-black text-sm uppercase mb-2">{city.name}</h4>
              <p className="text-2xl font-mono text-blue-400">{city.time}</p>
              <p className={`text-[8px] font-bold mt-2 ${city.isOpen ? 'text-emerald-500' : 'text-slate-600'}`}>{city.isOpen ? 'OPEN' : 'CLOSED'}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;