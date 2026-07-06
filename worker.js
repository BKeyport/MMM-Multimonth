let lastEventsByDay = {}

function buildIndex(events) {

  const eventsByDay = Object.create(null)

  for (let i = 0; i < events.length; i++) {

    const ev = events[i]

    const d = new Date(Number(ev.startDate))
    d.setHours(0,0,0,0)

    const key = d.getTime()

    if (!eventsByDay[key]) {
      eventsByDay[key] = []
    }

    eventsByDay[key].push(ev)
  }

  return eventsByDay
}

function diffKeys(newIndex) {

  const changed = []

  const keys = Object.keys(newIndex)

  for (let i = 0; i < keys.length; i++) {

    const k = keys[i]

    const a = newIndex[k]?.length || 0
    const b = lastEventsByDay[k]?.length || 0

    if (a !== b) {
      changed.push(k)
    }
  }

  lastEventsByDay = newIndex

  return changed
}

onmessage = function (msg) {

  const data = msg.data

  if (data.type !== 'INDEX_EVENTS') return

  const events = data.payload || []

  const index = buildIndex(events)

  const changedKeys = diffKeys(index)

  postMessage({
    type: 'INDEX_RESULT',
    eventsByDay: index,
    changedKeys
  })
}
