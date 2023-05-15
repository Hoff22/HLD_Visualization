import express from "express"
import path from "path"
import { fileURLToPath } from "url";

const app = express();
const buildPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "./build");

app.use(express.json());

app.get("/test", (req, res) => {
	let value = Number.parseInt(req.body.value);
	res.json(value*value);
});

app.use(express.static(buildPath));
app.get("*", (req, res) => {
	res.sendFile(path.join(buildPath, "./index.html"));
});

app.listen(8080, () => {
	console.log(path.dirname(fileURLToPath(import.meta.url)));
	console.log(buildPath);
});