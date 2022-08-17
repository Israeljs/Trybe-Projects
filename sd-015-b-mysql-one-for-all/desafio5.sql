SELECT
  c.cancao as cancao,
  COUNT(hr.cancao_id) AS reproducoes
FROM
  SpotifyClone.cancoes AS c
  INNER JOIN SpotifyClone.historico_reproducao AS hr ON c.cancao_id = hr.cancao_id
GROUP BY
  c.cancao
ORDER BY
  reproducoes DESC,
  c.cancao asc
LIMIT
  2;