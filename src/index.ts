import express from "express";
import { Request, Response } from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 8000;

app.get("/api/hello", async (req: Request, res: Response) => {
  const visitorName = req.query.visitor_name || "Visitor";
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    const response = await axios.get(
      `https://ipinfo.io/${clientIp}/json?token=your_ipinfo_token`
    );
    const location = response.data.city || "Unknown location";
    res.json({
      client_ip: clientIp,
      location,
      greeting: `Hello, ${visitorName}!`,
    });
  } catch (error) {
    res.json({
      client_ip: clientIp,
      location: "Unable to determine location",
      greeting: `Hello, ${visitorName}!`,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
