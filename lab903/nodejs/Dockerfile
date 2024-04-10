FROM bitnami/node

COPY server.js package.json package-lock.json /app/

RUN apt-get update && \
    apt-get install -y dumb-init && \
    cd /app && \
    npm install

ENTRYPOINT [ "/usr/bin/dumb-init", "--" ]
CMD ["node",  "server.js" ]

