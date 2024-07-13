# Datamonster.web

This originally was part of a mono-repo but after enough experimentation I decided on a structure.

## Requirements

- Node 22.2.0
- A managed supertokens instance

## Set Up

- Replace the contents of config/appInfo as you see fit.
  - These values are not set anywhere within supertokens
  - They are used for initialization and can be set to generally whatever you feel is appropriate
- Create an .env.local file in the project's root witht the following values;
  - API_KEY: the `Core API key` from your managed supertoken instance's landing page.
  - AUTH_CONN: the `Core connectionURI` from your managed supertoken instance's landing page.
  - JWKS_URI: take the value of AUTH_CONN and append the following to the end of it `.well-known/jwks.json`

## Structure

The `app` directory handles all of our client and server routes.  
The `components` directory contains all of our reusable components.  
The `config` directory mostly holds the configuration needed for supertokens.  
The `lib` directory is for reusable functions. Other projects might name this one `utils`.  
