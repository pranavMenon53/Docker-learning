# Commands

1) docker image
2) docker images
3) docker image history ***id***
4) docker image inspect ***id***
5) docker tag imageName:oldTag imageName:newTag
6) docker search ***mysql***
7) docker image remove ***id***
8) docker container pause ***id***
9) docker container unpause ***id***
10) docker container stop ***id***
11) docker container inspect ***id***
12) docker container ls -a
13) docker container prune - remove all stopped containers
14) docker container logs -f ***id***
15) docker events 
16) docker top  ***id***
17) docker stat
18) docker system df
19) docker run -m 512m --cpu-quota 50000
20) docker container ls == docker ps
21) docker container rm ***id***
22) docker rm $(docker ps -aq)
23) docker run -dp 8080:80 -p 3000:80 nginx:latest
24) docker run --name ***ContainerNameHere*** -dp 8080:80 -p 3000:80 nginx:latest

25) docker ps --format="\nID\t{{.ID}}\nName\t{{.Names}}\nImage\t{{.Image}}\nPorts\t{{.Ports}}\nCommand\t{{.Command}}\nCreated\t{{.CreatedAt}}\nStatus\t{{.Status}}\n"

In MacOS, Linux - 
(Storing it in a variable)
26) export FORMAT="\nID\t{{.ID}}\nName\t{{.Names}}\nImage\t{{.Image}}\nPorts\t{{.Ports}}\nCommand\t{{.Command}}\nCreated\t{{.CreatedAt}}\nStatus\t{{.Status}}\n"

In Windows - 
(Storing it in a variable)
27) $FORMAT="\nID\t{{.ID}}\nName\t{{.Names}}\nImage\t{{.Image}}\nPorts\t{{.Ports}}\nCommand\t{{.Command}}\nCreated\t{{.CreatedAt}}\nStatus\t{{.Status}}\n"

28) docker ps --format=$FORMAT 

29) docker run --name some-nginx -dp 9000:80 -v $(pwd) -d nginx

30) docker run --name nginx-volume -v C:/Pranav/Youtube/AmigosCode/Working/Docker/Working:/usr/share/nginx/html:ro -dp 8080:80 nginx
  - Sharing files between container and host
  - EX 2
    - docker run --name react-instance-1 -p 3000:3000 -v C:/Pranav/Docker/Working/Udemy/Docker-the-complete-guide/CH-6/frontend/src/:/app/src/ react-image2

31) docker exec -it nginx-volume bash
  - ...# ls -al
  - ...# cd /usr/share/nginx/

32) docker run --name nginx-volume2 -dp 9001:80 --volumes-from nginx-volume nginx
  - Sharing files between containers

33) make your docker image
  - First, make a docker file
  - run this command in the terminal -> "docker build --tag **Name-here**:**Tag-Name-here** ."
  - the "." at the end refers to the docker file in the pwd
  
34) docker system prune
  - Will delete the containers and any image fetched from docker hub
  - If all you want to do is delete the containers, use command 22

35) docker exec -it redis-demo redis-cli
  - Same as command 31
  - '-it' allows us to provide input to the container
  - Without the '-it', we won't be able to enter any input
  - '-i' maps the input to STDIN of the container and '-t' does text formatting and behind the scenes work
  - Here we try to run the 'redis-cli' command inside the container named 'redis-demo'
  - In Command 31, we try to run the 'bash' command inside the container named 'nginx-volume'


36) docker exec -it ***Container name or Id*** sh
  - Will open a unix shell or command processor inside the container

37) docker run -it busybox sh

38) docker compose up

39) docker compose up --build

40) docker build -f ***custom docker file name*** .

41) docker 

42) docker 

43) docker 

44) docker 

45) docker 

46) docker 

47) docker 

48) docker 

49) docker 

50) docker 



# Creating Docker Images

1) What a docker file should have -

                            Specify a base Image
                 
                                    |
                                    V     
                 
                  Run some commands to install additional programs
                 
                                    |
                                    V     
                 
                  Specify commands to run on container startup


2) Structure of Dockerfile - 

          FROM ...
          WORKDIR ...
          COPY ...
          RUN ...
          CMD ["","",..]



