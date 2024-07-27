FROM denoland/deno:1.45.4

EXPOSE 1338

WORKDIR .

USER deno

COPY deno.json .
COPY deno.lock .

RUN deno cache --reload deno.json

COPY . .

ENV DELTA_SERVER_URL="https://api.delta.storage"
RUN deno cache main.ts

CMD ["task", "start"]


