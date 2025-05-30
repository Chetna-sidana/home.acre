let menu = document.querySelector('.header .menu');

document.querySelector('#menu-btn').onclick = () =>{
   menu.classList.toggle('active');
}

window.onscroll = () =>{
   menu.classList.remove('active');
}

document.querySelectorAll('input[type="number"]').forEach(inputNumber => {
   inputNumber.oninput = () =>{
      if(inputNumber.value.length > inputNumber.maxLength) inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength);
   };
});

document.querySelectorAll('.view-property .details .thumb .small-images img').forEach(images =>{
   images.onclick = () =>{
      src = images.getAttribute('src');
      document.querySelector('.view-property .details .thumb .big-image img').src = src;
   }
});

document.querySelectorAll('.faq .box-container .box h3').forEach(headings =>{
   headings.onclick = () =>{
      headings.parentElement.classList.toggle('active');
   }
});

document.querySelectorAll('.faq .box-container .box h3').forEach(headings =>{
   headings.onclick = () =>{
      headings.parentElement.classList.toggle('active');
   }
});

// 🔽 Paste the following code here:
const locationInput = document.querySelector('input[name="location"]');
const coordDisplay = document.getElementById('location-coordinates');

if (locationInput) {
   locationInput.addEventListener('blur', async () => {
      const location = locationInput.value.trim();
      if (!location) return;

      const apiKey = '1992d0c30a805503a37bdd5ecb5c7eec'; // Replace with your actual API key
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
