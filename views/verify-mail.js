const verifyMail = (mail,code,url) => {
    return`<div style="margin: 0 auto;padding: 1rem 0;-webkit-text-size-adjust: 100%;background-color: #eabf9f;color: #1e212d;max-width: 600px;min-width:320px">
        <img
            src="https://i.ibb.co/WfpYBpB/logomytinerary.png"
            alt="Logo" title="Logo"
            style="height: auto;max-width: 120px; Margin: 0 auto;display: block;" />
        <div style="background-color: #e5b299;width: 100%;display: block">
            <img
                src="https://wallpaperaccess.com/full/222675.jpg"
                alt="Hero Image" title="Hero Image"
                style="width: 100%;max-width: 600px;Margin: 0 auto;display: block;" />
        </div>
        <div style="display: block;width: 100%;">
            <div style="min-width: 320px;max-width: 600px;background-color: #ffffff;width:600px; margin: 0 auto;">
                <div style="padding:25px 10px 10px;
                    color: #7d5a50; line-height: 140%;
                    text-align: center; word-wrap: break-word;">
                    <p style="font-size: 14px; line-height: 140%;font-family: Cabin, sans-serif; font-size: 26px;font-weight: 600;">
                    ✈  Welcome to My Tineraries! ✈
                    </p>
                </div>
                <div style="padding:10px 40px;
                font-family:arial,helvetica,sans-serif;
                line-height: 160%; text-align: center;">
                    <p style="font-size: .8rem; line-height: 160%;">
                        Hello ${mail}, please click the button downside to verify your acount!
                    
                    </p>
                    <p style="font-size: .6rem; line-height: 160%;">
                        If you did not register in our page, just ignore this mail.
                    </p>
                </div>
                <div style="padding:10px;">
                    <a href="${url + code}" target="_blank"
                        style="font-family:arial,helvetica,sans-serif;
                        text-decoration: none;text-align: center;color: #FFFFFF;
                        background-color: #b68973;
                        border-radius: 5px;-webkit-border-radius: 4px; -moz-border-radius: 4px;font-size: 14px;padding:10px 20px;display: block;margin: 0 auto;">
                        Click me
                    </a>
                </div>
            </div>
        </div>
        <div style="display: block;width: 100%;background-color: #e5b299;">
            <div
                style="background-color: #7d5a50;min-width: 320px; width: 600px; font-family:Cabin, sans-serif; display: block;margin: 0 auto;">
                    <div style="width: 30%;display: inline-block;margin-left: 5%;">
                        <p style="font-size: 2rem; text-align: center">
                            🔮
                        </p>
                        <p style="font-size: 16px; color: #cacaca; line-height: 160%; text-align: center;">
                            Lorem Street, View lane, San Francisco, CA
                        </p>
                    </div>
                    <div style="width: 30%;display: inline-block">
                        <p style="font-size: 2rem; text-align: center;">
                            📱
                        </p>
                        <p style="font-size: 16px; color: #cacaca; line-height: 160%; text-align: center">
                            +123-456-789
                        </p>
                        <p style="font-size: 16px; color: #cacaca; line-height: 160%; text-align: center">
                            +456-789-123
                        </p>
                    </div>
                    <div style="width: 30%;display: inline-block">
                        <p style="font-size: 2rem; text-align: center">
                            📩
                        </p>
                        <p style="font-size: 16px; color: #cacaca; line-height: 160%; text-align: center">
                            travel@email.com
                        </p>
                        <p style="font-size: 16px; color: #cacaca; line-height: 160%; text-align: center">
                            contact@travel.com
                        </p>
                    </div>
            </div>
        </div>
        <div style="display: blcok;width: 100%">
            <div style="min-width: 320px; width: 600px;background-color: #7a564b;margin: 0 auto">
                <p style="font-size: 14px; color: #cacaca;text-align: center;margin: 0;padding: 1rem 0;">
                    &copy; 2022 All rights reserved&nbsp;
                </p>
            </div>
        </div>
    </div>`
}
module.exports = verifyMail