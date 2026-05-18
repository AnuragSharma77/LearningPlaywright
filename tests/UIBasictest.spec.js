const {test,expect} = require('@playwright/test');
//Fixtures are predefined usable objects used in test case joki required chizai provide krta hai humare test case ko run krne kai lie and after completion cleanup krta hai jaise closse the browser
// await are only used when we have to initiate a step only . Not used when we are creating variables
// nth() function is basicaaly used when we have to exctract the text on index basis. .first() is used when we have to extract the first text
// when empty '' is passed , means it clears the already present text from the field
//allTextContents() is the method used to get the text  of all matched elements as an array of strings
// to be falsy method is used to check when we are using with assertion where we are expecting outcomes should be true or false . to check this we use this method  
// waitforevent() method is used when on clicking link a new page is opening in the background . To catch that background page we use this method


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
    // expect (page.locator("#terms").isChecked()).toBeFalsy() // await is coming after using expect assertion because ischecked() action is called inside the bracket
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