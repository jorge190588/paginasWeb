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