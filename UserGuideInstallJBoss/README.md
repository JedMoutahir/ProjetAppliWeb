# Adding JBoss Server to Visual Studio Code

## Introduction
This README explains how to install and add your JBoss server to the list of servers in Visual Studio Code. This will allow you to perform server-related tasks directly from within the IDE.

## Prerequisites
Before you begin, you must have the following:

- Visual Studio Code installed on your machine
- The "Java Extension Pack" installed in Visual Studio Code
- The "Red Hat JBoss Tools" installed in Visual Studio Code
- The "Red Hat Server Connector" installed in Visual Studio Code

## Installing JBoss Server
To install JBoss Server, follow these steps:

1. Download the JBoss Server from the [JBoss Developer Studio website](https://developers.redhat.com/content-gateway/file/jboss-eap-7.4.0-installer.jar).
2. Run the JBoss Server installer : `java -jar jboss-eap-7.4.0-installer.jar`
3. Follow the instructions in the installer to install the JBoss Server.

## Adding JBoss Server to Visual Studio Code
To add your JBoss Server to Visual Studio Code, follow these steps:

1. Open Visual Studio Code.
2. Click on the "Servers" icon in the Activity Bar.
3. Click on the "Add Server" button.
4. Right-click on the "Red Hat" folder and select "Create New Server".
5. Select "No, use server on disk".
6. Select the path to the JBoss Server you installed in the previous steps.
