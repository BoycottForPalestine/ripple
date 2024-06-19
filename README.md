# RCM NextJS Server

## Prerequisites

[Install yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)  
Make sure you have Node 18+ installed (preferably Node 20). For MongoDB you can use an existing local one or use Docker Compose. If you do not wish to setup MongoDB locally, we recommend downloading [Docker](https://www.docker.com/get-started/) and using that to run Mongo locally.

### Setup commands

First, you must get a Mongo server running locally on port 27017. The easiest way to do this is to run the following command at the root directory.

```bash
docker compose up
```

To start the actual NextJS server, first install all packages by running 

```bash
yarn
```

To seed the DB with dummy data, you'll need to add `type: "module"` to `package.json` _temporarily_. Then you can run:

```bash
yarn setup-local-mongo
```

Make sure to change this back after you're done seeding the DB.

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result. You can edit any of the pages in the `app/` directory and you'll be able to see the results instantly! The `app/api/` directory is the "backend" for this project, and all other directories under `app/` is the "frontend".

## Creating dev env admin/moderator account

- Register account over `/register` route
- Manually set account `permissionLevel` over [MongoDB Compass](https://www.mongodb.com/products/tools/compass) to e.g. `MODERATOR`
- Login over `/login`

## Learn More

NextJS has some quirks and features that may take some time to get used to. To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

We are using the newer, `app` based paradigm of NextJS instead of the `pages` based paradigm. Most of NextJS documentation is split up between these two paradigms. Make sure you are reading the right documentation!


## Windows Subsystem for Linux (WSL) integration

### Motivation

Due to how the project is setup, you have to physically set environment variables on your machine if you are using Windows. To avoid this, you can install _Windows Subsystem for Linux._
This allows you to use any Linux distribution (Ex. Ubuntu) withou the need for dualbooting or virtual machine.

### Installation

Go to the following links to install and setup WSL to work with your development environment
- [Installation instructions](https://learn.microsoft.com/en-us/windows/wsl/install) - Installation instructions for WSL.
- [Docker WSL Setup](https://docs.docker.com/desktop/wsl/#enabling-docker-support-in-wsl-2-distros) - Docker requires **WSL 2** to run docker commands. So make sure you install **WSL 2** for whatever Linux Distrobution you decide to use.

### Project setup
Open up an instance of your Linux Distrobution and go to the root directory
Run 
```bash 
sudo chown {username} -R ./
```
This will give you all the permissions (read, write) necessary to edit anything.
For the project to be setup correctly, make sure you clone the repo in the `./home` directory. 
Go to the project directory and 

### VS Code and WSL

Follow these steps to integrate VS Code with the Linux command line
  - Open up an instance of your Linux distrobution
  - Run ```code .``` to open up Visual Studio Code
  - Go to **File --> Preferences --> Settings --> Remote [WSL: Ubuntu]**
  - Go to **Features --> Terminal --> Integrated:cwd**
  - Set the start path to `/home/`. This is needed to fast refresh will work.

Make sure to get the WSL VS Code extension. Just type _WSL_ into the extensions search bar and it will be the first option. (The one with the Linux penguin logo). 

### NodeJS and Yarn installations

#### NodeJS
  - Open up an instance of your Linux distrobution in Visual Studio code
  - Go to the `/home/rcm-server/` folder and run

    ```bash
    sudo apt-get install nodejs
    ```
  - Check your node version with `node --version`. If you don't have version 20.10.0, install it by running

    ```bash
    nvm install 20.10.0
    ```
#### Yarn
  - You can download yarn with NPM by running the command

    ```bash
    npm install --global yarn
    ```

  - If that doesn't work take a look at the following link:
    [Yarn Installation Options](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

If you come across any issues, put it in the discord and we'll add it to the ReadME.
    
