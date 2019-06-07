
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API);



const sendMail = async(email)=>{
    const msg = {
    to: email,
    from: 'bookStore@node.com',
    subject: `The first greeting from us !`,
    html: `<h1>Congratulations on successful registration of your account on Book Store</h1>`
   };
    return await sgMail.send(msg);
}

const errorHandler = (err,req,res,next)=>{
    if(typeof(err)==='string'){
        return res.status(400).json({message:err});
    }
    if(err.name === 'UnauthorizedError'){
        return res.status(400).json({message:'Invalid token'})
    }
    return res.status(500).json({message:err.message});
};




module.exports = {
    errorHandler,
    sendMail
}
