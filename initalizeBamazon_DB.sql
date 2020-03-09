create database bamazon;
use bamazon;
create table products(
id int not null,
name varchar(100) not null,
price decimal(7) not null,
department varchar(50) not null,
qty integer(4) not null,
primary key(id) 
);
create table bal(
bal decimal(20) not null,
tSpent decimal(20) not null
);
insert into bal(bal, tSpent)
values(12000, 0);