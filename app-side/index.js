import { BaseSideService } from "@zeppos/zml/base-side";

const logger = Logger.getLogger("large-fetch-app-side");

AppSideService(
  BaseSideService({
    onInit() {},

    onRequest(req, res) {
      logger.log("Getting data");

      // Adjust the fetch method to your way of file hosting
      fetch({
        // url: "http://192.168.1.129:8080/shanghai-20231119-mini-fbs/15/27436/13393.mvt",
        url: "http://192.168.5.117:8080/13393.mvt",
        method: "GET",
        headers: {
          "Content-Type": "application/x-protobuf",
          "Accept-Encoding": "gzip",
        },
      })
        .then((resp) => resp.arrayBuffer())
        .then((resp) => {
          resp = Buffer.from(resp);
          logger.log("Tile data size:", resp.length);

          res(null, resp);
        })
        .catch((e) => {
          logger.warn(e.message);

          return res(null, {
            status: "error",
            message: e.message,
          });
        });
    },

    onRun() {},

    onDestroy() {},
  })
);
