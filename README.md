# My Health Coach (Backend)

A Health and Fitness API that serves as the backend engine for a comprehensive application designed to effortlessly track, plan, and organize your workouts and meals. Engineered for performance and scalability, this API is built in an efficient development environment to ensure seamless integration and optimal operation

## Frontend Repository
The fronted for this project is hosted in a separate repository. It is built in Next.js using React with Typescript and pulls data from the API presented in this repo

For source code and more details, click here: [My Health Coach (Frontend)](https://github.com/rpp2204-boc-charmander/charmander-front-end)

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Running Tests](#running-tests)
- [CI/CD Process](#cicd-process)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Docker

### Installation

A step-by-step guide to setting up the development environment.

Build the Postgres Docker container hosting the database

```
docker compose -f docker-compose-ci.yml up -d
```

Then start the nodemon server

```
npm run server-dev
```

### Running Tests

Make sure to have the Postgress Docker container up an running prior to running the test suite. Once you do that run this command

```
npm run test
```

## CI/CD Process

### GitHub Actions

We use GitHub Actions for continuous integration and deployment. The configuration is available in `.github/workflows`.

### Continuous Integration (CI)
The GitHub Actions workflow, named `Integration tests CI` is designed to automatically run integration tests on a Node.js application. It triggers on pushes and pull requests to the main branch, running on the latest Ubuntu environment. The workflow sets up a Node.js version specified in the strategy matrix, creates a .env file from GitHub secrets, initializes a database container via the configured Docker Compose `docker-compose-ci.yml`, installs project dependencies, and runs the test suite. After the tests are complete, it also shuts down the Docker containers.
 
```
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: create env file
        run: |
          echo "${{ secrets.ENV_FILE }}" > .env

      - name: Start db container from compose file
        run: docker compose -f docker-compose-ci.yml up -d

      - name: Install node
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm i --frozen-lockfile

      - name: Run tests
        run: npm test

      - name: Stop containers
        run: docker compose down
```

### Continuous Deployment (CD)
The GitHub Actions workflow, named `Deploy to EC2`, is designed to automate the deployment of a backend application to an AWS EC2 instance upon any push to the main branch. Running on the latest Ubuntu environment, the workflow sets up Docker Buildx for container operations and logs into Docker Hub using secured credentials. It builds and pushes the latest Docker image for the backend application. The workflow then transfers a schema file and Docker Compose files to the EC2 instance using SCP. Upon transferring these files, it SSHs into the EC2 instance to pull the latest Docker image, stop the existing backend application, and restart it using Docker Compose. This Docker Compose setup includes a PostgreSQL database and the backend application, ensuring both are orchestrated together in a consistent environment. This action thus provides an automated and streamlined build and deployment process, enabling seamless updates to the live application on the EC2 instance.

```
steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Set up QEMU
        uses: docker/setup-qemu-action@v2
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - name: Build and push
        uses: docker/build-push-action@v3
        with:
          push: true
          tags: rickyp00/charmander-back-end:latest

      - name: copy file via ssh password
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.AWS_HOST }}
          username: ubuntu
          key: ${{ secrets.PRIVATE_KEY }}
          port: ${{ secrets.PORT }}
          source: './schemas/schemaFile.sql, ./docker-compose.yml'
          target: './'

      - name: Push to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.AWS_HOST }}
          username: ubuntu
          key: ${{ secrets.PRIVATE_KEY }}
          script: |
            docker login
            echo "${{ secrets.ENV_FILE_PROD }}" > .env
            docker pull rickyp00/charmander-back-end:latest
            docker stop backend_app
            docker compose down
            docker compose up -d
```

### Docker for Consistent API Testing and Deployment in Agile Teams ✅
Using Docker to create a database container for testing offers several significant benefits, especially in an Agile development environment where rapid iteration and consistency are key. By containerizing the database, team members can easily replicate the same environment locally on their machines, eliminating the "it works on my machine" problem.

This ensures that tests are run under the same conditions across different stages of development, making debugging and collaboration much more efficient. Additionally, new team members can quickly onboard onto the project, as setting up their development and testing environment becomes as simple as running a few Docker commands.

The use of Docker containers also simplifies CI/CD pipelines, as demonstrated in the GitHub Actions workflow. Instead of having to manually configure databases on CI servers, the containerized approach ensures an identical setup each time tests are run, thereby speeding up the integration and deployment processes.

In summary, using Docker for database and application containerization enhances consistency, speeds up development and testing, and streamlines deployment, all of which are critical factors in Agile development.


