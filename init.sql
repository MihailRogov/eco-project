CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, eco_points DECIMAL DEFAULT 0);
CREATE TABLE IF NOT EXISTS waste_types (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, eco_value_per_kg DECIMAL NOT NULL);
CREATE TABLE IF NOT EXISTS collection_points (id SERIAL PRIMARY KEY, name VARCHAR(150) NOT NULL, address TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS disposal_reports (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), point_id INT REFERENCES collection_points(id), waste_type_id INT REFERENCES waste_types(id), weight_kg DECIMAL NOT NULL, report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

INSERT INTO users (name, eco_points) VALUES ('Иван Иванов', 150), ('Анна Смирнова', 450), ('Петр Васильев', 50), ('Мария Сергеева', 820), ('Алексей Попов', 15);
INSERT INTO waste_types (name, eco_value_per_kg) VALUES ('Пластик', 10), ('Стекло', 5), ('Батарейки', 50), ('Макулатура', 3), ('Алюминиевые банки', 20);
INSERT INTO collection_points (name, address) VALUES ('ЭкоЦентр', 'ул. Ленина, 10'), ('СборВтор', 'пр. Мира, 42'), ('Зеленый Город', 'ул. Садовая, 5'), ('Чистая Планета', 'Бульвар Строителей, 12'), ('Переработка Плюс', 'пл. Победы, 1');