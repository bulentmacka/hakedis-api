const EntityManager = require("./entitymanager")


class TuikManager extends EntityManager{


    getAll = async() =>  (await this.runSqlScript("select * from tuik order by 12*year+month desc"))[0]         

    getValuesFromGithub = async() =>{

        const fetch = require('node-fetch')

        const url = 'https://raw.githubusercontent.com/bulentmacka/myrepo/master/tuik.json'

        const response = await fetch(url)        

        const data = await response.json()

        const connection = await this.pool.getConnection()

        try {
             data.map(async item => {

                await this.addEntity('tuik',[   {key:'year',value:item.YIL},
                                                {key:'month',value:item.AY},
                                                {key:'endeksA',value:item.EndeksA},
                                                {key:'endeksB1',value:item.EndeksB1},
                                                {key:'endeksB2',value:item.EndeksB2},
                                                {key:'endeksB3',value:item.EndeksB3},
                                                {key:'endeksB4',value:item.EndeksB4},
                                                {key:'endeksB5',value:item.EndeksB5},
                                                {key:'endeksC',value:item.EndeksC}                                                                                                                                                     

                                            ])                
             })    
            
        } catch (error) {
            console.log('hata',error)
        }
        finally{
            connection.release()
        }


    }  
    
    getByYearAndMonth = async(year,month) => (await this.runSqlScript(`select * from tuik where year=${year} and month=${month}`))[0] 
  
}

module.exports = TuikManager