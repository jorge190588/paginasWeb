
class Chat{

    getViewChat(req,res)
    {
        res.render('chat/chat',{title:'Chat'});
    }
}

module.exports = Chat;