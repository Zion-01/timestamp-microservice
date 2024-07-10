const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/:date?", (req, res) => {
    let dateParam = req.params.date;
    let date;

    if (!dateParam) {
        date = new Date();
    } else {
        if (!isNaN(dateParam)) {
            dateParam = parseInt(dateParam);
        }
        date = new Date(dateParam);
    }

    if (date.toString() === "Invalid Date") {
        res.json({ error: "Invalid Date" });
    } else {
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString(),
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
