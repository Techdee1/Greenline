'use client';

import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Droplets, Thermometer, Wind, Sun, CloudRain, LucideIcon } from 'lucide-react';

type SensorType = 'moisture' | 'temperature' | 'humidity' | 'light' | 'rainfall';

interface SensorCardProps {
  type: SensorType;
  value: number;
  unit: string;
  status: 'healthy' | 'low' | 'moderate' | 'severe' | 'critical';
  statusLabel: string;
  minValue?: number;
  maxValue?: number;
  optimalRange?: string;
  lastUpdated?: string;
  trend?: 'up' | 'down' | 'stable';
}

const sensorConfig: Record<SensorType, {
  icon: LucideIcon;
  label: string;
  color: string;
  colorClass: string;
  gradient: string;
}> = {
  moisture: {
    icon: Droplets,
    label: 'Root-Zone Moisture',
    color: '#22B8E8',
    colorClass: 'text-sky-500',
    gradient: 'from-sky-400/25 to-sky-500/10',
  },
  temperature: {
    icon: Thermometer,
    label: 'Heat Index',
    color: '#E86B45',
    colorClass: 'text-orange-500',
    gradient: 'from-orange-400/25 to-orange-500/10',
  },
  humidity: {
    icon: Wind,
    label: 'Air Humidity',
    color: '#A8C5E2',
    colorClass: 'text-blue-400',
    gradient: 'from-blue-400/25 to-blue-500/10',
  },
  light: {
    icon: Sun,
    label: 'Light Intensity',
    color: '#FFBE42',
    colorClass: 'text-amber-500',
    gradient: 'from-amber-400/25 to-amber-500/10',
  },
  rainfall: {
    icon: CloudRain,
    label: 'Rainfall (Last 24h)',
    color: '#22B8E8',
    colorClass: 'text-cyan-500',
    gradient: 'from-cyan-400/25 to-cyan-500/10',
  },
};

const trendArrows = {
  up: '↑',
  down: '↓',
  stable: '→',
};

export function SensorCard({
  type,
  value,
  unit,
  status,
  statusLabel,
  minValue,
  maxValue,
  optimalRange,
  lastUpdated = 'Just now',
  trend,
}: SensorCardProps) {
  const config = sensorConfig[type];
  const Icon = config.icon;
  
  // Calculate percentage for progress bar if min/max provided
  const percentage = minValue !== undefined && maxValue !== undefined
    ? ((value - minValue) / (maxValue - minValue)) * 100
    : undefined;

  return (
    <Card hover="glow" className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br opacity-50',
        config.gradient
      )} />
      
      <div className="relative">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `color-mix(in srgb, ${config.color} 15%, transparent)` }}
              >
                <Icon className={cn('h-4 w-4', config.colorClass)} />
              </div>
              <CardTitle className="text-base">{config.label}</CardTitle>
            </div>
            {trend && (
              <span 
                className={cn(
                  'text-lg font-medium',
                  trend === 'up' && 'text-[var(--color-primary)]',
                  trend === 'down' && 'text-[var(--color-water)]',
                  trend === 'stable' && 'text-[var(--color-bark)]'
                )}
              >
                {trendArrows[trend]}
              </span>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-baseline gap-2 mb-2">
            <span 
              className="text-3xl font-bold"
              style={{ color: config.color }}
            >
              {value}
            </span>
            <span className="text-lg text-[var(--color-bark)]">{unit}</span>
            <Badge variant={status} size="sm" className="ml-auto">
              {statusLabel}
            </Badge>
          </div>

          {/* Progress bar */}
          {percentage !== undefined && (
            <div className="mt-3">
              <div className="h-2.5 bg-[rgba(45,27,14,0.06)] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ 
                    width: `${Math.min(100, Math.max(0, percentage))}%`,
                    backgroundColor: config.color,
                  }}
                />
              </div>
              {minValue !== undefined && maxValue !== undefined && (
                <div className="flex justify-between text-[10px] text-[var(--color-bark)] mt-1.5 font-medium">
                  <span>{minValue}{unit}</span>
                  <span>{maxValue}{unit}</span>
                </div>
              )}
            </div>
          )}

          {/* Meta info */}
          <div className="mt-3 pt-3 border-t border-[rgba(45,27,14,0.06)]">
            {optimalRange && (
              <p className="text-xs text-[var(--color-bark)] font-medium">
                Optimal range: {optimalRange}
              </p>
            )}
            <p className="text-[11px] text-[var(--color-bark)]/60 mt-1">
              Updated {lastUpdated}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// Compact version for smaller spaces
interface SensorMiniCardProps {
  type: SensorType;
  value: number;
  unit: string;
  status: 'healthy' | 'low' | 'moderate' | 'severe' | 'critical';
}

export function SensorMiniCard({ type, value, unit, status }: SensorMiniCardProps) {
  const config = sensorConfig[type];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-[rgba(45,27,14,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200">
      <div 
        className="p-2.5 rounded-xl"
        style={{ backgroundColor: `color-mix(in srgb, ${config.color} 12%, transparent)` }}
      >
        <Icon className="h-4 w-4" style={{ color: config.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[var(--color-bark)] truncate font-medium">{config.label}</p>
        <p className="font-semibold" style={{ color: config.color }}>
          {value}{unit}
        </p>
      </div>
      <div className={cn(
        'w-2.5 h-2.5 rounded-full ring-2 ring-white',
        status === 'healthy' && 'bg-[var(--color-healthy)]',
        status === 'low' && 'bg-[var(--color-low)]',
        status === 'moderate' && 'bg-[var(--color-moderate)]',
        status === 'severe' && 'bg-[var(--color-severe)]',
        status === 'critical' && 'bg-[var(--color-critical)]',
      )} />
    </div>
  );
}
