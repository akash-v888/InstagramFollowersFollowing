# Instagram Friendship Stats Checker

This project is a JavaScript utility for fetching and analyzing the follower and following lists of an Instagram user. It uses Instagram's private API endpoints (via fetch requests) to determine non-mutual relationships—such as users who don’t follow you back and users you don’t follow back.

**Note:** This script requires you to be logged into your Instagram account in the same browser session. It uses Instagram’s private API and may stop working if endpoints change or if rate limits are hit.

---

## Features

- Retrieve a user’s followers and following lists
- Identify:
  - People you follow who don’t follow you back
  - People who follow you but you don’t follow back
- Includes random sleep intervals between API calls to avoid rate-limiting

---

## Getting Started

### Prerequisites

- A web browser where you're logged into Instagram
- A basic understanding of how to run JavaScript in the browser console

---

## How to Use

1. Open your web browser and log into [Instagram](https://instagram.com).
2. Open Developer Tools:
   - Windows: Press `F12`
   - Mac: Press `Cmd + Option + I`
3. Go to the **Console** tab.
4. Paste the entire script into the console.
5. Replace the line:

   ```js
   username = "example_username";
   ```
   with your actual Instagram username.
6. Press Enter. If the placeholder username is detected, you'll be prompted to enter your username.

## Rate Limiting Notice
To avoid rate-limiting by Instagram:
The script includes a randomized delay (100ms–500ms) between paginated requests.
Each API request fetches 50 users at a time.

## Disclaimer
This tool is intended for educational purposes only. Accessing Instagram’s private APIs may violate their Terms of Use. Use at your own risk.


