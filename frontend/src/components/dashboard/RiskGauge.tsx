'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type LocalRiskCategory = 'critical' | 'severe' | 'moderate' | 'low' | 'healthy';

interface RiskGaugeProps {
  value: number; // 0-100
  label?: string;
  variant?: 'radial' | 'linear' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animate?: boolean;
  confidence?: number; // 0-100, optional confidence score
}

const riskColors: Record<LocalRiskCategory, string> = {
  critical: '#E2725B',
  severe: '#F59E0B',
  moderate: '#FBBF24',
  low: '#34D399',
  healthy: '#059669',
};

const riskLabels: Record<LocalRiskCategory, string> = {
  critical: 'Critical Risk',
  severe: 'High Risk',
  moderate: 'Moderate',
  low: 'Low Risk',
  healthy: 'Healthy',
};

function getRiskCategory(value: number): LocalRiskCategory {
  if (value >= 80) return 'critical';
  if (value >= 60) return 'severe';
  if (value >= 40) return 'moderate';
  if (value >= 20) return 'low';
  return 'healthy';
}

const sizeConfig = {
  sm: { size: 100, strokeWidth: 4, fontSize: 'text-lg', confidenceSize: 'text-[10px]' },
  md: { size: 140, strokeWidth: 5, fontSize: 'text-2xl', confidenceSize: 'text-[11px]' },
  lg: { size: 180, strokeWidth: 6, fontSize: 'text-3xl', confidenceSize: 'text-xs' },
};

export function RiskGauge({
  value,
  label,
  variant = 'minimal',
  size = 'md',
  showLabel = true,
  animate = true,
  confidence,
}: RiskGaugeProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const riskCategory = getRiskCategory(clampedValue);
  const color = riskColors[riskCategory];
  const riskLabel = label || riskLabels[riskCategory];
  const config = sizeConfig[size];

  if (variant === 'linear') {
    return (
      <LinearGauge
        value={clampedValue}
        color={color}
        riskLabel={riskLabel}
        showLabel={showLabel}
        animate={animate}
        size={size}
        confidence={confidence}
      />
    );
  }

  if (variant === 'radial') {
    return (
      <RadialGauge
        value={clampedValue}
        color={color}
        riskLabel={riskLabel}
        showLabel={showLabel}
        animate={animate}
        config={config}
        confidence={confidence}
      />
    );
  }

  // Minimal variant (default) - clean circular gauge
  return (
    <MinimalGauge
      value={clampedValue}
      color={color}
      riskLabel={riskLabel}
      showLabel={showLabel}
      animate={animate}
      config={config}
      confidence={confidence}
    />
  );
}

interface MinimalGaugeProps {
  value: number;
  color: string;
  riskLabel: string;
  showLabel: boolean;
  animate: boolean;
  config: typeof sizeConfig.md;
  confidence?: number;
}

function MinimalGauge({ value, color, riskLabel, showLabel, animate, config, confidence }: MinimalGaugeProps) {
  const { size, strokeWidth, fontSize, confidenceSize } = config;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle - very subtle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth={strokeWidth}
          />
          {/* Value circle with gradient-like feel */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={animate ? { strokeDashoffset: circumference } : { strokeDashoffset }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ 
              filter: `drop-shadow(0 0 8px ${color}40)`,
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className={cn(fontSize, 'font-semibold tracking-tight')}
            style={{ color }}
            initial={animate ? { opacity: 0, scale: 0.8 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {Math.round(value)}
          </motion.span>
          <span className="text-[var(--color-stone)] text-[11px] -mt-0.5">
            Stress Index
          </span>
        </div>
      </div>
      
      {/* Label & Confidence */}
      <div className="text-center mt-1">
        {showLabel && (
          <p className="text-[13px] font-medium text-[var(--color-soil)]">{riskLabel}</p>
        )}
        {confidence !== undefined && (
          <p className={cn(confidenceSize, 'text-[var(--color-stone)] mt-0.5')}>
            <span className="font-semibold text-[var(--color-soil)]">{confidence}%</span> Certainty
          </p>
        )}
      </div>
    </div>
  );
}

interface RadialGaugeProps {
  value: number;
  color: string;
  riskLabel: string;
  showLabel: boolean;
  animate: boolean;
  config: typeof sizeConfig.md;
  confidence?: number;
}

function RadialGauge({ value, color, riskLabel, showLabel, animate, config, confidence }: RadialGaugeProps) {
  const { size: radialSize, strokeWidth, fontSize, confidenceSize } = config;
  const radius = (radialSize - strokeWidth * 2) / 2;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: radialSize, height: radialSize / 2 + 16 }}>
        <svg
          width={radialSize}
          height={radialSize / 2 + strokeWidth}
          className="overflow-visible"
        >
          {/* Background arc */}
          <path
            d={describeArc(radialSize / 2, radialSize / 2, radius, 180, 360)}
            fill="none"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <motion.path
            d={describeArc(radialSize / 2, radialSize / 2, radius, 180, 180 + (value / 100) * 180)}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={animate ? { pathLength: 0 } : {}}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color}30)` }}
          />
        </svg>
        {/* Center value */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center"
          style={{ bottom: 0 }}
        >
          <div className={cn(fontSize, 'font-semibold tracking-tight')} style={{ color }}>
            {Math.round(value)}
          </div>
        </div>
      </div>
      
      {/* Label & Confidence */}
      {(showLabel || confidence !== undefined) && (
        <div className="text-center mt-2">
          {showLabel && (
            <p className="text-[13px] font-medium text-[var(--color-soil)]">{riskLabel}</p>
          )}
          {confidence !== undefined && (
            <p className={cn(confidenceSize, 'text-[var(--color-stone)]')}>
              <span className="font-semibold text-[var(--color-soil)]">{confidence}%</span> Certainty
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to describe an SVG arc path
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

interface LinearGaugeProps {
  value: number;
  color: string;
  riskLabel: string;
  showLabel: boolean;
  animate: boolean;
  size: 'sm' | 'md' | 'lg';
  confidence?: number;
}

const linearSizeConfig = {
  sm: { height: 'h-1.5', spacing: 'gap-1.5' },
  md: { height: 'h-2', spacing: 'gap-2' },
  lg: { height: 'h-2.5', spacing: 'gap-2.5' },
};

function LinearGauge({ value, color, riskLabel, showLabel, animate, size, confidence }: LinearGaugeProps) {
  const config = linearSizeConfig[size];
  
  return (
    <div className={cn('w-full flex flex-col', config.spacing)}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[var(--color-stone)]">{riskLabel}</span>
          <span className="text-[13px] font-semibold" style={{ color }}>{Math.round(value)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-black/[0.03] rounded-full overflow-hidden', config.height)}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={animate ? { width: 0 } : { width: `${value}%` }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      {confidence !== undefined && (
        <p className="text-[11px] text-[var(--color-stone)]">
          <span className="font-semibold text-[var(--color-soil)]">{confidence}%</span> Certainty
        </p>
      )}
    </div>
  );
}

// Compact risk indicator for cards
interface RiskIndicatorProps {
  value: number;
  size?: 'xs' | 'sm';
}

export function RiskIndicator({ value, size = 'sm' }: RiskIndicatorProps) {
  const category = getRiskCategory(value);
  const color = riskColors[category];
  const dimensions = size === 'xs' ? 'w-6 h-6' : 'w-8 h-8';
  const fontSize = size === 'xs' ? 'text-[9px]' : 'text-[10px]';
  
  return (
    <div 
      className={cn(dimensions, 'rounded-full flex items-center justify-center font-semibold', fontSize)}
      style={{ 
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      {Math.round(value)}
    </div>
  );
}

// Compound component for risk breakdown
interface RiskBreakdownProps {
  items: Array<{
    label: string;
    value: number;
    confidence?: number;
  }>;
  size?: 'sm' | 'md';
}

export function RiskBreakdown({ items, size = 'sm' }: RiskBreakdownProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <RiskGauge
          key={item.label}
          value={item.value}
          label={item.label}
          variant="linear"
          size={size}
          showLabel
          confidence={item.confidence}
        />
      ))}
    </div>
  );
}
