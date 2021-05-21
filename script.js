const API_URL = "https://type.fit/api/quotes";

const quoteContainer = document.querySelector(".quote");
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const generateQuoteBtn = document.querySelector(".generate-quote-btn");
const tweetBtn = document.querySelector(".twitter-btn");
const loader = document.querySelector(".loader");

loader.hidden = true;

const renderSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const renderQuote = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

let state = [];

const fetchQuotes = async function () {
  renderSpinner();
  try {
    let getQuotes = await fetch(API_URL);
    let data = await getQuotes.json();
    state = data.filter((quote) => quote.author !== null);
  } catch (error) {
    console.log(error, error.message);
  }
  renderQuote();
};

fetchQuotes().then(() => getRandomQuote());

const getRandomQuote = () => {
  renderSpinner();
  const randomQuoteNumber = Math.floor(state.length * Math.random());
  let randomQuote = state[randomQuoteNumber].text;
  let randomAuthor = state[randomQuoteNumber].author;
  quoteText.textContent = randomQuote;
  quoteAuthor.textContent = `- ${randomAuthor}`;
  renderQuote();
};

const tweetQuote = () => {
  const twitterWebIntent = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${quoteAuthor.textContent}`;
  window.open(twitterWebIntent, "_blank");
};

tweetBtn.addEventListener("click", tweetQuote);

generateQuoteBtn.addEventListener("click", getRandomQuote);
