'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sprout, User, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { FarmSelector, FarmSelectorCompact } from './FarmSelector';

interface NavbarProps {
  defaultFarmId?: string;
  onMenuClick?: () => void;
}

export function Navbar({ defaultFarmId = '1', onMenuClick }: NavbarProps) {
  const [selectedFarmId, setSelectedFarmId] = useState(defaultFarmId);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_20px_rgba(45,31,26,0.06)]">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 gap-2 md:gap-4">
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E86B45] to-[#F28B68] shadow-[0_4px_16px_rgba(232,107,69,0.35)] group-hover:shadow-[0_6px_24px_rgba(232,107,69,0.45)] transition-all duration-300 group-hover:-translate-y-0.5">
            <Sprout className="h-6 w-6 text-white animate-bounce-subtle" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-xl font-bold bg-gradient-to-r from-[#2D1F1A] to-[#E86B45] bg-clip-text text-transparent tracking-tight">Green Line</h1>
            <p className="text-[11px] font-semibold text-[var(--color-bark)] tracking-wider uppercase">Climate Resilience Dashboard</p>
          </div>
        </Link>

        {/* Center - Farm Selector (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center mx-8 max-w-md">
          <FarmSelector
            selectedFarmId={selectedFarmId}
            onSelectFarm={setSelectedFarmId}
          />
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Farm Selector (Mobile) */}
          <div className="md:hidden">
            <FarmSelectorCompact
              selectedFarmId={selectedFarmId}
              onSelectFarm={setSelectedFarmId}
            />
          </div>

          <LanguageSelector />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--color-critical)]" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
