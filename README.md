This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Test instructions

1. Fork this repository
2. This repository contains everything you need to get started, wallet connection, api calls for assets and pairs, and almost all components we are using at this moment.
3. Some libraries are obligated to use (Chakra UI, Wagmi and Zustand), but you can add any other library you want in top of these.
4. Code must be in Typescript.
5. The goal in this test is to create a card component that permits users to lock their Vara tokens in order to get a "receipt" NFT called veVARA. The design of the component is already done (see `public/Get veVara Desing.png`)
6. The component must be responsive.
7. Contract addresses are already in the code, also ABIs.
8. The function in order to lock tokens is already in the code (`create_lock`) under Voting Escrow contract (`VE_TOKEN_ADDRESS`, `VE_TOKEN_ABI` constants).
9. The component must have text inputs for both amount of tokens to lock and duration of the lock. Also we need some buttons to set the duration to 1 week, 1 month,  1 year and 4 years, also same for the amount: 25%, 50%, 75%, 100%.
10. The component must be able to show the amount of tokens locked, the amount of veVARA tokens the user will get, and the time remaining to unlock the tokens.
11. If you have any questions regarding ve(3,3) or the task itself, please contact us through the Discord/Telegram group.
12. In order to send your test, please create a pull request to this repository with your code.
