// ======================================================
// FUELWISE INDIA
// COMPLETE EMAILJS VERSION
// ======================================================


// ======================================================
// EMAILJS CONFIGURATION
// ======================================================

const EMAILJS_PUBLIC_KEY = "LfbDU_QJJMEXkCi4F";
const EMAILJS_SERVICE_ID = "service_hdozlqj";
const EMAILJS_TEMPLATE_ID = "template_be4wbh4";


// ======================================================
// ELEMENT HELPER
// ======================================================

const $ = (id) => document.getElementById(id);


// ======================================================
// GLOBAL VARIABLE
// ======================================================

let currentTrip = null;


// ======================================================
// INITIALIZE EMAILJS
// ======================================================

function initializeEmailJS() {

    if (typeof emailjs === "undefined") {

        console.error(
            "EmailJS library is not loaded."
        );

        return;
    }

    try {

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

        console.log(
            "EmailJS initialized successfully."
        );

    }

    catch (error) {

        console.error(
            "EmailJS initialization error:",
            error
        );
    }
}


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
// MONEY FORMAT
// ======================================================

const formatter = new Intl.NumberFormat(
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

    const element = $(id);

    if (!element) {
        return 0;
    }

    return Math.max(
        0,
        Number(element.value) || 0
    );
}


// ======================================================
// LOAD CITIES
// ======================================================

function populateCities() {

    const fromSelect = $("fromCity");
    const toSelect = $("toCity");

    if (!fromSelect || !toSelect) {
        return;
    }

    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";


    const options = [

        "Select City",

        ...Object
            .keys(indianCities)
            .sort(),

        "Custom Location"

    ];


    options.forEach((city) => {

        const fromOption =
            document.createElement(
                "option"
            );

        fromOption.value = city;
        fromOption.textContent = city;


        const toOption =
            document.createElement(
                "option"
            );

        toOption.value = city;
        toOption.textContent = city;


        fromSelect.appendChild(
            fromOption
        );

        toSelect.appendChild(
            toOption
        );

    });


    fromSelect.value =
        "Mumbai";

    toSelect.value =
        "Pune";
}


// ======================================================
// DISTANCE FUNCTIONS
// ======================================================

function toRadians(value) {

    return value *
        Math.PI /
        180;
}


function straightDistance(
    pointA,
    pointB
) {

    const earthRadius =
        6371;


    const lat1 =
        toRadians(
            pointA[0]
        );


    const lat2 =
        toRadians(
            pointB[0]
        );


    const latDifference =
        toRadians(
            pointB[0] -
            pointA[0]
        );


    const lonDifference =
        toRadians(
            pointB[1] -
            pointA[1]
        );


    const calculation =

        Math.sin(
            latDifference / 2
        ) ** 2

        +

        Math.cos(lat1)

        *

        Math.cos(lat2)

        *

        Math.sin(
            lonDifference / 2
        ) ** 2;


    return earthRadius *
        2 *
        Math.atan2(

            Math.sqrt(
                calculation
            ),

            Math.sqrt(
                1 -
                calculation
            )

        );
}


function knownRoadDistance(
    from,
    to
) {

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


function getDistance(
    from,
    to
) {

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

    const fromCity =
        $("fromCity");

    const toCity =
        $("toCity");


    if (
        !fromCity ||
        !toCity
    ) {
        return;
    }


    const from =
        fromCity.value;


    const to =
        toCity.value;


    const custom =
        from ===
        "Custom Location"

        ||

        to ===
        "Custom Location";


    const customBox =
        $("customLocationBox");


    if (customBox) {

        customBox
            .classList
            .toggle(
                "hidden",
                !custom
            );
    }


    const distanceText =
        $("distanceText");


    if (!distanceText) {
        return;
    }


    if (custom) {

        distanceText.textContent =
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

        distanceText.textContent =
            "Select both cities.";

        return;
    }


    if (
        from ===
        to
    ) {

        distanceText.textContent =
            "Choose two different cities.";

        return;
    }


    const result =
        getDistance(
            from,
            to
        );


    if (!result) {

        distanceText.textContent =
            "Distance unavailable.";

        return;
    }


    distanceText.textContent =
        `${from} → ${to} • ${
            result.exactStored
                ? ""
                : "~"
        }${result.distance} KM`;
}


// ======================================================
// GET ROUTE DATA
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
            !customFrom ||
            !customTo ||
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

    console.log(
        "Calculate My Trip clicked."
    );


    const errorBox =
        $("errorMessage");


    if (errorBox) {

        errorBox
            .classList
            .add(
                "hidden"
            );
    }


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


        const fuelType =
            $("fuelType").value;


        if (
            fuelType ===
            "cng"
        ) {

            unit =
                "KG";
        }


        if (
            fuelType ===
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


        console.log(
            "Calculated Trip:",
            currentTrip
        );


        displayTrip();

        saveTrip();

    }

    catch (error) {

        console.error(
            "CALCULATION ERROR:",
            error
        );


        if (errorBox) {

            errorBox.textContent =
                "⚠ " +
                error.message;


            errorBox
                .classList
                .remove(
                    "hidden"
                );
        }
    }
}


// ======================================================
// DISPLAY RESULTS
// ======================================================

function displayTrip() {

    if (!currentTrip) {
        return;
    }


    $("resultFrom").textContent =
        currentTrip.from;


    $("resultTo").textContent =
        currentTrip.to;


    $("resultDistance").textContent =
        `${currentTrip.distance.toFixed(1)} KM`;


    $("resultFuel").textContent =
        `${currentTrip.fuelRequired.toFixed(2)} ${currentTrip.unit}`;


    $("resultFuelCost").textContent =
        money(
            currentTrip.fuelCost
        );


    $("resultCostKm").textContent =
        money(

            currentTrip.totalCost /
            currentTrip.distance

        );


    $("resultTotal").textContent =
        money(
            currentTrip.totalCost
        );


    $("resultPerPerson").textContent =
        money(
            currentTrip.perPerson
        );


    $("baseFuel").textContent =
        `${currentTrip.baseFuel.toFixed(2)} ${currentTrip.unit}`;


    $("reserveFuel").textContent =
        `${currentTrip.fuelRequired.toFixed(2)} ${currentTrip.unit}`;


    updateEnergyTitle();

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
                "smooth",

            block:
                "start"

        });
}


// ======================================================
// ENERGY TITLE
// ======================================================

function updateEnergyTitle() {

    const title =
        $("energyTitle");


    if (!title) {
        return;
    }


    const type =
        $("fuelType").value;


    if (
        type ===
        "electric"
    ) {

        title.textContent =
            "Energy Required";
    }

    else if (
        type ===
        "cng"
    ) {

        title.textContent =
            "CNG Required";
    }

    else {

        title.textContent =
            "Fuel Required";
    }
}


// ======================================================
// TANK STATUS
// ======================================================

function updateTank() {

    const tankStatus =
        $("tankStatus");


    if (!tankStatus) {
        return;
    }


    if (
        $("fuelType").value ===
        "electric"
    ) {

        tankStatus.textContent =
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

        tankStatus.textContent =
            "Not provided";

        return;
    }


    if (
        currentTrip.fuelRequired <=
        tank
    ) {

        tankStatus.textContent =
            "✓ Enough for trip";
    }

    else {

        const extra =
            currentTrip.fuelRequired -
            tank;


        tankStatus.textContent =
            `Need ${extra.toFixed(2)} ${currentTrip.unit} extra`;
    }
}


// ======================================================
// COST BREAKDOWN
// ======================================================

function renderBreakdown() {

    const container =
        $("breakdown");


    if (!container) {
        return;
    }


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

                    total > 0

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


                container.appendChild(
                    row
                );
            }
        );
}


// ======================================================
// CAB COMPARISON
// ======================================================

function renderCabComparison() {

    const section =
        $("cabComparison");


    if (!section) {
        return;
    }


    const cab =
        numberValue(
            "cabFare"
        );


    if (
        cab <= 0
    ) {

        section
            .classList
            .add(
                "hidden"
            );

        return;
    }


    section
        .classList
        .remove(
            "hidden"
        );


    $("ownVehicleCost").textContent =
        money(
            currentTrip.totalCost
        );


    $("cabCost").textContent =
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

        $("cabMessage").textContent =
            `🚗 Own vehicle saves approximately ${money(difference)}.`;
    }

    else if (
        cab <
        currentTrip.totalCost
    ) {

        $("cabMessage").textContent =
            `🚕 Cab saves approximately ${money(difference)}.`;
    }

    else {

        $("cabMessage").textContent =
            "Both options cost approximately the same.";
    }
}


// ======================================================
// PASSENGER EMAIL SECTION
// ======================================================

function showPassengerSection() {

    const section =
        $("passengerEmailSection");


    if (!section) {

        console.error(
            "Passenger email section not found."
        );

        return;
    }


    section
        .classList
        .remove(
            "hidden"
        );


    $("emailTotalCost").textContent =
        money(
            currentTrip.totalCost
        );


    $("emailTravellerCount").textContent =
        currentTrip.travellers;


    $("emailPerPerson").textContent =
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


    if (!container) {
        return;
    }


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
                type="text"
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

                Send ${money(
                    currentTrip.perPerson
                )}

            </button>

        `;


        const sendButton =
            row.querySelector(
                ".send-passenger-btn"
            );


        sendButton
            .addEventListener(
                "click",
                () => {

                    sendReminder(
                        row
                    );

                }
            );


        container.appendChild(
            row
        );
    }
}


// ======================================================
// EMAIL CONFIG CHECK
// ======================================================

function emailConfigured() {

    return (

        typeof emailjs !==
        "undefined"

        &&

        EMAILJS_PUBLIC_KEY

        &&

        EMAILJS_SERVICE_ID

        &&

        EMAILJS_TEMPLATE_ID

    );
}


// ======================================================
// EMAIL VALIDATION
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

    const passengerName =

        row
            .querySelector(
                ".passenger-name"
            )
            .value
            .trim()

        ||

        "Friend";


    const passengerEmail =

        row
            .querySelector(
                ".passenger-email"
            )
            .value
            .trim();


    const senderName =

        $("senderName")
            .value
            .trim()

        ||

        "Your Trip Organizer";


    const paymentNote =

        $("paymentNote")
            .value
            .trim()

        ||

        "Please send your share whenever convenient.";


    return {

        to_name:
            passengerName,

        to_email:
            passengerEmail,

        sender_name:
            senderName,

        from_location:
            currentTrip.from,

        to_location:
            currentTrip.to,

        trip_distance:
            `${currentTrip.distance.toFixed(1)} KM`,

        total_trip_cost:
            money(
                currentTrip.totalCost
            ),

        passenger_share:
            money(
                currentTrip.perPerson
            ),

        payment_note:
            paymentNote,

        message:
            `Hi ${passengerName}, hope you enjoyed our trip from ${currentTrip.from} to ${currentTrip.to}. Your share is ${money(currentTrip.perPerson)}. Whenever convenient, please send your share. Thank you!`

    };
}


// ======================================================
// EMAILJS ERROR MESSAGE
// ======================================================

function getEmailError(error) {

    if (!error) {

        return "Unknown EmailJS error.";
    }


    if (
        typeof error ===
        "string"
    ) {

        return error;
    }


    if (
        error.text
    ) {

        return error.text;
    }


    if (
        error.message
    ) {

        return error.message;
    }


    try {

        return JSON.stringify(
            error
        );

    }

    catch {

        return "Unknown EmailJS error.";
    }
}


// ======================================================
// SEND ONE EMAIL
// ======================================================

async function sendReminder(row) {

    if (
        !currentTrip
    ) {

        showEmailStatus(
            "Calculate the trip first.",
            false
        );

        return;
    }


    if (
        !emailConfigured()
    ) {

        showEmailStatus(
            "EmailJS is not configured correctly.",
            false
        );

        return;
    }


    const data =
        emailData(
            row
        );


    if (
        !validEmail(
            data.to_email
        )
    ) {

        showEmailStatus(
            "Enter a valid passenger email.",
            false
        );

        return;
    }


    const button =
        row
            .querySelector(
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
            await emailjs.send(

                EMAILJS_SERVICE_ID,

                EMAILJS_TEMPLATE_ID,

                data

            );


        console.log(
            "EMAILJS SUCCESS:",
            response
        );


        button.textContent =
            "✓ Sent";


        showEmailStatus(
            `Reminder sent successfully to ${data.to_email}`,
            true
        );

    }

    catch (error) {

        console.error(
            "EMAILJS ERROR:",
            error
        );


        button.textContent =
            oldText;


        showEmailStatus(
            `Email failed: ${
                getEmailError(
                    error
                )
            }`,
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
// SEND ALL EMAILS
// ======================================================

async function sendAllReminders() {

    if (
        !currentTrip
    ) {

        showEmailStatus(
            "Calculate the trip first.",
            false
        );

        return;
    }


    if (
        !emailConfigured()
    ) {

        showEmailStatus(
            "EmailJS is not configured correctly.",
            false
        );

        return;
    }


    const rows = [

        ...document
            .querySelectorAll(
                ".passenger-email-row"
            )

    ];


    const validRows =
        rows.filter(
            (row) => {

                const email =
                    row
                        .querySelector(
                            ".passenger-email"
                        )
                        .value
                        .trim();


                return validEmail(
                    email
                );
            }
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
        i <
        validRows.length;
        i++
    ) {

        const data =
            emailData(
                validRows[i]
            );


        showEmailStatus(
            `Sending ${i + 1} of ${validRows.length} to ${data.to_email}...`,
            true
        );


        try {

            const response =
                await emailjs.send(

                    EMAILJS_SERVICE_ID,

                    EMAILJS_TEMPLATE_ID,

                    data

                );


            console.log(
                `EMAIL ${i + 1} SUCCESS:`,
                response
            );


            sent++;

        }

        catch (error) {

            console.error(
                `EMAIL ${i + 1} ERROR:`,
                error
            );


            failures.push({

                email:
                    data.to_email,

                error:
                    getEmailError(
                        error
                    )

            });
        }


        if (
            i <
            validRows.length -
            1
        ) {

            await new Promise(
                (resolve) =>

                    setTimeout(
                        resolve,
                        1100
                    )
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
            `All ${sent} reminder(s) sent successfully.`,
            true
        );

        return;
    }


    if (
        sent ===
        0
    ) {

        showEmailStatus(
            `Email failed: ${failures[0].error}`,
            false
        );

        return;
    }


    showEmailStatus(
        `${sent} sent, ${failures.length} failed. ${failures[0].email}: ${failures[0].error}`,
        false
    );
}


// ======================================================
// EMAIL STATUS
// ======================================================

function showEmailStatus(
    message,
    success
) {

    const box =
        $("emailStatus");


    if (!box) {

        console.log(
            message
        );

        return;
    }


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
                localStorage
                    .getItem(
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

    if (!currentTrip) {
        return;
    }


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


    if (!container) {
        return;
    }


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
        (trip) => {

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

                    ${Number(
                        trip.distance
                    ).toFixed(0)}
                    KM

                    •

                    ${money(
                        trip.total
                    )}

                    •

                    ${trip.date || ""}

                </span>

            `;


            container.appendChild(
                row
            );
        }
    );
}


// ======================================================
// FUEL TYPE
// ======================================================

function updateFuelLabels() {

    const type =
        $("fuelType").value;


    if (
        type ===
        "petrol"

        ||

        type ===
        "diesel"
    ) {

        $("mileageLabel").textContent =
            "Mileage (KM/L)";


        $("fuelPriceLabel").textContent =
            "Fuel Price (₹/L)";
    }

    else if (
        type ===
        "cng"
    ) {

        $("mileageLabel").textContent =
            "Efficiency (KM/KG)";


        $("fuelPriceLabel").textContent =
            "CNG Price (₹/KG)";
    }

    else {

        $("mileageLabel").textContent =
            "Efficiency (KM/kWh)";


        $("fuelPriceLabel").textContent =
            "Electricity Cost (₹/kWh)";
    }
}


// ======================================================
// EVENT LISTENERS
// ======================================================

function setupEvents() {

    const calculateButton =
        $("calculateBtn");


    if (calculateButton) {

        calculateButton
            .addEventListener(
                "click",
                calculateTrip
            );
    }


    const fromCity =
        $("fromCity");


    if (fromCity) {

        fromCity
            .addEventListener(
                "change",
                updateRouteStatus
            );
    }


    const toCity =
        $("toCity");


    if (toCity) {

        toCity
            .addEventListener(
                "change",
                updateRouteStatus
            );
    }


    const swapButton =
        $("swapBtn");


    if (swapButton) {

        swapButton
            .addEventListener(
                "click",
                () => {

                    const oldFrom =
                        $("fromCity").value;


                    $("fromCity").value =
                        $("toCity").value;


                    $("toCity").value =
                        oldFrom;


                    const customFrom =
                        $("customFrom");


                    const customTo =
                        $("customTo");


                    if (
                        customFrom &&
                        customTo
                    ) {

                        const oldCustomFrom =
                            customFrom.value;


                        customFrom.value =
                            customTo.value;


                        customTo.value =
                            oldCustomFrom;
                    }


                    updateRouteStatus();
                }
            );
    }


    const plusPassenger =
        $("plusPassenger");


    if (plusPassenger) {

        plusPassenger
            .addEventListener(
                "click",
                () => {

                    const current =
                        Number(
                            $("passengers").value
                        )
                        ||
                        1;


                    $("passengers").value =
                        Math.min(
                            20,
                            current + 1
                        );
                }
            );
    }


    const minusPassenger =
        $("minusPassenger");


    if (minusPassenger) {

        minusPassenger
            .addEventListener(
                "click",
                () => {

                    const current =
                        Number(
                            $("passengers").value
                        )
                        ||
                        1;


                    $("passengers").value =
                        Math.max(
                            1,
                            current - 1
                        );
                }
            );
    }


    const sendAllButton =
        $("sendAllBtn");


    if (sendAllButton) {

        sendAllButton
            .addEventListener(
                "click",
                sendAllReminders
            );
    }


    const printButton =
        $("printBtn");


    if (printButton) {

        printButton
            .addEventListener(
                "click",
                () => {

                    window.print();

                }
            );
    }


    const clearHistory =
        $("clearHistory");


    if (clearHistory) {

        clearHistory
            .addEventListener(
                "click",
                () => {

                    localStorage.removeItem(
                        "fuelwiseHistory"
                    );


                    renderHistory();

                }
            );
    }


    const fuelType =
        $("fuelType");


    if (fuelType) {

        fuelType
            .addEventListener(
                "change",
                updateFuelLabels
            );
    }
}


// ======================================================
// START APPLICATION
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Starting FuelWise India..."
        );


        initializeEmailJS();

        populateCities();

        setupEvents();

        updateRouteStatus();

        updateFuelLabels();

        renderHistory();


        console.log(
            "FuelWise India loaded successfully."
        );

    }
);