# Install Node.js dependencies

## Install fnm (Fast Node Manager)

curl -fsSL https://fnm.vercel.app/install | bash

# Export fnm path

if [ -n "$ZSH_VERSION" ]; then
   # assume Zsh
   source ~/.zshrc
elif [ -n "$BASH_VERSION" ]; then
    source ~/.bashrc
else
    # asume something else
    echo "Unable to determine shell type"
fi

# Install Node.js

fnm install 20

# Set Node.js version as default

fnm default 20

# Install Jq

sudo apt-get install jq -y

# Update npm

npm install -g npm

# Install Pnpm

npm install -g pnpm
