# Instagram Friendship Stats Checker
This project is a JavaScript utility for fetching and analyzing the follower and following lists of an Instagram user. It uses Instagram's private API endpoints (via fetch requests) to determine non-mutual relationships—such as users who don’t follow you back and users you don’t follow back.

Note: This script requires you to be logged into your Instagram account in the same browser session. It uses Instagram’s private API and may stop working if endpoints change or if rate limits are hit.

Features
Retrieve a user’s followers and following lists

Identify:

People you follow who don’t follow you back

People who follow you but you don’t follow back

Includes random sleep intervals between API calls to avoid rate-limiting

Getting Started
Prerequisites
A web browser where you're logged into Instagram

A basic understanding of how to run JavaScript in the browser console

How to Use
Open your web browser and log into Instagram.

Press F12 (or Cmd + Option + I on Mac) to open DevTools.

Go to the Console tab.

Paste the entire script into the console.

Replace the line:

js
Copy
Edit
username = "example_username";
with your actual Instagram username.

Hit Enter. You'll be prompted to allow or enter your username again if it's still set to the placeholder.

Example Output
js
Copy
Edit
----------------------------
Fetched 320 followers and 278 following.
May not always be 100% right :( 
if numbers look wrong, data might be wrong too

{
  PeopleIDontFollowBack: [ 'user1', 'user2' ],
  PeopleNotFollowingMeBack: [ 'user3', 'user4' ]
}
Code Overview
getUserId(username) — Retrieves the user ID based on username.

getFollowers(user_id) / getFollowing(user_id) — Recursively fetches all followers or following.

getUserFriendshipStats(username) — Main function that returns non-mutual follower/following data.

Rate Limiting Notice
To reduce the risk of getting rate-limited or temporarily banned by Instagram:

The script sleeps for a random time (100ms–500ms) between paginated API requests.

Fetches are limited to 50 users per request.

Disclaimer
This tool is for educational purposes only. Using Instagram’s private APIs may violate their Terms of Use. Use responsibly and at your own risk.
