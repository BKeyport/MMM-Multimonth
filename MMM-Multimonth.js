/* Magic Mirror Module: MMM-Multimonth
 *
 * By Brendan Keyport <brendan.keyport@gmail.com>
 * Major assistance and rewrite by Volker Wegert <github@volker-wegert.de>
 *
 * See README.md for versioning and important info
 *
 */

Module.register("MMM-Multimonth", {
	// Default module config.
	defaults: {
		startMonth: -1, // Define when you start from current month
		monthCount: 3, // Define How many months to display
		monthsVertical: true, // Whether to arrange the months vertically (true) or horizontally (false).
		repeatWeekdaysVertical: false, // Whether to repeat the week days in each month in vertical mode. Ignored in horizontal mode.
		weekNumbers: false, // Whether to display the week numbers in front of each week.
		highlightWeekend: false, // Highlight Saturday and Sunday
		startWeek: 0, // 0 is Sunday, 1 Monday, 6 Saturday. 
		headerType: 'short' // Short or Narrow. (USA: Short: "Sun", "Mon", etc - Narrow: "SMTWTFS") 
	},

	// CSS Add
	getStyles: function () {
		return [this.data.path + "/MMM-Multimonth.css"];
	},

	// Update at midnight
	start: function () {
		date = new Date();
		month = date.getMonth();
		day = date.getDate();
		nextday = day + 1;
		year = date.getFullYear();
		reset = new Date(year, month, nextday, 0, 0, 0, 0).getTime()-date.getTime();
		var timer = setInterval(()=>{
			this.updateDom()
		}, reset)
	},    
	
		// Override dom generator.
	getDom: function () {
		// Functions
		const firstDay = (dateObject, index) => {
			const dayOfWeek = dateObject.getDay(),
			firstDay = new Date(dateObject),
			diff = dayOfWeek >= index ? dayOfWeek - index : 6 - dayOfWeek;
			firstDay.setDate(dateObject.getDate() - diff);
			firstDay.setHours(0, 0, 0, 0);
			return firstDay;
		}

		const lastDay = (dateObject, index) => {
			const dayOfWeek = dateObject.getDay(),
			lastDay = new Date(dateObject),
			diff = (index + (7 - dateObject.getDay())) % 7;
			lastDay.setDate(dateObject.getDate() + diff);
			lastDay.setHours(0, 0, 0, 0);
			return lastDay;
		}

// For anyone looking at my code, this is the only way I could get this to work... 		
		const weekNames = (dateObject, index) => {
			sDate = firstDay(dateObject, 0);
			weekdaysTemp = [];
			var weekdaysHeader = "";
			for (tday = 0; tday < 7; tday++) {
				weekdaysTemp.push(sDate.toLocaleDateString(config.language, {weekday: this.config.headerType}));
				sDate.setDate(sDate.getDate()+1);
			}
			for (tday = 0; tday < 7; tday++) {
				offset = tday + index
				if (offset >= 7) offset = offset - 7;
				weekdaysHeader += "<div class='day-header'>" + weekdaysTemp[offset] + "</div>";
			}
			return weekdaysHeader;
		}
// end bodge 

		const weekNumber = (dateObject) => {
			var oneJan = new Date(dateObject.getFullYear(),0,1);
			var numberOfDays = Math.floor((dateObject - oneJan) / (24 * 60 * 60 * 1000));
			var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
			return result;
		}
		
		date = new Date();
		month = date.getMonth();
		day = date.getDate();
		year = date.getFullYear();
		var wrapper = document.createElement("div");
		var lastMonth = this.config.startMonth + this.config.monthCount - 1;

		// pre-calculcate the header line containing the week days - no need to repeat this for every month
		var weekdaysHeader = "<div class='days-header'>";
		if (this.config.weekNumbers) {
			// empty cell as a placeholder for the week number
			weekdaysHeader += "<div class='day-header'>&nbsp;&nbsp;&nbsp;</div>";
		}
			weekdaysHeader += weekNames(date, this.config.startWeek);
		weekdaysHeader += "</div>";

		// set calendar main container depending on calendar orientation
		if (this.config.monthsVertical) {
			output = "<div class='calendar calendar-vertical'>";
		} else {
			output = "<div class='calendar calendar-horizontal'>";
		}
 // iterate through months to display
		for (
			currentMonth = this.config.startMonth;
			currentMonth <= lastMonth;
			currentMonth++
		) {
			output += "<div class='month'>";

			// add the month headers
			titleTemp = new Date(year, month + currentMonth, 1);
			monthTitle = titleTemp.toLocaleString(config.language, { month: 'long', year: 'numeric' });
			output += "<div class='month-header'>" + monthTitle + "</div>";

			// add day of week headers
			if (
				!this.config.monthsVertical ||
				this.config.repeatWeekdaysVertical ||
				currentMonth == this.config.startMonth
			) {
				output += weekdaysHeader;
			}

			firstDayOfMonth = new Date(year, month + currentMonth, 1, 0, 0, 0, 0);
			lastDayOfMonth = new Date(year, month + currentMonth + 1, 0, 0, 0, 0, 0);
			gridDay = firstDay(firstDayOfMonth, this.config.startWeek);
			gridEnd = lastDay(lastDayOfMonth, this.config.startWeek);

			// Week grid builder
			do {
				output += "<div class='week'>";
				if (this.config.weekNumbers) {
					output += "<div class='weeknumber'>" + weekNumber(gridDay) + "</div>";
				}
				for (dow = 0; dow <= 6; dow++) { // Walk the week 
					if (gridDay.getMonth() == firstDayOfMonth.getMonth()) { // Current Month? 
						if (gridDay.setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0)) {  // is it today? 
							if (this.config.highlightWeekend) { // highlight the weekend? 
								if (gridDay.getDay() == 0 || gridDay.getDay() == 6) { // Is it the weekend? 
									output +=   
										"<div class='current_day_weekend'>" +
										gridDay.getDate() +
										"</div>";
								} else { 
									output +=
										"<div class='current_day'>" +
										gridDay.getDate() +
										"</div>";
								}
							} else {
								output +=
									"<div class='current_day'>" + gridDay.getDate() + "</div>";
							}
						} else {
							if (this.config.highlightWeekend) {
								if (gridDay.getDay() == 0 || gridDay.getDay() == 6) {
									output +=
										"<div class='weekend'>" + gridDay.getDate() + "</div>";
								} else {
									output +=
										"<div class='day'>" + gridDay.getDate() + "</div>";
								}
							} else {
								output += "<div class='day'>" + gridDay.getDate() + "</div>";
							}
						}
					} else {
						// empty cell as placeholder
						if (this.config.monthCount == 1) {
							output += "<div class='daydim'>" + gridDay.getDate() + "</div>";
						} else {
							output += "<div class='daydim'>&nbsp;</div>";
						}
					}
					gridDay.setDate(gridDay.getDate()+1);
				}
				output += "</div>"; // end of week
			} while (gridDay <= gridEnd);

			output += "</div>"; // end of month
		}

		output += "</div>"; // end of calendar
		wrapper.innerHTML = output;
		return wrapper;
	}
});
