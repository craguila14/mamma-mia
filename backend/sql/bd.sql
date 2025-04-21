CREATE DATABASE mamma_mia;

\c mamma_mia;

CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE productos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10) NOT NULL,
    ingredientes TEXT[] NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL
);


INSERT INTO productos (nombre, precio, ingredientes, imagen, categoria, descripcion) VALUES 
('Napolitana', 5950, ARRAY['mozzarella', 'tomates', 'jamón', 'orégano'], 'https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_cl.jpg?alt=media&token=6a9a33da-5c00-49d4-9080-784dcc87ec2c', 'pizza', 'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda.'),
('Española', 7250, ARRAY['mozzarella', 'tomates', 'jamón', 'choricillo'], 'https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fcheese-164872_640_com.jpg?alt=media&token=18b2b821-4d0d-43f2-a1c6-8c57bc388fab', 'pizza', 'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda.'),
('Salame', 5990, ARRAY['mozzarella', 'tomates', 'salame', 'orégano'], 'https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_com.jpg?alt=media&token=e7cde87a-08d5-4040-ac54-90f6c31eb3e3', 'pizza', 'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda.'),
('Cuatro estaciones', 9590, ARRAY['mozzarella', 'salame', 'aceitunas', 'champiñones'], 'https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-2000595_640_c.jpg?alt=media&token=61325b6e-a1e0-441e-b3b5-7335ba13e8be','pizza', 'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda.'),
('Bacon', 6450, ARRAY['mozzarella', 'tomates cherry', 'bacon', 'orégano'], 'https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-salame.jpg?alt=media&token=ab3d4bf8-01f2-4810-982b-bd7fb6b517b2', 'pizza', 'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda.'),
('Pollo picante', 8500, ARRAY['mozzarella', 'pimientos', 'pollo grillé', 'orégano'],'https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-2000595_640_c.jpg?alt=media&token=61325b6e-a1e0-441e-b3b5-7335ba13e8be', 'pizza', 'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda.'),
('Carbonara', 5230, ARRAY['queso pecorino', 'yemas de huevo','guanciale'], 'https://e00-xlk-cooking-elmundo.uecdn.es/files/article_main_microformat/uploads/2023/02/28/63fe8443a52bc.jpeg', 'pasta', 'La carbonara es una receta típica de la cocina romana, que consiste en una pasta con huevo, queso pecorino y guanciale. Se dice que su origen se remonta a los carboneros que trabajaban en los bosques de los Apeninos.'),
('Boloñesa', 4500, ARRAY['carne picada', 'tomate', 'cebolla', 'zanahoria'], 'https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/BOLO%C3%91ESA%201200x709.png', 'pasta', 'La boloñesa es una salsa originaria de Bolonia, Italia, que se utiliza principalmente para acompañar pastas. Se elabora con carne picada, tomate, cebolla y zanahoria.'),
('Pesto', 4900, ARRAY['albahaca', 'piñones', 'queso parmesano', 'ajo'], 'https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/05/29/5ed11fb61d750.jpeg', 'pasta', 'El pesto es una salsa originaria de Génova, Italia, que se elabora con albahaca, piñones, queso parmesano y ajo. Se utiliza principalmente para acompañar pastas.'),
('Arrabiata', 5200, ARRAY['tomate', 'ajo', 'guindilla'], 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvpBuMFOJ2-Iq1qXK-mCVpfvjV8_OD5Got6g&s','pasta','La arrabiata es una salsa originaria de Roma, Italia, que se elabora con tomate, ajo y guindilla. Se utiliza principalmente para acompañar pastas.'),
('Marinara', 5300, ARRAY['tomate', 'ajo', 'mariscos'], 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe8w3eC1poNkQbxDW0tEfM1r4LlJJ5-ML5eA&s','pasta','La marinara es una salsa originaria de Nápoles, Italia, que se elabora con tomate, ajo y mariscos. Se utiliza principalmente para acompañar pastas.'),
('Tiramisu', 4850, ARRAY['queso mascarpone', 'café', 'bizcochos de soletilla', 'cacao en polvo'], 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLKWl_QSk_XZAhJbz_SxRP5CPLIl3NXWT15w&s', 'postre', 'El tiramisú es un postre italiano frío y cremoso, elaborado en capas con bizcochos de soletilla empapados en café, una suave crema de queso mascarpone con huevos y azúcar, y espolvoreado con cacao en polvo. Su nombre significa "levántame el ánimo", y es famoso por su equilibrio entre el amargor del café, la dulzura de la crema y el toque intenso del cacao.'),
('Cannoli', 2980, ARRAY['ricotta', 'chips de chocolate', 'ralladura de naranja', 'fruta confitada', 'pistachos picados'], 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLODnOChPZz5syXSDalOZDrmUCu3hiIt_oKw&s', 'postre', 'El cannoli es un tradicional postre siciliano compuesto por una caña crujiente de masa frita, rellena de una suave crema de ricotta azucarada. Suele llevar trocitos de chocolate, frutas confitadas o pistachos en los extremos, y se espolvorea con azúcar glas. Es famoso por su contraste entre la textura crocante de la masa y la cremosidad dulce del relleno.');

create table reservas (
id serial primary key,
usuario_id uuid not null,
fecha date not null,
hora time not null,
personas integer not null check (personas > 0 and personas <= 20),
telefono varchar (20),
mensaje text,
creado_en timestamp default current_timestamp,

foreign key (usuario_id) references usuarios(id) on delete cascade
);

CREATE TYPE estado_reserva AS ENUM ('confirmada', 'finalizada', 'cancelada');

ALTER TABLE reservas
ADD COLUMN estado estado_reserva NOT NULL DEFAULT 'confirmada';