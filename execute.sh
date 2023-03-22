# Npm packages for backend
npm install -g postcss-cli postcss
npm install

# Npm packages for frontend
cd client
npm install

# Compile tailwindcss and postcss
postcss src/assets/index.css -o src/assets/main.css

# Go to root folder
cd ..