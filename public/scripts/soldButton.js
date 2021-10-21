//document ready function
//reads the boolean field to see if item is sold or not,
//when i submit mark as sold button,
//this updates the database
//for that userID, and listingID the sold field
$(() => {
  $(".sold-button").on("submit", function (event) {
    console.log(event);
    //   const listingId = req.params.id;
    //   $.get("/api/listings/${userID}").then(() => {});
    // });
  });
});
