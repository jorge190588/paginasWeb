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
        INSERT INTO participantes(nombre,carne,idJuego,idOnline) SELECT Nombre,Carne,@Juego,1 WHERE @Juego > 0;        
		
		/*FILAS AFECTADAS*/
        SELECT ROW_COUNT() AS rc;
        /*TRAER EL ID DEL PARTICIPANTE QUE SE CREO*/
        SELECT max(P.idParticipante) AS idParticipante FROM participantes P;
    COMMIT; 
END $$

DROP PROCEDURE sp_ingresarParticipante;
CALL sp_ingresarParticipante('Nichols2','Williams1',1);

truncate table participantes

DELIMITER $$
CREATE PROCEDURE sp_getPreguntaRespuestas(IN IdJuego int,IN nRegistro int,IN correcta int, IN idParticipanteOnline int)
BEGIN
	SELECT P.idPregunta,P.pregunta,P.idJuego FROM preguntas P WHERE P.idJuego = IdJuego LIMIT nRegistro,1;
	SELECT @idPregunta := PR.idPregunta FROM preguntas PR WHERE PR.idJuego = IdJuego LIMIT nRegistro,1;
	SELECT R.respuesta,R.correcta FROM respuestas R WHERE R.idPregunta = @idPregunta;
    SELECT COUNT(p.idPregunta) numPreguntas from preguntas p WHERE p.idJuego = IdJuego;
    SELECT r.idRespuesta,r.respuesta,r.correcta as respuestaCorrecta FROM respuestas r WHERE r.correcta = 1 AND r.idPregunta = @idPregunta;
    SELECT @idUltimoParticipante := MAX(idParticipante) FROM participantes;
    INSERT INTO resultados(idParticipante,idPregunta,idJuego,correcta) SELECT /*@idUltimoParticipante*/idParticipanteOnline,@idPregunta,IdJuego,correcta WHERE correcta > -1 AND correcta < 2;    
    SELECT RS.idPregunta,
		   (select count(correcta.correcta) from resultados correcta where correcta.correcta = 1 and correcta.idParticipante = idParticipanteOnline) AS cantCorrectas,
	       (select count(incorrecta.correcta) from resultados incorrecta where incorrecta.correcta = 0 and incorrecta.idParticipante = idParticipanteOnline) AS cantIncorrectas 
	FROM resultados RS WHERE RS.idParticipante = idParticipanteOnline;/*@idUltimoParticipante*/	
    
    SELECT juegoIniciado FROM juegos j WHERE j.idJuego = IdJuego;
END $$

CALL sp_getPreguntaRespuestas(19,2,0,6);
DROP PROCEDURE sp_getPreguntaRespuestas;
	
truncate table resultados

/* consulta para obtener la cantidad de respuestas correctas e incorrectas en un juego */
SELECT RS.idPregunta,(select count(correcta) from resultados where correcta = 1 and idParticipante = 83) AS cantCorrectas,
(select count(correcta) from resultados where correcta = 0 and idParticipante = 83) AS cantIncorrectas FROM resultados RS WHERE RS.idParticipante = 83	
    
SELECT  (select count(idParticipante) from participantes where idJuego = 19) as CantidadParticipantes,P.nombre,P.carne
FROM participantes P WHERE P.idJuego = 19 ORDER BY P.idParticipante DESC


INSERT INTO resultados (idParticipante,idPregunta,correcta) VALUES (1,1,0);
SELECT * FROM resultados


/*TRANSACCION Y PROCEDIMIENTO PARA INSERTAR USUARIOS QUE CREAN JUEGOS*/
DELIMITER $$
CREATE PROCEDURE sp_insertarUsuario
(
	IN Nombres varchar(100),
	IN Apellidos varchar(100),
    IN Email varchar(100),
    IN Pass varchar(100)
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
        INSERT INTO usuarios(Nombres,Apellidos,Email,Password) VALUES(Nombres,Apellidos,Email,Pass);
        SELECT MAX(U.idUsuario) AS idUsuarioCreado FROM usuarios U;
				
    COMMIT; 
END $$
CALL sp_insertarUsuario('Jose','Morales','morales@gmail.com','00000');
DROP PROCEDURE sp_insertarUsuario

SELECT * FROM usuarios WHERE Email='mambo@gmail.com' AND Password = '12345'


/*PROCEDIMIENTO PARA ACTUALIZAR UN JUEGO A INICIADO Y RETORNAR EL RESULTADO*/
DELIMITER $$
CREATE PROCEDURE sp_IniciarJuego
(
	IN IdGame int
)
BEGIN
        UPDATE juegos SET juegoIniciado = 1 WHERE idJuego = IdGame;
        SELECT juegoIniciado FROM juegos WHERE idJuego = IdGame;				
    
END $$

CALL sp_IniciarJuego(2);
DROP PROCEDURE sp_IniciarJuego

select juegoIniciado from juegos where idJuego=22


/*PROCEDIMIENTO PARA OBTENER EL RESULTADO Y EL GANADOR DE UN JUEGO*/
DELIMITER $$
CREATE PROCEDURE sp_ResultadoDeJuego(IN IdJuego int)
BEGIN        			
	SELECT R.idParticipante,P.nombre,(select sum(r.correcta) from resultados r where r.idParticipante = P.idParticipante) as sumaCorrectas
	FROM resultados R
	INNER JOIN participantes P ON R.idParticipante = P.idParticipante
	WHERE R.idJuego = IdJuego
	GROUP BY P.nombre
	ORDER BY sumaCorrectas DESC;
END $$

CALL sp_ResultadoDeJuego(26);
