const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable and enable joke button
function toggleButton() {
    document.getElementById('joke_button').disabled = !document.getElementById('joke_button').disabled;
}

// Pass the joke to VoiceRSS API
function tellJoke(joke) {
    VoiceRSS.speech({
        key: 'ed7c59b419e14041b31e1bf5d2a4bd7e',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get a joke from the Joke API
async function getJokes() {
    let joke = '';
    const jokeAPI = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try {
        const api_response = await fetch(jokeAPI);
        const data = await api_response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech reads joke out loud
        tellJoke(joke);
        // Disable button
        toggleButton();
    } catch (error) {
        // Catch any error
        console.log('Sorry, you are having the following error, ', error);
    }
}

// Event Listener
document.getElementById('joke_button').addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);