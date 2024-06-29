import express from "express";
import { Request, Response } from "express";
import * as os from "os";

const app = express();
const port = process.env.PORT || 8000;

app.get("/api/hello", (req: Request, res: Response) => {
  const visitorName = req.query.visitor_name || "Visitor";
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  res.json({
    client_ip: clientIp,
    greeting: `Hello, ${visitorName}!`,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
