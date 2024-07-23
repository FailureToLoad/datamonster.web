# Datamonster.web

This originally was part of a mono-repo but after enough experimentation I decided on a structure.

## Requirements
- A managed WorkOS instance

## Set Up

- Create your own .env.local file by using the .env.local.example file as a base.
  - `WORKOS_COOKIE_PASSWORD` is the only one you have to generate manually.
  - I used openSSL for mine `openssl rand -base64 24`

## Structure

The `app` directory handles all of our client and server routes.  
The `components` directory contains all of our reusable components.  
The `lib` directory is for reusable functions and types. Other projects might name this one `utils`.  
