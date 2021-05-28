const NotificationCenter = require("node-notifier").NotificationCenter;

var notifier = new NotificationCenter({
  withFallback: false, // Use Growl Fallback if <= 10.8
  customPath: undefined, // Relative/Absolute path to binary if you want to use your own fork of terminal-notifier
});

const notify = function () {
  notifier.notify(
    {
      title: "重要提醒",
      subtitle: "记得劳逸结合喔",
      message: "新冠疫苗预约",
      sound: true, // Case Sensitive string for location of sound file, or use one of macOS' native sounds (see below)
      icon: "avatar.jpeg", // Absolute Path to Triggering Icon
      contentImage: undefined, // Absolute Path to Attached Image (Content Image)
      open: undefined, // URL to open on Click
      wait: true, // Wait for User Action against Notification or times out. Same as timeout = 5 seconds

      // New in latest version. See `example/macInput.js` for usage
      timeout: 20, // Takes precedence over wait if both are defined.
      closeLabel: "稍后提醒", // String. Label for cancel button
      actions: undefined, // String | Array<String>. Action label or list of labels in case of dropdown
      dropdownLabel: undefined, // String. Label to be used if multiple actions
      reply: false, // Boolean. If notification should take input. Value passed as third argument in callback and event emitter.
    },
    function (error, response, metadata) {
      console.log("error:", error, "response:", response, "metadata", metadata);
    }
  );
};
notifier.on("click", function (notifierObject, options, event) {
  // Triggers if `wait: true` and user clicks notification
  console.log(notifierObject, options, event, "notifierObject, options, event");
});

notifier.on("timeout", function (notifierObject, options) {
  // Triggers if `wait: true` and notification closes
  console.log("notifierObject, options", notifierObject, options);
});
const schedule = require("node-schedule");

function scheduleCronstyle() {
  schedule.scheduleJob("0 58 15 * * *", notify);
  schedule.scheduleJob("0 58 17 * * *", notify);
  schedule.scheduleJob("0 58 19 * * *", notify);
}

scheduleCronstyle();
