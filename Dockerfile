FROM mhart/alpine-node

RUN echo $PATH
RUN /usr/bin/apt-get update
RUN apt-get install bash
ADD package.json package.json
RUN npm install
ADD . . 

CMD ["node","app.js"]

