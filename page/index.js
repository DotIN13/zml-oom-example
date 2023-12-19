import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import {
  FETCH_BUTTON,
  FETCH_RESULT_TEXT,
} from "zosLoader:./index.[pf].layout.js";

import { EventBus } from "@zos/utils";

const eventBus = new EventBus();
let startTime = null;
const logger = Logger.getLogger("fetch_api");

let textWidget;
Page(
  BasePage({
    state: {},
    build() {
      this.count = 50; // Adjust the number of iterations

      eventBus.on("fetch", () => this.fetchData());

      hmUI.createWidget(hmUI.widget.BUTTON, {
        ...FETCH_BUTTON,
        click_func: (button_widget) => {
          logger.log("click button");
          this.count = 50;
          startTime = Date.now();
          eventBus.emit("fetch", null);
        },
      });
    },
    fetchData() {
      this.count--;
      // break if count is negative
      if (this.count < 0) {
        const elapsed = Date.now() - startTime;
        textWidget.setProperty(hmUI.prop.TEXT, elapsed / 1000 + "s");
        return;
      }

      this.request({
        method: "GET_DATA",
      })
        .then((data) => {
          // Receive data and update text widget
          logger.log("receive data");
          const result = Buffer.from(data);
          const text = `${this.count} ${result.length}`;

          if (!textWidget) {
            textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
              ...FETCH_RESULT_TEXT,
              text,
            });
          } else {
            textWidget.setProperty(hmUI.prop.TEXT, text);
          }

          eventBus.emit("fetch", null);
        })
        .catch((res) => {});
    },
  })
);
