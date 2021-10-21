//document ready function
$(() => {
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  $("#mark-as-sold-button").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: `/api/listings/${id}/setSold`,
      data: { sold: true },
    });
  });

  $("#mark-as-available-button").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: `/api/listings/${id}/setSold`,
      data: { sold: false },
    });
  });
});
