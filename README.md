
# Guide to Running the Blog Post Microservice-Based React Web Application on Windows

This guide walks you through setting up and running a blog post microservice-based React web application as described in Chapter 7 of *'Cloud-Native Computing'* by Pethuru Raj.

## Installation Steps
### Step 1: Before starting, ensure that you have Node.js and npm installed on your system. You can verify the installation by running the following commands in your command prompt:

```
node --version
npm --version
```
### Step 2: Clone the Project Repository
Clone the project repository from GitHub:
```
git clone https://github.com/janayas1/microservices-demo-raj-ch7
```
### Step 3: Create a New React Application

Navigate to the cloned directory microservices-demo-raj-ch7. This will be your parent directory.
Open a command line inside microservices-demo-raj-ch7 and run the following command:

```
npx create-react-app client
```

### Step 4: Set Up Microservices

For each microservice (posts, comments, event-bus, query), perform the following steps:

#### Posts Service Setup

Navigate to the **posts** directory and initialize a new Node.js application:

```
cd posts
npm init -y
```
#### Install required packages:

```npm install express axios cors nodemon```

#### Comments Service Setup

Repeat the same process for the comments service:
```
cd ../comments
npm init -y
npm install express axios cors nodemon
```

#### Event Bus Service Setup
Set up the event bus similarly:

```
cd ../event-bus
npm init -y
npm install express axios nodemon
```

#### Query Service Setup
Finally, set up the query service:
```
cd ../query
npm init -y
npm install express cors nodemon
```

### Step 5: Install Axios for the Client

Return to the client directory and install Axios:

```
cd ../client
npm install axios
```

### Step 6: Update Source Files

Navigate to the **src** directory and copy all files from srcNew to src, **overwriting App.js** You can do this using  the following command or by simply using Windows Explorer:

```
cd src
xcopy ..\..\srcNew\*.* . /y
```

### Step 7: Update package.json Scripts

For each service directory (posts, comments, event-bus, query), update the package.json scripts:

Open package.json in a text editor and replace:

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

With:

```
"scripts": {
  "start": "nodemon index.js"
},
```

### Step 8: Start the Services

Open a command line for each service directory(posts, comments, event-bus, query) and the client directory, then start them with:

```
npm start
```

The services produce extensive logs, useful for debugging and observing how messages flow between the post and comment microservices to the event-bus, and how the query service receives events from the event-bus.

### Step 9: Access the React App

After starting the client service, a web browser should automatically open and display the React application.
