# Install Node.js dependencies

## Install fnm (Fast Node Manager)

curl -fsSL https://fnm.vercel.app/install | bash

# Export fnm path

case $SHELL in
*/zsh) 
   # assume Zsh
   source ~/.zshrc
   ;;
*/bash)
   # assume Bash
   source ~/.bashrc
   ;;
*)
    echo "SHELL not found"
    ;;
esac

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
