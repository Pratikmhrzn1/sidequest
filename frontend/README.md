# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
## What I installed:
## in backend:
1.express: to build web servers and api and handle http request/response and middleware.
2.mongoose: ODM for mongodb which makes it easier to work with mongodb databases by providing schema validation,
query helpers and more structured way to interact with your data.
3.cors: cross-origin resource sharing middleware which allows our server to accept requests from different domains
talking to your backend.
3.dotenv: requires for secrecy of secret data. works alongside .gitignore to not put the sensitive file in repo.
4.body-parser:parses incoming requests bodies so we can access it in our code.(optional)
5.nodemon: allows autorestart whenever we make changes in the file.(--save dev is used so that it wont be available in production just in development phase.)
6.morgan : it automatically logs every incoming HTTP request to your server in the terminal/console — making it extremely helpful during development and debugging.
7.axios:super-popular HTTP client that makes it very easy (and reliable) to call APIs from your Node.js backend