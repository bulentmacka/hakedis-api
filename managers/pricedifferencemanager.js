const EntityManager = require("./entitymanager")

class PriceDifferenceManager extends EntityManager{    


    calcPd = async(data) => {

        const tuikmanager = require("./tuikmanager")

        const tuikManager = new tuikmanager()

        const tuikData = await tuikManager.getAll()

        const endeksBase = tuikData.find(e => e.year == data.file.baseYear && e.month == data.file.baseMonth)
        const ufe0 = endeksBase.endeksA
        const ufe23 = endeksBase.endeksB1
        const ufe24 = endeksBase.endeksB2
        const ufe19 = endeksBase.endeksB3
        const ufe16 = endeksBase.endeksB4
        const ufe1 = endeksBase.endeksB5
        const ufe28 = endeksBase.endeksC

        let analiz = []

        data.spendings.map(spending => {

            let spendingFF = 0.0

            let _spending = spending.amount

            const _spendingEndeks = tuikData.find(e=>e.year == spending.year && e.month == spending.month)   

            let an = 0.0

            if (_spending > 0) {

                let analizRow = { spending:spending, 
                                  allowances:[]                                           
                                }                            
                   
                    data.allowances.map(allowance => {

                        const _allowanceEndeks = tuikData.find(e=>e.year == allowance.year && e.month == allowance.month)

                        if (_spendingEndeks != 'undefined'){

                                let _allowance = allowance.amount - allowance.spending
                                
                                if (_spending >= _allowance) {
                                    an = _allowance
                                    _spending -= _allowance;
                                    allowance.spending = allowance.amount
                                } else {

                                    an = _spending;
                                    _spending = 0;
                                    allowance.spending += an;
                                }

                        if (an > 0) {

                                const spendingMonthValue = 12 * spending.year + spending.month
                                const allowanceMonthValue = 12 * allowance.year + allowance.month

                                const ufe01 = _spendingEndeks.endeksA
                                const ufe02 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.endeksA : 0
                                let ufe0n = spendingMonthValue < allowanceMonthValue ?  ufe01 : Math.min(ufe01, ufe02)                          
                                                
                                const ufe231 = _spendingEndeks.endeksB1
                                const ufe232 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.endeksB1 : 0
                                let ufe23n = spendingMonthValue < allowanceMonthValue ? ufe231 : Math.min(ufe231, ufe232)
                                                       
                                const ufe241 = _spendingEndeks.endeksB2
                                const ufe242 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.endeksB2 : 0
                                let ufe24n = spendingMonthValue < allowanceMonthValue ? ufe241 : Math.min(ufe241, ufe242)
                                                        
                                const ufe191 = _spendingEndeks.endeksB3
                                const ufe192 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.endeksB3 : 0
                                let ufe19n = spendingMonthValue < allowanceMonthValue ? ufe191 : Math.min(ufe191, ufe192)                         
                        
                                const ufe161 = _spendingEndeks.endeksB4
                                const ufe162 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.endeksB4 : 0
                                let ufe16n = spendingMonthValue < allowanceMonthValue ? ufe161 : Math.min(ufe161, ufe162)
                                                    
                                const ufe11 = _spendingEndeks.endeksB5
                                const ufe12 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.endeksB5 : 0
                                let ufe1n = spendingMonthValue < allowanceMonthValue ? ufe11 : Math.min(ufe11, ufe12)                                
                        
                                const ufe281 = _spendingEndeks.endeksC
                                const ufe282 = _allowanceEndeks != 'undefined' ? _allowanceEndeks.endeksC : 0
                                let ufe28n =  spendingMonthValue < allowanceMonthValue ? ufe281 : Math.min(ufe281, ufe282)
                                                  
                                const Pn =  data.file.a * ufe0n / ufe0 +
                                            data.file.b1 * ufe23n / ufe23 +
                                            data.file.b2 * ufe24n / ufe24 +
                                            data.file.b3 * ufe19n / ufe19 +
                                            data.file.b4 * ufe16n / ufe16 +
                                            data.file.b5 * ufe1n / ufe1 + 
                                            data.file.c * ufe28n / ufe28;

                                const Pn_1 = Pn - 1
                                const allowanceFF = an * data.file.B * Pn_1
                                spendingFF += allowanceFF


                                analizRow.allowances.push({allowance:allowance,                                             
                                                        an:an,                                             
                                                        pn_1:Pn_1,               
                                                        ff:allowanceFF})
                        }
                                analizRow.spending.ff = spendingFF                                

                        }
                    })  
                    
                    analiz.push(analizRow)
   

        } 
    })



        return analiz

    }
  
}

module.exports = PriceDifferenceManager