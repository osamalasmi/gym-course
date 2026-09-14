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

<img width="600" alt="image" src="https://github.com/user-attachments/assets/424fdda4-ae13-416c-941a-037a131d90e2" />

## 3. Gebruikersperspectief

### Use case diagram

*(https://www.plantuml.com/plantuml/uml/PSv12eD0343HVKuHt5lGxeeCWaSeFK0w1ZewZIMPzFnLA2vqbv17-BqLqkBl31JBedZ_B5fOmOqZ6MCrk9eR9h7uqZHzMIeamyVGd0o9U6RTHNiKne9FdjCqx-OAiBx2IzXcl67N9OdPHmu1u1-3TRsTcyFUGiyohka_)*

<img width="600" alt="Use case diagram cursusflow" src="https://github.com/user-attachments/assets/e5d1bf76-0d1c-4d97-80cd-88542af8d688" />

Het diagram bevat een actor: de sporter.  Een medewerker rol is bewust buiter scope gelaten, omdat geen van de gekozen user stories (US-04, US-05, US-06) een medewerker-actie beschrijft.

De sporter heeft twee hoofddoelen:
- **Cursus inschrijven**
- **Cursus annuleren**

Daarnaast bevat het diagram de use case **Cursussen bekijken**, die via een
`<<include>>` relatie is gekoppeld aan "Cursus inschrijven". Cursussen bekijken
is namelijk geen doel dat de sporter apart kiest, maar een vaste eerste stap
die altijd onderdeel is van het inschrijfproces (zie US-05: "de sporter ziet de
beschikbare cursussen en momenten").


### Use case: Cursus inschrijven

**Actor:** Sporter
**Precondition:** de sporter is ingelogd.

**Normale verloop:**
1. De sporter bekijkt de beschikbare cursussen en momenten (`<<include>>` Cursussen bekijken).
2. De sporter kiest een cursus en een moment/tijdslot.
3. De sporter bevestigt de inschrijving.
4. Het systeem controleert of de sporter een abonnement heeft.
5. Het systeem controleert of de sporter een cursus addendum heeft.
6. Het systeem controleert of er al een actieve inschrijving bestaat voor dit moment.
7. De inschrijving wordt vastgelegd met status `active`.
8. De sporter ontvangt een bevestiging.

**Alternatieve/foutpaden:**
- Geen abonnement: foutmelding, inschrijving wordt geweigerd.
- Geen addendum: foutmelding, inschrijving wordt geweigerd.
- Al actief ingeschreven voor dit moment: foutmelding, dubbele inschrijving wordt voorkomen.

### Use case: Cursus annuleren

**Actor:** Sporter
**Precondition:** de sporter is ingelogd en heeft een actieve inschrijving.

**Normale verloop:**
1. De sporter selecteert een actieve inschrijving.
2. De sporter annuleert de inschrijving.
3. Het systeem zet de status van de inschrijving op `cancelled`.
4. De plek komt vrij voor andere sporters.
5. De sporter ontvangt een bevestiging van de annulering.

**Alternatieve/foutpaden:**
- Geen actieve inschrijving gevonden -> foutmelding.

---

### Wireframes / mock-ups
De wireframes (low-fidelity, gemaakt in HTML/CSS en via de html-to-design
plugin naar Figma geïmporteerd) dekken de volledige cursusflow: login,
cursusoverzicht, inschrijving bevestigen, succes- en foutmeldingen, en
"mijn inschrijvingen" met annuleren. Elk scherm volgt direct uit de use
case beschrijvingen, elke stap en elk foutpad heeft zijn eigen scherm.

<img width="500" height="615" alt="image" src="https://github.com/user-attachments/assets/532716f5-61ef-4437-a965-4f866afef9fe" />
<img width="500" height="618" alt="image" src="https://github.com/user-attachments/assets/832cd2be-2230-4147-8e7a-936f80bc4cfc" />
<img width="500" height="618" alt="image" src="https://github.com/user-attachments/assets/70d1b7fa-dc1f-421f-bd0e-3792983c5c28" />
<img width="500" height="617" alt="image" src="https://github.com/user-attachments/assets/83ce9afc-758d-4551-a041-23bd790fdc33" />

## 4. Programmalogica

### Activiteitendiagram: Cursus inschrijven

<img width="1000" alt="image" src="https://github.com/user-attachments/assets/aa3552df-c04e-423e-b879-751dd844db73" />

Na het bevestigen van de inschrijving checkt het systeem vier dingen
op volgorde: is de sporter ingelogd, heeft hij een abonnement, heeft
hij een addendum (US-04), en is hij al ingeschreven voor dit moment
(US-05). Gaat er iets mis, dan krijgt de sporter een duidelijke
foutmelding. Klopt alles, dan wordt de inschrijving opgeslagen als
`active` en krijgt de sporter een bevestiging.








