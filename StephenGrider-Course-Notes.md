# Notes

********************************

### Chapter 5
###### Note - Chapter 5 uses the project 'Visits' created in Chapter 4
##### Chapter 5, Lecture 54
1) When we run instances of different images, they run in isolation and are not aware of the other running instance
    - Ex => 
      - P is an instance if Image A, Q is an instance if Image B
      - Without any special configuration, Containers P and Q will not be able to communicate with each other
    - To enable communication, we have 2 options:
      - Option 1 - Use the docker CLI
      - Option 2 - Use ***docker-compose***


2) Docker CLI proved us with the required functionality to create a network connection between the containers. 

3) However, When using the docker CLI to establish a connection between the 2 containers, we need to run a handful of commands and it can be a real pain to run for several containers. 

4) We can use a script to run all of the commands for us but that will require a lot of typing and thought consuming a lot of time. The docker cli is hardly ever used to establish a connection between containers.

5) This is where ***docker-compose*** comes into the picture. It is a CLI tool that saves us from typing in a bunch of commands every time we create a container.

6) ***docker-compose*** will make it very easy to create multiple docker containers at the same time and connect them together with some form of networking.

7) ***docker-compose*** is similar to ***docker cli*** but enables us to issue commands much more quickly and saves us from typing in a lot of commands.


##### Chapter 5, Lecture 55-56

8) The ***docker-compose*** encodes(write in a special syntax) the CLI commands in a ***docker-compose.yml*** file (Look in CH-4/visits/docker-compose.yml)

9) We then feed the ***docker-compose.yml*** file to the ***docker-compose CLI*** who is responsible for parsing the file and creating containers with specified configuration.

10) Using ***docker-compose*** to create containers using the ***docker-compose.yml*** file, we automatically establish a connection between the containers as ***docker-compose*** will create these containers on the same network.

11) Now these containers can communicate with each other however they please.

12) All we have to do now, is to make use of this connection.

    - Before, in CH-4/visits/index.js file, line 5 was 
      - const client = redis.createClient();

    - Now, we change it to 
      - const client = redis.createClient({ host: "redis-server" });
      - Additional notes added in CH-4/visits/index.js file


##### Chapter 5, Lecture 57-61

13) Using docker-compose 
![docker-commands](./Images/Docker-the-complete-guide/Docker-and-docker-compose.png?raw=true "docker and docker-compose commands")

14) docker-compose up -d -> Detatched mode

15) docker-compose down -> close all containers

17) Sometimes, it may happen that your app may crash. To simulate this, we add a "process.exit(0)" in the request handler of index.js

18) In such cases, docker-compose provides us with the ability to automatically restart the container.

19) 
![restart-policies](./Images/Docker-the-complete-guide/Restart-policies.png?raw=true "Restart policies")

20) Ex - add "restart: always" to ***docker-compose.yml*** file

21) docker-compose ps
    - same as docker ps
    - can only be used in the directory with ***docker-compose.yml*** file


********************************

### Chapter 6

##### Chapter 6, Lecture 63-64

1) Fig 6.1 - Overall Workflow
![docker-workflow](./Images/Docker-the-complete-guide/docker-workflow.png?raw=true "docker-workflow")

2) Fig 6.2 - Flow control

![Workflow-flowchart-1](./Images/Docker-the-complete-guide/Workflow-flowchart-1.png?raw=true "Workflow-flowchart-1")
![Workflow-flowchart-2](./Images/Docker-the-complete-guide/Workflow-flowchart-2.png?raw=true "Workflow-flowchart-2")
![Workflow-flowchart-3](./Images/Docker-the-complete-guide/Workflow-flowchart-3.png?raw=true "Workflow-flowchart-3")

3) Points to remember 
    - Docker is not required for the workflow described in fig 6.1
    - Docker is a **tool** that makes the workflow a lot more easier to accomplish
    - However, it is not a neccessity. You can accomplish the workflow without using docker


##### Chapter 6, Lecture 67-72

4) Create a react app

5) **React commands**
![react-commands](./Images/Docker-the-complete-guide/react-commands.png?raw=true "react-commands")

##### Chapter 6, Lecture 73
###### Docker Volumes

6) Run commands - 
  - react-image2 is produced by running -> ***docker build -t react-image2 -f Dockerfile.dev .***

  - In Windows 
    - **docker run --name react-instance-1 -p 3000:3000 -v C:/Pranav/Docker/Working/Udemy/Docker-the-complete-guide/CH-6/frontend/src/:/app/src/ react-image2**

    - If we delete the node_modules folder in the current directory and run the below command (Lets call it cmd2) -
      - **docker run --name react-instance-2 -p 3001:3000 -v C:/Pranav/Docker/Working/Udemy/Docker-the-complete-guide/CH-6/frontend/:/app/ react-image2**
    
    - Then, docker will throw an error. This is because you are trying to map eveything in the **app** folder inside the container to the folders in **PWD**, which does not exist. Therefore, node_modules will not be present in the container.

    - And even though docker ran the ***npm install*** command and generated the node_modules folder, it will be mapped to the node_modules folder present in the **PWD**

    - Therefore we need to edit ***command cmd2*** as follows
      - **docker run --name react-instance-2 -p 3001:3000 -v /app/node_modules -v C:/Pranav/Docker/Working/Udemy/Docker-the-complete-guide/CH-6/frontend/:/app/ react-image2**
      >
      - ***READ THE REASON IN LINUX PART BELOW***
      >

  - In linux, mac
    - **docker run --name react-instance-1 -p 3000:3000 -v /app/node_modules/ -v $(pwd):/app  react-image2**
    - here, notice that ***-v /app/node_modules/*** has no **':' (Semicolon)**. This is telling docker that this folder inside the container does not have to be mapped to any folder outside the container. Therefore, do not modify this folder.
    - ***-v $(pwd):/app*** is telling docker that map this folder inside the container to the folder(PWD) on the host

  7) Phew! that was a ridiculously long **docker run** command, How can we make it easier?
      - In chapter 5, we learnt about ***docker-compose***, let's use that here to make things easier for us


##### Chapter 6, Lecture 82-86

  8)  To run tests on a container, we have 2 approaches 
      - **Approach 1** - Run the container, get the id, open a new terminal, use the **"docker exec -t  <_container-Id_> <_new-command_>"**
      >
      - **Approach 2** - Create a new service in **docker-compose.yml** file and add additional commands. Look in **docker-compose.yml** of /CH-6/frontend

  9) When using **Approach 1**, you will be able to provide input from your keyboard.

  10) When using **Approach 2**, you won't be able to provide input from your keyboard.
    - This is because **docker attach** will only connect STDIN to the primary process
    - However, the primary process isn't the one which handles the input to the program
      - Here, it may be run tests or run start
      - Therefore there is no way we can connect to the right STDIN channel
  

##### Chapter 6, Lecture 88

  11) When building production version of the application, we do not need the ***Dev server*** that runs as a part of **npm run start**

  12) We use a production server to host static files since we will not be changing the contents of the files in production.
    - We only need the **build** folder and nothing else
    - So it would be a waste of storage to have the **node_modules** folder that is generated in **npm install**
    - Also, we need a production server
  >
  13) **nginx** is one such docker image that can be used to act as a prod server
  >
  14) We are using **node:alpine** as our base image. Docker does not know about **nginx** since it is a different base image. We can't access 2 base images. 
  ![build-prod-1](./Images/Docker-the-complete-guide/build-prod-1.png?raw=true "build-prod-1")
  >
  >
  15) To overcome this issue, the docker file will use a **multi-step build process**
      - In the docker file we will have 2 blocks of configuration
      - One block will be used for **Build phase**
        - The sole purpose of the build phase is to run the initial build setup like **"copy package.json .", "npm install", "npm run build"** etc to create the **build** folder that will be served to the production server
      >
      - One block will be used for **Run phase**
        - This gives us the ability to specify a second base image.
        - We will use whatever is required from the output of **Build phase**, and the rest will be deleted.
        - Therefore node:alpine image, npm dependencies etc will be removed!

  
##### Chapter 6, Lecture 90-9

  16) Look at the ***docker file*** in CH-6/frontend to see how the **multi-step build process** mentioned in Note 15 is implemented



********************************


### Chapter 7

##### Chapter 7, Lecture 93



