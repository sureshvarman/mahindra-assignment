FROM sureshvarman/sample1

COPY . .

RUN yarn install

EXPOSE 3000
