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
      { italian: 'Ho bisogno di aiuto.', german: 'Ich brauche Hilfe.' },
      { italian: 'La macchina di mio padre.', german: 'Das Auto meines Vaters.' },
      { italian: 'Un bicchiere di vino.', german: 'Ein Glas Wein.' },
      { italian: 'Di mattina mi alzo presto.', german: 'Morgens stehe ich früh auf.' },
      { italian: 'Che ne pensi di questo film?', german: 'Was denkst du über diesen Film?' },
      { italian: 'Ho paura di volare.', german: 'Ich habe Angst vor dem Fliegen.' },
      { italian: 'È più alto di me.', german: 'Er ist größer als ich.' },
      { italian: 'Una tazza di caffè.', german: 'Eine Tasse Kaffee.' },
      { italian: 'Smetto di fumare.', german: 'Ich höre auf zu rauchen.' },
      { italian: 'La città di Firenze.', german: 'Die Stadt Florenz.' },
      { italian: 'Di solito mangio a casa.', german: 'Normalerweise esse ich zu Hause.' }
    ]
  },

  A: {
    name: 'A (zu, an, bei)',
    sentences: [
      { italian: 'Vado a casa.', german: 'Ich gehe nach Hause.' },
      { italian: 'Scrivo a Luca.', german: 'Ich schreibe Luca.' },
      { italian: 'Alle otto.', german: 'Um acht Uhr.' },
      { italian: 'Penso a te.', german: 'Ich denke an dich.' },
      { italian: 'Abito a Milano.', german: 'Ich wohne in Mailand.' },
      { italian: 'A che ora arrivi?', german: 'Um wie viel Uhr kommst du an?' },
      { italian: 'Vado a piedi.', german: 'Ich gehe zu Fuß.' },
      { italian: 'Sono seduto a tavola.', german: 'Ich sitze am Tisch.' },
      { italian: 'Imparo a nuotare.', german: 'Ich lerne schwimmen.' },
      { italian: 'A destra c\'è la banca.', german: 'Rechts ist die Bank.' },
      { italian: 'Questa pizza sa di formaggio.', german: 'Diese Pizza schmeckt nach Käse.' },
      { italian: 'Aiuto a preparare la cena.', german: 'Ich helfe beim Abendessen zubereiten.' },
      { italian: 'A poco a poco imparo l\'italiano.', german: 'Nach und nach lerne ich Italienisch.' },
      { italian: 'Resto a letto tutto il giorno.', german: 'Ich bleibe den ganzen Tag im Bett.' }
    ]
  },

  IN: {
    name: 'IN (in, nach, mit)',
    sentences: [
      { italian: 'Vivo in Italia.', german: 'Ich lebe in Italien.' },
      { italian: 'Vado in ufficio.', german: 'Ich gehe ins Büro.' },
      { italian: 'Vengo in treno.', german: 'Ich komme mit dem Zug.' },
      { italian: 'In estate.', german: 'Im Sommer.' },
      { italian: 'Sono nato nel 1990.', german: 'Ich bin 1990 geboren.' },
      { italian: 'Vado in vacanza.', german: 'Ich fahre in den Urlaub.' },
      { italian: 'Lavoro in banca.', german: 'Ich arbeite in einer Bank.' },
      { italian: 'In centro ci sono molti negozi.', german: 'Im Zentrum gibt es viele Geschäfte.' },
      { italian: 'Pago in contanti.', german: 'Ich zahle bar.' },
      { italian: 'In fretta!', german: 'Schnell! / Beeil dich!' },
      { italian: 'Viaggio in aereo.', german: 'Ich reise mit dem Flugzeug.' },
      { italian: 'In questo momento sono occupato.', german: 'Im Moment bin ich beschäftigt.' },
      { italian: 'Credo in te.', german: 'Ich glaube an dich.' },
      { italian: 'In fondo alla strada.', german: 'Am Ende der Straße.' }
    ]
  },

  DA: {
    name: 'DA (von, aus, bei)',
    sentences: [
      { italian: 'Vengo da Milano.', german: 'Ich komme aus Mailand.' },
      { italian: 'Sono da Marco.', german: 'Ich bin bei Marco.' },
      { italian: 'Un regalo da parte mia.', german: 'Ein Geschenk von mir.' },
      { italian: 'Vado dal dottore.', german: 'Ich gehe zum Arzt.' },
      { italian: 'Da quanto tempo studi italiano?', german: 'Seit wann lernst du Italienisch?' },
      { italian: 'Lavoro da casa.', german: 'Ich arbeite von zu Hause aus.' },
      { italian: 'Qualcosa da bere?', german: 'Etwas zu trinken?' },
      { italian: 'Da bambino giocavo molto.', german: 'Als Kind habe ich viel gespielt.' },
      { italian: 'Un vestito da sera.', german: 'Ein Abendkleid.' },
      { italian: 'Passo da te stasera.', german: 'Ich komme heute Abend bei dir vorbei.' },
      { italian: 'È fatto da mia nonna.', german: 'Es ist von meiner Großmutter gemacht.' },
      { italian: 'Da solo non ce la faccio.', german: 'Alleine schaffe ich es nicht.' },
      { italian: 'Da qui si vede il mare.', german: 'Von hier sieht man das Meer.' }
    ]
  },

  CON: {
    name: 'CON (mit)',
    sentences: [
      { italian: 'Vengo con te.', german: 'Ich komme mit dir.' },
      { italian: 'Parlo con lui.', german: 'Ich spreche mit ihm.' },
      { italian: 'Taglio con il coltello.', german: 'Ich schneide mit dem Messer.' },
      { italian: 'Con piacere!', german: 'Mit Vergnügen! / Gerne!' },
      { italian: 'Vivo con i miei genitori.', german: 'Ich lebe bei meinen Eltern.' },
      { italian: 'Un panino con prosciutto.', german: 'Ein Brötchen mit Schinken.' },
      { italian: 'Con questo freddo resto a casa.', german: 'Bei dieser Kälte bleibe ich zu Hause.' },
      { italian: 'Sono d\'accordo con te.', german: 'Ich bin mit dir einverstanden.' },
      { italian: 'Con calma!', german: 'Immer mit der Ruhe!' },
      { italian: 'Gioco con il cane.', german: 'Ich spiele mit dem Hund.' },
      { italian: 'Lavoro con passione.', german: 'Ich arbeite mit Leidenschaft.' },
      { italian: 'Scrivo con la penna.', german: 'Ich schreibe mit dem Kugelschreiber.' },
      { italian: 'Con chi vai al cinema?', german: 'Mit wem gehst du ins Kino?' }
    ]
  },

  SU: {
    name: 'SU (auf, über)',
    sentences: [
      { italian: 'Sul tavolo.', german: 'Auf dem Tisch.' },
      { italian: 'Un film su Roma.', german: 'Ein Film über Rom.' },
      { italian: 'Metto tutto su internet.', german: 'Ich stelle alles ins Internet.' },
      { italian: 'Leggo un libro sulla storia italiana.', german: 'Ich lese ein Buch über die italienische Geschichte.' },
      { italian: 'Costa sui cento euro.', german: 'Es kostet etwa hundert Euro.' },
      { italian: 'Il gatto è sul divano.', german: 'Die Katze ist auf dem Sofa.' },
      { italian: 'Puoi contare su di me.', german: 'Du kannst auf mich zählen.' },
      { italian: 'Ho letto sul giornale.', german: 'Ich habe es in der Zeitung gelesen.' },
      { italian: 'Sull\'aereo ho dormito.', german: 'Im Flugzeug habe ich geschlafen.' },
      { italian: 'Uno su dieci.', german: 'Einer von zehn.' },
      { italian: 'Metti il cappotto su quella sedia.', german: 'Leg den Mantel auf diesen Stuhl.' },
      { italian: 'Su, andiamo!', german: 'Los, gehen wir!' },
      { italian: 'Ha sui quarant\'anni.', german: 'Er ist etwa vierzig Jahre alt.' }
    ]
  },

  PER: {
    name: 'PER (für, durch, um zu)',
    sentences: [
      { italian: 'Un regalo per te.', german: 'Ein Geschenk für dich.' },
      { italian: 'Passo per il centro.', german: 'Ich gehe durch die Innenstadt.' },
      { italian: 'Studio per lavorare.', german: 'Ich lerne, um zu arbeiten.' },
      { italian: 'Grazie per l\'aiuto.', german: 'Danke für die Hilfe.' },
      { italian: 'Parto per Londra domani.', german: 'Ich fahre morgen nach London.' },
      { italian: 'Per favore!', german: 'Bitte!' },
      { italian: 'Per me un caffè.', german: 'Für mich einen Kaffee.' },
      { italian: 'È troppo difficile per me.', german: 'Es ist zu schwierig für mich.' },
      { italian: 'Lavoro per una grande azienda.', german: 'Ich arbeite für ein großes Unternehmen.' },
      { italian: 'Per sempre.', german: 'Für immer.' },
      { italian: 'Per caso hai visto Maria?', german: 'Hast du zufällig Maria gesehen?' },
      { italian: 'Due per tre fa sei.', german: 'Zwei mal drei ist sechs.' },
      { italian: 'Per fortuna è andato tutto bene.', german: 'Zum Glück ist alles gut gegangen.' }
    ]
  },

  TRA_FRA: {
    name: 'TRA / FRA (zwischen, in)',
    sentences: [
      { italian: 'Tra due ore.', german: 'In zwei Stunden.' },
      { italian: 'Fra amici.', german: 'Unter Freunden.' },
      { italian: 'Tra le otto e le nove.', german: 'Zwischen acht und neun.' },
      { italian: 'Tra noi c\'è fiducia.', german: 'Zwischen uns gibt es Vertrauen.' },
      { italian: 'Arrivo fra poco.', german: 'Ich komme gleich.' },
      { italian: 'Tra te e me.', german: 'Zwischen dir und mir.' },
      { italian: 'Fra una settimana.', german: 'In einer Woche.' },
      { italian: 'La casa è tra la chiesa e il bar.', german: 'Das Haus ist zwischen der Kirche und der Bar.' },
      { italian: 'Scegli tra questi due.', german: 'Wähl zwischen diesen beiden.' },
      { italian: 'Tra l\'altro…', german: 'Unter anderem...' },
      { italian: 'Fra parentesi.', german: 'In Klammern.' },
      { italian: 'Tra poco è pronto.', german: 'Es ist gleich fertig.' },
      { italian: 'Tra sogno e realtà.', german: 'Zwischen Traum und Wirklichkeit.' }
    ]
  },

  SENZA: {
    name: 'SENZA (ohne)',
    sentences: [
      { italian: 'Caffè senza zucchero.', german: 'Kaffee ohne Zucker.' },
      { italian: 'È uscito senza dire niente.', german: 'Er ist gegangen, ohne etwas zu sagen.' },
      { italian: 'Senza di te non ce la faccio.', german: 'Ohne dich schaffe ich es nicht.' },
      { italian: 'Senza dubbio.', german: 'Ohne Zweifel.' },
      { italian: 'Non posso vivere senza musica.', german: 'Ich kann nicht ohne Musik leben.' },
      { italian: 'Senza problemi.', german: 'Kein Problem.' },
      { italian: 'Ha risposto senza pensare.', german: 'Er hat geantwortet, ohne nachzudenken.' },
      { italian: 'Un mondo senza guerra.', german: 'Eine Welt ohne Krieg.' },
      { italian: 'Senza parole.', german: 'Sprachlos.' },
      { italian: 'Sono rimasto senza soldi.', german: 'Ich habe kein Geld mehr.' },
      { italian: 'Senza fretta.', german: 'Ohne Eile.' },
      { italian: 'Non esco mai senza ombrello.', german: 'Ich gehe nie ohne Regenschirm raus.' }
    ]
  },

  CONTRO: {
    name: 'CONTRO (gegen)',
    sentences: [
      { italian: 'Sono contro questa idea.', german: 'Ich bin gegen diese Idee.' },
      { italian: 'Giocare contro una squadra forte.', german: 'Gegen eine starke Mannschaft spielen.' },
      { italian: 'L\'auto è andata contro il muro.', german: 'Das Auto ist gegen die Wand gefahren.' },
      { italian: 'Lottare contro le ingiustizie.', german: 'Gegen Ungerechtigkeiten kämpfen.' },
      { italian: 'Non ho niente contro di te.', german: 'Ich habe nichts gegen dich.' },
      { italian: 'Ha votato contro la proposta.', german: 'Er hat gegen den Vorschlag gestimmt.' },
      { italian: 'Contro ogni previsione.', german: 'Entgegen aller Erwartungen.' },
      { italian: 'È un farmaco contro il mal di testa.', german: 'Es ist ein Mittel gegen Kopfschmerzen.' },
      { italian: 'Remare contro corrente.', german: 'Gegen den Strom rudern.' },
      { italian: 'Tutti contro uno.', german: 'Alle gegen einen.' },
      { italian: 'Mi sono battuto contro la malattia.', german: 'Ich habe gegen die Krankheit gekämpft.' },
      { italian: 'Protestare contro il governo.', german: 'Gegen die Regierung protestieren.' }
    ]
  },

  VERSO: {
    name: 'VERSO (Richtung, gegen)',
    sentences: [
      { italian: 'Vado verso casa.', german: 'Ich gehe Richtung nach Hause.' },
      { italian: 'Verso le otto.', german: 'Gegen acht Uhr.' },
      { italian: 'Cammina verso di me.', german: 'Er geht auf mich zu.' },
      { italian: 'Verso sera fa più fresco.', german: 'Gegen Abend wird es kühler.' },
      { italian: 'Il treno va verso nord.', german: 'Der Zug fährt Richtung Norden.' },
      { italian: 'Ha un atteggiamento positivo verso la vita.', german: 'Er hat eine positive Einstellung zum Leben.' },
      { italian: 'Verso la fine del mese.', german: 'Gegen Ende des Monats.' },
      { italian: 'Guarda verso il mare.', german: 'Er schaut Richtung Meer.' },
      { italian: 'Verso mezzanotte sono andato a letto.', german: 'Gegen Mitternacht bin ich ins Bett gegangen.' },
      { italian: 'Si muove verso l\'uscita.', german: 'Er bewegt sich zum Ausgang.' },
      { italian: 'Verso i vent\'anni.', german: 'Um die zwanzig Jahre.' },
      { italian: 'Il rispetto verso gli altri.', german: 'Der Respekt gegenüber anderen.' }
    ]
  },

  ENTRO: {
    name: 'ENTRO (bis)',
    sentences: [
      { italian: 'Entro domani.', german: 'Bis morgen.' },
      { italian: 'Entro le sei.', german: 'Bis sechs Uhr.' },
      { italian: 'Devo finire entro venerdì.', german: 'Ich muss bis Freitag fertig sein.' },
      { italian: 'Entro la fine dell\'anno.', german: 'Bis zum Ende des Jahres.' },
      { italian: 'Rispondimi entro una settimana.', german: 'Antworte mir innerhalb einer Woche.' },
      { italian: 'Entro quando devi consegnare il progetto?', german: 'Bis wann musst du das Projekt abgeben?' },
      { italian: 'Arrivo entro un\'ora.', german: 'Ich komme innerhalb einer Stunde.' },
      { italian: 'Entro i limiti del possibile.', german: 'Im Rahmen des Möglichen.' },
      { italian: 'Paga entro il 15 del mese.', german: 'Zahle bis zum 15. des Monats.' },
      { italian: 'Entro breve tempo.', german: 'In kurzer Zeit.' },
      { italian: 'Sarà pronto entro mezzogiorno.', german: 'Es wird bis Mittag fertig sein.' },
      { italian: 'Entro i confini nazionali.', german: 'Innerhalb der Landesgrenzen.' }
    ]
  },

  OLTRE: {
    name: 'OLTRE (über … hinaus, außer)',
    sentences: [
      { italian: 'Oltre a questo…', german: 'Außer / neben diesem…' },
      { italian: 'Oltre le aspettative.', german: 'Über die Erwartungen hinaus.' },
      { italian: 'Oltre al lavoro, faccio sport.', german: 'Neben der Arbeit treibe ich Sport.' },
      { italian: 'Oltre cento persone.', german: 'Über hundert Personen.' },
      { italian: 'Non vedo oltre.', german: 'Ich kann nicht weiter sehen.' },
      { italian: 'Oltre i confini.', german: 'Jenseits der Grenzen.' },
      { italian: 'Oltre al fatto che…', german: 'Abgesehen davon, dass…' },
      { italian: 'Ha lavorato oltre l\'orario.', german: 'Er hat über die Arbeitszeit hinaus gearbeitet.' },
      { italian: 'Oltre modo gentile.', german: 'Außerordentlich freundlich.' },
      { italian: 'Oltre la montagna c\'è il lago.', german: 'Hinter dem Berg ist der See.' },
      { italian: 'Oltre a Maria, viene anche Luca.', german: 'Außer Maria kommt auch Luca.' },
      { italian: 'Non guardare oltre le apparenze.', german: 'Schau nicht nur auf den Schein.' }
    ]
  },

  SECONDO: {
    name: 'SECONDO (laut, nach Meinung)',
    sentences: [
      { italian: 'Secondo me…', german: 'Meiner Meinung nach…' },
      { italian: 'Secondo il medico…', german: 'Laut dem Arzt…' },
      { italian: 'Secondo le statistiche.', german: 'Laut den Statistiken.' },
      { italian: 'Secondo te, chi ha ragione?', german: 'Deiner Meinung nach, wer hat recht?' },
      { italian: 'Secondo la legge.', german: 'Nach dem Gesetz.' },
      { italian: 'Secondo le previsioni pioverà.', german: 'Laut Vorhersage wird es regnen.' },
      { italian: 'Secondo i miei calcoli.', german: 'Nach meinen Berechnungen.' },
      { italian: 'Secondo lui è facile.', german: 'Seiner Meinung nach ist es einfach.' },
      { italian: 'Secondo le regole.', german: 'Nach den Regeln.' },
      { italian: 'Secondo quanto detto.', german: 'Laut dem, was gesagt wurde.' },
      { italian: 'Secondo la tradizione.', german: 'Nach der Tradition.' },
      { italian: 'Secondo me, dovresti andare.', german: 'Meiner Meinung nach solltest du gehen.' }
    ]
  },

  DURANTE: {
    name: 'DURANTE (während)',
    sentences: [
      { italian: 'Durante la cena.', german: 'Während des Abendessens.' },
      { italian: 'Durante il viaggio.', german: 'Während der Reise.' },
      { italian: 'Durante la lezione non si parla.', german: 'Während des Unterrichts spricht man nicht.' },
      { italian: 'Durante l\'estate lavoro.', german: 'Während des Sommers arbeite ich.' },
      { italian: 'Durante la notte ha piovuto.', german: 'Während der Nacht hat es geregnet.' },
      { italian: 'Durante la riunione.', german: 'Während der Besprechung.' },
      { italian: 'Durante il film mi sono addormentato.', german: 'Während des Films bin ich eingeschlafen.' },
      { italian: 'Durante la guerra.', german: 'Während des Krieges.' },
      { italian: 'Durante il fine settimana.', german: 'Am Wochenende.' },
      { italian: 'Durante la pausa pranzo.', german: 'Während der Mittagspause.' },
      { italian: 'Durante tutta la vita.', german: 'Das ganze Leben lang.' },
      { italian: 'Durante le vacanze di Natale.', german: 'Während der Weihnachtsferien.' }
    ]
  },

  PRIMA_DI: {
    name: 'PRIMA DI (vor)',
    sentences: [
      { italian: 'Prima di uscire.', german: 'Bevor ich rausgehe.' },
      { italian: 'Prima del lavoro.', german: 'Vor der Arbeit.' },
      { italian: 'Prima di tutto.', german: 'Vor allem.' },
      { italian: 'Prima di cena.', german: 'Vor dem Abendessen.' },
      { italian: 'Prima di partire, chiamami.', german: 'Bevor du gehst, ruf mich an.' },
      { italian: 'Prima di me c\'era molta gente.', german: 'Vor mir waren viele Leute.' },
      { italian: 'Prima di dormire leggo.', german: 'Vor dem Schlafen lese ich.' },
      { italian: 'Prima o poi.', german: 'Früher oder später.' },
      { italian: 'Prima di decidere, pensaci.', german: 'Bevor du entscheidest, denk darüber nach.' },
      { italian: 'Prima di mezzogiorno.', german: 'Vor Mittag.' },
      { italian: 'Prima del tempo.', german: 'Vor der Zeit. / Vorzeitig.' },
      { italian: 'Prima di rispondere, ascolta.', german: 'Bevor du antwortest, hör zu.' }
    ]
  },

  DOPO: {
    name: 'DOPO (nach)',
    sentences: [
      { italian: 'Dopo il lavoro.', german: 'Nach der Arbeit.' },
      { italian: 'Dopo cena.', german: 'Nach dem Abendessen.' },
      { italian: 'Dopo di te.', german: 'Nach dir.' },
      { italian: 'A dopo!', german: 'Bis später!' },
      { italian: 'Dopo la pioggia viene il sereno.', german: 'Nach dem Regen kommt die Sonne.' },
      { italian: 'Poco dopo.', german: 'Kurz danach.' },
      { italian: 'Dopo aver mangiato.', german: 'Nachdem ich gegessen habe.' },
      { italian: 'Dopo tutto.', german: 'Schließlich. / Immerhin.' },
      { italian: 'Il giorno dopo.', german: 'Am Tag danach.' },
      { italian: 'Dopo le vacanze torno al lavoro.', german: 'Nach dem Urlaub kehre ich zur Arbeit zurück.' },
      { italian: 'Dopo mezzanotte.', german: 'Nach Mitternacht.' },
      { italian: 'Dopo anni di studio.', german: 'Nach Jahren des Studiums.' }
    ]
  },

  FINO_A: {
    name: 'FINO A (bis, bis zu)',
    sentences: [
      { italian: 'Fino a domani.', german: 'Bis morgen.' },
      { italian: 'Fino a casa.', german: 'Bis nach Hause.' },
      { italian: 'Fino a quando?', german: 'Bis wann?' },
      { italian: 'Fino alla fine.', german: 'Bis zum Ende.' },
      { italian: 'Lavoro fino alle sei.', german: 'Ich arbeite bis sechs Uhr.' },
      { italian: 'Fino a qui tutto bene.', german: 'Bis hierhin alles gut.' },
      { italian: 'Fino a ieri non lo sapevo.', german: 'Bis gestern wusste ich es nicht.' },
      { italian: 'Cammina fino al semaforo.', german: 'Geh bis zur Ampel.' },
      { italian: 'Fino all\'ultimo momento.', german: 'Bis zum letzten Moment.' },
      { italian: 'Fino a nuovo ordine.', german: 'Bis auf Weiteres.' },
      { italian: 'Conta fino a dieci.', german: 'Zähl bis zehn.' },
      { italian: 'Fino a prova contraria.', german: 'Bis zum Beweis des Gegenteils.' }
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
      { italian: 'Dipende da te.', german: 'Es hängt von dir ab.' },
      { italian: 'Interessarsi a qualcosa.', german: 'Sich für etwas interessieren.' },
      { italian: 'Fidare di qualcuno.', german: 'Jemandem vertrauen.' },
      { italian: 'Cominciare a lavorare.', german: 'Anfangen zu arbeiten.' },
      { italian: 'Smettere di parlare.', german: 'Aufhören zu sprechen.' },
      { italian: 'Riuscire a capire.', german: 'Es schaffen zu verstehen.' },
      { italian: 'Cercare di aiutare.', german: 'Versuchen zu helfen.' },
      { italian: 'Continuare a studiare.', german: 'Weitermachen zu lernen.' },
      { italian: 'Sognare di viaggiare.', german: 'Davon träumen zu reisen.' },
      { italian: 'Abituarsi a vivere qui.', german: 'Sich daran gewöhnen, hier zu leben.' },
      { italian: 'Decidere di partire.', german: 'Sich entscheiden abzureisen.' }
    ]
  }
};
