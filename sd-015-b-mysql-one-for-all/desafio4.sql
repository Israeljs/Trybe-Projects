SELECT
  u.usuario AS usuario,
  IF(
    MAX(YEAR(hr.data_reproducao)) = 2021,
    'Usuário ativo',
    'Usuário inativo'
  ) AS condicao_usuario
FROM
  SpotifyClone.usuarios AS u
  INNER JOIN SpotifyClone.historico_reproducao AS hr ON u.usuario_id = hr.usuario_id
GROUP BY
  u.usuario
ORDER BY
  u.usuario;