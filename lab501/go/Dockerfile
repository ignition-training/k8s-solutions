FROM bitnami/golang
WORKDIR /app
COPY main.go /app/
RUN go build -o hello main.go


FROM bitnami/golang
RUN apt-get update && \
    apt-get install -y dumb-init
COPY --from=0 /app/hello hello
ENTRYPOINT [ "/usr/bin/dumb-init", "--" ]
CMD ["./hello" ]

