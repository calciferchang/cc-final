function youveGotMail() {
  const div = document.createElement("div");

  // Style the div with absolute positioning at random visible location
  div.style.position = "fixed";
  div.style.left = Math.random() * (window.innerWidth - 100) + "px";
  div.style.top = Math.random() * (window.innerHeight - 100) + "px";
  div.style.pointerEvents = "none";
  div.style.zIndex = "1000";

  // Create the image element
  const img = document.createElement("img");
  img.src = "assets/mailbox.png";
  img.style.border = "1px solid black";
  img.style.display = "block";
  img.style.width = "100px";
  img.style.height = "100px";

  // Add image to div and div to body
  div.appendChild(img);
  document.body.appendChild(div);

  // Remove after 3 seconds
  setTimeout(() => {
    div.remove();
  }, 1000);
}
