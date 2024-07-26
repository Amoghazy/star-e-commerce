#!/bin/bash


mongod --config /etc/mongod.conf &


until mongosh --eval "print(\"waited for connection\")" &> /dev/null
do
    sleep 2
done
mongod --config /etc/mongod.conf &
mongorestore --db star-ecommerce --collection categories /backup/categories.bson
mongorestore --db star-ecommerce --collection orders /backup/orders.bson
mongorestore --db star-ecommerce --collection products /backup/products.bson
mongorestore --db star-ecommerce --collection users /backup/users.bson

tail -f /dev/null
