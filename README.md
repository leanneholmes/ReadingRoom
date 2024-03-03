# Reading Room

An application where users can join or create book clubs.

## Description

To fill out

## Getting Started

### Dependencies

* Windows or macOS
* Install the .NET 7.0 SDK from here:
  - https://dotnet.microsoft.com/en-us/download/dotnet/7.0 
* Node 16.0 or higher
  - https://nodejs.org/en

### Executing program

These instructions are for running the program locally.
* Clone the repo and cd into the project folder
```
cd readingroom
dotnet build
```

* Start the API server
```
cd API
dotnet watch
```

* In a separate terminal, navigate to the client folder and start the client. Note the --legacy-peer-deps flag is required
```
cd client
npm install --legacy-peer-deps
npm start
```

### Test Data 
The following users will be populated into the database and can be used for test purposes:
| E-mail | Username | Password |
| --- | --- | --- |
| test@test.com | testuser | Pa$$w0rd |
| deanna@test.com | deanna | Pa$$w0rd |
| set@test.com | set | Pa$$w0rd |
| aryan@test.com | aryan | Pa$$w0rd |
| brian@test.com | brian | Pa$$w0rd |
| leanne@test.com | leanne | Pa$$w0rd |

## Help

If you encounter problems on the server side, try to run the following commands from the project level directory /readingroom
```
dotnet restore
dotnet build
```

If you want to remove all of the extra test data you've added and start with a fresh set, stop the server. Run these commands from the project level directory
```
dotnet tool install --global dotnet-ef --version 7.0.2
dotnet ef database -drop -s API -p Persistence
```
Hit y to confirm. Then, cd to the /API folder and start the server again 
```
cd API
dotnet watch
```

## Authors

To fill out

## Version History

To fill out

## License

To fill out

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)
