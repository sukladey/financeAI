import incomeModel from "../models/incomeModel.js";
import XLSX from 'xlsx';
import getDateRange from '../utils/dataFilter.js';


//add income
export async function addIncome(req,res) {
    const user = req.user._id;
    const {title, amount, category, date} = req.body;

    try {
     if(!title || !amount || !category || !date){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
     }   
     const newIncome = new incomeModel({
        user,
        title,
        amount,
        category,
        date: new Date(date)

     });
     await newIncome.save();
     res.json({
        success: true,
        message: "Income added successfully"
     });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        });
    }
}

//to get income

export async function getAllIncome(req,res) {
    const user = req.user._id;
    try {
        const incomes = await incomeModel.find({user}).sort({date: -1});
        res.json(incomes);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        });
    }
}

//update an income

export async function updatedIncome(req,res) {
    const {id} = req.params;
    const user = req.user._id;
    const {title,amount} = req.body;

    try {
        const updatedIncome = await incomeModel.findOneAndUpdate(
            {_id: id, user},
            {title,amount},
            {new:true}
        );

        if(!updatedIncome){
            return res.status(404).json({
                success: false,
                message: "Income not found"
            });

        }

        res.json({
            success:true, 
            message:"Income updated successfully",
            date:updatedIncome
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        });
    }
}

// to delete an income

export async function deleteIncome(req,res) {
    try {
        const incomes = await incomeModel.findByIdAndDelete({_id: req.params.id});
        if(!incomes){
            return res.status(404).json({
                success: false,
                message: "Income not found"
            });
        }
        return res.json({
                success: true,
                message: "Income deleted Successfully"
            });
    }
     catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        });
    }
}

//to download the data in an excel sheet

export async function downloadIncomeExcel(req,res) {
    const user = req.user._id;
    try {
        const incomes = await incomeModel.find({user}).sort({date: -1});
        const plainData = incomes.map((inc) => ({
             title: inc.title,
             amount: inc.amount,
             category: inc.category,
             date: new Date(inc.date).toLocaleDateString(),
    }));

        const worksheet = XLSX.utils.json_to_sheet(plainData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook,worksheet,"incomeModel");

        const filePath = "income_details.xlsx";
        XLSX.writeFile(workbook,filePath);

        res.download(filePath);
        // if(!income){
        //     return res.status(404).json({
        //         success: false,
        //         message: "Income not found"
        //     });
        // }
        // return res.json({
        //         success: true,
        //         message: "Income deleted Successfully"
        //     });

    

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        });
    }
 }



// to get income overview

export async function getIncomeOverview(req,res) {
    try {
        const user = req.user._id;
        const {range = "monthly"} = req.query;
        const {start, end} = getDateRange(range);
        
        const incomes = await incomeModel.find({
            user,
            date: {$gte: start, $lte: end},
        }).sort({date: -1 });


        

        const totalIncome = incomes.reduce((acc, cur) => acc + cur.amount, 0);
    
        const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;

        const numberOfTransactions = incomes.length;

        const recentTransactions = incomes.slice(0, 9);



        // if(!income){
        //     return res.status(404).json({
        //         success: false,
        //         message: "Income not found"
        //     });
        // }
        res.json({
                success: true,
                data:{
                    totalIncome,
                    averageIncome,
                    numberOfTransactions,
                    recentTransactions,
                    range
                }
            });
    }
     catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        });
    }
}
