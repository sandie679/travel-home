import mongoose from 'mongoose';



const {Schema}= mongoose;

const exploreSchema= new Schema({

title:{type:String,
     required:true,
    
    },


description:{type:String,
        required:true,
    },

  
    
    
    readtime:{type:String,
        required:true,
    },

    date:{type:Date,
        default:Date.now,
    },

    imageUrl:{type:String,
        required:true,
    },





})  

 export default mongoose.models.explore || mongoose.model('explore',exploreSchema);
 