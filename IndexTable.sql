CREATE TABLE PillIndex (
	pillid INT NOT NULL,
	usageid INT NOT NULL UNIQUE,
	PRIMARY KEY (pillid, usageid)
) ENGINE=InnoDB;
