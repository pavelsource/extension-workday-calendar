# Workday Calendar Extension

## Introduction

Extension for Workday SaaS software, which adds a calendar to the absence pages.

![alt Workday Calendar Extension](https://raw.githubusercontent.com/ashkue/extension-workday-calendar/master/readme-example.png)

## Features

* Calendar is available for `My Absence`, `My Time Off` and `Time Off and Leave Requests` pages
* Support for `en-US` and `en-GB` locales (date format and first day of the week)
* Different colors for each type of events in the calendar
* Correct calculation for cancelled events

## Install from the Chrome Marketplace

This extension can be downloaded directly from Chrome Web Store: https://chrome.google.com/webstore/detail/workday-calendar/acpklmphjdfgjcdodlhmbekfmioagohg

## Install Locally

1. Clone this repository to your computer
2. Build files required for the extension:

    ``` shell
    ./publish.sh
    ```

3. Open `Chrome Menu -> More Tools -> Extensions`
4. Enable `Developer mode`
5. Press `Load unpacked` and select path to `dist` folder in your repository, for example:

    ``` shell
    /Users/<your-username>/Projects/ashkue/extension-workday-calendar/dist
    ```

    ![alt Load Chrome Extension](https://raw.githubusercontent.com/ashkue/extension-workday-calendar/master/readme-load-local.png)
