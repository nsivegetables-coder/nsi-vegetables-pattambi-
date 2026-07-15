                                                                   const url = "https://script.google.com/macros/s/AKfycbyg9RmH2iFblNzWNBBL7J4SR-W003CQnDju8RPoPBINF_cD6Fdidkn7h9QLvMsL8u4z/exec";

                                                                   document.getElementById("products").innerHTML = "Loading...";

                                                                   fetch(url)
                                                                     .then(response => response.json())
                                                                       .then(data => {
                                                                           console.log("Data received:", data);

                                                                               let html = "";

                                                                                   // Checking if data is an array
                                                                                       const items = Array.isArray(data) ? data : (data.data || []);

                                                                                           if (items.length === 0) {
                                                                                                 document.getElementById("products").innerHTML = "<h2>No products found</h2>";
                                                                                                       return;
                                                                                                           }

                                                                                                               items.forEach(item => {
                                                                                                                     // Converting all keys to lowercase and removing spaces
                                                                                                                           const keys = Object.keys(item).reduce((acc, key) => {
                                                                                                                                   acc[key.toLowerCase().replace(/\s+/g, '')] = item[key];
                                                                                                                                           return acc;
                                                                                                                                                 }, {});

                                                                                                                                                       // Extracting values safely
                                                                                                                                                             let name = keys['name'] || "No Name";
                                                                                                                                                                   let regPrice = keys['regularprice'] || "0";
                                                                                                                                                                         let offPrice = keys['offerprice'] || "0";

                                                                                                                                                                               // Display only valid rows
                                                                                                                                                                                     if (name !== "No Name" || regPrice !== "0") {
                                                                                                                                                                                             html += `
                                                                                                                                                                                                       <div class="product">
                                                                                                                                                                                                                   <h2>${name}</h2>
                                                                                                                                                                                                                               <p>Regular Price: ₹${regPrice}</p>
                                                                                                                                                                                                                                           <p>Offer Price: ₹${offPrice}</p>
                                                                                                                                                                                                                                                     </div>
                                                                                                                                                                                                                                                             `;
                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                       });

                                                                                                                                                                                                                                                                           document.getElementById("products").innerHTML = html;
                                                                                                                                                                                                                                                                             })
                                                                                                                                                                                                                                                                               .catch(error => {
                                                                                                                                                                                                                                                                                   console.error("Error:", error);
                                                                                                                                                                                                                                                                                       document.getElementById("products").innerHTML =
                                                                                                                                                                                                                                                                                             "<h2>Data Load Failed</h2><p>" + error + "</p>";
                                                                                                                                                                                                                                                                                               });
                                                                                                                                                                                                                                                                                               