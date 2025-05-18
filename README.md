# Elecalculate

<a href="https://elecalculate.com">
    <img src="https://elecalculate.com/Pictures/favicon.png" alt="Elecalculate.com" width="100" height="100">
</a>

**Elecalculate** ist eine Website zur Berechnung verschiedenster Parameter der Elektrotechnik.

## Funktionen

- Vollständig offline nutzbar
- Entwickelt mit Unterstützung von ChatGPT
- Von Menschen getestet
- Zeigt jeden Rechenschritt an
- Regelmäßige Updates

---

## Über diesen Fork

> **Hinweis:**
> Dieser Fork dient ausschließlich zu Bildungszwecken, um Netzwerksicherheitsaspekte wie Cross-Site Scripting (XSS) praktisch zu untersuchen und zu beheben.

---

## Schnellstart

1. [Node.js](https://nodejs.org/) installieren
2. [Python 3.12](https://www.python.org/downloads/release/python-3120/) sollte installiert sein (Standard bei den meisten Distributionen)
3. `npm install` ausführen
4. Seite starten und Tests ausführen:
   - Headless: `npm run cy:run`
   - Interaktiv: `npm run cy:open`

> **Hinweis:**
> Die Test-Suite und Node.js-Tools sind für Entwickler und Maintainer gedacht.
> Endnutzer benötigen **kein** Node.js, um die Seite zu verwenden.

---

## Testen & Sicherheit

Dieser Fork enthält eine **umfassende Cypress End-to-End-Test-Suite** für alle Rechner und Glossar-/Suchfunktionen.

- **Funktionale Tests:** `cypress/e2e/functional/`
- **Security-Tests:** `cypress/e2e/security/`

Für fortgeschrittene Nutzung, Testorganisation und alle verfügbaren Skripte siehe [TESTING.md](./TESTING.md).

---

## Folge Elecalculate

Bleibe auf dem Laufenden und folge Elecalculate auf Social Media:

<a href="https://www.instagram.com/elecalculate">
    <img src="https://elecalculate.com/Pictures/instagram-logo.jpg" alt="Folge uns auf Instagram" width="60" height="60">
</a>