const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
const apiUrl = "https://v2.jokeapi.dev/joke/Any?amount=5";
const loading = document.querySelector(".fa-comment-dots");
let jokesData = {};

/* tell Joke function */
function tellJoke(
  source = "There are no jokes available. Please try again or check your internet connection"
) {
  VoiceRSS.speech({
    key: "53470f88f7364813a2f57064e0b6f0ae", // should be hidden in database;
    src: source,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

/* Get Joke from API function */
async function getJokes() {
  try {
    const res = await fetch(apiUrl);
    if (res.ok) {
      jokesData = await res.json();
    } else {
      throw new Error("Failed to fetch Joke from API.");
    }
  } catch (error) {
    return error;
  }
}

/* initial load runs getJokes function and store it to var jokesData*/
getJokes();

/* click button handler */
async function jokeTeller() {
  loading.classList.add("active");
  button.disabled = true;
  if (jokesData.jokes.length > 0) {
    const source = jokesData.jokes.pop();
    let sourceText = "";
    if (source.type === "twopart") {
      sourceText = `${source.setup}... ${source.delivery}`;
    } else {
      sourceText = `${source.joke}`;
    }
    tellJoke(sourceText);
  } else {
    await getJokes();
    jokeTeller();
  }
  console.log(...jokesData.jokes);
  console.log(jokesData.jokes.length);
}

/* button.addEventListener("click", jokeTeller); */
button.addEventListener("click", jokeTeller);
audioElement.addEventListener("ended", () => {
  button.disabled = false;
  loading.classList.remove("active");
});
