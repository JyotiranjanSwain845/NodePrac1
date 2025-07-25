const User = require('../Model/User')

function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    User.create({
        name : name,
        email : email,
        password : password
    }).then(()=>{
        res.status(201).json({ message: 'User created successfully' });
    })
    .catch((err)=>{
        res.status(500).json({ message: 'failed to signup' });
    });
}

async function handleUserSignin(req,res){
    const {email,password} = req.body;
    const user = await User.findOneById({"email":email})
    if(user_mail!=user.email) throw new Error();

    res.redirect('/');
}

async function getAllUsers(req,res){
    const allUsers = await User.find({})
    if(allUsers.length==0) res.json({msg:"No Users Exist yet"})
    res.status(200).json(allUsers);
}

async function getUserById(req,res) {
    const userId = req.params.id;
    const userById = await User.findById(userId)
    if(!userById) res.status(404).json({msg:"Not found"})
    res.status(200).json({userById});
}

function updateUserById(req,res){
    const userId = req.params.id;
    const {name,email} = req.body;
    User.findOneAndUpdate({"_id":userId},{name,email})
    .then(()=>console.log('updated successfully'))
    .catch((err)=>console.log(err))
}

function deleteUserById(req,res){
    const userId = req.params.id;
    User.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).json({msg:"user removed"})
    }).catch(()=>{
        res.json({msg:'some error occured!'})
    })
}




module.exports = {handleUserSignup,handleUserSignin,getAllUsers,getUserById,updateUserById,deleteUserById};