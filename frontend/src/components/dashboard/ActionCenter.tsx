'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplets, CloudRain, Sun, Leaf, 
  ArrowRight, Sparkles, TrendingUp, TrendingDown, Minus,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScenarioType } from '@/lib/api';

interface ActionScenario {
  id: ScenarioType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  impact: {
    yield: number;
    risk: number;
    confidence: number;
  };
  ghostLineData?: number[]; // Forecast preview data
}

const scenarios: ActionScenario[] = [
  {
    id: 'IRRIGATION',
    label: 'Release Cistern Water',
    description: 'Micro-dose 25mm into pits',
    icon: Droplets,
    color: '#3B82F6',
    impact: { yield: 18, risk: -28, confidence: 90 },
    ghostLineData: [0, 2, 5, 8, 12, 15, 18, 20],
  },
  {
    id: 'FERTILIZER',
    label: 'Zai Pit Mulch',
    description: 'Organic cover + compost',
    icon: Leaf,
    color: '#059669',
    impact: { yield: 10, risk: -8, confidence: 88 },
    ghostLineData: [0, 3, 7, 12, 16, 20, 24, 28],
  },
  {
    id: 'HEAVY_RAIN',
    label: 'Rain Pulse',
    description: '40mm localized event',
    icon: CloudRain,
    color: '#8B5CF6',
    impact: { yield: 4, risk: -10, confidence: 76 },
    ghostLineData: [0, -1, -3, -5, -6, -4, -2, 0],
  },
  {
    id: 'HEAT_WAVE',
    label: 'Heat Shield',
    description: '+5°C for 4 days',
    icon: Sun,
    color: '#F59E0B',
    impact: { yield: -9, risk: 26, confidence: 83 },
    ghostLineData: [0, -2, -5, -8, -12, -14, -12, -10],
  },
];

interface ActionCenterProps {
  onSelectAction?: (scenario: ScenarioType, ghostData: number[]) => void;
  selectedAction?: ScenarioType | null;
  className?: string;
}

export function ActionCenter({ onSelectAction, selectedAction: externalSelected, className }: ActionCenterProps) {
  const [selected, setSelected] = useState<ScenarioType | null>(externalSelected || null);
  const [isSimulating, setIsSimulating] = useState(false);

  const activeScenario = scenarios.find(s => s.id === selected);

  const handleSelect = (scenario: ActionScenario) => {
    const newSelection = selected === scenario.id ? null : scenario.id;
    setSelected(newSelection);
    
    if (newSelection && scenario.ghostLineData) {
      onSelectAction?.(scenario.id, scenario.ghostLineData);
    } else {
      onSelectAction?.(null as unknown as ScenarioType, []);
    }
  };

  const handleSimulate = () => {
    if (!selected) return;
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 1500);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-[var(--color-soil)] tracking-tight">
            Action Center
          </h3>
          <p className="text-[12px] text-[var(--color-stone)]">
            Preview impact before you release water
          </p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
        </div>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-2">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          const isSelected = selected === scenario.id;
          
          return (
            <motion.button
              key={scenario.id}
              onClick={() => handleSelect(scenario)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'relative p-3 rounded-xl text-left transition-all duration-200',
                'border backdrop-blur-sm',
                isSelected 
                  ? 'bg-white/80 border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
                  : 'bg-white/40 border-white/15 hover:bg-white/60 hover:border-white/25'
              )}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  layoutId="action-selection"
                  className="absolute inset-0 rounded-xl border-2"
                  style={{ borderColor: scenario.color }}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              
              <div className="relative">
                <div className="flex items-start gap-2.5 mb-2">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${scenario.color}15`, color: scenario.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: scenario.color }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>
                
                <p className="text-[13px] font-medium text-[var(--color-soil)]">
                  {scenario.label}
                </p>
                <p className="text-[11px] text-[var(--color-stone)]">
                  {scenario.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Impact Preview */}
      <AnimatePresence>
        {activeScenario && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-medium text-[var(--color-soil)]">
                  Projected Impact
                </span>
                <span className="text-[11px] text-[var(--color-stone)]">
                  {activeScenario.impact.confidence}% confidence
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <ImpactMetric
                  label="Yield Change"
                  value={activeScenario.impact.yield}
                  suffix="%"
                  color={activeScenario.color}
                />
                <ImpactMetric
                  label="Risk Shift"
                  value={activeScenario.impact.risk}
                  suffix="%"
                  inverse
                  color={activeScenario.color}
                />
              </div>
              
              {/* Mini ghost line preview */}
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-4 h-0.5 rounded-full"
                    style={{ backgroundColor: activeScenario.color, opacity: 0.5 }}
                  />
                  <span className="text-[10px] text-[var(--color-stone)]">
                    Forecast preview on chart
                  </span>
                </div>
                <GhostLinePreview data={activeScenario.ghostLineData || []} color={activeScenario.color} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simulate Button */}
      <motion.button
        onClick={handleSimulate}
        disabled={!selected || isSimulating}
        whileHover={selected ? { scale: 1.01 } : {}}
        whileTap={selected ? { scale: 0.99 } : {}}
        className={cn(
          'w-full py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200',
          'flex items-center justify-center gap-2',
          selected
            ? 'bg-[var(--color-primary)] text-white shadow-[0_4px_16px_rgba(226,114,91,0.25)]'
            : 'bg-black/[0.03] text-[var(--color-stone)] cursor-not-allowed'
        )}
      >
        {isSimulating ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            Running...
          </>
        ) : (
          <>
            Run Scenario
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </div>
  );
}

interface ImpactMetricProps {
  label: string;
  value: number;
  suffix: string;
  inverse?: boolean;
  color: string;
}

function ImpactMetric({ label, value, suffix, inverse, color }: ImpactMetricProps) {
  const isPositive = inverse ? value < 0 : value > 0;
  const isNeutral = value === 0;
  
  const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;
  const trendColor = isNeutral ? 'var(--color-stone)' : isPositive ? '#059669' : '#E2725B';
  
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] text-[var(--color-stone)]">{label}</span>
      <div className="flex items-center gap-1.5">
        <TrendIcon className="w-3.5 h-3.5" style={{ color: trendColor }} />
        <span 
          className="text-[14px] font-semibold"
          style={{ color: trendColor }}
        >
          {value > 0 ? '+' : ''}{value}{suffix}
        </span>
      </div>
    </div>
  );
}

interface GhostLinePreviewProps {
  data: number[];
  color: string;
}

function GhostLinePreview({ data, color }: GhostLinePreviewProps) {
  if (data.length === 0) return null;
  
  const maxVal = Math.max(...data.map(Math.abs));
  const height = 24;
  const width = data.length > 1 ? (data.length - 1) * 20 : 0;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height / 2 - (val / (maxVal || 1)) * (height / 2 - 2);
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width="100%" height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeOpacity={0.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 3"
      />
    </svg>
  );
}

// Compact action buttons for sidebar
export function ActionQuickSelect({ onSelect }: { onSelect?: (id: ScenarioType) => void }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {scenarios.map((scenario) => {
        const Icon = scenario.icon;
        return (
          <button
            key={scenario.id}
            onClick={() => onSelect?.(scenario.id)}
            className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white/50 backdrop-blur-sm 
                     border border-white/20 transition-all hover:bg-white/70 hover:scale-105"
          >
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${scenario.color}12`, color: scenario.color }}
            >
              <Icon className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] text-[var(--color-stone)] text-center leading-tight">
              {scenario.label.split(' ')[0]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
