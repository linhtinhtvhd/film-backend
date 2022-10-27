import mongoose from "mongoose"

export class Database {
    constructor(){}
    Connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://linhtinhthhd:Nhucuthoi123@sanbox.mxghrfd.mongodb.net/Film')

        console.log("Connect successfully!!!")
    } catch (error) {
        console.log("Connect fail!!!")
    }
}
}