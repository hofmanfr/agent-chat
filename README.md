# AI Research Assistant Chat

## Übersicht

Dieses Tool ist ein AI-gestützter Forschungsassistent, der CrewAI Agents innerhalb von Langflow nutzt, um Recherchen zu verschiedenen Themen durchzuführen. Es bietet eine benutzerfreundliche Chat-Oberfläche, die es Benutzern ermöglicht, Fragen zu stellen und detaillierte Antworten zu erhalten.

## Hauptfunktionen

- Chatbasierte Benutzeroberfläche für einfache Interaktion
- Integration mit Langflow API für KI-gestützte Antworten
- Möglichkeit, mehrere Chat-Sitzungen zu erstellen und zu verwalten
- Benutzerauthentifizierung und -verwaltung mit Supabase
- Responsive Design für verschiedene Bildschirmgrößen

## Technologie-Stack

- Next.js 14 (App Router)
- TypeScript
- Supabase für Authentifizierung und Datenspeicherung
- TailwindCSS für Styling
- Framer Motion für Animationen
- Langflow API für KI-Funktionalitäten

## Einrichtung und Betrieb

1. Klonen Sie das Repository:
   ```
   git clone [Repository-URL]
   ```

2. Installieren Sie die Abhängigkeiten:
   ```
   npm install
   ```

3. Konfigurieren Sie die Umgebungsvariablen:
   - Kopieren Sie `.env.example` zu `.env.local`
   - Füllen Sie die erforderlichen Variablen aus, einschließlich Supabase und Langflow API-Schlüssel

4. Richten Sie die Supabase-Datenbank ein:
   - Erstellen Sie die erforderlichen Tabellen (`chat_sessions`, `messages`)
   - Konfigurieren Sie die Authentifizierung in Ihrem Supabase-Projekt

5. Starten Sie den Entwicklungsserver:
   ```
   npm run dev
   ```

## Wichtige Hinweise

- Stellen Sie sicher, dass Sie über gültige API-Schlüssel für Supabase und Langflow verfügen.
- Die Langflow API muss korrekt konfiguriert sein, um die gewünschten KI-Funktionen bereitzustellen.
- Beachten Sie die Datenschutzbestimmungen bei der Verarbeitung von Benutzeranfragen und -daten.
- Regelmäßige Updates der Abhängigkeiten werden empfohlen, um Sicherheit und Leistung zu gewährleisten.

## Anpassung

- Die Benutzeroberfläche kann durch Änderung der TailwindCSS-Klassen angepasst werden.
- Zusätzliche Funktionen können durch Erweiterung der Chat-Komponente und API-Routen hinzugefügt werden.

## Unterstützung

Bei Fragen oder Problemen erstellen Sie bitte ein Issue im GitHub-Repository oder kontaktieren Sie das Entwicklungsteam.

## Quelle

Dieses Projekt wurde inspiriert durch das folgende Video-Tutorial:
[Building an AI Agent with LangFlow, CrewAI, and Supabase](https://www.youtube.com/watch?v=vScKVTF2kk4)
