FROM python:3.10-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /back

COPY Pipfile Pipfile.lock /back/

RUN apk add build-base libffi-dev postgresql-dev && \
    pip3 install pipenv && \
    pipenv install --system

# COPY . /backend