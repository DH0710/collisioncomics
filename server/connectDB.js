const mongoose = require("mongoose")

const connectDB = async () => {
try {
    mongoose.set("strictQuery", false );
    const conn = await mongoose.connect(process.env.MONGODB_URI)

} catch (err) {

}
}

module.exports = connectDB;