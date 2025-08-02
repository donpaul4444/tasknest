import {Schema,model,models} from 'mongoose'

const ProjectSchema = new Schema(
    {
        name:{
            type:String,
            required:[true,"Project name is required"],
        },

        createdBy:{
            type:String,
            required:true,
        },
    },
)

const Project =models.Project || model("Project",ProjectSchema)
export default Project