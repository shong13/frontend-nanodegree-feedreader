/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("have URL", function() {
            for(let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();//checks for url to be defined
                expect(allFeeds[i].url.trim()).not.toBe("");//checks that url is not empty
                                                            //used trim() just in case the url was a string filled with white spaces
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("have feed names", function() {
            for(let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();//checks for name to be defined
                expect(allFeeds[i].name.trim()).not.toBe("");//checks that name is not empty
            }                                                // used trim() just in case the name was a string filled with white spaces
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        let body; //Since it's used in both tests, use the beforeEach() to simplify coding

        beforeEach(function() {
            body = document.querySelector("body");
        });

        it("is hidden by default", function() {
            expect(body.classList.contains("menu-hidden")).toBe(true);//using the DOM to pick out a query, check to see if the toggleable class is hidden when the web loads
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it("changes visibility", function() {
            const menuIcon = document.querySelector(".icon-list");//Need to check for clicks for toggle on/off

            if(body.classList.contains("menu-hidden")===true){ //check to see if the body contains "menu-hidden" class
                menuIcon.click(); //click to toggle 
                expect(body.classList.contains("menu-hidden")).toBe(false); //when clicked, we expect the "menu-hidden" to disappear
            }
            if(body.classList.contains("menu-hidden")===false){ //check to see if the body contains "menu-hidden" class
                menuIcon.click(); //click to toggle
                expect(body.classList.contains("menu-hidden")).toBe(true); //when clicked, we expect the "menu-hidden" to appear
            }
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        // const feed = document.querySelector(".feed");
        // const feedList = document.querySelector(".feed-list");
        // const testArray = [];

        beforeEach(function(done) {
            // let numElem = feedList.childElementCount;
            // for(let i = 0; i < numElem-1; i++){
                
            //     loadFeed(i, function() {
            //         testArray.push(feed.children.length);
            //     });
            // }
            // loadFeed(numElem-1, function() {
            //     testArray.push(feed.children.length);
            // });
            
            // done();
            loadFeed(1, done);
        });

        it("ensure at least 1 entry", function(done) {
            // console.log(testArray);
            // console.log(feed);
            // expect(testArray.length).toBe(4);
            const feed = document.querySelector(".feed");
            expect(feed.children.length).toBeGreaterThan(0);
            done();
        });
        /*Get a count of entries in the feed-list
          then use loop to loadFeed all index
          then while looping add number of child entries in a array
          then use the numbers stored in array to make sure none are 0
          expect the numbers not to be 0*/

    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
        //const feed = document.querySelector(".feed");
        const firstFeed = [];
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            // loadFeed(0);
            // console.log(feed.children[0].innerText);
            // Array.from(feed.children).forEach(function(element) {
            //     firstFeed.push(element.innerText);
            // });
            // loadFeed(1, done);
            
            loadFeed(1, function() {
                Array.from(document.querySelector(".feed").children).forEach(function(element) {
                    firstFeed.push(element.innerText);
                });
            });
            // loadFeed(1);
            // Array.from(document.querySelector(".feed").children).forEach(function(element) {
            //     firstFeed.push(element.innerText);
            // });
            loadFeed(3, done);

        });
        
        it("loads new feed", function(done) {
            // Array.from(feed.children).forEach(function(element, index) {
            //     console.log(element.innerText, firstFeed[index], element.innerText === firstFeed[index]);
            //     expect(element.innerText === firstFeed[index]).toBe(false);
            // });

            Array.from(document.querySelector(".feed").children).forEach(function(element, index) {
                console.log(element.innerText, firstFeed[index], element.innerText === firstFeed[index]);
                expect(element.innerText === firstFeed[index]).toBe(false);
            });
            done();
        });
    });
}());

//Make sure to test how "const feed = document.querySelector(".feed")" from the beginning affect the entire code.