# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create employees
alfred = Employee.create(name: 'Alfred Brown')
tim = Employee.create(name: 'Tim Cannady')
jeff = Employee.create(name: 'Jeff Auston')

# Create shifts
Shift.create(employee: alfred, day: 0, start_at: '12pm', end_at: '5pm', duration: 5, role: 'Server', color: 'red')
Shift.create(employee: alfred, day: 1, start_at: '9am', end_at: '12pm', duration: 3, role: 'Host', color: 'green')
Shift.create(employee: alfred, day: 3, start_at: '9am', end_at: '4pm', duration: 7, role: 'Server', color: 'red')
Shift.create(employee: alfred, day: 5, start_at: '9am', end_at: '2pm', duration: 5, role: 'Host', color: 'green')

Shift.create(employee: tim, day: 0, start_at: '11am', end_at: '6pm', duration: 7, role: 'Chef', color: 'orange')
Shift.create(employee: tim, day: 1, start_at: '9am', end_at: '3pm', duration: 6, role: 'Dishwasher', color: 'purple')
Shift.create(employee: tim, day: 2, start_at: '9am', end_at: '1pm', duration: 4, role: 'Chef', color: 'orange')
Shift.create(employee: tim, day: 5, start_at: '9pm', end_at: '4am', duration: 7, role: 'Dishwasher', color: 'purple')

Shift.create(employee: jeff, day: 1, start_at: '11am', end_at: '6pm', duration: 7, role: 'Chef', color: 'orange')
Shift.create(employee: jeff, day: 2, start_at: '9am', end_at: '3pm', duration: 6, role: 'Dishwasher', color: 'purple')
Shift.create(employee: jeff, day: 4, start_at: '9am', end_at: '1pm', duration: 4, role: 'Chef', color: 'orange')
Shift.create(employee: jeff, day: 6, start_at: '9am', end_at: '4pm', duration: 7, role: 'Dishwasher', color: 'purple')
