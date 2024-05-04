const EntityManager = require("./entitymanager")
const CategoryManager = require("./categorymanager")

class FileManager extends EntityManager{

    getAll = async(userId)=> await this.getAllEntities('files','userId',"'" + userId + "'")                                                                    
    
    getById = async(id)=> await this.getByIdEntity('files',id)
  
    add = async(userId,
                name = 'Yeni İş Dosyası',
                administrator = 'idare',
                contractor = 'Yüklenici',
                tenderDate = new Date().getFullYear() + '-' + ((new Date().getMonth()) + 1) + '-' + new Date().getDate(),
                agreementDate = new Date().getFullYear() + '-' + ((new Date().getMonth()) + 1) + '-' + new Date().getDate(),
                agreementPrice = 0.0,
                startDate = new Date().getFullYear() + '-' + ((new Date().getMonth()) + 1) + '-' + new Date().getDate(),
                dayCount = 0)=>{
     
            
            const addedFile = await this.addEntity('files',[{key:'userId',value:"'" + userId + "'"},
                                                            {key:'name',value:"'" + name + "'"},
                                                            {key:'administrator',value:"'" + administrator + "'"},
                                                            {key:'contractor',value:"'" + contractor + "'"},
                                                            {key:'tenderDate',value:"'" + tenderDate + "'"},
                                                            {key:'agreementDate',value:"'" + agreementDate + "'" },
                                                            {key:'agreementPrice',value:agreementPrice},
                                                            {key:'startDate',value:"'" + startDate + "'"},
                                                            {key:'dayCount',value:dayCount}                                                                                                                                                     

                                                            ])


            const fileId = addedFile[0].insertId

            const categorymanager = new CategoryManager(this.response)

            await categorymanager.addMain(fileId)

            return addedFile
            
    }

    delete = async(id)=> await this.deleteEntity('files',id)       

    update = async(id,name,administrator,contractor,tenderDate,agreementDate,agreementPrice,
        startDate,dayCount)=> await this.updateEntity(id,[{key:'name',value:"'" + name + "'"},
                                                          {key:'administrator',value:"'" + administrator + "'"},
                                                          {key:'contractor',value:"'" + contractor + "'"},
                                                          {key:'tenderDate',value:"'" + tenderDate + "'"},
                                                          {key:'agreementDate',value:"'" + agreementDate + "'" },
                                                          {key:'agreementPrice',value:agreementPrice},
                                                          {key:'startDate',value:"'" + startDate + "'"},
                                                          {key:'dayCount',value:dayCount}
    
    
    ])

}

module.exports = FileManager