import RNPusherPushNotifications from 'react-native-pusher-push-notifications';

export const init = (interest) => {
    // Set your app key and register for push
    RNPusherPushNotifications.setInstanceId("467be457-32c8-4e24-bede-31f801954fbe");
  
    // Init interests after registration
    RNPusherPushNotifications.on('registered', () => {
      subscribe(interest);
    });
  
    // Setup notification listeners
    RNPusherPushNotifications.on('notification', handleNotification);
};
  
// Handle notifications received
const handleNotification = notification => {
console.log(notification);

// iOS app specific handling
    if (Platform.OS === 'ios') {
        switch (notification.appState) {
            case 'inactive':
            // inactive: App came in foreground by clicking on notification.
            //           Use notification.userInfo for redirecting to specific view controller
            case 'background':
            // background: App is in background and notification is received.
            //             You can fetch required data here don't do anything with UI
            case 'active':
            // App is foreground and notification is received. Show a alert or something.
            default:
            break;
        }
    } else {
        // console.log("android handled notification...");
    }
}

  
// Subscribe to an interest
const subscribe = interest => {
// Note that only Android devices will respond to success/error callbacks
    RNPusherPushNotifications.subscribe(
        interest,
        (statusCode, response) => {
        console.error(statusCode, response);
        },
        () => {
        console.log('Success');
        }
    );
};

// Unsubscribe from an interest
const unsubscribe = interest => {
    RNPusherPushNotifications.unsubscribe(
        interest,
        (statusCode, response) => {
        console.tron.logImportant(statusCode, response);
        },
        () => {
        console.tron.logImportant('Success');
        }
    );
};