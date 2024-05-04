const EntityManager = require("./entitymanager")

class RealizationManager extends EntityManager{

    getAllForCategory = async(paymentId,categoryId)=> {          

            const result = await this.runSqlScript(`select *,
                                        (select productNumber from products where id = realizations.productId) productNumber,
                                        (select name from products where id = realizations.productId) productName,
                                        (select unit from products where id = realizations.productId) unit,
                                        (select percent from products where id = realizations.productId) productPercent
                                        from realizations where paymentId=${paymentId} and 
                                        productId in (select id from products where categoryId=${categoryId})`
                                    )
            return result[0]
    }

    getCategoryIds=(categories)=> {
        //console.log(categories)
        let result = '('
        categories.map(category=>{
                result += categories.indexOf(category) != categories.length - 1 ? category.id + ',' : category.id
        })

        result += ')'
        //console.log(result)
        return result
    }

    getAllForCategories = async(paymentId,categoryIds)=> {                  

            const result = await this.runSqlScript(`select *,
            (select categoryId from categories where id=(select categoryId from products where id=realizations.productId)) categoryId,
            (select productNumber from products where id = realizations.productId) productNumber,
            (select name from products where id = realizations.productId) productName,
            (select unit from products where id = realizations.productId) unit,
            (select percent from products where id = realizations.productId) productPercent
            from realizations where paymentId=${paymentId} and 
            productId in (select id from products where categoryId in (${categoryIds}))`)

            return result[0]   

    }

    getAllForPayment = async(paymentId)=> {       

            const result = await this.runSqlScript(`SELECT *,
            (select productNumber from products where id = realizations.productId) productNumber,
            (select name from products where id = realizations.productId) productName,
            (select unit from products where id = realizations.productId) unit,
            (select percent from products where id = realizations.productId) productPercent
            from realizations where paymentId=${paymentId} and 
            productId in (select id from products where categoryId in 
            (select id from categories where fileId=(select fileId from payments where id = ${paymentId})))`)
                
            return result[0]   

    }

    getAllForFile = async(fileId)=> {           

            const result = await this.runSqlScript(` SELECT *,
            (select productNumber from products where id = realizations.productId) productNumber,
            (select name from products where id = realizations.productId) productName,
            (select unit from products where id = realizations.productId) unit,
            (select percent from products where id = realizations.productId) productPercent
            from realizations where paymentId in (select id from payments where fileId=${fileId}) and 
            productId in (select id from products where categoryId in 
            (select id from categories where fileId=${fileId}))`)

            return result[0]    
    }

    getById = async(id)=> await this.getByIdEntity('realizations',id)            
   

    add = async(paymentId,productId,percent)=>{

        const result = await this.addEntity('realizations',[ {key:'paymentId',value:paymentId},
                                                            {key:'productId',value:productId},
                                                            {key:'percent',value:percent}
                                                          ])
        return result


    }

    delete = async(id)=> await this.deleteEntity('realizations',id)

    update = async(id,percent)=> await this.updateEntity('realizations', id, [{key:'percent',value:percent}])

    updateRange = async(data)=> data.map(async item => await this.update(item.id,item.percent))
    
}

module.exports = RealizationManager