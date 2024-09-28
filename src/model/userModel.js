import mongoose from './../MongoDb/dbClient.js';


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verificationCode: String
},{
    timestamps: true,
    collection:"User"
});



export default new mongoose.model('User', userSchema);

