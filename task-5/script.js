document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const search = document.getElementById("search");

  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      let filtered = data;

      const display = () => {
        productList.innerHTML = "";
        filtered.forEach(product => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <img loading="lazy" src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.price}</p>
          `;
          productList.appendChild(card);
        });
      };

      search.addEventListener("input", e => {
        const term = e.target.value.toLowerCase();
        filtered = data.filter(p => p.name.toLowerCase().includes(term));
        display();
      });

      display();
    });
});
