const EntityManager = require("./entitymanager")

class ProductManager extends EntityManager{

    getAllForFile = async(fileId)=> await this.runSqlScript(`select * from products where categoryId in 
                                                            (select id from categories where fileId=${fileId})`)  

    getAllForCategory = async(categoryId)=> await this.getAllEntities('products','categoryId',categoryId)            

    getAllForCategories = async(categoryIds)=> await this.runSqlScript(`select * from products where categoryId in 
                                                                        (${categoryIds})`)            
    
    getById = async(id)=> await this.getByIdEntity('products',id)

    add = async(categoryId,productNumber,name,unit,percent) => await this.addEntity('products',
                                                                [{key:'categoryId',value:categoryId},
                                                                 {key:'productNumber',value:"'" + productNumber + "'"},
                                                                 {key:'name',value:"'" + name + "'"},
                                                                 {key:'unit',value:"'" + unit + "'"},
                                                                 {key:'percent',value:percent}])  
    

    delete = async(id)=> await this.deleteEntity('products',id)


    

    update = async(id,productNumber,name,unit,percent)=>  await this.updateEntity('products',id,
                                                           [{key:'productNumber',value:"'" + productNumber + "'"},
                                                            {key:'name',value:"'" + name + "'"},
                                                            {key:'unit',value:"'" + unit + "'"},
                                                            {key:'percent',value:percent}])


    
}

module.exports = ProductManager