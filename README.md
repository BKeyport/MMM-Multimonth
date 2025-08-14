### NOTE: THIS MODULE IS TO BE HOSTED ONLY AT <https://github.com/BKeyport/MMM-Multimonth> - Any other hosting location is invalid.

If you fork and change any code, please let me know, if it's useful for the general public, I'd love to add it!

If you find this module useful, and would like to contribute to the project, I appreciate the thought. Instead of giving to me, please donate to L'Arche Tahoma Hope
at <https://www.larchetahomahope.org/donate/> - in honor of Nancy Tyson. (Dedicate my donation checkbox). Nancy means the world to me. You don't have to notify me you
have done so.

THANK YOU for your consideration.

# MagicMirror² Module to display a calendar with multiple months (user configurable)

![screenshot](screenshot.png?raw=true "Screenshot (vertical mode, no week numbers, single weekday line)")

This is a module for the [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror) project.

This will create a mini-calendar with as many months as the user wants, assuming screen space is available. Screenshots are with config examples.

## Installation

Clone this repository in your ~/MagicMirror/modules/ folder ( $ cd ~MagicMirror/modules/ ):

```bash
cd ~/MagicMirror/modules
git clone https://github.com/BKeyport/MMM-Multimonth
```

**Note: NPM INSTALL is no longer required. This module is proud to no longer use any external dependencies!**

## Using the module

To use this module, add it to the modules array in the config/config.js file - shown options are defaults:

```js
{
  module: 'MMM-Multimonth',
    position: 'top_left', // can be any of the postions
    config: { // Optional - will default to 3 months, with one previous and one next, vertical orientation.
    }
},
```

**Full config options:**

| Option                 | Default | Description                                                  |
| ---------------------- | ------- | ------------------------------------------------------------ |
| startMonth             | -1      | Starting month relative to the current month                 |
| monthCount             | 3       | How many months do you want to display?                      |
| monthsVertical         | false   | Display months on a vertical line                            |
| repeatWeekdaysVertical | false   | Repeat the weekday names? (Vertical Calendar Only)           |
| weekNumbers            | false   | Show the week numbers (How many weeks in the year)           |
| weekNumbersISO         | false   | Use ISO calculation or US/CA calculation (ignored if WeekNumbers is false) True = ISO, False = US/Canada. |
| highlightWeekend       | false   | highlight the weekend (See Below)                            |
| headerType             | 'short' | How do you want the days displayed? In US - 'short' = "Sun, Mon, Tue" In US - 'narrow' = "S, M, T" |
| otherMonths            | false   | Display the previous and next month dimmed in the month grid. |
| eventsOn               | true    | Turn on and off Event monitoring                             |
| calNames               | []      | List of calendar names to trigger underline. Empty will do all of them. |
| bigCalendar            | false   | Enable alternate big calendar mode, See below                |
| instanceID             |         | If you'd like to have changes per instance, use a string here and specify in CSS. |
| startWeek              | 0       | Starting day of your week                                    |
| weekend1               | 0       | 1st Day of your weekend                                      |
| weekend2               | 6       | 2nd day of your weekend                                      |
| eventsCount            | true    | Big calendar mode - show number of events per icon           |

for the last three items: 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday.

Remember the format for options:

`option: value,` Example: `startMonth: -1,`

Important: calNames is an array, please specify as such `["Main", "Sportsball", "Utility"]` case is IMPORTANT.

instanceID: You can specify in custom.css different css for each instance. For example, if you add `instanceID: "test",` to your code, you can overide that instance with:

```css
.MMM-Multimonth .month-header.test {
  background-color: blue;
  color: var(--color-header);
  font-size: var(--font-size-small);
  line-height: var(--font-size-small)+5;
  border-radius: var(--back-rounding);
}
```

To get events to feed to module, add the calendar module into your `config.js`.

Suggested settings at minimum:  

```js
{
  module: "calendar",
  config: {
    broadcastPastEvents: true,
    calendars: [
      {
        url: <insert URL>,
        name: <name>,
      },
      //.... As many as you'd like .... 
    ],
  }
},
```

## New Features: 

### Event Colors: 

The module now can use the colors from the calendar module, default is the system color set (white)

### Event Symbols: 

The module now can use the symbols from the calendar module in big calendar mode. 

Example (uses public calendar from the University of Washington): 

``` js
{
	url: "https://gohuskies.com/calendar.ashx/calendar.ics",
	name: "Huskies",
	symbol: "paw",
	color: "#4B2E83",
},
```

### Big Calendar Mode:

I wanted a big calendar for the current month, and the solutions out there didn't do what I wanted, so here we are. 

Big calendar mode will change two things in code. 

The Week Number (if used) will become part of the first day of the week's spot. 

Events will be summarized into a count and a symbol, and display below each day of the month. 

To keep the CSS slim, I ***do not*** format anything differently, and it ***will*** break the constraints of the mini mode. Don't use if you're inexperienced in CSS. You will have to design your display yourself. If you have any questions, ask in the magic mirror forums. Myself or any of the CSS wizards will be happy to help you. 

## Updating from prior to 08 Jun 2024:

CSS is changed - please check all customizations. **Old Elements, values, etc. have been deleted**.

The following CSS code is all you need in `custom.css` if all you're changing is the colors and/or background edge rounding:

(Key changes here: "current" has been changed to "today", "background-week, color-week have been removed as redundant") 

```css
/* Defaults are shown */
.MMM-Multimonth .settings {
  --background-header: rgb(0, 128, 0);               /* for the month and year line, use green background */ 
  --background-dow: var(--color-background);         /* For the days of the week, use global background */ 
  --background-dowBlank: rgba(255, 255, 255, 0);     /* For the blank square if you use Week numbers */  
  --background-weekno: #808080;                      /* for the week number, use a grey background */ 
  --background-event: var(--color-background);		 /* Background for events, used in big mode only */
    
  --background-dimmed: var(--color-background);      /* For dimmed (previous/next month in current grid), use the global background color */
  --background-weekday: var(--color-background);     /* For normal days, use global background */ 
  --background-weekend: cornflowerblue;              /* For the days defined as your weekend, change the background to cornflowerblue */
  --background-today: Yellow;                        /* for the current day, change the background to yellow */ 

  --color-header: var(--color-text-bright);         /* for the header lines, use the global bright text color */ 
  --color-dow: var(--color-text);                   /* for the days of the week header, use the global text color */
  --color-dowBlank: rgba(255, 255, 255, 0);			/* For the blank square if you use Week numbers */ 
  --color-weekno: var(--color-text);                /* for the week numbers, use the global bright text color */

  --color-dimmed: var(--color-text-dimmed);         /* For dimmed (previous/next month in current grid), use the global dimmed text color */
  --color-weekday: var(--color-text);               /* For normal days, use global normal text */ 
  --color-weekend: var(--color-background);         /* For the days defined as your weekend, change the text to the background color */
  --color-today: var(--color-background);           /* for the current day, change the text to the background color */ 

  --back-rounding: 8px;                             /* Set the radius of the background rounded edges. See documentation for border-radius elsewhere */ 
  --alignment: center;                              /* Adjust the text alignment */ 
  --fontsize: var(--font-size-xsmall);              /* Set font size */
  --smallEventMarker: 3px;  						/* Event Marker size in pixels */
}
```

Notes on the colors above: You can use any colors you'd like. https://www.w3schools.com/cssref/css_colors.php is a list of accepted color names, or if you wanna make your own, https://www.w3schools.com/cssref/css_colors_legal.php. The above list is intended to be a sample, so I use different ways of doing legal colors.  the "var" statements refer back to the master color list in Magic Mirror. You'll find a full list in main.css. 

| Screenshot                                                   | How to get                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![screenshot](vert-noweek-norep.png?raw=true "Screenshot (vertical mode, no week numbers, single weekday line)") | monthsVertical: true, <br> repeatWeekdaysVertical: false, <br> weekNumbers: false, |
| ![screenshot](vert-noweek-rep.png?raw=true "Screenshot (vertical mode, no week numbers, repeat weekday line for every month)") | monthsVertical: true, <br> repeatWeekdaysVertical: true, <br> weekNumbers: false, |
| ![screenshot](vert-week-norep.png?raw=true "Screenshot (vertical mode, no week numbers, single weekday line)") | monthsVertical: true, <br> repeatWeekdaysVertical: false, <br> weekNumbers: true, |
| ![screenshot](vert-week-rep.png?raw=true "Screenshot (vertical mode, no week numbers, repeat weekday line for every month)") | monthsVertical: true, <br> repeatWeekdaysVertical: true, <br> weekNumbers: true, |
| ![screenshot](horz-noweeknum.png?raw=true "Screenshot (horizontal mode)") | monthsVertical: false, <br> weekNumbers: false,              |
| ![screenshot](horz-week.png?raw=true "Screenshot (horizontal mode)") | monthsVertical: false, <br> weekNumbers: true,               |

Many thanks to kirash for the inspiration with the monthly_calendar module, sdetweil and lavolp3 for the help in coding and CSS work. Without your help, this would just be a pipe dream.

Please, if you have any suggestions for improvement, let me know, I'm learning JS and CSS as I write this, and I dream of much bigger things.

Language Localization is controlled by the master language of MagicMirror².

## Update: 

Simply issue the following command in the MMM-Multimonth folder: 

```bash
cd ~/MagicMirror/modules/MMM-Multimonth
git pull
```
then restart your mirror. 