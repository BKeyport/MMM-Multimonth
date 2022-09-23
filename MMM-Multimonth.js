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
    highlightWeekend: false // Highlight Saturday and Sunday
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
	date = new Date();
    month = date.getMonth();
    day = date.getDate();
    year = date.getFullYear();
    var wrapper = document.createElement("div");
    var lastMonth = this.config.startMonth + this.config.monthCount - 1;

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
    for (
      currentMonth = this.config.startMonth;
      currentMonth <= lastMonth;
      currentMonth++
    ) {
      output += "<div class='month'>";

      // add the month headers
      monthTemp = month + currentMonth;
      monthTitle = moment().add(currentMonth, "month").format("MMMM YYYY");
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
      gridDay = moment().add(currentMonth, "month").startOf("month").startOf("week");
      gridEnd = moment().add(currentMonth, "month").endOf("month").endOf("week");

      // Week grid builder
      do {
        output += "<div class='week'>";
        if (this.config.weekNumbers) {
          output += "<div class='weeknumber'>" + gridDay.format("W") + "</div>";
        }
        for (dow = 0; dow <= 6; dow++) {
          if (gridDay.isSame(firstDayOfMonth, "month")) {
            if (gridDay.isSame(moment(), "day")) {
              if (this.config.highlightWeekend) {
                if (gridDay.day() == 0 || gridDay.day() == 6) {
                  output +=
                    "<div class='current_day_weekend'>" +
                    gridDay.format("D") +
                    "</div>";
                } else {
                  output +=
                    "<div class='current_day'>" +
                    gridDay.format("D") +
                    "</div>";
                }
              } else {
                output +=
                  "<div class='current_day'>" + gridDay.format("D") + "</div>";
              }
            } else {
              if (this.config.highlightWeekend) {
                if (gridDay.day() == 0 || gridDay.day() == 6) {
                  output +=
                    "<div class='weekend'>" + gridDay.format("D") + "</div>";
                } else {
                  output +=
                    "<div class='day'>" + gridDay.format("D") + "</div>";
                }
              } else {
                output += "<div class='day'>" + gridDay.format("D") + "</div>";
              }
            }
          } else {
            // empty cell as placeholder
            if (this.config.monthCount == 1) {
              output += "<div class='daydim'>" + gridDay.format("D") + "</div>";
            } else {
              output += "<div class='daydim'>&nbsp;</div>";
            }
          }
          gridDay.add(1, "days");
        }
        output += "</div>"; // end of week
      } while (gridDay.isSameOrBefore(gridEnd, "day"));

      output += "</div>"; // end of month
    }

    output += "</div>"; // end of calendar

    wrapper.innerHTML = output;
    return wrapper;
  }
});
