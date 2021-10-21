// helper function for comments
const createCommentElement = function (comment) {
  return `<div style="background-color: lightgray">
    <p>
      ${comment.msg_text}
    </p>
</div>`
}
// document ready
$(() => {
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  $("#mark-as-sold-button").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: `/api/listings/${id}/setSold`,
      data: { sold: true },
    }).then(() => {
      $(location).attr("href", url);
    });
  });

  $("#mark-as-available-button").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: `/api/listings/${id}/setSold`,
      data: { sold: false },
    }).then(() => {
      $(location).attr("href", url);
    });
  });

});




