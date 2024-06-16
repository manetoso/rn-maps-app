# MoviesApp

This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install all dependencies

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

## Step 2: Set ENV variables

Clone the `.env.template` file and set-up yours environment variables.
For this repo you must generate and use your own maps API_KEYS from Google Maps Platform and paste it in these files:

```bash
# iOS
ios/mapsApp/AppDelegate.mm # Line 12

# Android
android/app/src/main/AndroidManifest.xml # Line 19
```

## Step 3: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 4: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run start:ios

# OR using Yarn
yarn start:ios
```

```bash
⚠ These commands will open the iPhone SE (3rd generation). If you want to run the default emulator or physical device run:
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
