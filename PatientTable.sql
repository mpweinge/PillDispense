CREATE TABLE Patients(
   name varchar(255) NOT NULL,
   address varchar(255) NOT NULL,
   city varchar(255) NOT NULL,
   province varchar(255) NOT NULL,
   postalcode varchar(20) NOT NULL,
   phonenumber varchar(20) NOT NULL,
   email varchar(255) NOT NULL,
   doctor varchar(255) NOT NULL,
   insurance varchar(255) NOT NULL,
   id int NOT NULL AUTO_INCREMENT,
   PRIMARY KEY (id)
);
