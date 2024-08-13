// const userModel = require("../models/userSchema");

// module.exports.getALLUsers = async (req, res) => {
//   try {
//     const userslist = await userModel.find();
//     res.status(200).json(userslist);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports.addUserClient = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { nom, prenom, email, password } = req.body;
//     const roleclient = "client"
//     const user = new userModel({nom , prenom , email , password , role: roleclient});
//     const useradded = await user.save()
//     res.status(200).json();
//   } catch (error) {
//     res.status(500).json({ useradded });
//   }
// };

// module.exports.addUserAdmin = async (req, res) => {
//   try {
//     console.log(req.body);

//     const { nom, prenom, email, password } = req.body;

//     const role = "admin";

//     res.status(200).json();
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const userModel = require("../models/userSchema");

module.exports.getAllUsers = async (req, res) => {
  try {
    const usersList = await userModel.find();
    res.status(200).json({ usersList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.triUsers = async (req, res) => {
  try {
    const usersList = await userModel.find().sort({ age: -1 });
    res.status(200).json({ usersList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.searchUserByName = async (req, res) => {
  try {
    // console.log(req.query.prenom); http://localhost:5000/auth/searchUserByName?prenom=lil&nom=naffeti
    // const { prenom } = req.query;

    const { prenom } = req.body;

    // const { prenom } = req.params;

    //const nom  = req.query.nom;
    const usersList = await userModel.find({
      prenom: { $regex: prenom, $options: "i" },
    });
    res.status(200).json({ usersList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    //const id = req.params.id

    const user = await userModel.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addUserClient = async (req, res) => {
  try {
    console.log(req.body);
    const { nom, prenom, email, password } = req.body;
    const roleClient = "client";
    const user = new userModel({
      nom,
      prenom,
      email,
      password,
      role: roleClient,
    });
    const useradded = await user.save();
    res.status(201).json(useradded);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addUserClientwithImg = async (req, res) => {
  try {
    console.log(req.body);
    const { nom, prenom, email, password } = req.body;
    const { filename } = req.file;
    const roleClient = "client";
    const user = new userModel({
      nom,
      prenom,
      email,
      password,
      role: roleClient,
      image_user: filename,
    });
    const useradded = await user.save();
    res.status(201).json(useradded);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addUserAdmin = async (req, res) => {
  try {
    console.log(req.body);
    const { nom, prenom, email, password } = req.body;
    const roleClient = "admin";
    const user = new userModel({
      nom,
      prenom,
      email,
      password,
      role: roleClient,
    });
    const useradded = await user.save();

    res.status(200).json(useradded);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    //const id = req.params.id

    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("User not found");
    }

    const user = await userModel.findByIdAndDelete(id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const { id } = req.params;
    const { nom, prenom, age } = req.body;

    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("User not found");
    }

    if (age >= 100 && age <= 0) {
      throw new Error("problem age");
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: { nom, prenom, age },
      },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.searchUserByNameSort = async (req, res) => {
  try {
    const { prenom } = req.body;

    const usersList = await userModel
      .find({
        prenom: { $regex: prenom, $options: "i" },
      })
      .sort({ age: -1 });
    res.status(200).json({ usersList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
