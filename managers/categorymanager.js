const EntityManager = require("./entitymanager")

class CategoryManager extends EntityManager{

    getAll = async(fileId)=> await this.getAllEntities('categories','fileId',fileId)   

    getById = async(id)=> await this.getByIdEntity('categories',id)         

    getChildsByCategoryId = async(categoryId) => await this.runSqlScript(`select * from categories where left(categoryId,${String(categoryId).length}) = 
                                                '${categoryId}' order by categoryId`)

    getChildsForCategories = async(file) => await this.runSqlScript(`call sp_child_categories(${file.id})`)
    
    addMain =  async(fileId)=> {

            const mainCategory = await this.addEntity('categories',[{key:'fileId',value:fileId},
                                                                      {key:'name',value: "'Ana Grup'"}])    

            const addedId =  mainCategory[0].insertId   

            const addedCategoryId = this.generateCategoryId(String(addedId))   
            
            this.updateEntity('categories',addedId,[{key:'categoryId',value:"'" + addedCategoryId + "'"}])     

            await this.add(addedId,'İnşaat İmalatları')
            await this.add(addedId,'Elektrik Tesisatı')
            await this.add(addedId,'Mekanik Tesisat')         
    }

    add = async(id,name)=>{

                const categories= await this.getByIdEntity('categories',id)

                const fileId = categories.fileId
                const categoryId = categories.categoryId

                const [addedCategory] = await this.addEntity('categories',
                                        [{key:'fileId',value:fileId},{key:'name',value:"'" + name + "'"}])

                const addedId = addedCategory.insertId
                
                const addedCategoryId = categoryId + '/' + this.generateCategoryId(String(addedId))

                const updatedCategory = await this.updateEntity('categories',addedId,
                                                                    [{key:'categoryId',value:"'" + addedCategoryId + "'"}]
                                                                )
                
                return updatedCategory

    }

    delete = async(id)=> await this.deleteEntity('categories',id) 

    update = async(id,name)=> await this.updateEntity("categories",id,[{key:'name',value:"'" + name + "'"}])

    generateCategoryId = (id)=> {

        let result = ''

        const zeroCount = 16 - id.length

        for (let index = 0; index < zeroCount; index++) {
            result += '0'            
        }

        result += id

        return result

    }    
}

module.exports = CategoryManager