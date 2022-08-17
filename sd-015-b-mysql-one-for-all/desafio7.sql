SELECT
  art.artista AS artista,
  alb.album AS album,
  COUNT(sa.usuario_id) AS seguidores
FROM
  SpotifyClone.seguindo_artista AS sa
  INNER JOIN SpotifyClone.artistas AS art ON sa.artista_id = art.artista_id
  INNER JOIN SpotifyClone.albuns AS alb ON art.artista_id = alb.artista_id
GROUP BY
  artista,
  album
ORDER BY
  seguidores DESC,
  artista,
  album;