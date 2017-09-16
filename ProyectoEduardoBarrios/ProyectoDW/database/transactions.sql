select MAX(idJuego),Titulo,Descripcion,idPreguntas from juegos where idJuegos = (select max(idJuego));

select * from juegos order by idJuego desc limit 0,1

DELIMITER $$
CREATE PROCEDURE sp_TransaccionInsertPreguntasRespuestas
(
	IN pregunta varchar(255),
    IN limiteTiempo varchar(30),
    IN IdJuego int,
    IN resp1 varchar(100),
    IN resp2 varchar(100),
    IN resp3 varchar(100),
    IN resp4 varchar(100),
    IN respCorrecta1 BOOLEAN,
    IN respCorrecta2 BOOLEAN,
    IN respCorrecta3 BOOLEAN,
    IN respCorrecta4 BOOLEAN

)
BEGIN
	 DECLARE EXIT HANDLER FOR SQLEXCEPTION
	 BEGIN
	 SHOW ERRORS LIMIT 1;
	 ROLLBACK;
	 END; 
	 
     DECLARE EXIT HANDLER FOR SQLWARNING
	 BEGIN
	 SHOW WARNINGS LIMIT 1;
	 ROLLBACK;
	 END;
		
	START TRANSACTION;    
		/* insertar en la tabla pregunta */
		INSERT INTO preguntas(pregunta,limiteTiempo,idJuego) VALUES(pregunta,limiteTiempo,IdJuego);
		SELECT @idPregunta := MAX(idPregunta) FROM preguntas;
		        
		                
		 /*insertar las respuestas en la tabla respuestas */
		
		INSERT INTO respuestas(respuesta,idPregunta,correcta)VALUES(resp1,@idPregunta,respCorrecta1);			
		INSERT INTO respuestas(respuesta,idPregunta,correcta)VALUES(resp2,@idPregunta,respCorrecta2);			
        INSERT INTO respuestas(respuesta,idPregunta,correcta)VALUES(resp3,@idPregunta,respCorrecta3);			
        INSERT INTO respuestas(respuesta,idPregunta,correcta)VALUES(resp4,@idPregunta,respCorrecta4);			
    COMMIT; 
END $$

DROP PROCEDURE sp_TransaccionInsertPreguntasRespuestas;
CALL sp_TransaccionInsertPreguntasRespuestas('Cuál es la pregunta ?','111 seg.',3,'respuesta 1','respuesta 2','respuesta 3','respuesta 4',false,true,false,false);

select * from juegos

DELIMITER $$
CREATE PROCEDURE sp_GetPreguntasRespuestas(IN IdJuego int)
BEGIN
	/* obtener las preguntas y respuestas en una sola consulta */
    SELECT J.Titulo,J.Descripcion,J.fechaCreacion,
		   P.idPregunta,P.pregunta,P.limiteTiempo,
	       R.idRespuesta,R.respuesta,R.idPregunta,R.correcta           
	FROM juegos J
    left JOIN preguntas P ON J.idJuego = P.idJuego
	left JOIN respuestas R ON P.idPregunta = R.idPregunta    
	WHERE P.idJuego = 5
    GROUP BY J.Titulo,P.pregunta,R.respuesta;
END $$

CALL sp_GetPreguntasRespuestas(3);
DROP PROCEDURE sp_TransaccionGetPreguntasRespuestas;

truncate table preguntas

select * from participantes

insert into participantes (nombre,carne,idJuego) values ('Juan','12334',1) 

/*TRANSACCION Y PROCEDIMIENTO PARA INSERTAR PARTICIPANTES*/
DELIMITER $$
CREATE PROCEDURE sp_ingresarParticipante
(
	IN Nombre varchar(100),
	IN Carne varchar(20),
    IN IdJuego int
)
BEGIN
	 DECLARE EXIT HANDLER FOR SQLEXCEPTION
	 BEGIN
	 SHOW ERRORS LIMIT 1;
	 ROLLBACK;
	 END; 
	 
     DECLARE EXIT HANDLER FOR SQLWARNING
	 BEGIN
	 SHOW WARNINGS LIMIT 1;
	 ROLLBACK;
	 END;
		
	START TRANSACTION;    
		SELECT @Juego := (SELECT J.idJuego FROM juegos J WHERE J.idJuego = IdJuego);
        INSERT INTO participantes(nombre,carne,idJuego) SELECT Nombre,Carne,@Juego WHERE @Juego > 0;			
		
		/*FILAS AFECTADAS*/
        SELECT ROW_COUNT() AS rc;
    COMMIT; 
END $$

DROP PROCEDURE sp_ingresarParticipante;
CALL sp_ingresarParticipante('Nichols3','Williams2',100);

truncate table participantes

DELIMITER $$
CREATE PROCEDURE sp_getPreguntaRespuestas(IN IdJuego int,IN nRegistro int,IN correcta int)
BEGIN
	SELECT P.idPregunta,P.pregunta,P.idJuego FROM preguntas P WHERE P.idJuego = IdJuego LIMIT nRegistro,1;
	SELECT @idPregunta := PR.idPregunta FROM preguntas PR WHERE PR.idJuego = IdJuego LIMIT nRegistro,1;
	SELECT R.respuesta,R.correcta FROM respuestas R WHERE R.idPregunta = @idPregunta;
    SELECT COUNT(p.idPregunta) numPreguntas from preguntas p WHERE p.idJuego = IdJuego;
    SELECT r.idRespuesta,r.respuesta,r.correcta as respuestaCorrecta FROM respuestas r WHERE r.correcta = 1 AND r.idPregunta = @idPregunta;
    SELECT @idUltimoParticipante := MAX(idParticipante) FROM participantes;
    INSERT INTO resultados(idParticipante,idPregunta,correcta) SELECT @idUltimoParticipante,@idPregunta,correcta WHERE correcta > -1 AND correcta < 2;    
    SELECT RS.idPregunta,
		   (select count(correcta.correcta) from resultados correcta where correcta.correcta = 1 and correcta.idParticipante = @idUltimoParticipante) AS cantCorrectas,
	       (select count(incorrecta.correcta) from resultados incorrecta where incorrecta.correcta = 0 and incorrecta.idParticipante = @idUltimoParticipante) AS cantIncorrectas 
	FROM resultados RS WHERE RS.idParticipante = @idUltimoParticipante;	
END $$

CALL sp_getPreguntaRespuestas(19,2,0);
DROP PROCEDURE sp_getPreguntaRespuestas;
	
truncate table resultados

/* consulta para obtener la cantidad de respuestas correctas e incorrectas en un juego */
SELECT RS.idPregunta,(select count(correcta) from resultados where correcta = 1 and idParticipante = 83) AS cantCorrectas,
(select count(correcta) from resultados where correcta = 0 and idParticipante = 83) AS cantIncorrectas FROM resultados RS WHERE RS.idParticipante = 83	
    
SELECT  (select count(idParticipante) from participantes where idJuego = 19) as CantidadParticipantes,P.nombre,P.carne
FROM participantes P WHERE P.idJuego = 19 ORDER BY P.idParticipante DESC


INSERT INTO resultados (idParticipante,idPregunta,correcta) VALUES (1,1,0);
SELECT * FROM resultados