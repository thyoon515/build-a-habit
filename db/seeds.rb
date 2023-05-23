# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.create!(first_name: 'Tae', last_name: 'Yoon', password: '1234', email: 'Tae@email.com')
User.create!(first_name: 'TJ', last_name: 'Max', password: '1234', email: 'TJ@gmail.com')

Priority.create!(order: '1st', color: 'Red')
Priority.create!(order: '2nd', color: 'Orange')
Priority.create!(order: '3rd', color: 'Yellow')

Category.create!(title: 'Chores')
Category.create!(title: 'Health')
Category.create!(title: 'Work')

Task.create!(title: 'Walk the dogs', startDate: '2023-05-23T07:45', endDate: '2023-05-23T08:45', allDay: false, category_id: Category.first.id, priority_id: Priority.first.id, user_id: User.first.id)
Task.create!(title: 'Vacuum the house', startDate: '2023-05-23T09:00', endDate: '2023-05-23T09:30', allDay: false, category_id: Category.first.id, priority_id: Priority.second.id, user_id: User.first.id)
Task.create!(title: 'Work Out', startDate: '2023-05-23T09:45', endDate: '2023-05-23T10:45', allDay: false, category_id: Category.second.id, priority_id: Priority.third.id, user_id: User.first.id)
Task.create!(title: 'Finish the project', allDay: true, category_id: Category.third.id, priority_id: Priority.first.id, user_id: User.first.id)