const EntityManager = require("./entitymanager")

class PaymentManager extends EntityManager{


    getAll = async(fileId) => await this.getAllEntities('payments','fileId',fileId)

    getPreviousPaymentId = async(id)=> {

            const [result] = await this.runSqlScript(`select max(id) previousId from payments where id<${id} 
                                     and fileId=(select fileId from payments where id=${id})`)                   

            return result[0].previousId
    }

    getPreviousAndThis = async(id)=> {

            const result = await this.runSqlScript(`select * from payments where id<=${id} and 
                                                    fileId=(select fileId from payments where id=${id})`)
            
            return result[0]

    }

    getById = async(id)=> await this.getByIdEntity('payments',id)    

    add = async(fileId,paymentNumber,startDate,endDate)=> {  
        const [payment] = await this.addEntity('payments',[   {key:'fileId',value:fileId},
                                            {key:'paymentNumber',value:"'" + paymentNumber + "'"},
                                            {key:'startDate',value:"'" + startDate + "'"},
                                            {key:'endDate',value:"'" + endDate + "'"}
                                        ])
        //console.log('insertId',payment.insertId)
        const insertId = payment.insertId
        const previousPaymentId = await this.getPreviousPaymentId(insertId)

        if (previousPaymentId == null) await this.getRealizationsForFirstPayment(insertId)
                                        else await this.getRealizationsForPayment(insertId)
        
        return payment

        }
    getRealizationsForFirstPayment = async(id) => {       
        
        const payment = await this.getByIdEntity('payments',id)
        const file = await this.getByIdEntity('files',payment.fileId)
        const ProductManager = require('./productmanager')
        const productManager = new ProductManager()
        const [products] = await productManager.getAllForFile(file.id)
        const RealizationManager = require('./realizationmanager')
        const realizationmanager = new RealizationManager()
        products.map(product => {
            realizationmanager.add(id,product.id,0)
        })
        
        return products
        
    } 
    
    getRealizationsForPayment = async(id) => {       
        
        const payment = await this.getByIdEntity('payments',id)
        
        const RealizationManager = require('./realizationmanager')
        const realizationManager = new RealizationManager()
        const previousPaymentId = await this.getPreviousPaymentId(id)
        const realizations = await realizationManager.getAllForPayment(previousPaymentId)
        console.log(realizations)
 
        realizations.map(realization => {
            realizationManager.add(id,realization.productId,realization.percent)
        })
        
        return realizations
        
    }

    delete = async(id)=> await this.deleteEntity('payments',id)

    update = async(id,paymentNumber,startDate,endDate)=> await this.updateEntity('payments',id,  
                                                            [{key:'paymentNumber',value:"'" + paymentNumber + "'"},
                                                            {key:'startDate',value:startDate},
                                                            {key:'endDate',value:endDate}
                                                            ])
    
}

module.exports = PaymentManager