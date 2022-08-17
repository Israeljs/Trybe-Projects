SELECT
    `name` AS `nome_musica`,
    CASE
        WHEN `name` LIKE '%Streets' THEN CONCAT(
            SUBSTRING(
                `name`,
                1,
                LOCATE('Streets', `name`) - 1
            ),
            'Code Review'
        )
        WHEN `name` LIKE '%Her Own' THEN CONCAT(
            SUBSTRING(
                `name`,
                1,
                LOCATE('Her Own', `name`) - 1
            ),
            'Trybe'
        )
        WHEN `name` LIKE '%Inner Fire' THEN CONCAT(
            SUBSTRING(
                `name`,
                1,
                LOCATE('Inner Fire', `name`) - 1
            ),
            'Project'
        )
        WHEN `name` LIKE '%Silly' THEN CONCAT(
            SUBSTRING(
                `name`,
                1,
                LOCATE('Silly', `name`) - 1
            ),
            'Nice'
        )
        WHEN `name` LIKE '%Circus' THEN CONCAT(
            SUBSTRING(
                `name`,
                1,
                LOCATE('Circus', `name`) - 1
            ),
            'Pull Request'
        )
    END AS `novo_nome`
FROM
    SpotifyClone.`Songs`
HAVING
    `novo_nome` IS NOT NULL
ORDER BY
    `nome_musica` ASC;

SELECT
    cancoes.nome,
    COUNT(*) AS reproducoes
FROM
    SpotifyClone.usuario AS usuario
    INNER JOIN SpotifyClone.plano AS plano ON usuario.plano_id = plano.id
    AND (
        tipo = 'gratuito'
        OR tipo = 'pessoal'
    )
    INNER JOIN SpotifyClone.historico_de_reproducoes AS historico ON historico.usuario_id = usuario.id
    INNER JOIN SpotifyClone.cancoes AS cancoes ON cancoes.id = historico.cancao_id
GROUP BY
    cancoes.nome
ORDER BY
    cancoes.nome;