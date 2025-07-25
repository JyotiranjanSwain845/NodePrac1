const User = require('../Model/User')

function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    User.create({
        name : name,
        email : email,
        password : password
    }).then(()=>console.log('User Created Successfully!'))
    .catch((err)=>console.log(err));
}

async function handleUserSignin(req,res){
    const {email,password} = req.body;
    const user = await User.findOneById({"email":email})
    if(user_mail!=user.email) throw new Error();

    res.redirect('/');
}

async function getAllUsers(req,res){
    const allUsers = await User.find({})
    if(!allUsers) res.status(404).json({msg:"Not found"})
    res.status(200).json({allUsers});

}

async function getUserById(req,res) {
    const userId = req.params.id;
    const userById = await User.findById({"id":userId})
    if(!userById) res.status(404).json({msg:"Not found"})
    res.status(200).json({userById});
}

async function updateUserById(req,res){
    const userId = req.params.id;
    const {name,email} = req.body;
    await User.findOneAndUpdate({"id":userId,"name":name,"email":email})
    .then(()=>console.log('updated successfully'))
    .catch((err)=>console.log(err))
}

module.exports = {handleUserSignup,handleUserSignin,getAllUsers,getUserById,updateUserById};