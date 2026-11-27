# Portfolio

Single-page portfolio, componentized so it's easy to grow.

## Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx                # thin wrapper, renders Portfolio
    ├── Portfolio.jsx          # page layout: NameTag + Hero + OptionsSection
    ├── theme.js                # shared color tokens
    ├── styles/
    │   └── global.css          # fonts, scroll behavior, reduced-motion rules
    └── components/
        ├── NameTag.jsx          # fixed top-left name
        ├── Hero.jsx             # centered greeting + tagline
        ├── DataNetCanvas.jsx    # animated canvas behind the hero
        ├── OptionsSection.jsx   # renders the list of Option rows
        ├── Option.jsx           # a single "About Me / Gallery / Contact" row
        └── HiCycle.jsx          # cycles just the "hi" word in the hero greeting
```

## Run it

```
npm install
npm run dev
```

## Adding more sections

Open `src/Portfolio.jsx` and add an entry to the `options` array:

```js
const options = [
  { title: "About Me", href: "#about" },
  { title: "Gallery", href: "#gallery" },
  { title: "Contact", href: "#contact" },
  { title: "Resume", href: "#resume" }, // new row, no other changes needed
];
```

For a whole new *kind* of section (not just another row), add a new file under
`src/components/`, then import and drop it into `Portfolio.jsx`'s render tree
next to `<Hero />` and `<OptionsSection />`.
