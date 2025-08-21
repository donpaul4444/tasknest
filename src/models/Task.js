import { model, models, Schema } from "mongoose";


const taskSchema= new Schema(
    {
        columnId:{
            type:Schema.Types.ObjectId,
            ref:"Column",
            required:true
        },
        title:{
            type:String,
            required:true
        },
        description:String,
        assignedTo:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:false
        },
        priority:{
            type:String,
            enum:["low","medium","high"],
            default:"low",
        },
        status:{
            type:String,
            enum:["todo","in-progress","review","done"],
            default:"todo"
        }
    },{
        timestamps:true
    }
)

export default models.Task || model("Task",taskSchema)
