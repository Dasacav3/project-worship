# Install jq
apt update && apt install jq -y

# Update npm
npm install -g npm@latest 

# Install pnpm
npm install -g pnpm

# Npm packages globally
pnpm install concurrently nodemon ts-node typescript vite tailwindcss postcss autoprefixer postcss-cli postcss

# Npm packages for backend
pnpm install

# Npm packages for frontend
cd client
pnpm install

# Compile tailwindcss and postcss
postcss src/assets/index.css -o src/assets/main.css

# Go to root folder
cd ..