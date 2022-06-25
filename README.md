# Komerce

Komerce is a basic B2C eCommerce store for Small merchants. This project served as an exercise for me in ReactJs and Node.js with express.

Refer the design document below for deep understanding.
# https://docs.google.com/document/d/1xiRgBQFMXFPrwBDIlJbnRm5wFLw_TMPirqEsnES4aqI/edit?usp=sharing

This application have two parts one is the admin area (Admins of the merchant) and the other one is the users who shop on the ecommerce front end (Ecommerce shoppers).

# Consumer purchase journey (general)

1. End-user goes to collections page and selects a particular product to view the product page before adding it to cart.

2. Once they add the product to the cart they can go through the checkout and place the order.

3. They can use credit cards to do the checkout.

4. Once they checkout they can see the list of orders they have placed.

# The list of pages available in this application are given below.

· Collections Page

· Product page

· Shopping cart

· Checkout page

· Payment page

· Order confirmation page

· Sign up page

· Login page

· Admin Dashboard

· Admin Create products

· Admin Edit products

· Admin products list page

· Admin order list page

· Admin Coupon creation page

· Admin Coupon list page

· Admin Coupon edit page

Order Confirmation Email - Once a successful order is placed the customer will receive an email with the details of the order.

# Ecommerce store functions

1. Products

Each product will have the following attributes:

SKU: It is a unique id for the product in the system. Can have only 1 product with the given SKU. - Mandatory

Name: product name – Mandatory

Description : Mandatory

Image – one single image will be supported – Mandatory

Price – Mandatory

inventory – will be 0 or more. In the Product page the add to cart button will be shown only if the quantity is > 0. Also when the customer places order before processing order the quantity will be checked to be > 0. When a successful order is placed the order quantity will be reduced from the inventory.

Status: active/inactive. – Mandatory. If the product is set as inactive this will not be shown in the collections page and even if you try the URL directly you will not be able to display the product.

Users will navigate to product page from the collections page. Once they click on the add to cart button it will be added to cart only products in stock will display add to cart button.

2. Collections page

All products which have a status of “active” will be listed on the collections page. By clicking on one of the pages user can navigate to the product page. If we update a product and change the status in admin it will reflect on the collections page .

3. Cart page

Users can click on the cart icon to view the cart page. Here they can see all the products that were added to the cart. Discount coupon can be updated on the cart page and the appropriate discount rules should be applied and cart should reflect and display all the updated prices.

Users can increase the quantity of the items in the cart.

Users can remove items in the cart.

Users can apply discount coupon in the cart.

Users can go back to browsing products from Cart page.

Users can navigate to the checkout page.

4. Checkout page

From cart page users can navigate to the checkout page. Here customer needs to provide his name and address and proceed to the payments page.

5. Payments page

Place payments using this page.Used stripe for payment processing

6. Order success page

Once the payment is successful show a success message and display the full details of the order. The order should be stored in the db and if the customer logs in back in store front he can see the orders from his account page.

7. Order email

Once a successful order is placed the customer will receive an email with the details of the order.

.

# Admin module functions

1. Dashboard

This will have a left menu which has “products”, “orders” and “discounts”. We will have functionality in admin to create products, edit and delete them also discounts. We can view orders which are created in the front end.

2. Product page

Will have pages for product creation, edit and deletion. Clicking on the name of the product will take you to the product detail page. You can turn on or turn off the products.

3. Order page

You can view all the orders in the system in admin. Order number is clickable and will take you to the order detail page.

4. Discounts page

You can create a discount code in admin. The discount will have following attributes % of discount on the product price, start and end date, active/inactive and products to which it will be applicable to.

Discount code can be applied to more than one product. Discount can be turned active or inactive. Even if the discount is active once it is beyond the end date it should not get applied.

-----------------------------------------------------------
