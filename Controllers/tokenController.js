const token = require("../Models/tokenModel")

exports.createToken = async (req, res) => {
    try {
        const { refreshtoken, accesstoken } = req.body;

       
        const existingToken = await token.findOne();

        if (existingToken) {
          
            return res.status(400).json({ error: 'Token already exists' });
        }

       
        const newToken = await token.create({
            refreshtoken: refreshtoken,
            accesstoken: accesstoken,
        });

        res.status(201).json({
            status: "success",
            data: newToken
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.Findtoken = async (req, res) => {
    try {
        let findtoken = await token.find()
        res.status(200).json({
            message: "success",
            findtoken
        })
    }
    catch (err) {
        console.log(err);
    }
}


exports.updateToken = async (req, res) => {
    try {
        const { refreshtoken, accesstoken } = req.body;
        const existingToken = await token.findById(req.params.id)

        if (existingToken) {
            const newToken = await token.findByIdAndUpdate(req.params.id,{
                refreshtoken: refreshtoken,
                accesstoken: accesstoken,
                expiretime:() => new Date(Date.now() + 55 * 60 * 1000)
            },{ new: true, runValidators: true })
            res.status(200).json({
                status: "success",
                data: newToken
            });
            
        }else{
            res.status(404).json({ error: 'Invalid Request' });
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
