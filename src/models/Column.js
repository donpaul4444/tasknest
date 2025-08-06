import { model, models, Schema } from "mongoose";

const ColumnSchema= new Schema(
    {
        projectId:{
            type:Schema.Types.ObjectId,
            ref:"Project",
            require:true
        },
        title:{
            type:String,
            required:true
        }
    },
    {timestamps:true}
)

export default models.Column|| model("Column",ColumnSchema)