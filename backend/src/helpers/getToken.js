export const getToken = function(req){
    const token = req.headers.authorization.split(' ')[1];

    if(token){
        return token ;
    }else{
        return null;
    }
    
}