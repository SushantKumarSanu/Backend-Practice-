import Chat from '../../models/Chat.js';

export const createChat = async (req,res)=>{
    try{
        const {user} = req.body;
        if(!user) return res.status(400).json({message:"UserId is required"});
        const chatExist = await Chat.findOne({users:{$all:[req.userId,user]}});
        if(chatExist){
            return res.status(200).json({
                message:"chat already exists",
                chat: chatExist._id
            });
        };
        const chat = await Chat.create({
            users:[req.userId,user]
        });
        res.status(201).json({
            message:"chat is created",
            chat: chat._id
        });
    }catch(error){
        console.error("something is wrong as ",error.message);  
    };
};

export const fetchChats = async (req,res) =>{
    try{
        const chats = await Chat.find({users:req.userId})
        .populate("users","-password")
        .populate("lastMessage")
        .sort({updatedAt:-1});
        if(chats.length===0) return res.status(404).json({message:"conversation is not initiated with any one yet"});
        res.status(200).json(chats);
    }catch(error){
        console.error(error.message);
    }
}
