

(function() {
	let interval = setInterval(check, 1000); 
	const titles = [
		'My Absence',
		'My Time Off',
		'Time Off and Leave Requests'
	];

	// unfortunately extension does not have access to workday's global variable
	// we have to search for locale within scripts embedded into the page
	let dateFormat = 'DD/MM/YYYY';
	$('script').each(function(index) {
		let scriptContents = $(this).text();
		if (scriptContents.indexOf('&quot;localeCode&quot;:&quot;en_US&quot;') !== -1) {
			console.log('Date format switched to US');
			dateFormat = 'MM/DD/YYYY';
		}
	});
	

	function check() {
		var title = $('[data-automation-id="pageHeaderTitleText"], [data-automation-id="tabLabel"]');
		var grid = $('.wd-SuperGrid');
		var calendar = $('.hello-week');
        if (title.length && grid.length && !calendar.length) {
			if(titles.indexOf($(title[0]).text()) !== -1) {
				execute();
			}
        }
	}
	
	function execute() {
		let mapping = findColumns();
		let dates = findDates(mapping);
		$('.wd-SuperGrid').parent().before(`<div class="hello-week"></div>`);
		let calendar = new HelloWeek({
			selector: '.hello-week',
			lang: 'en',
			langFolder: chrome.extension.getURL('langs/'),
			format: dateFormat,
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
		let cancelledDays = [];

		let dates = {
			days: [],
			backgroundColor: '#6495ed',
			color: '#fff',
			title: ''
		}
		rows.each(function(index) {
			let cells = $(this).find('th, td');
			let readDay = moment($(cells[mapping.date]).text(), [dateFormat]);
			let day = readDay.format('YYYY-MM-DD');

			if ($(cells[mapping.status]).text() === "Approved" || mapping.status === undefined) {
			    let requestedQy = parseInt($(cells[mapping.quantity]).text());
			    if (requestedQy > 0 && $.inArray(day, cancelledDays) < 0) {
			        dates.days.push(day);
			        return true;
			    }

			    let dayIndex = $.inArray(day, dates.days);
			    if (dayIndex >= 0) {
			        dates.days.splice(dayIndex, 1);
			    } else {
			        cancelledDays.push(day);
			    }
			}
		});

		return dates;
	}

})();