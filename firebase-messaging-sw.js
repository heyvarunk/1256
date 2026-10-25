importScripts('https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging-compat.js');
firebase.initializeApp({"apiKey": "AIzaSyCVmgAeNba4c5EGSSUZORuB-cZqI4ORBsc", "authDomain": "varun-dynamics-app.firebaseapp.com", "projectId": "varun-dynamics-app", "storageBucket": "varun-dynamics-app.firebasestorage.app", "messagingSenderId": "67016520294", "appId": "1:67016520294:web:fd1299acabd1a7a6cf73a7"});
const messaging=firebase.messaging();
messaging.onBackgroundMessage(payload => {
  const d = payload.data || {};
  const title = d.title || payload.notification?.title || 'Varun Dynamics ERP';
  const options = {
    body: d.body || payload.notification?.body || 'New ERP activity',
    icon: 'https://raw.githubusercontent.com/heyvarunk/124/main/Copilot_20250716_231520.png',
    badge: 'https://raw.githubusercontent.com/heyvarunk/124/main/Copilot_20250716_231520.png',
    tag: d.eventKey || 'vds-' + Date.now(),
    silent: false,
    data: { url: new URL('./index.html', self.registration.scope).href }
  };
  return self.registration.showNotification(title, options);
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = event.notification.data?.url || new URL('./index.html', self.registration.scope).href;
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(windows => {
    const match = windows.find(w => w.url.startsWith(self.registration.scope));
    if(match) return match.focus();
    return clients.openWindow(target);
  }));
});
