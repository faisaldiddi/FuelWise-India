// ============================================
// FUELWISE INDIA
// UPDATED CITY DISTANCE ENGINE
// ============================================


// ============================================
// KNOWN APPROXIMATE ROAD DISTANCES
// ============================================

const cityDistances = {

    Mumbai: {
        Pune: 150,
        Nashik: 170,
        Goa: 590,
        Ahmedabad: 525,
        Surat: 285,
        Nagpur: 815,
        Indore: 585,
        Hyderabad: 710,
        Bengaluru: 985,
        Vadodara: 415,
        Rajkot: 705
    },

    Pune: {
        Mumbai: 150,
        Nashik: 210,
        Goa: 450,
        Hyderabad: 560,
        Bengaluru: 840,
        Nagpur: 720,
        Aurangabad: 235,
        Kolhapur: 230,
        Satara: 115
    },

    Delhi: {
        Jaipur: 280,
        Agra: 240,
        Chandigarh: 250,
        Dehradun: 255,
        Lucknow: 555,
        Amritsar: 450,
        Shimla: 350,
        Haridwar: 220,
        Gurugram: 30,
        Noida: 25
    },

    Jaipur: {
        Delhi: 280,
        Agra: 240,
        Udaipur: 395,
        Jodhpur: 335,
        Ajmer: 135,
        Kota: 250
    },

    Bengaluru: {
        Mysuru: 145,
        Chennai: 350,
        Hyderabad: 570,
        Goa: 560,
        Coimbatore: 365,
        Mangaluru: 350,
        Pune: 840,
        Mumbai: 985
    },

    Chennai: {
        Bengaluru: 350,
        Pondicherry: 155,
        Coimbatore: 505,
        Madurai: 460,
        Hyderabad: 630
    },

    Hyderabad: {
        Bengaluru: 570,
        Chennai: 630,
        Pune: 560,
        Mumbai: 710,
        Nagpur: 500,
        Vijayawada: 275,
        Visakhapatnam: 620
    },

    Kolkata: {
        Bhubaneswar: 440,
        Patna: 585,
        Ranchi: 400,
        Siliguri: 560,
        Varanasi: 680
    },

    Ahmedabad: {
        Mumbai: 525,
        Vadodara: 110,
        Surat: 265,
        Udaipur: 260,
        Rajkot: 215,
        Gandhinagar: 30
    },

    Goa: {
        Mumbai: 590,
        Pune: 450,
        Bengaluru: 560,
        Mangaluru: 365
    },

    Lucknow: {
        Delhi: 555,
        Kanpur: 90,
        Varanasi: 320,
        Prayagraj: 200
    },

    Kochi: {
        Thiruvananthapuram: 205,
        Coimbatore: 190,
        Munnar: 130,
        Kozhikode: 185
    },

    Indore: {
        Mumbai: 585,
        Bhopal: 195,
        Ujjain: 55,
        Ahmedabad: 395
    }

};


// ============================================
// CITY COORDINATES
// USED FOR FALLBACK DISTANCE ESTIMATION
// ============================================

const indianCities = {

    Mumbai: { lat: 19.0760, lon: 72.8777 },
    Pune: { lat: 18.5204, lon: 73.8567 },
    Delhi: { lat: 28.6139, lon: 77.2090 },
    Jaipur: { lat: 26.9124, lon: 75.7873 },
    Agra: { lat: 27.1767, lon: 78.0081 },

    Ahmedabad: { lat: 23.0225, lon: 72.5714 },
    Surat: { lat: 21.1702, lon: 72.8311 },
    Vadodara: { lat: 22.3072, lon: 73.1812 },
    Rajkot: { lat: 22.3039, lon: 70.8022 },
    Gandhinagar: { lat: 23.2156, lon: 72.6369 },
    Bhavnagar: { lat: 21.7645, lon: 72.1519 },
    Jamnagar: { lat: 22.4707, lon: 70.0577 },
    Junagadh: { lat: 21.5222, lon: 70.4579 },
    Bharuch: { lat: 21.7051, lon: 72.9959 },
    Vapi: { lat: 20.3893, lon: 72.9106 },
    Anand: { lat: 22.5645, lon: 72.9289 },
    Bhuj: { lat: 23.2419, lon: 69.6669 },

    Nashik: { lat: 19.9975, lon: 73.7898 },
    Nagpur: { lat: 21.1458, lon: 79.0882 },
    Thane: { lat: 19.2183, lon: 72.9781 },
    "Navi Mumbai": { lat: 19.0330, lon: 73.0297 },
    Aurangabad: { lat: 19.8762, lon: 75.3433 },
    Kolhapur: { lat: 16.7050, lon: 74.2433 },
    Solapur: { lat: 17.6599, lon: 75.9064 },
    Sangli: { lat: 16.8524, lon: 74.5815 },
    Satara: { lat: 17.6805, lon: 74.0183 },
    Ratnagiri: { lat: 16.9902, lon: 73.3120 },
    Amravati: { lat: 20.9374, lon: 77.7796 },
    Akola: { lat: 20.7002, lon: 77.0082 },
    Latur: { lat: 18.4088, lon: 76.5604 },
    Nanded: { lat: 19.1383, lon: 77.3210 },

    Goa: { lat: 15.2993, lon: 74.1240 },

    Bengaluru: { lat: 12.9716, lon: 77.5946 },
    Mysuru: { lat: 12.2958, lon: 76.6394 },
    Mangaluru: { lat: 12.9141, lon: 74.8560 },

    Chennai: { lat: 13.0827, lon: 80.2707 },
    Pondicherry: { lat: 11.9416, lon: 79.8083 },
    Coimbatore: { lat: 11.0168, lon: 76.9558 },
    Madurai: { lat: 9.9252, lon: 78.1198 },

    Hyderabad: { lat: 17.3850, lon: 78.4867 },
    Vijayawada: { lat: 16.5062, lon: 80.6480 },
    Visakhapatnam: { lat: 17.6868, lon: 83.2185 },

    Kolkata: { lat: 22.5726, lon: 88.3639 },
    Bhubaneswar: { lat: 20.2961, lon: 85.8245 },
    Patna: { lat: 25.5941, lon: 85.1376 },
    Ranchi: { lat: 23.3441, lon: 85.3096 },
    Siliguri: { lat: 26.7271, lon: 88.3953 },
    Varanasi: { lat: 25.3176, lon: 82.9739 },

    Lucknow: { lat: 26.8467, lon: 80.9462 },
    Kanpur: { lat: 26.4499, lon: 80.3319 },
    Prayagraj: { lat: 25.4358, lon: 81.8463 },

    Chandigarh: { lat: 30.7333, lon: 76.7794 },
    Dehradun: { lat: 30.3165, lon: 78.0322 },
    Haridwar: { lat: 29.9457, lon: 78.1642 },
    Amritsar: { lat: 31.6340, lon: 74.8723 },
    Shimla: { lat: 31.1048, lon: 77.1734 },
    Manali: { lat: 32.2396, lon: 77.1887 },

    Gurugram: { lat: 28.4595, lon: 77.0266 },
    Noida: { lat: 28.5355, lon: 77.3910 },
    Faridabad: { lat: 28.4089, lon: 77.3178 },

    Udaipur: { lat: 24.5854, lon: 73.7125 },
    Jodhpur: { lat: 26.2389, lon: 73.0243 },
    Ajmer: { lat: 26.4499, lon: 74.6399 },
    Kota: { lat: 25.2138, lon: 75.8648 },
    Bikaner: { lat: 28.0229, lon: 73.3119 },

    Indore: { lat: 22.7196, lon: 75.8577 },
    Bhopal: { lat: 23.2599, lon: 77.4126 },
    Ujjain: { lat: 23.1765, lon: 75.7885 },

    Kochi: { lat: 9.9312, lon: 76.2673 },
    Thiruvananthapuram: { lat: 8.5241, lon: 76.9366 },
    Kozhikode: { lat: 11.2588, lon: 75.7804 },
    Munnar: { lat: 10.0889, lon: 77.0595 }
};


// ============================================
// CITY OPTIONS
// ============================================

const cities = [
    "Select City",
    ...Object.keys(indianCities).sort(),
    "Custom Location"
];


// ============================================
// ELEMENTS
// ============================================

const fromCity = document.getElementById("fromCity");
const toCity = document.getElementById("toCity");

const swapBtn = document.getElementById("swapBtn");

const customLocationBox =
    document.getElementById("customLocationBox");

const customFrom =
    document.getElementById("customFrom");

const customTo =
    document.getElementById("customTo");

const customDistance =
    document.getElementById("customDistance");

const distanceInfo =
    document.getElementById("distanceInfo");

const tripType =
    document.getElementById("tripType");

const vehicleType =
    document.getElementById("vehicleType");

const fuelType =
    document.getElementById("fuelType");

const mileage =
    document.getElementById("mileage");

const fuelPrice =
    document.getElementById("fuelPrice");

const passengers =
    document.getElementById("passengers");

const reserve =
    document.getElementById("reserve");

const tankCapacity =
    document.getElementById("tankCapacity");

const cabFare =
    document.getElementById("cabFare");

const toll =
    document.getElementById("toll");

const parking =
    document.getElementById("parking");

const food =
    document.getElementById("food");

const hotel =
    document.getElementById("hotel");

const other =
    document.getElementById("other");

const calculateBtn =
    document.getElementById("calculateBtn");

const results =
    document.getElementById("results");

const errorMessage =
    document.getElementById("errorMessage");

const mileageLabel =
    document.getElementById("mileageLabel");

const mileageUnit =
    document.getElementById("mileageUnit");

const fuelPriceLabel =
    document.getElementById("fuelPriceLabel");

const priceUnit =
    document.getElementById("priceUnit");

const minusPassenger =
    document.getElementById("minusPassenger");

const plusPassenger =
    document.getElementById("plusPassenger");

const clearHistory =
    document.getElementById("clearHistory");


// ============================================
// CURRENCY
// ============================================

const currencyFormatter =
    new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }
    );


function money(value) {

    return currencyFormatter.format(
        Number(value) || 0
    );
}


// ============================================
// POPULATE CITIES
// ============================================

function populateCities() {

    cities.forEach(city => {

        const fromOption =
            document.createElement("option");

        fromOption.value = city;
        fromOption.textContent = city;

        fromCity.appendChild(fromOption);


        const toOption =
            document.createElement("option");

        toOption.value = city;
        toOption.textContent = city;

        toCity.appendChild(toOption);

    });


    fromCity.value = "Mumbai";
    toCity.value = "Pune";
}


populateCities();


// ============================================
// HAVERSINE DISTANCE
// ============================================

function haversineDistance(city1, city2) {

    const R = 6371;

    const lat1 =
        city1.lat * Math.PI / 180;

    const lat2 =
        city2.lat * Math.PI / 180;

    const deltaLat =
        (
            city2.lat -
            city1.lat
        ) * Math.PI / 180;

    const deltaLon =
        (
            city2.lon -
            city1.lon
        ) * Math.PI / 180;


    const a =
        Math.sin(deltaLat / 2) *
        Math.sin(deltaLat / 2)

        +

        Math.cos(lat1) *
        Math.cos(lat2) *

        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);


    const c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return R * c;
}


// ============================================
// ROAD DISTANCE ESTIMATION
// ============================================

function estimateRoadDistance(
    from,
    to
) {

    const straightDistance =
        haversineDistance(
            indianCities[from],
            indianCities[to]
        );


    let roadFactor = 1.24;


    // Short regional trips usually have
    // slightly larger road deviation.

    if (straightDistance < 100) {

        roadFactor = 1.32;

    }

    else if (straightDistance < 300) {

        roadFactor = 1.27;

    }

    else if (straightDistance > 1000) {

        roadFactor = 1.18;

    }


    return Math.round(
        straightDistance *
        roadFactor
    );
}


// ============================================
// GET DISTANCE
// ============================================

function getCityDistance(
    from,
    to
) {

    // 1. Stored route

    if (
        cityDistances[from] &&
        cityDistances[from][to]
    ) {

        return {
            distance:
                cityDistances[from][to],

            source:
                "stored"
        };
    }


    // Reverse stored route

    if (
        cityDistances[to] &&
        cityDistances[to][from]
    ) {

        return {
            distance:
                cityDistances[to][from],

            source:
                "stored"
        };
    }


    // 2. Automatic fallback

    if (
        indianCities[from] &&
        indianCities[to]
    ) {

        return {
            distance:
                estimateRoadDistance(
                    from,
                    to
                ),

            source:
                "estimated"
        };
    }


    return null;
}


// ============================================
// ROUTE STATUS
// ============================================

function setRouteStatus(
    title,
    text
) {

    const titleElement =
        distanceInfo.querySelector(
            "span"
        );

    const textElement =
        distanceInfo.querySelector(
            "strong"
        );


    titleElement.textContent =
        title;

    textElement.textContent =
        text;
}


// ============================================
// ROUTE MODE
// ============================================

function updateRouteMode() {

    const customMode =
        fromCity.value ===
        "Custom Location"

        ||

        toCity.value ===
        "Custom Location";


    if (customMode) {

        customLocationBox.classList.remove(
            "hidden"
        );


        setRouteStatus(
            "CUSTOM ROUTE",
            "Enter your locations and actual road distance."
        );


        return;
    }


    customLocationBox.classList.add(
        "hidden"
    );


    if (
        fromCity.value ===
        "Select City"

        ||

        toCity.value ===
        "Select City"
    ) {

        setRouteStatus(
            "ROUTE STATUS",
            "Select your starting point and destination."
        );

        return;
    }


    if (
        fromCity.value ===
        toCity.value
    ) {

        setRouteStatus(
            "CHECK ROUTE",
            "Starting point and destination cannot be the same."
        );

        return;
    }


    const result =
        getCityDistance(
            fromCity.value,
            toCity.value
        );


    if (!result) {

        setRouteStatus(
            "CUSTOM ROUTE REQUIRED",
            "Use Custom Location and enter the road distance."
        );

        return;
    }


    if (
        result.source ===
        "stored"
    ) {

        setRouteStatus(
            "ROAD DISTANCE",
            `${fromCity.value} → ${toCity.value} • Approx. ${result.distance} KM`
        );

    }

    else {

        setRouteStatus(
            "ESTIMATED ROAD DISTANCE",
            `${fromCity.value} → ${toCity.value} • ~${result.distance} KM`
        );

    }
}


// ============================================
// EVENTS
// ============================================

fromCity.addEventListener(
    "change",
    updateRouteMode
);


toCity.addEventListener(
    "change",
    updateRouteMode
);


// ============================================
// SWAP
// ============================================

swapBtn.addEventListener(
    "click",
    () => {

        const temporary =
            fromCity.value;


        fromCity.value =
            toCity.value;


        toCity.value =
            temporary;


        const customTemp =
            customFrom.value;


        customFrom.value =
            customTo.value;


        customTo.value =
            customTemp;


        updateRouteMode();
    }
);


// ============================================
// PASSENGERS
// ============================================

minusPassenger.addEventListener(
    "click",
    () => {

        const current =
            Math.max(
                1,
                Number(
                    passengers.value
                ) || 1
            );


        passengers.value =
            Math.max(
                1,
                current - 1
            );
    }
);


plusPassenger.addEventListener(
    "click",
    () => {

        const current =
            Math.max(
                1,
                Number(
                    passengers.value
                ) || 1
            );


        passengers.value =
            current + 1;
    }
);


// ============================================
// FUEL TYPE
// ============================================

fuelType.addEventListener(
    "change",
    updateFuelLabels
);


function updateFuelLabels() {

    const type =
        fuelType.value;


    if (
        type === "petrol" ||
        type === "diesel"
    ) {

        mileageLabel.textContent =
            "Mileage";

        mileageUnit.textContent =
            "KM/L";

        fuelPriceLabel.textContent =
            "Fuel Price";

        priceUnit.textContent =
            "/L";

    }

    else if (
        type === "cng"
    ) {

        mileageLabel.textContent =
            "Efficiency";

        mileageUnit.textContent =
            "KM/KG";

        fuelPriceLabel.textContent =
            "CNG Price";

        priceUnit.textContent =
            "/KG";

    }

    else {

        mileageLabel.textContent =
            "Efficiency";

        mileageUnit.textContent =
            "KM/kWh";

        fuelPriceLabel.textContent =
            "Electricity Cost";

        priceUnit.textContent =
            "/kWh";
    }
}


// ============================================
// VALUE
// ============================================

function valueOf(element) {

    return Math.max(
        0,
        Number(
            element.value
        ) || 0
    );
}


// ============================================
// GET ROUTE
// ============================================

function getRoute() {

    const customMode =
        fromCity.value ===
        "Custom Location"

        ||

        toCity.value ===
        "Custom Location";


    if (customMode) {

        const distance =
            valueOf(
                customDistance
            );


        if (distance <= 0) {

            throw new Error(
                "Enter a valid road distance for your custom route."
            );
        }


        const from =
            customFrom.value.trim();


        const to =
            customTo.value.trim();


        if (!from) {

            throw new Error(
                "Enter your starting location."
            );
        }


        if (!to) {

            throw new Error(
                "Enter your destination."
            );
        }


        return {
            from,
            to,
            distance,
            source: "custom"
        };
    }


    if (
        fromCity.value ===
        "Select City"

        ||

        toCity.value ===
        "Select City"
    ) {

        throw new Error(
            "Select your starting point and destination."
        );
    }


    if (
        fromCity.value ===
        toCity.value
    ) {

        throw new Error(
            "Starting point and destination cannot be the same."
        );
    }


    const result =
        getCityDistance(
            fromCity.value,
            toCity.value
        );


    if (!result) {

        throw new Error(
            "Unable to estimate this route."
        );
    }


    return {

        from:
            fromCity.value,

        to:
            toCity.value,

        distance:
            result.distance,

        source:
            result.source
    };
}


// ============================================
// CALCULATE BUTTON
// ============================================

calculateBtn.addEventListener(
    "click",
    () => {

        calculateBtn.innerHTML =
            `
                <span>⚙️</span>
                Calculating...
            `;


        calculateBtn.disabled = true;


        setTimeout(
            () => {

                calculateTrip();


                calculateBtn.disabled = false;


                calculateBtn.innerHTML =
                    `
                        <span>🚗</span>
                        Calculate My Trip
                        <span class="button-arrow">→</span>
                    `;

            },
            400
        );
    }
);


// ============================================
// CALCULATE TRIP
// ============================================

function calculateTrip() {

    hideError();


    try {

        const route =
            getRoute();


        const efficiency =
            valueOf(mileage);


        const energyPrice =
            valueOf(fuelPrice);


        const people =
            Math.max(
                1,
                Math.round(
                    valueOf(
                        passengers
                    )
                )
            );


        if (
            efficiency <= 0
        ) {

            throw new Error(
                "Mileage / efficiency must be greater than 0."
            );
        }


        if (
            energyPrice <= 0
        ) {

            throw new Error(
                "Fuel / energy price must be greater than 0."
            );
        }


        let totalDistance =
            route.distance;


        if (
            tripType.value ===
            "round"
        ) {

            totalDistance *= 2;
        }


        const baseEnergy =
            totalDistance /
            efficiency;


        const reservePercent =
            valueOf(reserve);


        const planningEnergy =
            baseEnergy *
            (
                1 +
                reservePercent /
                100
            );


        const energyCost =
            planningEnergy *
            energyPrice;


        const tollValue =
            valueOf(toll);

        const parkingValue =
            valueOf(parking);

        const foodValue =
            valueOf(food);

        const hotelValue =
            valueOf(hotel);

        const otherValue =
            valueOf(other);


        const totalCost =
            energyCost +
            tollValue +
            parkingValue +
            foodValue +
            hotelValue +
            otherValue;


        const perPerson =
            totalCost /
            people;


        const costPerKm =
            totalCost /
            totalDistance;


        displayResults({

            route,
            totalDistance,
            baseEnergy,
            planningEnergy,
            energyCost,
            totalCost,
            perPerson,
            costPerKm,

            tollValue,
            parkingValue,
            foodValue,
            hotelValue,
            otherValue
        });

    }

    catch (error) {

        showError(
            error.message
        );
    }
}


// ============================================
// DISPLAY RESULTS
// ============================================

function displayResults(data) {

    const unit =
        getEnergyUnit();


    document.getElementById(
        "resultFrom"
    ).textContent =
        data.route.from;


    document.getElementById(
        "resultTo"
    ).textContent =
        data.route.to;


    animateNumberText(
        "resultDistance",
        data.totalDistance,
        " KM",
        1
    );


    animateNumberText(
        "resultFuel",
        data.planningEnergy,
        ` ${unit}`,
        2
    );


    animateCurrency(
        "resultFuelCost",
        data.energyCost
    );


    animateCurrency(
        "resultCostKm",
        data.costPerKm
    );


    animateCurrency(
        "resultTotal",
        data.totalCost
    );


    animateCurrency(
        "resultPerPerson",
        data.perPerson
    );


    document.getElementById(
        "baseFuel"
    ).textContent =
        `${data.baseEnergy.toFixed(2)} ${unit}`;


    document.getElementById(
        "reserveFuel"
    ).textContent =
        `${data.planningEnergy.toFixed(2)} ${unit}`;


    updateTankStatus(
        data.planningEnergy,
        unit
    );


    renderBreakdown({

        Fuel: data.energyCost,
        Toll: data.tollValue,
        Parking: data.parkingValue,
        Food: data.foodValue,
        Hotel: data.hotelValue,
        Other: data.otherValue

    });


    updateCabComparison(
        data.totalCost
    );


    results.classList.remove(
        "hidden"
    );


    saveRecentTrip({

        from:
            data.route.from,

        to:
            data.route.to,

        distance:
            data.totalDistance,

        cost:
            data.totalCost,

        source:
            data.route.source

    });


    setTimeout(
        () => {

            results.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        100
    );
}


// ============================================
// NUMBER ANIMATION
// ============================================

function animateNumberText(
    elementId,
    target,
    suffix,
    decimals
) {

    const element =
        document.getElementById(
            elementId
        );


    const duration = 700;

    const start =
        performance.now();


    function update(now) {

        const progress =
            Math.min(
                (
                    now -
                    start
                ) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const current =
            target *
            eased;


        element.textContent =
            `${current.toFixed(decimals)}${suffix}`;


        if (
            progress <
            1
        ) {

            requestAnimationFrame(
                update
            );
        }
    }


    requestAnimationFrame(
        update
    );
}


// ============================================
// CURRENCY ANIMATION
// ============================================

function animateCurrency(
    elementId,
    target
) {

    const element =
        document.getElementById(
            elementId
        );


    const duration =
        700;


    const start =
        performance.now();


    function update(now) {

        const progress =
            Math.min(
                (
                    now -
                    start
                ) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        element.textContent =
            money(
                target *
                eased
            );


        if (
            progress <
            1
        ) {

            requestAnimationFrame(
                update
            );
        }
    }


    requestAnimationFrame(
        update
    );
}


// ============================================
// ENERGY UNIT
// ============================================

function getEnergyUnit() {

    const energyTitle =
        document.getElementById(
            "energyTitle"
        );


    if (
        fuelType.value ===
        "cng"
    ) {

        energyTitle.textContent =
            "CNG Required";

        return "KG";
    }


    if (
        fuelType.value ===
        "electric"
    ) {

        energyTitle.textContent =
            "Energy Required";

        return "kWh";
    }


    energyTitle.textContent =
        "Fuel Required";


    return "L";
}


// ============================================
// TANK STATUS
// ============================================

function updateTankStatus(
    required,
    unit
) {

    const output =
        document.getElementById(
            "tankStatus"
        );


    if (
        fuelType.value ===
        "electric"
    ) {

        output.textContent =
            "Not applicable for EV";

        return;
    }


    const capacity =
        valueOf(
            tankCapacity
        );


    if (
        capacity <= 0
    ) {

        output.textContent =
            "Capacity not entered";

        return;
    }


    if (
        required <=
        capacity
    ) {

        output.textContent =
            `✓ Fits within ${capacity} ${unit}`;
    }

    else {

        const extra =
            required -
            capacity;


        output.textContent =
            `⚠ ${extra.toFixed(2)} ${unit} over capacity`;
    }
}


// ============================================
// BREAKDOWN
// ============================================

function renderBreakdown(values) {

    const container =
        document.getElementById(
            "breakdown"
        );


    container.innerHTML =
        "";


    const total =
        Object.values(values)
            .reduce(
                (sum, value) =>
                    sum + value,
                0
            );


    Object.entries(values)
        .forEach(
            ([label, amount]) => {

                if (
                    amount <= 0
                ) {

                    return;
                }


                const percentage =
                    total > 0
                        ?
                        (
                            amount /
                            total
                        ) *
                        100
                        :
                        0;


                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "breakdown-item";


                const top =
                    document.createElement(
                        "div"
                    );


                top.className =
                    "breakdown-top";


                const name =
                    document.createElement(
                        "span"
                    );


                name.textContent =
                    label;


                const value =
                    document.createElement(
                        "span"
                    );


                value.textContent =
                    `${money(amount)} • ${percentage.toFixed(0)}%`;


                top.appendChild(
                    name
                );


                top.appendChild(
                    value
                );


                const track =
                    document.createElement(
                        "div"
                    );


                track.className =
                    "breakdown-track";


                const fill =
                    document.createElement(
                        "div"
                    );


                fill.className =
                    "breakdown-fill";


                track.appendChild(
                    fill
                );


                item.appendChild(
                    top
                );


                item.appendChild(
                    track
                );


                container.appendChild(
                    item
                );


                requestAnimationFrame(
                    () => {

                        requestAnimationFrame(
                            () => {

                                fill.style.width =
                                    `${percentage}%`;

                            }
                        );
                    }
                );

            }
        );
}


// ============================================
// CAB COMPARISON
// ============================================

function updateCabComparison(
    ownVehicleTotal
) {

    const comparison =
        document.getElementById(
            "cabComparison"
        );


    const cabAmount =
        valueOf(
            cabFare
        );


    if (
        cabAmount <= 0
    ) {

        comparison.classList.add(
            "hidden"
        );

        return;
    }


    comparison.classList.remove(
        "hidden"
    );


    document.getElementById(
        "ownVehicleCost"
    ).textContent =
        money(
            ownVehicleTotal
        );


    document.getElementById(
        "cabCost"
    ).textContent =
        money(
            cabAmount
        );


    const difference =
        Math.abs(
            ownVehicleTotal -
            cabAmount
        );


    const message =
        document.getElementById(
            "cabMessage"
        );


    if (
        ownVehicleTotal <
        cabAmount
    ) {

        message.textContent =
            `🚗 Own vehicle estimate is ${money(difference)} lower.`;

    }

    else if (
        cabAmount <
        ownVehicleTotal
    ) {

        message.textContent =
            `🚕 Cab estimate is ${money(difference)} lower.`;

    }

    else {

        message.textContent =
            "Both options have approximately the same estimated cost.";
    }
}


// ============================================
// RECENT TRIPS
// ============================================

function saveRecentTrip(trip) {

    let trips =
        getRecentTrips();


    trips.unshift({

        ...trip,

        time:
            new Date()
                .toISOString()

    });


    trips =
        trips.slice(
            0,
            5
        );


    localStorage.setItem(
        "fuelwiseRecentTrips",
        JSON.stringify(
            trips
        )
    );


    renderRecentTrips();
}


function getRecentTrips() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "fuelwiseRecentTrips"
            )
        ) || [];

    }

    catch {

        return [];
    }
}


// ============================================
// RENDER HISTORY
// ============================================

function renderRecentTrips() {

    const container =
        document.getElementById(
            "recentTrips"
        );


    const trips =
        getRecentTrips();


    container.innerHTML =
        "";


    if (
        trips.length === 0
    ) {

        container.innerHTML =
            `
                <div class="empty-state">
                    <div>🛣️</div>
                    <strong>No road trips yet</strong>
                    <span>Your latest calculations will appear here.</span>
                </div>
            `;

        return;
    }


    trips.forEach(
        trip => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "recent-trip";


            const route =
                document.createElement(
                    "strong"
                );


            route.textContent =
                `${trip.from} → ${trip.to}`;


            const details =
                document.createElement(
                    "span"
                );


            const sourceText =
                trip.source === "estimated"
                    ?
                    "Estimated"
                    :
                    trip.source === "stored"
                        ?
                        "Stored"
                        :
                        "Custom";


            details.textContent =
                `${Number(trip.distance).toFixed(1)} KM • ${money(trip.cost)} • ${sourceText}`;


            element.appendChild(
                route
            );


            element.appendChild(
                details
            );


            container.appendChild(
                element
            );
        }
    );
}


// ============================================
// CLEAR HISTORY
// ============================================

clearHistory.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "fuelwiseRecentTrips"
        );


        renderRecentTrips();
    }
);


// ============================================
// ERROR
// ============================================

function showError(message) {

    errorMessage.textContent =
        `⚠ ${message}`;


    errorMessage.classList.remove(
        "hidden"
    );
}


function hideError() {

    errorMessage.classList.add(
        "hidden"
    );
}


// ============================================
// PRINT
// ============================================

document.getElementById(
    "printBtn"
).addEventListener(
    "click",
    () => {

        window.print();
    }
);


// ============================================
// START
// ============================================

updateFuelLabels();

updateRouteMode();

renderRecentTrips();