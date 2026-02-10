/* ============================================
   Italian Prepositions Data
   ============================================ */

const PrepositionsData = {
  DI: {
    name: 'DI (von, aus, über, Besitz)',
    sentences: [
      { italian: 'Il libro di Maria.', german: 'Das Buch von Maria.', explanation: 'di = Besitz anzeigen. "Il libro di Maria" bedeutet "das Buch, das Maria gehört".' },
      { italian: 'Sono di Roma.', german: 'Ich komme aus Rom.', explanation: 'di = Herkunft. "Essere di" + Ort zeigt, woher man kommt.' },
      { italian: 'Parliamo di lavoro.', german: 'Wir sprechen über die Arbeit.', explanation: 'di = Thema. "Parlare di" bedeutet "über etwas sprechen".' },
      { italian: 'Ho bisogno di aiuto.', german: 'Ich brauche Hilfe.', explanation: 'di = nach bestimmten Verben. "Avere bisogno di" = brauchen.' },
      { italian: 'La macchina di mio padre.', german: 'Das Auto meines Vaters.', explanation: 'di = Genitiv/Besitz. Ersetzt den deutschen Genitiv.' },
      { italian: 'Un bicchiere di vino.', german: 'Ein Glas Wein.', explanation: 'di = Inhalt/Menge. Zeigt an, was das Gefäß enthält.' },
      { italian: 'Di mattina mi alzo presto.', german: 'Morgens stehe ich früh auf.', explanation: 'di = Tageszeit. "Di mattina/sera/notte" für Tageszeiten.' },
      { italian: 'Che ne pensi di questo film?', german: 'Was denkst du über diesen Film?', explanation: 'di = Meinung. "Pensare di" bedeutet "denken über".' },
      { italian: 'Ho paura di volare.', german: 'Ich habe Angst vor dem Fliegen.', explanation: 'di = nach Emotionen. "Avere paura di" = Angst haben vor.' },
      { italian: 'È più alto di me.', german: 'Er ist größer als ich.', explanation: 'di = Vergleich. Bei Komparativ ohne "che" verwendet man "di".' },
      { italian: 'Una tazza di caffè.', german: 'Eine Tasse Kaffee.', explanation: 'di = Mengenangabe. "Una tazza/bottiglia/bicchiere di..."' },
      { italian: 'Smetto di fumare.', german: 'Ich höre auf zu rauchen.', explanation: 'di = vor Infinitiv. "Smettere di" + Infinitiv = aufhören zu.' },
      { italian: 'La città di Firenze.', german: 'Die Stadt Florenz.', explanation: 'di = Apposition. Verbindet "die Stadt" mit dem Namen.' },
      { italian: 'Di solito mangio a casa.', german: 'Normalerweise esse ich zu Hause.', explanation: 'di = in festen Wendungen. "Di solito" = normalerweise.' }
    ]
  },

  A: {
    name: 'A (zu, an, bei)',
    sentences: [
      { italian: 'Vado a casa.', german: 'Ich gehe nach Hause.', explanation: 'a = Richtung/Ziel. "Andare a" + Ort für Bewegung zu einem Ziel.' },
      { italian: 'Scrivo a Luca.', german: 'Ich schreibe Luca.', explanation: 'a = indirektes Objekt. "Scrivere a qualcuno" = jemandem schreiben.' },
      { italian: 'Alle otto.', german: 'Um acht Uhr.', explanation: 'a = Uhrzeit. "A/alle" + Uhrzeit für Zeitangaben.' },
      { italian: 'Penso a te.', german: 'Ich denke an dich.', explanation: 'a = nach bestimmten Verben. "Pensare a" = denken an.' },
      { italian: 'Abito a Milano.', german: 'Ich wohne in Mailand.', explanation: 'a = bei Städten. "Abitare/vivere a" + Stadt.' },
      { italian: 'A che ora arrivi?', german: 'Um wie viel Uhr kommst du an?', explanation: 'a = Frage nach Uhrzeit. "A che ora?" = um wie viel Uhr?' },
      { italian: 'Vado a piedi.', german: 'Ich gehe zu Fuß.', explanation: 'a = Art und Weise. "A piedi" = zu Fuß (feste Wendung).' },
      { italian: 'Sono seduto a tavola.', german: 'Ich sitze am Tisch.', explanation: 'a = Position. "A tavola" = am Tisch (beim Essen).' },
      { italian: 'Imparo a nuotare.', german: 'Ich lerne schwimmen.', explanation: 'a = vor Infinitiv. "Imparare a" + Infinitiv = lernen zu.' },
      { italian: 'A destra c\'è la banca.', german: 'Rechts ist die Bank.', explanation: 'a = Richtungsangabe. "A destra/sinistra" = rechts/links.' },
      { italian: 'Aiuto a preparare la cena.', german: 'Ich helfe beim Abendessen zubereiten.', explanation: 'a = vor Infinitiv. "Aiutare a" + Infinitiv = helfen bei.' },
      { italian: 'A poco a poco imparo l\'italiano.', german: 'Nach und nach lerne ich Italienisch.', explanation: 'a = Redewendung. "A poco a poco" = nach und nach, allmählich.' },
      { italian: 'Resto a letto tutto il giorno.', german: 'Ich bleibe den ganzen Tag im Bett.', explanation: 'a = Zustand. "A letto" = im Bett (feste Wendung).' }
    ]
  },

  IN: {
    name: 'IN (in, nach, mit)',
    sentences: [
      { italian: 'Vivo in Italia.', german: 'Ich lebe in Italien.', explanation: 'in = bei Ländern. "Vivere/abitare in" + Land (ohne Artikel).' },
      { italian: 'Vado in ufficio.', german: 'Ich gehe ins Büro.', explanation: 'in = Richtung zu Gebäuden. "Andare in" + Gebäude (ohne Artikel).' },
      { italian: 'Vengo in treno.', german: 'Ich komme mit dem Zug.', explanation: 'in = Transportmittel. "In treno/auto/aereo" = mit dem Zug/Auto/Flugzeug.' },
      { italian: 'In estate.', german: 'Im Sommer.', explanation: 'in = Jahreszeiten. "In estate/inverno/primavera/autunno".' },
      { italian: 'Sono nato nel 1990.', german: 'Ich bin 1990 geboren.', explanation: 'in = Jahreszahl. "Nel + Jahr" für Geburtsjahr etc.' },
      { italian: 'Vado in vacanza.', german: 'Ich fahre in den Urlaub.', explanation: 'in = feste Wendung. "Andare in vacanza" = in Urlaub fahren.' },
      { italian: 'Lavoro in banca.', german: 'Ich arbeite in einer Bank.', explanation: 'in = Arbeitsort. "Lavorare in" + Institution ohne Artikel.' },
      { italian: 'In centro ci sono molti negozi.', german: 'Im Zentrum gibt es viele Geschäfte.', explanation: 'in = Ortsangabe. "In centro" = im Zentrum.' },
      { italian: 'Pago in contanti.', german: 'Ich zahle bar.', explanation: 'in = Art und Weise. "In contanti" = bar (in bar).' },
      { italian: 'In fretta!', german: 'Schnell! / Beeil dich!', explanation: 'in = Zustand. "In fretta" = in Eile, schnell.' },
      { italian: 'Viaggio in aereo.', german: 'Ich reise mit dem Flugzeug.', explanation: 'in = Transportmittel. Ohne Artikel bei Verkehrsmitteln.' },
      { italian: 'In questo momento sono occupato.', german: 'Im Moment bin ich beschäftigt.', explanation: 'in = Zeitpunkt. "In questo momento" = in diesem Moment.' },
      { italian: 'Credo in te.', german: 'Ich glaube an dich.', explanation: 'in = nach bestimmten Verben. "Credere in" = glauben an.' },
      { italian: 'In fondo alla strada.', german: 'Am Ende der Straße.', explanation: 'in = Position. "In fondo a" = am Ende von.' }
    ]
  },

  DA: {
    name: 'DA (von, aus, bei)',
    sentences: [
      { italian: 'Vengo da Milano.', german: 'Ich komme aus Mailand.', explanation: 'da = Herkunft/Ausgangspunkt. "Venire da" + Ort.' },
      { italian: 'Sono da Marco.', german: 'Ich bin bei Marco.', explanation: 'da = bei Personen. "Essere/andare da" + Person = bei/zu jemandem.' },
      { italian: 'Un regalo da parte mia.', german: 'Ein Geschenk von mir.', explanation: 'da = Absender. "Da parte di" = von Seiten, im Namen von.' },
      { italian: 'Vado dal dottore.', german: 'Ich gehe zum Arzt.', explanation: 'da = zu Personen (Berufe). "Dal dottore" = zum Arzt.' },
      { italian: 'Da quanto tempo studi italiano?', german: 'Seit wann lernst du Italienisch?', explanation: 'da = seit (Zeitdauer). "Da quanto tempo" = seit wann, wie lange.' },
      { italian: 'Lavoro da casa.', german: 'Ich arbeite von zu Hause aus.', explanation: 'da = Ausgangspunkt. "Da casa" = von zu Hause.' },
      { italian: 'Qualcosa da bere?', german: 'Etwas zu trinken?', explanation: 'da = Zweck. "Qualcosa da + Infinitiv" = etwas zum...' },
      { italian: 'Da bambino giocavo molto.', german: 'Als Kind habe ich viel gespielt.', explanation: 'da = Lebensabschnitt. "Da bambino/giovane" = als Kind/Jugendlicher.' },
      { italian: 'Un vestito da sera.', german: 'Ein Abendkleid.', explanation: 'da = Zweck/Anlass. "Da sera/giorno" = für den Abend/Tag.' },
      { italian: 'Passo da te stasera.', german: 'Ich komme heute Abend bei dir vorbei.', explanation: 'da = bei Personen. "Passare da qualcuno" = bei jemandem vorbeikommen.' },
      { italian: 'È fatto da mia nonna.', german: 'Es ist von meiner Großmutter gemacht.', explanation: 'da = Passiv (Urheber). "Fatto da" = gemacht von.' },
      { italian: 'Da solo non ce la faccio.', german: 'Alleine schaffe ich es nicht.', explanation: 'da = Zustand. "Da solo" = allein.' },
      { italian: 'Da qui si vede il mare.', german: 'Von hier sieht man das Meer.', explanation: 'da = Ausgangspunkt. "Da qui/lì" = von hier/dort.' }
    ]
  },

  CON: {
    name: 'CON (mit)',
    sentences: [
      { italian: 'Vengo con te.', german: 'Ich komme mit dir.', explanation: 'con = Begleitung. "Venire/andare con" = mit jemandem gehen.' },
      { italian: 'Parlo con lui.', german: 'Ich spreche mit ihm.', explanation: 'con = Gesprächspartner. "Parlare con" = mit jemandem sprechen.' },
      { italian: 'Taglio con il coltello.', german: 'Ich schneide mit dem Messer.', explanation: 'con = Werkzeug/Mittel. "Con il coltello" = mit dem Messer.' },
      { italian: 'Con piacere!', german: 'Mit Vergnügen! / Gerne!', explanation: 'con = Art und Weise. "Con piacere" = mit Freude, gerne.' },
      { italian: 'Vivo con i miei genitori.', german: 'Ich lebe bei meinen Eltern.', explanation: 'con = Zusammenleben. "Vivere con" = zusammen wohnen mit.' },
      { italian: 'Un panino con prosciutto.', german: 'Ein Brötchen mit Schinken.', explanation: 'con = Inhalt/Belag. "Con prosciutto" = mit Schinken.' },
      { italian: 'Con questo freddo resto a casa.', german: 'Bei dieser Kälte bleibe ich zu Hause.', explanation: 'con = Umstand. "Con questo freddo" = bei dieser Kälte.' },
      { italian: 'Sono d\'accordo con te.', german: 'Ich bin mit dir einverstanden.', explanation: 'con = Übereinstimmung. "D\'accordo con" = einverstanden mit.' },
      { italian: 'Con calma!', german: 'Immer mit der Ruhe!', explanation: 'con = Art und Weise. "Con calma" = mit Ruhe, ruhig.' },
      { italian: 'Gioco con il cane.', german: 'Ich spiele mit dem Hund.', explanation: 'con = Spielpartner. "Giocare con" = spielen mit.' },
      { italian: 'Lavoro con passione.', german: 'Ich arbeite mit Leidenschaft.', explanation: 'con = Art und Weise. "Con passione" = leidenschaftlich.' },
      { italian: 'Scrivo con la penna.', german: 'Ich schreibe mit dem Kugelschreiber.', explanation: 'con = Schreibgerät. "Con la penna" = mit dem Stift.' },
      { italian: 'Con chi vai al cinema?', german: 'Mit wem gehst du ins Kino?', explanation: 'con = Frage nach Begleitung. "Con chi?" = mit wem?' }
    ]
  },

  SU: {
    name: 'SU (auf, über)',
    sentences: [
      { italian: 'Sul tavolo.', german: 'Auf dem Tisch.', explanation: 'su = Position oben. "Sul/sulla" = auf dem/der.' },
      { italian: 'Un film su Roma.', german: 'Ein Film über Rom.', explanation: 'su = Thema. "Un libro/film su" = ein Buch/Film über.' },
      { italian: 'Metto tutto su internet.', german: 'Ich stelle alles ins Internet.', explanation: 'su = digital/online. "Su internet" = im Internet.' },
      { italian: 'Leggo un libro sulla storia italiana.', german: 'Ich lese ein Buch über die italienische Geschichte.', explanation: 'su = Thema. "Sulla storia" = über die Geschichte.' },
      { italian: 'Costa sui cento euro.', german: 'Es kostet etwa hundert Euro.', explanation: 'su = ungefähre Angabe. "Sui + Zahl" = circa, ungefähr.' },
      { italian: 'Il gatto è sul divano.', german: 'Die Katze ist auf dem Sofa.', explanation: 'su = Position. "Sul divano" = auf dem Sofa.' },
      { italian: 'Puoi contare su di me.', german: 'Du kannst auf mich zählen.', explanation: 'su = Verlass. "Contare su" = sich verlassen auf, zählen auf.' },
      { italian: 'Ho letto sul giornale.', german: 'Ich habe es in der Zeitung gelesen.', explanation: 'su = in Medien. "Sul giornale" = in der Zeitung.' },
      { italian: 'Sull\'aereo ho dormito.', german: 'Im Flugzeug habe ich geschlafen.', explanation: 'su = in Verkehrsmitteln. "Sull\'aereo" = im Flugzeug.' },
      { italian: 'Uno su dieci.', german: 'Einer von zehn.', explanation: 'su = Verhältnis. "Uno su dieci" = einer von zehn.' },
      { italian: 'Metti il cappotto su quella sedia.', german: 'Leg den Mantel auf diesen Stuhl.', explanation: 'su = Zielposition. "Mettere su" = auf etwas legen.' },
      { italian: 'Su, andiamo!', german: 'Los, gehen wir!', explanation: 'su = Ermunterung. "Su!" = los!, auf!, komm!' },
      { italian: 'Ha sui quarant\'anni.', german: 'Er ist etwa vierzig Jahre alt.', explanation: 'su = ungefähres Alter. "Sui + Alter" = um die ... Jahre.' }
    ]
  },

  PER: {
    name: 'PER (für, durch, um zu)',
    sentences: [
      { italian: 'Un regalo per te.', german: 'Ein Geschenk für dich.', explanation: 'per = Empfänger. "Per te/lui" = für dich/ihn.' },
      { italian: 'Passo per il centro.', german: 'Ich gehe durch die Innenstadt.', explanation: 'per = Durchquerung. "Passare per" = durch etwas gehen.' },
      { italian: 'Studio per lavorare.', german: 'Ich lerne, um zu arbeiten.', explanation: 'per = Zweck. "Per + Infinitiv" = um zu.' },
      { italian: 'Grazie per l\'aiuto.', german: 'Danke für die Hilfe.', explanation: 'per = Grund für Dank. "Grazie per" = danke für.' },
      { italian: 'Parto per Londra domani.', german: 'Ich fahre morgen nach London.', explanation: 'per = Reiseziel. "Partire per" = abreisen nach.' },
      { italian: 'Per favore!', german: 'Bitte!', explanation: 'per = feste Wendung. "Per favore/piacere" = bitte.' },
      { italian: 'Per me un caffè.', german: 'Für mich einen Kaffee.', explanation: 'per = Bestellung für sich. "Per me" = für mich.' },
      { italian: 'È troppo difficile per me.', german: 'Es ist zu schwierig für mich.', explanation: 'per = Bezugsperson. "Troppo ... per me" = zu ... für mich.' },
      { italian: 'Lavoro per una grande azienda.', german: 'Ich arbeite für ein großes Unternehmen.', explanation: 'per = Arbeitgeber. "Lavorare per" = arbeiten für.' },
      { italian: 'Per sempre.', german: 'Für immer.', explanation: 'per = Zeitdauer. "Per sempre" = für immer.' },
      { italian: 'Per caso hai visto Maria?', german: 'Hast du zufällig Maria gesehen?', explanation: 'per = Umstand. "Per caso" = zufällig.' },
      { italian: 'Due per tre fa sei.', german: 'Zwei mal drei ist sechs.', explanation: 'per = Multiplikation. "Due per tre" = zwei mal drei.' },
      { italian: 'Per fortuna è andato tutto bene.', german: 'Zum Glück ist alles gut gegangen.', explanation: 'per = feste Wendung. "Per fortuna" = zum Glück.' }
    ]
  },

  TRA_FRA: {
    name: 'TRA / FRA (zwischen, in)',
    sentences: [
      { italian: 'Tra due ore.', german: 'In zwei Stunden.', explanation: 'tra/fra = zukünftige Zeit. "Tra/fra + Zeitangabe" = in (Zukunft).' },
      { italian: 'Fra amici.', german: 'Unter Freunden.', explanation: 'fra = in einer Gruppe. "Fra amici" = unter Freunden.' },
      { italian: 'Tra le otto e le nove.', german: 'Zwischen acht und neun.', explanation: 'tra = räumlich/zeitlich zwischen. "Tra A e B" = zwischen A und B.' },
      { italian: 'Tra noi c\'è fiducia.', german: 'Zwischen uns gibt es Vertrauen.', explanation: 'tra = Beziehung. "Tra noi/voi/loro" = zwischen uns/euch/ihnen.' },
      { italian: 'Arrivo fra poco.', german: 'Ich komme gleich.', explanation: 'fra = baldige Zukunft. "Fra poco" = bald, gleich.' },
      { italian: 'Tra te e me.', german: 'Zwischen dir und mir.', explanation: 'tra = vertraulich. "Tra te e me" = unter uns gesagt.' },
      { italian: 'Fra una settimana.', german: 'In einer Woche.', explanation: 'fra = Zeitspanne bis. "Fra una settimana" = in einer Woche.' },
      { italian: 'La casa è tra la chiesa e il bar.', german: 'Das Haus ist zwischen der Kirche und der Bar.', explanation: 'tra = räumlich zwischen. Position zwischen zwei Orten.' },
      { italian: 'Scegli tra questi due.', german: 'Wähl zwischen diesen beiden.', explanation: 'tra = Auswahl. "Scegliere tra" = wählen zwischen.' },
      { italian: 'Tra l\'altro…', german: 'Unter anderem...', explanation: 'tra = feste Wendung. "Tra l\'altro" = unter anderem, übrigens.' },
      { italian: 'Fra parentesi.', german: 'In Klammern.', explanation: 'fra = feste Wendung. "Fra parentesi" = in Klammern, nebenbei bemerkt.' },
      { italian: 'Tra poco è pronto.', german: 'Es ist gleich fertig.', explanation: 'tra = baldige Zukunft. "Tra poco" = in Kürze.' },
      { italian: 'Tra sogno e realtà.', german: 'Zwischen Traum und Wirklichkeit.', explanation: 'tra = bildlich zwischen. Kontrast zwischen zwei Zuständen.' }
    ]
  },

  SENZA: {
    name: 'SENZA (ohne)',
    sentences: [
      { italian: 'Caffè senza zucchero.', german: 'Kaffee ohne Zucker.', explanation: 'senza = Fehlen von etwas. "Senza zucchero" = ohne Zucker.' },
      { italian: 'È uscito senza dire niente.', german: 'Er ist gegangen, ohne etwas zu sagen.', explanation: 'senza = vor Infinitiv. "Senza + Infinitiv" = ohne zu.' },
      { italian: 'Senza di te non ce la faccio.', german: 'Ohne dich schaffe ich es nicht.', explanation: 'senza = vor Pronomen. "Senza di te/lui" = ohne dich/ihn.' },
      { italian: 'Senza dubbio.', german: 'Ohne Zweifel.', explanation: 'senza = Gewissheit. "Senza dubbio" = zweifellos.' },
      { italian: 'Non posso vivere senza musica.', german: 'Ich kann nicht ohne Musik leben.', explanation: 'senza = Notwendigkeit. "Vivere senza" = leben ohne.' },
      { italian: 'Senza problemi.', german: 'Kein Problem.', explanation: 'senza = feste Wendung. "Senza problemi" = problemlos.' },
      { italian: 'Ha risposto senza pensare.', german: 'Er hat geantwortet, ohne nachzudenken.', explanation: 'senza = vor Infinitiv. "Senza pensare" = ohne zu denken.' },
      { italian: 'Un mondo senza guerra.', german: 'Eine Welt ohne Krieg.', explanation: 'senza = Abwesenheit. "Senza guerra" = ohne Krieg.' },
      { italian: 'Senza parole.', german: 'Sprachlos.', explanation: 'senza = Zustand. "Senza parole" = wortlos, sprachlos.' },
      { italian: 'Sono rimasto senza soldi.', german: 'Ich habe kein Geld mehr.', explanation: 'senza = Mangel. "Rimanere senza" = ohne etwas dastehen.' },
      { italian: 'Senza fretta.', german: 'Ohne Eile.', explanation: 'senza = Art und Weise. "Senza fretta" = ohne Hast.' },
      { italian: 'Non esco mai senza ombrello.', german: 'Ich gehe nie ohne Regenschirm raus.', explanation: 'senza = unverzichtbar. "Uscire senza" = ohne etwas ausgehen.' }
    ]
  },

  CONTRO: {
    name: 'CONTRO (gegen)',
    sentences: [
      { italian: 'Sono contro questa idea.', german: 'Ich bin gegen diese Idee.', explanation: 'contro = Ablehnung. "Essere contro" = dagegen sein.' },
      { italian: 'Giocare contro una squadra forte.', german: 'Gegen eine starke Mannschaft spielen.', explanation: 'contro = Gegner. "Giocare contro" = gegen jemanden spielen.' },
      { italian: 'L\'auto è andata contro il muro.', german: 'Das Auto ist gegen die Wand gefahren.', explanation: 'contro = Kollision. "Andare contro" = gegen etwas fahren/prallen.' },
      { italian: 'Lottare contro le ingiustizie.', german: 'Gegen Ungerechtigkeiten kämpfen.', explanation: 'contro = Kampf. "Lottare contro" = kämpfen gegen.' },
      { italian: 'Non ho niente contro di te.', german: 'Ich habe nichts gegen dich.', explanation: 'contro = vor Pronomen. "Contro di te" = gegen dich.' },
      { italian: 'Ha votato contro la proposta.', german: 'Er hat gegen den Vorschlag gestimmt.', explanation: 'contro = Abstimmung. "Votare contro" = dagegen stimmen.' },
      { italian: 'Contro ogni previsione.', german: 'Entgegen aller Erwartungen.', explanation: 'contro = entgegen. "Contro ogni previsione" = wider Erwarten.' },
      { italian: 'È un farmaco contro il mal di testa.', german: 'Es ist ein Mittel gegen Kopfschmerzen.', explanation: 'contro = Heilmittel. "Contro il mal di..." = gegen Schmerzen.' },
      { italian: 'Remare contro corrente.', german: 'Gegen den Strom rudern.', explanation: 'contro = Widerstand. "Contro corrente" = gegen den Strom.' },
      { italian: 'Tutti contro uno.', german: 'Alle gegen einen.', explanation: 'contro = Übermacht. "Tutti contro uno" = alle gegen einen.' },
      { italian: 'Mi sono battuto contro la malattia.', german: 'Ich habe gegen die Krankheit gekämpft.', explanation: 'contro = Bekämpfung. "Battersi contro" = ankämpfen gegen.' },
      { italian: 'Protestare contro il governo.', german: 'Gegen die Regierung protestieren.', explanation: 'contro = Protest. "Protestare contro" = protestieren gegen.' }
    ]
  },

  VERSO: {
    name: 'VERSO (Richtung, gegen)',
    sentences: [
      { italian: 'Vado verso casa.', german: 'Ich gehe Richtung nach Hause.', explanation: 'verso = Richtung. "Andare verso" = in Richtung gehen.' },
      { italian: 'Verso le otto.', german: 'Gegen acht Uhr.', explanation: 'verso = ungefähre Zeit. "Verso le otto" = gegen acht Uhr.' },
      { italian: 'Cammina verso di me.', german: 'Er geht auf mich zu.', explanation: 'verso = Bewegung zu Person. "Verso di me" = auf mich zu.' },
      { italian: 'Verso sera fa più fresco.', german: 'Gegen Abend wird es kühler.', explanation: 'verso = Tageszeit. "Verso sera" = gegen Abend.' },
      { italian: 'Il treno va verso nord.', german: 'Der Zug fährt Richtung Norden.', explanation: 'verso = Himmelsrichtung. "Verso nord/sud" = Richtung Norden/Süden.' },
      { italian: 'Ha un atteggiamento positivo verso la vita.', german: 'Er hat eine positive Einstellung zum Leben.', explanation: 'verso = Haltung gegenüber. "Atteggiamento verso" = Einstellung zu.' },
      { italian: 'Verso la fine del mese.', german: 'Gegen Ende des Monats.', explanation: 'verso = annähernd. "Verso la fine" = gegen Ende.' },
      { italian: 'Guarda verso il mare.', german: 'Er schaut Richtung Meer.', explanation: 'verso = Blickrichtung. "Guardare verso" = in Richtung schauen.' },
      { italian: 'Verso mezzanotte sono andato a letto.', german: 'Gegen Mitternacht bin ich ins Bett gegangen.', explanation: 'verso = ungefähre Zeit. "Verso mezzanotte" = gegen Mitternacht.' },
      { italian: 'Si muove verso l\'uscita.', german: 'Er bewegt sich zum Ausgang.', explanation: 'verso = Zielrichtung. "Muoversi verso" = sich bewegen Richtung.' },
      { italian: 'Verso i vent\'anni.', german: 'Um die zwanzig Jahre.', explanation: 'verso = ungefähres Alter. "Verso i vent\'anni" = um die zwanzig.' },
      { italian: 'Il rispetto verso gli altri.', german: 'Der Respekt gegenüber anderen.', explanation: 'verso = Beziehung. "Rispetto verso" = Respekt gegenüber.' }
    ]
  },

  ENTRO: {
    name: 'ENTRO (bis)',
    sentences: [
      { italian: 'Entro domani.', german: 'Bis morgen.', explanation: 'entro = Frist. "Entro domani" = bis spätestens morgen.' },
      { italian: 'Entro le sei.', german: 'Bis sechs Uhr.', explanation: 'entro = Zeitlimit. "Entro le sei" = bis spätestens sechs.' },
      { italian: 'Devo finire entro venerdì.', german: 'Ich muss bis Freitag fertig sein.', explanation: 'entro = Deadline. "Entro venerdì" = bis Freitag.' },
      { italian: 'Entro la fine dell\'anno.', german: 'Bis zum Ende des Jahres.', explanation: 'entro = Zeitrahmen. "Entro la fine" = bis zum Ende.' },
      { italian: 'Rispondimi entro una settimana.', german: 'Antworte mir innerhalb einer Woche.', explanation: 'entro = innerhalb. "Entro una settimana" = innerhalb einer Woche.' },
      { italian: 'Entro quando devi consegnare il progetto?', german: 'Bis wann musst du das Projekt abgeben?', explanation: 'entro = Frage nach Frist. "Entro quando?" = bis wann?' },
      { italian: 'Arrivo entro un\'ora.', german: 'Ich komme innerhalb einer Stunde.', explanation: 'entro = Zeitspanne. "Entro un\'ora" = innerhalb einer Stunde.' },
      { italian: 'Entro i limiti del possibile.', german: 'Im Rahmen des Möglichen.', explanation: 'entro = Grenzen. "Entro i limiti" = innerhalb der Grenzen.' },
      { italian: 'Paga entro il 15 del mese.', german: 'Zahle bis zum 15. des Monats.', explanation: 'entro = Zahlungsfrist. "Entro il 15" = bis zum 15.' },
      { italian: 'Entro breve tempo.', german: 'In kurzer Zeit.', explanation: 'entro = baldige Frist. "Entro breve" = in Kürze.' },
      { italian: 'Sarà pronto entro mezzogiorno.', german: 'Es wird bis Mittag fertig sein.', explanation: 'entro = Fertigstellung. "Entro mezzogiorno" = bis Mittag.' },
      { italian: 'Entro i confini nazionali.', german: 'Innerhalb der Landesgrenzen.', explanation: 'entro = räumlich. "Entro i confini" = innerhalb der Grenzen.' }
    ]
  },

  OLTRE: {
    name: 'OLTRE (über … hinaus, außer)',
    sentences: [
      { italian: 'Oltre a questo…', german: 'Außer / neben diesem…', explanation: 'oltre a = zusätzlich. "Oltre a questo" = außerdem, darüber hinaus.' },
      { italian: 'Oltre le aspettative.', german: 'Über die Erwartungen hinaus.', explanation: 'oltre = übertreffen. "Oltre le aspettative" = über den Erwartungen.' },
      { italian: 'Oltre al lavoro, faccio sport.', german: 'Neben der Arbeit treibe ich Sport.', explanation: 'oltre a = zusätzlich zu. "Oltre al lavoro" = neben der Arbeit.' },
      { italian: 'Oltre cento persone.', german: 'Über hundert Personen.', explanation: 'oltre = mehr als. "Oltre cento" = über hundert.' },
      { italian: 'Non vedo oltre.', german: 'Ich kann nicht weiter sehen.', explanation: 'oltre = weiter. "Vedere oltre" = weitersehen.' },
      { italian: 'Oltre i confini.', german: 'Jenseits der Grenzen.', explanation: 'oltre = jenseits. "Oltre i confini" = über die Grenzen hinaus.' },
      { italian: 'Oltre al fatto che…', german: 'Abgesehen davon, dass…', explanation: 'oltre al fatto che = zusätzlich zur Tatsache. Leitet Ergänzung ein.' },
      { italian: 'Ha lavorato oltre l\'orario.', german: 'Er hat über die Arbeitszeit hinaus gearbeitet.', explanation: 'oltre = über hinaus. "Oltre l\'orario" = über die Zeit hinaus.' },
      { italian: 'Oltre modo gentile.', german: 'Außerordentlich freundlich.', explanation: 'oltre modo = außerordentlich. Verstärkte Form.' },
      { italian: 'Oltre la montagna c\'è il lago.', german: 'Hinter dem Berg ist der See.', explanation: 'oltre = räumlich dahinter. "Oltre la montagna" = hinter dem Berg.' },
      { italian: 'Oltre a Maria, viene anche Luca.', german: 'Außer Maria kommt auch Luca.', explanation: 'oltre a = zusätzlich. "Oltre a Maria" = außer Maria, zusätzlich zu Maria.' },
      { italian: 'Non guardare oltre le apparenze.', german: 'Schau nicht nur auf den Schein.', explanation: 'oltre = hinter. "Oltre le apparenze" = hinter den Schein blicken.' }
    ]
  },

  SECONDO: {
    name: 'SECONDO (laut, nach Meinung)',
    sentences: [
      { italian: 'Secondo me…', german: 'Meiner Meinung nach…', explanation: 'secondo = Meinung. "Secondo me" = meiner Meinung nach.' },
      { italian: 'Secondo il medico…', german: 'Laut dem Arzt…', explanation: 'secondo = Quelle. "Secondo il medico" = laut Arzt.' },
      { italian: 'Secondo le statistiche.', german: 'Laut den Statistiken.', explanation: 'secondo = Datenquelle. "Secondo le statistiche" = den Statistiken zufolge.' },
      { italian: 'Secondo te, chi ha ragione?', german: 'Deiner Meinung nach, wer hat recht?', explanation: 'secondo = Meinungsfrage. "Secondo te" = deiner Meinung nach.' },
      { italian: 'Secondo la legge.', german: 'Nach dem Gesetz.', explanation: 'secondo = Rechtsgrundlage. "Secondo la legge" = dem Gesetz nach.' },
      { italian: 'Secondo le previsioni pioverà.', german: 'Laut Vorhersage wird es regnen.', explanation: 'secondo = Prognose. "Secondo le previsioni" = laut Vorhersage.' },
      { italian: 'Secondo i miei calcoli.', german: 'Nach meinen Berechnungen.', explanation: 'secondo = Grundlage. "Secondo i miei calcoli" = meinen Berechnungen nach.' },
      { italian: 'Secondo lui è facile.', german: 'Seiner Meinung nach ist es einfach.', explanation: 'secondo = fremde Meinung. "Secondo lui" = seiner Meinung nach.' },
      { italian: 'Secondo le regole.', german: 'Nach den Regeln.', explanation: 'secondo = Regelwerk. "Secondo le regole" = regelgemäß.' },
      { italian: 'Secondo quanto detto.', german: 'Laut dem, was gesagt wurde.', explanation: 'secondo quanto = gemäß dem. "Secondo quanto detto" = wie gesagt.' },
      { italian: 'Secondo la tradizione.', german: 'Nach der Tradition.', explanation: 'secondo = Brauch. "Secondo la tradizione" = traditionell.' },
      { italian: 'Secondo me, dovresti andare.', german: 'Meiner Meinung nach solltest du gehen.', explanation: 'secondo = Ratschlag. "Secondo me" leitet Empfehlung ein.' }
    ]
  },

  DURANTE: {
    name: 'DURANTE (während)',
    sentences: [
      { italian: 'Durante la cena.', german: 'Während des Abendessens.', explanation: 'durante = zeitlicher Verlauf. "Durante la cena" = während des Essens.' },
      { italian: 'Durante il viaggio.', german: 'Während der Reise.', explanation: 'durante = Zeitspanne. "Durante il viaggio" = auf der Reise.' },
      { italian: 'Durante la lezione non si parla.', german: 'Während des Unterrichts spricht man nicht.', explanation: 'durante = Aktivität. "Durante la lezione" = im Unterricht.' },
      { italian: 'Durante l\'estate lavoro.', german: 'Während des Sommers arbeite ich.', explanation: 'durante = Jahreszeit. "Durante l\'estate" = im Sommer über.' },
      { italian: 'Durante la notte ha piovuto.', german: 'Während der Nacht hat es geregnet.', explanation: 'durante = Nachtzeit. "Durante la notte" = in der Nacht.' },
      { italian: 'Durante la riunione.', german: 'Während der Besprechung.', explanation: 'durante = Veranstaltung. "Durante la riunione" = während des Meetings.' },
      { italian: 'Durante il film mi sono addormentato.', german: 'Während des Films bin ich eingeschlafen.', explanation: 'durante = Ereignis. "Durante il film" = während des Films.' },
      { italian: 'Durante la guerra.', german: 'Während des Krieges.', explanation: 'durante = historische Epoche. "Durante la guerra" = zur Kriegszeit.' },
      { italian: 'Durante il fine settimana.', german: 'Am Wochenende.', explanation: 'durante = Zeitabschnitt. "Durante il fine settimana" = übers Wochenende.' },
      { italian: 'Durante la pausa pranzo.', german: 'Während der Mittagspause.', explanation: 'durante = Pause. "Durante la pausa" = in der Pause.' },
      { italian: 'Durante tutta la vita.', german: 'Das ganze Leben lang.', explanation: 'durante = Lebensspanne. "Durante tutta la vita" = lebenslang.' },
      { italian: 'Durante le vacanze di Natale.', german: 'Während der Weihnachtsferien.', explanation: 'durante = Ferienzeit. "Durante le vacanze" = in den Ferien.' }
    ]
  },

  PRIMA_DI: {
    name: 'PRIMA DI (vor)',
    sentences: [
      { italian: 'Prima di uscire.', german: 'Bevor ich rausgehe.', explanation: 'prima di = vor einer Handlung. "Prima di + Infinitiv" = bevor.' },
      { italian: 'Prima del lavoro.', german: 'Vor der Arbeit.', explanation: 'prima di = vor Nomen. "Prima del lavoro" = vor der Arbeit.' },
      { italian: 'Prima di tutto.', german: 'Vor allem.', explanation: 'prima di = Priorität. "Prima di tutto" = zuallererst.' },
      { italian: 'Prima di cena.', german: 'Vor dem Abendessen.', explanation: 'prima di = zeitlich vor. "Prima di cena" = vor dem Essen.' },
      { italian: 'Prima di partire, chiamami.', german: 'Bevor du gehst, ruf mich an.', explanation: 'prima di = vor Abreise. "Prima di partire" = vor der Abfahrt.' },
      { italian: 'Prima di me c\'era molta gente.', german: 'Vor mir waren viele Leute.', explanation: 'prima di = räumlich vor. "Prima di me" = vor mir (Reihenfolge).' },
      { italian: 'Prima di dormire leggo.', german: 'Vor dem Schlafen lese ich.', explanation: 'prima di = Routine. "Prima di dormire" = vor dem Einschlafen.' },
      { italian: 'Prima o poi.', german: 'Früher oder später.', explanation: 'prima = Redewendung. "Prima o poi" = irgendwann.' },
      { italian: 'Prima di decidere, pensaci.', german: 'Bevor du entscheidest, denk darüber nach.', explanation: 'prima di = vor Entscheidung. "Prima di decidere" = vor der Entscheidung.' },
      { italian: 'Prima di mezzogiorno.', german: 'Vor Mittag.', explanation: 'prima di = vor Tageszeit. "Prima di mezzogiorno" = vormittags.' },
      { italian: 'Prima del tempo.', german: 'Vor der Zeit. / Vorzeitig.', explanation: 'prima di = verfrüht. "Prima del tempo" = zu früh.' },
      { italian: 'Prima di rispondere, ascolta.', german: 'Bevor du antwortest, hör zu.', explanation: 'prima di = vor Reaktion. "Prima di rispondere" = bevor man antwortet.' }
    ]
  },

  DOPO: {
    name: 'DOPO (nach)',
    sentences: [
      { italian: 'Dopo il lavoro.', german: 'Nach der Arbeit.', explanation: 'dopo = nach Nomen. "Dopo il lavoro" = nach Feierabend.' },
      { italian: 'Dopo cena.', german: 'Nach dem Abendessen.', explanation: 'dopo = nach Mahlzeit. "Dopo cena" = nach dem Essen.' },
      { italian: 'Dopo di te.', german: 'Nach dir.', explanation: 'dopo di = nach Person. "Dopo di te" = nach dir (Reihenfolge).' },
      { italian: 'A dopo!', german: 'Bis später!', explanation: 'dopo = Abschied. "A dopo" = bis nachher, bis später.' },
      { italian: 'Dopo la pioggia viene il sereno.', german: 'Nach dem Regen kommt die Sonne.', explanation: 'dopo = Sprichwort. Nach schlechten Zeiten kommen gute.' },
      { italian: 'Poco dopo.', german: 'Kurz danach.', explanation: 'dopo = Zeitangabe. "Poco dopo" = kurz darauf.' },
      { italian: 'Dopo aver mangiato.', german: 'Nachdem ich gegessen habe.', explanation: 'dopo = nach Handlung. "Dopo aver + Partizip" = nachdem.' },
      { italian: 'Dopo tutto.', german: 'Schließlich. / Immerhin.', explanation: 'dopo = Bilanz. "Dopo tutto" = alles in allem.' },
      { italian: 'Il giorno dopo.', german: 'Am Tag danach.', explanation: 'dopo = folgender Tag. "Il giorno dopo" = am nächsten Tag.' },
      { italian: 'Dopo le vacanze torno al lavoro.', german: 'Nach dem Urlaub kehre ich zur Arbeit zurück.', explanation: 'dopo = nach Zeitraum. "Dopo le vacanze" = nach den Ferien.' },
      { italian: 'Dopo mezzanotte.', german: 'Nach Mitternacht.', explanation: 'dopo = nach Uhrzeit. "Dopo mezzanotte" = nach zwölf Uhr nachts.' },
      { italian: 'Dopo anni di studio.', german: 'Nach Jahren des Studiums.', explanation: 'dopo = nach langer Zeit. "Dopo anni" = nach Jahren.' }
    ]
  },

  FINO_A: {
    name: 'FINO A (bis, bis zu)',
    sentences: [
      { italian: 'Fino a domani.', german: 'Bis morgen.', explanation: 'fino a = bis Zeitpunkt. "Fino a domani" = bis morgen.' },
      { italian: 'Fino a casa.', german: 'Bis nach Hause.', explanation: 'fino a = bis Ort. "Fino a casa" = bis nach Hause.' },
      { italian: 'Fino a quando?', german: 'Bis wann?', explanation: 'fino a = Frage nach Ende. "Fino a quando?" = bis wann?' },
      { italian: 'Fino alla fine.', german: 'Bis zum Ende.', explanation: 'fino a = bis Schluss. "Fino alla fine" = bis zum Schluss.' },
      { italian: 'Lavoro fino alle sei.', german: 'Ich arbeite bis sechs Uhr.', explanation: 'fino a = bis Uhrzeit. "Fino alle sei" = bis um sechs.' },
      { italian: 'Fino a qui tutto bene.', german: 'Bis hierhin alles gut.', explanation: 'fino a = bis zu diesem Punkt. "Fino a qui" = so weit.' },
      { italian: 'Fino a ieri non lo sapevo.', german: 'Bis gestern wusste ich es nicht.', explanation: 'fino a = bis Vergangenheit. "Fino a ieri" = bis gestern.' },
      { italian: 'Cammina fino al semaforo.', german: 'Geh bis zur Ampel.', explanation: 'fino a = bis Ziel. "Fino al semaforo" = bis zur Ampel.' },
      { italian: 'Fino all\'ultimo momento.', german: 'Bis zum letzten Moment.', explanation: 'fino a = bis ganz zum Schluss. "Fino all\'ultimo" = bis zuletzt.' },
      { italian: 'Fino a nuovo ordine.', german: 'Bis auf Weiteres.', explanation: 'fino a = bis Änderung. "Fino a nuovo ordine" = bis auf Widerruf.' },
      { italian: 'Conta fino a dieci.', german: 'Zähl bis zehn.', explanation: 'fino a = bis Zahl. "Fino a dieci" = bis zehn.' },
      { italian: 'Fino a prova contraria.', german: 'Bis zum Beweis des Gegenteils.', explanation: 'fino a = bis Nachweis. Rechtlicher Ausdruck.' }
    ]
  },

  VERB_PREPOSITIONS: {
    name: 'Präposition + Verb',
    sentences: [
      { italian: 'Pensare a qualcuno.', german: 'An jemanden denken.', explanation: 'pensare a = an jemanden denken. Feste Verbindung mit "a".' },
      { italian: 'Pensare di fare qualcosa.', german: 'Vorhaben, etwas zu tun.', explanation: 'pensare di = vorhaben. "Pensare di + Infinitiv" = planen zu.' },
      { italian: 'Credere a qualcuno.', german: 'Jemandem glauben.', explanation: 'credere a = jemandem glauben. Person als Objekt.' },
      { italian: 'Credere in qualcosa.', german: 'An etwas glauben.', explanation: 'credere in = an etwas glauben. Überzeugung/Glaube.' },
      { italian: 'Parlare di qualcosa.', german: 'Über etwas sprechen.', explanation: 'parlare di = über etwas sprechen. Thema des Gesprächs.' },
      { italian: 'Parlare con qualcuno.', german: 'Mit jemandem sprechen.', explanation: 'parlare con = mit jemandem sprechen. Gesprächspartner.' },
      { italian: 'Andare a Roma.', german: 'Nach Rom fahren.', explanation: 'andare a = zu Städten. "A" vor Stadtnamen.' },
      { italian: 'Andare in Italia.', german: 'Nach Italien fahren.', explanation: 'andare in = zu Ländern. "In" vor Ländernamen.' },
      { italian: 'Uscire con amici.', german: 'Mit Freunden ausgehen.', explanation: 'uscire con = mit jemandem ausgehen. Begleitung.' },
      { italian: 'Dipende da te.', german: 'Es hängt von dir ab.', explanation: 'dipendere da = abhängen von. Feste Verbindung mit "da".' },
      { italian: 'Interessarsi a qualcosa.', german: 'Sich für etwas interessieren.', explanation: 'interessarsi a = sich interessieren für. Reflexives Verb mit "a".' },
      { italian: 'Fidarsi di qualcuno.', german: 'Jemandem vertrauen.', explanation: 'fidarsi di = vertrauen auf. Reflexives Verb mit "di".' },
      { italian: 'Cominciare a lavorare.', german: 'Anfangen zu arbeiten.', explanation: 'cominciare a = anfangen zu. "A" vor Infinitiv.' },
      { italian: 'Smettere di parlare.', german: 'Aufhören zu sprechen.', explanation: 'smettere di = aufhören zu. "Di" vor Infinitiv.' },
      { italian: 'Riuscire a capire.', german: 'Es schaffen zu verstehen.', explanation: 'riuscire a = es schaffen zu. "A" vor Infinitiv.' },
      { italian: 'Cercare di aiutare.', german: 'Versuchen zu helfen.', explanation: 'cercare di = versuchen zu. "Di" vor Infinitiv.' },
      { italian: 'Continuare a studiare.', german: 'Weitermachen zu lernen.', explanation: 'continuare a = weitermachen zu. "A" vor Infinitiv.' },
      { italian: 'Sognare di viaggiare.', german: 'Davon träumen zu reisen.', explanation: 'sognare di = träumen von. "Di" vor Infinitiv.' },
      { italian: 'Abituarsi a vivere qui.', german: 'Sich daran gewöhnen, hier zu leben.', explanation: 'abituarsi a = sich gewöhnen an. Reflexiv mit "a".' },
      { italian: 'Decidere di partire.', german: 'Sich entscheiden abzureisen.', explanation: 'decidere di = sich entscheiden zu. "Di" vor Infinitiv.' }
    ]
  }
};
