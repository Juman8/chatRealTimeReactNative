import React from 'react';
import { View, Text, YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './src/navigation'
import Toast from 'react-native-easy-toast'
import utils from './src/utils'
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen'
import * as Notice from "react-native-firebase";
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    console.disableYellowBox = true;
  }
  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyD31kM7wX_lLFShPH10jgoRcGo1__1DXcM",
      authDomain: "myapp-860b3.firebaseapp.com",
      databaseURL: "https://myapp-860b3.firebaseio.com",
      projectId: "myapp-860b3",
      storageBucket: "myapp-860b3.appspot.com",
      messagingSenderId: "1089323216357",
      appId: "1:1089323216357:web:000618631b608bfce7930c"
    };
    this.mNotifiConfig()
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    utils.setToast(this.Toast)
    SplashScreen.hide();
  }

  mNotifiConfig = async() => {
    Notice.messaging().hasPermission()
      .then(enabled => {
        console.log('HAS PERMISS: ', enabled)
        if (enabled) {
          Notice.messaging().getToken().then(token => {
            console.log("LOG: ", token);
          }).catch(err=> console.log(err))
        } else {
          Notice.messaging().requestPermission()
        }
      });
    const notificationOpen = await Notice
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const action = notificationOpen.action;
      const notification = notificationOpen.notification;
      var seen = [];
      // this.onActionWithNotification(notification)
      console.log('NOTIFICATION IS OPNE')
    }
     // config android
    const channel = new Notice.notifications.Android.Channel(
      "test-channel",
      "Test Channel",
      Notice.notifications.Android.Importance.Max
    ).setDescription("My apps test channel");

    // Create the channel
    Notice.notifications().android.createChannel(channel);
    this.notificationDisplayedListener = Notice
      .notifications()
      .onNotificationDisplayed((notification: Notification) => {
      console.log('CREATED CHANNEL')
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });

    this.notificationListener = Notice
      .notifications()
      .onNotification((notification: Notification) => {
        console.log('HAS Notification: ', notification)
        // Process your notification as required
        // notification.android
        //   .setChannelId("test-channel")
        //   .android.setSmallIcon("ic_launcher");
        // firebase.notifications().displayNotification(notification).catch(err => console.error(err));

      let notification_to_be_displayed = new Notice.notifications.Notification({
        data: notification.data,
        sound: 'default',
        show_in_foreground: true,
        title: notification.title,
        body: notification.body,
      });
      if(Platform.OS == "android") {
        notification_to_be_displayed
        .android.setPriority(Notice.notifications.Android.Priority.High)
        .android.setChannelId("test-channel")
        .android.setSmallIcon("ic_launcher")
        .android.setVibrate(1000);
    }
    Notice.notifications().displayNotification(notification_to_be_displayed);
    });

    this.notificationOpenedListener = Notice
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        var seen = [];
        console.log('notification Day nay', notification)
        Notice
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
        // this.onLinkingtoApp()
      });

      this.onMessageListener = Notice.messaging().onMessage((message: RemoteMessage) => {
        const {data} = message
        const showNotif = new Notice.notifications.Notification()
          .setNotificationId('notificationId')
          .setTitle(data.title || 'Thông báo')
          .setBody(data.content || 'Bạn có một thông báo mới')
          .setData(data)
          .android.setChannelId('test-channel')
          .android.setSmallIcon('ic_launcher')
          Notice.notifications().displayNotification(showNotif)
      })

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer />
        <Toast
          ref={ref => this.Toast = ref}
          opacity={0.8}
          style={{ backgroundColor: '#5cf545', width: '90%' }}
          textStyle={{ textAlign: 'center', color: 'white', fontWeight: '500' }}
        />
      </View>
    );
  }
};


export default App;
