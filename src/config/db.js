import mongoose from 'mongoose';
import colors from 'colors';


const connectDB = async () => {

    try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(
        `Conneted To Mongodb Databse Successfully... ${conn.connection.host}`.bgMagenta.white
      );
    } catch (error) {
      console.log(`Connection Errro in Mongodb ${error}`.bgRed.red);
    }
  
  
  };
  
  //! module.exports = connectDB;
  export default connectDB;