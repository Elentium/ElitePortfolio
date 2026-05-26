const pricingData = [
    { name: "Per-Task Commissions", price: "$20+", desc: "Individual features" },
    { name: "Simple Gameplay", price: "$150+", desc: "Basic game loops, e.g, obby/tycoon" },
    { name: "Medium Gameplay", price: "$350+", desc: "Medium Difficulty Gameplay, e.g, platformer/racing/pet simulator" },
    { name: "Complex Gameplay", price: "$900+", desc: "Complex Gameplay, e.g, combat/complex fps/open world/etc" },
    { name: "Anticheat (S/M/C)", price: "$50 - $300+", desc: "Project dependent" },
    { name: "Monetization", price: "$50 - $150+", desc: "Standard to Complex" }
];

export function initPricing() {
    const pGrid = document.getElementById('pricing-grid');
    if (!pGrid) return;

    pricingData.forEach(p => {
        pGrid.innerHTML += `
            <div class="pricing-card">
                <div>
                    <h4>${p.name}</h4>
                    <p>${p.desc}</p>
                </div>
                <span>${p.price}</span>
            </div>`;
    });
}
