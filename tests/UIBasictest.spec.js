const {test,expect} = require('@playwright/test');
test("First Context Playwright Test", async({browser}) => {

    const context = await browser.newContext();  // newcontext - store cookies, plugin etc
    const page = await context.newPage(); // open the page 

     const userName = page.locator("#username")
     const signIn = page.locator("#signInBtn")
     const cardTitles = page.locator(".card-body a")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log (await page.title());
    // await page.locator("#username").fill("rahulshetty"); Below step is using userName Variable
    await userName.fill("rahulshetty");
    await page.locator("[type = 'password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*= 'block']").textContent)
    await expect(page.locator("[style*= 'block']")).toContainText('Incorrect')

    await userName.fill('') 
    await userName.fill('rahulshettyacademy')
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent()); 
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles)
});

test('New UI Controls',async ({page})=> {
    
     const userName = page.locator("#username")
     const signIn = page.locator("#signInBtn")
     const documentLink = page.locator('[href *= "techsmarthire.com"]')
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const dropdown = page.locator("select.form-control")
    await dropdown.selectOption("consult")
    await page.locator(".radiotextsty").last().click()
    await page.locator("#okayBtn").click()
    //assertion
     expect (await page.locator(".radiotextsty").last().isChecked())
    await expect (page.locator(".radiotextsty").last()).toBeChecked()
    await page.locator("#terms").click()
    await expect (page.locator("#terms")).toBeChecked()
    await page.locator("#terms").uncheck()
    // expect (page.locator("#terms").isChecked()).toBeFalsy() 
    await expect(page.locator("#terms")).not.toBeChecked()
    await expect (documentLink).toHaveAttribute('target', '_blank')
    
})

test.only ('@child windows hadle',async({browser})=>{

    const context = await browser.newContext(); 
    const page = await context.newPage();
    const userName = page.locator("#username")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentLink = page.locator('[href *= "documents-request"]')
    
    const [newPage] = await Promise.all(
    [context.waitForEvent('page'),
    documentLink.click()])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split('@')
    const domain = arrayText[1].split(" ")[0]
    // console.log(domain)
    await userName.type(domain)
    console.log (await userName.inputValue())

})
