'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/dashboard';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useDashboardData } from '@/lib/api';
import {
  FileText, Download, Calendar, TrendingUp, TrendingDown,
  Target, Droplets, DollarSign, Zap, FileBarChart,
  FileSpreadsheet, FilePieChart, Share2, Printer,
  CheckCircle2, Clock, AlertCircle, Loader2, BarChart3,
  PieChart, LineChart as LineChartIcon, Activity, Gauge,
  type LucideIcon
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Report types
const reportTypes = [
  {
    id: 'weekly',
    name: 'Pilot Weekly Summary',
    icon: Calendar,
    description: 'Last 7 days of pilot signals',
    generationTime: '~2 min',
    color: '#3B82F6',
  },
  {
    id: 'monthly',
    name: 'LGA Monthly Brief',
    icon: FileBarChart,
    description: 'Regional trends and performance',
    generationTime: '~5 min',
    color: '#059669',
  },
  {
    id: 'seasonal',
    name: 'Seasonal Resilience',
    icon: FilePieChart,
    description: 'Water + yield resilience impact',
    generationTime: '~8 min',
    color: '#F59E0B',
  },
  {
    id: 'custom',
    name: 'Custom Pilot Report',
    icon: FileSpreadsheet,
    description: 'Select date range & metrics',
    generationTime: 'Variable',
    color: '#E2725B',
  },
];

// Performance metrics comparison
const performanceData = [
  { metric: 'Yield', current: 3800, target: 3600, previous: 3200, unit: 'kg/ha' },
  { metric: 'Water Efficiency', current: 86, target: 82, previous: 78, unit: '%' },
  { metric: 'Cost per Hectare', current: 43450, target: 50000, previous: 52000, unit: '₦' },
  { metric: 'Stress Index', current: 46, target: 55, previous: 62, unit: '%' },
  { metric: 'Cistern Releases', current: 9, target: 12, previous: 14, unit: 'times' },
];

// Monthly trend data
const monthlyTrendData = [
  { month: 'Dec', yield: 2800, cost: 58000, revenue: 760000 },
  { month: 'Jan', yield: 3200, cost: 54000, revenue: 896000 },
  { month: 'Feb', yield: 3500, cost: 50000, revenue: 980000 },
  { month: 'Mar', yield: 3700, cost: 46500, revenue: 1036000 },
  { month: 'Apr', yield: 3800, cost: 43450, revenue: 1064000 },
  { month: 'May', yield: 3900, cost: 43000, revenue: 1092000 },
];

// Resource distribution
const resourceDistribution = [
  { name: 'Cisterns', value: 45, color: '#3B82F6' },
  { name: 'Sensors', value: 18, color: '#059669' },
  { name: 'Installation', value: 15, color: '#F59E0B' },
  { name: 'Training', value: 12, color: '#E2725B' },
  { name: 'Operations', value: 10, color: '#78716C' },
];

// Performance radar data
const performanceRadarData = [
  { category: 'Yield', current: 88, industry: 75 },
  { category: 'Efficiency', current: 86, industry: 72 },
  { category: 'Resilience', current: 92, industry: 68 },
  { category: 'Cost Control', current: 84, industry: 70 },
  { category: 'Risk Mgmt', current: 80, industry: 66 },
];

// Generated reports history
const generatedReports = [
  {
    id: 1,
    name: 'May 2026 Pilot Brief',
    type: 'Monthly',
    date: 'May 20, 2026',
    size: '2.1 MB',
    format: 'PDF',
    status: 'ready',
  },
  {
    id: 2,
    name: 'Katsina Pilot Impact',
    type: 'Seasonal',
    date: 'May 12, 2026',
    size: '3.2 MB',
    format: 'PDF',
    status: 'ready',
  },
  {
    id: 3,
    name: 'Water Release Log - May',
    type: 'Custom',
    date: 'May 15, 2026',
    size: '1.1 MB',
    format: 'Excel',
    status: 'ready',
  },
  {
    id: 4,
    name: 'Weekly Summary - Week 20',
    type: 'Weekly',
    date: 'May 18, 2026',
    size: '812 KB',
    format: 'PDF',
    status: 'ready',
  },
  {
    id: 5,
    name: 'Stress Alerts - April',
    type: 'Custom',
    date: 'May 2, 2026',
    size: '1.4 MB',
    format: 'PDF',
    status: 'archived',
  },
  {
    id: 6,
    name: 'Yield Forecast - Q2',
    type: 'Custom',
    date: 'Apr 28, 2026',
    size: '930 KB',
    format: 'Excel',
    status: 'archived',
  },
];

export default function ReportsPage() {
  const farmId = '1';
  const { farm, isLoading } = useDashboardData(farmId);
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--color-primary)]" />
            </div>
            <p className="text-[13px] text-[var(--color-stone)]">Loading reports...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const handleGenerateReport = (typeId: string) => {
    setSelectedReportType(typeId);
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setSelectedReportType(null);
    }, 3000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-semibold text-[var(--color-soil)] tracking-tight">
              Pilot Reports & Analytics
            </h1>
            <p className="text-[13px] text-[var(--color-stone)]">
              Impact insights, performance analysis, and exports
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </Button>
            <Button variant="primary" size="sm">
              <Download className="w-3.5 h-3.5" />
              Export All
            </Button>
          </div>
        </div>

        {/* Report Type Selection */}
        <div>
            <h2 className="text-[15px] font-semibold text-[var(--color-soil)] mb-3">
            Generate New Report
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTypes.map((type) => (
              <ReportTypeCard
                key={type.id}
                type={type}
                onGenerate={handleGenerateReport}
                isGenerating={isGenerating && selectedReportType === type.id}
              />
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          
          {/* Performance Metrics */}
          <div className="col-span-12 lg:col-span-8">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Performance Metrics</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">
                      Current vs target vs previous period
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {performanceData.map((metric) => (
                    <PerformanceMetricRow key={metric.metric} metric={metric} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="col-span-12 lg:col-span-4">
            <div className="space-y-4">
              <QuickStatCard
                icon={Target}
                label="Pilot Reports"
                value="12"
                change="+4 this month"
                trend="up"
                color="#059669"
              />
              <QuickStatCard
                icon={TrendingUp}
                label="Resilience Index"
                value="86%"
                change="+6% vs last period"
                trend="up"
                color="#059669"
              />
              <QuickStatCard
                icon={DollarSign}
                label="Cost Savings"
                value="₦520,000"
                change="This season"
                trend="positive"
                color="#059669"
              />
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="col-span-12 lg:col-span-8">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">6-Month Trends</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">
                      Yield, cost & revenue analysis
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)]" />
                      <span className="text-[11px] text-[var(--color-stone)]">Yield</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/[0.03]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                      <span className="text-[11px] text-[var(--color-stone)]">Cost</span>
                    </div>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrendData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#059669" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#E2725B" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#E2725B" stopOpacity={0.05} />
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
                        yAxisId="left"
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={35}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: '#78716C', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={35}
                      />
                      <Tooltip content={<TrendTooltip />} />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="yield"
                        stroke="#059669"
                        fill="url(#yieldGradient)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="cost"
                        stroke="#E2725B"
                        strokeWidth={2}
                        dot={{ fill: '#E2725B', r: 3 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Radar */}
          <div className="col-span-12 lg:col-span-4">
            <Card variant="bento" className="h-full">
              <CardContent className="p-5">
                <div className="mb-4">
                  <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Resilience Index</h3>
                  <p className="text-[12px] text-[var(--color-stone)]">vs Regional Avg</p>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={performanceRadarData}>
                      <PolarGrid stroke="rgba(0,0,0,0.1)" />
                      <PolarAngleAxis 
                        dataKey="category" 
                        tick={{ fill: '#78716C', fontSize: 10 }}
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]}
                        tick={{ fill: '#78716C', fontSize: 9 }}
                      />
                      <Radar
                        name="Green Line"
                        dataKey="current"
                        stroke="#059669"
                        fill="#059669"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Regional Avg"
                        dataKey="industry"
                        stroke="#78716C"
                        fill="#78716C"
                        fillOpacity={0.1}
                        strokeWidth={1.5}
                        strokeDasharray="5 5"
                      />
                      <Legend 
                        wrapperStyle={{ fontSize: '11px' }}
                        iconType="circle"
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resource Distribution */}
          <div className="col-span-12 lg:col-span-5">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="mb-4">
                  <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Cost Distribution</h3>
                  <p className="text-[12px] text-[var(--color-stone)]">Pilot expenses breakdown</p>
                </div>
                <div className="flex items-center justify-center h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={resourceDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {resourceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {resourceDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[11px] text-[var(--color-stone)]">{item.name}</span>
                      <span className="text-[11px] font-medium text-[var(--color-soil)] ml-auto">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generated Reports List */}
          <div className="col-span-12 lg:col-span-7">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--color-soil)]">Generated Reports</h3>
                    <p className="text-[12px] text-[var(--color-stone)]">Download or share previous reports</p>
                  </div>
                  <button className="text-[12px] text-[var(--color-primary)] font-medium hover:underline">
                    View All
                  </button>
                </div>
                <div className="space-y-2">
                  {generatedReports.slice(0, 5).map((report) => (
                    <ReportListItem key={report.id} report={report} />
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

// Report Type Card Component
interface ReportTypeCardProps {
  type: typeof reportTypes[0];
  onGenerate: (typeId: string) => void;
  isGenerating: boolean;
}

function ReportTypeCard({ type, onGenerate, isGenerating }: ReportTypeCardProps) {
  const Icon = type.icon;
  
  return (
    <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow">
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
        style={{ backgroundColor: `${type.color}15` }}
      >
        <Icon className="w-5 h-5" style={{ color: type.color }} />
      </div>
      <h3 className="text-[14px] font-semibold text-[var(--color-soil)] mb-1">
        {type.name}
      </h3>
      <p className="text-[11px] text-[var(--color-stone)] mb-3">{type.description}</p>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 text-[10px] text-[var(--color-stone)]">
          <Clock className="w-3 h-3" />
          {type.generationTime}
        </div>
      </div>
      <button
        onClick={() => onGenerate(type.id)}
        disabled={isGenerating}
        className="w-full py-2 rounded-lg text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ 
          backgroundColor: type.color,
          color: 'white',
        }}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Zap className="w-3.5 h-3.5" />
            Generate
          </>
        )}
      </button>
    </div>
  );
}

// Performance Metric Row
interface PerformanceMetricRowProps {
  metric: typeof performanceData[0];
}

function PerformanceMetricRow({ metric }: PerformanceMetricRowProps) {
  const vsTarget = ((metric.current - metric.target) / metric.target * 100).toFixed(1);
  const vsPrevious = ((metric.current - metric.previous) / metric.previous * 100).toFixed(1);
  const isPositive = metric.metric === 'Cost per Hectare' || metric.metric === 'Stress Index' 
    ? metric.current < metric.target 
    : metric.current > metric.target;
  
  return (
    <div className="p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/20">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-semibold text-[var(--color-soil)]">{metric.metric}</span>
        <div className="flex items-center gap-1.5">
          {isPositive ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-emerald)]" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-[11px]">
        <div>
          <p className="text-[var(--color-stone)] mb-0.5">Current</p>
          <p className="text-[16px] font-semibold text-[var(--color-soil)]">
            {metric.unit === '$' && '$'}{metric.unit === '₦' && '₦'}{metric.current}{metric.unit !== '$' && metric.unit !== '₦' && metric.unit}
          </p>
        </div>
        <div>
          <p className="text-[var(--color-stone)] mb-0.5">Target</p>
          <p className="text-[14px] font-medium text-[var(--color-stone)]">
            {metric.unit === '$' && '$'}{metric.unit === '₦' && '₦'}{metric.target}{metric.unit !== '$' && metric.unit !== '₦' && metric.unit}
          </p>
        </div>
        <div>
          <p className="text-[var(--color-stone)] mb-0.5">Previous</p>
          <p className="text-[14px] font-medium text-[var(--color-stone)]">
            {metric.unit === '$' && '$'}{metric.unit === '₦' && '₦'}{metric.previous}{metric.unit !== '$' && metric.unit !== '₦' && metric.unit}
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 text-[10px]">
        <span className={`font-medium ${parseFloat(vsTarget) > 0 ? 'text-[var(--color-emerald)]' : 'text-[var(--color-primary)]'}`}>
          {vsTarget}% vs target
        </span>
        <span className="text-[var(--color-stone)]">•</span>
        <span className={`font-medium ${parseFloat(vsPrevious) > 0 ? 'text-[var(--color-emerald)]' : 'text-[var(--color-primary)]'}`}>
          {vsPrevious}% vs previous
        </span>
      </div>
    </div>
  );
}

// Quick Stat Card
interface QuickStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'positive';
  color: string;
}

function QuickStatCard({ icon: Icon, label, value, change, trend, color }: QuickStatCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : TrendingUp;
  
  return (
    <Card variant="bento">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <div style={{ color }}>
              <Icon className="w-[18px] h-[18px]" />
            </div>
          </div>
          <div style={{ color }}>
            <TrendIcon className="w-4 h-4" />
          </div>
        </div>
        <p className="text-[20px] font-semibold text-[var(--color-soil)] mb-0.5">{value}</p>
        <p className="text-[12px] text-[var(--color-stone)] mb-1">{label}</p>
        <p className="text-[11px] text-[var(--color-stone)]">{change}</p>
      </CardContent>
    </Card>
  );
}

// Report List Item
interface ReportListItemProps {
  report: typeof generatedReports[0];
}

function ReportListItem({ report }: ReportListItemProps) {
  const statusConfig = {
    ready: { icon: CheckCircle2, color: '#059669', bg: '#05966915' },
    archived: { icon: Clock, color: '#78716C', bg: '#78716C15' },
  };
  
  const config = statusConfig[report.status as keyof typeof statusConfig];
  const StatusIcon = config.icon;
  
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-colors group">
      <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
        <FileText className="w-4 h-4 text-[var(--color-primary)]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[var(--color-soil)] truncate">{report.name}</p>
        <div className="flex items-center gap-2 text-[11px] text-[var(--color-stone)]">
          <span>{report.type}</span>
          <span>•</span>
          <span>{report.date}</span>
          <span>•</span>
          <span>{report.size}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div 
          className="px-2 py-1 rounded-full text-[10px] font-medium"
          style={{ backgroundColor: config.bg, color: config.color }}
        >
          {report.format}
        </div>
        <button className="w-8 h-8 rounded-lg bg-black/[0.03] hover:bg-black/[0.06] flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
          <Download className="w-3.5 h-3.5 text-[var(--color-stone)]" />
        </button>
        <button className="w-8 h-8 rounded-lg bg-black/[0.03] hover:bg-black/[0.06] flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
          <Share2 className="w-3.5 h-3.5 text-[var(--color-stone)]" />
        </button>
      </div>
    </div>
  );
}

// Custom Tooltips
function TrendTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 min-w-[140px]">
      <p className="font-semibold text-[12px] text-[var(--color-soil)] mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--color-stone)] capitalize">{entry.dataKey}</span>
            <span className="text-[11px] font-medium" style={{ color: entry.color }}>
              {entry.dataKey === 'cost' ? `₦${entry.value}` : 
               entry.dataKey === 'revenue' ? `₦${entry.value}` :
               `${entry.value} kg/ha`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PieTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3">
      <p className="font-semibold text-[12px] text-[var(--color-soil)] mb-1">{payload[0].name}</p>
      <p className="text-[14px] font-semibold" style={{ color: payload[0].payload.color }}>
        {payload[0].value}%
      </p>
    </div>
  );
}
