export const blockedDates = [
  new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
];

export const mockBookings = [
  {
    id: 'mock-1',
    preferred_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    preferred_time: '9:00 AM',
  },
  {
    id: 'mock-2',
    preferred_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    preferred_time: '2:00 PM',
  },
  {
    id: 'mock-3',
    preferred_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    preferred_time: '11:00 AM',
  },
  {
    id: 'mock-4',
    preferred_date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    preferred_time: '4:00 PM',
  },
  {
    id: 'mock-5',
    preferred_date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    preferred_time: '8:00 AM',
  },
  {
    id: 'mock-6',
    preferred_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    preferred_time: '1:00 PM',
  },
  {
    id: 'mock-7',
    preferred_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    preferred_time: '5:00 PM',
  },
];
