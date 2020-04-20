/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/



/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell",
  "cdlafortune"
];

const getUsers = followersArray.map(el => {
    let url = `https://api.github.com/users/${el}`;
    return url;
  });

for (let i = 0; i < getUsers.length; i++){
  axios.get(getUsers[i])
  .then(response => {
    console.log("Data:", response);
    const myCard = newCard(response.data);
    entryPoint.appendChild(myCard);
  })

  .catch( err => {
    console.log("error", err);
  })
};


const entryPoint = document.querySelector(".cards");

const newCard = function(github){
  const card = document.createElement("div");
  card.classList.add("card");

  const avatar = document.createElement("img");
  avatar.src = `${github.avatar_url}`;
  card.appendChild(avatar);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  card.appendChild(cardInfo);

  const name = document.createElement("h3");
  name.textContent = github.name;
  name.classList.add("name");
  cardInfo.appendChild(name);

  const username = document.createElement("p");
  username.textContent = `Username: ${github.login}`;
  username.classList.add("username");
  cardInfo.appendChild(username);

  const location = document.createElement("p");
  location.textContent = `Location: ${github.location}`;
  cardInfo.appendChild(location);

  const profile = document.createElement("p");
  profile.textContent = `Profile: `;
  cardInfo.appendChild(profile);

  const link = document.createElement("a");
  link.href = github.url;
  link.textContent = github.html_url;
  profile.appendChild(link);

  const followers = document.createElement("p");
  followers.textContent = `Followers: `;
  cardInfo.appendChild(followers);

  const followersLink = document.createElement("a");
  followersLink.href = github.followers_url;
  followersLink.textContent = github.followers_url;
  followers.appendChild(followersLink);

  const following= document.createElement("p");
  following.textContent = `Following: `;
  cardInfo.appendChild(following);

  const followingLink = document.createElement("a");
  followingLink.href = github.following_url;
  followingLink.textContent = github.following_url;
  following.appendChild(followingLink);

  const bio = document.createElement("p");
  bio.textContent = `Bio: ${github.bio}`;
  cardInfo.appendChild(bio);

  return card;
};



