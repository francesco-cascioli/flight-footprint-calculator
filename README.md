# Flight Footprint Calculator

Una web app per calcolare l'impronta ecologica (footprint) di un viaggio aereo, calcolando le emissioni di CO₂ per passeggero.

## 🚀 Funzionalità

- **Selezione aeroporti**: Ricerca intelligente di aeroporti con autocompletamento
- **Calcolo CO₂**: Calcolo preciso delle emissioni usando l'API GoClimate
- **Multi-passeggeri**: Calcolo per più passeggeri
- **Database locale**: Aeroporti principali pre-caricati per risultati più veloci
- **Fallback API**: Integrazione con Airport Database API per aeroporti aggiuntivi

## 🛠️ Setup e Installazione

### 1. Clona il repository
```bash
git clone <repository-url>
cd flight-footprint-app
```

### 2. Installa le dipendenze
```bash
npm install
```

### 3. Configura l'API Key
1. Vai su [GoClimate](https://www.goclimate.com/) e registrati per ottenere una API key gratuita
2. Apri il file `.env` e sostituisci `your_api_key_here` con la tua API key:
```env
VITE_GOCLIMATE_API_KEY=la_tua_api_key_qui
```

### 4. Avvia l'applicazione
```bash
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

## 📡 API Utilizzate

### GoClimate API
- **Endpoint**: `https://api.goclimate.com/v1/flight_footprint`
- **Scopo**: Calcolo delle emissioni CO₂ per voli
- **Autenticazione**: API Key
- **Documentazione**: [GoClimate API Docs](https://api.goclimate.com/docs)

### Airport Database API
- **Endpoint**: `https://airportgap.com/api/airports`
- **Scopo**: Ricerca aeroporti per autocompletamento
- **Autenticazione**: Nessuna
- **Documentazione**: [Airport Database API](https://airportgap.com/docs#api_ref_get_airports)

## 🏗️ Struttura del Progetto

```
src/
├── components/
│   ├── AirportSelect.tsx    # Componente per selezione aeroporti
│   ├── PassengerInput.tsx   # Input per numero passeggeri
│   └── ResultCard.tsx       # Visualizzazione risultati
├── pages/
│   └── Calculator.tsx       # Pagina principale del calcolatore
├── services/
│   └── api.ts              # Servizi API per GoClimate
└── styles/
    └── main.css            # Stili CSS
```

## 🎯 Come Usare

1. **Seleziona aeroporto di partenza**: Digita il nome della città o il codice IATA
2. **Seleziona aeroporto di arrivo**: Digita il nome della città o il codice IATA  
3. **Inserisci numero passeggeri**: Default 1, massimo illimitato
4. **Clicca "Calculate footprint"**: Ottieni il calcolo delle emissioni CO₂

## 🔧 Tecnologie Utilizzate

- **React 19** - Framework frontend
- **TypeScript** - Linguaggio tipizzato
- **Vite** - Build tool e dev server
- **Axios** - Client HTTP per API calls
- **CSS3** - Styling moderno

## 📊 Esempi di Calcolo

- **Roma → Milano**: ~0.1 kg CO₂ per passeggero
- **Roma → Londra**: ~0.3 kg CO₂ per passeggero  
- **Roma → New York**: ~1.2 kg CO₂ per passeggero
- **Roma → Tokyo**: ~2.1 kg CO₂ per passeggero

## 🚨 Note Importanti

- L'API GoClimate ha limiti di rate limiting
- I calcoli sono basati su voli in classe economy
- I risultati sono indicativi e possono variare
- È necessaria una connessione internet per il funzionamento

## 🐛 Troubleshooting

### Errore "API key not configured"
- Verifica che il file `.env` esista
- Controlla che `VITE_GOCLIMATE_API_KEY` sia impostato correttamente
- Riavvia il server di sviluppo dopo aver modificato `.env`

### Errore "Invalid API key"
- Verifica che la tua API key sia valida su GoClimate
- Controlla che non ci siano spazi extra nella configurazione

### Aeroporti non trovati
- L'app usa un database locale per aeroporti principali
- Per aeroporti meno comuni, usa il codice IATA a 3 lettere
- Esempio: "FCO" per Roma Fiumicino

## 📝 Script Disponibili

```bash
npm run dev      # Avvia il server di sviluppo
npm run build    # Build per produzione
npm run preview  # Preview del build
npm run lint     # Linting del codice
```

## 🤝 Contribuire

1. Fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/amazing-feature`)
3. Commit delle modifiche (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è parte del Final Project per Start2Impact.

---

**Sviluppato con ❤️ per calcolare l'impatto ambientale dei viaggi aerei**