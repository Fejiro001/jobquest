"use strict";
const postForm = document.getElementById("posts-form");
const postText = document.getElementById("post");
const postImage = document.getElementById("file");
const imageFileName = document.querySelector(".file-name");
const postContainer = document.getElementById("posts-section");

let imageChild = null;
let loggedUserName = "Stephanie Abere";

function createImageFile() {
  const file = postImage.files[0];
  const fileType = file?.type;

  // Validate file type
  if (!fileType || !fileType.includes("image/")) {
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
  let dateParagraph = document.createElement("p");
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

function createPost(e) {
  e.preventDefault();

  let postArticle = document.createElement("article");

  const postHeader = createPostHeader();
  postArticle.appendChild(postHeader);

  const text = createPostText();
  if (text) postArticle.appendChild(text);

  const image = createPostImage(imageChild);
  if (image) postArticle.appendChild(image);

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
