# Starbucks-Tenant
REST API back-ends based on CRUD Restbucks Design.
Implementation of APIs is backed by a 3-Node NoSQL database cluster.

# Languages, Technologies, Database & Tools
Javascript,Node Js,Mongo DB

# URL
public DNS name: http://ec2-54-183-145-45.us-west-1.compute.amazonaws.com:3000/

port: 3000


# APIs
Place order API: (Method:POST) http://ec2-54-183-145-45.us-west-1.compute.amazonaws.com:3000/order

Pay API: (Method:POST) http://ec2-54-183-145-45.us-west-1.compute.amazonaws.com:3000/order/{ORDER_ID}/pay

Get order API: (Method:GET) http://ec2-54-183-145-45.us-west-1.compute.amazonaws.com:3000/order/{ORDER_ID}

Get all orders API: (Method:GET) http://ec2-54-183-145-45.us-west-1.compute.amazonaws.com:3000/orders

Delete order API:(Method: DELETE) http://ec2-54-183-145-45.us-west-1.compute.amazonaws.com:3000/order/{ORDER_ID}

Update order API:(Method: PUT) http://ec2-54-183-145-45.us-west-1.compute.amazonaws.com:3000/order/{ORDER_ID}

