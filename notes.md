## Github Actions -> Docker Hub

### Vad som behövs

- En app att pusha till Github
- Access Tokens från Docker Hub
- Actions tokens för Docker Hub Inloggningen

I projektet, skapa mapparna:

```yml
.github/workflows
```

Skapa filen:

```yml
publish-image.yml
```

Kod för Github Actions:

```yml
name: Docker Build and Push

on:
  push:
    branches:
      - main # Change this to your main branch name

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push Docker imag
        run: |
          docker build . -t bugzapper/iss-app-cicd:latest
          docker push bugzapper/iss-app-cicd:latest
```

För att skapa en username token:

- Github actions i settings och skriv in undefined0x@protonmail.com
- Gör sedan en token:

```yml
username: ${{ secrets.DOCKER_USERNAME }}
```

För password, gå till Docker Hub och security

- Gör en secret key
- Använd den i Github för att skapa:

```yml
password: ${{ secrets.DOCKER_PASSWORD }}
```

### Pusha sedan hela projektet till Github, då startar allt.
