'use client';

import { useState, useEffect } from 'react';
import { 
  AppLayout, 
  RiskGauge, 
  RiskBreakdown, 
  SensorCard, 
  ActionCenter,
  ForecastChart,
  InsightCard
} from '@/components/dashboard';
import { HolographicTwin, FarmDigitalTwin } from '@/components/3d';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useDashboardData, useRecommendations, ScenarioType } from '@/lib/api';
import { Loader2, Sparkles, Calendar, ArrowUpRight, Box, Cpu, Expand, X } from 'lucide-react';

export default function DashboardPage() {
  // State for ghost line on forecast
  const [ghostLineData, setGhostLineData] = useState<number[]>([]);
  const [ghostLineColor, setGhostLineColor] = useState<string>('#059669');
  const [show3DView, setShow3DView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Fetch dashboard data with React Query
  const farmId = '1'; // Default farm - Musa's Katsina farm unit
  const { farm, sensors, risk, forecast, isLoading, isError } = useDashboardData(farmId);
  const { data: recommendations } = useRecommendations(farmId);

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreen]);

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const handleActionSelect = (scenario: ScenarioType, data: number[]) => {
    setGhostLineData(data);
    // Set color based on scenario
    const colors: Record<string, string> = {
      IRRIGATION: '#3B82F6',
      FERTILIZER: '#059669',
      HEAVY_RAIN: '#8B5CF6',
      HEAT_WAVE: '#F59E0B',
    };
    setGhostLineColor(colors[scenario] || '#059669');
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--color-primary)]" />
            </div>
            <p className="text-[13px] text-[var(--color-stone)]">Loading farm data...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (isError || !farm.data) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-[var(--color-stone)]">Error loading farm data. Please try again.</p>
        </div>
      </AppLayout>
    );
  }

  const farmData = farm.data;
  const sensorData = sensors.data || [];
  const riskData = risk.data;
  const recommendationData = recommendations?.filter(r => r.status === 'pending') || [];

  // Get sensor values
  const moistureSensor = sensorData.find(s => s.sensorType === 'moisture');
  const tempSensor = sensorData.find(s => s.sensorType === 'temperature');
  const humiditySensor = sensorData.find(s => s.sensorType === 'humidity');

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header - Minimal */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-semibold text-[var(--color-soil)] tracking-tight">
              {farmData.name}
            </h1>
            <p className="text-[13px] text-[var(--color-stone)]">
              {farmData.location.region}, {farmData.location.country}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-[var(--color-sage)]/20 text-[var(--color-emerald)] text-[12px] font-medium">
              {farmData.healthPercentage}% Health
            </div>
          </div>
        </div>

        {/* Insight Card */}
        {recommendationData.length > 0 && (
          <InsightCard
            priority={recommendationData[0].severity === 'critical' ? 'critical' : recommendationData[0].severity === 'warning' ? 'warning' : 'opportunity'}
            title={recommendationData[0].title}
            description={recommendationData[0].description}
            daysUntil={recommendationData[0].daysUntilDeadline}
            impactPercent={recommendationData[0].impactPercent}
            confidence={recommendationData[0].confidence}
            action={{
              label: 'Take Action',
              onClick: () => console.log('Action clicked'),
            }}
          />
        )}

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          
          {/* Risk Gauge - Compact */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <Card variant="bento" className="h-full">
              <CardContent className="p-5 flex flex-col items-center justify-center h-full">
                <RiskGauge 
                  value={riskData?.overallRisk || 0} 
                  size="md"
                  variant="minimal"
                  confidence={87}
                />
              </CardContent>
            </Card>
          </div>

          {/* Holographic Digital Twin */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-5 row-span-2">
            <Card variant="bento" padding="none" className="h-full overflow-hidden">
              <div className="p-4 border-b border-black/[0.04]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[14px] font-semibold text-[var(--color-soil)]">
                      {show3DView ? 'Farm 3D View' : 'Field Twin'}
                    </h3>
                    <p className="text-[11px] text-[var(--color-stone)]">
                      {show3DView ? 'Interactive farm visualization' : 'Zai pit root-zone telemetry'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShow3DView(false)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        !show3DView 
                          ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                          : 'bg-black/[0.03] text-[var(--color-stone)] hover:bg-black/[0.05]'
                      }`}
                    >
                      <Cpu className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setShow3DView(true)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        show3DView 
                          ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                          : 'bg-black/[0.03] text-[var(--color-stone)] hover:bg-black/[0.05]'
                      }`}
                    >
                      <Box className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsFullscreen(true)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors bg-black/[0.03] text-[var(--color-stone)] hover:bg-black/[0.05] hover:text-[var(--color-soil)]"
                      title="Fullscreen"
                    >
                      <Expand className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="aspect-[4/3] bg-gradient-to-b from-[#FAFAFA] to-[#F4F3F2]">
                {show3DView ? (
                  <FarmDigitalTwin 
                    growthStage={farmData.healthPercentage / 100} 
                    healthPercentage={farmData.healthPercentage}
                    className="w-full h-full"
                  />
                ) : (
                  <HolographicTwin 
                    stressIndex={riskData?.overallRisk || 25}
                    className="w-full h-full"
                  />
                )}
              </div>
              <div className="p-4 border-t border-black/[0.04] flex items-center justify-between">
                <div className="text-[12px]">
                  <span className="text-[var(--color-stone)]">Healthy: </span>
                  <span className="font-semibold text-[var(--color-emerald)]">
                    {farmData.healthyPlants.toLocaleString()}
                  </span>
                  <span className="text-[var(--color-stone)]"> / {farmData.totalPlants.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => setShow3DView(!show3DView)}
                  className="flex items-center gap-1 text-[11px] text-[var(--color-primary)] font-medium hover:underline"
                >
                  {show3DView ? 'View Hologram' : 'View 3D'}
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </Card>
          </div>

          {/* Action Center */}
          <div className="col-span-12 lg:col-span-4 row-span-2">
            <Card variant="bento" className="h-full">
              <CardContent className="p-5">
                <ActionCenter onSelectAction={handleActionSelect} />
              </CardContent>
            </Card>
          </div>

          {/* Sensor Cards - Compact Row */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="grid grid-cols-1 gap-4">
              {moistureSensor && (
                <SensorCard
                  type="moisture"
                  value={moistureSensor.value}
                  unit={moistureSensor.unit}
                  status={moistureSensor.status}
                  statusLabel={moistureSensor.status}
                  minValue={moistureSensor.optimalRange.min}
                  maxValue={moistureSensor.optimalRange.max}
                  optimalRange={`${moistureSensor.optimalRange.min}-${moistureSensor.optimalRange.max}${moistureSensor.unit}`}
                  lastUpdated="2 min ago"
                  trend={moistureSensor.trend}
                />
              )}
              {tempSensor && (
                <SensorCard
                  type="temperature"
                  value={tempSensor.value}
                  unit={tempSensor.unit}
                  status={tempSensor.status}
                  statusLabel={tempSensor.status}
                  minValue={tempSensor.optimalRange.min}
                  maxValue={tempSensor.optimalRange.max}
                  optimalRange={`${tempSensor.optimalRange.min}-${tempSensor.optimalRange.max}${tempSensor.unit}`}
                  lastUpdated="2 min ago"
                  trend={tempSensor.trend}
                />
              )}
            </div>
          </div>

          {/* Forecast Chart - Full Width */}
          <div className="col-span-12">
            <ForecastChart 
              ghostLineData={ghostLineData.length > 0 ? ghostLineData : undefined}
              ghostLineColor={ghostLineColor}
            />
          </div>

          {/* Bottom Row - Growth Progress & Quick Stats */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <Card variant="bento">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[14px] font-semibold text-[var(--color-soil)]">Season Progress</h3>
                  <div className="flex items-center gap-1 text-[11px] text-[var(--color-stone)]">
                    <Calendar className="w-3 h-3" />
                    48 days left
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[12px] mb-1.5">
                      <span className="text-[var(--color-stone)]">Day 72 of 120</span>
                      <span className="font-semibold text-[var(--color-soil)]">60%</span>
                    </div>
                    <div className="h-2 bg-black/[0.04] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: '60%',
                          background: 'linear-gradient(90deg, #059669, #86EFAC)',
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-[var(--color-stone)]">
                    Est. harvest: April 15, 2026
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <Card variant="bento">
              <CardContent className="p-5">
                <h3 className="text-[14px] font-semibold text-[var(--color-soil)] mb-4">Stress Breakdown</h3>
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

          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <Card variant="bento">
              <CardContent className="p-5">
                <h3 className="text-[14px] font-semibold text-[var(--color-soil)] mb-3">Why This Alert?</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white/70 border border-black/[0.04]">
                    <p className="text-[12px] font-medium text-[var(--color-soil)]">Signal Stack</p>
                    <ul className="mt-2 text-[11px] text-[var(--color-stone)] space-y-1">
                      <li>0mm rainfall in 12 days</li>
                      <li>Root-zone moisture down 9% week-over-week</li>
                      <li>Heat index above 35°C for 4 days ahead</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-white/70 border border-black/[0.04]">
                    <p className="text-[12px] font-medium text-[var(--color-soil)]">Model Readout</p>
                    <p className="text-[11px] text-[var(--color-stone)] mt-1">
                      LSTM + Random Forest flags stress at Day 3 with 88% confidence.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <Card variant="bento">
              <CardContent className="p-5">
                <h3 className="text-[14px] font-semibold text-[var(--color-soil)] mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="primary" size="sm" className="text-[12px]">
                    Release Cistern Water
                  </Button>
                  <Button variant="outline" size="sm" className="text-[12px]">
                    View Pilot Report
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[12px]">
                    Export Data
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[12px]">
                    System Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fullscreen 3D Modal */}
        {isFullscreen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] bg-gradient-to-b from-[#FAFAFA] to-[#F4F3F2] rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-white/80 backdrop-blur-md border-b border-black/[0.04]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[16px] font-semibold text-[var(--color-soil)]">
                      {show3DView ? 'Farm 3D View' : 'Holographic Field Twin'}
                    </h3>
                    <p className="text-[12px] text-[var(--color-stone)]">
                      {farmData.name} · Stress Index: {riskData?.overallRisk || 25}%
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShow3DView(false)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        !show3DView 
                          ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                          : 'bg-black/[0.03] text-[var(--color-stone)] hover:bg-black/[0.05]'
                      }`}
                    >
                      <Cpu className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShow3DView(true)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        show3DView 
                          ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                          : 'bg-black/[0.03] text-[var(--color-stone)] hover:bg-black/[0.05]'
                      }`}
                    >
                      <Box className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors bg-black/[0.03] text-[var(--color-stone)] hover:bg-[var(--color-critical)]/10 hover:text-[var(--color-critical)]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3D Content */}
              <div className="w-full h-full pt-16">
                {show3DView ? (
                  <FarmDigitalTwin 
                    growthStage={farmData.healthPercentage / 100} 
                    healthPercentage={farmData.healthPercentage}
                    className="w-full h-full"
                  />
                ) : (
                  <HolographicTwin 
                    stressIndex={riskData?.overallRisk || 25}
                    className="w-full h-full"
                    showLabels={true}
                  />
                )}
              </div>

              {/* Footer Info */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-white/80 backdrop-blur-md border-t border-black/[0.04]">
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[var(--color-stone)]">Healthy Plants: </span>
                      <span className="font-semibold text-[var(--color-emerald)]">
                        {farmData.healthyPlants.toLocaleString()}
                      </span>
                      <span className="text-[var(--color-stone)]"> / {farmData.totalPlants.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[var(--color-stone)]">Health: </span>
                      <span className="font-semibold text-[var(--color-emerald)]">
                        {farmData.healthPercentage}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--color-stone)]">Growth Stage: </span>
                      <span className="font-semibold text-[var(--color-soil)]">
                        {farmData.growthStage.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[var(--color-stone)]">
                    Press ESC or click X to exit
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
