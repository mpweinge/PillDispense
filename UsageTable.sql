CREATE TABLE UsageTable(
	EntryNo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	PharmacistID INT NOT NULL,
	PillID INT NOT NULL,
	ChangeInCount INT NOT NULL,
	CurrDate DATETIME NOT NULL
);