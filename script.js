const myHomeCord = [22.9074872, 79.07306671];
const map = L.map("map").setView(myHomeCord, 5);

// Base layer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,  Coded by manish with ♥️',
}).addTo(map);

function generateList() {
  const ul = document.querySelector(".list");
  storeList.forEach((store) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const a = document.createElement("a");
    const p = document.createElement("p");

    div.classList.add("shopItem");
    a.innerText = store.properties.name;
    a.href = "#";
    a.addEventListener("click", () => {
      flyToStore(store);
    });
    p.innerHTML = store.properties.address;

    div.appendChild(a);
    div.appendChild(p);
    li.appendChild(div);
    ul.appendChild(li);
  });
}

generateList();

console.log();
function makePopupContent(shop) {
  console.log(shop.properties);
  return `
        <div>
            <h4>${shop.properties.name}</h4>
            <p>${shop.properties.address}</p>

            <div class="phoneNumber">
                <a href="tel:${shop.properties.phone}">${shop.properties.phone}</a>
            </div>
        </div>
    `;
}
function onEachFeature(feature, layer) {
  layer.bindPopup(makePopupContent(feature), {
    closeButton: false,
    offset: L.point(0, -8),
  });
}
const myIcon = L.icon({
  iconUrl: "marker.png",
  iconSize: [30, 40],
});

const shopLayer = L.geoJSON(storeList, {
  onEachFeature: onEachFeature,
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: myIcon });
  },
});
shopLayer.addTo(map);

function flyToStore(store) {
  const cord = [store.geometry.coordinates[1], store.geometry.coordinates[0]];
  map.flyTo([...cord], 14, {
    duration: 3,
  });

  setTimeout(() => {
    L.popup({ closeButton: false, offset: L.point(0, -8) })
      .setLatLng([...cord])
      .setContent(makePopupContent(store))
      .openOn(map);
  }, 3000);
}
