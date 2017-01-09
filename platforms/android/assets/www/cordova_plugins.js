cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-connectivity-monitor/www/connectivity.js",
        "id": "cordova-connectivity-monitor.connectivity",
        "clobbers": [
            "window.connectivity"
        ]
    },
    {
        "file": "plugins/cordova-admob/www/admob.js",
        "id": "cordova-admob.AdMobAds",
        "clobbers": [
            "window.admob",
            "window.tappx"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "id": "cordova-plugin-dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "id": "cordova-plugin-vibration.notification",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "file": "plugins/cordova-plugin-pdialog/www/plugins.PDialog.js",
        "id": "cordova-plugin-pdialog.PDialog",
        "clobbers": [
            "cordova.plugin.pDialog"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{}
// BOTTOM OF METADATA
});