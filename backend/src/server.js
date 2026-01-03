import express from "express"

const app = express();

app.listen(PORT, () =>{
    console.log(`Started to localhost:${PORT}`);
});