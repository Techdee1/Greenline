'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart, ReferenceLine } from 'recharts';
import { Card, CardContent } from '@/components/ui/Card';
import { TrendingUp, Droplets, Thermometer, CloudRain } from 'lucide-react';

interface ForecastDataPoint {
  day: string;
  date: string;
  riskScore: number;
  soilMoisture: number;
  temperature: number;
  rainfall: number;
  ghostLine?: number; // For action preview
}

interface ForecastChartProps {
  data?: ForecastDataPoint[];
  showTemperature?: boolean;
  showMoisture?: boolean;
  showRainfall?: boolean;
  ghostLineData?: number[];
  ghostLineColor?: string;
}

// Sample data for 14-day forecast
const defaultData: ForecastDataPoint[] = [
  { day: 'Today', date: 'Feb 25', riskScore: 15, soilMoisture: 42, temperature: 28, rainfall: 0 },
  { day: 'D+1', date: 'Feb 26', riskScore: 18, soilMoisture: 40, temperature: 29, rainfall: 0 },
  { day: 'D+2', date: 'Feb 27', riskScore: 22, soilMoisture: 38, temperature: 30, rainfall: 0 },
  { day: 'D+3', date: 'Feb 28', riskScore: 35, soilMoisture: 34, temperature: 31, rainfall: 0 },
  { day: 'D+4', date: 'Mar 1', riskScore: 42, soilMoisture: 30, temperature: 32, rainfall: 0 },
  { day: 'D+5', date: 'Mar 2', riskScore: 38, soilMoisture: 32, temperature: 30, rainfall: 5 },
  { day: 'D+6', date: 'Mar 3', riskScore: 25, soilMoisture: 38, temperature: 28, rainfall: 12 },
  { day: 'D+7', date: 'Mar 4', riskScore: 18, soilMoisture: 45, temperature: 27, rainfall: 8 },
  { day: 'D+8', date: 'Mar 5', riskScore: 15, soilMoisture: 48, temperature: 26, rainfall: 2 },
  { day: 'D+9', date: 'Mar 6', riskScore: 12, soilMoisture: 46, temperature: 27, rainfall: 0 },
  { day: 'D+10', date: 'Mar 7', riskScore: 14, soilMoisture: 44, temperature: 28, rainfall: 0 },
  { day: 'D+11', date: 'Mar 8', riskScore: 18, soilMoisture: 41, temperature: 29, rainfall: 0 },
  { day: 'D+12', date: 'Mar 9', riskScore: 22, soilMoisture: 38, temperature: 30, rainfall: 0 },
  { day: 'D+13', date: 'Mar 10', riskScore: 20, soilMoisture: 36, temperature: 29, rainfall: 3 },
];

// Premium color palette
const COLORS = {
  risk: '#E2725B',      // Burnt sienna
  moisture: '#3B82F6',  // Blue
  temperature: '#F59E0B', // Amber
  rainfall: '#8B5CF6',  // Purple
  grid: 'rgba(0,0,0,0.04)',
  text: '#78716C',
  ghostLine: '#059669',
};

export function ForecastChart({ 
  data = defaultData,
  showTemperature = true,
  showMoisture = true,
  showRainfall = false,
  ghostLineData,
  ghostLineColor = COLORS.ghostLine,
}: ForecastChartProps) {
  // Merge ghost line data if provided
  const chartData = data.map((point, idx) => ({
    ...point,
    ghostLine: ghostLineData?.[idx] !== undefined 
      ? point.riskScore + ghostLineData[idx] 
      : undefined,
  }));

  const peakRisk = Math.max(...data.map(d => d.riskScore));
  const peakDay = data.find(d => d.riskScore === peakRisk);

  return (
    <Card variant="bento" className="overflow-hidden">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[15px] font-semibold text-[var(--color-soil)] tracking-tight">
              14-Day Stress Forecast
            </h3>
            <p className="text-[12px] text-[var(--color-stone)]">
              Root-zone stress trajectory & conditions
            </p>
          </div>
          
          {/* Compact legend */}
          <div className="flex items-center gap-3">
            <LegendDot color={COLORS.risk} label="Risk" />
            {showMoisture && <LegendDot color={COLORS.moisture} label="Moisture" />}
            {showTemperature && <LegendDot color={COLORS.temperature} label="Temp" />}
            {ghostLineData && <LegendDot color={ghostLineColor} label="Projected" dashed />}
          </div>
        </div>

        {/* Chart */}
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="riskGradientPremium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.risk} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={COLORS.risk} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.moisture} stopOpacity={0.1} />
                  <stop offset="100%" stopColor={COLORS.moisture} stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="0" 
                stroke={COLORS.grid} 
                vertical={false}
              />
              
              {/* Warning threshold line */}
              <ReferenceLine 
                y={40} 
                yAxisId="risk" 
                stroke="#F59E0B" 
                strokeDasharray="4 4" 
                strokeOpacity={0.4}
              />
              
              <XAxis 
                dataKey="day" 
                tick={{ fill: COLORS.text, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                dy={8}
              />
              
              <YAxis 
                yAxisId="risk"
                domain={[0, 100]}
                tick={{ fill: COLORS.text, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}`}
                width={30}
              />
              
              <YAxis 
                yAxisId="temp"
                orientation="right"
                domain={[20, 40]}
                hide
              />

              <Tooltip content={<PremiumTooltip />} />

              {/* Risk area fill */}
              <Area
                yAxisId="risk"
                type="monotone"
                dataKey="riskScore"
                stroke={COLORS.risk}
                fill="url(#riskGradientPremium)"
                strokeWidth={1.5}
              />

              {/* Ghost line for action preview */}
              {ghostLineData && (
                <Line
                  yAxisId="risk"
                  type="monotone"
                  dataKey="ghostLine"
                  stroke={ghostLineColor}
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                  strokeOpacity={0.6}
                  dot={false}
                />
              )}

              {/* Soil moisture line */}
              {showMoisture && (
                <Line
                  yAxisId="risk"
                  type="monotone"
                  dataKey="soilMoisture"
                  stroke={COLORS.moisture}
                  strokeWidth={1.5}
                  dot={false}
                  strokeOpacity={0.7}
                />
              )}

              {/* Temperature line */}
              {showTemperature && (
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="temperature"
                  stroke={COLORS.temperature}
                  strokeWidth={1.5}
                  dot={false}
                  strokeOpacity={0.6}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom stats bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/[0.04]">
          <div className="flex items-center gap-4">
            <StatPill 
              icon={TrendingUp} 
              label="Peak"
              value={`${peakRisk}%`}
              subtext={peakDay?.day || ''}
              color={COLORS.risk}
            />
            <StatPill 
              icon={Droplets} 
              label="Avg Moisture"
              value={`${Math.round(data.reduce((a, b) => a + b.soilMoisture, 0) / data.length)}%`}
              color={COLORS.moisture}
            />
            <StatPill 
              icon={Thermometer} 
              label="Avg Temp"
              value={`${Math.round(data.reduce((a, b) => a + b.temperature, 0) / data.length)}°`}
              color={COLORS.temperature}
            />
          </div>
          
          {/* Risk zones indicator */}
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-8 rounded-full bg-[#059669]" />
            <div className="h-1.5 w-8 rounded-full bg-[#FBBF24]" />
            <div className="h-1.5 w-8 rounded-full bg-[#F59E0B]" />
            <div className="h-1.5 w-8 rounded-full bg-[#E2725B]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LegendDot({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div 
        className={`w-3 h-[3px] rounded-full ${dashed ? 'border border-current' : ''}`}
        style={{ 
          backgroundColor: dashed ? 'transparent' : color,
          borderColor: dashed ? color : undefined,
          borderStyle: dashed ? 'dashed' : undefined,
        }} 
      />
      <span className="text-[11px] text-[var(--color-stone)]">{label}</span>
    </div>
  );
}

interface StatPillProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  subtext?: string;
  color: string;
}

function StatPill({ icon: Icon, label, value, subtext, color }: StatPillProps) {
  return (
    <div className="flex items-center gap-2">
      <div 
        className="w-6 h-6 rounded-md flex items-center justify-center"
        style={{ backgroundColor: `${color}12`, color }}
      >
        <Icon className="w-3 h-3" />
      </div>
      <div>
        <p className="text-[12px] font-semibold text-[var(--color-soil)]">
          {value}
          {subtext && <span className="font-normal text-[var(--color-stone)]"> {subtext}</span>}
        </p>
      </div>
    </div>
  );
}

interface PremiumTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

function PremiumTooltip({ active, payload, label }: PremiumTooltipProps) {
  if (!active || !payload?.length) return null;

  const data = (payload[0] as any)?.payload as ForecastDataPoint;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[140px]">
      <p className="font-semibold text-[13px] text-[var(--color-soil)]">{label}</p>
      <p className="text-[10px] text-[var(--color-stone)] mb-2">{data?.date}</p>
      
      <div className="space-y-1.5">
        <TooltipRow color={COLORS.risk} label="Risk" value={`${data?.riskScore}%`} />
        <TooltipRow color={COLORS.moisture} label="Moisture" value={`${data?.soilMoisture}%`} />
        <TooltipRow color={COLORS.temperature} label="Temp" value={`${data?.temperature}°C`} />
        {data?.rainfall > 0 && (
          <TooltipRow color={COLORS.rainfall} label="Rain" value={`${data?.rainfall}mm`} />
        )}
        {data?.ghostLine !== undefined && (
          <TooltipRow color={COLORS.ghostLine} label="Projected" value={`${Math.round(data.ghostLine)}%`} />
        )}
      </div>
    </div>
  );
}

function TooltipRow({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[11px] text-[var(--color-stone)]">{label}</span>
      </div>
      <span className="text-[11px] font-medium" style={{ color }}>{value}</span>
    </div>
  );
}

// Compact sparkline version
interface SparklineChartProps {
  data: number[];
  color?: string;
  height?: number;
  showDot?: boolean;
}

export function SparklineChart({ data, color = COLORS.risk, height = 32, showDot = true }: SparklineChartProps) {
  const chartData = data.map((value, index) => ({ value, index }));
  const lastValue = data[data.length - 1];
  const trend = data.length > 1 ? lastValue - data[data.length - 2] : 0;
  
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      <div className="flex-1" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#spark-${color.replace('#', '')})`}
              strokeWidth={1.5}
            />
            {showDot && (
              <Line
                type="monotone"
                dataKey="value"
                stroke="transparent"
                dot={false}
                activeDot={{ r: 3, fill: color }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {showDot && (
        <div 
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  );
}
