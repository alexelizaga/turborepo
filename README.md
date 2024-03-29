# Turborepo starter

## 01 Journal

[Preview](https://journal-dev.brocodejs.com/)

[Production](https://journal.brocodejs.com/)

## 02 Calendar

[Preview](https://calendar-dev.brocodejs.com/)

[Production](https://calendar.brocodejs.com/)

## 02 Kanban

[Preview](https://kanban-dev.brocodejs.com/)

[Production](https://kanban.brocodejs.com/)

## 04 Pokedex

[Preview](https://turborepo-04-pokedex-next-git-preview-alexelizaga.vercel.app/)

[Production](https://pokedex.brocodejs.com/)

## 05 OpenJira

[Preview](https://turborepo-05-openjira-next-git-preview-alexelizaga.vercel.app/)

[Production](https://turborepo-05-openjira-next-aaoslsvvd-alexelizaga.vercel.app/)

## 06 Shop

[Preview](https://turborepo-06-shop-next-git-preview-alexelizaga.vercel.app/)

[Production] (https://shop.brocodejs.com/)

## UI Package
[StoryBook](https://alexelizaga.github.io/turborepo/?path=/story/get-started-introduction--page)


### Apps and Packages

- `ui`: a stub React component library shared by all applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
yarn run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
