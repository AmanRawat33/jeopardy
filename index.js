const container = document.querySelector(".container");
const refreshBtn = document.querySelector(".refresh-palette");

const maxBoxes = 32;
const generatePalette = () => {
    container.innerHTML = "";
  for (let i = 0; i < maxBoxes; i++) {
    let randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
    randomColor = `#${randomColor.padStart(6,'0')}`;

    const color = document.createElement("li");
    color.classList.add("color");
    color.innerHTML = `<div class="rect-box" style='background-color: ${randomColor}'></div>
            <span class="hex-value">${randomColor}</span>`;
      color.addEventListener("click", () => copyColor(color, randomColor));
      container.appendChild(color);
  }
};

const copyColor = (el, color) => {
    const element = el.querySelector(".hex-value");
    navigator.clipboard.writeText(color).then(() => {
        element.innerText = "Copied!";
        setTimeout(() => element.innerText = color, 1500);
    })
}
refreshBtn.addEventListener("click", generatePalette);
