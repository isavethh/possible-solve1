/**
 * PULSE DENGUE - Simulation Engine
 * Generates realistic data for demonstration purposes
 * MIT Solve Future Health Challenge 2026
 */

const PulseDengueSimulator = {
    // Zone configuration
    zones: {
        norte: {
            name: 'Zona Norte',
            baseRisk: 0.7,
            pharmacies: ['Farmacia San Martín', 'Farmacia Bolivia', 'Farmacia del Norte', 'Farmacia Plan 3000', 'Farmacia Villa 1ro de Mayo'],
            population: 250000,
            color: '#FF4444'
        },
        este: {
            name: 'Zona Este',
            baseRisk: 0.45,
            pharmacies: ['Farmacia del Pueblo', 'Farmacia Oriental', 'Farmacia Los Mangales', 'Farmacia Pampa'],
            population: 180000,
            color: '#FFD700'
        },
        centro: {
            name: 'Zona Centro',
            baseRisk: 0.3,
            pharmacies: ['Farmacia Central', 'Farmacia Casco Viejo', 'Farmacia Plaza', 'Farmacia Monseñor', 'Farmacia Equipetrol'],
            population: 150000,
            color: '#FFD700'
        },
        sur: {
            name: 'Zona Sur',
            baseRisk: 0.15,
            pharmacies: ['Farmacia La Paz', 'Farmacia Sur', 'Farmacia Urbari'],
            population: 120000,
            color: '#00E676'
        },
        oeste: {
            name: 'Zona Oeste',
            baseRisk: 0.12,
            pharmacies: ['Farmacia Guaraní', 'Farmacia El Cristo', 'Farmacia Oeste'],
            population: 100000,
            color: '#00E676'
        }
    },

    // Weather conditions (affects mosquito breeding)
    weather: {
        temperature: 31, // Celsius
        humidity: 78, // Percentage
        rainfall: 45, // mm last 7 days
        forecast: 'Lluvias intermitentes próximos 10 días'
    },

    // Historical data patterns (for comparison)
    historicalBaseline: {
        feverMeds: 180, // daily average
        repellents: 65,
        ors: 45,
        symptomInquiries: 25
    },

    /**
     * Generate pharmacy report data
     */
    generatePharmacyReport(pharmacyName, zone) {
        const zoneConfig = this.zones[zone];
        const riskFactor = zoneConfig.baseRisk + (Math.random() * 0.2 - 0.1);
        
        // Higher risk = higher sales
        const feverMultiplier = 1 + (riskFactor * 1.5);
        const repellentMultiplier = 1 + (riskFactor * 2);
        const orsMultiplier = 1 + (riskFactor * 1.2);
        
        return {
            pharmacy: pharmacyName,
            zone: zone,
            zoneName: zoneConfig.name,
            timestamp: new Date().toISOString(),
            
            // Sales data
            feverMeds: {
                count: Math.round(this.historicalBaseline.feverMeds * feverMultiplier / 20),
                percentChange: Math.round((feverMultiplier - 1) * 100),
                trend: this.getTrend(feverMultiplier)
            },
            repellents: {
                count: Math.round(this.historicalBaseline.repellents * repellentMultiplier / 20),
                percentChange: Math.round((repellentMultiplier - 1) * 100),
                trend: this.getTrend(repellentMultiplier)
            },
            ors: {
                count: Math.round(this.historicalBaseline.ors * orsMultiplier / 20),
                percentChange: Math.round((orsMultiplier - 1) * 100),
                trend: this.getTrend(orsMultiplier)
            },
            
            // Symptom inquiries
            symptoms: {
                fever: Math.round(Math.random() * 10 * riskFactor),
                headache: Math.round(Math.random() * 8 * riskFactor),
                bodyPain: Math.round(Math.random() * 7 * riskFactor),
                rash: Math.round(Math.random() * 3 * riskFactor),
                eyePain: Math.round(Math.random() * 4 * riskFactor)
            }
        };
    },

    /**
     * Generate zone risk prediction
     */
    generateZonePrediction(zone) {
        const zoneConfig = this.zones[zone];
        const weatherFactor = this.calculateWeatherFactor();
        const baseRisk = zoneConfig.baseRisk;
        
        // Calculate risk for different time horizons
        const risk7Days = Math.min(0.95, baseRisk * weatherFactor * (1 + Math.random() * 0.15));
        const risk14Days = Math.min(0.95, risk7Days * 0.85);
        const risk21Days = Math.min(0.95, risk14Days * 0.75);
        
        return {
            zone: zone,
            zoneName: zoneConfig.name,
            population: zoneConfig.population,
            
            predictions: {
                days7: {
                    probability: Math.round(risk7Days * 100),
                    level: this.getRiskLevel(risk7Days),
                    confidence: Math.round(85 + Math.random() * 10)
                },
                days14: {
                    probability: Math.round(risk14Days * 100),
                    level: this.getRiskLevel(risk14Days),
                    confidence: Math.round(75 + Math.random() * 15)
                },
                days21: {
                    probability: Math.round(risk21Days * 100),
                    level: this.getRiskLevel(risk21Days),
                    confidence: Math.round(65 + Math.random() * 15)
                }
            },
            
            signals: {
                feverMeds: '+' + Math.round(baseRisk * 100) + '%',
                repellents: '+' + Math.round(baseRisk * 130) + '%',
                symptomInquiries: Math.round(baseRisk * 40),
                pharmaciesReporting: zoneConfig.pharmacies.length
            },
            
            lastUpdated: new Date().toISOString()
        };
    },

    /**
     * Generate all zones predictions
     */
    generateAllPredictions() {
        const predictions = {};
        for (const zone in this.zones) {
            predictions[zone] = this.generateZonePrediction(zone);
        }
        return predictions;
    },

    /**
     * Generate alerts based on predictions
     */
    generateAlerts() {
        const alerts = [];
        const predictions = this.generateAllPredictions();
        
        for (const zone in predictions) {
            const pred = predictions[zone];
            const risk7 = pred.predictions.days7.probability;
            
            if (risk7 >= 70) {
                alerts.push({
                    id: `alert-${zone}-critical`,
                    type: 'critical',
                    zone: zone,
                    zoneName: pred.zoneName,
                    title: `${pred.zoneName} - Riesgo Crítico`,
                    message: `${risk7}% probabilidad de brote en 7 días. Ventas de antifebriles ${pred.signals.feverMeds} sobre promedio.`,
                    recommendation: 'Fumigación urgente recomendada',
                    timestamp: new Date().toISOString(),
                    priority: 1
                });
            } else if (risk7 >= 40) {
                alerts.push({
                    id: `alert-${zone}-warning`,
                    type: 'warning',
                    zone: zone,
                    zoneName: pred.zoneName,
                    title: `${pred.zoneName} - Riesgo Moderado`,
                    message: `${risk7}% probabilidad de brote en 14 días. Tendencia ascendente detectada.`,
                    recommendation: 'Monitoreo intensivo recomendado',
                    timestamp: new Date().toISOString(),
                    priority: 2
                });
            }
        }
        
        // Add weather alert
        if (this.weather.humidity > 70 && this.weather.temperature > 28) {
            alerts.push({
                id: 'alert-weather',
                type: 'warning',
                zone: null,
                zoneName: 'Toda la ciudad',
                title: 'Condiciones Climáticas Favorables',
                message: `Pronóstico: ${this.weather.forecast}. Temperaturas ${this.weather.temperature}°C, humedad ${this.weather.humidity}%.`,
                recommendation: 'Condiciones óptimas para reproducción de mosquitos',
                timestamp: new Date().toISOString(),
                priority: 3
            });
        }
        
        return alerts.sort((a, b) => a.priority - b.priority);
    },

    /**
     * Generate action recommendations
     */
    generateRecommendations() {
        const predictions = this.generateAllPredictions();
        const recommendations = [];
        
        for (const zone in predictions) {
            const pred = predictions[zone];
            const risk7 = pred.predictions.days7.probability;
            
            if (risk7 >= 70) {
                recommendations.push({
                    id: `rec-fumigate-${zone}`,
                    type: 'fumigation',
                    icon: 'spray-can',
                    priority: 'critical',
                    title: `Fumigación ${pred.zoneName}`,
                    description: `Iniciar operativo de fumigación inmediato en ${pred.zoneName}. Cubrir área prioritaria de ${Math.round(pred.population/10000)}km².`,
                    deadline: '48 horas',
                    zone: zone,
                    impact: `${pred.population.toLocaleString()} habitantes protegidos`
                });
            }
        }
        
        // Hospital preparation
        const highRiskZones = Object.keys(predictions).filter(z => predictions[z].predictions.days7.probability >= 60);
        if (highRiskZones.length > 0) {
            recommendations.push({
                id: 'rec-hospital',
                type: 'hospital',
                icon: 'hospital',
                priority: 'high',
                title: 'Preparar Hospitales',
                description: 'Aumentar capacidad de camas para dengue en 30%. Verificar stock de sueros, antipiréticos y plaquetas.',
                deadline: '7 días',
                zone: null,
                impact: 'Capacidad de respuesta aumentada'
            });
        }
        
        // Communication campaign
        recommendations.push({
            id: 'rec-campaign',
            type: 'communication',
            icon: 'bullhorn',
            priority: 'medium',
            title: 'Campaña de Concientización',
            description: 'Lanzar campaña de prevención en redes sociales y radio. Enfocarse en eliminación de criaderos y síntomas de alerta.',
            deadline: 'Esta semana',
            zone: null,
            impact: 'Prevención comunitaria'
        });
        
        return recommendations;
    },

    /**
     * Generate historical trend data for charts
     */
    generateTrendData(days = 7) {
        const data = {
            labels: [],
            feverMeds: [],
            repellents: [],
            predictions: [],
            actual: []
        };
        
        const today = new Date();
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            data.labels.push(dayNames[date.getDay()]);
            
            // Simulating increasing trend
            const trendFactor = 1 + (days - i) * 0.08;
            data.feverMeds.push(Math.round(this.historicalBaseline.feverMeds * trendFactor * (0.9 + Math.random() * 0.2)));
            data.repellents.push(Math.round(this.historicalBaseline.repellents * trendFactor * (0.9 + Math.random() * 0.2)));
        }
        
        return data;
    },

    /**
     * Generate prediction accuracy data
     */
    generateAccuracyData() {
        return {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            predicted: [45, 62, 78, 85],
            actual: [48, 58, 75, null], // Current week has no actual yet
            accuracy: 85
        };
    },

    /**
     * Generate pharmacy network status
     */
    generatePharmacyNetwork() {
        const pharmacies = [];
        
        for (const zone in this.zones) {
            const zoneConfig = this.zones[zone];
            zoneConfig.pharmacies.forEach((name, index) => {
                const report = this.generatePharmacyReport(name, zone);
                const hoursAgo = Math.floor(Math.random() * 24);
                
                pharmacies.push({
                    id: `pharmacy-${zone}-${index}`,
                    name: name,
                    zone: zone,
                    zoneName: zoneConfig.name,
                    status: hoursAgo < 24 ? 'active' : 'pending',
                    lastReport: hoursAgo < 1 ? 'Hace unos minutos' : `Hace ${hoursAgo} horas`,
                    feverTrend: report.feverMeds.percentChange,
                    repellentTrend: report.repellents.percentChange
                });
            });
        }
        
        return pharmacies;
    },

    /**
     * Get complete dashboard data
     */
    getDashboardData() {
        return {
            timestamp: new Date().toISOString(),
            city: 'Santa Cruz de la Sierra',
            country: 'Bolivia',
            
            summary: {
                totalPharmacies: 20,
                activePharmacies: 18,
                totalAlerts: 3,
                modelAccuracy: 85
            },
            
            todayStats: {
                feverMeds: 328,
                feverMedsChange: 47,
                repellents: 156,
                repellentsChange: 62,
                symptomInquiries: 45,
                symptomInquiriesChange: 35
            },
            
            zones: this.generateAllPredictions(),
            alerts: this.generateAlerts(),
            recommendations: this.generateRecommendations(),
            pharmacies: this.generatePharmacyNetwork(),
            trends: this.generateTrendData(7),
            accuracy: this.generateAccuracyData(),
            weather: this.weather
        };
    },

    // Helper functions
    getTrend(multiplier) {
        if (multiplier > 1.5) return 'high';
        if (multiplier > 1.2) return 'medium';
        return 'normal';
    },

    getRiskLevel(risk) {
        if (risk >= 0.6) return 'high';
        if (risk >= 0.3) return 'medium';
        return 'low';
    },

    calculateWeatherFactor() {
        // Higher temperature and humidity = higher risk
        const tempFactor = this.weather.temperature > 28 ? 1.2 : 1;
        const humidityFactor = this.weather.humidity > 70 ? 1.3 : 1;
        const rainFactor = this.weather.rainfall > 30 ? 1.4 : 1;
        
        return tempFactor * humidityFactor * rainFactor / 1.5;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PulseDengueSimulator;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.PulseDengueSimulator = PulseDengueSimulator;
}

// Demo: Log sample data
console.log('🦟 PULSE DENGUE Simulator Initialized');
console.log('📊 Sample Dashboard Data:', PulseDengueSimulator.getDashboardData());
