import express, { json } from "express";
import cors from "cors";

import { router } from "./routes.js";

export const app = express();

app.use(json());
app.use(
	cors({
		// origin: "https://example.com"
	})
);
app.use(router);

app.listen(3_000);
