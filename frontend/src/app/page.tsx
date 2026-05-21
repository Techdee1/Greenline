'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslations } from '@/hooks/useTranslation';
import {
  Sprout, Droplets, Cloud, TrendingUp, Smartphone,
  Zap, Shield, Github, BookOpen, ExternalLink,
  CheckCircle2, AlertCircle, Radio, BarChart3,
  Target, Clock, Wifi,
  type LucideIcon
} from 'lucide-react';

export default function LandingPage() {
  // Navigation translations
  const nav = useTranslations({
    problem: 'Crisis',
    solution: 'Innovation',
    story: 'Case Study',
    metrics: 'Economics',
    dashboard: 'Dashboard',
  });

  // Hero section translations
  const hero = useTranslations({
    badge: 'Green Line Climate Resilience',
    headline1: 'Climate Resilience',
    headline2: 'for Northern Nigeria.',
    headline3: 'Water you can count on.',
    subtitle: 'Intelligence before the damage happens: decentralized water infrastructure plus Demeter AI sensors for 14-day drought foresight in Hausa and English.',
    cta1: 'Request Pilot Funding',
    cta2: 'View Pitch Deck',
    stat1Label: 'Forecast Window',
    stat2Label: 'No Smartphone Needed',
    stat3Label: 'Per Farm Unit',
    scrollText: 'Scroll to explore',
  });

  // Problem section translations
  const problem = useTranslations({
    badge: 'The Crisis',
    title1: 'Climate Volatility is Devastating',
    title2: 'Northern Nigeria',
    subtitle: 'Smallholders make life-or-death decisions with zero data and no safety net.',
    stat1Value: '$1B',
    stat1Title: 'Crop Losses',
    stat1Desc: 'lost in October 2024 in just 15 days due to extreme weather shocks',
    stat2Value: '90%',
    stat2Title: 'Lake Chad Shrinkage',
    stat2Desc: 'loss of volume since 1980, collapsing local water security',
    stat3Value: '30.1M',
    stat3Title: 'People in Poverty',
    stat3Desc: 'living in abject poverty, per FAO estimates',
  });

  // Solution section translations
  const solution = useTranslations({
    badge: 'The Innovation',
    title: 'Three Layers, One Resilient System',
    subtitle: 'Physical water security, intelligence in the soil, and action that reaches every farmer.',
    step1Title: 'Ferrocement Cisterns Store Rain',
    step1Desc: 'Decentralized underground storage eliminates evaporation and protects against dry spells.',
    step2Title: 'Demeter Sensors in Zai Pits',
    step2Desc: 'ESP32 + capacitive moisture + DHT22 track root-zone micro-climates without disturbing crops.',
    step3Title: 'ML Ensemble Predicts Stress',
    step3Desc: 'LSTM + Random Forest models forecast crop stress 14 days before visible damage.',
    step4Title: 'SMS + Solar Micro-Pumping',
    step4Desc: "Hausa/English alerts guide precise water release from cisterns—no smartphone or internet needed.",
    liveData: 'Live Data',
    updated: 'Updated 2 min ago',
  });

  // Musa story section translations
  const story = useTranslations({
    badge: 'Real Impact',
    title: 'The Story of Musa',
    subtitle: "Last August in Katsina, Musa watched his maize curl and die in 14 days. Green Line gives him time.",
    badge1: 'LAST AUGUST',
    badge2: 'WITH GREEN LINE',
    before1Title: 'Lost half his harvest',
    before1Desc: 'Rains stopped with no warning and maize curled in 14 days',
    before2Title: 'No advance warning system',
    before2Desc: 'Only saw stress when it was already too late to react',
    before3Title: 'Sold his last goat for grain',
    before3Desc: 'Grain prices tripled during the dry season',
    after1Title: '14-day early warnings',
    after1Desc: 'SMS alerts in Hausa: "Stress forecasted. Release cistern water in 48 hours."',
    after2Title: 'Root-zone intelligence',
    after2Desc: 'Demeter sensors measure zai pit micro-climates without root disturbance',
    after3Title: 'Saved half the harvest',
    after3Desc: 'Stored water + early alerts preserve food and income',
    quote: "If I had known 14 days earlier, I could have saved half my harvest. Getting a Hausa warning before the damage starts would change everything.",
    quoteName: 'Musa',
    quoteTitle: 'Maize Farmer, Katsina State',
  });

  // Metrics section translations
  const metrics = useTranslations({
    badge: 'Unit Economics',
    title: 'Smallholder ROI Engine',
    subtitle: 'Modeled on a 1.5-hectare northern maize farm with ₦43,450 total deployment cost.',
    metric1Label: 'Payback Period',
    metric1Desc: 'first harvest cycle',
    metric1Benchmark: 'Pays for itself within 6 weeks',
    metric2Label: 'Year 1 ROI',
    metric2Desc: 'net income uplift',
    metric2Benchmark: '26.5x return vs baseline',
    metric3Label: 'Yield Lift',
    metric3Desc: 'from zai pit optimization',
    metric3Benchmark: 'Up to +70% harvest gain',
    stat1: 'Farm Unit Size',
    stat2: 'Forecast Window',
    stat3: 'Unit Cost',
    stat4: 'Pilot Ask',
  });

  // CTA section translations
  const cta = useTranslations({
    title: 'Pilot Funding Request: ₦2,000,000',
    subtitle: 'Back five pilot farms across the Northeast, Northwest, and Middle Belt to prove the model and scale across 100+ LGAs.',
    btn1: 'Partner With Green Line',
    btn2: 'Download Budget',
    trust1: 'Hausa + English SMS',
    trust2: 'IP67 Ruggedized',
    trust3: 'Solar-Capped',
    trust4: 'Zai Pit Compatible',
  });

  // Footer translations
  const footer = useTranslations({
    description: 'Climate resilience infrastructure for smallholder farmers in Northern Nigeria.',
    resources: 'Resources',
    github: 'GitHub',
    documentation: 'Documentation',
    dashboard: 'Dashboard',
    product: 'Product',
    problem: 'Problem',
    solution: 'Solution',
    metricsLink: 'Metrics',
    poweredBy: 'Powered By',
    copyright: '© 2026 Green Line. UNILAG Design Studio Design Competition.',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
  });

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#1B4332]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sprout className="w-7 h-7 text-[#1B4332]" />
              <span className="text-[20px] font-semibold text-[#1B4332] tracking-tight">Green Line</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#problem" className="text-[14px] text-[#1B4332]/70 hover:text-[#1B4332] transition-colors">
                {nav.problem}
              </a>
              <a href="#solution" className="text-[14px] text-[#1B4332]/70 hover:text-[#1B4332] transition-colors">
                {nav.solution}
              </a>
              <a href="#story" className="text-[14px] text-[#1B4332]/70 hover:text-[#1B4332] transition-colors">
                {nav.story}
              </a>
              <a href="#metrics" className="text-[14px] text-[#1B4332]/70 hover:text-[#1B4332] transition-colors">
                {nav.metrics}
              </a>
              <LanguageSelector />
              <Link href="/dashboard">
                <Button variant="primary" size="sm" className="bg-[#E2725B] hover:bg-[#E2725B]/90">
                  Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex md:hidden items-center gap-3">
              <LanguageSelector />
              <Link href="/dashboard">
                <Button variant="primary" size="sm" className="bg-[#E2725B] hover:bg-[#E2725B]/90">
                  {nav.dashboard}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full bg-gradient-to-br from-[#1B4332]/90 via-[#1B4332]/85 to-[#1B4332]/90">
            {/* Image placeholder - will be replaced with actual maize field image */}
            <div className="absolute inset-0 opacity-30 bg-[url('/images/maize-plantation.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332] via-transparent to-transparent" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E2725B]/20 backdrop-blur-sm border border-[#E2725B]/30 mb-6">
              <Zap className="w-4 h-4 text-[#E2725B]" />
              <span className="text-[13px] font-medium text-white">{hero.badge}</span>
            </div>
            
            <h1 className="text-[48px] md:text-[64px] lg:text-[72px] font-bold text-white leading-[1.1] mb-6 tracking-tight">
              {hero.headline1}<br />
              {hero.headline2}<br />
              <span className="text-[#E2725B]">{hero.headline3}</span>
            </h1>
            
            <p className="text-[18px] md:text-[20px] text-white/90 mb-8 max-w-2xl leading-relaxed">
              {hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-[#E2725B] hover:bg-[#E2725B]/90 text-white px-8 py-6 text-[16px] font-semibold"
              >
                {hero.cta1}
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
              <a 
                href="https://drive.google.com/file/d/1N1PsGJEA-jrUXj5WDd7hbj1jsRNPC0F4/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-[16px] font-semibold"
                >
                  {hero.cta2}
                </Button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-[32px] font-bold text-[#E2725B]">14 days</p>
                <p className="text-[13px] text-white/70">{hero.stat1Label}</p>
              </div>
              <div className="text-center">
                <p className="text-[32px] font-bold text-[#E2725B]">0</p>
                <p className="text-[13px] text-white/70">{hero.stat2Label}</p>
              </div>
              <div className="text-center">
                <p className="text-[32px] font-bold text-[#E2725B]">₦43,450</p>
                <p className="text-[13px] text-white/70">{hero.stat3Label}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[12px] text-white/70">{hero.scrollText}</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E2725B]/10 mb-4">
              <AlertCircle className="w-4 h-4 text-[#E2725B]" />
              <span className="text-[13px] font-medium text-[#E2725B]">{problem.badge}</span>
            </div>
            <h2 className="text-[40px] md:text-[48px] font-bold text-[#1B4332] mb-4 tracking-tight">
              {problem.title1}<br />{problem.title2}
            </h2>
            <p className="text-[18px] text-[#1B4332]/70 max-w-2xl mx-auto">
              {problem.subtitle}
            </p>
          </div>

          {/* Impact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="bento" className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-[#E2725B]/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#E2725B]" />
              </div>
              <h3 className="text-[48px] font-bold text-[#E2725B] mb-2">{problem.stat1Value}</h3>
              <p className="text-[16px] font-semibold text-[#1B4332] mb-2">{problem.stat1Title}</p>
              <p className="text-[14px] text-[#1B4332]/60">
                {problem.stat1Desc}
              </p>
            </Card>

            <Card variant="bento" className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-[#E2725B]/10 flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-[#E2725B]" />
              </div>
              <h3 className="text-[48px] font-bold text-[#E2725B] mb-2">{problem.stat2Value}</h3>
              <p className="text-[16px] font-semibold text-[#1B4332] mb-2">{problem.stat2Title}</p>
              <p className="text-[14px] text-[#1B4332]/60">
                {problem.stat2Desc}
              </p>
            </Card>

            <Card variant="bento" className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-[#E2725B]/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#E2725B]" />
              </div>
              <h3 className="text-[48px] font-bold text-[#E2725B] mb-2">{problem.stat3Value}</h3>
              <p className="text-[16px] font-semibold text-[#1B4332] mb-2">{problem.stat3Title}</p>
              <p className="text-[14px] text-[#1B4332]/60">
                {problem.stat3Desc}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section id="solution" className="py-24 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B4332]/10 mb-4">
              <Zap className="w-4 h-4 text-[#1B4332]" />
              <span className="text-[13px] font-medium text-[#1B4332]">{solution.badge}</span>
            </div>
            <h2 className="text-[40px] md:text-[48px] font-bold text-[#1B4332] mb-4 tracking-tight">
              {solution.title}
            </h2>
            <p className="text-[18px] text-[#1B4332]/70 max-w-2xl mx-auto">
              {solution.subtitle}
            </p>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Flow Diagram */}
            <div className="space-y-6">
              <StepCard
               number="1"
                icon={Radio}
                title={solution.step1Title}
                description={solution.step1Desc}
                color="#1B4332"
              />
              <StepCard
                number="2"
                icon={Wifi}
                title={solution.step2Title}
                description={solution.step2Desc}
                color="#1B4332"
              />
              <StepCard
                number="3"
                icon={BarChart3}
                title={solution.step3Title}
                description={solution.step3Desc}
                color="#1B4332"
              />
              <StepCard
                number="4"
                icon={Smartphone}
                title={solution.step4Title}
                description={solution.step4Desc}
                color="#E2725B"
              />
            </div>

            {/* Right: Dashboard Screenshot */}
            <div className="relative">
              <div className="sticky top-24">
                <Card variant="bento" className="p-4 bg-white shadow-2xl">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#F9F8F6] to-white rounded-lg border-2 border-[#1B4332]/10 overflow-hidden">
                    {/* Dashboard screenshot */}
                    <div className="relative w-full h-full bg-[url('/images/forecast-chart-screenshot.png')] bg-cover bg-center rounded-lg" />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[12px] text-[#1B4332]/60">Live Data</span>
                    </div>
                    <span className="text-[12px] font-medium text-[#1B4332]">Updated 2 min ago</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-12 border-t border-[#1B4332]/10">
            <TechBadge name="ESP32" />
            <TechBadge name="DHT22" />
            <TechBadge name="Capacitive Moisture" />
            <TechBadge name="LSTM" />
            <TechBadge name="Random Forest" />
            <TechBadge name="Zai Pits" />
            <TechBadge name="Ferrocement Cisterns" />
            <TechBadge name="SMS (Hausa/English)" />
            <TechBadge name="Solar Micro-Pumps" />
          </div>
        </div>
      </section>

      {/* User Story - Musa Section */}
      <section id="story" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E2725B]/10 mb-4">
              <Target className="w-4 h-4 text-[#E2725B]" />
              <span className="text-[13px] font-medium text-[#E2725B]">{story.badge}</span>
            </div>
            <h2 className="text-[40px] md:text-[48px] font-bold text-[#1B4332] mb-4 tracking-tight">
              {story.title}
            </h2>
            <p className="text-[18px] text-[#1B4332]/70 max-w-2xl mx-auto">
              {story.subtitle}
            </p>
          </div>

          {/* Before/After Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <Card variant="bento" className="p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                  <span className="text-[11px] font-semibold text-red-600">LAST AUGUST</span>
                </div>
              </div>
              
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-red-50 to-red-100 rounded-xl mb-6 mt-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/dry%20plantation.jpg')] bg-cover bg-center opacity-80" />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[12px] font-bold text-red-600">✕</span>
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#1B4332] mb-1">Lost half his harvest</p>
                    <p className="text-[14px] text-[#1B4332]/60">
                      Rains stopped and maize curled over 14 days with no warning
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[12px] font-bold text-red-600">✕</span>
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#1B4332] mb-1">No advance warning system</p>
                    <p className="text-[14px] text-[#1B4332]/60">
                      Only saw stress when it was already too late to react
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[12px] font-bold text-red-600">✕</span>
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#1B4332] mb-1">Sold his last goat for grain</p>
                    <p className="text-[14px] text-[#1B4332]/60">
                      Grain prices tripled during the dry season
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* After */}
            <Card variant="bento" className="p-8 relative overflow-hidden border-2 border-[#1B4332]">
              <div className="absolute top-4 right-4 z-10">
                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="text-[11px] font-semibold text-green-600">WITH GREEN LINE</span>
                </div>
              </div>
              
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl mb-6 mt-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/healthy%20plantation.jpg')] bg-cover bg-center opacity-80" />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#1B4332] mb-1">14-day early warnings</p>
                    <p className="text-[14px] text-[#1B4332]/60">
                      SMS alerts in Hausa: "Stress forecasted. Release cistern water in 48 hours."
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#1B4332] mb-1">Root-zone intelligence</p>
                    <p className="text-[14px] text-[#1B4332]/60">
                      Demeter sensors measure zai pit micro-climates without root disturbance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#1B4332] mb-1">Saved half the harvest</p>
                    <p className="text-[14px] text-[#1B4332]/60">
                      Stored water + early alerts preserve food and income
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quote */}
          <div className="mt-12 text-center">
            <Card variant="bento" className="p-8 max-w-3xl mx-auto bg-gradient-to-br from-[#1B4332] to-[#1B4332]/90">
              <p className="text-[20px] md:text-[24px] text-white/95 italic mb-4 leading-relaxed">
                "If I had known 14 days earlier, I could have saved half my harvest. 
                Getting a Hausa warning before the damage starts would change everything."
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E2725B]/20 flex items-center justify-center">
                  <span className="text-[18px] font-semibold text-white">M</span>
                </div>
                <div className="text-left">
                  <p className="text-[16px] font-semibold text-white">Musa</p>
                  <p className="text-[13px] text-white/70">Maize Farmer, Katsina State</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Trust / Success Metrics */}
      <section id="metrics" className="py-24 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B4332]/10 mb-4">
              <Shield className="w-4 h-4 text-[#1B4332]" />
              <span className="text-[13px] font-medium text-[#1B4332]">{metrics.badge}</span>
            </div>
            <h2 className="text-[40px] md:text-[48px] font-bold text-[#1B4332] mb-4 tracking-tight">
              {metrics.title}
            </h2>
            <p className="text-[18px] text-[#1B4332]/70 max-w-2xl mx-auto">
              {metrics.subtitle}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <MetricCard
              label="Payback Period"
              value="6 weeks"
              description="first harvest cycle"
              benchmark="Pays for itself within one season"
              color="#1B4332"
              percentage={86}
            />
            <MetricCard
              label="Year 1 ROI"
              value="26.5x"
              description="net income uplift"
              benchmark="Modeled vs traditional baseline"
              color="#E2725B"
              percentage={92}
            />
            <MetricCard
              label="Yield Lift"
              value="+70%"
              description="zai pit optimization"
              benchmark="From 2.25t to 3.8t per farm"
              color="#1B4332"
              percentage={90}
            />
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value="1.5-2.0 ha" label="Farm Unit Size" />
            <StatCard value="14 days" label="Forecast Window" />
            <StatCard value="₦43,450" label="Unit Cost" />
            <StatCard value="₦2,000,000" label="Pilot Ask" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#1B4332] to-[#1B4332]/90 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-6 tracking-tight">
            {cta.title}
          </h2>
          <p className="text-[18px] md:text-[20px] text-white/80 mb-8 leading-relaxed">
            {cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-[#E2725B] hover:bg-[#E2725B]/90 text-white px-8 py-6 text-[16px] font-semibold"
            >
              {cta.btn1}
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-[16px] font-semibold"
            >
              {cta.btn2}
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#E2725B]" />
              <span className="text-[14px] text-white/80">Hausa + English SMS</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#E2725B]" />
              <span className="text-[14px] text-white/80">IP67 Ruggedized</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#E2725B]" />
              <span className="text-[14px] text-white/80">Solar-Capped</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#E2725B]" />
              <span className="text-[14px] text-white/80">Zai Pit Compatible</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B4332] py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sprout className="w-6 h-6 text-[#E2725B]" />
                <span className="text-[18px] font-semibold text-white">Green Line</span>
              </div>
              <p className="text-[13px] text-white/60 leading-relaxed">
                Climate resilience infrastructure for smallholder farmers in Northern Nigeria.
              </p>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-[14px] font-semibold text-white mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com" className="text-[13px] text-white/60 hover:text-white transition-colors flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[13px] text-white/60 hover:text-white transition-colors flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Documentation
                  </a>
                </li>
                <li>
                  <Link href="/dashboard" className="text-[13px] text-white/60 hover:text-white transition-colors flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-[14px] font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#problem" className="text-[13px] text-white/60 hover:text-white transition-colors">
                    Problem
                  </a>
                </li>
                <li>
                  <a href="#solution" className="text-[13px] text-white/60 hover:text-white transition-colors">
                    Solution
                  </a>
                </li>
                <li>
                  <a href="#metrics" className="text-[13px] text-white/60 hover:text-white transition-colors">
                    Metrics
                  </a>
                </li>
              </ul>
            </div>

            {/* Powered By */}
            <div>
              <h4 className="text-[14px] font-semibold text-white mb-3">Powered By</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[13px] text-white/80">Railway</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white">▲</span>
                  </div>
                  <span className="text-[13px] text-white/80">Vercel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-white/50">
              © 2026 Green Line. UNILAG Design Studio Design Competition.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[12px] text-white/50 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-[12px] text-white/50 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-[12px] text-white/50 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Step Card Component
interface StepCardProps {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

function StepCard({ number, icon: Icon, title, description, color }: StepCardProps) {
  return (
    <div className="flex items-start gap-4">
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}10` }}
      >
        <div style={{ color: color }}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span 
            className="text-[12px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {number}
          </span>
          <h3 className="text-[16px] font-semibold text-[#1B4332]">{title}</h3>
        </div>
        <p className="text-[14px] text-[#1B4332]/60 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Tech Badge Component
function TechBadge({ name }: { name: string }) {
  return (
    <div className="px-4 py-2 rounded-lg bg-white border border-[#1B4332]/10">
      <span className="text-[13px] font-medium text-[#1B4332]">{name}</span>
    </div>
  );
}

// Metric Card Component
interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  benchmark: string;
  color: string;
  percentage: number;
}

function MetricCard({ label, value, description, benchmark, color, percentage }: MetricCardProps) {
  return (
    <Card variant="bento" className="p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-semibold text-[#1B4332]">{label}</h3>
        <div 
          className="px-2 py-1 rounded-full text-[11px] font-bold"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {percentage}%
        </div>
      </div>
      <p className="text-[48px] font-bold mb-1" style={{ color }}>{value}</p>
      <p className="text-[14px] text-[#1B4332] font-medium mb-3">{description}</p>
      <div className="w-full h-2 bg-[#1B4332]/5 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full rounded-full transition-all"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-[12px] text-[#1B4332]/60">{benchmark}</p>
    </Card>
  );
}

// Stat Card Component
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-6 rounded-xl bg-white border border-[#1B4332]/10">
      <p className="text-[32px] font-bold text-[#1B4332] mb-1">{value}</p>
      <p className="text-[13px] text-[#1B4332]/60">{label}</p>
    </div>
  );
}
