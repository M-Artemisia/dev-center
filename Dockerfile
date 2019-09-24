#
# Builder stage
#
FROM ubuntu:19.10 as builder

RUN apt-get update && \
  apt-get install -y \
  openssl ruby ruby-dev git zlib1g-dev cmake build-essential g++ imagemagick

RUN gem install bundler && gem update --system

WORKDIR /opt/builds

COPY . .

RUN bundle install

RUN mkdir /sites && \
  bundle exec jekyll build -d sites/public/developers -c _config.yml,_config-web.yml && \
  bundle exec jekyll build -d sites/enterprise/developers -c _config.yml,_config-enterprise.yml,_config-web.yml

#
# Final stage: use the build artifacts from builder stage
#
FROM node:10.14-slim

WORKDIR /opt/src/app

COPY --from=builder /opt/builds/sites ./sites
