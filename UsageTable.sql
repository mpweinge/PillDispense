CREATE TABLE UsageTable(
	EntryNo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	PharmacistID INT NOT NULL,
	PillName varchar(255) NOT NULL,
	ChangeInCount INT NOT NULL,
	Patient varchar(255) NOT NULL,
	CurrDate DATETIME NOT NULL
);
