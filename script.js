// ======================================================
// SAFE API RESPONSE PARSER
// ======================================================

async function readApiResponse(response) {

    const rawText =
        await response.text();


    // No response body
    if (!rawText) {

        return {

            success:
                response.ok,

            error:
                response.ok
                    ?
                    ""
                    :
                    `Server returned HTTP ${response.status}`

        };

    }


    // Try JSON first
    try {

        return JSON.parse(
            rawText
        );

    }

    catch {

        console.error(
            "NON-JSON RESPONSE:",
            rawText
        );


        // Detect common Vercel HTML response
        if (
            rawText
                .trim()
                .toLowerCase()
                .startsWith("<!doctype html")

            ||

            rawText
                .trim()
                .toLowerCase()
                .startsWith("<html")
        ) {

            return {

                success:
                    false,

                error:
                    `The /api/send-email endpoint returned an HTML page instead of JSON. HTTP ${response.status}. Check your Vercel API function deployment.`

            };

        }


        return {

            success:
                false,

            error:
                rawText

        };

    }

}


// ======================================================
// SEND SINGLE EMAIL
// ======================================================

async function sendReminder(row) {

    if (!currentTrip) {

        showEmailStatus(
            "Calculate the trip first.",
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
            await readApiResponse(
                response
            );


        console.log(
            "EMAIL API RESPONSE:",
            {
                status:
                    response.status,

                result
            }
        );


        if (
            !response.ok
            ||
            result.success !== true
        ) {

            throw new Error(
                result.error
                ||
                `Email server returned HTTP ${response.status}.`
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
            "EMAIL SEND ERROR:",
            error
        );


        button.textContent =
            oldText;


        showEmailStatus(
            `Email failed: ${
                error?.message
                ||
                "Unknown server error"
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

const sendAllBtn =
    $("sendAllBtn");


if (sendAllBtn) {

    sendAllBtn
        .addEventListener(
            "click",
            async () => {

                if (!currentTrip) {

                    showEmailStatus(
                        "Calculate the trip first.",
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
                        row => {

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


                const oldText =
                    sendAllBtn.textContent;


                sendAllBtn.disabled =
                    true;


                sendAllBtn.textContent =
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

                    const row =
                        validRows[i];


                    const data =
                        emailData(
                            row
                        );


                    showEmailStatus(
                        `Sending ${i + 1} of ${validRows.length} to ${data.passengerEmail}...`,
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
                            await readApiResponse(
                                response
                            );


                        console.log(
                            `EMAIL ${i + 1} RESPONSE:`,
                            {
                                status:
                                    response.status,

                                result
                            }
                        );


                        if (
                            !response.ok
                            ||
                            result.success !== true
                        ) {

                            throw new Error(
                                result.error
                                ||
                                `HTTP ${response.status}`
                            );

                        }


                        sent++;

                    }

                    catch (error) {

                        console.error(
                            `EMAIL ${i + 1} FAILED:`,
                            error
                        );


                        failures.push({

                            email:
                                data.passengerEmail,

                            error:
                                error?.message
                                ||
                                "Unknown error"

                        });

                    }


                    // Delay between passenger emails
                    if (
                        i <
                        validRows.length - 1
                    ) {

                        await new Promise(
                            resolve =>
                                setTimeout(
                                    resolve,
                                    700
                                )
                        );

                    }

                }


                sendAllBtn.disabled =
                    false;


                sendAllBtn.textContent =
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
                    `${sent} sent, ${failures.length} failed. First failed: ${failures[0].email} — ${failures[0].error}`,
                    false
                );

            }
        );

}