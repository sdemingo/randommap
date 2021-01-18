
# Enlaces

Este post lo he usado como punto de partida:
https://gamedev.stackexchange.com/questions/79049/generating-tile-map

Tiene buena pinta. Este concreto y los relacionados merecen una ojeada. En el
primero sobre rios es interesante lo de como crea el "river path".
https://gillesleblanc.wordpress.com/2013/01/09/creating-a-random-2d-game-world-map-part-2-adding-rivers-and-lakes/
https://gillesleblanc.wordpress.com/2012/10/16/creating-a-random-2d-game-world-map/


## Ejemplos de algoritmos celulares sencillos:

Muy sencillo:
http://www.davideaversa.it/2014/11/random-maps-with-cellular-automata/

En este no entiendo bien el uso de la variable simultaneusly:
http://www.emanueleferonato.com/2011/05/17/using-cellular-automata-to-generate-random-land-and-water-maps-with-flash/



# Apuntes mios

Para trazar los rios lo primero es calcular el lugar de origen. En un mapa
gigante esto deberia hacerse teniendo en cuenta un lugar alto como una
montaña. En el ejemplo [gillesleblanc] lo han hecho usando ruido perlin o
similar.

En mi caso no tengo que complicarme tanto por ahora, basta con elegir un punto
de partida y trazar un camino. El camino debe puede ser aleatorio. El agua
siempre llenará un vecino adyacente, teniendo en cuenta que puede cambiar de
dirección. Este cambio de dirección se deberia hacer en función de la altura del
mapa pero en mi caso puedo hacerlo aleatorio también. La anchura del rio también
puede ir modificandose. Por ahora itentar trazar un camino lógico de una sola
baldosa y luego intentar ver como puedo modificarlo.


