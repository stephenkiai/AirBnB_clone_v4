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

  // Call function on page load & set an interval to check periodically
  updateAPIStatus();
  setInterval(updateAPIStatus, 60000); // Check every minute

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

    // Update the h4 tag inside the 'Amenities' div with selected amenities
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  });
});
