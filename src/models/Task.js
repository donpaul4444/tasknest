import { model, models, Schema } from "mongoose";


const taskSchema= new Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:String,
        assignedTo:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        priority:{
            type:String,
            enum:["low","medium","high"],
        },
        status:{
            type:String,
            enum:["todo","in-progress","review","done"],
        },
        projectId:{
            type:Schema.Types.ObjectId,
            ref:"Project",
            required:true,
        }
    },{
        timestamps:true
    }
)

export default models.Task || model("Task",taskSchema)
