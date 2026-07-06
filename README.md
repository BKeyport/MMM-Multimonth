# This is a test module at this point. Don't use this branch! 

### NOTE: THIS MODULE IS TO BE HOSTED ONLY AT <https://github.com/BKeyport/MMM-Multimonth> - Any other hosting location is invalid.

* If you fork and change any code, please let me know, if it's useful for the general public, I'd love to add it!

* If you find this module useful, and would like to contribute to the project, I appreciate the thought. Instead of giving to me, please donate to a disability rights group of your choice. 

*THANK YOU for your consideration!*

Before use of this module, please review license information below! 

MagicMirror² Module to display a calendar with multiple months (user configurable)

![screenshot](screenshot-vertical-2026.png?raw=true "Screenshot (vertical mode, no week numbers, single weekday line)")

This is a module for the [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror) project.

This will create a mini-calendar with as many months as the user wants, assuming screen space is available. Screenshots are with config examples.

## Installing the Module

Clone this repository in your ~/MagicMirror/modules/ folder ( $ cd ~MagicMirror/modules/ ):

```bash
cd ~/MagicMirror/modules
git clone https://github.com/BKeyport/MMM-Multimonth
```

**Note: NPM install is not needed.**

## Updating the Module

```sh
cd ~/MagicMirror/modules/MMM-Multimonth
git pull
```

Then restart MagicMirror²

---

### Updating CSS 
CSS may have changed - please check all customizations. 

**Old Elements, values, etc. have been deleted (Prior to 2024), New elements may exist**.

The vast majority of your customizations are in a settings element at the beginning of the file. 

You should copy that to your `custom.css` and adjust as you prefer. 

Samples: 

| Screenshot                                                   | How to get                      |                      
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![screenshot](vert-noweek-norep.png?raw=true "Screenshot (vertical mode, no week numbers, single weekday line)") | monthsVertical: true, <br> repeatWeekdaysVertical: false, <br> weekNumbers: false, |
| ![screenshot](vert-noweek-rep.png?raw=true "Screenshot (vertical mode, no week numbers, repeat weekday line for every month)") | monthsVertical: true, <br> repeatWeekdaysVertical: true, <br> weekNumbers: false, |
| ![screenshot](vert-week-norep.png?raw=true "Screenshot (vertical mode, no week numbers, single weekday line)") | monthsVertical: true, <br> repeatWeekdaysVertical: false, <br> weekNumbers: true, |
| ![screenshot](vert-week-rep.png?raw=true "Screenshot (vertical mode, no week numbers, repeat weekday line for every month)") | monthsVertical: true, <br> repeatWeekdaysVertical: true, <br> weekNumbers: true, |
| ![screenshot](horz-noweeknum.png?raw=true "Screenshot (horizontal mode)") | monthsVertical: false, <br> weekNumbers: false,              |
| ![screenshot](horz-week.png?raw=true "Screenshot (horizontal mode)") | monthsVertical: false, <br> weekNumbers: true,               |

## Using the module

To use this module, add it to the modules array in the config file - shown options are defaults:

```js
{
  module: 'MMM-Multimonth',
    position: 'top_left', // can be any of the postions
    config: { // Optional - Defaults will be used) 
    }
},
```

## Configuration Options

### Calendar Range

| Feature            | Default | Description |
|-------------------|--------|-------------|
| staticStartMonth   | 0  | Lock calendar start month (0 = relative mode) 1-12 = Jan-Dec |
| startMonth         | -1 | Offset from current month (ignored if static start month is number) |
| monthCount         | 3  | Number of months to display |

Legacy Compatibility: 
* if `staticStartmonth` is set to `true`, it will use startMonth to determine the start month.
* if `staticStartmonth` is set to `false`, it will change to 0 internally. 

---

### Layout

| Feature        | Default | Description |
|----------------|--------|-------------|
| monthsVertical | false   | Vertical or horizontal layout |
| otherMonths    | false   | Show days outside current month |
| dowHeader      | "short" | Weekday label format ("short" | "narrow" | "long") |
| repeatDOW      | false   | do you want to repeat weekday header (vertical mode only) |
| borderMonth    | false   | Highlight month boundaries |
|||
| startWeek      | undefined | First day of week (0 = Sunday, 6 = Saturday) |

* startWeek - if not defined, it will default to your locale's defaults as defined in ISO. 

#### Legacy Compatibility: 

| Feature                 | Replacment |
|---|---|
| repeatWeekdaysVertical  | Replaced with 'repeatDOW' |
| headerType              | Replaced with 'dowHeader' |

---

### Appearance Features (CSS) 

| Feature     | Default | Description |
|------------|--------|-------------|
| bigCalendar | false  | Larger calendar rendering mode (see below) |
| instanceID  | empty     | CSS scope class for styling |

#### Big Calendar Mode

Events will be summarized into a symbol (see below) with an optional count (see below) and display below each day of the month. 

To keep the CSS slim, I ***do not*** format anything differently, and it ***will*** break the constraints of the mini mode. Don't use if you're inexperienced in CSS. You will have to design your display yourself. If you have any questions, ask in the MagicMirror² forums. Myself or any of the CSS wizards will be happy to help you. 

#### instanceID:
You can specify in custom.css different css for each instance. For example, if you add `instanceID: "test",` to your code, you can overide that instance with:

```css
.MMM-Multimonth .month-header.test {
  background-color: blue;
  color: var(--color-header);
  font-size: var(--font-size-small);
  line-height: var(--font-size-small);
  border-radius: var(--back-rounding);
}
```

---

### Weekend Features

You may define as many weekend days as you like in the array. 

| Feature         | Default   | Description |
|----------------|----------|-------------|
| weekendDays     | [0,6]    | Weekend day indexes, 0 = Sunday through 6 = Saturday |
| highlightWeekend| false    | Highlight weekend days |


#### Legacy Compatibility: 

| Feature                  | Replacement |
|-------------------------|--------------|
| weekend1                | Will translate to the first number in `weekendDays` Array  |
| weekend2                | Will translate to the second number in `weekendDays` Array  |

---

### Week Numbers

| Feature     | Default | Description |
|------------|--------|-------------|
| weekNumbers | 0 | Enable week numbers display (1-4)|
| weekNumbersFollow | false | Modifies all modes to follow startWeek | 

#### Mode 1 (ISO style)
* Weeks start on Monday
* Week 1 is the week containing Jan 4
* Week numbers follow ISO 8601 Rules. 

#### Mode 2 ("US" style)
* Weeks run Sunday to Saturday
* Week 1 is the Sunday to Saturday week that contains January 1
* All subsequent weeks increment by 1

#### Mode 3 (Alternate Style 1)
* Weeks run Sunday to Saturday
* Find the first week of the year that contains at least 4 days in that year
* That week is Week 1
* All later weeks increment by 1

#### Mode 4 (Alternate Style 2)
* Weeks run Sunday to Saturday
* Find the first week where all 7 days are in the year
* That week is Week 1
* All later weeks increment by 1


#### Legacy Compatibility: 
* If weekNumbers is set to "true": 
 * `weekNumbersISO` is `true` = Mode #1 
 * `WeekNumbersISO` is `false` = Mode #2 
* If `weekNumbers` is set to "false": will convert to 0. 

---

### Events

| Feature     | Default | Description |
|------------|--------|-------------|
| eventsOn    | false   | Do you want to have events shown? |
| calNames    | (All)   | Calendar sources  `["Main", "Sportsball", "Utility"]` case is IMPORTANT. |
| eventsCount | false   | Show event counts in big mode (No effect in normal mode) |

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

#### Event Colors

The module now can use the colors from the calendar module, default is the system colors 

#### Event Symbols

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

### Language
Language Localization is controlled by the master language of MagicMirror².


## Contributing

If you find any problems, bugs or have questions, please [open a GitHub issue](https://github.com/BKeyport/MMM-Multimonth/issues) in this repository.

Pull requests are of course also very welcome 🙂

### Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

### Modification 

Please fork to your own tree to make changes and offer back any contributions to the module. 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details. However, the following text is added:  

*Due to regulations being out of control, this software, as well as the entire MagicMirror project, may be illegal to use in any location with age verification laws. This software will cannot and will not provide any age verification. It is your responsibility to verify with your local government legality of software. The authors of this software and modules used both up and downstream from this product, cannot be held liable for use in a situation where age verification is required. This is your only notification.*

## Thank You

Many thanks to kirash for the inspiration with the monthly_calendar module, sdetweil and lavolp3 for the help in coding and CSS work. Without your help, this would just be a pipe dream.

thanks to Dathbe, KristjanESPERTO for contribution, advice, and helping maintain the module. 


