#!/bin/bash

# Install Node.js dependencies

## Install fnm (Fast Node Manager)

curl -fsSL https://fnm.vercel.app/install | bash

# Export fnm path

case $SHELL in
  */zsh)
    # Assume Zsh
    export PATH="$HOME/.fnm:$PATH"
    source ~/.zshrc
    ;;
  */bash)
    # Assume Bash
    export PATH="$HOME/.fnm:$PATH"
    source ~/.bashrc
    ;;
  *)
    echo "SHELL not found"
    ;;
esac

# Reload fnm
eval "$(fnm env)"

# Install Node.js
fnm install 20

# Set Node.js version as default
fnm default 20

# Install Jq (assuming you're on a Linux/Unix system)
sudo apt-get install jq -y

# Update npm
npm install -g npm

# Install Pnpm
npm install -g pnpm
