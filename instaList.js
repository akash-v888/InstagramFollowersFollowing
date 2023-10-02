// Define the fetch options for making API requests to Instagram.
const fetchOptions = {
    credentials: "include",
    headers: {
      "X-IG-App-ID": "936619743392459",
    },
    method: "GET",
  };
  
  // Declare a variable to store the Instagram username.
  let username;
  
  // Utility function to sleep for a specified number of milliseconds.
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  
  // Utility function to generate a random number within a specified range.
  const random = (min, max) => Math.ceil(Math.random() * (max - min)) + min;
  
  // Asynchronously concatenate multiple pages of API responses.
  const concatFriendshipsApiResponse = async (
    list,
    user_id,
    count,
    next_max_id = ""
  ) => {
    let url = `https://www.instagram.com/api/v1/friendships/${user_id}/${list}/?count=${count}`;
    if (next_max_id) {
      url += `&max_id=${next_max_id}`;
    }
  
    const data = await fetch(url, fetchOptions).then((r) => r.json());
  
    // Staggering user loading to prevent lockouts
    if (data.next_max_id) {
      const timeToSleep = random(100, 500);
      console.log(
        `Loaded ${data.users.length} ${list}. Sleeping ${timeToSleep}ms to avoid rate limiting`
      );
  
      await sleep(timeToSleep);
  
      return data.users.concat(
        await concatFriendshipsApiResponse(list, user_id, count, data.next_max_id)
      );
    }
  
    return data.users;
  };
  
  // Function to get a list of followers for a user.
  const getFollowers = (user_id, count = 50, next_max_id = "") => {
    return concatFriendshipsApiResponse("followers", user_id, count, next_max_id);
  };
  
  // Function to get a list of users that the given user is following.
  const getFollowing = (user_id, count = 50, next_max_id = "") => {
    return concatFriendshipsApiResponse("following", user_id, count, next_max_id);
  };
  
  // Function to get the user ID for a given Instagram username.
  const getUserId = async (username) => {
    let user = username;
  
    const lower = user.toLowerCase();
    const url = `https://www.instagram.com/api/v1/web/search/topsearch/?context=blended&query=${lower}&include_reel=false`;
    const data = await fetch(url, fetchOptions).then((r) => r.json());
  
    const result = data.users?.find(
      (result) => result.user.username.toLowerCase() === lower
    );
  
    return result?.user?.pk || null;
  };
  
  // Function to get the friendship stats (non-mutual followers and following) for a user.
  const getUserFriendshipStats = async (username) => {
    // Checks that username field was changed, sends a prompt if username is default
    if (username === "example_username") {
      username = window.prompt(
        "What's your username?"
      );
    }
  
    const user_id = await getUserId(username);
  
    //checks for valid username
    if (!user_id) {
      throw new Error(`Could not find user with username ${username}`);
    }
  
    const followers = await getFollowers(user_id);
    const following = await getFollowing(user_id);
  
    const followersUsernames = followers.map((follower) =>
      follower.username.toLowerCase()
    );
    const followingUsernames = following.map((followed) =>
      followed.username.toLowerCase()
    );
  
    const followerSet = new Set(followersUsernames);
    const followingSet = new Set(followingUsernames);
  
    console.log(Array(28).fill("-").join(""));
    console.log(
      `Fetched`,
      followerSet.size,
      "followers and ",
      followingSet.size,
      " following."
    );
  
    console.log(
      `May not always be 100% right :( \n if numbers look wrong, data might be wrong too`
    );
  
    const PeopleIDontFollowBack = Array.from(followerSet).filter(
      (follower) => !followingSet.has(follower)
    );
  
    const PeopleNotFollowingMeBack = Array.from(followingSet).filter(
      (following) => !followerSet.has(following)
    );
  
    return {
      PeopleIDontFollowBack,
      PeopleNotFollowingMeBack,
    };
  };
  
  // Replace "example_username" with your Instagram username.
  // Make sure you are logged into your Instagram account.
  username = "example_username";
  
  // Call the function to get friendship stats and log the result.
  getUserFriendshipStats(username).then(console.log);
  