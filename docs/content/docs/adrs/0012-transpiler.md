---
title: Transpiler
status: accepted
weight: 12
authors: rvr06
date: 2023-02-01
layout: adr
---

## Decision

Transpiles docker compose `yaml` into matching `dsl`, assuming that:
* each `service` is a `software system`
* each volume is a `software system`
* each `depends_on` materializes a `relationship` between matching `software systems`
* the `compose` file represents a `deployment environment`

## Context

Every sizable paradigm comes with a profession of faith. Container one makes no exception. One of the most appealing promises is about seamless scaling. [Docker compose](https://docs.docker.com/compose/) is a broadly used and efficient container orchestrator. It perfectly balances between efficacity & complexity, and it is the de facto way of locally engaging container ecosystem. Once your application is containerized and locally validated, you can hand over more or less blindly to devops team to cope with the scaling stage. Being able to efficiently communicate with devops team is key. To do so, one may want to surface compelling view to support discussion without falling back to plain old `yaml` browsing.

## Consequences

Promote this feature towards _DevOps_ community