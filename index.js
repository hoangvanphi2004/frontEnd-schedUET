import express from "express";


const app = express();

app.use('/admin',express.static('admin'))
app.use('/user', express.static('user'))
app.use('/login', express.static('Login'))
app.use('/bootstrap', express.static('bootstrap'))

app.listen(8001, () => {
    console.log("listening on port 8001")
})
