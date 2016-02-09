FROM nodesource/node:4.0

ADD . /src
WORKDIR /src
RUN npm install
RUN nodejs app.js

CMD ["nodejs","app.js"]

