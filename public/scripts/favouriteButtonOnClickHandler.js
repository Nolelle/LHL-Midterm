//document ready function
$(() => {
  const windowURL = window.location.pathname;
  const listingID = windowURL.substring(windowURL.lastIndexOf("/") + 1);

  $("#remove-favourite-button").on("click", function (event) {
    event.preventDefault();
    const url = `/api/listings/${listingID}/removeFavourite`;
    // const data = {};
    $.post(url)
      .then(() => {
        $(location).attr("href", windowURL);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  $("#add-favourite-button").on("click", function (event) {
    event.preventDefault();
    const url = `/api/listings/${listingID}/addFavourite`;
    $.post(url)
      .then(() => {
        $(location).attr("href", windowURL);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
