import mongoose from 'mongoose';


const incomeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    type:{
        type:String,
        default: "income",
    },
},{
    timestamps: true
});

const incomeModel = mongoose.models.income || mongoose.model("income",incomeSchema);

export default incomeModel;