import { Resend } from "resend";


// ======================================================
// RESEND CLIENT
// ======================================================

const resend =
    new Resend(
        process.env.RESEND_API_KEY
    );


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHtml(value = "") {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


// ======================================================
// EMAIL API
// ======================================================

export default async function handler(
    req,
    res
) {

    // Always return JSON
    res.setHeader(
        "Content-Type",
        "application/json"
    );


    // ----------------------------------
    // METHOD CHECK
    // ----------------------------------

    if (
        req.method !==
        "POST"
    ) {

        return res
            .status(405)
            .json({

                success:
                    false,

                error:
                    "Only POST requests are allowed."

            });

    }


    try {

        // ----------------------------------
        // API KEY CHECK
        // ----------------------------------

        if (
            !process.env.RESEND_API_KEY
        ) {

            console.error(
                "RESEND_API_KEY missing"
            );


            return res
                .status(500)
                .json({

                    success:
                        false,

                    error:
                        "RESEND_API_KEY is missing in Vercel Environment Variables."

                });

        }


        // ----------------------------------
        // GET REQUEST DATA
        // ----------------------------------

        const {

            passengerName,

            passengerEmail,

            senderName,

            paymentNote,

            from,

            to,

            distance,

            totalCost,

            share

        } = req.body || {};


        // ----------------------------------
        // VALIDATION
        // ----------------------------------

        if (
            !passengerEmail
        ) {

            return res
                .status(400)
                .json({

                    success:
                        false,

                    error:
                        "Passenger email is required."

                });

        }


        if (
            !share
        ) {

            return res
                .status(400)
                .json({

                    success:
                        false,

                    error:
                        "Passenger share is required."

                });

        }


        // ----------------------------------
        // HTML EMAIL
        // ----------------------------------

        const html = `

        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

        </head>


        <body
            style="
                margin:0;
                padding:0;
                background:#f3f6fb;
                font-family:Arial,Helvetica,sans-serif;
            "
        >


            <div
                style="
                    padding:30px 15px;
                "
            >


                <div
                    style="
                        max-width:600px;
                        margin:0 auto;
                        background:#ffffff;
                        border-radius:18px;
                        overflow:hidden;
                        box-shadow:0 10px 35px rgba(0,0,0,.08);
                    "
                >


                    <!-- HEADER -->

                    <div
                        style="
                            padding:28px;
                            text-align:center;
                            color:#ffffff;
                            background:
                                linear-gradient(
                                    135deg,
                                    #2563eb,
                                    #22c55e
                                );
                        "
                    >


                        <div
                            style="
                                font-size:34px;
                            "
                        >
                            🚗
                        </div>


                        <h1
                            style="
                                margin:
                                    8px
                                    0
                                    0;
                                font-size:25px;
                            "
                        >

                            FuelWise India

                        </h1>


                        <p
                            style="
                                margin:
                                    7px
                                    0
                                    0;
                                font-size:13px;
                                opacity:.9;
                            "
                        >

                            Trip Cost Reminder

                        </p>


                    </div>


                    <!-- BODY -->

                    <div
                        style="
                            padding:30px;
                            color:#334155;
                        "
                    >


                        <h2
                            style="
                                margin-top:0;
                                color:#0f172a;
                            "
                        >

                            Hi ${escapeHtml(
                                passengerName ||
                                "Friend"
                            )} 👋

                        </h2>


                        <p
                            style="
                                line-height:1.7;
                                color:#64748b;
                            "
                        >

                            Hope you enjoyed the trip! 🚗

                        </p>


                        <!-- TRIP INFO -->

                        <div
                            style="
                                margin:
                                    22px
                                    0;
                                padding:18px;
                                border-radius:14px;
                                background:#f8fafc;
                                border:
                                    1px
                                    solid
                                    #e2e8f0;
                            "
                        >


                            <p>

                                📍

                                <strong>

                                    ${escapeHtml(
                                        from
                                    )}

                                </strong>

                                →

                                <strong>

                                    ${escapeHtml(
                                        to
                                    )}

                                </strong>

                            </p>


                            <p>

                                🛣️ Distance:

                                <strong>

                                    ${escapeHtml(
                                        distance
                                    )}

                                </strong>

                            </p>


                            <p>

                                💰 Total Trip Cost:

                                <strong>

                                    ${escapeHtml(
                                        totalCost
                                    )}

                                </strong>

                            </p>


                        </div>


                        <!-- SHARE -->

                        <div
                            style="
                                margin:
                                    22px
                                    0;
                                padding:23px;
                                text-align:center;
                                border-radius:15px;
                                background:#eff6ff;
                            "
                        >


                            <div
                                style="
                                    color:#64748b;
                                    font-size:11px;
                                    font-weight:bold;
                                    letter-spacing:1px;
                                "
                            >

                                YOUR SHARE

                            </div>


                            <div
                                style="
                                    margin-top:8px;
                                    color:#2563eb;
                                    font-size:32px;
                                    font-weight:bold;
                                "
                            >

                                ${escapeHtml(
                                    share
                                )}

                            </div>


                        </div>


                        <!-- MESSAGE -->

                        <p
                            style="
                                margin-top:24px;
                                line-height:1.7;
                                color:#475569;
                            "
                        >

                            Whenever convenient, please send your share so we can settle the trip expenses smoothly. 🙌

                        </p>


                        <!-- PAYMENT -->

                        <div
                            style="
                                margin-top:20px;
                                padding:16px;
                                border-radius:12px;
                                color:#166534;
                                background:#f0fdf4;
                                border:
                                    1px
                                    solid
                                    #dcfce7;
                            "
                        >

                            💳

                            <strong>

                                Payment Details

                            </strong>


                            <br>
                            <br>


                            ${escapeHtml(
                                paymentNote ||
                                "Please send your share whenever convenient."
                            )}


                        </div>


                        <p
                            style="
                                margin-top:23px;
                                color:#64748b;
                                line-height:1.6;
                            "
                        >

                            If you've already paid, please ignore this reminder. 😊

                        </p>


                        <p
                            style="
                                margin-top:22px;
                                line-height:1.7;
                            "
                        >

                            Thanks! 🙌

                            <br>

                            <strong>

                                ${escapeHtml(
                                    senderName ||
                                    "Your Trip Organizer"
                                )}

                            </strong>

                        </p>


                    </div>


                    <!-- FOOTER -->

                    <div
                        style="
                            padding:16px;
                            text-align:center;
                            color:#94a3b8;
                            background:#f8fafc;
                            font-size:11px;
                        "
                    >

                        FuelWise India • Smart Fuel & Trip Cost Planner

                    </div>


                </div>


            </div>


        </body>

        </html>

        `;


        // ----------------------------------
        // SEND EMAIL
        // ----------------------------------

        const {

            data,

            error

        } =
            await resend.emails.send({

                from:
                    process.env.RESEND_FROM_EMAIL
                    ||
                    "FuelWise India <onboarding@resend.dev>",


                to: [
                    passengerEmail
                ],


                subject:
                    `🚗 FuelWise India | Your Trip Share is ${share}`,


                html

            });


        // ----------------------------------
        // RESEND ERROR
        // ----------------------------------

        if (error) {

            console.error(
                "RESEND ERROR:",
                error
            );


            return res
                .status(400)
                .json({

                    success:
                        false,

                    error:
                        error.message
                        ||
                        error.name
                        ||
                        JSON.stringify(
                            error
                        )

                });

        }


        // ----------------------------------
        // SUCCESS
        // ----------------------------------

        console.log(
            "EMAIL SENT:",
            data
        );


        return res
            .status(200)
            .json({

                success:
                    true,

                message:
                    "Email sent successfully.",

                id:
                    data?.id ||
                    null

            });

    }

    catch (error) {

        // ----------------------------------
        // SERVER ERROR
        // ----------------------------------

        console.error(
            "SERVER EMAIL ERROR:",
            error
        );


        return res
            .status(500)
            .json({

                success:
                    false,

                error:
                    error?.message
                    ||
                    "Unexpected server error."

            });

    }

}