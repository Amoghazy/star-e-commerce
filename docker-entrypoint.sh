#!/bin/bash

# Start MongoDB service
mongod --config /etc/mongod.conf &

# Wait for MongoDB to be ready
until mongosh --eval "print(\"waited for connection\")" &> /dev/null
do
    sleep 2
done

# Restore the database
mongorestore --db star-ecommerce --collection categories /backup/categories.bson
mongorestore --db star-ecommerce --collection orders /backup/orders.bson
mongorestore --db star-ecommerce --collection products /backup/products.bson
mongorestore --db star-ecommerce --collection users /backup/users.bson

# Keep the container running
tail -f /dev/null
