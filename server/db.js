import * as mongoose from 'mongoose';

const mongoURI = "mongodb://0.0.0.0:27017/UserManagementDB";

const connectToMongo = async () => {
  try {
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error);
  }
};

await connectToMongo();
export default connectToMongo;