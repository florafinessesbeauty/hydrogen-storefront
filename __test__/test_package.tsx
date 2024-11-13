
export default {

  "name": "hydrogen-storefront",

  "private": true,

  "sideEffects": false,

  "version": "2024.10.1",

  "type": "module",

  "scripts": {

    "build": "shopify hydrogen build --codegen",

    "dev": "shopify hydrogen dev --codegen",

    "preview": "shopify hydrogen preview --build",

    "lint": "eslint --no-error-on-unmatched-pattern --ext .js,.ts,.jsx,.tsx .",

    "typecheck": "tsc --noEmit",

    "codegen": "shopify hydrogen codegen",

    "start": "shopify hydrogen dev"

  },

  "prettier": "@shopify/prettier-config",

  "dependencies": {

    "@remix-run/react": "^2.13.1",

    "@remix-run/server-runtime": "^2.13.1",

    "@shopify/hydrogen": "2024.10.0",

    "@shopify/remix-oxygen": "^2.0.9",

    "graphql": "^16.6.0",

    "graphql-tag": "^2.12.6",

    "isbot": "^3.8.0",

    "react": "^18.2.0",

    "react-dom": "^18.2.0",

    "react-helmet": "^6.1.0"

  },

  "devDependencies": {

    "@graphql-codegen/cli": "5.0.2",

    "@remix-run/dev": "^2.13.1",

    "@remix-run/eslint-config": "^2.13.1",

    "@shopify/cli": "~3.69.4",

    "@shopify/hydrogen-codegen": "^0.3.2",

    "@shopify/mini-oxygen": "^3.1.0",

    "@shopify/oxygen-workers-types": "^4.1.2",

    "@shopify/prettier-config": "^1.1.2",

    "@tailwindcss/vite": "4.0.0-alpha.17",

    "@testing-library/jest-dom": "^6.6.3",

    "@testing-library/react": "^16.0.1",

    "@testing-library/user-event": "^14.5.2",

    "@total-typescript/ts-reset": "^0.4.2",

    "@types/eslint": "^8.4.10",

    "@types/react": "^18.3.12",

    "@types/react-dom": "^18.2.7",

    "@types/react-helmet": "^6.1.11",

    "eslint": "^8.20.0",

    "eslint-plugin-hydrogen": "0.12.2",

    "jest": "^29.7.0",

    "jest-environment-jsdom": "^29.7.0",

    "prettier": "^2.8.4",

    "typescript": "^5.6.3",

    "vite": "^5.1.0",

    "vite-tsconfig-paths": "^4.3.1"

  },

  "engines": {

    "node": ">=18.0.0"

  },

  "browserslist": [

    "defaults"

  ]

}