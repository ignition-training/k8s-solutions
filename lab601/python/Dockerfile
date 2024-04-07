FROM bitnami/python

COPY server.py /app/

RUN apt-get update && \
    apt-get install -y dumb-init && \
    cd /app 

ENTRYPOINT [ "/usr/bin/dumb-init", "--" ]
CMD ["python3",  "server.py" ]

