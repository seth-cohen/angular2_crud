# noinspection SqlNoDataSourceInspectionForFile
CREATE TABLE `tblAddress` (
  `AddressID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UserID` int(11) unsigned DEFAULT NULL,
  `Street` varchar(256) NOT NULL DEFAULT '''''',
  `City` varchar(256) NOT NULL DEFAULT '''''',
  `State` varchar(256) NOT NULL DEFAULT '''''',
  `Zip` varchar(10) NOT NULL DEFAULT '''''',
  PRIMARY KEY (`AddressID`),
  CONSTRAINT `FK_UserID_tblUser_UserID` FOREIGN KEY (`AddressID`) REFERENCES `tblUser` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tblUser` (
  `UserID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) NOT NULL DEFAULT '''''',
  `LastName` varchar(50) NOT NULL DEFAULT '''''',
  `Email` varchar(256) NOT NULL DEFAULT '''''',
  `Telephone` varchar(16) NOT NULL DEFAULT '''''',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;