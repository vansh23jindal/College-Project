const searchBox = document.getElementById("search-box");
const resultsContainer = document.getElementById("results");
const mapContainer = document.getElementById("map");

// Sample data for items in locality or mall
const items = [
  {
    id: 1,
    name: "Item 1",
    image: "https://via.placeholder.com/100",
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: "House no.111 New Nalagarh,INDIA",
    },
  },
  {
    id: 2,
    name: "Item 2",
    image: "https://via.placeholder.com/150",
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: "House no.156 New Nalagarh,INDIA",
    },
  },
  // Add more items as needed
];

// Function to search for items based on user input
function searchItems(query) {
  return items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
}

// Function to display search results
function displayResults(results) {
  resultsContainer.innerHTML = "";

  results.forEach((result) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.innerHTML = `
      <img src="${result.image}" alt="${result.name}" />
      <h2>${result.name}</h2>
      <p>Mall Location: ${result.location.address}</p>
    `;

    itemDiv.addEventListener("click", () => {
      showItemLocation(result.location);
    });

    resultsContainer.appendChild(itemDiv);
  });
}

// Function to display item location on map
function showItemLocation(location) {
  const map = new google.maps.Map(mapContainer, {
    center: location,
    zoom: 15,
  });

  new google.maps.Marker({
    position: location,
    map: map,
  });
}

// Initialize the search page
function init() {
  searchBox.addEventListener("input", () => {
    const query = searchBox.value;
    const results = searchItems(query);
    displayResults(results);

    // Save search query to history page
    const historyData = JSON.parse(localStorage.getItem("historyData")) || [];
    historyData.push({
      id: Date.now(),
      term: query,
      timestamp: new Date(),
    });
    localStorage.setItem("historyData", JSON.stringify(historyData));
  });
}

init();