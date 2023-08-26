# Project Worship  🌙✝️
This project is development with the objetive of create a worship system to churches.

## Features

- Presentation of songs
- Presentation of bible verses with different versions
- Storage of background images and videos
- Search of songs by network
- Notes administration and ads presentation

## System requirements

- Windows, Linux or Mac OS

## How to run:

### Windows

1. Make a copy of `.env.example` file with the name `.env` and replace the values of env vars.
2. Execute the included powershell script `configure.ps1` to install all dependencies and make the necessary configurations.
3. Run the program executing `run.ps1` script

### Linux or Mac OS

1. Make a copy of `.env.example` file with the name `.env` and replace the values of env vars.
2. Execute the included bash script `configure.sh` to install all dependencies and make the necessary configurations.
3. Run the program executing `run.sh` script

### Docker

1. Make a copy of `.env.example` file with the name `.env` and replace the values of env vars.
2. Run `docker-compose up` to run the project

### Manually

1. You need have installed:
    - [NodeJS](https://nodejs.org/en/)
    - [NPM](https://www.npmjs.com/)
    - [jq](https://jqlang.github.io/jq/)
2. Clone this repository `git clone https://github.com/Dasacav3/project-worship`
3. Run `npm install` to install all dependencies of project (in the root folder and in the client folder)
4. Install Postcss with `npm install -g postcss-cli`
5. Compile the css with `postcss client/src/assets/index.css -o client/src/assets/main.css`
6. Run `npm run dev` to run the project


## How to contribute

1. Fork this repository
2. Create a new branch with the name of the feature
3. Make the changes
4. Create a pull request
5. Wait for the review of the pull request

Note: You can create a fork of this repository and make the changes in your fork, but you don't need to create a fork to make a pull request. But please, consider create a pull request if you want to contribute with this project and fix some bug or add a new features, together we can make this project better. Also, you can contact me:

- [Twitter | X](https://twitter.com/Dasacav31)
- [Email](mailto:team.dasacav3@gmail.com)
- [Discord](https://discord.gg/3YzKZ2)

## Troubleshooting

- If you have problems with the installation of dependencies, try to run the scripts with administrator privileges.
- You can create a issue in this repository if you have problems with the installation or execution of the project.


## License

This project is under the [MIT License](https://opensource.org/license/mit/)