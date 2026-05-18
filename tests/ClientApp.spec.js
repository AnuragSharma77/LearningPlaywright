const {test,expect} = require('@playwright/test');
//waitForLoadState('networkidle')- this waitforloadstate method is used where we have to wait for the apis to load 
// Two ways to create locator with text - 1st which search on the whole page eg - "text= Add to Cart" and 2nd that seach around the particular tag = "tagname: has text ("")"
//pressSequentially - this is a method which is used when we have to enter the input one by on letter in the field

test("Browser Context-Validating Error Login", async({page}) => {

    await page.goto("https://rahulshettyacademy.com/client") 
    await page.locator('#userEmail').fill("anshika@gmail.com")
    await page.locator('#userPassword').fill('Iamking@000')
    await page.locator("#login").click()
    // await page.waitForLoadState('networkidle') - if api tkes more time to load
    await page.locator(".card-body b").first().waitFor() // wait for is used to eait for the particular element correspnding to that locator
    const titles = await page.locator('.card-body b').allTextContents()
    console.log(titles)
});


test.only("Client App login", async({page}) => {

    const productName = "ZARA COAT 3"
    const products = page.locator('.card-body')
    await page.goto("https://rahulshettyacademy.com/client") 
    await page.locator('#userEmail').fill("anshika@gmail.com")
    await page.locator('#userPassword').fill('Iamking@000')
    await page.locator("#login").click()

    // find the product to buy from list of products
    await page.waitForLoadState('networkidle')
     await page.locator('.card-body b').first().waitFor()
    const titles = await page.locator('.card-body b').allTextContents()
    console.log(titles)
// find zara coat 3 product

const count = await products.count()
for (let i = 0; i < count ;++i){
    if(await products.nth(i).locator("b").textContent() === productName){
        //add to cart
        await products.nth(i).locator("text =  Add To Cart").click()
        break;
    }
    
}
await page.locator("[routerlink*='cart']").click()
await page.locator("div li").first().waitFor()
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
expect(bool).toBeTruthy()
await page.locator("text = checkout").click()
await page.locator('div.field.small').nth(1).locator(".input").fill("232")
await page.locator('div.field').nth(3).locator(".input").fill("Virat")
// await page.locator('[name="coupon"]').fill("DUAP12")
// await page.locator('button:has-text("Apply Coupon")').click()
await page.locator ("[placeholder*= 'Select Country']").pressSequentially("ind")
const dropdown = page.locator(".ta-results");
await dropdown.waitFor()
const optionCount = await dropdown.locator('button').count()
for (let i = 0 ; i < optionCount ; ++i){
    const text = await dropdown.locator('button').nth(i).textContent()
if (text === " India"){
await  dropdown.locator('button').nth(i).click()
break;
}}
await page.pause()
});