# MagicMirror Module to display a calendar with multiple months (user configurable)

This is a module for the [MagicMirror](https://github.com/MichMich/MagicMirror) project. 

It's purpose is to enable a mini-calendar with as many months as the user wants, assuming screen space is available. Screenshots are with config examples. 

## Installation

Clone this repository in your ~/MagicMirror/modules/ folder ( $ cd ~MagicMirror/modules/ ):

git clone https://github.com/BKeyport/MMM-Multimonth.git

## Using the module
To use this module, add it to the modules array in the config/config.js file:

```
{
  module: 'MMM-Multimonth',
	position: 'top_left', // can be any of the postions
	config: { // Optional - will default to 3 months, with one previous and one next, vertical orientation. 
		startMonth: -1, // Define when you start from current month (negative is before current, zero is current, positive is in future) 
		monthCount: 3, //  How many months to display - If Month Count is 1, Calendar will show previous and next month dates in empty spots.  
		// See screenshots for examples of the following config items. 
		monthsVertical: true, // Whether to arrange the months vertically (true) or horizontally (false).
		repeatWeekdaysVertical: false, // Whether to repeat the week days in each month in vertical mode. Ignored in horizontal mode.
		weekNumbers: false, // Whether to display the week numbers in front of each week.
		highlightWeekend: false, // Highlight Saturday and Sunday
	}
},
```

| Screenshot | How to get |
| --- | --- |
| ![screenshot](vert-noweek-norep.png?raw=true "Screenshot (vertical mode, no week numbers, single weekday line)") | monthsVertical: true, <br> 		repeatWeekdaysVertical: false, <br> weekNumbers: false, |
| ![screenshot](vert-noweek-rep.png?raw=true "Screenshot (vertical mode, no week numbers, repeat weekday line for every month)")| monthsVertical: true, <br> 		repeatWeekdaysVertical: true, <br> weekNumbers: false,  |
| ![screenshot](vert-week-norep.png?raw=true "Screenshot (vertical mode, no week numbers, single weekday line)") | monthsVertical: true, <br> repeatWeekdaysVertical: false, <br> weekNumbers: true, |
| ![screenshot](vert-week-rep.png?raw=true "Screenshot (vertical mode, no week numbers, repeat weekday line for every month)") | monthsVertical: true, <br> 		repeatWeekdaysVertical: true, <br> weekNumbers: true, |
| ![screenshot](horz-noweeknum.png?raw=true "Screenshot (horizontal mode)")| monthsVertical: false, <br> weekNumbers: false, |
| ![screenshot](horz-week.png?raw=true "Screenshot (horizontal mode)") | monthsVertical: false, <br> weekNumbers: true, |


Many thanks to kirash for the inspiration with the monthly_calendar module, sdetweil and lavolp3 for the help in coding and CSS work. Without your help, this would just be a pipe dream. 

This is a basic module, but I felt it was good enough for release to the public. Please, if you have any suggestions for improvement, let me know, I'm learning JS and CSS as I write this, and I dream of much bigger things. 

Localization is provided by moment.js and controlled by the master language of MagicMirror. Please file any errors with localizations as bugs with the moment.js team - https://github.com/moment/moment/

“Let the improvement of yourself keep you so busy that you have no time to criticize others.”
― Roy T. Bennett, The Light in the Heart

“The more I read, the more I acquire, the more certain I am that I know nothing.”
― Voltaire

## Versioning
0.1 - Initial Release

0.2 - Change code to improve functionality, allow for some localization - will not move start of week yet, but will change languages with system.

0.25 - Fix code with temporary bodge so to refresh every hour to assure day changes sometime between midnight and 1 am. 

0.3 - Removed bodge in 0.25, replaced with a simple refresh at midnight, no animation, as I find it annoying. 

0.9 - Start of week now moves per moment.js. Note: at this point, module is almost everything I wanted. If I don't get any bug reports that I can control, I'm going to bump it up to 1.0 and call it good. 

0.95 - Fix start of week issue. Had a calculation backwards. - Suggestion was made to optionally add week numbers to the system, still working on that. 

0.99 - Major rewrite by [Volker Wegert](https://github.com/vwegert) (Danke sehr!) - Implements everything I want, and I even understand the wizard level code he wrote. 

1.00 - Minor changes to code/css to standardize look.  

1.10 - Added leading and trailing months when 1 month is selected per user request. 

1.20 - Added weekend highlight, default is off. 

1.21 - Added weekend highlight for current day, so user could specify a different look for current day on weekend. 
