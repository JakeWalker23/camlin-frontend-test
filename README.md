# camlin-frontend-test

Hello, Thank you for the opportunity to apply for this position at Camlin Group.



This repository is my submission for Camlin Groups Senior FrontEnd Engineer. It contains a User Inteface to visualise transformer data (JSON) and visualise it over time through a line graph. This repository utilises Vue3 and Pinia. The data comes from an AWS Lambda I deployed at https://camlin-test.co.uk. Even bought the domain!

The app is built and ran with Docker. 



## Secrets
Create a .env file in the root of the repository.

Example .env file:

- VUE_APP_JWT_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
- VUE_APP_API_URL="https://www.api.com"


The secrets will have been sent via a one time secret link via email.


## Running with Docker

```
docker build -t camlin-frontend .
docker run -p 8080:80 camlin-frontend
```

- You will see the application running on: http://localhost:8080
