 CREATE TABLE users
   (
      id SERIAL UNIQUE, 
      gender VARCHAR(6),
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
	
	



	
	
select  nationality,gender,
CASE
WHEN Extract(year from (age(current_date,cast(dob as date)))) < 30  THEN COUNT(1)
END as belowthirty,
CASE
WHEN Extract(year from (age(current_date,cast(dob as date)))) > 30 and  Extract(year from (age(current_date,cast(dob as date)))) < 40  THEN COUNT(1)
END as abovefourty,
CASE
WHEN Extract(year from (age(current_date,cast(dob as date)))) > 50 THEN COUNT(1)
END as abovefifity
from users group by nationality,gender,dob
having gender = 'Male'






select  nationality,gender,
CASE
WHEN Extract(year from (age(current_date,cast(dob as date)))) < 30  THEN COUNT(1)
END as belowthirty,	
CASE
WHEN Extract(year from (age(current_date,cast(dob as date)))) > 30 and  Extract(year from (age(current_date,cast(dob as date)))) < 40  THEN COUNT(1)
END as abovefourty,
CASE
WHEN Extract(year from (age(current_date,cast(dob as date)))) > 50 THEN COUNT(1)
END as abovefifity
from users group by nationality,gender,dob
having gender = 'Female'








