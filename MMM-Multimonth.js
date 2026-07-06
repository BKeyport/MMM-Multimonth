
/* ============================================================
 * MMM-Multimonth
 * (C) Brendan Keyport 2026 and newer
 *
 * Rebuilt architecture
 * ============================================================ */

//============================================================
// Helper Functions
//============================================================

// Week Numbers
function getWeekNumber(date, cfg) {

  const msDay = 86400000;
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const year = d.getUTCFullYear();

  const startOfYear = new Date(Date.UTC(year, 0, 1));

  let start;

  const day = (x) => x.getUTCDay() || 7;

  const shift = (base) => {
    if (!cfg.weekNumbersFollow || typeof cfg.startWeek !== "number") return base;
    const diff = (day(base) - cfg.startWeek + 7) % 7;
    base.setUTCDate(base.getUTCDate() - diff);
    return base;
  };

  switch (cfg.weekNumberMode) {

    case 1:
      const isoD = new Date(d);
      isoD.setUTCDate(d.getUTCDate() + 4 - day(d));
      const isoY = new Date(startOfYear);
      isoY.setUTCDate(startOfYear.getUTCDate() + 4 - day(startOfYear));
      return Math.ceil(((isoD - isoY) / msDay + 1) / 7);

    case 2:
      start = new Date(startOfYear);
      start.setUTCDate(start.getUTCDate() - start.getUTCDay());
      return Math.floor((d - shift(start)) / msDay / 7) + 1;

    case 3:
      start = new Date(startOfYear);
      start.setUTCDate(start.getUTCDate() + ((4 - day(start) + 7) % 7) - 7);
      return Math.floor((d - shift(start)) / msDay / 7) + 1;

    case 4:
      start = new Date(startOfYear);
      while (true) {
        const next = new Date(start);
        next.setUTCDate(start.getUTCDate() + 7);
        if (next.getUTCFullYear() !== year) break;
        start = next;
      }
      return Math.floor((d - shift(start)) / msDay / 7) + 1;
  }

  return null;
}

// Event Helper

const EventHelper = {
  init(config) {
    this.config = config || {}
    this.events = []
  },

  setEvents(events) {
    this.events = events || []
  },

  onCalendarEvents(payload) {
    this.setEvents(JSON.parse(JSON.stringify(payload)))
  },

  matchCalendar(name) {
    const list = this.config.calNames
    return !list || list.length === 0 || list.includes(name)
  },

  dayKey(d) {
    return new Date(d).setHours(0, 0, 0, 0)
  },

  getEventsForDate(date) {
    if (!this.config.eventsOn) return []

    const target = this.dayKey(date)

    return this.events.filter(ev =>
      this.dayKey(Number(ev.startDate)) === target &&
      this.matchCalendar(ev.calendarName)
    )
  },

  getEventCountsForDate(date) {
    if (!this.config.eventsOn) return {}

    const target = this.dayKey(date)
    const out = {}

    for (let ev of this.events) {
      if (
        this.dayKey(Number(ev.startDate)) !== target ||
        !this.matchCalendar(ev.calendarName)
      ) continue

      if (!out[ev.calendarName]) {
        out[ev.calendarName] = {
          count: 1,
          symbol: ev.symbol || "",
          color: ev.color || ""
        }
      } else {
        out[ev.calendarName].count++
      }
    }

    return out
  }
}

// Module code

Module.register("MMM-Multimonth", {

//============================================================
// DEFAULT CONFIGURATION
//============================================================

defaults: {

  staticStartMonth: 0,
  startMonth: -1,
  monthCount: 3,
  monthsVertical: false,
  otherMonths: false,
  dowHeader: "short",
  repeatDOW: false,
  borderMonth: false, // Not configured yet
  bigCalendar: false,
  instanceID: "",
  weekendDays: [0, 6],
  highlightWeekend: false,
  weekNumbers: false,
  eventsOn: false,
  calNames: [],
  eventsCount: false,
  weekend1: undefined,
  weekend2: undefined,
  repeatWeekdaysVertical: undefined,
  weekNumbersISO: undefined,
  headerType: undefined,
  startWeek: undefined,
  
}


//============================================================
// LOAD CSS
//============================================================

   getStyles: function () {
    return [this.data.path + '/MMM-Multimonth.css']
  },


//============================================================
// MODULE STARTUP
//============================================================

  start() {

    this.eventHelper = Object.create(EventHelper);
  this.eventHelper.init(this.config);

  this.scheduleMidnightUpdate();

},

//============================================================
// MIDNIGHT REFRESH
//============================================================

  scheduleMidnightUpdate() {

    const now = new Date();
    const next = new Date(now);

    next.setHours(24, 0, 0, 0);

    const delay = next.getTime() - now.getTime();

    setTimeout(() => {

      this.updateDom();

      this.scheduleMidnightUpdate();

    }, delay);

  },

//============================================================
// NOTIFICATIONS
//============================================================

 notificationReceived(notification, payload) {

  if (notification === "CALENDAR_EVENTS") {

    if (this.eventHelper) {
      this.eventHelper.onCalendarEvents(payload)
    }

    this.updateDom();

  }

},

//============================================================
// MAIN RENDER ENTRY
//============================================================

  getDom() {

    const cfg = this.resolveConfig();

    const snapshot = this.buildSnapshot(cfg);

    return this.renderCalendar(snapshot, cfg);

  },

//============================================================
// CONFIG RESOLUTION
//============================================================

  resolveConfig() {

    const c = this.config;

    const cfg = {};

//==========================================================
// Calendar Range / Start Logic
//==========================================================

    cfg.staticStartMonth = c.staticStartMonth;

// New Routine. 
    if (
      typeof c.staticStartMonth === "number" &&
      c.staticStartMonth >= 1 &&
      c.staticStartMonth <= 12
    ) {

      cfg.staticMode = "override";
      cfg.startMonth = c.staticStartMonth;

    } 

// Old Method. 
    else if (c.staticStartMonth === true) {

      cfg.staticMode = "absolute";
      cfg.startMonth = Math.min(12, Math.max(1, c.startMonth));

    } else {

      cfg.staticMode = "relative";
      cfg.staticStartMonth = false;
      cfg.startMonth = Number(c.startMonth) || 0;

    }

    cfg.monthCount = Math.max(1, Number(c.monthCount) || 1);

//==========================================================
// Grid Structure
//==========================================================

    cfg.otherMonths = !!c.otherMonths;
    cfg.monthsVertical = !!c.monthsVertical;

    if (typeof c.dowHeader === "string") {

      cfg.dowHeader = c.dowHeader;

    } else {

      cfg.dowHeader = c.headerType || "short";

    }

    if (
      cfg.dowHeader !== "short" &&
      cfg.dowHeader !== "narrow" &&
      cfg.dowHeader !== "long"
    ) {
      cfg.dowHeader = "short";
    }

    if (typeof c.repeatDOW === "boolean") {

      cfg.repeatDOW = c.repeatDOW;

    } else {

      cfg.repeatDOW = !!c.repeatWeekdaysVertical;

    }

//==========================================================
// Weekend System
//==========================================================

  cfg.highlightWeekend = !!c.highlightWeekend;

if (Array.isArray(c.weekendDays) && c.weekendDays.length) {

  cfg.weekendDays = [...new Set(
    c.weekendDays
      .map(Number)
      .filter(day => Number.isInteger(day) && day >= 0 && day <= 6)
  )];

} else {

  const w1 = Number(c.weekend1);
  const w2 = Number(c.weekend2);

  cfg.weekendDays = [w1, w2]
    .filter(day => Number.isInteger(day) && day >= 0 && day <= 6);

  if (cfg.weekendDays.length === 0) {
    cfg.weekendDays = [0, 6];
  }
}

//==========================================================
// Display
//==========================================================

    cfg.bigCalendar = !!c.bigCalendar;
    cfg.instanceID = String(c.instanceID || "").trim();
    
    cfg.startWeek = Number(c.startWeek);

    if (
      Number.isInteger(cfg.startWeek) &&
      cfg.startWeek >= 0 &&
      cfg.startWeek <= 6
    ) {

// Valid user override, keep as-is

    } else {

// Use locale default
      const locale = new Intl.Locale(
        c.language || config.language || navigator.language
      );

      let lw = locale.weekInfo?.firstDay;

      if (lw === undefined) {
        lw = 7; // Fallback to Sunday
      }

      cfg.startWeek = (lw === 7) ? 0 : lw;
    }

//==========================================================
// Week Numbers
//==========================================================

    cfg.weekNumbers = false;
    cfg.weekNumberMode = 0;

    if (c.weekNumbers === true) {

      cfg.weekNumbers = true;
      cfg.weekNumberMode = c.weekNumbersISO ? 1 : 2;

    } else if (
      typeof c.weekNumbers === "number" &&
      c.weekNumbers >= 1 &&
      c.weekNumbers <= 4
    ) {

      cfg.weekNumbers = true;
      cfg.weekNumberMode = c.weekNumbers;

    }

    cfg.weekNumbersFollow = !!c.weekNumbersFollow;

//==========================================================
// Events
//==========================================================

    cfg.eventsOn = !!c.eventsOn;

    cfg.calNames = Array.isArray(c.calNames)
      ? [...c.calNames]
      : [];

    cfg.eventsCount = !!c.eventsCount;

    return cfg;

  },

//============================================================
// SNAPSHOT BUILDER
//============================================================

/**
 * Build an in-memory calendar snapshot.
 *
 * This routine generates the complete calendar data structure used by the
 * renderer. It performs all date calculations up front so the rendering
 * code only has to iterate over the finished snapshot.
 *
 * Snapshot hierarchy:
 *
 *   snapshot
 *     └── months[]
 *           └── weeks[]
 *                 └── days[]
 *
 * Each month contains its title, year, month number, week rows, and
 * day objects. Rendering never performs date math—it simply consumes
 * this snapshot.
 */

  buildSnapshot(cfg) {

    const snapshot = {

      months: []

    };

    const today = new Date();

    let startDate;

    switch (cfg.staticMode) {

      case "relative":

        startDate = new Date(
          today.getFullYear(),
          today.getMonth() + cfg.startMonth,
          1
        );
        break;

      default:

        startDate = new Date(
          today.getFullYear(),
          cfg.startMonth - 1,
          1
        );

    }

    for (let monthIndex = 0; monthIndex < cfg.monthCount; monthIndex++) {

      const monthDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + monthIndex,
        1
      );

      const month = {

        year: monthDate.getFullYear(),
        month: monthDate.getMonth(),

        title: monthDate.toLocaleDateString(config.language, {
          month: "long",
          year: "numeric"
        }),

        weeks: []

      };

      const firstDay = new Date(month.year, month.month, 1);
      const lastDay = new Date(month.year, month.month + 1, 0);

      const daysInMonth = lastDay.getDate();

//========================================================
// Determine first displayed cell
//========================================================

      const dayOffset = (firstDay.getDay() - cfg.startWeek + 7) % 7;

      let displayStart = new Date(firstDay);
      displayStart.setDate(firstDay.getDate() - dayOffset);
      
//========================================================
// Determine last displayed cell
//========================================================

      let displayEnd = new Date(lastDay);

      const endWeekday = (cfg.startWeek + 6) % 7;

      while (displayEnd.getDay() !== endWeekday) {
        displayEnd.setDate(displayEnd.getDate() + 1);
      }
      
//========================================================
// Build weeks
//========================================================

      let current = new Date(displayStart);

      while (current <= displayEnd) {
        
        const week = {
          weekNumber: getWeekNumber(current, cfg),
          days: []
        };

        for (let i = 0; i < 7; i++) {

          const inMonth = current.getMonth() === month.month;

          const day = {

            date: new Date(current),

            day: current.getDate(),

            month: current.getMonth(),

            year: current.getFullYear(),

            weekday: current.getDay(),

            inMonth: inMonth,

            today:
              current.toDateString() === today.toDateString(),

            weekend:
              cfg.highlightWeekend &&
              cfg.weekendDays.includes(current.getDay()),

            dimmed: !inMonth,

            events: []// Placeholder

          };

          week.days.push(day);

          current.setDate(current.getDate() + 1);

        }

        month.weeks.push(week);

      }

      snapshot.months.push(month);

    }

    return snapshot;

  },

//============================================================
// RENDER CALENDAR
//============================================================

  renderCalendar(snapshot, cfg) {

    const wrapper = document.createElement("div");

    wrapper.className = "calendar settings";

    wrapper.classList.add(
      cfg.monthsVertical ? "vertical" : "horizontal"
    );

    if (cfg.instanceID.length) {
      wrapper.classList.add(cfg.instanceID);
    }

    snapshot.months.forEach((month, monthIndex) => {

      const monthDiv = document.createElement("div");
      monthDiv.className = "month";

//--------------------------------------------------------
// Month Header
//--------------------------------------------------------

      const header = document.createElement("div");
      header.className = "month-header";
      header.innerHTML = month.title;

      monthDiv.appendChild(header);

//--------------------------------------------------------
// DOW Header
//--------------------------------------------------------

if (
  !cfg.monthsVertical ||
  (cfg.monthsVertical && (monthIndex === 0 || cfg.repeatDOW))
) {
  monthDiv.appendChild(this.renderDOWHeader(cfg));
}

//--------------------------------------------------------
// Weeks
//--------------------------------------------------------

      month.weeks.forEach((week) => {

        monthDiv.appendChild(
          this.renderWeek(week, cfg)
        );

      });

      wrapper.appendChild(monthDiv);

    });

    return wrapper;

  },

//============================================================
// RENDER DOW HEADER
//============================================================

  renderDOWHeader(cfg) {
    const row = document.createElement("div");
    row.className = "dowContainer";

//----------------------------------------------------------
// Week Number Column
//----------------------------------------------------------

    if (cfg.weekNumbers) {

      const blank = document.createElement("div");

      blank.className = cfg.bigCalendar
        ? "weekNumBig dowBlank"
        : "weekNumSmall dowBlank";

      row.appendChild(blank);

    }

//----------------------------------------------------------
// Day Headers
//----------------------------------------------------------

    for (let i = 0; i < 7; i++) {

      const weekday = (cfg.startWeek + i) % 7;

      const cell = document.createElement("div");
      cell.className = "dow";

      const sample = new Date(2024, 0, 7 + weekday);

      cell.innerHTML = sample.toLocaleDateString(config.language, {
        weekday: cfg.dowHeader
      });

      row.appendChild(cell);

    }

    return row;

  },

//============================================================
// RENDER WEEK
//============================================================

  renderWeek(week, cfg) {

    const row = document.createElement("div");

    row.className = "weekContainer";

//----------------------------------------------------------
// Week Number
//----------------------------------------------------------

    if (cfg.weekNumbers) {

      const weekCell = document.createElement("div");

      weekCell.className = cfg.bigCalendar
        ? "weekNumBig"
        : "weekNumSmall";

      weekCell.innerHTML = week.weekNumber ?? "&nbsp;";

      row.appendChild(weekCell);

    }

//----------------------------------------------------------
// Days
//----------------------------------------------------------

    week.days.forEach((day) => {

      row.appendChild(
        this.renderDay(day, cfg)
      );

    });

    return row;

  },

//============================================================
// RENDER DAY
//============================================================

renderDay(day, cfg) {

//==========================================================
// CREATE ROOT CONTAINER (always exists)
//==========================================================
  const container = document.createElement("div");
  container.className = "dayContainer";

  const events = this.eventHelper
  ? this.eventHelper.getEventsForDate(day.date)
  : []

//==========================================================
// CREATE DAY CELL (this is what CSS styles)
//==========================================================
  const dayDiv = document.createElement("div");
  dayDiv.classList.add("day");

//==========================================================
// OUTSIDE CURRENT MONTH HANDLING
//==========================================================
  if (!day.inMonth) {

// If we are NOT showing other months → hide completely
    if (!cfg.otherMonths) {
      dayDiv.classList.add("noDisplay");
      container.appendChild(dayDiv);
      return container;
    }

// Otherwise dim it
    dayDiv.classList.add("dim");
  }

//==========================================================
// STATE FLAGS (these match your CSS exactly)
//==========================================================
  if (day.today) {
    dayDiv.classList.add("today");
  }

  if (day.weekend) {
    dayDiv.classList.add("weekend");
  }

//==========================================================
// SET NUMBER
//==========================================================
  dayDiv.innerHTML = day.day;

//==========================================================
// ATTACH DAY TO CONTAINER
//==========================================================
  container.appendChild(dayDiv);

  //==========================================================
  // EVENTS AREA
  //==========================================================

  const events = document.createElement("div");
  events.className = "events";

  const data = this.eventHelper
    ? this.eventHelper.getEventCountsForDate(day.date)
    : {};

  if (cfg.bigCalendar) {

    // BIG MODE: symbol per calendar
    for (const name in data) {

      const e = document.createElement("div");
      e.className = "bigEvent";

      const color = data[name].color || "inherit";
      const symbol = data[name].symbol || "";

      if (cfg.eventsCount) {
        e.innerHTML = `<span style="color:${color}">
          ${symbol} x ${data[name].count}
        </span>`;
      } else {
        e.innerHTML = `<span style="color:${color}">
          ${symbol}
        </span>`;
      }

      events.appendChild(e);
    }

  } else {

    // NORMAL MODE: one jewel per calendar
    for (const name in data) {

      const e = document.createElement("div");
      e.className = "event";

      const color = data[name].color || "inherit";

      e.style.color = color;
      e.innerHTML = "●";

      events.appendChild(e);
    }
  }

  container.appendChild(events);

  return container;

});

    
