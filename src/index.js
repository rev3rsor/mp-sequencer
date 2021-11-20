// create disappearing div for messages

const createDisappearingDiv = (parent, innerHTML) => {
  const div = document.createElement("div");
  div.setAttribute("class", "disappear");
  div.innerHTML = innerHTML;

  setTimeout(() => {
    div.style.opacity = 0;

    setTimeout(() => {
      parent.removeChild(div);
    }, 2000);
  }, 1000);

  parent.appendChild(div);

  return div;
};

// get base url for localtunnel

const INITIAL_BASE_URL = "https://imsi-file-sender.loca.lt";

let baseUrl = INITIAL_BASE_URL;

const baseUrlForm = document.getElementById("base-url-form");
const baseUrlInput = document.getElementById("base-url-input");
const baseUrlButtonContainer = document.getElementById(
  "base-url-button-container"
);
const baseUrlDisplay = document.getElementById("base-url-display");

const initialBaseUrlText = baseUrlDisplay.innerHTML;
baseUrlDisplay.innerHTML = `${initialBaseUrlText} <code>${baseUrl}</code>`;

baseUrlForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newBaseUrl = baseUrlInput.value;
  if (newBaseUrl) {
    let message = `Base URL is already ${newBaseUrl}`;

    if (newBaseUrl !== baseUrl) {
      message = `Set base URL to ${newBaseUrl}`;
      baseUrl = newBaseUrl;
      baseUrlDisplay.innerHTML = `${initialBaseUrlText} ${baseUrl}`;
    }

    createDisappearingDiv(baseUrlButtonContainer, message);
  }
});

// handle form

const form = document.getElementById("form");
const textInput = document.getElementById("description-input");
const fileInput = document.getElementById("file-input");
const formButtonContainer = document.getElementById("form-button-container");

const sendData = async () => {
  const formData = new FormData();

  if (textInput.value) {
    formData.append("description", textInput.value);
  }
  formData.append("file", fileInput.files[0]);

  const res = await fetch(`${baseUrl}/upload`, {
    body: formData,
    method: "POST",
  });

  return await res.text();
};

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  createDisappearingDiv(formButtonContainer, "Sending");
  const responseText = await sendData();
  createDisappearingDiv(formButtonContainer, responseText);
});
