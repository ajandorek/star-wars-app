// function to generate gradient off id or randomly
function generateRandomGradient(firstId, secondId) {
  // generate random hex color
  // pad the start to ensure 6 characters
  const randomColor = (id) => Math.round(id * 0xFFFFFF<<0).toString(16).padStart(6, 0)

  return `linear-gradient(${
    Math.floor(firstId * 90) + 1
  }deg, #${randomColor(firstId)}, #${randomColor(secondId)})`;
}

export default generateRandomGradient;
