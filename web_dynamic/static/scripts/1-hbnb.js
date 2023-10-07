$(document).ready(function() {
  const selectedAmenities = {}; // Object to store selected amenity IDs and names

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
