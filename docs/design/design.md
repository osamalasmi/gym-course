# Ontwerpdocument Sportschool De Kast (Cursusflow)

## 1. Context & scope

Dit ontwerp is gemaakt voor Sportschool "De Kast", als onderdeel van Hackathon 1,
Variant B (Cursusflow). Het ontwerp richt zich op drie user stories:

- **US-04 (Must)**: Cursus-addendum vereist voor inschrijving: een sporter mag
  alleen inschrijven voor een cursus als hij een cursus-addendum heeft.
- **US-05 (Must)**: Inschrijven voor een cursus: een sporter kan zich inschrijven
  voor een cursus, waarbij dubbele inschrijving wordt voorkomen.
- **US-06 (Could, stretch)**: Cursusinschrijving annuleren: een sporter kan zijn
  inschrijving annuleren.

De sportschool biedt drie cursussen aan (yoga, pilates, paaldansen), elk met
meerdere momenten/tijdsloten. Een sporter heeft een abonnement (1x/week, 2x/week
of onbeperkt) en kan daarnaast wel of geen cursus-addendum hebben.

## 2. Gegevenslaag

### ERD
Het datamodel bestaat uit vier tabellen: 'users', 'subscriptions', 'courses' en 'registrations'.

- **users**: bevat de gegevens van een sporter (naam, email, wachtwoord).
- **subscriptions**: het abonnement van een sporter (1x/week, 2x/week,
  onbeperkt), met een 'has_addendum'-vlag die aangeeft of de sporter een curses-addendum heeft.
- **fourses**: de aangeboden cursussen (yoga, pilates, paaldansen).
- **registrations**: de koppeltabel die vastlegt welke sporter is ingeschreven voor welke cursus, met een 'status' (active/cancelled) en het moment ('active_since').

*(https://dbdiagram.io/d/gym-course-6a99440d5450bea1bedb8b35)*

<img width="930" height="762" alt="image" src="https://github.com/user-attachments/assets/424fdda4-ae13-416c-941a-037a131d90e2" />

