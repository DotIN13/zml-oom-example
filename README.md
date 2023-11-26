## Usage

The test file is a decompressed mvt map tile of aroud 9KB in size. It can be served either with http-server or by directly uploading to a file hosting service such as x0.at.

This example demonstrates that even if the data goes out of scope immediately after being received on the watch, it would still quickly come down to an OOM after a few rounds of data transmission.

For my Balance, it is usually 8 tiles transferred before the system reboot due to an OOM.
