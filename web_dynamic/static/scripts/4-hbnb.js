$(document).ready(function() {
  const selectedAmenities = {}; // Object to store selected amenity IDs and names

  // Function to update the API status div
  function updateAPIStatus() {
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  // Function to load places based on selected amenities
  function loadPlaces() {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(selectedAmenities) }), // Pass selected amenities
      success: function(data) {
        // Clear existing content
        $('.places').empty();

        // Loop through the results and create article tags for each place
        data.forEach(function(place) {
          const article = $('<article></article>');
          // Create the structure of the place information in the article tag
          article.append(
            `<h2>${place.name}</h2>` +
            `<p>${place.description}</p>` +
            `<div class="location">` +
            `<span>${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</span>` +
            `<span>${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</span>` +
            `<span>Max Guests: ${place.max_guest}</span>` +
            `</div>` +
            `<div class="price">$${place.price_by_night} per night</div>` +
            `<div class="coordinates">` +
            `<span>Latitude: ${place.latitude}</span>` +
            `<span>Longitude: ${place.longitude}</span>` +
            `</div>`
          );
          $('.places').append(article);
        });
      },
    });
  }

  // Click event handler for the filter button
  $('#filter-button').click(function() {
    // Call the loadPlaces function to filter places based on selected amenities
    loadPlaces();
  });

  // Listen for changes on the input checkboxes
  $('input[type="checkbox"]').change(function() {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      // Checkbox is checked, add to the selected amenities
      selectedAmenities[amenityId] = amenityName;
    } else {
      // Checkbox is unchecked, remove from the selected amenities
      delete selectedAmenities[amenityId];
    }
  });

  // Call functions on page load and set intervals to check API status and load places periodically
  updateAPIStatus();
  loadPlaces();
  setInterval(updateAPIStatus, 60000); // Check API status every minute
  setInterval(loadPlaces, 60000); // Load places every minute
});
