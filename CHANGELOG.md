# Changelog

Notable changes to this project will be documented in this file.

##14 Aug 2025

- Update README
- Add CHANGELOG
- Add CODE_OF_CONDUCT
- Remove empty file

##08 May 2025 
- Remove duplicate code, clean up. 

##18 Apr 2025 
- Change Event visual on small screen to "Jewels" - the ∙ symbol colored to match calendar, add option to not show event count in big mode.

##20 Aug 2024 
- Fixing errors caught by github user tgtechy. Thank you. 

##11 Aug 2024 
- Adjusted startup code to refresh properly at midnight, other minor changes.

##18 Jun 2024 
- Adjusted JS and CSS to make things line up better, found lots of little CSS bugs. Fully enabled color event handling. 

##8 Jun 2024 
- MAJOR CSS re-write. Some values have changed, Some have been eliminated, some new. 

##9 May 2024 
- Adjusted README.md for new 3rd party list compatibility, plus capturing other changes. 

##5 May 2024 
- Fixed US Weeknumbers, among other bug fixes. 

##1 Dec 2023 
- Basic changes to system to allow for a new feature (currently undocumented, need to go back through code to document due to being lazy and not writing down changes)

#18 Oct 2023 
- Added CSS class "instanceID" to allow for more complex CSS. Yes, I'm still working on the module - just been busy. Added fontsize variable to defaults.

#16 Jul 2023 
- Adjusted CSS to follow master font sizing from MagicMirror². Does not affect custom.css if used for this module.

#17 May 2023 
- Added calNames - a way to control which calendars do what. Please Readme.

#28 Nov 2022 
- Added config option "eventsOn" to control event monitoring.

##26 Nov 2022 -
- Added support for events from default calendar module.
- Changed the following css elements: day, dim, weekend, current, event, settings.
- Added new varable "--color-event" - which sets the color of the underline marking event on that day.

##11 Nov 2022
- Temporary disabled US/CA week numbers, routine isn't consistent. I'm gonna rework it. Regardless of how it's set, you will use ISO week numbers.
- Rewrote javascript to match new knowledge, saving several lines of code and making more CSS sense.
- added classes for future features, prepped more things for major future planned feature.
- Streamlined CSS classes some more.
- Due to changes, css class "current_day_weekend" is no longer supported. It does nothing.

##4 Nov 2022 
-    Correct US/CA Week number calculation, add ISO calculation.

##29 Oct 2022 
-   Start Implementing streamlined CSS, add feature to move weekend around, documentation improvements.

#24 Oct 2022 
-   Add config option for previous/next month display rather than forcing based on use.

##12 Oct 2022 
-   Fix bug causing last day of month to fall off calendar if it's the same day as start of week.

##5 Oct 2022 
-    Fix bug in week numbers, fix extra week error.

##4 Oct 2022 
-    Internationalization and Start of Week added back in. -- Note: I'm aware of a bug where the week numbers are showing an extra week. I'm redesigning the layout.

##1 Oct 2022 
-    Completely removed moment.js from project. **Returned to Beta Status due to lack of internationalization and start of week adjustments**

#7 Sep 2022 
- changing to date based versioning.

##1.90 
- Minor fixes/Remove EOL - Begin work on moving to a life without moment.js - Goal, no dependencies.

##1.50
- Minor fixes

##1.21
- Added weekend highlight for current day, so user could specify a different look for current day on weekend.

##1.20
- Added weekend highlight, default is off.

##1.10
- Added leading and trailing months when 1 month is selected per user request.

##1.00
- Minor changes to code/css to standardize look.

#0.99
- Major rewrite by [Volker Wegert](https://github.com/vwegert) (Danke sehr!) - Implements everything I want, and I even understand the wizard level code he wrote.

##0.95
- Fix start of week issue. Had a calculation backwards. - Suggestion was made to optionally add week numbers to the system, still working on that.

##0.9
- Start of week now moves per moment.js. Note: at this point, module is almost everything I wanted. If I don't get any bug reports that I can control, I'm going to bump it up to 1.0 and call it good.

##0.3

- Removed bodge in 0.25, replaced with a simple refresh at midnight, no animation, as I find it annoying.

## 0.25
- Fix code with temporary bodge so to refresh every hour to assure day changes sometime between midnight and 1 am.

## 0.2
- Change code to improve functionality, allow for some localization - will not move start of week yet, but will change languages with system.

## 0.1
- Initial release













