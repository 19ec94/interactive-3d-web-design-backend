## Get the Repo
Clone the repo by
```bash
git clone git@github.com:19ec94/interactive-3d-web-design-backend.git
```
or by
```bash
git clone https://github.com/19ec94/interactive-3d-web-design-backend.git
```
.
## Install node dependency modules
Make sure you are in the root directory of the project and execute 
```bash
npm install
```
. This will install the node dependency modules.

## Database 
### Install MongoDB
For ease of use, latest MongoDB docker version is chosen.
Assuming you have `docker`, `docker-compose` installed on your system, and you
are in the root directory, execute
```bash
sudo docker-compose up -d
```
. When executed for the first time, the above command pulls the latest MongoDB
docker image and initialises the container and  creates a volume (directory) called `database` in your present working
directory. On subsequent invokations, it starts the container and attach the
respective volumes to it.  The container can be stopped by executing
```bash
sudo docker-compose down
```
.
### Interactive `mongosh`
In the interest of rapid development, default admin credentials are created
which can be found in the `docker-compose` file. 

Additionally, you can install `mongosh` -- a command line interface -- to
interact with the mongodb server. 

Assuming you have `mongosh` installed on you system, you can interact with the docker-container
`mongodb` by executing
```bash
sudo docker exec -it mongodb mongosh -u root -p rootpassword --authenticationDatabase admin
```
Now you have an interactive access to the database. 

## Install Postman
Additionally, you can install postman API to test API.
Example endpoints you might want to try
```
http://localhost:5000/signup
```
to create a new user in the database, or
```
http://localhost:5000/login
```
to verify an existing user, or
```
http://localhost:5000/username
```
to delete a user account.
You can pass the relavant parameters in Postman API Client `body` tab. 

## Expected environment variables
This server setup expects the following environment variables for sucessful
setup of the server and the MongoDB database. Make sure you create a `.env` file
at the root of project directory and include the following variables in the env
file. The following are defult values. Don't forget to set the variables to
approprite values.

 - DB_HOST=127.0.0.1
 - DB_PORT=27017
 - DB_NAME=i3wd
 - DB_USER=root
 - DB_PASSWORD=rootpassword
 - PORT=5000
 - SESSION_TOKEN_SECRET_KEY=mysecretkey
 - SESSION_TOKEN_DURATION=1h
 - SESSION_TOKEN_REFRESH_SECRET_KEY=refreshsecretkey

## How to run this server
Assuming you use the above default values, 
  1. To start the database, execute the following 
  ```bash
  sudo docker-compose up -d
  ```
  at the root of the project directory.

  2. To start the server, execute the following 
  ```bash
  npm run devStart
  ```
  at the root of the project directory.

  3. To establish an interactive connection to the database using mongosh, execute
  ```bash
  sudo docker exec -it mongodb mongosh -u <DB_USER> -p <DB_PASSWORD> --authenticationDatabase admin 
  ```
  at the root of the project directory. Make sure to replace `<DB_USER>` and
  `<DB_PASSWORD>` variables by actual values you set in your `.env` environment
  file.

  4. To stop the docker container, run the following
  ```bash
  sudo docker-compose down
  ```
  at the root of the project directory.

  5. To remove the docker volume, run the following
  ```bash
  sudo docker volume prune
  ```
  .
