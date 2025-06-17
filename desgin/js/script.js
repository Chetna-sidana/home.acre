// ====== YOUR EXISTING CODE ======
let menu = document.querySelector('.header .menu');

document.querySelector('#menu-btn').onclick = () => {
   menu.classList.toggle('active');
}

window.onscroll = () => {
   menu.classList.remove('active');
}

document.querySelectorAll('input[type="number"]').forEach(inputNumber => {
   inputNumber.oninput = () => {
      if (inputNumber.value.length > inputNumber.maxLength) inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength);
   };
});

document.querySelectorAll('.view-property .details .thumb .small-images img').forEach(images => {
   images.onclick = () => {
      src = images.getAttribute('src');
      document.querySelector('.view-property .details .thumb .big-image img').src = src;
   }
});

document.querySelectorAll('.faq .box-container .box h3').forEach(headings => {
   headings.onclick = () => {
      headings.parentElement.classList.toggle('active');
   }
});

// Geolocation code
const locationInput = document.querySelector('input[name="location"]');
const coordDisplay = document.getElementById('location-coordinates');

if (locationInput) {
   locationInput.addEventListener('blur', async () => {
      const location = locationInput.value.trim();
      if (!location) return;

      const apiKey = '1992d0c30a805503a37bdd5ecb5c7eec';
      const url = `https://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(location)}`;

      try {
         const res = await fetch(url);
         const data = await res.json();

         if (data.data && data.data.length > 0) {
            const { latitude, longitude } = data.data[0];
            if (coordDisplay) {
               coordDisplay.innerHTML = `📍 Coordinates: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
            }
            addOrUpdateHiddenInput('latitude', latitude);
            addOrUpdateHiddenInput('longitude', longitude);
         } else {
            if (coordDisplay) coordDisplay.innerHTML = "❌ Location not found.";
         }
      } catch (err) {
         if (coordDisplay) coordDisplay.innerHTML = "⚠️ Error fetching coordinates.";
         console.error(err);
      }
   });
}

function addOrUpdateHiddenInput(name, value) {
   let input = document.querySelector(`input[name="${name}"]`);
   if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      document.querySelector('form').appendChild(input);
   }
   input.value = value;
}

// Firebase initialization
const firebaseConfig = {
   apiKey: "AIzaSyC_KB-fCEA8QQqmDUj2y88Adfr8kx-SgPg",
   authDomain: "login-page-66094.firebaseapp.com",
   projectId: "login-page-66094",
   storageBucket: "login-page-66094.appspot.com",
   messagingSenderId: "173329262844",
   appId: "1:173329262844:web:c25c32cd33a5c1de9f8f79",
   measurementId: "G-973G312R99"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch addresses function
async function fetchAddresses(event) {
   event.preventDefault();
   const form = event.target;
   const city = form.location.value.trim();
   const type = form.type.value;
   const bhk = form.bhk.value;
   const minBudget = parseInt(form.minimum.value);
   const maxBudget = parseInt(form.maximum.value);

   try {
      const listingsContainer = document.querySelector('.listings .box-container');
      listingsContainer.innerHTML = '';

      const querySnapshot = await db.collection('AllAddresses')
         .doc(city)
         .collection('addresses')
         .where('type', '==', type)
         .where('bhk', '==', bhk)
         .where('price', '>=', minBudget)
         .where('price', '<=', maxBudget)
         .get();

      if (querySnapshot.empty) {
         listingsContainer.innerHTML = '<p>No properties found for this city.</p>';
         return;
      }

      querySnapshot.forEach(doc => {
         const data = doc.data();
         const listing = `
            <div class="box">
               <div class="admin">
                  <h3>${data.name.charAt(0)}</h3>
                  <div>
                     <p>${data.name}</p>
                     <span>10-11-2022</span>
                  </div>
               </div>
               <div class="thumb">
                  <p class="total-images"><i class="far fa-image"></i><span>4</span></p>
                  <p class="type"><span>${data.type}</span><span>sale</span></p>
                  <form action="" method="post" class="save">
                     <button type="submit" name="save" class="far fa-heart"></button>
                  </form>
                  <img src="${data.image}" alt="">
               </div>
               <h3 class="name">${data.name}</h3>
               <p class="location"><i class="fas fa-map-marker-alt"></i><span>${data.location}</span></p>
               <div class="flex">
                  <p><i class="fas fa-bed"></i><span>${data.bedrooms}</span></p>
                  <p><i class="fas fa-bath"></i><span>${data.bathrooms}</span></p>
                  <p><i class="fas fa-maximize"></i><span>${data.size}</span></p>
               </div>
               <a href="view_property.html" class="btn">view property</a>
            </div>
         `;
         listingsContainer.innerHTML += listing;
      });
      
      // Initialize search after loading properties
      initSearch();
   } catch (error) {
      console.error("Error fetching addresses: ", error);
      listingsContainer.innerHTML = '<p>Error loading properties.</p>';
   }
}

// Save property function
function saveProperty(name, location, image) {
   db.collection('SavedProperties').add({
      name: name,
      location: location,
      image: image,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
   }).then(() => {
      alert('Property saved!');
   }).catch(error => {
      console.error("Error saving property: ", error);
   });
}

// ====== SEARCH FUNCTIONALITY ADDITION ======
// This adds search without changing any styling or HTML

function initSearch() {
   // Create search elements
   const searchContainer = document.createElement('div');
   const searchInput = document.createElement('input');
   const searchBtn = document.createElement('button');
   const resetBtn = document.createElement('button');
   
   // Set up search container
   searchContainer.style.display = 'flex';
   searchContainer.style.gap = '10px';
   searchContainer.style.margin = '20px auto';
   searchContainer.style.maxWidth = '600px';
   searchContainer.style.padding = '0 20px';
   
   // Set up search input
   searchInput.type = 'text';
   searchInput.placeholder = 'Search by city, area, or property type';
   searchInput.style.flexGrow = '1';
   searchInput.style.padding = '10px 15px';
   searchInput.style.border = '1px solid #ccc';
   searchInput.style.borderRadius = '5px';
   
   // Set up search button
   searchBtn.textContent = 'Search';
   searchBtn.style.padding = '10px 15px';
   searchBtn.style.background = 'var(--main-color)';
   searchBtn.style.color = 'white';
   searchBtn.style.border = 'none';
   searchBtn.style.borderRadius = '5px';
   searchBtn.style.cursor = 'pointer';
   
   // Set up reset button
   resetBtn.textContent = 'Reset';
   resetBtn.style.padding = '10px 15px';
   resetBtn.style.background = 'var(--main-color)';
   resetBtn.style.color = 'white';
   resetBtn.style.border = 'none';
   resetBtn.style.borderRadius = '5px';
   resetBtn.style.cursor = 'pointer';
   
   // Add elements to container
   searchContainer.appendChild(searchInput);
   searchContainer.appendChild(searchBtn);
   searchContainer.appendChild(resetBtn);
   
   // Insert search bar after heading
   const heading = document.querySelector('.listings h1.heading');
   if (heading) {
      heading.insertAdjacentElement('afterend', searchContainer);
   }
   
   // Search functionality
   searchBtn.addEventListener('click', () => executeSearch(searchInput));
   resetBtn.addEventListener('click', () => resetSearch(searchInput));
   searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') executeSearch(searchInput);
   });
}

function executeSearch(searchInput) {
   const searchTerm = searchInput.value.trim().toLowerCase();
   const propertyBoxes = document.querySelectorAll('.listings .box-container .box');
   
   if (!searchTerm) return;
   
   let foundMatches = false;
   
   propertyBoxes.forEach(box => {
      const location = box.querySelector('.location span')?.textContent.toLowerCase() || '';
      const name = box.querySelector('.name')?.textContent.toLowerCase() || '';
      const type = box.querySelector('.type span:first-child')?.textContent.toLowerCase() || '';
      
      if (location.includes(searchTerm) || name.includes(searchTerm) || type.includes(searchTerm)) {
         box.style.display = 'block';
         foundMatches = true;
      } else {
         box.style.display = 'none';
      }
   });
   
   // Show message if no results
   const noResultsMsg = document.querySelector('.no-results-msg');
   if (!foundMatches) {
      if (!noResultsMsg) {
         const msg = document.createElement('p');
         msg.className = 'no-results-msg';
         msg.textContent = 'No properties found matching your search.';
         msg.style.textAlign = 'center';
         msg.style.padding = '20px';
         msg.style.width = '100%';
         document.querySelector('.listings .box-container').appendChild(msg);
      }
   } else if (noResultsMsg) {
      noResultsMsg.remove();
   }
}

function resetSearch(searchInput) {
   searchInput.value = '';
   const propertyBoxes = document.querySelectorAll('.listings .box-container .box');
   propertyBoxes.forEach(box => {
      box.style.display = 'block';
   });
   
   const noResultsMsg = document.querySelector('.no-results-msg');
   if (noResultsMsg) noResultsMsg.remove();
}

// Initialize search when properties are loaded
document.addEventListener('DOMContentLoaded', () => {
   // This will be called when fetchAddresses loads properties
});