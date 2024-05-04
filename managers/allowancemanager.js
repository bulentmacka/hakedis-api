const EntityManager = require("./entitymanager")

class AllowanceManager extends EntityManager{


    getAll = async(fileId) => await this.getAllEntities('allowances','fileId',fileId)


    getById = async(id)=> await this.getByIdEntity('allowances',id)    

    add = async(fileId,year,month,amount)=>  await this.addEntity('allowances',
                                                        [   {key:'fileId',value:fileId},
                                                            {key:'year',value:year},
                                                            {key:'month',value:month},
                                                            {key:'amount',value:amount}
                                                        ])  

    addRange = async(fileId,startYear,startMonth,endYear,endMonth)=> {  
        
        const months = this.getMonths(startYear,startMonth,endYear,endMonth)

        months.map(async month =>await this.addEntity('allowances',
        [   {key:'fileId',value:fileId},
            {key:'year',value:month.year},
            {key:'month',value:month.month},
            {key:'amount',value:0}
        ]))       

        }
                                                        
    getMonths = (startYear,startMonth,endYear,endMonth)=> {

        let data = []
        let date = new Date(startYear,startMonth - 1)
        let monthCount = 12 * endYear + endMonth - 12 * startYear - startMonth
        for (let month = 0;month <= monthCount; month ++){

            data.push({year:date.getFullYear(),month:date.getMonth() + 1})

            date.setMonth(date.getMonth() + 1)
        }

        return data

    }

    delete = async(id)=> await this.deleteEntity('allowances',id)

    update = async(id,amount)=> await this.updateEntity('allowances',id,  
                                                            [
                                                                {key:'amount',value:amount}                                                
                                                            ]
                                                        )

    updateAmounts = async(data)=>data.map(async item => await this.update(item.id,item.amount))               
                   
    
}

module.exports = AllowanceManager