//document ready function
$(() => {
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  $("#remove-favourite-button").on("click", function (event) {
    event.preventDefault();
    const url = `/api/favourites/${}/removeFavourite`;
    const data = { id: null };

    $.post(url, data)
      .then(() => {
        $(location).attr("href", url);
      })
      .catch((error) > {
        console.log(error)
      });
  });

  $("#add-favourite-button").on("click", function (event) {
    event.preventDefault();
    const url = `/api/favourites/${}/removeFavourite`;
    const data = {  };
    $.post(url, data)
      .then(() => {
        $(location).attr("href", url);
      })
      .catch((error) > {
        console.log(error)
      });
});
