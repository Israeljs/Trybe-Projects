SELECT
  us.usuario AS usuario,
  COUNT(hr.cancao_id) AS qtde_musicas_ouvidas,
  ROUND((SUM(c.length_segundos) / 60), 2) AS total_minutos
FROM
  SpotifyClone.usuarios AS us
  INNER JOIN SpotifyClone.historico_reproducao AS hr ON us.usuario_id = hr.usuario_id
  INNER JOIN SpotifyClone.cancoes AS c ON hr.cancao_id = c.cancao_id
GROUP BY
  us.usuario_id
ORDER BY
  us.usuario;