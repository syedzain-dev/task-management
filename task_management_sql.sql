create Database task_manager;
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  role ENUM('user', 'admin') DEFAULT 'user'
);

ALTER TABLE users
MODIFY role ENUM('user', 'admin') NOT NULL DEFAULT 'user';

use task_manager;

CREATE TABLE tasks ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, category_id INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, user_id INT, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL );

CREATE TABLE categories (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

select * from tasks;

select * from users;
