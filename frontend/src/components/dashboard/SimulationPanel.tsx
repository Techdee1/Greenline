'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Droplets, CloudRain, Sun, Leaf, Play, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';
import { ScenarioType } from '@/lib/api';

interface SimulationScenario {
  id: ScenarioType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  impact: {
    yield: number; // -100 to +100 percent change
    risk: number;  // -100 to +100 percent change
    water: number; // change in liters/hectare
  };
}

const scenarios: SimulationScenario[] = [
  {
    id: 'IRRIGATION',
    label: 'Release Cistern Water',
    description: 'Micro-dose 25mm into pits',
    icon: Droplets,
    impact: { yield: 18, risk: -28, water: 2500 },
  },
  {
    id: 'HEAVY_RAIN',
    label: 'Rain Pulse',
    description: 'Simulate 40mm rainfall event',
    icon: CloudRain,
    impact: { yield: 4, risk: -10, water: 4000 },
  },
  {
    id: 'HEAT_WAVE',
    label: 'Heat Wave',
    description: '4 days of +5°C above normal',
    icon: Sun,
    impact: { yield: -9, risk: 26, water: -1500 },
  },
  {
    id: 'FERTILIZER',
    label: 'Zai Pit Mulch',
    description: 'Organic cover + compost',
    icon: Leaf,
    impact: { yield: 10, risk: -8, water: 0 },
  },
];

interface SimulationPanelProps {
  onRunSimulation?: (scenario: ScenarioType) => void;
  isLoading?: boolean;
}

export function SimulationPanel({ onRunSimulation, isLoading = false }: SimulationPanelProps) {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType | null>(null);
  const [simulationResult, setSimulationResult] = useState<SimulationScenario | null>(null);

  const handleRunSimulation = () => {
    if (selectedScenario) {
      const scenario = scenarios.find(s => s.id === selectedScenario);
      if (scenario) {
        setSimulationResult(scenario);
        onRunSimulation?.(selectedScenario);
      }
    }
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setSimulationResult(null);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">What-If Simulator</CardTitle>
          <CardDescription>Test actions with real farm signals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              const isSelected = selectedScenario === scenario.id;
              
              return (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all text-left ${
                    isSelected
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                      : 'border-[var(--color-border)] hover:border-[var(--color-bark)] hover:bg-[var(--color-dust)]/50'
                  }`}
                  disabled={isLoading}
                >
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-dust)]'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-[var(--color-soil)]">
                      {scenario.label}
                    </p>
                    <p className="text-xs text-[var(--color-bark)]">
                      {scenario.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-4">
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={handleRunSimulation}
              disabled={!selectedScenario || isLoading}
            >
              <Play className="h-4 w-4 mr-1" />
              Run Simulation
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              disabled={isLoading}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Results */}
      {simulationResult && (
        <Card variant="elevated" className="border-l-4 border-[var(--color-primary)]">
          <CardHeader>
            <CardTitle className="text-base">Simulation Results</CardTitle>
            <CardDescription>{simulationResult.label}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ImpactRow
                label="Yield Impact"
                value={simulationResult.impact.yield}
                suffix="%"
              />
              <ImpactRow
                label="Risk Change"
                value={simulationResult.impact.risk}
                suffix="%"
                inverse
              />
              <ImpactRow
                label="Water Balance"
                value={simulationResult.impact.water}
                suffix=" L/ha"
              />
            </div>
            
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-bark)]">
                💡 Recommendation: {getRecommendation(simulationResult)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface ImpactRowProps {
  label: string;
  value: number;
  suffix: string;
  inverse?: boolean;
}

function ImpactRow({ label, value, suffix, inverse = false }: ImpactRowProps) {
  const isPositive = inverse ? value < 0 : value > 0;
  const isNeutral = value === 0;
  
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[var(--color-bark)]">{label}</span>
      <div className="flex items-center gap-1">
        {!isNeutral && (
          isPositive ? (
            <TrendingUp className="h-4 w-4 text-[var(--color-healthy)]" />
          ) : (
            <TrendingDown className="h-4 w-4 text-[var(--color-critical)]" />
          )
        )}
        <Badge
          variant={isNeutral ? 'default' : isPositive ? 'healthy' : 'critical'}
          size="sm"
        >
          {value > 0 ? '+' : ''}{value}{suffix}
        </Badge>
      </div>
    </div>
  );
}

function getRecommendation(scenario: SimulationScenario): string {
  switch (scenario.id) {
    case 'IRRIGATION':
      return 'Release cistern water before sunrise to minimize evaporation.';
    case 'HEAVY_RAIN':
      return 'Keep zai pits open for capture. Clear overflow channels.';
    case 'HEAT_WAVE':
      return 'Deploy shade cloth and stagger releases to protect roots.';
    case 'FERTILIZER':
      return 'Add mulch after watering to lock moisture in place.';
    default:
      return 'Monitor conditions closely.';
  }
}

// Compact version for the sidebar
export function SimulationPanelCompact() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Quick Scenarios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {scenarios.slice(0, 4).map((scenario) => {
            const Icon = scenario.icon;
            return (
              <Button
                key={scenario.id}
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Icon className="h-4 w-4 mr-2" />
                {scenario.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
