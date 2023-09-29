# Npm packages for backend && Npm packages for frontend && Compile tailwindcss and postcss && Go root folder
npm install -g npm@latest pnpm concurrently nodemon `
    ts-node typescript vite tailwindcss postcss `
    autoprefixer postcss-cli postcss && `
pnpm install && `
Set-Location client && `
pnpm install && `
npx postcss src/assets/index.css -o src/assets/main.css && `
Set-Location ..