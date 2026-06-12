import React from 'react';
import { ModernPricingPage, PricingCardProps } from "@/components/ui/animated-glassy-pricing";

const myPricingPlans: PricingCardProps[] = [
  { 
    planName: 'Starter', 
    description: 'Perfect for individuals, startups, and small businesses looking to establish a professional online presence.', 
    price: 'Custom', 
    features: [
      'Business Website',
      'Mobile Responsive Design',
      'Basic SEO Setup',
      'Contact Form Integration',
      'Fast Performance'
    ], 
    buttonText: 'Get Started', 
    buttonVariant: 'secondary'
  },
  { 
    planName: 'Growth', 
    description: 'For businesses ready to automate operations and generate more leads.', 
    price: 'Custom', 
    features: [
      'Everything in Starter',
      'AI Agent Integration',
      'Automation Workflows',
      'Lead Generation System',
      'Analytics Setup',
      'Priority Support'
    ], 
    buttonText: 'Most Popular', 
    isPopular: true, 
    buttonVariant: 'primary' 
  },
  { 
    planName: 'Scale', 
    description: 'Complete digital systems built for growing businesses and agencies.', 
    price: 'Custom', 
    features: [
      'Everything in Growth',
      'Custom AI Solutions',
      'Advanced Automations',
      'CRM Integration',
      'Custom Development',
      'Dedicated Support'
    ], 
    buttonText: 'Book Consultation', 
    buttonVariant: 'primary' 
  },
];

const Default = () => {
  return (
    <ModernPricingPage
      title={
        <>
          Choose The <span className="text-cyan-400">Right Solution</span>
        </>
      }
      subtitle="Whether you need a website, AI automation, or a complete digital system, choose the solution that best fits your business goals."
      plans={myPricingPlans}
      showAnimatedBackground={true}
    />
  );
};

export { Default };
