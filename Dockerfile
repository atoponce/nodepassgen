FROM node:latest

COPY . /app
RUN ln -s /app/nodepassgen /usr/local/bin/nodepassgen && \
	ln -s /app/lists /usr/local/bin/lists

ENTRYPOINT [ "nodepassgen" ]
