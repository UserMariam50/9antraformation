// //corriger il ya erreur

// const { stringify } = require("jade/lib/utils");
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     nom: { type: string, required: true }, //nom et prenom 2 methode different
//     prenom: string,
//     email: { type: string, required: true, unique: true },
//     password: { type: string, required: true },
//     image_user: { type: string, defaultValue: "Client.png" },
//     role: { type: string, enum:[ "admin", "client"]},
//     etat:{type:booleen,}
//   },
//   { timestamps: true }
// ); //tetsna3 compte fi app  direct fi bd
// //pre w post 9bal mtetsajel w ba3d bthanya
// //crypter ntajem traje3ha 3adi il ya un cle hashage matarja3ch mdp 3adi pas de double sence

// userSchema.post("save",async function(req,res,next)
// {

//     console.log("new user was created & saved successfuly");
//     next();
// };
// userSchema.pre("save",async function(req,res,next)
// {
//     try{
//         const salt = await bcrypt.genSalat();
//         const User = this;//capter notre data par this
//         User.password = await bcrypt.hash(User.password,salt);
//         User.etat = false;
//         next();
//     }catch (err){
//         next(err);
//     }
// });


// const User = mongoose.model("user",userSchema);
// module.exports = User;


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image_user: { type: String, default: "Client.png" },
    role: { type: String, enum: ["admin", "client"] },
    etat: { type: Boolean },
    age: { type: Number },
  },
  { timestamps: true }
);

userSchema.post("save", function (req, res, next) {
  console.log("new user was created & saved successfully");
  next();
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const User = this;
    User.password = await bcrypt.hash(User.password, salt);
    User.etat = false;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;