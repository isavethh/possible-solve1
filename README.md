# 🦟 PULSE DENGUE

## Predictive Urban & Local Sensing Engine

> Transforming community pharmacies into an intelligent early warning network that predicts dengue outbreaks 2-3 weeks before hospitals overflow.

[![MIT Solve](https://img.shields.io/badge/MIT%20Solve-Future%20Health%202026-00D9FF)](https://solve.mit.edu)
[![Location](https://img.shields.io/badge/Location-Santa%20Cruz%2C%20Bolivia-success)](https://goo.gl/maps/santacruz)
[![Status](https://img.shields.io/badge/Status-Prototype-yellow)](/)

---

## 🎯 The Problem

Dengue fever affects **500+ million people annually**. Current surveillance systems detect outbreaks **2-4 weeks AFTER** they begin—when hospitals are already overwhelmed and intervention effectiveness drops dramatically.

## 💡 Our Solution

PULSE DENGUE captures early signals through:
- 📈 Increased sales of fever medication (paracetamol, ibuprofen)
- 🦟 Surge in repellent and antimosquito product purchases
- 💬 More customer inquiries about dengue symptoms
- 💧 Depletion of oral rehydration solutions

These signals appear **2-3 weeks BEFORE** hospital admissions spike.

---

## 🖥️ Demo Components

| Component | Description | Link |
|-----------|-------------|------|
| 🎯 **Portal Central** | Hub de navegación con todos los demos | [portal.html](portal.html) |
| 🌐 **Landing Page** | Página principal del proyecto | [index.html](index.html) |
| 📊 **Dashboard** | Panel de control para autoridades | [dashboard.html](dashboard.html) |
| 📱 **App Farmacia** | Aplicación funcional para farmacéuticos | [app-farmacia.html](app-farmacia.html) |
| 🔄 **Demo Flow** | Flujo interactivo del sistema | [demo-flow.html](demo-flow.html) |
| 🎨 **Mockups** | Diseños de interfaz de usuario | [mockups.html](mockups.html) |
| 📽️ **Pitch Deck** | Presentación para inversores | [pitch-deck.html](pitch-deck.html) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PULSE DENGUE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │   📱 SENSE   │───▶│  🧠 ANALYZE  │───▶│   📊 ACT     │       │
│  │              │    │              │    │              │       │
│  │  Pharmacies  │    │  AI Engine   │    │  Dashboard   │       │
│  │  Mobile App  │    │  Prediction  │    │  Alerts      │       │
│  │  Daily Data  │    │  Model       │    │  Actions     │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Layer 1: SENSE (Data Collection)
- Pharmacists use a simple mobile app (2 minutes/day)
- Report fever medication, repellent sales, symptom inquiries
- Works offline with sync when connected

### Layer 2: ANALYZE (AI Prediction)
- Aggregates pharmacy reports by geographic zone
- Combines with weather data, historical patterns
- Calculates outbreak probability for 7/14/21 days

### Layer 3: ACT (Decision Support)
- Real-time dashboard for health authorities
- Zone-specific risk scores and recommendations
- Actionable alerts with deadlines

---

## 📁 Project Structure

```
solvesolution1/
├── index.html          # Landing page (English)
├── portal.html         # Demo navigation hub
├── dashboard.html      # Authority dashboard
├── app-farmacia.html   # Pharmacist mobile app
├── demo-flow.html      # Interactive flow demo
├── mockups.html        # UI/UX mockups
├── pitch-deck.html     # Investor presentation
├── styles.css          # Main stylesheet
├── script.js           # Landing page interactions
├── simulator.js        # Data simulation engine
├── MIT-SOLVE-APPLICATION.md  # Application draft
└── README.md           # This file
```

---

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open** `portal.html` in your browser
3. **Explore** each component:
   - Start with the **Demo Flow** for an overview
   - Try the **App Farmacia** to submit a report
   - View the **Dashboard** to see predictions

For local development with live reload:
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .

# Then open http://localhost:8080/portal.html
```

---

## 📊 Key Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| **Prediction Accuracy** | >80% | % of predicted outbreaks that occurred |
| **Lead Time** | 2-3 weeks | Average days of warning before hospital surge |
| **Response Time** | <48 hours | How quickly authorities act on critical alerts |
| **Coverage** | 100,000+ | Population covered in pilot phase |

---

## 🗓️ Roadmap

### Phase 1: Prototype (Feb-Apr 2026) ✅
- [x] Landing page
- [x] App mockups
- [x] Dashboard prototype
- [x] Pitch deck

### Phase 2: Pilot (May-Aug 2026)
- [ ] 20 pharmacies in Santa Cruz
- [ ] Real data collection
- [ ] Model validation
- [ ] Authority dashboard live

### Phase 3: Scale (2027)
- [ ] 500 pharmacies nationwide
- [ ] Government partnership
- [ ] Published research

---

## 👥 Team

**Founder & CEO:** Isaveth Navia Guzmán
- Systems Engineering Student, Santa Cruz, Bolivia
- Full-stack developer with experience building apps

**Medical Advisors:**
- Healthcare professionals providing clinical validation
- Connections to health system

---

## 📄 MIT Solve Application

This project is being submitted to the **MIT Solve Future Health Challenge 2026**.

📅 **Deadline:** February 23, 2026, 11:59pm ET

See [MIT-SOLVE-APPLICATION.md](MIT-SOLVE-APPLICATION.md) for the full application draft.

---

## 📞 Contact

- **Email:** [email@example.com]
- **LinkedIn:** [Your LinkedIn]
- **Location:** Santa Cruz, Bolivia 🇧🇴

---

## 📜 License

MIT License - See LICENSE file for details.

---

<p align="center">
  <strong>PULSE DENGUE</strong><br>
  Predicting outbreaks. Protecting communities. Saving lives.<br>
  🦟 → 📱 → 🧠 → 📊 → ⚡
</p>
