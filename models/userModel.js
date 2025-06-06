import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    pass: {type: String},
});
export default mongoose.model("User", userSchema);