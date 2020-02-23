from node:lts-apline

run usermod -d /home/rest-simple -l rest-simple node

copy . /home/rest-simple

workdir /home/rest-simple

cmd ["node", "lib/server.gen.js"]

user rest-simple
