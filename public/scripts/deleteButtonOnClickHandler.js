$(() => {
  const windowURL = window.location.pathname;
  const listingID = windowURL.substring(windowURL.lastIndexOf("/") + 1);
  const redirectURL = windowURL.slice(0, windowURL.lastIndexOf("/"));

  console.log(redirectURL);
  $("#delete-button").on("click", function (event) {
    event.preventDefault();
    const url = `/api/listings/${listingID}`;

    $.ajax({
      method: "DELETE",
      url,
    })
      .then(() => {
        $(location).attr("href", redirectURL);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
