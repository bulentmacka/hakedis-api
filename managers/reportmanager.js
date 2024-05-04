const EntityManager = require("./entitymanager")
const FileManager = require("./filemanager")
const CategoryManager = require("./categorymanager")
const ProductManager = require('./productmanager')
const PaymentManager = require('./paymentmanager')
const RealizationManager = require('./realizationmanager')

class ReportManager extends EntityManager{

  getCategoryIds = (categories) =>{
    let result = ''
    categories.map(category => {
        result += category.id + ','
    })
    result = result.slice(0,-1)

    return result
  }

  getCategoriesSummary = async(paymentId) => {

            let result = []         

            const fileManager = new FileManager()    
            const paymentManager = new PaymentManager()        
            const categoryManager = new CategoryManager()            
            const realizationManager = new RealizationManager()  
            
            const payment = await paymentManager.getById(paymentId)
            const fileId = payment.fileId
            const file = await fileManager.getById(fileId)
            const categories = await categoryManager.getAll(fileId)
            const categoryIds = this.getCategoryIds(categories)
            const realizations = await realizationManager.getAllForCategories(paymentId,categoryIds)
                                               
            categories.map(async category =>{  
              
                  const categoryRealizatios = realizations.filter(r=>r.categoryId.substr(0,category.categoryId.length) == category.categoryId)
                    
                  const categoryPercent = categoryRealizatios.reduce
                  ((acc,realization)=> realization.length !=0 ? acc + 0.01 * realization.percent * realization.productPercent:0.0,0)
 
                  const categoryPrice = 0.01 * file.agreementPrice * categoryPercent

                  result.push({
                                  categoryId:category.categoryId,
                                  categoryName : category.name,
                                  categoryPercent:categoryPercent,
                                  categoryPrice:categoryPrice
                              })                                       

                    })

                   return result 
  }

  getPaymentSummary = async(paymentId)=>{

      let result =[] 
      const fileManager = new FileManager()
      const paymentManager = new PaymentManager()
      const productManager = new ProductManager()
      const realizationManager = new RealizationManager()

      const payment = await paymentManager.getById(paymentId)
      //console.log(payment.fileId)
      const file = await fileManager.getById(parseInt(payment.fileId))
      //console.log(file)
      const payments = await paymentManager.getPreviousAndThis(paymentId)
      const realizations = await realizationManager.getAllForFile(file.id)
      
      let previousRealization = 0.0
      payments.map(payment=> {

            const paymentRealizations = realizations.filter(r => r.paymentId == payment.id)
            const thisRealization = paymentRealizations.reduce
              (
                  (acc,realization)=> acc + 0.01 * realization.percent * realization.productPercent,
                  0.0
              )

              const previousPrice = file.agreementPrice * 0.01 * previousRealization
              const thisPrice = file.agreementPrice * 0.01 * thisRealization
            result.push({id:payment.id,
                         paymentNumber:payment.paymentNumber,
                         startDate:payment.startDate,
                         endDate:payment.endDate,
                         previousRealization:previousRealization,
                         thisRealization: thisRealization,
                         previousPrice:previousPrice,
                         thisPrice:thisPrice
                        })
            
            previousRealization = thisRealization

      })

      return result

  }

  getRealizationProductListResult = async(paymentId,categories) => {    

    let categoryIds = this.getCategoryIds(categories) 

    const productManager = new ProductManager()
    const realizationManager = new RealizationManager()
    const paymentManager = new PaymentManager()
    const fileManager = new FileManager()

    const payment = await paymentManager.getById(paymentId)
    const file = await fileManager.getById(payment.fileId)
    const products = await productManager.getAllForCategories(categoryIds)
 
  
    const thisRealizations = await realizationManager.getAllForCategories(paymentId,categoryIds)

    const previousPaymentId = await paymentManager.getPreviousPaymentId(paymentId)
    const previousRealizations = await realizationManager.getAllForCategories(previousPaymentId,categoryIds)
    
    
    let result = []

    products[0].map(product => {   
       
        const thisRealization = thisRealizations.find(r => r.productId == product.id)               
        const previousRealization = previousRealizations.find(r => r.productId == product.id)

        const priceForAgreement = 0.01 * file.agreementPrice * product.percent
        const totalPercent = thisRealization != null ?
                           0.01 * product.percent * thisRealization.percent:0

        const totalPrice = 0.01 * file.agreementPrice * totalPercent
        const previousPercent = previousRealization != null ? 
                                0.01 * product.percent * previousRealization.percent : 0
        const previousPrice = 0.01 * file.agreementPrice * previousPercent
        const thisPercent = totalPercent - previousPercent
        const thisPrice = totalPrice - previousPrice

        result.push({
                        product:product,
                        priceForAgreement:priceForAgreement,
                        totalPercent:totalPercent,
                        totalPrice:totalPrice,
                        previousPercent:previousPercent,
                        previousPrice:previousPrice,
                        thisPercent:thisPercent,
                        thisPrice:thisPrice         

                  })

    })

        //console.log(result)
        return result
  }

  getRealizationProductList = async(paymentId,categoryId) => {
        const categoryManager = new CategoryManager()
        const category = await categoryManager.getById(categoryId)
        const result = await this.getRealizationProductListResult(paymentId,[category])
        return result
  }               

  getRealizationCategoryList = async(paymentId) => {

    const paymentManager = new PaymentManager() 
    const categoryManager = new CategoryManager()

    const payment = await paymentManager.getById(paymentId) 
    const categories = await categoryManager.getAll(payment.fileId) 

      
      return new Promise(async resolve => {

                  let result = []                                 

                  categories.map(async category => {  

                    const [childCategories] = await categoryManager.getChildsByCategoryId(category.categoryId)     

                    const productRealizationsForCategory = await this.getRealizationProductListResult(paymentId, childCategories)

                    const priceForAgreement = productRealizationsForCategory.reduce((acc,realization) =>acc + realization.priceForAgreement,0.0)

                    const totalPercent =  productRealizationsForCategory.reduce((acc,realization) =>acc + realization.totalPercent,0.0)

                    const totalPrice = productRealizationsForCategory.reduce((acc,realization) =>acc + realization.totalPrice,0.0)

                    const previousPercent = productRealizationsForCategory.reduce((acc,realization) =>acc + realization.previousPercent,0.0)

                    const previousPrice = productRealizationsForCategory.reduce((acc,realization) =>acc + realization.previousPrice,0.0)

                    const thisPercent = productRealizationsForCategory.reduce((acc,realization) =>acc + realization.thisPercent,0.0)

                    const thisPrice = productRealizationsForCategory.reduce((acc,realization) =>acc + realization.thisPrice,0.0)
                    
                    result.push({
                                  category:category,
                                  priceForAgreement:priceForAgreement,
                                  totalPercent:totalPercent,
                                  totalPrice:totalPrice,
                                  previousPercent:previousPercent,
                                  previousPrice:previousPrice,
                                  thisPercent:thisPercent,
                                  thisPrice:thisPrice
                              }) 
                              
                              if (categories.indexOf(category) == categories.length - 1) resolve(result)
                              
                  })
        
       

      })        

  }

}

module.exports = ReportManager