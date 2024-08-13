// const os = require('os');


// module.exports.getOsInformation = (req,res)=>{
//     try{
//         const osInformation={
//             hostname: os.hostname(),
//             type: os.type(),
//             platform: os.platform(),
//         }

//         if(!iosInformatio)
//         {
//             throw new Error("there is no os information")
//         }



//         res.status(200).json("test");
//     } catch(error){
//         res.status(500).json({message : error.message});

//     }

// } 

const os = require("os");

module.exports.getOsInformation = (req, res) => {
  try {
    const osInformation = {
      hostname: os.hostname(),
      type: os.type(),
      platform: os.platform(),
    };

    if (!osInformation) {
      throw new Error("there is no OS information available");
    }

    res.status(200).json(osInformation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.osCpus = (req, res) => {
  try {
    const osCpus = os.cpus();
    if (!osCpus) {
      throw new Error("no cpus was found!");
    }
    res.status(200).json(osCpus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.osCpusById = (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(parseInt(id))) {
      throw new Error("you must provide a Number!");
    }
    const osCpus = os.cpus();
    if (!osCpus) {
      throw new Error("no cpus was found!");
    }
    if (id < 0 || id > osCpus.length - 1) {
      throw new Error("you must provide a valid id");
    }
    res.status(200).json(osCpus[id]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.osCpuslength = (req, res) => {
  try {
    const osCpus = os.cpus();
    if (!osCpus) {
      throw new Error("no cpus was found!");
    }
    const number = osCpus.length;
    res.status(200).json(number);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.xxx = (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};