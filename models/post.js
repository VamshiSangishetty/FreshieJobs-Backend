const mongoose=require("mongoose")

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    // meta:{
    //     type:String,
    //     required:true,
    //     trim: true
    // },
    // slug:{
    //     type:String,
    //     required:true,
    //     trim: true,
    //     unique:true
    // },
    image:{
        type:String,
        required:true,
        trim: true
    },
    description:{
        type:String,
        trim: true
    },
    company:{
        type:String,
        required:true,
        trim: true
    },
    role:{
        type:String,
        required:true,
        trim: true
    },
    qualification:{
        type:String,
        required:true,
        trim: true
    },
    skills:{
        type:String,
        required:true,
        trim: true
    },
    batch:{
        type:String,
        required:true,
        trim: true
    },
    jobType:{
        type:String,
        required:true,
        trim: true
    },
    salary:{
        type:String,
        required:true,
        trim: true
    },
    location:{
        type:String,
        required:true,
        trim: true
    },
    link:{
        type:String,
        required:true,
        trim: true
    }
},{
    timestamps:true
});

module.exports= mongoose.model("post",postSchema);