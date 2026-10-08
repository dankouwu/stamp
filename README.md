# Razítko

Mobilní TODO aplikace v Expo (React Native). Úkoly jsou papírové lístky na zeleném psacím podkladu a hotový úkol se orazítkuje datem.

## Co umí

- Přidat úkol. Prázdný text nebo samé mezery aplikace nepřijme a pod polem napíše proč.
- Zobrazit seznam úkolů, nejnovější nahoře.
- Označit úkol jako hotový klepnutím na lístek. Přibude razítko HOTOVO s dnešním datem. Dalším klepnutím se úkol vrátí.
- Smazat úkol ikonou koše. Pět sekund je k dispozici tlačítko VRÁTIT.
- Úkoly zůstávají uložené i po restartu aplikace (AsyncStorage).

## Spuštění

```
npm install
npx expo start
```

Pak v aplikaci Expo Go naskenuj QR kód. Telefon a počítač musí být ve stejné síti.

## Kde co je

- `App.js`: obrazovka, seznam, přidávání a mazání
- `src/useTasks.js`: stav úkolů a jeho ukládání
- `src/storage.js`: čtení a zápis do AsyncStorage
- `src/components/`: lístek, razítko, pole pro nový úkol, hlavička, hláška s tlačítkem VRÁTIT
- `src/theme.js`: barvy a písma (Barlow Condensed a Courier Prime, oba pokrývají češtinu)
