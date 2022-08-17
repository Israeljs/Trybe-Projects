SELECT
  COUNT(c.cancao) AS cancoes,
  COUNT(DISTINCT(ar.artista)) AS artistas,
  COUNT(DISTINCT(al.album)) AS albuns
FROM
  SpotifyClone.artistas AS ar
  LEFT JOIN SpotifyClone.albuns AS al ON ar.artista_id = al.artista_id
  LEFT JOIN SpotifyClone.cancoes AS c ON al.album_id = c.album_id;