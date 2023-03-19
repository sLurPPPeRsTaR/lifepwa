ARG arch

FROM nginx:alpine-slim

#RUN apk add --update \
#curl==7.83.1-r4 \
#&& rm -rf /var/cache/apk/*

COPY --chown=nginx:nginx app/out /usr/share/nginx/html
COPY --chown=nginx:nginx app/default.conf /etc/nginx/conf.d

RUN chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080 443