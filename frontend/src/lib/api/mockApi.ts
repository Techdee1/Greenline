/**
 * Green Line Mock API Service
 * Provides realistic mock data for the judge demo
 * This simulates the backend API responses
 */

import {
  Farm,
  SensorReading,
  RiskAssessment,
  Forecast,
  ForecastPoint,
  Recommendation,
  SimulationRequest,
  SimulationResult,
} from './types';

// ============================================================================
// Mock Data
// ============================================================================

const mockFarms: Farm[] = [
  {
    id: '1',
    name: "Musa's Zai Pit Unit",
    location: {
      region: 'Katsina State',
      country: 'Nigeria',
      coordinates: { latitude: 12.9881, longitude: 7.6005 },
    },
    cropType: 'Maize',
    areaHectares: 1.8,
    plantingDate: '2026-01-28',
    expectedHarvestDate: '2026-05-28',
    growthStage: 'FLOWERING',
    healthPercentage: 73,
    totalPlants: 1200,
    healthyPlants: 952,
    ownerId: 'user-1',
  },
  {
    id: '2',
    name: 'Ganin Gari Cooperative',
    location: {
      region: 'Kano State',
      country: 'Nigeria',
      coordinates: { latitude: 12.0022, longitude: 8.5920 },
    },
    cropType: 'Sorghum',
    areaHectares: 2.4,
    plantingDate: '2026-01-10',
    expectedHarvestDate: '2026-06-05',
    growthStage: 'VEGETATIVE',
    healthPercentage: 81,
    totalPlants: 1800,
    healthyPlants: 1522,
    ownerId: 'user-1',
  },
  {
    id: '3',
    name: 'Sahel Edge Pilot',
    location: {
      region: 'Sokoto State',
      country: 'Nigeria',
      coordinates: { latitude: 13.0059, longitude: 5.2476 },
    },
    cropType: 'Millet',
    areaHectares: 1.6,
    plantingDate: '2026-02-05',
    expectedHarvestDate: '2026-06-25',
    growthStage: 'GRAIN_FILL',
    healthPercentage: 69,
    totalPlants: 1400,
    healthyPlants: 910,
    ownerId: 'user-1',
  },
];

const mockSensorReadings: Record<string, SensorReading[]> = {
  '1': [
    {
      id: 's1',
      farmId: '1',
      sensorType: 'moisture',
      value: 33,
      unit: '%',
      status: 'low',
      timestamp: new Date().toISOString(),
      trend: 'down',
      optimalRange: { min: 35, max: 45 },
    },
    {
      id: 's2',
      farmId: '1',
      sensorType: 'temperature',
      value: 35,
      unit: '°C',
      status: 'critical',
      timestamp: new Date().toISOString(),
      trend: 'up',
      optimalRange: { min: 22, max: 30 },
    },
    {
      id: 's3',
      farmId: '1',
      sensorType: 'humidity',
      value: 42,
      unit: '%',
      status: 'moderate',
      timestamp: new Date().toISOString(),
      trend: 'down',
      optimalRange: { min: 55, max: 75 },
    },
    {
      id: 's4',
      farmId: '1',
      sensorType: 'rainfall',
      value: 0,
      unit: 'mm',
      status: 'low',
      timestamp: new Date().toISOString(),
      trend: 'stable',
      optimalRange: { min: 5, max: 20 },
    },
  ],
};

const mockRiskAssessment: Record<string, RiskAssessment> = {
  '1': {
    farmId: '1',
    overallRisk: 46,
    riskCategory: 'MODERATE',
    breakdown: [
      {
        type: 'WATER_STRESS',
        score: 62,
        trend: 'increasing',
        contributingFactors: ['Zero rainfall in 12 days', 'Root-zone moisture trending down'],
      },
      {
        type: 'HEAT_STRESS',
        score: 54,
        trend: 'increasing',
        contributingFactors: ['Heat index above 35°C', 'Clear skies through Day 5'],
      },
      {
        type: 'DISEASE_RISK',
        score: 18,
        trend: 'stable',
        contributingFactors: ['Low leaf wetness', 'Adequate airflow in pits'],
      },
    ],
    recommendations: [],
    timestamp: new Date().toISOString(),
    confidence: 91,
  },
};

// Generate 14-day forecast
function generateForecast(farmId: string): Forecast {
  const dataPoints: ForecastPoint[] = [];
  const today = new Date();
  
  const baseRisk = 28;
  const baseMoisture = 36;
  const baseTemperature = 33;
  
  const labels = ['Today', 'D+1', 'D+2', 'D+3', 'D+4', 'D+5', 'D+6', 'D+7', 'D+8', 'D+9', 'D+10', 'D+11', 'D+12', 'D+13'];
  
  let peakRiskDay = '';
  let peakRiskValue = 0;
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    // Create realistic variance - build up to peak stress around day 7-9
    const stressMultiplier = i < 7 ? 1 + (i * 0.15) : 1 + ((14 - i) * 0.12);
    const rainfall = i === 3 || i === 10 ? Math.random() * 15 + 5 : 0;
    
    const riskScore = Math.round(baseRisk * stressMultiplier + (Math.random() * 8 - 4));
    const soilMoisture = Math.round(baseMoisture - (i * 1.5) + (rainfall * 0.8) + (Math.random() * 4 - 2));
    const temperature = Math.round(baseTemperature + (i < 7 ? i * 0.5 : (14 - i) * 0.3) + (Math.random() * 2 - 1));
    
    if (riskScore > peakRiskValue) {
      peakRiskValue = riskScore;
      peakRiskDay = labels[i];
    }
    
    dataPoints.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dayLabel: labels[i],
      riskScore: Math.max(0, Math.min(100, riskScore)),
      soilMoisture: Math.max(0, Math.min(100, soilMoisture)),
      temperature: Math.max(15, Math.min(45, temperature)),
      rainfall: Math.max(0, rainfall),
      confidence: 95 - (i * 3),
    });
  }
  
  const averageRisk = Math.round(dataPoints.reduce((sum, p) => sum + p.riskScore, 0) / dataPoints.length);
  
  return {
    farmId,
    generatedAt: new Date().toISOString(),
    forecastDays: 14,
    dataPoints,
    summary: {
      averageRisk,
      peakRiskDay,
      peakRiskValue,
      trendDirection: peakRiskValue > 30 ? 'worsening' : 'stable',
    },
  };
}

const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    farmId: '1',
    severity: 'warning',
    title: 'Release cistern water in 48 hours',
    description: 'Root-zone moisture will drop below 30%. Early release protects flowering yield.',
    actionType: 'IRRIGATION',
    daysUntilDeadline: 2,
    impactPercent: 18,
    confidence: 88,
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: 'rec-2',
    farmId: '1',
    severity: 'warning',
    title: 'Heat wave expected in 5 days',
    description: 'Temperatures above 36°C for 4 days. Plan shade cover and staggered irrigation.',
    actionType: 'WEATHER_ALERT',
    daysUntilDeadline: 5,
    impactPercent: -9,
    confidence: 82,
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: 'rec-3',
    farmId: '1',
    severity: 'success',
    title: 'Zai pit retention performing well',
    description: 'Organic micro-climate is preserving moisture better than open soil baseline.',
    actionType: 'INSPECTION',
    confidence: 93,
    createdAt: new Date().toISOString(),
    status: 'acknowledged',
  },
];

// ============================================================================
// Simulation Logic
// ============================================================================

function simulateScenario(request: SimulationRequest): SimulationResult {
  const baseRisk = mockRiskAssessment[request.farmId]?.overallRisk || 15;
  
  const scenarioEffects: Record<string, { riskChange: number; yieldImpact: number; waterUsage: number; recommendations: string[] }> = {
    IRRIGATION: {
      riskChange: -8,
      yieldImpact: 12,
      waterUsage: 2500,
      recommendations: [
        'Apply 25mm of water through drip irrigation',
        'Best time: early morning (6-8 AM)',
        'Monitor soil moisture after 24 hours',
      ],
    },
    HEAVY_RAIN: {
      riskChange: 15,
      yieldImpact: -8,
      waterUsage: 0,
      recommendations: [
        'Ensure drainage channels are clear',
        'Monitor for waterlogging in low areas',
        'Check crops for disease signs after rain',
      ],
    },
    HEAT_WAVE: {
      riskChange: 25,
      yieldImpact: -15,
      waterUsage: 0,
      recommendations: [
        'Increase irrigation frequency by 30%',
        'Apply mulch to retain soil moisture',
        'Consider shade cloth for sensitive areas',
      ],
    },
    FERTILIZER: {
      riskChange: -3,
      yieldImpact: 18,
      waterUsage: 500,
      recommendations: [
        'Apply NPK 15-15-15 at 100kg/ha',
        'Best applied in the evening',
        'Water lightly after application',
      ],
    },
  };
  
  const effect = scenarioEffects[request.scenario];
  
  return {
    scenario: request.scenario,
    baselineRisk: baseRisk,
    predictedRisk: Math.max(0, Math.min(100, baseRisk + effect.riskChange)),
    riskChange: effect.riskChange,
    yieldImpact: effect.yieldImpact,
    waterUsage: effect.waterUsage,
    recommendations: effect.recommendations,
    confidence: 82 + Math.floor(Math.random() * 10),
    timestamp: new Date().toISOString(),
  };
}

// ============================================================================
// API Functions (simulated network calls)
// ============================================================================

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Farms
  getFarms: async (): Promise<Farm[]> => {
    await delay(300);
    return mockFarms;
  },
  
  getFarm: async (farmId: string): Promise<Farm | null> => {
    await delay(200);
    return mockFarms.find(f => f.id === farmId) || null;
  },
  
  // Sensors
  getSensorReadings: async (farmId: string): Promise<SensorReading[]> => {
    await delay(250);
    return mockSensorReadings[farmId] || [];
  },
  
  // Risk Assessment
  getRiskAssessment: async (farmId: string): Promise<RiskAssessment | null> => {
    await delay(300);
    return mockRiskAssessment[farmId] || null;
  },
  
  // Forecast
  getForecast: async (farmId: string): Promise<Forecast> => {
    await delay(400);
    return generateForecast(farmId);
  },
  
  // Recommendations
  getRecommendations: async (farmId: string): Promise<Recommendation[]> => {
    await delay(200);
    return mockRecommendations.filter(r => r.farmId === farmId);
  },
  
  acknowledgeRecommendation: async (recommendationId: string): Promise<void> => {
    await delay(150);
    const rec = mockRecommendations.find(r => r.id === recommendationId);
    if (rec) rec.status = 'acknowledged';
  },
  
  dismissRecommendation: async (recommendationId: string): Promise<void> => {
    await delay(150);
    const rec = mockRecommendations.find(r => r.id === recommendationId);
    if (rec) rec.status = 'dismissed';
  },
  
  // Simulation
  runSimulation: async (request: SimulationRequest): Promise<SimulationResult> => {
    await delay(800); // Longer delay to simulate ML model processing
    return simulateScenario(request);
  },
};
