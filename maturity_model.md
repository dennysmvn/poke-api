# Maturity Model Checker

This document is a reference to the [Dafiti Maturity Model](https://docs.google.com/document/d/1cXntCgBhHxCXsvZUtjwAACy4tuK6WwJk7q5VW3O71v0/edit)

Follow below is what is already done according with the maturity model.

## 1 - Incomplete

#### One CI pipeline

- [ x ] Does your solution have a single pipeline configuration that doesn’t have other artifact dependencies? (eg: CircleCI, GitlabCI, GoCD, Jenkins file)
- [ x ] Does the pipeline deploy to QA environment?
- [ x ] Does the pipeline deploy to Live environment?

#### Configuration, credentials, and code

- [ x ] Are application settings centralized in a configuration file (e.g. YAML, JSON, JSONNET, XML) and well documented?

#### Dependency management

- [ x ] Does your application have a dependency manager? (e.g. npm, composer, dep, maven, gradle, pip e etc.)
- [ x ] Does your application use stable versions of your dependencies when a stable version is available? (Eg.: avoid using snapshot or release candidate versions).
- [ x ] Does your application have documentation of all your system requirements? (eg: requirements.md)
- [Not Applicable] Does your application have database migrations when applicable?
- [ x ] Do your dependencies use at least major fixed versions? (eg: do not use *, prefer 1.* or 1.1.2)

#### Documentation

- [ x ] Does the project have the README.md file?
- [ x ] Does the project have the MaturityModel.md file?
- [ x ] Is there a domain, objective explanation of its primary responsibilities?
- [ x ] Is there information on how to run your solution?
- [ x ] Does your solution have the file CONTRIBUTING.md explaining how the process of contributing to the project is?
- [ x ] Do your application have all environment variables documented? (e.g. Dockerfile, envfile, dotenv, ansible-env)

#### Telemetry

- [ x ] Does your application have a health check?
- [ x ] Is your application using the company's health check standards?

#### Authentication and authorization

- [ x ] Does your application have authentication (non-public API)? (e.g. Basic Auth, Oauth2, OpenConnect ID, JWT)

#### Infrastructure

- [ x ] Is provisioning type defined (eg: container, spot or EC2)?
- [ x ] Is the operating system defined? (e.g.: AWS Linux, CentOs, Suse)
- [ x ] Does the application use log indexing? (ex: Kibana, Splunk, Graylog)

## 2 - Initial

#### One codebase per application

- [ x ] Are different streams of data processing separated into different microservices and individual repositories? (e.g. back end separated from consumers for scalability)
- [ x ] Is your application in a single repository?
- [ x ] Are all the files related to your solution e.g. source code, migrations, container files, tests, specifications, and minimal documentation together in the same repository? (Optional for the legacy platform)

#### One CI pipeline

- [ x ] Does your pipeline create only one artifact?
- [ x ] Does your solution only deliver a single deployment artifact with no dependencies with external artifacts?

#### Backing services

- [ x ] All attached resources are consumed identically across all environments?

#### Authentication and authorization

- [ - ] Does your application have role control/permissions control?
- [ - ] If your application has routes open to the internet, are they protected by authentication (non-public API)?

#### API first

- [ x ] Does your application use a well-defined communication pattern? (eg: Rest, MQTT, GRPC, etc)
- [ x ] Does your application have a well-defined data contract? (eg: Swagger, Avro, Apiblueprint, Open API, GraphQL)
- [ x ] Is your documentation updated and reflect the current state of the API?

#### Dependency management

- [ x ] Does your application use LTS (Long Term Support) versions when available?
- [ x ] Does your application use stable versions of your dependencies when no stable version is available?

#### Design, build, release, and run

- [ x ] Does your application use a known communication standard and/or pattern between services? (e.g. AMQP, MQTT, GRPC, SOAP, REST, GraphQL, etc)
- [ x ] Does your application have semantic versioning (semver.org)?
- [ - ] Are the changes documented in a Changelog file?
- [ - ] Does your application architecture have documentation, e.g. processes, components, services, all dependencies, systems, and everything it needs to function?
- [ - ] Does your application have network topology documentation? (eg. UML network architecture diagram)
- [ - ] Is your network topology documentation written within your project repository or does the project documentation have a link for it?
- [ - ] Does your project have an architecture.md?
- [ x ] Do you follow the company deploy guidelines?
- [ - ] Do you have all your alerts and alarms?
- [ x ] In case of database changes do you have migrations and have a way to rollback the changes?

#### Documentation

- [ - ] Is there a model of how the project architecture is, such as the structuring of folders, mainstreamed patterns, and technology used?
- [ - ] Is there topology documentation? (e.g.: Network communication diagram, environments, etc.)
- [ - ] Are there any external dependencies, such as database services and other systems? (e.g.: database documentation)
- [ - ] Is it clear which systems the solution communicates with? (e.g. communicates with "Service A" through Rabbit, etc)

#### Domain-driven

- [ x ] Are your environment-dependent settings changeable through environment variables? (e.g. environment variable with credentials, URLs)
- [ x ] Are sensitive environment settings protected properly? (e.g. encrypted)

#### Logs

- [ x ] Does your application have logging levels? (e.g. debug, warning, error, and info)
- [ x ] Do your logs follow the company-defined log standards?
- [ x ] Does your log messages have timestamp?
- [ x ] Does your log messages have an identifier?
- [ x ] Does your application obscure sensitive data in the log?
- [ x ] Does your error log have context information where the problem happened? (eg. which Pod, which server, which container)
- [ x ] Does your log information have all necessary data to debug?
- [ x ] Is it possible to identify the source (system or server) of the log entry?
- [ x ] Do the logs have properties and attributes for aggregation, classification, and search, like timestamp, log level, application, container/server, and other relevant data?

#### Environment parity

- [ x ] Do all non-production environments have an equivalent topology to production but not necessarily on the same scale?
- [ x ] Do all non-production environments have sufficient data for development and safety approval?
- [ x ] Do all environments have the same dependency versions?
- [ x ] Do all environments have the same operating system versions?
- [ x ] Do all environments have the same versions of the tools and applications required by the project?

#### Administrative processes

- [ x ] Do all environments perform the same migrations?
- [ x ] Does your migration planning inform all areas involved?

#### Port binding

- [ x ] Does the application export all the necessary port bindings (TCP/UDP)?
- [ x ] Is the port bind documented? (e.g. ansible-env or Dockerfile)

#### Stateless processes

- [ x ] Do your processes depend purely on input data (e.g. user, endpoint)?
- [ x ] Do your processes only return data without persisting in any way?
- [ x ] Are your processes atomic, that is, independent of messages and other processes outside their scope?
- [ x ] Does your application, when it restarts or scales, neither harm nor lose data and state of business processes?
- [ x ] Does your application guarantee the transactionality of messages and processes?

#### Stateful processes

- [Not Applicable] Does the process depend on data other than input?
- [Not Applicable] Does the process use stored data and states?
- [Not Applicable] Does the process persist state?
- [Not Applicable] Is the process not atomic, that is, depends on processing, messages, and states outside its scope?
- [Not Applicable] Is the process not transactional, i.e. depends on external factors (e.g. remote calls)?

#### Infrastructure

- [ x ] Does the application use infrastructure as a code and it’s under version control? (e.g.: terraform, cloudformation)
- [ x ] Is the application being monitored? (ex: Zabbix, Prometheus).
- [ x ] Is the application deployed in multiple areas or zones? (ex: Amazon Multi-AZ)

#### Basic Telemetry

- [ x ] Does your application have performance monitoring? (e.g. New Relic, Dynatrace, etc)
- [ - ] Are there alarms in cases of non-standard behavior?
- [ x ] Does the microservice health checks include connectivity and availability of basic systems for the operation of the microservice?
