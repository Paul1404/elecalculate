## Über diesen Fork

Dieser Fork dient ausschließlich zu Bildungszwecken, um Netzwerksicherheitsaspekte wie Cross-Site Scripting (XSS) praktisch zu untersuchen und zu beheben.


# Elecalculate

<a href="https://elecalculate.com">
    <img src="https://elecalculate.com/Pictures/favicon.png" alt="Elecalculate.com" width="100" height="100">
</a>

**Elecalculate** is a website designed to help you calculate various electronics parameters

## Features
- Fully functional offline
- Developed with assistance from ChatGPT.
- tested by humans
- Generates each step to reach the solution
- Updated regularly

### 🧪 Automatisiertes Testen & Sicherheit

Dieser Fork enthält eine **umfassende Cypress End-to-End-Test-Suite** für alle Rechner und Glossar-/Suchfunktionen.

- **Automatisierte Regressionstests** für alle Rechner und Formulare
- **Getestet im interaktiven und Headless-/CI-Modus**
- **Bereit für CI/CD-Integration**
- **Sicheres Refactoring:** Ermöglicht testgetriebene Absicherung gegen XSS und Eingabevalidierung

#### **So führst du die Tests aus**

1. [Node.js](https://nodejs.org/) installieren
2. [Python 3.12](https://www.python.org/downloads/release/python-3120/) Sollte auch installiert sein (Standard bei den Großteil der Distributionen)
3. `npm install` ausführen
4. Seite starten und Tests ausführen:
   - Headless: `npm run cy:run`
   - Interaktiv: `npm run cy:open`

> **Hinweis:**
> Die Test-Suite und Node.js-Tools sind für Entwickler und Maintainer gedacht.
> Endnutzer benötigen **kein** Node.js, um die Seite zu verwenden.


## Follow Elecalculate
Stay updated by following elecalculate on Social Media:

<a href="https://www.instagram.com/elecalculate">
    <img src="https://elecalculate.com/Pictures/instagram-logo.jpg" alt="Follow us on Instagram" width="60" height="60">
</a>
