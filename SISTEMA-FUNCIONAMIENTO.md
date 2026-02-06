# PULSE DENGUE - Documentación Técnica y Funcional

## Sistema Completo de Predicción de Brotes de Dengue

**Versión:** 1.0 Prototipo  
**Fecha:** Febrero 2026  
**Estado:** Prototipo Funcional  
**Ubicación:** Santa Cruz, Bolivia

---

## Tabla de Contenidos

1. [Visión General del Sistema](#visión-general-del-sistema)
2. [Arquitectura Técnica](#arquitectura-técnica)
3. [Componentes del Sistema](#componentes-del-sistema)
4. [Flujo de Datos](#flujo-de-datos)
5. [Funcionalidades Implementadas](#funcionalidades-implementadas)
6. [Funcionalidades Planificadas](#funcionalidades-planificadas)
7. [Casos de Uso](#casos-de-uso)
8. [Métricas y KPIs](#métricas-y-kpis)
9. [Modelo de IA y Predicción](#modelo-de-ia-y-predicción)
10. [Seguridad y Privacidad](#seguridad-y-privacidad)

---

## Visión General del Sistema

### ¿Qué es PULSE DENGUE?

PULSE DENGUE (Predictive Urban & Local Sensing Engine) es una plataforma tecnológica innovadora que **transforma farmacias comunitarias en sensores epidemiológicos inteligentes** para predecir brotes de dengue, chikungunya y zika **2-3 semanas antes** de que se manifiesten en hospitales.

### Problema que Resuelve

**Situación Actual:**
- El dengue afecta a **500+ millones** de personas anualmente
- Los sistemas de vigilancia tradicionales detectan brotes **2-4 semanas DESPUÉS** de que comienzan
- Cuando se detectan, los hospitales ya están saturados
- La efectividad de las intervenciones disminuye drásticamente

**Consecuencias:**
- Muertes evitables por respuesta tardía
- Colapso de sistemas hospitalarios
- Costos económicos masivos
- Pánico social

### Solución Innovadora

PULSE DENGUE captura **señales tempranas** que preceden a las hospitalizaciones:

| Indicador | Descripción | Anticipación |
|-----------|-------------|--------------|
| **Ventas de antifebriles** | Aumento en paracetamol/ibuprofeno | 14-21 días antes |
| **Productos repelentes** | Surge en antimosquitos y repelentes | 10-18 días antes |
| **Rehidratación oral** | Demanda de sueros y sales | 7-14 días antes |
| **Consultas síntomas** | Preguntas sobre fiebre, dolor, rash | 14-21 días antes |

---

## Arquitectura Técnica

### Arquitectura de 3 Capas

```
┌─────────────────────────────────────────────────────────────────────┐
│                          PULSE DENGUE                                │
│                     Sistema de Alerta Temprana                       │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
        ┌──────────────────────────────────────────────────┐
        │         CAPA 1: SENSE (Recopilación)             │
        │                                                   │
        │  ┌─────────────┐  ┌─────────────┐  ┌──────────┐ │
        │  │  App        │  │  Datos      │  │  Cloud   │ │
        │  │  Farmacia   │──│  Farmacia   │──│  Sync    │ │
        │  │             │  │             │  │          │ │
        │  └─────────────┘  └─────────────┘  └──────────┘ │
        │                                                   │
        │  • Reportes diarios (2 min)                      │
        │  • Funciona offline                              │
        │  • Datos agregados por zona                      │
        └──────────────────────────────────────────────────┘
                                   │
                                   ▼
        ┌──────────────────────────────────────────────────┐
        │       CAPA 2: ANALYZE (Inteligencia)             │
        │                                                   │
        │  ┌─────────────┐  ┌─────────────┐  ┌──────────┐ │
        │  │  Motor      │  │  Fusión     │  │  Model   │ │
        │  │  IA/ML      │──│  de Datos   │──│  Predict │ │
        │  │             │  │             │  │          │ │
        │  └─────────────┘  └─────────────┘  └──────────┘ │
        │                                                   │
        │  Entradas:                                        │
        │  • Reportes de farmacias                         │
        │  • Datos meteorológicos (API)                    │
        │  • Patrones históricos                           │
        │  • Búsquedas Google Trends                       │
        │  • Calendario estacional                         │
        │                                                   │
        │  Salidas:                                         │
        │  • Probabilidad de brote por zona (7/14/21 días) │
        │  • Nivel de riesgo (Bajo/Medio/Alto/Crítico)     │
        │  • Tendencias y proyecciones                     │
        └──────────────────────────────────────────────────┘
                                   │
                                   ▼
        ┌──────────────────────────────────────────────────┐
        │         CAPA 3: ACT (Acción y Decisión)          │
        │                                                   │
        │  ┌─────────────┐  ┌─────────────┐  ┌──────────┐ │
        │  │  Dashboard  │  │  Alertas    │  │  Report  │ │
        │  │  Autoridades │─│  Tiempo Real│──│  Actions │ │
        │  │             │  │             │  │          │ │
        │  └─────────────┘  └─────────────┘  └──────────┘ │
        │                                                   │
        │  • Mapa de calor por zonas                       │
        │  • Alertas críticas accionables                  │
        │  • Recomendaciones específicas                   │
        │  • Tracking de respuestas                        │
        └──────────────────────────────────────────────────┘
```

### Stack Tecnológico

#### **Frontend**
- **Web Dashboard:** React.js + TypeScript
- **Mobile App:** React Native (iOS + Android)
- **UI Framework:** Tailwind CSS / Material-UI
- **Charts:** Chart.js / D3.js
- **Maps:** Leaflet / Mapbox

#### **Backend**
- **API:** Python FastAPI
- **Async Processing:** Celery + Redis
- **WebSockets:** Socket.io (updates en tiempo real)

#### **Base de Datos**
- **Principal:** PostgreSQL 15+
- **Time-Series:** TimescaleDB extension
- **Cache:** Redis
- **Storage:** AWS S3 (archivos)

#### **IA/Machine Learning**
- **Framework:** TensorFlow 2.x / PyTorch
- **Modelos:** 
  - LSTM (predicción temporal)
  - Random Forest (clasificación de riesgo)
  - Ensemble methods
- **MLOps:** MLflow para tracking de modelos

#### **Infraestructura**
- **Cloud:** AWS (América Latina region)
- **Containers:** Docker + Docker Compose
- **Orchestration:** Kubernetes (producción)
- **CI/CD:** GitHub Actions
- **Monitoring:** Prometheus + Grafana

#### **Integraciones**
- **Clima:** OpenWeatherMap API
- **Geolocalización:** Google Maps API
- **Notificaciones:** Twilio (SMS) + Firebase (push)
- **Analytics:** Google Analytics

---

## Componentes del Sistema

### 1. Aplicación Móvil de Farmacia (pharmacy-app.html)

**Propósito:** Herramienta rápida y sencilla para que farmacéuticos reporten datos diarios.

#### Funcionalidades Actuales:

**a) Sistema de Login**
- Autenticación por farmacia
- Selección de farmacia de una lista
- Persistencia de sesión

**b) Dashboard Principal**
```
┌─────────────────────────────────────┐
│  Farmacia San Martín                │
│  Bienvenido, Carlos                 │
│                                      │
│  Resumen:                            │
│  • 14 reportes este mes              │
│  • +120 puntos ganados               │
│  • Streak: 7 días consecutivos      │
├─────────────────────────────────────┤
│  Acciones Rápidas:                   │
│  [Nuevo Reporte]  [Ver Datos]       │
│  [Capacitación]   [Comunidad]       │
└─────────────────────────────────────┘
```

**c) Formulario de Reporte Diario** (2 minutos)

**Sección 1: Ventas de Medicamentos**
```
Antifebriles (Paracetamol/Ibuprofeno):
[ Normal ] [ +25% ] [ +50% ] [ +100% ]

Repelentes/Antimosquitos:
[ Normal ] [ +25% ] [ +50% ] [ +100% ]

Sales de Rehidratación Oral:
[ Normal ] [ +25% ] [ +50% ] [ +100% ]
```

**Sección 2: Consultas de Síntomas**
```
¿Clientes consultaron sobre:
☐ Fiebre alta
☐ Dolor de cabeza intenso
☐ Dolor detrás de los ojos
☐ Dolor muscular/articular
☐ Náuseas/vómitos
☐ Rash cutáneo
```

**Sección 3: Observaciones**
```
Notas adicionales (opcional):
[____________________________]
[____________________________]
```

**Sección 4: Confirmación**
```
[Enviar Reporte]
```

**d) Pantalla de Éxito**
```
┌─────────────────────────────────────┐
│           ¡Reporte Enviado!          │
│                                      │
│   Gracias por contribuir al          │
│   sistema de alerta temprana         │
│                                      │
│   +10 puntos ganados                 │
│                                      │
│   [Volver al Inicio]                 │
└─────────────────────────────────────┘
```

**e) Gamificación**
- Sistema de puntos por reporte
- Rachas de días consecutivos
- Ranking de farmacias más activas
- Badges por logros

#### Características Técnicas:

- **Offline First:** Almacenamiento local, sincronización automática
- **Bajo consumo:** Optimizado para 2G/3G
- **Tamaño:** < 5 MB descargable
- **Compatibilidad:** Android 6+ / iOS 12+

---

### 2. Dashboard de Autoridades (dashboard.html)

**Propósito:** Centro de comando para autoridades de salud para monitorear, analizar y responder a brotes.

#### Estructura del Dashboard:

**A) Barra Superior**
```
┌─────────────────────────────────────────────────────────┐
│ PULSE DENGUE  [LIVE]       [Buscar...]  [Config]       │
└─────────────────────────────────────────────────────────┘
```

**B) Alerta Crítica** (si existe)
```
┌─────────────────────────────────────────────────────────┐
│ ALERTA CRÍTICA - ZONA NORTE                             │
│                                                          │
│ Probabilidad de brote: 87% en próximos 7 días          │
│ Acción requerida: Fumigar inmediatamente                │
│                                                          │
│                           [Ver Plan de Acción]          │
└─────────────────────────────────────────────────────────┘
```

**C) Métricas Clave** (5 tarjetas)
```
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ Zonas   │ │ Zonas   │ │ Zonas   │ │ Reportes│ │ Población│
│ Críticas│ │ Alerta  │ │ Seguras │ │ Hoy     │ │ Cubierta │
│ Críticas│ │ Alerta  │ │ Seguras │ │ Hoy     │ │ Cubierta │
│         │ │         │ │         │ │         │ │          │
│   2     │ │   1     │ │   2     │ │   18    │ │ 800K     │
│ +1↑     │ │ =       │ │ -1↓     │ │ +2↑     │ │          │
└─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
```

**D) Mapa de Riesgo por Zonas**
```
┌─────────────────────────────────────────────┐
│  Mapa de Riesgo - Santa Cruz                │
├─────────────────────────────────────────────┤
│                                              │
│              [NORTE: 87% CRITICO]            │
│                                              │
│   [OESTE    [CENTRO:   [ESTE:               │
│    12% BAJO] 34% MEDIO] 65% ALTO]           │
│                                              │
│              [SUR: 18% BAJO]                 │
│                                              │
└─────────────────────────────────────────────┘
```

**E) Alertas Recientes**
```
┌─────────────────────────────────────────────┐
│  Alertas y Eventos                           │
├─────────────────────────────────────────────┤
│ [CRITICO] Zona Norte: +45% antifebriles     │
│    Hace 2 horas • Requiere acción           │
│                                              │
│ [ALTO] Farmacia Plan 3000: Datos anómalos   │
│    Hace 4 horas • Revisar                   │
│                                              │
│ [OK] Fumigación completada - Zona Este      │
│    Hace 1 día • Efectivo                    │
└─────────────────────────────────────────────┘
```

**F) Gráficos de Tendencias**
```
┌─────────────────────────────────────────────┐
│  Tendencias (Últimos 30 días)               │
├─────────────────────────────────────────────┤
│  [Gráfico lineal de ventas antifebriles]   │
│  [Gráfico de barras por zona]              │
│  [Gráfico de proyección IA]                │
└─────────────────────────────────────────────┘
```

**G) Tabla de Farmacias**
```
┌────────────────────────────────────────────────────────┐
│  Farmacia          │ Zona   │ Estado  │ Última Act.   │
├────────────────────────────────────────────────────────┤
│ San Martín         │ Norte  │ Alta    │ Hace 1 hora   │
│ Bolivia            │ Norte  │ Alta    │ Hace 2 horas  │
│ Oriental           │ Este   │ Media   │ Hace 3 horas  │
│ Central            │ Centro │ Normal  │ Hace 1 hora   │
└────────────────────────────────────────────────────────┘
```

**H) Recomendaciones Accionables**
```
┌─────────────────────────────────────────────┐
│  Acciones Recomendadas                       │
├─────────────────────────────────────────────┤
│  URGENTE (48h)                               │
│  • Fumigar Zona Norte (Plan 3000)           │
│  • Preparar 50 camas Hospital Norte         │
│                                              │
│  ALTA PRIORIDAD (7 días)                     │
│  • Campaña de prevención Zona Este          │
│  • Stock de medicamentos                    │
│                                              │
│  MONITOREAR                                  │
│  • Vigilar tendencias Zona Centro           │
└─────────────────────────────────────────────┘
```

**I) Widget de Clima**
```
┌─────────────────────────┐
│  Condiciones Climáticas  │
├─────────────────────────┤
│  31°C  78% humedad       │
│  45mm lluvia (7 días)    │
│                          │
│  Condiciones favorables  │
│     para mosquitos       │
└─────────────────────────┘
```

#### Funcionalidades del Dashboard:

**Implementado en Prototipo:**
- Visualización de zonas de riesgo
- Alertas críticas con animación
- Métricas en tiempo real (simuladas)
- Mapa de calor interactivo
- Lista de farmacias con estado
- Gráficos de tendencias
- Widget de clima
- Diseño responsive

**Planificado para Producción:**
- Filtros por fecha/zona
- Exportar reportes PDF
- Notificaciones push en navegador
- Chat con farmacias
- Historial de acciones tomadas
- Comparador de períodos
- Integración con sistemas hospitalarios

---

### 3. Motor de IA y Predicción

**Propósito:** Analizar datos heterogéneos y generar predicciones precisas de brotes.

#### Modelo de Machine Learning:

**Arquitectura del Modelo:**

```
INPUT LAYER
├─ Datos de Farmacias (por zona, por día)
│  ├─ Ventas antifebriles (normalizado)
│  ├─ Ventas repelentes (normalizado)
│  ├─ Ventas SRO (normalizado)
│  └─ Consultas síntomas (count)
│
├─ Datos Meteorológicos
│  ├─ Temperatura (°C)
│  ├─ Humedad (%)
│  ├─ Precipitación (mm)
│  └─ Días desde última lluvia
│
├─ Datos Temporales
│  ├─ Día de la semana
│  ├─ Semana del año
│  └─ Estacionalidad (sin/cos)
│
└─ Datos Históricos
   ├─ Casos confirmados (lag 7-30 días)
   └─ Brotes previos (misma época)
   
         ▼
         
FEATURE ENGINEERING
├─ Rolling averages (3, 7, 14 días)
├─ Rate of change (derivadas)
├─ Anomaly scores
└─ Interaction features

         ▼
         
LSTM NETWORK (Temporal)
├─ 128 units, return sequences
├─ Dropout 0.3
├─ 64 units
└─ Dropout 0.3

         ▼
         
DENSE LAYERS
├─ 32 units (ReLU)
├─ 16 units (ReLU)
└─ Dropout 0.2

         ▼
         
OUTPUT LAYER
├─ Probabilidad brote 7 días (sigmoid)
├─ Probabilidad brote 14 días (sigmoid)
├─ Probabilidad brote 21 días (sigmoid)
└─ Nivel de riesgo (softmax: bajo/medio/alto/crítico)
```

#### Proceso de Entrenamiento:

1. **Datos de Entrenamiento:**
   - Histórico de 2+ años de datos de farmacias (simulado inicialmente)
   - Casos confirmados de dengue por zona
   - Datos meteorológicos históricos
   - División: 70% train, 15% validation, 15% test

2. **Métricas de Evaluación:**
   - **Precisión:** % de brotes predichos correctamente
   - **Recall:** % de brotes reales detectados
   - **F1-Score:** Balance entre precisión y recall
   - **Lead Time:** Días promedio de anticipación
   - **False Positives:** Alertas incorrectas (minimizar)

3. **Objetivo:**
   - Precisión > 80%
   - Recall > 85% (no perder brotes reales)
   - Lead time promedio: 14-21 días

#### Lógica de Clasificación de Riesgo:

```python
def clasificar_riesgo(probabilidad):
    if probabilidad >= 0.75:
        return "CRÍTICO"  # Brote inminente, acción inmediata
    elif probabilidad >= 0.50:
        return "ALTO"      # Alta probabilidad, preparar
    elif probabilidad >= 0.25:
        return "MEDIO"     # Monitorear de cerca
    else:
        return "BAJO"       # Situación normal
```

---

### 4. Simulador de Datos (simulator.js)

**Propósito:** Generar datos realistas para demostración y testing.

#### Configuración de Zonas:

```javascript
{
    norte: {
        name: 'Zona Norte',
        baseRisk: 0.7,        // Riesgo base alto
        pharmacies: 5,         // 5 farmacias reportando
        population: 250000,    // Población cubierta
        color: '#FF4444'       // Color rojo (crítico)
    },
    este: {
        baseRisk: 0.45,       // Riesgo medio-alto
        ...
    },
    // ... otras zonas
}
```

#### Generación de Datos:

**Reportes de Farmacia:**
```javascript
// Multiplica ventas base por factor de riesgo de zona
feverMeds = baseline * (1 + riskFactor * 1.5) + noise
repellents = baseline * (1 + riskFactor * 2.0) + noise
ors = baseline * (1 + riskFactor * 1.2) + noise
```

**Datos Meteorológicos:**
```javascript
{
    temperature: 28-34°C (rango típico de Santa Cruz)
    humidity: 65-85% (alta humedad favorece mosquitos)
    rainfall: 0-100mm (temporada de lluvias)
}
```

---

## Flujo de Datos Completo

### Flujo Diario de Operación:

```
MAÑANA (8:00 - 11:00 AM)
┌──────────────────────────────────────┐
│ 1. Farmacéutico abre la app          │
│ 2. Revisa inventario de ayer         │
│ 3. Completa reporte (2 minutos)      │
│ 4. App envía datos encriptados       │
└──────────────────────────────────────┘
              ▼
┌──────────────────────────────────────┐
│ 5. Backend recibe reporte            │
│ 6. Valida y almacena en DB           │
│ 7. Trigger: Agregar por zona         │
└──────────────────────────────────────┘
              ▼
MEDIODÍA (12:00 PM)
┌──────────────────────────────────────┐
│ 8. Cron job: Recopilar clima (API)  │
│ 9. Agregar reportes por zona         │
│ 10. Calcular métricas                │
└──────────────────────────────────────┘
              ▼
┌──────────────────────────────────────┐
│ 11. MOTOR IA: Ejecutar predicción   │
│    • Cargar modelo entrenado         │
│    • Preparar features               │
│    • Inferencia por zona             │
│    • Generar scores de riesgo        │
└──────────────────────────────────────┘
              ▼
┌──────────────────────────────────────┐
│ 12. Análisis de resultados           │
│    • Comparar con umbral crítico     │
│    • Detectar cambios significativos │
│    • Generar alertas si necesario    │
└──────────────────────────────────────┘
              ▼
TARDE (2:00 PM)
┌──────────────────────────────────────┐
│ 13. SI riesgo > umbral:              │
│    • Crear alerta crítica            │
│    • Notificar autoridades (SMS)     │
│    • Push notification dashboard     │
│    • Generar recomendaciones         │
└──────────────────────────────────────┘
              ▼
┌──────────────────────────────────────┐
│ 14. Autoridad revisa dashboard       │
│ 15. Evalúa alerta y recomendaciones  │
│ 16. Toma acción (fumigar, campaña)   │
│ 17. Registra acción en sistema       │
└──────────────────────────────────────┘
              ▼
NOCHE (10:00 PM)
┌──────────────────────────────────────┐
│ 18. Backup diario de base de datos   │
│ 19. Generar reporte ejecutivo        │
│ 20. Actualizar métricas de modelo    │
└──────────────────────────────────────┘
```

---

## Funcionalidades Implementadas (Prototipo)

### Frontend Web

**Landing Page (index.html)**
- Hero section con estadísticas animadas
- Sección "El Problema" con comparación visual
- Explicación de la solución en 3 capas
- Línea de tiempo de funcionamiento
- Métricas de impacto esperado
- Sección de equipo
- Call-to-action para partners
- Animaciones con Intersection Observer
- Diseño responsive

**Portal Central (portal.html)**
- Hub de navegación a todos los demos
- Grid de componentes con descripciones
- Acceso rápido a cada sección

**Dashboard de Autoridades (dashboard.html)**
- Sidebar con navegación
- Métricas en tiempo real (simuladas)
- Mapa de riesgo por zonas (5 zonas)
- Alertas críticas con animación
- Lista de farmacias con estado
- Gráficos de tendencias (Chart.js)
- Widget de clima
- Tabla de reportes
- Recomendaciones accionables
- Diseño dark mode profesional

**App de Farmacia (pharmacy-app.html)**
- Login de farmacia
- Dashboard principal
- Formulario de reporte diario
- Sistema de puntos/gamificación
- Pantalla de éxito
- Diseño mobile-first
- Simulación de flujo completo

### Componentes Adicionales

**Mockups (mockups.html)**
- Wireframes de todas las pantallas
- Flujos de usuario visualizados

**Pitch Deck (pitch-deck.html)**
- Presentación para inversores
- Slides con problema, solución, mercado, equipo

**Demo Flow (demo-flow.html)**
- Flujo interactivo del sistema
- Visualización paso a paso

### Estilos y Scripts

**styles.css**
- Sistema de variables CSS
- Dark mode design system
- Gradientes y animaciones
- Componentes reutilizables
- Grid layouts responsive

**script.js**
- Smooth scroll
- Navegación interactiva
- Animaciones de entrada
- Efectos de hover

**simulator.js**
- Generador de datos por zona
- Simulación de reportes de farmacias
- Datos meteorológicos
- Cálculo de factores de riesgo

---

## Funcionalidades Planificadas

### Fase 2: Piloto (Mayo - Agosto 2026)

#### Backend Real

**API REST con FastAPI**
```python
POST /api/v1/reports              # Enviar reporte de farmacia
GET  /api/v1/zones/{zone_id}/risk # Obtener riesgo de zona
GET  /api/v1/alerts               # Listar alertas activas
POST /api/v1/actions              # Registrar acción tomada
GET  /api/v1/pharmacies           # Listar farmacias
GET  /api/v1/analytics            # Obtener analytics
```

**Base de Datos PostgreSQL**
```sql
Tables:
- pharmacies (id, name, zone, location, contact)
- pharmacy_reports (id, pharmacy_id, date, data_json)
- zones (id, name, coordinates, population)
- predictions (id, zone_id, date, probability_7d, risk_level)
- alerts (id, zone_id, type, severity, created_at, resolved_at)
- actions (id, alert_id, type, description, assigned_to, completed)
```

**Autenticación y Autorización**
- JWT tokens para API
- Roles: Farmacéutico, Autoridad, Administrador
- OAuth2 para login (Google/Facebook opcional)
- Two-factor authentication para autoridades

#### Modelo de IA Real

🔲 **Entrenamiento con Datos Reales**
- Recopilar 3-6 meses de datos piloto
- Entrenar modelo LSTM
- Validación con casos confirmados
- Ajuste de hiperparámetros

🔲 **Pipeline de ML**
- Feature engineering automatizado
- Reentrenamiento semanal
- A/B testing de modelos
- Tracking con MLflow

#### Integraciones

🔲 **APIs Externas**
- OpenWeatherMap (clima en tiempo real)
- Google Trends API (búsquedas dengue)
- SMS Gateway (Twilio para alertas)
- Email service (SendGrid)

🔲 **Sistemas de Salud**
- Integración con SNIS (Sistema Nacional de Información en Salud)
- API para hospitales (reportar casos)
- Integración con laboratorios (resultados de pruebas)

#### Dashboard Avanzado

🔲 **Funciones Adicionales**
- Exportar reportes PDF/Excel
- Filtros avanzados por fecha/zona
- Comparador de períodos (semana actual vs. anterior)
- Predicción de casos (número estimado)
- Timeline de evolución de brote
- Mapa de calor histórico

🔲 **Notificaciones**
- Push notifications en navegador
- Email automático para alertas críticas
- SMS para autoridades (alertas urgentes)
- WhatsApp Business API (opcional)

#### App Móvil Mejorada

🔲 **Funciones Adicionales**
- Recordatorios diarios para reportar
- Gráficos de histórico personal
- Comparar con otras farmacias (anónimo)
- Chat con soporte técnico
- Módulo de capacitación integrado
- Escaneo de inventario con cámara (OCR)

🔲 **Gamificación Expandida**
- Leaderboard entre farmacias
- Badges por logros
- Recompensas mensuales
- Certificados de participación

---

### Fase 3: Escalamiento (2027+)

🔲 **Expansión Geográfica**
- Rollout a todas las ciudades de Bolivia
- Adaptación a otros países de LATAM
- Traducción a portugués (Brasil)

**Expansión de Enfermedades**
- Zika virus
- Chikungunya
- Malaria (zonas endémicas)
- COVID-19 (variantes estacionales)

**Machine Learning Avanzado**
- Deep Learning multimodal
- Computer vision (análisis de imágenes satelitales)
- NLP para análisis de redes sociales
- Predicción de movimiento de epidemias

**Plataforma Open Source**
- Liberar código base en GitHub
- Documentación completa para implementación
- Toolkit para otros países
- Comunidad de contribuidores

---

## Casos de Uso

### Caso de Uso 1: Detección Temprana de Brote

**Actor:** Sistema PULSE DENGUE  
**Escenario:** Zona Norte de Santa Cruz, Semana 8 de 2026

**Flujo:**

1. **Días 1-3 (Lunes-Miércoles):**
   - 5 farmacias de Zona Norte reportan ventas normales
   - Dashboard muestra riesgo "BAJO" (15%)

2. **Día 4 (Jueves):**
   - Farmacia San Martín reporta +50% en antifebriles
   - Farmacia Bolivia reporta +25% en antifebriles
   - Sistema detecta anomalía pero aún no es crítico
   - Riesgo sube a "MEDIO" (35%)

3. **Día 5 (Viernes):**
   - 3 de 5 farmacias reportan +50% en antifebriles
   - 4 de 5 reportan aumento en repelentes
   - Múltiples consultas sobre síntomas de dengue
   - **TRIGGER:** Modelo de IA calcula probabilidad 78%
   - Sistema genera **ALERTA CRÍTICA**

4. **Día 6 (Sábado 8:00 AM):**
   - Autoridad de Salud recibe:
     - SMS: "ALERTA CRÍTICA: Zona Norte, 78% prob. brote en 7 días"
     - Email con reporte detallado
     - Notificación en dashboard

5. **Día 6 (Sábado 10:00 AM):**
   - Director de Salud revisa dashboard
   - Ve recomendaciones:
     - URGENTE: Fumigar barrios Plan 3000 y Villa 1ro de Mayo
     - ALTA: Preparar 50 camas en Hospital Norte
     - INFO: Campaña de prevención en redes sociales

6. **Día 6-7 (Fin de semana):**
   - Equipos de fumigación desplegados
   - Hospital prepara camas y stock de medicamentos
   - Campaña en redes sociales lanzada

7. **Día 14-21 (Dos semanas después):**
   - Brote ocurre pero con **menor intensidad**
   - Hospitales NO se saturan
   - Casos confirmados: 45% menos que predicción sin intervención
   - **ÉXITO:** Intervención temprana efectiva

**Resultado:**
- Detección 14 días antes del pico
- Intervención oportuna
- Reducción de casos
- Sistema de salud NO colapsado
- Vidas salvadas estimadas: 15-20

---

### Caso de Uso 2: Farmacéutico Reportando Diariamente

**Actor:** Carlos, farmacéutico de Farmacia San Martín  
**Escenario:** Rutina diaria de reporte

**Flujo:**

1. **9:00 AM - Apertura de Farmacia:**
   - Carlos abre la farmacia
   - Revisa inventario del día anterior
   - Nota que vendió más paracetamol de lo usual

2. **9:15 AM - Abrir App:**
   - Carlos abre app PULSE DENGUE en su celular
   - Ve notificación: "Recuerda reportar datos de ayer"
   - Click en "Nuevo Reporte"

3. **9:16 AM - Completar Formulario:**
   
   **Pregunta 1:** "Ventas de antifebriles comparado con lo normal"
   - Carlos selecciona: **+50%**
   
   **Pregunta 2:** "Ventas de repelentes"
   - Carlos selecciona: **+25%**
   
   **Pregunta 3:** "Ventas de suero oral"
   - Carlos selecciona: **Normal**
   
   **Pregunta 4:** "¿Clientes consultaron sobre síntomas?"
   - Carlos marca: [X] Fiebre alta
   - Carlos marca: [X] Dolor de cabeza
   
   **Pregunta 5:** "Observaciones adicionales"
   - Carlos escribe: "3 personas preguntaron por síntomas de dengue. Una mencionó que su vecino está enfermo."

4. **9:18 AM - Enviar:**
   - Carlos toca "Enviar Reporte"
   - App muestra: "¡Reporte enviado!"
   - Gana +10 puntos
   - Ve su racha: "7 días consecutivos"

5. **9:19 AM - Continuar con trabajo:**
   - Carlos vuelve a atender clientes
   - **Tiempo total:** 2 minutos

**Beneficios para Carlos:**
- Proceso rápido y simple
- Contribuye al bien común
- Gamificación lo mantiene motivado
- Sin interrumpir su trabajo normal

---

### Caso de Uso 3: Autoridad Evaluando Alerta

**Actor:** Dra. María López, Directora de Epidemiología  
**Escenario:** Evaluación de alerta del sistema

**Flujo:**

1. **2:00 PM - Recibe Alerta:**
   - SMS en celular: "ALERTA CRÍTICA - PULSE DENGUE"
   - Email con detalles
   - Push notification en computadora

2. **2:05 PM - Abre Dashboard:**
   - Inicia sesión en dashboard
   - Ve banner rojo con alerta:
     ```
     ALERTA CRÍTICA - ZONA ESTE
     Probabilidad de brote: 82% en próximos 7 días
     Acción requerida: Fumigar inmediatamente
     ```

3. **2:10 PM - Analiza Datos:**
   - Click en Zona Este en el mapa
   - Ve gráfico de tendencia:
     - Antifebriles: +85% última semana
     - Repelentes: +120% última semana
     - Consultas síntomas: 45 en 3 días
   - Revisa lista de farmacias:
     - 4 de 5 farmacias reportan anomalías
     - Concentración en barrio Los Mangales

4. **2:20 PM - Revisa Recomendaciones:**
   ```
   ACCIONES RECOMENDADAS:
   
   URGENTE (48 horas):
   • Fumigar barrios: Los Mangales, Pampa de la Isla
   • Preparar 30 camas Hospital Este
   • Stock: 500 pruebas rápidas dengue
   
   ALTA PRIORIDAD (7 días):
   • Campaña preventiva en colegios
   • Revisión de recipientes con agua
   • Comunicado de prensa
   ```

5. **2:30 PM - Toma Decisiones:**
   - Llama al Jefe de Vectores: ordena fumigación
   - Llama al Hospital Este: preparar recursos
   - Contacta a Comunicación: preparar campaña

6. **2:45 PM - Registra Acciones en Sistema:**
   - En el dashboard, click en alerta
   - Selecciona: "Acción tomada"
   - Completa formulario:
     ```
     ✓ Fumigación programada: 18-19 Feb
     ✓ Hospital notificado
     ✓ Campaña iniciada
     Responsable: Equipo de Vectores Zona 3
     ```

7. **Próximos días - Monitoreo:**
   - Dra. María revisa dashboard diariamente
   - Observa si tendencia se estabiliza
   - Evalúa efectividad de intervención

**Resultado:**
- Alerta recibida a tiempo
- Información clara y accionable
- Decisiones basadas en datos
- Seguimiento documentado

---

## Métricas y KPIs

### Métricas de Sistema

| Métrica | Objetivo | Cómo se Mide |
|---------|----------|--------------|
| **Uptime** | 99.5% | Monitoreo 24/7 con Pingdom |
| **Tiempo de respuesta API** | < 200ms | Prometheus metrics |
| **Reportes diarios** | 90% de farmacias | Count reports / total pharmacies |
| **Latencia de alerta** | < 5 minutos | Timestamp detection → notification |

### Métricas de Predicción

| Métrica | Objetivo | Descripción |
|---------|----------|-------------|
| **Precisión (Accuracy)** | > 80% | % de predicciones correctas |
| **Sensibilidad (Recall)** | > 85% | % de brotes reales detectados |
| **Especificidad** | > 75% | % de no-brotes correctamente identificados |
| **F1-Score** | > 0.80 | Balance entre precisión y recall |
| **Lead Time Promedio** | 14-21 días | Días de anticipación antes del pico |
| **False Positives** | < 15% | Alertas incorrectas (minimizar) |

### Métricas de Impacto

| Métrica | Objetivo | Medición |
|---------|----------|----------|
| **Reducción de casos** | 30-50% | Comparación con zonas control |
| **Saturación hospitalaria evitada** | 100% | Días con > 90% ocupación |
| **Vidas salvadas** | Estimado | Modelo epidemiológico |
| **Ahorro económico** | $2M+ | Costo prevención vs. tratamiento |
| **Tiempo de respuesta** | < 48 horas | Alerta → acción |

### Métricas de Uso

| Métrica | Objetivo |
|---------|----------|
| **Farmacias activas** | 90% reportando diariamente |
| **Retención farmacéuticos** | > 80% después de 3 meses |
| **Satisfacción usuarios** | NPS > 50 |
| **Tiempo promedio reporte** | < 3 minutos |

---

## Seguridad y Privacidad

### Principios de Privacidad

#### 1. **Minimización de Datos**
- NO se recopilan datos personales de pacientes
- NO se registran nombres, IDs, ni historiales médicos
- Solo datos agregados y anónimos
- Reportes por tendencias, no casos individuales

#### 2. **Anonimización**
```
Datos que SE recopilan:
"Farmacia X vendió +50% antifebriles"
"15 consultas sobre síntomas en Zona Norte"
"Aumento de 30% en repelentes"

Datos que NO se recopilan:
"Juan Pérez compró paracetamol"
"María García tiene fiebre"
Direcciones de pacientes
```

#### 3. **Agregación por Zona**
- Datos se agregan por zona geográfica (no farmacia individual)
- Mínimo 3 farmacias por zona para evitar identificación
- Resultados mostrados solo a nivel zonal

### Medidas de Seguridad Técnica

#### **Encriptación**
- TLS 1.3 para todas las conexiones
- Datos en tránsito: HTTPS
- Datos en reposo: AES-256
- Backups encriptados

#### **Autenticación**
- JWT tokens con expiración
- Refresh tokens rotatorios
- Two-factor authentication (2FA) para autoridades
- IP whitelisting para API crítica

#### **Autorización**
```
Roles y Permisos:

FARMACÉUTICO:
Enviar reportes propios
Ver histórico propio
[NO] Ver datos de otras farmacias
[NO] Acceder a dashboard de autoridades

AUTORIDAD SALUD:
Ver todos los dashboards
Ver alertas
Registrar acciones
[NO] Modificar reportes de farmacias
[NO] Ver datos de farmacia individual

ADMINISTRADOR:
Acceso completo
Gestionar usuarios
Configurar sistema
```

#### **Auditoría**
- Log de todos los accesos a datos sensibles
- Registro de modificaciones
- Monitoreo de actividad anómala
- Alertas de seguridad automáticas

### Cumplimiento Regulatorio

#### **Bolivia**
- Cumplimiento con Ley de Protección de Datos Personales (Ley 164)
- Acuerdos con Ministerio de Salud
- Consentimiento informado de farmacias

#### **Internacional (futuro)**
- GDPR compliance (Europa)
- HIPAA considerations (USA)
- LGPD (Brasil)

---

## Próximos Pasos

### Inmediato (Febrero 2026)

1. **Completar prototipo** - HECHO
2. **Preparar aplicación MIT Solve** - EN PROGRESO
   - Deadline: 23 de febrero
   - Completar formulario
   - Video pitch de 2 minutos
   - Documento técnico

3. **Validación con expertos**
   - Presentar a epidemiólogos
   - Feedback de autoridades de salud
   - Ajustar modelo según recomendaciones

### Corto Plazo (Marzo-Abril 2026)

4. **Desarrollo de Backend Real**
   - FastAPI setup
   - PostgreSQL database
   - API endpoints
   - Testing

5. **App Móvil Nativa**
   - React Native development
   - Offline functionality
   - Testing en dispositivos reales

6. **Reclutamiento para Piloto**
   - Identificar 20 farmacias en Santa Cruz
   - Reuniones presenciales
   - Acuerdos de participación
   - Capacitación

### Mediano Plazo (Mayo-Agosto 2026)

7. 🔲 **Lanzamiento Piloto**
   - Go-live con 20 farmacias
   - Monitoreo diario
   - Soporte técnico constante
   - Recopilación de feedback

8. 🔲 **Entrenamiento de Modelo IA**
   - Recopilar datos reales 3-6 meses
   - Entrenar modelo con datos locales
   - Validación contra casos confirmados
   - Ajuste de hiperparámetros

9. 🔲 **Iteración y Mejora**
   - Implementar feedback de usuarios
   - Optimizar UX/UI
   - Mejorar precisión de modelo

### Largo Plazo (2027+)

10. **Escalamiento Nacional**
    - 500 farmacias en toda Bolivia
    - Partnership con gobierno
    - Integración con sistema nacional de salud

11. **Investigación Científica**
    - Paper publicado en revista peer-reviewed
    - Presentación en conferencias
    - Validación científica del método

12. **Expansión Internacional**
    - Adaptación a otros países de LATAM
    - Open source toolkit
    - Franquicia del modelo

---

## Información de Contacto

**Fundador:** Isaveth Navia Guzmán  
**Ubicación:** Santa Cruz de la Sierra, Bolivia  
**Email:** [isaveth.navia@pulsedengue.org] (placeholder)  
**LinkedIn:** [perfil] (placeholder)  

**Repositorio:** [GitHub] (cuando esté público)  
**Website:** [www.pulsedengue.org] (en desarrollo)

---

## Licencia

MIT License - Este proyecto será open source para maximizar impacto global.

---

## Agradecimientos

- **MIT Solve** por la oportunidad de participar en el Future Health Challenge
- **Ministerio de Salud de Bolivia** por el apoyo inicial
- **Farmacias participantes** en el piloto
- **Asesores médicos** por su guía
- **Comunidad de Santa Cruz** por confiar en la solución

---

<p align="center">
  <strong>PULSE DENGUE</strong><br>
  Predicting outbreaks. Protecting communities. Saving lives.<br>
</p>

---

**Última actualización:** 5 de febrero de 2026  
**Versión del documento:** 1.0
