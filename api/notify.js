export default async function handler(req, res) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const page = req.query.page || "/";
    const referrer = req.headers.referer || "Direct / Unknown";
    const userAgent = req.headers["user-agent"] || "Unknown device";

    const text = `🔔 NEW VISITOR (DEMO)\n\nWebsite: BUFORD BONDS DEMO\nPage: ${page}\nReferrer: ${referrer}\nDevice: ${userAgent}\nTime: ${new Date().toISOString()}`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: text })
    });

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(200).json({ ok: false });
  }
}
