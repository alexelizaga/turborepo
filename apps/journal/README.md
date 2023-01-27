# BrocodeApps

[Brocode Apps](https://brocodeapps-44e1a.web.app/)

## Commits

## Tests

## Install testing

yarn add --dev @testing-library/react
yarn add --dev @testing-library/jest-dom
yarn add --dev @testing-library/user-event
yarn add --dev @babel/preset-react
yarn add --dev @babel/preset-typescript
yarn add --dev @babel/preset-env
yarn add --dev identity-obj-proxy
yarn add --dev jest @types/jest
yarn add --dev jest-environment-jsdom

1. jest-setup.ts

```
    import "@testing-library/jest-dom";
```

2. package.json

```
    "scripts": {
        "test": "jest --watchAll"
    }
```

delete line "type": "module",

3. jest.config.js

```
    module.exports = {
        testEnvironment: 'jsdom',
        setupFilesAfterEnv: [
            '<rootDir>/jest-setup.ts'
        ],
        moduleNameMapper: {
            '\\.(css|less)$': 'identity-obj-proxy'
        }
    }
```

3. babel.config.js

```
    module.exports = {
        presets: [
            [ '@babel/preset-env', { targets: {node: 'current'} } ],
            [ '@babel/preset-react', { runtime: 'automatic' } ],
            '@babel/preset-typescript',
        ],
    };
```

## Good practices

### Folders
- Space in name separate by '-', product-list

### TSX VS TS
- TSX when the component export JSX
- TS when the component doesn't export JSX

### Imports
- React first
- External imports alfabetic order ( shift + command/control + p)

- Internal imports alfabetic order ( shift + command/control + p)

- Css / ... imports alfabetic order ( shift + command/control + p)

### Props
- Separate properties and methods

### Interfaces
- First letter of the name of the interface is capital
- No index.ts for interfaces
- use https://quicktype.io to generate response interfaces
- Separate properties and methods
- NameResponse: is the name of the interface for api responses

### Css
- Atributes in alfabetic order ( shift + command/control + p)
- [styled component in line css](https://styled-components.com/docs/api#css)
- Nesting only pseudo elements and pseudo classes
- Create styled components for 3 or more atributes
- Use Global styles variables
- BEM Metodology
    .ObjetoPrincipal
    .ObjetoPrincipal_objetoInterno
    .ObjetoPrincipal_objetoInterno--excepcion

### Components
- Component starts with capital letter
- Try allways to do functions outside functional components

### Use Any is forbidden


### single quote vs doble quote
- "" Just for html

### Semi-Colon
- Convention to include semi-colon at the end of the lines

### useEffect
- Can't be async
- Just do one thing by useEffect

### Unit test
- Unit test coverage should be at least 80%
- One Describe per test file

### Strings
- Always compare strings whith toLowerCase
- Use defines.ts / enums.ts / ... for plane text
- Template strings instead of concatenation

### Other
- Constants in capital letters


## VSCode Plugins
- Auto Close Tag
- CodeMetrics
- CSS Module
- ES7+ React/Redux/React-Native snippets
- ESLint
- Git Commits
- GitLens
- Jest
- Jest Runner
- Jest Snippets
- Lorem ipsum
- Material Icon Theme
- Paste JSON as Code
- Prettier
- TypeScript Importer