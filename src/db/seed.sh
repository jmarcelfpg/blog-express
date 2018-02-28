if [ ! -f ./db/articles_id.json ]; then
    mongoimport --host localhost:27017 --db blog --collection articles --file ./db/articles_id.json --jsonArray    
else
    mongoimport --host localhost:27017 --db blog --collection articles --file ./db/articles.json --jsonArray
    mongoexport --host localhost:27017 --db blog --collection articles --out ./db/articles_id.json --jsonArray
fi

if [ ! -f ./db/users_id.json ]; then
    mongoimport --host localhost:27017 --db blog --collection users --file ./db/users_id.json --jsonArray    
else
    mongoimport --host localhost:27017 --db blog --collection users --file ./db/users.json --jsonArray
    mongoexport --host localhost:27017 --db blog --collection users --out ./db/users_id.json --jsonArray
fi