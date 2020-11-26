FROM cypress/base:14

WORKDIR /app

COPY ./ ./

RUN npm ci
RUN $(npm bin)/cypress verify
#RUN npm run cypress:js --headless --browser chrome
#RUN $(npm bin)/cypress run --browser chrome
#RUN $(npm bin)/cypress run --browser firefox
CMD [ "npm", "run", "cypress:js" ]