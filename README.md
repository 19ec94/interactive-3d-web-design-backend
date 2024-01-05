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
sudo docker exec -it mongodb mongosh -u admin -p "admin()" --authenticationDatabase admin
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
