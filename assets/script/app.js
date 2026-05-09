"use strict";

const login = document.getElementById("login");
const emailInput = document.getElementById("email");
const pwInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");
const postForm = document.getElementById("posts-form");
const postText = document.getElementById("post");
const postImage = document.getElementById("file");
const imageFileName = document.querySelector(".file-name");
const postContainer = document.getElementById("posts-section");
const usersList = document.querySelector(".known-people-list");
const connectButtons = document.querySelectorAll(".connect-btn");

let imageChild = null;
let loggedUserName = "Stephanie Abere";
const randomUserURL = "https://randomuser.me/api/?results=10";

localStorage.setItem("email", "fullname@gmail.com");
localStorage.setItem("password", "hunter2");

function checkInfo() {
  if (emailInput.value === localStorage.getItem("email") && pwInput.value === localStorage.getItem("password")) {
    window.location.href = "home.html";
    errorMessage.innerText = "";
    errorMessage.classList.remove("error-message");
  } else {
    errorMessage.classList.add("error-message");

    if (emailInput.value === "" && pwInput.value === "") {
      errorMessage.innerText = "Username and password are required";
    } else if (emailInput.value !== localStorage.getItem("email")) {
      errorMessage.innerText = "Incorrect username";
    } else if (pwInput.value !== localStorage.getItem("password")) {
      errorMessage.innerText = "Incorrect password";
    } else {
      errorMessage.innerText = "Incorrect username or password";
    }
  }
}

login.addEventListener("submit", (event) => {
  event.preventDefault(); // For Fakebook I just disguised a div as the submit button, but I found this since then
  // This prevents the browser's default form submission behavior
  checkInfo();
});

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/JSON; charset=UTF-8"
  },
  mode: "cors"
};

async function getUsers(endpointURL) {
  try {
    const result = await fetch(endpointURL, options);
    const data = await result.json();
    return data.results;
  } catch (error) {
    console.error(error.message);
  }
}

async function addUsers() {
  const users = await getUsers(randomUserURL);

  users.forEach((user) => {
    const userInfo = `
      <li>
        <div class="person-list-item">
          <div class="person-image">
            <img src=${user.picture.large} alt="User profile image" />
          </div>
          <div class="person-info">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>${user.location.city}</p>
          </div>
        </div>
        <button class="connect-btn button secondary-button">
          <i class="fa-solid fa-user-plus"></i>Connect
        </button>
      </li>`;

    usersList.insertAdjacentHTML("beforeend", userInfo);
  });
}

addUsers();

// Change styling when "Connect" button is clicked
usersList.addEventListener("click", (e) => {
  const button = e.target.closest(".connect-btn");

  if (!button) return;

  button.classList.toggle("connected");

  if (button.innerText === "Connect") {
    button.innerHTML = `
      <i class="fa-solid fa-check"></i>Connected`;
  } else {
    button.innerHTML = `
      <i class="fa-solid fa-user-plus"></i>Connect`;
  }
});

function createImageFile() {
  const file = postImage.files[0];
  const fileType = file?.type;

  // Validate file type
  if (!fileType || !fileType.startsWith("image/")) {
    imageFileName.textContent = "Wrong file type";
    return;
  }

  // Display file name
  const fileName = file?.name;
  if (fileName) {
    imageFileName.textContent = fileName;
  }

  // Create image child
  if (file) {
    imageChild = document.createElement("img");
    imageChild.src = URL.createObjectURL(file);
    imageChild.classList.add("post-image");
  }
}

postImage.addEventListener("change", createImageFile);

function createPostHeader() {
  let postHeader = document.createElement("div");
  postHeader.classList.add("post-header");

  let postHeaderLeft = document.createElement("div");
  postHeaderLeft.classList.add("post-left");
  postHeader.appendChild(postHeaderLeft);

  let now = new Date().toLocaleString("en-ca", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
  let dateParagraph = document.createElement("time");
  dateParagraph.innerText = now;
  postHeader.appendChild(dateParagraph);

  let postImage = document.createElement("div");
  postImage.classList.add("profile-image-container");
  postHeaderLeft.appendChild(postImage);

  let userName = document.createElement("h2");
  userName.textContent = loggedUserName;
  postHeaderLeft.appendChild(userName);

  let profileImage = document.createElement("img");
  profileImage.classList.add("profile-image");
  profileImage.src = "./assets/media/images/profile.png";
  profileImage.alt = "User profile image";
  postImage.appendChild(profileImage);

  return postHeader;
}

function randomNumber() {
  return Math.floor(Math.random() * (100 - 10 + 1)) + 10;
}

function createPost(e) {
  e.preventDefault();

  let postArticle = document.createElement("article");

  const postHeader = createPostHeader();
  postArticle.appendChild(postHeader);

  const text = createPostText();
  if (text) postArticle.appendChild(text);

  const image = createPostImage(imageChild);
  if (image) postArticle.appendChild(image);

  const likeCounter = `
    <div class="like-counter">
      <i class="fa-solid fa-heart"></i>
      <span>${randomNumber()}</span>
    </div>`;
  postArticle.insertAdjacentHTML("beforeend", likeCounter);

  const postFooter = `
    <ul class="post-footer">
      <li>
        <button>
          <i class="fa-regular fa-heart"></i>
          <span>Like</span>
        </button>
      </li>
      <li>
        <button>
          <i class="fa-regular fa-comment"></i>
          <span>Comment</span>
        </button>
      </li>
      <li>
        <button>
          <i class="fa-solid fa-share-nodes"></i>
          <span>Share</span>
        </button>
      </li>
    </ul>`;
  postArticle.insertAdjacentHTML("beforeend", postFooter);

  if (text || image) {
    postContainer.prepend(postArticle);
    resetForm();
  }
}

function createPostText() {
  if (!postText.value) return null;

  const textChild = document.createElement("p");
  textChild.textContent = postText.value;
  return textChild;
}

function createPostImage(image) {
  if (!image) return null;
  return image;
}

function resetForm() {
  postText.value = "";
  postImage.value = "";
  imageFileName.textContent = "";
  imageChild = null;
}

postForm.addEventListener("submit", createPost);
