/* Magic Mirror Module: MMM-Minical
 * v0.95 - Apr 2020
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

  // Update at midnight
  start: function (){
     var timer = setInterval(()=>{
     this.updateDom()
    }, moment().add(1, 'days').hours(0).minutes(0).seconds(0)-moment())
  },    

  // Override dom generator.
  getDom: function() {
    var wrapper = document.createElement("div");
    // Static variables 
    var maxLoops = this.config.startMonth + this.config.monthCount;
    var todayNum = moment().format("D");
    var weekdayArray = moment.weekdaysShort(true);
    // start of output string 
    output = "<table border=0 class ='xsmall'><tr>"

    // master loop 
    for (processMonth = this.config.startMonth; processMonth < maxLoops; processMonth++) {
      // Variables that need to change each loop
      processTitle = moment().add(processMonth, "month").format("MMMM YYYY");
      processEnd = moment().add(processMonth, "month").endOf("month").format("D");
      monthStart = parseInt(moment().add(processMonth, "month").startOf("month").format("d"));
      weekStart = parseInt(moment().add(processMonth, "month").startOf("week").format("d"));
      processStart = monthStart-weekStart;
      if (processStart == 7) {processStart = 0} 
      output += "<tr><th colspan=7 class='monthhead'>" + processTitle + "</th></tr>";
      // write the first line after the first month (Day string)
      if (processMonth == this.config.startMonth) {
        output += "<tr>";
        for (weekdayLoop = 0; weekdayLoop < 7; weekdayLoop++) {
          output += "<td width='14%'>" + weekdayArray[weekdayLoop] + "</td>";
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
