

(function() {
    var checkExist = setInterval(function() {
		var title = $('[data-automation-id="pageHeaderTitleText"]');
        if (title.length) {           
		   clearInterval(checkExist);
		   if(title.text() === 'My Absence') {
		   	execute();
		   }
        }
	}, 100);
	
	function execute() {
		let mapping = findColumns();
		let dates = findDates(mapping);
		console.log('mapping', mapping);
		console.log('dates', dates);

		$('.wd-SuperGrid').parent().before(`<div><div class="hello-week"></div></div>`);
		let calendar = new HelloWeek({
			selector: '.hello-week',
			lang: 'en',
			langFolder: chrome.extension.getURL('langs/'),
			format: 'DD/MM/YYYY',
			weekStart: 1,
			daysHighlight: [dates]
		});



	}

	function findColumns() {
		let table = $('.mainTable');
		let rows = table.find('tr');

		let mapping = {};
		$(rows[0]).find('th').each(function(index) {
			let caption = $(this).text();
			if(caption === 'Date') {
				mapping.date = index;
			} else if (caption === 'Type') {
				mapping.type = index;
			} else if (caption === 'Status') {
				mapping.status = index;
			} else if (caption === 'Requested') {
				mapping.quantity = index;
			}
		});

		return mapping;
	}

	function findDates(mapping) {
		let table = $('.mainTable');
		let rows = table.find('tr:not(:first)');

		let dates = {
			days: [],
			backgroundColor: '#6495ed',
			color: '#fff',
			title: ''
		}
		rows.each(function(index) {
			let cells = $(this).find('th, td');
			let readDay = moment($(cells[mapping.date]).text(), ["MM/DD/YYYY", "DD/MM/YYYY"]);
			let day = readDay.format('YYYY-MM-DD');
			dates.days.push(day);
		});

		return dates;
	}

})();