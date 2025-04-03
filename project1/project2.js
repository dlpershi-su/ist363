const CHEAPSHARK_API = "https://www.cheapshark.com/api/1.0/deals";
const RAWG_API_KEY = "your_rawg_api_key"; // Replace with your actual RAWG API key
const RAWG_API = "https://api.rawg.io/api/games";

document.addEventListener("DOMContentLoaded", fetchDeals);

async function fetchDeals() {
    try {
        const response = await fetch(`${CHEAPSHARK_API}?storeID=1&upperPrice=15`);
        const deals = await response.json();
        displayDeals(deals);
    } catch (error) {
        console.error("Error fetching deals:", error);
    }
}

async function getGameDetails(title) {
    try {
        const response = await fetch(`${RAWG_API}?key=${RAWG_API_KEY}&search=${title}`);
        const data = await response.json();
        return data.results.length > 0 ? data.results[0].background_image : "";
    } catch (error) {
        console.error("Error fetching game details:", error);
        return "";
    }
}

async function displayDeals(deals) {
    const container = document.getElementById("dealsContainer");
    container.innerHTML = "";
    
    for (const deal of deals.slice(0, 10)) {
        const gameImage = await getGameDetails(deal.title);
        
        const dealElement = document.createElement("div");
        dealElement.classList.add("deal-card");
        dealElement.innerHTML = `
            <img src="${gameImage}" alt="${deal.title}" style="width:100%; border-radius:10px;">
            <h3>${deal.title}</h3>
            <p>Normal Price: <s>$${deal.normalPrice}</s></p>
            <p>Deal Price: <strong>$${deal.salePrice}</strong></p>
            <a href="https://www.cheapshark.com/redirect?dealID=${deal.dealID}" target="_blank">Buy Now</a>
        `;
        
        container.appendChild(dealElement);
    }
}

function searchDeals() {
    const query = document.getElementById("searchBox").value;
    if (query.trim()) {
        fetchDeals();
    }
}