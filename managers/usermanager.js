const EntityManager = require("./entitymanager");
const bcrypt = require('bcrypt')
const uuid = require('uuid')

class UserManager extends EntityManager{

    getAll = async() => this.runSqlScript('select * from users')

    getById = async(id) => await this.getByIdEntity('users',id)

    getByEmail = async(email) => await this.getByKeyEntity('users','email',email)

    add = async(username,email,password)=> {         
        
            const user = await this.getByEmail(email)            
                   
            if (user) return {warning:'Bu email zaten mevcut'}                            
                                                                         
            const hashedPassword = await bcrypt.hash(password,10)

            const addedUser = await this.addEntity('users',[{key:'id',value:"'" + uuid.v4() + "'"},
                                                            {key:'username',value:"'" + username + "'"},
                                                            {key:'email',value:"'" + email + "'"},
                                                            {key:'password',value:"'" + hashedPassword + "'"}
                                                            ])

            return addedUser                                          
                       
    }

 
}

module.exports = UserManager