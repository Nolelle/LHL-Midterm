const createListingElement = function (listing) {
  return `<div class= "listing">
  <div class="listing-content">
    <img height="200px" src=${listing.image_url}></img><br>
    <div><b>
   ${listing.title}
      </b>
        <p style="color:green"><b>$ ${listing.price} </b></p>
    </div>
  </div>
  <form action="/listings/${listing.id}" method="GET">
    <button type="submit">View</button>
  </form>
</div>`
}

$(() => {
  $(".next").on("click", function (event) {
    event.preventDefault();
    let pageNumber = parseInt($("#pageNumber").text())
    const url = `http://localhost:8080/api/listings/page/${pageNumber}`
    $.get(url)
      .then((listings) => {
        $(".listings").empty()

        for (let listing of listings){
          const listingElement = createListingElement(listing)
          $(".listings").append(listingElement)
        }
        $("#pageNumber").text(pageNumber + 1)
      })
      .catch((error) => {
        console.log(error)
      })
  });
  $(".previous").on("click", function (event) {
    event.preventDefault();
    let pageNumber = parseInt($("#pageNumber").text()) - 1;
    const url = `http://localhost:8080/api/listings/page/${pageNumber}`
    $.get(url)
      .then((listings) => {
        $(".listings").empty()
        for (let listing of listings){
          const listingElement = createListingElement(listing)
          $(".listings").append(listingElement)
        }
        $("#pageNumber").text(pageNumber)
      })
      .catch((error) => {
        console.log(error)
      })
  });

});

