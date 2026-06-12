# Tasbir Kabir — Personal Portfolio Website
### Professional Refactored & Rebranded Architecture

This codebase represents the rebranded personal portfolio website of **Tasbir Kabir**, operating as an AI Consultant, Web Developer, and Media Buyer. 

The project structure has been refactored to separate concerns into clean, maintainable, and decoupled modules.

---

## 📂 Project Directory Structure

```text
/
├── index.html                  # Main structural HTML document
├── README.md                   # Documentation guide
└── assets/
    ├── css/
    │   └── style.css           # Divided and commented CSS stylesheet
    └── js/
        └── main.js            # Modularized JavaScript code (Three.js + GSAP animations)
```

---

## 🛠️ Reorganization Modules

### 1. HTML (`index.html`)
* Main entry point utilizing standard semantic tags.
* Decoupled from all inline styling variables, converting them to structured classes.
* Integrates external libraries (Three.js and GSAP) and linked stylesheets/scripts.

### 2. Styles (`assets/css/style.css`)
Organized chronologically into standard responsive blocks:
* **Variables:** `:root` HSL/RGB custom variables.
* **Base Styles:** Global page styling rules and halftone overlay assets.
* **Navigation:** Sticky glassmorphism header navigation bar styles.
* **Hero:** Custom 3D text styling, buttons, and scrolling hints.
* **About:** Grid layout alignment and stats grid items.
* **Services:** Three-column layout comic card panels with gradient overlays.
* **Process:** Staggered vertical step listing layout.
* **Contact:** Dynamic flex row buttons for Facebook, LinkedIn, X, and GitHub.
* **Footer:** Bottom sub-footer styling elements.
* **Animations:** Keyframes tracking floating elements, loading bobs, and marquees.
* **Responsive Styles:** Clean media queries for pointer hovering, mobile breakpoints, and accessibility.

### 3. JavaScript (`assets/js/main.js`)
Deconstructed into individual operational regions:
* **Loader:** Initial loading transition timeline and progress indicators.
* **Three.js Scene:** Canvas viewport setup, 3D skyline boxes/edges, camera adjustments, perched hero silhouette mesh, cratered moon, and custom 3D web-projectile vector geometry calculation logic.
* **Hero Effects:** Mouse-tracked depth rotations and scramble text functions.
* **Cursor Effects:** Magnetic hovering circles, action labels, and 2D canvas mouse web trails.
* **Scroll Animations:** Trigger functions skewing content cards on scroll speed and incrementing numerical counters.
* **Card Interactions:** Responsive mouse positioning on 3D card tiles.
* **Utility Functions:** Click burst splats and Catmull-Rom path helpers.
