import mongoose from "mongoose";

const connectToDo = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("connected to db successfully");
  } catch (error) {
    console.log("error while connecting to Db", error);
  }
};

export default connectToDo;
