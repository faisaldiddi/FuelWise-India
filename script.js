// ======================================================
// FUELWISE INDIA
// ======================================================


// ======================================================
// CITY COORDINATES
// ======================================================

const indianCities = {

    Mumbai: [19.0760, 72.8777],
    Pune: [18.5204, 73.8567],
    Delhi: [28.6139, 77.2090],
    Jaipur: [26.9124, 75.7873],
    Agra: [27.1767, 78.0081],

    Ahmedabad: [23.0225, 72.5714],
    Surat: [21.1702, 72.8311],
    Vadodara: [22.3072, 73.1812],
    Rajkot: [22.3039, 70.8022],
    Gandhinagar: [23.2156, 72.6369],

    Nashik: [19.9975, 73.7898],
    Nagpur: [21.1458, 79.0882],
    Thane: [19.2183, 72.9781],
    "Navi Mumbai": [19.0330, 73.0297],
    Aurangabad: [19.8762, 75.3433],
    Kolhapur: [16.7050, 74.2433],
    Solapur: [17.6599, 75.9064],
    Satara: [17.6805, 74.0183],

    Goa: [15.2993, 74.1240],

    Bengaluru: [12.9716, 77.5946],
    Mysuru: [12.2958, 76.6394],
    Mangaluru: [12.9141, 74.8560],

    Chennai: [13.0827, 80.2707],
    Pondicherry: [11.9416, 79.8083],
    Coimbatore: [11.0168, 76.9558],
    Madurai: [9.9252, 78.1198],

    Hyderabad: [17.3850, 78.4867],
    Vijayawada: [16.5062, 80.6480],
    Visakhapatnam: [17.6868, 83.2185],

    Kolkata: [22.5726, 88.3639],
    Bhubaneswar: [20.2961, 85.8245],
    Patna: [25.5941, 85.1376],
    Ranchi: [23.3441, 85.3096],
    Siliguri: [26.7271, 88.3953],

    Varanasi: [25.3176, 82.9739],
    Lucknow: [26.8467, 80.9462],
    Kanpur: [26.4499, 80.3319],
    Prayagraj: [25.4358, 81.8463],

    Chandigarh: [30.7333, 76.7794],
    Dehradun: [30.3165, 78.0322],
    Haridwar: [29.9457, 78.1642],
    Amritsar: [31.6340, 74.8723],
    Shimla: [31.1048, 77.1734],
    Manali: [32.2396, 77.1887],

    Gurugram: [28.4595, 77.0266],
    Noida: [28.5355, 77.3910],
    Faridabad: [28.4089, 77.3178],

    Udaipur: [24.5854, 73.7125],
    Jodhpur: [26.2389, 73.0243],
    Ajmer: [26.4499, 74.6399],
    Kota: [25.2138, 75.8648],

    Indore: [22.7196, 75.8577],
    Bhopal: [23.2599, 77.4126],
    Ujjain: [23.1765, 75.7885],

    Kochi: [9.9312, 76.2673],
    Thiruvananthapuram: [8.5241, 76.9366],
    Kozhikode: [11.2588, 75.7804],
    Munnar: [10.0889, 77.0595]

};


// ======================================================
// KNOWN ROAD DISTANCES
// ======================================================

const knownDistances = {

    "Mumbai|Pune": 150,
    "Mumbai|Nashik": 170,
    "Mumbai|Surat": 285,
    "Mumbai|Ahmedabad": 525,
    "Mumbai|Goa": 590,
    "Mumbai|Indore": 585,
    "Mumbai|Hyderabad": 710,
    "Mumbai|Nagpur": 815,
    "Mumbai|Bengaluru": 985,

    "Pune|Goa": 450,
    "Pune|Nashik": 210,
    "Pune|Aurangabad": 235,
    "Pune|Kolhapur": 230,
    "Pune|Satara": 115,
    "Pune|Hyderabad": 560,
    "Pune|Bengaluru": 840,

    "Delhi|Agra": 240,
    "Delhi|Jaipur": 280,
    "Delhi|Chandigarh": 250,
    "Delhi|Dehradun": 255,
    "Delhi|Lucknow": 555,
    "Delhi|Amritsar": 450,
    "Delhi|Shimla": 350,
    "Delhi|Haridwar": 220,

    "Ahmedabad|Vadodara": 110,
    "Ahmedabad|Surat": 265,
    "Ahmedabad|Udaipur": 260,
    "Ahmedabad|Rajkot": 215,

    "Bengaluru|Mysuru": 145,
    "Bengaluru|Chennai": 350,
    "Bengaluru|Hyderabad": 570,
    "Bengaluru|Goa": 560,

    "Chennai|Pondicherry": 155,
    "Chennai|Coimbatore": 505,
    "Chennai|Madurai": 460,

    "Hyderabad|Nagpur": 500,
    "Hyderabad|Vijayawada": 275,

    "Kolkata|Bhubaneswar": 440,
    "Kolkata|Patna": 585,
    "Kolkata|Ranchi": 400,

    "Lucknow|Kanpur": 90,
    "Lucknow|Varanasi": 320,

    "Indore|Bhopal": 195,
    "Indore|Ujjain": 55,

    "Kochi|Munnar": 130,
    "Kochi|Coimbatore": 190

};


// ======================================================
// HELPERS
// ======================================================

const $ = id =>
    document.getElementById(id);


let currentTrip = null;


const formatter =
    new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }
    );


function money(value) {

    return formatter.format(
        Number(value) || 0
    );

}


function numberValue(id) {

    return Math.max(
        0,
        Number($(id).value) || 0
    );

}


// ======================================================
// POPULATE CITIES
// ======================================================

function populateCities() {

    const options = [
        "Select City",
        ...Object.keys(indianCities).sort(),
        "Custom Location"
    ];


    ["fromCity", "toCity"]
        .forEach(id => {

            const select =
                $(id);


            options.forEach(city => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    city;


                option.textContent =
                    city;


                select.appendChild(
                    option
                );

            });

        });


    $("fromCity").value =
        "Mumbai";


    $("toCity").value =
        "Pune";

}


// ======================================================
// DISTANCE ENGINE
// ======================================================

function toRadians(value) {

    return value *
        Math.PI /
        180;

}


function straightDistance(a, b) {

    const earth =
        6371;


    const lat1 =
        toRadians(a[0]);


    const lat2 =
        toRadians(b[0]);


    const dLat =
        toRadians(
            b[0] -
            a[0]
        );


    const dLon =
        toRadians(
            b[1] -
            a[1]
        );


    const x =

        Math.sin(
            dLat / 2
        ) ** 2

        +

        Math.cos(lat1)

        *

        Math.cos(lat2)

        *

        Math.sin(
            dLon / 2
        ) ** 2;


    return earth *
        2 *
        Math.atan2(

            Math.sqrt(x),

            Math.sqrt(
                1 - x
            )

        );

}


function knownRoadDistance(from, to) {

    return (

        knownDistances[
            `${from}|${to}`
        ]

        ??

        knownDistances[
            `${to}|${from}`
        ]

        ??

        null

    );

}


function getDistance(from, to) {

    const known =
        knownRoadDistance(
            from,
            to
        );


    if (known) {

        return {

            distance:
                known,

            exactStored:
                true

        };

    }


    if (
        indianCities[from]
        &&
        indianCities[to]
    ) {

        const straight =
            straightDistance(
                indianCities[from],
                indianCities[to]
            );


        let roadFactor =
            1.24;


        if (
            straight <
            100
        ) {

            roadFactor =
                1.32;

        }

        else if (
            straight <
            300
        ) {

            roadFactor =
                1.27;

        }

        else if (
            straight >
            1000
        ) {

            roadFactor =
                1.18;

        }


        return {

            distance:
                Math.round(
                    straight *
                    roadFactor
                ),

            exactStored:
                false

        };

    }


    return null;

}


// ======================================================
// ROUTE STATUS
// ======================================================

function updateRouteStatus() {

    const from =
        $("fromCity").value;


    const to =
        $("toCity").value;


    const custom =

        from ===
        "Custom Location"

        ||

        to ===
        "Custom Location";


    $("customLocationBox")
        .classList.toggle(
            "hidden",
            !custom
        );


    if (custom) {

        $("distanceText")
            .textContent =
            "Enter your custom locations and road distance.";

        return;

    }


    if (
        from ===
        "Select City"

        ||

        to ===
        "Select City"
    ) {

        $("distanceText")
            .textContent =
            "Select both cities.";

        return;

    }


    if (
        from ===
        to
    ) {

        $("distanceText")
            .textContent =
            "Choose two different cities.";

        return;

    }


    const result =
        getDistance(
            from,
            to
        );


    if (!result) {

        $("distanceText")
            .textContent =
            "Distance unavailable.";

        return;

    }


    $("distanceText")
        .textContent =

        `${from} → ${to} • ${
            result.exactStored
                ?
                ""
                :
                "~"
        }${result.distance} KM`;

}


// ======================================================
// ROUTE DATA
// ======================================================

function getRouteData() {

    const from =
        $("fromCity").value;


    const to =
        $("toCity").value;


    const custom =

        from ===
        "Custom Location"

        ||

        to ===
        "Custom Location";


    if (custom) {

        const customFrom =
            $("customFrom")
                .value
                .trim();


        const customTo =
            $("customTo")
                .value
                .trim();


        const distance =
            numberValue(
                "customDistance"
            );


        if (
            !customFrom
            ||
            !customTo
            ||
            distance <= 0
        ) {

            throw new Error(
                "Enter custom locations and road distance."
            );

        }


        return {

            from:
                customFrom,

            to:
                customTo,

            distance

        };

    }


    if (
        from ===
        "Select City"

        ||

        to ===
        "Select City"
    ) {

        throw new Error(
            "Select starting point and destination."
        );

    }


    if (
        from ===
        to
    ) {

        throw new Error(
            "Starting point and destination cannot be the same."
        );

    }


    const result =
        getDistance(
            from,
            to
        );


    if (!result) {

        throw new Error(
            "Unable to estimate route."
        );

    }


    return {

        from,

        to,

        distance:
            result.distance

    };

}


// ======================================================
// CALCULATE TRIP
// ======================================================

function calculateTrip() {

    $("errorMessage")
        .classList
        .add(
            "hidden"
        );


    try {

        const route =
            getRouteData();


        const mileage =
            numberValue(
                "mileage"
            );


        const fuelPrice =
            numberValue(
                "fuelPrice"
            );


        const travellers =
            Math.max(

                1,

                Math.round(
                    numberValue(
                        "passengers"
                    )
                )

            );


        if (
            mileage <= 0
        ) {

            throw new Error(
                "Enter valid mileage."
            );

        }


        if (
            fuelPrice <= 0
        ) {

            throw new Error(
                "Enter valid fuel price."
            );

        }


        let totalDistance =
            route.distance;


        if (
            $("tripType").value ===
            "round"
        ) {

            totalDistance *=
                2;

        }


        const baseFuel =
            totalDistance /
            mileage;


        const reserve =
            numberValue(
                "reserve"
            );


        const fuelRequired =
            baseFuel *
            (
                1 +
                reserve /
                100
            );


        const fuelCost =
            fuelRequired *
            fuelPrice;


        const expenses = {

            Fuel:
                fuelCost,

            Toll:
                numberValue(
                    "toll"
                ),

            Parking:
                numberValue(
                    "parking"
                ),

            Food:
                numberValue(
                    "food"
                ),

            Hotel:
                numberValue(
                    "hotel"
                ),

            Other:
                numberValue(
                    "other"
                )

        };


        const totalCost =
            Object
                .values(
                    expenses
                )
                .reduce(
                    (
                        total,
                        value
                    ) =>
                        total +
                        value,
                    0
                );


        const perPerson =
            totalCost /
            travellers;


        let unit =
            "L";


        if (
            $("fuelType").value ===
            "cng"
        ) {

            unit =
                "KG";

        }


        if (
            $("fuelType").value ===
            "electric"
        ) {

            unit =
                "kWh";

        }


        currentTrip = {

            from:
                route.from,

            to:
                route.to,

            distance:
                totalDistance,

            baseFuel,

            fuelRequired,

            fuelCost,

            totalCost,

            perPerson,

            travellers,

            expenses,

            unit

        };


        displayTrip();

        saveTrip();

    }

    catch (error) {

        $("errorMessage")
            .textContent =
            "⚠ " +
            error.message;


        $("errorMessage")
            .classList
            .remove(
                "hidden"
            );

    }

}


// ======================================================
// DISPLAY TRIP
// ======================================================

function displayTrip() {

    const trip =
        currentTrip;


    $("resultFrom")
        .textContent =
        trip.from;


    $("resultTo")
        .textContent =
        trip.to;


    $("resultDistance")
        .textContent =
        `${trip.distance.toFixed(1)} KM`;


    $("resultFuel")
        .textContent =
        `${trip.fuelRequired.toFixed(2)} ${trip.unit}`;


    $("resultFuelCost")
        .textContent =
        money(
            trip.fuelCost
        );


    $("resultCostKm")
        .textContent =
        money(
            trip.totalCost /
            trip.distance
        );


    $("resultTotal")
        .textContent =
        money(
            trip.totalCost
        );


    $("resultPerPerson")
        .textContent =
        money(
            trip.perPerson
        );


    $("baseFuel")
        .textContent =
        `${trip.baseFuel.toFixed(2)} ${trip.unit}`;


    $("reserveFuel")
        .textContent =
        `${trip.fuelRequired.toFixed(2)} ${trip.unit}`;


    updateTank();

    renderBreakdown();

    renderCabComparison();

    showPassengerSection();


    $("results")
        .classList
        .remove(
            "hidden"
        );


    $("results")
        .scrollIntoView({

            behavior:
                "smooth"

        });

}


// ======================================================
// TANK
// ======================================================

function updateTank() {

    if (
        $("fuelType").value ===
        "electric"
    ) {

        $("tankStatus")
            .textContent =
            "Not applicable for EV";

        return;

    }


    const tank =
        numberValue(
            "tankCapacity"
        );


    if (
        tank <= 0
    ) {

        $("tankStatus")
            .textContent =
            "Not provided";

        return;

    }


    if (
        currentTrip.fuelRequired <=
        tank
    ) {

        $("tankStatus")
            .textContent =
            "✓ Enough for trip";

    }

    else {

        const extra =
            currentTrip.fuelRequired -
            tank;


        $("tankStatus")
            .textContent =
            `Need ${extra.toFixed(2)} ${currentTrip.unit} extra`;

    }

}


// ======================================================
// BREAKDOWN
// ======================================================

function renderBreakdown() {

    const container =
        $("breakdown");


    container.innerHTML =
        "";


    const total =
        currentTrip.totalCost;


    Object
        .entries(
            currentTrip.expenses
        )
        .forEach(
            (
                [
                    name,
                    value
                ]
            ) => {

                if (
                    value <= 0
                ) {

                    return;

                }


                const percent =

                    total >
                    0

                    ?

                    value /
                    total *
                    100

                    :

                    0;


                const row =
                    document
                        .createElement(
                            "div"
                        );


                row.className =
                    "bar-row";


                row.innerHTML = `

                    <div class="bar-top">

                        <span>
                            ${name}
                        </span>

                        <span>
                            ${money(value)}
                            •
                            ${percent.toFixed(0)}%
                        </span>

                    </div>

                    <div class="bar-track">

                        <div
                            class="bar-fill"
                            style="width:${percent}%"
                        ></div>

                    </div>
                `;


                container
                    .appendChild(
                        row
                    );

            }
        );

}


// ======================================================
// CAB COMPARISON
// ======================================================

function renderCabComparison() {

    const cab =
        numberValue(
            "cabFare"
        );


    if (
        cab <= 0
    ) {

        $("cabComparison")
            .classList
            .add(
                "hidden"
            );

        return;

    }


    $("cabComparison")
        .classList
        .remove(
            "hidden"
        );


    $("ownVehicleCost")
        .textContent =
        money(
            currentTrip.totalCost
        );


    $("cabCost")
        .textContent =
        money(
            cab
        );


    const difference =
        Math.abs(
            cab -
            currentTrip.totalCost
        );


    if (
        currentTrip.totalCost <
        cab
    ) {

        $("cabMessage")
            .textContent =
            `🚗 Own vehicle saves approximately ${money(difference)}.`;

    }

    else if (
        cab <
        currentTrip.totalCost
    ) {

        $("cabMessage")
            .textContent =
            `🚕 Cab saves approximately ${money(difference)}.`;

    }

    else {

        $("cabMessage")
            .textContent =
            "Both options cost approximately the same.";

    }

}


// ======================================================
// PASSENGER SECTION
// ======================================================

function showPassengerSection() {

    $("passengerEmailSection")
        .classList
        .remove(
            "hidden"
        );


    $("emailTotalCost")
        .textContent =
        money(
            currentTrip.totalCost
        );


    $("emailTravellerCount")
        .textContent =
        currentTrip.travellers;


    $("emailPerPerson")
        .textContent =
        money(
            currentTrip.perPerson
        );


    createPassengerRows();

}


// ======================================================
// PASSENGER ROWS
// ======================================================

function createPassengerRows() {

    const container =
        $("passengerList");


    container.innerHTML =
        "";


    for (
        let i = 1;
        i <= currentTrip.travellers;
        i++
    ) {

        const row =
            document
                .createElement(
                    "div"
                );


        row.className =
            "passenger-email-row";


        row.innerHTML = `

            <div class="passenger-number">
                ${i}
            </div>

            <input
                class="passenger-name"
                placeholder="Passenger ${i} name"
            >

            <input
                class="passenger-email"
                type="email"
                placeholder="passenger${i}@email.com"
            >

            <button
                class="send-passenger-btn"
                type="button"
            >
                Send ${money(currentTrip.perPerson)}
            </button>

        `;


        row
            .querySelector(
                ".send-passenger-btn"
            )
            .addEventListener(
                "click",
                () =>
                    sendReminder(
                        row
                    )
            );


        container
            .appendChild(
                row
            );

    }

}


// ======================================================
// VALID EMAIL
// ======================================================

function validEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
            email
        );

}


// ======================================================
// EMAIL DATA
// ======================================================

function emailData(row) {

    const name =

        row
            .querySelector(
                ".passenger-name"
            )
            .value
            .trim()

        ||

        "Friend";


    const email =

        row
            .querySelector(
                ".passenger-email"
            )
            .value
            .trim();


    const sender =

        $("senderName")
            .value
            .trim()

        ||

        "Your Trip Organizer";


    const payment =

        $("paymentNote")
            .value
            .trim()

        ||

        "Please send your share whenever convenient.";


    return {

        passengerName:
            name,

        passengerEmail:
            email,

        senderName:
            sender,

        from:
            currentTrip.from,

        to:
            currentTrip.to,

        distance:
            `${currentTrip.distance.toFixed(1)} KM`,

        totalCost:
            money(
                currentTrip.totalCost
            ),

        share:
            money(
                currentTrip.perPerson
            ),

        paymentNote:
            payment

    };

}


// ======================================================
// SEND SINGLE EMAIL
// ======================================================

async function sendReminder(row) {

    const data =
        emailData(
            row
        );


    if (
        !validEmail(
            data.passengerEmail
        )
    ) {

        showEmailStatus(
            "Enter a valid passenger email.",
            false
        );

        return;

    }


    const button =
        row.querySelector(
            ".send-passenger-btn"
        );


    const oldText =
        button.textContent;


    button.disabled =
        true;


    button.textContent =
        "Sending...";


    try {

        const response =
            await fetch(
                "/api/send-email",
                {
                    method:
                        "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            data
                        )
                }
            );


        const result =
            await response.json();


        if (
            !response.ok
        ) {

            throw new Error(
                result.error ||
                "Email could not be sent."
            );

        }


        button.textContent =
            "✓ Sent";


        showEmailStatus(
            `Reminder sent successfully to ${data.passengerEmail}`,
            true
        );

    }

    catch (error) {

        console.error(
            "EMAIL ERROR:",
            error
        );


        button.textContent =
            oldText;


        showEmailStatus(
            `Email failed: ${error.message}`,
            false
        );

    }


    setTimeout(
        () => {

            button.disabled =
                false;


            button.textContent =
                oldText;

        },
        2000
    );

}


// ======================================================
// SEND ALL
// ======================================================

$("sendAllBtn")
    .addEventListener(
        "click",
        async () => {

            const rows = [

                ...document
                    .querySelectorAll(
                        ".passenger-email-row"
                    )

            ];


            const validRows =
                rows.filter(
                    row =>
                        validEmail(
                            row
                                .querySelector(
                                    ".passenger-email"
                                )
                                .value
                                .trim()
                        )
                );


            if (
                validRows.length ===
                0
            ) {

                showEmailStatus(
                    "Enter at least one valid passenger email.",
                    false
                );

                return;

            }


            const button =
                $("sendAllBtn");


            const oldText =
                button.textContent;


            button.disabled =
                true;


            button.textContent =
                "Sending reminders...";


            let sent =
                0;


            const failures =
                [];


            for (
                let i = 0;
                i < validRows.length;
                i++
            ) {

                const data =
                    emailData(
                        validRows[i]
                    );


                showEmailStatus(
                    `Sending ${i + 1} of ${validRows.length}...`,
                    true
                );


                try {

                    const response =
                        await fetch(
                            "/api/send-email",
                            {
                                method:
                                    "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        data
                                    )
                            }
                        );


                    const result =
                        await response.json();


                    if (
                        !response.ok
                    ) {

                        throw new Error(
                            result.error ||
                            "Email failed."
                        );

                    }


                    sent++;

                }

                catch (error) {

                    failures.push(
                        error.message
                    );

                }

            }


            button.disabled =
                false;


            button.textContent =
                oldText;


            if (
                failures.length ===
                0
            ) {

                showEmailStatus(
                    `All ${sent} reminders sent successfully.`,
                    true
                );

            }

            else {

                showEmailStatus(
                    `${sent} sent, ${failures.length} failed. ${failures[0]}`,
                    false
                );

            }

        }
    );


// ======================================================
// EMAIL STATUS
// ======================================================

function showEmailStatus(
    message,
    success
) {

    const box =
        $("emailStatus");


    box.classList.remove(
        "hidden",
        "success",
        "error"
    );


    box.classList.add(
        success
            ?
            "success"
            :
            "error"
    );


    box.textContent =
        success
            ?
            `✓ ${message}`
            :
            `⚠ ${message}`;

}


// ======================================================
// HISTORY
// ======================================================

function getHistory() {

    try {

        return (

            JSON.parse(
                localStorage.getItem(
                    "fuelwiseHistory"
                )
            )

            ||

            []

        );

    }

    catch {

        return [];

    }

}


function saveTrip() {

    const history =
        getHistory();


    history.unshift({

        from:
            currentTrip.from,

        to:
            currentTrip.to,

        distance:
            currentTrip.distance,

        total:
            currentTrip.totalCost,

        date:
            new Date()
                .toLocaleDateString(
                    "en-IN"
                )

    });


    localStorage.setItem(

        "fuelwiseHistory",

        JSON.stringify(
            history.slice(
                0,
                5
            )
        )

    );


    renderHistory();

}


function renderHistory() {

    const container =
        $("recentTrips");


    const history =
        getHistory();


    container.innerHTML =
        "";


    if (
        history.length ===
        0
    ) {

        container.innerHTML = `

            <div class="recent-item">

                <strong>
                    No trips calculated yet
                </strong>

                <span>
                    Your recent trips will appear here.
                </span>

            </div>
        `;


        return;

    }


    history.forEach(
        trip => {

            const row =
                document
                    .createElement(
                        "div"
                    );


            row.className =
                "recent-item";


            row.innerHTML = `

                <strong>
                    ${trip.from} → ${trip.to}
                </strong>

                <span>
                    ${Number(trip.distance).toFixed(0)} KM
                    •
                    ${money(trip.total)}
                    •
                    ${trip.date || ""}
                </span>
            `;


            container
                .appendChild(
                    row
                );

        }
    );

}


// ======================================================
// FUEL TYPE
// ======================================================

$("fuelType")
    .addEventListener(
        "change",
        () => {

            const type =
                $("fuelType").value;


            if (
                type ===
                "petrol"

                ||

                type ===
                "diesel"
            ) {

                $("mileageLabel")
                    .textContent =
                    "Mileage (KM/L)";


                $("fuelPriceLabel")
                    .textContent =
                    "Fuel Price (₹/L)";

            }

            else if (
                type ===
                "cng"
            ) {

                $("mileageLabel")
                    .textContent =
                    "Efficiency (KM/KG)";


                $("fuelPriceLabel")
                    .textContent =
                    "CNG Price (₹/KG)";

            }

            else {

                $("mileageLabel")
                    .textContent =
                    "Efficiency (KM/kWh)";


                $("fuelPriceLabel")
                    .textContent =
                    "Electricity Cost (₹/kWh)";

            }

        }
    );


// ======================================================
// PASSENGER + / -
// ======================================================

$("plusPassenger")
    .addEventListener(
        "click",
        () => {

            let value =
                Number(
                    $("passengers").value
                ) || 1;


            $("passengers").value =
                Math.min(
                    20,
                    value + 1
                );

        }
    );


$("minusPassenger")
    .addEventListener(
        "click",
        () => {

            let value =
                Number(
                    $("passengers").value
                ) || 1;


            $("passengers").value =
                Math.max(
                    1,
                    value - 1
                );

        }
    );


// ======================================================
// EVENTS
// ======================================================

$("fromCity")
    .addEventListener(
        "change",
        updateRouteStatus
    );


$("toCity")
    .addEventListener(
        "change",
        updateRouteStatus
    );


$("swapBtn")
    .addEventListener(
        "click",
        () => {

            const from =
                $("fromCity").value;


            $("fromCity").value =
                $("toCity").value;


            $("toCity").value =
                from;


            const customFrom =
                $("customFrom").value;


            $("customFrom").value =
                $("customTo").value;


            $("customTo").value =
                customFrom;


            updateRouteStatus();

        }
    );


$("calculateBtn")
    .addEventListener(
        "click",
        calculateTrip
    );


$("printBtn")
    .addEventListener(
        "click",
        () =>
            window.print()
    );


$("clearHistory")
    .addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "fuelwiseHistory"
            );


            renderHistory();

        }
    );


// ======================================================
// START
// ======================================================

populateCities();

updateRouteStatus();

renderHistory();