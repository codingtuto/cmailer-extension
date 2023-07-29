chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendEmail") {
    const url = "https://cmailerapi.codingteam.tech/send-email";
    const payload = JSON.stringify(request.data);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          sendResponse({ success: true });
        } else {
          const responseObj = JSON.parse(xhr.responseText);
          const error_message = responseObj.message || "Erreur lors de l'envoi de l'e-mail.";
          sendResponse({ success: false, message: error_message });
        }
      }
    };

    xhr.send(payload);
    return true; // Indique que sendResponse sera appelé de manière asynchrone
  }
});
