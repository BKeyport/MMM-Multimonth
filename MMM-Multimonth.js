/* Magic Mirror Module: MMM-Minical
 * v.1 - Apr 2020
 * By Brendan Keyport <brendan.keyport@gmail.com>
 *
 */

Module.register("MMM-Multimonth",{
	// Default module config.
	defaults: {
		startMonth: -1, // Define when you start from current month
		monthCount: 3, // Define How many months to display
	},
	
	// CSS Add
	getStyles: function() {
		return [this.data.path + "/MMM-Multimonth.css"];
	},

	
	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		var output = "<table border=0 class='xsmall'>";
		var maxLoops = this.config.startMonth + this.config.monthCount; 
		for (main = this.config.startMonth; main < maxLoops; main++) {
			monthHeader = moment().add(main, "month").format("MMMM YYYY");
			monthEnd = moment().add(main, "month").endOf('month').format("D");
			monthStartDay = moment().add(main, "month").startOf("month").format("d");
			monthCurrent = moment().format("M");
			today = moment().format("D");
			weekday = 0;
			output += "<tr><th colspan=7></th></tr><tr><th colspan=7 class='monthhead'>" + monthHeader + "</th></tr><tr><th colspan=7></th></tr>";
			if (main == this.config.startMonth) {
				output += "<tr><td width='14%'>Sun</td><td width='14%'>Mon</td><td width='14%'>Tue</td><td width='14%'>Wed</td><td width='14%'>Thu</td><td width='14%'>Fri</td><td width='14%'>Sat</td></tr>";
			}
			for (let daynum = 0; daynum <= monthEnd; daynum++) {
				if (weekday == 0) {
					output += "<tr>";
				} else if (weekday == 7) {
					output += "</tr>";
					weekday = -1
					daynum--
				}
				if (weekday > -1) {
					if (daynum == 0) {
						for (weekday = 0; weekday < monthStartDay; weekday++) {
						output += "<td></td>";
					}
					weekday--
					} else {
						if (main == 0 && today == daynum) {
							output += "<td class='hilight'>" + daynum + "</td>"
						} else {
							output += "<td>" + daynum + "</td>"
						}
					}
				}
				weekday++
			}
		}
		wrapper.innerHTML = output; 
		return wrapper;
	}
});
