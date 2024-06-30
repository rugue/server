import express from "express";
import { Request, Response } from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 8000;

const IP_INFO_TOKEN = process.env.IP_INFO_TOKEN;

app.get("/api/hello", async (req: Request, res: Response) => {
  const visitorName = req.query.visitor_name || "Visitor";
  const clientIp =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
  console.log({ clientIp });

  let transformedClientIp = Array.isArray(clientIp) ? clientIp[0] : clientIp;

  console.log({ transformedClientIp });

  transformedClientIp = transformedClientIp?.split(",")[0] || "";

  console.log({ transformedClientIp });

  try {
    const response = await axios.get(
      `https://ipinfo.io/${clientIp}/json?token=${IP_INFO_TOKEN}`
    );

    console.log({ data: response?.data });

    const location = response?.data?.city || "Unknown location";

    res.json({
      client_ip: transformedClientIp,
      location,
      greeting: `Hello, ${visitorName}!`,
    });
  } catch (error) {
    console.error(error);
    // If there is an error, return a default response
    res.json({
      client_ip: transformedClientIp,
      location: "Unable to determine location",
      greeting: `Hello, ${visitorName}!`,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
