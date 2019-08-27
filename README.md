# cmefapp
App for CMEF visitors to find out information about Orantech during the show

Specs for Node.js app for our CMEF Medical Exhibition for Orantech

Exhibition dates: Oct. 18-21 in 青岛(qing1 dao3)

Overview: The visitors of CMEF will see on our posters and booth a QR-code which if they scan will open the URL for this app: (http://app.orantech.com). This app will allow the user to do various things:
1.	Landing page: see information about our booth location or submit their mobile number to be contacted by us.
2.	Make Appointment: Book an appointment from a selection of 3 days (Oct. 18-21) and set times (every 30 minutes from 11 am – 3:30 pm).
3.	Product Overview: See a list of products (image and text only).
4.	Events at Orantech: See a list of events taking place at our booth during the Exhibition. 

Specifications:
There are 4 pages that connect to each other through buttons:
-	Landing
-	Appointment
-	Products
-	Events

 There are 3 external links:
-	Orantech Facebook page : missing
-	Orantech LinkedIn page : missing
-	Orantech Official Website : www.orantech.com

There are 2 forms that will collect user information, save it and email it to a specified email (for testing use: andres@medten.com for production: [missing]).
-	Landing page: Distributor submit (capture [phone_number], with validation, check for valid Chinese number or if not Chinese a number with a country code). Submit action will take the user to the Landing page displaying a confirmation where the “distributor” form previously was.
-	Make appointment: Appointment submit (capture [day], [time], [first_name], [last_name] and [email_or_phone_number], with validation, check email for valid email, or phone for a Chinese number or if not Chinese, a number with a country code).Submit action will take the user to the Landing page displaying a confirmation where the “distributor” form previously was.

Additional functions:
1.	All pages except for the Landing page will have a back button located to the left of the top “Orantech” logo which will always take the user back to the “original” landing page”.
2.	After the user has booked an appointment the “Book Appointment” button will turn into a “View Appointment” button. Clicking on this button will then take the user to a variation of the Appointment page where instead of a form, the user will see the information they submitted.
