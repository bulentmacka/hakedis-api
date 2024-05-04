
class EntityManager{
    constructor(){     
        this.pool = require('../connection')
    }

    getAllEntities = async(tableName,field,value)=> {

        const connection = await this.pool.getConnection()
        try {
                const sql = field ? `select * from ${tableName} where ${field}=${value}`: `select * from ${tableName}` 
                
                console.log(sql)
                
                const [result] = await connection.execute(sql)   
                
                return result
            
        } catch (error) {
            console.log('hata',error)
        }
        finally{
            connection.release()
        }
    }

    getByIdEntity = async(tableName,id)=> {

        const connection = await this.pool.getConnection()

        try {
                const sql = `select * from ${tableName} where id=${id}`      
                const [result] = await connection.execute(sql)   
                return result[0]
            
        } catch (error) {
            console.log(error)                    
        }

        finally{
            connection.release()
        }  

    }

    getByKeyEntity = async(tableName,key,value)=> {

        const connection = await this.pool.getConnection()

        try {
            const keyValue = typeof value == "string" ? "'" + value + "'" : value
            const sql = `select * from ${tableName} where ${key}=${keyValue}`      
            const [result] = await connection.execute(sql)   
            return result[0]
            
        } catch (error) {
            console.log(error)                    
        }

        finally{
            connection.release()
        }  

    }

    deleteEntity = async(tableName,id)=> {

    const connection = await this.pool.getConnection()

    try {
            const sql = `delete from ${tableName} where id=${id}`      
            const [result] = await connection.execute(sql)   
            return result        
        } catch (error) {
            console.log(error) 

        } finally{
            connection.release()
        } 
    }

    updateEntity = async(tableName,id,data)=>{

        let columnValues = ''
        data.map(item => {
            columnValues += data.indexOf(item) != data.length - 1 ? `${item.key}=${item.value} , ` :
                                                                    `${item.key}=${item.value}`
        })

        const sql = `update ${tableName} set ${columnValues} where id=${id}`
        console.log(sql)
        const connection = await this.pool.getConnection()

        try {
            const result = await connection.execute(sql)
            return result                
        } catch (err) {
            console.log('hata',err)                
        } finally {
            connection.release()
        }
    }


    addEntity = async(tableName,data)=>{

        let keys = ''
        let values = ''
        data.map(item => {
            keys += data.indexOf(item) != data.length - 1 ?  item.key + ',' : item.key
            values += data.indexOf(item) != data.length - 1 ? item.value + ',': item.value
        })

        const sql = `insert into ${tableName}(${keys}) values(${values})`

        const connection = await this.pool.getConnection()

        try {
            const result = await connection.execute(sql)
            return result                
        } catch (err) {
            console.log('hata',err)                
        } finally {
            connection.release()
        }
    }

    runSqlScript = async(sql) => {

                    const connection = await this.pool.getConnection()
                    try {          
                        const result = await connection.execute(sql)   
                        return result
                        
                    } catch (error) {
                        console.log('hata',error)
                    }
                    finally{
                        connection.release()
                    }
    }

}

module.exports = EntityManager

