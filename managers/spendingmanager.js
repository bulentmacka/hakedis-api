const EntityManager = require("./entitymanager")

class SpendingManager extends EntityManager{

    getAll = async(paymentId) => await this.getAllEntities('spendings','paymentId',paymentId)

    getById = async(id)=> await this.getByIdEntity('spendings',id)    

    add = async(paymentId,year,month,amount)=>  await this.addEntity('spendings',
                                                        [   {key:'paymentId',value:paymentId},
                                                            {key:'year',value:year},
                                                            {key:'month',value:month},
                                                            {key:'amount',value:amount}
                                                        ])    

    delete = async(id)=> await this.deleteEntity('spendings',id)

    update = async(id,amount)=> await this.updateEntity('spendings',id,  
                                                            [
                                                                {key:'amount',value:amount}                                                
                                                            ]
                                                        )
    
}

module.exports = SpendingManager