# Readme

## IC

Das gerenderte IC Dokument ist in der Datei `thesis.pdf`. Die Latex Dateien im `text` Ordner.

## collection.do deployment

Der Code für collection.do ist im Ordner `collection-do`.

Folgende Schritte sind notwendig, um die Anwednung zu deployen (alle im `collection.do` Ordner ausführen):

1. NodeJS, redis und CouchDB installieren.
2. CouchDB starten und Admin User erstellen.
3. `npm install -g grunt-cli'
4. redis starten.
5. Auf der Kommandozeile in den Projektordner navigieren.
6. `cp server/config.coffee.sample server/config.coffee`
7. Alle benötigten Daten in der `server/config.coffee` eintragen
8. swm_data, swm_embedly_cache und swm_users Datenbanken in CouchDB erstellen
9. Design Docs aus `design_docs` in den entsprechenden Datenbanken erstellen. (DB-Name = Dateiname)
10. `npm install`
11. `grunt b`
12. `redis-server &`
13. `coffee server.coffee`
14. `open http://127.0.0.1:3333`

## XBMCMagic

Die Anwedung kann normal im Browser ausgeführt werden. Allerdings benötigt man zum Testen eine XBMC Installation. Die Phonegap-App kann von der angegebenen URL im Dokument heruntergeladen werden.