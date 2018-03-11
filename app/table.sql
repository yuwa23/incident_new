 CREATE TABLE users
   (
      id SERIAL UNIQUE, 
      title VARCHAR(90),
      fname VARCHAR(90),
      lname VARCHAR(90),
      street VARCHAR(90),
      city VARCHAR(90),
      state VARCHAR(90),
      postcode VARCHAR(90),
      email VARCHAR(90),
      dob VARCHAR(90),
      registered VARCHAR(90),
      phone VARCHAR(90),
      cell VARCHAR(90),
	  idname VARCHAR(90),
	  idvalue VARCHAR(90),
	  nationality VARCHAR(90)
    );