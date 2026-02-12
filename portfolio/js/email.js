// init emailjs
  (function(){
    emailjs.init("25b_wPFUZuAj8wXZy");
  })();

  // form submit
  document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();

    emailjs.send("service_jqvn033", "template_4vae84s", {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    })
    .then(() => {
      alert("Message sent successfully! 🚀");
    })
    .catch(() => {
      alert("Failed to send message ❌");
    });
  });