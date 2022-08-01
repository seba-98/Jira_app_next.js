# Next.js OpenJira app

#To run local you need data base



#Ejecutar yarn install para instalar todas las dependencias
`````
yarn install
`````

#Docker es un generador de contenedores: son mini linux aislan los proyectos bases de datos, backend, frontend etc

#After of create docker-compose.yaml with their content you must execute esto carga la base de datos en docker, luego hay que hacer que corra
`````
docker-compose up -d
`````

#-d, is __detached__ this means will not run mongo in the terminal if not it will run in the background with docker

mongodb url 

`````
mongodb://localhost:27017/entriesdb
`````

#Para correr el proyecto en desarrollo utilizar yarn dev (es super lento), en producción es yarn start
