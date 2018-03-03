# From Zero to a Private Docker Registry

See companion blog & explanation here: https://medium.com/@valgaze/from-zero-to-private-docker-registry-b42abad46fef

Requirements:

- Docker

- AWS acccount + resource permissions to use AWS Elastic Container Registry (ECR)



## tl;dr version:

Run the following from the root of this repo, if you don't have npm/node available see "scripts" section of root package.json, destroy container & image with ```npm run killall```

### Build the image, it will be tagged as 'namegame:latest' (verify with $ docker images)

```
docker build -t namegame .
```

### Set up CLI tool (if not already configured you'll need secret access keys and region of your registry, hit ENTER to accept defaults)
```
aws configure
```

### Create a repository called namegame (this can also be accomplished from AWS management console)
```
aws ecr create-repository --repository-name namegame
```

### Authenticate to the docker registry (replace <>'s with the registry's region, copy the output of this first command into your terminal
```
aws ecr get-login --no-include-email --region <your-region-here>

#ex. $ aws ecr get-login --no-include-email --region us-west-1
```

### Tag your image with remote registry URI (replace <>'s below with your account id and the registry's region from previous step)
```
docker tag namegame:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/namegame

#ex. docker tag namegame:latest 0123456789.dkr.ecr.us-east-1.amazonaws.com/namegame 
```

### Push repository to remote registry (replace <>'s)
```
docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/namegame:latest
```

### [optional] Create container locally from remote registry

```
docker rmi namegame # Now no longer on our machine, we'll need to fetch from remote registry

docker create --name namegame_container -p 8000:8000 <aws_account_id>.dkr.ecr.<region>.amazonaws.com/namegame:latest


docker start namegame_container # should be available on port 8000
```

## Clean up
```
aws ecr delete-repository --repository-name namegame --force
```




