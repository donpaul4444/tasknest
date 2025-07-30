import {Schema,model,models} from 'mongoose'

const ProjectSchema = new Schema(
    {
        title:{
            type:String,
            required:[true,"Project title is required"],
        },
        description:{
            type:String,
        },
        createdBy:{
            type:String,
            required:true,
        },
    },
    {timestamps:true}
)

const Project =models.Project || model("Project",ProjectSchema)
export default Project