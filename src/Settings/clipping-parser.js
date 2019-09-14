import transformQuotes from "@fabien88/kindlequotes";

export const fetchClippings = callback => {
  fetch("/My Clippings.txt")
    //.then(r => r.text())
    .then(response => response.arrayBuffer())
    .then(buffer => {
      let decoder = new TextDecoder("utf-8");
      let text = decoder.decode(buffer);
      console.log({ text });
      const quotes = transformQuotes(text, "fr");
      callback(quotes);
      console.log(quotes);
    });
};


export const parseClippings = (clippings) => {
  const quotes = transformQuotes(clippings, "fr");
  return quotes;
}