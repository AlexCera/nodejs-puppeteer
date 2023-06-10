import puppeteer from 'puppeteer';
import fs from 'fs/promises';

async function openWebPage() {
    /* Iniciar puppeteer */
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200
    });
    /* indicar que abriremos una página web y luego la visitamos */
    const page = await browser.newPage();
    await page.goto("https://example.com");
    /* finalizar-cerrar navegador */
    await browser.close();
}
//openWebPage();

async function captureScreenShoot() {
    /* Iniciar puppeteer */
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200
    });
    /* indicar que abriremos una página web y luego la visitamos */
    const page = await browser.newPage();
    await page.goto("https://example.com");

    /* realizar captura e indicar el path donde esta se guardara */
    await page.screenshot({ path: 'screenshoot.png' });

    /* finalizar-cerrar navegador */
    await browser.close();
}
//captureScreenShoot();

async function clickOn() {
    /* Iniciar puppeteer */
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200
    });
    /* indicar que abriremos una página web y luego la visitamos */
    const page = await browser.newPage();
    await page.goto("https://quotes.toscrape.com");

    /* click */
    await page.click('a[href="/login"]');
    await new Promise(r => setTimeout(r, 2500))

    /* finalizar-cerrar navegador */
    await browser.close();
}
//clickOn();

async function extractInfoWebPage() {
    /* Iniciar puppeteer */
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200
    });
    /* indicar que abriremos una página web y luego la visitamos */
    const page = await browser.newPage();
    await page.goto("https://example.com");

    const data = await page.evaluate(() => {
        const title = document.querySelector('h1').innerText
        const description = document.querySelector('p').innerText
        const more = document.querySelector('a').innerText
        return { title, description, more }
    })

    console.log(data);

    /* finalizar-cerrar navegador */
    await browser.close();
}
//extractInfoWebPage();

async function extractDynamicInfoWebPage() {
    /* Iniciar puppeteer */
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200
    });
    /* indicar que abriremos una página web y luego la visitamos */
    const page = await browser.newPage();
    await page.goto("https://quotes.toscrape.com");

    /* Obtener la data de la página web */
    const data = await page.evaluate(() => {
        const quotes = document.querySelectorAll(".quote");
        const data = [...quotes].map((quote) => {
            const quoteText = quote.querySelector(".text").innerText;
            const author = quote.querySelector(".author").innerText;
            const tags = [...quote.querySelectorAll(".tag")].map(
                (tag) => tag.innerText
            );
            return { quoteText, author, tags };
        });
        return data;
    });

    /* Guardar la data en un archivo JSON */
    await fs.writeFile('quotes.json', JSON.stringify(data, null, 2));

    /* finalizar-cerrar navegador */
    await browser.close();
}
//extractDynamicInfoWebPage();