const EntityManager = require("./entitymanager");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AccountManager extends EntityManager{

    login = (email,password) => {                 

            this.connection.query('select * from users where email=?',[email],async(err,result)=> {

                if (err) throw err

                const user = result[0]

                if (user) {                
                    const confirmPassword = await bcrypt.compare(password,user.password)
                    if (confirmPassword){                         
                        const token = jwt.sign(JSON.stringify(user),'benim guzel keyim')  
                        this.response.header('x-auth-token',token).send('token eklendi..')                  
                    } else  
                            this.response.status(401).send('hatalı parola')
                } else                
                        this.response.status(401).send('kullanıcı bulunamadı!')
            })

            
      
    }



}

module.exports = AccountManager