# TPLink LightBulb HTTP

Basic controls for TP-Link light bulbs over HTTP

The communication is handled using the [tplink-lightbulb](https://github.com/konsumer/tplink-lightbulb) library.

## What does this do?

This allows for the following actions:

### Light actions

-   Light on
    -   GET
    -   /light/on
-   Light off
    -   GET
    -   /light/off
-   Light brightness to 100
    -   GET
    -   /light/brightness/100
-   Light brightness to 50
    -   GET
    -   /light/brightness/50
-   Light details
    -   GET
    -   /light/details

### Display actions (refer to displayOffFile variable info)

-   Display on
    -   GET
    -   /display/on
-   Display off
    -   GET
    -   /display/off

## Configuration

### Installing dependencies

Run the following to install `express` and `tplink-lightbulb` dependencies:

```bash
npm install
```

### Configuring the server

There are values of variables that you may need to adjust (especially the IP address of the lightbulb).

| Variable       | Description                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| hostname       | IP address of TP-Link light bulb                                                                                   |
| port           | Port number of the HTTP server that the script would be hosting                                                    |
| writeToFile    | Output last action status to file                                                                                  |
| statusFile     | Path to last action status file -- intended to use with SSD1306-Display-SysInfo to display the status on a display |
| displayOffFile | Path to display off file -- intended to use with SSD1306-Display-SysInfo to control the display visibility         |
