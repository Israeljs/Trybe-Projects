SELECT
    COUNT(usuario.nome) AS quantidade_musicas_no_historico
FROM
    SpotifyClone.usuario AS usuario
    INNER JOIN SpotifyClone.historico_de_reproducoes AS historico ON usuario.id = historico.usuario_id
WHERE
    nome = 'Bill';

SELECT
    COUNT(`history`.`song_id`) AS `quantidade_musicas_no_historico`
FROM
    SpotifyClone.`History` AS `history`
    INNER JOIN SpotifyClone.`Users` AS `users` ON `history`.`user_id` = `users`.`user_id`
WHERE
    `users`.`name` = 'Bill';