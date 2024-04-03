# Reading Room

An application where users can join or create book clubs. Project created for COMP 7082 Winter 2024. 

<img src="https://img.shields.io/badge/ASP.NET%20-512BD4?&style=for-the-badge&logo=dotnet&logoColor=white" />
<img src="https://img.shields.io/badge/CSHARP%20-000000?&style=for-the-badge&logo=csharp&logoColor=white" />

<p align="center"><a href="https://readingroom.fly.dev">Hosted Link</a>
</p>

<p align="center">
  <img src="https://i.ibb.co/Dg3H9hV/thumbnail-1.png" width="300"/>&nbsp;&nbsp;<img src="https://i.ibb.co/pWXGhV8/thumbnail-2.png" width="300"/
</p>

## Project Features

* User authorization with .NET Core Identity 
* Public profile pages with customization
* View book clubs, filter results
* Join or leave book clubs
* Realtime chats on club pages powered by SignalR
* Create, edit, or delete your own book clubs

## Getting Started

### Dependencies

* Windows or macOS
* Install the .NET 7.0 SDK from here:
  - https://dotnet.microsoft.com/en-us/download/dotnet/7.0 
* Node 16.0 or higher
  - https://nodejs.org/en
 
### Initial Setup 
When you first clone the repo, run through these steps. 

Add a file to the /API folder called **appsettings.json** and populate it with the following code: 
```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*",
  "Cloudinary": {
    "CloudName": "dicszxcqo",
    "ApiKey": "287649759218743",
    "ApiSecret": "vaJiPE0neUwyyz_ij6YKn7DCy_E"
  }
}
```

Installing this tool is optional, but required if you want to clear out the local database. Run this command from the project level directory /ReadingRoom
```
dotnet tool install --global dotnet-ef --version 7.0.2
```

### Executing program

These instructions are for running the program locally.
* cd into the project folder and build the project
```
cd readingroom
dotnet build
```



* From a terminal in the API folder, start the server
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

In a browser, navigate to http://localhost:3000/ to view the app. 

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

If you want to remove all of the extra test data you've added and start with a fresh set, stop the server and run this command from the project level directory
```
dotnet ef database drop -s API -p Persistence
```
Hit y to confirm. Then, cd to the /API folder and start the server again 
```
cd API
dotnet watch
```

## Acknowledgments

* [Semantic UI](https://react.semantic-ui.com/)
* [Visily Wireframes](https://app.visily.ai/)
* [React Photo Dropzone](https://react-dropzone.js.org/)
