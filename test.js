const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
	let driver = await new Builder().forBrowser('firefox').build();
	try {
		//await driver.get('http://en.battleship-game.org');
		await driver.wait(until.titleIs('New Tab'), 1000);
		await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
		await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
		//var e1 =  driver.findElement(By.className('battlefield-start-choose_rival-variant-link__connect')).getAttribute();//sendKeys('webdriver', Key.RETURN);
		//console.log(e1);
	} finally {
		//await driver.quit();
	}
})();