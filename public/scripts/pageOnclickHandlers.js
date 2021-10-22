const createListingElement = function (listing) {
  return `<div class="listing">
<div class="listing-content">
  <img class="listing-image" src=${listing.image_url}></img><br>
  <div><b class="listing-title">
    ${listing.title}
  </b>
  <p><b class="price">$${listing.price}</b></p>
</div>
</div>
<form action="/listings/${listing.id}" method="GET">
<button type="submit">View</button>
</form>
</div>`;
};

$(() => {
  $(".next").on("click", function (event) {
    event.preventDefault();
    let pageNumber = parseInt($("#pageNumber").text()) + 1;
    const url = `http://localhost:8080/api/listings/page/${pageNumber}`;
    console.log("next url", url);
    $.get(url)
      .then((listings) => {
        $(".listings").empty();

        for (let listing of listings) {
          const listingElement = createListingElement(listing);
          $(".listings").append(listingElement);
        }
        $("#pageNumber").text(pageNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  $(".previous").on("click", function (event) {
    event.preventDefault();
    let pageNumber = parseInt($("#pageNumber").text()) - 1;
    const url = `http://localhost:8080/api/listings/page/${pageNumber}`;
    $.get(url)
      .then((listings) => {
        $(".listings").empty();
        for (let listing of listings) {
          const listingElement = createListingElement(listing);
          $(".listings").append(listingElement);
        }
        $("#pageNumber").text(pageNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
