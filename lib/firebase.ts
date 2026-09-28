import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let messaging: any = null;

export const initializeFirebaseMessaging = async () => {
  if (typeof window !== 'undefined') {
    const supported = await isSupported();
    if (supported) {
      messaging = getMessaging(app);
      return messaging;
    }
  }
  return null;
};

export const requestForToken = async () => {
  try {
    const msg = await initializeFirebaseMessaging();
    if (msg) {
      const currentToken = await getToken(msg, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });
      if (currentToken) {
        console.log('FCM Token:', currentToken);
        // TODO: Send this token to backend (Laravel) so it can send push notifications to this device
        return currentToken;
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
  return null;
};

export const onMessageListener = (callback: (payload: any) => void) => {
  if (messaging) {
    return onMessage(messaging, (payload) => {
      callback(payload);
    });
  }
  return null;
};

export { app, messaging };
