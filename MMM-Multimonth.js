/* Magic Mirror Module: MMM-Minical
 * v0.2 - Apr 2020
 * By Brendan Keyport <brendan.keyport@gmail.com>
 *
 */

Module.register("MMM-Multimonth", {
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
    // Static variables 
    var maxLoops = this.config.startMonth + this.config.monthCount;
    var todayNum = moment().format("D");
    // var todayWD = moment().weekday(); // Don't work internationally, yet. I will beat it. 
    var weekdayArray = moment.weekdaysShort();
    // start of output string 
    output = "<table border=0 class ='xsmall'><tr>"

    // master loop 
    for (processMonth = this.config.startMonth; processMonth < maxLoops; processMonth++) {
      // Variables that need to change each loop
      processTitle = moment().add(processMonth, "month").format("MMMM YYYY");
      processEnd = moment().add(processMonth, "month").endOf("month").format("D");
      processStart = moment().add(processMonth, "month").startOf("month").format("d");
      output += "<tr><th colspan=7 class='monthhead'>" + processTitle + "</th></tr>";
      // write the first line after the first month (Day string)
      if (processMonth == this.config.startMonth) {
        output += "<tr>";
        for (weekdayLoop = 0; weekdayLoop < 7; weekdayLoop++) {
          //      if (weekdayLoop == todayWD) { // Part of not-working international segment. 
          //        output += "<td width='14%' class='hilight'>" + weekdayArray[weekdayLoop] + "</td>"; // Part of not-working international segment. 
          //      } else { // Part of not-working international segment. 
          output += "<td width='14%'>" + weekdayArray[weekdayLoop] + "</td>";
          //      } // Part of not-working international segment. 
        }
        output += "</tr>";
      }
      for (processWeekday = 0; processWeekday <= processStart; processWeekday++) {
        if (processWeekday == 0) {
          output += "<tr>";
        } else {
          output += "<td></td>"
        }
      }

      for (processDayNo = 1; processDayNo <= processEnd; processDayNo++) {
        if (processWeekday == 0) {
          output += "<tr>";
          processWeekday++
          processDayNo--
        } else if (processWeekday == 8) {
          output += "</tr>";
          processWeekday = 0
          processDayNo--
        } else {
          if (processDayNo == todayNum && processMonth == 0) {
            output += "<td class='hilight'>" + processDayNo + "</td>"
          } else {
            output += "<td>" + processDayNo + "</td>"
          }
          processWeekday++
        }
      }
    }
    wrapper.innerHTML = output;
    return wrapper;
  }
});
