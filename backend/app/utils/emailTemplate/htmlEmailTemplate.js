const userSignupTemplate = (data) => {

    const { receiverEmail, timestamp, ipAddress, resetPasswordLink } = data;

    return `
                <html>
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

module.exports = { userSignupTemplate };