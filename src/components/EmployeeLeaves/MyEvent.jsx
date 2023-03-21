const now = new Date()

export const myEvent = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2022, 3, 0),
    end: new Date(2022, 3, 1),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2022, 3, 7),
    end: new Date(2022, 3, 10),
  },
  {
    id: 4,
    title: 'Some Event',
    start: new Date(2022, 3, 9,0 ,0 ,0),
    end: new Date(2022, 3, 9,0 ,0 ,0),
  },
  {
    id: 2,
    title: 'DTS startS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS endS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  
  {
    id: 5,
    title: 'Conference',
    start: new Date(2022, 3, 11),
    end: new Date(2022, 3, 13),
    desc: 'Big conference for important people',
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2022, 3, 12, 10, 30, 0, 0),
    end: new Date(2022, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2022, 3, 12, 12, 0, 0, 0),
    end: new Date(2022, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2022, 3, 12, 14, 0, 0, 0),
    end: new Date(2022, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2022, 3, 12, 17, 0, 0, 0),
    end: new Date(2022, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2022, 3, 12, 20, 0, 0, 0),
    end: new Date(2022, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: 'Planning Meeting with Paige',
    start: new Date(2022, 3, 13, 8, 0, 0),
    end: new Date(2022, 3, 13, 10, 30, 0),
  },
  {
    id: 11.5,
    title: 'Inconvenient Conference Call',
    start: new Date(2022, 3, 13, 9, 30, 0),
    end: new Date(2022, 3, 13, 12, 0, 0),
  },
   {
    id: 11.6,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2022, 3, 13, 11, 30, 0),
    end: new Date(2022, 3, 13, 14, 0, 0),
  },
  {
    id: 11.7,
    title: 'Quote Follow-up - Tea by Tina',
    start: "2022-03-13",
    end: "2022-03-13",
  }, 
  {
    id: 12,
    title: 'Late Night Event',
    start: "2022-03-17",
    end: "2022-03-18",
  },
  {
    id: 12.5,
    title: 'Late Same Night Event',
    start: "2022-03-17",
    end: "2022-03-17",
  },
  
  {
    id: 13,
    title: 'Multi-day Event',
    start:"2022-03-20",
    end: "2022-03-22",
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 15,
    title: 'Point in Time Event',
    start: "2022-07-20",
    end: "2022-07-20",
  },
  {
    id: 30,
    title: 'hoil',
    start: "2022-07-22",
    end: "2022-07-22",
  },
  {
    id: 31,
    title: 'event 1',
    start: "2022-07-22",
    end: "2022-07-22",
  },
  {
    id: 32,
    title: 'event 2',
    start: "2022-07-22",
    end: "2022-07-22",
  },
  {
    id: 33,
    title: 'event 2',
    start:new Date(2022, 6, 21),
    end: new Date(2022, 6, 21),
  },
  {
    id: 34,
    title: 'event 2',
    start:new Date(2022, 6, 21),
    end: new Date(2022, 6, 21),
  },
  {
    id: 34,
    title: 'event 2',
    start:new Date(2022, 6, 21),
    end: new Date(2022, 6, 21),
  },
  {
    id: 16,
    title: 'Video Record',
    start: new Date(2022, 3, 14, 15, 30, 0),
    end: new Date(2022, 3, 14, 19, 0, 0),
  },
  {
    id: 17,
    title: 'Dutch Song Producing',
    start: new Date(2022, 3, 14, 16, 30, 0),
    end: new Date(2022, 3, 14, 20, 0, 0),
  },
  {
    id: 18,
    title: 'Itaewon Halloween Meeting',
    start: new Date(2022, 3, 14, 16, 30, 0),
    end: new Date(2022, 3, 14, 17, 30, 0),
  },
  {
    id: 19,
    title: 'Online Coding Test',
    start: new Date(2022, 3, 14, 17, 30, 0),
    end: new Date(2022, 3, 14, 20, 30, 0),
  },
  {
    id: 20,
    title: 'An overlapped Event',
    start: new Date(2022, 3, 14, 17, 0, 0),
    end: new Date(2022, 3, 14, 18, 30, 0),
  },
  {
    id: 21,
    title: 'Phone Interview',
    start: new Date(2022, 3, 14, 17, 0, 0),
    end: new Date(2022, 3, 14, 18, 30, 0),
  },
  {
    id: 22,
    title: 'Cooking Class',
    start: new Date(2022, 3, 14, 17, 30, 0),
    end: new Date(2022, 3, 14, 19, 0, 0),
  },
  {
    id: 23,
    title: 'Go to the gym',
    start: new Date(2022, 3, 14, 18, 30, 0),
    end: new Date(2022, 3, 14, 20, 0, 0),
  },
  {
    id: 24,
    title: 'Independence Day',
    start: new Date(2022, 7, 15),
    end: new Date(2022, 7, 15),
  },
  
]