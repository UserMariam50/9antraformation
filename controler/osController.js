const os = require('os ');


module.exports.getOsInformation = (req,res)=>{
    try{
        const osInformation={
            hostname: os.hostname(),
            type: os.type(),
            platform: os.platform(),
        }

        if(!iosInformatio)
        {
            throw new Error("there is no os information")
        }



        res.status(200).json("test");
    } catch(error){
        res.status(500).json({message : error.message});

    }

} 