FROM bitnami/golang

COPY main.go /app/

RUN apt-get update && \
    apt-get install -y dumb-init && \
    cd /app 

ENTRYPOINT [ "/usr/bin/dumb-init", "--" ]
CMD ["go", "run", "/app/main.go" ]

