const column = require("../Models/columnModal")



// req.user.userId

exports.CreateColumn=async(req,res)=>{
    try {

        const {WorkItemId,Input,Output,Log,Status,CreatedOn,JobId,EqpCount,SheetCount,ErrorType,DrawingTime,TranslationTime,SNo,User } = req.body
        const onetimepost = await column.findOne({ "Userid":req.user.userId})
        if(onetimepost){
            return res.status(401).json({
                message: "this user already post the data"
            })
        }
       
        const createColumn=await column.create({
            Userid:req.user.userId,
            SNo:SNo,
            WorkItemId: WorkItemId,
            Input: Input,
            Output: Output,
            Log: Log,
            Status: Status,
            CreatedOn: CreatedOn,
            JobId: JobId,
            EqpCount: EqpCount,
            SheetCount: SheetCount,
            DrawingTime: DrawingTime,
            TranslationTime:TranslationTime,
            ErrorType: ErrorType,
            User:User
            
        })
        createColumn.Userid=undefined
        res.status(201).json({
            status: "success",
            createColumn
        })
    } catch (err) {
        console.log(err)
    }
}
exports.FindallColumns = async (req, res) => {
    try {
        let findcolumns = await column.find({ Userid:  req.user.userId})
        res.status(200).json({
            message: "success",
            findcolumns
        })
    }
    catch (err) {
        console.log(err);
    }
}

exports.UpdateColumn = async (req, res) => {
    const {WorkItemId,Input,Output,Log,Status,CreatedOn,JobId,EqpCount,SheetCount,DrawingTime,TranslationTime,ErrorType,SNo,User } = req.body
    try {
        const onecolumn = await column.findById(req.params.id)
        if (!onecolumn) {
            return res.status(404).json({
                msg: "no column found this id"
            })
        }
        if (req.user.userId === onecolumn.Userid) {
            const editcolumn = await column.findByIdAndUpdate(req.params.id, {
            SNo:SNo,
            WorkItemId: WorkItemId,
            Input: Input,
            Output: Output,
            Log: Log,
            Status: Status,
            CreatedOn: CreatedOn,
            JobId: JobId,
            EqpCount: EqpCount,
            SheetCount: SheetCount,
            DrawingTime: DrawingTime,
            TranslationTime:TranslationTime,
            ErrorType: ErrorType,
                User:User
                
            }, { new: true, runValidators: true })
            editcolumn.Userid=undefined
            res.status(200).json({
                status:"success",
                editcolumn
            })
        }
        else {
            return res.status(400).json({
                msg: "you have no authority"
            })
        }
    } catch (err) {
        console.log(err);
    }
}
