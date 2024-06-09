Module.register("MMM-Multimonth", {
	// Default module config.
	defaults: {
		startMonth: -1, 
		monthCount: 3, 
		monthsVertical: true, 
		repeatWeekdaysVertical: false, 
		weekNumbers: false, 
		weekNumbersISO: false, 
		highlightWeekend: false, 
		headerType: 'short', 
		otherMonths: false, 
		startWeek: 0, 
		weekend1: 0, 
		weekend2: 6, 
		eventsOn: true, 
		calNames: [], 
		instanceID: "", 
		bigCalendar: false, 
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
		this.storedEvents = [];
		this.matchEvents = [];
	},    

	notificationReceived: function(notification, payload, sender) {
		if (notification === 'CALENDAR_EVENTS') {
			this.storedEvents = JSON.parse(JSON.stringify(payload))
			this.updateDom();
		}
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
				weekdaysHeader += `<div class='dow day-header ${this.config.instanceID} ${weekdaysTemp[offset]}'> ${weekdaysTemp[offset]} </div>`;
			}
			return weekdaysHeader;
		}

		const weekNumber = (dateObject) => {
			const target = new Date(dateObject);
			const jan1 = new Date(target.getFullYear(), 0, 1);
			const daysDiff = Math.floor((target - jan1) / (24 * 60 * 60 * 1000));
			let weekResult = Math.ceil((daysDiff + jan1.getDay() + 1) / 7);
// Check if January 1st is part of the week
			const adjTarget = new Date(dateObject);
			adjTarget.setDate(adjTarget.getDate() + 6);
			const newJan1 = new Date(adjTarget.getFullYear(), 0, 1);
			if (newJan1.getTime() === jan1.getTime()) {
				result = weekResult
			} else {
				result = 1
			}
			return result;
		};

		const weekNumberISO = (dateObject) => {
			const mondayDate = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate() + 1);
			const oneJan = new Date(mondayDate.getFullYear(), 0, 1);
			const numberOfDays = Math.floor((mondayDate - oneJan) / (24 * 60 * 60 * 1000));
			const result = Math.ceil((mondayDate.getDay() + 1 + numberOfDays) / 7);
			return result;
		};

		const matchName = (cn) => {
			result = true;
			if (this.config.calNames.length > 0) {
				result = false; 
				for (let ev = 0; ev < this.config.calNames.length; ev++) {
					if (this.config.calNames[ev] == cn) {
						result = true;
					}
				}
			}
			return result;
		};

//Variables 
		date = new Date();
		month = date.getMonth();
		day = date.getDate();
		year = date.getFullYear();
		var wrapper = document.createElement("div");
		var lastMonth = this.config.startMonth + this.config.monthCount - 1;

// pre-calculcate the header line containing the week days - no need to repeat this for every month
		var weekdaysHeader = `<div class='dow-line days-header ${this.config.instanceID}'>`;
		if (this.config.weekNumbers && !this.config.bigCalendar) {
			weekdaysHeader += `<div class='dow day-header ${this.config.instanceID}'>&nbsp;</div>`;
		}
		weekdaysHeader += weekNames(date, this.config.startWeek);
		weekdaysHeader += "</div>";

// set calendar main container depending on calendar orientation
		if (this.config.monthsVertical) {
			output = `<div class='calendar settings ${this.config.instanceID} vertical '>`;
		} else {
			output = `<div class='calendar settings ${this.config.instanceID} horizontal '>`;
		}
		

// iterate through months to display
		for (currentMonth = this.config.startMonth; currentMonth <= lastMonth; currentMonth++) {
			output += `<div class='month ${this.config.instanceID}'>`;

// add the month headers
			titleTemp = new Date(year, month + currentMonth, 1);
			monthTitle = titleTemp.toLocaleString(config.language, { month: 'long', year: 'numeric' });
			output += `<div class='month-header ${this.config.instanceID}'>` + monthTitle + "</div>";

// add day of week headers
			if ( !this.config.monthsVertical || this.config.repeatWeekdaysVertical || currentMonth == this.config.startMonth ) {
				output += weekdaysHeader;
			}
			firstDayOfMonth = new Date(year, month + currentMonth, 1, 0, 0, 0, 0);
			lastDayOfMonth = new Date(year, month + currentMonth + 1, 0, 0, 0, 0, 0);
			gridDay = firstDay(firstDayOfMonth, this.config.startWeek);
			gridEnd = lastDay(lastDayOfMonth, this.config.startWeek-1);

// Week grid builder
			do {
				output += `<div class='week ${this.config.instanceID}'>`;

// Week Number Calculator
				const weekNum = this.config.weekNumbersISO ? weekNumberISO(gridDay) : weekNumber(gridDay);
				weekNumResult= `<div class='weeknumber w${weekNum} ${this.config.instanceID}'>${weekNum}</div>`;


// Walk the week 

// Week Number to the left of the week if not a big calendar
				if (this.config.weekNumbers && !this.config.bigCalendar) {
					output +=weekNumResult;
				}

				for (dow = 0; dow <= 6; dow++) { 
					output += `<div class='daycontainer ${this.config.instanceID}'>`;
					output += `<div class='`;



// Is it the current month? 
					if (gridDay.getMonth() == firstDayOfMonth.getMonth()) { 
						output += `day ${this.config.instanceID}`;
						if (gridDay.setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0)) { output += " current current_day" }
						if ((this.config.highlightWeekend) && (gridDay.getDay() == this.config.weekend1 || gridDay.getDay() == this.config.weekend2)) { output += " weekend" } 
						if (!this.config.bigCalendar) {
							for (let ev = 0; ev < this.storedEvents.length; ev++) {
								match = matchName(this.storedEvents[ev].calendarName); 
								orig = new Date(Number(this.storedEvents[ev].startDate));
								modi = orig.setHours(0,0,0,0);
								if (modi == gridDay.getTime() && this.config.eventsOn && match) {
									output += " event";    
								}
							};
						};
					} else {
						if (this.config.otherMonths) {
							output += `dim ${this.config.instanceID} daydim`;
						} else {
							output += `noDisplay ${this.config.instanceID}`;
						}
						
					}
					output += ` ${gridDay.getMonth()+1}-${gridDay.getDate()}'> ${gridDay.getDate()}</div>`;
// Big Events Cycle
					if (this.config.bigCalendar) {
// Is it the current month? 
						if (gridDay.getMonth() == firstDayOfMonth.getMonth()) { 
							output += `<div class='bigEvent ${this.config.instanceID}'>`;

// Object to store counts for each unique calendarName and its symbol
							const eventCounts = {};
// Count events for each calendarName
							for (let ev = 0; ev < this.storedEvents.length; ev++) {
								const calendarName = this.storedEvents[ev].calendarName;
								const symbol = this.storedEvents[ev].symbol;
								const match = matchName(calendarName);
								const orig = new Date(Number(this.storedEvents[ev].startDate));
								const modi = orig.setHours(0,0,0,0);
								if (modi == gridDay.getTime() && this.config.eventsOn && match) {
									if (eventCounts[calendarName]) {
										eventCounts[calendarName].count++;
									} else {
										eventCounts[calendarName] = { count: 1, symbol: symbol };
									}
								}
							}
// Display event counts for each calendarName
							for (const calendarName in eventCounts) {
								output += `<div>${eventCounts[calendarName].count} x <i class="icon ${eventCounts[calendarName].symbol}"></i></div>`;
							}
							output +="</div>";
						}
					}

					output += "</div>";
					gridDay.setDate(gridDay.getDate()+1);
				}
				output += "</div>"; // end of week
			} while (gridDay < gridEnd);
			output += "</div>"; // end of month
		}
		output += "</div>"; // end of calendar
		wrapper.innerHTML = output;
		return wrapper;
	}
});
