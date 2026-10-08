# Stamp

A mobile TODO app built with Expo (React Native). Tasks are paper slips on a green desk, and a finished task gets a rubber stamp with the date.

## What it does

- Add a task with the + button at the top right, which opens the input above the keyboard. Empty or whitespace-only text is rejected, with the reason shown under the field.
- List tasks, newest on top.
- Mark a task done by tapping its slip. A DONE stamp with today's date appears. Tap again to undo.
- Delete a task with the red trash icon. An UNDO button stays for five seconds.
- Tasks are saved on the device (AsyncStorage) and survive an app restart.

## Run it

```
npm install
npx expo start
```

Scan the QR code with Expo Go. The phone and the computer must be on the same network.

## Layout

- `App.js`: screen, list, adding and deleting
- `src/useTasks.js`: task state and saving
- `src/storage.js`: reading and writing AsyncStorage
- `src/components/`: slip, stamp, new task field, header, undo toast
- `src/theme.js`: colors and fonts (Barlow Condensed and Courier Prime)
