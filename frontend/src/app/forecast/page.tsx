'use client';

import { useState } from 'react';
import { AppLayout, ForecastChart, InsightCard } from '@/components/dashboard';
import { Card, CardContent } from '@/components/ui/Card';
import { useDashboardData } from '@/lib/api';
import {
  TrendingUp, Cloud, Droplets, Sun, Wind, Thermometer,
  Calendar, DollarSign, Target, Sprout, Loader2, ArrowUp,
  ArrowDown, Minus, AlertCircle, CloudRain, Zap
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, ReferenceLine } from 'recharts';

// Extended 30-day forecast data
const extendedForecast = [
  { date: 'May 22', temp: 34, rain: 0, moisture: 36, gdd: 16, confidence: 95 },
  { date: 'May 23', temp: 35, rain: 0, moisture: 34, gdd: 17, confidence: 95 },
  { date: 'May 24', temp: 36, rain: 0, moisture: 32, gdd: 18, confidence: 92 },
  { date: 'May 25', temp: 36, rain: 0, moisture: 30, gdd: 18, confidence: 92 },
  { date: 'May 26', temp: 35, rain: 1, moisture: 34, gdd: 17, confidence: 90 },
  { date: 'May 27', temp: 33, rain: 6, moisture: 48, gdd: 15, confidence: 88 },
  { date: 'May 28', temp: 32, rain: 10, moisture: 56, gdd: 14, confidence: 88 },
  { date: 'May 29', temp: 31, rain: 5, moisture: 52, gdd: 13, confidence: 85 },
  { date: 'May 30', temp: 33, rain: 0, moisture: 48, gdd: 15, confidence: 82 },
  { date: 'May 31', temp: 34, rain: 0, moisture: 44, gdd: 16, confidence: 82 },
  { date: 'Jun 1', temp: 35, rain: 0, moisture: 40, gdd: 17, confidence: 80 },
  { date: 'Jun 2', temp: 36, rain: 0, moisture: 36, gdd: 18, confidence: 78 },
  { date: 'Jun 3', temp: 36, rain: 0, moisture: 34, gdd: 18, confidence: 78 },
  { date: 'Jun 4', temp: 35, rain: 3, moisture: 42, gdd: 17, confidence: 72 },
  { date: 'Jun 5', temp: 33, rain: 6, moisture: 52, gdd: 15, confidence: 70 },
  { date: 'Jun 6', temp: 32, rain: 4, moisture: 56, gdd: 14, confidence: 68 },
  { date: 'Jun 7', temp: 33, rain: 0, moisture: 52, gdd: 15, confidence: 65 },
  { date: 'Jun 8', temp: 34, rain: 0, moisture: 48, gdd: 16, confidence: 65 },
  { date: 'Jun 9', temp: 35, rain: 0, moisture: 44, gdd: 17, confidence: 62 },
  { date: 'Jun 10', temp: 36, rain: 0, moisture: 40, gdd: 18, confidence: 60 },
  { date: 'Jun 11', temp: 34, rain: 8, moisture: 52, gdd: 16, confidence: 58 },
  { date: 'Jun 12', temp: 32, rain: 12, moisture: 64, gdd: 14, confidence: 55 },
  { date: 'Jun 13', temp: 31, rain: 6, moisture: 68, gdd: 13, confidence: 55 },
  { date: 'Jun 14', temp: 32, rain: 0, moisture: 64, gdd: 14, confidence: 52 },
  { date: 'Jun 15', temp: 33, rain: 0, moisture: 60, gdd: 15, confidence: 50 },
  { date: 'Jun 16', temp: 34, rain: 0, moisture: 56, gdd: 16, confidence: 50 },
  { date: 'Jun 17', temp: 35, rain: 0, moisture: 52, gdd: 17, confidence: 48 },
  { date: 'Jun 18', temp: 36, rain: 0, moisture: 48, gdd: 18, confidence: 45 },
  { date: 'Jun 19', temp: 34, rain: 4, moisture: 56, gdd: 16, confidence: 45 },
];

// Yield prediction data (kg/ha over season)
const yieldPredictionData = [
  { week: 'Week 1', predicted: 1200, upper: 1350, lower: 1050, actual: 1180 },
  { week: 'Week 2', predicted: 1800, upper: 2000, lower: 1600, actual: 1820 },
  { week: 'Week 3', predicted: 2400, upper: 2650, lower: 2150, actual: 2380 },
  { week: 'Week 4', predicted: 2900, upper: 3200, lower: 2600, actual: 2920 },
  { week: 'Week 5', predicted: 3350, upper: 3700, lower: 3000, actual: null },
  { week: 'Week 6', predicted: 3700, upper: 4100, lower: 3300, actual: null },
  { week: 'Week 7', predicted: 4000, upper: 4450, lower: 3550, actual: null },
  { week: 'Week 8', predicted: 4250, upper: 4750, lower: 3750, actual: null },
  { week: 'Week 9', predicted: 4450, upper: 5000, lower: 3900, actual: null },
  { week: 'Week 10', predicted: 4600, upper: 5200, lower: 4000, actual: null },
];

// Market price forecast
const priceForecastData = [
  { month: 'May', price: 320000, trend: 'stable' },
  { month: 'Jun', price: 340000, trend: 'up' },
  { month: 'Jul', price: 360000, trend: 'up' },
  { month: 'Aug', price: 355000, trend: 'stable' },
  { month: 'Sep', price: 330000, trend: 'down' },
  { month: 'Oct', price: 315000, trend: 'down' },
];

// Growing degree days accumulation
const gddData = [
  { date: 'Week 1', accumulated: 98, optimal: 100 },
  { date: 'Week 2', accumulated: 203, optimal: 210 },
  { date: 'Week 3', accumulated: 315, optimal: 320 },
  { date: 'Week 4', accumulated: 432, optimal: 430 },
  { date: 'Week 5', accumulated: 546, optimal: 540 },
  { date: 'Week 6', accumulated: 658, optimal: 650 },
  { date: 'Week 7', accumulated: 772, optimal: 760 },
  { date: 'Week 8', accumulated: 885, optimal: 870 },
];

export default function ForecastingPage() {
  const farmId = '1';
  const { farm, forecast, isLoading } = useDashboardData(farmId);
  const [forecastRange, setForecastRange] = useState<'14d' | '30d'>('30d');
  const [viewMode, setViewMode] = useState<'weather' | 'yield' | 'market'>('weather');

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--color-primary)]" />
            </div>
            <p className="text-[13px] text-[var(--color-stone)]">Loading forecasts...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const forecastData = forecast.data;
  const displayData = forecastRange === '14d' ? extendedForecast.slice(0, 14) : extendedForecast;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-semibold text-[var(--color-soil)] tracking-tight">
              Forecasting & Drought Outlook
            </h1>
            <p className="text-[13px] text-[var(--color-stone)]">
              Root-zone stress, yield protection, and market timing
            </p>
          </div>
          <div className="flex items-center gap-2">
            {['14d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setForecastRange(range as any)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                  forecastRange === range
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-black/[0.03] text-[var(--color-stone)] hover:bg-black/[0.06]'
                }`}
              >
                {range === '14d' ? '14 Days' : '30 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Forecast Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard
            priority="opportunity"
            title="Rain Pulse Window"
            description="Localized rain expected in 5-7 days, ideal for pit recharge"
            daysUntil={6}
            impactPercent={12}
            confidence={86}
          />
          <InsightCard
            priority="warning"
            title="Heat Wave Alert"
            description="36°C+ forecast for 4 days; heat stress risk rising"
            daysUntil={10}
            impactPercent={-9}
            confidence={80}
          />
          <InsightCard
            priority="healthy"
            title="Yield Protection On Track"
            description="Projected yield stabilizes with early cistern release"
            daysUntil={0}
            impactPercent={10}
            confidence={84}
          />
        </div>

        {/* Main Forecast Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          
          {/* Weather Metrics Cards */}
          <div className="col-span-12 lg:col-span-3">
            <div className="space-y-4">
              <WeatherMetricCard
                icon={CloudRain}
                label="Rainfall Outlook"
                value="44mm"
                subtext="Next 30 days"
                trend="up"
                trendValue="+6mm vs avg"
                color="#3B82F6"
              />
              <WeatherMetricCard
                icon={Thermometer}
                label="Avg Heat Index"
                value="34.2°C"
                subtext="Next 14 days"
                trend="up"
                trendValue="+2.4°C"
                color="#F59E0B"
              />
              <WeatherMetricCard
                icon={Sun}
                label="Stress Window"
                value="Day 3"
                subtext="Peak risk"
                trend="stable"
                trendValue="Mitigation ready"
                color="#FBBF24"
              />
            </div>
          </div>

          {/* Extended Weather Forecast Chart */}
          <div className="col-span-12 lg:col-span-9">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Extended Climate Outlook</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">
                      Heat, rainfall, and root-zone moisture forecast
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                      <span className="text-[11px] text-[var(--color-stone)]">Temperature</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03]">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-[11px] text-[var(--color-stone)]">Rainfall</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)]" />
                      <span className="text-[11px] text-[var(--color-stone)]">Moisture</span>
                    </div>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={displayData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#E2725B" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#E2725B" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#059669" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        interval={forecastRange === '30d' ? 2 : 0}
                      />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                      />
                      <Tooltip content={<ForecastTooltip />} />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="temp"
                        stroke="#E2725B"
                        fill="url(#tempGradient)"
                        strokeWidth={2}
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="rain"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                        opacity={0.6}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="moisture"
                        stroke="#059669"
                        strokeWidth={2}
                        dot={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-[var(--color-stone)]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Confidence decreases beyond 14 days</span>
                  </div>
                  <div className="text-[var(--color-stone)]">
                    Updated: May 21, 10:42 AM
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Yield Prediction */}
          <div className="col-span-12 lg:col-span-8">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Yield Prediction</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">
                      Projected harvest with confidence intervals
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-[20px] font-semibold text-[var(--color-emerald)]">3.8 t/ha</p>
                      <p className="text-[11px] text-[var(--color-stone)]">Projected yield</p>
                    </div>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={yieldPredictionData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#059669" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
                      <XAxis 
                        dataKey="week" 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={35}
                      />
                      <Tooltip content={<YieldTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="upper"
                        stroke="none"
                        fill="url(#yieldGradient)"
                      />
                      <Area
                        type="monotone"
                        dataKey="lower"
                        stroke="none"
                        fill="#fff"
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#059669"
                        strokeWidth={2.5}
                        dot={false}
                        strokeDasharray="5 5"
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#059669"
                        strokeWidth={2.5}
                        dot={{ fill: '#059669', r: 4 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex items-center justify-center gap-4 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-[var(--color-emerald)]" />
                    <span className="text-[var(--color-stone)]">Actual</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 bg-[var(--color-emerald)] opacity-50" style={{ borderTop: '1px dashed' }} />
                    <span className="text-[var(--color-stone)]">Predicted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-2 bg-[var(--color-emerald)]/20" />
                    <span className="text-[var(--color-stone)]">Confidence Band (±10%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Growing Degree Days */}
          <div className="col-span-12 lg:col-span-4">
            <Card variant="bento" className="h-full">
              <CardContent className="p-5">
                <div className="mb-4">
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Heat Load Index</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">Thermal stress accumulation</p>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={gddData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gddGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FBBF24" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#FBBF24" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={35}
                      />
                      <Tooltip content={<GDDTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="accumulated"
                        stroke="#FBBF24"
                        fill="url(#gddGradient)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="optimal"
                        stroke="#78716C"
                        strokeWidth={1.5}
                        strokeDasharray="3 3"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[var(--color-stone)]">Accumulated</span>
                    <span className="font-semibold text-[var(--color-soil)]">885 GDD</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[var(--color-stone)]">Expected at harvest</span>
                    <span className="font-semibold text-[var(--color-soil)]">1,350 GDD</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[var(--color-emerald)]/10">
                    <Zap className="w-3.5 h-3.5 text-[var(--color-emerald)]" />
                    <span className="text-[11px] text-[var(--color-stone)]">Tracking above optimal curve</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Price Forecast */}
          <div className="col-span-12 lg:col-span-6">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Market Price Forecast</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">Projected maize prices (₦/tonne)</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--color-emerald)]/10">
                    <TrendingUp className="w-3.5 h-3.5 text-[var(--color-emerald)]" />
                    <span className="text-[12px] font-medium text-[var(--color-emerald)]">+12% trend</span>
                  </div>
                </div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceForecastData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#059669" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.04)" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                      />
                      <Tooltip content={<PriceTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#059669"
                        fill="url(#priceGradient)"
                        strokeWidth={2.5}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-black/[0.02]">
                  <p className="text-[12px] text-[var(--color-stone)]">
                    <span className="font-semibold text-[var(--color-soil)]">July-Aug</span> shows the strongest pricing window.
                    Consider strategic harvest timing for maximum revenue.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Season Planning */}
          <div className="col-span-12 lg:col-span-6">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="mb-4">
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Season Planning</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">Key milestones & response timing</p>
                </div>
                <div className="space-y-3">
                  <SeasonMilestone
                    icon={Sprout}
                    title="Recharge Window"
                    date="May 27-29"
                    status="upcoming"
                    description="Rain pulse expected, recharge pits for flowering stage"
                  />
                  <SeasonMilestone
                    icon={Droplets}
                    title="Critical Release Window"
                    date="Jun 1-4"
                    status="attention"
                    description="Heat wave expected, prioritize cistern release"
                  />
                  <SeasonMilestone
                    icon={Target}
                    title="Mid-Season Assessment"
                    date="Jun 10"
                    status="scheduled"
                    description="Evaluate canopy health and adjust pit mulch"
                  />
                  <SeasonMilestone
                    icon={Calendar}
                    title="Projected Harvest"
                    date="Jul 20-Aug 2"
                    status="projected"
                    description="Optimal timing based on heat load and market prices"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Weather Metric Card Component
interface WeatherMetricCardProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  subtext: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  color: string;
}

function WeatherMetricCard({ icon: Icon, label, value, subtext, trend, trendValue, color }: WeatherMetricCardProps) {
  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;
  const trendColor = trend === 'up' ? '#E2725B' : trend === 'down' ? '#059669' : '#78716C';
  
  return (
    <Card variant="bento">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div className="flex items-center gap-1" style={{ color: trendColor }}>
            <TrendIcon className="w-3.5 h-3.5" />
          </div>
        </div>
        <p className="text-[20px] font-semibold text-[var(--color-soil)] mb-0.5">{value}</p>
        <p className="text-[12px] text-[var(--color-stone)] mb-1">{label}</p>
        <p className="text-[11px] text-[var(--color-stone)]">{trendValue}</p>
      </CardContent>
    </Card>
  );
}

// Season Milestone Component
interface SeasonMilestoneProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  date: string;
  status: 'upcoming' | 'attention' | 'scheduled' | 'projected';
  description: string;
}

function SeasonMilestone({ icon: Icon, title, date, status, description }: SeasonMilestoneProps) {
  const statusColors = {
    upcoming: { bg: '#059669', text: '#059669' },
    attention: { bg: '#E2725B', text: '#E2725B' },
    scheduled: { bg: '#3B82F6', text: '#3B82F6' },
    projected: { bg: '#FBBF24', text: '#FBBF24' },
  };
  
  const statusColor = statusColors[status];
  
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/20">
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${statusColor.bg}15` }}
      >
        <Icon className="w-4 h-4" style={{ color: statusColor.text }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-[13px] font-semibold text-[var(--color-soil)]">{title}</h4>
          <span className="text-[11px] font-medium whitespace-nowrap" style={{ color: statusColor.text }}>
            {date}
          </span>
        </div>
        <p className="text-[11px] text-[var(--color-stone)]">{description}</p>
      </div>
    </div>
  );
}

// Custom Tooltips
function ForecastTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[140px]">
      <p className="font-semibold text-[12px] text-[var(--color-soil)] mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--color-stone)] capitalize">{entry.dataKey}</span>
            <span className="text-[11px] font-medium" style={{ color: entry.color }}>
              {entry.dataKey === 'temp' ? `${entry.value}°C` : 
               entry.dataKey === 'rain' ? `${entry.value}mm` : 
               `${entry.value}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function YieldTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[160px]">
      <p className="font-semibold text-[12px] text-[var(--color-soil)] mb-2">{label}</p>
      <div className="space-y-1">
        {payload.filter((p: any) => p.value !== null).map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--color-stone)] capitalize">{entry.dataKey}</span>
            <span className="text-[11px] font-medium text-[var(--color-emerald)]">
              {entry.value} kg/ha
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GDDTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[140px]">
      <p className="font-semibold text-[12px] text-[var(--color-soil)] mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--color-stone)] capitalize">{entry.dataKey}</span>
            <span className="text-[11px] font-medium" style={{ color: entry.color }}>
              {entry.value} GDD
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[120px]">
      <p className="font-semibold text-[12px] text-[var(--color-soil)] mb-2">{label}</p>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[var(--color-stone)]">Price</span>
        <span className="text-[12px] font-semibold text-[var(--color-emerald)]">
          ₦{payload[0].value}/tonne
        </span>
      </div>
    </div>
  );
}
