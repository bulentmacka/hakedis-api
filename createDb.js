createDatabase = async () => {
  const pool = require("./connection");
  const connection = await pool.getConnection();

  const tableQueries = [
    
    "create table if not exists files(id int not null,userId varchar(100) not null, name varchar(200),createdDate datetime default now(),primary key(id))",

    "create table if not exists categories(id int not null,fileId int,name varchar(200),createdDate datetime default now(),primary key(id))",

    "create table if not exists products(id int not null,categoryId int,name varchar(200),createdDate datetime default now(),primary key(id))",

    "create table if not exists payments(id int not null,fileId int,paymentNumber varchar(20),startDate datetime,endDate datetime,createdDate datetime default now(),primary key(id))",

    "create table if not exists realizations(id int not null,paymentId int,productId int,createdDate datetime default now(),primary key(id))",

    "create table if not exists users(id varchar(100) not null,username varchar(200),email varchar(200),password varchar(200),createdDate datetime default now(),primary key(id))",

    'create table if not exists tuik(id int not null,year int not null, month int not null,' +
    'endeksA float,endeksB1 float,endeksB2 float,endeksB3 float,endeksB4 float,endeksB5 float,endeksC float,' +
    'primary key(id))',

    `create table if not exists allowances(id int not null auto_increment,fileId int not null,
      year int,month int,amount float,createdDate datetime default now(),primary key(id))`,

    `create table if not exists spendings(id int not null auto_increment,paymentId int not null,
     year int,month int,amount float,createdDate datetime default now(),primary key(id))`
    
  ];

  try {
    tableQueries.map(async (query) => await connection.execute(query));
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};


module.exports = createDatabase()
