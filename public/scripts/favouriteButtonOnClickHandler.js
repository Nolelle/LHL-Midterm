//document ready function
$(() => {
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  $("#remove-favourite-button").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: `/api/favourites/${id}/removeFavourite`,
      data: { id: null },
    }).then(() => {
      $(location).attr("href", url);
    });
  });

  $("#add-favourite-button").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: `/api/favourites/${id}/addFavourite`,
      data: { id : },
    }).then(() => {
      $(location).attr("href", url);
    });
  });
});
