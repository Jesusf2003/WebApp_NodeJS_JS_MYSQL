create database clientdb;

use clientdb;

create table client (
	IDCLI		    int AUTO_INCREMENT,
  NAMECLI		  varchar(100),
  LNAMECLI	  varchar(100),
  CELLCLI		  char(9),
  PRIMARY KEY (IDCLI)
);

drop table clients;

SELECT * FROM client;