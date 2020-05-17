# MagicMirror Module to display a calendar with multiple months (user configurable)

This is a module for the [MagicMirror](https://github.com/MichMich/MagicMirror) project. 

It's purpose is to enable a mini-calendar with as many months as the user wants, assuming screen space is available. 

![screenshot](screenshot.png?raw=true "Screenshot")

## Installation

Clone this repository in your ~/MagicMirror/modules/ folder ( $ cd ~MagicMirror/modules/ ):

git clone https://github.com/BKeyport/MMM-Multimonth.git

## Using the module
To use this module, add it to the modules array in the config/config.js file:

```
{
  module: 'MMM-Multimonth',
	position: 'top_left', // can be any of the postions
	config: { // Optional - will default to 3 months, with one previous and one next. 
		startMonth: -1, // Define when you start from current month (negative is before current, zero is current, positive is in future) 
		monthCount: 3, //  How many months to display 
	}
}
```

Many thanks to kirash for the inspiration with the monthly_calendar module, sdetweil and lavolp3 for the help in coding and CSS work. Without your help, this would just be a pipe dream. 

This is still a very basic module, but I felt it was good enough for release to the public. Please, if you have any suggestions for improvement, let me know, I'm learning JS and CSS as I write this, and I dream of much bigger things. 

“Let the improvement of yourself keep you so busy that you have no time to criticize others.”
― Roy T. Bennett, The Light in the Heart

“The more I read, the more I acquire, the more certain I am that I know nothing.”
― Voltaire

## Versioning
0.1 - Initial Release

0.2 - Change code to improve functionality, allow for some localization - will not move start of week yet, but will change languages with system.

0.25 - Fix code with temporary bodge so to refresh every hour to assure day changes sometime between midnight and 1 am. 

0.3 - Removed bodge in 0.25, replaced with a simple refresh at midnight, no animation, as I find it annoying. 
