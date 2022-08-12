/* Magic Mirror Module: MMM-Multimonth
 *
 * v1.90 - August 2022 - Preparing for moment.js removal. 
 * By Brendan Keyport <brendan.keyport@gmail.com>
 * Major assistance and rewrite by Volker Wegert <github@volker-wegert.de> 
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
	},

	// CSS Add
	getStyles: function() {
		return [this.data.path + "/MMM-Multimonth.css"];
	},

	// Update at midnight
	start: function (){
		 var timer = setInterval(()=>{
		 this.updateDom()
		}, moment().add(1, 'days').hours(0).minutes(0).seconds(0)-moment())
	},    

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		var lastMonth = this.config.startMonth + this.config.monthCount - 1;
		var todayNum = moment().format("D");

		// pre-calculcate the header line containing the week days - no need to repeat this for every month
		var weekdays = moment.weekdaysShort(true);
		var weekdaysHeader = "<div class='days-header'>";
		if (this.config.weekNumbers) {
			// empty cell as a placeholder for the week number
			weekdaysHeader += "<div class='day-header'>&nbsp;&nbsp;&nbsp;</div>";      
		}
		for (day = 0; day < 7; day++) {
			weekdaysHeader += "<div class='day-header'>" + weekdays[day] + "</div>";
		}
		weekdaysHeader += "</div>";

		// set calendar main container depending on calendar orientation 
		if (this.config.monthsVertical) {
			output = "<div class='calendar calendar-vertical'>";
		} else {
			output = "<div class='calendar calendar-horizontal'>";
		}

		// iterate through months to display
		for (currentMonth = this.config.startMonth; currentMonth <= lastMonth; currentMonth++) {
			output += "<div class='month'>";

			// add the month and week day headers
			monthTitle = moment().add(currentMonth, "month").format("MMMM YYYY");
			output += "<div class='month-header'>" + monthTitle + "</div>";
			if ((!this.config.monthsVertical) || ((this.config.repeatWeekdaysVertical || (currentMonth == this.config.startMonth)))) {
				output += weekdaysHeader;
			}

			// get the start of the week that contains the first day of the month
			firstDayOfMonth = moment().add(currentMonth, "month").startOf("month") 
			currentWeekday = moment().add(currentMonth, "month").startOf("month").startOf("week");

			// get the end of the week that contains the last day of the month
			lastWeekday = moment().add(currentMonth, "month").endOf("month").endOf("week");

			do {
				output += "<div class='week'>";
				if (this.config.weekNumbers) {
					output += "<div class='weeknumber'>" + currentWeekday.format("W") + "</div>";
				}
				for (dow = 0; dow <= 6; dow++) {
					if (currentWeekday.isSame(firstDayOfMonth, "month")) {
						if (currentWeekday.isSame(moment(), "day")) {
							if (this.config.highlightWeekend) {
								if (currentWeekday.day() == 0 || currentWeekday.day() == 6) {
									output += "<div class='current_day_weekend'>" + currentWeekday.format("D") + "</div>";
								} else {
									output += "<div class='current_day'>" + currentWeekday.format("D") + "</div>";
								}
							} else {
								output += "<div class='current_day'>" + currentWeekday.format("D") + "</div>";
							}
						} else { // End of current day 
							if (this.config.highlightWeekend) {
								if (currentWeekday.day() == 0 || currentWeekday.day() == 6) {
									output += "<div class='weekend'>" + currentWeekday.format("D") + "</div>";
								} else {
									output += "<div class='day'>" + currentWeekday.format("D") + "</div>";
								}
							} else {
								output += "<div class='day'>" + currentWeekday.format("D") + "</div>";
							}
						}
					} else {
						// empty cell as placeholder
						if (this.config.monthCount == 1) {
				output += "<div class='daydim'>"+currentWeekday.format("D")+"</div>";
			} else {
				output += "<div class='daydim'>&nbsp;</div>";
			}
					}
					currentWeekday.add(1, "days");
				}
				output += "</div>"; // end of week
			} while (currentWeekday.isSameOrBefore(lastWeekday, "day"));

			output += "</div>"; // end of month
		}

		output += "</div>"; // end of calendar

		wrapper.innerHTML = output;
		return wrapper;
	}
});
