
import express from "express";

export const user = express();
user.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: "Dashboard loads successfull"
    })
});


//should on different route file
user.post('/app/v1/add', (req, res) => {
    res.status(200).json({
        message: "Added"
    })
});


user.delete('/app/v1/delete', (req, res) => {
    res.status(200).json({
        message: "Deleted"
    })
});

user.patch('/app/v1/update', (req, res) => {
    res.status(200).json({
        message: "Updated"
    })
});