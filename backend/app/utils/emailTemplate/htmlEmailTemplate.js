const loginTemplate = (data) => {

    const { receiverEmail, timestamp, ipAddress, resetPasswordLink } = data;

    return `<html>
<header></header>
<main>
    <table width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#f5f6f7">
        <tbody>
            <tr>
                <td height="50"></td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff"
                        style="border:1px solid #f1f2f5">
                        <tbody>
                            <tr>
                                <td colspan="3" height="60" bgcolor="#ffffff"
                                    style="border-bottom:1px solid #eeeeee;padding-left:16px" align="left">

                                  <h2>Venue biz</h2>

                                </td>

                            </tr>
                            <tr>
                                <td colspan="3" height="20"></td>
                            </tr>
                            <tr>
                                <td width="20"></td>
                                <td align="left">

                                    <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                            <tr>
                                                <td colspan="3" height="20"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="3">
                                                    <p style="font-family:Helvetica,Arial,sans-serif">
                                                        We're verifying a recent <span class="il"><span class="il"><span
                                                                    class="il">sign</span></span></span>-<span
                                                            class="il"><span class="il"><span
                                                                    class="il">in</span></span></span> for <b><a
                                                                href="mailto:${receiverEmail}"
                                                                target="_blank">${receiverEmail}</a></b>:
                                                    </p>

                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td style="font-weight:bold">Timestamp:</td>
                                                                <td>${timestamp}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-weight:bold">IP Address:</td>
                                                                <td>${ipAddress}</td>
                                                            </tr>
                                        </tbody>
                                                    </table>

                                                    <p style="font-family:Helvetica,Arial,sans-serif">You're receiving
                                                        this message because of a successful <span class="il"><span
                                                                class="il"><span
                                                                    class="il">sign</span></span></span>-<span
                                                            class="il"><span class="il"><span
                                                                    class="il">in</span></span></span> from a device
                                                        that we didn’t recognize.
                                                        <b>If you believe that this <span class="il"><span
                                                                    class="il"><span
                                                                        class="il">sign</span></span></span>-<span
                                                                class="il"><span class="il"><span
                                                                        class="il">in</span></span></span> is
                                                            suspicious,
                                                            <a href="${resetPasswordLink}"
                                                                target="_blank"
                                                                data-saferedirecturl="https://www.google.com/url?q=${resetPasswordLink}">please
                                                                reset your password immediately.</a></b>
                                                    </p>

                                                    <p>
                                                        If you're aware of this <span class="il"><span class="il"><span
                                                                    class="il">sign</span></span></span>-<span
                                                            class="il"><span class="il"><span
                                                                    class="il">in</span></span></span>, please disregard
                                                        this notice. This can happen when you use your browser's
                                                        incognito or private browsing mode or clear your cookies.
                                                    </p>

                                                    <p style="font-family:Helvetica,Arial,sans-serif">
                                                        Thanks,<br><br>
                                                        Venue biz Team
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" height="20"></td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" style="text-align:center">
                                                    <span
                                                        style="font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#cccccc">This
                                                        message was sent from Venue pvt ltd,
                                                        India</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="20"></td>
                            </tr>
                            <tr>
                                <td colspan="3" height="20"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td height="50">

                </td>
            </tr>
        </tbody>
    </table>
</main>
<footer></footer>

</html>`;
};

const verifyEmailTemplate = ({userName,verifyLink}) => {

    return `<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div style="background-color:#f8f9fa;padding:24px 24px 0">
        <div style="margin-left:auto;margin-right:auto;max-width:580px">
            <div style="background-color:#fff;border-bottom:1px solid #dadce0;padding:36px 36px 64px">
                <div style="text-align:center">
                    <h2 style="font-family:arial; font-weight:900;font-size: 40px;">Venue biz</h2>
                </div>
                <div style="margin-top:24px">
                    <div
                        style="font-weight:700;text-align:center;font-family:'Open Sans',Roboto,Arial,sans-serif;font-style:normal;letter-spacing:0.1px;color:#202124;font-size:24px;line-height:130%">
                        Verify your email address</div>
                    <p
                        style="margin-top:24px;font-family:'Open Sans',Roboto,Arial,sans-serif;font-style:normal;letter-spacing:0.1px;color:#3c4043;font-size:16px;line-height:150%;font-weight:400">
                        Hi ${userName},</p>
                    <p
                        style="margin-top:24px;font-family:'Open Sans',Roboto,Arial,sans-serif;font-style:normal;letter-spacing:0.1px;color:#3c4043;font-size:16px;line-height:150%;font-weight:400">
                        You're just one step away from completing your registration with Venue Biz. To ensure the
                        security of your account, please verify your email address by clicking the link below:
                    </p>
                    <table style="margin-top:24px;background-color:#e8f0fe;height:178px;width:100%">
                        <tbody>
                            <tr
                                style="font-weight:700;font-family:'Open Sans',Roboto,Arial,sans-serif;font-style:normal;letter-spacing:0.1px;color:#3c4043;font-size:24px;line-height:100%">
                                <td align="center">
                                <a href="${verifyLink}"
                                        style="font-family:Arial, Helvetica, sans-serif;text-decoration: none; color:green">Click
                                        here
                                </a></td>
                            </tr>
                        </tbody>
                    </table>
                    <p
                        style="margin-top:24px;font-family:'Open Sans',Roboto,Arial,sans-serif;font-style:normal;letter-spacing:0.1px;color:#3c4043;font-size:16px;line-height:150%;font-weight:500">
                        Not sure why you received this?</p>
                    <p
                        style="margin-top:24px;font-family:'Open Sans',Roboto,Arial,sans-serif;font-style:normal;letter-spacing:0.1px;color:#3c4043;font-size:16px;line-height:150%;font-weight:400">
                        Someone is trying to
                        <span class="il"><span class="il">create</span></span> a Venue biz
                        <span class="il"><span class="il">account</span></span> with this email address. If this is not
                        you, to protect your <span class="il"><span class="il">account</span></span>, do not forward
                        this email or give this code to anyone.
                    </p>
                    <p
                        style="margin-top:24px;font-family:'Open Sans',Roboto,Arial,sans-serif;font-style:normal;letter-spacing:0.1px;color:#3c4043;font-size:16px;line-height:150%;font-weight:400">
                        Venue biz team</p>
                </div>
            </div>
            <div style="padding:24px 16px">
                <div style="text-align:center">
                    <h4 style="font-family:Arial, Helvetica, sans-serif">Venue biz</h4>
                </div>
                <div style="padding:10px">
                    <p
                        style="text-align:center;font-weight:400;font-family:'Roboto',Open Sans,Arial,sans-serif;font-size:12px;font-style:normal;letter-spacing:0.3px;line-height:133%;color:#5f6368">
                        © 2025 Venue biz, Prayagraj, UP 211002, IN</p>
                </div>
            </div>
        </div>
    </div>
</body>

</html>`
}

const userSignupTemplate  = (userName) => {

    return `
    <div style="background-color:#f8f9fa;padding:24px 24px 0">
        <div style="margin-left:auto;margin-right:auto;max-width:580px">
            <div style="background-color:#fff;border-bottom:1px solid #dadce0;padding:36px 36px 64px">
                <div style="text-align:center">
                    <h2 style="font-family:arial; font-weight:900;font-size: 40px;">Venue biz</h2>
                </div>
                <div style="margin-top:24px">

                    <p
                        style="margin-top:24px;font-family:'Open Sans',Roboto,Arial,sans-serif;font-style:normal;letter-spacing:0.1px;color:#3c4043;font-size:16px;line-height:150%;font-weight:400">
                        Hi ${userName},</p>
                    <p
                        style="margin-top:24px;font-family:'Open Sans',Roboto,Arial,sans-serif;font-style:normal;letter-spacing:0.1px;color:#3c4043;font-size:16px;line-height:150%;font-weight:400">
                        Welcome to venue biz! Your account is now active. To log in, simply use your email and
                        password.
                    </p>
                    <p
                        style="margin-top:24px;font-family:'Open Sans',Roboto,Arial,sans-serif;font-style:normal;letter-spacing:0.1px;color:#3c4043;font-size:16px;line-height:150%;font-weight:400">
                        <span>
                            Thanks and Regards
                        </span><br />Venue biz team
                    </p>
                </div>
            </div>
            <div style="padding:24px 16px">
                <div style="text-align:center">
                    <h4 style="font-family:Arial, Helvetica, sans-serif">Venue biz</h4>
                </div>
                <div style="padding:10px">
                    <p
                        style="text-align:center;font-weight:400;font-family:'Roboto',Open Sans,Arial,sans-serif;font-size:12px;font-style:normal;letter-spacing:0.3px;line-height:133%;color:#5f6368">
                        © 2025 Venue biz, Prayagraj, UP 211002, IN</p>
                </div>
            </div>
        </div>
    </div>
`
}

module.exports = { userSignupTemplate, loginTemplate, verifyEmailTemplate };