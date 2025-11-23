

import mongoose from "mongoose";

export const connectDB = () => {

    const MongooseUrl: string = process.env.MONGOO_URL || "";  // if no MONGOO_URL in .env so empty string
    console.log("Mongoo Db connecting");
    mongoose.connect(MongooseUrl).then(() => {
        console.log("DB connected");
    })
        .catch(err => {
            console.log("Error in connection " + err);
        });
}