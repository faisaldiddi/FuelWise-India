import { Resend } from "resend";

export default async function handler(req, res) {

    res.setHeader(
        "Content-Type",
        "application/json"
    );

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false,
            error: "Only POST requests are allowed."
        });

    }

    try {

        if (!process.env.RESEND_API_KEY) {

            return res.status(500).json({
                success: false,
                error: "RESEND_API_KEY is missing in Vercel."
            });

        }

        const resend =
            new Resend(
                process.env.RESEND_API_KEY
            );


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


        if (!passengerEmail) {

            return res.status(400).json({
                success: false,
                error: "Passenger email is required."
            });

        }


        const html = `
            <div style="
                font-family:Arial,sans-serif;
                background:#f4f7fb;
                padding:30px;
            ">

                <div style="
                    max-width:600px;
                    margin:auto;
                    background:white;
                    border-radius:18px;
                    overflow:hidden;
                ">

                    <div style="
                        background:#2563eb;
                        color:white;
                        padding:25px;
                        text-align:center;
                    ">

                        <h1>
                            🚗 FuelWise India
                        </h1>

                        <p>
                            Trip Cost Reminder
                        </p>

                    </div>


                    <div style="
                        padding:28px;
                        color:#334155;
                    ">

                        <h2>
                            Hi ${passengerName || "Friend"} 👋
                        </h2>

                        <p>
                            Hope you enjoyed the trip!
                        </p>


                        <div style="
                            background:#f8fafc;
                            padding:18px;
                            border-radius:12px;
                            margin:20px 0;
                        ">

                            <p>
                                📍 ${from} → ${to}
                            </p>

                            <p>
                                🛣 Distance:
                                <strong>${distance}</strong>
                            </p>

                            <p>
                                💰 Total:
                                <strong>${totalCost}</strong>
                            </p>

                        </div>


                        <div style="
                            background:#eff6ff;
                            padding:20px;
                            border-radius:12px;
                            text-align:center;
                        ">

                            <p>
                                YOUR SHARE
                            </p>

                            <h1 style="
                                color:#2563eb;
                            ">
                                ${share}
                            </h1>

                        </div>


                        <p>
                            Whenever convenient, please send your share so we can settle the trip expenses smoothly. 🙌
                        </p>


                        <p>
                            💳 Payment:
                            <strong>
                                ${paymentNote || "Please send your share whenever convenient."}
                            </strong>
                        </p>


                        <p>
                            If you've already paid, please ignore this reminder.
                        </p>


                        <p>
                            Thanks!<br>
                            <strong>
                                ${senderName || "Your Trip Organizer"}
                            </strong>
                        </p>

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

                to:
                    [passengerEmail],

                subject:
                    `🚗 FuelWise India | Your Trip Share is ${share}`,

                html

            });


        if (error) {

            console.error(
                "RESEND ERROR:",
                error
            );


            return res.status(400).json({
                success: false,
                error:
                    error.message
                    ||
                    JSON.stringify(error)
            });

        }


        return res.status(200).json({
            success: true,
            id: data?.id
        });

    }

    catch (error) {

        console.error(
            "SERVER ERROR:",
            error
        );


        return res.status(500).json({
            success: false,
            error:
                error.message
                ||
                "Server error."
        });

    }

}