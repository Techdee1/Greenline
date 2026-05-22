'use client';

import { useState } from 'react';
import { AppLayout, RiskGauge, RiskBreakdown, InsightCard, ForecastChart } from '@/components/dashboard';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useDashboardData } from '@/lib/api';
import { 
  AlertTriangle, TrendingUp, TrendingDown, Droplets, Bug, 
  Cloud, Thermometer, Calendar, ChevronRight, Loader2, Shield
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';

// Historical risk data for trends
const historicalRiskData = [
  { date: 'Feb 3', overall: 22, drought: 28, pest: 10, disease: 8, weather: 20 },
  { date: 'Feb 10', overall: 28, drought: 34, pest: 12, disease: 10, weather: 24 },
  { date: 'Feb 17', overall: 36, drought: 44, pest: 16, disease: 12, weather: 30 },
  { date: 'Feb 24', overall: 42, drought: 52, pest: 18, disease: 14, weather: 35 },
  { date: 'Mar 2', overall: 46, drought: 60, pest: 20, disease: 16, weather: 40 },
  { date: 'Mar 9', overall: 41, drought: 54, pest: 18, disease: 14, weather: 34 },
  { date: 'Mar 16', overall: 38, drought: 48, pest: 16, disease: 12, weather: 30 },
];

// Risk factors with details
const riskFactors = [
  {
    id: 1,
    category: 'Water Stress',
    icon: Droplets,
    severity: 'high',
    score: 62,
    trend: 'up',
    description: 'Root-zone moisture 9% below optimal, 12 days without rain',
    impact: 'Potential 12-18% yield loss if untreated',
    timeframe: 'Next 5 days critical',
    color: '#E2725B',
  },
  {
    id: 2,
    category: 'Heat Stress',
    icon: Thermometer,
    severity: 'moderate',
    score: 54,
    trend: 'up',
    description: 'Heat index above 35°C with clear skies forecasted',
    impact: 'Higher evapotranspiration and crop stress',
    timeframe: 'Next 4-6 days',
    color: '#F59E0B',
  },
  {
    id: 3,
    category: 'Pest Pressure',
    icon: Bug,
    severity: 'low',
    score: 26,
    trend: 'stable',
    description: 'Low early activity in nearby plots, no active outbreaks',
    impact: 'Minimal impact expected with scouting',
    timeframe: 'Monitor weekly',
    color: '#FBBF24',
  },
  {
    id: 4,
    category: 'Disease Risk',
    icon: AlertTriangle,
    severity: 'low',
    score: 18,
    trend: 'down',
    description: 'Low humidity reduces fungal disease probability',
    impact: 'Minimal impact expected',
    timeframe: 'Continue monitoring',
    color: '#86EFAC',
  },
];

// Mitigation strategies
const mitigationStrategies = [
  {
    id: 1,
    title: 'Release Cistern Water',
    priority: 'critical',
    description: 'Micro-dose 25mm into zai pits within 48 hours',
    cost: '₦18,000',
    timeToImplement: '1-2 days',
    effectiveness: 90,
  },
  {
    id: 2,
    title: 'Shade & Mulch',
    priority: 'high',
    description: 'Apply organic mulch and temporary shade to reduce heat load',
    cost: '₦12,000',
    timeToImplement: '2-3 days',
    effectiveness: 84,
  },
  {
    id: 3,
    title: 'Targeted Scouting',
    priority: 'medium',
    description: 'Scout for pests and apply bio-control if thresholds are reached',
    cost: '₦8,000',
    timeToImplement: '3-5 days',
    effectiveness: 76,
  },
];

export default function RiskAnalysisPage() {
  const farmId = '1';
  const { farm, risk, isLoading } = useDashboardData(farmId);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--color-primary)]" />
            </div>
            <p className="text-[13px] text-[var(--color-stone)]">Loading risk analysis...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const farmData = farm.data;
  const riskData = risk.data;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-semibold text-[var(--color-soil)] tracking-tight">
              Stress Analysis
            </h1>
            <p className="text-[13px] text-[var(--color-stone)]">
              Explainable stress signals and response playbook
            </p>
          </div>
          <div className="flex items-center gap-2">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range as any)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                  selectedTimeRange === range
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-black/[0.03] text-[var(--color-stone)] hover:bg-black/[0.06]'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Critical Alert */}
        {riskData && riskData.overallRisk > 40 && (
          <InsightCard
            priority="critical"
            title="High Stress Alert"
            description="Multiple signals show root-zone stress building quickly"
            daysUntil={0}
            impactPercent={-12}
            confidence={87}
            action={{
              label: 'View Response Plan',
              onClick: () => console.log('View mitigation'),
            }}
          />
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          
          {/* Overall Risk Score */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <Card variant="bento" className="h-full">
              <CardContent className="p-5 flex flex-col items-center justify-center h-full">
                <RiskGauge 
                  value={riskData?.overallRisk || 0} 
                  size="md"
                  variant="minimal"
                  confidence={89}
                />
                <div className="mt-3 text-center">
                  <p className="text-[11px] text-[var(--color-stone)]">
                    Updated 5 min ago
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-9">
            <div className="grid grid-cols-3 gap-4">
              <Card variant="bento">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-[var(--color-primary)]" />
                    </div>
                    <TrendingDown className="w-4 h-4 text-[var(--color-emerald)]" />
                  </div>
                  <p className="text-[20px] font-semibold text-[var(--color-soil)]">3</p>
                  <p className="text-[12px] text-[var(--color-stone)]">Active Signals</p>
                </CardContent>
              </Card>
              
              <Card variant="bento">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  <p className="text-[20px] font-semibold text-[var(--color-soil)]">65%</p>
                  <p className="text-[12px] text-[var(--color-stone)]">Peak Stress</p>
                </CardContent>
              </Card>
              
              <Card variant="bento">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-emerald)]/10 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-[var(--color-emerald)]" />
                    </div>
                  </div>
                  <p className="text-[20px] font-semibold text-[var(--color-soil)]">7 days</p>
                  <p className="text-[12px] text-[var(--color-stone)]">Response Window</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Historical Risk Trends */}
          <div className="col-span-12 lg:col-span-8">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Stress Trends</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">Historical stress progression</p>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={historicalRiskData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="overallGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#E2725B" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#E2725B" stopOpacity={0} />
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
                        width={30}
                      />
                      <Tooltip content={<RiskTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="overall"
                        stroke="#E2725B"
                        fill="url(#overallGradient)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="drought"
                        stroke="#3B82F6"
                        strokeWidth={1.5}
                        dot={false}
                        strokeOpacity={0.7}
                      />
                      <Line
                        type="monotone"
                        dataKey="pest"
                        stroke="#FBBF24"
                        strokeWidth={1.5}
                        dot={false}
                        strokeOpacity={0.7}
                      />
                      <Line
                        type="monotone"
                        dataKey="disease"
                        stroke="#8B5CF6"
                        strokeWidth={1.5}
                        dot={false}
                        strokeOpacity={0.7}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Breakdown */}
          <div className="col-span-12 lg:col-span-4">
            <Card variant="bento" className="h-full">
              <CardContent className="p-5">
                <h3 className="text-[15px] font-semibold text-[var(--color-soil)] mb-4">Stress Breakdown</h3>
                {riskData && (
                  <RiskBreakdown
                    items={riskData.breakdown.map(b => ({
                      label: b.type.replace('_', ' '),
                      value: b.score,
                      confidence: 85 + Math.floor(Math.random() * 10),
                    }))}
                    size="sm"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Risk Factors Detail */}
          <div className="col-span-12">
            <Card variant="bento">
              <CardContent className="p-5">
                <h3 className="text-[15px] font-semibold text-[var(--color-soil)] mb-4">Stress Signals</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {riskFactors.map((factor) => (
                    <RiskFactorCard key={factor.id} factor={factor} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mitigation Strategies */}
          <div className="col-span-12">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Response Playbook</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">Recommended actions to protect yield</p>
                  </div>
                  <Button variant="primary" size="sm">
                    Deploy Response
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {mitigationStrategies.map((strategy) => (
                    <MitigationCard key={strategy.id} strategy={strategy} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Risk Factor Card Component
interface RiskFactorCardProps {
  factor: typeof riskFactors[0];
}

function RiskFactorCard({ factor }: RiskFactorCardProps) {
  const Icon = factor.icon;
  const TrendIcon = factor.trend === 'up' ? TrendingUp : factor.trend === 'down' ? TrendingDown : null;
  
  return (
    <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${factor.color}15`, color: factor.color }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-semibold text-[var(--color-soil)]">{factor.category}</h4>
            <p className="text-[11px] text-[var(--color-stone)]">{factor.timeframe}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {TrendIcon && (
            <TrendIcon 
              className="w-4 h-4" 
              style={{ 
                color: factor.trend === 'up' ? '#E2725B' : '#059669' 
              }} 
            />
          )}
          <span 
            className="text-[16px] font-semibold"
            style={{ color: factor.color }}
          >
            {factor.score}%
          </span>
        </div>
      </div>
      <p className="text-[12px] text-[var(--color-stone)] mb-2">{factor.description}</p>
      <div className="flex items-start gap-1.5 p-2 rounded-lg bg-black/[0.02]">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
        <p className="text-[11px] text-[var(--color-stone)]">{factor.impact}</p>
      </div>
    </div>
  );
}

// Mitigation Strategy Card
interface MitigationCardProps {
  strategy: typeof mitigationStrategies[0];
}

function MitigationCard({ strategy }: MitigationCardProps) {
  const priorityColors = {
    critical: '#E2725B',
    high: '#F59E0B',
    medium: '#FBBF24',
  };
  
  return (
    <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-[14px] font-semibold text-[var(--color-soil)]">{strategy.title}</h4>
          </div>
          <div 
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{ 
              backgroundColor: `${priorityColors[strategy.priority as keyof typeof priorityColors]}15`,
              color: priorityColors[strategy.priority as keyof typeof priorityColors],
            }}
          >
            {strategy.priority.toUpperCase()} PRIORITY
          </div>
        </div>
        <div className="text-right">
          <p className="text-[16px] font-semibold text-[var(--color-emerald)]">{strategy.effectiveness}%</p>
          <p className="text-[10px] text-[var(--color-stone)]">Effective</p>
        </div>
      </div>
      <p className="text-[12px] text-[var(--color-stone)] mb-3">{strategy.description}</p>
      <div className="flex items-center justify-between text-[11px]">
        <div>
          <span className="text-[var(--color-stone)]">Cost: </span>
          <span className="font-medium text-[var(--color-soil)]">{strategy.cost}</span>
        </div>
        <div>
          <span className="text-[var(--color-stone)]">Time: </span>
          <span className="font-medium text-[var(--color-soil)]">{strategy.timeToImplement}</span>
        </div>
      </div>
      <button className="w-full mt-3 py-2 rounded-lg bg-[var(--color-primary)] text-white text-[12px] font-medium hover:bg-[var(--color-primary)]/90 transition-colors flex items-center justify-center gap-1">
        Deploy
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// Custom tooltip for risk trends chart
function RiskTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[160px]">
      <p className="font-semibold text-[13px] text-[var(--color-soil)] mb-2">{label}</p>
      <div className="space-y-1.5">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-[11px] text-[var(--color-stone)] capitalize">{entry.dataKey}</span>
            </div>
            <span className="text-[11px] font-medium" style={{ color: entry.color }}>{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
