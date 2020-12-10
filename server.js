const express = require("express");
const { join } = require("path");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001

app.use(express.json());

app.use(
	cors({
	  origin: ["http://localhost:3000"],
	  methods: ["GET", "POST"],
	  credentials: true,
	})
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(
	session({
		key: "userId",
		secret: "distancetouch",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			expires: 60 * 60 * 24,
		},
	})
);


const db = mysql.createConnection({
	user: "bb21b84e2f4337",
	host: "us-cdbr-east-02.cleardb.com",
	password: "93ba4236",
	database: "dbms-project-final",
  });

app.get("/api/login", (req,res) => {
	if(req.session.user){
		res.send({loggedIn: true, user: req.session.user})
	} else {
	  res.send({loggedIn: false});
	}
});

  
  app.post("/api/login", (req, res) => {
	const Pin = req.body.Pin;
	const Password = req.body.Password;

	// console.log(Pin, Password);
	db.query(
		"SELECT * FROM Employees WHERE Pin = ? AND Password = ?", 
		[Pin, Password],
		(err, result) => {
			if(err){
				res.send({err: err});
			}

			if (result.length > 0) {
				req.session.user = result;
				console.log(req.session.user);
				res.send(result);
			} else {
				res.send({message: "Wrong Pin/Password combination!"});
			}
		});
});

// create new patient data
app.post("/api/insert", (req, res) => {
	const Fname = req.body.Fname;
	const Lname = req.body.Lname;
	const DOB = req.body.DOB;
	const Date = req.body.Date;
	const Time = req.body.Time;
	const Status = req.body.Status;
	const Category = req.body.Category;

	db.query("INSERT into Appointments (Fname, Lname, DOB, Date, Time, Status, Category, PatientID) VALUES (?, ?, ?, ?, ?, ?, ?, (Select PatientID from patients where Fname=? and Lname=? and DOB=?))", [Fname, Lname, DOB, Date, Time, Status, Category, Fname, Lname, DOB], (err, result) => {
		if (err) {
		console.log(err);
		} else {
		res.send('values inserted');
		}
	});
});

app.post("/api/log", (req, res) => {
	const Fname = req.body.Fname;
	const Lname = req.body.Lname;
	const DOB = req.body.DOB;
	db.query("INSERT INTO patients (Fname, Lname, DOB) SELECT * FROM (SELECT ?, ?, ?) AS tmp WHERE NOT EXISTS (SELECT Fname, Lname, DOB FROM patients WHERE Fname = ? and Lname = ? and DOB = ?) LIMIT 1;", [Fname, Lname, DOB, Fname, Lname, DOB], (err, result) => {
		if (err) {
		console.log(err);
		} else {
		res.send('values inserted');
		}
	});
});

app.post("/api/localize", (req, res) => {
	const Fname = req.body.Fname;
	const Lname = req.body.Lname;
	const Time = req.body.Time;
	const Message = req.body.Message;
	const Category = req.body.Category;
	db.query("INSERT INTO cardiologist (Fname) VALUES ('fuck this');", (err, result) => {
		if (err) {
		console.log(err);
		} else {
		res.send('values inserted');
		}
	});
});



// read all patient data
app.get("/api/patients/employee", (req, res) => {
	const sqlDelete = "Select * from appointments;";
	db.query(sqlDelete, (err, result) => {
		if (err) {
		console.log(err);
		} else {
		res.send(result);
		}
	});
});

// read all patient data
app.get("/api/patients/cardio", (req, res) => {
	const sqlDelete = "Select * from appointments where Category = \"Cardiologist\";";
	db.query(sqlDelete, (err, result) => {
		if (err) {
		console.log(err);
		} else {
		res.send(result);
		}
	});
});

// read all patient data
app.get("/api/patients/neuro", (req, res) => {
	const sqlDelete = "Select * from appointments where Category = \"Neurologist\";";
	db.query(sqlDelete, (err, result) => {
		if (err) {
		console.log(err);
		} else {
		res.send(result);
		}
	});
});

// read all patient data
app.get("/api/patients/endo", (req, res) => {
	const sqlDelete = "Select * from appointments where Category = \"Endocrinologist\";";
	db.query(sqlDelete, (err, result) => {
		if (err) {
		console.log(err);
		} else {
		res.send(result);
		}
	});
});



app.put("/api/update", (req, res) => {

	const Fname = req.body.Fname;
	const Lname = req.body.Lname;
	const DOB = req.body.DOB;
	const Status = req.body.Status;
	const sqlUpdate = "UPDATE appointments SET Status = ? WHERE Lname = ? AND Fname = ? AND DOB = ?"

	db.query(sqlUpdate, [Status, Lname, Fname, DOB], (err, result) => {
		if (err) {
			console.log(err)
		} 
	});
});

// delete specified patient data
app.delete("/api/delete/:lastName/:firstName", (req, res) => {
	const lastName = req.params.lastName;
	const firstName = req.params.firstName;

	console.log(lastName, firstName);

	const sqlDelete = "DELETE FROM appointments WHERE Lname = ? AND Fname = ? AND Status = \"Waiting\"";
	db.query(sqlDelete, [lastName, firstName], (err, result) => {
		if (err) {
		console.log(err);
		} else {
		res.send(result);
		}
	});
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}


app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
