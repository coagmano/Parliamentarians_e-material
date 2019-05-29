// This is a template for a Node.js scraper on morph.io (https://morph.io)

var cheerio = require("cheerio");
var request = require("request-promise-native");
// var sqlite3 = require("sqlite3").verbose();

getUrl = function (firstname, lastname) {
	return `https://www.ipea.gov.au/pwe/office-administrative-costs/${lastname}/${firstname}/Parliamentarian/2018-01-01`
}

names = [
 	['Adam', 'Bandt'],
	['Alan', 'Tudge'],
	['Alex', 'Gallacher'],
	['Alex', 'Hawke'],
	['Amanda', 'Rishworth'],
	['Amanda', 'Stoker'],
	['Andrew', 'Bartlett'],
	['Andrew', 'Gee'],
	['Andrew', 'Giles'],
	['Andrew', 'Hastie'],
	['Andrew', 'Laming'],
	['Andrew', 'Leigh'],
	['Andrew', 'Wallace'],
	['Andrew', 'Wilkie'],
	['Angus', 'Taylor'],
	['Anne', 'Aly'],
	['Anne', 'Ruston'],
	['Anne', 'Stanley'],
	['Anne', 'Urquhart'],
	['Anthony', 'Albanese'],
	['Anthony', 'Byrne'],
	['Anthony', 'Chisholm'],
	['Arthur', 'Sinodinos'],
	['Barnaby', 'Joyce'],
	['Barry', 'O\'Sullivan'],
	['Ben', 'Morton'],
	['Bert', 'van Manen'],
	['Bill', 'Shorten'],
	['Bob', 'Katter'],
	['Brendan', 'O\'Connor'],
	['Brian', 'Mitchell'],
	['Bridget', 'McKenzie'],
	['Carol', 'Brown'],
	['Catherine', 'King'],
	['Catryna', 'Bilyk'],
	['Chris', 'Bowen'],
	['Chris', 'Hayes'],
	['Christian', 'Porter'],
	['Clare', 'O\'Neil'],
	['Concetta', 'Fierravanti-Wells'],
	['Cory', 'Bernardi'],
	['Craig', 'Kelly'],
	['Damian', 'Drum'],
	['Dan', 'Tehan'],
	['Darren', 'Chester'],
	['David', 'Bushby'],
	['David', 'Coleman'],
	['David', 'Fawcett'],
	['David', 'Gillespie'],
	['David', 'Leyonhjelm'],
	['David', 'Littleproud'],
	['David', 'Smith'],
	['Dean', 'Smith'],
	['Deborah', 'O\'Neill'],
	['Derryn', 'Hinch'],
	['Don', 'Farrell'],
	['Ed', 'Husic'],
	['Emma', 'McBride'],
	['Eric', 'Abetz'],
	['Fiona', 'Nash'],
	['Fraser', 'Anning'],
	['Gai', 'Brodtmann'],
	['Gavin', 'Marshall'],
	['Ged', 'Kearney'],
	['George', 'Christensen'],
	['Glenn', 'Sterle'],
	['Graham', 'Perrett'],
	['Greg', 'Hunt'],
	['Helen', 'Polley'],
	['Ian', 'Goodenough'],
	['Ian', 'MacDonald'],
	['James', 'McGrath'],
	['James', 'Paterson'],
	['Jane', 'Hume'],
	['Janet', 'Rice'],
	['Jason', 'Clare'],
	['Jason', 'Falinski'],
	['Jason', 'Wood'],
	['Jenny', 'McAllister'],
	['Jim', 'Chalmers'],
	['Jim', 'Molan'],
	['Joanne', 'Ryan'],
	['Joel', 'Fitzgibbon'],
	['John', 'Alexander'],
	['John', 'McVeigh'],
	['John', 'Williams'],
	['Jonathon', 'Duniam'],
	['Jordon', 'Steele-John'],
	['Josh', 'Frydenberg'],
	['Josh', 'Wilson'],
	['Josh', 'Wilson'],
	['Julian', 'Hill'],
	['Julian', 'Leeser'],
	['Julie', 'Collins'],
	['Julie', 'Owens'],
	['Justine', 'Elliot'],
	['Karen', 'Andrews'],
	['Katy', 'Gallagher'],
	['Keith', 'Pitt'],
	['Ken', 'O\'Dowd'],
	['Ken', 'Wyatt'],
	['Kevin', 'Andrews'],
	['Kevin', 'Hogan'],
	['Kim', 'Carr'],
	['Kimberley', 'Kitching'],
	['Kristina', 'Keneally'],
	['Larissa', 'Waters'],
	['Lee', 'Rhiannon'],
	['Linda', 'Burney'],
	['Linda', 'Reynolds'],
	['Lisa', 'Chesters'],
	['Llew', 'O\'Brien'],
	['Louise', 'Pratt'],
	['Lucy', 'Gichuhi'],
	['Lucy', 'Wicks'],
	['Luke', 'Gosling'],
	['Luke', 'Hartsuyker'],
	['Luke', 'Howarth'],
	['Madeleine', 'King'],
	['Malarndirri', 'McCarthy'],
	['Malcolm', 'Roberts'],
	['Maria', 'Vamvakinou'],
	['Marise', 'Payne'],
	['Mark', 'Butler'],
	['Mark', 'Coulton'],
	['Mark', 'Dreyfus'],
	['Mathias', 'Cormann'],
	['Matt', 'Keogh'],
	['Matt', 'Thistlethwaite'],
	['Matthew', 'Canavan'],
	['Mehreen', 'Faruqi'],
	['Melissa', 'Price'],
	['Meryl', 'Swanson'],
	['Michael', 'Keenan'],
	['Michael', 'McCormack'],
	['Michael', 'Sukkar'],
	['Michaelia', 'Cash'],
	['Michelle', 'Landry'],
	['Michelle', 'Rowland'],
	['Mike', 'Freelander'],
	['Mike', 'Kelly'],
	['Milton', 'Dick'],
	['Mitch', 'Fifield'],
	['Murray', 'Watt'],
	['Nick', 'Champion'],
	['Nick', 'McKim'],
	['Nicolle', 'Flint'],
	['Nigel', 'Scullion'],
	['Nola', 'Marino'],
	['Pat', 'Conroy'],
	['Patrick', 'Dodson'],
	['Patrick', 'Gorman'],
	['Paul', 'Fletcher'],
	['Pauline', 'Hanson'],
	['Penny', 'Wong'],
	['Peter', 'Dutton'],
	['Peter', 'Khalil'],
	['Peter', 'Whish-Wilson'],
	['Rachel', 'Siewert'],
	['Rebekha', 'Sharkie'],
	['Rebekha', 'Sharkie'],
	['Rex', 'Patrick'],
	['Richard', 'Colbeck'],
	['Richard', 'Di Natale'],
	['Richard', 'Marles'],
	['Rick', 'Wilson'],
	['Rob', 'Mitchell'],
	['Ross', 'Vasta'],
	['Rowan', 'Ramsey'],
	['Russell', 'Broadbent'],
	['Sam', 'Dastyari'],
	['Sarah', 'Hanson-Young'],
	['Sarah', 'Henderson'],
	['Scott', 'Buchholz'],
	['Scott', 'Morrison'],
	['Scott', 'Ryan'],
	['Sharon', 'Bird'],
	['Sharon', 'Claydon'],
	['Shayne', 'Neumann'],
	['Simon', 'Birmingham'],
	['Skye', 'Kakoschke-Moore'],
	['Slade', 'Brockman'],
	['Stephen', 'Conroy'],
	['Stephen', 'Jones'],
	['Steve', 'Georganas'],
	['Steve', 'Irons'],
	['Steve', 'Martin'],
	['Steven', 'Ciobo'],
	['Stirling', 'Griff'],
	['Stuart', 'Robert'],
	['Sue', 'Lines'],
	['Susan', 'Templeman'],
	['Sussan', 'Ley'],
	['Tanya', 'Plibersek'],
	['Ted', 'O\'Brien'],
	['Terri', 'Butler'],
	['Tim', 'Storer'],
	['Tim', 'Watts'],
	['Tim', 'Wilson'],
	['Tony', 'Burke'],
	['Tony', 'Pasin'],
	['Tony', 'Smith'],
	['Tony', 'Zappia'],
	['Trent', 'Zimmerman'],
	['Trevor', 'Evans'],
	['Warren', 'Entsch'],
	['Warren', 'Snowdon'],
	['Zed', 'Seselja'],
]

async function test () {
	var result = await Promise.all(names.map(async (name, i) => {
		var url = getUrl(name[0], name[1]);
		
		await pause(i * 1500);

		var page = await request(url);
		
		var $ = cheerio.load(page);
		var table = $('table').find('caption').filter(function (i, el) {
			return $(el).text().toLowerCase() === 'printing and communications';
		}).parent();

		var output = [name.join(' ')];

		var sum = 0;
		$(table).find('tr').each(function (i, rowEl) {
			var row = $(rowEl).find('td').toArray().map(el => $(el).text().trim())

			if (row[0] && row[0].includes('e-material')) {
				sum += Number.parseFloat(row[1].replace(/[$,]/g, ''), 10)
			}
			// $(rowEl).find('td').toArray().each(function (i, cell) {
			// 	var text = $(cell).text().trim();
			// 	if (text.includes('e-material'))
			// })
		})
		output.push(sum);

		return output

	}))
	console.log(result.map(r=>r.join(', ')).join('\n'));
}
test()

async function pause(time) {
	return new Promise(resolve => setTimeout(() => resolve(), time));
}

function initDatabase(callback) {
	// Set up sqlite database.
	var db = new sqlite3.Database("data.sqlite");
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS data (name TEXT)");
		callback(db);
	});
}

function updateRow(db, value) {
	// Insert some data.
	var statement = db.prepare("INSERT INTO data VALUES (?)");
	statement.run(value);
	statement.finalize();
}

function readRows(db) {
	// Read some data.
	db.each("SELECT rowid AS id, name FROM data", function(err, row) {
		console.log(row.id + ": " + row.name);
	});
}

function fetchPage(url, callback) {
	// Use request to read in pages.
	request(url, function (error, response, body) {
		if (error) {
			console.log("Error requesting page: " + error);
			return;
		}

		callback(body);
	});
}

function run(db) {
	// Use request to read in pages.
	fetchPage("https://morph.io", function (body) {
		// Use cheerio to find things in the page with css selectors.
		var $ = cheerio.load(body);

		var elements = $("div.media-body span.p-name").each(function () {
			var value = $(this).text().trim();
			updateRow(db, value);
		});

		readRows(db);

		db.close();
	});
}

// initDatabase(run);
