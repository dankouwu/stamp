<a id="readme-top"></a>

[![Expo SDK][expo-shield]][expo-url]
[![React Native][rn-shield]][rn-url]
[![Runs in Expo Go][go-shield]][go-url]

<br />
<div align="center">
  <a href="https://github.com/dankouwu/stamp">
    <img src="assets/icon.png" alt="Stamp app icon" width="96" height="96">
  </a>

  <h3 align="center">Stamp</h3>

  <p align="center">
    A TODO app where every task is a paper slip and finishing one means stamping it.
    <br />
    <a href="#about-the-project"><strong>See the screens »</strong></a>
    <br />
    <br />
    <a href="#getting-started">Run it</a>
    &middot;
    <a href="https://github.com/dankouwu/stamp/issues">Report a bug</a>
  </p>
</div>

<details>
  <summary>Table of contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#built-with">Built with</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#project-structure">Project structure</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About the project

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/01-empty.png" width="200" alt="Empty list with three starter tasks"><br><sub>Empty list</sub></td>
    <td align="center"><img src="docs/screenshots/02-new-task.png" width="200" alt="New task field open above the keyboard"><br><sub>New task</sub></td>
    <td align="center"><img src="docs/screenshots/03-done.png" width="200" alt="List with two stamped tasks"><br><sub>Stamped tasks</sub></td>
    <td align="center"><img src="docs/screenshots/04-undo.png" width="200" alt="Undo toast after deleting a task"><br><sub>Undo a delete</sub></td>
  </tr>
</table>

Stamp is a mobile TODO app built with Expo and React Native for a school assignment. It does what the assignment lists: add a task (an empty one is refused), show the list, mark a task done, delete a task, and look like something other than the default template.

The look is a green desk with cream paper slips on it. Each slip has a tear-off stub with a checkbox and a serial number that is never reused. Finishing a task puts a red DONE stamp on it with the date it was finished.

A few choices that are not obvious from the screenshots:

- The whole slip is the done button, not just the checkbox, so there is no small target to hit.
- Deleting does not ask for confirmation. The slip goes away and an UNDO button stays for five seconds. A restored slip returns to its old position with its old number.
- An empty task is not blocked by a greyed-out button. The button stays pressable, and pressing it says what is missing under the field.
- Tasks are saved on the device and are still there after a restart.
- With reduced motion turned on in the phone settings, the animations are skipped.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built with

* [![Expo][expo-badge]][expo-url]
* [![React Native][rn-badge]][rn-url]
* [react-native-svg](https://github.com/software-mansion/react-native-svg) for the checkbox, the perforation and the icons
* [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) for saving the list
* [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) for the tap you feel when the stamp comes down
* Barlow Condensed and Courier Prime from [Google Fonts](https://fonts.google.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting started

### Prerequisites

* [Node.js](https://nodejs.org/) LTS
* The Expo Go app on your phone, from Google Play or the App Store. Its version has to match the project's SDK, which is 57.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/dankouwu/stamp.git
   cd stamp
   ```
2. Install the packages
   ```sh
   npm install
   ```
3. Start the dev server
   ```sh
   npx expo start
   ```
4. Scan the QR code from the terminal with Expo Go. On Android use the scanner inside Expo Go, on iPhone use the Camera app. The phone and the computer must be on the same network.

If the network blocks the connection, `npx expo start --tunnel` works around it. On Android you can also use a USB cable: run `adb reverse tcp:8081 tcp:8081`, then open `exp://localhost:8081` in Expo Go.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

1. Tap the red **+** at the top right. The new task field opens above the keyboard.
2. Type a task and press **ADD** or the keyboard's done key. The field closes and the new slip appears at the top.
3. Tap a slip to stamp it as done. Tap it again to take the stamp off.
4. Tap the red trash icon to delete a slip. Press **UNDO** within five seconds to bring it back.

Where the app has been run: an Android 14 phone and an Android 15 emulator, both through Expo Go. It has not been run on iOS.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project structure

```text
App.js                  screen, list, adding and deleting
src/useTasks.js         task state and saving
src/storage.js          reading and writing AsyncStorage
src/motion.js           reduced-motion check and list animation
src/dates.js            weekday and day-month labels
src/theme.js            colors and fonts
src/components/
  Header.js             title row, date, + button, counters
  Slip.js               one task: stub, text, stamp, trash
  Stamp.js              the DONE stamp and its landing animation
  Composer.js           new task field and its validation
  Presence.js           slide and fade for the field and the toast
  Toast.js              the "Task deleted" message with UNDO
  EmptyState.js         what the list shows with no tasks
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [x] Add, list, mark done, delete
- [x] Save tasks on the device
- [x] Undo for deletes
- [ ] Edit the text of an existing task
- [ ] Clear all done tasks at once
- [ ] A standalone build, so the app runs without Expo Go

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template) for the layout of this file
* Barlow Condensed and Courier Prime, both under the SIL Open Font License
* [Shields.io](https://shields.io/) for the badges

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[expo-shield]: https://img.shields.io/badge/Expo%20SDK-57-000020?style=for-the-badge&logo=expo&logoColor=white
[rn-shield]: https://img.shields.io/badge/React%20Native-0.86-20232a?style=for-the-badge&logo=react&logoColor=61DAFB
[go-shield]: https://img.shields.io/badge/Runs%20in-Expo%20Go-B02E1A?style=for-the-badge
[go-url]: https://expo.dev/go
[expo-badge]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white
[expo-url]: https://expo.dev/
[rn-badge]: https://img.shields.io/badge/React%20Native-20232a?style=for-the-badge&logo=react&logoColor=61DAFB
[rn-url]: https://reactnative.dev/
