import { ShieldCheck, Building2, LayoutDashboard } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Brokers',
    description: 'ሁሉም ዝርዝሮች በተረጋገጡ የንብረት አቅራቢዎች/ደላሎች የተፈጠሩና የሚተዳደሩ ናቸው',
  },
  {
    icon: Building2,
    title: 'Quality Listings',
    description: 'ቤቶች፣ አፓርታማዎች እና መሬቶችን በዝርዝር መረጃ ያግኙ',
  },
  {
    icon: LayoutDashboard,
    title: 'Broker Dashboard',
    description: 'አቅራቢዎች/ደላሎች ንብረቶቻቸውን በቀላልና በተደራጀ ዳሽቦርድ/መቆጣጠሪያ ያስተዳድራሉ',
  },
];

const Features = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why choose RealEstate? / ለምን RealEstate?{' '}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white p-8 rounded-2xl border hover:shadow-md transition"
            >
              <f.icon className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
