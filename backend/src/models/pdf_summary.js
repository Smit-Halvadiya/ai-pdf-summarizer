import mongoose,{Schema} from "mongoose"

const pdfSchema = new Schema(
    {
        
        // user_id: {
        //     type: Schema.Types.ObjectId,
        //     ref: "User"
        // },  
        original_file_url: {
            type: String
        },
        summary_text: {
            type: String,
            required: true,
        },
        status: {
            type: String
        },
        title: {
            type: String,

        },
        file_name: {
            type: String
        },
        owner: 
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
       

    },
    {
        timestamps: true
    }
)

export const PDF = mongoose.model("PDF", pdfSchema) 