const url = "https://script.google.com/macros/s/AKfycbyg9RmH2iFblNzWNBBL7J4SR-W003CQnDju8RPoPBINF_cD6Fdidkn7h9QLvMsL8u4z/exec";

document.getElementById("products").innerHTML = "Loading...";

fetch(url)
  .then(response => response.json())
    .then(data => {
        console.log("Data received:", data);

            let html = "";

                data.forEach(item => {
                      let name = item.name || item.Name || "No Name";
                            let regPrice = item.regularprice || item.RegularPrice || item["regular price"] || "0";
                                  let offPrice = item.offerprice || item.OfferPrice || item["offer price"] || "0";

                                        html += `
                                                <div class="product">
                                                          <h2>${name}</h2>
                                                                    <p>Regular Price: ₹${regPrice}</p>
                                                                              <p>Offer Price: ₹${offPrice}</p>
                                                                                      </div>
                                                                                            `;
                                                                                                });

                                                                                                    document.getElementById("products").innerHTML = html;
                                                                                                      })
                                                                                                        .catch(error => {
                                                                                                            console.error("Error:", error);
                                                                                                                document.getElementById("products").innerHTML =
                                                                                                                      "<h2>Data Load Failed</h2><p>" + error + "</p>";
                                                                                                                        });
                                                                                                                        