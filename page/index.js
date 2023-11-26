import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import {
  FETCH_BUTTON,
  FETCH_RESULT_TEXT,
} from "zosLoader:./index.[pf].layout.js";

const logger = Logger.getLogger("fetch_api");

let textWidget;
Page(
  BasePage({
    state: {},
    build() {
      this.count = 10; // Adjust the number of iterations

      hmUI.createWidget(hmUI.widget.BUTTON, {
        ...FETCH_BUTTON,
        click_func: (button_widget) => {
          logger.log("click button");
          this.fetchData();
        },
      });
    },
    fetchData() {
      this.count--;

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

          // If count is still positive, continue to request data from the side app
          if (this.count > 0) this.fetchData();
        })
        .catch((res) => {});
    },
  })
);
