const { Builder, By, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async function testCalculatrice() {
  let options = new chrome.Options();
  options.addArguments("--headless");
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  try {
    // 2. Accéder à l'application de la calculatrice
    await driver.get("http://localhost:8080");
    // --- Test 1 : Vérifier l'Addition ---
    let number1 = await driver.findElement(By.id("number1"));
    await number1.sendKeys("5");
    let number2 = await driver.findElement(By.id("number2"));
    await number2.sendKeys("10");
    let calculate = await driver.findElement(By.id("calculate"));
    await calculate.click();
    await sleep(2000);
    let result = await driver.findElement(By.id("result"));
    let resultText = await result.getText();
    // Afficher les résultats
    console.log("Résultat de l'addition de 5 et 10 : " + resultText);
    await sleep(2000);
    // --- Test 2 : Division par Zéro ---
    await number1.clear();
    number1.sendKeys("5");
    await number2.clear();
    await number2.sendKeys("0");
    await sleep(2000);
    let selectElement = await driver.findElement(By.id("operation"));
    await selectElement.findElement(By.css('option[value="divide"]')).click();
    await sleep(2000);
    await calculate.click();
    await sleep(2000);
    resultText = await result.getText();
    // Afficher les résultats
    console.log("Résultat de la division de 5 et 0 : " + resultText);
    await sleep(2000);
    // --- Test 3 : Entrée Non Valide ---
    await number1.clear();
    number1.sendKeys("abd");
    await number2.clear();
    await number2.sendKeys("bcd");
    await sleep(2000);
    await selectElement.findElement(By.css('option[value="add"]')).click();
    await sleep(2000);
    await calculate.click();
    await sleep(2000);
    resultText = await result.getText();
    // Afficher les résultats
    console.log("Résultat d'une entrée non valide : " + resultText);
    await sleep(2000);
    // --- Test 4 : Vérifier la Soustraction ---
    await number1.clear();
    number1.sendKeys("30");
    await number2.clear();
    await number2.sendKeys("20");
    await sleep(2000);
    await selectElement.findElement(By.css('option[value="subtract"]')).click();
    await sleep(2000);
    await calculate.click();
    await sleep(2000);
    resultText = await result.getText();
    // Afficher les résultats
    console.log("Résultat de la soustraction de 30 moins 20 : " + resultText);
    await sleep(2000);
  } finally {
    // Fermer le navigateur
    await driver.quit();
  }
})();
