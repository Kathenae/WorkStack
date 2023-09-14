## WorkStack

  Hi there, WorkStack is an upcoming project management platform that will connect businesses and individuals for remote collaboration on projects. Similar to Upwork, WorkStack will allow users to post job listings, search for and hire top talent, manage projects and communicate with team members in one centralized platform. Users will also be able to rate and review freelancers, and track progress on projects in real-time. WorkStack aims to make it easy for businesses and entrepreneurs to find and manage the right talent for their projects, and for freelancers to find new and exciting opportunities. With WorkStack, businesses will be able to easily scale their teams, and freelancers will be able to work on projects from anywhere in the world.

### Main Features (MVP):
- [x] Clients can Create and Manage Job
- [x] Users Search and filter jobs 
- [x] Freelancers can Create and Manage Proposals
- [x] Clients can Accept or Decline job proposals
- [x] Freelancers are notifiend of proposals acceptance/rejection
- [ ] In-app messaging and communication
- [ ] Live Interview Sessions
- [ ] Rating and review system for freelancers
- [ ] Safe and secure payment system

### Advanced Features:
- [ ] Collaboration tools for team members
- [ ] File sharing and storage
- [ ] Time tracking and invoicing
- [ ] Advanced search and filtering for freelancers
- [ ] Mobile app for on-the-go management
- [ ] Option for clients to create a company profile
- [ ] Option for freelancers to create a portfolio and showcase their work
- [ ] Option for freelancers to bid on projects
- [ ] Option to create a team of freelancers and manage them as a group
- [ ] Option to create a project template for repetitive tasks

## Tech Stack (Laravel, Inertia/React, MySQL)

  WorkStack is being built using the Laravel framework, a free, open-source PHP web application framework that follows the model-view-controller (MVC) architectural pattern. Laravel provides a set of tools and features that make it easy for developers to build robust and scalable web applications and will be a perfect fit for a project of this scale.

  The frontend is being built using Inertia.js, a framework that allows developers to build single-page apps (SPAs) using classic server-side routing and controllers, but with the feel of a SPA. The use of Inertia.js will enable the application to provide a more app-like experience for the end-users, with seamless transitions between server-rendered pages.

  The application will make use of a MySQL database to store and retrieve data, which is designed to handle a high volume of data and optimized for performance and scalability. The application will also integrate various third-party libraries and services, such as for example for the payment gateway, for the file storage, for the time tracking, etc, which will provide additional functionality and improve the user experience.

## How to Contribute?
  We welcome and appreciate any contributions to the WorkStack project. Whether you are a seasoned developer or just starting out, there are ways for you to get involved and help us make this project better.

### Reporting Issues
  If you encounter any issues with the project or have any suggestions for improvements, please let us know by creating an issue here. When reporting an issue, please include as much information as possible, such as the version of the project you're using, the steps to reproduce the issue, and any relevant error messages or screenshots.

### Submitting pull Requests

If you're interested in contributing code to the project, we'd love to have your help! Here's how you can get started:

1. Clone the repository
2. Create a new branch for your changes (git checkout -b my-new-feature)
3. Make the changes you want to contribute
4. Commit your changes (git commit -am 'Add some feature')
5. Push to the branch (git push origin my-new-feature)
6. Create a new Pull Request on GitHub
7. We'll review your changes as soon as possible and provide feedback.


## Development Environment Setup
1. Clone the repository: git clone https://github.com/kathenae/WorkStack
2. Ensure that you have the following software installed: XAMPP, Composer, and Nodejs.
3. Install PHP dependencies: `composer install`
4. Install frontend dependencies: `npm install`
5. Create a .env file by copying the example .env file: `cp .env.example .env`
6. Create your MySQL database with a proper name.
7. Update the .env file with your database connection settings.
8. Run migrations: `php artisan migrate`
9. Seed the database: `php artisan db:seed`
10. Watch frontend assets: `npm run dev`
11. Start Laravel development server: `php artisan serve` 
12. Access the app at http://localhost:8000

## Mailhog Setup:

1. For development, It is recommended to use Mailhog for testing emails. you can download it at https://github.com/mailhog/MailHog/releases. 

2. After downloading it you can start it by either double-clicking the mailhog executable or running `mailhog` on a terminal on the directory where the executable is found

3. If you're on windows make sure to set MAIL_HOST variable in the .env file to 'localhost' since 'mailhog' isn't recognized as a proper hostname.

## Redis Setup:
We're also going to need to setup Redis for queuing email notification and other jobs, so make sure you have it installed and running on your computer aswell:

1. For windows, download the Redis zip file from https://github.com/microsoftarchive/redis/releases and extract it on a directory of your choice

2. run `redis-server.exe redis.windows.conf` on the directory where you extracted the archive to start the redis server.

3. Set the QUEUE_CONNECTION variable in the .env file to 'redis'. Then you can start the Laravel queue worker by running the following command `php artisan queue:work`

4. If you're on linux you can install it by running `sudo apt install redis-server` on the terminal and start it by running `sudo systemctl start redis-server.service` or any equivalent commands depending on the distribution you're using
