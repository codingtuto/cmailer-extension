document.getElementById('sendButton').addEventListener('click', () => {
  const to = document.getElementById('to').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const url = "https://cmailerapi.codingteam.tech/send-email";

  const data = {
    to: to,
    subject: subject,
    message: message
  };

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");

  document.getElementById('sendButton').disabled = true;
  document.getElementById('sendButton').innerText = "Envoi en cours, veuillez patienter...";

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      document.getElementById('sendButton').disabled = false;
      if (xhr.status === 200) {
        document.getElementById('status').textContent = "E-mail envoyé avec succès.";
        setTimeout(() => {
          document.getElementById('status').textContent = "";
          document.getElementById('to').value = "";
          document.getElementById('subject').value = "";
          document.getElementById('message').value = "";
          playSuccessSound();
        }, 3000); // 3 seconds
      } else {
        const responseObj = JSON.parse(xhr.responseText);
        const error_message = responseObj.message || "Erreur lors de l'envoi de l'e-mail.";
        document.getElementById('status').textContent = `Erreur : ${error_message}`;
      }
      setTimeout(() => {
        document.getElementById('sendButton').innerText = "Envoyer l'e-mail";
      }, 1000); // 1 second
    }
  };

  xhr.send(JSON.stringify(data));
});

function playSuccessSound() {
  const successSound = new Audio("ok.mp3");
  successSound.play();
}
