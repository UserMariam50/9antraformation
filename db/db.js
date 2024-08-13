// //conf de bd
// const mongoose = require('mongose');//jibli haki(mongoose) min mongoose
// //RQ:moteur de template hiya extension jaya lil back bech twafr partie front 
// module.exports.connectToMongoDB =async ()=>{
//     mongoose.set('strictQuery',false);
//     mongoose.connect(process.env.URL_MONGO).then(
//         ()=>{console.log('connect to DB')}
//     ).catch((err)=>{console.log(err)});//afficher chnouwa l'erreur
// };

const mongoose = require("mongoose");

module.exports.connectToMongoDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.URL_MONGO)
    .then(() => {
      console.log("connect to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};