create database bamazon;
use bamazon;
create table products(
id int not null,
name varchar(100) not null,
price decimal(7) not null,
qty integer(4) not null,
primary key(id) 
);