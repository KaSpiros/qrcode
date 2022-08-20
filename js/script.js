const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;
  const cDark = document.getElementById("color-dark").value;
  const cLight = document.getElementById("color-light").value;
  const fileName = document.getElementById("filename").value;

  // Validate url
  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size, cDark, cLight);

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector("img").src;
        // Create save button
        createSaveButton(saveUrl, fileName);
      }, 50);
    }, 1000);
  }
};

// Generate QR code
const generateQRCode = (url, size, colorDark, colorLight) => {
  return (qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
    colorDark: colorDark,
    colorLight: colorLight,
  }));
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");
  if (saveLink) {
    saveLink.remove();
  }
};

// Create save button to download QR code as image
const createSaveButton = (saveUrl, fileName) => {
  //filename validation
  if (fileName === "") {
    fileName = "qrcode";
  }

  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = fileName;
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
