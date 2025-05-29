# employeemanagement
this project handles the db scripts and migrations employee management


# Go to the root of the project and run the following command to apply migrations

# "run this command from the folder EmployeeeManagement.DB.Migrations" :

docker-compose -f postgres-docker-compose.yml up -d

# If you want to re-run the SQL files:
docker-compose -f postgres-docker-compose.yml down -v   # Remove volume (wipes the DB)
docker-compose -f postgres-docker-compose.yml up -d