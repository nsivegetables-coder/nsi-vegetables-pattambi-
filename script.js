const url = "https://script.google.com/macros/s/AKfycbyg9RmH2iFblNzWNBBL7J4SR-W003CQnDju8RPoPBINF_cD6Fdidkn7h9QLvMsL8u4z/exec";

fetch(url)
.then(response => response.json())
.then(data => {

  let html = "";

    data.forEach(item => {

        html += `
              <div class="product">
                      <h2>${item.name}</h2>
                              <p>Regular Price: ₹${item["regular price"]}</p>
                                      <p>Offer Price: ₹${item["offer price"]}</p>
                                            </div>
                                                `;

                                                  });

                                                    document.getElementById("products").innerHTML = html;

                                                    })
                                                    .catch(error => {
                                                      document.getElementById("products").innerHTML =
                                                          "<h2>Data Load Failed</h2>";
                                                            console.log(error);
                                                            });