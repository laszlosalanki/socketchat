const { Builder, By, Key, util } = require('selenium-webdriver');
require('chromedriver');

const address = "http://localhost:3000";

async function testLoginInput() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .build();

  await driver.get(address);

  driver.findElement(By.id('username-input'))
    .then(element => console.log('Input field (login): username found!'))
    .catch(error => console.log('Could not locate the `username` input field!'));

  driver.findElement(By.id('password-input'))
    .then(element => console.log('Input field (login): password found!'))
    .catch(error => console.log('Could not locate the `password` input field!'));
}

async function testRegistrationInput() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .build();

  await driver.get(address);

  driver.findElement(By.id('username-input-reg'))
    .then(element => console.log('Input field (registration): username found!'))
    .catch(error => console.log('Could not locate the `username` input field!'));

  driver.findElement(By.id('password-input-reg'))
    .then(element => console.log('Input field (registration): password found!'))
    .catch(error => console.log('Could not locate the `password` input field!'));

  driver.findElement(By.id('password-input2-reg2'))
    .then(element => console.log('Input field (registration): password2 found!'))
    .catch(error => console.log('Could not locate the `confirm password` input field!'));
}

testLoginInput();
testRegistrationInput();
