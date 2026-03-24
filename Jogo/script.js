
const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const botResult = document.querySelector(".bot_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");

const botImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
const outcomes = {
  RR: "Empate",
  RP: "BOT",
  RS: "VOCÊ",
  PP: "Empate",
  PR: "VOCÊ",
  PS: "BOT",
  SS: "Empate",
  SR: "BOT",
  SP: "VOCÊ"
};

function handleOptionClick(event) {
  const clickedImage = event.currentTarget;
  const clickedIndex = Array.from(optionImages).indexOf(clickedImage);

  userResult.src = botResult.src = "images/rock.png";
  result.textContent = "Esperando...";

  optionImages.forEach((image, index) => {
    image.classList.toggle("active", index === clickedIndex);
  });

  gameContainer.classList.add("start");

  setTimeout(() => {
    gameContainer.classList.remove("start");

    const userImageSrc = clickedImage.querySelector("img").src;
    userResult.src = userImageSrc;

    const randomNumber = Math.floor(Math.random() * botImages.length);
    const botImageSrc = botImages[randomNumber];
    botResult.src = botImageSrc;

    const userValue = ["R", "P", "S"][clickedIndex];
    const botValue = ["R", "P", "S"][randomNumber];
    const outcomeKey = userValue + botValue;
    const outcome = outcomes[outcomeKey] || "Unknown";

    result.textContent = userValue === botValue ? "Empate" : `${outcome} WON!`;
  }, 2500);
}

optionImages.forEach(image => {
  image.addEventListener("click", handleOptionClick);
});