FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye as base

RUN apt-get update \
    && apt-get install \
    xauth \
    xvfb \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libxtst6 \
    libnss3 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libxss1 \
    libasound2 \
    libgbm-dev \
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV DISPLAY :99

RUN Xvfb :99 -ac -nolisten tcp &