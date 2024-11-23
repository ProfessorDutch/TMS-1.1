import React, { useState } from 'react';
import { Building2, Heart, Star, Users, ArrowRight, BookOpen, Target, Handshake } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

export default function BusinessSupport() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<any>(null);

  const businessTiers = [
    {
      id: 'seed',
      name: 'Seed Sponsor',
      price: 99,
      icon: <Building2 className="w-12 h-12 text-emerald-500" />,
      benefits: [
        'Logo on website',
        'Monthly social media mention',
        'Newsletter recognition',
        'Tax deduction receipt',
        'Community directory listing'
      ]
    },
    {
      id: 'harvest',
      name: 'Harvest Partner',
      price: 299,
      icon: <Star className="w-12 h-12 text-blue-500" />,
      benefits: [
        'All Seed Sponsor benefits',
        'Featured sponsor story',
        'Quarterly impact report',
        'Youth event invitations',
        'Custom thank you plaque',
        'Priority directory placement'
      ]
    },
    {
      id: 'legacy',
      name: 'Legacy Builder',
      price: 499,
      icon: <Target className="w-12 h-12 text-amber-500" />,
      benefits: [
        'All Harvest Partner benefits',
        'Premium logo placement',
        'Annual recognition event',
        'Custom impact video',
        'Youth mentorship opportunities',
        'VIP ministry events access',
        'Featured success stories'
      ]
    }
  ];

  const handleSubscribe = (tier: any) => {
    setSelectedTier(tier);
    setShowPaymentModal(true);
  };

  return (
    <main className="flex-1">
      <section className="py-16 bg-gradient-to-br from-patriot-cream to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Building2 className="w-12 h-12 text-patriot-red" />
            <h1 className="text-4xl md:text-5xl font-bold text-patriot-navy">
              Business Partnership
            </h1>
          </div>
          <div className="max-w-3xl">
            <p className="text-xl text-patriot-blue mb-8">
              Join a community of businesses committed to making a difference in young lives through faith and purpose.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-br from-patriot-cream to-white rounded-2xl p-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Handshake className="w-10 h-10 text-patriot-red" />
              <h2 className="text-2xl font-bold text-patriot-navy">The Mustard Seed Code of Helpfulness</h2>
            </div>
            <div className="prose prose-lg max-w-none text-patriot-blue">
              <p>
                Our business partnership is built on a simple principle: be helpful where you can, when you can. 
                There are no mandatory commitments or forced obligations – just a community of businesses willing 
                to make a difference in their own way.
              </p>
              <p>
                Whether it's offering mentorship, providing internship opportunities, or simply sharing your 
                expertise, every contribution matters. You choose how and when to help, based on your capacity 
                and circumstances.
              </p>
              <p className="font-medium">
                Join us in creating a network of support for young people, where businesses come together to 
                plant seeds of opportunity through simple acts of kindness and guidance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessTiers.map((tier) => (
              <div
                key={tier.id}
                className={`bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105 ${
                  tier.id === 'harvest' ? 'border-2 border-patriot-red' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {tier.icon}
                  <h3 className="text-xl font-bold text-patriot-navy">{tier.name}</h3>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-patriot-red">${tier.price}</span>
                  <span className="text-patriot-gray">/month</span>
                </div>

                <div className="space-y-4 mb-8">
                  {tier.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-patriot-red" />
                      <span className="text-sm text-patriot-blue">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSubscribe(tier)}
                  className={`w-full py-3 px-6 rounded-full font-semibold transition-colors ${
                    tier.id === 'harvest'
                      ? 'bg-patriot-red text-white hover:bg-patriot-crimson'
                      : 'bg-patriot-cream text-patriot-navy hover:bg-patriot-navy hover:text-white'
                  }`}
                >
                  Become a Partner
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showPaymentModal && selectedTier && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          defaultAmount={selectedTier.price}
          defaultRecurring={true}
          description={`Monthly ${selectedTier.name} Partnership`}
        />
      )}
    </main>
  );
}