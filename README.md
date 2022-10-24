### NOTE: THIS MODULE IS TO BE HOSTED ONLY AT https://github.com/BKeyport/MMM-Multimonth - Any other hosting location is invalid.

If you fork and change any code, please let me know, if it's useful for the general public, I'd love to add it!

If you find this module useful, and would like to contribute to the project, I appreciate the thought. Instead of giving to me, please donate to L'Arche Tahoma Hope
at https://www.larchetahomahope.org/donate/ - in honor of Nancy Tyson. (Dedicate my donation checkbox). Nancy means the world to me. You don't have to notify me you
have done so.

THANK YOU for your consideration.

# MagicMirror Module to display a calendar with multiple months (user configurable)

This is a module for the [MagicMirror](https://github.com/MichMich/MagicMirror) project.

This will create a mini-calendar with as many months as the user wants, assuming screen space is available. Screenshots are with config examples.

## Installation

Clone this repository in your ~/MagicMirror/modules/ folder ( $ cd ~MagicMirror/modules/ ):

git clone https://github.com/BKeyport/MMM-Multimonth.git

** note: NPM INSTALL is no longer required. This module is proud to no longer use any external dependencies! **

## Using the module

To use this module, add it to the modules array in the config/config.js file - shown options are defaults:

```
{
  module: 'MMM-Multimonth',
	position: 'top_left', // can be any of the postions
	config: { // Optional - will default to 3 months, with one previous and one next, vertical orientation.
		headerType: 'short', // Short or Narrow. (USA: Short: "Sun", "Mon", etc - Narrow: "SMTWTFS") 
		highlightWeekend: false, // Highlight Saturday and Sunday
		monthCount: 3, // Define How many months to display
		monthsVertical: true, // Whether to arrange the months vertically (true) or horizontally (false).
		otherMonths: false, // Show other months in the grid? (Previous/Next Month) 
		repeatWeekdaysVertical: false, // Whether to repeat the week days in each month in vertical mode. Ignored in horizontal mode.
		startMonth: -1, // Define when you start from current month
		startWeek: 0, // 0 is Sunday, 1 Monday, 6 Saturday. 
		weekNumbers: false, // Whether to display the week numbers in front of each week.
	}
},
```
ToDo: Indicator for system wide events (calendar module compatability, like MMRize's MMM-CalendarEXT3) 


| Screenshot                                                                                                                     | How to get                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| ![screenshot](vert-noweek-norep.png?raw=true "Screenshot (vertical mode, no week numbers, single weekday line)")               | monthsVertical: true, <br> repeatWeekdaysVertical: false, <br> weekNumbers: false, |
| ![screenshot](vert-noweek-rep.png?raw=true "Screenshot (vertical mode, no week numbers, repeat weekday line for every month)") | monthsVertical: true, <br> repeatWeekdaysVertical: true, <br> weekNumbers: false,  |
| ![screenshot](vert-week-norep.png?raw=true "Screenshot (vertical mode, no week numbers, single weekday line)")                 | monthsVertical: true, <br> repeatWeekdaysVertical: false, <br> weekNumbers: true,  |
| ![screenshot](vert-week-rep.png?raw=true "Screenshot (vertical mode, no week numbers, repeat weekday line for every month)")   | monthsVertical: true, <br> repeatWeekdaysVertical: true, <br> weekNumbers: true,   |
| ![screenshot](horz-noweeknum.png?raw=true "Screenshot (horizontal mode)")                                                      | monthsVertical: false, <br> weekNumbers: false,                                    |
| ![screenshot](horz-week.png?raw=true "Screenshot (horizontal mode)")                                                           | monthsVertical: false, <br> weekNumbers: true,                                     |

Many thanks to kirash for the inspiration with the monthly_calendar module, sdetweil and lavolp3 for the help in coding and CSS work. Without your help, this would just be a pipe dream.

This is a basic module, but I felt it was good enough for release to the public. Please, if you have any suggestions for improvement, let me know, I'm learning JS and CSS as I write this, and I dream of much bigger things.

Language Localization is controlled by the master language of MagicMirror. 

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

1.50 - Minor fixes

1.90 - Minor fixes/Remove EOL - Begin work on moving to a life without moment.js - Goal, no dependencies.

7 Sep 2022 - changing to date based versioning.

1 Oct 2022 - Completely removed moment.js from project. ** Returned to Beta Status due to lack of internationalization and start of week adjustments ** 

4 Oct 2022 - Internationalization and Start of Week added back in. -- Note: I'm aware of a bug where the week numbers are showing an extra week. I'm redesigning the layout. 

5 Oct 2022 - Fix bug in week numbers, fix extra week error.

12 Oct 2022 - Fix bug causing last day of month to fall off calendar if it's the same day as start of week. 

24 Oct 2022 - add config option for previous/next month display rather than forcing based on use. 
