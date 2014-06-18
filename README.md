# uomsa

To run the APP locally you must install the following:
- [MongoDB v2.4.8](http://www.mongodb.org/downloads) (or above)
- [Node.js v0.10.21](http://nodejs.org/download/) (or above)

### Running the App 

- Make sure you have the api running -> [uoMSA-API](https://github.com/uomsa/uomsa-api)
- Clone this repo
```
git clone https://github.com/uomsa/app.git
```
- Open Terminal (Mac or Linux) or Command Prompt (Windows) and cd into the root directory of the repo
```
cd app
```
- Install Apache Cordova (PhoneGap Core) (You might have to run command prompt as administrator)
```
npm install -g cordova
```

#### Building for iOS (Mac Only)

Ensure that you have XCode and iOS SDK installed on your mac

- Run the build command
```
cordova build ios
```

##### Simulate in iOS Emulator
- Install the ios-sim npm module so that cordova can talk to the iOS Emulator built into XCode
```
sudo npm install -g ios-sim
```
- Run the App in the iOS Emulator
```
cordova emulate ios
```

#### Building for Android

- Ensure that you have Android SDK installed and that `/sdk/tools/android` and `/sdk/platform-tools/adb` are accessible globally in the system (Install them to path)

- Run the android build command
```
cordova build android
```

##### Run on Android Device
- Connect your device to the computer and make sure that adb picks it up
```
adb devices
```
- If so then, then run the cordova command:
```
cordova run android
```





