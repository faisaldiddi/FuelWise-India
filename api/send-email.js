import { Resend } from "resend";


const resend =
    new Resend(
        process.env.RESEND_API_KEY
    );


export default async function handler(
    req,
    res
) {

    if (
        req.method !==
        "POST"
    ) {

        return res
            .status(405)
            .json({
                error:
                    "Method not allowed"
            });

    }


    try {

        const {

            passengerName,

            passengerEmail,

            senderName,

            from,

            to,

            distance,

            totalCost,

            share,

            paymentNote

        } = req.body || {};


        if (
            !passengerEmail
            ||
            !share
        ) {

            return res
                .status(400)
                .json({
                    error:
                        "Passenger email and share are required."
                });

        }


        const html = `

        <div style="
            margin:0;
            padding:30px;
            background:#f3f6fb;
            font-family:Arial,Helvetica,sans-serif;
        ">

            <div style="
                max-width:600px;
                margin:auto;
                background:#ffffff;
                border-radius:18px;
                overflow:hidden;
                box-shadow:0 10px 35px rgba(0,0,0,.08);
            ">

                <div style="
                    padding:24px;
                    text-align:center;
                    color:white;
                    background:linear-gradient(135deg,#2563eb,#22c55e);
                ">

                    <div style="
                        font-size:30px;
                        margin-bottom:7px;
                    ">
                        🚗
                    </div>

                    <h1 style="
                        margin:0;
                        font-size:24px;
                    ">
                        FuelWise India
                    </h1>

                    <p style="
                        margin:6px 0 0;
                        opacity:.85;
                        font-size:13px;
                    ">
                        Trip Cost Reminder
                    </p>

                </div>


                <div style="
                    padding:28px;
                    color:#243147;
                ">

                    <h2 style="
                        margin-top:0;
                        font-size:20px;
                    ">
                        Hi ${escapeHtml(passengerName || "Friend")} 👋
                    </h2>


                    <p style="
                        color:#64748b;
                        line-height:1.7;
                    ">
                        Hope you enjoyed the trip! 🚗
                        Here is your share of the trip expenses.
                    </p>


                    <div style="
                        margin:22px 0;
                        padding:20px;
                        border-radius:14px;
                        background:#f8fafc;
                        border:1px solid #e2e8f0;
                    ">

                        <p>
                            📍
                            <strong>
                                ${escapeHtml(from)}
                            </strong>
                            →
                            <strong>
                                ${escapeHtml(to)}
                            </strong>
                        </p>

                        <p>
                            🛣 Distance:
                            <strong>
                                ${escapeHtml(distance)}
                            </strong>
                        </p>

                        <p>
                            💰 Total Trip:
                            <strong>
                                ${escapeHtml(totalCost)}
                            </strong>
                        </p>

                    </div>


                    <div style="
                        margin:20px 0;
                        padding:21px;
                        text-align:center;
                        border-radius:14px;
                        background:#eff6ff;
                    ">

                        <div style="
                            color:#64748b;
                            font-size:12px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                        ">
                            Your Share
                        </div>

                        <div style="
                            margin-top:7px;
                            color:#2563eb;
                            font-size:30px;
                            font-weight:bold;
                        ">
                            ${escapeHtml(share)}
                        </div>

                    </div>


                    <p style="
                        line-height:1.7;
                    ">
                        Whenever convenient, please send your share so we can
                        settle the trip expenses smoothly. 🙌
                    </p>


                    ${
                        paymentNote
                        ?
                        `
                        <div style="
                            margin-top:20px;
                            padding:14px;
                            border-radius:10px;
                            background:#f0fdf4;
                            color:#166534;
                        ">

                            💳
                            <strong>
                                Payment Details:
                            </strong>

                            <br>

                            ${escapeHtml(paymentNote)}

                        </div>
                        `
                        :
                        ""
                    }


                    <p style="
                        margin-top:25px;
                        color:#64748b;
                    ">
                        If you've already paid, please ignore this reminder. 😊
                    </p>


                    <p>
                        Thanks! 🙌
                        <br>

                        <strong>
                            ${escapeHtml(senderName || "Your Trip Organizer")}
                        </strong>
                    </p>

                </div>


                <div style="
                    padding:16px;
                    text-align:center;
                    background:#f8fafc;
                    color:#94a3b8;
                    font-size:11px;
                ">

                    FuelWise India • Smart Fuel & Trip Cost Planner

                </div>

            </div>

        </div>
        `;


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


        if (error) {

            console.error(
                "RESEND ERROR:",
                error
            );


            return res
                .status(400)
                .json({
                    error:
                        error.message
                        ||
                        "Unable to send email."
                });

        }


        return res
            .status(200)
            .json({

                success:
                    true,

                id:
                    data?.id

            });

    }

    catch (error) {

        console.error(
            error
        );


        return res
            .status(500)
            .json({

                error:
                    error.message
                    ||
                    "Server error."

            });

    }

}


function escapeHtml(value) {

    return String(
        value || ""
    )
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