import { BaseApp } from "@zeppos/zml/base-app";
import { pauseDropWristScreenOff, resetDropWristScreenOff } from "@zos/display";

App(
  BaseApp({
    globalData: {},
    onCreate(options) {
      console.log("app on create invoke");
      pauseDropWristScreenOff({
        duration: 0,
      });
    },

    onDestroy(options) {
      console.log("app on destroy invoke");
      resetDropWristScreenOff();
    },
  })
);
