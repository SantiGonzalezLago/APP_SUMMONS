# Summoning Spells Calculator

A mobile application built with Ionic and Angular that helps Dungeons & Dragons players manage and track summoning spells and their creatures.

## Overview

Summoning Spells Calculator is a companion app for D&D 5e that provides quick access to summoning spell statistics, creature configurations, and HP tracking for summoned entities. Perfect for players and DMs who want to streamline combat and spell management.

## Features

- **Multiple Summoning Spells**: Support for different summoning spells including:
  - Summon Aberration (4th level)
  - Summon Beast (2nd level)
  - Summon Celestial (5th level)
  - Summon Construct (4th level)
  - Summon Dragon (5th level)
  - Summon Elemental (4th level)
  - Summon Fey (3rd level)
  - Summon Fiend (6th level)
  - Summon Shadowspawn (3rd level)
  - Summon Undead (3rd level)
  - Find Steed (2nd level)
  - Homunculus Servant (2nd level)
  - Giant Insect (4th level)
  - Spirit of Death (4th level)

- **Dynamic Stat Calculation**: Automatically calculates AC, HP, attack bonuses, and damage based on spell level
- **HP Tracking**: Built-in HP tracker with heal/damage buttons and persistent storage
- **Favorites System**: Mark frequently used spells as favorites for quick access
- **Spell Level Scaling**: Configure spells at different levels (2nd to 9th)
- **Creature Type Selection**: Choose different creature variants (e.g., Air, Land, Water for Beast)
- **Persistent State**: Automatically saves spell configurations and HP values across sessions
- **Clean UI**: Intuitive interface with FontAwesome icons and Ionic components

## Technologies

- **Ionic Framework** 8.0.0
- **Angular** 20.0.0
- **Capacitor** 8.0.1
- **TypeScript** 5.9.0
- **RxJS** 7.8.0
- **FontAwesome** 7.1.0

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Ionic CLI: `npm install -g @ionic/cli`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd summons-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
ionic serve
```

4. Open your browser at `http://localhost:8100`

### Building for Production

#### Android
```bash
ionic capacitor build android
cd android
./gradlew bundleRelease
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── hp-modal/          # HP management modal component
│   ├── services/
│   │   ├── spells.service.ts        # Spell data and favorites
│   │   ├── hp-tracker.service.ts    # HP state management
│   │   ├── spell-selections.service.ts  # Spell configuration storage
│   │   └── configuration.service.ts # App configuration
│   ├── home/                   # Main spell list page
│   ├── spell/                  # Individual spell pages
│   │   ├── aberration/
│   │   ├── beast/
│   │   ├── celestial/
│   │   └── ...
│   └── app.component.ts        # Root component with side menu
├── assets/                     # Images, fonts, and icons
└── theme/                      # Global SCSS variables
```

## Usage

1. **Select a Spell**: Browse the spell list on the home page and tap any spell card
2. **Configure the Summon**: Choose the spell level and creature type/variant
3. **View Stats**: See automatically calculated AC, HP, attacks, and abilities
4. **Track HP**: Tap the HP bar to open the HP management modal
   - **HEAL**: Restore HP by a specific amount
   - **MAX HP**: Fully restore to maximum HP
   - **DAMAGE**: Reduce HP by a specific amount
5. **Favorite Spells**: Tap the star icon to mark spells as favorites (they'll appear at the top of the list)

## Data Persistence

The app uses browser LocalStorage to persist:
- Favorite spell selections
- Current HP values for each summon
- Spell level and type configurations

Data is automatically saved and restored when reopening the app.

## Mobile Platform Support

- **Android**: Full support via Capacitor
- **iOS**: Not tested (theoretically compatible, requires Xcode for building)

## Author

**Santiago González Lago**

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## D&D Legal

This application is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards of the Coast. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.
