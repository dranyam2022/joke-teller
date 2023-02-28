const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function tellJoke(source) {
  VoiceRSS.speech({
    key: "53470f88f7364813a2f57064e0b6f0ae",
    src: source,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  button.disabled = true;
  const apiUrl = "https://v2.jokeapi.dev/joke/Programming?type=single";
  try {
    const res = await fetch(apiUrl);
    if (res.ok) {
      const data = await res.json();
      tellJoke(data.joke);
    } else {
      throw new Error("Fetch failed!");
    }
  } catch (error) {
    console.error(error);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", () => {
  button.disabled = false;
});
