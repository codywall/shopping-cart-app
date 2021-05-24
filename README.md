# Shopping app

## Task 
Include the product image, title, price, and link to the product page URL.
Present a UI that is clean, visually interesting, intuitive, and efficient for the user to do the following:
* Add an item to a cart
* Sort items according to price, title, brand, availability

## Steps

### Ideation/sketches
First, I figured out what was most important to the user. Based on the requirements I was given, adding an item to the cart must be easy, and sorting items should be simple and intuitive. I kept that in mind and started with some quick sketches. Then I brought the sketches I was happiest with into Adobe XD to see how they would look as a lofi wireframe. This was a helpful stage as I was able to quickly plan out what the different screens and user states should look like.
 
 <img src="https://user-images.githubusercontent.com/22305037/119307699-ed3b6480-bc20-11eb-85fd-eb42f96793b7.jpeg" width="382" height="auto">---------->        <img width="382" alt="Screen Shot 2021-05-23 at 11 50 20 PM" src="https://user-images.githubusercontent.com/22305037/119308231-a7cb6700-bc21-11eb-9eea-79af2d9088ab.png">

## Prototyping
Once I was happy with the flow of the app and felt it had a good content structure, I began building a high fidelity prototype in Adobe XD. I created a color scheme that fit with the style I wanted to use. Then I started adding colors and and shapes to create visual interest using the lofi wireframes as a guide. Spending the time to design the look and feel ahead of time saved me a lot of time once I began styling the app with SASS.

<img width="385" alt="Screen Shot 2021-05-23 at 11 52 50 PM" src="https://user-images.githubusercontent.com/22305037/119309062-a3ec1480-bc22-11eb-8804-a723909789ce.png">_____________<img width="381" alt="Screen Shot 2021-05-23 at 11 52 37 PM" src="https://user-images.githubusercontent.com/22305037/119309072-a6e70500-bc22-11eb-8cb7-837ef82ba5f3.png">


## Building the application
To begin the coding process, I created the markup I would need using HTML, and added classes to the elements in the style of BEM. Elements which would need contents dynamically modified were given IDs. I also brought in the JSON List file via fetch and displayed it on the page early on. 

Then I began styling, using SASS. I haven't used it much so I felt I was underutilizing it. I usually used styled components, but wanted to see what using SASS could be like. Nesting and using variables was very helpful, but I could have tried using some mixins to save time repeating code. 

I wanted to use vanilla Javascript because after ~2 years of using React, I felt out of practice with it. It definitely felt like I would have been finished sooner if I had used React, but it was fun figuring out how to architect the application without a framework or library to help. Things like managing user state, templating, and rendering were much trickier using vanilla JS.


## Takeaways

I got hung up on adding a lot of functionality to the shopping cart which wasn't necessary according to the requirements, but those were problems I enjoyed solving so it was worth it to me. I refactored the cart to use localStorage instead of just outputting the cart items straight into a div so I could have a separate cart page. However, changing it in this way meant that many of my original cart functions were broken, and I had to put in extra time fixing those. Creating the counter which displays how many items are in the cart was pretty cool. 

If I had more time to work on this project, I would add animations to add more visual interest. I would also take a broader look at the overall usage of files and scripts, and try to arrange my Javascript files in a more structured way.
