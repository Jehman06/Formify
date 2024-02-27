# Formify

[Formify](https://www.formifyapp.com) is a form backend API service for API forms. It's a simple way to embed custom contact us forms. Build your front end, submit to Formify API and it'll handle the rest.

## Features

**Custom Forms**: Create and embed custom contact forms tailored to your needs.

**API Integration**: Seamlessly integrate with your front end using the Formify API.

**Easy Implementation**: Build your front end without worrying about the backend setup; Formify handles it for you.

## How to use

1. Create an account on [Formify(https://www.formifyapp.com)].
2. Create a new form using the New Form button. This will generate a token for your form, to separate the different projects you may have.
3. Copy the API endpoint and and place it in the action attribute of your form. Make sure to use `method='POST'`. Each input in your form should have a `name` attribute.
4. Integrate with your usecase!
