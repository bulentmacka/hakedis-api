class BaseEntity {

    constructor(id){
        this.id = id
    }
    
}

class User extends BaseEntity {

    constructor(id,username,email,password){        
        this.id = id
        this.username = username
        this.email = email
        this.password = password
    }

}


class File extends BaseEntity {

    constructor(id,name,administrator,contractor,tenderDate,agreementDate,agreementPrice,startDate,dayCount){
        this.id = id
        this.name = name
        this.administrator = administrator
        this.contractor = contractor
        this.tenderDate = tenderDate
        this.agreementDate = agreementDate
        this.agreementPrice = agreementPrice
        this.startDate = startDate
        this.dayCount = dayCount
    }

}

class Category extends BaseEntity {

    constructor(id,name,fileId,categoryId){
        this.id = id
        this.name = name
        this.fileId = fileId
        this.categoryId = categoryId
    }

}

class Product extends BaseEntity {

    constructor(id,categoryId,productNumber,name,unit,percent){
        this.id = id
        this.categoryId = categoryId
        this.name = name
        this.productNumber = productNumber
        this.unit = unit
        this.percent = percent
        
    }

}

class Payment extends BaseEntity {

    constructor(id,fileId,paymentNumber,startDate,endDate){
        this.id = id
        this.fileId = fileId
        this.paymentNumber = paymentNumber
        this.startDate = startDate
        this.endDate = endDate
        
    }

}

class Realization extends BaseEntity {

    constructor(id,paymentId,productId,percent){
        this.id = id
        this.paymentId = paymentId
        this.productId = productId
        this.percent = percent
        
    }

}
