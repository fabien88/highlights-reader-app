import books from "google-books-search";
import Bottleneck from "bottleneck";
const limiter = new Bottleneck({
  minTime: 500
});
const options = {
  // key: "YOUR API KEY",
  // field: 'title',
  // offset: 0,
  limit: 1,
  type: "books"
  // order: 'relevance',
  // lang: 'en'
};

const alreadySearched = {};

export const downloadThumbnail = (thumbnails, title, author, callback) => {
  const key = title + "->" + author;
  if (alreadySearched[key] || thumbnails[key]) {
    return;
  }
  alreadySearched[key] = true;
  console.log("Searching for " + key);

  limiter.submit(books.search, title + " " + author, options, function(
    error,
    results
  ) {
    if (!error) {
      // console.log(results);
      callback(results[0].thumbnail);
    } else {
      //console.log(error);
    }
  });
};
