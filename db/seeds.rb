# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create!(first_name: 'Tae', last_name: 'Yoon', password: '1234', email: 'Tae@email.com')
User.create!(first_name: 'TJ', last_name: 'Max', password: '1234', email: 'TJ@gmail.com')

Priority.create!(order: '1st', color: 'red')
Priority.create!(order: '2nd', color: 'orange')
Priority.create!(order: '3rd', color: 'yellow')

Category.create!(title: 'Chores')
Category.create!(title: 'Health')
Category.create!(title: 'Work')

Task.create!(title: 'Walk the dogs', start: '2023-05-30T07:45:00', end: '2023-05-30T08:45:00', allDay: false, category_id: Category.first.id, priority_id: Priority.first.id, user_id: User.first.id, color: Priority.first.color)
Task.create!(title: 'Vacuum the house', start: '2023-05-30T09:00:00', end: '2023-05-30T09:30:00', allDay: false, category_id: Category.first.id, priority_id: Priority.second.id, user_id: User.first.id, color: Priority.second.color)
Task.create!(title: 'Work Out', start: '2023-05-30T09:45:00', end: '2023-05-30T10:45:00', allDay: false, category_id: Category.second.id, priority_id: Priority.third.id, user_id: User.first.id, color: Priority.third.color)
Task.create!(title: 'Finish the project', start: '2023-05-30', end: '2023-05-30', allDay: true, category_id: Category.third.id, priority_id: Priority.first.id, user_id: User.first.id, color: Priority.first.color)
Task.create!(title: 'Finish the project ASAP', start: '2023-06-06', end: '2023-06-06', allDay: true, category_id: Category.third.id, priority_id: Priority.first.id, user_id: User.second.id, color: Priority.first.color)
Task.create!(title: 'Change Color', start: '2023-06-10', end: '2023-06-10', allDay: true, category_id: Category.third.id, priority_id: Priority.first.id, user_id: User.second.id, color: '#ff0000')