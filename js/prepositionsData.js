/* ============================================
   Italian Prepositions Data
   ============================================ */

const PrepositionsData = {
  DI: {
    name: 'DI (von, aus, über, Besitz)',
    sentences: [
      { italian: 'Il libro di Maria.', german: 'Das Buch von Maria.' },
      { italian: 'Sono di Roma.', german: 'Ich komme aus Rom.' },
      { italian: 'Parliamo di lavoro.', german: 'Wir sprechen über die Arbeit.' },
      { italian: 'Ho bisogno di aiuto.', german: 'Ich brauche Hilfe.' }
    ]
  },

  A: {
    name: 'A (zu, an, bei)',
    sentences: [
      { italian: 'Vado a casa.', german: 'Ich gehe nach Hause.' },
      { italian: 'Scrivo a Luca.', german: 'Ich schreibe Luca.' },
      { italian: 'Alle otto.', german: 'Um acht Uhr.' },
      { italian: 'Penso a te.', german: 'Ich denke an dich.' }
    ]
  },

  IN: {
    name: 'IN (in, nach, mit)',
    sentences: [
      { italian: 'Vivo in Italia.', german: 'Ich lebe in Italien.' },
      { italian: 'Vado in ufficio.', german: 'Ich gehe ins Büro.' },
      { italian: 'Vengo in treno.', german: 'Ich komme mit dem Zug.' },
      { italian: 'In estate.', german: 'Im Sommer.' }
    ]
  },

  DA: {
    name: 'DA (von, aus, bei)',
    sentences: [
      { italian: 'Vengo da Milano.', german: 'Ich komme aus Mailand.' },
      { italian: 'Sono da Marco.', german: 'Ich bin bei Marco.' },
      { italian: 'Un regalo da parte mia.', german: 'Ein Geschenk von mir.' }
    ]
  },

  CON: {
    name: 'CON (mit)',
    sentences: [
      { italian: 'Vengo con te.', german: 'Ich komme mit dir.' },
      { italian: 'Parlo con lui.', german: 'Ich spreche mit ihm.' },
      { italian: 'Taglio con il coltello.', german: 'Ich schneide mit dem Messer.' }
    ]
  },

  SU: {
    name: 'SU (auf, über)',
    sentences: [
      { italian: 'Sul tavolo.', german: 'Auf dem Tisch.' },
      { italian: 'Un film su Roma.', german: 'Ein Film über Rom.' },
      { italian: 'Metto tutto su internet.', german: 'Ich stelle alles ins Internet.' }
    ]
  },

  PER: {
    name: 'PER (für, durch, um zu)',
    sentences: [
      { italian: 'Un regalo per te.', german: 'Ein Geschenk für dich.' },
      { italian: 'Passo per il centro.', german: 'Ich gehe durch die Innenstadt.' },
      { italian: 'Studio per lavorare.', german: 'Ich lerne, um zu arbeiten.' }
    ]
  },

  TRA_FRA: {
    name: 'TRA / FRA (zwischen, in)',
    sentences: [
      { italian: 'Tra due ore.', german: 'In zwei Stunden.' },
      { italian: 'Fra amici.', german: 'Unter Freunden.' },
      { italian: 'Tra le otto e le nove.', german: 'Zwischen acht und neun.' }
    ]
  },

  SENZA: {
    name: 'SENZA (ohne)',
    sentences: [
      { italian: 'Caffè senza zucchero.', german: 'Kaffee ohne Zucker.' },
      { italian: 'È uscito senza dire niente.', german: 'Er ist gegangen, ohne etwas zu sagen.' }
    ]
  },

  CONTRO: {
    name: 'CONTRO (gegen)',
    sentences: [
      { italian: 'Sono contro questa idea.', german: 'Ich bin gegen diese Idee.' },
      { italian: 'Giocare contro una squadra forte.', german: 'Gegen eine starke Mannschaft spielen.' }
    ]
  },

  VERSO: {
    name: 'VERSO (Richtung, gegen)',
    sentences: [
      { italian: 'Vado verso casa.', german: 'Ich gehe Richtung nach Hause.' },
      { italian: 'Verso le otto.', german: 'Gegen acht Uhr.' }
    ]
  },

  ENTRO: {
    name: 'ENTRO (bis)',
    sentences: [
      { italian: 'Entro domani.', german: 'Bis morgen.' },
      { italian: 'Entro le sei.', german: 'Bis sechs Uhr.' }
    ]
  },

  OLTRE: {
    name: 'OLTRE (über … hinaus, außer)',
    sentences: [
      { italian: 'Oltre a questo…', german: 'Außer / neben diesem…' },
      { italian: 'Oltre le aspettative.', german: 'Über die Erwartungen hinaus.' }
    ]
  },

  SECONDO: {
    name: 'SECONDO (laut, nach Meinung)',
    sentences: [
      { italian: 'Secondo me…', german: 'Meiner Meinung nach…' },
      { italian: 'Secondo il medico…', german: 'Laut dem Arzt…' }
    ]
  },

  DURANTE: {
    name: 'DURANTE (während)',
    sentences: [
      { italian: 'Durante la cena.', german: 'Während des Abendessens.' },
      { italian: 'Durante il viaggio.', german: 'Während der Reise.' }
    ]
  },

  PRIMA_DI: {
    name: 'PRIMA DI (vor)',
    sentences: [
      { italian: 'Prima di uscire.', german: 'Bevor ich rausgehe.' },
      { italian: 'Prima del lavoro.', german: 'Vor der Arbeit.' }
    ]
  },

  DOPO: {
    name: 'DOPO (nach)',
    sentences: [
      { italian: 'Dopo il lavoro.', german: 'Nach der Arbeit.' },
      { italian: 'Dopo cena.', german: 'Nach dem Abendessen.' }
    ]
  },

  FINO_A: {
    name: 'FINO A (bis, bis zu)',
    sentences: [
      { italian: 'Fino a domani.', german: 'Bis morgen.' },
      { italian: 'Fino a casa.', german: 'Bis nach Hause.' }
    ]
  },

  VERB_PREPOSITIONS: {
    name: 'Präposition + Verb',
    sentences: [
      { italian: 'Pensare a qualcuno.', german: 'An jemanden denken.' },
      { italian: 'Pensare di fare qualcosa.', german: 'Vorhaben, etwas zu tun.' },
      { italian: 'Credere a qualcuno.', german: 'Jemandem glauben.' },
      { italian: 'Credere in qualcosa.', german: 'An etwas glauben.' },
      { italian: 'Parlare di qualcosa.', german: 'Über etwas sprechen.' },
      { italian: 'Parlare con qualcuno.', german: 'Mit jemandem sprechen.' },
      { italian: 'Andare a Roma.', german: 'Nach Rom fahren.' },
      { italian: 'Andare in Italia.', german: 'Nach Italien fahren.' },
      { italian: 'Uscire con amici.', german: 'Mit Freunden ausgehen.' },
      { italian: 'Dipende da te.', german: 'Es hängt von dir ab.' }
    ]
  }
};
